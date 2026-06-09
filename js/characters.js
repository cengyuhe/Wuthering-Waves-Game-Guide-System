let activeElement = ''; 
let cachedWeapons = {}; 
let cachedEchoes = {};
let cachedSonatas = {};
let cachedAllCharacters = [];

const normalizeName = (name) => {
    return name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
};

const getStatIcon = (statName) => {
    const s = statName.toLowerCase();
    if (s.includes('crit. rate') || s.includes('crit rate')) return 'stat_crit_rate.png';
    if (s.includes('crit. dmg') || s.includes('crit dmg')) return 'stat_crit_dmg.png';
    if (s.includes('energy regen') || s.includes('er')) return 'stat_energy_regen.png';
    if (s.includes('atk')) return 'stat_atk.png';
    if (s.includes('def')) return 'stat_def.png';
    if (s.includes('hp')) return 'stat_hp.png';
    if (s.includes('aero')) return 'ele_aero.png';
    if (s.includes('glacio')) return 'ele_glacio.png';
    if (s.includes('electro')) return 'ele_electro.png';
    if (s.includes('fusion')) return 'ele_fusion.png';
    if (s.includes('havoc')) return 'ele_havoc.png';
    if (s.includes('spectro')) return 'ele_spectro.png';
    if (s.includes('healing')) return 'stat_hp.png'; 
    return 'default.jpg';
};

function ensureCachesLoaded(callback) {
    if (Object.keys(cachedWeapons).length > 0 && Object.keys(cachedEchoes).length > 0 && cachedAllCharacters.length > 0) {
        callback();
        return;
    }
    
    Promise.all([
        fetch(`../php/api.php?action=get_weapons`).then(res => res.json()),
        fetch(`../php/api.php?action=get_echoes`).then(res => res.json()),
        fetch(`../php/api.php?action=get_sonatas`).then(res => res.json()),
        fetch(`../php/api.php?action=get_characters&search=&element=&rarity=All&weapon=Any`).then(res => res.json())
    ])
    .then(([weaponsData, echoesData, sonatasData, charsData]) => {
        cachedWeapons = {};
        weaponsData.forEach(w => { cachedWeapons[normalizeName(w.name)] = w; });
        
        cachedEchoes = {};
        echoesData.forEach(e => { cachedEchoes[normalizeName(e.name)] = e; });
        
        cachedSonatas = {};
        sonatasData.forEach(s => { cachedSonatas[normalizeName(s.name)] = s; });
        
        cachedAllCharacters = charsData || [];
        
        callback();
    })
    .catch(() => callback());
}

function initCharactersModule() {
    setupCharacterControls();
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
    ensureCachesLoaded(() => { fetchChars(); });
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
                    <option value="All">All</option>
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
            if (data.length === 0) {
                grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>No characters found.</p>";
                return;
            }
            let htmlContent = "";
            data.forEach(char => {
                let rarityClass = 'grey';
                if (char.rarity == 5) rarityClass = 'gold';
                else if (char.rarity == 4) rarityClass = 'purple';
                else if (char.rarity == 3) rarityClass = 'blue';
                else if (char.rarity == 2) rarityClass = 'green';
                
                const charJson = JSON.stringify(char).replace(/"/g, '&quot;');
                htmlContent += `
                    <div class="card ${rarityClass}" onclick="openCharPage(${charJson})">
                        <img src="../images/${char.image_url}" loading="lazy" onerror="this.src='../images/default.jpg'">
                    </div>
                `;
            });
            grid.innerHTML = htmlContent;
        });
}

