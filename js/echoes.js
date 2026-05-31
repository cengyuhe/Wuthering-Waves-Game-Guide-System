let activeSonataEffect = 'All';
let sonataDatabase = {};

function initEchoesModule() {
    setupEchoControls();
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
    
    fetch(`../php/api.php?action=get_sonatas`)
        .then(res => res.json())
        .then(data => {
            data.forEach(sonata => {
                let html = '';
                if (sonata.tier1_desc && sonata.tier1_desc.trim() !== '') {
                    html += `${sonata.tier1_req}: ${sonata.tier1_desc}`;
                } else if (sonata.tier1_req && sonata.tier1_req.trim() !== '') {
                    html += `${sonata.tier1_req}: Effect to be updated.`;
                }
                if (sonata.tier2_desc && sonata.tier2_desc.trim() !== '') {
                    if (html !== '') html += '<br>';
                    html += `${sonata.tier2_req}: ${sonata.tier2_desc}`;
                } else if (sonata.tier2_req && sonata.tier2_req.trim() !== '') {
                    if (html !== '') html += '<br>';
                    html += `${sonata.tier2_req}: Effect to be updated.`;
                }
                sonataDatabase[sonata.name.trim()] = html; 
            });
            fetchEchoes();
        })
        .catch(err => fetchEchoes());
}

function setupEchoControls() {
    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    if (topHeader) topHeader.style.display = 'none'; 
    
    const headerHtml = `
        <div class="char-page-header">
            <h2>Wuthering Waves <span>Echoes</span></h2>
            <p>All Echoes and Sonata Effects in Wuthering Waves.</p>
        </div>
        <div class="char-filter-container" style="flex-wrap: wrap;">
            <div class="filter-group" style="flex-grow: 1; min-width: 250px;">
                <label>Search</label>
                <input type="text" id="echoSearchInput" placeholder="Enter echo name" onkeyup="searchEchoesAction()">
            </div>
            <div class="filter-group">
                <label>Cost</label>
                <select id="echoCostSelect" onchange="searchEchoesAction()">
                    <option value="All">All Costs</option>
                    <option value="4">Cost 4</option>
                    <option value="3">Cost 3</option>
                    <option value="1">Cost 1</option>
                </select>
            </div>
            <div class="sonata-filter-group">
                <button class="sonata-btn" onclick="setSonataFilter('Rejuvenating Glow', this)" title="Rejuvenating Glow"><img src="../images/sonata_rejuvenating_glow.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Void Thunder', this)" title="Void Thunder"><img src="../images/sonata_void_thunder.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Lingering Tunes', this)" title="Lingering Tunes"><img src="../images/sonata_lingering_tunes.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Moonlit Clouds', this)" title="Moonlit Clouds"><img src="../images/sonata_moonlit_clouds.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Molten Rift', this)" title="Molten Rift"><img src="../images/sonata_molten_rift.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Sierra Gale', this)" title="Sierra Gale"><img src="../images/sonata_sierra_gale.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Celestial Light', this)" title="Celestial Light"><img src="../images/sonata_celestial_light.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Havoc Eclipse', this)" title="Havoc Eclipse"><img src="../images/sonata_havoc_eclipse.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Freezing Frost', this)" title="Freezing Frost"><img src="../images/sonata_freezing_frost.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Frosty Resolve', this)" title="Frosty Resolve"><img src="../images/sonata_frosty_resolve.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Empyrean Anthem', this)" title="Empyrean Anthem"><img src="../images/sonata_empyrean_anthem.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Midnight Veil', this)" title="Midnight Veil"><img src="../images/sonata_midnight_veil.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Eternal Radiance', this)" title="Eternal Radiance"><img src="../images/sonata_eternal_radiance.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Tidebreaking Courage', this)" title="Tidebreaking Courage"><img src="../images/sonata_tidebreaking_courage.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Dream of the Lost', this)" title="Dream of the Lost"><img src="../images/sonata_dream_of_the_lost.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Flamewing\\'s Shadow', this)" title="Flamewing's Shadow"><img src="../images/sonata_flamewing_s_shadow.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Thread of Severed Fate', this)" title="Thread of Severed Fate"><img src="../images/sonata_thread_of_severed_fate.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Law of Harmony', this)" title="Law of Harmony"><img src="../images/sonata_law_of_harmony.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Crown of Valor', this)" title="Crown of Valor"><img src="../images/sonata_crown_of_valor.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Gusts of Welkin', this)" title="Gusts of Welkin"><img src="../images/sonata_gusts_of_welkin.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Flaming Clawprint', this)" title="Flaming Clawprint"><img src="../images/sonata_flaming_clawprint.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Windward Pilgrimage', this)" title="Windward Pilgrimage"><img src="../images/sonata_windward_pilgrimage.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Halo of Starry Radiance', this)" title="Halo of Starry Radiance"><img src="../images/sonata_halo_of_starry_radiance.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Chromatic Foam', this)" title="Chromatic Foam"><img src="../images/sonata_chromatic_foam.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Pact of Neonlight Leap', this)" title="Pact of Neonlight Leap"><img src="../images/sonata_pact_of_neonlight_leap.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Rite of Gilded Revelation', this)" title="Rite of Gilded Revelation"><img src="../images/sonata_rite_of_gilded_revelation.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Sound of True Name', this)" title="Sound of True Name"><img src="../images/sonata_sound_of_true_name.png" onerror="this.style.display='none'"></button>
                <button class="sonata-btn" onclick="setSonataFilter('Trailblazing Star', this)" title="Trailblazing Star"><img src="../images/sonata_trailblazing_star.png" onerror="this.style.display='none'"></button>
            </div>
        </div>
        <div id='echo-grid'></div>
    `;
    display.innerHTML = headerHtml;
}

