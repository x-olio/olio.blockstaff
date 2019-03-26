class test_loadScene implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        let names: string[] = ["test_01","MainCity_","city", "lvyexianzong_02_1024", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        let name = names[1];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.loadScene(name);
                
            }
        });
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 100));
        objCam.markDirty();//标记为需要刷新
        CameraController.instance().init(this.app, this.camera);
    }

    loadScene(assetName:string , isCompress = false){

        let addScene = ()=>{
            var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(assetName + ".scene.json") as gd3d.framework.rawscene;
            var _root = _scene.getSceneRoot();
            this.scene.addChild(_root);
            // _root.localTranslate = new gd3d.math.vector3(-60, -30, 26.23);
            _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
            _root.markDirty();
            this.app.getScene().lightmaps = [];
            _scene.useLightMap(this.app.getScene());
            _scene.useFog(this.app.getScene());
        }

        if(isCompress){
            this.app.getAssetMgr().loadCompressBundle(`res/scenes/${assetName}/${assetName}.packs.txt`,(s) =>
            {
                 if(s.isfinish){
                     //if (s.bundleLoadState & gd3d.framework.AssetBundleLoadState.Scene && !isloaded)
                     {
                         addScene();
                     }
                 }
                });
        }else{
            this.app.getAssetMgr().load(`res/scenes/${assetName}/${assetName}.assetbundle.json`,gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                if(s1.isfinish)
                {   
                    addScene();
                }
            });
        }
    }


    baihu:gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    bere: boolean = false;
    update(delta: number)
    {
        this.timer += delta;
        CameraController.instance().update(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
        // objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 30, z2 * 10);
        // objCam.markDirty();//标记为需要刷新

    }
}