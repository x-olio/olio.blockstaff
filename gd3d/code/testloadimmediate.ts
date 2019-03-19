class testloadImmediate implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        var baihu = new gd3d.framework.transform();
        baihu.name = "baihu";
        // baihu.localScale.x = baihu.localScale.y = baihu.localScale.z = 20;
        gd3d.math.quatFromEulerAngles(-90, 0, 0, baihu.localRotate);
        this.scene.addChild(baihu);

        this.cube = baihu;
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.app.getAssetMgr().load("res/prefabs/baihu/resources/res_baihu_baihu.FBX_baihu.mesh.bin", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        var smesh1 = this.app.getAssetMgr().getAssetByName("res_baihu_baihu.FBX_baihu.mesh.bin") as gd3d.framework.mesh;
                        var mesh1 = baihu.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                        mesh1.mesh = (smesh1);
                        var renderer = baihu.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

                        var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");

                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(sh);
                        renderer.materials[1].setShader(sh);
                        renderer.materials[2].setShader(sh);
                        renderer.materials[3].setShader(sh);

                        let texture1 = this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihu.png") as gd3d.framework.texture;
                        let texture2 = this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihuan.png") as gd3d.framework.texture;
                        let texture3 = this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihuya.png") as gd3d.framework.texture;
                        let texture4 = this.app.getAssetMgr().loadImmediate("res/prefabs/baihu/resources/baihumao.png") as gd3d.framework.texture;
                        renderer.materials[0].setTexture("_MainTex", texture1);
                        renderer.materials[1].setTexture("_MainTex", texture2);
                        renderer.materials[2].setTexture("_MainTex", texture3);
                        renderer.materials[3].setTexture("_MainTex", texture4);
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
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(baihu);
        objCam.markDirty();//标记为需要刷新

    }
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();//标记为需要刷新
        objCam.updateWorldTran();
    }
}