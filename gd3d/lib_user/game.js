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
            this.taskmgr = new gd3d.framework.taskMgr();
            var scene = this.app.getScene();
            this.assetMgr = this.app.getAssetMgr();
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 10;
            this.camera.opvalue = 0;
            objCam.localTranslate.x = 0;
            objCam.localTranslate.y = 0;
            objCam.localTranslate.z = 1;
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            this.overlay = new gd3d.framework.overlay2D();
            this.camera.addOverLay(this.overlay);
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
        };
        Environment.prototype.Update = function (delta) {
            this.taskmgr.move(delta);
        };
        Environment.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
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
        }
        main.prototype.onStart = function (app) {
            this.env = new Game.Environment(app);
            this.env.Init();
            this.stateMgr = new Game.StateMgr();
            this.stateMgr.Init(this.env);
            this.stateMgr.ChangeState(new Game.State.State_First());
        };
        main.prototype.onUpdate = function (delta) {
            this.env.Update(delta);
            this.stateMgr.Update(delta);
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
        };
        return StateMgr;
    }());
    Game.StateMgr = StateMgr;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State;
    (function (State) {
        var State_First = (function () {
            function State_First() {
            }
            State_First.prototype.OnInit = function (env, statemgr) {
                this.env = env;
                this.statemgr = statemgr;
                console.log("i am here. FirstState");
                this.env.taskmgr.addTaskCall(this.loadTexture.bind(this));
                this.env.taskmgr.addTaskCall(this.createUI.bind(this));
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
            State_First.prototype.createUI = function (astState, state) {
                var _this = this;
                var atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json");
                var tex_0 = this.env.assetMgr.getAssetByName("zg03_256.png");
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
                bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT, 60);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP, 60);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 60);
                bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM, 60);
                var lab_t = new gd3d.framework.transform2D;
                lab_t.name = "我是段文本_lable";
                lab_t.width = 120;
                lab_t.height = 100;
                lab_t.localTranslate.x = -10;
                lab_t.localTranslate.y = -10;
                bg_t.addChild(lab_t);
                var lab_l = lab_t.addComponent("label");
                this["lab"] = lab_l;
                lab_l.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json");
                lab_l.fontsize = 24;
                lab_l.text = "我是段文本\n换行测试";
                lab_l.color = new gd3d.math.color(0.2, 0.2, 0.2, 1);
                this["obj"] = this;
                var btn_t = new gd3d.framework.transform2D;
                btn_t.name = "btn_按鈕";
                btn_t.width = 100;
                btn_t.height = 36;
                btn_t.pivot.x = 0;
                btn_t.pivot.y = 0;
                btn_t.localTranslate.x = 10;
                btn_t.localTranslate.y = 70;
                bg_t.addChild(btn_t);
                var btn_b = btn_t.addComponent("button");
                btn_b.targetImage = btn_t.addComponent("image2D");
                btn_b.targetImage.sprite = atlasComp.sprites["ui_public_button_hits"];
                btn_b.pressedGraphic = atlasComp.sprites["ui_public_button_1"];
                btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
                btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;
                var closeSce = 0.8;
                var close_bt = new gd3d.framework.transform2D;
                close_bt.width = 25 * closeSce;
                close_bt.height = 25 * closeSce;
                close_bt.pivot.x = 0;
                close_bt.pivot.y = 0;
                close_bt.localTranslate.x = 370;
                close_bt.localTranslate.y = 2;
                bg_t.addChild(close_bt);
                var close_b = close_bt.addComponent("button");
                close_b.targetImage = close_bt.addComponent("image2D");
                close_b.targetImage.sprite = atlasComp.sprites["ui_boundary_close_in"];
                close_b.pressedGraphic = atlasComp.sprites["ui_boundary_close"];
                close_b.transition = gd3d.framework.TransitionType.SpriteSwap;
                close_bt.layoutState = 0 | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP;
                close_bt.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 5);
                close_bt.setLayoutValue(gd3d.framework.layoutOption.TOP, 3);
                var nums = "45789";
                var scale = 0.6;
                var numIconarr = [];
                for (var i = 0; i < nums.length; i++) {
                    var spt_t = new gd3d.framework.transform2D;
                    spt_t.width = 32 * scale;
                    spt_t.height = 42 * scale;
                    spt_t.pivot.x = 0;
                    spt_t.pivot.y = 0;
                    spt_t.localTranslate.x = spt_t.width * i + 10;
                    spt_t.localTranslate.y = 120;
                    bg_t.addChild(spt_t);
                    var spt = spt_t.addComponent("image2D");
                    spt.sprite = atlasComp.sprites["ui_lianji_" + nums[i]];
                    numIconarr.push(spt);
                }
                btn_b.addListener(gd3d.event.UIEventEnum.PointerClick, function () {
                    _this.OnBtn_ChangeState();
                }, this);
                var iptFrame_t = new gd3d.framework.transform2D;
                iptFrame_t.width = 120;
                iptFrame_t.height = 30;
                iptFrame_t.pivot.x = 0;
                iptFrame_t.pivot.y = 0;
                iptFrame_t.localTranslate.x = 10;
                iptFrame_t.localTranslate.y = 160;
                bg_t.addChild(iptFrame_t);
                var ipt = iptFrame_t.addComponent("inputField");
                ipt.LineType = gd3d.framework.lineType.MultiLine;
                var img_t = new gd3d.framework.transform2D;
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
                var text_t = new gd3d.framework.transform2D;
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
                var p_t = new gd3d.framework.transform2D;
                p_t.width = iptFrame_t.width;
                p_t.height = iptFrame_t.height;
                iptFrame_t.addChild(p_t);
                ipt.PlaceholderLabel = p_t.addComponent("label");
                ipt.PlaceholderLabel.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json");
                ipt.PlaceholderLabel.fontsize = 24;
                ipt.PlaceholderLabel.color = new gd3d.math.color(0.6, 0.6, 0.6, 1);
                var scroll_t = new gd3d.framework.transform2D;
                scroll_t.width = 160;
                scroll_t.height = 200;
                bg_t.addChild(scroll_t);
                scroll_t.localTranslate.x = 160;
                scroll_t.localTranslate.y = 30;
                var scroll_ = scroll_t.addComponent("scrollRect");
                var ct = new gd3d.framework.transform2D;
                scroll_t.addChild(ct);
                scroll_.inertia = true;
                ct.width = 300;
                ct.height = 300;
                scroll_.decelerationRate = 0.135;
                scroll_.content = ct;
                scroll_t.isMask = true;
                scroll_.horizontal = true;
                scroll_.vertical = true;
                var raw_t2 = new gd3d.framework.transform2D;
                raw_t2.name = "滑动卷轴框png";
                raw_t2.width = 300;
                raw_t2.height = 300;
                var raw_i2 = raw_t2.addComponent("rawImage2D");
                raw_i2.image = tex_0;
                ct.addChild(raw_t2);
                State_First.temp = iptFrame_t;
                var inputMgr = this.env.app.getInputMgr();
                this.env.app.webgl.canvas.addEventListener("keydown", function (ev) {
                    if (ev.keyCode == 81) {
                    }
                }, false);
                state.finish = true;
            };
            State_First.prototype.loadTexture = function (lastState, state) {
                var _this = this;
                this.env.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.env.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.env.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    if (s.isfinish) {
                                        _this.env.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                            _this.env.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                                if (s.isfinish) {
                                                    state.finish = true;
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
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
        var State_Second = (function () {
            function State_Second() {
            }
            State_Second.prototype.OnInit = function (env, statemgr) {
                this.env = env;
                this.statemgr = statemgr;
                console.log("i am here. SecondState");
                this.env.taskmgr.addTaskCall(this.loadText.bind(this));
                this.env.taskmgr.addTaskCall(this.loadMap.bind(this));
                this.env.taskmgr.addTaskCall(this.addcube.bind(this));
            };
            State_Second.prototype.OnExit = function () {
            };
            State_Second.prototype.OnUpdate = function (delta) {
            };
            State_Second.prototype.loadMap = function (laststate, state) {
                var _this = this;
                var assetMgr = this.env.app.getAssetMgr();
                assetMgr.load("res/_game/tmx.json", gd3d.framework.AssetTypeEnum.TextAsset, function (s) {
                    if (s.isfinish) {
                        var textasset = s.resstateFirst.res;
                        _this.map = textasset.content;
                        console.log("map=" + _this.map);
                        state.finish = true;
                        return;
                    }
                });
            };
            State_Second.prototype.loadText = function (laststate, state) {
                var _this = this;
                var assetMgr = this.env.app.getAssetMgr();
                assetMgr.load("res/_game/tmx.png", gd3d.framework.AssetTypeEnum.Texture, function (s) {
                    if (s.isfinish) {
                        _this.tex = s.resstateFirst.res;
                        state.finish = true;
                    }
                });
            };
            State_Second.prototype.addcube = function (laststate, state) {
                for (var i = -4; i < 5; i++) {
                    for (var j = -4; j < 5; j++) {
                        var cube = new gd3d.framework.transform();
                        cube.name = "cube";
                        cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                        cube.localTranslate.x = i;
                        cube.localTranslate.y = j;
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
                        }
                    }
                }
                state.finish = true;
            };
            return State_Second;
        }());
        State.State_Second = State_Second;
    })(State = Game.State || (Game.State = {}));
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map