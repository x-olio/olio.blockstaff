
class test_ChangeMesh implements IState 
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    cube: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    isCube: boolean = false;
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
        //创建一个button，控制mesh的切换
        var btn1 = document.createElement("button");
        btn1.textContent = "button1 更换mesh";
        btn1.onclick = () =>
        {
            if (this.isCube == false)
            {
                let mesh = cube.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
                mesh.mesh = (this.app.getAssetMgr()).getDefaultMesh("sphere");
                this.isCube = true;
            }
            else
            {
                let mesh = cube.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
                mesh.mesh = this.app.getAssetMgr().getDefaultMesh("cube");
                this.isCube = false;
            }
        }
        btn1.style.top = "128px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
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
