/// <reference path="../lib/gd3d.d.ts" />

class test_assestmgr implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    assetName = "elong";
    count = 10;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        this.cube = new gd3d.framework.transform();
        this.scene.addChild(this.cube);
        let assetName = this.assetName;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                // this.app.getAssetMgr().load("res/scenes/city/city.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                //     (s1) =>
                //     {
                //         if (s1.isfinish)
                //         {
                //             this.app.getAssetMgr().loadScene("city.scene.json", () =>
                //             {
                                
                //             });
                //         }
                //     });
                    
                this.app.getAssetMgr().load(`res/prefabs/${assetName}/${assetName}.assetbundle.json`, gd3d.framework.AssetTypeEnum.Auto,
                    (s) =>
                    {
                        if (s.isfinish)
                        {
                            this.baihu = [];
                            this._prefab = this.app.getAssetMgr().getAssetByName(`${assetName}.prefab.json`) as gd3d.framework.prefab;
                            for(let i=0; i<this.count; i++)
                            {
                                this.baihu[i] = this._prefab.getCloneTrans();
                                this.scene.addChild(this.baihu[i]);
                                this.baihu[i].localScale = new gd3d.math.vector3(0.3, 0.3, 0.3);
                                this.baihu[i].localTranslate = new gd3d.math.vector3(i*2, 0, 0);
                                this.baihu[i].markDirty();
                                this.scene.addChild(this.baihu[i]);
                            }
                            
                            objCam.lookat(this.baihu[this.count/2]);
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
        //this.camera.postQueues.push(new gd3d.framework.cameraPostQueue_Depth());

        // this.camera.near = 0.01;
        // this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(50, 82, -500);
        objCam.lookat(this.cube);
        objCam.markDirty();//标记为需要刷新
        this.cube.localTranslate = new gd3d.math.vector3(40, 0, 10);

    }
    _prefab: gd3d.framework.prefab;
    baihu: gd3d.framework.transform[];
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    bere: boolean = false;
    update(delta: number)
    {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 30, -z2 * 10);

        //assetbundle test
        // if (this.timer > 20)
        // {
        //     this.app.getScene().getRoot().dispose();
            
        // }
        // if (this.timer > 40 && !this.bere)
        // {
        //     this.bere = true;

        //     // this.app.getAssetMgr().unload("res/scenes/city/city.assetbundle.json");
        //     this.app.getAssetMgr().getAssetBundle("city.assetbundle.json").unload();
        //     this.app.getAssetMgr().releaseUnuseAsset();
        // }

        //prefab test
        if (this.timer > 20 && !this.bere)
        {
            this.bere = true;
            for(let i=0; i<this.count; i++)
            {
                this.baihu[i].dispose();
            }
            // this._prefab.unuse();
            this.app.getAssetMgr().getAssetBundle(`${this.assetName}.assetbundle.json`).unload();
            this.app.getAssetMgr().releaseUnuseAsset();

        }
    }
}