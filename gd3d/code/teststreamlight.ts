class test_streamlight implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    player: gd3d.framework.transform;
    cubes: { [id: string]: gd3d.framework.transform } = {};
    start(app: gd3d.framework.application)
    {
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
            var light = lighttran.gameObject.addComponent("light") as gd3d.framework.light;
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();

        }
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.app.getAssetMgr().load("res/prefabs/streamlight/anim/0001_shengyi_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("0001_shengyi_male.prefab.json") as gd3d.framework.prefab;
                        baihu = _prefab.getCloneTrans();
                        this.player = baihu;
                        this.scene.addChild(baihu);
                        objCam.lookat(baihu);
                        objCam.markDirty();

                        let bb = _prefab.getCloneTrans();
                        this.scene.addChild(bb);
                        bb.localTranslate = new gd3d.math.vector3(2,0,0);
                        bb.markDirty();

                        let bodyRenderer = (bb.children[0].gameObject.getComponent("skinnedMeshRenderer") as gd3d.framework.skinnedMeshRenderer);
                        let mat = bodyRenderer.materials[0].clone();
                        bodyRenderer.materials[0] = mat;

                        mat.setVector4("_LightTex_ST",new gd3d.math.vector4(2,2,0,0));
                        console.log("aaa");
                    }
                });
            }
        });
        this.cube = baihu;

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
        var x2 = Math.sin(this.timer * 1.1);
        var z2 = Math.cos(this.timer * 1.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        objCam.lookat(this.cube);
        objCam.markDirty();//标记为需要刷新
        objCam.updateWorldTran();
    }
}