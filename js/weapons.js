let activeWeaponType = ''; 

function initWeaponsModule() {
    setupWeaponControls();
    fetchWeapons();
}

function setupWeaponControls() {
    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    
    if (topHeader) topHeader.style.display = 'none'; 
    
    const headerHtml = `
        <div class="char-page-header">
            <h2>Wuthering Waves <span>Weapons</span></h2>
            <p>All Weapons in Wuthering Waves.</p>
        </div>
        
        <div class="char-filter-container">
            <div class="filter-group" style="flex-grow: 1;">
                <label>Search</label>
                <input type="text" id="weaponSearchInput" placeholder="Enter weapon name" onkeyup="searchWeaponsAction()">
            </div>
            
            <div class="filter-group">
                <label>Type</label>
                <div class="element-buttons">
                    <button class="elem-btn active" onclick="setWeaponType('', this)" style="min-width: 60px;">All</button>
                    <button class="elem-btn" onclick="setWeaponType('Sword', this)" title="Sword"><img src="../images/wp_sword.png" onerror="this.src='../images/default.jpg'"></button>
                    <button class="elem-btn" onclick="setWeaponType('Broadblade', this)" title="Broadblade"><img src="../images/wp_broadblade.png" onerror="this.src='../images/default.jpg'"></button>
                    <button class="elem-btn" onclick="setWeaponType('Pistols', this)" title="Pistols"><img src="../images/wp_pistols.png" onerror="this.src='../images/default.jpg'"></button>
                    <button class="elem-btn" onclick="setWeaponType('Gauntlets', this)" title="Gauntlets"><img src="../images/wp_gauntlets.png" onerror="this.src='../images/default.jpg'"></button>
                    <button class="elem-btn" onclick="setWeaponType('Rectifier', this)" title="Rectifier"><img src="../images/wp_rectifier.png" onerror="this.src='../images/default.jpg'"></button>
                </div>
            </div>
            
            <div class="filter-group">
                <label>Rarity</label>
                <select id="wpRaritySelect" onchange="searchWeaponsAction()">
                    <option value="All">All</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
        </div>
        <div class='card-grid' id='weapon-grid'></div>
    `;
    
    display.innerHTML = headerHtml;
}

function setWeaponType(type, btnElement) {
    activeWeaponType = type; 
    const btns = document.querySelectorAll('.elem-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    searchWeaponsAction();
}

function searchWeaponsAction() {
    const search = document.getElementById('weaponSearchInput').value;
    const rarity = document.getElementById('wpRaritySelect').value;
    fetchWeapons(search, activeWeaponType, rarity);
}

function fetchWeapons(search = '', type = '', rarity = 'All') {
    let grid = document.getElementById('weapon-grid');
    if (!grid) return;
    
    grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>Loading Database...</p>";
    
    fetch(`../php/api.php?action=get_weapons&search=${search}&type=${type}&rarity=${rarity}`)
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = "";
            if (data.length === 0) {
                grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>No weapons found.</p>";
                return;
            }
            data.forEach(weapon => {
                let rarityClass = 'grey';
                if (weapon.rarity == 5) rarityClass = 'gold';
                else if (weapon.rarity == 4) rarityClass = 'purple';
                else if (weapon.rarity == 3) rarityClass = 'blue';
                else if (weapon.rarity == 2) rarityClass = 'green';
                
                const weaponJson = JSON.stringify(weapon).replace(/"/g, '&quot;');
                
                grid.innerHTML += `
                    <div class="card ${rarityClass}" onclick="openWeaponPage(${weaponJson})">
                        <img src="../images/${weapon.image_url}" onerror="this.src='../images/default_weapon.jpg'">
                        <div class="card-info">
                            <h3>${weapon.name}</h3>
                        </div>
                    </div>
                `;
            });
        });
}

