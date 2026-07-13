async function toggleFavoriteItem(type, id, btnId) {
    try {
        const authRes = await fetch("../php/signin.php?action=check_login");
        const authData = await authRes.json();
        
        if (!authData.logged_in) {
            showFavoriteLoginModal();
            return;
        }

        const response = await fetch("../php/favorites.php?action=toggle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_type: type, item_id: id })
        });
        const result = await response.json();

        const btn = document.getElementById(btnId);
        if (!btn) return;

        if (result.status === "added") {
            btn.innerHTML = "❤️";
            btn.classList.add("active");
        } else if (result.status === "removed") {
            btn.innerHTML = "🤍";
            btn.classList.remove("active");
        }
    } catch (e) {
        console.error(e);
    }
}

async function checkFavoriteUI(type, id, btnId) {
    try {
        const authRes = await fetch("../php/signin.php?action=check_login");
        const authData = await authRes.json();
        if (!authData.logged_in) return; 

        const res = await fetch(`../php/favorites.php?action=check&item_type=${type}&item_id=${id}`);
        const data = await res.json();
        const btn = document.getElementById(btnId);

        if (btn && data.is_favorite) {
            btn.innerHTML = "❤️";
            btn.classList.add("active");
        } else if (btn) {
            btn.innerHTML = "🤍";
            btn.classList.remove("active");
        }
    } catch (e) {
        console.error(e);
    }
}

async function loadModule(moduleName, updateHistory = true) {

    const display = document.getElementById('module-display');
    const title = document.getElementById('module-title');
    const search = document.getElementById('search-container');
    const topHeader = document.getElementById('top-header'); 

    if(!display) return;

    display.innerHTML = "";
    if(search) search.innerHTML = "";

    if (updateHistory) {
        window.history.pushState({ module: moduleName }, "", "#" + moduleName);
    }

    // ⭐ ONLY favorites require login
    if (moduleName === 'favorites') {
        const ok = await checkLoginStatus(true);
        if (!ok) return;
    }

    if (moduleName === 'home') {
        if(topHeader) topHeader.style.display = 'none'; 
        initHomeModule?.();
    } 
    else if (moduleName === 'characters') {
        if(topHeader) topHeader.style.display = 'none'; 
        initCharactersModule?.();
    }
    else if (moduleName === 'weapons') {
        if(topHeader) topHeader.style.display = 'flex'; 
        if(title) title.innerText = "Weapons Info";
        initWeaponsModule?.();
    }
    else if (moduleName === 'echoes') {
        if(topHeader) topHeader.style.display = 'flex'; 
        if(title) title.innerText = "Echoes Database";
        initEchoesModule?.();
    }
    else if (moduleName === 'favorites') {
        if(topHeader) topHeader.style.display = 'none'; 
        initFavoritesModule?.();
    }
    else {
        if(title) title.innerText = "Coming Soon";
        display.innerHTML = `<h2>The ${moduleName} module is currently under development.</h2>`;
    }
}

function closeModal() { 
    const dm = document.getElementById('detailModal');
    if(dm) dm.style.display = "none"; 
}

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.module) {
        const mod = event.state.module;
        if (mod === 'char_detail' && event.state.charData) {
            if(typeof openCharPage === 'function') openCharPage(event.state.charData, false);
        } 
        else if (mod === 'weapon_detail' && event.state.weaponData) {
            if(typeof openWeaponPage === 'function') openWeaponPage(event.state.weaponData, false);
        } 
        else if (mod === 'echo_detail' && event.state.echoData) {
            if(typeof openEchoPage === 'function') openEchoPage(event.state.echoData, false);
        } 
        else {
            loadModule(mod, false);
        }
    } else {
        const hash = window.location.hash.replace('#', '');
        if (hash.startsWith('char_')) loadModule('characters', false);
        else if (hash.startsWith('wp_')) loadModule('weapons', false);
        else if (hash.startsWith('echo_')) loadModule('echoes', false);
        else if (hash) loadModule(hash, false);
    }
});

function showFavoriteLoginModal() {
    const modal = document.getElementById('favorite-login-modal');

    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeFavoriteLoginModal() {
    const modal = document.getElementById('favorite-login-modal');

    if (modal) {
        modal.style.display = 'none';
    }
}

function goToSignIn()
{
    window.location.replace("signin.html");
}

document.addEventListener("DOMContentLoaded", async () => {

    const hash = window.location.hash.replace("#", "");

    if (!hash) {
        loadModule("home", false);
        return;
    }

    try {

        if (hash.startsWith("char_")) {

            const id = hash.replace("char_", "");

            const res = await fetch(
                `../php/api.php?action=get_character&id=${id}`
            );

            const char = await res.json();

            if (char) {
                openCharPage(char, false);
                return;
            }
        }

        if (hash.startsWith("wp_")) {

            const id = hash.replace("wp_", "");

            const res = await fetch(
                `../php/api.php?action=get_weapon&id=${id}`
            );

            const weapon = await res.json();

            if (weapon) {
                openWeaponPage(weapon, false);
                return;
            }
        }

        if (hash.startsWith("echo_")) {

            const id = hash.replace("echo_", "");

            const res = await fetch(
                `../php/api.php?action=get_echo&id=${id}`
            );

            const echo = await res.json();

            if (echo) {
                openEchoPage(echo, false);
                return;
            }
        }

        loadModule(hash, false);

    } catch (err) {

        console.error(err);
        loadModule("home", false);

    }
});

window.addEventListener("pageshow", async () => {

    const res = await fetch(
        "../php/signin.php?action=check_login",
        {
            cache: "no-store",
            credentials: "same-origin"
        }
    );

    const auth = await res.json();

    const favoriteBtn = document.getElementById("favoriteBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const signinBtn = document.getElementById("signinBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (auth.logged_in) {
        favoriteBtn && (favoriteBtn.style.display = "block");
        logoutBtn && (logoutBtn.style.display = "block");
        signinBtn && (signinBtn.style.display = "none");
        registerBtn && (registerBtn.style.display = "none");
    } else {
        favoriteBtn && (favoriteBtn.style.display = "none");
        logoutBtn && (logoutBtn.style.display = "none");
        signinBtn && (signinBtn.style.display = "block");
        registerBtn && (registerBtn.style.display = "block");
    }
});