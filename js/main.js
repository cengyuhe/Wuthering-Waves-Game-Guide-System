function loadModule(moduleName, updateHistory = true) {
    const display = document.getElementById('module-display');
    const title = document.getElementById('module-title');
    const search = document.getElementById('search-container');
    const topHeader = document.getElementById('top-header'); 
    
    display.innerHTML = "";
    search.innerHTML = "";

    if (updateHistory) {
        window.history.pushState({ module: moduleName }, "", "#" + moduleName);
    }

    if (moduleName === 'home') {
        topHeader.style.display = 'none'; 
        initHomeModule(); 
    } 
    else if (moduleName === 'characters') {
        topHeader.style.display = 'none'; 
        initCharactersModule();
    }
    else {
        topHeader.style.display = 'flex'; 
        
        if (moduleName === 'weapons') {
            title.innerText = "Weapons Info";
            initWeaponsModule();
        }
        else if (moduleName === 'echoes') {
            title.innerText = "Echoes Database";
            initEchoesModule();
        }
        else if (moduleName === 'map') {
            title.innerText = "Interactive Map";
            display.innerHTML = "<h2>Map Module is under development.</h2>";
        }
        else {
            title.innerText = "Coming Soon";
            display.innerHTML = `<h2>The ${moduleName} module is currently under development.</h2>`;
        }
    }
}

function closeModal() { 
    document.getElementById('detailModal').style.display = "none"; 
}

window.addEventListener('popstate', function(event) {
    if (event.state) {
        if (event.state.module === 'char_detail' && event.state.charData) {
            if (typeof openCharPage === 'function') {
                openCharPage(event.state.charData, false); 
            }
        } 
        else if (event.state.module === 'weapon_detail' && event.state.weaponData) {
            if (typeof openWeaponPage === 'function') {
                openWeaponPage(event.state.weaponData, false);
            }
        }
        else if (event.state.module) {
            loadModule(event.state.module, false);
        }
    } else {
        loadModule('home', false);
    }
});

window.onload = () => {
    if (window.history.state && window.history.state.module === 'char_detail' && window.history.state.charData) {
        openCharPage(window.history.state.charData, false);
        return;
    }
    if (window.history.state && window.history.state.module === 'weapon_detail' && window.history.state.weaponData) {
        openWeaponPage(window.history.state.weaponData, false);
        return;
    }

    const hash = window.location.hash.replace('#', '');

    if (hash.startsWith('char_')) {
        loadModule('characters', false);
        window.history.replaceState({ module: 'characters' }, "", "#characters");
    } 
    else if (hash.startsWith('wp_')) {
        loadModule('weapons', false);
        window.history.replaceState({ module: 'weapons' }, "", "#weapons");
    }
    else if (hash) {
        loadModule(hash, false); 
        window.history.replaceState({ module: hash }, "", "#" + hash);
    } 
    else {
        loadModule('home', false);
        window.history.replaceState({ module: 'home' }, "", "#home");
    }
};