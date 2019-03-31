window.onload = function () {
    gd3d.jsLoader.instance().addImportScript("lib/Reflect.js");
    gd3d.jsLoader.instance().addImportScript("lib/gd3d.js");
    gd3d.jsLoader.instance().addImportScript("lib_user/game.js");
    document.body.style.msUserSelect = "none";
    document.body.style.webkitUserSelect = "none";
    var divLoading = document.createElement("div");
    divLoading.style.position = "absolute";
    divLoading.style.backgroundColor = "#555";
    divLoading.style.width = "100%";
    divLoading.style.height = "100%";
    divLoading.style.zIndex = "10000";
    document.body.appendChild(divLoading);
    var txt = document.createElement("span");
    txt.textContent = "这是一个临时的loader 界面，负责加载初始化脚本";
    divLoading.appendChild(txt);
    divLoading.appendChild(document.createElement("hr"));
    var loadtxt = document.createElement("span");
    divLoading.appendChild(loadtxt);
    gd3d.jsLoader.instance().preload(function () {
        var y = 0;
        var aniid = setInterval(function () {
            y -= 0.05;
            divLoading.style.top = (y * 100).toString() + "%";
            if (y < -1) {
                clearInterval(aniid);
                divLoading.parentNode.removeChild(divLoading);
            }
        }, 50);
        var gdapp = new gd3d.framework.application();
        var div = document.getElementById("drawarea");
        gdapp.start(div, gd3d.framework.CanvasFixedType.Free, 720);
        gdapp.bePlay = true;
        gdapp.addUserCode("main");
    }, function (total, left) {
        loadtxt.textContent = "total js file:" + total + "  还剩多少个:" + left;
    });
    document.onkeydown = function (e) {
        if (e.keyCode == 116) {
            document.location.reload(true);
            e.preventDefault();
        }
    };
};
//# sourceMappingURL=loader.js.map