function openWeaponPage(weapon, updateHistory = true) {
    if (updateHistory) {
        const safeName = weapon.name.toLowerCase().replace(/[\s\W]+/g, '_');
        window.history.pushState({ module: 'weapon_detail', weaponData: weapon }, "", "#wp_" + safeName);
    }

    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    if (topHeader) topHeader.style.display = 'none';

    let borderColor = '#9da5ad';
    if (weapon.rarity == 5) borderColor = '#ffcc00';
    else if (weapon.rarity == 4) borderColor = '#a335ee';
    else if (weapon.rarity == 3) borderColor = '#0070dd';
    else if (weapon.rarity == 2) borderColor = '#1eff00';

    const storyContent = weapon.story || "Weapon background story to be updated.";
    const skillName = weapon.skill_name || "Weapon Effect";
    const safeTemplate = (weapon.description || "Skill details to be updated.").replace(/"/g, '&quot;');
    const atkBase = weapon.atk_base || 27;
    const atkMax = weapon.atk_max || 412;
    const statBase = weapon.stat_base || "8.0%";
    const statMax = weapon.stat_max || "77.04%";

    const m1t1 = weapon.mat_1_t1 || "Mat 1 Tier 1";
    const m1t2 = weapon.mat_1_t2 || "Mat 1 Tier 2";
    const m1t3 = weapon.mat_1_t3 || "Mat 1 Tier 3";
    const m1t4 = weapon.mat_1_t4 || "Mat 1 Tier 4";

    const m2t1 = weapon.mat_2_t1 || "Mat 2 Tier 1";
    const m2t2 = weapon.mat_2_t2 || "Mat 2 Tier 2";
    const m2t3 = weapon.mat_2_t3 || "Mat 2 Tier 3";
    const m2t4 = weapon.mat_2_t4 || "Mat 2 Tier 4";

    const formatMatImg = (name) => 'mat_' + name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';

    display.innerHTML = `
        <div class="wp-detail-container">
            
            <div class="wp-detail-top">
                <div class="wp-detail-icon-box" style="border-color: ${borderColor};">
                    <img src="../images/${weapon.image_url}" onerror="this.src='../images/default_weapon.jpg'" alt="${weapon.name}">
                </div>
                <div class="wp-detail-info-box">
                    <div class="wp-detail-title-row">
                        <h1>${weapon.name}</h1>
                        <span class="wp-type-badge">${weapon.type}</span>
                    </div>
                    <div class="wp-stat-row">
                        <span class="wp-stat-label">ATK (Lv.1 / 90)</span>
                        <span class="wp-stat-value">${atkBase} <span style="color:#7b848d; font-weight:normal; margin:0 3px;">/</span> ${atkMax}</span>
                    </div>
                    <div class="wp-stat-row">
                        <span class="wp-stat-label">${weapon.main_stat} (Lv.1 / 90)</span>
                        <span class="wp-stat-value">${statBase} <span style="color:#7b848d; font-weight:normal; margin:0 3px;">/</span> ${statMax}</span>
                    </div>
                </div>
            </div>

            <div class="wp-sliders-container">
                <div class="wp-slider-label-row">
                    <span>Level</span><span id="wp-level-display">90</span>
                </div>
                <input type="range" min="1" max="90" value="90" class="level-slider wp-slider-input-margin" id="wp-level-slider" 
                       data-m1t1="${m1t1}" data-m1t2="${m1t2}" data-m1t3="${m1t3}" data-m1t4="${m1t4}"
                       data-m2t1="${m2t1}" data-m2t2="${m2t2}" data-m2t3="${m2t3}" data-m2t4="${m2t4}"
                       oninput="updateWeaponLevel(this.value)">

                <div class="wp-slider-label-row">
                    <span>Rank</span><span id="wp-rank-display">1</span>
                </div>
                <input type="range" min="1" max="5" value="1" class="level-slider" id="wp-rank-slider" 
                       data-template="${safeTemplate}"
                       oninput="updateWeaponRank(this.value)">
            </div>

            <div class="wp-materials-section">
                <h4>Ascension Materials</h4>
                <div class="wp-materials-grid">
                    <div class="wp-mat-item">
                        <span class="wp-mat-badge" id="wp-mat-count-1">12</span>
                        <img id="wp-mat-img-1" src="../images/${formatMatImg(m1t4)}" onerror="this.src='../images/default.jpg'">
                        <div class="wp-mat-name" id="wp-mat-name-1">${m1t4}</div>
                    </div>
                    <div class="wp-mat-item">
                        <span class="wp-mat-badge" id="wp-mat-count-2">8</span>
                        <img id="wp-mat-img-2" src="../images/${formatMatImg(m2t4)}" onerror="this.src='../images/default.jpg'">
                        <div class="wp-mat-name" id="wp-mat-name-2">${m2t4}</div>
                    </div>
                    <div class="wp-mat-item">
                        <span class="wp-mat-badge" id="wp-mat-count-3">120,000</span>
                        <img src="../images/mat_credit.png" onerror="this.src='../images/default.jpg'">
                        <div class="wp-mat-name">Shell Credit</div>
                    </div>
                </div>
            </div>

            <div class="wp-section-block">
                <h3>Skill</h3>
                <div class="wp-card-box">
                    <div class="wp-card-header">${skillName}</div>
                    <div class="wp-card-body" id="wp-skill-body">
                    </div>
                </div>
            </div>

            <div class="wp-section-block">
                <h3>Background</h3>
                <div class="wp-card-box wp-card-body-padded">
                    ${storyContent}
                </div>
            </div>

        </div>
    `;

    updateWeaponLevel(90);
    updateWeaponRank(1);
}

function updateWeaponLevel(newLevel) {
    const display = document.getElementById('wp-level-display');
    const slider = document.getElementById('wp-level-slider');
    
    if (display) display.innerText = newLevel;
    
    let m1t1 = "Mat 1 Tier 1", m1t2 = "Mat 1 Tier 2", m1t3 = "Mat 1 Tier 3", m1t4 = "Mat 1 Tier 4";
    let m2t1 = "Mat 2 Tier 1", m2t2 = "Mat 2 Tier 2", m2t3 = "Mat 2 Tier 3", m2t4 = "Mat 2 Tier 4";

    if (slider) {
        const percentage = ((newLevel - 1) / 89) * 100;
        slider.style.setProperty('--progress', percentage + '%');

        m1t1 = slider.getAttribute('data-m1t1') || m1t1;
        m1t2 = slider.getAttribute('data-m1t2') || m1t2;
        m1t3 = slider.getAttribute('data-m1t3') || m1t3;
        m1t4 = slider.getAttribute('data-m1t4') || m1t4;

        m2t1 = slider.getAttribute('data-m2t1') || m2t1;
        m2t2 = slider.getAttribute('data-m2t2') || m2t2;
        m2t3 = slider.getAttribute('data-m2t3') || m2t3;
        m2t4 = slider.getAttribute('data-m2t4') || m2t4;
    }

    const lvl = parseInt(newLevel);
    let currentMat1Name = m1t4;
    let currentMat2Name = m2t4;

    if (lvl < 41) {
        currentMat1Name = m1t1;
        currentMat2Name = m2t1;
    } else if (lvl >= 41 && lvl < 61) {
        currentMat1Name = m1t2;
        currentMat2Name = m2t2;
    } else if (lvl >= 61 && lvl < 81) {
        currentMat1Name = m1t3;
        currentMat2Name = m2t3;
    } else if (lvl >= 81) {
        currentMat1Name = m1t4;
        currentMat2Name = m2t4;
    }

    const name1Elem = document.getElementById('wp-mat-name-1');
    const img1Elem = document.getElementById('wp-mat-img-1');
    if (name1Elem && img1Elem) {
        name1Elem.innerText = currentMat1Name;
        img1Elem.src = '../images/mat_' + currentMat1Name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
    }

    const name2Elem = document.getElementById('wp-mat-name-2');
    const img2Elem = document.getElementById('wp-mat-img-2');
    if (name2Elem && img2Elem) {
        name2Elem.innerText = currentMat2Name;
        img2Elem.src = '../images/mat_' + currentMat2Name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
    }

    let mat1 = 0, mat2 = 0, mat3 = 0;

    if (lvl < 21) {
        mat1 = 0; mat2 = 0; mat3 = 0;
    } else if (lvl >= 21 && lvl < 41) {
        mat1 = 0; mat2 = 6; mat3 = 10000;
    } else if (lvl >= 41 && lvl < 51) {
        mat1 = 6; mat2 = 6; mat3 = 20000;
    } else if (lvl >= 51 && lvl < 61) {
        mat1 = 8; mat2 = 4; mat3 = 40000;
    } else if (lvl >= 61 && lvl < 71) {
        mat1 = 6; mat2 = 6; mat3 = 60000;
    } else if (lvl >= 71 && lvl < 81) {
        mat1 = 8; mat2 = 4; mat3 = 80000;
    } else if (lvl >= 81) {
        mat1 = 12; mat2 = 8; mat3 = 120000;
    }

    const count1 = document.getElementById('wp-mat-count-1');
    const count2 = document.getElementById('wp-mat-count-2');
    const count3 = document.getElementById('wp-mat-count-3');

    if (count1) count1.innerText = mat1;
    if (count2) count2.innerText = mat2;
    if (count3) count3.innerText = mat3.toLocaleString();
}

function updateWeaponRank(newRank) {
    const display = document.getElementById('wp-rank-display');
    const slider = document.getElementById('wp-rank-slider');
    const skillBody = document.getElementById('wp-skill-body');
    
    if (display) display.innerText = newRank;
    
    if (slider) {
        const percentage = ((newRank - 1) / 4) * 100;
        slider.style.setProperty('--progress', percentage + '%');
        
        if (skillBody) {
            const template = slider.getAttribute('data-template');
            if (template) {
                const parsedSkill = template.replace(/\[([0-9\.]+),\s*([0-9\.]+)\]/g, function(match, baseStr, stepStr) {
                    const base = parseFloat(baseStr);
                    const step = parseFloat(stepStr);
                    let val = base + (step * (parseInt(newRank) - 1));
                    let formattedVal = Number.isInteger(val) ? val : parseFloat(val.toFixed(2));
                    return `<span class="highlight-val">${formattedVal}</span>`;
                });
                skillBody.innerHTML = parsedSkill;
            }
        }
    }
}