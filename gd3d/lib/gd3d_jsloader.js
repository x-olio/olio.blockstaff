var gd3d;
(function (gd3d) {
    var jsLoader = (function () {
        function jsLoader() {
            this.importList = [];
        }
        jsLoader.startApp = function (jscode) {
            console.log("startApp");
            for (var i = 0; i < jscode.length; i++) {
                jsLoader.instance().addImportScript(jscode[i]);
            }
            jsLoader.instance().preload(function () {
                console.log("load all script done.");
            }, function (total, left) {
                console.log("load script:total=" + total + "  left:" + left);
            });
        };
        jsLoader.instance = function () {
            if (!jsLoader._instance) {
                jsLoader._instance = new jsLoader();
            }
            return jsLoader._instance;
        };
        jsLoader.getXHR = function () {
            var xhr = null;
            if (window["XMLHttpRequest"]) {
                xhr = new window["XMLHttpRequest"]();
            }
            else {
                xhr = new ActiveXObject("MSXML2.XMLHTTP");
            }
            return xhr;
        };
        jsLoader.prototype.preload = function (complete, process) {
            var _this = this;
            if (process === void 0) { process = null; }
            this.totaltask = this.importList.length;
            this._process = process;
            this._complete = complete;
            requestAnimationFrame(function () {
                if (_this.importList.length > 0) {
                    _this.startLoadScript(null);
                }
                else {
                    _this.onAllLoadComplete();
                }
            });
        };
        jsLoader.prototype.addImportScript = function (path) {
            path += "?r=" + Math.random();
            this.importList.push(path);
        };
        jsLoader.prototype.onAllLoadComplete = function () {
            if (this._process) {
                this._process(this.totaltask, 0);
            }
            if (this._complete) {
                this.importList = [];
                this._complete();
            }
        };
        jsLoader.prototype.startLoadScript = function (e) {
            var _this = this;
            if (this._process) {
                this._process(this.totaltask, this.importList.length);
            }
            if (this.importList.length > 0) {
                var s = this.importList.shift();
                if (s.toLowerCase().indexOf(".js") >= 0) {
                    var script = document.createElement("script");
                    script.src = s;
                    script.onload = function (e) { return _this.startLoadScript(e); };
                    script.onerror = function (e) { return _this.loadScriptError(e); };
                    document.head.appendChild(script);
                }
                else if (s.toLowerCase().indexOf(".css") >= 0) {
                    var link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = s;
                    link.onload = function (e) { return _this.startLoadScript(e); };
                    link.onerror = function (e) { return _this.loadScriptError(e); };
                    document.head.appendChild(link);
                }
            }
            else {
                console.log("all complete");
                this.onAllLoadComplete();
            }
        };
        jsLoader.prototype.loadScriptError = function (e) {
            var error = "load Script Error \r\n no file:" + e.srcElement.src;
            alert(error);
            this.startLoadScript(null);
        };
        return jsLoader;
    }());
    gd3d.jsLoader = jsLoader;
})(gd3d || (gd3d = {}));
//# sourceMappingURL=gd3d_jsloader.js.map