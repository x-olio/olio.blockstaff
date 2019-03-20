var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Game;
(function (Game) {
    var main = (function () {
        function main() {
        }
        main.prototype.onStart = function (app) {
            this.taskmgr = new gd3d.framework.taskMgr();
            console.log("i am here.");
            this.app = app;
            var scene = this.app.getScene();
            var assetMgr = this.app.getAssetMgr();
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
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadMap.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
        };
        main.prototype.loadShader = function (laststate, state) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
                if (_state.isfinish) {
                    state.finish = true;
                }
            });
        };
        main.prototype.loadMap = function (laststate, state) {
            var _this = this;
            var assetMgr = this.app.getAssetMgr();
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
        main.prototype.loadText = function (laststate, state) {
            var _this = this;
            var assetMgr = this.app.getAssetMgr();
            assetMgr.load("res/_game/tmx.png", gd3d.framework.AssetTypeEnum.Texture, function (s) {
                if (s.isfinish) {
                    _this.tex = s.resstateFirst.res;
                    state.finish = true;
                }
            });
        };
        main.prototype.addcube = function (laststate, state) {
            for (var i = -4; i < 5; i++) {
                for (var j = -4; j < 5; j++) {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                    cube.localTranslate.x = i;
                    cube.localTranslate.y = j;
                    cube.markDirty();
                    this.app.getScene().addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter");
                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer");
                    var cuber = renderer;
                    var sh = this.app.getAssetMgr().getShader("color.shader.json");
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
        main.prototype.onUpdate = function (delta) {
            this.taskmgr.move(delta);
        };
        main.prototype.isClosed = function () {
            return false;
        };
        main = __decorate([
            gd3d.reflect.userCode
        ], main);
        return main;
    }());
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map