let activeElement = ''; 

function initCharactersModule() {
    setupCharacterControls();
    fetchChars();
}

function setupCharacterControls() {
    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    
    if (topHeader) topHeader.style.display = 'none'; 
    
    const headerHtml = `
        <div class="char-page-header">
            <h2>Wuthering Waves <span>Characters</span></h2>
            <p>All Characters in Wuthering Waves.</p>
        </div>
        
        <div class="char-filter-container">
            <div class="filter-group" style="flex-grow: 1;">
                <label>Search</label>
                <input type="text" id="charSearchInput" placeholder="Enter name" onkeyup="searchCharsAction()">
            </div>
            
            <div class="filter-group">
                <label>Element</label>
                <div class="element-buttons">
                    <button class="elem-btn" onclick="setCharElement('Glacio', this)" title="Glacio"><img src="../images/ele_glacio.png" alt="Glacio"></button>
                    <button class="elem-btn" onclick="setCharElement('Fusion', this)" title="Fusion"><img src="../images/ele_fusion.png" alt="Fusion"></button>
                    <button class="elem-btn" onclick="setCharElement('Electro', this)" title="Electro"><img src="../images/ele_electro.png" alt="Electro"></button>
                    <button class="elem-btn" onclick="setCharElement('Aero', this)" title="Aero"><img src="../images/ele_aero.png" alt="Aero"></button>
                    <button class="elem-btn" onclick="setCharElement('Spectro', this)" title="Spectro"><img src="../images/ele_spectro.png" alt="Spectro"></button>
                    <button class="elem-btn" onclick="setCharElement('Havoc', this)" title="Havoc"><img src="../images/ele_havoc.png" alt="Havoc"></button>
                </div>
            </div>
            
            <div class="filter-group">
                <label>Rarity</label>
                <select id="charRaritySelect" onchange="searchCharsAction()">
                    <option value="All">All</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                </select>
            </div>
            
            <div class="filter-group">
                <label>Weapon Type</label>
                <select id="charWeaponSelect" onchange="searchCharsAction()">
                    <option value="Any">Any</option>
                    <option value="Sword">Sword</option>
                    <option value="Broadblade">Broadblade</option>
                    <option value="Pistols">Pistols</option>
                    <option value="Gauntlets">Gauntlets</option>
                    <option value="Rectifier">Rectifier</option>
                </select>
            </div>
        </div>
        <div class='card-grid' id='char-grid'></div>
    `;
    
    display.innerHTML = headerHtml;
}

