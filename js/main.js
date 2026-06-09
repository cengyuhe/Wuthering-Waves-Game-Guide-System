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

function loadModule(moduleName, updateHistory = true) {
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

    if (moduleName === 'home') {
        if(topHeader) topHeader.style.display = 'none'; 
        if(typeof initHomeModule === 'function') initHomeModule(); 
    } 
    else if (moduleName === 'characters') {
        if(topHeader) topHeader.style.display = 'none'; 
        if(typeof initCharactersModule === 'function') initCharactersModule();
    }
    else if (moduleName === 'favorites') {
        if(topHeader) topHeader.style.display = 'none'; 
        if(typeof initFavoritesModule === 'function') initFavoritesModule();
    }
    else {
        if(topHeader) topHeader.style.display = 'flex'; 
        
        if (moduleName === 'weapons') {
            if(title) title.innerText = "Weapons Info";
            if(typeof initWeaponsModule === 'function') initWeaponsModule();
        }
        else if (moduleName === 'echoes') {
            if(title) title.innerText = "Echoes Database";
            if(typeof initEchoesModule === 'function') initEchoesModule();
        }
        else {
            if(title) title.innerText = "Coming Soon";
            display.innerHTML = `<h2>The ${moduleName} module is currently under development.</h2>`;
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
        loadModule(hash, false);
    } else {
        loadModule("home", false);
    }
});