function generateEchoBuildHtml(buildName, echoName, sonataStr) {
    if (!echoName || echoName.trim() === '') return '';

    const echoObj = cachedEchoes[normalizeName(echoName)];
    const formatEchoImg = (name) => name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.jpg';
    const formatSonataImg = (name) => 'sonata_' + name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';

    const eImg = echoObj ? `../images/${echoObj.image_url}` : `../images/${formatEchoImg(echoName)}`;
    const jEcho = echoObj ? JSON.stringify(echoObj).replace(/"/g, '&quot;') : 'null';

    const sonataArray = sonataStr ? sonataStr.split('+').map(s => s.trim()) : [];
    let s1 = sonataArray[0] || 'Various';
    let s2 = sonataArray.length > 1 ? sonataArray[1] : s1;

    const renderSlot = (cost, isSpecific, name, sName, img, jData) => {
        const sImgHtml = sName !== 'Various' ? `<div class="echo-sonata-mini"><img src="../images/${formatSonataImg(sName)}" onerror="this.style.display='none'"></div>` : '';
        if (isSpecific) {
            return `
                <div class="echo-slot ${jData !== 'null' ? 'clickable' : ''}" ${jData !== 'null' ? `onclick="goToEchoDetail(${jData})"` : ''}>
                    <div class="echo-icon-wrapper">
                        <img src="${img}" class="echo-img" onerror="this.src='../images/default.jpg'">
                        ${sImgHtml}
                        <div class="echo-cost-mini">${cost}</div>
                    </div>
                    <div class="echo-slot-name wp-color-5">${name}</div>
                </div>
            `;
        } else {
            return `
                <div class="echo-slot">
                    <div class="echo-icon-wrapper generic-echo">
                        <span class="generic-cost-text">${cost}</span>
                        ${sImgHtml}
                        <div class="echo-cost-mini">${cost}</div>
                    </div>
                    <div class="echo-slot-name" style="color: #7b848d;">Any Cost ${cost}</div>
                </div>
            `;
        }
    };

    let setInfoHtml = '';
    if (sonataArray.length > 1) {
        const s1Data = cachedSonatas[normalizeName(s1)];
        const s2Data = cachedSonatas[normalizeName(s2)];
        const desc1 = s1Data && s1Data.tier1_desc ? s1Data.tier1_desc : '2-Pc effect to be updated.';
        const desc2 = s2Data && s2Data.tier1_desc ? s2Data.tier1_desc : '2-Pc effect to be updated.';
        setInfoHtml = `<div class="sonata-info-box"><div style="margin-bottom: 5px;"><strong>Mixed Set (2+2)</strong></div><ul class="sonata-desc-list"><li><strong>${s1}:</strong> ${desc1}</li><li><strong>${s2}:</strong> ${desc2}</li></ul></div>`;
    } else if (s1 !== 'Various') {
        const sData = cachedSonatas[normalizeName(s1)];
        const desc1 = sData && sData.tier1_desc ? sData.tier1_desc : '2-Pc effect to be updated.';
        const desc2 = sData && sData.tier2_desc ? sData.tier2_desc : '5-Pc effect to be updated.';
        setInfoHtml = `<div class="sonata-info-box"><div style="margin-bottom: 5px;"><strong>${s1}</strong></div><ul class="sonata-desc-list"><li>${desc1}</li><li>${desc2}</li></ul></div>`;
    } else {
        setInfoHtml = `<div class="sonata-info-box" style="text-align:center;"><strong>Set Effect:</strong> Flexible / Any</div>`;
    }

    const plusHtml = `<div style="color: #7b848d; font-size: 1.8em; font-weight: bold; padding-top: 22px;">+</div>`;

    return `
        <div class="build-row">
            <div class="echo-lineup">
                ${renderSlot(4, true, echoName, s1, eImg, jEcho)}
                ${plusHtml}
                ${renderSlot(3, false, '', s1, '', 'null')}
                ${plusHtml}
                ${renderSlot(3, false, '', s2, '', 'null')}
                ${plusHtml}
                ${renderSlot(1, false, '', s2, '', 'null')}
                ${plusHtml}
                ${renderSlot(1, false, '', s1, '', 'null')}
            </div>
            ${setInfoHtml}
        </div>
    `;
}

window.openCharSkillModal = function(skillKey) {
    if (!window.currentCharacterSkills) return;
    const data = window.currentCharacterSkills[skillKey];
    if (!data) return;
    const iconImg = document.getElementById('sm-icon');
    iconImg.src = '../images/' + data.icon;
    iconImg.style.display = 'block'; 
    document.getElementById('sm-name').innerHTML = data.name;
    document.getElementById('sm-type').innerText = data.type;
    document.getElementById('sm-desc').innerHTML = data.desc.replace(/\n/g, '<br>');
    document.getElementById('skill-modal-overlay').style.display = 'flex';
};

window.closeCharSkillModal = function(e) {
    if (e) e.stopPropagation();
    document.getElementById('skill-modal-overlay').style.display = 'none';
};

function openCharPage(char, updateHistory = true) {
    ensureCachesLoaded(() => {
        renderCharPage(char, updateHistory);
    });
}

function renderCharPage(char, updateHistory) {
    if (updateHistory) {
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

    const mat1Name = char.name.includes("Rover") ? "Mysterious Code" : (char.mat_1 || "Our Choice");
    const mat2Name = char.mat_2 || "Arithmetic Shell";
    const t1Name = char.mat_3_tier1 || "Tier 1 Material";
    const t2Name = char.mat_3_tier2 || "Tier 2 Material";
    const t3Name = char.mat_3_tier3 || "Tier 3 Material";
    const t4Name = char.mat_3_tier4 || "Tier 4 Material";

    const hpBase = char.hp_base || 800;
    const hpMax = char.hp_max || 10000;
    const atkBase = char.atk_base || 20;
    const atkMax = char.atk_max || 400;
    const defBase = char.def_base || 50;
    const defMax = char.def_max || 1000;

    const formatMatImg = (name) => 'mat_' + name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
    const mat1Img = formatMatImg(mat1Name);
    const mat2Img = formatMatImg(mat2Name);
    const mat3Img = formatMatImg(t4Name); 
    const mat4Img = 'mat_credit.png'; 

    const recWp1 = char.rec_wp_1 || "Signature Weapon";
    const recWp2 = char.rec_wp_2 || "Standard 5-Star";
    const recWp3 = char.rec_wp_3 || "Best 4-Star Option";
    const w1 = cachedWeapons[normalizeName(recWp1)];
    const w2 = cachedWeapons[normalizeName(recWp2)];
    const w3 = cachedWeapons[normalizeName(recWp3)];
    const formatFallbackWpImg = (name) => name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.jpg';
    const img1 = w1 ? `../images/${w1.image_url}` : `../images/${formatFallbackWpImg(recWp1)}`;
    const img2 = w2 ? `../images/${w2.image_url}` : `../images/${formatFallbackWpImg(recWp2)}`;
    const img3 = w3 ? `../images/${w3.image_url}` : `../images/${formatFallbackWpImg(recWp3)}`;
    const c1Class = w1 ? `wp-color-${w1.rarity}` : '';
    const c2Class = w2 ? `wp-color-${w2.rarity}` : '';
    const c3Class = w3 ? `wp-color-${w3.rarity}` : '';
    const j1 = w1 ? JSON.stringify(w1).replace(/"/g, '&quot;') : 'null';
    const j2 = w2 ? JSON.stringify(w2).replace(/"/g, '&quot;') : 'null';
    const j3 = w3 ? JSON.stringify(w3).replace(/"/g, '&quot;') : 'null';

    let buildsHtml = generateEchoBuildHtml(char.build_1_name, char.rec_echo_1, char.rec_sonata_1);
    buildsHtml += generateEchoBuildHtml(char.build_2_name, char.rec_echo_2, char.rec_sonata_2);
    if (buildsHtml === '') buildsHtml = `<p style="color:#7b848d; text-align:center; margin-top:20px;">Echo builds to be updated.</p>`;

    let bestStatsHtml = '';
    const statsArray = [char.best_stat_1, char.best_stat_2, char.best_stat_3, char.best_stat_4, char.best_stat_5].filter(Boolean);
    if (statsArray.length > 0) {
        let rowsHtml = '';
        statsArray.forEach(statStr => {
            const parts = statStr.split(/[:|]/);
            const sName = parts[0].trim();
            const sVal = parts.length > 1 ? parts[1].trim() : 'Priority';
            const sIcon = getStatIcon(sName);
            rowsHtml += `
                <div class="rec-stats-row">
                    <div class="rec-stats-left"><img src="../images/${sIcon}" onerror="this.style.display='none'">${sName}</div>
                    <div class="rec-stats-right">${sVal}<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                </div>
            `;
        });
        bestStatsHtml = `<div class="rec-stats-container"><div class="rec-stats-top">Recommended Stats for ${char.name}</div><div class="rec-stats-thead"><span>Stats</span><span>Recommended</span></div><div class="rec-stats-tbody">${rowsHtml}</div></div>`;
    }

    let teamCompsHtml = '';
    const teammateIds = [char.team_mate_1, char.team_mate_2, char.team_mate_3, char.team_mate_4].filter(id => id && id != 0 && id != 'null');
    if (teammateIds.length > 0) {
        let tmListHtml = '';
        teammateIds.forEach((tmId, index) => {
            const teammate = cachedAllCharacters.find(c => c.id == tmId);
            if (teammate) {
                const tmJson = JSON.stringify(teammate).replace(/"/g, '&quot;');
                let badgeHtml = (index === 1 || index === 3) ? `<div class="tm-alt-badge">Alternative</div>` : ''; 
                let displayIcon = (teammate.team_icon_url && teammate.team_icon_url.trim() !== '') ? teammate.team_icon_url : teammate.image_url;
                tmListHtml += `
                    <div class="teammate-card" onclick="openCharPage(${tmJson}, true)">
                        <div class="tm-icon-wrapper">${badgeHtml}<img src="../images/${displayIcon}" onerror="this.src='../images/default.jpg'" alt="${teammate.name}"></div>
                        <span>${teammate.name}</span>
                    </div>
                `;
            }
        });
        if (tmListHtml !== '') teamCompsHtml = `<div class="detail-team-section"><h3>Recommended Teammates</h3><div class="team-list">${tmListHtml}</div></div>`;
    }

    window.currentCharacterSkills = {
        normal: { type: 'Normal Attack', name: char.skill_normal_name || "Normal Attack", desc: char.skill_normal_desc || "To be updated.", icon: char.skill_normal_icon || 'skill_normal.png' },
        resonance: { type: 'Resonance Skill', name: char.skill_resonance_name || "Resonance Skill", desc: char.skill_resonance_desc || "To be updated.", icon: char.skill_resonance_icon || 'skill_resonance.png' },
        forte: { type: 'Forte Circuit', name: char.skill_forte_name || "Forte Circuit", desc: char.skill_forte_desc || "To be updated.", icon: char.skill_forte_icon || 'skill_forte.png' },
        liberation: { type: 'Resonance Liberation', name: char.skill_liberation_name || "Resonance Liberation", desc: char.skill_liberation_desc || "To be updated.", icon: char.skill_liberation_icon || 'skill_liberation.png' },
        intro: { type: 'Intro Skill', name: char.skill_intro_name || "Intro Skill", desc: char.skill_intro_desc || "To be updated.", icon: char.skill_intro_icon || 'skill_intro.png' },
        outro: { type: 'Outro Skill', name: char.skill_outro_name || "Outro Skill", desc: char.skill_outro_desc || "To be updated.", icon: char.skill_outro_icon || 'skill_outro.png' },
        inherent1: { type: 'Inherent Skill', name: char.skill_inherent1_name || "Inherent Skill 1", desc: char.skill_inherent1_desc || "To be updated.", icon: char.skill_inherent1_icon || 'skill_inherent.png' },
        inherent2: { type: 'Inherent Skill', name: char.skill_inherent2_name || "Inherent Skill 2", desc: char.skill_inherent2_desc || "To be updated.", icon: char.skill_inherent2_icon || 'skill_inherent.png' }
    };

    const skillsHtml = `
        <div class="char-skills-container">
            <div class="char-skills-top">${char.name} Skills</div>
            <div class="char-skills-body">
                <div class="char-skills-arc-wrapper">
                    <div class="skill-arc-line"></div>
                    <div class="skill-node arc-node node-normal" onclick="window.openCharSkillModal('normal')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.normal.icon}" onerror="this.src='../images/default.jpg'"><div class="skill-level-badge">10/10</div></div>
                        <div class="skill-node-label">Normal Attack</div>
                    </div>
                    <div class="skill-node arc-node node-resonance" onclick="window.openCharSkillModal('resonance')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.resonance.icon}" onerror="this.src='../images/default.jpg'"><div class="skill-level-badge">10/10</div></div>
                        <div class="skill-node-label">Resonance Skill</div>
                    </div>
                    <div class="skill-node arc-node node-forte" onclick="window.openCharSkillModal('forte')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.forte.icon}" onerror="this.src='../images/default.jpg'"><div class="skill-level-badge">10/10</div></div>
                        <div class="skill-node-label">Forte Circuit</div>
                    </div>
                    <div class="skill-node arc-node node-liberation" onclick="window.openCharSkillModal('liberation')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.liberation.icon}" onerror="this.src='../images/default.jpg'"><div class="skill-level-badge">10/10</div></div>
                        <div class="skill-node-label">Resonance Lib.</div>
                    </div>
                    <div class="skill-node arc-node node-intro" onclick="window.openCharSkillModal('intro')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.intro.icon}" onerror="this.src='../images/default.jpg'"></div>
                        <div class="skill-node-label">Intro Skill</div>
                    </div>
                    <div class="skill-node arc-node node-outro" onclick="window.openCharSkillModal('outro')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.outro.icon}" onerror="this.src='../images/default.jpg'"></div>
                        <div class="skill-node-label">Outro Skill</div>
                    </div>
                </div>
                <div class="char-skills-inherent-wrapper">
                    <div class="skill-node node-inherent" onclick="window.openCharSkillModal('inherent1')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.inherent1.icon}" onerror="this.src='../images/default.jpg'"></div>
                        <div class="skill-node-label">Inherent Skill 1</div>
                    </div>
                    <div class="skill-node node-inherent" onclick="window.openCharSkillModal('inherent2')">
                        <div class="skill-node-circle"><img src="../images/${window.currentCharacterSkills.inherent2.icon}" onerror="this.src='../images/default.jpg'"></div>
                        <div class="skill-node-label">Inherent Skill 2</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let rcHtmlList = '';
    for (let i = 1; i <= 6; i++) {
        let rcName = char[`rc${i}_name`] || `Sequence Node ${i}`;
        let rcDesc = char[`rc${i}_desc`] || `Description for Sequence Node ${i} to be updated.`;
        let rcIcon = char[`rc${i}_icon`] || `rc_default.png`;
        rcHtmlList += `
            <div class="rc-card">
                <div class="rc-icon-ring"><img src="../images/${rcIcon}" onerror="this.src='../images/default.jpg'"></div>
                <div class="rc-info">
                    <div class="rc-title">${rcName}</div>
                    <div class="rc-desc">${rcDesc.replace(/\n/g, '<br>')}</div>
                </div>
            </div>
        `;
    }

    const resonanceChainHtml = `
        <div class="char-rc-container"><div class="char-rc-top">${char.name} Resonance Chain</div><div class="rc-list">${rcHtmlList}</div></div>
    `;

    const skillModalHtml = `
        <div id="skill-modal-overlay" class="skill-modal-overlay" onclick="window.closeCharSkillModal(event)">
            <div class="skill-modal-box" onclick="event.stopPropagation()">
                <div class="skill-modal-close" onclick="window.closeCharSkillModal(event)">×</div>
                <div class="skill-modal-header">
                    <div class="skill-modal-icon-ring"><img id="sm-icon" src="" onerror="this.style.display='none'"></div>
                    <div class="skill-modal-title-group"><h2 id="sm-name">Skill Name</h2><span id="sm-type">Skill Type</span></div>
                </div>
                <div class="skill-modal-body skill-desc" id="sm-desc"></div>
            </div>
        </div>
    `;
    
    display.innerHTML = `
        <div class="char-detail-page" style="padding-top: 20px;">
            <div class="char-detail-content">
                <div class="char-detail-left">
                    <div class="char-arch-bg">
                        <img src="../images/${detailImageName}" onerror="this.src='../images/${char.image_url}'" alt="${char.name}">
                    </div>
                </div>
                <div class="char-detail-right">
                    
                    <div class="detail-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; width: 100%; margin-bottom: 25px;">
                        
                        <div class="detail-title-box" style="flex: 1 1 auto; min-width: 200px;">
                            <h1 style="margin:0; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                ${char.name} <span class="detail-stars">${stars}</span>
                            </h1>
                        </div>
                        
                        <div style="display:flex; align-items:center; gap:12px; flex-wrap: wrap; justify-content: flex-end; flex: 0 0 auto;">
                            <span class="detail-badge">
                                <img src="../images/${weaponImgName}" style="width:20px; height:20px; object-fit:contain;" onerror="this.style.display='none'">
                                ${char.weapon}
                            </span>
                            <span class="detail-badge">
                                <img src="../images/${elementImgName}" style="width:20px; height:20px; object-fit:contain;" onerror="this.style.display='none'">
                                ${char.element}
                            </span>
                            <button id="fav-btn-char-${char.id}" class="favorite-btn" onclick="toggleFavoriteItem('character', ${char.id}, 'fav-btn-char-${char.id}')" title="Favorite">🤍</button>
                        </div>

                    </div>
                    
                    <div class="detail-level-section">
                        <div class="level-label-row">
                            <span>Level</span><span class="level-max" id="char-level-display">90</span>
                        </div>
                        <input type="range" min="1" max="90" value="90" class="level-slider" data-t1="${t1Name}" data-t2="${t2Name}" data-t3="${t3Name}" data-t4="${t4Name}" data-char-name="${char.name}" oninput="updateCharLevel(this.value)">
                    </div>
                    <div class="detail-materials-section">
                        <h3>${char.name} Ascension Materials</h3>
                        <div class="materials-grid">
                            <div class="mat-box"><span class="mat-count" id="mat-count-1">16</span><div class="mat-icon-bg"><img src="../images/${mat1Img}" onerror="this.src='../images/default.jpg'"></div><span class="mat-name">${mat1Name}</span></div>
                            <div class="mat-box"><span class="mat-count" id="mat-count-2">20</span><div class="mat-icon-bg"><img src="../images/${mat2Img}" onerror="this.src='../images/default.jpg'"></div><span class="mat-name">${mat2Name}</span></div>
                            <div class="mat-box"><span class="mat-count" id="mat-count-3">4</span><div class="mat-icon-bg"><img id="mat-img-3" src="../images/${mat3Img}" onerror="this.src='../images/default.jpg'"></div><span class="mat-name" id="mat-name-3">${t4Name}</span></div>
                            <div class="mat-box"><span class="mat-count" id="mat-count-4">80,000</span><div class="mat-icon-bg"><img src="../images/${mat4Img}" onerror="this.src='../images/default.jpg'"></div><span class="mat-name">Shell Credit</span></div>
                        </div>
                    </div>
                    <div class="detail-stats-section">
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_hp.png" class="stat-icon" onerror="this.style.display='none'"> HP (Lv.1 / 90)</span><span class="stat-value">${hpBase.toLocaleString()} <span style="color:#7b848d; font-weight:normal; margin:0 3px;">/</span> ${hpMax.toLocaleString()}</span></div>
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_atk.png" class="stat-icon" onerror="this.style.display='none'"> ATK (Lv.1 / 90)</span><span class="stat-value">${atkBase.toLocaleString()} <span style="color:#7b848d; font-weight:normal; margin:0 3px;">/</span> ${atkMax.toLocaleString()}</span></div>
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_def.png" class="stat-icon" onerror="this.style.display='none'"> DEF (Lv.1 / 90)</span><span class="stat-value">${defBase.toLocaleString()} <span style="color:#7b848d; font-weight:normal; margin:0 3px;">/</span> ${defMax.toLocaleString()}</span></div>
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_crit_rate.png" class="stat-icon" onerror="this.style.display='none'"> Crit. Rate</span><span class="stat-value">5%</span></div>
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_crit_dmg.png" class="stat-icon" onerror="this.style.display='none'"> Crit. DMG</span><span class="stat-value">150%</span></div>
                        <div class="stat-row"><span class="stat-label"><img src="../images/stat_energy_regen.png" class="stat-icon" onerror="this.style.display='none'"> Energy Regen</span><span class="stat-value">100%</span></div>
                    </div>
                </div> 
            </div> 
                    
            <div class="detail-lore-section">
                <h3>Background</h3>
                <p>${char.guide_content}</p>
            </div>

            <div class="detail-rec-weapons-section">
                <h3>Recommended Weapons</h3>
                <div class="rec-weapons-list">
                    <div class="rec-wp-card ${w1 ? 'clickable' : ''}" onclick="goToWeaponDetail(${j1})"><img src="${img1}" class="rec-wp-icon" onerror="this.src='../images/default.jpg'"><div class="rec-wp-info"><span class="rec-wp-name ${c1Class}">${recWp1}</span></div></div>
                    <div class="rec-wp-arrow">&gt;</div>
                    <div class="rec-wp-card ${w2 ? 'clickable' : ''}" onclick="goToWeaponDetail(${j2})"><img src="${img2}" class="rec-wp-icon" onerror="this.src='../images/default.jpg'"><div class="rec-wp-info"><span class="rec-wp-name ${c2Class}">${recWp2}</span></div></div>
                    <div class="rec-wp-arrow">&gt;</div>
                    <div class="rec-wp-card ${w3 ? 'clickable' : ''}" onclick="goToWeaponDetail(${j3})"><img src="${img3}" class="rec-wp-icon" onerror="this.src='../images/default.jpg'"><div class="rec-wp-info"><span class="rec-wp-name ${c3Class}">${recWp3}</span></div></div>
                </div>
            </div>

            <div class="detail-rec-echoes-section">
                <h3>Recommended Echoes</h3>
                ${buildsHtml}
            </div>
            
            ${teamCompsHtml}
            ${bestStatsHtml}
            ${skillsHtml}
            ${resonanceChainHtml}
        </div>
        ${skillModalHtml}
    `;
    
    updateCharLevel(90);

    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;

    if (typeof checkFavoriteUI === 'function') {
        checkFavoriteUI('character', char.id, `fav-btn-char-${char.id}`);
    }
}

function updateCharLevel(newLevel) {
    const levelDisplay = document.getElementById('char-level-display');
    if (levelDisplay) levelDisplay.innerText = newLevel;

    const slider = document.querySelector('.level-slider');
    let t1 = "Tier 1", t2 = "Tier 2", t3 = "Tier 3", t4 = "Tier 4";
    let charName = ""; 
    
    if (slider) {
        t1 = slider.getAttribute('data-t1');
        t2 = slider.getAttribute('data-t2');
        t3 = slider.getAttribute('data-t3');
        t4 = slider.getAttribute('data-t4');
        charName = slider.getAttribute('data-char-name') || ""; 
        const min = slider.min || 1;
        const max = slider.max || 90;
        const percentage = ((newLevel - min) / (max - min)) * 100;
        slider.style.setProperty('--progress', `${percentage}%`);
    }

    let mat1 = 0, mat2 = 0, mat3 = 0, mat4 = 0;
    const lvl = parseInt(newLevel);
    let currentMat3Name = t4; 
    if (lvl < 41) currentMat3Name = t1;
    else if (lvl >= 41 && lvl < 61) currentMat3Name = t2;
    else if (lvl >= 61 && lvl < 81) currentMat3Name = t3;
    else if (lvl >= 81) currentMat3Name = t4;

    const name3Elem = document.getElementById('mat-name-3');
    const img3Elem = document.getElementById('mat-img-3');
    if (name3Elem && img3Elem) {
        name3Elem.innerText = currentMat3Name;
        const newImgPath = '../images/mat_' + currentMat3Name.toLowerCase().trim().replace(/[\s\W]+/g, '_') + '.png';
        img3Elem.src = newImgPath;
    }

    if (lvl < 21) { mat1 = 0; mat2 = 0; mat3 = 0; mat4 = 0; } 
    else if (lvl >= 21 && lvl < 41) { mat1 = 0; mat2 = 0; mat3 = 4; mat4 = 5000; } 
    else if (lvl >= 41 && lvl < 51) { mat1 = 3; mat2 = 4; mat3 = 4; mat4 = 10000; } 
    else if (lvl >= 51 && lvl < 61) { mat1 = 6; mat2 = 8; mat3 = 8; mat4 = 15000; } 
    else if (lvl >= 61 && lvl < 71) { mat1 = 9; mat2 = 12; mat3 = 4; mat4 = 20000; } 
    else if (lvl >= 71 && lvl < 81) { mat1 = 12; mat2 = 16; mat3 = 8; mat4 = 40000; } 
    else if (lvl >= 81) { mat1 = 16; mat2 = 20; mat3 = 4; mat4 = 80000; }

    if (charName.includes("Rover")) {
        if (lvl < 41) mat1 = 0; 
        else mat1 = 1; 
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

function goToWeaponDetail(weaponObj) {
    if (!weaponObj) return; 
    loadModule('weapons', false);
    setTimeout(() => { if (typeof openWeaponPage === 'function') openWeaponPage(weaponObj, true); }, 10);
}

function goToEchoDetail(echoObj) {
    if (!echoObj) return; 
    loadModule('echoes', false);
    setTimeout(() => { if (typeof openEchoPage === 'function') openEchoPage(echoObj, true); }, 10);
}