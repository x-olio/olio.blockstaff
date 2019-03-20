var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        this.taskmgr.addTaskCall(this.addcube.bind(this));
    };
    main.prototype.loadShader = function (laststate, state) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, function (_state) {
            if (_state.isfinish) {
                state.finish = true;
            }
        });
    };
    main.prototype.loadText = function (laststate, state) {
        var assetMgr = this.app.getAssetMgr();
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
        img.src = "res/_game/tmx.png";
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
//# sourceMappingURL=game.js.map