function initWeaponsModule() {
    setupWeaponControls();
    fetchWeapons();
}

function setupWeaponControls() {
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = `
        <div>
            <div class="filter-bar">
                <button class="filter-btn" onclick="fetchWeapons('', '')">All Types</button>
                <button class="filter-btn" onclick="fetchWeapons('', 'Sword')">Sword</button>
                <button class="filter-btn" onclick="fetchWeapons('', 'Broadblade')">Broadblade</button>
                <button class="filter-btn" onclick="fetchWeapons('', 'Pistols')">Pistols</button>
                <button class="filter-btn" onclick="fetchWeapons('', 'Gauntlets')">Gauntlets</button>
                <button class="filter-btn" onclick="fetchWeapons('', 'Rectifier')">Rectifier</button>
            </div>
        </div>
        <div style="display:flex;">
            <input type="text" id="weaponSearchInput" placeholder="Search weapon..." onkeyup="if(event.key==='Enter') searchWeaponsAction()">
            <button onclick="searchWeaponsAction()">Search</button>
        </div>
    `;
}

function searchWeaponsAction() {
    const val = document.getElementById('weaponSearchInput').value;
    fetchWeapons(val, '');
}

function fetchWeapons(search = '', type = '') {
    const display = document.getElementById('module-display');
    let grid = document.getElementById('weapon-grid');
    
    if (!grid) {
        display.innerHTML = "<div class='card-grid' id='weapon-grid'></div>";
        grid = document.getElementById('weapon-grid');
    }
    
    grid.innerHTML = "<p style='color:#9da5ad;'>Loading Weapons...</p>";
    
    fetch(`../php/api.php?action=get_weapons&search=${search}&type=${type}`)
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = "";
            if (data.length === 0) {
                grid.innerHTML = "<p style='color:#9da5ad;'>No weapons found.</p>";
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
                    <div class="card ${rarityClass}" onclick="openWeaponDetails(${weaponJson})">
                        <img src="../images/${weapon.image_url}" onerror="this.src='../images/default_weapon.jpg'">
                        <div class="card-info">
                            <h3>${weapon.name}</h3>
                            <span class="element-tag">${weapon.type}</span>
                        </div>
                    </div>
                `;
            });
        });
}

function openWeaponDetails(weapon) {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    const stars = '⭐'.repeat(weapon.rarity);
    
    body.innerHTML = `
        <div class="modal-img">
            <img src="../images/${weapon.image_url}" onerror="this.src='../images/default_weapon.jpg'">
        </div>
        <div class="modal-desc">
            <h1>${weapon.name} <small style="font-size: 0.5em;">${stars}</small></h1>
            <p class="tag-line">${weapon.type} • Main Stat: ${weapon.main_stat}</p>
            <hr>
            <h3>Effect</h3>
            <p class="guide-text">${weapon.description}</p>
        </div>
    `;
    modal.style.display = "block";
}