async function initFavoritesModule() {
    const display = document.getElementById('module-display');
    display.innerHTML = "<p style='text-align:center; color:#9da5ad; padding-top: 50px;'>Loading your favorites...</p>";

    try {
        const authRes = await fetch("../php/signin.php?action=check_login");
        const authData = await authRes.json();
        
        if (!authData.logged_in) {
            display.innerHTML = `
                <div class="fav-message-container">
                    <h2>Please Sign In to view your favorites.</h2>
                    <button onclick="window.location.href='signin.html'" class="fav-login-btn">Sign In Now</button>
                </div>`;
            return;
        }

        const favRes = await fetch("../php/favorites.php?action=get_all");
        const favorites = await favRes.json();

        if (favorites.length === 0) {
             display.innerHTML = `
                <div class="fav-message-container">
                    <h2>Your Favorites list is empty.</h2>
                    <p>Click the 🤍 Add Favorite button to save items here!</p>
                </div>`;
             return;
        }

        const [charsRes, wpRes, echoesRes] = await Promise.all([
            fetch("../php/api.php?action=get_characters&search=&element=&rarity=All&weapon=Any").then(r => r.json()),
            fetch("../php/api.php?action=get_weapons").then(r => r.json()),
            fetch("../php/api.php?action=get_echoes").then(r => r.json())
        ]);

        let html = `
            <div class="fav-page-header">
                <h2>My <span>Favorites</span></h2>
                <p>All your saved Characters, Weapons, and Echoes.</p>
            </div>
            <div class="fav-grid">
        `;

        favorites.forEach(fav => {
            if (fav.item_type === 'character') {
                const char = charsRes.find(c => c.id == fav.item_id);
                if (char) {
                    let rClass = char.rarity == 5 ? 'gold' : 'purple';
                    const jData = JSON.stringify(char).replace(/"/g, '&quot;');
                    
                    let avatarSrc = (char.team_icon_url && char.team_icon_url.trim() !== '') ? char.team_icon_url : char.image_url;

                    html += `
                        <div class="fav-card ${rClass}" onclick="openCharPage(${jData})">
                            <div class="fav-img-wrapper">
                                <img src="../images/${avatarSrc}" class="fav-circle-img" onerror="this.src='../images/default.jpg'">
                            </div>
                            <div class="fav-info">
                                <h3>${char.name}</h3>
                                <span style="color: ${char.rarity == 5 ? '#ffcc00' : '#a335ee'};">Character</span>
                            </div>
                        </div>`;
                }
            } else if (fav.item_type === 'weapon') {
                const wp = wpRes.find(w => w.id == fav.item_id);
                if (wp) {
                    let rClass = wp.rarity == 5 ? 'gold' : (wp.rarity == 4 ? 'purple' : 'blue');
                    const jData = JSON.stringify(wp).replace(/"/g, '&quot;');
                    
                    html += `
                        <div class="fav-card ${rClass}" onclick="openWeaponPage(${jData})">
                            <div class="fav-img-wrapper">
                                <img src="../images/${wp.image_url}" class="fav-weapon-img" onerror="this.src='../images/default.jpg'">
                            </div>
                            <div class="fav-info">
                                <h3>${wp.name}</h3>
                                <span>Weapon</span>
                            </div>
                        </div>`;
                }
            } else if (fav.item_type === 'echo') {
                const echo = echoesRes.find(e => e.id == fav.item_id);
                if (echo) {
                    const jData = JSON.stringify(echo).replace(/"/g, '&quot;');
                    
                    html += `
                        <div class="fav-card echo" onclick="openEchoPage(${jData})">
                            <div class="fav-img-wrapper">
                                <img src="../images/${echo.image_url}" class="fav-circle-img" onerror="this.src='../images/default.jpg'">
                            </div>
                            <div class="fav-info">
                                <h3>${echo.name}</h3>
                                <span style="color: #8c9eff;">Echo (${echo.cost} Cost)</span>
                            </div>
                        </div>`;
                }
            }
        });

        html += `</div>`;
        display.innerHTML = html;

    } catch (error) {
        console.error(error);
        display.innerHTML = "<p style='text-align:center; color:#ff4d4d;'>Error loading favorites.</p>";
    }
}
