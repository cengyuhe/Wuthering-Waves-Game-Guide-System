function initEchoesModule() {
    setupEchoControls();
    fetchEchoes();
}

function setupEchoControls() {
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = `
        <div>
            <div class="filter-bar">
                <button class="filter-btn" onclick="fetchEchoes('', '', '')">All Echoes</button>
                <button class="filter-btn" onclick="fetchEchoes('', '4', '')">4 Cost</button>
                <button class="filter-btn" onclick="fetchEchoes('', '3', '')">3 Cost</button>
                <button class="filter-btn" onclick="fetchEchoes('', '1', '')">1 Cost</button>
            </div>
        </div>
        <div style="display:flex;">
            <input type="text" id="echoSearchInput" placeholder="Search echo..." onkeyup="if(event.key==='Enter') searchEchoesAction()">
            <button onclick="searchEchoesAction()">Search</button>
        </div>
    `;
}

function searchEchoesAction() {
    const val = document.getElementById('echoSearchInput').value;
    fetchEchoes(val, '', '');
}

function fetchEchoes(search = '', cost = '', phantom = '') {
    const display = document.getElementById('module-display');
    let grid = document.getElementById('echo-grid');
    
    if (!grid) {
        display.innerHTML = "<div class='card-grid' id='echo-grid'></div>";
        grid = document.getElementById('echo-grid');
    }
    
    grid.innerHTML = "<p style='color:#9da5ad;'>Loading Echoes...</p>";
    
    fetch(`../php/api.php?action=get_echoes&search=${search}&cost=${cost}&phantom=${phantom}`)
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = "";
            if (data.length === 0) {
                grid.innerHTML = "<p style='color:#9da5ad;'>No echoes found.</p>";
                return;
            }
            data.forEach(echo => {
                const echoJson = JSON.stringify(echo).replace(/"/g, '&quot;');
                
                grid.innerHTML += `
                    <div class="card echo" onclick="openEchoDetails(${echoJson})">
                        <img src="../images/${echo.image_url}" onerror="this.src='../images/default_echo.jpg'">
                        <div class="card-info">
                            <h3>${echo.name}</h3>
                            <span class="cost-tag">Cost ${echo.cost}</span>
                        </div>
                    </div>
                `;
            });
        });
}

function openEchoDetails(echo) {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div class="modal-img">
            <img src="../images/${echo.image_url}" onerror="this.src='../images/default_echo.jpg'">
        </div>
        <div class="modal-desc">
            <h1 style="color: #ffcc00">${echo.name}</h1>
            <p class="tag-line">Cost: ${echo.cost} • Sonata: ${echo.sonata_effect}</p>
            <hr>
            <h3>Echo Description</h3>
            <p class="guide-text">${echo.description}</p>
        </div>
    `;
    modal.style.display = "block";
}