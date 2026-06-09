const dashboardButtons = [
    { name: "Characters", icon: "home_characters.png", module: "characters" },
    { name: "Echoes", icon: "home_echoes.png", module: "echoes" },
    { name: "Weapons", icon: "home_weapons.png", module: "weapons" },
];

function initHomeModule() {
    const display = document.getElementById('module-display');
    
    let html = `
        <div class="home-container">
            <div class="home-hero-section">
                <h1 class="home-title">Wuthering Waves <span>Database & Wiki</span></h1>
                <p class="home-subtitle">
                The most comprehensive Wuthering Waves Game Guide System on characters, builds,weapons and echoes.
                </p>
                <div class="home-grid">
    `;

    dashboardButtons.forEach(btn => {
        html += `
            <div class="home-card" onclick="loadModule('${btn.module}')">
                <img src="../images/${btn.icon}" onerror="this.src='../images/default.jpg'">
                <span>${btn.name}</span>
            </div>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;
    
    display.innerHTML = html;
}