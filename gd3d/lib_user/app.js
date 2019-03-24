var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var demo_ScreenSplit = (function () {
    function demo_ScreenSplit() {
        this.cameraCurseHover = 0;
        this.windowRate = 0.5;
        this.windowHorizon = true;
        this.mouseOver = false;
        this.mouseEnter = false;
        this.mouseDown = false;
        this.mouseMove = false;
        this.timer = 0;
        this.movetarget = new gd3d.math.vector3();
        this.pointDown = false;
    }
    demo_ScreenSplit.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.inputMgr = this.app.getInputMgr();
        this.scene = this.app.getScene();
        Test_CameraController.instance().init(this.app);
        this.outcontainer = document.getElementById("drawarea");
        var cuber;
        console.warn("Finish it.");
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = 10;
        cube.localScale.y = 0.1;
        cube.localScale.z = 10;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        var smesh = this.app.getAssetMgr().getDefaultMesh("pyramid");
        mesh.mesh = (this.app.getAssetMgr().getDefaultMesh("cube"));
        var renderer = cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        cube.markDirty();
        cuber = renderer;
        this.cube = cube;
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 1;
            this.cube2.localTranslate.x = -5;
            this.cube2.markDirty();
            var mesh = this.cube2.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer");
            var coll = this.cube2.gameObject.addComponent("spherecollider");
            coll.center = new gd3d.math.vector3(0, 1, 0);
            coll.radius = 1;
        }
        this.cube3 = this.cube2.clone();
        this.scene.addChild(this.cube3);
        {
            this.cube3 = new gd3d.framework.transform();
            this.cube3.name = "cube3";
            this.scene.addChild(this.cube3);
            this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 1;
            this.cube3.localTranslate.x = -5;
            this.cube3.markDirty();
            var mesh = this.cube3.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube3.gameObject.addComponent("meshRenderer");
            var coll = this.cube3.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        {
            this.cube4 = new gd3d.framework.transform();
            this.cube4.name = "cube4";
            this.scene.addChild(this.cube4);
            this.cube4.localScale.x = this.cube4.localScale.y = this.cube4.localScale.z = 1;
            this.cube4.localTranslate.x = 5;
            this.cube4.markDirty();
            var mesh = this.cube4.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube4.gameObject.addComponent("meshRenderer");
            var coll = this.cube4.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 100;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
            objCam.lookat(this.cube);
            this.camera.viewport = new gd3d.math.rect(0, 0, 0.5, 1);
            console.log("this camera: " + this.camera.viewport);
            objCam.markDirty();
        }
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            _camera.order = 2;
            objCam2.localTranslate = new gd3d.math.vector3(0, 10, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0.5, 0, 0.5, 1);
            objCam2.markDirty();
            this.camera1 = _camera;
            this.app.webgl.canvas.addEventListener("mousemove", function (ev) {
                var screenRect = _this.outcontainer.getBoundingClientRect();
                var xRate = ev.clientX / screenRect.width;
                var yRate = ev.clientY / screenRect.height;
                console.log("ev.clintY  " + ev.clientY);
                console.log("this.inputMgr.point.y " + _this.inputMgr.point.y);
                if (_this.windowHorizon) {
                    if (xRate < _this.windowRate) {
                        _this.targetCamera = _this.camera;
                        _this.cameraCurseHover = 0;
                    }
                    else {
                        _this.targetCamera = _camera;
                        _this.cameraCurseHover = 1;
                    }
                }
                else {
                    if (yRate < _this.windowRate) {
                        _this.targetCamera = _this.camera;
                        _this.cameraCurseHover = 0;
                    }
                    else {
                        _this.targetCamera = _camera;
                        _this.cameraCurseHover = 1;
                    }
                }
                Test_CameraController.instance().decideCam(_this.targetCamera);
            });
        }
        var boundRect = this.outcontainer.getBoundingClientRect();
        console.log("this boundRect width and " + boundRect.width + "  " + boundRect.height);
        {
            var splitline = document.createElement("div");
            this.splitline = splitline;
            splitline.style.height = boundRect.height + "px";
            splitline.style.width = "6px";
            splitline.style.position = "absolute";
            splitline.style.top = "0px";
            splitline.style.left = boundRect.width / 2 - 3 + "px";
            splitline.style.zIndex = "6";
            splitline.style.background = "#cccccc";
            this.mouseEnter = false;
            this.mouseDown = false;
            this.mouseMove = false;
            this.mouseOver = false;
            splitline.onmouseenter = function (e) {
                _this.mouseEnter = true;
                if (_this.windowHorizon) {
                    splitline.style.cursor = "e-resize";
                }
                else {
                    splitline.style.cursor = "n-resize";
                }
            };
            splitline.onmouseover = function (e) {
                _this.mouseOver = true;
            };
            splitline.onmouseleave = function (e) {
                _this.mouseOver = false;
            };
            this.app.container.addEventListener("mousedown", function (e) {
                if (_this.mouseOver)
                    _this.mouseDown = true;
            }, false);
            this.app.container.addEventListener("mouseup", function (e) {
                _this.mouseDown = false;
                _this.mouseEnter = false;
                _this.mouseMove = false;
            }, false);
            this.app.container.addEventListener("mousemove", function (e) {
                _this.mouseMove = true;
                if (_this.mouseEnter) {
                    if (_this.mouseDown) {
                        var screenRect = _this.outcontainer.getBoundingClientRect();
                        var xRate = e.clientX / screenRect.width;
                        var yRate = e.clientY / screenRect.height;
                        console.log("e.clientY Test" + e.clientY);
                        if (_this.windowHorizon) {
                            _this.splitline.style.left = e.clientX - 3 + "px";
                            _this.windowRate = xRate;
                            _this.camera.viewport = new gd3d.math.rect(0, 0, _this.windowRate, 1);
                            _this.camera1.viewport = new gd3d.math.rect(_this.windowRate, 0, 1 - _this.windowRate, 1);
                            _this.splitline.style.cursor = "e-resize";
                        }
                        else {
                            splitline.style.top = e.clientY - 3 + "px";
                            _this.windowRate = yRate;
                            _this.camera.viewport = new gd3d.math.rect(0, 1 - _this.windowRate, 1, _this.windowRate);
                            _this.camera1.viewport = new gd3d.math.rect(0, 0, 1, 1 - _this.windowRate);
                            _this.splitline.style.cursor = "n-resize";
                        }
                    }
                }
            }, false);
            this.app.container.appendChild(splitline);
        }
        {
            var button1 = document.createElement("button");
            button1.textContent = "横屏/竖屏";
            button1.onclick = function (e) {
                var screenRect = _this.outcontainer.getBoundingClientRect();
                _this.windowHorizon = _this.windowHorizon ? false : true;
                if (_this.windowHorizon) {
                    _this.splitline.style.height = screenRect.height + "px";
                    _this.splitline.style.width = "6px";
                    _this.splitline.style.left = screenRect.width * _this.windowRate - 3 + "px";
                    _this.splitline.style.top = "0px";
                    _this.camera.viewport = new gd3d.math.rect(0, 0, _this.windowRate, 1);
                    _this.camera1.viewport = new gd3d.math.rect(_this.windowRate, 0, 1 - _this.windowRate, 1);
                }
                else {
                    _this.splitline.style.height = "6px";
                    _this.splitline.style.width = screenRect.width + "px";
                    _this.splitline.style.left = "0px";
                    splitline.style.top = screenRect.height * _this.windowRate - 3 + "px";
                    _this.camera.viewport = new gd3d.math.rect(0, 1 - _this.windowRate, 1, _this.windowRate);
                    _this.camera1.viewport = new gd3d.math.rect(0, 0, 1, 1 - _this.windowRate);
                }
            };
            button1.style.top = "130px";
            button1.style.position = "absolute";
            this.app.container.appendChild(button1);
        }
        this.cube.localTranslate;
    };
    demo_ScreenSplit.prototype.update = function (delta) {
        Test_CameraController.instance().update(delta);
        var screenRect = this.outcontainer.getBoundingClientRect();
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            var ray;
            if (this.windowHorizon) {
                if (this.cameraCurseHover == 0) {
                    ray = this.targetCamera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
                }
                else if (this.cameraCurseHover == 1) {
                    ray = this.targetCamera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x - this.app.webgl.canvas.width * this.windowRate, this.inputMgr.point.y), this.app);
                }
            }
            else {
                if (this.cameraCurseHover == 0) {
                    ray = this.targetCamera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
                }
                else if (this.cameraCurseHover == 1) {
                    ray = this.targetCamera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y - this.app.webgl.canvas.height * this.windowRate), this.app);
                }
            }
            console.log("inputMgr.point: " + new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y));
            var tempinfo = gd3d.math.pool.new_pickInfo();
            var bool = this.scene.pick(ray, tempinfo);
            if (bool) {
                gd3d.math.vec3Clone(tempinfo.hitposition, this.movetarget);
                this.timer = 0;
            }
            gd3d.math.pool.delete_pickInfo(tempinfo);
        }
        this.pointDown = this.inputMgr.point.touch;
        var tv = new gd3d.math.vector3();
        this.cube2.localTranslate = this.movetarget;
        this.cube2.markDirty();
        if (this.cube3.gameObject.getComponent("boxcollider").intersectsTransform(this.cube4)) {
            return;
        }
        this.timer += delta;
        this.cube3.localTranslate.x += delta;
        this.cube3.markDirty();
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var tv = new gd3d.math.vector3();
        gd3d.math.vec3SLerp(this.cube2.localTranslate, this.movetarget, this.timer, this.cube2.localTranslate);
        this.cube2.markDirty();
    };
    return demo_ScreenSplit;
}());
var demo_navigaionRVO = (function () {
    function demo_navigaionRVO() {
        this.cubesize = 0.5;
        this.rvoMgr = new gd3d.framework.RVOManager();
        this.isInitPlayer = false;
        this.Goals = [];
        this.enemys = [];
        this.pos = [];
        this.points = [];
        this.timer = 0;
        this.bere = false;
        this.isAKeyDown = false;
        this.pointDown = false;
    }
    demo_navigaionRVO.prototype.start = function (app) {
        var _this = this;
        demo_navigaionRVO.TestRVO = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        this.app.closeFps();
        var descr = document.createElement("p");
        descr.textContent = "\u63D0\u793A: \n \u6309\u4F4F\u952E\u76D8 A \u952E\uFF0C\u70B9\u51FB navmesh \u53EF\u6DFB\u52A0\u654C\u4EBA\uFF01";
        descr.style.top = 0 + "px";
        descr.style.left = 0 + "px";
        descr.style.position = "absolute";
        this.app.container.appendChild(descr);
        var names = ["MainCity_", "testnav", "city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        var name = names[0];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.loadScene(name);
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.far = 10000;
        objCam.localTranslate = new gd3d.math.vector3(0, 100, 0);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
        this.navmeshMgr = gd3d.framework.NavMeshLoadManager.Instance;
        this.addbtn("50px", "打开 RVO", function () {
            _this.rvoMgr.enable();
        });
        this.addbtn("100px", "关闭 RVO", function () {
            _this.rvoMgr.disable();
        });
        this.addbtn("150px", "删除元素", function () {
        });
    };
    demo_navigaionRVO.prototype.initPlayer = function (x, y, z) {
        if (this.isInitPlayer)
            return;
        this.player = this.generateGeomtry("cylinder", new gd3d.math.vector4(0, 1, 0.2, 1));
        this.player.localTranslate.x = x;
        this.player.localTranslate.y = y;
        this.player.localTranslate.z = z;
        this.player.localScale.x = this.player.localScale.z = 2;
        this.player.markDirty();
        this.isInitPlayer = true;
        this.rvoMgr.addAgent(Math.round(Math.random() * 100), this.player, 1, 0, 0.2);
    };
    demo_navigaionRVO.prototype.loadScene = function (assetName, isCompress) {
        var _this = this;
        if (isCompress === void 0) { isCompress = false; }
        var addScene = function () {
            var beAddScene = false;
            if (beAddScene) {
                var _scene = _this.app.getAssetMgr().getAssetByName(assetName + ".scene.json");
                var _root = _scene.getSceneRoot();
                _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
                _root.markDirty();
                _this.app.getScene().lightmaps = [];
                _scene.useLightMap(_this.app.getScene());
                _this.scene.addChild(_root);
            }
            _this.navmeshMgr.loadNavMesh("res/navmesh/" + assetName + ".nav.json", _this.app, function (s) {
                if (s.iserror) {
                    console.error(" " + s.errs + " ");
                    return;
                }
                console.error("scene navmesh : " + assetName + "  is loaded");
                var mtr = new gd3d.framework.material("navmesh_mtr");
                var ass = _this.app.getAssetMgr();
                var sdr = ass.getShader("diffuse.shader.json");
                mtr.setShader(sdr);
                _this.navmeshMgr.showNavmesh(true, mtr);
                console.error(_this.navmeshMgr.navMesh);
                var cc = false;
                if (cc)
                    return;
            });
        };
        if (isCompress) {
            this.app.getAssetMgr().loadCompressBundle("res/scenes/" + assetName + "/" + assetName + ".packs.txt", function (s) {
                if (s.isfinish) {
                    {
                        addScene();
                    }
                }
            });
        }
        else {
            this.app.getAssetMgr().load("res/scenes/" + assetName + "/" + assetName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                if (s1.isfinish) {
                    addScene();
                }
            });
        }
    };
    demo_navigaionRVO.prototype.PosRayNavmesh = function (oPos) {
        if (!this.navmeshMgr.navMesh || !this.navmeshMgr.navTrans)
            return;
        var pickinfo = new gd3d.framework.pickinfo();
        var mesh = this.navmeshMgr.navMesh;
        var ray = new gd3d.framework.ray(new gd3d.math.vector3(oPos.x, oPos.y + 500, oPos.z), new gd3d.math.vector3(0, -1, 0));
        var bool = mesh.intersects(ray, this.navmeshMgr.navTrans.getWorldMatrix(), pickinfo);
        if (!bool)
            return;
        return pickinfo.hitposition;
    };
    demo_navigaionRVO.prototype.pickDown = function () {
        if (this.isAKeyDown) {
            this.addEnemy();
        }
        else {
            this.tryFindingPath();
        }
    };
    demo_navigaionRVO.prototype.rayNavMesh = function () {
        var navTrans = this.navmeshMgr.navTrans;
        var navmesh = this.navmeshMgr.navMesh;
        if (navmesh == null)
            return;
        var inputMgr = this.app.getInputMgr();
        var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        var pickinfo = new gd3d.framework.pickinfo();
        var bool = navmesh.intersects(ray, navTrans.getWorldMatrix(), pickinfo);
        if (!bool)
            return;
        return pickinfo.hitposition;
    };
    demo_navigaionRVO.prototype.addEnemy = function () {
        var endPos = this.rayNavMesh();
        if (!endPos)
            return;
        var trans = this.generateGeomtry("cylinder", new gd3d.math.vector4(1, 0, 0, 1));
        if (!trans)
            return;
        this.enemys.push(trans);
        this.scene.addChild(trans);
        trans.localTranslate.x = endPos.x;
        trans.localTranslate.y = endPos.y;
        trans.localTranslate.z = endPos.z;
        trans.markDirty();
        this.rvoMgr.addAgent(Math.round(Math.random() * 100), trans, 0.5, 3, 0.05);
    };
    demo_navigaionRVO.prototype.tryFindingPath = function () {
        var endPos = this.rayNavMesh();
        if (!endPos)
            return;
        if (this.player) {
            var v3 = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(this.player.localTranslate, v3);
            var temp = this.PosRayNavmesh(this.player.localTranslate);
            if (temp) {
                gd3d.math.vec3Clone(temp, v3);
            }
            this.pos.push(v3);
        }
        else {
            if (!this.isInitPlayer)
                this.initPlayer(endPos.x, endPos.y, endPos.z);
        }
        this.pos.push(endPos);
        if (this.pos.length > 1) {
            var arr = this.navmeshMgr.moveToPoints(this.pos.pop(), this.pos.pop());
            if (!arr)
                return;
            this.pos.length = 0;
            var color = new gd3d.math.color(1, 0, 0, 0.5);
            this.createAllPoint(arr.length);
            for (var i = 0; i < arr.length; i++) {
                var p = arr[i];
                this.setRoadPoint(i, p.x, p.y, p.z, color);
            }
            this.drawLine(arr);
            if (this.Goals) {
                this.Goals.forEach(function (g) {
                    if (g)
                        gd3d.math.pool.delete_vector3(g);
                });
            }
            this.rvoMgr.setRoadPoints(arr);
        }
    };
    demo_navigaionRVO.prototype.drawLine = function (points) {
        if (this.lastLine) {
            this.lastLine.gameObject.visible = false;
            this.lastLine.markDirty();
            if (this.lastLine.parent)
                this.lastLine.parent.removeChild(this.lastLine);
            this.lastLine.dispose();
        }
        var mesh = this.genLineMesh(points);
        this.lastLine = new gd3d.framework.transform();
        var mf = this.lastLine.gameObject.addComponent("meshFilter");
        mf.mesh = mesh;
        mesh.glMesh.lineMode = WebGLRenderingContext.LINE_STRIP;
        this.lastLine.gameObject.addComponent("meshRenderer");
        this.lastLine.localTranslate.x = this.lastLine.localTranslate.y = this.lastLine.localTranslate.z = 0;
        this.scene.addChild(this.lastLine);
        this.lastLine.markDirty();
    };
    demo_navigaionRVO.prototype.genLineMesh = function (points) {
        var meshD = new gd3d.render.meshData();
        meshD.pos = [];
        meshD.color = [];
        meshD.trisindex = [];
        for (var i = 0; i < points.length; i++) {
            var pos = points[i];
            meshD.pos.push(new gd3d.math.vector3(pos.x, pos.y + (this.cubesize / 2), pos.z));
            meshD.trisindex.push(i);
            meshD.color.push(new gd3d.math.color(1, 0, 0, 1));
        }
        var _mesh = new gd3d.framework.mesh();
        _mesh.data = meshD;
        var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Color;
        var v32 = _mesh.data.genVertexDataArray(vf);
        var i16 = _mesh.data.genIndexDataArray();
        _mesh.glMesh = new gd3d.render.glMesh();
        _mesh.glMesh.initBuffer(this.app.webgl, vf, _mesh.data.pos.length);
        _mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);
        _mesh.glMesh.addIndex(this.app.webgl, i16.length);
        _mesh.glMesh.uploadIndexSubData(this.app.webgl, 0, i16);
        _mesh.submesh = [];
        {
            var sm = new gd3d.framework.subMeshInfo();
            sm.matIndex = 0;
            sm.useVertexIndex = 0;
            sm.start = 0;
            sm.size = i16.length;
            sm.line = true;
            _mesh.submesh.push(sm);
        }
        return _mesh;
    };
    demo_navigaionRVO.prototype.createAllPoint = function (count) {
        this.points.forEach(function (element) {
            if (element)
                element.gameObject.visible = false;
        });
        var need = count - this.points.length;
        if (need > 0) {
            for (var i = 0; i < need; i++) {
                var G3D = this.generateGeomtry("cube", new gd3d.math.vector4(0, 0, 1, 1));
                this.points.push(G3D);
                G3D.localScale.x = G3D.localScale.y = G3D.localScale.z = this.cubesize;
            }
        }
    };
    demo_navigaionRVO.prototype.setRoadPoint = function (index, x, y, z, color) {
        var cube = this.points[index];
        cube.localTranslate.x = x;
        cube.localTranslate.y = y;
        cube.localTranslate.z = z;
        cube.markDirty();
        var mf = cube.gameObject.getComponent("meshFilter");
        if (mf.mesh.data.color == null)
            mf.mesh.data.color = [];
        mf.mesh.data.color.forEach(function (c) {
            if (c) {
                c.r = color.r;
                c.g = color.g;
                c.b = color.b;
                c.a = color.a;
            }
        });
        var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal | gd3d.render.VertexFormatMask.Tangent | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0;
        var v32 = mf.mesh.data.genVertexDataArray(vf);
        mf.mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);
        cube.gameObject.visible = true;
    };
    demo_navigaionRVO.prototype.generateGeomtry = function (meshType, color) {
        if (meshType === void 0) { meshType = "cube"; }
        if (color === void 0) { color = null; }
        var G3D = new gd3d.framework.transform;
        var mf = G3D.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh(meshType);
        var mr = G3D.gameObject.addComponent("meshRenderer");
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material("mat");
        mr.materials[0].setShader(this.assetMgr.getShader("diffuse.shader.json"));
        mr.materials[0].setTexture("_MainTex", this.assetMgr.getDefaultTexture("white"));
        if (color)
            mr.materials[0].setVector4("_MainColor", color);
        this.scene.addChild(G3D);
        return G3D;
    };
    demo_navigaionRVO.prototype.update = function (delta) {
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            this.pickDown();
        }
        this.pointDown = this.inputMgr.point.touch;
        if (this.inputMgr.GetKeyDown(65)) {
            this.isAKeyDown = true;
        }
        else {
            this.isAKeyDown = false;
        }
        this.timer += delta;
        CameraController.instance().update(delta);
        this.rvoMgr.update();
    };
    demo_navigaionRVO.prototype.addbtn = function (topOffset, textContent, func) {
        var _this = this;
        var btn = document.createElement("button");
        btn.style.top = topOffset;
        btn.style.position = "fixed";
        btn.style.border = "none";
        btn.style.height = "32px";
        btn.style.borderRadius = "16px";
        btn.style.cursor = "pointer";
        btn.style.margin = "32px";
        btn.style.minWidth = "80px";
        this.app.container.appendChild(btn);
        btn.textContent = textContent;
        btn.onclick = function () {
            _this.camera.postQueues = [];
            func();
            console.log("Handle Clicking..." + textContent);
        };
    };
    return demo_navigaionRVO;
}());
var dome_loadaniplayer = (function () {
    function dome_loadaniplayer() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.roleName = "pc2";
        this.weaponName = "wp_ds_001";
        this.skillName = "pc2_cskill1.FBAni.aniclip.bin";
        this.names = ["pc2_cskill1.FBAni.aniclip.bin", "pc2_skill1.FBAni.aniclip.bin", "pc2_skill34.FBAni.aniclip.bin", "pc2_skill27.FBAni.aniclip.bin", "pc1_skill27.FBAni.aniclip.bin"];
    }
    dome_loadaniplayer.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                state.finish = true;
            }
        });
    };
    dome_loadaniplayer.prototype.loadRole = function (laststate, state) {
        var _this = this;
        var name = this.roleName;
        this.app.getAssetMgr().load("res/prefabs/roles/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var p = _this.assetmgr.getAssetByName(name + ".prefab.json");
                _this.role = p.getCloneTrans();
                _this.ani = _this.role.gameObject.getComponent("aniplayer");
                _this.ani.autoplay = false;
                _this.scene.addChild(_this.role);
                _this.role.markDirty();
                if (_this.weaponName) {
                    _this.loadWeapon(_this.weaponName);
                }
                if (_this.skillName) {
                    _this.loadSkill(_this.skillName);
                }
                state.finish = true;
            }
        });
    };
    dome_loadaniplayer.prototype.loadSkill = function (name) {
        this.assetmgr.load("res/prefabs/roles/" + this.roleName + "/Resources/" + name, gd3d.framework.AssetTypeEnum.Auto, function (s) {
        });
    };
    dome_loadaniplayer.prototype.loadWeapon = function (name) {
        var _this = this;
        this.assetmgr.load("res/prefabs/weapons/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var p = _this.assetmgr.getAssetByName(name + ".prefab.json");
                var rhand = _this.role.find("Bip01 Prop1");
                var lhand = _this.role.find("Bip01 Prop2");
                if (rhand) {
                    var weapon = p.getCloneTrans();
                    rhand.addChild(weapon);
                    weapon.localRotate = new gd3d.math.quaternion();
                    weapon.localTranslate = new gd3d.math.vector3();
                    weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    weapon.markDirty();
                }
                if (lhand) {
                    var weapon = p.getCloneTrans();
                    lhand.addChild(weapon);
                    weapon.localRotate = new gd3d.math.quaternion();
                    weapon.localTranslate = new gd3d.math.vector3();
                    weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    weapon.markDirty();
                }
            }
        });
    };
    dome_loadaniplayer.prototype.ctrlBtn = function (laststate, state) {
        var _this = this;
        var play = document.createElement("button");
        var stop = document.createElement("button");
        var playspeed = document.createElement("input");
        var sel = document.createElement("select");
        sel.value = sel.innerText = this.names[0];
        for (var i_1 = 0; i_1 < this.names.length; i_1++) {
            var op = document.createElement("option");
            op.value = op.innerText = this.names[i_1];
            sel.appendChild(op);
        }
        sel.onchange = function (e) {
            _this.loadSkill(_this.skillName = e.target.value);
        };
        sel.style.height = "20px";
        sel.style.width = "200px";
        sel.style.fontSize = "12px";
        sel.style.top = "150px";
        play.value = "PLAY";
        play.textContent = "PLAY";
        stop.value = "STOP";
        stop.textContent = "STOP";
        play.style.position = stop.style.position = playspeed.style.position = sel.style.position = "absolute";
        play.style.height = stop.style.height = playspeed.style.height = "30px";
        play.style.width = stop.style.width = playspeed.style.width = "100px";
        play.style.left = stop.style.left = playspeed.style.left = sel.style.left = "30px";
        play.style.top = "50px";
        stop.style.top = "85px";
        playspeed.style.top = "120px";
        playspeed.type = "text";
        playspeed.value = "1.0";
        var speed = 1.0;
        playspeed.style.height;
        playspeed.onchange = function () {
            var num = parseFloat(playspeed.value);
            if (isNaN(num)) {
                playspeed.value = speed + "";
            }
            else {
                speed = num;
            }
        };
        var i = 0;
        play.onclick = function () {
            _this.ani.play(_this.skillName);
            var ap = _this.ani;
            if (ap.haveClip(_this.skillName)) {
                ap.play(_this.skillName);
                return;
            }
            var list = ap.awaitLoadClipNames();
            if (!list.indexOf(_this.skillName))
                return;
            var resPath = "res/prefabs/roles/" + _this.roleName + "/resources/";
            var cname = _this.skillName;
            ap.addClipByNameLoad(_this.app.getAssetMgr(), resPath, cname, function (sta, clipName) {
                if (sta.isfinish) {
                    var clip = ap.getClip(cname);
                    ap.play(cname);
                }
            });
        };
        stop.onclick = function () {
            _this.ani.stop();
        };
        this.app.container.appendChild(play);
        this.app.container.appendChild(stop);
        this.app.container.appendChild(playspeed);
        this.app.container.appendChild(sel);
        state.finish = true;
    };
    dome_loadaniplayer.prototype.addCam = function (laststate, state) {
        var objCam = new gd3d.framework.transform;
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        var camera = objCam.gameObject.addComponent("camera");
        camera.near = 0.01;
        camera.far = 2000;
        camera.fov = Math.PI * 0.3;
        camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(5, 5, 5);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    dome_loadaniplayer.prototype.start = function (app) {
        this.app = app;
        this.scene = app.getScene();
        this.assetmgr = app.getAssetMgr();
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadRole.bind(this));
        this.taskmgr.addTaskCall(this.ctrlBtn.bind(this));
        this.taskmgr.addTaskCall(this.addCam.bind(this));
    };
    dome_loadaniplayer.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return dome_loadaniplayer;
}());
var t;
(function (t) {
    var light_d1 = (function () {
        function light_d1() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        light_d1.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        light_d1.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/rock_n256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        light_d1.prototype.addcube = function (laststate, state) {
            var _this = this;
            var sphereString = "res/prefabs/sphere/resources/Sphere.mesh.bin";
            var cubeString = "res/prefabs/cube/resources/Cube.mesh.bin";
            this.app.getAssetMgr().load(sphereString, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    for (var i = -4; i < 5; i++) {
                        for (var j = -4; j < 5; j++) {
                            var baihu = new gd3d.framework.transform();
                            _this.scene.addChild(baihu);
                            baihu.localScale = new gd3d.math.vector3(0.5, 0.5, 0.5);
                            baihu.localTranslate.x = i;
                            baihu.localTranslate.y = j;
                            baihu.markDirty();
                            var smesh1 = _this.app.getAssetMgr().getAssetByName("Sphere.mesh.bin");
                            var mesh1 = baihu.gameObject.addComponent("meshFilter");
                            mesh1.mesh = (smesh1);
                            var renderer = baihu.gameObject.addComponent("meshRenderer");
                            baihu.markDirty();
                            var sh = _this.app.getAssetMgr().getShader("light3.shader.json");
                            renderer.materials = [];
                            renderer.materials.push(new gd3d.framework.material());
                            renderer.materials[0].setShader(sh);
                            var texture = _this.app.getAssetMgr().getAssetByName("rock256.png");
                            renderer.materials[0].setTexture("_MainTex", texture);
                            var tex2 = _this.app.getAssetMgr().getAssetByName("rock_n256.png");
                            renderer.materials[0].setTexture("_NormalTex", tex2);
                        }
                    }
                    state.finish = true;
                }
            });
        };
        light_d1.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 30;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
            {
                var cube = new gd3d.framework.transform();
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
            }
            state.finish = true;
        };
        light_d1.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.onclick = function () {
                if (_this.light != null) {
                    if (_this.light.type == gd3d.framework.LightTypeEnum.Direction) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (_this.light.type == gd3d.framework.LightTypeEnum.Point) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        console.log("聚光灯");
                    }
                    else {
                        _this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            };
            btn.style.top = "124px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        };
        light_d1.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 4, -z2 * 5);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
            }
            if (this.light != null) {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 3, 3, z * 3);
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objlight.markDirty();
            }
        };
        return light_d1;
    }());
    t.light_d1 = light_d1;
})(t || (t = {}));
var localSave = (function () {
    function localSave() {
    }
    Object.defineProperty(localSave, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new localSave();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    localSave.prototype.stringToUtf8Array = function (str) {
        var bstr = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            var cc = c.charCodeAt(0);
            if (cc > 0xFFFF) {
                throw new Error("InvalidCharacterError");
            }
            if (cc > 0x80) {
                if (cc < 0x07FF) {
                    var c1 = (cc >>> 6) | 0xC0;
                    var c2 = (cc & 0x3F) | 0x80;
                    bstr.push(c1, c2);
                }
                else {
                    var c1 = (cc >>> 12) | 0xE0;
                    var c2 = ((cc >>> 6) & 0x3F) | 0x80;
                    var c3 = (cc & 0x3F) | 0x80;
                    bstr.push(c1, c2, c3);
                }
            }
            else {
                bstr.push(cc);
            }
        }
        return bstr;
    };
    localSave.prototype.file_str2blob = function (string) {
        var u8 = new Uint8Array(this.stringToUtf8Array(string));
        var blob = new Blob([u8]);
        return blob;
    };
    localSave.prototype.file_u8array2blob = function (array) {
        var blob = new Blob([array]);
        return blob;
    };
    localSave.prototype.save = function (path, file) {
        var req = new XMLHttpRequest();
        req.open("POST", this.localServerPath + "/hybirdapi/upload" + "?r=" + Math.random(), false);
        var fdata = new FormData();
        fdata.append("path", path);
        fdata.append("file", file);
        req.send(fdata);
        var json = JSON.parse(req.responseText);
        if (json["code"] != 0)
            throw new Error(json["error"]);
        return json["code"];
    };
    localSave.prototype.startDirect = function (exec, path, argc) {
        var req = new XMLHttpRequest();
        req.open("GET", this.localServerPath + "/hybirdapi/startdirect" +
            "?exec=" + exec +
            "&path=" + path +
            "&argc=" + argc +
            "&r=" + Math.random(), false);
        req.send(null);
        var json = req.responseText;
        return json;
    };
    localSave.prototype.start = function (path) {
        var req = new XMLHttpRequest();
        req.open("GET", this.localServerPath + "/hybirdapi/start?path=" + path + "&r=" + Math.random(), false);
        req.send(null);
        var json = req.responseText;
        return json;
    };
    localSave.prototype.startnowait = function (path, fun) {
        if (fun === void 0) { fun = null; }
        var req = new XMLHttpRequest();
        req.open("GET", this.localServerPath + "/hybirdapi/start?path=" + path + "&r=" + Math.random(), true);
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4) {
                if (req.status == 404) {
                    if (fun != null)
                        fun(null, new Error("got a 404:" + path));
                    return;
                }
                if (fun != null)
                    fun(req.responseText, null);
            }
        };
        req.onerror = function () {
            if (fun != null)
                fun(null, new Error("onerr in req:"));
        };
        req.send(null);
    };
    localSave.prototype.loadTextImmediate = function (url, fun) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 404) {
                    fun(null, new Error("got a 404:" + url));
                    return;
                }
                fun(req.responseText, null);
            }
        };
        req.onerror = function () {
            fun(null, new Error("onerr in req:"));
        };
        req.send();
    };
    localSave.prototype.loadBlobImmediate = function (url, fun) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.responseType = "blob";
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 404) {
                    fun(null, new Error("got a 404:" + url));
                    return;
                }
                fun(req.response, null);
            }
        };
        req.onerror = function () {
            fun(null, new Error("onerr in req:"));
        };
        req.send();
    };
    return localSave;
}());
var main = (function () {
    function main() {
        this.x = 0;
        this.y = 100;
        this.btns = [];
    }
    main.prototype.onStart = function (app) {
        console.log("i am here.");
        this.app = app;
        this.addBtn("paowuxian2", function () { return new dome.paowuxian2(); });
        this.addBtn("paowuxian", function () { return new dome.paowuxian(); });
        this.addBtn("mixmesh", function () { return new dome.mixMesh(); });
        this.addBtn("f14effect", function () { return new dome.db_test_f14eff(); });
        this.addBtn("physic2d_dome", function () { return new physic2d_dome(); });
        this.addBtn("test_ui", function () { return new t.test_ui(); });
        this.addBtn("test_load", function () { return new test_load(); });
        this.addBtn("test_loadScene", function () { return new test_loadScene(); });
        this.addBtn("test_pick", function () { return new test_pick(); });
        this.addBtn("test_anim", function () { return new test_anim(); });
        this.addBtn("test_multipleplayer_anim", function () { return new test_multipleplayer_anim(); });
        this.addBtn("test_reload(换装)", function () { return new testReload(); });
        this.addBtn("test_light1", function () { return new t.test_light1(); });
        this.addBtn("test_light_d1", function () { return new t.light_d1(); });
        this.addBtn("test_normalmap", function () { return new t.Test_NormalMap(); });
        this.addBtn("test_assestmgr", function () { return new test_assestmgr(); });
        this.addBtn("test_posteffect(后期效果)", function () { return new t.test_posteffect(); });
        this.addBtn("test_streamlight", function () { return new test_streamlight(); });
        this.addBtn("test_trailRender", function () { return new t.test_trailrender(); });
        this.addBtn("test_rendertexture", function () { return new t.test_rendertexture(); });
        this.addBtn("test_sound", function () { return new t.test_sound(); });
        this.addBtn("test_cleardepth", function () { return new t.test_clearDepth0(); });
        this.addBtn("test_fakepbr", function () { return new test_fakepbr(); });
        this.addBtn("test_tank", function () { return new demo.TankGame(); });
        this.addBtn("test_long", function () { return new demo.DragonTest(); });
        this.addBtn("test_skillsystem", function () { return new t.test_skillsystem(); });
        this.addBtn("test_blend", function () { return new t.test_blend(); });
        this.addBtn("TestRotate", function () { return new t.TestRotate(); });
        this.addBtn("pathasset", function () { return new t.test_pathAsset(); });
        this.addBtn("test_Asi_prefab", function () { return new test_loadAsiprefab(); });
        this.addBtn("test_tex_uv", function () { return new test_texuv(); });
        this.addBtn("test_shadowmap", function () { return new test_ShadowMap(); });
        this.addBtn("test_liChange", function () { return new testLiChangeMesh(); });
        this.addBtn("example_newObject", function () { return new test_NewGameObject; });
        this.addBtn("example_changeMesh", function () { return new test_ChangeMesh(); });
        this.addBtn("example_changeMaterial", function () { return new test_ChangeMaterial(); });
        this.addBtn("demo_ScreenSplit", function () { return new demo_ScreenSplit(); });
        this.addBtn("test_UI组件", function () { return new test_UI_Component(); });
        this.addBtn("test_UI预设体加载", function () { return new test_uiPerfabLoad(); });
        this.addBtn("test_PBR 展示", function () { return new test_pbr(); });
        this.addBtn("test_PBR 场景", function () { return new test_pbr_scene(); });
        this.addBtn("关键帧动画", function () { return new test_keyFrameAni(); });
        this.addBtn("导航网格", function () { return new test_navMesh(); });
        this.addBtn("rvo2_驾驶行为", function () { return new test_Rvo2(); });
        this.addBtn("导航RVO_防挤Demo", function () { return new demo_navigaionRVO(); });
        this.addBtn("Collider碰撞", function () { return new test_pick_boxcollider(); });
        this.addBtn("SSSSS", function () { return new test_sssss(); });
        this.addBtn("dome_加载播放动画", function () { return new dome_loadaniplayer(); });
        this.addBtn("使用加载资源的Demo列表", function () { return new UseAssetByLoadDemoList(); });
        this.addBtn("tesrtss", function () { return new dome.testCJ(); });
        this.addBtn("trans性能测试", function () { return new demo.test_performance(); });
        this.addBtn("3D物理_基础形状", function () { return new test_3DPhysics_baseShape(); });
        this.addBtn("3D物理_复合组合", function () { return new test_3DPhysics_compound(); });
        this.addBtn("3D物理_动力学", function () { return new test_3DPhysics_kinematic(); });
        this.addBtn("3D物理_铰链关节", function () { return new test_3DPhysics_joint_hinge(); });
        this.addBtn("3D物理_球嵌套关节", function () { return new test_3DPhysics_joint_ballandSocket(); });
        this.addBtn("3D物理_滑竿关节", function () { return new test_3DPhysics_joint_slider(); });
        this.addBtn("3D物理_棱柱滑竿关节", function () { return new test_3DPhysics_joint_prismatic(); });
        this.addBtn("3D物理_距离关节", function () { return new test_3DPhysics_joint_distance(); });
        this.addBtn("3D物理_车轮关节", function () { return new test_3DPhysics_joint_wheel(); });
        this.addBtn("3D物理_铰链马达", function () { return new test_3DPhysics_motor_hinge(); });
        this.addBtn("3D物理_车轮马达", function () { return new test_3DPhysics_motor_wheel(); });
        this.addBtn("3D物理_滑竿马达", function () { return new test_3DPhysics_motor_slider(); });
        this.addBtn("3D物理_冻结_位移旋转", function () { return new test_3DPhysics_freeze(); });
        this.addBtn("3D物理_样例_中心点爆炸", function () { return new test_3DPhysics_explode(); });
        this.addBtn("cannonPhysics3D", function () { return new PhysicDemo.physic_01(); });
    };
    main.prototype.addBtn = function (text, act) {
        var _this = this;
        var btn = document.createElement("button");
        this.btns.push(btn);
        btn.textContent = text;
        btn.onclick = function () {
            _this.clearBtn();
            _this.state = act();
            _this.state.start(_this.app);
        };
        btn.style.top = this.y + "px";
        btn.style.left = this.x + "px";
        if (this.y + 24 > 550) {
            this.y = 100;
            this.x += 200;
        }
        else {
            this.y += 24;
        }
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
    };
    main.prototype.clearBtn = function () {
        for (var i = 0; i < this.btns.length; i++) {
            this.app.container.removeChild(this.btns[i]);
        }
        this.btns.length = 0;
    };
    main.prototype.onUpdate = function (delta) {
        if (this.state != null)
            this.state.update(delta);
    };
    main.prototype.isClosed = function () {
        return false;
    };
    main = __decorate([
        gd3d.reflect.userCode
    ], main);
    return main;
}());
var test_01 = (function () {
    function test_01() {
        this.timer = 0;
    }
    test_01.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var cuber;
        for (var i = 0; i < 5; i++) {
            var cube = new gd3d.framework.transform();
            cube.name = "cube";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
            cube.localTranslate.x = 2;
            var collider = cube.gameObject.addComponent("boxcollider");
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter");
            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = smesh;
            var renderer = cube.gameObject.addComponent("meshRenderer");
            cube.markDirty();
            cuber = renderer;
            console.warn("Finish it.");
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                if (state.isfinish) {
                    var sh = _this.app.getAssetMgr().getShader("color.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        _this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                console.warn("Finish load img.");
                                var texture = _this.app.getAssetMgr().getAssetByName("zg256.png");
                                cuber.materials[0].setTexture("_MainTex", texture);
                            }
                        });
                    }
                }
            });
            gd3d.math.quatFromAxisAngle(new gd3d.math.vector3(0, 0, 1), 45, cube.localRotate);
            this.cube = cube;
            this.cube.setWorldPosition(new gd3d.math.vector3(i, 0, 0));
        }
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 0.5;
            var mesh = this.cube2.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer");
            var collider = this.cube2.gameObject.addComponent("boxcollider");
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cubesub";
                this.cube2.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                cube.localTranslate.z = 1;
                cube.localScale.x = 0.5;
                cube.localScale.y = 0.5;
                var collider = cube.gameObject.addComponent("boxcollider");
                cube.markDirty();
            }
        }
        {
        }
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(cube);
        objCam.markDirty();
        {
            var testQuat = gd3d.math.pool.new_quaternion();
        }
    };
    test_01.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        this.cube2.localTranslate = new gd3d.math.vector3(this.timer, 0, 0);
        this.cube2.markDirty();
    };
    return test_01;
}());
var test_loadScene = (function () {
    function test_loadScene() {
        this.timer = 0;
        this.bere = false;
    }
    test_loadScene.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var names = ["test_01", "MainCity_", "city", "lvyexianzong_02_1024", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        var name = names[1];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.loadScene(name);
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 100));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
    };
    test_loadScene.prototype.loadScene = function (assetName, isCompress) {
        var _this = this;
        if (isCompress === void 0) { isCompress = false; }
        var addScene = function () {
            var _scene = _this.app.getAssetMgr().getAssetByName(assetName + ".scene.json");
            var _root = _scene.getSceneRoot();
            _this.scene.addChild(_root);
            _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
            _root.markDirty();
            _this.app.getScene().lightmaps = [];
            _scene.useLightMap(_this.app.getScene());
            _scene.useFog(_this.app.getScene());
        };
        if (isCompress) {
            this.app.getAssetMgr().loadCompressBundle("res/scenes/" + assetName + "/" + assetName + ".packs.txt", function (s) {
                if (s.isfinish) {
                    {
                        addScene();
                    }
                }
            });
        }
        else {
            this.app.getAssetMgr().load("res/scenes/" + assetName + "/" + assetName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                if (s1.isfinish) {
                    addScene();
                }
            });
        }
    };
    test_loadScene.prototype.update = function (delta) {
        this.timer += delta;
        CameraController.instance().update(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
    };
    return test_loadScene;
}());
var test_loadMulBundle = (function () {
    function test_loadMulBundle() {
        this.timer = 0;
        this.bere = false;
    }
    test_loadMulBundle.prototype.refreshTexture = function (tran) {
        var meshrenderer = tran.gameObject.getComponentsInChildren("meshRenderer");
        var skinnmeshrenderer = tran.gameObject.getComponentsInChildren("skinnedMeshRenderer");
        for (var i = 0; i < meshrenderer.length; i++) {
            var v = meshrenderer[i];
            for (var j = 0; j < v.materials.length; j++) {
                for (var k in v.materials[j].statedMapUniforms) {
                    if (v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture) {
                        var textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname);
                        v.materials[j].setTexture(k, textur);
                    }
                }
            }
        }
        for (var i = 0; i < skinnmeshrenderer.length; i++) {
            var v = skinnmeshrenderer[i];
            for (var j = 0; j < v.materials.length; j++) {
                for (var k in v.materials[j].statedMapUniforms) {
                    if (v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture) {
                        var textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname);
                        v.materials[j].setTexture(k, textur);
                    }
                }
            }
        }
    };
    test_loadMulBundle.prototype.refreshAniclip = function (tran) {
    };
    test_loadMulBundle.prototype.refreshLightMap = function (scene, rawscene) {
        scene.lightmaps = [];
        rawscene.resetLightMap(this.app.getAssetMgr());
        rawscene.useLightMap(this.app.getScene());
        rawscene.useFog(this.app.getScene());
    };
    test_loadMulBundle.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var names = ["MainCity", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        var name = names[0];
        var isloaded = false;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/scenes/" + name + "/meshprefab/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        var _scene = _this.app.getAssetMgr().getAssetByName(name + ".scene.json");
                        var _root = _scene.getSceneRoot();
                        _this.scene.addChild(_root);
                        _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
                        _root.markDirty();
                        _this.app.getAssetMgr().load("res/scenes/" + name + "/textures/" + name + "texture.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.refreshTexture(_this.app.getScene().getRoot());
                                _this.refreshLightMap(_this.app.getScene(), _scene);
                            }
                        });
                        _this.app.getAssetMgr().load("res/scenes/" + name + "/aniclip/" + name + "aniclip.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.refreshAniclip(_this.app.getScene().getRoot());
                            }
                        });
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        objCam.lookatPoint(new gd3d.math.vector3(100, 0, 100));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
    };
    test_loadMulBundle.prototype.update = function (delta) {
        this.timer += delta;
        CameraController.instance().update(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
    };
    return test_loadMulBundle;
}());
var t;
(function (t) {
    var test_pathAsset = (function () {
        function test_pathAsset() {
            this.parentlist = [];
            this.dragonlist = [];
            this.traillist = [];
            this.guippaths = [];
            this.taskmgr = new gd3d.framework.taskMgr();
            this.timer = 0;
        }
        test_pathAsset.prototype.start = function (app) {
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadTexture.bind(this));
            this.taskmgr.addTaskCall(this.loadpath.bind(this));
            this.taskmgr.addTaskCall(this.loadasset.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            this.taskmgr.addTaskCall(this.addbtns.bind(this));
        };
        test_pathAsset.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_pathAsset.prototype.loadTexture = function (laststate, state) {
            var texnumber = 2;
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    texnumber--;
                    if (texnumber == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/sd_hlb_1.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    texnumber--;
                    if (texnumber == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
        };
        test_pathAsset.prototype.loadpath = function (laststate, state) {
            var pathnumber = 2;
            this.app.getAssetMgr().load("res/path/circlepath.path.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    pathnumber--;
                    if (pathnumber == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/path/circlepath_2.path.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    pathnumber--;
                    if (pathnumber == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
        };
        test_pathAsset.prototype.loadasset = function (laststate, state) {
            this.app.getAssetMgr().load("res/prefabs/rotatedLongTou/rotatedLongTou.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_pathAsset.prototype.initscene = function (laststate, state) {
            var _this = this;
            var objCam = new gd3d.framework.transform();
            objCam.name = "cam_show";
            this.scene.addChild(objCam);
            this.showcamera = objCam.gameObject.addComponent("camera");
            this.showcamera.order = 0;
            this.showcamera.near = 0.01;
            this.showcamera.far = 1000;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var mat = DBgetMat("rock256.png");
            var trans = DBgetAtrans(mat);
            this.scene.addChild(trans);
            trans.localScale.y = 0.1;
            trans.localScale.x = trans.localScale.z = 40;
            trans.localTranslate.y = -1;
            trans.markDirty();
            var longtouprefab = this.app.getAssetMgr().getAssetByName("rotatedLongTou.prefab.json");
            var path = this.app.getAssetMgr().getAssetByName("circlepath.path.json");
            var path2 = this.app.getAssetMgr().getAssetByName("circlepath_2.path.json");
            {
                for (var i = 0; i < 3; i++) {
                    var parent = new gd3d.framework.transform();
                    parent.gameObject.visible = false;
                    this.scene.addChild(parent);
                    this.parentlist.push(parent);
                    var head = longtouprefab.getCloneTrans();
                    head.localScale.x = head.localScale.y = head.localScale.z = 4;
                    parent.addChild(head);
                    this.dragonlist.push(head);
                    var guidp = head.gameObject.addComponent("guidpath");
                    this.guippaths.push(guidp);
                    var trans = new gd3d.framework.transform();
                    head.addChild(trans);
                    var trailmat = new gd3d.framework.material();
                    var shader = this.app.getAssetMgr().getShader("particles_blend.shader.json");
                    var tex1 = this.app.getAssetMgr().getAssetByName("sd_hlb_1.png");
                    trailmat.setShader(shader);
                    trailmat.setTexture("_MainTex", tex1);
                    var trailrender = trans.gameObject.addComponent("trailRender");
                    this.traillist.push(trailrender);
                    trailrender.material = trailmat;
                    trailrender.setWidth(1.0);
                    trailrender.lookAtCamera = true;
                    trailrender.extenedOneSide = false;
                    trailrender.setspeed(0.25);
                }
                this.guippaths[0].setpathasset(path2, 50, function () {
                });
                this.guippaths[1].setpathasset(path, 50, function () {
                    _this.parentlist[1].gameObject.visible = false;
                });
                this.guippaths[2].setpathasset(path2, 50, function () {
                });
            }
            state.finish = true;
        };
        test_pathAsset.prototype.update = function (delta) {
            this.taskmgr.move(delta);
        };
        test_pathAsset.prototype.addbtns = function () {
            var _this = this;
            this.addBtn("play", 10, 100, function () {
                for (var i = 0; i < _this.parentlist.length; i++) {
                    _this.parentlist[i].gameObject.visible = true;
                }
                for (var i_2 = 0; i_2 < _this.traillist.length; i_2++) {
                    _this.traillist[i_2].play();
                }
                _this.guippaths[0].play(2);
                _this.guippaths[1].play();
                _this.guippaths[2].play(2);
            });
            this.addBtn("stop", 10, 200, function () {
                for (var i = 0; i < _this.parentlist.length; i++) {
                    _this.parentlist[i].gameObject.visible = false;
                }
                for (var i_3 = 0; i_3 < _this.guippaths.length; i_3++) {
                    _this.traillist[i_3].stop();
                    _this.guippaths[i_3].stop();
                }
            });
        };
        test_pathAsset.prototype.addBtn = function (text, x, y, func) {
            var btn = document.createElement("button");
            btn.textContent = text;
            btn.onclick = function () {
                func();
            };
            btn.style.top = y + "px";
            btn.style.left = x + "px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        return test_pathAsset;
    }());
    t.test_pathAsset = test_pathAsset;
    function DBgetAtrans(mat, meshname) {
        if (meshname === void 0) { meshname = null; }
        var trans = new gd3d.framework.transform();
        var meshf = trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER);
        var meshr = trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER);
        meshr.materials = [];
        meshr.materials.push(mat);
        if (meshname == null) {
            var mesh = gd3d.framework.sceneMgr.app.getAssetMgr().getDefaultMesh("cube");
            meshf.mesh = mesh;
        }
        else {
            var mesh = gd3d.framework.sceneMgr.app.getAssetMgr().getAssetByName(meshname);
            meshf.mesh = mesh;
        }
        return trans;
    }
    t.DBgetAtrans = DBgetAtrans;
    function DBgetMat(texname, shaderstring) {
        if (texname === void 0) { texname = null; }
        if (shaderstring === void 0) { shaderstring = null; }
        var mat = new gd3d.framework.material();
        if (shaderstring == null) {
            shaderstring = "diffuse.shader.json";
        }
        var shader = gd3d.framework.sceneMgr.app.getAssetMgr().getShader(shaderstring);
        mat.setShader(shader);
        if (texname != null) {
            var tex = gd3d.framework.sceneMgr.app.getAssetMgr().getAssetByName(texname);
            mat.setTexture("_MainTex", tex);
        }
        return mat;
    }
    t.DBgetMat = DBgetMat;
})(t || (t = {}));
var test_loadprefab = (function () {
    function test_loadprefab() {
        this.timer = 0;
    }
    test_loadprefab.prototype.refreshTexture = function (tran) {
        var meshrenderer = tran.gameObject.getComponentsInChildren("meshRenderer");
        var skinnmeshrenderer = tran.gameObject.getComponentsInChildren("skinnedMeshRenderer");
        this.renderer = meshrenderer;
        this.skinRenders = skinnmeshrenderer;
        for (var i = 0; i < meshrenderer.length; i++) {
            var v = meshrenderer[i];
            for (var j = 0; j < v.materials.length; j++) {
                for (var k in v.materials[j].statedMapUniforms) {
                    if (v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture) {
                        var textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname);
                        v.materials[j].setTexture(k, textur);
                    }
                }
            }
        }
        for (var i = 0; i < skinnmeshrenderer.length; i++) {
            var v = skinnmeshrenderer[i];
            for (var j = 0; j < v.materials.length; j++) {
                for (var k in v.materials[j].statedMapUniforms) {
                    if (v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture) {
                        var textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname);
                        v.materials[j].setTexture(k, textur);
                    }
                }
            }
        }
    };
    test_loadprefab.prototype.refreshAniclip = function (tran, name) {
    };
    test_loadprefab.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        var names = ["elongmul", "0060_duyanshou", "Cube", "0001_fashion", "193_meirenyu"];
        var name = names[0];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                name = "pc1";
                _this.app.getAssetMgr().load("res/prefabs/" + name + "/resources/" + "pc1_wait_idle1.FBAni.aniclip.bin", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                                _this.baihu = _prefab.getCloneTrans();
                                _this.scene.addChild(_this.baihu);
                                _this.baihu.localTranslate = new gd3d.math.vector3(0, 0, 0);
                                _this.baihu.localEulerAngles = new gd3d.math.vector3(0, 180, 0);
                                objCam.localTranslate = new gd3d.math.vector3(0, 0, -2);
                                objCam.lookat(_this.baihu);
                                objCam.markDirty();
                                var ani = _this.baihu.gameObject.getComponent("aniplayer");
                                _this.refreshTexture(_this.baihu);
                                _this.app.getAssetMgr().load("res/prefabs/" + name + "/resources/" + "pc1_wait_idle1.FBAni.aniclip.bin", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    if (s.isfinish) {
                                        _this.refreshAniclip(_this.baihu, "pc1_wait_idle1.FBAni.aniclip.bin");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        this.changeShader();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10000;
        this.camera.backgroundColor = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);
        CameraController.instance().init(this.app, this.camera);
        objCam.markDirty();
    };
    test_loadprefab.prototype.changeShader = function () {
        var _this = this;
        var btn = document.createElement("button");
        btn.textContent = "切换Shader到：diffuse.shader.json";
        btn.onclick = function () {
            var sh = _this.app.getAssetMgr().getShader("diffuse.shader.json");
            _this.change(sh);
        };
        btn.style.top = "160px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
        var btn2 = document.createElement("button");
        btn2.textContent = "切换Shader到：additive_alpha.shader.json";
        btn2.onclick = function () {
            var sh = _this.app.getAssetMgr().getShader("additive_alpha.shader.json");
            _this.change(sh);
        };
        btn2.style.top = "124px";
        btn2.style.position = "absolute";
        this.app.container.appendChild(btn2);
    };
    test_loadprefab.prototype.change = function (sha) {
        for (var j = 0; j < this.renderer.length; j++) {
            for (var i = 0; i < this.renderer[j].materials.length; i++) {
                this.renderer[j].materials[i].setShader(sha);
            }
        }
        for (var j = 0; j < this.skinRenders.length; j++) {
            for (var i = 0; i < this.skinRenders[j].materials.length; i++) {
                this.skinRenders[j].materials[i].setShader(sha);
            }
        }
    };
    test_loadprefab.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        CameraController.instance().update(delta);
    };
    return test_loadprefab;
}());
var testReload = (function () {
    function testReload() {
        this.uileft = 0;
        this.timer = 0;
    }
    testReload.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var role;
        var role1;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/fs/fs.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("fs.prefab.json");
                        role = _prefab.getCloneTrans();
                        _this.scene.addChild(role);
                        role.localScale = new gd3d.math.vector3(1, 1, 1);
                        role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                        var _aniplayer = role.gameObject.getComponent("aniplayer");
                        _aniplayer.autoplay = true;
                        _this.cube = role;
                        if (role1 != null) {
                            _this.createChangeBtn(role, role1, o2d, "body");
                            _this.createChangeBtn(role, role1, o2d, "handL");
                            _this.createChangeBtn(role, role1, o2d, "handR");
                            _this.createChangeBtn(role, role1, o2d, "head");
                            _this.createChangeBtn(role, role1, o2d, "leg");
                        }
                    }
                });
                _this.app.getAssetMgr().load("res/prefabs/0001_shengyi_male/0001_shengyi_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("0001_shengyi_male.prefab.json");
                        role1 = _prefab.getCloneTrans();
                        if (role != null) {
                            _this.createChangeBtn(role, role1, o2d, "body");
                            _this.createChangeBtn(role, role1, o2d, "handL");
                            _this.createChangeBtn(role, role1, o2d, "handR");
                            _this.createChangeBtn(role, role1, o2d, "head");
                            _this.createChangeBtn(role, role1, o2d, "leg");
                        }
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        var o2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(o2d);
    };
    testReload.prototype.createChangeBtn = function (role, role1, o2d, part) {
        var _this = this;
        var t2d_9 = new gd3d.framework.transform2D();
        t2d_9.width = 150;
        t2d_9.height = 50;
        t2d_9.pivot.x = 0;
        t2d_9.pivot.y = 0;
        t2d_9.localTranslate.x = this.uileft;
        t2d_9.localTranslate.y = 300;
        var btn = t2d_9.addComponent("button");
        var img9 = t2d_9.addComponent("image2D");
        img9.imageType = gd3d.framework.ImageType.Sliced;
        btn.targetImage = img9;
        btn.transition = gd3d.framework.TransitionType.ColorTint;
        var role_part;
        var role1_part;
        btn.addListener(gd3d.event.UIEventEnum.PointerClick, function () {
            if (role_part == null) {
                var role_skinMeshRenders = role.gameObject.getComponentsInChildren("skinnedMeshRenderer");
                var role1_skinMeshRenders = role1.gameObject.getComponentsInChildren("skinnedMeshRenderer");
                for (var key in role_skinMeshRenders) {
                    if (role_skinMeshRenders[key].gameObject.getName().indexOf("_" + part) >= 0) {
                        role_part = role_skinMeshRenders[key];
                    }
                }
                for (var key in role1_skinMeshRenders) {
                    if (role1_skinMeshRenders[key].gameObject.getName().indexOf("_" + part) >= 0) {
                        role1_part = role1_skinMeshRenders[key];
                    }
                }
            }
            var role_part_parent = role_part.gameObject.transform.parent;
            role1_part.gameObject.transform.parent.addChild(role_part.gameObject.transform);
            role_part_parent.addChild(role1_part.gameObject.transform);
            var role_part_player = role_part.player;
            role_part._player = role1_part.player;
            role1_part._player = role_part_player;
        }, this);
        o2d.addChild(t2d_9);
        var lab = new gd3d.framework.transform2D();
        lab.name = "lab111";
        lab.width = 150;
        lab.height = 50;
        lab.pivot.x = 0;
        lab.pivot.y = 0;
        lab.markDirty();
        var label = lab.addComponent("label");
        label.text = "换" + part;
        label.fontsize = 25;
        label.color = new gd3d.math.color(1, 0, 0, 1);
        t2d_9.addChild(lab);
        this.app.getAssetMgr().load("res/uisprite.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var texture = _this.app.getAssetMgr().getAssetByName("uisprite.png");
                img9.sprite = _this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            }
        });
        this.app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish)
                        label.font = _this.app.getAssetMgr().getAssetByName("STXINGKA.font.json");
                });
            }
        });
        this.uileft += 150;
    };
    testReload.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        if (this.cube != null) {
            objCam.lookat(this.cube);
            objCam.markDirty();
            objCam.updateWorldTran();
        }
    };
    return testReload;
}());
var test_3DPhysics_baseShape = (function () {
    function test_3DPhysics_baseShape() {
        this.mrs = [];
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_baseShape.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_baseShape.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_floor = physics3dDemoTool.mats["white"];
        var trans = new gd3d.framework.transform();
        trans.localScale.x = 20;
        trans.localScale.y = 0.01;
        trans.localScale.z = 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans, mat_floor, "cube");
        var trans2 = new gd3d.framework.transform();
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        this.scene.addChild(trans2);
        var mr2 = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 15;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        var mr3 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        var mr_cl = physics3dDemoTool.attachMesh(cylinder_mid, mat_activated, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0), new gd3d.framework.OimoJSPlugin());
        var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1, friction: 0.9 });
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6, friction: 0.5, disableBidirectionalTransformation: true });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.6, friction: 0.5 });
        this.mrs.push(mr2, mr3, mr_cl);
    };
    test_3DPhysics_baseShape.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_baseShape;
}());
var test_3DPhysics_compound = (function () {
    function test_3DPhysics_compound() {
        this.mrs = [];
        this.types = ['box', 'box', 'box', 'box', 'box', 'box', 'box', 'box'];
        this.sizes = [30, 5, 30, 4, 30, 4, 4, 30, 4, 4, 30, 4, 4, 30, 4, 4, 30, 4, 4, 30, 4, 23, 10, 3];
        this.positions = [0, 0, 0, 12, -16, 12, -12, -16, 12, 12, -16, -12, -12, -16, -12, 12, 16, -12, -12, 16, -12, 0, 25, -12];
        this.chairId = 0;
        this.guiMsg = "复合物理对象 demo ";
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.cachePickInfo = new gd3d.framework.pickinfo();
        this.cacheRota = new gd3d.math.quaternion();
        this.cache_y = 0;
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_compound.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        return [4, physics3dDemoTool.loadbySync("./res/prefabs/Capsule/Capsule.assetbundle.json")];
                    case 2:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_compound.prototype.crateChair = function () {
        var chairTran = new gd3d.framework.transform();
        gd3d.math.vec3Set(chairTran.localPosition, 0, 3, 5);
        gd3d.math.vec3SetAll(chairTran.localScale, 3);
        this.scene.addChild(chairTran);
        chairTran.name = "chair_" + this.chairId;
        this.chairId++;
        var len = this.types.length;
        var mat = physics3dDemoTool.mats["activated"];
        var mesh, n, m;
        var sizes = this.sizes;
        var positions = this.positions;
        var tag = "_chairItype_";
        var subs = [];
        var scale = 3;
        for (var i = 0; i < len; i++) {
            var sunTran = new gd3d.framework.transform();
            sunTran.name = "sub_" + len;
            n = i * 3;
            gd3d.math.vec3Set(sunTran.localPosition, positions[n + 0] / 100 * scale, positions[n + 1] / 100 * scale, positions[n + 2] / 100 * scale);
            gd3d.math.vec3Set(sunTran.localScale, sizes[n + 0] / 100 * scale, sizes[n + 1] / 100 * scale, sizes[n + 2] / 100 * scale);
            chairTran.addChild(sunTran);
            var meshName = "cube";
            physics3dDemoTool.attachMesh(sunTran, mat, meshName, true);
            var itype = meshName == "cylinder" ? gd3d.framework.ImpostorType.CylinderImpostor : gd3d.framework.ImpostorType.BoxImpostor;
            sunTran[tag] = itype;
            subs.push(sunTran);
        }
        subs.forEach(function (c) {
            new gd3d.framework.PhysicsImpostor(c, c[tag], { mass: 0.5 });
        });
        new gd3d.framework.PhysicsImpostor(chairTran, gd3d.framework.ImpostorType.NoImpostor, { mass: 1, friction: 0.8 });
        var mr = chairTran.gameObject.addComponent("meshRenderer");
        this.mrs.push(mr);
        return chairTran;
    };
    test_3DPhysics_compound.prototype.crateCapsule = function (showCollisionMesh) {
        if (showCollisionMesh === void 0) { showCollisionMesh = false; }
        var mat_activated = physics3dDemoTool.mats["activated"];
        var combination = new gd3d.framework.transform();
        combination.name = "Capsule";
        combination.localPosition.y = 10;
        this.scene.addChild(combination);
        var p1 = this.astMgr.getAssetByName("Capsule.prefab.json");
        var capsule = p1.getCloneTrans();
        capsule.name = "capsule";
        combination.addChild(capsule);
        var sphere_top = new gd3d.framework.transform();
        sphere_top.name = "sphere_top";
        sphere_top.gameObject.visible = showCollisionMesh;
        sphere_top.localPosition.y = 0.5;
        gd3d.math.vec3SetAll(sphere_top.localScale, 0.5);
        combination.addChild(sphere_top);
        physics3dDemoTool.attachMesh(sphere_top, mat_activated, "sphere", true);
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder_mid";
        cylinder_mid.gameObject.visible = showCollisionMesh;
        gd3d.math.vec3Set(cylinder_mid.localScale, 1, 0.5, 1);
        combination.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_activated, "cylinder", true);
        var sphere_bottom = new gd3d.framework.transform();
        sphere_bottom.gameObject.visible = showCollisionMesh;
        sphere_bottom.name = "sphere_bottom";
        sphere_bottom.localPosition.y = -0.5;
        gd3d.math.vec3SetAll(sphere_bottom.localScale, 0.5);
        combination.addChild(sphere_bottom);
        physics3dDemoTool.attachMesh(sphere_bottom, mat_activated, "sphere", true);
        var s_top_Impostor = new gd3d.framework.PhysicsImpostor(sphere_top, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3, disableBidirectionalTransformation: true });
        var c_mid_Impostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.3 });
        var s_bottom_Impostor = new gd3d.framework.PhysicsImpostor(sphere_bottom, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3 });
        var combImpostor = new gd3d.framework.PhysicsImpostor(combination, gd3d.framework.ImpostorType.NoImpostor, { mass: 1, restitution: 0.3 });
        var mr = combination.gameObject.addComponent("meshRenderer");
        this.mrs.push(mr);
        return combination;
    };
    test_3DPhysics_compound.prototype.init = function () {
        this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0), new gd3d.framework.OimoJSPlugin());
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_yellow = physics3dDemoTool.mats["yellow"];
        var mat_white = physics3dDemoTool.mats["white"];
        var trans = new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x = 20;
        trans.localScale.y = 0.01;
        trans.localScale.z = 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans, mat_white, "cube");
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 15;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1, friction: 0.9 });
        var _c = this.crateChair();
        this.crateCapsule();
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2, restitution: 0.5, kinematic: true });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        this.mrs.push(mr, mr1);
        this.targetTran = _c;
        this.iptMgr.addPointListener(gd3d.event.PointEventEnum.PointMove, this.onPonitMove, this);
        this.setGUI();
    };
    test_3DPhysics_compound.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseTarget');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_compound.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_compound.prototype.impulseTarget = function () {
        this.doImpulse(this.targetTran.physicsImpostor);
    };
    test_3DPhysics_compound.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_compound.prototype.onPonitMove = function (_a) {
        var x = _a[0], y = _a[1];
        var viewPos = help_v2;
        viewPos.x = x;
        viewPos.y = y;
        console.log("x: " + x + " ,y :" + y);
        var ray = this.camera.creatRayByScreen(viewPos, this.app);
        var mf = this.floor.gameObject.getComponent("meshFilter");
        var isinsrt = mf.mesh.intersects(ray, this.floor.getWorldMatrix(), this.cachePickInfo);
        if (!isinsrt || !this.cachePickInfo || !this.cachePickInfo.hitposition)
            return;
        var pos = this.cachePickInfo.hitposition;
        console.log("pos  x: " + pos.x + " ,y :" + pos.y + " , z: " + pos.z);
        pos.y += 0.55;
        this.boxTran.physicsImpostor.kinematicSetPosition(pos);
    };
    test_3DPhysics_compound.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_compound;
}());
var test_3DPhysics_explode = (function () {
    function test_3DPhysics_explode() {
        this.mrs = [];
        this.redSphere = new gd3d.framework.transform();
        this.boxList = [];
        this.guiMsg = "中心点爆炸 样例 ";
        this.enumArr = [];
        this.optStrs = [];
        this.freezeDic = {};
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.delta = 0;
        this.movespeed = 10;
        this.explodeFroce = 100;
        this.explodeRadius = 10;
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_explode.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_explode.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["yellow"];
        var mat_white = physics3dDemoTool.mats["white"];
        var mat_purple = physics3dDemoTool.mats["purple"];
        var trans = new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x = 20;
        trans.localScale.y = 0.01;
        trans.localScale.z = 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans, mat_white, "cube");
        var redSphere = new gd3d.framework.transform();
        gd3d.math.vec3SetAll(redSphere.localScale, 0.5);
        this.redSphere = redSphere;
        redSphere.name = "redSphere";
        gd3d.math.vec3Set(redSphere.localPosition, 1, 3, 1);
        this.scene.addChild(redSphere);
        physics3dDemoTool.attachMesh(redSphere, mat_purple, "sphere");
        var boxList = [];
        this.boxList = boxList;
        var gap = 0.3;
        var size = 1;
        var posOffset = new gd3d.math.vector3(0, 0.2, 0);
        var w = 2;
        var d = 2;
        var h = 3;
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < d; j++) {
                for (var k = 0; k < h; k++) {
                    var boxtran = new gd3d.framework.transform();
                    boxtran.name = "box_" + i + "_" + j + "_" + k;
                    boxtran.localPosition.x = posOffset.x + i * size + gap;
                    boxtran.localPosition.z = posOffset.z + j * size + gap;
                    boxtran.localPosition.y = posOffset.y + k * size + gap;
                    this.scene.addChild(boxtran);
                    var mr = physics3dDemoTool.attachMesh(boxtran, mat_activated, "cube");
                    boxList.push(mr);
                    this.mrs.push(mr);
                }
            }
        }
        this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0), new gd3d.framework.OimoJSPlugin());
        var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1, friction: 0.9 });
        boxList.forEach(function (box) {
            new gd3d.framework.PhysicsImpostor(box.gameObject.transform, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6, friction: 0.5 });
        });
        this.iptMgr.addKeyListener(gd3d.event.KeyEventEnum.KeyDown, this.keyDown, this);
        this.setGUI();
    };
    test_3DPhysics_explode.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        gui.add(this, "explodeFroce", 1, 100);
        gui.add(this, "explodeRadius", 0.1, 10);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'doExplode');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_explode.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_explode.prototype.impulseTarget = function () {
        if (!this.targetTran)
            return;
        this.doImpulse(this.targetTran.physicsImpostor);
    };
    test_3DPhysics_explode.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_explode.prototype.doExplode = function () {
        this.explode(this.redSphere.localPosition);
    };
    test_3DPhysics_explode.prototype.keyDown = function (_a) {
        var keyCode = _a[0];
        switch (keyCode) {
            case gd3d.event.KeyCode.ArrowUp:
                this.redSphere.localPosition.y += this.delta * this.movespeed;
                break;
            case gd3d.event.KeyCode.ArrowDown:
                this.redSphere.localPosition.y -= this.delta * this.movespeed;
                break;
            case gd3d.event.KeyCode.ArrowLeft:
                this.redSphere.localPosition.x -= this.delta * this.movespeed;
                break;
            case gd3d.event.KeyCode.ArrowRight:
                this.redSphere.localPosition.x += this.delta * this.movespeed;
                break;
            case gd3d.event.KeyCode.Numpad7:
                this.redSphere.localPosition.z += this.delta * this.movespeed;
                break;
            case gd3d.event.KeyCode.Numpad4:
                this.redSphere.localPosition.z -= this.delta * this.movespeed;
                break;
        }
        this.redSphere.localPosition = this.redSphere.localPosition;
    };
    test_3DPhysics_explode.prototype.explode = function (point) {
        var _this = this;
        if (!point)
            return;
        this.boxList.forEach(function (box) {
            if (box) {
                gd3d.math.vec3Subtract(box.gameObject.transform.localPosition, point, helpv3);
                var len = gd3d.math.vec3Length(helpv3);
                gd3d.math.vec3Normalize(helpv3, helpv3);
                len = Math.min(len, _this.explodeRadius);
                var rate = 1 - (len / _this.explodeRadius);
                if (rate > 0.00001) {
                    var froce = rate * _this.explodeFroce;
                    gd3d.math.vec3ScaleByNum(helpv3, froce, helpv3);
                    box.gameObject.transform.physicsImpostor.applyImpulse(helpv3, box.gameObject.transform.localPosition);
                }
            }
        });
    };
    test_3DPhysics_explode.prototype.update = function (delta) {
        this.tcount += delta;
        this.delta = delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_explode;
}());
var test_3DPhysics_freeze = (function () {
    function test_3DPhysics_freeze() {
        this.mrs = [];
        this.guiMsg = "冻结测试demo ";
        this.enumArr = [];
        this.optStrs = [];
        this.freezeDic = {};
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.cachePickInfo = new gd3d.framework.pickinfo();
        this.cacheRota = new gd3d.math.quaternion();
        this.cache_y = 0;
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_freeze.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_freeze.prototype.init = function () {
        var _this = this;
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var mat_white = physics3dDemoTool.mats["white"];
        var trans = new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x = 20;
        trans.localScale.y = 0.01;
        trans.localScale.z = 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans, mat_white, "cube");
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 15;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        this.cylinderTran = cylinder_mid;
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        var mr2 = physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0), new gd3d.framework.OimoJSPlugin());
        var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1, friction: 0.9 });
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2, restitution: 0.5, kinematic: true });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, friction: 0.5 });
        this.mrs.push(mr1, mr2);
        this.targetTran = this.cylinderTran;
        var ft = gd3d.framework.FreezeType;
        var arr = [ft.Position_x, ft.Position_y, ft.Position_z, ft.Rotation_x, ft.Rotation_y, ft.Rotation_z];
        this.enumArr = arr;
        var opts = [true, false, false, true, true, false];
        arr.forEach(function (o, i) {
            var str = ft[o];
            _this.optStrs.push(str);
            _this.freezeDic[str] = opts[i];
        });
        this.iptMgr.addPointListener(gd3d.event.PointEventEnum.PointMove, this.onPonitMove, this);
        this.setGUI();
    };
    test_3DPhysics_freeze.prototype.setGUI = function () {
        var _this = this;
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFreeze = gui.addFolder("Freeze (冻结选项)");
        this.optStrs.forEach(function (o) {
            folderFreeze.add(_this.freezeDic, o);
        });
        folderFreeze.open();
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseTarget');
        folderFun.add(this, 'applyFreezeOpt');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_freeze.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_freeze.prototype.applyFreezeOpt = function () {
        var _this = this;
        var phy = this.targetTran.physicsImpostor;
        if (!phy)
            return;
        this.enumArr.forEach(function (o, i) {
            var str = _this.optStrs[i];
            var b = _this.freezeDic[str];
            phy.setFreeze(o, b);
        });
    };
    test_3DPhysics_freeze.prototype.impulseTarget = function () {
        this.doImpulse(this.targetTran.physicsImpostor);
    };
    test_3DPhysics_freeze.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_freeze.prototype.onPonitMove = function (_a) {
        var x = _a[0], y = _a[1];
        var viewPos = help_v2;
        viewPos.x = x;
        viewPos.y = y;
        console.log("x: " + x + " ,y :" + y);
        var ray = this.camera.creatRayByScreen(viewPos, this.app);
        var mf = this.floor.gameObject.getComponent("meshFilter");
        var isinsrt = mf.mesh.intersects(ray, this.floor.getWorldMatrix(), this.cachePickInfo);
        if (!isinsrt || !this.cachePickInfo || !this.cachePickInfo.hitposition)
            return;
        var pos = this.cachePickInfo.hitposition;
        console.log("pos  x: " + pos.x + " ,y :" + pos.y + " , z: " + pos.z);
        pos.y += 0.55;
        this.boxTran.physicsImpostor.kinematicSetPosition(pos);
    };
    test_3DPhysics_freeze.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_freeze;
}());
var test_3DPhysics_joint_ballandSocket = (function () {
    function test_3DPhysics_joint_ballandSocket() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.mrs = [];
        this.guiMsg = "球嵌套关节测试demo ballandSocket";
        this.force = new gd3d.math.vector3(-50, 0, -3);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_ballandSocket.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_ballandSocket.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        gd3d.math.vec3SetAll(trans3.localScale, 0.5);
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var mid_sphere = new gd3d.framework.transform();
        mid_sphere.name = "sphere_1";
        mid_sphere.localPosition.y = 8;
        gd3d.math.vec3SetAll(mid_sphere.localScale, 0.5);
        this.scene.addChild(mid_sphere);
        physics3dDemoTool.attachMesh(mid_sphere, mat_stick, "sphere");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(mid_sphere, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var phyJ = gd3d.framework.PhysicsJoint;
        var joint1 = new phyJ(phyJ.BallAndSocketJoint, {
            mainPivot: new gd3d.math.vector3(0, 0, 0),
            connectedPivot: new gd3d.math.vector3(0, -2, 0),
        });
        cylinderImpostor.addJoint(boxImpostor, joint1);
        this.setGUI();
    };
    test_3DPhysics_joint_ballandSocket.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_joint_ballandSocket.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_joint_ballandSocket.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_ballandSocket.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_ballandSocket.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_joint_ballandSocket;
}());
var test_3DPhysics_joint_distance = (function () {
    function test_3DPhysics_joint_distance() {
        this.mrs = [];
        this.guiMsg = "铰链关节测试demo distance";
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_distance.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_distance.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "cube");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var dist = 20;
        var phyJ = gd3d.framework.DistanceJoint;
        var joint1 = new phyJ({ maxDistance: dist });
        cylinderImpostor.addJoint(boxImpostor, joint1);
        joint1.updateDistance(dist, dist);
        gd3d.math.quatFromEulerAngles(90, 0, 0, cylinder_mid.localRotate);
        this.setGUI();
    };
    test_3DPhysics_joint_distance.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_joint_distance.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_joint_distance.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_distance.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_distance.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_joint_distance;
}());
var test_3DPhysics_joint_hinge = (function () {
    function test_3DPhysics_joint_hinge() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.mrs = [];
        this.guiMsg = "铰链关节测试demo hinge";
        this.force = new gd3d.math.vector3(-50, 0, 0);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_hinge.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_hinge.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var jointData = {
            mainPivot: new gd3d.math.vector3(0, 0, 0),
            connectedPivot: new gd3d.math.vector3(0, -2, 0),
            mainAxis: new gd3d.math.vector3(0, 0, 1),
            connectedAxis: new gd3d.math.vector3(0, 0, 0),
            nativeParams: {}
        };
        var phyJ = gd3d.framework.PhysicsJoint;
        var joint1 = new phyJ(phyJ.HingeJoint, jointData);
        cylinderImpostor.addJoint(boxImpostor, joint1);
        gd3d.math.quatFromEulerAngles(90, 0, 0, cylinder_mid.localRotate);
        this.setGUI();
    };
    test_3DPhysics_joint_hinge.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'applyReset');
    };
    test_3DPhysics_joint_hinge.prototype.applyReset = function () {
        physics3dDemoTool.resetObj(this.mrs);
    };
    test_3DPhysics_joint_hinge.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_hinge.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_hinge.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_joint_hinge;
}());
var test_3DPhysics_joint_prismatic = (function () {
    function test_3DPhysics_joint_prismatic() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.mrs = [];
        this.guiMsg = "棱柱形滑竿关节测试demo prismatic";
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, -1, 1);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_prismatic.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_prismatic.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.x = -1.5;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var phyJ = gd3d.framework.PhysicsJoint;
        var joint1 = new phyJ(phyJ.PrismaticJoint, {
            mainAxis: new gd3d.math.vector3(1, 0, 0),
            collision: true
        });
        cylinderImpostor.addJoint(boxImpostor, joint1);
        gd3d.math.quatFromEulerAngles(90, 0, 0, cylinder_mid.localRotate);
        this.setGUI();
    };
    test_3DPhysics_joint_prismatic.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
    };
    test_3DPhysics_joint_prismatic.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_prismatic.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_prismatic.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_joint_prismatic;
}());
var test_3DPhysics_joint_slider = (function () {
    function test_3DPhysics_joint_slider() {
        this.mrs = [];
        this.guiMsg = "滑竿关节测试demo slider";
        this.force = new gd3d.math.vector3(-10, 0, 5);
        this.contactlocalPoint = new gd3d.math.vector3(0, -1, 1);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_slider.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_slider.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.x = -1.5;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var phyJ = gd3d.framework.PhysicsJoint;
        var joint1 = new phyJ(phyJ.SliderJoint, {
            mainAxis: new gd3d.math.vector3(1, 0, 0),
            collision: true
        });
        cylinderImpostor.addJoint(boxImpostor, joint1);
        gd3d.math.quatFromEulerAngles(90, 0, 0, cylinder_mid.localRotate);
        this.setGUI();
    };
    test_3DPhysics_joint_slider.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
    };
    test_3DPhysics_joint_slider.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_slider.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_slider.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_joint_slider;
}());
var test_3DPhysics_joint_wheel = (function () {
    function test_3DPhysics_joint_wheel() {
        this.mrs = [];
        this.connectedPivot = new gd3d.math.vector3(-2, 0, 0);
        this.mainPivot = new gd3d.math.vector3(0, -1.5, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.guiMsg = "车轮关节测试demo wheel(hinge2)";
        this.force = new gd3d.math.vector3(0, 10, 0);
        this.contactlocalPoint = new gd3d.math.vector3(0, -0.5, 0.45);
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_joint_wheel.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_joint_wheel.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_joint = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localScale.x = 0.5;
        this.scene.addChild(trans2);
        var mr2 = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var mid_sphere = new gd3d.framework.transform();
        mid_sphere.name = "sphere_1";
        mid_sphere.localPosition.y = 8;
        gd3d.math.vec3SetAll(mid_sphere.localScale, 0.5);
        this.scene.addChild(mid_sphere);
        var mr_cl = physics3dDemoTool.attachMesh(mid_sphere, mat_joint, "sphere");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(mid_sphere, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr2);
        var phyJ = gd3d.framework.PhysicsJoint;
        var joint1 = new phyJ(phyJ.WheelJoint, {
            mainPivot: this.mainPivot,
            connectedPivot: this.connectedPivot,
            mainAxis: new gd3d.math.vector3(0, 1, 0),
            connectedAxis: new gd3d.math.vector3(1, 0, 0),
            nativeParams: {}
        });
        cylinderImpostor.addJoint(boxImpostor, joint1);
        this.setGUI();
        this.addDisplayObj();
    };
    test_3DPhysics_joint_wheel.prototype.addDisplayObj = function () {
        var mat_pole = physics3dDemoTool.mats["purple"];
        var diameter = 0.25;
        var m_y = Math.abs(this.mainPivot.y);
        var m_x = Math.abs(this.connectedPivot.x);
        this.pole = new gd3d.framework.transform();
        this.scene.addChild(this.pole);
        var _pole = new gd3d.framework.transform();
        this.pole.addChild(_pole);
        gd3d.math.vec3Set(_pole.localScale, m_x, diameter, diameter);
        gd3d.math.vec3Set(_pole.localPosition, -_pole.localScale.x / 2, 0, 0);
        physics3dDemoTool.attachMesh(_pole, mat_pole, "cube");
        this.pole_1 = new gd3d.framework.transform();
        this.scene.addChild(this.pole_1);
        var _pole_1 = new gd3d.framework.transform();
        gd3d.math.vec3Set(_pole_1.localScale, diameter, m_y, diameter);
        gd3d.math.vec3Set(_pole_1.localPosition, 0, _pole_1.localScale.y / 2, 0);
        this.pole_1.addChild(_pole_1);
        physics3dDemoTool.attachMesh(_pole_1, mat_pole, "cube");
    };
    test_3DPhysics_joint_wheel.prototype.syncDisplayRT = function () {
        if (!this.boxTran || !this.pole)
            return;
        var bPos = this.boxTran.localPosition;
        gd3d.math.vec3Clone(bPos, this.pole.localPosition);
        gd3d.math.quatClone(this.boxTran.localRotate, this.pole.localRotate);
        this.pole.localPosition = this.pole.localPosition;
        this.pole.localRotate = this.pole.localRotate;
        gd3d.math.vec3Set(this.pole_1.localPosition, 0, bPos.y, 0);
        this.pole_1.localPosition = this.pole_1.localPosition;
    };
    test_3DPhysics_joint_wheel.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
    };
    test_3DPhysics_joint_wheel.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_joint_wheel.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_joint_wheel.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
        this.syncDisplayRT();
    };
    return test_3DPhysics_joint_wheel;
}());
var help_v2 = new gd3d.math.vector2();
var test_3DPhysics_kinematic = (function () {
    function test_3DPhysics_kinematic() {
        this.mrs = [];
        this.cachePickInfo = new gd3d.framework.pickinfo();
        this.cacheRota = new gd3d.math.quaternion();
        this.cache_y = 0;
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_kinematic.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.iptMgr = physics3dDemoTool.iptMgr;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_kinematic.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_floor = physics3dDemoTool.mats["white"];
        var trans = new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x = 20;
        trans.localScale.y = 0.01;
        trans.localScale.z = 20;
        this.scene.addChild(trans);
        var mr = physics3dDemoTool.attachMesh(trans, mat_floor, "cube");
        var ctrBox = new gd3d.framework.transform();
        this.ctrBox = ctrBox;
        this.ctrBox.localPosition.y = 3;
        this.scene.addChild(ctrBox);
        var mr_ctr = physics3dDemoTool.attachMesh(ctrBox, mat_activated, "cube");
        var trans2 = new gd3d.framework.transform();
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        this.scene.addChild(trans2);
        var mr2 = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.localPosition.y = 10;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        var mr3 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        var mr_cl = physics3dDemoTool.attachMesh(cylinder_mid, mat_activated, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0), new gd3d.framework.OimoJSPlugin());
        var ctrBoxImpostor = new gd3d.framework.PhysicsImpostor(ctrBox, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.8, kinematic: true });
        var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.3 });
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.3 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.6, friction: 0.5 });
        this.mrs.push(mr_cl, mr3, mr2, mr_ctr);
        this.iptMgr.addPointListener(gd3d.event.PointEventEnum.PointMove, this.onPonitMove, this);
    };
    test_3DPhysics_kinematic.prototype.onPonitMove = function (_a) {
        var x = _a[0], y = _a[1];
        var viewPos = help_v2;
        viewPos.x = x;
        viewPos.y = y;
        console.log("x: " + x + " ,y :" + y);
        var ray = this.camera.creatRayByScreen(viewPos, this.app);
        var mf = this.floor.gameObject.getComponent("meshFilter");
        var isinsrt = mf.mesh.intersects(ray, this.floor.getWorldMatrix(), this.cachePickInfo);
        if (!isinsrt || !this.cachePickInfo || !this.cachePickInfo.hitposition)
            return;
        var pos = this.cachePickInfo.hitposition;
        console.log("pos  x: " + pos.x + " ,y :" + pos.y + " , z: " + pos.z);
        pos.y += 0.55;
        this.ctrBox.physicsImpostor.kinematicSetPosition(pos);
    };
    test_3DPhysics_kinematic.prototype.updateRoate = function () {
        if (!this.ctrBox)
            return;
        this.cache_y += 3;
        gd3d.math.quatFromEulerAngles(0, this.cache_y, 0, this.cacheRota);
        this.ctrBox.physicsImpostor.kinematicSetRotation(this.cacheRota);
    };
    test_3DPhysics_kinematic.prototype.update = function (delta) {
        this.updateRoate();
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_kinematic;
}());
var test_3DPhysics_motor_hinge = (function () {
    function test_3DPhysics_motor_hinge() {
        this.mrs = [];
        this.guiMsg = "铰链马达测试demo hinge";
        this.motorSpeed = 10;
        this.force = new gd3d.math.vector3(-50, 0, 0);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_motor_hinge.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_motor_hinge.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.y = 5;
        trans2.localPosition.x = -0.3;
        trans2.localPosition.z = 0.3;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "cylinder");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var jointData = {
            mainPivot: new gd3d.math.vector3(0, 0, 0),
            connectedPivot: new gd3d.math.vector3(0, -2, 0),
            mainAxis: new gd3d.math.vector3(0, 0, 1),
            connectedAxis: new gd3d.math.vector3(0, 0, 0),
            nativeParams: {}
        };
        var phyJ = gd3d.framework.MotorEnabledJoint;
        var joint1 = new phyJ(phyJ.HingeJoint, jointData);
        this.targetMotor = joint1;
        cylinderImpostor.addJoint(boxImpostor, joint1);
        joint1.setMotor(this.motorSpeed);
        gd3d.math.quatFromEulerAngles(90, 0, 0, cylinder_mid.localRotate);
        this.setGUI();
    };
    test_3DPhysics_motor_hinge.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        gui.add(this, "motorSpeed", 1, 100);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'changeMotorSpeed');
    };
    test_3DPhysics_motor_hinge.prototype.changeMotorSpeed = function () {
        if (!this.targetMotor)
            return;
        this.targetMotor.setMotor(this.motorSpeed);
    };
    test_3DPhysics_motor_hinge.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_motor_hinge.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_motor_hinge.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_motor_hinge;
}());
var test_3DPhysics_motor_slider = (function () {
    function test_3DPhysics_motor_slider() {
        this.mrs = [];
        this.guiMsg = "滑竿马达测试demo slider";
        this.force = new gd3d.math.vector3(10, 0, 0);
        this.contactlocalPoint = new gd3d.math.vector3(0, 0, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.motorSpeed = 10;
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_motor_slider.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_motor_slider.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_stick = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        trans2.localPosition.x = -4;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        var mr = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var trans3 = new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        var mr1 = physics3dDemoTool.attachMesh(trans3, mat_activated, "sphere");
        var cylinder_mid = new gd3d.framework.transform();
        cylinder_mid.name = "cylinder";
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        physics3dDemoTool.attachMesh(cylinder_mid, mat_stick, "sphere");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6, friction: 0.5 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr, mr1);
        var phyJ = gd3d.framework.MotorEnabledJoint;
        var joint1 = new phyJ(phyJ.SliderJoint, {
            mainAxis: new gd3d.math.vector3(1, 0, 0),
            collision: true
        });
        this.targetMotor = joint1;
        cylinderImpostor.addJoint(boxImpostor, joint1);
        joint1.setMotor(this.motorSpeed);
        this.setGUI();
    };
    test_3DPhysics_motor_slider.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        gui.add(this, "motorSpeed", 1, 100);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'changeMotorSpeed');
    };
    test_3DPhysics_motor_slider.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_motor_slider.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_motor_slider.prototype.changeMotorSpeed = function () {
        if (!this.targetMotor)
            return;
        this.targetMotor.setMotor(this.motorSpeed);
    };
    test_3DPhysics_motor_slider.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
    };
    return test_3DPhysics_motor_slider;
}());
var test_3DPhysics_motor_wheel = (function () {
    function test_3DPhysics_motor_wheel() {
        this.mrs = [];
        this.connectedPivot = new gd3d.math.vector3(-2, 0, 0);
        this.mainPivot = new gd3d.math.vector3(0, -1.5, 0);
        this.tempV3 = new gd3d.math.vector3();
        this.motorSpeed = 10;
        this.guiMsg = "车轮马达测试demo wheel(hinge2)";
        this.force = new gd3d.math.vector3(0, 10, 0);
        this.contactlocalPoint = new gd3d.math.vector3(0, -0.5, 0.45);
        this.tcount = 0;
        this.time = 0.5;
    }
    test_3DPhysics_motor_wheel.prototype.start = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, physics3dDemoTool.init(app)];
                    case 1:
                        _a.sent();
                        this.app = app;
                        this.scene = physics3dDemoTool.scene;
                        this.astMgr = physics3dDemoTool.astMgr;
                        this.camera = physics3dDemoTool.camera;
                        this.init();
                        return [2, null];
                }
            });
        });
    };
    test_3DPhysics_motor_wheel.prototype.init = function () {
        var mat_activated = physics3dDemoTool.mats["activated"];
        var mat_sleeping = physics3dDemoTool.mats["sleeping"];
        var mat_joint = physics3dDemoTool.mats["uvTest"];
        var trans2 = new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box";
        gd3d.math.vec3Set(trans2.localPosition, -this.connectedPivot.x, -this.mainPivot.y, 0);
        trans2.localScale.x = 0.5;
        this.scene.addChild(trans2);
        var mr2 = physics3dDemoTool.attachMesh(trans2, mat_activated, "cube");
        var mid_sphere = new gd3d.framework.transform();
        mid_sphere.name = "sphere_1";
        mid_sphere.localPosition.y = 8;
        gd3d.math.vec3SetAll(mid_sphere.localScale, 0.5);
        this.scene.addChild(mid_sphere);
        var mr_cl = physics3dDemoTool.attachMesh(mid_sphere, mat_joint, "sphere");
        this.scene.enablePhysics(new gd3d.math.vector3(0, 0, 0), new gd3d.framework.OimoJSPlugin());
        var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        var cylinderImpostor = new gd3d.framework.PhysicsImpostor(mid_sphere, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0, friction: 0.5 });
        this.mrs.push(mr2);
        var phyJ = gd3d.framework.MotorEnabledJoint;
        var joint1 = new phyJ(phyJ.WheelJoint, {
            mainPivot: this.mainPivot,
            connectedPivot: this.connectedPivot,
            mainAxis: new gd3d.math.vector3(0, 1, 0),
            connectedAxis: new gd3d.math.vector3(1, 0, 0),
            nativeParams: {}
        });
        this.targetMotor = joint1;
        cylinderImpostor.addJoint(boxImpostor, joint1);
        joint1.setMotor(1, 100);
        this.setGUI();
        this.addDisplayObj();
    };
    test_3DPhysics_motor_wheel.prototype.addDisplayObj = function () {
        var mat_pole = physics3dDemoTool.mats["purple"];
        var diameter = 0.25;
        var m_y = Math.abs(this.mainPivot.y);
        var m_x = Math.abs(this.connectedPivot.x);
        this.pole = new gd3d.framework.transform();
        this.scene.addChild(this.pole);
        var _pole = new gd3d.framework.transform();
        this.pole.addChild(_pole);
        gd3d.math.vec3Set(_pole.localScale, m_x, diameter, diameter);
        gd3d.math.vec3Set(_pole.localPosition, -_pole.localScale.x / 2, 0, 0);
        physics3dDemoTool.attachMesh(_pole, mat_pole, "cube");
        this.pole_1 = new gd3d.framework.transform();
        this.scene.addChild(this.pole_1);
        var _pole_1 = new gd3d.framework.transform();
        gd3d.math.vec3Set(_pole_1.localScale, diameter, m_y, diameter);
        gd3d.math.vec3Set(_pole_1.localPosition, 0, _pole_1.localScale.y / 2, 0);
        this.pole_1.addChild(_pole_1);
        physics3dDemoTool.attachMesh(_pole_1, mat_pole, "cube");
    };
    test_3DPhysics_motor_wheel.prototype.syncDisplayRT = function () {
        if (!this.boxTran || !this.pole)
            return;
        var bPos = this.boxTran.localPosition;
        gd3d.math.vec3Clone(bPos, this.pole.localPosition);
        gd3d.math.quatClone(this.boxTran.localRotate, this.pole.localRotate);
        this.pole.localPosition = this.pole.localPosition;
        this.pole.localRotate = this.pole.localRotate;
        gd3d.math.vec3Set(this.pole_1.localPosition, 0, bPos.y, 0);
        this.pole_1.localPosition = this.pole_1.localPosition;
    };
    test_3DPhysics_motor_wheel.prototype.changeMotorSpeed = function () {
        if (!this.targetMotor)
            return;
        this.targetMotor.setMotor(this.motorSpeed);
    };
    test_3DPhysics_motor_wheel.prototype.setGUI = function () {
        if (!dat)
            return;
        var gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        var folderF = gui.addFolder("force (冲量)");
        var limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        var folderC = gui.addFolder("contactPoint (施加点)");
        var limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        gui.add(this, "motorSpeed", 1, 100);
        var folderFun = gui.addFolder("触发方法");
        folderFun.open();
        folderFun.add(this, 'impulseBox');
        folderFun.add(this, 'changeMotorSpeed');
    };
    test_3DPhysics_motor_wheel.prototype.impulseBox = function () {
        this.doImpulse(this.boxTran.physicsImpostor);
    };
    test_3DPhysics_motor_wheel.prototype.doImpulse = function (phyImpostor) {
        var pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(), this.contactlocalPoint, pos);
        phyImpostor.applyImpulse(this.force, pos);
    };
    test_3DPhysics_motor_wheel.prototype.update = function (delta) {
        this.tcount += delta;
        if (this.tcount > this.time) {
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }
        this.syncDisplayRT();
    };
    return test_3DPhysics_motor_wheel;
}());
var test_RangeScreen = (function () {
    function test_RangeScreen() {
        this.timer = 0;
        this.movetarget = new gd3d.math.vector3();
        this.pointDown = false;
    }
    test_RangeScreen.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.inputMgr = this.app.getInputMgr();
        this.scene = this.app.getScene();
        var cuber;
        console.warn("Finish it.");
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = 10;
        cube.localScale.y = 0.1;
        cube.localScale.z = 10;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        var smesh = this.app.getAssetMgr().getDefaultMesh("pyramid");
        mesh.mesh = (this.app.getAssetMgr().getDefaultMesh("cube"));
        var renderer = cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        cube.markDirty();
        cuber = renderer;
        this.cube = cube;
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 1;
            this.cube2.localTranslate.x = -5;
            this.cube2.markDirty();
            var mesh = this.cube2.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer");
            var coll = this.cube2.gameObject.addComponent("spherecollider");
            coll.center = new gd3d.math.vector3(0, 1, 0);
            coll.radius = 1;
        }
        this.cube3 = this.cube2.clone();
        this.scene.addChild(this.cube3);
        {
            this.cube3 = new gd3d.framework.transform();
            this.cube3.name = "cube3";
            this.scene.addChild(this.cube3);
            this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 1;
            this.cube3.localTranslate.x = -5;
            this.cube3.markDirty();
            var mesh = this.cube3.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube3.gameObject.addComponent("meshRenderer");
            var coll = this.cube3.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        {
            this.cube4 = new gd3d.framework.transform();
            this.cube4.name = "cube4";
            this.scene.addChild(this.cube4);
            this.cube4.localScale.x = this.cube4.localScale.y = this.cube4.localScale.z = 1;
            this.cube4.localTranslate.x = 5;
            this.cube4.markDirty();
            var mesh = this.cube4.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube4.gameObject.addComponent("meshRenderer");
            var coll = this.cube4.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        this.camera.viewport = new gd3d.math.rect(0, 0, 0.5, 0.5);
        console.log("this camera: " + this.camera.viewport);
        objCam.markDirty();
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            _camera.order = 2;
            objCam2.localTranslate = new gd3d.math.vector3(0, 5, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0.5, 0.5, 0.5, 0.5);
            objCam2.markDirty();
        }
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            _camera.order = 3;
            objCam2.localTranslate = new gd3d.math.vector3(0, 8, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0.5, 0, 0.5, 0.5);
            objCam2.markDirty();
        }
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            _camera.order = 4;
            objCam2.localTranslate = new gd3d.math.vector3(0, 8, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0, 0.5, 0.5, 0.5);
            objCam2.markDirty();
        }
    };
    test_RangeScreen.prototype.update = function (delta) {
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
            var tempinfo = gd3d.math.pool.new_pickInfo();
            var bool = this.scene.pick(ray, tempinfo);
            if (bool != null) {
                gd3d.math.vec3Clone(tempinfo.hitposition, this.movetarget);
                this.timer = 0;
            }
            gd3d.math.pool.delete_pickInfo(tempinfo);
        }
        this.pointDown = this.inputMgr.point.touch;
        if (this.cube3.gameObject.getComponent("boxcollider").intersectsTransform(this.cube4)) {
            return;
        }
        this.timer += delta;
        this.cube3.localTranslate.x += delta;
        this.cube3.markDirty();
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
    };
    return test_RangeScreen;
}());
var test_Rvo2 = (function () {
    function test_Rvo2() {
        this.sim = new RVO.Simulator(1, 10, 5, 10, 10, 1, 0.2, [0, 0]);
        this.goals = [];
        this.size = 0.5;
        this.spheres = [];
    }
    test_Rvo2.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.far = 1000;
        objCam.localTranslate = new gd3d.math.vector3(0, 150, 0);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
        this.init();
    };
    test_Rvo2.prototype.init = function () {
        var sphere = new gd3d.framework.transform;
        sphere.localTranslate.x = sphere.localTranslate.y = sphere.localTranslate.z = 0;
        var mf = sphere.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh("sphere");
        var mr = sphere.gameObject.addComponent("meshRenderer");
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material("sphere");
        mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        var count = 50;
        var radius = 55;
        var tempdir = gd3d.math.pool.new_vector3();
        for (var i = 0; i < count; i++) {
            gd3d.math.vec3Set_One(tempdir);
            var rate = i / count;
            tempdir.x = Math.sin(rate * 2 * Math.PI);
            tempdir.z = Math.cos(rate * 2 * Math.PI);
            gd3d.math.vec3Normalize(tempdir, tempdir);
            var temps = sphere.clone();
            this.scene.addChild(temps);
            gd3d.math.vec3ScaleByNum(tempdir, radius, tempdir);
            gd3d.math.vec3Clone(tempdir, temps.localTranslate);
            temps.markDirty();
            this.spheres.push(temps);
            this.sim.addAgent([temps.localTranslate.x, temps.localTranslate.z]);
            this.goals.push([-temps.localTranslate.x, -temps.localTranslate.z]);
        }
        var c = 0;
        this.sim.addObstacle([
            [5 + c, -5 + c],
            [5 + c, 5 + c],
            [-5 + c, 5 + c],
            [-5 + c, -5 + c]
        ]);
        this.sim.processObstacles();
    };
    test_Rvo2.prototype.update = function (delta) {
        CameraController.instance().update(delta);
        if (this.reachedGoals(this.sim, this.goals)) {
            console.error("sim end ");
        }
        else {
            this.updateVisualization(this.sim);
            this.setPreferredVelocities(this.sim, this.goals);
            this.sim.doStep();
        }
    };
    test_Rvo2.prototype.reachedGoals = function (sim, goals) {
        for (var i = 0, len = sim.agents.length; i < len; i++) {
            if (RVO.Vector.absSq(RVO.Vector.subtract(sim.agents[i].position, goals[i])) > 1) {
                return false;
            }
        }
        return true;
    };
    test_Rvo2.prototype.setPreferredVelocities = function (sim, goals) {
        for (var i = 0, len = sim.agents.length; i < len; i++) {
            var goalVector = RVO.Vector.subtract(goals[i], sim.agents[i].position);
            if (RVO.Vector.absSq(goalVector) > 1) {
                goalVector = RVO.Vector.normalize(goalVector);
            }
            sim.agents[i].prefVelocity = goalVector;
        }
    };
    test_Rvo2.prototype.updateVisualization = function (sim) {
        for (var i = 0; i < this.spheres.length; i++) {
            this.spheres[i].localTranslate.x = sim.agents[i].position[0];
            this.spheres[i].localTranslate.z = sim.agents[i].position[1];
            this.spheres[i].markDirty();
        }
    };
    return test_Rvo2;
}());
var test_UIEffect = (function () {
    function test_UIEffect() {
        this.amount = 1;
        this.timer = 0;
        this.bere = false;
        this.bere1 = false;
    }
    test_UIEffect.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        console.warn("Finish it.");
        var sh = this.app.getAssetMgr().getShader("color");
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10;
        objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
        objCam.markDirty();
        var o2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(o2d);
        this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        console.warn("Finish load img.");
                        var count = 80;
                        var size = 30;
                        var gap = 10;
                        for (var i = 0; i < count; i++) {
                            for (var j = 0; j < count; j++) {
                                var assetStr = "zg256.png";
                                var texture = app.getAssetMgr().getAssetByName(assetStr);
                                var t2d_1 = new gd3d.framework.transform2D();
                                t2d_1.width = t2d_1.height = size;
                                t2d_1.pivot.x = t2d_1.pivot.y = 0;
                                t2d_1.localTranslate.x = i * gap;
                                t2d_1.localTranslate.y = j * gap;
                                o2d.addChild(t2d_1);
                                var img_1 = t2d_1.addComponent("image2D");
                                img_1.imageType = gd3d.framework.ImageType.Simple;
                                img_1.sprite = _this.app.getAssetMgr().getDefaultSprite("grid_sprite");
                            }
                        }
                    }
                });
            }
        });
    };
    test_UIEffect.prototype.update = function (delta) {
    };
    return test_UIEffect;
}());
var test_UI_Component = (function () {
    function test_UI_Component() {
        this.taskmgr = new gd3d.framework.taskMgr();
    }
    test_UI_Component.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10;
        this.rooto2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(this.rooto2d);
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));
    };
    test_UI_Component.prototype.createUI = function (astState, state) {
        var atlasComp = this.assetMgr.getAssetByName("comp.atlas.json");
        var tex_0 = this.assetMgr.getAssetByName("zg03_256.png");
        var bg_t = new gd3d.framework.transform2D;
        bg_t.name = "框底图";
        bg_t.width = 400;
        bg_t.height = 260;
        bg_t.pivot.x = 0;
        bg_t.pivot.y = 0;
        bg_t.localTranslate.y = 100;
        this.rooto2d.addChild(bg_t);
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
        test_UI_Component["lab"] = lab_l;
        lab_l.font = this.assetMgr.getAssetByName("STXINGKA.font.json");
        lab_l.fontsize = 24;
        lab_l.text = "我是段文本\n换行测试";
        lab_l.color = new gd3d.math.color(0.2, 0.2, 0.2, 1);
        test_UI_Component["obj"] = this;
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
            var temp = "";
            for (var i = 0; i < nums.length; i++) {
                var num = Number(nums[i]);
                num++;
                num = num % 10;
                numIconarr[i].sprite = atlasComp.sprites["ui_lianji_" + num];
                numIconarr[i].transform.markDirty();
                temp += num.toString();
            }
            nums = temp;
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
        ipt.TextLabel.font = this.assetMgr.getAssetByName("STXINGKA.font.json");
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
        ipt.PlaceholderLabel.font = this.assetMgr.getAssetByName("STXINGKA.font.json");
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
        test_UI_Component.temp = iptFrame_t;
        var inputMgr = this.app.getInputMgr();
        this.app.webgl.canvas.addEventListener("keydown", function (ev) {
            if (ev.keyCode == 81) {
            }
        }, false);
        state.finish = true;
    };
    test_UI_Component.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    _this.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
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
    test_UI_Component.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    test_UI_Component.prototype.testFun = function () {
        var lab = test_UI_Component["lab"];
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
    return test_UI_Component;
}());
var t;
(function (t_1) {
    var test_blend = (function () {
        function test_blend() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.counttimer = 0;
            this.angularVelocity = new gd3d.math.vector3(10, 0, 0);
            this.eulerAngle = gd3d.math.pool.new_vector3();
        }
        test_blend.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_blend.prototype.loadText = function (laststate, state) {
            var t = 2;
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    t--;
                    if (t == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/trailtest2.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    t--;
                    if (t == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
        };
        test_blend.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 120;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, 10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
        };
        test_blend.prototype.addplane = function (laststate, state) {
            {
                {
                    var background = new gd3d.framework.transform();
                    background.name = "background";
                    background.localScale.x = background.localScale.y = 5;
                    background.localTranslate.z = -1;
                    console.log(background);
                    this.scene.addChild(background);
                    background.markDirty();
                    background.updateWorldTran();
                    var mesh = background.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = background.gameObject.addComponent("meshRenderer");
                    var meshRender = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json");
                    if (sh != null) {
                        meshRender.materials = [];
                        meshRender.materials.push(new gd3d.framework.material());
                        meshRender.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        meshRender.materials[0].setTexture("_MainTex", texture);
                    }
                    this.background = background;
                }
            }
            {
                {
                    var foreground = new gd3d.framework.transform();
                    foreground.name = "foreground ";
                    foreground.localScale.x = foreground.localScale.y = 5;
                    this.scene.addChild(foreground);
                    foreground.markDirty();
                    foreground.updateWorldTran();
                    var mesh = foreground.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = foreground.gameObject.addComponent("meshRenderer");
                    var meshRender = renderer;
                    var sh = this.app.getAssetMgr().getShader("particles_additive.shader.json");
                    if (sh != null) {
                        meshRender.materials = [];
                        meshRender.materials.push(new gd3d.framework.material());
                        meshRender.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("trailtest2.png");
                        meshRender.materials[0].setTexture("_MainTex", texture);
                    }
                    this.foreground = foreground;
                }
            }
            state.finish = true;
        };
        test_blend.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.addplane.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
        };
        test_blend.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.background != undefined) {
                var x = Math.cos(this.timer * 1);
                var y = Math.sin(this.timer * 1);
                this.background.localTranslate.x = 1.5 * x;
                this.background.localTranslate.y = 1.5 * y;
                this.background.markDirty();
            }
        };
        return test_blend;
    }());
    t_1.test_blend = test_blend;
})(t || (t = {}));
var test_fakepbr = (function () {
    function test_fakepbr() {
        this.timer = 0;
    }
    test_fakepbr.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/fakepbr/zhanshen.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("zhanshen.prefab.json");
                        _this.baihu = _prefab.getCloneTrans();
                        _this.scene.addChild(_this.baihu);
                        objCam.lookat(_this.baihu);
                        objCam.markDirty();
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 0, -5);
        objCam.markDirty();
        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }
        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light2 = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }
    };
    test_fakepbr.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 2, 2, -z2 * 2);
        if (this.baihu) {
            objCam.lookatPoint(new gd3d.math.vector3(0, 1.5, 0));
            objCam.markDirty();
        }
        if (this.light != null) {
            var objlight = this.light.gameObject.transform;
            objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
            objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            var objlight2 = this.light.gameObject.transform;
            objlight2.localTranslate = new gd3d.math.vector3(z * 5, 10, x * 5);
            objlight2.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        }
    };
    return test_fakepbr;
}());
var test_keyFrameAni = (function () {
    function test_keyFrameAni() {
        this.taskMgr = new gd3d.framework.taskMgr();
    }
    test_keyFrameAni.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadasset.bind(this));
        this.taskMgr.addTaskCall(this.iniscene.bind(this));
        this.taskMgr.addTaskCall(this.addbtns.bind(this));
    };
    test_keyFrameAni.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
        });
    };
    test_keyFrameAni.prototype.loadasset = function (laststate, state) {
        this.app.getAssetMgr().load("res/keyframeAnimation/Cube/Cube.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
        });
    };
    test_keyFrameAni.prototype.iniscene = function (laststate, state) {
        var cubePrefab = this.app.getAssetMgr().getAssetByName("Cube.prefab.json");
        var head = cubePrefab.getCloneTrans();
        this.obj3d = head;
        this.scene.addChild(head);
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10000;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.obj3d);
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
        state.finish = true;
    };
    test_keyFrameAni.prototype.addbtns = function () {
        var _this = this;
        this.addbtn("play", 10, 100, function () {
            var anip = _this.obj3d.gameObject.getComponent("keyFrameAniPlayer");
            anip.play();
        });
        this.addbtn("stop", 10, 150, function () {
            var anip = _this.obj3d.gameObject.getComponent("keyFrameAniPlayer");
            anip.stop();
        });
        this.addbtn("rewind", 10, 200, function () {
            var anip = _this.obj3d.gameObject.getComponent("keyFrameAniPlayer");
            anip.rewind();
        });
    };
    test_keyFrameAni.prototype.addbtn = function (text, x, y, func) {
        var btn = document.createElement("button");
        btn.textContent = text;
        btn.onclick = function () {
            func();
        };
        btn.style.top = y + "px";
        btn.style.left = x + "px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
    };
    test_keyFrameAni.prototype.update = function (delta) {
        CameraController.instance().update(delta);
        this.taskMgr.move(delta);
    };
    return test_keyFrameAni;
}());
var testLiChangeMesh = (function () {
    function testLiChangeMesh() {
        this.uileft = 0;
        this.timer = 0;
    }
    testLiChangeMesh.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var role;
        var role1;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/FS_01/FS_01.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("FS_01.prefab.json");
                        role = _prefab.getCloneTrans();
                        _this.scene.addChild(role);
                        role.localScale = new gd3d.math.vector3(1, 1, 1);
                        role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                        var _aniplayer = role.gameObject.getComponent("aniplayer");
                        _aniplayer.autoplay = true;
                        _this.cube = role;
                        if (role1 != null) {
                            _this.createChangeBtn(role, role1, o2d, "feet", "feet");
                        }
                    }
                });
                _this.app.getAssetMgr().load("res/prefabs/FS_002/FS_002.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("FS_002.prefab.json");
                        role1 = _prefab.getCloneTrans();
                        if (role != null) {
                            _this.createChangeBtn(role, role1, o2d, "feet", "feet");
                        }
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        var o2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(o2d);
    };
    testLiChangeMesh.prototype.createChangeBtn = function (role, role1, o2d, part, part2) {
        var _this = this;
        var t2d_9 = new gd3d.framework.transform2D();
        t2d_9.width = 150;
        t2d_9.height = 50;
        t2d_9.pivot.x = 0;
        t2d_9.pivot.y = 0;
        t2d_9.localTranslate.x = this.uileft;
        t2d_9.localTranslate.y = 300;
        var btn = t2d_9.addComponent("button");
        var img9 = t2d_9.addComponent("image2D");
        img9.imageType = gd3d.framework.ImageType.Sliced;
        btn.targetImage = img9;
        btn.transition = gd3d.framework.TransitionType.ColorTint;
        var role_part;
        var role1_part;
        btn.addListener(gd3d.event.UIEventEnum.PointerClick, function () {
            if (role_part == null) {
                var role_skinMeshRenders = role.gameObject.getComponentsInChildren("skinnedMeshRenderer");
                var role1_skinMeshRenders = role1.gameObject.getComponentsInChildren("skinnedMeshRenderer");
                for (var key in role_skinMeshRenders) {
                    if (role_skinMeshRenders[key].gameObject.getName().indexOf("_" + part) >= 0) {
                        role_part = role_skinMeshRenders[key];
                    }
                }
                for (var key in role1_skinMeshRenders) {
                    if (role1_skinMeshRenders[key].gameObject.getName().indexOf("_" + part2) >= 0) {
                        role1_part = role1_skinMeshRenders[key];
                    }
                }
            }
            var role_part_parent = role_part.gameObject.transform.parent;
            role1_part.gameObject.transform.parent.addChild(role_part.gameObject.transform);
            role_part_parent.addChild(role1_part.gameObject.transform);
            var role_part_player = role_part.player;
            role_part._player = role1_part.player;
            role1_part._player = role_part_player;
        }, this);
        o2d.addChild(t2d_9);
        var lab = new gd3d.framework.transform2D();
        lab.name = "lab111";
        lab.width = 150;
        lab.height = 50;
        lab.pivot.x = 0;
        lab.pivot.y = 0;
        lab.markDirty();
        var label = lab.addComponent("label");
        label.text = "换" + part;
        label.fontsize = 25;
        label.color = new gd3d.math.color(1, 0, 0, 1);
        t2d_9.addChild(lab);
        this.app.getAssetMgr().load("res/uisprite.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var texture = _this.app.getAssetMgr().getAssetByName("uisprite.png");
                img9.sprite = _this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            }
        });
        this.app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish)
                        label.font = _this.app.getAssetMgr().getAssetByName("STXINGKA.font.json");
                });
            }
        });
        this.uileft += 150;
    };
    testLiChangeMesh.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        if (this.cube != null) {
            objCam.lookat(this.cube);
            objCam.markDirty();
            objCam.updateWorldTran();
        }
    };
    return testLiChangeMesh;
}());
var t;
(function (t) {
    var test_rendertexture = (function () {
        function test_rendertexture() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_rendertexture.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                state.finish = true;
            });
        };
        test_rendertexture.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_rendertexture.prototype.initscene = function (laststate, state) {
            {
                var objCam = new gd3d.framework.transform();
                objCam.name = "cam_show";
                this.scene.addChild(objCam);
                this.showcamera = objCam.gameObject.addComponent("camera");
                this.showcamera.order = 0;
                this.showcamera.near = 0.01;
                this.showcamera.far = 30;
                this.showcamera.fov = Math.PI * 0.3;
                objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
            }
            {
                var o2ds = new gd3d.framework.overlay2D();
                this.showcamera.addOverLay(o2ds);
                {
                    var t2d = new gd3d.framework.transform2D();
                    t2d.name = "ceng1";
                    t2d.localTranslate.x = 200;
                    t2d.localTranslate.y = 200;
                    t2d.width = 300;
                    t2d.height = 300;
                    t2d.pivot.x = 0;
                    t2d.pivot.y = 0;
                    t2d.markDirty();
                    var rawiamge = t2d.addComponent("rawImage2D");
                    rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("zg256.png");
                    o2ds.addChild(t2d);
                }
                {
                    var cube1 = new gd3d.framework.transform();
                    cube1.name = "cube1";
                    this.scene.addChild(cube1);
                    cube1.localScale.x = 8;
                    cube1.localScale.y = 1;
                    cube1.localScale.z = 1;
                    cube1.markDirty();
                    var mesh1 = cube1.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh1.mesh = (smesh);
                    var renderer = cube1.gameObject.addComponent("meshRenderer");
                }
            }
            state.finish = true;
        };
        test_rendertexture.prototype.add3dmodelbeforeUi = function (laststate, state) {
            {
                var modelcam = new gd3d.framework.transform();
                modelcam.name = "modelcam";
                this.scene.addChild(modelcam);
                this.wath_camer = modelcam.gameObject.addComponent("camera");
                this.wath_camer.order = 1;
                this.wath_camer.clearOption_Color = false;
                this.wath_camer.clearOption_Depth = true;
                this.wath_camer.CullingMask = gd3d.framework.CullingMask.modelbeforeui | gd3d.framework.CullingMask.ui;
                modelcam.localTranslate = new gd3d.math.vector3(0, 10, -10);
                modelcam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                modelcam.markDirty();
            }
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                this.scene.addChild(cube);
                cube.localScale.x = 3;
                cube.localScale.y = 3;
                cube.localScale.z = 3;
                cube.markDirty();
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                renderer.renderLayer = gd3d.framework.CullingMask.modelbeforeui;
                var cuber = renderer;
                this.sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                if (this.sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(this.sh);
                    var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
                this.target = cube;
                {
                    var o2d1 = new gd3d.framework.overlay2D();
                    this.wath_camer.addOverLay(o2d1);
                    {
                        var t2d = new gd3d.framework.transform2D();
                        t2d.name = "ceng2";
                        t2d.localTranslate.x = 300;
                        t2d.localTranslate.y = 100;
                        t2d.width = 150;
                        t2d.height = 150;
                        t2d.pivot.x = 0;
                        t2d.pivot.y = 0;
                        t2d.markDirty();
                        var rawiamge = t2d.addComponent("rawImage2D");
                        rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("zg256.png");
                        o2d1.addChild(t2d);
                    }
                }
            }
            state.finish = true;
        };
        test_rendertexture.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            this.taskmgr.addTaskCall(this.add3dmodelbeforeUi.bind(this));
        };
        test_rendertexture.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            if (this.target == undefined)
                return;
            this.timer += delta;
            gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 3, this.target.localRotate);
            this.target.markDirty();
        };
        return test_rendertexture;
    }());
    t.test_rendertexture = test_rendertexture;
})(t || (t = {}));
var test_loadCompressUseAssetbundle = (function () {
    function test_loadCompressUseAssetbundle() {
    }
    test_loadCompressUseAssetbundle.prototype.start = function (app) {
        var _this = this;
        console.log("i see you are a dog!");
        this.app = app;
        this.scene = this.app.getScene();
        var url = "res/prefabs/0001_ss_female/";
        var name = "0001_ss_female";
        var end = ".assetbundle.json";
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().loadCompressBundle(url + name + end, function (s) {
                    console.error("compressTextLoaded = " + s.compressTextLoaded);
                    console.error("progress = " + s.progress);
                    console.error("totalByteLength = " + s.totalByteLength);
                    console.error("curByteLength = " + s.curByteLength);
                });
            }
        });
    };
    test_loadCompressUseAssetbundle.prototype.update = function (delta) {
    };
    return test_loadCompressUseAssetbundle;
}());
var demo;
(function (demo) {
    var DragonTest = (function () {
        function DragonTest() {
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        DragonTest.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
            });
        };
        DragonTest.prototype.loadLongPrefab = function (laststate, state) {
            var _this = this;
            var resName = "long";
            this.app.getAssetMgr().load("res/prefabs/" + resName + "/" + resName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(resName + ".prefab.json");
                    _this.dragon = _prefab.getCloneTrans();
                    _this.scene.addChild(_this.dragon);
                    _this.dragon.markDirty();
                    _this.camTran = _this.dragon.find("Dummy001");
                    var ap_1 = _this.dragon.gameObject.getComponent("aniplayer");
                    var list = ap_1.awaitLoadClipNames();
                    var resPath = "res/prefabs/" + resName + "/resources/";
                    if (list.length > 0) {
                        var cname_1 = list[0];
                        ap_1.addClipByNameLoad(_this.app.getAssetMgr(), resPath, cname_1, function (sta, clipName) {
                            if (sta.isfinish) {
                                var clip = ap_1.getClip(cname_1);
                                ap_1.play(cname_1);
                            }
                        });
                    }
                    state.finish = true;
                }
            });
        };
        DragonTest.prototype.loadScene = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/scenes/test_scene/test_scene.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _scene = _this.app.getAssetMgr().getAssetByName("test_scene.scene.json");
                    var _root = _scene.getSceneRoot();
                    _this.scene.addChild(_root);
                    _root.localTranslate.y = -0.1;
                    _this.app.getScene().lightmaps = [];
                    _scene.useLightMap(_this.app.getScene());
                    state.finish = true;
                }
            });
        };
        DragonTest.prototype.addCameraAndLight = function (laststate, state) {
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.camTran.addChild(tranCam);
            tranCam.localEulerAngles = new gd3d.math.vector3(0, 270, 0);
            this.camera = tranCam.gameObject.addComponent("camera");
            this.camera.near = 0.001;
            this.camera.far = 200;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            tranCam.markDirty();
            var tranLight = new gd3d.framework.transform();
            tranLight.name = "light";
            this.scene.addChild(tranLight);
            this.light = tranLight.gameObject.addComponent("light");
            this.light.type = gd3d.framework.LightTypeEnum.Direction;
            tranLight.localTranslate.x = 5;
            tranLight.localTranslate.y = 5;
            tranLight.localTranslate.z = -5;
            tranLight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranLight.markDirty();
            state.finish = true;
        };
        DragonTest.prototype.start = function (app) {
            this.app = app;
            this.scene = app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadLongPrefab.bind(this));
            this.taskmgr.addTaskCall(this.addCameraAndLight.bind(this));
        };
        DragonTest.prototype.update = function (delta) {
            this.taskmgr.move(delta);
        };
        return DragonTest;
    }());
    demo.DragonTest = DragonTest;
})(demo || (demo = {}));
var test_navMesh = (function () {
    function test_navMesh() {
        this.cubesize = 0.5;
        this.pos = [];
        this.points = [];
        this.timer = 0;
        this.bere = false;
        this.pointDown = false;
    }
    test_navMesh.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        var names = ["MainCity_", "city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        var name = names[0];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.loadScene(name);
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 100));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
        this.navmeshMgr = gd3d.framework.NavMeshLoadManager.Instance;
    };
    test_navMesh.prototype.loadScene = function (assetName, isCompress) {
        var _this = this;
        if (isCompress === void 0) { isCompress = false; }
        var addScene = function () {
            var _scene = _this.app.getAssetMgr().getAssetByName(assetName + ".scene.json");
            var _root = _scene.getSceneRoot();
            _this.scene.addChild(_root);
            _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
            _root.markDirty();
            _this.app.getScene().lightmaps = [];
            _scene.useLightMap(_this.app.getScene());
            _scene.useFog(_this.app.getScene());
            _this.navmeshMgr.loadNavMesh("res/navmesh/" + assetName + ".nav.json", _this.app, function (s) {
                if (s.iserror) {
                    console.error(" " + s.errs + " ");
                    return;
                }
                console.error("scene navmesh : " + assetName + "  is loaded");
            });
        };
        if (isCompress) {
            this.app.getAssetMgr().loadCompressBundle("res/scenes/" + assetName + "/" + assetName + ".packs.txt", function (s) {
                if (s.isfinish) {
                    {
                        addScene();
                    }
                }
            });
        }
        else {
            this.app.getAssetMgr().load("res/scenes/" + assetName + "/" + assetName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                if (s1.isfinish) {
                    addScene();
                }
            });
        }
    };
    test_navMesh.prototype.pickDown = function () {
        var navTrans = this.navmeshMgr.navTrans;
        var navmesh = this.navmeshMgr.navMesh;
        if (navmesh == null)
            return;
        var inputMgr = this.app.getInputMgr();
        var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        var pickinfo = new gd3d.framework.pickinfo();
        var bool = navmesh.intersects(ray, navTrans.getWorldMatrix(), pickinfo);
        if (!bool)
            return;
        var endPos = pickinfo.hitposition;
        console.error(endPos);
        this.pos.push(endPos);
        if (this.pos.length > 1) {
            var arr = this.navmeshMgr.moveToPoints(this.pos.pop(), this.pos.pop());
            console.error(arr);
            this.pos.length = 0;
            var color = new gd3d.math.color(1, 0, 0, 0.5);
            this.createAllPoint(arr.length);
            for (var i = 0; i < arr.length; i++) {
                var p = arr[i];
                this.setPoint(i, p.x, p.y, p.z, color);
            }
            this.drawLine(arr);
        }
    };
    test_navMesh.prototype.drawLine = function (points) {
        if (this.lastLine) {
            this.lastLine.gameObject.visible = false;
            this.lastLine.markDirty();
            if (this.lastLine.parent)
                this.lastLine.parent.removeChild(this.lastLine);
            this.lastLine.dispose();
        }
        var mesh = this.genMesh(points);
        this.lastLine = new gd3d.framework.transform();
        var mf = this.lastLine.gameObject.addComponent("meshFilter");
        mf.mesh = mesh;
        mesh.glMesh.lineMode = WebGLRenderingContext.LINE_STRIP;
        this.lastLine.gameObject.addComponent("meshRenderer");
        this.lastLine.localTranslate.x = this.lastLine.localTranslate.y = this.lastLine.localTranslate.z = 0;
        this.scene.addChild(this.lastLine);
        this.lastLine.markDirty();
    };
    test_navMesh.prototype.genMesh = function (points) {
        var meshD = new gd3d.render.meshData();
        meshD.pos = [];
        meshD.color = [];
        meshD.trisindex = [];
        for (var i = 0; i < points.length; i++) {
            var pos = points[i];
            meshD.pos.push(new gd3d.math.vector3(pos.x, pos.y + (this.cubesize / 2), pos.z));
            meshD.trisindex.push(i);
            meshD.color.push(new gd3d.math.color(1, 0, 0, 1));
        }
        var _mesh = new gd3d.framework.mesh();
        _mesh.data = meshD;
        var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Color;
        var v32 = _mesh.data.genVertexDataArray(vf);
        var i16 = _mesh.data.genIndexDataArray();
        _mesh.glMesh = new gd3d.render.glMesh();
        _mesh.glMesh.initBuffer(this.app.webgl, vf, _mesh.data.pos.length);
        _mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);
        _mesh.glMesh.addIndex(this.app.webgl, i16.length);
        _mesh.glMesh.uploadIndexSubData(this.app.webgl, 0, i16);
        _mesh.submesh = [];
        {
            var sm = new gd3d.framework.subMeshInfo();
            sm.matIndex = 0;
            sm.useVertexIndex = 0;
            sm.start = 0;
            sm.size = i16.length;
            sm.line = true;
            _mesh.submesh.push(sm);
        }
        return _mesh;
    };
    test_navMesh.prototype.createAllPoint = function (count) {
        this.points.forEach(function (element) {
            if (element)
                element.gameObject.visible = false;
        });
        var need = count - this.points.length;
        if (need > 0) {
            for (var i = 0; i < need; i++) {
                this.generatePoint();
            }
        }
    };
    test_navMesh.prototype.setPoint = function (index, x, y, z, color) {
        var cube = this.points[index];
        cube.localTranslate.x = x;
        cube.localTranslate.y = y;
        cube.localTranslate.z = z;
        cube.markDirty();
        var mf = cube.gameObject.getComponent("meshFilter");
        if (mf.mesh.data.color == null)
            mf.mesh.data.color = [];
        mf.mesh.data.color.forEach(function (c) {
            if (c) {
                c.r = color.r;
                c.g = color.g;
                c.b = color.b;
                c.a = color.a;
            }
        });
        var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal | gd3d.render.VertexFormatMask.Tangent | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0;
        var v32 = mf.mesh.data.genVertexDataArray(vf);
        mf.mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);
        cube.gameObject.visible = true;
    };
    test_navMesh.prototype.generatePoint = function () {
        var cube = new gd3d.framework.transform;
        var mf = cube.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh("cube").clone();
        var mr = cube.gameObject.addComponent("meshRenderer");
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material("mat");
        mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        mr.materials[0].setTexture("_MainTex", this.assetMgr.getDefaultTexture("white"));
        this.points.push(cube);
        this.scene.addChild(cube);
        cube.localScale.x = cube.localScale.y = cube.localScale.z = this.cubesize;
    };
    test_navMesh.prototype.update = function (delta) {
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            this.pickDown();
        }
        this.pointDown = this.inputMgr.point.touch;
        this.timer += delta;
        CameraController.instance().update(delta);
    };
    return test_navMesh;
}());
var test_pbr = (function () {
    function test_pbr() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.PBRPath = "res/pbrRes/";
        this.material = this.PBRPath + "meta3/";
        this.skyName = "map";
        this.iblPath = this.PBRPath + ("IBL/" + this.skyName + "/");
    }
    test_pbr.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.localTranslate.z = -10;
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 1000;
        this.camera.backgroundColor = new gd3d.math.color(0, 0, 0, 0);
        CameraController.instance().init(this.app, this.camera);
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes1.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes2.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes3.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes4.bind(this));
        this.taskmgr.addTaskCall(this.init.bind(this));
    };
    test_pbr.prototype.init = function (astState, state) {
        var temp1 = new gd3d.framework.transform();
        this.scene.addChild(temp1);
        var mf = temp1.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh("sphere_quality");
        var mr = temp1.gameObject.addComponent("meshRenderer");
        mr.materials[0] = new gd3d.framework.material("testmat");
        mr.materials[0].setShader(this.assetMgr.getAssetByName("pbr.shader.json"));
        mr.materials[0].setTexture("brdf", this.assetMgr.getAssetByName("brdf.png"));
        mr.materials[0].setTexture("uv_Basecolor", this.assetMgr.getAssetByName("basecolor.png"));
        mr.materials[0].setTexture("uv_Normal", this.assetMgr.getAssetByName("normal.png"));
        mr.materials[0].setTexture("uv_MetallicRoughness", this.assetMgr.getAssetByName("metallicRoughness.png"));
        mr.materials[0].setTexture("uv_AO", this.assetMgr.getAssetByName("AO.png"));
        var negx = this.assetMgr.getAssetByName("negx.jpg");
        var negy = this.assetMgr.getAssetByName("negy.jpg");
        var negz = this.assetMgr.getAssetByName("negz.jpg");
        var posx = this.assetMgr.getAssetByName("posx.jpg");
        var posy = this.assetMgr.getAssetByName("posy.jpg");
        var posz = this.assetMgr.getAssetByName("posz.jpg");
        var negx_1 = this.assetMgr.getAssetByName("negx_1.jpg");
        var negy_1 = this.assetMgr.getAssetByName("negy_1.jpg");
        var negz_1 = this.assetMgr.getAssetByName("negz_1.jpg");
        var posx_1 = this.assetMgr.getAssetByName("posx_1.jpg");
        var posy_1 = this.assetMgr.getAssetByName("posy_1.jpg");
        var posz_1 = this.assetMgr.getAssetByName("posz_1.jpg");
        var negx_2 = this.assetMgr.getAssetByName("negx_2.jpg");
        var negy_2 = this.assetMgr.getAssetByName("negy_2.jpg");
        var negz_2 = this.assetMgr.getAssetByName("negz_2.jpg");
        var posx_2 = this.assetMgr.getAssetByName("posx_2.jpg");
        var posy_2 = this.assetMgr.getAssetByName("posy_2.jpg");
        var posz_2 = this.assetMgr.getAssetByName("posz_2.jpg");
        var negx_3 = this.assetMgr.getAssetByName("negx_3.jpg");
        var negy_3 = this.assetMgr.getAssetByName("negy_3.jpg");
        var negz_3 = this.assetMgr.getAssetByName("negz_3.jpg");
        var posx_3 = this.assetMgr.getAssetByName("posx_3.jpg");
        var posy_3 = this.assetMgr.getAssetByName("posy_3.jpg");
        var posz_3 = this.assetMgr.getAssetByName("posz_3.jpg");
        var negx_4 = this.assetMgr.getAssetByName("negx_4.jpg");
        var negy_4 = this.assetMgr.getAssetByName("negy_4.jpg");
        var negz_4 = this.assetMgr.getAssetByName("negz_4.jpg");
        var posx_4 = this.assetMgr.getAssetByName("posx_4.jpg");
        var posy_4 = this.assetMgr.getAssetByName("posy_4.jpg");
        var posz_4 = this.assetMgr.getAssetByName("posz_4.jpg");
        var skytex = new gd3d.framework.texture("skyCubeTex");
        skytex.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex.use();
        skytex.glTexture.uploadImages(negx, negy, negz, posx, posy, posz);
        var skytex1 = new gd3d.framework.texture("skyCubeTex");
        skytex1.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex1.use();
        skytex1.glTexture.uploadImages(negx_1, negy_1, negz_1, posx_1, posy_1, posz_1);
        var skytex2 = new gd3d.framework.texture("skyCubeTex");
        skytex2.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex2.use();
        skytex2.glTexture.uploadImages(negx_2, negy_2, negz_2, posx_2, posy_2, posz_2);
        var skytex3 = new gd3d.framework.texture("skyCubeTex");
        skytex3.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex3.use();
        skytex3.glTexture.uploadImages(negx_3, negy_3, negz_3, posx_3, posy_3, posz_3);
        var skytex4 = new gd3d.framework.texture("skyCubeTex");
        skytex4.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex4.use();
        skytex4.glTexture.uploadImages(negx_4, negy_4, negz_4, posx_4, posy_4, posz_4);
        mr.materials[0].setCubeTexture("u_sky", skytex);
        mr.materials[0].setCubeTexture("u_sky_1", skytex1);
        mr.materials[0].setCubeTexture("u_sky_2", skytex2);
        mr.materials[0].setCubeTexture("u_sky_3", skytex3);
        mr.materials[0].setCubeTexture("u_sky_4", skytex4);
        var cubesky = new gd3d.framework.transform();
        cubesky.localScale.x = cubesky.localScale.y = cubesky.localScale.z = 200;
        this.scene.addChild(cubesky);
        var mf_c = cubesky.gameObject.addComponent("meshFilter");
        mf_c.mesh = this.assetMgr.getDefaultMesh("cube");
        var mr_c = cubesky.gameObject.addComponent("meshRenderer");
        mr_c.materials[0] = new gd3d.framework.material("cubeskymat");
        mr_c.materials[0].setShader(this.assetMgr.getAssetByName("skybox.shader.json"));
        mr_c.materials[0].setCubeTexture("u_sky", skytex);
        state.finish = true;
    };
    test_pbr.prototype.loadpbrRes = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.loadpbrRes1 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.loadpbrRes2 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.loadpbrRes3 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.loadpbrRes4 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
            if (s1.isfinish) {
                _this.assetMgr.load(_this.PBRPath + "brdf.png", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                    if (s2.isfinish) {
                        _this.assetMgr.load(_this.material + "basecolor.png", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                            if (s3.isfinish) {
                                _this.assetMgr.load(_this.material + "normal.png", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                    if (s4.isfinish) {
                                        _this.assetMgr.load(_this.material + "metallicRoughness.png", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                            if (s5.isfinish) {
                                                _this.assetMgr.load(_this.material + "AO.png", gd3d.framework.AssetTypeEnum.Auto, function (s6) {
                                                    if (s6.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr.prototype.addCube = function () {
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
        cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        this.cube = cube;
        cube.markDirty();
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
        cube.localTranslate.x = 1;
        cube.localTranslate.z = 1;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
        cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        this.cube = cube;
        cube.markDirty();
    };
    test_pbr.prototype.update = function (delta) {
        this.taskmgr.move(delta);
        CameraController.instance().update(delta);
    };
    return test_pbr;
}());
var test_pbr_scene = (function () {
    function test_pbr_scene() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.lightPos1 = new gd3d.math.vector4(0.5, 0.5, 0.5, 1.0);
        this.lightPos2 = new gd3d.math.vector4(10, 5, 0, 1.0);
        this.PBRPath = "res/pbrRes/";
        this.material = this.PBRPath + "meta3/";
        this.skyName = "map";
        this.iblPath = this.PBRPath + ("IBL/" + this.skyName + "/");
        this.timer = 0;
    }
    test_pbr_scene.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.localTranslate.z = -10;
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10000;
        this.camera.backgroundColor = new gd3d.math.color(0, 0, 0, 0);
        var hoverc = this.camera.gameObject.addComponent("HoverCameraScript");
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0);
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes1.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes2.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes3.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes4.bind(this));
        this.taskmgr.addTaskCall(this.init.bind(this));
    };
    test_pbr_scene.prototype.addSphere = function (x, y, z, IBL, IBL_1, IBL_2, IBL_3, IBL_4, IBL_5, albedo, metallic, roughness) {
        var temp1 = new gd3d.framework.transform();
        temp1.localTranslate.x = x;
        temp1.localTranslate.y = y;
        temp1.localTranslate.z = z;
        this.scene.addChild(temp1);
        var mf = temp1.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh("sphere_quality");
        var mr = temp1.gameObject.addComponent("meshRenderer");
        mr.materials[0] = new gd3d.framework.material("testmat");
        mr.materials[0].setShader(this.assetMgr.getAssetByName("pbr.shader.json"));
        var brdfimg = this.assetMgr.getAssetByName("brdf.png");
        var temp2d = brdfimg.glTexture;
        temp2d.getReader();
        temp2d.uploadByteArray(true, false, temp2d.width, temp2d.height, temp2d.reader.data, true);
        mr.materials[0].setTexture("brdf", this.assetMgr.getAssetByName("brdf.png"));
        mr.materials[0].setVector4("CustomBasecolor", albedo);
        mr.materials[0].setFloat("CustomMetallic", metallic);
        mr.materials[0].setFloat("CustomRoughness", roughness);
        mr.materials[0].setVector4("light_1", this.lightPos1);
        mr.materials[0].setVector4("light_2", this.lightPos2);
        mr.materials[0].setCubeTexture("u_sky", IBL);
        mr.materials[0].setCubeTexture("u_sky_1", IBL_1);
        mr.materials[0].setCubeTexture("u_sky_2", IBL_2);
        mr.materials[0].setCubeTexture("u_sky_3", IBL_3);
        mr.materials[0].setCubeTexture("u_sky_4", IBL_4);
    };
    test_pbr_scene.prototype.init = function (astState, state) {
        var negx = this.assetMgr.getAssetByName("negx.jpg");
        var negy = this.assetMgr.getAssetByName("negy.jpg");
        var negz = this.assetMgr.getAssetByName("negz.jpg");
        var posx = this.assetMgr.getAssetByName("posx.jpg");
        var posy = this.assetMgr.getAssetByName("posy.jpg");
        var posz = this.assetMgr.getAssetByName("posz.jpg");
        var negx_1 = this.assetMgr.getAssetByName("negx_1.jpg");
        var negy_1 = this.assetMgr.getAssetByName("negy_1.jpg");
        var negz_1 = this.assetMgr.getAssetByName("negz_1.jpg");
        var posx_1 = this.assetMgr.getAssetByName("posx_1.jpg");
        var posy_1 = this.assetMgr.getAssetByName("posy_1.jpg");
        var posz_1 = this.assetMgr.getAssetByName("posz_1.jpg");
        var negx_2 = this.assetMgr.getAssetByName("negx_2.jpg");
        var negy_2 = this.assetMgr.getAssetByName("negy_2.jpg");
        var negz_2 = this.assetMgr.getAssetByName("negz_2.jpg");
        var posx_2 = this.assetMgr.getAssetByName("posx_2.jpg");
        var posy_2 = this.assetMgr.getAssetByName("posy_2.jpg");
        var posz_2 = this.assetMgr.getAssetByName("posz_2.jpg");
        var negx_3 = this.assetMgr.getAssetByName("negx_3.jpg");
        var negy_3 = this.assetMgr.getAssetByName("negy_3.jpg");
        var negz_3 = this.assetMgr.getAssetByName("negz_3.jpg");
        var posx_3 = this.assetMgr.getAssetByName("posx_3.jpg");
        var posy_3 = this.assetMgr.getAssetByName("posy_3.jpg");
        var posz_3 = this.assetMgr.getAssetByName("posz_3.jpg");
        var negx_4 = this.assetMgr.getAssetByName("negx_4.jpg");
        var negy_4 = this.assetMgr.getAssetByName("negy_4.jpg");
        var negz_4 = this.assetMgr.getAssetByName("negz_4.jpg");
        var posx_4 = this.assetMgr.getAssetByName("posx_4.jpg");
        var posy_4 = this.assetMgr.getAssetByName("posy_4.jpg");
        var posz_4 = this.assetMgr.getAssetByName("posz_4.jpg");
        var negx_5 = this.assetMgr.getAssetByName("negx_5.jpg");
        var negy_5 = this.assetMgr.getAssetByName("negy_5.jpg");
        var negz_5 = this.assetMgr.getAssetByName("negz_5.jpg");
        var posx_5 = this.assetMgr.getAssetByName("posx_5.jpg");
        var posy_5 = this.assetMgr.getAssetByName("posy_5.jpg");
        var posz_5 = this.assetMgr.getAssetByName("posz_5.jpg");
        var skytex = new gd3d.framework.texture("skyCubeTex");
        skytex.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex.use();
        skytex.glTexture.uploadImages(negx, negy, negz, posx, posy, posz);
        var skytex1 = new gd3d.framework.texture("skyCubeTex");
        skytex1.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex1.use();
        skytex1.glTexture.uploadImages(negx_1, negy_1, negz_1, posx_1, posy_1, posz_1);
        var skytex2 = new gd3d.framework.texture("skyCubeTex");
        skytex2.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex2.use();
        skytex2.glTexture.uploadImages(negx_2, negy_2, negz_2, posx_2, posy_2, posz_2);
        var skytex3 = new gd3d.framework.texture("skyCubeTex");
        skytex3.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex3.use();
        skytex3.glTexture.uploadImages(negx_3, negy_3, negz_3, posx_3, posy_3, posz_3);
        var skytex4 = new gd3d.framework.texture("skyCubeTex");
        skytex4.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex4.use();
        skytex4.glTexture.uploadImages(negx_4, negy_4, negz_4, posx_4, posy_4, posz_4);
        for (var m = 1; m > 0; m -= 0.1) {
            for (var r = 1; r > 0; r -= 0.1) {
                this.addSphere(m * 60, 0, r * 60, skytex, skytex1, skytex2, skytex3, skytex4, skytex4, new gd3d.math.vector4(0.5, 0.5, 0.5, 1.0), m, r);
            }
        }
        var cubesky = new gd3d.framework.transform();
        cubesky.localScale.x = cubesky.localScale.y = cubesky.localScale.z = 200;
        this.scene.addChild(cubesky);
        var mf_c = cubesky.gameObject.addComponent("meshFilter");
        mf_c.mesh = this.assetMgr.getDefaultMesh("cube");
        var mr_c = cubesky.gameObject.addComponent("meshRenderer");
        mr_c.materials[0] = new gd3d.framework.material("cubeskymat");
        mr_c.materials[0].setShader(this.assetMgr.getAssetByName("skybox.shader.json"));
        mr_c.materials[0].setCubeTexture("u_sky", skytex);
        state.finish = true;
    };
    test_pbr_scene.prototype.loadpbrRes = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.loadpbrRes1 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.loadpbrRes2 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_2.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.loadpbrRes3 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_3.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.loadpbrRes4 = function (lastState, state) {
        var _this = this;
        this.assetMgr.load(this.iblPath + "negx_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.assetMgr.load(_this.iblPath + "negy_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.assetMgr.load(_this.iblPath + "negz_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.assetMgr.load(_this.iblPath + "posx_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.assetMgr.load(_this.iblPath + "posy_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.assetMgr.load(_this.iblPath + "posz_4.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
            if (s1.isfinish) {
                _this.assetMgr.load(_this.PBRPath + "brdf.png", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                    if (s2.isfinish) {
                        _this.assetMgr.load(_this.material + "basecolor.png", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                            if (s3.isfinish) {
                                _this.assetMgr.load(_this.material + "normal.png", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                    if (s4.isfinish) {
                                        _this.assetMgr.load(_this.material + "metallicRoughness.png", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                            if (s5.isfinish) {
                                                _this.assetMgr.load(_this.material + "AO.png", gd3d.framework.AssetTypeEnum.Auto, function (s6) {
                                                    if (s6.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_pbr_scene.prototype.update = function (delta) {
        this.timer += delta;
        this.taskmgr.move(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        this.lightPos2.x += x;
        this.lightPos2.z += z;
    };
    return test_pbr_scene;
}());
var demo;
(function (demo) {
    var test_performance = (function () {
        function test_performance() {
            this.cubes = [];
            this.count = 500;
            this.all = 0;
        }
        test_performance.prototype.start = function (app) {
            this.app = app;
            this.scene = app.getScene();
            this.assetMgr = this.app.getAssetMgr();
        };
        test_performance.prototype.tryadd = function () {
            var max = 2000;
            var maxcc = 0;
            var cc = 0;
            var temp;
            while (maxcc < max) {
                var tran = new gd3d.framework.transform();
                if (!temp) {
                    temp = tran;
                    this.scene.addChild(tran);
                }
                else {
                    temp.addChild(tran);
                    cc++;
                    if (cc >= 10) {
                        cc = 0;
                        temp = null;
                    }
                }
                this.cubes.push(tran);
                maxcc++;
            }
            this.all += max;
        };
        test_performance.prototype.update = function (delta) {
            if (this.count * this.count > this.all) {
                this.tryadd();
            }
            else {
                console.error(" \u6240\u6709 trans \u52A0\u8F09\u5B8C\u7562  old  ");
            }
            var c = 0;
            while (c < 1000) {
                this.randome();
                c++;
            }
        };
        test_performance.prototype.randome = function () {
            var idx = Math.floor(Math.random() * this.cubes.length);
            var cube = this.cubes[idx];
            cube.localTranslate.x += Math.random() * 10;
            cube.localScale.x = cube.localScale.y;
            cube.localRotate.z = cube.localRotate.x;
            var temp = cube.getWorldTranslate();
            temp.y += Math.random() * 10;
            cube.getWorldScale();
            cube.setWorldPosition(temp);
            cube.localEulerAngles.x = Math.random() * 10;
            cube.localEulerAngles = cube.localEulerAngles;
            cube.getWorldRotate();
            cube.markDirty();
        };
        return test_performance;
    }());
    demo.test_performance = test_performance;
})(demo || (demo = {}));
var test_pick_boxcollider = (function () {
    function test_pick_boxcollider() {
        this.cubesize = 0.5;
        this.sim = new RVO.Simulator(1, 40, 10, 20, 5, 0.5, 0.05, [0, 0]);
        this.goals = [];
        this.mods = [];
        this.colorMap = {};
        this.balls = [];
        this.pickLayer = 8;
        this.points = [];
        this.timer = 0;
        this.bere = false;
        this.isAKeyDown = false;
        this.pointDown = false;
    }
    test_pick_boxcollider.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        this.app.closeFps();
        var descr = document.createElement("p");
        descr.textContent = "\u63D0\u793A: \n \u70B9\u51FB\u78B0\u649E\u6846 \u53EF\u53D1\u5C04\u5C0F\u7403\u5230\u78B0\u649E\u4F4D\u7F6E\uFF01";
        descr.style.top = 0 + "px";
        descr.style.left = 0 + "px";
        descr.style.position = "absolute";
        this.app.container.appendChild(descr);
        var names = ["MainCity_", "testnav", "city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        var name = names[1];
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.loadScene(name);
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.far = 10000;
        objCam.localTranslate = new gd3d.math.vector3(0, 100, 0);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
    };
    test_pick_boxcollider.prototype.loadScene = function (assetName, isCompress) {
        var _this = this;
        if (isCompress === void 0) { isCompress = false; }
        var ShowBoxcollder = function (trans) {
            if (!trans)
                return;
            var boxc = trans.gameObject.getComponent("boxcollider");
            if (boxc)
                boxc.colliderVisible = true;
            var meshC = trans.gameObject.getComponent("meshcollider");
            if (meshC) {
                meshC.colliderVisible = true;
            }
            console.error(" layer : " + trans.gameObject.layer + " ");
            if (!trans.children)
                return;
            trans.children.forEach(function (sub) {
                if (sub)
                    ShowBoxcollder(sub);
            });
        };
        var addScene = function () {
            var beAddScene = true;
            if (beAddScene) {
                var _scene = _this.app.getAssetMgr().getAssetByName(assetName + ".scene.json");
                var _root = _scene.getSceneRoot();
                _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
                _root.markDirty();
                _this.app.getScene().lightmaps = [];
                _scene.useLightMap(_this.app.getScene());
                _this.scene.addChild(_root);
                ShowBoxcollder(_root);
            }
        };
        if (isCompress) {
            this.app.getAssetMgr().loadCompressBundle("res/scenes/" + assetName + "/" + assetName + ".packs.txt", function (s) {
                if (s.isfinish) {
                    {
                        addScene();
                    }
                }
            });
        }
        else {
            this.app.getAssetMgr().load("res/scenes/" + assetName + "/" + assetName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                if (s1.isfinish) {
                    addScene();
                }
            });
        }
    };
    test_pick_boxcollider.prototype.getColor = function (r, g, b) {
        var key = r + "_" + g + "_" + b;
        if (!this.colorMap[key])
            this.colorMap[key] = new gd3d.math.vector4(r, g, b, 1);
        return this.colorMap[key];
    };
    test_pick_boxcollider.prototype.addBall = function (pos) {
        var ball = this.generateGeomtry("sphere", this.getColor(1, 0, 0));
        gd3d.math.vec3Clone(pos, ball.localTranslate);
        this.scene.addChild(ball);
        this.balls.push(ball);
        ball.markDirty();
    };
    test_pick_boxcollider.prototype.pickDown = function () {
        var v3 = this.rayCollider();
        if (v3) {
            this.addBall(v3.hitposition);
        }
    };
    test_pick_boxcollider.prototype.rayCollider = function () {
        var inputMgr = this.app.getInputMgr();
        var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        var temp = gd3d.math.pool.new_pickInfo();
        var bool = this.scene.pick(ray, temp, false);
        return bool ? temp : null;
    };
    test_pick_boxcollider.prototype.generateGeomtry = function (meshType, color) {
        if (meshType === void 0) { meshType = "cube"; }
        if (color === void 0) { color = null; }
        var G3D = new gd3d.framework.transform;
        var mf = G3D.gameObject.addComponent("meshFilter");
        mf.mesh = this.assetMgr.getDefaultMesh(meshType);
        var mr = G3D.gameObject.addComponent("meshRenderer");
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material("mat");
        mr.materials[0].setShader(this.assetMgr.getShader("diffuse.shader.json"));
        mr.materials[0].setTexture("_MainTex", this.assetMgr.getDefaultTexture("white"));
        if (color)
            mr.materials[0].setVector4("_MainColor", color);
        this.scene.addChild(G3D);
        return G3D;
    };
    test_pick_boxcollider.prototype.update = function (delta) {
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            this.pickDown();
        }
        this.pointDown = this.inputMgr.point.touch;
        if (this.inputMgr.GetKeyDown(65)) {
            this.isAKeyDown = true;
        }
        else {
            this.isAKeyDown = false;
        }
        this.timer += delta;
        CameraController.instance().update(delta);
    };
    return test_pick_boxcollider;
}());
var test_postCamera = (function () {
    function test_postCamera() {
        this.timer = 0;
    }
    test_postCamera.prototype.start = function (app) {
        var _this = this;
        console.log("i see you are a dog!");
        this.app = app;
        this.scene = this.app.getScene();
        var name = "yongzhedalu_02_1024";
        var isloaded = false;
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/scenes/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        isloaded = true;
                        console.error(s.isfinish);
                        var _scene = _this.app.getAssetMgr().getAssetByName(name + ".scene.json");
                        var _root = _scene.getSceneRoot();
                        _this.scene.addChild(_root);
                        _root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
                        _root.markDirty();
                        _this.app.getScene().lightmaps = [];
                        _scene.useLightMap(_this.app.getScene());
                        _scene.useFog(_this.app.getScene());
                    }
                });
                _this.addCamera();
            }
        });
    };
    test_postCamera.prototype.update = function (delta) {
        this.timer += delta;
        CameraController.instance().update(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        if (this.camera) {
            var objCam = this.camera.gameObject.transform;
            objCam.markDirty();
        }
    };
    test_postCamera.prototype.addCamera = function () {
        this.camTran = new gd3d.framework.transform();
        this.camTran.name = "Camera";
        this.scene.addChild(this.camTran);
        this.camera = this.camTran.gameObject.addComponent("camera");
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.fov = 1.047;
        this.camTran.localTranslate = new gd3d.math.vector3(105, 53, 57);
        this.camTran.localEulerAngles = new gd3d.math.vector3(8, -46.5, 0);
        this.camTran.lookatPoint(new gd3d.math.vector3(105, 53, 70));
        this.camTran.markDirty();
        this.camera.postQueues = [];
        this.postColor = new gd3d.framework.cameraPostQueue_Color();
        this.postColor.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
        this.camera.postQueues.push(this.postColor);
        this.depthColor = new gd3d.framework.cameraPostQueue_Depth();
        this.depthColor.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
        this.camera.postQueues.push(this.depthColor);
        var textcolor = new gd3d.framework.texture("_color");
        textcolor.glTexture = this.postColor.renderTarget;
        var depthcolor = new gd3d.framework.texture("_depthcolor");
        depthcolor.glTexture = this.depthColor.renderTarget;
        var texsize = 512;
        var post = new gd3d.framework.cameraPostQueue_Quad();
        post.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, texsize, texsize, true, false);
        post.material.setShader(this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
        post.material.setTexture("_MainTex", textcolor);
        post.material.setVector4("sample_offsets", new gd3d.math.vector4(0, 1.0, 0, -1.0));
        post.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
        this.camera.postQueues.push(post);
        var texBlur0 = new gd3d.framework.texture("_blur0");
        texBlur0.glTexture = post.renderTarget;
        var post1 = new gd3d.framework.cameraPostQueue_Quad();
        post1.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, texsize, texsize, true, false);
        post1.material.setShader(this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
        post1.material.setTexture("_MainTex", texBlur0);
        post1.material.setVector4("sample_offsets", new gd3d.math.vector4(1.0, 0, -1.0, 0));
        post1.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
        this.camera.postQueues.push(post1);
        var texBlur = new gd3d.framework.texture("_blur");
        texBlur.glTexture = post1.renderTarget;
        this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
        this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("dof.shader.json"));
        this.postQuad.material.setTexture("_MainTex", textcolor);
        this.postQuad.material.setTexture("_BlurTex", texBlur);
        this.postQuad.material.setTexture("_DepthTex", depthcolor);
        var focalDistance = 0.985;
        this.postQuad.material.setFloat("_focalDistance", focalDistance);
        this.camera.postQueues.push(this.postQuad);
        CameraController.instance().init(this.app, this.camera);
    };
    return test_postCamera;
}());
var test_softCut = (function () {
    function test_softCut() {
        this.taskmgr = new gd3d.framework.taskMgr();
    }
    test_softCut.prototype.start = function (app) {
        test_softCut.temp = this;
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10;
        this.rooto2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(this.rooto2d);
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));
    };
    test_softCut.prototype.createUI = function (astState, state) {
        var Temptex = this.assetMgr.getAssetByName("cutbg.png");
        var atlasComp = this.assetMgr.getAssetByName("comp.atlas.json");
        var over_t2 = new gd3d.framework.transform2D;
        over_t2.width = 100;
        over_t2.height = 60;
        over_t2.pivot.x = 0;
        over_t2.pivot.y = 0;
        over_t2.localTranslate.x = 120;
        over_t2.localTranslate.y = 100;
        this.rooto2d.addChild(over_t2);
        var over_i2 = over_t2.addComponent("image2D");
        over_i2.sprite = atlasComp.sprites["bg"];
        over_i2.imageType = gd3d.framework.ImageType.Sliced;
        over_i2.sprite.border = new gd3d.math.border(10, 50, 10, 10);
        var cut_t = new gd3d.framework.transform2D;
        cut_t.width = 200;
        cut_t.height = this.rooto2d.canvas.pixelHeight / 2;
        cut_t.pivot.x = 0;
        cut_t.pivot.y = 0;
        cut_t.localTranslate.x = 100;
        cut_t.localTranslate.y = 50;
        this.rooto2d.addChild(cut_t);
        cut_t.isMask = true;
        var bg_t = new gd3d.framework.transform2D;
        bg_t.width = this.rooto2d.canvas.pixelWidth / 2;
        bg_t.height = this.rooto2d.canvas.pixelHeight / 2;
        bg_t.pivot.x = 0;
        bg_t.pivot.y = 0;
        bg_t.localTranslate.x = -50;
        bg_t.localTranslate.y = 0;
        bg_t.localRotate = 25 * Math.PI / 180;
        cut_t.addChild(bg_t);
        var bg_i = bg_t.addComponent("image2D");
        bg_i.sprite = atlasComp.sprites["bg"];
        bg_i.imageType = gd3d.framework.ImageType.Sliced;
        bg_i.sprite.border = new gd3d.math.border(10, 50, 10, 10);
        var btn_t = new gd3d.framework.transform2D;
        btn_t.name = "btnt";
        btn_t.width = 100;
        btn_t.height = 36;
        btn_t.pivot.x = 0;
        btn_t.pivot.y = 0;
        btn_t.localTranslate.x = 30;
        btn_t.localTranslate.y = 70;
        bg_t.addChild(btn_t);
        var btn_b = btn_t.addComponent("button");
        btn_b.targetImage = btn_t.addComponent("image2D");
        btn_b.targetImage.sprite = atlasComp.sprites["ui_public_button_hits"];
        btn_b.pressedGraphic = atlasComp.sprites["ui_public_button_1"];
        btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
        btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;
        btn_t.visible = true;
        var subc_t = new gd3d.framework.transform2D;
        subc_t.width = 60;
        subc_t.height = 50;
        subc_t.pivot.x = 0;
        subc_t.pivot.y = 0;
        subc_t.localTranslate.x = 170;
        subc_t.localTranslate.y = 200;
        this.rooto2d.addChild(subc_t);
        subc_t.isMask = true;
        var over_t = new gd3d.framework.transform2D;
        over_t.width = 100;
        over_t.height = 60;
        over_t.pivot.x = 0;
        over_t.pivot.y = 0;
        subc_t.addChild(over_t);
        over_t.localTranslate.x = -20;
        var over_i = over_t.addComponent("image2D");
        over_i.sprite = atlasComp.sprites["bg"];
        over_i.imageType = gd3d.framework.ImageType.Sliced;
        over_i.sprite.border = new gd3d.math.border(10, 50, 10, 10);
        var raw_t = new gd3d.framework.transform2D;
        raw_t.width = 130;
        raw_t.height = 130;
        raw_t.pivot.x = 0;
        raw_t.pivot.y = 0;
        subc_t.addChild(raw_t);
        var raw_i = raw_t.addComponent("rawImage2D");
        raw_i.image = Temptex;
        var lab_t = new gd3d.framework.transform2D;
        lab_t.width = 120;
        lab_t.height = 24;
        lab_t.localTranslate.x = 10;
        lab_t.localTranslate.y = 30;
        this.rooto2d.addChild(lab_t);
        var lab_l = lab_t.addComponent("label");
        lab_l.font = this.assetMgr.getAssetByName("STXINGKA.font.json");
        lab_l.fontsize = 24;
        lab_l.text = "我是段文本";
        lab_l.color = new gd3d.math.color(0.2, 0.2, 0.2, 1);
        var lab_t2 = new gd3d.framework.transform2D;
        lab_t2.width = 200;
        lab_t2.height = 24;
        raw_t.addChild(lab_t2);
        var lab_l2 = lab_t2.addComponent("label");
        lab_l2.font = this.assetMgr.getAssetByName("STXINGKA.font.json");
        lab_l2.fontsize = 30;
        lab_l2.text = "我是段文本2";
        lab_l2.color = new gd3d.math.color(0.9, 0.1, 0.2, 1);
        var scroll_t = new gd3d.framework.transform2D;
        scroll_t.width = 200;
        scroll_t.height = 200;
        this.rooto2d.addChild(scroll_t);
        scroll_t.localTranslate.x = 260;
        scroll_t.localTranslate.y = 100;
        var scroll_ = scroll_t.addComponent("scrollRect");
        var ct = new gd3d.framework.transform2D;
        ct.width = 350;
        ct.height = 450;
        scroll_.content = ct;
        scroll_t.isMask = true;
        scroll_.horizontal = true;
        scroll_.vertical = true;
        var raw_t2 = new gd3d.framework.transform2D;
        raw_t2.width = 300;
        raw_t2.height = 400;
        var raw_i2 = raw_t2.addComponent("rawImage2D");
        raw_i2.image = Temptex;
        ct.addChild(raw_t2);
        var scroll_t1 = new gd3d.framework.transform2D;
        scroll_t1.width = 200;
        scroll_t1.height = 200;
        ct.addChild(scroll_t1);
        scroll_t1.localTranslate.x = -50;
        scroll_t1.localTranslate.y = 100;
        var scroll_1 = scroll_t1.addComponent("scrollRect");
        var ct1 = new gd3d.framework.transform2D;
        ct1.width = 350;
        ct1.height = 450;
        scroll_1.content = ct1;
        scroll_t1.isMask = true;
        scroll_1.horizontal = true;
        scroll_1.vertical = true;
        var raw_t3 = new gd3d.framework.transform2D;
        raw_t3.width = 300;
        raw_t3.height = 400;
        var raw_i3 = raw_t3.addComponent("rawImage2D");
        raw_i3.image = Temptex;
        ct1.addChild(raw_t3);
        var Preader = new gd3d.render.textureReader(this.app.webgl, Temptex.glTexture.texture, Temptex.glTexture.width, Temptex.glTexture.height, false);
        var inputMgr = this.app.getInputMgr();
        this.app.webgl.canvas.addEventListener("keydown", function (ev) {
            if (ev.keyCode == 81) {
                console.error("getpixle: " + Preader.getPixel(1, 0.5));
            }
        }, false);
        state.finish = true;
    };
    test_softCut.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    if (s.isfinish) {
                                        _this.assetMgr.load("res/cutbg.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                            if (s.isfinish) {
                                                state.finish = true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_softCut.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return test_softCut;
}());
var test_sssss = (function () {
    function test_sssss() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.timer = 0;
    }
    test_sssss.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        this.taskmgr.addTaskCall(this.loadpbrRes.bind(this));
        this.taskmgr.addTaskCall(this.loadIBL.bind(this));
        this.taskmgr.addTaskCall(this.init.bind(this));
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10000;
        this.camera.backgroundColor = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);
        var hoverc = this.camera.gameObject.addComponent("HoverCameraScript");
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0);
    };
    test_sssss.prototype.init = function () {
        var _this = this;
        var names = ["elongmul", "0060_duyanshou", "Cube", "0001_fashion", "193_meirenyu"];
        var name = names[0];
        this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                name = "Head";
                _this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                        _this.baihu = _prefab.getCloneTrans();
                        _this.scene.addChild(_this.baihu);
                        _this.baihu.localTranslate = new gd3d.math.vector3(0, 0, 0);
                        _this.baihu.localEulerAngles = new gd3d.math.vector3(0, 180, 0);
                        var objCam = _this.camera.gameObject.transform;
                        objCam.localTranslate = new gd3d.math.vector3(0, 0, -2);
                        objCam.lookat(_this.baihu);
                        objCam.markDirty();
                        var assetMgr = _this.app.getAssetMgr();
                        var negx_1 = _this.app.getAssetMgr().getAssetByName("negx_1.jpg");
                        var negy_1 = _this.app.getAssetMgr().getAssetByName("negy_1.jpg");
                        var negz_1 = _this.app.getAssetMgr().getAssetByName("negz_1.jpg");
                        var posx_1 = _this.app.getAssetMgr().getAssetByName("posx_1.jpg");
                        var posy_1 = _this.app.getAssetMgr().getAssetByName("posy_1.jpg");
                        var posz_1 = _this.app.getAssetMgr().getAssetByName("posz_1.jpg");
                        var skytex1 = new gd3d.framework.texture("skyCubeTex");
                        skytex1.glTexture = new gd3d.render.glTextureCube(_this.app.webgl);
                        skytex1.use();
                        skytex1.glTexture.uploadImages(negx_1, negy_1, negz_1, posx_1, posy_1, posz_1);
                        _this.baihu.localTranslate.y = -4;
                        _this.baihu.localScale.x = 10;
                        _this.baihu.localScale.y = 10;
                        _this.baihu.localScale.z = 10;
                        _this.baihu.markDirty();
                        var mr = _this.baihu.gameObject.getComponent("meshRenderer");
                        mr.materials[0] = new gd3d.framework.material("testmat");
                        mr.materials[0].setShader(assetMgr.getAssetByName("pbr_sss.shader.json"));
                        var brdfimg = assetMgr.getAssetByName("brdf.png");
                        var temp2d = brdfimg.glTexture;
                        temp2d.getReader();
                        temp2d.uploadByteArray(true, false, temp2d.width, temp2d.height, temp2d.reader.data, true);
                        mr.materials[0].setTexture("brdf", assetMgr.getAssetByName("brdf.png"));
                        mr.materials[0].setTexture("uv_Basecolor", assetMgr.getAssetByName("albedo.jpg"));
                        mr.materials[0].setTexture("uv_Thickness", assetMgr.getAssetByName("thickness.png"));
                        mr.materials[0].setTexture("uv_Normal", assetMgr.getAssetByName("normals.png"));
                        mr.materials[0].setCubeTexture("u_sky", skytex1);
                        mr.materials[0].setFloat("CustomMetallic", 0.3);
                        mr.materials[0].setFloat("CustomRoughness", 0.8);
                        var blur_options = [
                            new gd3d.math.vector4(0.22, 0.437, 0.635, 0.042),
                            new gd3d.math.vector4(0.101, 0.355, 0.365, 0.220),
                            new gd3d.math.vector4(0.119, 0.208, 0.0, 0.433),
                            new gd3d.math.vector4(0.114, 0.0, 0.0, 0.753),
                            new gd3d.math.vector4(0.364, 0.0, 0.0, 1.412),
                            new gd3d.math.vector4(0.080, 0.0, 0.0, 2.722)
                        ];
                        var sh = _this.scene.app.getAssetMgr().getShader("sssss.shader.json");
                        if (!sh) {
                            console.warn("sssss.shader.json not find");
                            return;
                        }
                        var psize = 2048;
                        var color = new gd3d.framework.cameraPostQueue_Color();
                        color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        if (!_this.camera.postQueues)
                            _this.camera.postQueues = [];
                        _this.camera.postQueues.push(color);
                        var depth = new gd3d.framework.cameraPostQueue_Depth();
                        depth.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                        _this.camera.postQueues.push(depth);
                        var text = new gd3d.framework.texture("_depth");
                        text.glTexture = depth.renderTarget;
                        var textcolor = new gd3d.framework.texture("_color");
                        textcolor.glTexture = color.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[0]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[0]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[1]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[1]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[2]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[2]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[3]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[3]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[4]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[4]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, psize, psize, true, false);
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[5]);
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[5]);
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1 / psize, 1 / psize, psize, psize));
                        _this.camera.postQueues.push(post0);
                    }
                });
            }
        });
    };
    test_sssss.prototype.loadpbrRes = function (lastState, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "albedo.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "normals.png", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.app.getAssetMgr().load("res/pbrRes/" + "brdf.png", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "thickness.png", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        state.finish = true;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_sssss.prototype.loadIBL = function (lastState, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        _this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                _this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posx_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s3) {
                                    if (s3.isfinish) {
                                        _this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posy_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s4) {
                                            if (s4.isfinish) {
                                                _this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posz_1.jpg", gd3d.framework.AssetTypeEnum.Auto, function (s5) {
                                                    if (s5.isfinish) {
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    test_sssss.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return test_sssss;
}());
var ShockType;
(function (ShockType) {
    ShockType[ShockType["Vertical"] = 0] = "Vertical";
    ShockType[ShockType["Horizontal"] = 1] = "Horizontal";
    ShockType[ShockType["Both"] = 2] = "Both";
})(ShockType || (ShockType = {}));
var CameraShock = (function () {
    function CameraShock() {
    }
    CameraShock.prototype.start = function () {
        this.isPlaying = false;
    };
    CameraShock.prototype.onPlay = function () {
    };
    CameraShock.prototype.play = function (strength, life, fade, shockType) {
        if (strength === void 0) { strength = 0.2; }
        if (life === void 0) { life = 0.5; }
        if (fade === void 0) { fade = false; }
        if (shockType === void 0) { shockType = ShockType.Both; }
        if (this.oldTranslate == null)
            this.oldTranslate = new gd3d.math.vector3();
        gd3d.math.vec3Clone(this.gameObject.transform.localTranslate, this.oldTranslate);
        this.isPlaying = true;
        this.strength = strength;
        this.ticker = this.life = life;
        this.fade = fade;
        this.shockType = shockType;
    };
    CameraShock.prototype.update = function (delta) {
        if (this.isPlaying) {
            if (this.ticker > 0) {
                this.ticker -= delta;
                var s = this.fade ? this.strength * (this.ticker / this.life) : this.strength;
                if (this.shockType == ShockType.Horizontal || this.shockType == ShockType.Both)
                    this.gameObject.transform.localTranslate.x = this.oldTranslate.x + (Math.random() - 0.5) * s;
                if (this.shockType == ShockType.Vertical || this.shockType == ShockType.Both)
                    this.gameObject.transform.localTranslate.y = this.oldTranslate.y + (Math.random() - 0.5) * s;
                this.gameObject.transform.markDirty();
            }
            else {
                this.gameObject.transform.localTranslate.x = this.oldTranslate.x;
                this.gameObject.transform.localTranslate.y = this.oldTranslate.y;
                this.isPlaying = false;
            }
        }
    };
    CameraShock.prototype.remove = function () {
    };
    CameraShock.prototype.clone = function () {
    };
    CameraShock = __decorate([
        gd3d.reflect.nodeComponent
    ], CameraShock);
    return CameraShock;
}());
var Joystick = (function () {
    function Joystick() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.leftAxis = new gd3d.math.vector2(0, 0);
        this.rightAxis = new gd3d.math.vector2(0, 0);
        this.maxScale = 128;
        this.touchLeft = 0;
        this.touchRight = 0;
        this.mouseLeft = false;
        this.mouseRight = false;
    }
    Joystick.prototype.init = function (app, overlay2d) {
        var _this = this;
        this.app = app;
        this.overlay2d = overlay2d;
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.addJoystick.bind(this));
        document.addEventListener("mousedown", function (e) { _this.onMouseDown(e); });
        document.addEventListener("mouseup", function (e) { _this.onMouseUp(e); });
        document.addEventListener("mousemove", function (e) { _this.onMouseMove(e); });
        document.addEventListener("touchstart", function (e) { _this.onTouchStart(e); e.preventDefault(); });
        document.addEventListener("touchend", function (e) { _this.onTouchEnd(e); e.preventDefault(); });
        document.addEventListener("touchmove", function (e) { _this.onTouchMove(e); e.preventDefault(); });
    };
    Joystick.prototype.loadTexture = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/joystick0.png", gd3d.framework.AssetTypeEnum.Auto, function (s0) {
            if (s0.isfinish) {
                _this.app.getAssetMgr().load("res/joystick1.png", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                    if (s1.isfinish) {
                        state.finish = true;
                    }
                    else {
                        state.error = true;
                    }
                });
            }
            else {
                state.error = true;
            }
        });
    };
    Joystick.prototype.addJoystick = function (laststate, state) {
        {
            this.joystickLeft0 = new gd3d.framework.transform2D();
            this.joystickLeft0.name = "left0";
            this.joystickLeft0.width = 256;
            this.joystickLeft0.height = 256;
            this.joystickLeft0.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickLeft0.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.16, window.innerHeight * 0.75);
            var img0 = this.joystickLeft0.addComponent("image2D");
            img0.imageType = gd3d.framework.ImageType.Simple;
            var tex0 = this.app.getAssetMgr().getAssetByName("joystick0.png");
            img0.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickLeft0);
            this.joystickLeft0.markDirty();
            this.joystickLeft1 = new gd3d.framework.transform2D();
            this.joystickLeft1.name = "left1";
            this.joystickLeft1.width = 256;
            this.joystickLeft1.height = 256;
            this.joystickLeft1.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickLeft1.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.16, window.innerHeight * 0.75);
            var img1 = this.joystickLeft1.addComponent("image2D");
            img1.imageType = gd3d.framework.ImageType.Simple;
            var tex1 = this.app.getAssetMgr().getAssetByName("joystick1.png");
            img1.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickLeft1);
            this.joystickLeft1.markDirty();
        }
        {
            this.joystickRight0 = new gd3d.framework.transform2D();
            this.joystickRight0.name = "right0";
            this.joystickRight0.width = 256;
            this.joystickRight0.height = 256;
            this.joystickRight0.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickRight0.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.84, window.innerHeight * 0.75);
            var img0 = this.joystickRight0.addComponent("image2D");
            img0.imageType = gd3d.framework.ImageType.Simple;
            var tex0 = this.app.getAssetMgr().getAssetByName("joystick0.png");
            img0.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickRight0);
            this.joystickRight0.markDirty();
            this.joystickRight1 = new gd3d.framework.transform2D();
            this.joystickRight1.name = "right1";
            this.joystickRight1.width = 256;
            this.joystickRight1.height = 256;
            this.joystickRight1.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickRight1.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.84, window.innerHeight * 0.75);
            var img1 = this.joystickRight1.addComponent("image2D");
            img1.imageType = gd3d.framework.ImageType.Simple;
            var tex1 = this.app.getAssetMgr().getAssetByName("joystick1.png");
            img1.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickRight1);
            this.joystickRight1.markDirty();
        }
        state.finish = true;
    };
    Object.defineProperty(Joystick.prototype, "leftTouching", {
        get: function () {
            return this.touchLeft != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Joystick.prototype, "rightTouching", {
        get: function () {
            return this.touchRight != 0;
        },
        enumerable: true,
        configurable: true
    });
    Joystick.prototype.onMouseDown = function (e) {
        if (e.clientX <= this.overlay2d.canvas.pixelWidth / 2) {
            this.mouseLeft = true;
            var v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else {
                this.joystickLeft1.localTranslate.x = e.clientX;
                this.joystickLeft1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else {
            this.mouseRight = true;
            var v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else {
                this.joystickRight1.localTranslate.x = e.clientX;
                this.joystickRight1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    };
    Joystick.prototype.onMouseUp = function (e) {
        if (this.mouseRight) {
            if (this.triggerFunc != null) {
                this.triggerFunc();
            }
        }
        this.mouseLeft = false;
        this.joystickLeft1.localTranslate.x = this.joystickLeft0.localTranslate.x;
        this.joystickLeft1.localTranslate.y = this.joystickLeft0.localTranslate.y;
        this.leftAxis = new gd3d.math.vector2(0, 0);
        this.joystickLeft1.markDirty();
        this.mouseRight = false;
        this.joystickRight1.localTranslate.x = this.joystickRight0.localTranslate.x;
        this.joystickRight1.localTranslate.y = this.joystickRight0.localTranslate.y;
        this.rightAxis = new gd3d.math.vector2(0, 0);
        this.joystickRight1.markDirty();
    };
    Joystick.prototype.onMouseMove = function (e) {
        if (this.mouseLeft) {
            var v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else {
                this.joystickLeft1.localTranslate.x = e.clientX;
                this.joystickLeft1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        if (this.mouseRight) {
            var v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else {
                this.joystickRight1.localTranslate.x = e.clientX;
                this.joystickRight1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    };
    Joystick.prototype.onTouchStart = function (e) {
        if (e.touches[0].clientX <= this.overlay2d.canvas.pixelWidth / 2) {
            this.touchLeft = e.touches[0].identifier;
            var v = new gd3d.math.vector2(e.touches[0].clientX, e.touches[0].clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else {
                this.joystickLeft1.localTranslate.x = e.touches[0].clientX;
                this.joystickLeft1.localTranslate.y = e.touches[0].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else {
            this.touchRight = e.touches[0].identifier;
            var v = new gd3d.math.vector2(e.touches[0].clientX, e.touches[0].clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else {
                this.joystickRight1.localTranslate.x = e.touches[0].clientX;
                this.joystickRight1.localTranslate.y = e.touches[0].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
        if (e.touches[1] != null && e.touches[1].clientX <= this.overlay2d.canvas.pixelWidth / 2 && this.touchLeft == 0) {
            this.touchLeft = e.touches[1].identifier;
            var v = new gd3d.math.vector2(e.touches[1].clientX, e.touches[1].clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else {
                this.joystickLeft1.localTranslate.x = e.touches[1].clientX;
                this.joystickLeft1.localTranslate.y = e.touches[1].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else if (e.touches[1] != null && e.touches[1].clientX > this.overlay2d.canvas.pixelWidth / 2 && this.touchRight == 0) {
            this.touchRight = e.touches[1].identifier;
            var v = new gd3d.math.vector2(e.touches[1].clientX, e.touches[1].clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale) {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else {
                this.joystickRight1.localTranslate.x = e.touches[1].clientX;
                this.joystickRight1.localTranslate.y = e.touches[1].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    };
    Joystick.prototype.onTouchEnd = function (e) {
        if (this.touchLeft) {
            var flag = false;
            for (var i = 0; i < e.touches.length; i++) {
                if (this.touchLeft == e.touches[i].identifier) {
                    flag = true;
                }
            }
            if (!flag) {
                this.touchLeft = 0;
                this.joystickLeft1.localTranslate.x = this.joystickLeft0.localTranslate.x;
                this.joystickLeft1.localTranslate.y = this.joystickLeft0.localTranslate.y;
                this.leftAxis.x = 0;
                this.leftAxis.y = 0;
                this.joystickLeft1.markDirty();
            }
        }
        if (this.touchRight) {
            var flag = false;
            for (var i = 0; i < e.touches.length; i++) {
                if (this.touchRight == e.touches[i].identifier) {
                    flag = true;
                }
            }
            if (!flag) {
                this.touchRight = 0;
                this.joystickRight1.localTranslate.x = this.joystickRight0.localTranslate.x;
                this.joystickRight1.localTranslate.y = this.joystickRight0.localTranslate.y;
                this.rightAxis.x = 0;
                this.rightAxis.y = 0;
                this.joystickRight1.markDirty();
                if (this.triggerFunc != null) {
                    this.triggerFunc();
                }
            }
        }
    };
    Joystick.prototype.onTouchMove = function (e) {
        if (this.touchLeft != 0) {
            var index = -1;
            if (this.touchLeft == e.touches[0].identifier) {
                index = 0;
            }
            else if (e.touches[1] != null && this.touchLeft == e.touches[1].identifier) {
                index = 1;
            }
            if (index != -1) {
                var v = new gd3d.math.vector2(e.touches[index].clientX, e.touches[index].clientY);
                gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
                if (gd3d.math.vec2Length(v) > this.maxScale) {
                    gd3d.math.vec2Normalize(v, v);
                    gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                    gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
                }
                else {
                    this.joystickLeft1.localTranslate.x = e.touches[index].clientX;
                    this.joystickLeft1.localTranslate.y = e.touches[index].clientY;
                }
                gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
                this.joystickLeft1.markDirty();
            }
        }
        if (this.touchRight != 0) {
            var index = -1;
            if (this.touchRight == e.touches[0].identifier) {
                index = 0;
            }
            else if (e.touches[1] != null && this.touchRight == e.touches[1].identifier) {
                index = 1;
            }
            if (index != -1) {
                var v = new gd3d.math.vector2(e.touches[index].clientX, e.touches[index].clientY);
                gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
                if (gd3d.math.vec2Length(v) > this.maxScale) {
                    gd3d.math.vec2Normalize(v, v);
                    gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                    gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
                }
                else {
                    this.joystickRight1.localTranslate.x = e.touches[index].clientX;
                    this.joystickRight1.localTranslate.y = e.touches[index].clientY;
                }
                gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
                this.joystickRight1.markDirty();
            }
        }
    };
    Joystick.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return Joystick;
}());
var demo;
(function (demo) {
    var TankGame = (function () {
        function TankGame() {
            this.cubes = [];
            this.walls = [];
            this.taskmgr = new gd3d.framework.taskMgr();
            this.tankMoveSpeed = 4;
            this.tankRotateSpeed = new gd3d.math.vector3(0, 72, 0);
            this.gunRotateSpeed = new gd3d.math.vector3(0, 150, 0);
            this.angleLimit = 5;
            this.colVisible = false;
            this.keyMap = {};
            this.bulletId = 0;
            this.bulletList = [];
            this.bulletSpeed = 30;
            this.fireStep = 0.5;
            this.fireTick = 0;
        }
        TankGame.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
            });
        };
        TankGame.prototype.loadTexture = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
            });
        };
        TankGame.prototype.loadHeroPrefab = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/tank01/tank01.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("tank01.prefab.json");
                    _this.heroTank = _prefab.getCloneTrans();
                    _this.scene.addChild(_this.heroTank);
                    _this.heroTank.localScale = new gd3d.math.vector3(4, 4, 4);
                    _this.heroTank.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    var col = _this.heroTank.gameObject.addComponent("boxcollider");
                    col.center = new gd3d.math.vector3(0, 0.2, 0);
                    col.size = new gd3d.math.vector3(0.46, 0.4, 0.54);
                    col.colliderVisible = _this.colVisible;
                    _this.heroGun = _this.heroTank.find("tank_up");
                    _this.heroSlot = _this.heroGun.find("slot");
                    state.finish = true;
                }
            });
        };
        TankGame.prototype.loadEnemyPrefab = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/tank02/tank02.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("tank02.prefab.json");
                    _this.enemyTank = _prefab.getCloneTrans();
                    _this.scene.addChild(_this.enemyTank);
                    _this.enemyTank.localScale = new gd3d.math.vector3(4, 4, 4);
                    _this.enemyTank.localTranslate = new gd3d.math.vector3(0, 0, -6);
                    var col = _this.enemyTank.gameObject.addComponent("boxcollider");
                    col.center = new gd3d.math.vector3(0, 0.2, 0);
                    col.size = new gd3d.math.vector3(0.46, 0.4, 0.54);
                    col.colliderVisible = _this.colVisible;
                    _this.enemyGun = _this.enemyTank.find("tank_up");
                    _this.enemySlot = _this.enemyGun.find("slot");
                    state.finish = true;
                }
            });
        };
        TankGame.prototype.loadScene = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/scenes/test_scene/test_scene.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _scene = _this.app.getAssetMgr().getAssetByName("test_scene.scene.json");
                    var _root = _scene.getSceneRoot();
                    _this.scene.addChild(_root);
                    _root.localTranslate.y = -0.1;
                    for (var i = 0; i < 8; i++) {
                        var tran = _root.find("wall" + i);
                        var col = tran.gameObject.getComponent("boxcollider");
                        col.colliderVisible = _this.colVisible;
                        _this.walls.push(tran);
                    }
                    _this.app.getScene().lightmaps = [];
                    _scene.useLightMap(_this.app.getScene());
                    state.finish = true;
                }
            });
        };
        TankGame.prototype.addCameraAndLight = function (laststate, state) {
            var _this = this;
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.scene.addChild(tranCam);
            this.camera = tranCam.gameObject.addComponent("camera");
            this.camera.near = 0.1;
            this.camera.far = 200;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            this.cameraShock = tranCam.gameObject.addComponent("CameraShock");
            tranCam.localTranslate = new gd3d.math.vector3(0, 20, -16);
            tranCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranCam.markDirty();
            var list = [
                "标准",
                "马赛克",
                "径向模糊",
                "旋转扭曲",
                "桶模糊",
                "灰度图",
                "棕褐色调",
                "反色",
                "高斯滤波",
                "均值滤波",
                "锐化",
                "膨胀",
                "腐蚀",
                "HDR"
            ];
            var select = document.createElement("select");
            select.style.top = "240px";
            select.style.right = "0px";
            select.style.position = "absolute";
            this.app.container.appendChild(select);
            for (var i = 0; i < list.length; i++) {
                var op = document.createElement("option");
                op.value = i.toString();
                op.innerText = list[i];
                select.appendChild(op);
            }
            select.onchange = function () {
                _this.camera.postQueues = [];
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 2048, 2048, true, false);
                _this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;
                if (select.value == "0") {
                    _this.camera.postQueues = [];
                }
                else if (select.value == "1") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("mosaic.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "2") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("radial_blur.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_Level", 25);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "3") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("contort.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_UD", 120);
                    _this.postQuad.material.setFloat("_UR", 0.3);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "4") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("barrel_blur.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_Power", 0.3);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "5") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 1);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "6") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 2);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "7") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 3);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "8") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 4);
                    _this.postQuad.material.setFloat("_Step", 2);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "9") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 5);
                    _this.postQuad.material.setFloat("_Step", 2);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "10") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 6);
                    _this.postQuad.material.setFloat("_Step", 0.1);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "11") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 7);
                    _this.postQuad.material.setFloat("_Step", 0.3);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "12") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_FilterType", 8);
                    _this.postQuad.material.setFloat("_Step", 0.3);
                    _this.camera.postQueues.push(_this.postQuad);
                }
                else if (select.value == "13") {
                    _this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    _this.postQuad.material.setShader(_this.scene.app.getAssetMgr().getShader("hdr_quad.shader.json"));
                    _this.postQuad.material.setTexture("_MainTex", textcolor);
                    _this.postQuad.material.setFloat("_K", 1.5);
                    _this.camera.postQueues.push(_this.postQuad);
                }
            };
            var tranLight = new gd3d.framework.transform();
            tranLight.name = "light";
            this.scene.addChild(tranLight);
            this.light = tranLight.gameObject.addComponent("light");
            this.light.type = gd3d.framework.LightTypeEnum.Direction;
            tranLight.localTranslate.x = 5;
            tranLight.localTranslate.y = 5;
            tranLight.localTranslate.z = -5;
            tranLight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranLight.markDirty();
            state.finish = true;
        };
        TankGame.prototype.addJoystick = function (laststate, state) {
            var _this = this;
            this.overlay2d = new gd3d.framework.overlay2D();
            this.overlay2d.canvas.pixelWidth = window.innerWidth;
            this.overlay2d.canvas.pixelHeight = window.innerHeight;
            this.camera.addOverLay(this.overlay2d);
            this.joystick = new Joystick();
            this.joystick.init(this.app, this.overlay2d);
            this.joystick.triggerFunc = function () {
                if (_this.fireTick >= _this.fireStep) {
                    _this.fireTick = 0;
                    _this.fire();
                }
            };
            state.finish = true;
        };
        TankGame.prototype.addObject = function (laststate, state) {
            {
                var n = 2;
                for (var i = 0; i < n; i++) {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube" + i;
                    cube.localScale = new gd3d.math.vector3(3, 3, 3);
                    cube.localTranslate = new gd3d.math.vector3(-2 * (n - 1) + i * 4, 2, 16);
                    this.scene.addChild(cube);
                    var filter = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    filter.mesh = smesh;
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var shader = this.app.getAssetMgr().getShader("light1.shader.json");
                    if (shader != null) {
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(shader);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        renderer.materials[0].setTexture("_MainTex", texture);
                    }
                    var col = cube.gameObject.addComponent("boxcollider");
                    col.colliderVisible = this.colVisible;
                    cube.markDirty();
                    this.cubes.push(cube);
                }
            }
            state.finish = true;
        };
        TankGame.prototype.start = function (app) {
            var _this = this;
            this.label = document.getElementById("Label");
            this.app = app;
            this.scene = app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadTexture.bind(this));
            this.taskmgr.addTaskCall(this.loadHeroPrefab.bind(this));
            this.taskmgr.addTaskCall(this.loadEnemyPrefab.bind(this));
            this.taskmgr.addTaskCall(this.loadScene.bind(this));
            this.taskmgr.addTaskCall(this.addCameraAndLight.bind(this));
            this.taskmgr.addTaskCall(this.addObject.bind(this));
            this.taskmgr.addTaskCall(this.addJoystick.bind(this));
            document.addEventListener("keydown", function (e) { _this.keyMap[e.keyCode] = true; });
        };
        TankGame.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            if (this.joystick != null) {
                this.joystick.update(delta);
            }
            this.tankControl(delta);
            this.updateBullet(delta);
            for (var i = 0; i < this.bulletList.length; i++) {
                var col = this.bulletList[i].transform.gameObject.getComponent("boxcollider");
                for (var j = 0; j < this.cubes.length; j++) {
                    var c = this.cubes[j];
                    if (c != null && col.intersectsTransform(c)) {
                        this.scene.removeChild(c);
                        c.dispose();
                        this.bulletList[i].life = 0;
                        break;
                    }
                }
            }
            this.fireTick += delta;
        };
        TankGame.prototype.testTankCol = function (tran) {
            var col = tran.gameObject.getComponent("boxcollider");
            for (var i = 0; i < this.cubes.length; i++) {
                var c_1 = this.cubes[i].gameObject.getComponent("boxcollider");
                if (c_1 != null && col.obb.intersects(c_1.obb)) {
                    return true;
                }
            }
            for (var i = 0; i < this.walls.length; i++) {
                var c_2 = this.walls[i].gameObject.getComponent("boxcollider");
                if (col.obb.intersects(c_2.obb)) {
                    return true;
                }
            }
            var c = this.enemyTank.gameObject.getComponent("boxcollider");
            if (col.obb.intersects(c.obb)) {
                return true;
            }
            return false;
        };
        TankGame.prototype.tankControl = function (delta) {
            if (this.joystick != null) {
                var targetAngle = new gd3d.math.vector3();
                var goForward = true;
                if (gd3d.math.vec2Length(this.joystick.leftAxis) > 0.05) {
                    var point = new gd3d.math.vector3(this.joystick.leftAxis.x, 0, -this.joystick.leftAxis.y);
                    gd3d.math.vec3Add(this.heroTank.getWorldTranslate(), point, point);
                    var quat = new gd3d.math.quaternion();
                    gd3d.math.quatLookat(this.heroTank.getWorldTranslate(), point, quat);
                    gd3d.math.quatToEulerAngles(quat, targetAngle);
                    var rotateSpeed = new gd3d.math.vector3();
                    gd3d.math.vec3ScaleByNum(this.tankRotateSpeed, delta, rotateSpeed);
                    var d = Math.abs(this.heroTank.localEulerAngles.y - targetAngle.y);
                    if (d > 180) {
                        d = 360 - d;
                    }
                    if (d <= 90) {
                        goForward = true;
                    }
                    else {
                        if (targetAngle.y > 0) {
                            targetAngle.y -= 180;
                        }
                        else {
                            targetAngle.y += 180;
                        }
                        goForward = false;
                    }
                    if (d > rotateSpeed.y) {
                        var vec = new gd3d.math.vector3();
                        if (this.heroTank.localEulerAngles.y > targetAngle.y && this.heroTank.localEulerAngles.y - targetAngle.y < 180
                            || targetAngle.y > this.heroTank.localEulerAngles.y && targetAngle.y - this.heroTank.localEulerAngles.y >= 180) {
                            gd3d.math.vec3Subtract(this.heroTank.localEulerAngles, rotateSpeed, vec);
                        }
                        else {
                            gd3d.math.vec3Add(this.heroTank.localEulerAngles, rotateSpeed, vec);
                        }
                        this.heroTank.localEulerAngles = vec;
                    }
                    else {
                        this.heroTank.localEulerAngles = targetAngle;
                    }
                    this.heroTank.markDirty();
                }
                if (gd3d.math.vec2Length(this.joystick.leftAxis) > 0.05) {
                    var speed = 0;
                    if (Math.abs(this.heroTank.localEulerAngles.y - targetAngle.y) < this.angleLimit) {
                        speed = this.tankMoveSpeed * delta;
                    }
                    else {
                        speed = this.tankMoveSpeed * delta * 0.8;
                    }
                    var v = new gd3d.math.vector3();
                    this.heroTank.getForwardInWorld(v);
                    gd3d.math.vec3ScaleByNum(v, speed, v);
                    if (!goForward) {
                        gd3d.math.vec3ScaleByNum(v, -1, v);
                    }
                    var col = this.heroTank.gameObject.getComponent("boxcollider");
                    var f = false;
                    var r = false;
                    var l = false;
                    gd3d.math.vec3Add(col.obb.center, v, col.obb.center);
                    f = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v, col.obb.center);
                    var q = new gd3d.math.quaternion();
                    var v1 = new gd3d.math.vector3();
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, 45, q);
                    gd3d.math.quatTransformVector(q, v, v1);
                    gd3d.math.vec3ScaleByNum(v1, 0.5, v1);
                    gd3d.math.vec3Add(col.obb.center, v1, col.obb.center);
                    r = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v1, col.obb.center);
                    var v2 = new gd3d.math.vector3();
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, -45, q);
                    gd3d.math.quatTransformVector(q, v, v2);
                    gd3d.math.vec3ScaleByNum(v2, 0.5, v2);
                    gd3d.math.vec3Add(col.obb.center, v2, col.obb.center);
                    l = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v2, col.obb.center);
                    if (!f) {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v, this.heroTank.localTranslate);
                    }
                    else if (!r && l) {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v1, this.heroTank.localTranslate);
                    }
                    else if (r && !l) {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v2, this.heroTank.localTranslate);
                    }
                    this.heroTank.markDirty();
                }
                if (gd3d.math.vec2Length(this.joystick.rightAxis) > 0.2) {
                    var point = new gd3d.math.vector3(this.joystick.rightAxis.x, 0, -this.joystick.rightAxis.y);
                    gd3d.math.vec3Add(this.heroGun.getWorldTranslate(), point, point);
                    var quat = new gd3d.math.quaternion();
                    gd3d.math.quatLookat(this.heroGun.getWorldTranslate(), point, quat);
                    var vec = new gd3d.math.vector3();
                    gd3d.math.quatToEulerAngles(quat, vec);
                    gd3d.math.vec3Subtract(vec, this.heroTank.localEulerAngles, vec);
                    if (vec.y > 180) {
                        vec.y -= 360;
                    }
                    if (vec.y < -180) {
                        vec.y += 360;
                    }
                    var rotateSpeed = new gd3d.math.vector3();
                    gd3d.math.vec3ScaleByNum(this.gunRotateSpeed, delta, rotateSpeed);
                    if (Math.abs(this.heroGun.localEulerAngles.y - vec.y) > rotateSpeed.y) {
                        if (this.heroGun.localEulerAngles.y > vec.y && this.heroGun.localEulerAngles.y - vec.y < 180
                            || vec.y > this.heroGun.localEulerAngles.y && vec.y - this.heroGun.localEulerAngles.y >= 180) {
                            gd3d.math.vec3Subtract(this.heroGun.localEulerAngles, rotateSpeed, vec);
                        }
                        else {
                            gd3d.math.vec3Add(this.heroGun.localEulerAngles, rotateSpeed, vec);
                        }
                        this.heroGun.localEulerAngles = vec;
                    }
                    else {
                        this.heroGun.localEulerAngles = vec;
                    }
                    this.heroGun.markDirty();
                }
                if (this.camera != null) {
                    this.camera.gameObject.transform.localTranslate.x = this.heroTank.localTranslate.x;
                    this.camera.gameObject.transform.localTranslate.y = this.heroTank.localTranslate.y + 20;
                    this.camera.gameObject.transform.localTranslate.z = this.heroTank.localTranslate.z - 16;
                    this.camera.gameObject.transform.markDirty();
                }
            }
        };
        TankGame.prototype.fire = function () {
            var tran = new gd3d.framework.transform();
            tran.name = "bullet" + this.bulletId;
            tran.localScale = new gd3d.math.vector3(0.2, 0.2, 0.2);
            tran.localTranslate = this.heroSlot.getWorldTranslate();
            this.scene.addChild(tran);
            var filter = tran.gameObject.addComponent("meshFilter");
            var smesh = this.app.getAssetMgr().getDefaultMesh("sphere");
            filter.mesh = smesh;
            var renderer = tran.gameObject.addComponent("meshRenderer");
            var shader = this.app.getAssetMgr().getShader("light1.shader.json");
            if (shader != null) {
                renderer.materials = [];
                renderer.materials.push(new gd3d.framework.material());
                renderer.materials[0].setShader(shader);
                var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                renderer.materials[0].setTexture("_MainTex", texture);
            }
            var col = tran.gameObject.addComponent("boxcollider");
            col.size = new gd3d.math.vector3(0.2, 0.2, 0.2);
            col.colliderVisible = this.colVisible;
            tran.markDirty();
            var dir = new gd3d.math.vector3();
            this.heroGun.getForwardInWorld(dir);
            var bullet = {
                id: this.bulletId++,
                transform: tran,
                direction: dir,
                life: 3
            };
            this.bulletList.push(bullet);
        };
        TankGame.prototype.updateBullet = function (delta) {
            for (var i = 0; i < this.bulletList.length; i++) {
                var b = this.bulletList[i];
                var v = gd3d.math.pool.new_vector3();
                var speed = gd3d.math.pool.new_vector3();
                gd3d.math.vec3ScaleByNum(b.direction, this.bulletSpeed * delta, speed);
                gd3d.math.vec3Add(b.transform.localTranslate, speed, v);
                b.transform.localTranslate = v;
                b.transform.markDirty();
                b.life -= delta;
            }
            for (var i = 0; i < this.bulletList.length; i++) {
                var b = this.bulletList[i];
                if (b.life <= 0) {
                    this.bulletList.splice(i, 1);
                    this.scene.removeChild(b.transform);
                    b.transform.dispose();
                }
            }
        };
        return TankGame;
    }());
    demo.TankGame = TankGame;
})(demo || (demo = {}));
var t;
(function (t) {
    var test_three_leaved_rose_curve = (function () {
        function test_three_leaved_rose_curve() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.counttimer = 0;
            this.angularVelocity = new gd3d.math.vector3(10, 0, 0);
            this.eulerAngle = gd3d.math.pool.new_vector3();
            this.zeroPoint = new gd3d.math.vector3(0, 0, 0);
        }
        test_three_leaved_rose_curve.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_three_leaved_rose_curve.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/trailtest2_00000.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_three_leaved_rose_curve.prototype.loadRole = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/dragon/dragon.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("dragon.prefab.json");
                    _this.role = _prefab.getCloneTrans();
                    _this.role.name = "dragon";
                    _this.scene.addChild(_this.role);
                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.y = 0.005;
                    _this.role.addChild(trailtrans);
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward, 90, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender");
                    trailrender.setspeed(0.35);
                    trailrender.setWidth(0.5);
                    var mat = new gd3d.framework.material();
                    var shader = _this.app.getAssetMgr().getShader("transparent_bothside.shader.json");
                    var tex = _this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json");
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex);
                    trailrender.material = mat;
                    state.finish = true;
                }
            });
        };
        test_three_leaved_rose_curve.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 1000;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, 10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
        };
        test_three_leaved_rose_curve.prototype.addcube = function (laststate, state) {
            {
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = 0.5;
                    cube.localScale.z = 2;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube = cube;
                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.z = -0.5;
                    this.cube.addChild(trailtrans);
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward, 90, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender");
                    trailrender.setspeed(0.25);
                    trailrender.setWidth(0.25);
                    var mat = new gd3d.framework.material();
                    var shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json");
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json");
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex);
                    trailrender.material = mat;
                }
                {
                    var ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 1;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("shader/def");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube2 = ref_cube;
                }
            }
            state.finish = true;
        };
        test_three_leaved_rose_curve.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
        };
        test_three_leaved_rose_curve.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.role != null) {
                var a = 5;
                {
                    var theta = this.timer * 0.5;
                    this.role.localTranslate.x = a * Math.cos(3 * theta) * Math.cos(theta);
                    this.role.localTranslate.z = a * Math.cos(3 * theta) * Math.sin(theta);
                }
                {
                    var deltaTheta = this.timer * 0.5 + 0.001;
                    var targetPoint = gd3d.math.pool.new_vector3();
                    targetPoint.x = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                    targetPoint.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                    this.role.lookatPoint(targetPoint);
                    gd3d.math.pool.delete_vector3(targetPoint);
                    var q = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatFromEulerAngles(-90, 0, 0, q);
                    gd3d.math.quatMultiply(this.role.localRotate, q, this.role.localRotate);
                    gd3d.math.pool.delete_quaternion(q);
                }
                this.role.markDirty();
                this.role.updateWorldTran();
            }
            if (this.cube != null) {
                var a = 5;
                {
                    var theta = this.timer * 0.5;
                    this.cube.localTranslate.x = a * Math.cos(3 * theta) * Math.cos(theta);
                    this.cube.localTranslate.z = a * Math.cos(3 * theta) * Math.sin(theta);
                }
                {
                    var deltaTheta = this.timer * 0.5 + 0.001;
                    var targetPoint = gd3d.math.pool.new_vector3();
                    targetPoint.x = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                    targetPoint.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                    this.cube.lookatPoint(targetPoint);
                    gd3d.math.pool.delete_vector3(targetPoint);
                }
                this.cube.markDirty();
                this.cube.updateWorldTran();
            }
            if (this.cube2) {
                this.cube2.lookatPoint(this.cube.getWorldTranslate());
                this.cube2.markDirty();
            }
        };
        return test_three_leaved_rose_curve;
    }());
    t.test_three_leaved_rose_curve = test_three_leaved_rose_curve;
})(t || (t = {}));
var test_uiPerfabLoad = (function () {
    function test_uiPerfabLoad() {
        this.taskmgr = new gd3d.framework.taskMgr();
    }
    test_uiPerfabLoad.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        this.app.closeFps();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10;
        this.rooto2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(this.rooto2d);
        this.taskmgr.addTaskCall(this.loadShaders.bind(this));
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));
        var inputh = document.createElement("input");
        this.app.container.appendChild(inputh);
        inputh.style.position = "absolute";
        inputh.style.width = 100 + "px";
        inputh.style.height = 30 + "px";
        inputh.value = "button_comb1";
        var btn = document.createElement("button");
        this.app.container.appendChild(btn);
        btn.textContent = "加载";
        btn.style.position = "absolute";
        btn.style.left = 120 + "px";
        btn.onclick = function () {
            console.error(inputh.innerText);
            console.error(inputh.textContent);
            console.error(inputh.value);
            _this.doLoad(inputh.value);
        };
    };
    test_uiPerfabLoad.prototype.createUI = function (astState, state) {
        var atlasComp = this.assetMgr.getAssetByName("comp.atlas.json");
        var tex_0 = this.assetMgr.getAssetByName("zg03_256.png");
        var bg_t = new gd3d.framework.transform2D;
        bg_t.width = 400;
        bg_t.height = 260;
        bg_t.pivot.x = 0;
        bg_t.pivot.y = 0;
        bg_t.localTranslate.y = 100;
        this.rooto2d.addChild(bg_t);
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
        this.bgui = bg_t;
        var prefabName = "button";
        var inputMgr = this.app.getInputMgr();
        this.app.webgl.canvas.addEventListener("keydown", function (ev) {
            if (ev.keyCode == 81) {
            }
        }, false);
        state.finish = true;
    };
    test_uiPerfabLoad.prototype.doLoad = function (name) {
        var _this = this;
        if (!this.bgui)
            return;
        if (this.targetui) {
            this.bgui.removeChild(this.targetui);
            this.targetui.dispose();
        }
        var prefabName = name;
        this.assetMgr.load("res/prefabs/UI/" + prefabName + "/" + prefabName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
            if (s1.isfinish) {
                var ass = _this.assetMgr;
                var temp = _this.assetMgr.getAssetByName(prefabName + ".prefab.json");
                var t2d = temp.getCloneTrans2D();
                _this.bgui.addChild(t2d);
                t2d.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER;
                t2d.markDirty();
                _this.targetui = t2d;
            }
        });
    };
    test_uiPerfabLoad.prototype.loadShaders = function (lastState, state) {
        this.assetMgr.load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                state.finish = true;
            }
        });
    };
    test_uiPerfabLoad.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    _this.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
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
    test_uiPerfabLoad.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return test_uiPerfabLoad;
}());
var test_uimove = (function () {
    function test_uimove() {
        this.timer = 0;
    }
    test_uimove.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.markDirty();
        this.test();
    };
    test_uimove.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
    };
    test_uimove.prototype.test = function () {
        var parentRect = new Rect();
        parentRect.width = 600;
        parentRect.height = 400;
        parentRect.children = [];
        var childRect = new Rect();
        childRect.width = 300;
        childRect.height = 200;
        parentRect.children.push(childRect);
        childRect.parent = parentRect;
        childRect.alignType = AlignType.CENTER;
        parentRect.layout();
        childRect.localEulerAngles = new gd3d.math.vector3(0, 90, 0);
        var matrix = gd3d.math.pool.new_matrix();
        var qua = gd3d.math.pool.new_quaternion();
        var vec = gd3d.math.pool.new_vector3();
        gd3d.math.quatFromEulerAngles(childRect.localEulerAngles.x, childRect.localEulerAngles.y, childRect.localEulerAngles.z, qua);
        gd3d.math.vec3Add(childRect.localTranslate, childRect.alignPos, vec);
        gd3d.math.matrixMakeTransformRTS(vec, childRect.localScale, qua, matrix);
        gd3d.math.pool.delete_vector3(vec);
        gd3d.math.pool.delete_quaternion(qua);
        console.log(matrix.toString());
        for (var i = 0; i < childRect.points.length; i++) {
            console.log(i + " before: " + childRect.points[i]);
            gd3d.math.matrixTransformVector3(childRect.points[i], matrix, childRect.points[i]);
            console.log(i + " after: " + childRect.points[i]);
        }
        gd3d.math.pool.delete_matrix(matrix);
        console.log(matrix.toString());
    };
    return test_uimove;
}());
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offset = new gd3d.math.vector3();
        _this.children = [];
        _this.alignType = AlignType.NONE;
        _this.points = [];
        _this.alignPos = new gd3d.math.vector3();
        return _this;
    }
    Rect.prototype.layout = function () {
        if (this.parent != null && this.alignType != null) {
            switch (this.alignType) {
                case AlignType.CENTER:
                    this.alignPos = new gd3d.math.vector3(0, 0, 0);
                    break;
                case AlignType.LEFT:
                    this.alignPos = new gd3d.math.vector3(0, (this.parent.height - this.height) / 2);
                    break;
                case AlignType.RIGHT:
                    this.alignPos = new gd3d.math.vector3(this.parent.width - this.width, (this.parent.height - this.height) / 2);
                    break;
                case AlignType.TOP:
                    this.alignPos = new gd3d.math.vector3((this.parent.width - this.width) / 2, 0);
                    break;
                case AlignType.BOTTOM:
                    this.alignPos = new gd3d.math.vector3((this.parent.width - this.width) / 2, this.parent.height - this.height);
                    break;
                case AlignType.TOP_LEFT:
                    this.alignPos = new gd3d.math.vector3(0, 0);
                    break;
                case AlignType.BOTTOM_LEFT:
                    this.alignPos = new gd3d.math.vector3(0, this.parent.height - this.height);
                    break;
                case AlignType.TOP_RIGHT:
                    this.alignPos = new gd3d.math.vector3(this.parent.width - this.width, 0);
                    break;
                case AlignType.BOTTOM_RIGHT:
                    this.alignPos = new gd3d.math.vector3(this.parent.width - this.width, this.parent.height - this.height);
                    break;
            }
        }
        var pos = gd3d.math.pool.new_vector3();
        gd3d.math.vec3Add(this.alignPos, this.localTranslate, pos);
        this.points[0] = new gd3d.math.vector3(pos.x - this.width / 2, pos.y + this.height / 2, pos.z);
        this.points[1] = new gd3d.math.vector3(pos.x - this.width / 2, pos.y - this.height / 2, pos.z);
        this.points[2] = new gd3d.math.vector3(pos.x + this.width / 2, pos.y - this.height / 2, pos.z);
        this.points[3] = new gd3d.math.vector3(pos.x + this.width / 2, pos.y - this.height / 2, pos.z);
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].layout();
        }
    };
    return Rect;
}(gd3d.framework.transform));
var AlignType;
(function (AlignType) {
    AlignType[AlignType["NONE"] = 0] = "NONE";
    AlignType[AlignType["CENTER"] = 1] = "CENTER";
    AlignType[AlignType["LEFT"] = 2] = "LEFT";
    AlignType[AlignType["RIGHT"] = 3] = "RIGHT";
    AlignType[AlignType["TOP"] = 4] = "TOP";
    AlignType[AlignType["BOTTOM"] = 5] = "BOTTOM";
    AlignType[AlignType["TOP_LEFT"] = 6] = "TOP_LEFT";
    AlignType[AlignType["BOTTOM_LEFT"] = 7] = "BOTTOM_LEFT";
    AlignType[AlignType["TOP_RIGHT"] = 8] = "TOP_RIGHT";
    AlignType[AlignType["BOTTOM_RIGHT"] = 9] = "BOTTOM_RIGHT";
})(AlignType || (AlignType = {}));
var test_anim = (function () {
    function test_anim() {
        this.cubes = {};
        this.timer = 0;
    }
    test_anim.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this._assetMgr = this.app.getAssetMgr();
        var prefabObj = new gd3d.framework.transform();
        prefabObj.name = "baihu";
        prefabObj.localScale.x = prefabObj.localScale.y = prefabObj.localScale.z = 1;
        this.scene.addChild(prefabObj);
        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            var light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }
        var resName = "elong";
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/" + resName + "/" + resName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName(resName + ".prefab.json");
                        prefabObj = _prefab.getCloneTrans();
                        _this.player = prefabObj;
                        _this.scene.addChild(prefabObj);
                        prefabObj.localScale = new gd3d.math.vector3(0.2, 0.2, 0.2);
                        prefabObj.localTranslate = new gd3d.math.vector3(0, 0, 0);
                        objCam.lookat(prefabObj);
                        objCam.markDirty();
                        var ap = prefabObj.gameObject.getComponent("aniplayer");
                        var list = ap.awaitLoadClipNames();
                        var resPath = "res/prefabs/" + resName + "/resources/";
                        if (list.length > 0) {
                            var cname_2 = list[1];
                            ap.addClipByNameLoad(_this._assetMgr, resPath, cname_2, function (sta, clipName) {
                                if (sta.isfinish) {
                                    var clip = ap.getClip(cname_2);
                                    ap.play(cname_2);
                                }
                            });
                        }
                        document.onkeydown = function (ev) {
                        };
                        var wingroot = prefabObj.find("Bip001 R Toe0");
                        if (wingroot) {
                            wingroot.gameObject.addComponent("asbone");
                            var trans = new gd3d.framework.transform();
                            trans.name = "cube11";
                            var mesh = trans.gameObject.addComponent("meshFilter");
                            var smesh = _this.app.getAssetMgr().getDefaultMesh("cube");
                            mesh.mesh = smesh;
                            var renderer = trans.gameObject.addComponent("meshRenderer");
                            wingroot.addChild(trans);
                            trans.localTranslate = new gd3d.math.vector3(0, 0, 0);
                            trans.localScale = new gd3d.math.vector3(0.3, 0.3, 0.3);
                            renderer.materials = [];
                            renderer.materials.push(new gd3d.framework.material());
                            renderer.materials[0].setShader(_this.app.getAssetMgr().getShader("shader/def"));
                        }
                    }
                });
            }
        });
        this.cube = prefabObj;
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(prefabObj);
        objCam.markDirty();
    };
    test_anim.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 1.1);
        var z2 = Math.cos(this.timer * 1.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();
        objCam.updateWorldTran();
    };
    return test_anim;
}());
var test_loadAsiprefab = (function () {
    function test_loadAsiprefab() {
        this.timer = 0;
    }
    test_loadAsiprefab.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/0001_archangel@idle_none/0001_archangel@idle_none.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("0001_archangel@idle_none.prefab.json");
                        _this.trans = _prefab.getCloneTrans();
                        _this.scene.addChild(_this.trans);
                        var test = _this.trans;
                        objCam.lookat(_this.trans);
                        objCam.markDirty();
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 5, 5);
        objCam.markDirty();
        var hov = objCam.gameObject.addComponent("HoverCameraScript");
        hov.lookAtTarget = this.trans;
        hov.panAngle = 180;
        hov.tiltAngle = -10;
        hov.distance = 8;
        hov.scaleSpeed = 0.1;
        hov.lookAtPoint.x = 0;
        hov.lookAtPoint.y = 2.5;
        hov.lookAtPoint.z = 0;
    };
    test_loadAsiprefab.prototype.update = function (delta) {
    };
    return test_loadAsiprefab;
}());
var test_assestmgr = (function () {
    function test_assestmgr() {
        this.assetName = "elong";
        this.count = 10;
        this.timer = 0;
        this.bere = false;
    }
    test_assestmgr.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.cube = new gd3d.framework.transform();
        this.scene.addChild(this.cube);
        var assetName = this.assetName;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/" + assetName + "/" + assetName + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.baihu = [];
                        _this._prefab = _this.app.getAssetMgr().getAssetByName(assetName + ".prefab.json");
                        for (var i = 0; i < _this.count; i++) {
                            _this.baihu[i] = _this._prefab.getCloneTrans();
                            _this.scene.addChild(_this.baihu[i]);
                            _this.baihu[i].localScale = new gd3d.math.vector3(0.3, 0.3, 0.3);
                            _this.baihu[i].localTranslate = new gd3d.math.vector3(i * 2, 0, 0);
                            _this.baihu[i].markDirty();
                            _this.scene.addChild(_this.baihu[i]);
                        }
                        objCam.lookat(_this.baihu[_this.count / 2]);
                        objCam.markDirty();
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        objCam.localTranslate = new gd3d.math.vector3(50, 82, -500);
        objCam.lookat(this.cube);
        objCam.markDirty();
        this.cube.localTranslate = new gd3d.math.vector3(40, 0, 10);
    };
    test_assestmgr.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 30, -z2 * 10);
        if (this.timer > 20 && !this.bere) {
            this.bere = true;
            for (var i = 0; i < this.count; i++) {
                this.baihu[i].dispose();
            }
            this.app.getAssetMgr().getAssetBundle(this.assetName + ".assetbundle.json").unload();
            this.app.getAssetMgr().releaseUnuseAsset();
        }
    };
    return test_assestmgr;
}());
var t;
(function (t) {
    var test_changeshader = (function () {
        function test_changeshader() {
            this.timer = 0;
        }
        test_changeshader.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var baihu = new gd3d.framework.transform();
            baihu.name = "baihu";
            baihu.localScale.x = baihu.localScale.y = baihu.localScale.z = 20;
            this.scene.addChild(baihu);
            this.changeShader();
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                if (state.isfinish) {
                    var prefabname = "0123_limingshibing";
                    _this.app.getAssetMgr().load("res/prefabs/0123_limingshibing/0123_limingshibing.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                        if (s.isfinish) {
                            var shizi = _this.app.getAssetMgr().getAssetByName("0123_limingshibing.prefab.json");
                            var shizi01 = shizi.getCloneTrans();
                            shizi01.localTranslate = new gd3d.math.vector3();
                            _this.scene.addChild(shizi01);
                            shizi01.markDirty();
                            var renderer = shizi01.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER);
                            _this.skinrender = renderer[0];
                        }
                    });
                }
            });
            this.cube = baihu;
            this.objCam = new gd3d.framework.transform();
            this.objCam.name = "sth.";
            this.scene.addChild(this.objCam);
            this.camera = this.objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 100;
            this.objCam.localTranslate = new gd3d.math.vector3(0, 12, 12);
            this.objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            this.objCam.markDirty();
        };
        test_changeshader.prototype.changeShader = function () {
            var _this = this;
            var btn = document.createElement("button");
            btn.textContent = "切换Shader到：diffuse.shader.json";
            btn.onclick = function () {
                var sh = _this.app.getAssetMgr().getShader("diffuse.shader.json");
                _this.change(sh);
            };
            btn.style.top = "160px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            var btn2 = document.createElement("button");
            btn2.textContent = "切换Shader到：transparent-diffuse.shader.json";
            btn2.onclick = function () {
                var shader = "transparent-diffuse.shader.json";
                var addshader = "transparent_additive.shader.json";
                var sh = _this.app.getAssetMgr().getShader(addshader);
                _this.change(sh);
            };
            btn2.style.top = "124px";
            btn2.style.position = "absolute";
            this.app.container.appendChild(btn2);
        };
        test_changeshader.prototype.change = function (sha) {
            var materials = this.skinrender.materials;
            for (var i = 0; i < materials.length; i++) {
                materials[i] = materials[i].clone();
                materials[i].setShader(sha);
            }
        };
        test_changeshader.prototype.update = function (delta) {
        };
        return test_changeshader;
    }());
    t.test_changeshader = test_changeshader;
})(t || (t = {}));
var t;
(function (t) {
    var test_clearDepth0 = (function () {
        function test_clearDepth0() {
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_clearDepth0.prototype.start = function (app) {
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadTexture.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
        };
        test_clearDepth0.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_clearDepth0.prototype.loadTexture = function (laststate, state) {
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_clearDepth0.prototype.initscene = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "cam_show";
            this.scene.addChild(objCam);
            this.showcamera = objCam.gameObject.addComponent("camera");
            this.showcamera.order = 0;
            this.showcamera.near = 0.01;
            this.showcamera.far = 30;
            this.showcamera.fov = Math.PI * 0.3;
            console.log(this.showcamera.fov);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            {
                var o2ds = new gd3d.framework.overlay2D();
                this.showcamera.addOverLay(o2ds);
                {
                    var t2d = new gd3d.framework.transform2D();
                    t2d.name = "ceng1";
                    t2d.localTranslate.x = 0;
                    t2d.localTranslate.y = 0;
                    t2d.width = 150;
                    t2d.height = 150;
                    t2d.pivot.x = 0;
                    t2d.pivot.y = 0;
                    t2d.markDirty();
                    var rawiamge = t2d.addComponent("rawImage2D");
                    rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("rock256.png");
                    t2d.markDirty();
                    o2ds.addChild(t2d);
                }
                {
                    var cube1 = new gd3d.framework.transform();
                    cube1.localTranslate.x = -3;
                    cube1.name = "cube1";
                    this.scene.addChild(cube1);
                    cube1.localScale.x = 4;
                    cube1.localScale.y = 4;
                    cube1.localScale.z = 1;
                    cube1.markDirty();
                    var mesh1 = cube1.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("plane");
                    mesh1.mesh = (smesh);
                    var renderer = cube1.gameObject.addComponent("meshRenderer");
                    renderer.materials = [];
                    var mat = new gd3d.framework.material();
                    renderer.materials[0] = mat;
                    mat.setShader(this.app.getAssetMgr().getShader("diffuse.shader.json"));
                    mat.setTexture("_MainTex", this.app.getAssetMgr().getAssetByName("rock256.png"));
                }
            }
            state.finish = true;
        };
        test_clearDepth0.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            if (this.target == undefined)
                return;
            this.timer += delta;
            gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 3, this.target.localRotate);
            this.target.markDirty();
        };
        return test_clearDepth0;
    }());
    t.test_clearDepth0 = test_clearDepth0;
})(t || (t = {}));
var test_effect = (function () {
    function test_effect() {
        this.timer = 0;
        this.taskmgr = new gd3d.framework.taskMgr();
        this.beclone = false;
        this.effectloaded = false;
        this.bestop = false;
        this.bereplay = false;
    }
    test_effect.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
        });
    };
    test_effect.prototype.loadText = function (laststate, state) {
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                state.finish = true;
            }
            else {
                state.error = true;
            }
        });
    };
    test_effect.prototype.addcube = function (laststate, state) {
        {
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localTranslate.x = 0;
                this.scene.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
            }
        }
        state.finish = true;
    };
    test_effect.prototype.loadModel = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/fx_shuijing_cj/fx_shuijing_cj.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_s) {
                    if (_s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("fx_shuijing_cj.prefab.json");
                        _this.dragon = _prefab.getCloneTrans();
                        _this.scene.addChild(_this.dragon);
                        state.finish = true;
                    }
                });
            }
        });
    };
    test_effect.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadText.bind(this));
        this.taskmgr.addTaskCall(this.addcam.bind(this));
        this.taskmgr.addTaskCall(this.loadEffect.bind(this));
    };
    test_effect.prototype.loadEffect = function (laststate, state) {
        var _this = this;
        var names = ["0fx_boss_02", "fx_boss_02", "fx_shengji_jiaose", "fx_ss_female@attack_03", "fx_ss_female@attack_02", "fx_0_zs_male@attack_02", "fx_shuijing_cj", "fx_fs_female@attack_02", "fx_0005_sword_sword", "fx_0005_sword_sword", "fx_0_zs_male@attack_02", "fx_fs_female@attack_02"];
        var name = names[2];
        this.app.getAssetMgr().load("res/particleEffect/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                _this.tr = new gd3d.framework.transform();
                _this.effect = _this.tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM);
                _this.text = _this.app.getAssetMgr().getAssetByName(name + ".effect.json");
                _this.effect.setJsonData(_this.text);
                _this.scene.addChild(_this.tr);
                _this.tr.markDirty();
                state.finish = true;
                _this.effectloaded = true;
                _this.addButton();
            }
        });
    };
    test_effect.prototype.addButton = function () {
        var _this = this;
        var btn = document.createElement("button");
        btn.textContent = "Play";
        btn.onclick = function () {
            _this.effect.updateJsonData(_this.text);
        };
        btn.style.top = "160px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
        var btn1 = document.createElement("button");
        btn1.textContent = "Save To Prefab";
        btn1.onclick = function () {
            var name = _this.tr.name;
            var _prefab = new gd3d.framework.prefab(name);
            _this.app.getAssetMgr().use(_prefab);
            _prefab.assetbundle = name;
            var path = "";
            _this.app.getAssetMgr().savePrefab(_this.tr, name, function (data, resourses) {
                console.log(data.files);
                console.log(resourses.length);
                var _loop_1 = function (key) {
                    var val = data.files[key];
                    var blob = localSave.Instance.file_str2blob(val);
                    var files = [];
                    var resPath = path + "/resources/";
                    var _loop_2 = function (i) {
                        var resourceUrl = resourses[i];
                        var resourceName = _this.getNameFromURL(resourceUrl);
                        var resourceLength = 0;
                        if (resourceName.indexOf(".txt") != -1 || resourceName.indexOf(".json")) {
                            localSave.Instance.loadTextImmediate(resourceUrl, function (_txt, _err) {
                                var blob = localSave.Instance.file_str2blob(_txt);
                                localSave.Instance.save(resPath + resourceName, blob);
                            });
                        }
                        else {
                            localSave.Instance.loadBlobImmediate(resourceUrl, function (_blob, _err) {
                                localSave.Instance.save(resPath + resourceName, _blob);
                            });
                        }
                        var fileInfo_1 = { "name": "resources/" + resourceName, "length": 100 };
                        files.push(fileInfo_1);
                    };
                    for (var i = 0; i < resourses.length; i++) {
                        _loop_2(i);
                    }
                    localSave.Instance.save(resPath + name + ".prefab.json", blob);
                    var fileInfo = { "name": "resources/" + name + ".prefab.json", "length": 100 };
                    files.push(fileInfo);
                    var assetBundleStr = JSON.stringify({ "files": files });
                    var assetBundleBlob = localSave.Instance.file_str2blob(assetBundleStr);
                    localSave.Instance.save(path + "/" + name + ".assetbundle.json", assetBundleBlob);
                };
                for (var key in data.files) {
                    _loop_1(key);
                }
            });
        };
        btn1.style.top = "320px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
    };
    test_effect.prototype.getNameFromURL = function (path) {
        var index = path.lastIndexOf("/");
        return path.substring(index + 1);
    };
    test_effect.prototype.addcam = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 200;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0, 20, 20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    test_effect.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return test_effect;
}());
var t;
(function (t) {
    var test_integratedrender = (function () {
        function test_integratedrender() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.WaveFrequency = 4.0;
            this.WaveAmplitude = 0.05;
            this.play = true;
        }
        test_integratedrender.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_integratedrender.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/trailtest2_00000.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/swingFX.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_integratedrender.prototype.loadRole = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/0000_zs_male/0000_zs_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0000_zs_male.prefab.json");
                    _this.role = _prefab.getCloneTrans();
                    _this.role.name = "role";
                    _this.roleLength = _this.role.children.length;
                    _this.scene.addChild(_this.role);
                    _this.role.localScale = new gd3d.math.vector3(1, 1, 1);
                    _this.role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    _this.role.gameObject.visible = true;
                    _this.role.markDirty();
                    _this.role.updateWorldTran();
                    _this.aniplayer = _this.role.gameObject.getComponent("aniplayer");
                    state.finish = true;
                }
            });
        };
        test_integratedrender.prototype.loadWeapon = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/0002_sword_sword/0002_sword_sword.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    if (_this.weapon)
                        _this.weapon.parent.removeChild(_this.weapon);
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0002_sword_sword.prefab.json");
                    _this.weapon = _prefab.getCloneTrans();
                    _this.weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    _this.weapon.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    var obj = _this.role.find("Bip001 Prop1");
                    obj.addChild(_this.weapon);
                    state.finish = true;
                }
            });
        };
        test_integratedrender.prototype.initscene = function (laststate, state) {
            {
                var objCam = new gd3d.framework.transform();
                objCam.name = "sth.";
                this.scene.addChild(objCam);
                this.camera = objCam.gameObject.addComponent("camera");
                this.camera.near = 0.01;
                this.camera.far = 100;
                this.camera.fov = Math.PI * 0.3;
                this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
                objCam.localTranslate = new gd3d.math.vector3(0, 5, -5);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
                {
                    var org = new gd3d.framework.transform();
                    org.name = "org";
                    this.org = org;
                    this.scene.addChild(org);
                }
                {
                    var ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 5;
                    ref_cube.localTranslate.y = -2;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("plane");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("rock256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube2 = ref_cube;
                }
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    this.cube = cube;
                    org.addChild(cube);
                    cube.localTranslate.x = -5;
                    cube.markDirty();
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.z = 2;
                    this.weapon.addChild(trailtrans);
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_right, 270, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender");
                    trailrender.setWidth(2);
                    var mat = new gd3d.framework.material();
                    var shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json");
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json");
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex);
                    trailrender.material = mat;
                    this.trailrender = trailrender;
                }
            }
            state.finish = true;
        };
        test_integratedrender.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.wind = new gd3d.math.vector4();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.loadWeapon.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            var tbn1 = this.addbtn("80px", "0px", "attack_01");
            tbn1.onclick = function () {
                _this.trailrender.play();
                var name = "attack_01.FBAni.aniclip.bin";
                _this.aniplayer.playCross(name, 0.2);
            };
            var btn = this.addbtn("120px", "0px", "attack_02");
            btn.onclick = function () {
                _this.trailrender.play();
                var name = "attack_02.FBAni.aniclip.bin";
                _this.aniplayer.playCross(name, 0.2);
            };
            var btn3 = this.addbtn("200px", "0px", "stop");
            btn3.onclick = function () {
                _this.trailrender.stop();
            };
            {
                var btn2 = this.addbtn("160px", "0px", "playAttackAni");
                btn2.onclick = function () {
                    _this.trailrender.play();
                    var name = "attack_04.FBAni.aniclip.bin";
                    _this.aniplayer.playCross(name, 0.2);
                };
            }
        };
        test_integratedrender.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
        };
        test_integratedrender.prototype.addbtn = function (top, left, text) {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = text;
            this.app.container.appendChild(btn);
            return btn;
        };
        return test_integratedrender;
    }());
    t.test_integratedrender = test_integratedrender;
})(t || (t = {}));
var t;
(function (t) {
    var test_light1 = (function () {
        function test_light1() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_light1.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_light1.prototype.loadText = function (laststate, state) {
            this.tex = new gd3d.framework.texture();
            this.tex.glTexture = new gd3d.render.WriteableTexture2D(this.app.webgl, gd3d.render.TextureFormatEnum.RGBA, 512, 512, true);
            var wt = this.tex.glTexture;
            var da = new Uint8Array(256 * 256 * 4);
            for (var x = 0; x < 256; x++)
                for (var y = 0; y < 256; y++) {
                    var seek = y * 256 * 4 + x * 4;
                    da[seek] = 235;
                    da[seek + 1] = 50;
                    da[seek + 2] = 230;
                    da[seek + 3] = 230;
                }
            wt.updateRect(da, 256, 256, 256, 256);
            var img = new Image();
            img.onload = function (e) {
                state.finish = true;
                wt.updateRectImg(img, 0, 0);
            };
            img.src = "res/zg256.png";
        };
        test_light1.prototype.addcube = function (laststate, state) {
            for (var i = -4; i < 5; i++) {
                for (var j = -4; j < 5; j++) {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                    cube.localTranslate.x = i;
                    cube.localTranslate.z = j;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("light1.shader.json");
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
        test_light1.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 30;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.app.getAssetMgr().getShader("light1.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
            }
            state.finish = true;
        };
        test_light1.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.onclick = function () {
                if (_this.light != null) {
                    if (_this.light.type == gd3d.framework.LightTypeEnum.Direction) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (_this.light.type == gd3d.framework.LightTypeEnum.Point) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        _this.light.spotAngelCos = Math.cos(0.2 * Math.PI);
                        console.log("聚光灯");
                    }
                    else {
                        _this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            };
            btn.style.top = "124px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        };
        test_light1.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 2.25, -z2 * 10);
                objCam.updateWorldTran();
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            }
            if (this.light != null) {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
                objlight.updateWorldTran();
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            }
        };
        return test_light1;
    }());
    t.test_light1 = test_light1;
})(t || (t = {}));
var testloadImmediate = (function () {
    function testloadImmediate() {
        this.timer = 0;
    }
    testloadImmediate.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var baihu = new gd3d.framework.transform();
        baihu.name = "baihu";
        gd3d.math.quatFromEulerAngles(-90, 0, 0, baihu.localRotate);
        this.scene.addChild(baihu);
        this.cube = baihu;
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/baihu/resources/res_baihu_baihu.FBX_baihu.mesh.bin", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var smesh1 = _this.app.getAssetMgr().getAssetByName("res_baihu_baihu.FBX_baihu.mesh.bin");
                        var mesh1 = baihu.gameObject.addComponent("meshFilter");
                        mesh1.mesh = (smesh1);
                        var renderer = baihu.gameObject.addComponent("meshRenderer");
                        var sh = _this.app.getAssetMgr().getShader("diffuse.shader.json");
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(sh);
                        renderer.materials[1].setShader(sh);
                        renderer.materials[2].setShader(sh);
                        renderer.materials[3].setShader(sh);
                        var texture1 = _this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihu.png");
                        var texture2 = _this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihuan.png");
                        var texture3 = _this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihuya.png");
                        var texture4 = _this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihumao.png");
                        renderer.materials[0].setTexture("_MainTex", texture1);
                        renderer.materials[1].setTexture("_MainTex", texture2);
                        renderer.materials[2].setTexture("_MainTex", texture3);
                        renderer.materials[3].setTexture("_MainTex", texture4);
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(baihu);
        objCam.markDirty();
    };
    testloadImmediate.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();
        objCam.updateWorldTran();
    };
    return testloadImmediate;
}());
var dome;
(function (dome) {
    var testCJ = (function () {
        function testCJ() {
            this.time = 0;
        }
        testCJ.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
            });
        };
        testCJ.prototype.loadmesh = function (laststate, state) {
            var _this = this;
            var name = "zs_chuangjue_01";
            name = "gs_chuangjue_01";
            name = "0000_fs_female_1024";
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    _this.dragon = _prefab.getCloneTrans();
                    _this.dragon.localEulerAngles = new gd3d.math.vector3(0, -180, 0);
                    _this.scene.addChild(_this.dragon);
                    _this.dragon.markDirty();
                    _this.cameraPoint = _this.dragon.find("Camera001");
                    state.finish = true;
                }
            });
        };
        testCJ.prototype.loadweapon = function (laststate, state) {
            var _this = this;
            var name = "Quad";
            this.app.getAssetMgr().load("res/prefabs/Quad/Quad.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("Quad.prefab.json");
                    var pp = _prefab.getCloneTrans();
                    pp.localTranslate = new gd3d.math.vector3();
                    pp.localEulerAngles = new gd3d.math.vector3();
                    _this.scene.addChild(pp);
                    state.finish = true;
                }
            });
        };
        testCJ.prototype.test = function (laststate, state) {
            this.dragon = new gd3d.framework.transform();
            var mesh = this.assetMgr.getAssetByName("MU1.0----1.9_TeXiao_Guoyichen_Effect_Mesh_Plane_danxiangsuofang_01.FBX_Plane01.mesh.bin");
            var mat = this.assetMgr.getAssetByName("WuQi_zhenhong_02.mat.json");
            var shder = this.assetMgr.getAssetByName("diffuse_bothside.shader.json");
            var mattt = new gd3d.framework.material();
            mattt.setShader(shder);
            var meshf = this.dragon.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER);
            meshf.mesh = mesh;
            var meshr = this.dragon.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER);
            meshr.materials[0] = mat;
            this.dragon.localScale = new gd3d.math.vector3(13, 41, 21);
            this.dragon.markDirty();
            this.scene.addChild(this.dragon);
            state.finish = true;
        };
        testCJ.prototype.addCamera = function (laststate, state) {
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.scene.addChild(tranCam);
            tranCam.localTranslate = new gd3d.math.vector3(0, 0, -3);
            this.camera = tranCam.gameObject.addComponent("camera");
            this.camera.near = 0.001;
            this.camera.far = 1000;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            tranCam.markDirty();
            state.finish = true;
        };
        testCJ.prototype.start = function (app) {
            this.app = app;
            this.scene = this.app.getScene();
            this.assetMgr = this.app.getAssetMgr();
            this.taskmgr = new gd3d.framework.taskMgr();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.addCamera.bind(this));
            this.taskmgr.addTaskCall(this.loadweapon.bind(this));
        };
        testCJ.prototype.update = function (delta) {
            this.taskmgr.move(delta);
        };
        return testCJ;
    }());
    dome.testCJ = testCJ;
})(dome || (dome = {}));
var t;
(function (t) {
    var test_xinshouMask = (function () {
        function test_xinshouMask() {
            this.timer = 0;
        }
        test_xinshouMask.prototype.start = function (app) {
            var _this = this;
            this.app = app;
            this.scene = this.app.getScene();
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                if (state.isfinish) {
                    var image = new gd3d.framework.transform();
                    image.name = "cube";
                    image.localScale.x = image.localScale.y = image.localScale.z = 1;
                    image.localTranslate.z = 0.01;
                    _this.scene.addChild(image);
                    var mesh = image.gameObject.addComponent("meshFilter");
                    mesh.mesh = _this.app.getAssetMgr().getDefaultMesh("quad");
                    var imageRender_1 = image.gameObject.addComponent("meshRenderer");
                    var imageMask = new gd3d.framework.transform();
                    imageMask.name = "mask";
                    imageMask.localScale.x = imageMask.localScale.y = imageMask.localScale.z = 1;
                    _this.scene.addChild(imageMask);
                    var meshMask = imageMask.gameObject.addComponent("meshFilter");
                    meshMask.mesh = _this.app.getAssetMgr().getDefaultMesh("quad");
                    _this.imageRenderMask = imageMask.gameObject.addComponent("meshRenderer");
                    var objCam = new gd3d.framework.transform();
                    objCam.name = "sth.";
                    _this.scene.addChild(objCam);
                    _this.camera = objCam.gameObject.addComponent("camera");
                    _this.camera.near = 0.01;
                    _this.camera.far = 110;
                    objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
                    objCam.lookat(image);
                    objCam.markDirty();
                    var assetmgr = _this.app.getAssetMgr();
                    var sh = assetmgr.getShader("diffuse.shader.json");
                    if (sh != null) {
                        imageRender_1.materials = [];
                        imageRender_1.materials.push(new gd3d.framework.material());
                        imageRender_1.materials[0].setShader(sh);
                        _this.app.getAssetMgr().load("res/uvSprite.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                console.warn("Finish load img.");
                                var texture = _this.app.getAssetMgr().getAssetByName("uvSprite.png");
                                imageRender_1.materials[0].setTexture("_MainTex", texture);
                            }
                        });
                    }
                    var shaderMask = assetmgr.getShader("unlit_transparent.shader.json");
                    debugger;
                    if (shaderMask != null) {
                        _this.imageRenderMask.materials = [];
                        _this.imageRenderMask.materials.push(new gd3d.framework.material());
                        _this.imageRenderMask.materials[0].setShader(shaderMask);
                        var url_1 = "res/mask.png";
                        gd3d.io.loadImg(url_1, function (_tex, _err) {
                            var fileName = getFileName(url_1);
                            _this.texture = new gd3d.framework.texture(fileName);
                            var _textureFormat = gd3d.render.TextureFormatEnum.RGBA;
                            var t2d = new gd3d.render.glTexture2D(_this.app.getAssetMgr().webgl, _textureFormat);
                            t2d.uploadImage(_tex, true, true, true, false);
                            _this.texture.glTexture = t2d;
                            _this.app.getAssetMgr().setAssetUrl(_this.texture, url_1);
                            _this.app.getAssetMgr().use(_this.texture);
                            _this.imageRenderMask.materials[0].setTexture("_MainTex", _this.texture);
                            _this.imageRenderMask.materials[0].setVector4("_MaskTex_ST", new gd3d.math.vector4(1, 1, 0, 0));
                        }, function (loadedLength, totalLength) { });
                    }
                }
            });
            this.addDomUI();
        };
        test_xinshouMask.prototype.addDomUI = function () {
            var _this = this;
            var tillingX = document.createElement("label");
            tillingX.style.top = "160px";
            tillingX.style.position = "absolute";
            tillingX.textContent = "tillingX:";
            this.app.container.appendChild(tillingX);
            var inputEle0 = document.createElement("input");
            inputEle0.style.top = "160px";
            inputEle0.style.left = "60px";
            inputEle0.style.width = "100px";
            inputEle0.style.position = "absolute";
            inputEle0.value = "1";
            this.app.container.appendChild(inputEle0);
            var tillingY = document.createElement("label");
            tillingY.style.top = "160px";
            tillingY.style.left = "180px";
            tillingY.style.position = "absolute";
            tillingY.textContent = "tillingY:";
            this.app.container.appendChild(tillingY);
            var inputEle1 = document.createElement("input");
            inputEle1.style.top = "160px";
            inputEle1.style.left = "240px";
            inputEle1.style.width = "100px";
            inputEle1.style.position = "absolute";
            inputEle1.value = "1";
            this.app.container.appendChild(inputEle1);
            var offsetX = document.createElement("label");
            offsetX.style.top = "160px";
            offsetX.style.left = "360px";
            offsetX.style.position = "absolute";
            offsetX.textContent = "offsetX:";
            this.app.container.appendChild(offsetX);
            var inputEle2 = document.createElement("input");
            inputEle2.style.top = "160px";
            inputEle2.style.left = "420px";
            inputEle2.style.width = "100px";
            inputEle2.style.position = "absolute";
            inputEle2.value = "0";
            this.app.container.appendChild(inputEle2);
            var offsetY = document.createElement("label");
            offsetY.style.top = "160px";
            offsetY.style.left = "540px";
            offsetY.style.position = "absolute";
            offsetY.textContent = "offsetY:";
            this.app.container.appendChild(offsetY);
            var inputEle3 = document.createElement("input");
            inputEle3.style.top = "160px";
            inputEle3.style.left = "620px";
            inputEle3.style.width = "100px";
            inputEle3.style.position = "absolute";
            inputEle3.value = "0";
            this.app.container.appendChild(inputEle3);
            var button = document.createElement("button");
            button.style.top = "220px";
            button.textContent = "update";
            button.style.position = "absolute";
            button.onclick = function () {
                var tillingXVal = parseFloat(inputEle0.value);
                var tillingYVal = parseFloat(inputEle1.value);
                var offsetXVal = parseFloat(inputEle2.value);
                var offsetYVal = parseFloat(inputEle3.value);
                _this.imageRenderMask.materials[0].setVector4("_MaskTex_ST", new gd3d.math.vector4(tillingXVal, tillingYVal, offsetXVal, offsetYVal));
            };
            this.app.container.appendChild(button);
        };
        test_xinshouMask.prototype.update = function (delta) {
            this.timer += delta;
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (!this.camera)
                return;
            var objCam = this.camera.gameObject.transform;
        };
        return test_xinshouMask;
    }());
    t.test_xinshouMask = test_xinshouMask;
    function getFileName(url) {
        var filei = url.lastIndexOf("/");
        var file = url.substr(filei + 1);
        return file;
    }
    t.getFileName = getFileName;
})(t || (t = {}));
var test_load = (function () {
    function test_load() {
        this.timer = 0;
    }
    test_load.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var baihu = new gd3d.framework.transform();
        baihu.name = "baihu";
        gd3d.math.quatFromEulerAngles(-90, 0, 0, baihu.localRotate);
        this.scene.addChild(baihu);
        var lighttran = new gd3d.framework.transform();
        this.scene.addChild(lighttran);
        var light = lighttran.gameObject.addComponent("light");
        lighttran.localTranslate.x = 50;
        lighttran.localTranslate.y = 50;
        lighttran.markDirty();
        var isSplitPcakge = true;
        var mpath = "meshprefab/";
        var tpath = "textures/";
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/baihu/" + (isSplitPcakge ? mpath : "") + "resources/res_baihu_baihu.FBX_baihu.mesh.bin", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var smesh1 = _this.app.getAssetMgr().getAssetByName("res_baihu_baihu.FBX_baihu.mesh.bin");
                        var mesh1 = baihu.gameObject.addComponent("meshFilter");
                        mesh1.mesh = smesh1;
                        var renderer = baihu.gameObject.addComponent("meshRenderer");
                        var collider = baihu.gameObject.addComponent("boxcollider");
                        baihu.markDirty();
                        var sh = _this.app.getAssetMgr().getShader("diffuse.shader.json");
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(sh);
                        renderer.materials[1].setShader(sh);
                        renderer.materials[2].setShader(sh);
                        renderer.materials[3].setShader(sh);
                        _this.app.getAssetMgr().load("res/prefabs/baihu/" + (isSplitPcakge ? tpath : "") + "resources/baihu.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                var texture = _this.app.getAssetMgr().getAssetByName("baihu.imgdesc.json");
                                renderer.materials[0].setTexture("_MainTex", texture);
                            }
                        });
                        _this.app.getAssetMgr().load("res/prefabs/baihu/" + (isSplitPcakge ? tpath : "") + "resources/baihuan.png", gd3d.framework.AssetTypeEnum.Auto, function (s2) {
                            if (s2.isfinish) {
                                var texture = _this.app.getAssetMgr().getAssetByName("baihuan.png");
                                renderer.materials[1].setTexture("_MainTex", texture);
                            }
                        });
                    }
                });
            }
        });
        this.cube = baihu;
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(baihu);
        objCam.markDirty();
    };
    test_load.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();
        objCam.updateWorldTran();
    };
    return test_load;
}());
var t;
(function (t) {
    var test_metal = (function () {
        function test_metal() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_metal.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_metal.prototype.loadText = function (laststate, state) {
            var c = 0;
            c++;
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            this.app.getAssetMgr().load("res/rock_n256_1.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            this.app.getAssetMgr().load("res/cube_texture_1.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            this.app.getAssetMgr().load("res/cube_specular_1.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            state.finish = true;
        };
        test_metal.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 30;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 3, -3);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
            {
                var cube = new gd3d.framework.transform();
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                var tex1 = this.app.getAssetMgr().getDefaultTexture("grid");
                var mat = new gd3d.framework.material();
                mat.setShader(sh);
                mat.setTexture("_MainTex", tex1);
                renderer.materials = [];
                renderer.materials.push(mat);
                var cuber = renderer;
            }
            state.finish = true;
        };
        test_metal.prototype.addmetalmodel = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/specular/0122_huanghunshibing.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0122_huanghunshibing.prefab.json");
                    var model = _prefab.getCloneTrans();
                    model.localTranslate.x = 0;
                    model.localTranslate.y = 0;
                    model.localTranslate.z = 0;
                    _this.scene.addChild(model);
                    model.markDirty();
                    _this.model = model;
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_metal.prototype.addAsiModel = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/asi_streamlight/asi_streamlight.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("asi_streamlight.prefab.json");
                    var model = _prefab.getCloneTrans();
                    model.localTranslate.x = 0;
                    model.localTranslate.y = 0;
                    model.localTranslate.z = 0;
                    _this.scene.addChild(model);
                    model.markDirty();
                    _this.model = model;
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_metal.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.onclick = function () {
                if (_this.light != null) {
                    if (_this.light.type == gd3d.framework.LightTypeEnum.Direction) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (_this.light.type == gd3d.framework.LightTypeEnum.Point) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        console.log("聚光灯");
                    }
                    else {
                        _this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            };
            btn.style.top = "124px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addAsiModel.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
            this.addinput("260px", "0px", "diffuse", "string");
            var input = this.addinput("260px", "100px", "0");
            this.addinput("300px", "0px", "emitpower", "string");
            var input1 = this.addinput("300px", "100px", "1");
            this.diffuse = input;
            this.emitpower = input1;
        };
        test_metal.prototype.addinput = function (top, left, text, type) {
            if (type === void 0) { type = "number"; }
            var input = document.createElement("input");
            input.type = type;
            this.app.container.appendChild(input);
            input.style.top = top;
            input.style.left = left;
            input.style.position = "absolute";
            input.value = text;
            return input;
        };
        test_metal.prototype.addbtn = function (top, left, text) {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = "diffuse";
            this.app.container.appendChild(btn);
            return btn;
        };
        test_metal.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.light != null) {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 3, 3, z * 3);
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objlight.markDirty();
            }
            if (this.model != undefined) {
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 5, this.model.localRotate);
                this.model.markDirty();
                var ss = this.model.find("0107_lmsb");
                if (ss) {
                    var meshrender = ss.gameObject.getComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER);
                    meshrender.materials[0].setFloat("_diffuse", this.diffuse.valueAsNumber);
                    meshrender.materials[0].setFloat("_emitPow", this.emitpower.valueAsNumber);
                }
            }
        };
        return test_metal;
    }());
    t.test_metal = test_metal;
})(t || (t = {}));
var test_multipleplayer_anim = (function () {
    function test_multipleplayer_anim() {
        this.cubes = {};
        this.resName = "elong";
        this.timer = 0;
        this.aniplayers = [];
    }
    Object.defineProperty(test_multipleplayer_anim.prototype, "abName", {
        get: function () { return "res/prefabs/" + this.resName + "/" + this.resName + ".assetbundle.json"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(test_multipleplayer_anim.prototype, "prefabName", {
        get: function () { return this.resName + ".prefab.json"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(test_multipleplayer_anim.prototype, "resPath", {
        get: function () { return "res/prefabs/" + this.resName + "/resources/"; },
        enumerable: true,
        configurable: true
    });
    test_multipleplayer_anim.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.scene = this.app.getScene();
        var baihu = new gd3d.framework.transform();
        baihu.name = "obj";
        baihu.localScale.x = baihu.localScale.y = baihu.localScale.z = 1;
        this.scene.addChild(baihu);
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load(_this.abName, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName(_this.prefabName);
                        var a = 10;
                        var b = 10;
                        var count = 13;
                        for (var i = -count; i <= count; i++) {
                            for (var j = -count; j <= count; j++) {
                                var trans = _prefab.getCloneTrans();
                                _this.scene.addChild(trans);
                                trans.localScale = new gd3d.math.vector3(1, 1, 1);
                                trans.localTranslate = new gd3d.math.vector3(i * 5, 0, j * 5);
                                if (i == 0 && j == 0) {
                                    objCam.lookat(trans);
                                }
                                var ap_2 = trans.gameObject.getComponent("aniplayer");
                                _this.aniplayers.push(ap_2);
                            }
                        }
                        var ap_3 = _this.aniplayers[0];
                        var list = ap_3.awaitLoadClipNames();
                        var resPath = _this.resPath;
                        var cname_3 = "";
                        if (list.length > 0) {
                            cname_3 = list[1];
                            ap_3.addClipByNameLoad(_this.app.getAssetMgr(), resPath, cname_3, function (sta, clipName) {
                                if (sta.isfinish) {
                                    var clip_1 = ap_3.getClip(cname_3);
                                    _this.aniplayers.forEach(function (sub) {
                                        sub.addClip(clip_1);
                                    });
                                    _this.aniplayers.forEach(function (sub) {
                                        sub.play(cname_3);
                                    });
                                }
                            });
                        }
                        objCam.markDirty();
                    }
                });
            }
        });
        this.cube = baihu;
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 399;
        objCam.localTranslate = new gd3d.math.vector3(0, 286, 0);
        objCam.markDirty();
        var tipsLabel = document.createElement("label");
        tipsLabel.style.top = "300px";
        tipsLabel.style.position = "absolute";
        tipsLabel.textContent = "开启cache";
        this.app.container.appendChild(tipsLabel);
        var cacheOpenCheckBox = document.createElement("input");
        cacheOpenCheckBox.type = "checkbox";
        cacheOpenCheckBox.checked = false;
        cacheOpenCheckBox.onchange = function () {
        };
        cacheOpenCheckBox.style.top = "350px";
        cacheOpenCheckBox.style.position = "absolute";
        this.app.container.appendChild(cacheOpenCheckBox);
    };
    test_multipleplayer_anim.prototype.update = function (delta) {
    };
    return test_multipleplayer_anim;
}());
var t;
(function (t) {
    var Test_NormalMap = (function () {
        function Test_NormalMap() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        Test_NormalMap.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        Test_NormalMap.prototype.loadText = function (laststate, state) {
            var c = 0;
            c++;
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            this.app.getAssetMgr().load("res/map_diffuse.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            c++;
            this.app.getAssetMgr().load("res/map_normal.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        Test_NormalMap.prototype.addnormalcube = function (laststate, state) {
            this.normalCube = new gd3d.framework.transform();
            this.normalCube.name = "cube";
            this.normalCube.localScale.x = this.normalCube.localScale.y = this.normalCube.localScale.z = 3;
            this.scene.addChild(this.normalCube);
            var mesh = this.normalCube.gameObject.addComponent("meshFilter");
            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = (smesh);
            var renderer = this.normalCube.gameObject.addComponent("meshRenderer");
            this.cuber = renderer;
            var sh = this.app.getAssetMgr().getShader("normalmap.shader.json");
            if (sh != null) {
                this.cuber.materials = [];
                this.cuber.materials.push(new gd3d.framework.material());
                this.cuber.materials[0].setShader(sh);
                var texture = this.app.getAssetMgr().getAssetByName("map_diffuse.png");
                this.cuber.materials[0].setTexture("_MainTex", texture);
                var normalTexture = this.app.getAssetMgr().getAssetByName("map_normal.png");
                this.cuber.materials[0].setTexture("_NormalTex", normalTexture);
            }
            state.finish = true;
        };
        Test_NormalMap.prototype.addcube = function (laststate, state) {
            var cube = new gd3d.framework.transform();
            cube.name = "cube";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;
            cube.localTranslate.x = 3;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter");
            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = (smesh);
            var renderer = cube.gameObject.addComponent("meshRenderer");
            var cuber = renderer;
            var sh = this.app.getAssetMgr().getShader("light1.shader.json");
            if (sh != null) {
                cuber.materials = [];
                cuber.materials.push(new gd3d.framework.material());
                cuber.materials[0].setShader(sh);
                var texture = this.app.getAssetMgr().getAssetByName("map_diffuse.png");
                cuber.materials[0].setTexture("_MainTex", texture);
            }
            state.finish = true;
        };
        Test_NormalMap.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 30;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -5);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.app.getAssetMgr().getShader("light1.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
            }
            state.finish = true;
        };
        Test_NormalMap.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.onclick = function () {
                if (_this.light != null) {
                    if (_this.light.type == gd3d.framework.LightTypeEnum.Direction) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (_this.light.type == gd3d.framework.LightTypeEnum.Point) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        console.log("聚光灯");
                    }
                    else {
                        _this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            };
            btn.style.top = "124px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addnormalcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        };
        Test_NormalMap.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 2.25, -z2 * 10);
                objCam.updateWorldTran();
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            }
            if (this.light != null) {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            }
        };
        return Test_NormalMap;
    }());
    t.Test_NormalMap = Test_NormalMap;
})(t || (t = {}));
var test_pick = (function () {
    function test_pick() {
        this.timer = 0;
        this.movetarget = new gd3d.math.vector3();
        this.pointDown = false;
    }
    test_pick.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.inputMgr = this.app.getInputMgr();
        this.scene = this.app.getScene();
        var cuber;
        console.warn("Finish it.");
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = 10;
        cube.localScale.y = 0.1;
        cube.localScale.z = 10;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        var smesh = this.app.getAssetMgr().getDefaultMesh("pyramid");
        mesh.mesh = (this.app.getAssetMgr().getDefaultMesh("cube"));
        var renderer = cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        cuber = renderer;
        this.cube = cube;
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 1;
            this.cube2.localTranslate.x = -5;
            this.cube2.markDirty();
            var mesh = this.cube2.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer");
            var coll = this.cube2.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        this.cube3 = this.cube2.clone();
        this.scene.addChild(this.cube3);
        {
            this.cube3 = new gd3d.framework.transform();
            this.cube3.name = "cube3";
            this.scene.addChild(this.cube3);
            this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 1;
            this.cube3.localTranslate.x = -5;
            this.cube3.markDirty();
            var mesh = this.cube3.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube3.gameObject.addComponent("meshRenderer");
            var coll = this.cube3.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        {
            this.cube4 = new gd3d.framework.transform();
            this.cube4.name = "cube4";
            this.scene.addChild(this.cube4);
            this.cube4.localScale.x = this.cube4.localScale.y = this.cube4.localScale.z = 1;
            this.cube4.localTranslate.x = 5;
            this.cube4.markDirty();
            var mesh = this.cube4.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube4.gameObject.addComponent("meshRenderer");
            var coll = this.cube4.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();
        CameraController.instance().init(this.app, this.camera);
    };
    test_pick.prototype.update = function (delta) {
        CameraController.instance().update(delta);
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
            var tempinfo = gd3d.math.pool.new_pickInfo();
            var bool = this.scene.pick(ray, tempinfo, true);
            if (bool != null) {
                gd3d.math.vec3Clone(tempinfo.hitposition, this.movetarget);
                this.timer = 0;
            }
            gd3d.math.pool.delete_pickInfo(tempinfo);
        }
        this.pointDown = this.inputMgr.point.touch;
        if (this.cube3.gameObject.getComponent("boxcollider").intersectsTransform(this.cube4)) {
            return;
        }
        if (this.cube2.gameObject.getComponent("boxcollider").intersectsTransform(this.cube3)) {
            return;
        }
        this.timer += delta;
        this.cube3.localTranslate.x += delta;
        this.cube3.localTranslate = this.cube3.localTranslate;
        this.cube3.markDirty();
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var tv = new gd3d.math.vector3();
        gd3d.math.vec3SLerp(this.cube2.localTranslate, this.movetarget, this.timer, this.cube2.localTranslate);
        this.cube2.localTranslate = this.movetarget;
        this.cube2.markDirty();
    };
    return test_pick;
}());
var test_pick_4p = (function () {
    function test_pick_4p() {
        this.timer = 0;
        this.movetarget = new gd3d.math.vector3();
        this.pointDown = false;
    }
    test_pick_4p.prototype.start = function (app) {
        console.log("i am here.");
        this.app = app;
        this.inputMgr = this.app.getInputMgr();
        this.scene = this.app.getScene();
        var cuber;
        console.warn("Finish it.");
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localScale.x = 10;
        cube.localScale.y = 0.1;
        cube.localScale.z = 10;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        var smesh = this.app.getAssetMgr().getDefaultMesh("pyramid");
        mesh.mesh = (this.app.getAssetMgr().getDefaultMesh("cube"));
        var renderer = cube.gameObject.addComponent("meshRenderer");
        cube.gameObject.addComponent("boxcollider");
        cube.markDirty();
        cuber = renderer;
        this.cube = cube;
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 1;
            this.cube2.localTranslate.x = -5;
            this.cube2.markDirty();
            var mesh = this.cube2.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer");
            var coll = this.cube2.gameObject.addComponent("spherecollider");
            coll.center = new gd3d.math.vector3(0, 1, 0);
            coll.radius = 1;
        }
        this.cube3 = this.cube2.clone();
        this.scene.addChild(this.cube3);
        {
            this.cube3 = new gd3d.framework.transform();
            this.cube3.name = "cube3";
            this.scene.addChild(this.cube3);
            this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 1;
            this.cube3.localTranslate.x = -5;
            this.cube3.markDirty();
            var mesh = this.cube3.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube3.gameObject.addComponent("meshRenderer");
            var coll = this.cube3.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        {
            this.cube4 = new gd3d.framework.transform();
            this.cube4.name = "cube4";
            this.scene.addChild(this.cube4);
            this.cube4.localScale.x = this.cube4.localScale.y = this.cube4.localScale.z = 1;
            this.cube4.localTranslate.x = 5;
            this.cube4.markDirty();
            var mesh = this.cube4.gameObject.addComponent("meshFilter");
            mesh.mesh = (smesh);
            var renderer = this.cube4.gameObject.addComponent("meshRenderer");
            var coll = this.cube4.gameObject.addComponent("boxcollider");
            coll.colliderVisible = true;
        }
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        this.camera.viewport = new gd3d.math.rect(0, 0, 0.5, 0.5);
        objCam.markDirty();
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            objCam2.localTranslate = new gd3d.math.vector3(0, 5, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0.5, 0.5, 0.5, 0.5);
            objCam2.markDirty();
        }
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            objCam2.localTranslate = new gd3d.math.vector3(0, 8, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0.5, 0, 0.5, 0.5);
            objCam2.markDirty();
        }
        {
            var objCam2 = new gd3d.framework.transform();
            objCam2.name = "sth2.";
            this.scene.addChild(objCam2);
            var _camera = objCam2.gameObject.addComponent("camera");
            _camera.near = 0.01;
            _camera.far = 100;
            _camera.clearOption_Color = false;
            objCam2.localTranslate = new gd3d.math.vector3(0, 8, -10);
            objCam2.lookat(this.cube);
            _camera.viewport = new gd3d.math.rect(0, 0.5, 0.5, 0.5);
            objCam2.markDirty();
        }
    };
    test_pick_4p.prototype.update = function (delta) {
        if (this.pointDown == false && this.inputMgr.point.touch == true) {
            var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
            var tempInfo = gd3d.math.pool.new_pickInfo();
            var bool = this.scene.pick(ray, tempInfo);
            if (bool != null) {
                gd3d.math.vec3Clone(tempInfo.hitposition, this.movetarget);
                this.timer = 0;
            }
        }
        this.pointDown = this.inputMgr.point.touch;
        if (this.cube3.gameObject.getComponent("boxcollider").intersectsTransform(this.cube4)) {
            return;
        }
        this.timer += delta;
        this.cube3.localTranslate.x += delta;
        this.cube3.markDirty();
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
    };
    return test_pick_4p;
}());
var t;
(function (t) {
    var test_post_bloom = (function () {
        function test_post_bloom() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_post_bloom.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_post_bloom.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_post_bloom.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 1;
            this.camera.far = 15;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
        };
        test_post_bloom.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.addbtn("50px", "normal", function () {
                _this.camera.postQueues = [];
            });
            this.addbtn("150px", "模糊", function () {
                _this.camera.postQueues = [];
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                _this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;
                var texsize = 512;
                var post = new gd3d.framework.cameraPostQueue_Quad();
                post.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, texsize, texsize, true, false);
                post.material.setShader(_this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
                post.material.setTexture("_MainTex", textcolor);
                post.material.setVector4("sample_offsets", new gd3d.math.vector4(0, 1.0, 0, -1.0));
                post.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
                _this.camera.postQueues.push(post);
                var texBlur0 = new gd3d.framework.texture("_blur0");
                texBlur0.glTexture = post.renderTarget;
                var post1 = new gd3d.framework.cameraPostQueue_Quad();
                post1.material.setShader(_this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
                post1.material.setTexture("_MainTex", texBlur0);
                post1.material.setVector4("sample_offsets", new gd3d.math.vector4(1.0, 0, -1.0, 0));
                post1.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
                _this.camera.postQueues.push(post1);
            });
            this.addbtn("350px", "景深", function () {
                _this.camera.postQueues = [];
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                _this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;
                var depth = new gd3d.framework.cameraPostQueue_Depth();
                depth.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                _this.camera.postQueues.push(depth);
                var depthcolor = new gd3d.framework.texture("_depthcolor");
                depthcolor.glTexture = depth.renderTarget;
                var texsize = 512;
                var post = new gd3d.framework.cameraPostQueue_Quad();
                post.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, texsize, texsize, true, false);
                post.material.setShader(_this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
                post.material.setTexture("_MainTex", textcolor);
                post.material.setVector4("sample_offsets", new gd3d.math.vector4(0, 1.0, 0, -1.0));
                post.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
                _this.camera.postQueues.push(post);
                var texBlur0 = new gd3d.framework.texture("_blur0");
                texBlur0.glTexture = post.renderTarget;
                var post1 = new gd3d.framework.cameraPostQueue_Quad();
                post1.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, texsize, texsize, true, false);
                post1.material.setShader(_this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
                post1.material.setTexture("_MainTex", texBlur0);
                post1.material.setVector4("sample_offsets", new gd3d.math.vector4(1.0, 0, -1.0, 0));
                post1.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0 / texsize, 1.0 / texsize, texsize, texsize));
                _this.camera.postQueues.push(post1);
                var texBlur = new gd3d.framework.texture("_blur");
                texBlur.glTexture = post1.renderTarget;
                var post2 = new gd3d.framework.cameraPostQueue_Quad();
                post2.material.setShader(_this.scene.app.getAssetMgr().getShader("dof.shader.json"));
                post2.material.setTexture("_MainTex", textcolor);
                post2.material.setTexture("_BlurTex", texBlur);
                post2.material.setTexture("_DepthTex", depthcolor);
                var focalDistance = 0.96;
                post2.material.setFloat("_focalDistance", focalDistance);
                _this.camera.postQueues.push(post2);
            });
            this.addbtn("350px", "bloom", function () {
                _this.camera.postQueues = [];
            });
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        };
        test_post_bloom.prototype.addbtn = function (topOffset, textContent, func) {
            var _this = this;
            var btn = document.createElement("button");
            btn.style.top = topOffset;
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            btn.textContent = textContent;
            btn.onclick = function () {
                _this.camera.postQueues = [];
                func();
            };
        };
        test_post_bloom.prototype.update = function (delta) {
            this.taskmgr.move(delta);
        };
        return test_post_bloom;
    }());
    t.test_post_bloom = test_post_bloom;
})(t || (t = {}));
var t;
(function (t) {
    var test_posteffect = (function () {
        function test_posteffect() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
        }
        test_posteffect.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_posteffect.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_posteffect.prototype.addcube = function (laststate, state) {
            for (var i = -4; i < 5; i++) {
                for (var j = -4; j < 5; j++) {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                    cube.localTranslate.x = i;
                    cube.localTranslate.z = j;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("light1.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                }
            }
            state.finish = true;
        };
        test_posteffect.prototype.addcamandlight = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 1;
            this.camera.far = 100;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            {
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                this.camera.postQueues.push(color);
                var depth = new gd3d.framework.cameraPostQueue_Depth();
                depth.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                this.camera.postQueues.push(depth);
                var post = new gd3d.framework.cameraPostQueue_Quad();
                post.material.setShader(this.scene.app.getAssetMgr().getShader("outline.shader.json"));
                var text = new gd3d.framework.texture("_depth");
                text.glTexture = depth.renderTarget;
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;
                post.material.setTexture("_MainTex", textcolor);
                post.material.setTexture("_DepthTex", text);
                this.camera.postQueues.push(post);
            }
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.app.getAssetMgr().getShader("light1.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
            }
            state.finish = true;
        };
        test_posteffect.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.style.top = "120px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            btn.onclick = function () {
                if (_this.light != null) {
                    if (_this.light.type == gd3d.framework.LightTypeEnum.Direction) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (_this.light.type == gd3d.framework.LightTypeEnum.Point) {
                        _this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        _this.light.spotAngelCos = Math.cos(0.2 * Math.PI);
                        console.log("聚光灯");
                    }
                    else {
                        _this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            };
            var list = [
                "灰度+描边",
                "马赛克",
                "均值模糊",
                "高斯模糊",
                "径向模糊",
                "旋转扭曲",
                "桶模糊",
                "bloom",
                "景深",
                "Vignetting",
                "校色"
            ];
            var select = document.createElement("select");
            select.style.top = "240px";
            select.style.position = "absolute";
            this.app.container.appendChild(select);
            for (var i = 0; i < list.length; i++) {
                var op = document.createElement("option");
                op.value = i.toString();
                op.innerText = list[i];
                select.appendChild(op);
            }
            select.onchange = function () {
                _this.camera.postQueues = [];
                if (select.value == "0") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var depth = new gd3d.framework.cameraPostQueue_Depth();
                    depth.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(depth);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("outline.shader.json"));
                    var text = new gd3d.framework.texture("_depth");
                    text.glTexture = depth.renderTarget;
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    post.material.setTexture("_DepthTex", text);
                    _this.camera.postQueues.push(post);
                    console.log("灰度+描边");
                }
                else if (select.value == "1") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    var sh = _this.scene.app.getAssetMgr().getShader("mosaic.shader.json");
                    post.material.setShader(sh);
                    var textcolor = new gd3d.framework.texture("_color");
                    0;
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    _this.camera.postQueues.push(post);
                    console.log("马赛克");
                }
                else if (select.value == "2") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("blur.shader.json"));
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    post.material.setFloat("_BlurGap", 1);
                    _this.camera.postQueues.push(post);
                    console.log("均值模糊");
                }
                else if (select.value == "3") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("gaussianBlur.shader.json"));
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    post.material.setFloat("_BlurGap", 2);
                    post.material.setFloat("_BlurSigma", 6);
                    post.material.setFloat("_BlurLayer", 10);
                    _this.camera.postQueues.push(post);
                    console.log("高斯模糊");
                }
                else if (select.value == "4") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("radial_blur.shader.json"));
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    post.material.setFloat("_Level", 50);
                    _this.camera.postQueues.push(post);
                    console.log("径向模糊");
                }
                else if (select.value == "5") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("contort.shader.json"));
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    _this.camera.postQueues.push(post);
                    console.log("旋转扭曲");
                }
                else if (select.value == "6") {
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("barrel_blur.shader.json"));
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    post.material.setTexture("_MainTex", textcolor);
                    _this.camera.postQueues.push(post);
                    console.log("桶模糊");
                }
                else if (select.value == "7") {
                    var bloomctr = _this.scene.mainCamera.gameObject.addComponent("bloomctr");
                    console.log("bloom");
                }
                else if (select.value == "8") {
                    _this.camera.postQueues = [];
                    var color = new gd3d.framework.cameraPostQueue_Color();
                    color.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(color);
                    var textcolor = new gd3d.framework.texture("_color");
                    textcolor.glTexture = color.renderTarget;
                    var depth = new gd3d.framework.cameraPostQueue_Depth();
                    depth.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                    _this.camera.postQueues.push(depth);
                    var depthcolor = new gd3d.framework.texture("_depthcolor");
                    depthcolor.glTexture = depth.renderTarget;
                    var texsize = 1024;
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, texsize, texsize, true, false);
                    var isGaussianblur = false;
                    if (isGaussianblur) {
                        post.material.setShader(_this.scene.app.getAssetMgr().getShader("gaussianBlur.shader.json"));
                        post.material.setTexture("_MainTex", textcolor);
                        post.material.setFloat("_BlurGap", 2);
                        post.material.setFloat("_BlurSigma", 6);
                        post.material.setFloat("_BlurLayer", 10);
                    }
                    else {
                        post.material.setShader(_this.scene.app.getAssetMgr().getShader("blur.shader.json"));
                        post.material.setTexture("_MainTex", textcolor);
                    }
                    _this.camera.postQueues.push(post);
                    var texBlur = new gd3d.framework.texture("_blur");
                    texBlur.glTexture = post.renderTarget;
                    var post2 = new gd3d.framework.cameraPostQueue_Quad();
                    post2.material.setShader(_this.scene.app.getAssetMgr().getShader("dof.shader.json"));
                    post2.material.setTexture("_MainTex", textcolor);
                    post2.material.setTexture("_BlurTex", texBlur);
                    post2.material.setTexture("_DepthTex", depthcolor);
                    var focalDistance = 0.96;
                    post2.material.setFloat("_focalDistance", focalDistance);
                    _this.camera.postQueues.push(post2);
                    console.log("景深");
                }
                else if (select.value == "9") {
                    var actr = _this.scene.mainCamera.gameObject.addComponent("vignettingCtr");
                    console.log("Vignetting");
                }
                else if (select.value == "10") {
                }
            };
            this.addbtn("60px", "深度图", function () {
                _this.camera.postQueues = [];
                var depth = new gd3d.framework.cameraPostQueue_Depth();
                _this.camera.postQueues.push(depth);
            });
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        };
        test_posteffect.prototype.addbtn = function (topOffset, textContent, func) {
            var _this = this;
            var btn = document.createElement("button");
            btn.style.top = topOffset;
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            btn.textContent = textContent;
            btn.onclick = function () {
                _this.camera.postQueues = [];
                func();
                console.log("Handle Clicking..." + textContent);
            };
        };
        test_posteffect.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 2.25, -z2 * 10);
                objCam.updateWorldTran();
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
            }
            var isbreak = false;
            if (isbreak)
                return;
            if (this.light != null) {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
                objlight.updateWorldTran();
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objlight.markDirty();
            }
        };
        return test_posteffect;
    }());
    t.test_posteffect = test_posteffect;
})(t || (t = {}));
var t;
(function (t) {
    var TestRotate = (function () {
        function TestRotate() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.counttimer = 0;
            this.name = "rock256.png";
            this.angularVelocity = new gd3d.math.vector3(10, 0, 0);
            this.eulerAngle = gd3d.math.pool.new_vector3();
            this.zeroPoint = new gd3d.math.vector3(0, 0, 0);
            this.startdir = new gd3d.math.vector3(-1, 0, 0);
            this.enddir = new gd3d.math.vector3(0, 0, -1);
            this.targetdir = new gd3d.math.vector3();
        }
        TestRotate.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        TestRotate.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        TestRotate.prototype.loadPvr = function (laststate, state) {
            this.app.getAssetMgr().load("res/resources/" + this.name, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
            });
        };
        TestRotate.prototype.changeShader = function () {
            var _this = this;
            var btn = document.createElement("button");
            btn.textContent = "save";
            btn.onclick = function () {
                var trans = _this.cube;
                var name = trans.name;
                var prefab = new gd3d.framework.prefab(name + ".prefab.json");
                prefab.assetbundle = name + ".assetbundle.json";
                prefab.apply(trans);
                _this.app.getAssetMgr().use(prefab);
                _this.app.getAssetMgr().savePrefab(trans, name + ".prefab.json", function (data, resourses, content) {
                    console.log(data);
                });
            };
            btn.style.top = "160px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        TestRotate.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 1000;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
        };
        TestRotate.prototype.addcube = function (laststate, state) {
            {
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null) {
                        console.log("sh 不是空的");
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        if (texture == null)
                            console.error("为什么他是空的呀");
                        else {
                            console.log("texture 不是空的");
                            cuber.materials[0].setTexture("_MainTex", texture);
                        }
                    }
                    this.cube = cube;
                }
                {
                    var ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 1;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("shader/def");
                    if (sh != null) {
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName(this.name);
                        renderer.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube2 = ref_cube;
                }
                {
                    this.cubetrail = new gd3d.framework.transform();
                    this.cubetrail.localScale.x = this.cubetrail.localScale.y = this.cubetrail.localScale.z = 0.2;
                    this.cubetrail.localTranslate.x = -3;
                    var mesh = this.cubetrail.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = smesh;
                    this.cubetrail.gameObject.addComponent("meshRenderer");
                    this.scene.addChild(this.cubetrail);
                    this.cubetrail.markDirty();
                }
            }
            state.finish = true;
        };
        TestRotate.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadPvr.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.changeShader();
        };
        TestRotate.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.cube != null) {
                this.cube.localTranslate.x = Math.cos(this.timer) * 3.0;
                this.cube.localTranslate.z = Math.sin(this.timer) * 3.0;
                this.cube.lookatPoint(this.zeroPoint);
                this.cube.markDirty();
            }
            if (this.cube2) {
                this.cube2.lookatPoint(this.cube.getWorldTranslate());
                this.cube2.markDirty();
            }
            if (this.cubetrail) {
                var cube = this.cubetrail.clone();
                this.scene.addChild(cube);
                gd3d.math.vec3ScaleByNum(this.targetdir, 3, this.targetdir);
                gd3d.math.vec3Clone(this.targetdir, cube.localTranslate);
                cube.markDirty();
            }
        };
        return TestRotate;
    }());
    t.TestRotate = TestRotate;
})(t || (t = {}));
var test_ShadowMap = (function () {
    function test_ShadowMap() {
        this.shadowSh = "shadowmap.shader.json";
        this.mats = [];
        this.timer = 0;
        this.posToUV = new gd3d.math.matrix();
        this.lightProjection = new gd3d.math.matrix();
    }
    test_ShadowMap.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.assetmgr = this.app.getAssetMgr();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        var name = "baihu";
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/scenes/testshadowmap/testshadowmap.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _scene = _this.app.getAssetMgr().getAssetByName("testshadowmap.scene.json");
                        var _root = _scene.getSceneRoot();
                        var assetmgr = _this.app.getAssetMgr();
                        _this.scene.addChild(_root);
                        _root.markDirty();
                        var _aabb = _root.aabb;
                        console.log(_aabb.maximum + " : " + _aabb.minimum);
                        _this.FitToScene(_this.lightcamera, _aabb);
                        _this.ShowCameraInfo(_this.lightcamera);
                        {
                            var depth = new gd3d.framework.cameraPostQueue_Depth();
                            depth.renderTarget = new gd3d.render.glRenderTarget(_this.scene.webgl, 1024, 1024, true, false);
                            _this.lightcamera.postQueues.push(depth);
                            _this.depthTexture = new gd3d.framework.texture("_depth");
                            _this.depthTexture.glTexture = depth.renderTarget;
                        }
                        {
                        }
                        _this.collectMat();
                        _this.mats.forEach(function (element) {
                            if (element)
                                element.setTexture("_Light_Depth", _this.depthTexture);
                        });
                    }
                });
            }
        });
        var lightCamObj = new gd3d.framework.transform();
        lightCamObj.name = "LightCamera";
        this.scene.addChild(lightCamObj);
        lightCamObj.localTranslate = new gd3d.math.vector3(10, 10, -10);
        this.lightcamera = lightCamObj.gameObject.addComponent("camera");
        this.lightcamera.opvalue = 0;
        this.lightcamera.gameObject.transform.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        lightCamObj.markDirty();
        var viewCamObj = new gd3d.framework.transform();
        viewCamObj.name = "ViewCamera";
        this.scene.addChild(viewCamObj);
        viewCamObj.localTranslate = new gd3d.math.vector3(20, 20, 20);
        viewCamObj.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        this.viewcamera = viewCamObj.gameObject.addComponent("camera");
        viewCamObj.markDirty();
        this.ShowUI();
    };
    test_ShadowMap.prototype.collectMat = function () {
        if (!this.assetmgr)
            return;
        var resmap = this.assetmgr.mapRes;
        for (var key in resmap) {
            var asset = resmap[key];
            if (!asset["asset"] || !(asset["asset"] instanceof gd3d.framework.material))
                continue;
            var mat = asset["asset"];
            if (!mat["shader"] || mat["shader"].getName() != this.shadowSh)
                continue;
            this.mats.push(mat);
        }
    };
    test_ShadowMap.prototype.setmat = function (key, value) {
        var _this = this;
        if (!this.mats)
            return;
        this.mats.forEach(function (element) {
            if (element)
                element.setTexture("_Light_Depth", _this.depthTexture);
        });
    };
    test_ShadowMap.prototype.update = function (delta) {
        var _this = this;
        this.posToUV.rawData[0] = 0.5;
        this.posToUV.rawData[1] = 0.0;
        this.posToUV.rawData[2] = 0.0;
        this.posToUV.rawData[3] = 0.0;
        this.posToUV.rawData[4] = 0.0;
        this.posToUV.rawData[5] = 0.5;
        this.posToUV.rawData[6] = 0.0;
        this.posToUV.rawData[7] = 0.0;
        this.posToUV.rawData[8] = 0.0;
        this.posToUV.rawData[9] = 0.0;
        this.posToUV.rawData[10] = 1.0;
        this.posToUV.rawData[11] = 0.0;
        this.posToUV.rawData[12] = 0.5;
        this.posToUV.rawData[13] = 0.5;
        this.posToUV.rawData[14] = 0.0;
        this.posToUV.rawData[15] = 1.0;
        var worldToView = gd3d.math.pool.new_matrix();
        this.lightcamera.calcViewMatrix(worldToView);
        var vpp = new gd3d.math.rect();
        this.lightcamera.calcViewPortPixel(this.app, vpp);
        this.asp = vpp.w / vpp.h;
        var projection = gd3d.math.pool.new_matrix();
        this.lightcamera.calcProjectMatrix(this.asp, projection);
        gd3d.math.matrixMultiply(projection, worldToView, this.lightProjection);
        gd3d.math.matrixMultiply(this.posToUV, this.lightProjection, this.lightProjection);
        this.mats.forEach(function (element) {
            if (element) {
                element.setMatrix("_LightProjection", _this.lightProjection);
                if (element)
                    element.setFloat("_bias", 0.001);
            }
        });
    };
    test_ShadowMap.prototype.FitToScene = function (lightCamera, aabb) {
        lightCamera.gameObject.transform.setWorldPosition(new gd3d.math.vector3(aabb.center.x, aabb.center.y, aabb.center.z));
        var _vec3 = gd3d.math.pool.new_vector3();
        gd3d.math.vec3Subtract(aabb.maximum, aabb.minimum, _vec3);
        var maxLength = gd3d.math.vec3Length(_vec3);
        lightCamera.size = maxLength;
        lightCamera.near = -maxLength / 2;
        lightCamera.far = maxLength / 2;
    };
    test_ShadowMap.prototype.ShowUI = function () {
        var _this = this;
        document.addEventListener("keydown", function (ev) {
            if (ev.key === "c") {
                if (_this.viewcamera.postQueues.length > 0)
                    _this.viewcamera.postQueues = [];
                else {
                    var post = new gd3d.framework.cameraPostQueue_Quad();
                    post.material.setShader(_this.scene.app.getAssetMgr().getShader("mask.shader.json"));
                    post.material.setTexture("_MainTex", _this.depthTexture);
                    _this.viewcamera.postQueues.push(post);
                }
            }
        });
        this.labelNear = document.createElement("label");
        this.labelNear.style.top = "100px";
        this.labelNear.style.position = "absolute";
        this.app.container.appendChild(this.labelNear);
        this.inputNear = document.createElement("input");
        this.inputNear.type = "range";
        this.inputNear.min = "-15";
        this.inputNear.max = "15";
        this.inputNear.step = "0.1";
        this.inputNear.oninput = function () {
            var _value = parseFloat(_this.inputNear.value);
            if (_value > _this.lightcamera.far) {
                _value = _this.lightcamera.far;
                _this.inputNear.value = _value.toString();
            }
            _this.labelNear.textContent = "near :" + _value;
            _this.lightcamera.near = _value;
        };
        this.inputNear.style.top = "124px";
        this.inputNear.style.position = "absolute";
        this.app.container.appendChild(this.inputNear);
        this.labelFar = document.createElement("label");
        this.labelFar.style.top = "225px";
        this.labelFar.style.position = "absolute";
        this.app.container.appendChild(this.labelFar);
        this.inputFar = document.createElement("input");
        this.inputFar.type = "range";
        this.inputFar.min = "-15";
        this.inputFar.max = "15";
        this.inputFar.step = "0.1";
        this.inputFar.oninput = function () {
            var _value = parseFloat(_this.inputFar.value);
            if (_value < _this.lightcamera.near) {
                _value = _this.lightcamera.near;
                _this.inputFar.value = _value.toString();
            }
            _this.labelFar.textContent = "far :" + _value;
            _this.lightcamera.far = _value;
        };
        this.inputFar.style.top = "250px";
        this.inputFar.style.position = "absolute";
        this.app.container.appendChild(this.inputFar);
        var cameraRotateLabel = document.createElement("label");
        cameraRotateLabel.style.top = "375px";
        cameraRotateLabel.style.position = "absolute";
        cameraRotateLabel.textContent = "改变灯光角度";
        this.app.container.appendChild(cameraRotateLabel);
        var inputCameraRotateY = document.createElement("input");
        inputCameraRotateY.type = "range";
        inputCameraRotateY.min = "-180";
        inputCameraRotateY.max = "180";
        inputCameraRotateY.step = "1";
        inputCameraRotateY.oninput = function () {
            var _value = parseFloat(inputCameraRotateY.value);
            var _angle = _this.lightcamera.gameObject.transform.localEulerAngles;
            _this.lightcamera.gameObject.transform.localEulerAngles = new gd3d.math.vector3(_angle.x, _value, _angle.z);
            _this.lightcamera.gameObject.transform.markDirty();
        };
        inputCameraRotateY.style.top = "400px";
        inputCameraRotateY.style.position = "absolute";
        this.app.container.appendChild(inputCameraRotateY);
    };
    test_ShadowMap.prototype.ShowCameraInfo = function (camera) {
        var near = camera.near.toString();
        var far = camera.far.toString();
        this.inputNear.value = near;
        this.inputFar.value = far;
        this.labelNear.textContent = "near :" + near;
        this.labelFar.textContent = "far :" + far;
    };
    return test_ShadowMap;
}());
var t;
(function (t) {
    var test_skillsystem = (function () {
        function test_skillsystem() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.counttimer = 0;
            this.role = new gd3d.framework.transform();
            this.angularVelocity = new gd3d.math.vector3(0, 10, 0);
            this.eulerAngle = gd3d.math.pool.new_vector3();
        }
        test_skillsystem.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_skillsystem.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_skillsystem.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 120;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, 0);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            state.finish = true;
        };
        test_skillsystem.prototype.addcube = function (laststate, state) {
            {
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube = cube;
                }
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube2 = cube;
                }
            }
            state.finish = true;
        };
        test_skillsystem.prototype.loadRole = function (laststate, state) {
            var _this = this;
            this.role.name = "role";
            this.app.getAssetMgr().load("res/prefabs/0000_zs_male/0000_zs_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0000_zs_male.prefab.json");
                    _this.role = _prefab.getCloneTrans();
                    _this.scene.addChild(_this.role);
                    _this.role.localScale = new gd3d.math.vector3(1, 1, 1);
                    _this.role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    _this.role.gameObject.visible = true;
                    var ap = _this.role.gameObject.getComponent("aniplayer");
                    ap.autoplay = true;
                    {
                        var play = document.createElement("button");
                        play.textContent = "play1";
                        play.onclick = function () {
                            _this.playAniAndEffect(ap, "attack_01", "fx_zs_male@attack_01", 0, 0);
                            _this.playAniAndEffect(ap, "attack_04", "fx_zs_male@attack_03", 3000, 1000);
                            setInterval(function () {
                                _this.playAniAndEffect(ap, "attack_01", "fx_zs_male@attack_01", 0, 0);
                                _this.playAniAndEffect(ap, "attack_04", "fx_zs_male@attack_03", 3000, 1000);
                            }, 6000);
                        };
                        play.style.left = "0px";
                        play.style.top = "240px";
                        play.style.position = "absolute";
                        _this.app.container.appendChild(play);
                    }
                }
                state.finish = true;
            });
        };
        test_skillsystem.prototype.playAniAndEffect = function (aniplayer, aniName, effectName, playAniDelay, afterAni_PlayEffectDelay) {
            var _this = this;
            {
                setTimeout(function () {
                    var aniclipName = aniName + ".FBAni.aniclip.bin";
                    aniplayer.playCross(aniclipName, 0.2);
                    setTimeout(function () {
                        if (_this.effect != null) {
                            _this.effect.gameObject.transform.dispose();
                        }
                        var path = "res/particleEffect/" + effectName + "/" + effectName + ".assetbundle.json";
                        _this.app.getAssetMgr().load(path, gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                            if (_state.isfinish) {
                                var tr = new gd3d.framework.transform();
                                _this.effect = tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM);
                                var text = _this.app.getAssetMgr().getAssetByName(effectName + ".effect.json");
                                _this.effect.setJsonData(text);
                                _this.role.addChild(tr);
                                var rotateVelocity = gd3d.math.pool.new_quaternion();
                                gd3d.math.quatFromEulerAngles(180, 0, 0, rotateVelocity);
                                gd3d.math.quatMultiply(rotateVelocity, tr.localRotate, tr.localRotate);
                                gd3d.math.pool.delete_quaternion(rotateVelocity);
                                tr.markDirty();
                                tr.updateWorldTran();
                            }
                        });
                    }, afterAni_PlayEffectDelay);
                }, playAniDelay);
            }
        };
        test_skillsystem.prototype.loadEffect = function (laststate, state) {
            var _this = this;
            var name = "fx_zs_male@attack_01";
            var path = "res/particleEffect/" + name + "/" + name + ".assetbundle.json";
            this.app.getAssetMgr().load(path, gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    var tr = new gd3d.framework.transform();
                    _this.effect = tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM);
                    var text = _this.app.getAssetMgr().getAssetByName(name + ".effect.json");
                    _this.effect.setJsonData(text);
                    _this.role.addChild(tr);
                    var rotateVelocity = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatFromEulerAngles(180, 0, 0, rotateVelocity);
                    gd3d.math.quatMultiply(rotateVelocity, tr.localRotate, tr.localRotate);
                    gd3d.math.pool.delete_quaternion(rotateVelocity);
                    tr.markDirty();
                    tr.updateWorldTran();
                    state.finish = true;
                }
            });
        };
        test_skillsystem.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.loadEffect.bind(this));
        };
        test_skillsystem.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.role != null) {
                var cubeTransform = this.role.gameObject.transform;
                this.eulerAngle.x = delta * this.angularVelocity.x;
                this.eulerAngle.y = delta * this.angularVelocity.y;
                this.eulerAngle.z = delta * this.angularVelocity.z;
                var rotateVelocity = gd3d.math.pool.new_quaternion();
                gd3d.math.quatFromEulerAngles(this.eulerAngle.x, this.eulerAngle.y, this.eulerAngle.z, rotateVelocity);
                gd3d.math.quatMultiply(rotateVelocity, cubeTransform.localRotate, cubeTransform.localRotate);
                gd3d.math.pool.delete_quaternion(rotateVelocity);
                cubeTransform.markDirty();
            }
        };
        return test_skillsystem;
    }());
    t.test_skillsystem = test_skillsystem;
})(t || (t = {}));
var t;
(function (t) {
    var test_sound = (function () {
        function test_sound() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.counttimer = 0;
            this.angularVelocity = new gd3d.math.vector3(10, 0, 0);
            this.eulerAngle = gd3d.math.pool.new_vector3();
            this.loopedBuffer = null;
            this.once1 = null;
            this.once2 = null;
        }
        test_sound.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_sound.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_sound.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 120;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
            CameraController.instance().init(this.app, this.camera);
        };
        test_sound.prototype.addcube = function (laststate, state) {
            {
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube = cube;
                }
            }
            state.finish = true;
        };
        test_sound.prototype.loadSoundInfe = function (laststate, state) {
            var _this = this;
            {
                var listener = this.camera.gameObject.addComponent("AudioListener");
                var tr = new gd3d.framework.transform();
                var player_1 = tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_AUDIOPLAYER);
                player_1.be3DSound = false;
                this.scene.addChild(tr);
                tr.localTranslate = new gd3d.math.vector3(0, 0, 0);
                {
                    var button = document.createElement("button");
                    button.textContent = "play once1";
                    button.onclick = function () {
                        gd3d.framework.AudioEx.instance().loadAudioBuffer("res/audio/sound1.mp3", function (buf, err) {
                            _this.once1 = buf;
                            player_1.play(_this.once1, false, 10);
                        });
                    };
                    button.style.top = "130px";
                    button.style.position = "absolute";
                    this.app.container.appendChild(button);
                }
                {
                    var button = document.createElement("button");
                    button.textContent = "play once2";
                    button.onclick = function () {
                        gd3d.framework.AudioEx.instance().loadAudioBuffer("res/audio/sound2.mp3", function (buf, err) {
                            _this.once2 = buf;
                            player_1.play(_this.once2, true, 1);
                        });
                    };
                    button.style.top = "130px";
                    button.style.left = "90px";
                    button.style.position = "absolute";
                    this.app.container.appendChild(button);
                }
                {
                    var button = document.createElement("button");
                    button.textContent = "play loop";
                    button.onclick = function () {
                        gd3d.framework.AudioEx.instance().loadAudioBuffer("res/audio/music1.mp3", function (buf, err) {
                            _this.loopedBuffer = buf;
                            player_1.play(buf, false, 1);
                        });
                    };
                    button.style.top = "160px";
                    button.style.position = "absolute";
                    this.app.container.appendChild(button);
                }
                {
                    var button = document.createElement("button");
                    button.textContent = "stop loop";
                    button.onclick = function () {
                        player_1.stop();
                    };
                    button.style.top = "160px";
                    button.style.left = "90px";
                    button.style.position = "absolute";
                    this.app.container.appendChild(button);
                }
                {
                    document.body.appendChild(document.createElement("p"));
                    var input = document.createElement("input");
                    input.type = "range";
                    input.valueAsNumber = 5;
                    player_1.volume = input.valueAsNumber / 100;
                    input.oninput = function (e) {
                        player_1.volume = input.valueAsNumber / 100;
                    };
                    input.style.top = "190px";
                    input.style.position = "absolute";
                    this.app.container.appendChild(input);
                }
            }
            state.finish = true;
        };
        test_sound.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.taskmgr.addTaskCall(this.loadSoundInfe.bind(this));
            gd3d.framework.AudioEx.instance().clickInit();
        };
        test_sound.prototype.update = function (delta) {
            CameraController.instance().update(delta);
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.cube != null) {
                var cubeTransform = this.cube.gameObject.transform;
                this.eulerAngle.x = delta * this.angularVelocity.x * 10;
                this.eulerAngle.y = delta * this.angularVelocity.y;
                this.eulerAngle.z = delta * this.angularVelocity.z;
                var rotateVelocity = gd3d.math.pool.new_quaternion();
                gd3d.math.quatFromEulerAngles(this.eulerAngle.x, this.eulerAngle.y, this.eulerAngle.z, rotateVelocity);
                gd3d.math.quatMultiply(rotateVelocity, cubeTransform.localRotate, cubeTransform.localRotate);
                cubeTransform.markDirty();
            }
        };
        return test_sound;
    }());
    t.test_sound = test_sound;
})(t || (t = {}));
var test_streamlight = (function () {
    function test_streamlight() {
        this.cubes = {};
        this.timer = 0;
    }
    test_streamlight.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        var baihu = new gd3d.framework.transform();
        baihu.name = "baihu";
        baihu.localScale.x = baihu.localScale.y = baihu.localScale.z = 1;
        this.scene.addChild(baihu);
        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            var light = lighttran.gameObject.addComponent("light");
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/prefabs/streamlight/anim/0001_shengyi_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName("0001_shengyi_male.prefab.json");
                        baihu = _prefab.getCloneTrans();
                        _this.player = baihu;
                        _this.scene.addChild(baihu);
                        objCam.lookat(baihu);
                        objCam.markDirty();
                        var bb = _prefab.getCloneTrans();
                        _this.scene.addChild(bb);
                        bb.localTranslate = new gd3d.math.vector3(2, 0, 0);
                        bb.markDirty();
                        var bodyRenderer = bb.children[0].gameObject.getComponent("skinnedMeshRenderer");
                        var mat = bodyRenderer.materials[0].clone();
                        bodyRenderer.materials[0] = mat;
                        mat.setVector4("_LightTex_ST", new gd3d.math.vector4(2, 2, 0, 0));
                        console.log("aaa");
                    }
                });
            }
        });
        this.cube = baihu;
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(baihu);
        objCam.markDirty();
    };
    test_streamlight.prototype.update = function (delta) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 1.1);
        var z2 = Math.cos(this.timer * 1.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();
        objCam.updateWorldTran();
    };
    return test_streamlight;
}());
var t;
(function (t) {
    var test_trailrenderrecorde = (function () {
        function test_trailrenderrecorde() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.WaveFrequency = 4.0;
            this.WaveAmplitude = 0.05;
            this.play = true;
        }
        test_trailrenderrecorde.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_trailrenderrecorde.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/trailtest2_00000.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/swingFX.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_trailrenderrecorde.prototype.loadRole = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/0000_zs_male/0000_zs_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0000_zs_male.prefab.json");
                    _this.role = _prefab.getCloneTrans();
                    _this.role.name = "role";
                    _this.roleLength = _this.role.children.length;
                    _this.scene.addChild(_this.role);
                    _this.role.localScale = new gd3d.math.vector3(1, 1, 1);
                    _this.role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    _this.role.gameObject.visible = true;
                    _this.role.markDirty();
                    _this.role.updateWorldTran();
                    _this.aniplayer = _this.role.gameObject.getComponent("aniplayer");
                    state.finish = true;
                }
            });
        };
        test_trailrenderrecorde.prototype.loadWeapon = function (laststate, state) {
            var _this = this;
            this.app.getAssetMgr().load("res/prefabs/0002_sword_sword/0002_sword_sword.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    if (_this.weapon)
                        _this.weapon.parent.removeChild(_this.weapon);
                    var _prefab = _this.app.getAssetMgr().getAssetByName("0002_sword_sword.prefab.json");
                    _this.weapon = _prefab.getCloneTrans();
                    _this.weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    _this.weapon.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    var obj = _this.role.find("Bip001 Prop1");
                    obj.addChild(_this.weapon);
                    state.finish = true;
                }
            });
        };
        test_trailrenderrecorde.prototype.initscene = function (laststate, state) {
            {
                var objCam = new gd3d.framework.transform();
                objCam.name = "sth.";
                this.scene.addChild(objCam);
                this.camera = objCam.gameObject.addComponent("camera");
                this.camera.near = 0.01;
                this.camera.far = 100;
                this.camera.fov = Math.PI * 0.3;
                this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
                objCam.localTranslate = new gd3d.math.vector3(0, 5, -5);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
                {
                    var org = new gd3d.framework.transform();
                    org.name = "org";
                    this.org = org;
                    this.scene.addChild(org);
                }
                {
                    var ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 5;
                    ref_cube.localTranslate.y = -2;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("plane");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json");
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        var texture = this.app.getAssetMgr().getAssetByName("rock256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                    this.cube2 = ref_cube;
                }
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    this.cube = cube;
                    org.addChild(cube);
                    cube.localTranslate.x = -5;
                    cube.markDirty();
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.z = 0.5;
                    this.weapon.addChild(trailtrans);
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_right, 270, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender_recorde");
                    trailrender.setWidth(1);
                    var mat = new gd3d.framework.material();
                    var shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json");
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json");
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex);
                    trailrender.material = mat;
                    trailrender.setWidth(1, 1);
                }
            }
            state.finish = true;
        };
        test_trailrenderrecorde.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.wind = new gd3d.math.vector4();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.loadWeapon.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            var tbn1 = this.addbtn("80px", "0px", "attack_01");
            tbn1.onclick = function () {
                var name = "attack_01.FBAni.aniclip.bin";
                _this.aniplayer.playCross(name, 0.2);
            };
            var btn = this.addbtn("120px", "0px", "attack_02");
            btn.onclick = function () {
                var name = "attack_02.FBAni.aniclip.bin";
                _this.aniplayer.playCross(name, 0.2);
            };
            {
                var btn2 = this.addbtn("160px", "0px", "playAttackAni");
                btn2.onclick = function () {
                    var name = "attack_04.FBAni.aniclip.bin";
                    _this.aniplayer.playCross(name, 0.2);
                };
            }
        };
        test_trailrenderrecorde.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
        };
        test_trailrenderrecorde.prototype.addbtn = function (top, left, text) {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = text;
            this.app.container.appendChild(btn);
            return btn;
        };
        return test_trailrenderrecorde;
    }());
    t.test_trailrenderrecorde = test_trailrenderrecorde;
})(t || (t = {}));
var test_texuv = (function () {
    function test_texuv() {
        this.timer = 0;
    }
    test_texuv.prototype.start = function (app) {
        var _this = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
            if (state.isfinish) {
                _this.app.getAssetMgr().load("res/trailtest_yellow.png", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                    if (state.isfinish) {
                        var mat = t.DBgetMat("trailtest_yellow.png");
                        var trans1 = t.DBgetAtrans(mat);
                        _this.scene.addChild(trans1);
                        var mat2 = t.DBgetMat(null, "testtexuv.shader.json");
                        var trans2 = t.DBgetAtrans(mat2);
                        _this.scene.addChild(trans2);
                        trans1.localTranslate.x = -1;
                        trans2.localTranslate.x = 1;
                        trans1.markDirty();
                        trans2.markDirty();
                    }
                });
            }
        });
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 2, 5);
        objCam.lookatPoint(new gd3d.math.vector3());
        objCam.markDirty();
    };
    test_texuv.prototype.update = function (delta) {
    };
    return test_texuv;
}());
var t;
(function (t) {
    var test_trailrender = (function () {
        function test_trailrender() {
            this.texResName = "trailtest2_00000.imgdesc.json";
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.WaveFrequency = 4.0;
            this.WaveAmplitude = 0.05;
            this.play = true;
        }
        test_trailrender.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        test_trailrender.prototype.loadText = function (laststate, state) {
            var i = 2;
            this.app.getAssetMgr().load("res/swingFX.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    i--;
                    if (i == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
            this.app.getAssetMgr().load("res/" + this.texResName, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    i--;
                    if (i == 0) {
                        state.finish = true;
                    }
                }
                else {
                    state.error = true;
                }
            });
        };
        test_trailrender.prototype.initscene = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 100;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0, 0, 0, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 20, -20);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            {
                var org = new gd3d.framework.transform();
                org.name = "org";
                this.org = org;
                this.scene.addChild(org);
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                this.cube = cube;
                org.addChild(cube);
                cube.localTranslate.x = -5;
                cube.localScale.y = 0.1;
                cube.localScale.z = 0.5;
                cube.localScale.x = 5;
                cube.markDirty();
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var trailtrans = new gd3d.framework.transform();
                trailtrans.localTranslate.x = -10;
                org.addChild(trailtrans);
                trailtrans.markDirty();
                var trailrender = trailtrans.gameObject.addComponent("trailRender");
                var mat = new gd3d.framework.material();
                var shader = this.app.getAssetMgr().getShader("particles_add.shader.json");
                var tex = this.app.getAssetMgr().getAssetByName("" + this.texResName);
                mat.setShader(shader);
                mat.setTexture("_Main_Tex", tex);
                trailrender.setspeed(0.3);
                trailrender.setWidth(5);
                trailrender.material = mat;
                trailrender.lookAtCamera = true;
                trailrender.extenedOneSide = false;
                trailrender.play();
            }
            state.finish = true;
        };
        test_trailrender.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.wind = new gd3d.math.vector4();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            var tbn = this.addbtn("80px", "0px", "start");
            tbn.onclick = function () {
                _this.play = true;
            };
            var btn = this.addbtn("120px", "0px", "stop");
            btn.onclick = function () {
                _this.play = false;
            };
        };
        test_trailrender.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            if (this.org != undefined && this.play) {
                this.timer++;
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 5, this.org.localRotate);
                this.org.markDirty();
            }
        };
        test_trailrender.prototype.addbtn = function (top, left, text) {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = text;
            this.app.container.appendChild(btn);
            return btn;
        };
        return test_trailrender;
    }());
    t.test_trailrender = test_trailrender;
})(t || (t = {}));
var t;
(function (t_2) {
    var enumcheck;
    (function (enumcheck) {
        enumcheck[enumcheck["AA"] = 0] = "AA";
        enumcheck[enumcheck["BB"] = 1] = "BB";
        enumcheck[enumcheck["CC"] = 2] = "CC";
    })(enumcheck = t_2.enumcheck || (t_2.enumcheck = {}));
    var enummap = {};
    var test_ui = (function () {
        function test_ui() {
            this.amount = 1;
            this.timer = 0;
            this.bere = false;
            this.bere1 = false;
        }
        test_ui.prototype.start = function (app) {
            var _this = this;
            enummap["enumcheck"] = enumcheck;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            var cuber;
            console.warn("Finish it.");
            this.app.getAssetMgr().load("res/zg256.png");
            var sh = this.app.getAssetMgr().getShader("color");
            if (sh != null) {
                cuber.materials = [];
                cuber.materials.push(new gd3d.framework.material());
                cuber.materials[0].setShader(sh);
                this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        console.warn("Finish load img.");
                        var texture = _this.app.getAssetMgr().getAssetByName("zg256.png");
                        cuber.materials[0].setTexture("_MainTex", texture);
                    }
                });
            }
            var cube = new gd3d.framework.transform();
            cube.name = "cube";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter");
            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = (smesh);
            var renderer = cube.gameObject.addComponent("meshRenderer");
            cuber = renderer;
            this.cube = cube;
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 10;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookat(cube);
            objCam.markDirty();
            var o2d = new gd3d.framework.overlay2D();
            this.camera.addOverLay(o2d);
            {
                var t2d = new gd3d.framework.transform2D();
                t2d.width = 150;
                t2d.height = 150;
                t2d.pivot.x = 0;
                t2d.pivot.y = 0;
                t2d.markDirty();
                t2d.addComponent("rawImage2D");
                o2d.addChild(t2d);
            }
            {
                var t2d_1 = new gd3d.framework.transform2D();
                t2d_1.width = 150;
                t2d_1.height = 150;
                t2d_1.pivot.x = 0;
                t2d_1.pivot.y = 0;
                t2d_1.localTranslate.x = 150;
                var img_1_1 = t2d_1.addComponent("image2D");
                img_1_1.imageType = gd3d.framework.ImageType.Simple;
                o2d.addChild(t2d_1);
                var t2d_2 = new gd3d.framework.transform2D();
                t2d_2.width = 150;
                t2d_2.height = 150;
                t2d_2.pivot.x = 0;
                t2d_2.pivot.y = 0;
                t2d_2.localTranslate.x = 300;
                var img_2_1 = t2d_2.addComponent("image2D");
                img_2_1.imageType = gd3d.framework.ImageType.Sliced;
                o2d.addChild(t2d_2);
                var t2d_3 = new gd3d.framework.transform2D();
                t2d_3.width = 150;
                t2d_3.height = 150;
                t2d_3.pivot.x = 0;
                t2d_3.pivot.y = 0;
                t2d_3.localTranslate.x = 450;
                this.img_3 = t2d_3.addComponent("image2D");
                this.img_3.imageType = gd3d.framework.ImageType.Filled;
                this.img_3.fillMethod = gd3d.framework.FillMethod.Vertical;
                this.img_3.fillAmmount = 1;
                o2d.addChild(t2d_3);
                var t2d_4 = new gd3d.framework.transform2D();
                t2d_4.width = 150;
                t2d_4.height = 150;
                t2d_4.pivot.x = 0;
                t2d_4.pivot.y = 0;
                t2d_4.localTranslate.x = 600;
                this.img_4 = t2d_4.addComponent("image2D");
                this.img_4.imageType = gd3d.framework.ImageType.Filled;
                this.img_4.fillMethod = gd3d.framework.FillMethod.Horizontal;
                this.img_4.fillAmmount = 1;
                o2d.addChild(t2d_4);
                var t2d_5 = new gd3d.framework.transform2D();
                t2d_5.width = 150;
                t2d_5.height = 150;
                t2d_5.pivot.x = 0;
                t2d_5.pivot.y = 0;
                t2d_5.localTranslate.x = 750;
                this.img_5 = t2d_5.addComponent("image2D");
                this.img_5.imageType = gd3d.framework.ImageType.Filled;
                this.img_5.fillMethod = gd3d.framework.FillMethod.Radial_90;
                this.img_5.fillAmmount = 1;
                o2d.addChild(t2d_5);
                var t2d_6 = new gd3d.framework.transform2D();
                t2d_6.width = 150;
                t2d_6.height = 150;
                t2d_6.pivot.x = 0;
                t2d_6.pivot.y = 0;
                t2d_6.localTranslate.x = 150;
                t2d_6.localTranslate.y = 150;
                var img_6_1 = t2d_6.addComponent("image2D");
                img_6_1.imageType = gd3d.framework.ImageType.Tiled;
                o2d.addChild(t2d_6);
                var t2d_7 = new gd3d.framework.transform2D();
                t2d_7.width = 150;
                t2d_7.height = 150;
                t2d_7.pivot.x = 0;
                t2d_7.pivot.y = 0;
                t2d_7.localTranslate.x = 300;
                t2d_7.localTranslate.y = 150;
                this.img_7 = t2d_7.addComponent("image2D");
                this.img_7.imageType = gd3d.framework.ImageType.Filled;
                this.img_7.fillMethod = gd3d.framework.FillMethod.Radial_180;
                this.img_7.fillAmmount = 1;
                o2d.addChild(t2d_7);
                var t2d_8 = new gd3d.framework.transform2D();
                t2d_8.width = 150;
                t2d_8.height = 150;
                t2d_8.pivot.x = 0;
                t2d_8.pivot.y = 0;
                t2d_8.localTranslate.x = 450;
                t2d_8.localTranslate.y = 150;
                this.img_8 = t2d_8.addComponent("image2D");
                this.img_8.imageType = gd3d.framework.ImageType.Filled;
                this.img_8.fillMethod = gd3d.framework.FillMethod.Radial_360;
                this.img_8.fillAmmount = 1;
                o2d.addChild(t2d_8);
                var t2d_9 = new gd3d.framework.transform2D();
                t2d_9.width = 150;
                t2d_9.height = 50;
                t2d_9.pivot.x = 0;
                t2d_9.pivot.y = 0;
                t2d_9.localTranslate.x = 150;
                t2d_9.localTranslate.y = 300;
                var btn = t2d_9.addComponent("button");
                var img9_1 = t2d_9.addComponent("image2D");
                img9_1.imageType = gd3d.framework.ImageType.Sliced;
                btn.targetImage = img9_1;
                btn.transition = gd3d.framework.TransitionType.ColorTint;
                btn.addListener(gd3d.event.UIEventEnum.PointerClick, function () {
                    console.log("按钮点下了");
                }, this);
                o2d.addChild(t2d_9);
                var lab = new gd3d.framework.transform2D();
                lab.name = "lab111";
                lab.width = 150;
                lab.height = 50;
                lab.pivot.x = 0;
                lab.pivot.y = 0;
                lab.localTranslate.y = -10;
                lab.markDirty();
                var label = lab.addComponent("label");
                label.text = "这是按钮";
                label.fontsize = 25;
                label.color = new gd3d.math.color(1, 0, 0, 1);
                t2d_9.addChild(lab);
                this.app.getAssetMgr().load("res/1.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.app.getAssetMgr().load("res/resources/1.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                            if (state.isfinish) {
                                var atlas = _this.app.getAssetMgr().getAssetByName("1.atlas.json");
                                img_1_1.sprite = _this.app.getAssetMgr().getDefaultSprite("grid_sprite");
                                img_2_1.sprite = atlas.sprites["card_role_1_face"];
                                img_2_1.sprite.border = new gd3d.math.border(10, 10, 10, 10);
                                _this.img_3.sprite = atlas.sprites["card_role_1_face"];
                                _this.img_4.sprite = atlas.sprites["card_role_1_face"];
                                _this.img_5.sprite = atlas.sprites["card_role_1_face"];
                                img_6_1.sprite = atlas.sprites["card_role_1_face"];
                                _this.img_7.sprite = atlas.sprites["card_role_1_face"];
                                _this.img_8.sprite = atlas.sprites["card_role_1_face"];
                            }
                        });
                    }
                });
                this.app.getAssetMgr().load("res/uisprite.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var texture = _this.app.getAssetMgr().getAssetByName("uisprite.png");
                        img9_1.sprite = _this.app.getAssetMgr().getDefaultSprite("grid_sprite");
                    }
                });
                this.app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s1) {
                            if (s1.isfinish)
                                label.font = _this.app.getAssetMgr().getAssetByName("STXINGKA.font.json");
                        });
                    }
                });
            }
            var t = new gd3d.framework.transform();
            t.localScale.x = t.localScale.y = t.localScale.z = 1;
            var c2d = t.gameObject.addComponent("canvasRenderer");
            t.localTranslate.y = 1;
            this.scene.addChild(t);
            {
                var t2d = new gd3d.framework.transform2D();
                t2d.width = 400;
                t2d.height = 400;
                t2d.pivot.x = 0;
                t2d.pivot.y = 0;
                t2d.markDirty();
                t2d.addComponent("rawImage2D");
                c2d.addChild(t2d);
            }
            for (var i = 0; i < 10; i++) {
                var t2d = new gd3d.framework.transform2D();
                t2d.width = 50;
                t2d.height = 50;
                t2d.pivot.x = 0;
                t2d.pivot.y = 0;
                t2d.localTranslate.x = 100 * i;
                t2d.localRotate = i;
                t2d.markDirty();
                var img = t2d.addComponent("rawImage2D");
                img.color.b = i * 0.1;
                img.image = this.app.getAssetMgr().getDefaultTexture("white");
                c2d.addChild(t2d);
            }
        };
        test_ui.prototype.update = function (delta) {
            this.timer += delta;
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            var objCam = this.camera.gameObject.transform;
            objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            if (this.timer > 5 && !this.bere) {
                this.bere = true;
                this.app.closeFps();
            }
            if (this.timer > 10 && !this.bere1) {
                this.bere1 = true;
                this.app.showFps();
            }
            if ((this.amount + delta / 2) > 1)
                this.amount = 0;
            else
                this.amount += delta / 2;
            this.img_3.fillAmmount = this.amount;
            this.img_4.fillAmmount = this.amount;
            this.img_5.fillAmmount = this.amount;
            this.img_7.fillAmmount = this.amount;
            this.img_8.fillAmmount = this.amount;
        };
        return test_ui;
    }());
    t_2.test_ui = test_ui;
})(t || (t = {}));
var testUserCodeUpdate = (function () {
    function testUserCodeUpdate() {
        this.beExecuteInEditorMode = false;
        this.timer = 0;
    }
    testUserCodeUpdate.prototype.onStart = function (app) {
        this.app = app;
    };
    testUserCodeUpdate.prototype.onUpdate = function (delta) {
        if (this.trans == null || this.trans == undefined) {
            this.trans = this.app.getScene().getChildByName("Cube");
        }
        if (this.trans == null || this.trans == undefined)
            return;
        this.timer += delta * 15;
        gd3d.math.quatFromAxisAngle(new gd3d.math.vector3(0, 1, 0), this.timer, this.trans.localRotate);
        this.trans.markDirty();
    };
    testUserCodeUpdate.prototype.isClosed = function () {
        return false;
    };
    testUserCodeUpdate = __decorate([
        gd3d.reflect.userCode
    ], testUserCodeUpdate);
    return testUserCodeUpdate;
}());
var t;
(function (t) {
    var test_uvroll = (function () {
        function test_uvroll() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.count = 0;
            this.row = 3;
            this.col = 3;
            this.totalframe = 9;
            this.fps = 2;
        }
        test_uvroll.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish)
                    state.finish = true;
            });
        };
        test_uvroll.prototype.loadText = function (laststate, state) {
            this.app.getAssetMgr().load("res/uvSprite.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            });
        };
        test_uvroll.prototype.addcube = function (laststate, state) {
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                cube.localTranslate.x = -1;
                this.scene.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer");
                var cuber = renderer;
                var sh = this.app.getAssetMgr().getShader("sample_uvsprite.shader.json");
                if (sh != null) {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);
                    var texture = this.app.getAssetMgr().getAssetByName("uvSprite.png");
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
                this.cube = cube;
            }
            {
                var cube1 = new gd3d.framework.transform();
                cube1.name = "cube1";
                cube1.localScale.x = cube1.localScale.y = cube1.localScale.z = 1;
                cube1.localTranslate.x = 1;
                this.scene.addChild(cube1);
                var mesh1 = cube1.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh1.mesh = (smesh);
                var renderer1 = cube1.gameObject.addComponent("meshRenderer");
                var cuber1 = renderer1;
                var sh = this.app.getAssetMgr().getShader("uvroll.shader.json");
                if (sh != null) {
                    cuber1.materials = [];
                    cuber1.materials.push(new gd3d.framework.material());
                    cuber1.materials[0].setShader(sh);
                    var texture1 = this.app.getAssetMgr().getAssetByName("uvSprite.png");
                    cuber1.materials[0].setTexture("_MainTex", texture1);
                    cuber1.materials[0].setFloat("_SpeedU", 3);
                    cuber1.materials[0].setFloat("_SpeedV", 1);
                    this.cube1 = cube1;
                }
            }
            {
                var cube2 = new gd3d.framework.transform();
                cube2.name = "cube2222";
                cube2.localScale.x = cube1.localScale.y = cube1.localScale.z = 1;
                cube2.localTranslate.y = 1;
                this.scene.addChild(cube2);
                var mesh1 = cube2.gameObject.addComponent("meshFilter");
                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh1.mesh = (smesh);
                var renderer2 = cube2.gameObject.addComponent("meshRenderer");
                var sh = this.app.getAssetMgr().getShader("selftimer_uvroll.shader.json");
                if (sh != null) {
                    renderer2.materials = [];
                    renderer2.materials.push(new gd3d.framework.material());
                    renderer2.materials[0].setShader(sh);
                    var texture1 = this.app.getAssetMgr().getAssetByName("uvSprite.png");
                    renderer2.materials[0].setTexture("_MainTex", texture1);
                }
                this.cube2 = cube2;
            }
            state.finish = true;
        };
        test_uvroll.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 30;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            state.finish = true;
        };
        test_uvroll.prototype.start = function (app) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
        };
        test_uvroll.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            this.timer += delta;
            if (this.cube != null) {
                var curframe = Math.floor(this.timer * this.fps);
                curframe = curframe % this.totalframe;
                var vec41 = new gd3d.math.vector4();
                gd3d.math.spriteAnimation(3, 3, curframe, vec41);
                var renderer = this.cube.gameObject.getComponent("meshRenderer");
                renderer.materials[0].setVector4("_MainTex_ST", vec41);
            }
            if (this.cube2 != null) {
                var renderer2 = this.cube2.gameObject.getComponent("meshRenderer");
                renderer2.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(1.0, 1.0, 0, 0));
                renderer2.materials[0].setFloat("_SpeedU", 3.0);
                renderer2.materials[0].setFloat("_SpeedV", 1.0);
                renderer2.materials[0].setFloat("self_timer", this.timer);
            }
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();
            }
        };
        return test_uvroll;
    }());
    t.test_uvroll = test_uvroll;
})(t || (t = {}));
var UseAniplayClipDemo = (function () {
    function UseAniplayClipDemo() {
        this.taskMgr = new gd3d.framework.taskMgr();
    }
    UseAniplayClipDemo.prototype.loadAniplayClip = function (laststate, state) {
        this.app.getAssetMgr().load("res/prefabs/roles/pc2/Resources/pc2_skill1.FBAni.aniclip.bin", gd3d.framework.AssetTypeEnum.Aniclip, function (s) {
        });
    };
    UseAniplayClipDemo.prototype.loadRole = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/prefabs/roles/pc2/pc2.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var pc_1 = _this.app.getAssetMgr().getAssetByName("pc2.prefab.json").getCloneTrans();
                _this.aniplayer = pc_1.gameObject.getComponent("aniplayer");
                _this.scene.addChild(pc_1);
                _this.app.getAssetMgr().load("res/prefabs/weapons/wp_ds_001/wp_ds_001.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var prefab = _this.app.getAssetMgr().getAssetByName("wp_ds_001.prefab.json");
                        var rhand = pc_1.find("Bip01 Prop1");
                        var lhand = pc_1.find("Bip01 Prop1");
                        if (rhand) {
                            var weapon = prefab.getCloneTrans();
                            rhand.addChild(weapon);
                            weapon.localRotate = new gd3d.math.quaternion();
                            weapon.localTranslate = new gd3d.math.vector3();
                            weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                            weapon.markDirty();
                        }
                        if (lhand) {
                            var weapon = prefab.getCloneTrans();
                            lhand.addChild(weapon);
                            weapon.localRotate = new gd3d.math.quaternion();
                            weapon.localTranslate = new gd3d.math.vector3();
                            weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                            weapon.markDirty();
                        }
                        state.finish = true;
                        console.log(pc_1);
                    }
                });
            }
        });
    };
    UseAniplayClipDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseAniplayClipDemo.prototype.addCamera = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 10;
        objCam.localPosition.x = 10;
        var camera = objCam.gameObject.addComponent("camera");
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    UseAniplayClipDemo.prototype.start = function (app) {
        this.app = app;
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.loadRole.bind(this));
        this.taskMgr.addTaskCall(this.loadAniplayClip.bind(this));
    };
    UseAniplayClipDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
    };
    return UseAniplayClipDemo;
}());
var UseAssetByLoadDemoList = (function () {
    function UseAssetByLoadDemoList() {
        this.x = 0;
        this.y = 100;
        this.btns = [];
    }
    UseAssetByLoadDemoList.prototype.start = function (app) {
        this.app = app;
        this.addBtn("使用加载的perfeb", function () { return new UsePrefebDemo(); });
        this.addBtn("使用加载的perfeb2", function () { return new UsePrefebDemo2(); });
        this.addBtn("使用加载的mesh和材质", function () { return new UseMeshAndMatDemo(); });
        this.addBtn("使用加载的纹理", function () { return new UseTextureDemo(); });
        this.addBtn("使用加载的动作", function () { return new UseAniplayClipDemo(); });
        this.addBtn("使用加载的特效", function () { return new UseF14EffectDemo(); });
        this.addBtn("使用加载的音频", function () { return new UseAudioDemo(); });
        this.addBtn("使用加载的场景", function () { return new UseSceneDemo(); });
    };
    UseAssetByLoadDemoList.prototype.addBtn = function (text, act) {
        var _this = this;
        var btn = document.createElement("button");
        this.btns.push(btn);
        btn.textContent = text;
        btn.onclick = function () {
            _this.clearBtn();
            _this.state = act();
            _this.state.start(_this.app);
        };
        btn.style.top = this.y + "px";
        btn.style.left = this.x + "px";
        if (this.y + 24 > 550) {
            this.y = 100;
            this.x += 200;
        }
        else {
            this.y += 24;
        }
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
    };
    UseAssetByLoadDemoList.prototype.clearBtn = function () {
        for (var i = 0; i < this.btns.length; i++) {
            this.app.container.removeChild(this.btns[i]);
        }
        this.btns.length = 0;
    };
    UseAssetByLoadDemoList.prototype.update = function (delta) {
        if (this.state != null)
            this.state.update(delta);
    };
    return UseAssetByLoadDemoList;
}());
var UseAudioDemo = (function () {
    function UseAudioDemo() {
        this.taskMgr = new gd3d.framework.taskMgr;
    }
    UseAudioDemo.prototype.loadAudio = function (laststate, state) {
        var _this = this;
        gd3d.framework.AudioEx.instance().loadAudioBuffer("res/audio/music1.mp3", function (buffer, err) {
            if (err)
                return;
            _this.audiobuf = buffer;
            state.finish = true;
        });
    };
    UseAudioDemo.prototype.addCamera = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 0;
        objCam.localPosition.x = 0;
        var camera = objCam.gameObject.addComponent("camera");
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        var audioplayer = objCam.gameObject.addComponent("AudioListener");
        this.objCam = objCam;
        objCam.markDirty();
        state.finish = true;
    };
    UseAudioDemo.prototype.addAudioPlay = function (laststate, state) {
        var objAudioPlay = new gd3d.framework.transform();
        objAudioPlay.name = "audio_play";
        var mesh = objAudioPlay.gameObject.addComponent("meshFilter");
        mesh.mesh = this.app.getAssetMgr().getDefaultMesh("cube");
        var render = objAudioPlay.gameObject.addComponent("meshRenderer");
        render.materials.push(this.app.getAssetMgr().getDefParticleMat());
        this.scene.addChild(objAudioPlay);
        this.audioplay = objAudioPlay.gameObject.addComponent("AudioPlayer");
        this.audioplay.play(this.audiobuf, true, 0.5);
        objAudioPlay.markDirty();
        state.finish = true;
    };
    UseAudioDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseAudioDemo.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadAudio.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.addAudioPlay.bind(this));
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 38) {
                _this.objCam.localPosition.z += 1;
            }
            if (e.keyCode == 40) {
                _this.objCam.localPosition.z -= 1;
            }
            _this.objCam.markDirty();
        }, false);
    };
    UseAudioDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
    };
    return UseAudioDemo;
}());
var UseF14EffectDemo = (function () {
    function UseF14EffectDemo() {
        this.taskMgr = new gd3d.framework.taskMgr();
    }
    UseF14EffectDemo.prototype.useF14Effect = function () {
        this.eff = this.app.getAssetMgr().getAssetByName("fx_B_5.prefab.json").getCloneTrans();
        this.scene.addChild(this.eff);
        this.effectSystems = this.eff.gameObject.getComponent("f14EffectSystem");
        this.eff.markDirty();
        console.log(this.eff);
        console.log(this.effectSystems);
    };
    UseF14EffectDemo.prototype.loadF14Effect = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/effectShow/fx_B_5/fx_B_5.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.useF14Effect();
                state.finish = true;
            }
        });
    };
    UseF14EffectDemo.prototype.playEffect = function () {
    };
    UseF14EffectDemo.prototype.stopEffect = function () {
        this.effectSystems.stop();
    };
    UseF14EffectDemo.prototype.addCtrl = function () {
        var _this = this;
        var play = document.createElement("button");
        var stop = document.createElement("button");
        this.app.container.appendChild(play);
        this.app.container.appendChild(stop);
        play.innerText = "Play";
        stop.innerText = "stop";
        play.style.position = stop.style.position = "absolute";
        play.style.height = stop.style.height = "25px";
        play.style.width = stop.style.width = "75px";
        play.style.top = "40px";
        stop.style.top = "80px";
        stop.style.left = play.style.left = "100px";
        play.onclick = function (e) {
            _this.playEffect();
        };
        stop.onclick = function (e) {
            _this.stopEffect();
        };
    };
    UseF14EffectDemo.prototype.addCamera = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 10;
        objCam.localPosition.x = 10;
        var camera = objCam.gameObject.addComponent("camera");
        camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    UseF14EffectDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseF14EffectDemo.prototype.start = function (app) {
        this.app = app;
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.loadF14Effect.bind(this));
        this.addCtrl();
    };
    UseF14EffectDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
    };
    return UseF14EffectDemo;
}());
var UseMeshAndMatDemo = (function () {
    function UseMeshAndMatDemo() {
        this.taskMgr = new gd3d.framework.taskMgr;
    }
    UseMeshAndMatDemo.prototype.loadMesh = function (laststate, state) {
        this.app.getAssetMgr().load("res/prefabs/Cube/resources/Library_unity_default_resources_Cube.mesh.bin", gd3d.framework.AssetTypeEnum.Mesh, function (s) {
            if (s.iserror) {
                state.error = true;
                console.log(s.errs);
            }
            if (s.isfinish) {
                state.finish = true;
            }
        });
    };
    UseMeshAndMatDemo.prototype.loadMaterial = function (laststate, state) {
        this.app.getAssetMgr().load("res/prefabs/Cube/resources/Default-Diffuse.mat.json", gd3d.framework.AssetTypeEnum.Material, function (s) {
            if (s.iserror) {
                state.error = true;
                console.log(s.errs);
            }
            if (s.isfinish) {
                state.finish = true;
            }
        });
    };
    UseMeshAndMatDemo.prototype.useMeshAndMat = function (laststate, state) {
        var cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localPosition = new gd3d.math.vector3(0, 0, 0);
        var mesh = cube.gameObject.addComponent("meshFilter");
        mesh.mesh = this.app.getAssetMgr().getAssetByName("Library_unity_default_resources_Cube.mesh.bin");
        var render = cube.gameObject.addComponent("meshRenderer");
        render.materials.push(this.app.getAssetMgr().getAssetByName("Default-Diffuse.mat.json"));
        this.scene.addChild(cube);
        cube.markDirty();
        state.finish = true;
    };
    UseMeshAndMatDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseMeshAndMatDemo.prototype.addCamera = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 10;
        objCam.localPosition.x = 10;
        var camera = objCam.gameObject.addComponent("camera");
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    UseMeshAndMatDemo.prototype.start = function (app) {
        this.app = app;
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.loadMesh.bind(this));
        this.taskMgr.addTaskCall(this.loadMaterial.bind(this));
        this.taskMgr.addTaskCall(this.useMeshAndMat.bind(this));
    };
    UseMeshAndMatDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
    };
    return UseMeshAndMatDemo;
}());
var UsePrefebDemo = (function () {
    function UsePrefebDemo() {
    }
    UsePrefebDemo.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.assetMgr = app.getAssetMgr();
        this.scene = app.getScene();
        var cam, camera;
        {
            cam = new gd3d.framework.transform();
            cam.name = "looker";
            this.scene.addChild(cam);
            cam.localPosition = new gd3d.math.vector3(0, 0, -10);
            camera = cam.gameObject.addComponent("camera");
            camera.far = 100;
            cam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            cam.markDirty();
        }
        this.assetMgr.load("res/prefabs/Cube/resources/Cube.prefab.json", gd3d.framework.AssetTypeEnum.Prefab, function (s) {
            if (s.isfinish) {
                var Cube = _this.assetMgr.getAssetByName("Cube.prefab.json").getCloneTrans();
                _this.scene.addChild(Cube);
                Cube.localPosition = new gd3d.math.vector3(0, 0, 0);
                Cube.markDirty();
                console.log(Cube);
            }
        });
    };
    UsePrefebDemo.prototype.update = function (delta) {
    };
    return UsePrefebDemo;
}());
var UsePrefebDemo2 = (function () {
    function UsePrefebDemo2() {
    }
    UsePrefebDemo2.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.assetMgr = app.getAssetMgr();
        this.scene = app.getScene();
        var cam, camera;
        {
            cam = new gd3d.framework.transform();
            cam.name = "looker";
            this.scene.addChild(cam);
            cam.localPosition = new gd3d.math.vector3(0, 0, -10);
            camera = cam.gameObject.addComponent("camera");
            camera.far = 100;
            cam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            cam.markDirty();
        }
        this.assetMgr.load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.assetMgr.load("res/prefabs/Quad11/Quad.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        var quadPrefab = _this.assetMgr.getAssetByName("Quad.prefab.json");
                        var quad = quadPrefab.getCloneTrans();
                        _this.scene.addChild(quad);
                        quad.markDirty();
                    }
                });
            }
        });
    };
    UsePrefebDemo2.prototype.update = function (delta) {
    };
    return UsePrefebDemo2;
}());
var UseSceneDemo = (function () {
    function UseSceneDemo() {
        this.taskMgr = new gd3d.framework.taskMgr();
    }
    UseSceneDemo.prototype.useRawScene = function () {
        var raw = this.app.getAssetMgr().getAssetByName("MainCity_.scene.json");
        var root = raw.getSceneRoot();
        root.localEulerAngles = new gd3d.math.vector3(0, 0, 0);
        this.scene.addChild(root = raw.getSceneRoot());
        this.scene.lightmaps = [];
        raw.useLightMap(this.scene);
        raw.useFog(this.scene);
        this.scene.getRoot().markDirty();
        root.markDirty();
    };
    UseSceneDemo.prototype.loadScene = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/scenes/MainCity_/MainCity_.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.useRawScene();
                state.finish = true;
            }
        });
    };
    UseSceneDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseSceneDemo.prototype.addCamera = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -20;
        objCam.localPosition.y = 50;
        objCam.localPosition.x = -20;
        var camera = objCam.gameObject.addComponent("camera");
        camera.far = 1000;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 100));
        objCam.markDirty();
        state.finish = true;
        CameraController.instance().init(this.app, camera);
    };
    UseSceneDemo.prototype.start = function (app) {
        this.app = app;
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadScene.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
    };
    UseSceneDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
        CameraController.instance().update(delta);
    };
    return UseSceneDemo;
}());
var UseTextureDemo = (function () {
    function UseTextureDemo() {
        this.taskMgr = new gd3d.framework.taskMgr();
    }
    UseTextureDemo.prototype.start = function (app) {
        this.app = app;
        this.assetMgr = app.getAssetMgr();
        this.scene = app.getScene();
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadQuad.bind(this));
        this.taskMgr.addTaskCall(this.loadTexture.bind(this));
        var cam = new gd3d.framework.transform();
        cam.name = "looker";
        this.scene.addChild(cam);
        cam.localPosition = new gd3d.math.vector3(0, 0, -10);
        var camera = cam.gameObject.addComponent("camera");
        camera.far = 100;
        cam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        cam.markDirty();
        this.addCtrl();
    };
    UseTextureDemo.prototype.loadTexture = function (laststate, state) {
        var _this = this;
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Texture, function (s) {
            if (s.isfinish) {
                _this.texture = _this.app.getAssetMgr().getAssetByName("zg256.png");
                state.finish = true;
            }
        });
    };
    UseTextureDemo.prototype.useTexture = function () {
        var render = this.quad.gameObject.getComponent("meshRenderer");
        console.log(this.texture);
        render.materials[0].setTexture("_MainTex", this.texture);
    };
    UseTextureDemo.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    };
    UseTextureDemo.prototype.loadQuad = function (laststate, state) {
        var _this = this;
        this.assetMgr.load("res/prefabs/Quad11/Quad.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                var quadPrefab = _this.assetMgr.getAssetByName("Quad.prefab.json");
                var quad = quadPrefab.getCloneTrans();
                _this.scene.addChild(quad);
                quad.markDirty();
                state.finish = true;
                _this.quad = quad;
            }
        });
    };
    UseTextureDemo.prototype.addCtrl = function () {
        var _this = this;
        var changeTexture = document.createElement("button");
        changeTexture.innerText = "更换纹理";
        this.app.container.appendChild(changeTexture);
        changeTexture.style.position = "absolute";
        changeTexture.style.height = "25px";
        changeTexture.style.width = "75px";
        changeTexture.style.top = "100px";
        changeTexture.style.left = "75px";
        changeTexture.onclick = function (e) {
            _this.useTexture();
        };
    };
    UseTextureDemo.prototype.update = function (delta) {
        this.taskMgr.move(delta);
    };
    return UseTextureDemo;
}());
var Test_CameraController = (function () {
    function Test_CameraController() {
        this.moveSpeed = 10;
        this.movemul = 5;
        this.wheelSpeed = 1;
        this.rotateSpeed = 0.1;
        this.keyMap = {};
        this.beRightClick = false;
        this.cameras = [];
        this.isInit = false;
        this.moveVector = new gd3d.math.vector3(0, 0, 1);
    }
    Test_CameraController.instance = function () {
        if (Test_CameraController.g_this == null) {
            Test_CameraController.g_this = new Test_CameraController();
        }
        return Test_CameraController.g_this;
    };
    Test_CameraController.prototype.update = function (delta) {
        if (this.beRightClick) {
            this.doMove(delta);
        }
    };
    Test_CameraController.prototype.add = function (camera) {
        this.cameras.push(new gd3d.framework.camera());
        this.cameras[this.cameras.length - 1] = camera;
    };
    Test_CameraController.prototype.decideCam = function (target) {
        this.target = target;
        this.rotAngle = new gd3d.math.vector3();
        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
    };
    Test_CameraController.prototype.init = function (app) {
        var _this = this;
        this.isInit = true;
        this.app = app;
        this.app.webgl.canvas.addEventListener("mousedown", function (ev) {
            _this.checkOnRightClick(ev);
        }, false);
        this.app.webgl.canvas.addEventListener("mouseup", function (ev) {
            _this.beRightClick = false;
        }, false);
        this.app.webgl.canvas.addEventListener("mousemove", function (ev) {
            if (_this.beRightClick) {
                _this.doRotate(ev.movementX, ev.movementY);
            }
        }, false);
        this.app.webgl.canvas.addEventListener("keydown", function (ev) {
            _this.keyMap[ev.keyCode] = true;
        }, false);
        this.app.webgl.canvas.addEventListener("keyup", function (ev) {
            _this.moveSpeed = 10;
            _this.keyMap[ev.keyCode] = false;
        }, false);
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            this.app.webgl.canvas.addEventListener("DOMMouseScroll", function (ev) {
                _this.doMouseWheel(ev, true);
            }, false);
        }
        else {
            this.app.webgl.canvas.addEventListener("mousewheel", function (ev) {
                _this.doMouseWheel(ev, false);
            }, false);
        }
        this.app.webgl.canvas.addEventListener("mouseout", function (ev) {
            _this.beRightClick = false;
        }, false);
        document.oncontextmenu = function (ev) {
            ev.preventDefault();
        };
    };
    Test_CameraController.prototype.doMove = function (delta) {
        if (this.target == null)
            return;
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_W] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_W])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_w] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_w])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_S] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_S])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_s] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_s])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_A] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_A])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_a] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_a])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_D] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_D])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_d] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_d])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_Q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_Q])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_q])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_E] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_E])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_e] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_e])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        this.target.gameObject.transform.markDirty();
    };
    Test_CameraController.prototype.doRotate = function (rotateX, rotateY) {
        this.rotAngle.x += rotateY * this.rotateSpeed;
        this.rotAngle.y += rotateX * this.rotateSpeed;
        this.rotAngle.x %= 360;
        this.rotAngle.y %= 360;
        gd3d.math.quatFromEulerAngles(this.rotAngle.x, this.rotAngle.y, this.rotAngle.z, this.target.gameObject.transform.localRotate);
    };
    Test_CameraController.prototype.lookat = function (trans) {
        this.target.gameObject.transform.lookat(trans);
        this.target.gameObject.transform.markDirty();
        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
    };
    Test_CameraController.prototype.checkOnRightClick = function (mouseEvent) {
        var value = mouseEvent.button;
        if (value == 2) {
            this.beRightClick = true;
            return true;
        }
        else if (value == 0) {
            this.beRightClick = false;
            return false;
        }
    };
    Test_CameraController.prototype.doMouseWheel = function (ev, isFirefox) {
        if (!this.target)
            return;
        if (this.target.opvalue == 0) {
        }
        else {
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            if (isFirefox) {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * (ev.detail * (-0.5)), this.moveVector);
            }
            else {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * ev.deltaY * (-0.01), this.moveVector);
            }
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
            this.target.gameObject.transform.markDirty();
        }
    };
    Test_CameraController.prototype.remove = function () {
    };
    return Test_CameraController;
}());
var CameraController = (function () {
    function CameraController() {
        this.moveSpeed = 10;
        this.movemul = 5;
        this.wheelSpeed = 1;
        this.rotateSpeed = 0.1;
        this.keyMap = {};
        this.beRightClick = false;
        this.isInit = false;
        this.moveVector = new gd3d.math.vector3(0, 0, 1);
    }
    CameraController.instance = function () {
        if (CameraController.g_this == null) {
            CameraController.g_this = new CameraController();
        }
        return CameraController.g_this;
    };
    CameraController.prototype.update = function (delta) {
        if (this.beRightClick) {
            this.doMove(delta);
        }
    };
    CameraController.prototype.init = function (app, target) {
        var _this = this;
        this.isInit = true;
        this.app = app;
        this.target = target;
        this.rotAngle = new gd3d.math.vector3();
        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
        this.app.webgl.canvas.addEventListener("mousedown", function (ev) {
            _this.checkOnRightClick(ev);
        }, false);
        this.app.webgl.canvas.addEventListener("mouseup", function (ev) {
            _this.beRightClick = false;
        }, false);
        this.app.webgl.canvas.addEventListener("mousemove", function (ev) {
            if (_this.beRightClick) {
                _this.doRotate(ev.movementX, ev.movementY);
            }
        }, false);
        this.app.webgl.canvas.addEventListener("keydown", function (ev) {
            _this.keyMap[ev.keyCode] = true;
        }, false);
        this.app.webgl.canvas.addEventListener("keyup", function (ev) {
            _this.moveSpeed = 10;
            _this.keyMap[ev.keyCode] = false;
        }, false);
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            this.app.webgl.canvas.addEventListener("DOMMouseScroll", function (ev) {
                _this.doMouseWheel(ev, true);
            }, false);
        }
        else {
            this.app.webgl.canvas.addEventListener("mousewheel", function (ev) {
                _this.doMouseWheel(ev, false);
            }, false);
        }
        this.app.webgl.canvas.addEventListener("mouseout", function (ev) {
            _this.beRightClick = false;
        }, false);
        document.oncontextmenu = function (ev) {
            ev.preventDefault();
        };
    };
    CameraController.prototype.doMove = function (delta) {
        if (this.target == null)
            return;
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_W] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_W])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_w] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_w])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_S] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_S])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_s] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_s])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_A] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_A])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_a] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_a])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_D] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_D])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_d] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_d])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_Q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_Q])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_q])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_E] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_E])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_e] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_e])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        this.target.gameObject.transform.markDirty();
    };
    CameraController.prototype.doRotate = function (rotateX, rotateY) {
        this.rotAngle.x += rotateY * this.rotateSpeed;
        this.rotAngle.y += rotateX * this.rotateSpeed;
        this.rotAngle.x %= 360;
        this.rotAngle.y %= 360;
        gd3d.math.quatFromEulerAngles(this.rotAngle.x, this.rotAngle.y, this.rotAngle.z, this.target.gameObject.transform.localRotate);
    };
    CameraController.prototype.lookat = function (trans) {
        this.target.gameObject.transform.lookat(trans);
        this.target.gameObject.transform.markDirty();
        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
    };
    CameraController.prototype.checkOnRightClick = function (mouseEvent) {
        var value = mouseEvent.button;
        if (value == 2) {
            this.beRightClick = true;
            return true;
        }
        else if (value == 0) {
            this.beRightClick = false;
            return false;
        }
    };
    CameraController.prototype.doMouseWheel = function (ev, isFirefox) {
        if (!this.target)
            return;
        if (this.target.opvalue == 0) {
        }
        else {
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            if (isFirefox) {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * (ev.detail * (-0.5)), this.moveVector);
            }
            else {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * ev.deltaY * (-0.01), this.moveVector);
            }
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
            this.target.gameObject.transform.markDirty();
        }
    };
    CameraController.prototype.remove = function () {
    };
    return CameraController;
}());
var dome;
(function (dome) {
    var GMesh = (function () {
        function GMesh(mat, vCount, vf, webgl) {
            this.currentVerteCount = 0;
            this.realVboLen = 0;
            this.realEboLen = 0;
            this.temptPos = new gd3d.math.vector3();
            this.mat = mat;
            var total = gd3d.render.meshData.calcByteSize(vf) / 4;
            var gmesh = new gd3d.framework.mesh();
            this.vbodata = new Float32Array(total * 2048);
            this.ebodata = new Uint16Array(2048);
            this.vf = vf;
            this.maxVerteCount = vCount;
            this.maxVboLen = this.vbodata.length;
            this.maxEboLen = this.ebodata.length;
            gmesh.glMesh = new gd3d.render.glMesh();
            gmesh.glMesh.initBuffer(webgl, vf, vCount, gd3d.render.MeshTypeEnum.Dynamic);
            gmesh.glMesh.addIndex(webgl, this.ebodata.length);
            gmesh.submesh = [];
            {
                var sm = new gd3d.framework.subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = this.ebodata.length;
                sm.line = false;
                gmesh.submesh.push(sm);
            }
            this.mesh = gmesh;
            this.vertexByteSize = gmesh.glMesh.vertexByteSize;
        }
        GMesh.prototype.reset = function () {
            this.currentVerteCount = 0;
            this.realVboLen = 0;
            this.realEboLen = 0;
        };
        GMesh.prototype.uploadMeshData = function (mat, mesh, webgl) {
            var data = mesh.data;
            this.checkMeshCapacity(data.pos.length, data.trisindex.length, webgl);
            var vertexcount = data.pos.length;
            var size = this.vertexByteSize / 4;
            var vbodata = this.vbodata;
            for (var i = 0; i < vertexcount; i++) {
                var seek = 0;
                gd3d.math.matrixTransformVector3(data.pos[i], mat, this.temptPos);
                vbodata[this.realVboLen + i * size] = this.temptPos.x;
                vbodata[this.realVboLen + i * size + 1] = this.temptPos.y;
                vbodata[this.realVboLen + i * size + 2] = this.temptPos.z;
                seek += 3;
                if (this.vf & gd3d.render.VertexFormatMask.Normal) {
                    vbodata[this.realVboLen + i * size + seek] = data.normal[i].x;
                    vbodata[this.realVboLen + i * size + seek + 1] = data.normal[i].y;
                    vbodata[this.realVboLen + i * size + seek + 2] = data.normal[i].z;
                    seek += 3;
                }
                if (this.vf & gd3d.render.VertexFormatMask.Tangent) {
                    vbodata[this.realVboLen + i * size + seek] = data.tangent[i].x;
                    vbodata[this.realVboLen + i * size + seek + 1] = data.tangent[i].y;
                    vbodata[this.realVboLen + i * size + seek + 2] = data.tangent[i].z;
                    seek += 3;
                }
                if (this.vf & gd3d.render.VertexFormatMask.Color) {
                    if (data.color != null) {
                        vbodata[this.realVboLen + i * size + seek] = data.color[i].r;
                        vbodata[this.realVboLen + i * size + seek + 1] = data.color[i].g;
                        vbodata[this.realVboLen + i * size + seek + 2] = data.color[i].b;
                        vbodata[this.realVboLen + i * size + seek + 3] = data.color[i].a;
                    }
                    else {
                        vbodata[this.realVboLen + i * size + seek] = 1;
                        vbodata[this.realVboLen + i * size + seek + 1] = 1;
                        vbodata[this.realVboLen + i * size + seek + 2] = 1;
                        vbodata[this.realVboLen + i * size + seek + 3] = 1;
                    }
                    seek += 4;
                }
                if (this.vf & gd3d.render.VertexFormatMask.UV0) {
                    vbodata[this.realVboLen + i * size + seek] = data.uv[i].x;
                    vbodata[this.realVboLen + i * size + seek + 1] = data.uv[i].y;
                    seek += 2;
                }
            }
            var ebodata = this.ebodata;
            var len = data.trisindex.length;
            for (var i = 0; i < len; i++) {
                ebodata[this.realEboLen + i] = data.trisindex[i] + this.currentVerteCount;
            }
            this.realVboLen += size * vertexcount;
            this.realEboLen += len;
            this.currentVerteCount += vertexcount;
            this.mesh.submesh[0].size = this.realEboLen;
        };
        GMesh.prototype.mixToGLmesh = function (webgl) {
            this.mesh.glMesh.uploadVertexData(webgl, this.vbodata);
            this.mesh.glMesh.uploadIndexData(webgl, 0, this.ebodata);
        };
        GMesh.prototype.checkMeshCapacity = function (vertexcount, eboLen, webgl) {
            if (this.currentVerteCount + vertexcount > this.maxVerteCount) {
                var needCount = this.currentVerteCount + vertexcount;
                var needMaxVertexcount = this.maxVerteCount;
                while (needCount > needMaxVertexcount) {
                    needMaxVertexcount *= 2;
                }
                if (needMaxVertexcount != this.maxVerteCount) {
                    this.maxVerteCount = needMaxVertexcount;
                    var newVbo = new Float32Array(this.maxVerteCount * this.vertexByteSize);
                    this.maxVboLen = newVbo.length;
                    newVbo.set(this.vbodata);
                    this.mesh.glMesh.resetVboSize(webgl, this.maxVerteCount);
                    this.vbodata = newVbo;
                }
            }
            if (this.realEboLen + eboLen > this.maxEboLen) {
                var needEbolen = this.realEboLen + eboLen;
                var curMaxlen = this.maxEboLen;
                while (needEbolen > curMaxlen) {
                    curMaxlen *= 2;
                }
                if (curMaxlen != this.maxEboLen) {
                    this.maxEboLen = curMaxlen;
                    var newebo = new Uint16Array(this.maxEboLen);
                    newebo.set(this.ebodata);
                    this.mesh.glMesh.resetEboSize(webgl, 0, this.maxEboLen);
                    this.ebodata = newebo;
                }
            }
        };
        return GMesh;
    }());
    dome.GMesh = GMesh;
    var mixMesh = (function () {
        function mixMesh() {
            this.picker = [];
            this.flag = false;
            this.matDic = {};
            this.matinstance = {};
            this.mixmeshDic = {};
        }
        mixMesh.prototype.start = function (app) {
            var _this = this;
            this.app = app;
            this.app.showDrawCall();
            this.scene = this.app.getScene();
            var prefabName = 'GameObject';
            this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (state) {
                _this.loadPrefab(prefabName, function () {
                    if (state.isfinish) {
                        var _prefab = _this.app.getAssetMgr().getAssetByName(prefabName + ".prefab.json");
                        _this.prefab = _prefab.getCloneTrans();
                        var json = JSON.parse('{"obs":[[0,3,"-6.00","0.00","0.00"],[0,3,"0.00","-6.00","90.00"],[0,3,"0.00","6.00","90.00"],[0,3,"-18.00","0.00","0.00"],[0,3,"-12.00","0.00","0.00"],[0,2,"0.00","0.00","0.00"],[0,3,"0.00","-11.44","90.00"],[0,3,"-24.00","0.00","0.00"],[0,3,"0.00","12.00","90.00"],[0,3,"0.00","18.00","90.00"],[0,3,"0.00","-17.44","90.00"],[0,3,"-36.00","0.00","0.00"],[0,3,"-42.00","0.00","0.00"],[0,1,"-30.00","0.00","0.00"],[0,3,"-30.00","-17.44","90.00"],[0,3,"-30.00","18.00","90.00"],[0,3,"-30.00","12.00","90.00"],[0,3,"-30.00","-11.44","90.00"],[0,3,"-30.00","6.00","90.00"],[0,3,"-30.00","-6.00","90.00"],[0,0,"0.00","24.00","0.00"],[0,0,"0.00","-23.08","180.00"],[0,0,"-30.00","24.00","0.00"],[0,4,"-47.96","0.00","180.00"],[0,4,"-30.00","-23.27","0.00"],[0,3,"-47.96","-6.00","90.00"],[0,3,"-47.96","-12.00","90.00"],[0,3,"-47.96","-18.00","90.00"],[0,4,"-47.96","-23.26","90.00"],[0,3,"-42.00","-23.26","0.00"],[0,3,"-36.00","-23.26","0.00"],[1,1,"2.38","-2.64","0.00"],[1,1,"2.19","2.54","0.00"],[1,1,"-2.48","-2.58","0.00"],[1,1,"-2.47","2.62","0.00"],[1,2,"-2.41","-7.00","90.00"],[1,2,"-2.41","-12.00","90.00"],[1,2,"-2.41","-17.00","90.00"],[1,2,"-2.41","-22.00","90.00"],[1,2,"2.43","-22.00","90.00"],[1,2,"2.43","-17.00","90.00"],[1,2,"2.43","-12.00","90.00"],[1,2,"2.43","-7.00","90.00"],[1,2,"2.43","22.70","90.00"],[1,2,"2.43","17.70","90.00"],[1,2,"2.43","12.70","90.00"],[1,2,"2.43","7.70","90.00"],[1,2,"-2.41","7.70","90.00"],[1,2,"-2.41","12.70","90.00"],[1,2,"-2.41","17.70","90.00"],[1,2,"-2.41","22.70","90.00"],[1,2,"-6.97","-2.46","0.00"],[1,2,"-11.97","-2.46","0.00"],[1,2,"-16.97","-2.46","0.00"],[1,2,"-21.97","-2.46","0.00"],[1,2,"-21.97","2.54","0.00"],[1,2,"-16.97","2.54","0.00"],[1,2,"-41.37","2.54","0.00"],[1,2,"-41.37","-2.46","0.00"],[1,2,"-36.90","-2.46","0.00"],[1,2,"-36.90","-2.46","0.00"],[1,2,"-36.90","2.54","0.00"],[1,1,"-32.20","2.62","0.00"],[1,1,"-32.20","-2.58","0.00"],[1,1,"-27.50","2.54","0.00"],[1,1,"-27.30","-2.64","0.00"],[1,0,"2.57","20.55","90.00"],[1,0,"-2.48","10.33","90.00"],[1,0,"-2.48","-19.61","90.00"],[1,0,"2.46","-9.73","90.00"],[1,0,"-9.43","-2.68","0.00"],[1,0,"-19.82","2.61","0.00"],[1,2,"-45.28","-25.78","0.00"],[1,2,"-45.28","-20.78","0.00"],[1,2,"-6.86","2.54","0.00"],[1,2,"-32.16","-20.78","0.00"],[1,2,"-32.16","-25.78","0.00"],[1,2,"-50.45","-20.68","90.00"],[1,2,"-50.45","-15.00","90.00"],[1,2,"-50.45","-6.91","90.00"],[1,2,"-50.45","2.39","90.00"],[1,2,"-45.51","-6.91","90.00"],[1,2,"-45.51","-15.00","90.00"],[1,2,"-27.12","-15.00","90.00"],[1,2,"-27.12","-6.91","90.00"],[1,2,"-32.42","-6.91","90.00"],[1,2,"-32.42","-15.00","90.00"],[1,2,"-32.42","8.70","90.00"],[1,2,"-32.42","16.79","90.00"],[1,2,"-27.60","16.79","90.00"],[1,2,"-27.60","8.70","90.00"],[1,2,"-27.60","25.63","90.00"],[1,2,"-32.42","25.63","90.00"],[1,0,"-27.74","20.74","90.00"],[1,0,"-27.74","-10.56","90.00"],[1,0,"-32.40","-17.74","90.00"],[1,0,"-44.99","-8.72","90.00"],[1,0,"-50.33","-17.85","90.00"],[2,1,"-9.02","9.01","0.00"],[2,1,"-9.00","20.20","0.00"],[2,1,"-21.00","20.20","0.00"],[2,1,"-21.02","9.01","0.00"],[2,1,"-21.02","-20.20","0.00"],[2,1,"-21.00","-9.00","0.00"],[2,1,"-9.00","-9.00","0.00"],[2,1,"-9.02","-20.20","0.00"],[2,0,"-35.96","5.98","90.00"],[2,3,"-39.00","-5.99","0.00"],[2,4,"-36.00","11.83","90.00"],[2,4,"-36.00","23.20","90.00"],[2,4,"-36.00","17.38","90.00"],[2,2,"-45.00","9.00","180.00"],[2,1,"-44.99","20.20","0.00"],[2,1,"-39.12","-14.32","0.00"]],"0-0":0.218296930193901,"0-1":0.138532817363739,"0-2":0.218296304345131,"0-3":0.218295753002167,"0-4":0.218296930193901,"1-0":1.10804808139801,"1-1":1.57943224906921,"1-2":2.28681707382202,"2-0":4.10447216033936,"2-1":13.9198970794678,"2-2":23.7891082763672,"2-3":10.7089042663574,"2-4":3.134281873703}');
                        _this.obs = json.obs;
                        _this.root = new gd3d.framework.transform();
                        for (var _i = 0, _a = _this.obs; _i < _a.length; _i++) {
                            var t_3 = _a[_i];
                            _this.generateSignelObs(t_3);
                        }
                        var mr = _this.root.gameObject.getComponentsInChildren("meshRenderer");
                        for (var _b = 0, mr_1 = mr; _b < mr_1.length; _b++) {
                            var m = mr_1[_b];
                            _this.picker.push(m.gameObject.transform);
                        }
                        console.log(_this.picker);
                        _this.scene.update(0);
                        _this.flag = true;
                        _this.refresh();
                    }
                });
            });
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 10000;
            this.camera.backgroundColor = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);
            this.camera.gameObject.transform.localTranslate.z = -100;
            CameraController.instance().init(this.app, this.camera);
            objCam.markDirty();
        };
        mixMesh.prototype.refresh = function () {
            if (!this.flag)
                return;
            for (var k in this.mixmeshDic) {
                this.mixmeshDic[k].reset();
            }
            var _a = this.mixMesh(this.picker), nobatch = _a.nobatch, batch = _a.batch, mixMeshId = _a.mixMeshId;
            for (var _i = 0, mixMeshId_1 = mixMeshId; _i < mixMeshId_1.length; _i++) {
                var id = mixMeshId_1[_i];
                var m = this.mixmeshDic[id];
                var trans = new gd3d.framework.transform();
                trans.localPosition.y = 15;
                var mf = trans.gameObject.addComponent("meshFilter");
                mf.mesh = m.mesh;
                var meshRender = trans.gameObject.addComponent("meshRenderer");
                meshRender.materials = [m.mat];
                this.scene.addChild(trans);
            }
        };
        mixMesh.prototype.generateSignelObs = function (target) {
            var level = target[0], obType = target[1], posx = target[2], posz = target[3], rotationy = target[4], trans = target[5];
            if (!trans) {
                var prefab = this.prefab;
                var instance = prefab.children[level].children[obType].clone();
                instance.localTranslate.x = posx;
                instance.localTranslate.z = posz;
                gd3d.math.quatFromEulerAngles(0, rotationy, 0, instance.children[0].localRotate);
                this.root.addChild(instance);
            }
            else {
                trans.gameObject.visiable = true;
            }
        };
        mixMesh.prototype.load = function (path, cb) {
            this.app.getAssetMgr().load(path, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish && cb) {
                    cb();
                }
            });
        };
        mixMesh.prototype.loadPrefab = function (name, cb) {
            this.load("res/prefabs/" + name + "/" + name + ".assetbundle.json", cb);
        };
        mixMesh.prototype.update = function (delta) {
            CameraController.instance().update(delta);
        };
        mixMesh.prototype.mixMesh = function (targets, vf) {
            if (vf === void 0) { vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal | gd3d.render.VertexFormatMask.Tangent | gd3d.render.VertexFormatMask.UV0; }
            var nobatchArr = [];
            var batchArr = [];
            var mixmeshid = [];
            this.matDic = {};
            for (var i = 0; i < targets.length; i++) {
                var meshr = targets[i].gameObject.getComponent("meshRenderer");
                if (meshr.materials.length > 1) {
                    nobatchArr.push(targets[i]);
                }
                else {
                    var id = meshr.materials[0].getGUID();
                    if (!this.matDic[id])
                        this.matDic[id] = [];
                    this.matDic[id].push(targets[i]);
                    this.matinstance[id] = meshr.materials[0];
                }
            }
            for (var key in this.matDic) {
                var transArr = this.matDic[key];
                if (transArr.length >= 2) {
                    for (var i = 0; i < transArr.length; i++) {
                        var meshf = transArr[i].gameObject.getComponent("meshFilter");
                        if (this.mixmeshDic[key] == null) {
                            this.mixmeshDic[key] = new GMesh(this.matinstance[key], 2048, vf, this.app.webgl);
                            mixmeshid.push(Number(key));
                        }
                        this.mixmeshDic[key].uploadMeshData(transArr[i].getWorldMatrix(), meshf.mesh, this.app.webgl);
                        batchArr.push(transArr[i]);
                    }
                }
                else {
                    if (transArr[0] != null) {
                        nobatchArr.push(transArr[0]);
                    }
                }
            }
            for (var key in this.mixmeshDic) {
                this.mixmeshDic[key].mixToGLmesh(this.app.webgl);
            }
            return { batch: batchArr, nobatch: nobatchArr, mixMeshId: mixmeshid };
        };
        return mixMesh;
    }());
    dome.mixMesh = mixMesh;
})(dome || (dome = {}));
var dome;
(function (dome) {
    var paowuxian = (function () {
        function paowuxian() {
            this.taskmgr = new gd3d.framework.taskMgr();
            this.paoLen = 0;
            this.orgPos = new gd3d.math.vector3(0, 10, -10);
            this.rotEuler = new gd3d.math.vector3(-30, 180, 0);
            this.gravity = 10;
            this.speed = 30;
            this.dir = new gd3d.math.vector3();
            this.paoKouPos = new gd3d.math.vector3();
            this.timer = 0;
            this.forward = new gd3d.math.vector3();
            this.beNeedRecompute = true;
            this.worldPoints = [];
            this.targets = [];
            this.worldStart = new gd3d.math.vector3();
            this.worldEnd = new gd3d.math.vector3();
            this.worldMiddle = new gd3d.math.vector3();
            this.cubes = [];
            this.lerpCount = 30;
            this.endpos = new gd3d.math.vector3();
            this.hPos = new gd3d.math.vector3();
            this.startPos = new gd3d.math.vector3();
            this.actived = false;
            this.enableWASD = true;
        }
        paowuxian.prototype.start = function (app) {
            this.app = app;
            this.scene = app.getScene();
            this.assetmgr = app.getAssetMgr();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadmesh.bind(this));
            this.taskmgr.addTaskCall(this.gamerun.bind(this));
        };
        paowuxian.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        paowuxian.prototype.gamerun = function (laststate, state) {
            this.addcam();
            this.addcube();
            this.addUI();
            state.finish = true;
            this.camctr.setTarget(this.paodan);
            this.camctr.setDistanceToTarget(2);
            this.camctr.setRotAngle(180, 30);
        };
        paowuxian.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            CameraController.instance().update(delta);
            if (this.paojia) {
                this.rotEuler.x = gd3d.math.floatClamp(this.rotEuler.x, -90, 0);
                this.paojia.localEulerAngles = this.rotEuler;
                this.paojia.markDirty();
                this.guiji.localEulerAngles = new gd3d.math.vector3(0, this.rotEuler.y, 0);
                this.guiji.markDirty();
                var meshf = this.guiji.gameObject.getComponent("meshFilter");
                meshf.mesh = this.getMeshData(-this.rotEuler.x, this.gravity, this.speed, this.paoLen, this.orgPos.y);
                var mat = this.guiji.getWorldMatrix();
                gd3d.math.matrixTransformVector3(this.startPos, mat, this.worldStart);
                gd3d.math.matrixTransformVector3(this.hPos, mat, this.worldMiddle);
                gd3d.math.matrixTransformVector3(this.endpos, mat, this.worldEnd);
                gd3d.math.vec3Clone(this.worldStart, this.startTrans.localTranslate);
                gd3d.math.vec3Clone(this.worldMiddle, this.middleTrans.localTranslate);
                this.startTrans.markDirty();
                this.middleTrans.markDirty();
                if (!this.enableWASD) {
                    gd3d.math.vec3Clone(this.worldEnd, this.endTrans.localTranslate);
                    this.endTrans.markDirty();
                }
                var info = new gd3d.framework.pickinfo();
                var targets1 = [];
                var targets2 = [];
                this.beNeedRecompute = true;
                if (this.detectTarget_2(this.targets, targets2, info)) {
                    gd3d.math.vec3Clone(info.hitposition, this.guanghuan.localPosition);
                    var axis = new gd3d.math.vector3();
                    gd3d.math.vec3Cross(gd3d.math.pool.vector3_up, info.normal, axis);
                    gd3d.math.vec3Normalize(axis, axis);
                    var dot = gd3d.math.vec3Dot(info.normal, gd3d.math.pool.vector3_up);
                    var angle = Math.acos(dot) * 180 / Math.PI;
                    gd3d.math.quatFromAxisAngle(axis, angle, this.guanghuan.localRotate);
                    this.guanghuan.markDirty();
                }
                else {
                    gd3d.math.quatIdentity(this.guanghuan.localRotate);
                    gd3d.math.vec3Clone(this.worldEnd, this.guanghuan.localPosition);
                    this.guanghuan.markDirty();
                }
            }
            if (this.actived) {
                this.timer += delta * 0.1;
                var move = new gd3d.math.vector3();
                this.getDirByRotAngle(this.rotEuler, this.dir);
                gd3d.math.vec3ScaleByNum(this.dir, this.paoLen, this.paoKouPos);
                gd3d.math.vec3ScaleByNum(this.dir, this.speed, move);
                gd3d.math.vec3ScaleByNum(move, this.timer, move);
                move.y -= 0.5 * this.gravity * this.timer * this.timer;
                gd3d.math.vec3Add(this.paoKouPos, this.paojia.getWorldPosition(), this.paoKouPos);
                gd3d.math.vec3Add(this.paoKouPos, move, this.paodan.localPosition);
                this.paodan.markDirty();
                if (this.paodan.localPosition.y < 0) {
                    this.actived = false;
                }
            }
        };
        paowuxian.prototype.detectTarget_2 = function (targets1, targets2, info) {
            var newtargets = [];
            if (this.linedetectcollider(this.worldStart, this.worldMiddle, targets1, newtargets)) {
                if (this.detectSecond_Colliders(newtargets, info)) {
                    return true;
                }
            }
            newtargets = [];
            if (this.linedetectcollider(this.worldMiddle, this.worldEnd, targets1, newtargets)) {
                if (this.detectSecond_Colliders(newtargets, info)) {
                    return true;
                }
            }
            newtargets = [];
            if (this.linedetectcollider(this.worldStart, this.worldMiddle, targets2, newtargets)) {
                if (this.detectSecond_Meshs(newtargets, info)) {
                    return true;
                }
            }
            newtargets = [];
            if (this.linedetectcollider(this.worldMiddle, this.worldEnd, targets2, newtargets)) {
                if (this.detectSecond_Meshs(newtargets, info)) {
                    return true;
                }
            }
            return false;
        };
        paowuxian.prototype.detectSecond_Colliders = function (target, info) {
            var distancc = Number.MAX_VALUE;
            var picked = false;
            for (var i = 0; i < target.length; i++) {
                var _info = new gd3d.framework.pickinfo();
                if (this.detectSecond_Collider(target[i], _info)) {
                    if (_info.distance < distancc) {
                        picked = true;
                        distancc = _info.distance;
                        info.cloneFrom(_info);
                    }
                }
            }
            return picked;
        };
        paowuxian.prototype.detectSecond_Collider = function (target, info) {
            if (this.beNeedRecompute) {
                this.beNeedRecompute = false;
                var mat = this.guiji.getWorldMatrix();
                for (var i = 0; i < this.pointArr.length; i++) {
                    gd3d.math.matrixTransformVector3(this.pointArr[i], mat, this.pointArr[i]);
                }
            }
            if (this.intersectCollider(this.pointArr, target, info)) {
                info.pickedtran = target;
                return true;
            }
            return false;
        };
        paowuxian.prototype.detectSecond_Meshs = function (target, info) {
            var distancc = Number.MAX_VALUE;
            var picked = false;
            for (var i = 0; i < target.length; i++) {
                var _info = new gd3d.framework.pickinfo();
                if (this.detectSecond_Mesh(target[i], _info)) {
                    if (_info.distance < distancc) {
                        picked = true;
                        distancc = _info.distance;
                        info.cloneFrom(_info);
                    }
                }
            }
            return picked;
        };
        paowuxian.prototype.detectSecond_Mesh = function (target, info) {
            if (this.beNeedRecompute) {
                this.beNeedRecompute = false;
                var mat = this.guiji.getWorldMatrix();
                for (var i = 0; i < this.pointArr.length; i++) {
                    gd3d.math.matrixTransformVector3(this.pointArr[i], mat, this.pointArr[i]);
                }
            }
            var meshf = target.gameObject.getComponent("meshFilter");
            var mesh = meshf.getMeshOutput();
            if (meshf != null && meshf.mesh != null) {
                if (this.intersects(this.pointArr, meshf.mesh, target.getWorldMatrix(), info)) {
                    info.pickedtran = target;
                    return true;
                }
            }
            return false;
        };
        paowuxian.prototype.linedetectcollider = function (start, end, targets, newtargets) {
            var dir = new gd3d.math.vector3();
            gd3d.math.vec3Subtract(end, start, dir);
            var len = gd3d.math.vec3Length(dir);
            gd3d.math.vec3Normalize(dir, dir);
            var ray = new gd3d.framework.ray(start, dir);
            var distance = Number.MAX_VALUE;
            var picked = false;
            for (var key in targets) {
                var _info = new gd3d.framework.pickinfo();
                if (ray.intersectCollider(targets[key], _info)) {
                    if (_info.distance < len) {
                        picked = true;
                        newtargets.push(_info.pickedtran);
                    }
                }
            }
            return picked;
        };
        paowuxian.prototype.lineDetectMesh = function (start, end, target, info) {
            var dir = new gd3d.math.vector3();
            gd3d.math.vec3Subtract(end, start, dir);
            var len = gd3d.math.vec3Length(dir);
            gd3d.math.vec3Normalize(dir, dir);
            var ray = new gd3d.framework.ray(start, dir);
            var meshf = target.gameObject.getComponent("meshFilter");
            var mesh = meshf.getMeshOutput();
            if (mesh != null) {
                if (mesh.intersects(ray, target.getWorldMatrix(), info)) {
                    if (info.distance < len) {
                        return true;
                    }
                }
            }
        };
        paowuxian.prototype.addcam = function () {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -15);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var controller = new CameraController();
            CameraController.instance().init(this.app, this.camera);
            var objCam = new gd3d.framework.transform();
            this.cam2 = objCam.gameObject;
            this.cam2.visible = false;
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            var camera = objCam.gameObject.addComponent("camera");
            camera.near = 0.01;
            camera.far = 2000;
            camera.fov = Math.PI * 0.3;
            camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -15);
            objCam.markDirty();
            this.camctr = objCam.gameObject.addComponent("camCtr");
        };
        paowuxian.prototype.addcube = function () {
            var cube1 = new gd3d.framework.transform();
            this.paojia = cube1;
            cube1.localPosition = this.orgPos;
            cube1.localScale = new gd3d.math.vector3(0.5, 0.5, this.paoLen * 2);
            this.scene.addChild(cube1);
            var meshf1 = cube1.gameObject.addComponent("meshFilter");
            var meshr1 = cube1.gameObject.addComponent("meshRenderer");
            meshf1.mesh = this.assetmgr.getDefaultMesh("cube");
            var cube2 = new gd3d.framework.transform();
            cube2.localScale = new gd3d.math.vector3(0.2, 0.2, 0.2);
            this.paodan = cube2;
            this.scene.addChild(cube2);
            var meshf2 = cube2.gameObject.addComponent("meshFilter");
            var meshr2 = cube2.gameObject.addComponent("meshRenderer");
            meshf2.mesh = this.assetmgr.getDefaultMesh("cube");
            var cube3 = new gd3d.framework.transform();
            this.guiji = cube3;
            cube3.localPosition = this.orgPos;
            this.scene.addChild(cube3);
            var meshf3 = cube3.gameObject.addComponent("meshFilter");
            var meshr3 = cube3.gameObject.addComponent("meshRenderer");
            var mat = new gd3d.framework.material();
            var shader = this.assetmgr.getShader("diffuse_bothside.shader.json");
            mat.setShader(shader);
            meshr3.materials = [mat];
            var cube4 = new gd3d.framework.transform();
            this.guanghuan = cube4;
            cube4.localScale = new gd3d.math.vector3(3, 0.1, 3);
            this.scene.addChild(cube4);
            var meshf4 = cube4.gameObject.addComponent("meshFilter");
            cube4.gameObject.addComponent("meshRenderer");
            meshf4.mesh = this.assetmgr.getDefaultMesh("cube");
            this.startTrans = this.addscaledCube(0.3);
            this.middleTrans = this.addscaledCube(0.3);
            this.endTrans = this.addscaledCube(0.3);
        };
        paowuxian.prototype.addscaledCube = function (scale) {
            var cube4 = new gd3d.framework.transform();
            this.cubes.push(cube4);
            cube4.localScale = new gd3d.math.vector3(scale, scale, scale);
            this.scene.addChild(cube4);
            var meshf4 = cube4.gameObject.addComponent("meshFilter");
            cube4.gameObject.addComponent("meshRenderer");
            meshf4.mesh = this.assetmgr.getDefaultMesh("cube");
            return cube4;
        };
        paowuxian.prototype.getDirByRotAngle = function (euler, dir) {
            var rot = new gd3d.math.quaternion();
            gd3d.math.quatFromEulerAngles(euler.x, euler.y, euler.z, rot);
            gd3d.math.quatTransformVector(rot, gd3d.math.pool.vector3_forward, dir);
        };
        paowuxian.prototype.getMeshData = function (anglex, gravity, speed, paoLen, paojiaPosY) {
            if (paojiaPosY === void 0) { paojiaPosY = 0; }
            if (this.mesh == null) {
                this.mesh = this.initmesh(anglex, gravity, speed, paoLen, paojiaPosY);
            }
            else {
                anglex = anglex * Math.PI / 180;
                var halfwidth = 1;
                var posarr = [];
                var Middleposarr = [];
                var paokouy = paoLen * Math.sin(anglex);
                var paokouz = paoLen * Math.cos(anglex);
                var speedy = Math.sin(anglex) * speed;
                var speedz = Math.cos(anglex) * speed;
                var totalTime = speedy / gravity + Math.sqrt(2 * (paojiaPosY + paokouy) / gravity + Math.pow(speedy / gravity, 2));
                var count = this.lerpCount;
                var deltaTime = totalTime / count;
                for (var i = 0; i <= count; i++) {
                    var counttime = deltaTime * i;
                    var newpos1 = new gd3d.math.vector3(halfwidth, speedy * counttime - 0.5 * gravity * Math.pow(counttime, 2) + paokouy, speedz * counttime + paokouz);
                    var newpos2 = new gd3d.math.vector3(-halfwidth, speedy * counttime - 0.5 * gravity * Math.pow(counttime, 2) + paokouy, speedz * counttime + paokouz);
                    posarr.push(newpos1);
                    posarr.push(newpos2);
                    var middlepos = new gd3d.math.vector3(0, speedy * counttime - 0.5 * gravity * Math.pow(counttime, 2) + paokouy, speedz * counttime + paokouz);
                    Middleposarr.push(middlepos);
                    if (i == count) {
                        this.guanghuantoPaoJia = speedz * counttime + paokouz;
                    }
                }
                this.mesh.data.pos = posarr;
                this.pointArr = Middleposarr;
                var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.UV0;
                var v32 = this.mesh.data.genVertexDataArray(vf);
                this.mesh.glMesh.uploadVertexData(this.app.webgl, v32);
                this.startPos.y = paokouy;
                this.startPos.z = paokouz;
                var time = speedy / gravity;
                this.hPos.y = speedy * time - 0.5 * gravity * Math.pow(time, 2) + paokouy;
                this.hPos.z = speedz * time + paokouz;
                this.endpos.y = -paojiaPosY;
                this.endpos.z = speedz * totalTime + paokouz;
            }
            return this.mesh;
        };
        paowuxian.prototype.initmesh = function (anglex, gravity, speed, paoLen, paojiaPosY) {
            if (paojiaPosY === void 0) { paojiaPosY = 0; }
            anglex = anglex * Math.PI / 180;
            var halfwidth = 1;
            var posarr = [];
            var uvArr = [];
            var trisindex = [];
            var data = new gd3d.render.meshData();
            data.pos = posarr;
            data.uv = uvArr;
            data.trisindex = trisindex;
            var paokouy = paoLen * Math.sin(anglex);
            var paokouz = paoLen * Math.cos(anglex);
            var speedy = Math.sin(anglex) * speed;
            var speedz = Math.cos(anglex) * speed;
            var totalTime = speedy / gravity + Math.sqrt(2 * (paojiaPosY + paokouy) / gravity + Math.pow(speedy / gravity, 2));
            var count = this.lerpCount;
            var deltaTime = totalTime / count;
            for (var i = 0; i <= count; i++) {
                var counttime = deltaTime * i;
                var newpos1 = new gd3d.math.vector3(halfwidth, speedy * counttime - 0.5 * gravity * Math.pow(counttime, 2) + paokouy, speedz * counttime + paokouz);
                var newpos2 = new gd3d.math.vector3(-halfwidth, speedy * counttime - 0.5 * gravity * Math.pow(counttime, 2) + paokouy, speedz * counttime + paokouz);
                posarr.push(newpos1);
                posarr.push(newpos2);
                var newUv1 = new gd3d.math.vector2(i / count, 0);
                var newUv2 = new gd3d.math.vector2(i / count, 1);
                uvArr.push(newUv1);
                uvArr.push(newUv2);
                trisindex.push();
            }
            for (var i = 0; i < count; i++) {
                trisindex.push(2 * i + 0, 2 * i + 2, 2 * i + 1, 2 * i + 1, 2 * i + 2, 2 * i + 3);
            }
            var _mesh = new gd3d.framework.mesh(".mesh.bin");
            _mesh.data = data;
            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.UV0;
            _mesh.data.originVF = vf;
            var v32 = _mesh.data.genVertexDataArray(vf);
            var i16 = _mesh.data.genIndexDataArray();
            _mesh.glMesh = new gd3d.render.glMesh();
            _mesh.glMesh.initBuffer(this.app.webgl, vf, _mesh.data.pos.length, gd3d.render.MeshTypeEnum.Dynamic);
            _mesh.glMesh.uploadVertexData(this.app.webgl, v32);
            _mesh.glMesh.addIndex(this.app.webgl, i16.length);
            _mesh.glMesh.uploadIndexData(this.app.webgl, 0, i16);
            _mesh.submesh = [];
            {
                var sm = new gd3d.framework.subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = i16.length;
                sm.line = false;
                _mesh.submesh.push(sm);
            }
            return _mesh;
        };
        paowuxian.prototype.addUI = function () {
            var _this = this;
            var deltaangle = 3;
            this.addBtn("左转", 30, 300, function () {
                _this.rotEuler.y -= deltaangle;
            });
            this.addBtn("右转", 100, 300, function () {
                _this.rotEuler.y += deltaangle;
            });
            this.addBtn("上转", 30, 400, function () {
                _this.rotEuler.x -= deltaangle;
            });
            this.addBtn("下转", 100, 400, function () {
                _this.rotEuler.x += deltaangle;
            });
            this.addBtn("发射", 60, 450, function () {
                _this.actived = true;
            });
            this.addBtn("切换相机", 60, 500, function () {
                _this.cam2.visible = !_this.cam2.visible;
                _this.camera.gameObject.visible = !_this.camera.gameObject.visible;
            });
            this.addBtn("w", 30, 600, function () {
                if (_this.enableWASD) {
                    _this.endTrans.localPosition.z += 1;
                    _this.endTrans.markDirty();
                    _this.apply();
                }
            });
            this.addBtn("s", 100, 600, function () {
                if (_this.enableWASD) {
                    _this.endTrans.localPosition.z -= 1;
                    _this.endTrans.markDirty();
                    _this.apply();
                }
            });
            this.addBtn("a", 30, 700, function () {
                if (_this.enableWASD) {
                    _this.endTrans.localPosition.x -= 1;
                    _this.endTrans.markDirty();
                    _this.apply();
                }
            });
            this.addBtn("d", 100, 700, function () {
                if (_this.enableWASD) {
                    _this.endTrans.localPosition.x += 1;
                    _this.endTrans.markDirty();
                    _this.apply();
                }
            });
        };
        paowuxian.prototype.apply = function () {
            var target = new gd3d.math.vector3();
            gd3d.math.vec3Subtract(this.endTrans.localPosition, this.guiji.localPosition, target);
            target.y = 0;
            var rotinfo = this.getRotAnlge(this.speed, this.orgPos.y, this.gravity, target, gd3d.math.pool.vector3_forward);
            this.rotEuler.x = -1 * rotinfo.rotx;
            this.rotEuler.y = rotinfo.roty;
        };
        paowuxian.prototype.addBtn = function (text, x, y, func) {
            var btn = document.createElement("button");
            btn.textContent = text;
            btn.onclick = function () {
                func();
            };
            btn.style.top = y + "px";
            btn.style.left = x + "px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        paowuxian.prototype.loadmesh = function (laststate, state) {
            var _this = this;
            var name = "box";
            name = "CJ";
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    var item = _prefab.getCloneTrans();
                    _this.scene.addChild(item);
                    var showColider_1 = function (trans) {
                        var collider = trans.gameObject.getComponent("boxcollider");
                        if (collider != null) {
                            collider.colliderVisible = true;
                            _this.targets.push(trans);
                        }
                        if (trans.children != null) {
                            for (var key in trans.children) {
                                showColider_1(trans.children[key]);
                            }
                        }
                    };
                    showColider_1(item);
                    state.finish = true;
                }
            });
        };
        paowuxian.prototype.intersects = function (LinePoints, mesh, matrix, outInfo) {
            var ishided = false;
            if (!mesh.submesh)
                return ishided;
            var lastDistance = Number.MAX_VALUE;
            var worldPosArr = [];
            for (var i = 0, len = mesh.data.pos.length; i < len; i++) {
                var p0 = mesh.data.pos[i];
                var t0 = gd3d.math.pool.new_vector3();
                gd3d.math.matrixTransformVector3(p0, matrix, t0);
                worldPosArr.push(t0);
            }
            for (var i = 0; i < LinePoints.length - 1; i++) {
                var dir = new gd3d.math.vector3();
                gd3d.math.vec3Subtract(LinePoints[i + 1], LinePoints[i], dir);
                var len = gd3d.math.vec3Length(dir);
                gd3d.math.vec3Normalize(dir, dir);
                var ray = new gd3d.framework.ray(LinePoints[i], dir);
                for (var j = 0; j < mesh.submesh.length; j++) {
                    var submesh = mesh.submesh[j];
                    for (var index = submesh.start; index < submesh.size; index += 3) {
                        var t0 = worldPosArr[mesh.data.trisindex[index]];
                        var t1 = worldPosArr[mesh.data.trisindex[index + 1]];
                        var t2 = worldPosArr[mesh.data.trisindex[index + 2]];
                        var tempinfo = gd3d.math.pool.new_pickInfo();
                        var bool = ray.intersectsTriangle(t0, t1, t2, tempinfo);
                        if (bool && tempinfo.distance > 0 && tempinfo.distance <= len) {
                            var hitpos = gd3d.math.pool.new_vector3();
                            gd3d.math.vec3ScaleByNum(ray.direction, tempinfo.distance, hitpos);
                            gd3d.math.vec3Add(ray.origin, hitpos, hitpos);
                            var dist = gd3d.math.vec3Distance(hitpos, LinePoints[0]);
                            if (dist < lastDistance) {
                                ishided = true;
                                outInfo.cloneFrom(tempinfo);
                                outInfo.faceId = index / 3;
                                outInfo.subMeshId = j;
                                gd3d.math.vec3Clone(hitpos, outInfo.hitposition);
                                lastDistance = dist;
                            }
                            gd3d.math.pool.delete_vector3(hitpos);
                        }
                        gd3d.math.pool.delete_pickInfo(tempinfo);
                    }
                }
            }
            gd3d.math.pool.delete_vector3Array(worldPosArr);
            return ishided;
        };
        paowuxian.prototype.intersectCollider = function (LinePoints, target, outInfo) {
            var ishided = false;
            var lastDistance = Number.MAX_VALUE;
            for (var i = 0; i < LinePoints.length - 1; i++) {
                var dir = new gd3d.math.vector3();
                gd3d.math.vec3Subtract(LinePoints[i + 1], LinePoints[i], dir);
                var len = gd3d.math.vec3Length(dir);
                gd3d.math.vec3Normalize(dir, dir);
                var ray = new gd3d.framework.ray(LinePoints[i], dir);
                var tempinfo = gd3d.math.pool.new_pickInfo();
                var bool = ray.intersectCollider(target, tempinfo);
                if (bool) {
                    if (tempinfo.distance <= len) {
                        var dist = gd3d.math.vec3Distance(tempinfo.hitposition, LinePoints[0]);
                        if (dist < lastDistance) {
                            ishided = true;
                            outInfo.cloneFrom(tempinfo);
                            outInfo.distance = dist;
                            lastDistance = dist;
                        }
                    }
                }
                gd3d.math.pool.delete_pickInfo(tempinfo);
            }
            return ishided;
        };
        paowuxian.prototype.getRotAnlge = function (speed, h, g, target, forward) {
            var L = Math.sqrt(target.x * target.x + target.z * target.z);
            var a = 0.5 * g * L * L / (speed * speed);
            var sqrt = (h - a) / a + Math.pow(L / (2 * a), 2);
            if (sqrt > 0) {
                var tana = Math.sqrt(sqrt) + L / (2 * a);
                var _rotx = Math.atan(tana) * 180 / Math.PI;
                var _roty = this.fromToRotation(forward, target, gd3d.math.pool.vector3_right);
                return { rotx: _rotx, roty: _roty, canReach: true };
            }
            else {
                var tana = L / (2 * a);
                var _rotx = Math.atan(tana) * 180 / Math.PI;
                var _roty = this.fromToRotation(forward, target, gd3d.math.pool.vector3_right);
                return { rotx: _rotx, roty: _roty, canReach: true };
            }
        };
        paowuxian.prototype.fromToRotation = function (from, to, right) {
            var dir1 = gd3d.math.pool.new_vector3();
            var dir2 = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Normalize(from, dir1);
            gd3d.math.vec3Normalize(to, dir2);
            var dot = gd3d.math.vec3Dot(dir1, dir2);
            var dot2 = gd3d.math.vec3Dot(dir2, right);
            dot2 = Math.acos(dot2) * 180 / Math.PI;
            if (dot2 > 90) {
                dot = -1 * Math.acos(dot) * 180 / Math.PI;
            }
            else {
                dot = Math.acos(dot) * 180 / Math.PI;
            }
            return dot;
        };
        return paowuxian;
    }());
    dome.paowuxian = paowuxian;
    var camCtr = (function () {
        function camCtr() {
            this.type = "camCtr";
            this._distance = 0;
            this._offset = new gd3d.math.vector3();
            this.camrotAgnle = new gd3d.math.vector3();
            this.targetpos = new gd3d.math.vector3();
        }
        camCtr.prototype.setTarget = function (target, worldOffset) {
            if (worldOffset === void 0) { worldOffset = null; }
            this._target = target;
            this._worldOffset = worldOffset;
        };
        camCtr.prototype.setRotAngle = function (yanle, xangle) {
            this.camrotAgnle.x = xangle;
            this.camrotAgnle.y = yanle;
        };
        camCtr.prototype.setDistanceToTarget = function (distance) {
            this._distance = distance;
        };
        camCtr.prototype.onPlay = function () {
        };
        camCtr.prototype.start = function () {
        };
        camCtr.prototype.update = function (delta) {
            if (this._target == null) {
                gd3d.math.quatFromEulerAngles(this.camrotAgnle.x, this.camrotAgnle.y, 0, this.gameObject.transform.localRotate);
                this.gameObject.transform.markDirty();
            }
            else {
                gd3d.math.quatFromEulerAngles(this.camrotAgnle.x, this.camrotAgnle.y, 0, this.gameObject.transform.localRotate);
                gd3d.math.quatTransformVector(this.gameObject.transform.localRotate, gd3d.math.pool.vector3_forward, this._offset);
                gd3d.math.vec3ScaleByNum(this._offset, this._distance, this._offset);
                if (this._worldOffset != null) {
                    gd3d.math.vec3Add(this._target.getWorldPosition(), this._worldOffset, this.targetpos);
                }
                else {
                    gd3d.math.vec3Clone(this._target.getWorldPosition(), this.targetpos);
                }
                gd3d.math.vec3Subtract(this.targetpos, this._offset, this.gameObject.transform.localPosition);
                this.gameObject.transform.markDirty();
            }
        };
        camCtr.prototype.remove = function () {
        };
        camCtr.prototype.clone = function () {
        };
        camCtr = __decorate([
            gd3d.reflect.nodeComponent
        ], camCtr);
        return camCtr;
    }());
    dome.camCtr = camCtr;
})(dome || (dome = {}));
var dome;
(function (dome) {
    var paowuxian2 = (function () {
        function paowuxian2() {
            this.taskmgr = new gd3d.framework.taskMgr();
            this.pointDown = false;
            this.targets = [];
            this.beUIFollow = false;
            this.hitPosition = new gd3d.math.vector3();
            this.behit = false;
            this.middlePos = new gd3d.math.vector3();
            this.targetPos = new gd3d.math.vector3();
            this.beLaunched = false;
            this.time = 0;
            this.totaltime = 5;
            this.temp_pickInfo = gd3d.math.pool.new_pickInfo();
            this.temptPos = new gd3d.math.vector3();
            this.temptdir = new gd3d.math.vector3();
            this.lookpos = new gd3d.math.vector3();
            this.lastPos = new gd3d.math.vector3();
            this.realDIr = new gd3d.math.vector3();
            this.winddisturb = 0;
            this.gravitydisturb = 0;
            this.screenpos = new gd3d.math.vector2();
            this.targetRotation = new gd3d.math.quaternion();
            this.lastRotaion = new gd3d.math.quaternion();
            this.paoheight = 2;
            this.paoLen = 1;
            this.paokouPos = new gd3d.math.vector3();
            this.beActiveRot = false;
            this.rotTotalTime = 1;
            this.rottime = 0;
        }
        paowuxian2.prototype.start = function (app) {
            this.app = app;
            this.scene = app.getScene();
            this.assetmgr = app.getAssetMgr();
            this.inputMgr = this.app.getInputMgr();
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadmesh.bind(this));
            this.taskmgr.addTaskCall(this.gameInit.bind(this));
        };
        paowuxian2.prototype.update = function (delta) {
            if (this.pointDown == false && this.inputMgr.point.touch == true) {
                this.fire();
            }
            this.pointDown = this.inputMgr.point.touch;
            this.taskmgr.move(delta);
            CameraController.instance().update(delta);
            this.gameupdate(delta);
        };
        paowuxian2.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        paowuxian2.prototype.loadmesh = function (laststate, state) {
            var _this = this;
            var name = "box";
            name = "Map_Castle";
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    var item = _prefab.getCloneTrans();
                    _this.scene.addChild(item);
                    var showColider_2 = function (trans) {
                        var collider = trans.gameObject.getComponent("boxcollider");
                        if (collider != null) {
                            collider.colliderVisible = true;
                            _this.targets.push(trans);
                        }
                        if (trans.children != null) {
                            for (var key in trans.children) {
                                showColider_2(trans.children[key]);
                            }
                        }
                    };
                    showColider_2(item);
                    state.finish = true;
                }
            });
        };
        paowuxian2.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -15);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            var controller = new CameraController();
            CameraController.instance().init(this.app, this.camera);
            state.finish = true;
        };
        paowuxian2.prototype.gameInit = function (laststate, state) {
            var _this = this;
            this.paojia = this.addcube(new gd3d.math.vector3(), new gd3d.math.vector3(1, 1.0, 2.0));
            this.paojia.localPosition.y += this.paoheight;
            this.paojia.markDirty();
            this.paodan = this.addcube(new gd3d.math.vector3(), new gd3d.math.vector3(0.2, 0.2, 0.2));
            this.addPaoDancam();
            this.addBtn("切换相机", 60, 500, function () {
                _this.cam2.visible = !_this.cam2.visible;
                _this.camera.gameObject.visible = !_this.camera.gameObject.visible;
            });
            this.addBtn("UI跟随Paodan", 60, 700, function () {
                _this.beUIFollow = !_this.beUIFollow;
                if (_this.beUIFollow == false) {
                    _this.testUI.localTranslate.x = 0;
                    _this.testUI.localTranslate.y = 0;
                    _this.testUI.markDirty();
                }
            });
            this.floor = this.scene.getRoot().find("Map_Castle_floor");
            state.finish = true;
        };
        paowuxian2.prototype.addPaoDancam = function () {
            var objCam = new gd3d.framework.transform();
            this.cam2 = objCam.gameObject;
            this.cam2.visible = false;
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            var camera = objCam.gameObject.addComponent("camera");
            camera.near = 0.01;
            camera.far = 2000;
            camera.fov = Math.PI * 0.3;
            camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -15);
            objCam.markDirty();
            this.camctr = objCam.gameObject.addComponent("camCtr");
            this.camctr.setTarget(this.paodan, new gd3d.math.vector3(0, 0.5, 0));
            this.camctr.setDistanceToTarget(5);
            this.camctr.setRotAngle(0, 30);
            this.rooto2d = new gd3d.framework.overlay2D();
            this.camera.addOverLay(this.rooto2d);
            var raw_t2 = new gd3d.framework.transform2D;
            this.testUI = raw_t2;
            raw_t2.name = "滑动卷轴框png";
            raw_t2.width = 100;
            raw_t2.height = 100;
            var raw_i2 = raw_t2.addComponent("rawImage2D");
            raw_i2.image = this.assetmgr.getDefaultTexture("grid");
            this.rooto2d.addChild(raw_t2);
        };
        paowuxian2.prototype.fire = function () {
            var _this = this;
            this.pickScene(function (info) {
                console.warn("pick point:" + info.hitposition.toString(), info);
                gd3d.math.vec3Clone(info.hitposition, _this.targetPos);
                var target = _this.addcube(_this.targetPos);
                _this.beforeRotatePaojia();
            });
        };
        paowuxian2.prototype.fireBullet = function () {
            this.beLaunched = true;
            this.time = 0;
        };
        paowuxian2.prototype.pickScene = function (fuc) {
            var _this = this;
            var inputMgr = this.app.getInputMgr();
            var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
            this.rayInstersetScene(ray, function (info) {
                gd3d.math.vec3Clone(info.hitposition, _this.hitPosition);
                fuc(info);
            });
        };
        paowuxian2.prototype.gameupdate = function (delta) {
            this.updateBullet(delta);
            this.updateUI();
            this.updateRotPaojia(delta);
        };
        paowuxian2.prototype.updateBullet = function (delta) {
            var _this = this;
            if (this.beLaunched) {
                this.time += delta * 4;
                var lerp = this.time / this.totaltime;
                gd3d.math.vec3Clone(this.paodan.localPosition, this.lastPos);
                var paojiaWorldpos = this.paojia.getWorldPosition();
                this.bessel(paojiaWorldpos, this.middlePos, this.hitPosition, lerp, this.temptPos);
                this.temptPos.x += this.winddisturb * this.time;
                this.temptPos.y -= this.gravitydisturb * this.time;
                this.paodan.lookatPoint(this.temptPos);
                gd3d.math.vec3Clone(this.temptPos, this.paodan.localPosition);
                this.paodan.markDirty();
                gd3d.math.vec3Subtract(this.temptPos, this.lastPos, this.realDIr);
                if (this.realDIr.y < 0) {
                    gd3d.math.vec3Normalize(this.realDIr, this.realDIr);
                    var ray = new gd3d.framework.ray(this.lastPos, this.realDIr);
                    this.rayInstersetScene(ray, function (info) {
                        var dis = gd3d.math.vec3Distance(_this.lastPos, _this.temptPos);
                        if (info.distance < dis + 0.2) {
                            _this.addcube(info.hitposition);
                            {
                                console.warn("---------------碰到了");
                                _this.beLaunched = false;
                                _this.time = 0;
                                if (_this.onEndCollision) {
                                    _this.onEndCollision(info.hitposition);
                                }
                            }
                        }
                    });
                }
            }
        };
        paowuxian2.prototype.updateUI = function () {
            if (this.beUIFollow && this.paodan) {
                var pos = this.paodan.getWorldPosition();
                this.camera.calcScreenPosFromWorldPos(this.app, pos, this.screenpos);
                gd3d.math.vec2Clone(this.screenpos, this.testUI.localTranslate);
                this.testUI.markDirty();
            }
        };
        paowuxian2.prototype.beforeRotatePaojia = function () {
            this.adjustMiddlePoint(this.paojia.getWorldPosition(), this.targetPos, this.middlePos);
            var dir = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Subtract(this.middlePos, this.paojia.getWorldPosition(), dir);
            gd3d.math.vec3Normalize(dir, dir);
            gd3d.math.quatClone(this.paojia.localRotate, this.lastRotaion);
            this.getRotationByDir(dir, gd3d.math.pool.vector3_forward, this.targetRotation);
            gd3d.math.vec3Clone(this.paojia.getWorldPosition(), this.paokouPos);
            this.paokouPos.y += this.paoheight;
            this.scaleAndAdd(dir, this.paoLen, this.paokouPos, this.paokouPos);
            this.adjustMiddlePoint(this.paokouPos, this.targetPos, this.middlePos);
            {
                this.beActiveRot = true;
                this.rottime = 0;
            }
            gd3d.math.pool.delete_vector3(dir);
        };
        paowuxian2.prototype.updateRotPaojia = function (delta) {
            if (this.beActiveRot && this.rottime < this.rotTotalTime) {
                this.rottime += delta;
                var lerp = this.rottime / this.rotTotalTime;
                lerp = Math.min(lerp, 1.0);
                if (lerp == 1.0) {
                    this.beActiveRot = false;
                    if (this.onRotEnd != null) {
                        this.onRotEnd();
                    }
                    {
                        gd3d.math.vec3Clone(this.paojia.localPosition, this.paodan.localPosition);
                        this.paodan.markDirty();
                        if (this.onberforeFire) {
                            this.onberforeFire();
                        }
                        this.fireBullet();
                    }
                }
                gd3d.math.quatLerp(this.lastRotaion, this.targetRotation, this.paojia.localRotate, lerp);
                this.paojia.markDirty();
            }
        };
        paowuxian2.prototype.scaleAndAdd = function (from, scale, add, out) {
            out.x = from.x * scale + add.x;
            out.y = from.y * scale + add.y;
            out.z = from.z * scale + add.z;
        };
        paowuxian2.prototype.rayInstersetScene = function (ray, fuc) {
            var bePickMesh = false;
            var infos = this.intersetColliders(ray, this.targets);
            var info = gd3d.math.pool.new_pickInfo();
            var distance = Number.MAX_VALUE;
            var temptinfo = gd3d.math.pool.new_pickInfo();
            for (var i = 0; i < infos.length; i++) {
                var picked = this.intersetMesh(ray, temptinfo, infos[i].pickedtran);
                if (picked && temptinfo.distance < distance) {
                    bePickMesh = true;
                    distance = temptinfo.distance;
                    info.cloneFrom(temptinfo);
                }
            }
            if (bePickMesh) {
                fuc(info);
            }
            else {
                if (this.floor) {
                    bePickMesh = this.intersetMesh(ray, info, this.floor);
                    if (bePickMesh) {
                        fuc(info);
                    }
                }
            }
            for (var key in infos) {
                gd3d.math.pool.delete_pickInfo(infos[key]);
            }
        };
        paowuxian2.prototype.intersetMesh = function (ray, info, tran) {
            var meshFilter = tran.gameObject.getComponent("meshFilter");
            if (meshFilter != null) {
                var mesh = meshFilter.getMeshOutput();
                if (mesh) {
                    var bool = mesh.intersects(ray, tran.getWorldMatrix(), info);
                    return bool;
                }
            }
            return false;
        };
        paowuxian2.prototype.intersetColliders = function (ray, trans) {
            var infos = [];
            var info = gd3d.math.pool.new_pickInfo();
            for (var i = 0; i < trans.length; i++) {
                var bepicked = ray.intersectCollider(trans[i], info);
                if (bepicked) {
                    var newinfo = gd3d.math.pool.new_pickInfo();
                    newinfo.cloneFrom(info);
                    infos.push(newinfo);
                }
            }
            infos.sort(function (a, b) {
                return a.distance - b.distance;
            });
            return infos;
        };
        paowuxian2.prototype.addcube = function (pos, scale) {
            if (scale === void 0) { scale = null; }
            var cube4 = new gd3d.framework.transform();
            if (scale != null) {
                gd3d.math.vec3Clone(scale, cube4.localScale);
            }
            gd3d.math.vec3Clone(pos, cube4.localPosition);
            this.scene.addChild(cube4);
            var meshf4 = cube4.gameObject.addComponent("meshFilter");
            cube4.gameObject.addComponent("meshRenderer");
            meshf4.mesh = this.assetmgr.getDefaultMesh("cube");
            return cube4;
        };
        paowuxian2.prototype.addBtn = function (text, x, y, func) {
            var btn = document.createElement("button");
            btn.textContent = text;
            btn.onclick = function () {
                func();
            };
            btn.style.top = y + "px";
            btn.style.left = x + "px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        paowuxian2.prototype.adjustMiddlePoint = function (from, to, pos) {
            var dis = gd3d.math.vec3Distance(from, to);
            var lerp = 0.7;
            gd3d.math.vec3SLerp(from, to, lerp, pos);
            pos.y += dis * 0.5;
        };
        paowuxian2.prototype.bessel = function (from, middle, to, t, out) {
            var p1 = Math.pow(1 - t, 2);
            var p2 = 2 * t * (1 - t);
            var p3 = Math.pow(t, 2);
            out.x = from.x * p1 + middle.x * p2 + to.x * p3;
            out.y = from.y * p1 + middle.y * p2 + to.y * p3;
            out.z = from.z * p1 + middle.z * p2 + to.z * p3;
        };
        paowuxian2.prototype.getBeselDir = function (from, middle, to, t, out) {
            var p1 = -1 * 2 * (1 - t);
            var p2 = 2 * (1 - 2 * t);
            var p3 = 2 * t;
            out.x = from.x * p1 + middle.x * p2 + to.x * p3;
            out.y = from.y * p1 + middle.y * p2 + to.y * p3;
            out.z = from.z * p1 + middle.z * p2 + to.z * p3;
        };
        paowuxian2.prototype.getRotationByDir = function (dir, forward, out) {
            var tana = dir.y / Math.sqrt(dir.x * dir.x + dir.z * dir.z);
            var _rotx = Math.atan(tana) * 180 / Math.PI;
            dir.y = 0;
            gd3d.math.vec3Normalize(dir, dir);
            var _roty = this.fromToRotation(forward, dir, gd3d.math.pool.vector3_right);
            gd3d.math.quatFromEulerAngles(-1 * _rotx, _roty, 0, out);
        };
        paowuxian2.prototype.getRotAnlge = function (dir, forward) {
            var tana = dir.y / Math.sqrt(dir.x * dir.x + dir.z * dir.z);
            var _rotx = Math.atan(tana) * 180 / Math.PI;
            dir.y = 0;
            gd3d.math.vec3Normalize(dir, dir);
            var _roty = this.fromToRotation(forward, dir, gd3d.math.pool.vector3_right);
            return { rotx: _rotx, roty: _roty };
        };
        paowuxian2.prototype.fromToRotation = function (from, to, right) {
            var dir1 = gd3d.math.pool.new_vector3();
            var dir2 = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Normalize(from, dir1);
            gd3d.math.vec3Normalize(to, dir2);
            var dot = gd3d.math.vec3Dot(dir1, dir2);
            var dot2 = gd3d.math.vec3Dot(dir2, right);
            dot2 = Math.acos(dot2) * 180 / Math.PI;
            if (dot2 > 90) {
                dot = -1 * Math.acos(dot) * 180 / Math.PI;
            }
            else {
                dot = Math.acos(dot) * 180 / Math.PI;
            }
            gd3d.math.pool.delete_vector3(dir1);
            gd3d.math.pool.delete_vector3(dir2);
            return dot;
        };
        return paowuxian2;
    }());
    dome.paowuxian2 = paowuxian2;
})(dome || (dome = {}));
var physic2d_dome = (function () {
    function physic2d_dome() {
        this.taskmgr = new gd3d.framework.taskMgr();
    }
    physic2d_dome.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 10;
        this.rooto2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(this.rooto2d);
        this.scene.enable2DPhysics();
        gd3d.framework.physic2D.setGravity(0, 0);
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));
    };
    physic2d_dome.prototype.createUI = function (astState, state) {
        var atlasComp = this.assetMgr.getAssetByName("comp.atlas.json");
        var tex_0 = this.assetMgr.getAssetByName("zg03_256.png");
        this.creatbox(100, 100, 120, 120, tex_0, this.rooto2d);
        this.creatbox(130, 300, 120, 120, tex_0, this.rooto2d);
        var wallWidth = 1200;
        var wallheigth = 600;
        this.crea2dWall(0, wallheigth / 2, 50, wallheigth, tex_0, this.rooto2d);
        this.crea2dWall(wallWidth, wallheigth / 2, 50, wallheigth, tex_0, this.rooto2d);
        this.crea2dWall(wallWidth / 2, 0, wallWidth, 50, tex_0, this.rooto2d);
        this.crea2dWall(wallWidth / 2, wallheigth, wallWidth, 50, tex_0, this.rooto2d);
        state.finish = true;
    };
    physic2d_dome.prototype.crea2dWall = function (posx, posy, width, height, texture, root) {
        var bound3 = new gd3d.framework.transform2D;
        bound3.localTranslate.x = posx;
        bound3.localTranslate.y = posy;
        bound3.width = width;
        bound3.height = height;
        bound3.pivot.x = 0.5;
        bound3.pivot.y = 0.5;
        var boundimag3 = bound3.addComponent("rawImage2D");
        boundimag3.image = texture;
        var body3 = bound3.addComponent("rectBody");
        body3.setInitData({ isStatic: true });
        root.addChild(bound3);
        return bound3;
    };
    physic2d_dome.prototype.creatbox = function (posx, posy, width, height, texture, root) {
        var bound3 = new gd3d.framework.transform2D;
        bound3.localTranslate.x = posx;
        bound3.localTranslate.y = posy;
        bound3.width = width;
        bound3.height = height;
        bound3.pivot.x = 0.5;
        bound3.pivot.y = 0.5;
        var boundimag3 = bound3.addComponent("rawImage2D");
        boundimag3.image = texture;
        var body3 = bound3.addComponent("rectBody");
        setTimeout(function () {
            body3.addForce(new gd3d.math.vector2(1, 0));
        }, 3000);
        root.addChild(bound3);
        return bound3;
    };
    physic2d_dome.prototype.loadTexture = function (lastState, state) {
        var _this = this;
        this.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                _this.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                    if (s.isfinish) {
                        _this.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                            if (s.isfinish) {
                                _this.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                                    _this.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
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
    physic2d_dome.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return physic2d_dome;
}());
var PhysicDemo;
(function (PhysicDemo) {
    var physic_01 = (function () {
        function physic_01() {
        }
        physic_01.prototype.start = function (app) {
            this.scene = app.getScene();
            var trans = new gd3d.framework.transform();
            trans.localScale.x = 10;
            trans.localScale.z = 10;
            this.scene.addChild(trans);
            var mf = trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER);
            var mr = trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER);
            mf.mesh = app.getAssetMgr().getDefaultMesh("cube");
            var trans2 = new gd3d.framework.transform();
            trans2.localPosition.y = 5;
            this.scene.addChild(trans2);
            var mf2 = trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER);
            var mr2 = trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER);
            mf2.mesh = app.getAssetMgr().getDefaultMesh("cube");
            this.scene.enablePhysics(new gd3d.math.vector3(0, -9.8, 0));
            var groundImpostor = new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.BoxImpostor, { mass: 0, restitution: 0.9 });
            var boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.9 });
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 15, -15);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            CameraController.instance().init(app, this.camera);
        };
        physic_01.prototype.update = function (delta) {
            CameraController.instance().update(delta);
        };
        return physic_01;
    }());
    PhysicDemo.physic_01 = physic_01;
})(PhysicDemo || (PhysicDemo = {}));
var dome;
(function (dome) {
    var db_test_f14eff = (function () {
        function db_test_f14eff() {
            this.timer = 0;
            this.taskmgr = new gd3d.framework.taskMgr();
            this.rot = new gd3d.math.quaternion();
            this.beTrailParticle = false;
            this.beActive = false;
            this.currentalpha = 0.9;
            this.boneIndex = 0;
            this.count = 0;
            this.beplay = false;
            this.a = new gd3d.math.vector3(1, 12, 123);
            this.b = new gd3d.math.vector3(1, 12, 123);
            this.c = new gd3d.math.vector3(1, 12, 123);
            this.enableMove = false;
        }
        db_test_f14eff.prototype.loadShader = function (laststate, state) {
            var cuttime = Date.now();
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                    var endtime = Date.now();
                    console.log();
                }
            });
        };
        db_test_f14eff.prototype.start = function (app) {
            var _this = this;
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.loadSkill.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.taskmgr.addTaskCall(this.addcontroll.bind(this));
            this.taskmgr.addTaskCall(this.loadWeapon.bind(this));
            this.taskmgr.addTaskCall(this.loadEffectPrefab.bind(this));
            document.onkeypress = function (ev) {
                var key = ev.keyCode;
                var keystr = ev.key.toUpperCase();
                console.log(keystr);
                if (keystr == "P" && _this.role != null) {
                    _this.rotEuler += 1;
                    gd3d.math.quatFromEulerAngles(0, 1, 0, _this.rot);
                    gd3d.math.quatMultiply(_this.role.localRotate, _this.rot, _this.role.localRotate);
                    _this.role.markDirty();
                }
            };
        };
        db_test_f14eff.prototype.loadmesh = function (laststate, state) {
            var _this = this;
            var name = "zs_chuangjue_01";
            name = "cwc_001";
            name = "pc1";
            name = "Quad_1";
            name = "baoxiang_ceshinn";
            name = "pc2_MergeSuit_104";
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    var value = _prefab.getCloneTrans();
                    _this.model = value;
                    var skins = _this.model.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER);
                    var roleskins = _this.role.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER);
                    for (var item in roleskins) {
                        var skin = roleskins[item];
                        var nameARR = skin.gameObject.transform.name.split('_');
                        if (nameARR[1] != null && nameARR[1] == "MergeSuit") {
                            _this.role.removeChild(skin.gameObject.transform);
                            _this.role.addChild(skins[0].gameObject.transform);
                            _this.suitTrans = skins[0].gameObject.transform;
                            _this.suitSkin = skins[0];
                        }
                    }
                    _this.model.markDirty();
                    state.finish = true;
                }
            });
        };
        db_test_f14eff.prototype.loadWeapon = function (laststate, state) {
            var _this = this;
            var name = "wp_ds_001";
            name = "box";
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    var rhand = _this.role.find("Bip01 Prop1");
                    var lhand = _this.role.find("Bip01 Prop2");
                    if (rhand) {
                        var weapon = _prefab.getCloneTrans();
                        rhand.addChild(weapon);
                        weapon.localRotate = new gd3d.math.quaternion();
                        weapon.localTranslate = new gd3d.math.vector3();
                        weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                        weapon.markDirty();
                    }
                    if (lhand) {
                        var weapon = _prefab.getCloneTrans();
                        lhand.addChild(weapon);
                        weapon.localRotate = new gd3d.math.quaternion();
                        weapon.localTranslate = new gd3d.math.vector3();
                        weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                        weapon.markDirty();
                    }
                    state.finish = true;
                }
            });
        };
        db_test_f14eff.prototype.loadEffectPrefab = function (laststate, state) {
            var _this = this;
            var name = "effprefab";
            name = "GameObject";
            name = "ceshi";
            name = "fx_cg_ui";
            name = "s_b";
            name = "fx_zgg_Skill01_S";
            name = "fx_wp_bj";
            name = "fx_wd";
            name = "fx_wd";
            name = "fx_js";
            this.app.getAssetMgr().load("res/f14effprefab/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    _this.effbaseprefab = _prefab;
                    var prefab = _prefab.getCloneTrans();
                    _this.effPrefab = prefab;
                    var f14Effect = _this.effPrefab.gameObject.getComponent("f14EffectSystem");
                    _this.f14eff = f14Effect;
                    if (_this.role) {
                        _this.role.addChild(_this.effPrefab);
                    }
                    else {
                        _this.scene.addChild(_this.effPrefab);
                    }
                    var delayTime = f14Effect.delay;
                    state.finish = true;
                }
            });
        };
        db_test_f14eff.prototype.loadSkill = function (laststate, state) {
            var _this = this;
            var name = "xc_skill1.FBAni.aniclip.bin";
            name = "skill.FBAni.aniclip.bin";
            name = "pc1_run.FBAni.aniclip.bin";
            name = "pc2_run.FBAni.aniclip.bin";
            name = "GWB02_sw_die1.FBAni.aniclip.bin";
            name = "UIbaoxiang_no_idle.FBAni.aniclip.bin";
            name = "gmd_xs_run.FBAni.aniclip.bin";
            name = "Run.FBAni.aniclip.bin";
            this.SkillName = name;
            var url = "res/prefabs/" + this.RoleName + "/resources/" + this.SkillName;
            this.app.getAssetMgr().load(url, gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var clip = _this.app.getAssetMgr().getAssetByName(_this.SkillName);
                    _this.aniPlayer.addClip(clip);
                    state.finish = true;
                    console.log("加载技能完成. res name:" + clip.getName());
                }
            });
        };
        db_test_f14eff.prototype.addcontroll = function (laststate, state) {
            this.addButton();
            this.addButton2();
            state.finish = true;
        };
        db_test_f14eff.prototype.addButton = function () {
            var _this = this;
            var btn = document.createElement("button");
            btn.textContent = "Play";
            btn.onclick = function () {
                _this.currentalpha *= 0.5;
                _this.f14eff.changeAlpha(_this.currentalpha);
                _this.aniPlayer.play(_this.SkillName);
            };
            btn.style.top = "160px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        db_test_f14eff.prototype.addButton2 = function () {
            var _this = this;
            var btn = document.createElement("button");
            btn.textContent = "stop";
            btn.onclick = function () {
                _this.f14eff.stop();
                _this.enableMove = false;
            };
            btn.style.top = "200px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        };
        db_test_f14eff.prototype.addcam = function (laststate, state) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera");
            this.camera.near = 0.01;
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -15);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            CameraController.instance().init(this.app, this.camera);
            this.app.getScene().mainCamera = this.camera;
            state.finish = true;
        };
        db_test_f14eff.prototype.loadRole = function (laststate, state) {
            var _this = this;
            var name = "hmb";
            name = "GWB02";
            name = "UIbaoxiang";
            name = "gmd";
            name = "elong";
            this.RoleName = name;
            this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
                if (s.isfinish) {
                    var _prefab = _this.app.getAssetMgr().getAssetByName(name + ".prefab.json");
                    var role = _prefab.getCloneTrans();
                    _this.role = role;
                    _this.aniPlayer = _this.role.gameObject.getComponent("aniplayer");
                    _this.aniPlayer.autoplay = false;
                    _this.aniclips = _this.aniPlayer.clips;
                    _this.scene.addChild(_this.role);
                    _this.role.markDirty();
                    var skins = _this.role.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER);
                    for (var key in skins) {
                        skins[key].gameObject.transform.localScale = new gd3d.math.vector3(1.2, 1.2, 1.2);
                        skins[key].gameObject.transform.markDirty();
                    }
                    state.finish = true;
                }
            });
        };
        db_test_f14eff.prototype.update = function (delta) {
            this.taskmgr.move(delta);
            CameraController.instance().update(delta);
            if (this.enableMove) {
                this.effPrefab.localPosition.z += 0.2;
                this.effPrefab.markDirty();
            }
        };
        return db_test_f14eff;
    }());
    dome.db_test_f14eff = db_test_f14eff;
})(dome || (dome = {}));
var test_ChangeMaterial = (function () {
    function test_ChangeMaterial() {
        this.isCube = false;
        this.timer = 0;
        this.material1 = new gd3d.framework.material();
        this.material2 = new gd3d.framework.material();
        this.taskmgr = new gd3d.framework.taskMgr();
        this.isMaterial1 = false;
        this.zeroPoint = new gd3d.math.vector3(0, 0, 0);
    }
    test_ChangeMaterial.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                state.finish = true;
            }
        });
    };
    test_ChangeMaterial.prototype.loadTexture = function (laststate, state) {
        var c = 0;
        c++;
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                c--;
                if (c == 0) {
                    state.finish = true;
                }
            }
            else {
                state.error = true;
            }
        });
        c++;
        this.app.getAssetMgr().load("res/map_normal.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                c--;
                if (c == 0) {
                    state.finish = true;
                }
            }
        });
    };
    test_ChangeMaterial.prototype.addCam = function (laststate, state) {
        var objCam = new gd3d.framework.transform;
        objCam.name = "Camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();
        console.log("add camera");
        state.finish = true;
    };
    test_ChangeMaterial.prototype.addCube = function (laststate, state) {
        var cube = new gd3d.framework.transform();
        cube.name = "Cube1";
        cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter");
        mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
        cube.gameObject.addComponent("meshRenderer");
        this.cube = cube;
        cube.markDirty();
        console.log("add cube");
        state.finish = true;
    };
    test_ChangeMaterial.prototype.addBtn = function () {
        var _this = this;
        var btn1 = document.createElement("button");
        btn1.textContent = "button1 更换material";
        btn1.onclick = function () {
            var renderer = _this.cube.gameObject.getComponent("meshRenderer");
            if (renderer != null) {
                renderer.materials = [];
                renderer.materials.push(new gd3d.framework.material());
                if (_this.isMaterial1) {
                    renderer.materials[0] = _this.material2;
                    _this.isMaterial1 = false;
                }
                else {
                    renderer.materials[0] = _this.material1;
                    _this.isMaterial1 = true;
                }
            }
        };
        btn1.style.top = "128px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
    };
    test_ChangeMaterial.prototype.setMaterial = function (laststate, state) {
        var shader1 = this.app.getAssetMgr().getShader("diffuse.shader.json");
        if (shader1 != null) {
            this.material1.setShader(shader1);
            var texture1 = this.app.getAssetMgr().getAssetByName("zg256.png");
            this.material1.setTexture("_MainTex", texture1);
            this.material2.setShader(shader1);
            var texture2 = this.app.getAssetMgr().getAssetByName("map_normal.png");
            this.material2.setTexture("_MainTex", texture2);
        }
        state.finish = true;
    };
    test_ChangeMaterial.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.setMaterial.bind(this));
        this.taskmgr.addTaskCall(this.addCube.bind(this));
        this.taskmgr.addTaskCall(this.addCam.bind(this));
        this.addBtn();
    };
    test_ChangeMaterial.prototype.update = function (delta) {
        this.taskmgr.move(delta);
        this.timer += delta;
        if (this.cube != null) {
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (this.camera != null) {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 4, -z2 * 10);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            }
        }
    };
    return test_ChangeMaterial;
}());
var test_ChangeMesh = (function () {
    function test_ChangeMesh() {
        this.isCube = false;
    }
    test_ChangeMesh.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.scene = this.app.getScene();
        {
            var cube = new gd3d.framework.transform();
            cube.name = "Cube1";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter");
            mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
            cube.gameObject.addComponent("meshRenderer");
            cube.gameObject.addComponent("boxcollider");
            this.cube = cube;
            cube.markDirty();
        }
        var btn1 = document.createElement("button");
        btn1.textContent = "button1 更换mesh";
        btn1.onclick = function () {
            if (_this.isCube == false) {
                var mesh_1 = cube.gameObject.getComponent("meshFilter");
                mesh_1.mesh = (_this.app.getAssetMgr()).getDefaultMesh("sphere");
                _this.isCube = true;
            }
            else {
                var mesh_2 = cube.gameObject.getComponent("meshFilter");
                mesh_2.mesh = _this.app.getAssetMgr().getDefaultMesh("cube");
                _this.isCube = false;
            }
        };
        btn1.style.top = "128px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();
    };
    test_ChangeMesh.prototype.update = function (delta) {
    };
    return test_ChangeMesh;
}());
var test_NewGameObject = (function () {
    function test_NewGameObject() {
    }
    test_NewGameObject.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        {
            var cube = new gd3d.framework.transform();
            cube.name = "Cube1";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter");
            mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
            cube.gameObject.addComponent("meshRenderer");
            cube.gameObject.addComponent("boxcollider");
            this.cube = cube;
            cube.markDirty();
        }
        {
            var sphere = new gd3d.framework.transform();
            sphere.name = "Cube's child";
            cube.addChild(sphere);
            sphere.localScale.x = sphere.localScale.y = sphere.localScale.z = 1;
            sphere.localTranslate.x = 2;
            var mesh = sphere.gameObject.addComponent("meshFilter");
            mesh.mesh = this.app.getAssetMgr().getDefaultMesh("sphere");
            sphere.gameObject.addComponent("meshRenderer");
            sphere.markDirty();
        }
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();
    };
    test_NewGameObject.prototype.update = function (delta) {
    };
    return test_NewGameObject;
}());
var test_NewScene = (function () {
    function test_NewScene() {
    }
    test_NewScene.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.markDirty();
    };
    test_NewScene.prototype.update = function (delta) {
    };
    return test_NewScene;
}());
var test_Sound = (function () {
    function test_Sound() {
        this.taskmgr = new gd3d.framework.taskMgr();
        this.time = 0;
    }
    test_Sound.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
            else {
                state.error = true;
            }
        });
    };
    test_Sound.prototype.loadTexture = function (laststate, state) {
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
            else {
                state.error = true;
            }
        });
    };
    test_Sound.prototype.addCam = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "Main Camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();
        state.finish = true;
    };
    test_Sound.prototype.addCube = function (laststate, state) {
        var objCube = new gd3d.framework.transform();
        objCube.name = "Cube";
        this.scene.addChild(objCube);
        objCube.localScale.x = objCube.localScale.y = objCube.localScale.z = 1;
        objCube.localTranslate = new gd3d.math.vector3(0, 0, 0);
        var mesh = objCube.gameObject.addComponent("meshFilter");
        var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
        mesh.mesh = (smesh);
        var render = objCube.gameObject.addComponent("meshRenderer");
        var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
        if (sh != null) {
            render.materials = [];
            render.materials.push(new gd3d.framework.material());
            render.materials[0].setShader(sh);
            var texture0 = this.app.getAssetMgr().getAssetByName("zg256.png");
            render.materials[0].setTexture("_MainTex", texture0);
        }
        this.cube = objCube;
        this.cube.markDirty();
        state.finish = true;
    };
    test_Sound.prototype.addBtnLoadSound = function (laststate, state) {
    };
    test_Sound.prototype.start = function (app) {
        this.app = app;
        this.scene = this.app.getScene();
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.addCube.bind(this));
        this.taskmgr.addTaskCall(this.addCam.bind(this));
    };
    test_Sound.prototype.update = function (delta) {
        this.taskmgr.move(delta);
        this.time += delta;
        if (this.cube != null) {
            var cubeTrans = this.cube.gameObject.transform;
            var yRoate = (this.time * 30) % 360;
            var yQuaternion = gd3d.math.pool.new_quaternion();
            gd3d.math.quatFromEulerAngles(0, yRoate, 0, yQuaternion);
            cubeTrans.localRotate = yQuaternion;
            cubeTrans.markDirty();
            console.log(this.time);
        }
    };
    return test_Sound;
}());
var EffectElement = (function (_super) {
    __extends(EffectElement, _super);
    function EffectElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = gd3d.framework.EffectElementTypeEnum.SingleMeshType;
        _this.beLoop = false;
        return _this;
    }
    return EffectElement;
}(gd3d.framework.transform));
var test_effecteditor = (function () {
    function test_effecteditor() {
        this.timer = 0;
        this.taskmgr = new gd3d.framework.taskMgr();
        this.length = 0;
        this.beclone = false;
        this.effectloaded = false;
        this.bestop = false;
        this.bereplay = false;
    }
    test_effecteditor.prototype.setVal = function (val, property, data) {
        if (val != "") {
            try {
                var v = parseFloat(val);
                data[property] = v;
            }
            catch (e) {
            }
        }
    };
    test_effecteditor.prototype.start = function (app) {
        var _this = this;
        this.app = app;
        this.scene = this.app.getScene();
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = "20px";
        this.app.container.appendChild(div);
        this.gui = new lighttool.htmlui.gui(div);
        lighttool.htmlui.panelMgr.instance().init(div);
        this.gui.onchange = function () {
        };
        setInterval(function () {
            _this.gui.update();
        }, 300);
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadText.bind(this));
        this.taskmgr.addTaskCall(this.addcam.bind(this));
        this.taskmgr.addTaskCall(this.loadEffect.bind(this));
    };
    test_effecteditor.prototype.addElement = function () {
        var element = new gd3d.framework.EffectElementData();
        element.name = "element" + this.length;
        this.effectSysData.elementDic[element.name] = (element);
        this.length++;
        element.type = gd3d.framework.EffectElementTypeEnum.SingleMeshType;
        element.initFrameData = new gd3d.framework.EffectFrameData();
        element.initFrameData.frameIndex = -1;
        element.initFrameData.attrsData = new gd3d.framework.EffectAttrsData();
        element.initFrameData.attrsData.pos = new gd3d.math.vector3();
        element.initFrameData.attrsData.scale = new gd3d.math.vector3(1, 1, 1);
        element.initFrameData.attrsData.euler = new gd3d.math.vector3();
    };
    test_effecteditor.prototype.play = function () {
        this.effectSystem.data = this.effectSysData;
        this.app.getScene().addChild(this.transformRoot);
        this.transformRoot.markDirty();
        this.effectSystem.reset();
        this.effectSystem.play();
    };
    test_effecteditor.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
        });
    };
    test_effecteditor.prototype.loadText = function (laststate, state) {
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, function (s) {
            if (s.isfinish) {
                state.finish = true;
            }
            else {
                state.error = true;
            }
        });
    };
    test_effecteditor.prototype.loadEffect = function (laststate, state) {
        var _this = this;
        var names = ["fx_ss_female@attack_01", "fx_shengji_jiaose", "fx_ss_female@attack_03", "fx_ss_female@attack_02", "fx_0_zs_male@attack_02", "fx_shuijing_cj", "fx_fs_female@attack_02", "fx_0005_sword_sword", "fx_0005_sword_sword", "fx_0_zs_male@attack_02", "fx_fs_female@attack_02"];
        var name = names[0];
        this.app.getAssetMgr().load("res/particleEffect/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                _this.tr = new gd3d.framework.transform();
                _this.effect = _this.tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM);
                var text = _this.app.getAssetMgr().getAssetByName(name + ".effect.json");
                _this.effect.setJsonData(text);
                _this.scene.addChild(_this.tr);
                _this.tr.markDirty();
                state.finish = true;
                _this.effectloaded = true;
            }
        });
    };
    test_effecteditor.prototype.addButton = function () {
        var _this = this;
        var btn = document.createElement("button");
        btn.textContent = "Load Prefab";
        btn.onclick = function () {
            _this.app.getAssetMgr().savePrefab(_this.tr, "prefabName", function (data, resourses) {
                console.log(data.files);
                console.log(resourses.length);
            });
        };
        btn.style.top = "160px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);
        var btn1 = document.createElement("button");
        btn1.textContent = "Save To Prefab";
        btn1.onclick = function () {
            var name = _this.tr.name;
            var _prefab = new gd3d.framework.prefab(name);
            _this.app.getAssetMgr().use(_prefab);
            _prefab.assetbundle = name;
            var path = "";
            _this.app.getAssetMgr().savePrefab(_this.tr, name, function (data, resourses) {
                console.log(data.files);
                console.log(resourses.length);
                var _loop_3 = function (key) {
                    var val = data.files[key];
                    var blob = localSave.Instance.file_str2blob(val);
                    var files = [];
                    var resPath = path + "/resources/";
                    var _loop_4 = function (i) {
                        var resourceUrl = resourses[i];
                        var resourceName = _this.getNameFromURL(resourceUrl);
                        var resourceLength = 0;
                        if (resourceName.indexOf(".txt") != -1 || resourceName.indexOf(".json")) {
                            localSave.Instance.loadTextImmediate(resourceUrl, function (_txt, _err) {
                                var blob = localSave.Instance.file_str2blob(_txt);
                                localSave.Instance.save(resPath + resourceName, blob);
                            });
                        }
                        else {
                            localSave.Instance.loadBlobImmediate(resourceUrl, function (_blob, _err) {
                                localSave.Instance.save(resPath + resourceName, _blob);
                            });
                        }
                        var fileInfo_2 = { "name": "resources/" + resourceName, "length": 100 };
                        files.push(fileInfo_2);
                    };
                    for (var i = 0; i < resourses.length; i++) {
                        _loop_4(i);
                    }
                    localSave.Instance.save(resPath + name + ".prefab.json", blob);
                    var fileInfo = { "name": "resources/" + name + ".prefab.json", "length": 100 };
                    files.push(fileInfo);
                    var assetBundleStr = JSON.stringify({ "files": files });
                    var assetBundleBlob = localSave.Instance.file_str2blob(assetBundleStr);
                    localSave.Instance.save(path + "/" + name + ".assetbundle.json", assetBundleBlob);
                };
                for (var key in data.files) {
                    _loop_3(key);
                }
            });
        };
        btn1.style.top = "320px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
    };
    test_effecteditor.prototype.getNameFromURL = function (path) {
        var index = path.lastIndexOf("/");
        return path.substring(index + 1);
    };
    test_effecteditor.prototype.addcam = function (laststate, state) {
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 200;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0, 20, 20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    };
    test_effecteditor.prototype.update = function (delta) {
        this.taskmgr.move(delta);
    };
    return test_effecteditor;
}());
var gd3d;
(function (gd3d) {
    var framework;
    (function (framework) {
        var HoverCameraScript = (function (_super) {
            __extends(HoverCameraScript, _super);
            function HoverCameraScript() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.lookAtPoint = new gd3d.math.vector3(0, 0, 0);
                _this.distance = 30;
                _this.minPanAngle = -Infinity;
                _this.maxPanAngle = Infinity;
                _this.minTileAngle = -90;
                _this.maxTileAngle = 90;
                _this.scaleSpeed = 0.2;
                _this._mouseDown = false;
                _this._fingerTwo = false;
                _this._panAngle = 0;
                _this._panRad = 0;
                _this._tiltAngle = 0;
                _this._tiltRad = 0;
                _this.cupTargetV3 = new gd3d.math.vector3();
                return _this;
            }
            Object.defineProperty(HoverCameraScript.prototype, "panAngle", {
                get: function () {
                    return this._panAngle;
                },
                set: function (value) {
                    this._panAngle = Math.max(this.minPanAngle, Math.min(this.maxPanAngle, value));
                    this._panRad = this._panAngle * Math.PI / 180;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HoverCameraScript.prototype, "tiltAngle", {
                get: function () {
                    return this._tiltAngle;
                },
                set: function (value) {
                    this._tiltAngle = Math.max(this.minTileAngle, Math.min(this.maxTileAngle, value));
                    this._tiltRad = this._tiltAngle * Math.PI / 180;
                },
                enumerable: true,
                configurable: true
            });
            HoverCameraScript.prototype.onPlay = function () {
            };
            HoverCameraScript.prototype.start = function () {
                this.inputMgr = this.gameObject.transform.scene.app.getInputMgr();
                this.inputMgr.addPointListener(gd3d.event.PointEventEnum.PointDown, this.onPointDown, this);
                this.inputMgr.addPointListener(gd3d.event.PointEventEnum.PointUp, this.onPointUp, this);
                this.inputMgr.addPointListener(gd3d.event.PointEventEnum.PointMove, this.onPointMove, this);
                this.inputMgr.addPointListener(gd3d.event.PointEventEnum.MouseWheel, this.onWheel, this);
            };
            HoverCameraScript.prototype.update = function (delta) {
                var distanceX = this.distance * Math.sin(this._panRad) * Math.cos(this._tiltRad);
                var distanceY = this.distance * (this._tiltRad == 0 ? 0 : Math.sin(this._tiltRad));
                var distanceZ = this.distance * Math.cos(this._panRad) * Math.cos(this._tiltRad);
                if (this.lookAtTarget) {
                    gd3d.math.vec3Clone(this.lookAtTarget.getWorldTranslate(), this.cupTargetV3);
                }
                else {
                    gd3d.math.vec3Clone(this.lookAtPoint, this.cupTargetV3);
                }
                var tempv3 = gd3d.math.pool.new_vector3(this.cupTargetV3.x + distanceX, this.cupTargetV3.y + distanceY, this.cupTargetV3.z + distanceZ);
                this.gameObject.transform.setWorldPosition(tempv3);
                this.gameObject.transform.lookatPoint(this.cupTargetV3);
                this.gameObject.transform.markDirty();
                gd3d.math.pool.delete_vector3(tempv3);
            };
            HoverCameraScript.prototype.onPointDown = function () {
                this._mouseDown = true;
                this._lastMouseX = this.inputMgr.point.x;
                this._lastMouseY = this.inputMgr.point.y;
            };
            HoverCameraScript.prototype.onPointUp = function () {
                this._mouseDown = false;
            };
            HoverCameraScript.prototype.onPointMove = function () {
                if (!this._mouseDown)
                    return;
                var moveX = this.inputMgr.point.x - this._lastMouseX;
                var moveY = this.inputMgr.point.y - this._lastMouseY;
                this.panAngle += moveX;
                this.tiltAngle += moveY;
                this._lastMouseX = this.inputMgr.point.x;
                this._lastMouseY = this.inputMgr.point.y;
            };
            HoverCameraScript.prototype.onWheel = function () {
                this.distance = Math.max(this.distance - this.inputMgr.wheel * 2, 1);
            };
            HoverCameraScript.prototype.onTouch = function () {
            };
            HoverCameraScript.prototype.remove = function () {
                this.inputMgr.removePointListener(gd3d.event.PointEventEnum.PointDown, this.onPointDown, this);
                this.inputMgr.removePointListener(gd3d.event.PointEventEnum.PointUp, this.onPointUp, this);
                this.inputMgr.removePointListener(gd3d.event.PointEventEnum.PointMove, this.onPointMove, this);
                this.inputMgr.removePointListener(gd3d.event.PointEventEnum.MouseWheel, this.onWheel, this);
            };
            __decorate([
                gd3d.reflect.Field("reference", null, "transform"),
                __metadata("design:type", gd3d.framework.transform)
            ], HoverCameraScript.prototype, "lookAtTarget", void 0);
            HoverCameraScript = __decorate([
                gd3d.reflect.nodeComponent
            ], HoverCameraScript);
            return HoverCameraScript;
        }(gd3d.framework.behaviour));
        framework.HoverCameraScript = HoverCameraScript;
    })(framework = gd3d.framework || (gd3d.framework = {}));
})(gd3d || (gd3d = {}));
var datGui = (function () {
    function datGui() {
    }
    datGui.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadJs()];
                    case 1:
                        _a.sent();
                        this._inited = true;
                        return [2];
                }
            });
        });
    };
    datGui.loadJs = function () {
        var datUrl = "./lib/dat.gui.js";
        var p = new gd3d.threading.gdPromise(function (resolve, reason) {
            gd3d.io.loadText(datUrl, function (txt) {
                var isok = eval(txt);
                setTimeout(function () {
                    resolve();
                    console.warn(dat);
                }, 0);
            });
        });
        return p;
    };
    datGui._inited = false;
    return datGui;
}());
var physics3dDemoTool = (function () {
    function physics3dDemoTool() {
    }
    physics3dDemoTool.init = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app = app;
                        this.scene = this.app.getScene();
                        this.astMgr = this.app.getAssetMgr();
                        this.iptMgr = this.app.getInputMgr();
                        return [4, this.loadbySync("./res/shader/shader.assetbundle.json")];
                    case 1:
                        _a.sent();
                        return [4, datGui.init()];
                    case 2:
                        _a.sent();
                        this.initMats();
                        this.initCamera();
                        return [2];
                }
            });
        });
    };
    physics3dDemoTool.loadbySync = function (url) {
        var _this = this;
        return new gd3d.threading.gdPromise(function (resolve, reject) {
            _this.astMgr.load(url, gd3d.framework.AssetTypeEnum.Auto, function (state) {
                if (state && state.isfinish) {
                    resolve();
                }
            });
        });
    };
    physics3dDemoTool.initMats = function () {
        this.addMat("white", new gd3d.math.vector4(1, 1, 1, 1));
        this.addMat("uvTest", new gd3d.math.vector4(1, 1, 1, 1));
        this.addMat("activated", new gd3d.math.vector4(0.51, 0.39, 0.96, 1));
        this.addMat("yellow", new gd3d.math.vector4(0.8, 0.8, 0, 1));
        this.addMat("sleeping", new gd3d.math.vector4(0.4, 0.4, 0.4, 1));
        this.addMat("purple", new gd3d.math.vector4(0.8, 0, 0.8, 1));
    };
    physics3dDemoTool.initCamera = function () {
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera");
        this.camera.near = 0.01;
        this.camera.far = 120;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0, 15, -15);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        var hoverc = this.camera.gameObject.addComponent("HoverCameraScript");
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0);
        var light = new gd3d.framework.transform();
        light.localRotate;
        gd3d.math.quatFromEulerAngles(45, 10, 0, light.localRotate);
        light.name = "light";
        var lComp = light.gameObject.addComponent("light");
        lComp.type = gd3d.framework.LightTypeEnum.Direction;
        this.scene.addChild(light);
    };
    physics3dDemoTool.addMat = function (name, color) {
        var _this = this;
        var mat = this.mats[name] = new gd3d.framework.material(name);
        mat.setShader(this.astMgr.getShader("diffuse.shader.json"));
        mat.setVector4("_MainColor", color);
        if (name == "uvTest") {
            var url = "./res/uvTest.jpg";
            this.astMgr.load(url, gd3d.framework.AssetTypeEnum.Texture, function (sta) {
                if (sta.isfinish) {
                    var t_4 = _this.astMgr.getAssetByName("uvTest.jpg");
                    mat.setTexture("_MainTex", t_4);
                }
            });
        }
    };
    physics3dDemoTool.attachMesh = function (tran, mat, meshName, isCompound) {
        var _this = this;
        if (isCompound === void 0) { isCompound = false; }
        var mf = tran.gameObject.getComponent("meshFilter");
        if (!mf)
            mf = tran.gameObject.addComponent("meshFilter");
        var mr = tran.gameObject.getComponent("meshRenderer");
        if (!mr)
            mr = tran.gameObject.addComponent("meshRenderer");
        mr.materials[0] = mat;
        mf.mesh = this.astMgr.getDefaultMesh(meshName);
        if (isCompound && tran.parent) {
            tran = tran.parent;
            tran[this.tag_isCompound] = true;
        }
        if (tran[this.tag_resFun])
            return;
        tran[this.tag_pos] = gd3d.math.pool.clone_vector3(tran.getWorldPosition());
        tran[this.tag_Rot] = gd3d.math.pool.clone_quaternion(tran.getWorldRotate());
        tran[this.tag_resFun] = function () {
            var phy = tran.physicsImpostor;
            if (phy) {
                var lv = phy.physicsBody.linearVelocity;
                var gv = phy.physicsBody.angularVelocity;
                lv.x = lv.y = lv.z = gv.x = gv.y = gv.z = 0;
            }
            tran.setWorldPosition(tran[_this.tag_pos]);
            tran.setWorldRotate(tran[_this.tag_Rot]);
        };
        return mr;
    };
    physics3dDemoTool.resetObj = function (mrs) {
        var _this = this;
        mrs.forEach(function (mr) {
            if (mr) {
                var tran = mr.gameObject.transform;
                if (tran[_this.tag_resFun])
                    tran[_this.tag_resFun]();
            }
        });
    };
    physics3dDemoTool.ckBodySleeped = function (mrs) {
        var _this = this;
        mrs.forEach(function (mr) {
            if (mr && mr.gameObject.transform.physicsImpostor) {
                var tran = mr.gameObject.transform;
                var phy_1 = tran.physicsImpostor;
                if (phy_1[_this.lastsleepTag] == null || phy_1[_this.lastsleepTag] != phy_1.isSleeping) {
                    _this.cgDefMat(mr, phy_1.isSleeping);
                    if (mr.gameObject.transform[_this.tag_isCompound]) {
                        mr.gameObject.transform.children.forEach(function (sub) {
                            var smr = sub.gameObject.getComponent("meshRenderer");
                            _this.cgDefMat(smr, phy_1.isSleeping);
                        });
                    }
                }
                phy_1[_this.lastsleepTag] = phy_1.isSleeping;
            }
        });
    };
    physics3dDemoTool.cgDefMat = function (mr, isSleeping) {
        if (!mr)
            return;
        var tran = mr.gameObject.transform;
        if (!tran[this.defMatTag]) {
            tran[this.defMatTag] = mr.materials[0];
        }
        var mat = isSleeping ? physics3dDemoTool.mats["sleeping"] : tran[this.defMatTag];
        mr.materials[0] = mat;
    };
    physics3dDemoTool.mats = {};
    physics3dDemoTool.tag_isCompound = "__isCompound";
    physics3dDemoTool.tag_pos = "__reCachePos";
    physics3dDemoTool.tag_Rot = "__reCacheRot";
    physics3dDemoTool.tag_resFun = "__reCacheResFun";
    physics3dDemoTool.lastsleepTag = "_lastsleep_";
    physics3dDemoTool.defMatTag = "_defMat_";
    return physics3dDemoTool;
}());
//# sourceMappingURL=app.js.map