function setSonataFilter(sonata, btnElement) {
    if (activeSonataEffect === sonata) {
        activeSonataEffect = 'All';
        btnElement.classList.remove('active');
    } else {
        activeSonataEffect = sonata;
        const btns = document.querySelectorAll('.sonata-btn');
        btns.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    searchEchoesAction();
}

function searchEchoesAction() {
    const search = document.getElementById('echoSearchInput').value;
    const cost = document.getElementById('echoCostSelect').value;
    fetchEchoes(search, cost, activeSonataEffect);
}

function fetchEchoes(search = '', cost = 'All', sonata = 'All') {
    let grid = document.getElementById('echo-grid');
    if (!grid) return;
    
    grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>Loading Database...</p>";
    
    fetch(`../php/api.php?action=get_echoes&search=${search}&cost=${cost}&sonata=${sonata}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                grid.innerHTML = "<p style='text-align:center; width:100%; color:#9da5ad;'>No echoes found.</p>";
                return;
            }
            let htmlContent = "";
            data.forEach(echo => {
                const echoJson = JSON.stringify(echo).replace(/"/g, '&quot;');
                let sonataHtml = `<div class="echo-sonata-list">`;
                const sonataString = echo.sonata_effect || "Various";
                if (sonataString !== "Various" && sonataString !== "") {
                    const sonatas = sonataString.split(',').map(s => s.trim());
                    sonatas.forEach(sonata => {
                        const iconName = 'sonata_' + sonata.toLowerCase().replace(/[\s\W]+/g, '_') + '.png';
                        sonataHtml += `<img class="echo-sonata-icon" src="../images/${iconName}" title="${sonata}" loading="lazy" onerror="this.style.display='none'">`;
                    });
                }
                sonataHtml += `</div>`;

                htmlContent += `
                    <div class="echo-card" onclick="openEchoPage(${echoJson})">
                        ${sonataHtml}
                        <span class="echo-cost-badge">${echo.cost}</span>
                        <img class="echo-main-img" src="../images/${echo.image_url}" loading="lazy" onerror="this.src='../images/default.jpg'">
                        <div class="echo-card-info">
                            <h3>${echo.name}</h3>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = htmlContent;
        });
}

function openEchoPage(echo, updateHistory = true) {
    if (updateHistory) {
        const safeName = echo.name.toLowerCase().replace(/[\s\W]+/g, '_');
        window.history.pushState({ module: 'echo_detail', echoData: echo }, "", "#echo_" + safeName);
    }
    
    const display = document.getElementById('module-display');
    const topHeader = document.getElementById('top-header');
    if (topHeader) topHeader.style.display = 'none';

    let detailSonataHtml = '';
    const sonataString = echo.sonata_effect || "Various";
    
    if (sonataString !== "Various" && sonataString !== "") {
        const sonatas = sonataString.split(',').map(s => s.trim());
        sonatas.forEach(sonata => {
            const iconName = 'sonata_' + sonata.toLowerCase().replace(/[\s\W]+/g, '_') + '.png';
            const sDesc = sonataDatabase[sonata] || `Effect: To be updated.`;
            detailSonataHtml += `
                <div class="echo-detail-sonata-item">
                    <div class="sonata-item-header">
                        <img src="../images/${iconName}" onerror="this.style.display='none'">
                        <span>${sonata}</span>
                    </div>
                    <div class="sonata-item-desc">${sDesc}</div>
                </div>
            `;
        });
    } else {
        detailSonataHtml = `
            <div class="echo-detail-sonata-item">
                <div class="sonata-item-header">
                    <span>Various / Flexible</span>
                </div>
                <div class="sonata-item-desc">Sonata effect to be updated.</div>
            </div>
        `;
    }

    const descText = echo.description || "Echo description and ability details to be updated.";

    display.innerHTML = `
        <div class="echo-detail-container" style="overflow-anchor: none;">
            <div class="echo-detail-content">
                <div class="echo-detail-left">
                    <div class="echo-large-img-box">
                        <img id="echo-main-display-img" 
                             src="../images/${echo.image_url}" 
                             onerror="this.src='../images/default.jpg'" 
                             alt="${echo.name}">
                    </div>
                </div>
                <div class="echo-detail-right">
                    <div class="echo-detail-title-row">
                        <h1>${echo.name}</h1>
                        <div class="echo-detail-cost-badge">${echo.cost} COST</div>
                    </div>
                    <div class="echo-detail-section">
                        <h3>Echo Ability</h3>
                        <div class="echo-desc-text">
                            ${descText.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <div class="echo-detail-section" style="flex-grow: 1;">
                        <h3>Possible Sonata Effects</h3>
                        <div class="echo-detail-sonata-list">
                            ${detailSonataHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 🌟🌟 终极滚动修复：精准锁定 CSS 中的 .main-content 滚动容器！
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
}