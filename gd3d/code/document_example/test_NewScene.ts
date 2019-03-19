class test_NewScene implements IState
{
    app:gd3d.framework.application;
    scene:gd3d.framework.scene;
    camera:gd3d.framework.camera;

    start(app:gd3d.framework.application)
    {
         this.app=app;
         this.scene=this.app.getScene();

        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "camera";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.markDirty();//标记为需要刷新
   }

    update(delta:number)
    {
    }
}