var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Game;
(function (Game) {
    var Environment = (function () {
        function Environment(app) {
            this.app = app;
        }
        Environment.prototype.Init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var scene, objCam;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            scene = this.app.getScene();
                            this.assetMgr = this.app.getAssetMgr();
                            objCam = new gd3d.framework.transform();
                            objCam.name = "sth.";
                            scene.addChild(objCam);
                            this.camera = objCam.gameObject.addComponent("camera");
                            this.camera.near = 0.01;
                            this.camera.far = 10;
                            this.camera.opvalue = 0;
                            this.camera.size = 30;
                            this.camera.getPosAtXPanelInViewCoordinateByScreenPos;
                            objCam.localTranslate.x = 0;
                            objCam.localTranslate.y = 0;
                            objCam.localTranslate.z = -1;
                            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                            objCam.markDirty();
                            this.overlay = new gd3d.framework.overlay2D();
                            this.overlay.matchReference_width = this.app.width;
                            this.overlay.matchReference_height = this.app.height;
                            this.overlay.scaleMode = gd3d.framework.UIScaleMode.SCALE_WITH_SCREEN_SIZE;
                            this.camera.addOverLay(this.overlay);
                            return [4, this.loadShader()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Environment.prototype.Update = function (delta) {
        };
        Environment.prototype.loadShader = function () {
            return __awaiter(this, void 0, void 0, function () {
                var promise;
                var _this = this;
                return __generator(this, function (_a) {
                    promise = new Promise(function (__resolve) {
                        _this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                            if (_state.isfinish) {
                                __resolve();
                            }
                        });
                    });
                    return [2, promise];
                });
            });
        };
        return Environment;
    }());
    Game.Environment = Environment;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var main = (function () {
        function main() {
            this.hadInit = false;
        }
        main.prototype.onStart = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                var loginInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.env = new Game.Environment(app);
                            return [4, this.env.Init()];
                        case 1:
                            _a.sent();
                            this.stateMgr = new Game.StateMgr();
                            this.stateMgr.Init(this.env);
                            this.stateMgr.ChangeState(new Game.State.State_List());
                            loginInfo = Game.Common.LocalStore.Get("loginInfo");
                            if (loginInfo)
                                Game.Common.APITools.loginInfo = JSON.parse(loginInfo);
                            this.hadInit = true;
                            return [2];
                    }
                });
            });
        };
        main.prototype.onUpdate = function (delta) {
            if (this.hadInit) {
                this.env.Update(delta);
                this.stateMgr.Update(delta);
            }
        };
        main.prototype.isClosed = function () {
            return false;
        };
        main = __decorate([
            gd3d.reflect.userCode
        ], main);
        return main;
    }());
    Game.main = main;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var StateMgr = (function () {
        function StateMgr() {
            this.state = null;
        }
        StateMgr.prototype.Init = function (env) {
            this.env = env;
        };
        StateMgr.prototype.ChangeState = function (state) {
            if (this.state != null) {
                this.state.OnExit();
            }
            this.state = state;
            if (this.state != null) {
                this.state.OnInit(this.env, this);
            }
        };
        StateMgr.prototype.Update = function (delta) {
            this.state.OnUpdate(delta);
        };
        return StateMgr;
    }());
    Game.StateMgr = StateMgr;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Common;
    (function (Common) {
        var APITools = (function () {
            function APITools() {
            }
            APITools.APIPost = function (url, data, binrary) {
                var _this = this;
                if (binrary === void 0) { binrary = false; }
                return new Promise(function (resolve, reason) {
                    Common.NetTools.Post("" + _this.api + url, data).then(function (xhr) {
                        if (binrary)
                            resolve(xhr.response);
                        else {
                            if (xhr.status == 200) {
                                try {
                                    resolve(JSON.parse(xhr.responseText));
                                }
                                catch (e) {
                                    console.error("error:" + xhr.responseText + " ", "" + _this.api + url, data);
                                    console.error("error:" + xhr.status + " " + xhr.statusText);
                                    reason(new Error(xhr.responseText));
                                }
                            }
                            else {
                                console.error("error:" + xhr.responseText + " ", "" + _this.api + url, data);
                                console.error("error:" + xhr.status + " " + xhr.statusText);
                                reason(new Error("error:" + xhr.status + " " + xhr.statusText));
                            }
                        }
                    });
                });
            };
            APITools.APIGet = function (url, data) {
                var _this = this;
                return new Promise(function (resolve, reason) {
                    Common.NetTools.Get("" + _this.api + url, data).then(function (xhr) {
                        if (xhr.status == 200) {
                            try {
                                resolve(JSON.parse(xhr.responseText));
                            }
                            catch (e) {
                                console.error("error:" + xhr.status + " " + xhr.statusText, "" + _this.api + url, data);
                                console.error(xhr.responseText);
                                reason(new Error(xhr.responseText));
                            }
                        }
                        else {
                            console.error("error:" + xhr.status + " " + xhr.statusText, "" + _this.api + url, data);
                            reason(new Error("error:" + xhr.status + " " + xhr.statusText));
                        }
                    });
                });
            };
            APITools.UserAPIPost = function (url, data, binrary) {
                if (binrary === void 0) { binrary = false; }
                if (data)
                    data.token = this.loginInfo.token;
                return this.APIPost(url, data, binrary);
            };
            APITools.UserAPIGet = function (url, data) {
                if (data)
                    data.token = this.loginInfo.token;
                else if (url.lastIndexOf("token=") == -1) {
                    if (url.lastIndexOf("?") == -1)
                        url = url + "?token=" + this.loginInfo.token;
                    else
                        url = url + "&token=" + this.loginInfo.token;
                }
                return this.APIGet(url, data);
            };
            APITools.Login = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.loginInfo = null;
                                return [4, this.APIPost("/api/user/public/login/uname", data)];
                            case 1:
                                result = _a.sent();
                                if (result.error == 0) {
                                    this.loginInfo = result.body;
                                    Common.LocalStore.Set("loginInfo", JSON.stringify(result.body));
                                }
                                return [2, result];
                        }
                    });
                });
            };
            APITools.Register = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.loginInfo = null;
                                return [4, this.APIPost("/api/user/public/register", data)];
                            case 1:
                                result = _a.sent();
                                if (result.error == 0) {
                                    this.loginInfo = result.body;
                                    Common.LocalStore.Set("loginInfo", JSON.stringify(result.body));
                                }
                                return [2, result];
                        }
                    });
                });
            };
            APITools.CheckToken = function () {
                var _this = this;
                return new Promise(function (resolve, reason) { return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.APIPost("/api/user/checktoken", { token: this.loginInfo.token })];
                            case 1:
                                result = _a.sent();
                                if (result.error != 0)
                                    console.error(result.message);
                                resolve(result.error == 0);
                                return [2];
                        }
                    });
                }); });
            };
            APITools.SaveMap = function (data) {
                return this.UserAPIPost("/api/map/savemap", data);
            };
            APITools.ReadMapList = function () {
                return this.UserAPIGet("/api/map/readmap");
            };
            APITools.DelMap = function (data) {
                return this.UserAPIGet("/api/map/delmap", data);
            };
            APITools.CreateBlock = function (data) {
                return this.UserAPIPost("/api/map/createblock", data);
            };
            APITools.ReadBlockList = function () {
                return this.UserAPIGet("/api/map/readblock");
            };
            APITools.DelBlock = function (data) {
                return this.UserAPIGet("/api/map/delblock", data);
            };
            APITools.GetBlockTexUrl = function (name) {
                if (name.indexOf(".") == 0)
                    name = name.substring(1);
                return "" + this.api + name;
            };
            APITools.api = "http://localhost:9001";
            return APITools;
        }());
        Common.APITools = APITools;
    })(Common = Game.Common || (Game.Common = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Common;
    (function (Common) {
        var AssetTools = (function () {
            function AssetTools() {
            }
            AssetTools.promiseQueueExec = function (promises) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, promises_1, fn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, promises_1 = promises;
                                _a.label = 1;
                            case 1:
                                if (!(_i < promises_1.length)) return [3, 4];
                                fn = promises_1[_i];
                                return [4, fn.call(this)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3, 1];
                            case 4: return [2];
                        }
                    });
                });
            };
            AssetTools.loadAsset = function (assetMgr, url) {
                return new Promise(function (resolve) {
                    assetMgr.load(url, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                        if (s.isfinish)
                            resolve();
                    });
                });
            };
            return AssetTools;
        }());
        Common.AssetTools = AssetTools;
    })(Common = Game.Common || (Game.Common = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Common;
    (function (Common) {
        var LocalStore = (function () {
            function LocalStore() {
            }
            LocalStore.Get = function (key) {
                return this.storeInstance.getItem(key);
            };
            LocalStore.Set = function (key, value) {
                this.storeInstance.setItem(key, value);
            };
            LocalStore.Clean = function () {
                this.storeInstance.clear();
            };
            LocalStore.storeInstance = localStorage;
            return LocalStore;
        }());
        Common.LocalStore = LocalStore;
    })(Common = Game.Common || (Game.Common = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Common;
    (function (Common) {
        var NetTools = (function () {
            function NetTools() {
            }
            NetTools.Get = function (url, params, encoding) {
                var _this = this;
                if (encoding === void 0) { encoding = true; }
                return new Promise(function (resolve, reason) {
                    if (params) {
                        url += (url.lastIndexOf("?") == -1) ? "?" : "&";
                        for (var key in params) {
                            var value = params[key];
                            if (encoding && typeof (value) == "string")
                                value = escape(params[key]);
                            url += key + "=" + value + "&";
                        }
                    }
                    _this.GetXhr(url, "GET", function (xhr) {
                        resolve(xhr);
                    }, function (xhr) {
                        reason(xhr);
                    }).send();
                });
            };
            NetTools.Post = function (url, data) {
                var _this = this;
                return new Promise(function (resolve, reason) {
                    if (data && !(data instanceof ArrayBuffer)) {
                        var formdata = new FormData();
                        for (var key in data)
                            formdata.append(key, data[key]);
                        data = formdata;
                    }
                    _this.GetXhr(url, "POST", function (xhr) {
                        resolve(xhr);
                    }, function (xhr) {
                        reason(xhr);
                    }).send(data);
                });
            };
            NetTools.GetXhr = function (url, method, loadend, error, statechage) {
                var xhr = new XMLHttpRequest();
                xhr.onloadend = function (e) {
                    if (loadend)
                        loadend(xhr, e);
                };
                xhr.onerror = function (e) {
                    if (error)
                        error(xhr, e);
                };
                xhr.onreadystatechange = function (e) {
                    if (statechage)
                        statechage(xhr, e);
                };
                xhr.open(method, url);
                return xhr;
            };
            return NetTools;
        }());
        Common.NetTools = NetTools;
    })(Common = Game.Common || (Game.Common = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Common;
    (function (Common) {
        function Random(min, max) {
            var c = max - min + 1;
            return Math.floor(Math.random() * c + min);
        }
        Common.Random = Random;
    })(Common = Game.Common || (Game.Common = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_First = (function () {
            function State_First() {
            }
            State_First.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                console.log("i am here. FirstState");
                                return [4, this.loadTexture()];
                            case 1:
                                _a.sent();
                                return [4, this.createUI()];
                            case 2:
                                _a.sent();
                                return [2];
                        }
                    });
                });
            };
            State_First.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs) {
                    this.env.overlay.removeChild(childs[i]);
                }
            };
            State_First.prototype.OnUpdate = function (delta) {
            };
            State_First.prototype.OnBtn_ChangeState = function () {
                this.statemgr.ChangeState(new State.State_Second(""));
            };
            State_First.prototype.createUI = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var atlasComp, tex_0, bg_t, bg_i, lab_t, lab_l, btn_t, btn_b, closeSce, close_bt, close_b, nums, scale, numIconarr, i, spt_t, spt, iptFrame_t, ipt, img_t, text_t, p_t, scroll_t, scroll_, ct, raw_t2, raw_i2, inputMgr;
                    var _this = this;
                    return __generator(this, function (_a) {
                        atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                        tex_0 = this.env.assetMgr.getAssetByName("zg03_256.png");
                        bg_t = new gd3d.framework.transform2D;
                        bg_t.name = "框底图";
                        bg_t.width = 400;
                        bg_t.height = 260;
                        bg_t.pivot.x = 0;
                        bg_t.pivot.y = 0;
                        bg_t.localTranslate.y = 100;
                        this.env.overlay.addChild(bg_t);
                        bg_i = bg_t.addComponent("image2D");
                        bg_i.imageType = gd3d.framework.ImageType.Sliced;
                        bg_i.sprite = atlasComp.sprites["bg"];
                        bg_i.imageBorder.l = 10;
                        bg_i.imageBorder.t = 50;
                        bg_i.imageBorder.r = 10;
                        bg_i.imageBorder.b = 10;
                        bg_t.layoutState = 0 | gd3d.framework.layoutOption.LEFT | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP | gd3d.framework.layoutOption.BOTTOM;
                        bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT, 60);
                        bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP, 60);
                        bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 60);
                        bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM, 60);
                        lab_t = new gd3d.framework.transform2D;
                        lab_t.name = "我是段文本_lable";
                        lab_t.width = 120;
                        lab_t.height = 100;
                        lab_t.localTranslate.x = -10;
                        lab_t.localTranslate.y = -10;
                        bg_t.addChild(lab_t);
                        lab_l = lab_t.addComponent("label");
                        this["lab"] = lab_l;
                        lab_l.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json");
                        lab_l.fontsize = 24;
                        lab_l.text = "我是段文本\n换行测试";
                        lab_l.color = new gd3d.math.color(0.2, 0.2, 0.2, 1);
                        this["obj"] = this;
                        btn_t = new gd3d.framework.transform2D;
                        btn_t.name = "btn_按鈕";
                        btn_t.width = 100;
                        btn_t.height = 36;
                        btn_t.pivot.x = 0;
                        btn_t.pivot.y = 0;
                        btn_t.localTranslate.x = 10;
                        btn_t.localTranslate.y = 70;
                        bg_t.addChild(btn_t);
                        btn_b = btn_t.addComponent("button");
                        btn_b.targetImage = btn_t.addComponent("image2D");
                        btn_b.targetImage.sprite = atlasComp.sprites["ui_public_button_hits"];
                        btn_b.pressedGraphic = atlasComp.sprites["ui_public_button_1"];
                        btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
                        btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;
                        closeSce = 0.8;
                        close_bt = new gd3d.framework.transform2D;
                        close_bt.width = 25 * closeSce;
                        close_bt.height = 25 * closeSce;
                        close_bt.pivot.x = 0;
                        close_bt.pivot.y = 0;
                        close_bt.localTranslate.x = 370;
                        close_bt.localTranslate.y = 2;
                        bg_t.addChild(close_bt);
                        close_b = close_bt.addComponent("button");
                        close_b.targetImage = close_bt.addComponent("image2D");
                        close_b.targetImage.sprite = atlasComp.sprites["ui_boundary_close_in"];
                        close_b.pressedGraphic = atlasComp.sprites["ui_boundary_close"];
                        close_b.transition = gd3d.framework.TransitionType.SpriteSwap;
                        close_bt.layoutState = 0 | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP;
                        close_bt.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 5);
                        close_bt.setLayoutValue(gd3d.framework.layoutOption.TOP, 3);
                        nums = "45789";
                        scale = 0.6;
                        numIconarr = [];
                        for (i = 0; i < nums.length; i++) {
                            spt_t = new gd3d.framework.transform2D;
                            spt_t.width = 32 * scale;
                            spt_t.height = 42 * scale;
                            spt_t.pivot.x = 0;
                            spt_t.pivot.y = 0;
                            spt_t.localTranslate.x = spt_t.width * i + 10;
                            spt_t.localTranslate.y = 120;
                            bg_t.addChild(spt_t);
                            spt = spt_t.addComponent("image2D");
                            spt.sprite = atlasComp.sprites["ui_lianji_" + nums[i]];
                            numIconarr.push(spt);
                        }
                        btn_b.addListener(gd3d.event.UIEventEnum.PointerClick, function () {
                            _this.OnBtn_ChangeState();
                        }, this);
                        iptFrame_t = new gd3d.framework.transform2D;
                        iptFrame_t.width = 120;
                        iptFrame_t.height = 30;
                        iptFrame_t.pivot.x = 0;
                        iptFrame_t.pivot.y = 0;
                        iptFrame_t.localTranslate.x = 10;
                        iptFrame_t.localTranslate.y = 160;
                        bg_t.addChild(iptFrame_t);
                        ipt = iptFrame_t.addComponent("inputField");
                        ipt.LineType = gd3d.framework.lineType.MultiLine;
                        img_t = new gd3d.framework.transform2D;
                        img_t.width = iptFrame_t.width;
                        img_t.height = iptFrame_t.height;
                        iptFrame_t.addChild(img_t);
                        ipt.frameImage = img_t.addComponent("image2D");
                        ipt.frameImage.sprite = atlasComp.sprites["ui_public_input"];
                        ipt.frameImage.imageType = gd3d.framework.ImageType.Sliced;
                        ipt.frameImage.imageBorder.l = 16;
                        ipt.frameImage.imageBorder.t = 14;
                        ipt.frameImage.imageBorder.r = 16;
                        ipt.frameImage.imageBorder.b = 14;
                        text_t = new gd3d.framework.transform2D;
                        text_t.width = iptFrame_t.width;
                        text_t.height = iptFrame_t.height;
                        iptFrame_t.addChild(text_t);
                        ipt.TextLabel = text_t.addComponent("label");
                        ipt.TextLabel.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json");
                        ipt.TextLabel.fontsize = 24;
                        ipt.TextLabel.color = new gd3d.math.color(1, 1, 1, 1);
                        text_t.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER;
                        text_t.setLayoutValue(gd3d.framework.layoutOption.H_CENTER, 0);
                        text_t.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 0);
                        p_t = new gd3d.framework.transform2D;
                        p_t.width = iptFrame_t.width;
                        p_t.height = iptFrame_t.height;
                        iptFrame_t.addChild(p_t);
                        ipt.PlaceholderLabel = p_t.addComponent("label");
                        ipt.PlaceholderLabel.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json");
                        ipt.PlaceholderLabel.fontsize = 24;
                        ipt.PlaceholderLabel.color = new gd3d.math.color(0.6, 0.6, 0.6, 1);
                        scroll_t = new gd3d.framework.transform2D;
                        scroll_t.width = 160;
                        scroll_t.height = 200;
                        bg_t.addChild(scroll_t);
                        scroll_t.localTranslate.x = 160;
                        scroll_t.localTranslate.y = 30;
                        scroll_ = scroll_t.addComponent("scrollRect");
                        ct = new gd3d.framework.transform2D;
                        scroll_t.addChild(ct);
                        scroll_.inertia = true;
                        ct.width = 300;
                        ct.height = 300;
                        scroll_.decelerationRate = 0.135;
                        scroll_.content = ct;
                        scroll_t.isMask = true;
                        scroll_.horizontal = true;
                        scroll_.vertical = true;
                        raw_t2 = new gd3d.framework.transform2D;
                        raw_t2.name = "滑动卷轴框png";
                        raw_t2.width = 300;
                        raw_t2.height = 300;
                        raw_i2 = raw_t2.addComponent("rawImage2D");
                        raw_i2.image = tex_0;
                        ct.addChild(raw_t2);
                        State_First.temp = iptFrame_t;
                        inputMgr = this.env.app.getInputMgr();
                        this.env.app.webgl.canvas.addEventListener("keydown", function (ev) {
                            if (ev.keyCode == 81) {
                            }
                        }, false);
                        return [2];
                    });
                });
            };
            State_First.prototype.loadTexture = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var promise;
                    var _this = this;
                    return __generator(this, function (_a) {
                        promise = new Promise(function (__resolve) {
                            _this.env.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                if (s.isfinish) {
                                    _this.env.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                        if (s.isfinish) {
                                            _this.env.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                                if (s.isfinish) {
                                                    _this.env.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                                        _this.env.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                                            if (s.isfinish) {
                                                                __resolve();
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                        return [2, promise];
                    });
                });
            };
            State_First.prototype.testFun = function () {
                var lab = this["lab"];
                var datater = lab["datar"];
                var frist = new gd3d.math.vector2(datater[0], datater[1]);
                var endIdx_0 = datater.length - 13;
                var endIdx_1 = datater.length - 12;
                var end = new gd3d.math.vector2(datater[endIdx_0], datater[endIdx_1]);
                var canvas = lab.transform.canvas;
                var temp = new gd3d.math.vector2();
                canvas.ModelPosToCanvasPos(frist, temp);
                console.error("frist:" + temp.toString());
                canvas.ModelPosToCanvasPos(end, temp);
                console.error("end:" + temp.toString());
            };
            return State_First;
        }());
        State.State_First = State_First;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_GamePlayer = (function () {
            function State_GamePlayer() {
            }
            State_GamePlayer.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    var index;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.stateMgr = statemgr;
                                this.map2d = new Game.System.Map2DSystem();
                                this.map2d.InitAsync(this.env);
                                return [4, this.map2d.LoadTmxAsync(null, null)];
                            case 1:
                                _a.sent();
                                index = this.map2d.CalcIndex(3, 1);
                                this.map2d.baseData.layers[0].data[index] = 1;
                                index = this.map2d.CalcIndex(4, 1);
                                this.map2d.baseData.layers[0].data[index] = 3;
                                index = this.map2d.CalcIndex(6, 1);
                                this.map2d.baseData.layers[0].data[index] = 2;
                                index = this.map2d.CalcIndex(1, 4);
                                this.map2d.baseData.layers[0].data[index] = 3;
                                this.map2d.Parse(this.map2d.baseData);
                                this.gamePlayer = new Game.GamePlayer();
                                return [4, this.gamePlayer.Init(this.map2d)];
                            case 2:
                                _a.sent();
                                this.gamePlayer.EntryScene(this.map2d, 1, 10);
                                this.map2d.PrintMapInfo();
                                return [2];
                        }
                    });
                });
            };
            State_GamePlayer.prototype.OnUpdate = function (delta) {
                if (this.gamePlayer)
                    this.gamePlayer.Update(delta);
            };
            State_GamePlayer.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            return State_GamePlayer;
        }());
        State.State_GamePlayer = State_GamePlayer;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_List = (function () {
            function State_List() {
            }
            State_List.prototype.CreateUI = function () {
                this.CreateFunc("登陆测试", new State.State_Login());
                this.CreateFunc("地块上传", new State.State_Second("", true));
                this.CreateFunc("注册测试", new State.State_Regision(this));
                this.CreateFunc("场景与角色", new State.State_GamePlayer());
            };
            State_List.prototype.loadTexture = function () {
                return Game.Common.AssetTools.promiseQueueExec([
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
                ]);
            };
            State_List.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                return [4, this.loadTexture()];
                            case 1:
                                _a.sent();
                                this.scroll = new Game.ui.ScrollFrame({
                                    width: 300,
                                    height: this.env.app.height - 100
                                });
                                this.scroll.root.layoutState = gd3d.framework.layoutOption.V_CENTER | gd3d.framework.layoutOption.H_CENTER;
                                this.scroll.root.markDirty();
                                this.env.overlay.addChild(this.scroll.root);
                                this.CreateUI();
                                return [2];
                        }
                    });
                });
            };
            State_List.prototype.CreateFunc = function (text, state) {
                var _this = this;
                var atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                var button = Game.ui.createButton({
                    width: 300,
                    height: 40,
                    text: text,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    onClick: function () {
                        _this.statemgr.ChangeState(state);
                    }
                });
                this.scroll.AddComp(button);
                this.scroll.root.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 1);
            };
            State_List.prototype.OnUpdate = function (delta) {
            };
            State_List.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs) {
                    this.env.overlay.removeChild(childs[i]);
                }
            };
            return State_List;
        }());
        State.State_List = State_List;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_Login = (function () {
            function State_Login() {
            }
            State_Login.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                return [4, this.loadTexture()];
                            case 1:
                                _a.sent();
                                console.log("loadtexture finish");
                                this.createUI();
                                return [2];
                        }
                    });
                });
            };
            State_Login.prototype.OnUpdate = function (delta) {
            };
            State_Login.prototype.OnExit = function () {
                this.btn_login.removeListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
                this.btn_register.removeListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
                this.bg_t.dispose();
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            State_Login.prototype.loadTexture = function () {
                return Game.Common.AssetTools.promiseQueueExec([
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
                ]);
            };
            State_Login.prototype.createUI = function () {
                var atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                var bg_t = new gd3d.framework.transform2D;
                bg_t.name = "框底图";
                bg_t.width = 400;
                bg_t.height = 260;
                bg_t.pivot.x = 0;
                bg_t.pivot.y = 0;
                bg_t.localTranslate.y = 100;
                this.env.overlay.addChild(bg_t);
                var bg_i = bg_t.addComponent("image2D");
                bg_i.imageType = gd3d.framework.ImageType.Sliced;
                bg_i.sprite = atlasComp.sprites["bg"];
                bg_i.imageBorder.l = 10;
                bg_i.imageBorder.t = 50;
                bg_i.imageBorder.r = 10;
                bg_i.imageBorder.b = 10;
                bg_t.layoutState = 0 | gd3d.framework.layoutOption.LEFT | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP | gd3d.framework.layoutOption.BOTTOM;
                bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT, 0);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP, 0);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 0);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM, 0);
                this.bg_t = bg_t;
                this.lab_message = Game.ui.createLabel({
                    name: "lib_msg", text: "", assetMgr: this.env.assetMgr,
                    x: 200,
                    y: 70,
                    width: 300,
                    fontcolor: new gd3d.math.color(255, 0, 0, 1)
                });
                bg_t.addChild(this.lab_message.transform);
                bg_t.addChild(Game.ui.createLabel({
                    name: "lib_loginame", text: "用户名:", assetMgr: this.env.assetMgr,
                    x: 100,
                    y: 100
                }).transform);
                this.ipt_loginame = Game.ui.createInput({
                    name: "txt_loginname",
                    placeholder: "请输入用户名...",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 135,
                    width: 280
                });
                bg_t.addChild(this.ipt_loginame.transform);
                bg_t.addChild(Game.ui.createLabel({
                    name: "lib_loginame", text: "密码:", assetMgr: this.env.assetMgr,
                    x: 100,
                    y: 160
                }).transform);
                this.ipt_password = Game.ui.createInput({
                    name: "txt_password",
                    placeholder: "",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 195,
                    width: 280,
                    contentType: gd3d.framework.contentType.PassWord
                });
                bg_t.addChild(this.ipt_password.transform);
                this.btn_register = Game.ui.createButton({
                    name: "btn_login",
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 100, y: 195 + 45,
                    width: 200,
                    text: "注册新号",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                });
                this.btn_login = Game.ui.createButton({
                    name: "btn_login",
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 300, y: 195 + 45,
                    width: 200,
                    text: "进入游戏",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                });
                this.btn_login.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
                this.btn_register.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnRegister.bind(this), this);
                bg_t.addChild(this.btn_login.transform);
                bg_t.addChild(this.btn_register.transform);
            };
            State_Login.prototype.OnLogin = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("\u767B\u5F55-> loginname:" + this.ipt_loginame.text + ",password:" + this.ipt_password.text);
                                this.lab_message.text = null;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, Game.Common.APITools.Login({ username: this.ipt_loginame.text, password: this.ipt_password.text })];
                            case 2:
                                result = _a.sent();
                                if (result.error != 0) {
                                    this.lab_message.text = result.message;
                                    return [2];
                                }
                                this.statemgr.ChangeState(new State.State_Menu());
                                return [3, 4];
                            case 3:
                                e_1 = _a.sent();
                                this.lab_message.text = "" + e_1.message;
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                });
            };
            State_Login.prototype.OnRegister = function () {
                console.log("注册");
                this.statemgr.ChangeState(new State.State_Regision(this));
            };
            return State_Login;
        }());
        State.State_Login = State_Login;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_Menu = (function () {
            function State_Menu() {
            }
            State_Menu.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                return [4, this.loadTexture()];
                            case 1:
                                _a.sent();
                                this.CreateUI();
                                return [2];
                        }
                    });
                });
            };
            State_Menu.prototype.loadTexture = function () {
                return Game.Common.AssetTools.promiseQueueExec([
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
                ]);
            };
            State_Menu.prototype.OnUpdate = function (delta) {
            };
            State_Menu.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            State_Menu.prototype.CreateUI = function () {
                var _this = this;
                var atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                var root = new gd3d.framework.transform2D();
                this.env.overlay.addChild(root);
                root.markDirty();
                var x = gd3d.framework.sceneMgr.app.width / 2 - (300 / 2);
                var btn_enterGame = Game.ui.createButton({
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: x, y: 135,
                    width: 300,
                    text: "           选择地图",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root,
                    onClick: function () {
                        _this.statemgr.ChangeState(new State.State_SelectMap());
                    }
                });
                Game.ui.createButton({
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: x, y: 135 + 60 * 1,
                    width: 300,
                    text: "           编辑模式",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root,
                    onClick: function () {
                        _this.statemgr.ChangeState(new State.State_SelectMap(true));
                    }
                });
                Game.ui.createButton({
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: x, y: 135 + 60 * 2,
                    width: 300,
                    text: "           退出登录",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root,
                    onClick: function () {
                        Game.Common.LocalStore.Clean();
                        _this.statemgr.ChangeState(new State.State_Login());
                    }
                });
            };
            return State_Menu;
        }());
        State.State_Menu = State_Menu;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_Regision = (function () {
            function State_Regision(upstate) {
                this.upstate = upstate;
            }
            State_Regision.prototype.OnInit = function (env, statemgr) {
                this.env = env;
                this.statemgr = statemgr;
                this.createUI();
            };
            State_Regision.prototype.OnUpdate = function (delta) {
            };
            State_Regision.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            State_Regision.prototype.createUI = function () {
                var atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                var root = new gd3d.framework.transform2D();
                this.env.overlay.addChild(root);
                root.markDirty();
                this.lab_message = Game.ui.createLabel({
                    name: "lib_msg", text: "", assetMgr: this.env.assetMgr,
                    x: 180,
                    y: 20,
                    width: 300,
                    fontcolor: new gd3d.math.color(255, 0, 0, 1),
                    owner: root
                });
                Game.ui.createLabel({ text: "昵称:", assetMgr: this.env.assetMgr, x: 75, y: 50, owner: root });
                this.ipt_nickname = Game.ui.createInput({
                    placeholder: "昵称...",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 80,
                    width: 280,
                    owner: root
                });
                Game.ui.createLabel({ text: "用户名:", assetMgr: this.env.assetMgr, x: 75, y: 100, owner: root });
                this.ipt_loginame = Game.ui.createInput({
                    placeholder: "请输入用户名...",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 135,
                    width: 280,
                    owner: root
                });
                Game.ui.createLabel({ text: "密码:", assetMgr: this.env.assetMgr, x: 75, y: 160, owner: root });
                this.ipt_password = Game.ui.createInput({
                    placeholder: "输入您的密码",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 195,
                    width: 280,
                    contentType: gd3d.framework.contentType.PassWord,
                    owner: root
                });
                Game.ui.createLabel({ text: "重复密码:", assetMgr: this.env.assetMgr, x: 75, y: 220, owner: root });
                this.ipt_repassword = Game.ui.createInput({
                    placeholder: "再次输入密码",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 255,
                    width: 280,
                    contentType: gd3d.framework.contentType.PassWord,
                    owner: root
                });
                Game.ui.createLabel({ text: "邮箱:", assetMgr: this.env.assetMgr, x: 75, y: 285, owner: root });
                this.ipt_email = Game.ui.createInput({
                    placeholder: ".....@qq.com",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 315,
                    width: 280,
                    owner: root
                });
                Game.ui.createLabel({ text: "联系电话:", assetMgr: this.env.assetMgr, x: 75, y: 345, owner: root });
                this.ipt_phone = Game.ui.createInput({
                    placeholder: "+86.....",
                    assetMgr: this.env.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 180, y: 375,
                    width: 280,
                    owner: root
                });
                this.btn_back = Game.ui.createButton({
                    name: "btn_back",
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 40, y: 375 + 45,
                    width: 200,
                    text: "返回",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root,
                    onClick: this.OnBack.bind(this)
                });
                this.btn_ok = Game.ui.createButton({
                    name: "btn_ok",
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 260, y: 375 + 45,
                    width: 200,
                    text: "确定",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root,
                    onClick: this.OnRegister.bind(this)
                });
            };
            State_Regision.prototype.OnBack = function () {
                this.statemgr.ChangeState(this.upstate);
            };
            State_Regision.prototype.OnRegister = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this.ipt_loginame.text.trim().length < 4)
                                    return [2, this.lab_message.text = "登录名不能小于4个字符"];
                                if (this.ipt_nickname.text.trim().length < 2)
                                    return [2, this.lab_message.text = "请输入昵称"];
                                if (this.ipt_password.text.trim().length < 6)
                                    return [2, this.lab_message.text = "请输入6位密码"];
                                if (this.ipt_password.text != this.ipt_repassword.text)
                                    return [2, this.lab_message.text = "两次密码不一致"];
                                return [4, Game.Common.APITools.Register({
                                        nickname: this.ipt_nickname.text,
                                        username: this.ipt_loginame.text,
                                        password: this.ipt_password.text,
                                        email: this.ipt_email.text,
                                        phone: this.ipt_phone.text
                                    })];
                            case 1:
                                result = _a.sent();
                                if (result.error != 0)
                                    return [2, this.lab_message.text = result.message];
                                this.statemgr.ChangeState(new State.State_Menu());
                                return [2];
                        }
                    });
                });
            };
            return State_Regision;
        }());
        State.State_Regision = State_Regision;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_Second = (function () {
            function State_Second(mapName, isEditor) {
                if (isEditor === void 0) { isEditor = false; }
                this.mapName = mapName;
                this.isEditor = isEditor;
            }
            State_Second.prototype.LoadTexture = function () {
                return Game.Common.AssetTools.promiseQueueExec([
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/add_64.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/del_16.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/border.png"),
                ]);
            };
            State_Second.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    var editorGame;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                console.log("i am here. SecondState");
                                return [4, this.LoadTexture()];
                            case 1:
                                _a.sent();
                                this.map2d = new Game.System.Map2DSystem();
                                return [4, this.map2d.InitAsync(this.env)];
                            case 2:
                                _a.sent();
                                if (!this.mapName) return [3, 4];
                                return [4, this.map2d.LoadTmxAsync(Game.System.Map2DSystem.mapsDataStore[this.mapName], Game.System.Map2DSystem.mapBlockStore)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                if (this.isEditor) {
                                    editorGame = new Game.ui.EditorGame(this.mapName);
                                    this.env.overlay.addChild(editorGame.Init());
                                    editorGame.OnSaveMap = function (name, width, height) {
                                        _this.map2d.root.removeAllChild();
                                        {
                                            var defBlockKey = void 0;
                                            for (var key in Game.System.Map2DSystem.mapBlockStore) {
                                                defBlockKey = key;
                                                _this.map2d.mapBlocks[key] = Game.System.Map2DSystem.mapBlockStore[key];
                                                break;
                                            }
                                            var emitData = Game.System.Map2DSystem.CreateEmitData(width, height, defBlockKey);
                                            _this.map2d.LoadTmxAsync(emitData, Game.System.Map2DSystem.mapBlockStore);
                                        }
                                        _this.curlayer = _this.map2d.baseData.layers[0];
                                    };
                                }
                                return [2];
                        }
                    });
                });
            };
            State_Second.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            State_Second.prototype.OnUpdate = function (delta) {
            };
            return State_Second;
        }());
        State.State_Second = State_Second;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_SelectMap = (function () {
            function State_SelectMap(isEditor) {
                if (isEditor === void 0) { isEditor = false; }
                this.isEditor = isEditor;
            }
            State_SelectMap.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                return [4, this.LoadTexture()];
                            case 1:
                                _a.sent();
                                this.CreateUI();
                                return [2];
                        }
                    });
                });
            };
            State_SelectMap.prototype.LoadTexture = function () {
                return Game.Common.AssetTools.promiseQueueExec([
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/add_64.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/del_16.png"),
                    Game.Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/border.png"),
                ]);
            };
            State_SelectMap.prototype.CreateUI = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var root, tex_add64, tex_border, scroll, blocks, bresult, _i, _a, blockInfo, result, maps, _loop_1, _b, _c, item;
                    var _this = this;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                root = new gd3d.framework.transform2D();
                                this.env.overlay.addChild(root);
                                root.markDirty();
                                tex_add64 = this.env.assetMgr.getAssetByName("add_64.png");
                                tex_border = this.env.assetMgr.getAssetByName("border.png");
                                scroll = new Game.ui.ScrollFrame({
                                    width: this.env.app.width,
                                    height: this.env.app.height,
                                    owner: root
                                });
                                if (this.isEditor) {
                                    scroll.Add({
                                        bg: tex_add64, border: tex_border, width: 128, height: 128, onClick: function () {
                                            _this.statemgr.ChangeState(new State.State_Second(null, true));
                                        }
                                    });
                                }
                                blocks = Game.System.Map2DSystem.mapBlockStore = {};
                                return [4, Game.Common.APITools.ReadBlockList()];
                            case 1:
                                bresult = _d.sent();
                                for (_i = 0, _a = bresult.body; _i < _a.length; _i++) {
                                    blockInfo = _a[_i];
                                    blocks[blockInfo.name] = JSON.parse(blockInfo.data);
                                }
                                return [4, Game.Common.APITools.ReadMapList()];
                            case 2:
                                result = _d.sent();
                                maps = Game.System.Map2DSystem.mapsDataStore = {};
                                _loop_1 = function (item) {
                                    maps[item.name] = JSON.parse(item.data);
                                    scroll.Add({
                                        text: item.name, bg: tex_add64, border: tex_border, width: 128, height: 128, onClick: function () {
                                            _this.statemgr.ChangeState(new State.State_Second(item.name, _this.isEditor));
                                        }
                                    });
                                };
                                for (_b = 0, _c = result.body; _b < _c.length; _b++) {
                                    item = _c[_b];
                                    _loop_1(item);
                                }
                                return [2];
                        }
                    });
                });
            };
            State_SelectMap.prototype.OnUpdate = function (delta) {
            };
            State_SelectMap.prototype.OnExit = function () {
                var childs = this.env.overlay.getChildren();
                for (var i in childs)
                    this.env.overlay.removeChild(childs[i]);
            };
            return State_SelectMap;
        }());
        State.State_SelectMap = State_SelectMap;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var PlayerState;
    (function (PlayerState) {
        PlayerState[PlayerState["None"] = 0] = "None";
        PlayerState[PlayerState["Jump"] = 1] = "Jump";
        PlayerState[PlayerState["Down"] = 2] = "Down";
    })(PlayerState || (PlayerState = {}));
    var GamePlayer = (function () {
        function GamePlayer() {
            this.state = PlayerState.None;
            this.jumpHeight = 3;
            this.jumpSpeed = 8;
            this.downSpeed = 8;
            this.moveSpeed = 3;
            this.jumpStartPos = 0;
            this.dirLR = 0;
            this.dirUD = -1;
            this.assertMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            this.inputmgr = new gd3d.framework.inputMgr(this.assertMgr.app);
        }
        GamePlayer.prototype.Init = function (map) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.map = map;
                            return [4, this.LoadTexture()];
                        case 1:
                            _a.sent();
                            this.Inittrans();
                            return [2];
                    }
                });
            });
        };
        GamePlayer.prototype.LoadTexture = function () {
            return Game.Common.AssetTools.loadAsset(this.assertMgr, "./res/_game/test/gameplayer.png");
        };
        GamePlayer.prototype.Inittrans = function () {
            this.trans = new gd3d.framework.transform();
            this.trans.localScale.x = this.trans.localScale.y = this.trans.localScale.z = 1;
            this.trans.markDirty();
            var tex = this.assertMgr.getAssetByName("gameplayer.png");
            var mesh = this.trans.gameObject.addComponent("meshFilter");
            var smesh = this.assertMgr.getDefaultMesh("quad");
            mesh.mesh = (smesh);
            var renderer = this.trans.gameObject.addComponent("meshRenderer");
            var cuber = renderer;
            var sh = this.assertMgr.getShader("color.shader.json");
            if (sh != null) {
                cuber.materials = [];
                cuber.materials.push(new gd3d.framework.material());
                cuber.materials[0].setShader(sh);
                cuber.materials[0].setTexture("_MainTex", tex);
                cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(1, 1, 0, 0));
            }
        };
        GamePlayer.prototype.Jump = function () {
            if (this.state == PlayerState.Jump)
                return;
            this.state = PlayerState.Jump;
            this.jumpStartPos = this.trans.localTranslate.y;
            this.dirUD = 1;
            console.log("jump");
        };
        GamePlayer.prototype.GetBlock = function (index) {
            var layer = this.map.baseData.layers[0];
            var block = this.map.mapBlocks[layer.refblocks[layer.data[index] - 1]];
            return block;
        };
        GamePlayer.prototype.CheckBlock = function (index) {
            var block = this.GetBlock(index);
            if (block && block.bound != "none")
                return false;
            return true;
        };
        GamePlayer.prototype.CheckMoveX = function (x, y) {
            if (this.dirLR > 0)
                return this.CheckBlock(this.map.CalcIndex(Math.ceil(x), Math.round(y)));
            if (this.dirLR < 0)
                return this.CheckBlock(this.map.CalcIndex(Math.floor(x), Math.round(y)));
            return true;
        };
        GamePlayer.prototype.CheckMoveY = function (x, y) {
            if (this.dirUD > 0)
                return this.CheckBlock(this.map.CalcIndex(Math.round(x), Math.ceil(y)));
            if (this.dirUD < 0)
                return this.CheckBlock(this.map.CalcIndex(Math.round(x), Math.floor(y)));
            return true;
        };
        GamePlayer.prototype.SetPos = function (x, y) {
            if (this.CheckMoveX(x, y))
                this.trans.localTranslate.x = x;
            if (this.CheckMoveY(x, y))
                this.trans.localTranslate.y = y;
        };
        GamePlayer.prototype.Update = function (delta) {
            if (!this.trans)
                return;
            if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.Space)) {
                this.Jump();
            }
            if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.KeyJ)) {
                this.dirLR = -1;
            }
            else if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.KeyL)) {
                this.dirLR = 1;
            }
            else if (this.inputmgr.GetKeyUP(gd3d.event.KeyCode.KeyJ) || this.inputmgr.GetKeyUP(gd3d.event.KeyCode.KeyL))
                this.dirLR = 0;
            var y = this.trans.localTranslate.y + delta * (this.jumpSpeed * this.dirUD);
            var x = this.trans.localTranslate.x + delta * (this.moveSpeed * this.dirLR);
            if ((this.dirUD == 1 && this.trans.localTranslate.y >= this.jumpStartPos + this.jumpHeight) || this.dirUD == 1 && !this.CheckMoveY(this.trans.localTranslate.x, y)) {
                this.dirUD = -1;
            }
            if (this.state == PlayerState.Jump && this.dirUD == -1) {
                if (this.state == PlayerState.Jump && !this.CheckMoveY(this.trans.localTranslate.x, y)) {
                    this.state = PlayerState.None;
                }
            }
            this.SetPos(x, y);
        };
        GamePlayer.prototype.EntryScene = function (map2d, x, y) {
            this.SetPos(x, y);
            map2d.root.addChild(this.trans);
        };
        return GamePlayer;
    }());
    Game.GamePlayer = GamePlayer;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var System;
    (function (System) {
        var TmxLayer = (function () {
            function TmxLayer() {
            }
            return TmxLayer;
        }());
        var TmxProperty = (function () {
            function TmxProperty() {
            }
            return TmxProperty;
        }());
        var TmxTile = (function () {
            function TmxTile() {
            }
            return TmxTile;
        }());
        var TmxTileSet = (function () {
            function TmxTileSet() {
            }
            return TmxTileSet;
        }());
        var TmxStruct = (function () {
            function TmxStruct() {
            }
            return TmxStruct;
        }());
        var blockDesc1 = "\n    {\n        \"refImgs\":[\"./res/_game/test/red.png\"],\n         \"pieces\":[\n            {\n                \"imgIndex\":0,\n                \"x\":0,\n                \"y\":0,\n                \"w\":1,\n                \"h\":1\n            }\n            ],\n        \"bound\":\"wall\",\n        \"layer\":\"forground\",\n        \"displayType\":\"static\",\n        \"displayPicList\":{\n            \"def\":{\n                \"speed\":0,\n                \"pieces\":[0]\n            }\n        }\n    }\n    ";
        var blockDesc2 = "\n    {\n        \"refImgs\":[\"./res/_game/test/green.png\"],\n         \"pieces\":[\n            {\n                \"imgIndex\":0,\n                \"x\":0,\n                \"y\":0,\n                \"w\":1,\n                \"h\":1\n            }\n            ],\n        \"bound\":\"wall\",\n        \"layer\":\"forground\",\n        \"displayType\":\"static\",\n        \"displayPicList\":{\n            \"def\":{\n                \"speed\":0,\n                \"pieces\":[0]\n            }\n        }\n    }\n    ";
        var blockDesc3 = "\n    {\n        \"refImgs\":[\"./res/_game/test/blue.png\"],\n         \"pieces\":[\n            {\n                \"imgIndex\":0,\n                \"x\":0,\n                \"y\":0,\n                \"w\":1,\n                \"h\":1\n            }\n            ],\n        \"bound\":\"wall\",\n        \"layer\":\"forground\",\n        \"displayType\":\"static\",\n        \"displayPicList\":{\n            \"def\":{\n                \"speed\":0,\n                \"pieces\":[0]\n            }\n        }\n    }\n    ";
        var blockDesc4 = "\n    {\n         \"refImgs\":[\"./res/_game/test/stairs.png\"],\n         \"pieces\":[\n            {\n                \"imgIndex\":0,\n                \"x\":0,\n                \"y\":0,\n                \"w\":1,\n                \"h\":1\n            }\n            ],\n        \"bound\":\"wall\",\n        \"layer\":\"forground\",\n        \"displayType\":\"static\",\n        \"displayPicList\":{\n            \"def\":{\n                \"speed\":0,\n                \"pieces\":[0]\n            }\n        }\n    }\n    ";
        var testJSON = "\n{\n    \n\t\"version\":\"1.0.0\",\n\t\"layers\":[\n\t\t{\n            \"width\":32,\n            \"height\":16,\n            \"type\":\"bg\",\n            \"data\":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\n\t\t\t\"refblocks\":[\"hash1\",\"hash2\",\"hash3\",\"hash4\"]\n\t\t}\n    ]\n}\n";
        var Map2DSystem = (function () {
            function Map2DSystem() {
                this.mapBlocks = {};
                this.mapTexs = {};
            }
            Map2DSystem.prototype.InitAsync = function (env) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.env = env;
                        this.root = new gd3d.framework.transform();
                        this.root.markDirty();
                        env.app.getScene().addChild(this.root);
                        return [2];
                    });
                });
            };
            Map2DSystem.prototype.LoadTmxAsync = function (jsonData, blocks) {
                return __awaiter(this, void 0, void 0, function () {
                    var mapInfo, block1, block2, block3, block4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mapInfo = jsonData || JSON.parse(testJSON);
                                this.baseData = mapInfo;
                                if (!blocks) {
                                    block1 = JSON.parse(blockDesc1);
                                    block2 = JSON.parse(blockDesc2);
                                    block3 = JSON.parse(blockDesc3);
                                    block4 = JSON.parse(blockDesc4);
                                    this.mapBlocks["hash1"] = block1;
                                    this.mapBlocks["hash2"] = block2;
                                    this.mapBlocks["hash3"] = block3;
                                    this.mapBlocks["hash4"] = block4;
                                }
                                return [4, this.LoadAllBlockImg(blocks == null)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                });
            };
            Map2DSystem.prototype.LoadAllBlockImg = function (isLocal) {
                if (isLocal === void 0) { isLocal = false; }
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b, _i, key, _c, _d, imgname, tex;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _a = [];
                                for (_b in this.mapBlocks)
                                    _a.push(_b);
                                _i = 0;
                                _e.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3, 6];
                                key = _a[_i];
                                _c = 0, _d = this.mapBlocks[key].refImgs;
                                _e.label = 2;
                            case 2:
                                if (!(_c < _d.length)) return [3, 5];
                                imgname = _d[_c];
                                if (!(this.mapTexs[imgname] == undefined)) return [3, 4];
                                return [4, this.loadText(isLocal ? imgname : Game.Common.APITools.GetBlockTexUrl(imgname))];
                            case 3:
                                tex = _e.sent();
                                this.mapTexs[imgname] = tex;
                                _e.label = 4;
                            case 4:
                                _c++;
                                return [3, 2];
                            case 5:
                                _i++;
                                return [3, 1];
                            case 6: return [2];
                        }
                    });
                });
            };
            Map2DSystem.prototype.loadText = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var tex, wt, promise;
                    return __generator(this, function (_a) {
                        console.log("loadtex:" + url);
                        tex = new gd3d.framework.texture();
                        tex.glTexture = new gd3d.render.glTexture2D(this.env.app.webgl, gd3d.render.TextureFormatEnum.RGBA, false, false);
                        wt = tex.glTexture;
                        promise = new Promise(function (__resolve) {
                            var img = new Image();
                            img.crossOrigin = "";
                            img.onload = function (e) {
                                wt.uploadImage(img, false, false, false, false, false, false);
                                __resolve(tex);
                            };
                            img.src = url;
                        });
                        return [2, promise];
                    });
                });
            };
            Map2DSystem.prototype._addQuad = function (x, y, tileX, tileY, tileWidth, tileHeight, tex) {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                cube.localTranslate.x = x;
                cube.localTranslate.y = y;
                cube.markDirty();
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.env.app.getAssetMgr().getDefaultMesh("quad");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.env.app.getAssetMgr().getShader("color.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    cuber.materials[0].setTexture("_MainTex", tex);
                    cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(tileWidth, tileHeight, tileX, tileY));
                }
                this.root.addChild(cube);
            };
            Map2DSystem.prototype.Parse = function (mapInfo) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _a, layer, y, x, id, block, animframe, pieceid, piece, imgurl, texture, tileX, tileY, tileWidth, tileHeight;
                    return __generator(this, function (_b) {
                        for (_i = 0, _a = mapInfo.layers; _i < _a.length; _i++) {
                            layer = _a[_i];
                            for (y = layer.height - 1; y >= 0; --y) {
                                for (x = 0; x < layer.width; ++x) {
                                    id = layer.data[y * layer.width + x];
                                    if (!id)
                                        continue;
                                    block = this.mapBlocks[layer.refblocks[id - 1]];
                                    if (block.displayType == "static") {
                                        animframe = 0;
                                        pieceid = block.displayPicList["def"].pieces[animframe];
                                        piece = block.pieces[pieceid];
                                        imgurl = block.refImgs[piece.imgIndex];
                                        texture = this.mapTexs[imgurl];
                                        tileX = piece.x;
                                        tileY = piece.x;
                                        tileWidth = piece.w;
                                        tileHeight = piece.h;
                                    }
                                    this._addQuad(x, y, tileX, tileY, tileWidth, tileHeight, texture);
                                }
                            }
                        }
                        return [2];
                    });
                });
            };
            Map2DSystem.CreateEmitData = function (w, h, defBlockName) {
                var emitData = [];
                for (var y = 0; y < h; ++y) {
                    for (var x = 0; x < w; ++x) {
                        if (y == 0)
                            emitData.push(1);
                        else
                            emitData.push(0);
                    }
                }
                return {
                    layers: [
                        {
                            width: w,
                            height: h,
                            type: "bg",
                            data: emitData,
                            refblocks: [
                                defBlockName
                            ]
                        }
                    ],
                    version: "1.0.1"
                };
            };
            Map2DSystem.prototype.GetRandomPos = function () {
                var layerIndex = 0;
                var w = this.baseData.layers[layerIndex].width;
                var h = this.baseData.layers[layerIndex].height;
                var refblocks = this.baseData.layers[layerIndex].refblocks;
                var pos;
                for (var i = 0; i < 50; ++i) {
                    var y = Game.Common.Random(0, h);
                    var x = Game.Common.Random(0, w);
                    var id = this.CalcIndex(x, y, w);
                    if (id == undefined)
                        continue;
                    var block = this.mapBlocks[refblocks[id - 1]];
                    if (!block || block.bound == "none") {
                        pos = new gd3d.math.vector2(x, y);
                        break;
                    }
                }
                return pos;
            };
            Map2DSystem.CreateEmitBlock = function () {
                return {
                    refImgs: [],
                    pieces: [
                        {
                            "imgIndex": 0,
                            "x": 0,
                            "y": 0,
                            "w": 1,
                            "h": 1
                        }
                    ],
                    bound: "wall",
                    layer: "forground",
                    displayType: "static",
                    displayPicList: {
                        "def": {
                            "speed": 0,
                            "pieces": [0]
                        }
                    }
                };
            };
            Map2DSystem.prototype.CalcID = function (x, y, mapWitdh, layer) {
                return layer.data[y * mapWitdh + x];
            };
            Map2DSystem.prototype.CalcIndex = function (x, y, w) {
                if (w === void 0) { w = 32; }
                if (x < 0 || y < 0)
                    return;
                var index = y * w + x;
                return index;
            };
            Map2DSystem.prototype.GetImageData = function () {
                return this.env.app.webgl.canvas.toDataURL("image/png");
            };
            Map2DSystem.prototype.PrintMapInfo = function () {
                for (var _i = 0, _a = this.baseData.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    var mapString = "layer:" + layer.type + "\n";
                    for (var y = layer.height - 1; y >= 0; --y) {
                        for (var x = 0; x < layer.width; ++x) {
                            var id = layer.data[y * layer.width + x];
                            if (id != undefined)
                                mapString += id + " ";
                        }
                        mapString += "\n";
                    }
                    console.log(mapString);
                }
            };
            Map2DSystem.mapsDataStore = {};
            Map2DSystem.mapBlockStore = {};
            return Map2DSystem;
        }());
        System.Map2DSystem = Map2DSystem;
    })(System = Game.System || (Game.System = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        var CFile = (function () {
            function CFile() {
            }
            CFile.Show = function (select, mimeType) {
                var inp_file = document.createElement("input");
                inp_file.type = "file";
                inp_file.style.display = "none";
                inp_file.accept = ".png,.jpg";
                inp_file.name = "file";
                inp_file.onchange = function (ev) {
                    console.log(ev);
                    var file = inp_file.files[0];
                    if (file)
                        select(file);
                };
                document.body.append(inp_file);
                setTimeout(function () {
                    inp_file.click();
                    inp_file.remove();
                }, 1);
            };
            return CFile;
        }());
        ui.CFile = CFile;
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        var ScrollFrame = (function () {
            function ScrollFrame(option) {
                this.option = option;
                this.fimages = [];
                this.curRow = 0;
                this.click_time = 0;
                this.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
                var scroll_t = new gd3d.framework.transform2D;
                scroll_t.width = option.width;
                scroll_t.height = option.height;
                scroll_t.localTranslate.x = option.x || 30;
                scroll_t.localTranslate.y = option.y || 30;
                var scroll_ = scroll_t.addComponent("scrollRect");
                var ct = new gd3d.framework.transform2D;
                ct.width = option.width;
                scroll_t.addChild(ct);
                scroll_.inertia = true;
                scroll_.decelerationRate = 0.135;
                scroll_.content = ct;
                scroll_t.isMask = true;
                scroll_.horizontal = true;
                scroll_.vertical = true;
                this.root = scroll_t;
                this.context = ct;
                if (option.owner)
                    option.owner.addChild(scroll_t);
                Game.Common.AssetTools.loadAsset(this.assetMgr, "./res/_game/test/del_16.png");
            }
            ScrollFrame.prototype.AddComp = function (comp) {
                var width = comp.transform.width;
                var height = comp.transform.height;
                var maxWCount = parseInt("" + this.option.width / width);
                var col = this.fimages.length % maxWCount;
                comp.transform.localTranslate.x = col * width + col * 10;
                comp.transform.localTranslate.y = this.curRow * height + this.curRow * 10;
                this.context.height = (this.curRow * height + this.curRow * 10) + height;
                this.context.addChild(comp.transform);
                this.fimages.push(comp);
                if (col == maxWCount - 1)
                    ++this.curRow;
            };
            ScrollFrame.prototype.Add = function (option) {
                return __awaiter(this, void 0, void 0, function () {
                    var maxWCount, col, fimg;
                    return __generator(this, function (_a) {
                        maxWCount = parseInt("" + this.option.width / option.width);
                        col = this.fimages.length % maxWCount;
                        option.owner = this.context;
                        option.x = col * option.width + col * 10;
                        option.y = this.curRow * option.height + this.curRow * 10;
                        fimg = this.CreateFrameImage(option);
                        this.context.height = (this.curRow * option.height + this.curRow * 10) + option.height;
                        this.fimages.push(fimg);
                        if (col == maxWCount - 1)
                            ++this.curRow;
                        return [2];
                    });
                });
            };
            ScrollFrame.prototype.CreateFrameImage = function (option) {
                var raw_i2 = ui.CreateFrameImage(option);
                var raw_t2 = raw_i2.transform;
                ui.AddEventInComp(raw_i2, gd3d.event.UIEventEnum.PointerClick, function () {
                    if (option.onClick)
                        option.onClick();
                }, this);
                ui.AddEventInComp(raw_i2, gd3d.event.UIEventEnum.PointerDoubleClick, function () {
                    if (option.onDbClick)
                        option.onDbClick();
                }, this);
                if (option.border) {
                    var bg_t = new gd3d.framework.transform2D;
                    var bg_i = bg_t.addComponent("rawImage2D");
                    bg_t.width = option.width || 0;
                    bg_t.height = option.height || 0;
                    bg_i.image = option.border;
                    bg_i.color = new gd3d.math.color(.3, .3, .3, .2);
                    raw_t2.addChild(bg_t);
                }
                if (option.onDelete) {
                    var delTex_16 = this.assetMgr.getAssetByName("del_16.png");
                    var del_t = new gd3d.framework.transform2D;
                    del_t.width = 16;
                    del_t.height = 16;
                    del_t.transform.localTranslate.x = option.width - 16;
                    del_t.transform.localTranslate.y = 0;
                    var del_i = del_t.addComponent("rawImage2D");
                    del_i.image = delTex_16;
                    ui.AddEventInComp(del_i, gd3d.event.UIEventEnum.PointerClick, function () {
                        if (option.onDelete)
                            option.onDelete();
                    }, this);
                    raw_t2.addChild(del_t);
                }
                if (option.text) {
                    var lab = ui.createLabel({
                        text: option.text,
                        assetMgr: this.assetMgr,
                        width: option.width - 10,
                        height: 30,
                        owner: raw_t2
                    });
                    lab.verticalType = gd3d.framework.VerticalType.Center;
                    lab.horizontalType = gd3d.framework.HorizontalType.Center;
                }
                if (option.owner)
                    option.owner.addChild(raw_t2);
                return raw_t2;
            };
            ScrollFrame.prototype.Clear = function () {
                this.fimages = [];
                this.fimages.length = 0;
                this.context.height = 0;
                this.curRow = 0;
                var childs = this.context.children;
                if (childs) {
                    while (childs.length > 0)
                        this.context.removeChild(childs[0]);
                }
            };
            return ScrollFrame;
        }());
        ui.ScrollFrame = ScrollFrame;
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        function createLabel(option) {
            if (!option.assetMgr)
                option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            var lab_t = new gd3d.framework.transform2D;
            lab_t.name = option.name;
            lab_t.width = option.width || 120;
            lab_t.height = option.height || 100;
            lab_t.localTranslate.x = option.x || 0;
            lab_t.localTranslate.y = option.y || 0;
            if (option.owner)
                option.owner.addChild(lab_t);
            var lab_l = lab_t.addComponent("label");
            lab_l.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json");
            lab_l.fontsize = option.fontsize || 24;
            lab_l.text = option.text;
            lab_l.color = option.fontcolor || new gd3d.math.color(0.2, 0.2, 0.2, 1);
            return lab_l;
        }
        ui.createLabel = createLabel;
        function createInput(option) {
            if (!option.assetMgr)
                option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            var iptFrame_t = new gd3d.framework.transform2D;
            iptFrame_t.width = option.width || 120;
            iptFrame_t.height = option.height || 30;
            iptFrame_t.pivot.x = 0;
            iptFrame_t.pivot.y = 0;
            iptFrame_t.localTranslate.x = option.x || 0;
            iptFrame_t.localTranslate.y = option.y || 0;
            if (option.owner)
                option.owner.addChild(iptFrame_t);
            var ipt = iptFrame_t.addComponent("inputField");
            ipt.LineType = option.LineType || gd3d.framework.lineType.SingleLine;
            ipt.ContentType = option.contentType || gd3d.framework.contentType.Word;
            var img_t = new gd3d.framework.transform2D;
            img_t.width = iptFrame_t.width;
            img_t.height = iptFrame_t.height;
            iptFrame_t.addChild(img_t);
            ipt.frameImage = img_t.addComponent("image2D");
            ipt.frameImage.sprite = option.backSprite;
            ipt.frameImage.imageType = gd3d.framework.ImageType.Sliced;
            ipt.frameImage.imageBorder.l = 16;
            ipt.frameImage.imageBorder.t = 14;
            ipt.frameImage.imageBorder.r = 16;
            ipt.frameImage.imageBorder.b = 14;
            var text_t = new gd3d.framework.transform2D;
            text_t.width = iptFrame_t.width;
            text_t.height = iptFrame_t.height;
            iptFrame_t.addChild(text_t);
            ipt.TextLabel = text_t.addComponent("label");
            ipt.TextLabel.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json");
            ipt.TextLabel.fontsize = option.fontsize || 24;
            ipt.TextLabel.color = new gd3d.math.color(1, 1, 1, 1);
            text_t.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER;
            text_t.setLayoutValue(gd3d.framework.layoutOption.H_CENTER, 0);
            text_t.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 0);
            var p_t = new gd3d.framework.transform2D;
            p_t.width = iptFrame_t.width;
            p_t.height = iptFrame_t.height;
            iptFrame_t.addChild(p_t);
            ipt.PlaceholderLabel = p_t.addComponent("label");
            ipt.PlaceholderLabel.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json");
            ipt.PlaceholderLabel.fontsize = option.fontsize || 24;
            ipt.PlaceholderLabel.color = new gd3d.math.color(0.6, 0.6, 0.6, 1);
            if (option.placeholder)
                ipt.PlaceholderLabel.text = option.placeholder;
            return ipt;
        }
        ui.createInput = createInput;
        function createButton(option) {
            if (!option.assetMgr)
                option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            var btn_t = new gd3d.framework.transform2D;
            btn_t.name = option.name;
            btn_t.width = option.width || 100;
            btn_t.height = option.height || 36;
            btn_t.pivot.x = 0;
            btn_t.pivot.y = 0;
            btn_t.localTranslate.x = option.x || 0;
            btn_t.localTranslate.y = option.y || 0;
            if (option.owner)
                option.owner.addChild(btn_t);
            var btn_b = btn_t.addComponent("button");
            btn_b.targetImage = btn_t.addComponent("image2D");
            btn_b.targetImage.sprite = option.hitsSprite;
            btn_b.pressedGraphic = option.backSprite;
            btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
            btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;
            if (option.text) {
                var lab = createLabel({
                    owner: btn_t, text: option.text, assetMgr: option.assetMgr,
                    name: "lib_" + option.name, fontcolor: option.fontcolor,
                    width: btn_t.width,
                    height: btn_t.height
                });
                lab.horizontalType = gd3d.framework.HorizontalType.Center;
                lab.verticalType = gd3d.framework.VerticalType.Center;
            }
            if (option.onClick)
                btn_b.addListener(gd3d.event.UIEventEnum.PointerClick, option.onClick, this);
            return btn_b;
        }
        ui.createButton = createButton;
        function CreateFrameImage(option) {
            var raw_t2 = new gd3d.framework.transform2D;
            raw_t2.width = option.width || 0;
            raw_t2.height = option.height || 0;
            raw_t2.transform.localTranslate.x = option.x || 0;
            raw_t2.transform.localTranslate.y = option.y || 0;
            var raw_i2 = raw_t2.addComponent("rawImage2D");
            raw_i2.image = option.bg;
            if (option.border) {
                var bg_t = new gd3d.framework.transform2D;
                var bg_i = bg_t.addComponent("rawImage2D");
                bg_t.width = option.width || 0;
                bg_t.height = option.height || 0;
                bg_i.image = option.border;
                bg_i.color = new gd3d.math.color(.3, .3, .3, .2);
                raw_t2.addChild(bg_t);
            }
            if (option.owner)
                option.owner.addChild(raw_t2);
            return raw_i2;
        }
        ui.CreateFrameImage = CreateFrameImage;
        var helpV2 = new gd3d.math.vector2();
        function AddEventInComp(trans2d, eventEnum, func, thisArg) {
            var _this = trans2d;
            _this.UIEventer = _this.UIEventer || new gd3d.event.UIEvent();
            _this.UIEventer.OnEnum(eventEnum, func, thisArg);
            _this.downPointV2 = _this.downPointV2 || new gd3d.math.vector2();
            var time = 0;
            trans2d.onPointEvent = function (canvas, ev, oncap) {
                if (oncap == false) {
                    helpV2.x = ev.x;
                    helpV2.y = ev.y;
                    var b = _this.transform.ContainsCanvasPoint(helpV2);
                    if (b) {
                        if (ev.type == gd3d.event.PointEventEnum.PointDown) {
                            _this._downInThis = true;
                            var pd = gd3d.event.UIEventEnum.PointerDown;
                            if (_this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pd]) > 0) {
                                ev.eated = true;
                                _this.UIEventer.EmitEnum(pd, ev);
                            }
                            _this.downPointV2.x = ev.x;
                            _this.downPointV2.y = ev.y;
                            _this.isMovedLimit = false;
                        }
                        else if (ev.type == gd3d.event.PointEventEnum.PointHold && _this._downInThis) {
                            if (_this._dragOut == true) {
                                _this._dragOut = false;
                            }
                            if (!_this.isMovedLimit) {
                                _this.isMovedLimit = gd3d.math.vec2Distance(helpV2, _this.downPointV2) > _this.movedLimit;
                            }
                        }
                        else if (ev.type == gd3d.event.PointEventEnum.PointUp && _this._downInThis) {
                            _this._downInThis = false;
                            var pu = gd3d.event.UIEventEnum.PointerUp;
                            if (_this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pu]) > 0) {
                                ev.eated = true;
                                _this.UIEventer.EmitEnum(pu, ev);
                            }
                            var pc = void 0;
                            if (Date.now() - time < 300) {
                                pc = gd3d.event.UIEventEnum.PointerDoubleClick;
                            }
                            else {
                                pc = gd3d.event.UIEventEnum.PointerClick;
                            }
                            if (!_this.isMovedLimit && _this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pc]) > 0) {
                                ev.eated = true;
                                _this.UIEventer.EmitEnum(pc, ev);
                            }
                            time = Date.now();
                        }
                    }
                    else {
                        if (ev.type == gd3d.event.PointEventEnum.PointUp) {
                            _this._downInThis = false;
                        }
                        else if (ev.type == gd3d.event.PointEventEnum.PointHold && _this._downInThis) {
                            if (_this._dragOut == false) {
                                _this._dragOut = true;
                            }
                        }
                    }
                }
            };
        }
        ui.AddEventInComp = AddEventInComp;
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        var dialog;
        (function (dialog) {
            var MesageBox = (function () {
                function MesageBox() {
                }
                MesageBox.Show = function (title, content) {
                };
                return MesageBox;
            }());
            dialog.MesageBox = MesageBox;
        })(dialog = ui.dialog || (ui.dialog = {}));
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        var EditorGame = (function () {
            function EditorGame(mapName) {
                this.mapName = mapName;
                this.uiroot = new gd3d.framework.transform2D();
                this.uiroot.markDirty();
                this.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            }
            EditorGame.prototype.Init = function () {
                this.CreateUI();
                return this.uiroot;
            };
            EditorGame.prototype.CreateUI = function () {
                var _this = this;
                var atlasComp = this.assetMgr.getAssetByName("comp.atlas.json");
                this.tex_border = this.assetMgr.getAssetByName("border.png");
                var inp_name = ui.createInput({
                    placeholder: "地图名",
                    text: this.mapName,
                    assetMgr: this.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 5, y: 5,
                    width: 70,
                    owner: this.uiroot
                });
                var inp_w = ui.createInput({
                    placeholder: "宽度",
                    assetMgr: this.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 95, y: 5,
                    width: 50,
                    owner: this.uiroot
                });
                var inp_h = ui.createInput({
                    placeholder: "高度",
                    assetMgr: this.assetMgr,
                    backSprite: atlasComp.sprites["ui_public_input"],
                    x: 165, y: 5,
                    width: 50,
                    owner: this.uiroot
                });
                ui.createButton({
                    assetMgr: this.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 225, y: 5,
                    width: 150,
                    text: "确定",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: this.uiroot,
                    onClick: function () {
                        var name = inp_name.text;
                        var widht = Number(inp_w.text) || 0;
                        var height = Number(inp_h.text) || 0;
                        if (!name || !widht || !height)
                            return console.error("地图数据正确,无法保存");
                        if (_this.OnSaveMap)
                            _this.OnSaveMap(name, widht, height);
                    }
                });
                this.curBlock = ui.CreateFrameImage({
                    bg: null,
                    width: 64, height: 64,
                    x: 395, y: 5,
                    owner: this.uiroot
                });
                this.CreateBlockUI();
                this.CreateRefBlockUI();
            };
            EditorGame.prototype.CreateBlockUI = function () {
                this.allblock_scroll = new ui.ScrollFrame({
                    width: 70,
                    height: 300,
                    owner: this.uiroot,
                    x: 5, y: 50
                });
                this.RefreshBlockList();
            };
            EditorGame.prototype.CreateRefBlockUI = function () {
                this.refblock_scroll = new ui.ScrollFrame({
                    width: 70,
                    height: 300,
                    owner: this.uiroot,
                    x: 75, y: 50
                });
            };
            EditorGame.prototype.RefreshBlockList = function () {
                var _this = this;
                this.allblock_scroll.Clear();
                setTimeout(function () {
                    var tex_add64 = _this.assetMgr.getAssetByName("add_64.png");
                    _this.allblock_scroll.Add({
                        width: 64,
                        height: 64,
                        bg: tex_add64,
                        border: _this.tex_border,
                        onClick: function () {
                            ui.CFile.Show(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var blockName, blockData, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (this.OnAddBlockTex)
                                                this.OnAddBlockTex(file);
                                            blockName = md5(file.name + "_" + Date.now());
                                            blockData = Game.System.Map2DSystem.CreateEmitBlock();
                                            return [4, Game.Common.APITools.CreateBlock({
                                                    name: blockName,
                                                    desc: "",
                                                    data: JSON.stringify(blockData),
                                                    file: file
                                                })];
                                        case 1:
                                            result = _a.sent();
                                            if (result.error == 0) {
                                                Game.System.Map2DSystem.mapBlockStore[blockName] = result.body;
                                                this.CreateBlockItem(blockName, result.body);
                                            }
                                            else
                                                console.error(result.message);
                                            return [2];
                                    }
                                });
                            }); }, "*.png,*.jpg");
                        },
                        onDbClick: function () {
                        }
                    });
                    var blocks = Game.System.Map2DSystem.mapBlockStore;
                    for (var key in blocks)
                        _this.CreateBlockItem(key, blocks[key]);
                }, 50);
            };
            EditorGame.prototype.CreateBlockItem = function (blockName, block) {
                var _this = this;
                if (!block || !block.refImgs || block.refImgs.length < 1)
                    return;
                var texUrl = Game.Common.APITools.GetBlockTexUrl(block.refImgs[0]);
                Game.Common.AssetTools.loadAsset(this.assetMgr, texUrl).then(function () {
                    var texName = texUrl.substring(texUrl.lastIndexOf("/") + 1);
                    var bgTex = _this.assetMgr.getAssetByName(texName);
                    _this.allblock_scroll.Add({
                        width: 64,
                        height: 64,
                        bg: bgTex,
                        border: _this.tex_border,
                        onClick: function () {
                            _this.curBlock.image = bgTex;
                        },
                        onDelete: function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Game.Common.APITools.DelBlock({ name: blockName })];
                                    case 1:
                                        result = _a.sent();
                                        if (result.error == 0) {
                                            delete Game.System.Map2DSystem.mapBlockStore[blockName];
                                            this.RefreshBlockList();
                                        }
                                        else
                                            console.error(result.message);
                                        return [2];
                                }
                            });
                        }); }
                    });
                });
            };
            return EditorGame;
        }());
        ui.EditorGame = EditorGame;
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map