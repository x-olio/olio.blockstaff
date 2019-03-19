class test_NewGameObject implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;

    cube: gd3d.framework.transform;

    camera: gd3d.framework.camera;


    start(app: gd3d.framework.application)
    {
        this.app = app;
        this.scene = this.app.getScene();

        {
            //添加一个Cube
            var cube = new gd3d.framework.transform();
            cube.name = "Cube1";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;

            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("cube");
            cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            this.cube = cube;
            cube.markDirty();
        }
        {
            //为cube添加一个子物体 sphere
            var sphere = new gd3d.framework.transform();
            sphere.name = "Cube's child";
            cube.addChild(sphere);
            sphere.localScale.x = sphere.localScale.y = sphere.localScale.z = 1;
            sphere.localTranslate.x = 2;
            var mesh = sphere.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = this.app.getAssetMgr().getDefaultMesh("sphere");
            sphere.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            sphere.markDirty();
        }
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();//标记为需要刷新
    }


    update(delta: number)
    {
    }
}