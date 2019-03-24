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
                            loginInfo = Game.Common.LocalStore.Get("loginInfo");
                            if (!loginInfo) return [3, 3];
                            Game.Common.APITools.loginInfo = JSON.parse(loginInfo);
                            return [4, Game.Common.APITools.CheckToken()];
                        case 2:
                            if (_a.sent())
                                this.stateMgr.ChangeState(new Game.State.State_Second());
                            else
                                this.stateMgr.ChangeState(new Game.State.State_Login());
                            return [3, 4];
                        case 3:
                            this.stateMgr.ChangeState(new Game.State.State_Login());
                            _a.label = 4;
                        case 4:
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
                                    reason(new Error(xhr.responseText));
                                }
                            }
                            else {
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
                    Common.NetTools.Post("" + _this.api + url, data).then(function (xhr) {
                        if (xhr.status == 200) {
                            try {
                                resolve(JSON.parse(xhr.responseText));
                            }
                            catch (e) {
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
            APITools.api = "http://wa.h5game.live:3001";
            return APITools;
        }());
        Common.APITools = APITools;
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
                if (encoding === void 0) { encoding = false; }
                return new Promise(function (resolve, reason) {
                    if (encoding)
                        for (var key in params) {
                            if (typeof (params[key]) == "string")
                                params[key] = escape(params[key]);
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
                this.statemgr.ChangeState(new State.State_Second());
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
                return this.promiseQueueExec([
                    this.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    this.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                    this.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                    this.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                    this.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                    this.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
                ]);
            };
            State_Login.prototype.promiseQueueExec = function (promises) {
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
            State_Login.prototype.loadAsset = function (assetMgr, url) {
                return new Promise(function (resolve) {
                    assetMgr.load(url, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                        if (s.isfinish)
                            resolve();
                    });
                });
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
                                this.statemgr.ChangeState(new State.State_Second());
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
                    text: "     返回",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root
                });
                this.btn_ok = Game.ui.createButton({
                    name: "btn_ok",
                    assetMgr: this.env.assetMgr,
                    hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                    backSprite: atlasComp.sprites["ui_public_button_1"],
                    x: 260, y: 375 + 45,
                    width: 200,
                    text: "     确定",
                    fontcolor: new gd3d.math.color(1, 1, 1, 1),
                    owner: root
                });
                this.btn_back.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnBack.bind(this), this);
                this.btn_ok.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnRegister.bind(this), this);
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
                                this.statemgr.ChangeState(new State.State_Second());
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
            function State_Second() {
            }
            State_Second.prototype.OnInit = function (env, statemgr) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.env = env;
                                this.statemgr = statemgr;
                                console.log("i am here. SecondState");
                                this.map2d = new Game.System.Map2DSystem();
                                return [4, this.map2d.InitAsync(this.env)];
                            case 1:
                                _a.sent();
                                return [4, this.map2d.LoadTmxAsync("res/_game/tmx.json", "res/_game/tmx.png")];
                            case 2:
                                _a.sent();
                                return [2];
                        }
                    });
                });
            };
            State_Second.prototype.OnExit = function () {
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
        var Map2DSystem = (function () {
            function Map2DSystem() {
            }
            Map2DSystem.prototype.InitAsync = function (env) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.env = env;
                        return [2];
                    });
                });
            };
            Map2DSystem.prototype.LoadTmxAsync = function (urlJsonTMX, urlImgForTmx) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = this;
                                return [4, this.loadText(urlImgForTmx)];
                            case 1:
                                _a.tex = _c.sent();
                                _b = this;
                                return [4, this.loadMap(urlJsonTMX)];
                            case 2:
                                _b.map = _c.sent();
                                return [4, this.addcube()];
                            case 3:
                                _c.sent();
                                return [2];
                        }
                    });
                });
            };
            Map2DSystem.prototype.Close = function () {
            };
            Map2DSystem.prototype.loadMap = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var promise;
                    var _this = this;
                    return __generator(this, function (_a) {
                        promise = new Promise(function (__resolve) {
                            var assetMgr = _this.env.app.getAssetMgr();
                            assetMgr.load(url, gd3d.framework.AssetTypeEnum.TextAsset, function (s) {
                                if (s.isfinish) {
                                    var textasset = s.resstateFirst.res;
                                    var maptxt = textasset.content;
                                    var mapobj = JSON.parse(maptxt);
                                    __resolve(mapobj);
                                    return;
                                }
                            });
                        });
                        return [2, promise];
                    });
                });
            };
            Map2DSystem.prototype.loadText = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var tex, wt, promise;
                    return __generator(this, function (_a) {
                        tex = new gd3d.framework.texture();
                        tex.glTexture = new gd3d.render.glTexture2D(this.env.app.webgl, gd3d.render.TextureFormatEnum.RGBA, false, false);
                        wt = tex.glTexture;
                        promise = new Promise(function (__resolve) {
                            var img = new Image();
                            img.onload = function (e) {
                                wt.uploadImage(img, false, false, false, false, false, false);
                                __resolve(tex);
                            };
                            img.src = "res/_game/tmx.png";
                        });
                        return [2, promise];
                    });
                });
            };
            Map2DSystem.prototype._addQuad = function (x, y, tileX, tileY, tileWidth, tileHeight) {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                cube.localTranslate.x = x;
                cube.localTranslate.y = y;
                cube.markDirty();
                this.env.app.getScene().addChild(cube);
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
                    cuber.materials[0].setTexture("_MainTex", this.tex);
                    cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(tileWidth, tileHeight, tileX, tileY));
                }
            };
            Map2DSystem.prototype.addcube = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var tileset, i, layer, y, x, id, tileWidth, tileHeight, tileX, tileY;
                    return __generator(this, function (_a) {
                        tileset = this.map.tilesets[0];
                        for (i = 0; i < this.map.layers.length; i++) {
                            layer = this.map.layers[i];
                            for (y = 0; y < this.map.height; y++) {
                                for (x = 0; x < this.map.width; x++) {
                                    id = layer.data[y * layer.width + x];
                                    if (id == 0)
                                        continue;
                                    tileWidth = (tileset.tileheight / tileset.imageheight);
                                    tileHeight = (tileset.tileheight / tileset.imageheight);
                                    tileX = (((id - 1) % tileset.columns) | 0) * tileWidth;
                                    tileY = (((id - 1) / tileset.columns) | 0) * tileHeight;
                                    tileY = 1.0 - tileY - tileHeight;
                                    this._addQuad(x, -y, tileX, tileY, tileWidth, tileHeight);
                                }
                            }
                        }
                        return [2];
                    });
                });
            };
            return Map2DSystem;
        }());
        System.Map2DSystem = Map2DSystem;
    })(System = Game.System || (Game.System = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ui;
    (function (ui) {
        function createLabel(option) {
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
            createLabel({
                owner: btn_t, text: option.text, assetMgr: option.assetMgr,
                name: "lib_" + option.name, fontcolor: option.fontcolor,
                x: 55,
                y: -30
            });
            return btn_b;
        }
        ui.createButton = createButton;
    })(ui = Game.ui || (Game.ui = {}));
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map