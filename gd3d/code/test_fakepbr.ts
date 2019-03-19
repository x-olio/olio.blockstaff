/// <reference path="../lib/gd3d.d.ts" />

class test_fakepbr implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);

        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.app.getAssetMgr().load("res/prefabs/fakepbr/zhanshen.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                    (s) =>
                    {
                        if (s.isfinish)
                        {
                            var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("zhanshen.prefab.json") as gd3d.framework.prefab;
                            this.baihu = _prefab.getCloneTrans();
                            this.scene.addChild(this.baihu);

                            objCam.lookat(this.baihu);
                            objCam.markDirty();
                        }
                    });
            }
        });


        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 0, -5);
        objCam.markDirty();//标记为需要刷新

        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light") as gd3d.framework.light;
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }

        {
            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light2 = lighttran.gameObject.addComponent("light") as gd3d.framework.light;
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();
        }
    }
    light: gd3d.framework.light;
    light2: gd3d.framework.light;
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 2, 2, -z2 * 2);
        if (this.baihu)
        {
            objCam.lookatPoint(new gd3d.math.vector3(0, 1.5, 0));
            objCam.markDirty();//标记为需要刷新
        }
        if (this.light != null)
        {
            var objlight = this.light.gameObject.transform;
            objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
            //     // objlight.markDirty();
            //     objlight.updateWorldTran();
            objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));

            var objlight2 = this.light.gameObject.transform;
            objlight2.localTranslate = new gd3d.math.vector3(z * 5, 10, x * 5);
            objlight2.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            //     let lightPos = new gd3d.math.vector4(x * 5, 3, z * 5,1.0);
            //     this.cuber.materials[0].setVector4("lightpos",lightPos);

            //     let eyePos = new gd3d.math.vector4(x2 * 10, 2.25, -z2 * 10);
            //     this.cuber.materials[0].setVector4("eyepos",eyePos);
        }
    }
}