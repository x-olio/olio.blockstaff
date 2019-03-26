class test_loadAsiprefab implements IState
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
                this.app.getAssetMgr().load("res/prefabs/0001_archangel@idle_none/0001_archangel@idle_none.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                    (s) =>
                    {
                        if (s.isfinish)
                        {
                            var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("0001_archangel@idle_none.prefab.json") as gd3d.framework.prefab;
                            
                            this.trans = _prefab.getCloneTrans();
                            this.scene.addChild(this.trans);
                            // this.baihu.localScale = new gd3d.math.vector3(20, 20, 20);
                            // this.baihu.localTranslate = new gd3d.math.vector3(2, 0, 0);

                            // this.baihu = _prefab.getCloneTrans();
                            // this.scene.addChild(this.baihu);
                            var test=this.trans;
                            objCam.lookat(this.trans);
                            objCam.markDirty();

                        //     var tex=this.app.getAssetMgr().getAssetByName("0001_archangel.imgdesc.json")as gd3d.framework.texture;
                        //     var cube=new gd3d.framework.transform();
                        //     var meshf=cube.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER)as gd3d.framework.meshFilter;
                        //     var meshr=cube.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER)as gd3d.framework.meshRenderer;
                        //     var mesh=this.app.getAssetMgr().getDefaultMesh("cube")as gd3d.framework.mesh;
                        //     var mat=new gd3d.framework.material();
                        //     var shader=this.app.getAssetMgr().getShader("diffuse.shader.json");
                        //     mat.setShader(shader);
                        //     mat.setTexture("_MainTex",tex);
                        //     meshf.mesh=mesh;
                        //     meshr.materials=[];
                        //     meshr.materials.push(mat);

                        //    this.scene.addChild(cube);

                        //    var render= this.baihu.gameObject.getComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER)as gd3d.framework.meshRenderer;
                        //    render.materials[0].setTexture("_MainTex",tex);
                        }
                    });
            }
        });


        //添加一个摄像机
        let objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 5, 5);
        objCam.markDirty();//标记为需要刷新
        let hov = objCam.gameObject.addComponent("HoverCameraScript") as gd3d.framework.HoverCameraScript;
        hov.lookAtTarget = this.trans;
        hov.panAngle = 180;
        hov.tiltAngle = -10;
        hov.distance = 8;
        hov.scaleSpeed = 0.1;
        hov.lookAtPoint.x = 0;
        hov.lookAtPoint.y = 2.5;
        hov.lookAtPoint.z = 0;

    }
    camera: gd3d.framework.camera;
    trans: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {
        // this.timer += delta;
        // var x = Math.sin(this.timer);
        // var z = Math.cos(this.timer);
        // var x2 = Math.sin(this.timer * 0.1);
        // var z2 = Math.cos(this.timer * 0.1);
        // var objCam = this.camera.gameObject.transform;
        // objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        // if (this.baihu)
        // {
        //     objCam.lookat(this.baihu);
        //     objCam.markDirty();//标记为需要刷新
        // }
    }
}