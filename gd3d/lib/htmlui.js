var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var lighttool;
(function (lighttool) {
    var htmlui;
    (function (htmlui) {
        var ContextMenu = (function () {
            function ContextMenu(name) {
                this.show = false;
                this.node = null;
                this.menu = document.querySelector("[id='" + name + "']");
                if (this.menu == null) {
                    this.menu = document.createElement("menu");
                    this.menu.id = name;
                    this.menu.classList.add('menu');
                    document.body.appendChild(this.menu);
                }
            }
            ContextMenu.prototype.clear = function () {
                var length = this.menu.children.length;
                for (var i = length - 1; i >= 0; i--) {
                    this.menu.children[i].remove();
                }
            };
            ContextMenu.prototype.addItem = function (path, fun) {
                var _this = this;
                if (fun === void 0) { fun = function (node) { }; }
                var preItem = this.menu.querySelector("[id='" + path + "']");
                if (preItem != null) {
                    if (fun != null) {
                        var _btn = preItem.querySelector(".menu-btn");
                        _btn.onclick = function (ev) {
                            ev.stopPropagation();
                            if (preItem.classList.contains("disabled"))
                                return;
                            fun(_this.node);
                            _this.hideMenu();
                        };
                    }
                    return;
                }
                var _item = this.createItem(path, fun);
                while (path.indexOf("/") > 0) {
                    var _index = path.lastIndexOf("/");
                    path = path.substring(0, _index);
                    var menu = void 0;
                    var _parentItem = this.menu.querySelector("[id='" + path + "']");
                    if (_parentItem != null) {
                        if (_parentItem.classList.contains("submenu")) {
                            menu = _parentItem.querySelector("menu");
                        }
                        else {
                            _parentItem.classList.add("submenu");
                            menu = document.createElement("menu");
                            menu.classList.add('menu');
                            _parentItem.appendChild(menu);
                        }
                        menu.appendChild(_item);
                        return;
                    }
                    else {
                        _parentItem = this.createItem(path);
                        _parentItem.classList.add("submenu");
                        menu = document.createElement("menu");
                        menu.classList.add('menu');
                        _parentItem.appendChild(menu);
                        menu.appendChild(_item);
                        _item = _parentItem;
                    }
                }
                this.menu.appendChild(_item);
            };
            ContextMenu.prototype.createItem = function (path, fun) {
                var _this = this;
                if (fun === void 0) { fun = function (node) { }; }
                var _index = path.lastIndexOf("/");
                var _name = path.substring(_index + 1);
                var item = document.createElement("li");
                item.id = path;
                item.classList.add("menu-item");
                var btn = document.createElement("button");
                btn.classList.add("menu-btn");
                if (fun != null) {
                    btn.onclick = function (ev) {
                        ev.stopPropagation();
                        if (item.classList.contains("disabled"))
                            return;
                        fun(_this.node);
                        _this.hideMenu();
                    };
                }
                item.appendChild(btn);
                var span = document.createElement("span");
                span.classList.add("menu-text");
                span.innerText = _name;
                btn.appendChild(span);
                return item;
            };
            ContextMenu.prototype.addLine = function () {
                var line = document.createElement("li");
                line.classList.add("menu-separator");
                this.menu.appendChild(line);
            };
            ContextMenu.prototype.disableItem = function (path) {
                var item = document.getElementById(path);
                if (item == null)
                    return;
                item.classList.add("disabled");
            };
            ContextMenu.prototype.enableItem = function (path) {
                var item = document.getElementById(path);
                if (item == null)
                    return;
                item.classList.remove("disabled");
            };
            ContextMenu.prototype.showMenu = function (x, y, node) {
                this.menu.style.left = x + 'px';
                this.menu.style.top = y + 'px';
                this.menu.classList.add('show-menu');
                this.node = node;
                this.show = true;
            };
            ContextMenu.prototype.hideMenu = function () {
                this.menu.classList.remove('show-menu');
                this.show = false;
                this.node = null;
            };
            return ContextMenu;
        }());
        htmlui.ContextMenu = ContextMenu;
    })(htmlui = lighttool.htmlui || (lighttool.htmlui = {}));
})(lighttool || (lighttool = {}));
var lighttool;
(function (lighttool) {
    var htmlui;
    (function (htmlui) {
        var listBox = (function () {
            function listBox(parent) {
                this.onSelectItem = null;
                this.selectItem = null;
                this.txtArea = document.createElement("div");
                this.txtArea.className = "full";
                this.txtArea.style.overflow = "auto";
                this.txtArea.style.overflowX = "hidden";
                this.txtArea.style.overflowY = "auto";
                this.txtArea["inv"] = this;
                if (parent instanceof htmlui.panel) {
                    parent.divContent.textContent = "";
                    parent.divContent.appendChild(this.txtArea);
                }
                else {
                    parent.textContent = "";
                    parent.appendChild(this.txtArea);
                }
            }
            listBox.prototype.addLine = function (string, color, tag) {
                var _this = this;
                if (color === void 0) { color = "#fff"; }
                if (tag === void 0) { tag = null; }
                var div = document.createElement("div");
                div.style.position = "relative";
                div.style.overflow = "inherit";
                div.style.cssFloat = "bottom";
                div.style.cursor = "default";
                div.style.width = "100%";
                div.style.right = "0px";
                var doc = document.createElement("a");
                doc.text = string;
                doc.style.color = color;
                doc.style.position = "relative";
                doc.style.cssFloat = "bottom";
                doc.style.cursor = "default";
                doc.style.width = "100%";
                doc.style.right = "0px";
                div.appendChild(doc);
                this.txtArea.appendChild(div);
                div["tag"] = tag;
                div.onclick = function () {
                    if (_this.selectItem != null) {
                        _this.selectItem.style.background = "transparent";
                    }
                    _this.onSelect(div);
                    if (_this.selectItem != null) {
                        _this.selectItem.style.background = "#aaa";
                    }
                };
            };
            listBox.prototype.clear = function () {
                this.selectItem = null;
                for (var i = this.txtArea.children.length - 1; i >= 0; i--) {
                    this.txtArea.removeChild(this.txtArea.children[i]);
                }
            };
            listBox.prototype.onSelect = function (div) {
                this.selectItem = div;
                if (this.onSelectItem != null) {
                    this.onSelectItem(div.firstElementChild.text, div["tag"]);
                }
            };
            return listBox;
        }());
        htmlui.listBox = listBox;
    })(htmlui = lighttool.htmlui || (lighttool.htmlui = {}));
})(lighttool || (lighttool = {}));
var lighttool;
(function (lighttool) {
    var htmlui;
    (function (htmlui) {
        var ItemInfo = (function () {
            function ItemInfo() {
                this.listE = [];
                this.indexE = 0;
                this.dataE = [];
            }
            return ItemInfo;
        }());
        htmlui.ItemInfo = ItemInfo;
        var guiframework = (function () {
            function guiframework(div) {
                this.listLine = [];
                this.indexLine = 0;
                this.container = [];
                this.mapItemInfo = {};
                this.resetall = false;
                this.needUpdate = false;
                this.inUpdate = false;
                this.divParent = div;
            }
            guiframework.prototype.calcColString = function () {
                var tag = "R" + this.indexLine;
                for (var i = 0; i < this.container.length; i++) {
                    tag += this.container[i].name + this.container[i].index;
                }
                return tag;
            };
            guiframework.prototype.begin = function () {
                for (var key in this.mapItemInfo) {
                    this.mapItemInfo[key].indexE = 0;
                }
                this.indexLine = 0;
                this.resetall = false;
                this.container.length = 0;
            };
            guiframework.prototype.end = function () {
                for (var key in this.mapItemInfo) {
                    var item = this.mapItemInfo[key];
                    for (var i = item.indexE; i < item.listE.length; i++) {
                        var e = item.listE[i];
                        this.remove(e);
                    }
                    item.listE.length = item.indexE;
                    item.dataE.length = item.indexE;
                }
                for (var i = this.indexLine; i < this.listLine.length; i++) {
                    var e = this.listLine[i];
                    e.parentNode.removeChild(e);
                }
                this.listLine.length = this.indexLine;
            };
            guiframework.prototype.remove = function (e) {
                if (e.parentNode != null)
                    e.parentNode.removeChild(e);
            };
            guiframework.prototype.addElem = function (e) {
                var reset = false;
                var cols = this.calcColString();
                var resetline = false;
                var parent = this.listLine[this.indexLine];
                if (this.container.length > 0) {
                    var c = this.container[this.container.length - 1];
                    resetline = c.resetall;
                    parent = c.getItemParent(c.index);
                }
                if (this.resetall || resetline || e.parentNode != parent || e["col"] != cols) {
                    reset = true;
                }
                if (reset) {
                    if (this.container.length > 0)
                        this.container[this.container.length - 1].resetall = true;
                    else
                        this.resetall = true;
                    if (e.parentNode != null)
                        e.parentNode.removeChild(e);
                }
                e["col"] = cols;
                if (this.container.length > 0) {
                    if (reset) {
                        this.container[this.container.length - 1].add(e);
                        this.container[this.container.length - 1].fix(e);
                    }
                    else {
                        this.container[this.container.length - 1].index++;
                    }
                }
                else {
                    if (this.listLine.length <= this.indexLine) {
                        var divv = document.createElement("div");
                        this.listLine.push(divv);
                        divv.style.width = "100%";
                        divv.style.height = "auto";
                        divv.style.overflow = "hidden";
                        this.divParent.appendChild(divv);
                    }
                    if (reset) {
                        this.listLine[this.indexLine].appendChild(e);
                    }
                    this.indexLine++;
                }
            };
            guiframework.prototype.beginLayout = function (cachename, layoutCtor, cssname, cssext) {
                var _this = this;
                var layout = null;
                var item = this.add(cachename, function () {
                    var p = _this.container.length > 0 ? _this.container[_this.container.length - 1] : _this;
                    layout = layoutCtor(p);
                    layout.dom["container"] = layout;
                    return layout.dom;
                }, "", null);
                if (this.container.length == 0) {
                    this.indexLine--;
                }
                else {
                    var c = this.container[this.container.length - 1];
                    c.index--;
                }
                if (layout == null)
                    layout = item["container"];
                if (item.className != cssname) {
                    item.className = cssname;
                }
                if (null != cssext) {
                    for (var key in cssext) {
                        var src = cssext[key];
                        if (guiframework.mapStyle[src] != null)
                            src = guiframework.mapStyle[src];
                        if (item.style[key] != src) {
                            item.style[key] = src;
                            var result = item.style[key];
                            if (result != src) {
                                guiframework.mapStyle[src] = result;
                            }
                        }
                    }
                }
                this.container.push(layout);
                layout.begin();
            };
            guiframework.prototype.endLayout = function () {
                this.container.pop().end();
                if (this.container.length == 0) {
                    this.indexLine++;
                }
                else {
                    this.container[this.container.length - 1].index++;
                }
            };
            guiframework.prototype.add = function (cachename, domctor, cssname, cssext) {
                if (this.mapItemInfo[cachename] == null) {
                    this.mapItemInfo[cachename] = new ItemInfo();
                }
                var type = this.mapItemInfo[cachename];
                if (type.listE.length <= type.indexE) {
                    {
                        var e = domctor();
                        if (this.container.length > 0) {
                            this.container[this.container.length - 1].fix(e);
                        }
                        type.listE.push(e);
                    }
                    type.dataE.push(null);
                }
                var e = type.listE[type.indexE];
                if (e.className != cssname) {
                    e.className = cssname;
                    e.children[0].className = cssname;
                }
                if (null != cssext) {
                    for (var key in cssext) {
                        var src = cssext[key];
                        if (guiframework.mapStyle[src] != null)
                            src = guiframework.mapStyle[src];
                        if (e.style[key] != src) {
                            e.style[key] = src;
                            var result = e.style[key];
                            if (result != src) {
                                guiframework.mapStyle[src] = result;
                            }
                        }
                    }
                }
                else if (e["resetcss"] != null) {
                    for (var key in e["resetcss"]) {
                        var src = e["resetcss"][key];
                        if (e.style[key] != src) {
                            e.style[key] = src;
                        }
                    }
                }
                this.addElem(e);
                type.indexE++;
                return e;
            };
            guiframework.prototype.update = function () {
                var _this = this;
                if (this.inUpdate) {
                    this.needUpdate = true;
                    return;
                }
                this.begin();
                this.inUpdate = true;
                if (this.onchange != null)
                    this.onchange.call(null);
                this.inUpdate = false;
                this.end();
                if (this.needUpdate == true) {
                    this.needUpdate = false;
                    setTimeout(function () {
                        _this.update();
                    }, 1);
                }
            };
            return guiframework;
        }());
        guiframework.mapStyle = {};
        htmlui.guiframework = guiframework;
        var HLayout = (function () {
            function HLayout(parent) {
                this.parent = null;
                this.dom = null;
                this.name = "h";
                this.index = 0;
                this.resetall = false;
                var divv = document.createElement("div");
                divv.style.width = "auto";
                divv.style.height = "auto";
                divv.style.overflow = "hidden";
                divv["resetcss"] =
                    {
                        "left": "",
                        "position": "",
                        "bottom": "",
                        "height": "auto",
                        "width": "auto",
                        "top": "",
                        "overflow": "hidden",
                        "overflowX": "",
                        "overflowY": "",
                    };
                this.parent = parent;
                this.dom = divv;
            }
            HLayout.prototype.add = function (e) {
                if (e.parentNode != null)
                    e.parentNode.removeChild(e);
                this.dom.appendChild(e);
                this.fix(e);
                this.index++;
            };
            HLayout.prototype.getItemParent = function (index) {
                return this.dom;
            };
            HLayout.prototype.begin = function () {
                this.index = 0;
                this.resetall = false;
            };
            HLayout.prototype.end = function () {
                for (var i = 0; i < this.dom.children.length; i++) {
                    if (i < this.index)
                        this.dom.children[i].hidden = false;
                    else
                        this.dom.children[i].hidden = true;
                }
            };
            HLayout.prototype.fix = function (e) {
                e.style.cssFloat = "left";
            };
            return HLayout;
        }());
        htmlui.HLayout = HLayout;
        var VLayout = (function () {
            function VLayout(parent) {
                this.parent = null;
                this.dom = null;
                this.name = "h";
                this.index = 0;
                this.listLine = [];
                this.resetall = false;
                var divv = document.createElement("div");
                divv.style.width = "auto";
                divv.style.height = "auto";
                divv.style.overflow = "hidden";
                divv["resetcss"] =
                    {
                        "left": "",
                        "position": "",
                        "bottom": "",
                        "height": "auto",
                        "width": "auto",
                        "top": "",
                        "overflow": "hidden",
                        "overflowX": "",
                        "overflowY": "",
                    };
                this.parent = parent;
                this.dom = divv;
            }
            VLayout.prototype.add = function (e) {
                if (e.parentNode != null)
                    e.parentNode.removeChild(e);
                if (this.index <= this.listLine.length) {
                    var div = document.createElement("div");
                    this.listLine.push(div);
                    this.dom.appendChild(div);
                }
                this.listLine[this.index].appendChild(e);
                this.fix(e);
                this.index++;
            };
            VLayout.prototype.getItemParent = function (index) {
                return this.listLine[index];
            };
            VLayout.prototype.begin = function () {
                this.index = 0;
                this.resetall = false;
            };
            VLayout.prototype.end = function () {
                for (var i = 0; i < this.listLine.length; i++) {
                    if (i < this.index)
                        this.listLine[i].hidden = false;
                    else
                        this.listLine[i].hidden = true;
                }
            };
            VLayout.prototype.fix = function (e) {
                e.style.cssFloat = "";
            };
            return VLayout;
        }());
        htmlui.VLayout = VLayout;
        var gui = (function (_super) {
            __extends(gui, _super);
            function gui() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            gui.prototype.beginLayout_H = function (cssname, cssext) {
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                this.beginLayout("_h", function (parent) {
                    return new HLayout(parent);
                }, cssname, cssext);
            };
            gui.prototype.beginLayout_V = function (cssname, cssext) {
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                this.beginLayout("_v", function (parent) {
                    return new VLayout(parent);
                }, cssname, cssext);
            };
            gui.prototype.add_Space = function (width, height) {
                if (width === void 0) { width = 16; }
                if (height === void 0) { height = 16; }
                var a_ctor = function () {
                    var div = document.createElement("div");
                    return div;
                };
                var e = this.add("_space", a_ctor, "", null);
                if (e.style.width != width + "px") {
                    e.style.width = width + "px";
                }
                if (e.style.height != height + "px") {
                    e.style.height = height + "px";
                }
            };
            gui.prototype.add_A = function (text, href, cssname, cssext) {
                if (href === void 0) { href = ""; }
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var a_ctor = function () {
                    var div = document.createElement("div");
                    div.appendChild(document.createElement("a"));
                    return div;
                };
                var e = this.add("_a", a_ctor, cssname, cssext).children[0];
                if (e.text != text)
                    e.text = text;
                if (href != e.href) {
                    {
                        e.href = href;
                        e.target = "_blank";
                    }
                }
            };
            gui.prototype.add_P = function (text, cssname, cssext) {
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var a_ctor = function () {
                    var div = document.createElement("p");
                    return div;
                };
                var e = this.add("_p", a_ctor, cssname, cssext);
                if (e.innerText != text)
                    e.innerText = text;
            };
            gui.prototype.add_Span = function (text, cssname, cssext) {
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var a_ctor = function () {
                    var div = document.createElement("span");
                    return div;
                };
                var e = this.add("_p", a_ctor, cssname, cssext);
                if (e.innerText != text)
                    e.innerText = text;
            };
            gui.prototype.add_Img = function (src, cssname, cssext) {
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var a_ctor = function () {
                    var div = document.createElement("img");
                    div.style.width = "128px";
                    div.style.height = "128px";
                    div["resetcss"] =
                        {
                            "height": "128px",
                            "width": "128px",
                        };
                    div.draggable = false;
                    return div;
                };
                var e = this.add("_img", a_ctor, cssname, cssext);
                if (e.src != src)
                    e.src = src;
            };
            gui.prototype.add_Textbox = function (text, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () { return document.createElement("input"); };
                var e = this.add("_text", btn_ctor, cssname, cssext);
                var index = this.mapItemInfo["_text"].indexE - 1;
                e.oninput = function (ev) {
                    _this.update();
                };
                if (this.mapItemInfo["_text"].dataE[index] != text) {
                    this.mapItemInfo["_text"].dataE[index] = text;
                    e.value = text;
                }
                if (e.value != text) {
                    this.update();
                }
                return e.value;
            };
            gui.prototype.add_Passbox = function (text, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () {
                    var i = document.createElement("input");
                    i.type = "password";
                    return i;
                };
                var cachename = "_textpass";
                var e = this.add(cachename, btn_ctor, cssname, cssext);
                var index = this.mapItemInfo[cachename].indexE - 1;
                e.oninput = function (ev) {
                    _this.update();
                };
                if (this.mapItemInfo[cachename].dataE[index] != text) {
                    this.mapItemInfo[cachename].dataE[index] = text;
                    e.value = text;
                }
                if (e.value != text) {
                    this.update();
                }
                return e.value;
            };
            gui.prototype.add_Checkbox = function (text, checked, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () {
                    var div = document.createElement("div");
                    var i = document.createElement("input");
                    i.type = "checkbox";
                    div.appendChild(i);
                    div.appendChild(document.createElement("a"));
                    return div;
                };
                var cachename = "_checkbox";
                var e2 = this.add(cachename, btn_ctor, cssname, cssext);
                var e = e2.children[0];
                var t = e2.children[1];
                var index = this.mapItemInfo[cachename].indexE - 1;
                e.onchange = function (ev) {
                    _this.update();
                };
                if (t.text != text)
                    t.text = text;
                if (this.mapItemInfo[cachename].dataE[index] != checked) {
                    this.mapItemInfo[cachename].dataE[index] = checked;
                    e.checked = checked;
                }
                if (e.checked != checked) {
                    this.update();
                }
                return e.checked;
            };
            gui.prototype.add_Button = function (text, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () { return document.createElement("button"); };
                var cachename = "_button";
                var e = this.add(cachename, btn_ctor, cssname, cssext);
                var index = this.mapItemInfo[cachename].indexE - 1;
                e.onclick = function () {
                    _this.mapItemInfo[cachename].dataE[index] = 1;
                    _this.update();
                };
                if (e.textContent != text)
                    e.textContent = text;
                var i = this.mapItemInfo[cachename].dataE[index];
                if (i > 0) {
                    this.mapItemInfo[cachename].dataE[index] = 0;
                }
                return i > 0;
            };
            gui.prototype.add_DragFile = function (cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var div_ctor = function () {
                    var div = document.createElement("div");
                    div.style.height = "32px";
                    div.style.width = "96px";
                    div.style.border = "4px dotted #fff";
                    div.style.borderColor = "#fff";
                    return div;
                };
                var cachename = "_dragfile";
                var div = this.add(cachename, div_ctor, cssname, cssext);
                var index = this.mapItemInfo[cachename].indexE - 1;
                div.ondragenter = function (e) {
                    div.style.backgroundColor = "#33a";
                    e.stopPropagation();
                    e.preventDefault();
                };
                div.ondragleave = function () {
                    div.style.backgroundColor = "transparent";
                };
                div.ondragover = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                };
                div.ondrop = function (e) {
                    div.style.backgroundColor = "transparent";
                    var fs = e.dataTransfer.files;
                    _this.mapItemInfo[cachename].dataE[index] = fs;
                    e.stopPropagation();
                    e.preventDefault();
                    _this.update();
                };
                var data = this.mapItemInfo[cachename].dataE[index];
                if (data != null) {
                    this.mapItemInfo[cachename].dataE[index] = null;
                }
                return data;
            };
            gui.prototype.add_ButtonBigImage = function (text, imgurl, select, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () {
                    var div = document.createElement("div");
                    div.style.width = "100px";
                    div.style.height = "88px";
                    var i = document.createElement("img");
                    i.style.position = "relative";
                    i.draggable = false;
                    i.style.width = 64 + "px";
                    i.style.height = 64 + "px";
                    i.style.left = "16px";
                    div.appendChild(i);
                    i.onmousedown = function () {
                        i.style.backgroundColor = "#aaa";
                    };
                    i.onmouseup = function () {
                        i.style.backgroundColor = "transparent";
                    };
                    var t = document.createElement("div");
                    t.style.position = "relative";
                    t.style.width = "100px";
                    t.style.height = "24px";
                    t.style.top = "0px";
                    t.style.left = "0px";
                    t.style.textAlign = "center";
                    div.appendChild(t);
                    var a = document.createElement("a");
                    a.style.lineHeight = "24px";
                    t.appendChild(a);
                    return div;
                };
                var cachename = "_buttonbigimage";
                var e2 = this.add(cachename, btn_ctor, cssname, cssext);
                var e = e2.children[0];
                var t = e2.children[1].childNodes[0];
                if (e.src != imgurl)
                    e.src = imgurl;
                if (t.text != text)
                    t.text = text;
                if (select) {
                    t.style.background = "#faa";
                }
                else {
                    t.style.background = "transparent";
                }
                var index = this.mapItemInfo[cachename].indexE - 1;
                e.onclick = function () {
                    _this.mapItemInfo[cachename].dataE[index] = 1;
                    _this.update();
                };
                if (e.textContent != text)
                    e.textContent = text;
                var i = this.mapItemInfo[cachename].dataE[index];
                if (i > 0) {
                    this.mapItemInfo[cachename].dataE[index] = 0;
                }
                return i > 0;
            };
            gui.prototype.add_ButtonSmallImage = function (text, imgurl, select, cssname, cssext) {
                var _this = this;
                if (cssname === void 0) { cssname = ""; }
                if (cssext === void 0) { cssext = null; }
                var btn_ctor = function () {
                    var div = document.createElement("div");
                    div.style.width = "auto";
                    div.style.height = "24px";
                    div.style.position = "relative";
                    div["resetcss"] =
                        {
                            "left": "",
                            "position": "relative",
                            "bottom": "",
                            "height": "24px",
                            "width": "auto",
                            "top": "",
                            "overflow": "",
                            "overflowX": "",
                            "overflowY": "",
                        };
                    var i = document.createElement("img");
                    i.style.position = "absolute";
                    i.draggable = false;
                    i.style.width = "24px";
                    i.style.height = "24px";
                    i.style.left = "0px";
                    div.appendChild(i);
                    i.onmousedown = function () {
                        i.style.backgroundColor = "#aaa";
                    };
                    i.onmouseup = function () {
                        i.style.backgroundColor = "transparent";
                    };
                    var t = document.createElement("div");
                    t.style.position = "absolute";
                    t.style.width = "auto";
                    t.style.height = "24px";
                    t.style.top = "0px";
                    t.style.left = "24px";
                    t.style.textAlign = "left";
                    div.appendChild(t);
                    var a = document.createElement("a");
                    a.style.lineHeight = "24px";
                    a.onmousedown = function () {
                        i.style.backgroundColor = "#aaa";
                    };
                    a.onmouseup = function () {
                        i.style.backgroundColor = "transparent";
                    };
                    t.appendChild(a);
                    return div;
                };
                var cachename = "_buttonsmallimage";
                var e2 = this.add(cachename, btn_ctor, cssname, cssext);
                var e = e2.children[0];
                var t = e2.children[1].childNodes[0];
                if (e.src != imgurl)
                    e.src = imgurl;
                if (t.text != text)
                    t.text = text;
                if (select) {
                    t.style.background = "#faa";
                }
                else {
                    t.style.background = "transparent";
                }
                var index = this.mapItemInfo[cachename].indexE - 1;
                e.onclick = function () {
                    _this.mapItemInfo[cachename].dataE[index] = 1;
                    _this.update();
                };
                t.onclick = function () {
                    _this.mapItemInfo[cachename].dataE[index] = 1;
                    _this.update();
                };
                if (e.textContent != text)
                    e.textContent = text;
                var i = this.mapItemInfo[cachename].dataE[index];
                if (i > 0) {
                    this.mapItemInfo[cachename].dataE[index] = 0;
                }
                return i > 0;
            };
            return gui;
        }(guiframework));
        htmlui.gui = gui;
    })(htmlui = lighttool.htmlui || (lighttool.htmlui = {}));
})(lighttool || (lighttool = {}));
var lighttool;
(function (lighttool) {
    var htmlui;
    (function (htmlui) {
        var direction;
        (function (direction) {
            direction[direction["H_Left"] = 0] = "H_Left";
            direction[direction["H_Right"] = 1] = "H_Right";
            direction[direction["V_Top"] = 2] = "V_Top";
            direction[direction["V_Bottom"] = 3] = "V_Bottom";
        })(direction = htmlui.direction || (htmlui.direction = {}));
        var panel = (function () {
            function panel(div) {
                this.divRoot = null;
                this.divTitle = null;
                this.divContent = null;
                this.divResize = null;
                this.btnFloat = null;
                this.btnClose = null;
                this.onClose = null;
                this.isFloat = false;
                this.canDrag = true;
                this.canScale = true;
                this.canDock = true;
                this.divRoot = div;
                this.divRoot["inv"] = this;
                for (var i = 0; i < this.divRoot.childElementCount; i++) {
                    var div = this.divRoot.children[i];
                    if (div != undefined && div.className == "dialog-content") {
                        this.divContent = div;
                        break;
                    }
                }
            }
            panel.prototype.setTitleText = function (txt) {
                var a = this.divTitle.children[1];
                a.text = txt;
            };
            panel.prototype.setTitle = function (txt, img) {
                if (img === void 0) { img = null; }
                var a = this.divTitle.children[1];
                a.text = txt;
                var i = this.divTitle.children[0];
                if (img == null) {
                    i.hidden = true;
                    a.style.left = "2px";
                }
                else {
                    i.hidden = false;
                    if (img != "-")
                        i.src = img;
                    a.style.left = "30px";
                }
            };
            panel.prototype.splitWith = function (p, dir, v) {
                var parent = this.container;
                var pc = null;
                if (this.container.subPanels.length < this.container.maxPanelCount) {
                    pc = this.container;
                }
                else {
                    for (var i in parent.subPanels) {
                        if (parent.subPanels[i] == this) {
                            var dd = document.createElement("div");
                            dd.className = "full";
                            pc = new panelContainer(dd);
                            parent.addSubPanel(pc, parseInt(i));
                            pc.divRoot.style.left = this.divRoot.style.left;
                            pc.divRoot.style.top = this.divRoot.style.top;
                            pc.divRoot.style.right = this.divRoot.style.right;
                            pc.divRoot.style.bottom = this.divRoot.style.bottom;
                            pc.addSubPanel(this);
                        }
                    }
                }
                if (dir == direction.H_Left) {
                    this.divRoot.style.left = "1px";
                    p.divRoot.style.left = "0px";
                }
                else if (dir == direction.H_Right) {
                    p.divRoot.style.left = "1px";
                    this.divRoot.style.left = "0px";
                }
                else if (dir == direction.V_Top) {
                    this.divRoot.style.top = "1px";
                    p.divRoot.style.top = "0px";
                }
                else if (dir == direction.V_Bottom) {
                    p.divRoot.style.top = "1px";
                    this.divRoot.style.top = "0px";
                }
                pc.addSubPanel(p);
                pc.onSplit(dir, v);
                return;
            };
            panel.prototype.onDock = function (container) {
                this.container = container;
                this.isFloat = false;
                this.divRoot.style.boxShadow = "0px";
                this.btnFloat.hidden = !this.canDrag;
                this.btnClose.hidden = true;
                this.divResize.hidden = true;
                this.divTitle.style.cursor = "auto";
            };
            panel.prototype.makeMini = function (width, height) {
                this.canDock = false;
                this.canScale = false;
                this.floatWidth = width;
                this.floatHeight = height;
                this.divTitle.textContent = "";
                this.divTitle.style.height = "12px";
                this.divTitle.style.width = "100%";
                this.divContent.style.top = "12px";
                this.divRoot.style.right = "auto";
                this.divRoot.style.bottom = "auto";
                this.divRoot.style.width = this.floatWidth + "px";
                this.divRoot.style.height = this.floatHeight + "px";
            };
            panel.prototype.onFloat = function () {
                this.isFloat = true;
                this.divRoot.style.boxShadow = "1px 1px 3px #292929";
                this.btnFloat.hidden = true;
                if (this.onClose != null)
                    this.btnClose.hidden = false;
                else
                    this.btnClose.hidden = true;
                if (this.canDrag) {
                    this.divTitle.style.cursor = "move";
                }
                else {
                    this.divTitle.style.cursor = "auto";
                }
                this.divResize.hidden = !this.canScale;
                var pos = panelMgr.instance()._calcRootPos(this.divRoot);
                var cx = panelMgr.instance()._calcRootCenterPos();
                var dirx = cx.x - pos.x;
                if (dirx != 0)
                    dirx /= Math.abs(dirx);
                var diry = cx.y - pos.y;
                if (diry != 0)
                    diry /= Math.abs(diry);
                pos.x += dirx * 16;
                pos.y += diry * 16;
                if (this.floatWidth > panelMgr.instance().width - 32 - pos.x) {
                    this.floatWidth = panelMgr.instance().width - 32 - pos.x;
                }
                if (this.floatHeight > panelMgr.instance().height - 32 - pos.y) {
                    this.floatHeight = panelMgr.instance().height - 32 - pos.y;
                }
                if (this.floatWidth < 100) {
                    this.floatWidth = 100;
                }
                if (this.floatHeight < 100) {
                    this.floatHeight = 100;
                }
                if (pos.x > panelMgr.instance().width - this.floatWidth) {
                    pos.x = panelMgr.instance().width - this.floatWidth;
                }
                if (pos.y > panelMgr.instance().height - this.floatHeight) {
                    pos.y = panelMgr.instance().height - this.floatHeight;
                }
                this.divRoot.style.left = pos.x + "px";
                this.divRoot.style.top = pos.y + "px";
                this.divRoot.style.right = "auto";
                this.divRoot.style.bottom = "auto";
                this.divRoot.style.width = this.floatWidth + "px";
                this.divRoot.style.height = this.floatHeight + "px";
            };
            panel.prototype.toCenter = function () {
                if (this.isFloat == false)
                    return;
                this.divRoot.style.left = (panelMgr.instance().width - this.floatWidth) / 2 + "px";
                this.divRoot.style.top = (panelMgr.instance().height - this.floatHeight) / 2 + "px";
            };
            panel.prototype.show = function () {
                this.divRoot.hidden = false;
            };
            panel.prototype.hide = function () {
                this.divRoot.hidden = true;
            };
            return panel;
        }());
        htmlui.panel = panel;
        var panelContainer = (function () {
            function panelContainer(div) {
                this.divRoot = null;
                this.subPanels = [];
                this.divScale = null;
                this.divScalebg = null;
                this.divRoot = div;
                this.divRoot["inv"] = this;
            }
            Object.defineProperty(panelContainer.prototype, "maxPanelCount", {
                get: function () {
                    return 2;
                },
                enumerable: true,
                configurable: true
            });
            panelContainer.prototype.onSplit = function (dir, v) {
                if (dir == direction.H_Left || dir == direction.H_Right) {
                    this.scalew = v;
                    this.scaleh = 1;
                }
                else {
                    this.scalew = 1;
                    this.scaleh = v;
                }
                this._doSplit();
            };
            panelContainer.prototype._doSplit = function () {
                var mgr = panelMgr.instance();
                if (this.divScalebg == null) {
                    this.divScalebg = document.createElement("div");
                    this.divRoot.appendChild(this.divScalebg);
                    this.divScalebg.style.position = "absolute";
                    this.divScalebg.style.zIndex = "999";
                    this.divScalebg.style.backgroundColor = "rgba(0,0,0,0)";
                    this.divScalebg.style.width = window.innerWidth + "px";
                    this.divScalebg.style.height = window.innerHeight + "px";
                    this.divScalebg.hidden = true;
                }
                if (this.divScale == null) {
                    this.divScale = document.createElement("div");
                    this.divRoot.appendChild(this.divScale);
                    this.divScale.className = "dialog-split";
                    this.divScale.style.zIndex = "1000";
                }
                this.divScale.hidden = false;
                if (this.scaleh == 1) {
                    this.divScale.style.height = "auto";
                    this.divScale.style.top = "0px";
                    this.divScale.style.bottom = "0px";
                    this.divScale.style.width = "auto";
                    this.divScale.style.left = this.scalew * 100 + "%";
                    this.divScale.style.right = ((1 - this.scalew) * 100) + "%";
                    this.divScale.style.marginLeft = "-3px";
                    this.divScale.style.marginRight = "-3px";
                    this.divScale.style.marginTop = "0px";
                    this.divScale.style.marginBottom = "0px";
                    this.divScale.style.cursor = "ew-resize";
                    for (var i = 0; i < this.subPanels.length; i++) {
                        var subdiv = this.subPanels[i].divRoot;
                        if (subdiv.style.left == "0px") {
                            mgr._setDockPos(subdiv, "0px", "0px", (1 - this.scalew) * 100 + "%", "0px");
                        }
                        else {
                            mgr._setDockPos(subdiv, (this.scalew * 100) + "%", "0px", "0px", "0px");
                        }
                    }
                }
                else if (this.scalew == 1) {
                    this.divScale.style.height = "auto";
                    this.divScale.style.left = "0px";
                    this.divScale.style.right = "0px";
                    this.divScale.style.width = "auto";
                    this.divScale.style.top = this.scaleh * 100 + "%";
                    this.divScale.style.bottom = ((1 - this.scaleh) * 100) + "%";
                    this.divScale.style.marginTop = "-3px";
                    this.divScale.style.marginBottom = "-3px";
                    this.divScale.style.marginLeft = "0px";
                    this.divScale.style.marginRight = "0px";
                    this.divScale.style.cursor = "ns-resize";
                    for (var i = 0; i < this.subPanels.length; i++) {
                        var subdiv = this.subPanels[i].divRoot;
                        if (subdiv.style.top == "0px") {
                            mgr._setDockPos(subdiv, "0px", "0px", "0px", (1 - this.scaleh) * 100 + "%");
                        }
                        else {
                            mgr._setDockPos(subdiv, "0px", (this.scaleh * 100) + "%", "0px", "0px");
                        }
                    }
                }
                else {
                    throw new Error("无效数据");
                }
            };
            panelContainer.prototype.onDock = function (container) {
                this.container = container;
            };
            panelContainer.prototype.addSubPanel = function (p, pos) {
                if (pos === void 0) { pos = -1; }
                if (p.divRoot.parentElement != null) {
                    p.divRoot.parentElement.removeChild(p.divRoot);
                }
                if (p.container != null) {
                    p.container.removeSubPanel(p);
                }
                this.divRoot.appendChild(p.divRoot);
                if (pos < 0)
                    this.subPanels.push(p);
                else {
                    this.subPanels[pos] = p;
                }
                p.onDock(this);
            };
            panelContainer.prototype.removeSubPanel = function (p) {
                var i = this.subPanels.indexOf(p);
                if (i >= 0) {
                    this.subPanels.splice(i, 1);
                    this.divRoot.removeChild(p.divRoot);
                }
                if (this.subPanels.length == 1) {
                    this._fillStyle(this.subPanels[0].divRoot);
                }
                if (this.subPanels.length == 0 && this.container != null) {
                    this.container.removeSubPanel(this);
                }
                p.container = null;
                if (this.subPanels.length < 2) {
                    if (this.divScale != null)
                        this.divScale.hidden = true;
                    if (this.divScalebg != null)
                        this.divScalebg.hidden = true;
                }
            };
            panelContainer.prototype.removeAllSubPanel = function () {
                if (this.subPanels == undefined || this.subPanels == null)
                    return;
                for (var i = this.subPanels.length - 1; i >= 0; i--) {
                    var ipanel = this.subPanels[i];
                    if (ipanel instanceof panelContainer) {
                        ipanel.removeAllSubPanel();
                    }
                    this.removeSubPanel(ipanel);
                }
            };
            panelContainer.prototype._fillStyle = function (div) {
                div.style.left = "0px";
                div.style.top = "0px";
                div.style.width = "auto";
                div.style.height = "auto";
                div.style.right = "0px";
                div.style.bottom = "0px";
            };
            panelContainer.prototype.fill = function (p) {
                this.addSubPanel(p);
                this._fillStyle(p.divRoot);
                p.onDock(this);
            };
            return panelContainer;
        }());
        htmlui.panelContainer = panelContainer;
        var panelMgr = (function () {
            function panelMgr() {
                this.urlfill = "data:image/png;base64,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";
                this.urlleft = "data:image/png;base64,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";
                this.divRoot = null;
                this.root = null;
                this.floatDiv = null;
                this.overDiv = null;
                this.overDiv_Show = null;
                this.overDiv_FillImg = null;
                this.overDiv_LeftImg = null;
                this.overDiv_RightImg = null;
                this.overDiv_TopImg = null;
                this.overDiv_BottomImg = null;
                this.backimg = null;
            }
            panelMgr.instance = function () {
                if (panelMgr.g_this == null)
                    panelMgr.g_this = new panelMgr();
                return panelMgr.g_this;
            };
            Object.defineProperty(panelMgr.prototype, "width", {
                get: function () {
                    return this.divRoot.clientWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(panelMgr.prototype, "height", {
                get: function () {
                    return this.divRoot.clientHeight;
                },
                enumerable: true,
                configurable: true
            });
            panelMgr.prototype.setbackImg = function (url) {
                this.backimg.src = url;
            };
            panelMgr.prototype.init = function (div) {
                var _this = this;
                this.divRoot = div;
                this.backimg = document.createElement("img");
                this.backimg.style.position = "absoutle";
                this.backimg.style.width = "100%";
                this.backimg.style.height = "100%";
                this.divRoot.appendChild(this.backimg);
                var panelDiv = document.createElement("div");
                panelDiv.className = "full";
                panelDiv.style.zIndex = "1";
                this.divRoot.appendChild(panelDiv);
                this.root = new panelContainer(panelDiv);
                this.floatDiv = document.createElement("div");
                this.floatDiv.className = "full";
                this.floatDiv.style.zIndex = "2";
                this.floatDiv.style.width = "0px";
                this.floatDiv.style.overflow = "visible";
                this.divRoot.appendChild(this.floatDiv);
                this.overDiv = document.createElement("div");
                this.overDiv.className = "full";
                this.overDiv.style.zIndex = "3";
                this.overDiv.style.background = "rgba(204, 0, 0, 0.48);";
                this.overDiv.style.overflow = "visible";
                this.overDiv.style.width = "0px";
                this.overDiv.hidden = true;
                this.divRoot.appendChild(this.overDiv);
                this._initOverDiv();
                var mode = 0;
                var px = 0;
                var py = 0;
                var dialog = null;
                var overobj = null;
                var btouch = false;
                var onDown = function (ele, clientX, clientY) {
                    var stin = ele["className"];
                    var stinp = "";
                    if ((ele instanceof HTMLButtonElement) == false)
                        stinp = ele.parentElement["className"];
                    _this.overDiv_Show.hidden = true;
                    _this.overDiv_FillImg.hidden = true;
                    _this.overDiv_LeftImg.hidden = true;
                    _this.overDiv_RightImg.hidden = true;
                    _this.overDiv_TopImg.hidden = true;
                    _this.overDiv_BottomImg.hidden = true;
                    if (stin == "dialog-title") {
                        var float = ele.parentElement["inv"].isFloat;
                        var drag = ele.parentElement["inv"].canDrag;
                        if (float == false || drag == false)
                            return;
                        var p = _this._calcClientPos(ele);
                        px = clientX - p.x;
                        py = clientY - p.y;
                        mode = 1;
                        dialog = ele.parentElement;
                        _this._moveTop(dialog);
                        _this.overDiv.hidden = false;
                    }
                    else if (stinp == "dialog-title") {
                        var float = ele.parentElement.parentElement["inv"].isFloat;
                        var drag = ele.parentElement.parentElement["inv"].canDrag;
                        if (float == false || drag == false)
                            return;
                        var p = _this._calcClientPos(ele.parentElement);
                        px = clientX - p.x;
                        py = clientY - p.y;
                        mode = 1;
                        dialog = ele.parentElement.parentElement;
                        _this._moveTop(dialog);
                        _this.overDiv.hidden = false;
                    }
                    else if (stin == "dialog-resize") {
                        var float = ele.parentElement["inv"].isFloat;
                        if (float == false)
                            return;
                        var p = _this._calcClientPos(ele);
                        px = clientX - p.x;
                        py = clientY - p.y;
                        mode = 2;
                        dialog = ele.parentElement;
                        _this._moveTop(dialog);
                        return true;
                    }
                    else if (stin == "dialog-split") {
                        var p = _this._calcClientPos(ele);
                        px = clientX - p.x;
                        py = clientY - p.y;
                        mode = 3;
                        dialog = ele.parentElement;
                        var pc = dialog["inv"];
                        pc.divScalebg.hidden = false;
                        return true;
                    }
                    else {
                        var dd = ele;
                        while (dd != null) {
                            if (dd.className == "dialog" && dd instanceof HTMLDivElement) {
                                _this._moveTop(dd);
                                break;
                            }
                            dd = dd.parentElement;
                        }
                        return false;
                    }
                };
                var onUp = function (clientX, clientY) {
                    if (mode == 3) {
                        var pc = dialog["inv"];
                        pc.divScalebg.hidden = true;
                    }
                    mode = 0;
                    _this.overDiv.hidden = true;
                    if (overobj == null) {
                        return false;
                    }
                    else if (overobj.id == "overDiv_FillImg") {
                        var inele = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (inele instanceof (panelContainer)) {
                            inele.fill(dialog["inv"]);
                        }
                        return true;
                    }
                    else if (overobj.id == "overDiv_LeftImg") {
                        overobj = null;
                        var inele = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (inele instanceof (panel)) {
                            inele.splitWith(dialog["inv"], direction.H_Left, 0.5);
                        }
                        return true;
                    }
                    else if (overobj.id == "overDiv_RightImg") {
                        overobj = null;
                        var inele = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (inele instanceof (panel)) {
                            inele.splitWith(dialog["inv"], direction.H_Right, 0.5);
                        }
                        return true;
                    }
                    else if (overobj.id == "overDiv_TopImg") {
                        overobj = null;
                        var inele = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (inele instanceof (panel)) {
                            inele.splitWith(dialog["inv"], direction.V_Top, 0.5);
                        }
                        return true;
                    }
                    else if (overobj.id == "overDiv_BottomImg") {
                        overobj = null;
                        var inele = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (inele instanceof (panel)) {
                            inele.splitWith(dialog["inv"], direction.V_Bottom, 0.5);
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                var onMove = function (clientX, clientY) {
                    if (mode == 1) {
                        var pp = _this.pickPanel(_this.root, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        if (pp == null)
                            return;
                        var dock = dialog["inv"].canDock;
                        var pos = _this._calcRootPos(pp.divRoot);
                        _this.overDiv_FillImg.style.borderWidth = "0px";
                        _this.overDiv_FillImg.style.margin = "4px";
                        _this.overDiv_LeftImg.style.borderWidth = "0px";
                        _this.overDiv_LeftImg.style.margin = "4px";
                        _this.overDiv_RightImg.style.borderWidth = "0px";
                        _this.overDiv_RightImg.style.margin = "4px";
                        _this.overDiv_TopImg.style.borderWidth = "0px";
                        _this.overDiv_TopImg.style.margin = "4px";
                        _this.overDiv_BottomImg.style.borderWidth = "0px";
                        _this.overDiv_BottomImg.style.margin = "4px";
                        if (dock) {
                            overobj = _this.pickOverLay(clientX, clientY);
                        }
                        else {
                            overobj = null;
                        }
                        if (overobj == null) {
                            _this.overDiv_Show.hidden = true;
                        }
                        else if (overobj.id == "overDiv_FillImg") {
                            _this.overDiv_FillImg.style.borderColor = "#ffffff";
                            _this.overDiv_FillImg.style.borderStyle = "solid";
                            _this.overDiv_FillImg.style.borderWidth = "4px";
                            _this.overDiv_FillImg.style.margin = "0px";
                            _this.overDiv_Show.hidden = false;
                            _this.overDiv_Show.style.left = pos.x + "px";
                            _this.overDiv_Show.style.top = pos.y + "px";
                            _this.overDiv_Show.style.width = pp.divRoot.clientWidth + "px";
                            _this.overDiv_Show.style.height = pp.divRoot.clientHeight + "px";
                            _this.overDiv_Show.style.right = "auto";
                            _this.overDiv_Show.style.bottom = "auto";
                        }
                        else if (overobj.id == "overDiv_LeftImg" && overobj.hidden == false) {
                            _this.overDiv_LeftImg.style.borderColor = "#ffffff";
                            _this.overDiv_LeftImg.style.borderStyle = "solid";
                            _this.overDiv_LeftImg.style.borderWidth = "4px";
                            _this.overDiv_LeftImg.style.margin = "0px";
                            _this.overDiv_Show.hidden = false;
                            _this.overDiv_Show.style.left = pos.x + "px";
                            _this.overDiv_Show.style.top = pos.y + "px";
                            _this.overDiv_Show.style.width = (pp.divRoot.clientWidth / 2) + "px";
                            _this.overDiv_Show.style.height = pp.divRoot.clientHeight + "px";
                            _this.overDiv_Show.style.right = "auto";
                            _this.overDiv_Show.style.bottom = "auto";
                        }
                        else if (overobj.id == "overDiv_RightImg" && overobj.hidden == false) {
                            _this.overDiv_RightImg.style.borderColor = "#ffffff";
                            _this.overDiv_RightImg.style.borderStyle = "solid";
                            _this.overDiv_RightImg.style.borderWidth = "4px";
                            _this.overDiv_RightImg.style.margin = "0px";
                            _this.overDiv_Show.hidden = false;
                            _this.overDiv_Show.style.left = (pos.x + pp.divRoot.clientWidth / 2) + "px";
                            _this.overDiv_Show.style.top = pos.y + "px";
                            _this.overDiv_Show.style.width = (pp.divRoot.clientWidth / 2) + "px";
                            _this.overDiv_Show.style.height = pp.divRoot.clientHeight + "px";
                            _this.overDiv_Show.style.right = "auto";
                            _this.overDiv_Show.style.bottom = "auto";
                        }
                        else if (overobj.id == "overDiv_TopImg" && overobj.hidden == false) {
                            _this.overDiv_TopImg.style.borderColor = "#ffffff";
                            _this.overDiv_TopImg.style.borderStyle = "solid";
                            _this.overDiv_TopImg.style.borderWidth = "4px";
                            _this.overDiv_TopImg.style.margin = "0px";
                            _this.overDiv_Show.hidden = false;
                            _this.overDiv_Show.style.left = pos.x + "px";
                            _this.overDiv_Show.style.top = (pos.y) + "px";
                            _this.overDiv_Show.style.width = (pp.divRoot.clientWidth) + "px";
                            _this.overDiv_Show.style.height = (pp.divRoot.clientHeight / 2) + "px";
                            _this.overDiv_Show.style.right = "auto";
                            _this.overDiv_Show.style.bottom = "auto";
                        }
                        else if (overobj.id == "overDiv_BottomImg" && overobj.hidden == false) {
                            _this.overDiv_BottomImg.style.borderColor = "#ffffff";
                            _this.overDiv_BottomImg.style.borderStyle = "solid";
                            _this.overDiv_BottomImg.style.borderWidth = "4px";
                            _this.overDiv_BottomImg.style.margin = "0px";
                            _this.overDiv_Show.hidden = false;
                            _this.overDiv_Show.style.left = pos.x + "px";
                            _this.overDiv_Show.style.top = (pos.y + pp.divRoot.clientHeight / 2) + "px";
                            _this.overDiv_Show.style.width = (pp.divRoot.clientWidth) + "px";
                            _this.overDiv_Show.style.height = (pp.divRoot.clientHeight / 2) + "px";
                            _this.overDiv_Show.style.right = "auto";
                            _this.overDiv_Show.style.bottom = "auto";
                        }
                        else {
                            _this.overDiv_Show.hidden = true;
                        }
                        var left = (clientX - (_this.divRoot.offsetLeft + px));
                        var top = (clientY - (_this.divRoot.offsetTop + py));
                        if (left < 0)
                            left = 0;
                        if (left > _this.divRoot.offsetWidth - dialog.offsetWidth) {
                            left = _this.divRoot.offsetWidth - dialog.offsetWidth;
                        }
                        if (top < 0)
                            top = 0;
                        if (top > _this.divRoot.offsetHeight - dialog.offsetHeight) {
                            top = _this.divRoot.offsetHeight - dialog.offsetHeight;
                        }
                        dialog.style.left = left + "px";
                        dialog.style.top = top + "px";
                        _this.testOverlay(dock, clientX - _this.divRoot.offsetLeft, clientY - _this.divRoot.offsetTop);
                        return true;
                    }
                    else if (mode == 2) {
                        var width = (clientX - (_this.divRoot.offsetLeft - px)) - dialog.offsetLeft;
                        if (width < 100)
                            width = 100;
                        if (width > _this.divRoot.offsetWidth - dialog.offsetLeft)
                            width = _this.divRoot.offsetWidth - dialog.offsetLeft;
                        var height = (clientY - (_this.divRoot.offsetTop - py)) - dialog.offsetTop;
                        if (height < 100)
                            height = 100;
                        if (height > _this.divRoot.offsetHeight - dialog.offsetTop)
                            height = _this.divRoot.offsetHeight - dialog.offsetTop;
                        dialog.style.width = width + "px";
                        dialog.style.height = height + "px";
                        var p = dialog["inv"];
                        p.floatWidth = width;
                        p.floatHeight = height;
                        return true;
                    }
                    else if (mode == 3) {
                        var pos = _this._calcRootPos(dialog);
                        var left = (clientX - (_this.divRoot.offsetLeft - px)) - dialog.offsetLeft;
                        var top = (clientY - (_this.divRoot.offsetTop - py)) - dialog.offsetTop;
                        if (left < 100)
                            left = 100;
                        if (top < 100)
                            top = 100;
                        if (left > dialog.offsetWidth - 100)
                            left = dialog.offsetWidth - 100;
                        if (top > dialog.offsetHeight - 100)
                            top = dialog.offsetHeight - 100;
                        var w = left / dialog.offsetWidth;
                        var h = top / dialog.offsetHeight;
                        var pc = dialog["inv"];
                        if (dialog.offsetWidth < 200)
                            w = pc.scalew;
                        if (dialog.offsetHeight < 200)
                            h = pc.scaleh;
                        if (pc.scalew == 1)
                            pc.onSplit(direction.V_Top, h);
                        if (pc.scaleh == 1)
                            pc.onSplit(direction.H_Left, w);
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                {
                    var lastx;
                    var lasty;
                    this.divRoot.addEventListener("touchstart", function (ev) {
                        btouch = true;
                        lastx = ev.touches[0].clientX;
                        lasty = ev.touches[0].clientY;
                        var b = onDown(ev.target, lastx, lasty);
                        if (b)
                            ev.preventDefault();
                    });
                    this.divRoot.addEventListener("touchend", function (ev) {
                        var b = onUp(lastx, lasty);
                        if (b)
                            ev.preventDefault();
                    });
                    this.divRoot.addEventListener("touchcancel", function (ev) {
                        var b = onUp(lastx, lasty);
                        if (b)
                            ev.preventDefault();
                    });
                    this.divRoot.addEventListener("touchmove", function (ev) {
                        lastx = ev.touches[0].clientX;
                        lasty = ev.touches[0].clientY;
                        var b = onMove(lastx, lasty);
                        if (b)
                            ev.preventDefault();
                    });
                }
                {
                    this.divRoot.addEventListener("mousedown", function (ev) {
                        onDown(ev.target, ev.clientX, ev.clientY);
                    });
                    this.divRoot.addEventListener("mouseup", function (ev) {
                        onUp(ev.clientX, ev.clientY);
                    });
                    this.divRoot.addEventListener("mousemove", function (ev) {
                        onMove(ev.clientX, ev.clientY);
                    });
                }
            };
            panelMgr.prototype.pickPanel = function (panel, cx, cy) {
                var b = this._inbox(panel, cx, cy);
                if (!b)
                    return null;
                if (panel instanceof panelContainer) {
                    for (var p in panel.subPanels) {
                        var sp = this.pickPanel(panel.subPanels[p], cx, cy);
                        if (sp != null)
                            return sp;
                    }
                }
                return panel;
            };
            panelMgr.prototype.createPanel = function (name, width, height, customctor) {
                var _this = this;
                if (width === void 0) { width = 200; }
                if (height === void 0) { height = 200; }
                if (customctor === void 0) { customctor = null; }
                var div = document.createElement("div");
                div.className = "dialog";
                this.floatDiv.appendChild(div);
                var title = document.createElement("div");
                title.className = "dialog-title";
                div.appendChild(title);
                var i = document.createElement("img");
                i.draggable = false;
                title.appendChild(i);
                i.style.position = "absolute";
                i.style.top = "1px";
                i.style.left = "1px";
                i.style.width = "28px";
                i.style.height = "28px";
                i.src = "";
                i.hidden = true;
                var a = document.createElement("a");
                title.appendChild(a);
                a.text = name;
                a.style.lineHeight = "28px";
                a.style.left = "2px";
                a.style.position = "absolute";
                a.style.color = "#fff";
                var content = document.createElement("div");
                content.className = "dialog-content";
                div.appendChild(content);
                var resizebg = document.createElement("div");
                resizebg.style.position = "absolute";
                resizebg.style.backgroundColor = "rgba(0,0,0,0)";
                resizebg.style.right = "0px";
                resizebg.style.bottom = "0px";
                resizebg.style.width = "50px";
                resizebg.style.height = "50px";
                div.appendChild(resizebg);
                var resize = document.createElement("div");
                resize.className = "dialog-resize";
                div.appendChild(resize);
                var button = document.createElement("button");
                var s = document.createElement("span");
                s.className = "glyphicon glyphicon-new-window";
                button.appendChild(s);
                title.appendChild(button);
                button.title = "float";
                button.type = "button";
                button.className = "close";
                button.style.position = "absolute";
                button.style.right = "4px";
                button.style.top = "4px";
                button.style.bottom = "4px";
                button.style.width = "20px";
                button.style.lineHeight = "20px";
                button.onclick = function () {
                    _this.floatPanel(p);
                };
                var buttonClose = document.createElement("button");
                var s = document.createElement("span");
                s.className = "glyphicon glyphicon-remove";
                buttonClose.appendChild(s);
                title.appendChild(buttonClose);
                buttonClose.title = "close";
                buttonClose.type = "button";
                buttonClose.className = "close";
                buttonClose.style.position = "absolute";
                buttonClose.style.right = "4px";
                buttonClose.style.top = "4px";
                buttonClose.style.bottom = "4px";
                buttonClose.style.width = "20px";
                buttonClose.style.lineHeight = "20px";
                buttonClose.onclick = function () {
                    p.onClose();
                };
                var p = null;
                if (customctor != null) {
                    p = customctor(div);
                }
                else {
                    p = new panel(div);
                }
                p.divTitle = title;
                p.divContent = content;
                p.divResize = resize;
                p.btnFloat = button;
                p.btnClose = buttonClose;
                p.name = name;
                p.isFloat = true;
                p.floatWidth = width;
                p.floatHeight = height;
                p.onFloat();
                return p;
            };
            panelMgr.prototype.toTop = function (panel) {
                if (panel != null) {
                    this._moveTop(panel.divRoot);
                }
            };
            panelMgr.prototype.floatPanel = function (panel) {
                if (panel instanceof (panelContainer)) {
                    throw new Error("panelContainer can't be float.");
                }
                if (panel.container == null)
                    return;
                panel.onFloat();
                panel.container.removeSubPanel(panel);
                this.floatDiv.appendChild(panel.divRoot);
            };
            panelMgr.prototype.removePanel = function (panel) {
                if (panel.isFloat == false) {
                    this.floatPanel(panel);
                }
                this.floatDiv.removeChild(panel.divRoot);
            };
            panelMgr.prototype.removeAllPanel = function () {
                this.root.removeAllSubPanel();
            };
            panelMgr.prototype.fillPanel = function (panel) {
                if (this.root.subPanels.length > 0) {
                    throw new Error("只有在空的时候可以用");
                }
                this.root.fill(panel);
            };
            panelMgr.prototype._moveTop = function (divsrc) {
                if (divsrc.style.zIndex == "")
                    divsrc.style.zIndex = "1";
                var zme = parseInt(divsrc.style.zIndex);
                var needdec = false;
                for (var i = 0; i < this.floatDiv.childElementCount; i++) {
                    var div = this.floatDiv.children[i];
                    if (div == divsrc)
                        continue;
                    if (div.style == undefined && div.style.zIndex == undefined)
                        continue;
                    var zindex = parseInt(div.style.zIndex);
                    if (zindex >= zme) {
                        needdec = true;
                        break;
                    }
                }
                if (!needdec)
                    return;
                var zindexmax = zme;
                for (var i = 0; i < this.floatDiv.childElementCount; i++) {
                    var div = this.floatDiv.children[i];
                    if (div == divsrc)
                        continue;
                    if (div.style == undefined && div.style.zIndex == undefined)
                        continue;
                    var zindex = parseInt(div.style.zIndex);
                    zindexmax = Math.max(zindexmax, zindex);
                    if (zindex > 0)
                        zindex--;
                    div.style.zIndex = zindex.toString();
                }
                divsrc.style.zIndex = Math.max((zindexmax + 1), this.floatDiv.childElementCount).toString();
            };
            panelMgr.prototype._initOverDiv = function () {
                this.overDiv_Show = document.createElement("div");
                this.overDiv_Show.className = "full";
                this.overDiv_Show.style.backgroundColor = "rgba(0, 20, 204, 0.48)";
                this.overDiv.appendChild(this.overDiv_Show);
                this.overDiv_FillImg = new Image();
                this.overDiv_FillImg.id = "overDiv_FillImg";
                this.overDiv_FillImg.src = this.urlfill;
                this.overDiv_FillImg.style.position = "absolute";
                this.overDiv_FillImg.style.width = "64px";
                this.overDiv_FillImg.style.height = "64px";
                this.overDiv.appendChild(this.overDiv_FillImg);
                this.overDiv_LeftImg = new Image();
                this.overDiv_LeftImg.id = "overDiv_LeftImg";
                this.overDiv_LeftImg.src = this.urlleft;
                this.overDiv_LeftImg.style.position = "absolute";
                this.overDiv_LeftImg.style.width = "64px";
                this.overDiv_LeftImg.style.height = "64px";
                this.overDiv.appendChild(this.overDiv_LeftImg);
                this.overDiv_RightImg = new Image();
                this.overDiv_RightImg.id = "overDiv_RightImg";
                this.overDiv_RightImg.src = this.urlleft;
                this.overDiv_RightImg.style.position = "absolute";
                this.overDiv_RightImg.style.width = "64px";
                this.overDiv_RightImg.style.height = "64px";
                this.overDiv.appendChild(this.overDiv_RightImg);
                this.overDiv_BottomImg = new Image();
                this.overDiv_BottomImg.id = "overDiv_BottomImg";
                this.overDiv_BottomImg.src = this.urlleft;
                this.overDiv_BottomImg.style.position = "absolute";
                this.overDiv_BottomImg.style.width = "64px";
                this.overDiv_BottomImg.style.height = "64px";
                this.overDiv.appendChild(this.overDiv_BottomImg);
                this.overDiv_TopImg = new Image();
                this.overDiv_TopImg.id = "overDiv_TopImg";
                this.overDiv_TopImg.src = this.urlleft;
                this.overDiv_TopImg.style.position = "absolute";
                this.overDiv_TopImg.style.width = "64px";
                this.overDiv_TopImg.style.height = "64px";
                this.overDiv.appendChild(this.overDiv_TopImg);
            };
            panelMgr.prototype.pickOverLay = function (cx, cy) {
                var cp = this._calcClientPos(this.overDiv_FillImg);
                if (cx > cp.x && cy > cp.y && cx < cp.x + 64 && cy < cp.y + 64)
                    return this.overDiv_FillImg;
                var cp = this._calcClientPos(this.overDiv_LeftImg);
                if (cx > cp.x && cy > cp.y && cx < cp.x + 64 && cy < cp.y + 64)
                    return this.overDiv_LeftImg;
                var cp = this._calcClientPos(this.overDiv_RightImg);
                if (cx > cp.x && cy > cp.y && cx < cp.x + 64 && cy < cp.y + 64)
                    return this.overDiv_RightImg;
                var cp = this._calcClientPos(this.overDiv_TopImg);
                if (cx > cp.x && cy > cp.y && cx < cp.x + 64 && cy < cp.y + 64)
                    return this.overDiv_TopImg;
                var cp = this._calcClientPos(this.overDiv_BottomImg);
                if (cx > cp.x && cy > cp.y && cx < cp.x + 64 && cy < cp.y + 64)
                    return this.overDiv_BottomImg;
                return null;
            };
            panelMgr.prototype.testOverlay = function (usedock, cx, cy) {
                if (usedock == false) {
                    this.overDiv_FillImg.hidden = true;
                    this.overDiv_LeftImg.hidden = true;
                    this.overDiv_RightImg.hidden = true;
                    this.overDiv_TopImg.hidden = true;
                    this.overDiv_BottomImg.hidden = true;
                    return;
                }
                var inele = this.pickPanel(this.root, cx, cy);
                if (inele instanceof (panelContainer)) {
                    this.overDiv_FillImg.hidden = true;
                    this.overDiv_LeftImg.hidden = true;
                    this.overDiv_RightImg.hidden = true;
                    this.overDiv_TopImg.hidden = true;
                    this.overDiv_BottomImg.hidden = true;
                    if (inele.subPanels.length == 0) {
                        this.overDiv_FillImg.hidden = false;
                        this.overDiv_FillImg.style.left = (inele.divRoot.clientLeft + inele.divRoot.clientWidth / 2 - 32) + "px";
                        this.overDiv_FillImg.style.top = (inele.divRoot.clientTop + inele.divRoot.clientHeight / 2 - 32) + "px";
                    }
                }
                else if (inele instanceof (panel)) {
                    this.overDiv_FillImg.hidden = true;
                    var pos = this._calcRootPos(inele.divRoot);
                    this.overDiv_LeftImg.hidden = false;
                    this.overDiv_LeftImg.style.left = (pos.x + inele.divRoot.clientWidth / 2 - 32 - 68) + "px";
                    this.overDiv_LeftImg.style.top = (pos.y + inele.divRoot.clientHeight / 2 - 32) + "px";
                    this.overDiv_RightImg.hidden = false;
                    this.overDiv_RightImg.style.left = (pos.x + inele.divRoot.clientWidth / 2 - 32 + 68) + "px";
                    this.overDiv_RightImg.style.top = (pos.y + inele.divRoot.clientHeight / 2 - 32) + "px";
                    this.overDiv_TopImg.hidden = false;
                    this.overDiv_TopImg.style.left = (pos.x + inele.divRoot.clientWidth / 2 - 32) + "px";
                    this.overDiv_TopImg.style.top = (pos.y + inele.divRoot.clientHeight / 2 - 32 - 68) + "px";
                    this.overDiv_BottomImg.hidden = false;
                    this.overDiv_BottomImg.style.left = (pos.x + inele.divRoot.clientWidth / 2 - 32) + "px";
                    this.overDiv_BottomImg.style.top = (pos.y + inele.divRoot.clientHeight / 2 - 32 + 68) + "px";
                }
            };
            panelMgr.prototype._inbox = function (panel, cx, cy) {
                var divf = panel.divRoot;
                var left = 0;
                var top = 0;
                while (divf != null && divf != this.root.divRoot && divf != this.divRoot) {
                    left += divf.offsetLeft;
                    top += divf.offsetTop;
                    divf = divf.parentElement;
                }
                if (cx < left || cy < top || cx >= (left + panel.divRoot.clientWidth) || cy >= (top + panel.divRoot.clientHeight)) {
                    return false;
                }
                return true;
            };
            panelMgr.prototype._setDockPos = function (div, x, y, r, b) {
                div.style.left = x;
                div.style.top = y;
                div.style.right = r;
                div.style.bottom = b;
                div.style.width = "auto";
                div.style.height = "auto";
            };
            panelMgr.prototype._calcRootPos = function (div) {
                var divf = div;
                var left = 0;
                var top = 0;
                while (divf != null && divf != this.root.divRoot && divf != this.divRoot) {
                    left += divf.offsetLeft;
                    top += divf.offsetTop;
                    divf = divf.parentElement;
                }
                return { x: left, y: top };
            };
            panelMgr.prototype._calcClientPos = function (div) {
                var divf = div;
                var left = 0;
                var top = 0;
                while (divf != null) {
                    left += divf.offsetLeft;
                    top += divf.offsetTop;
                    divf = divf.parentElement;
                }
                return { x: left, y: top };
            };
            panelMgr.prototype._calcRootCenterPos = function () {
                return { x: this.divRoot.clientWidth / 2, y: this.divRoot.clientHeight / 2 };
            };
            return panelMgr;
        }());
        htmlui.panelMgr = panelMgr;
    })(htmlui = lighttool.htmlui || (lighttool.htmlui = {}));
})(lighttool || (lighttool = {}));
var lighttool;
(function (lighttool) {
    var htmlui;
    (function (htmlui) {
        var QuickDom = (function () {
            function QuickDom() {
            }
            QuickDom.addElement = function (panel, name) {
                var p = null;
                if (panel instanceof (lighttool.htmlui.panel)) {
                    p = panel.divContent;
                }
                else {
                    p = panel;
                }
                var e = document.createElement(name);
                p.appendChild(e);
                return e;
            };
            QuickDom.addA = function (panel, text, href) {
                if (href === void 0) { href = null; }
                var e = QuickDom.addElement(panel, "a");
                e.text = text;
                if (href != null)
                    e.href = href;
                return e;
            };
            QuickDom.addSpace = function (panel, width) {
                var e = QuickDom.addElement(panel, "div");
                e.style.width = width + "px";
                e.style.height = "1px";
                return e;
            };
            QuickDom.addReturn = function (panel) {
                var e = QuickDom.addElement(panel, "br");
                return e;
            };
            QuickDom.addTextInput = function (panel, text) {
                if (text === void 0) { text = ""; }
                var e = QuickDom.addElement(panel, "input");
                e.type = "text";
                e.value = text;
                return e;
            };
            QuickDom.addTextInputPassword = function (panel, text) {
                if (text === void 0) { text = ""; }
                var e = QuickDom.addElement(panel, "input");
                e.type = "password";
                e.value = text;
                return e;
            };
            QuickDom.addButton = function (panel, text) {
                if (text === void 0) { text = ""; }
                var e = QuickDom.addElement(panel, "button");
                e.title = text;
                e.value = text;
                e.textContent = text;
                return e;
            };
            return QuickDom;
        }());
        htmlui.QuickDom = QuickDom;
    })(htmlui = lighttool.htmlui || (lighttool.htmlui = {}));
})(lighttool || (lighttool = {}));
//# sourceMappingURL=htmlui.js.map