function setCharElement(elem, btnElement) {
    if (activeElement === elem) {
        activeElement = ''; 
        btnElement.classList.remove('active'); 
    } else {
        activeElement = elem; 
        const btns = document.querySelectorAll('.elem-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    searchCharsAction();
}

function searchCharsAction() {
    const search = document.getElementById('charSearchInput').value;
    const rarity = document.getElementById('charRaritySelect').value;
    const weapon = document.getElementById('charWeaponSelect').value;
    fetchChars(search, activeElement, rarity, weapon);
}

function fetchChars(search = '', element = '', rarity = 'All', weapon = 'Any') {
    let grid = document.getElementById('char-grid');
    if (!grid) return;
    
    grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>Loading Database...</p>";
    
    fetch(`../php/api.php?action=get_characters&search=${search}&element=${element}&rarity=${rarity}&weapon=${weapon}`)
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = "";
            if (data.length === 0) {
                grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>No characters found.</p>";
                return;
            }
            data.forEach(char => {
                let rarityClass = 'grey';
                if (char.rarity == 5) rarityClass = 'gold';
                else if (char.rarity == 4) rarityClass = 'purple';
                else if (char.rarity == 3) rarityClass = 'blue';
                else if (char.rarity == 2) rarityClass = 'green';
                
                const charJson = JSON.stringify(char).replace(/"/g, '&quot;');
                
                grid.innerHTML += `
                    <div class="card ${rarityClass}" onclick="openCharPage(${charJson})">
                        <img src="../images/${char.image_url}" onerror="this.src='../images/default.jpg'">
                    </div>
                `;
            });
        });
}

// 🌟 新增：updateHistory 参数控制是否写入历史记录
function openCharPage(char, updateHistory = true) {
    
    // 🌟 核心魔法：向浏览器压入详情页的历史记录
    if (updateHistory) {
        // 生成漂亮的 URL 比如 #char_sigrika
        const safeName = char.name.toLowerCase().replace(/[\s\W]+/g, '_');
        window.history.pushState({ module: 'char_detail', charData: char }, "", "#char_" + safeName);
    }

    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    
    if (topHeader) topHeader.style.display = 'none';

    const stars = char.rarity + '★';
    const detailImageName = 'detail_' + char.image_url;

    const weaponImgName = 'wp_' + (char.weapon ? char.weapon.toLowerCase() : 'unknown') + '.png';
    let elementForImg = char.element;
    if (char.name === "Rover (Spectro)") elementForImg = "Spectro";
    else if (char.name === "Rover (Havoc)") elementForImg = "Havoc";
    else if (char.name === "Rover (Aero)") elementForImg = "Aero";
    const elementImgName = 'ele_' + (elementForImg ? elementForImg.toLowerCase() : 'unknown') + '.png';

    const mat1Name = char.mat_1 || "Our Choice";
    const mat2Name = char.mat_2 || "Arithmetic Shell";
    const mat3Name = char.mat_3 || "Intact Exoswarm Pendant"; 
    
    const formatMatImg = (name) => 'mat_' + name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
    
    const mat1Img = formatMatImg(mat1Name);
    const mat2Img = formatMatImg(mat2Name);
    const mat3Img = formatMatImg(mat3Name);
    const mat4Img = 'mat_credit.png'; 

    display.innerHTML = `
        <div class="char-detail-page" style="padding-top: 20px;">
            <div class="char-detail-content">
                
                <div class="char-detail-left">
                    <div class="char-arch-bg">
                        <img src="../images/${detailImageName}" onerror="this.src='../images/${char.image_url}'" alt="${char.name}">
                    </div>
                </div>

                <div class="char-detail-right">
                    <div class="detail-header">
                        <div class="detail-title-box">
                            <h1>${char.name} <span class="detail-stars">${stars}</span></h1>
                        </div>
                        <div class="detail-tags">
                            <span class="tag tag-weapon">
                                <img src="../images/${weaponImgName}" class="tag-icon" onerror="this.style.display='none'">
                                ${char.weapon}
                            </span>
                            <span class="tag tag-element">
                                <img src="../images/${elementImgName}" class="tag-icon" onerror="this.style.display='none'">
                                ${char.element}
                            </span>
                        </div>
                    </div>

                    <div class="detail-level-section">
                        <div class="level-label-row">
                            <span>Level</span>
                            <span class="level-max" id="char-level-display">90</span>
                        </div>
                        <input type="range" min="1" max="90" value="90" class="level-slider" oninput="updateCharLevel(this.value)">
                    </div>

                    <div class="detail-materials-section">
                        <h3>${char.name} Ascension Materials</h3>
                        <div class="materials-grid">
                            <div class="mat-box">
                                <span class="mat-count" id="mat-count-1">16</span>
                                <div class="mat-icon-bg"><img src="../images/${mat1Img}" onerror="this.src='../images/default.jpg'"></div>
                                <span class="mat-name">${mat1Name}</span>
                            </div>
                            <div class="mat-box">
                                <span class="mat-count" id="mat-count-2">20</span>
                                <div class="mat-icon-bg"><img src="../images/${mat2Img}" onerror="this.src='../images/default.jpg'"></div>
                                <span class="mat-name">${mat2Name}</span>
                            </div>
                            <div class="mat-box">
                                <span class="mat-count" id="mat-count-3">4</span>
                                <div class="mat-icon-bg"><img id="mat-img-3" src="../images/${mat3Img}" onerror="this.src='../images/default.jpg'"></div>
                                <span class="mat-name" id="mat-name-3">${mat3Name}</span>
                            </div>
                            <div class="mat-box">
                                <span class="mat-count" id="mat-count-4">80,000</span>
                                <div class="mat-icon-bg"><img src="../images/${mat4Img}" onerror="this.src='../images/default.jpg'"></div>
                                <span class="mat-name">Shell Credit</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-stats-section">
                        <div class="stat-row">
                            <span class="stat-label">❤️ HP</span>
                            <span class="stat-value">10775</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">⚔️ ATK</span>
                            <span class="stat-value">437</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">🛡️ DEF</span>
                            <span class="stat-value">1136</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">✨ Crit. Rate</span>
                            <span class="stat-value">5%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">💥 Crit. DMG</span>
                            <span class="stat-value">150%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">⚡ Energy Regen</span>
                            <span class="stat-value">100%</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">🔵 Max Resonance Energy</span>
                            <span class="stat-value">140</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-lore-section">
                <h3>Background</h3>
                <p>${char.guide_content}</p>
            </div>
            
        </div>
    `;
    
    updateCharLevel(90);
}

function updateCharLevel(newLevel) {
    const levelDisplay = document.getElementById('char-level-display');
    if (levelDisplay) {
        levelDisplay.innerText = newLevel;
    }

    let mat1 = 0, mat2 = 0, mat3 = 0, mat4 = 0;
    const lvl = parseInt(newLevel);

    let mat3DynamicName = "Intact Exoswarm Pendant";
    if (lvl < 41) {
        mat3DynamicName = "Fractured Exoswarm Pendant";
    } else if (lvl >= 41 && lvl < 61) {
        mat3DynamicName = "Worn Exoswarm Pendant";
    } else {
        mat3DynamicName = "Intact Exoswarm Pendant";
    }

    const name3Elem = document.getElementById('mat-name-3');
    const img3Elem = document.getElementById('mat-img-3');
    if (name3Elem && img3Elem) {
        name3Elem.innerText = mat3DynamicName;
        const newImgPath = '../images/mat_' + mat3DynamicName.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
        img3Elem.src = newImgPath;
    }

    if (lvl < 21) {
        mat1 = 0; mat2 = 0; mat3 = 0; mat4 = 0;
    } else if (lvl >= 21 && lvl < 41) {
        mat1 = 0; mat2 = 0; mat3 = 4; mat4 = 5000;
    } else if (lvl >= 41 && lvl < 51) {
        mat1 = 3; mat2 = 4; mat3 = 4; mat4 = 10000;
    } else if (lvl >= 51 && lvl < 61) {
        mat1 = 6; mat2 = 8; mat3 = 8; mat4 = 15000;
    } else if (lvl >= 61 && lvl < 71) {
        mat1 = 9; mat2 = 12; mat3 = 4; mat4 = 20000;
    } else if (lvl >= 71 && lvl < 81) {
        mat1 = 12; mat2 = 16; mat3 = 8; mat4 = 40000;
    } else if (lvl >= 81) {
        mat1 = 16; mat2 = 20; mat3 = 4; mat4 = 80000;
    }

    const count1 = document.getElementById('mat-count-1');
    const count2 = document.getElementById('mat-count-2');
    const count3 = document.getElementById('mat-count-3');
    const count4 = document.getElementById('mat-count-4');

    if(count1) count1.innerText = mat1;
    if(count2) count2.innerText = mat2;
    if(count3) count3.innerText = mat3;
    if(count4) count4.innerText = mat4.toLocaleString(); 
}