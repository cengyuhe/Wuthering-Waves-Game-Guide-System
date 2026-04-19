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

// 🌟 监听用户按浏览器的“后退”和“前进”按钮
window.addEventListener('popstate', function(event) {
    if (event.state) {
        // 🌟 新增：如果历史记录是“角色详情页”，并且有角色数据
        if (event.state.module === 'char_detail' && event.state.charData) {
            if (typeof openCharPage === 'function') {
                openCharPage(event.state.charData, false); // false 防止重复写入历史
            }
        } 
        // 否则就是普通的四大模块
        else if (event.state.module) {
            loadModule(event.state.module, false);
        }
    } else {
        loadModule('home', false);
    }
});

// 🌟 网页初始化或按 F5 刷新时的处理
window.onload = () => {
    // 1. 如果浏览器保留了状态（比如你刷新了角色详情页）
    if (window.history.state && window.history.state.module === 'char_detail' && window.history.state.charData) {
        openCharPage(window.history.state.charData, false);
        return;
    }

    const hash = window.location.hash.replace('#', '');
    
    // 2. 如果别人给你发了一个角色链接但没有缓存状态，安全退回到列表页
    if (hash.startsWith('char_')) {
        loadModule('characters', false);
        window.history.replaceState({ module: 'characters' }, "", "#characters");
    } 
    // 3. 正常的模块跳转
    else if (hash) {
        loadModule(hash, false); 
        window.history.replaceState({ module: hash }, "", "#" + hash);
    } 
    // 4. 默认主页
    else {
        loadModule('home', false);
        window.history.replaceState({ module: 'home' }, "", "#home");
    }
};