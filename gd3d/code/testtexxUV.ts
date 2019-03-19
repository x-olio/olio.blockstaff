class test_texuv implements IState
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
                this.app.getAssetMgr().load("res/trailtest_yellow.png", gd3d.framework.AssetTypeEnum.Auto, (state) =>
                {
                    if(state.isfinish)
                    {
                        var mat=t.DBgetMat("trailtest_yellow.png");
                        var trans1= t.DBgetAtrans(mat);
                        this.scene.addChild(trans1);

                        var mat2=t.DBgetMat(null,"testtexuv.shader.json");
                        var trans2=t.DBgetAtrans(mat2);
                        this.scene.addChild(trans2);

                        trans1.localTranslate.x=-1;
                        trans2.localTranslate.x=1;

                        trans1.markDirty();
                        trans2.markDirty();

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
        //this.camera.backgroundColor=new gd3d.math.color(0,0,0,1);
        objCam.localTranslate = new gd3d.math.vector3(0,2, 5);
        objCam.lookatPoint(new gd3d.math.vector3());
        objCam.markDirty();//标记为需要刷新

    }
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {

    }
}