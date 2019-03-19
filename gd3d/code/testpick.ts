class test_pick implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.inputMgr = this.app.getInputMgr();
        this.scene = this.app.getScene();
        let cuber: gd3d.framework.meshRenderer;
        console.warn("Finish it.");

        //添加一个盒子
        var cube = new gd3d.framework.transform();
        cube.name = "cube";

        cube.localScale.x = 10;
        cube.localScale.y = 0.1;
        cube.localScale.z = 10;
        this.scene.addChild(cube);
        var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

        var smesh = this.app.getAssetMgr().getDefaultMesh("pyramid");
        mesh.mesh = (this.app.getAssetMgr().getDefaultMesh("cube"));
        var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;

        cuber = renderer;


        this.cube = cube;

        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 1;
            this.cube2.localTranslate.x = -5;
            this.cube2.markDirty();
            var mesh = this.cube2.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            let coll = this.cube2.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            // coll.center = new gd3d.math.vector3(0, 1, 0);
            // coll.radius = 1;
            coll.colliderVisible=true;

            //---------------------baocuo
            //this.cube2.gameObject.addComponent("frustumculling") as gd3d.framework.frustumculling;
        }


        this.cube3 = this.cube2.clone();
        this.scene.addChild(this.cube3);
        {
            this.cube3 = new gd3d.framework.transform();
            this.cube3.name = "cube3";
            this.scene.addChild(this.cube3);
            this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 1;
            this.cube3.localTranslate.x = -5;
            this.cube3.markDirty();
            var mesh = this.cube3.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh =(smesh);
            var renderer = this.cube3.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            let coll = this.cube3.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            coll.colliderVisible = true ;
        }

        {
            this.cube4 = new gd3d.framework.transform();
            this.cube4.name = "cube4";
            this.scene.addChild(this.cube4);
            this.cube4.localScale.x = this.cube4.localScale.y = this.cube4.localScale.z = 1;
            this.cube4.localTranslate.x = 5;
            this.cube4.markDirty();
            var mesh = this.cube4.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = (smesh);
            var renderer = this.cube4.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            let coll = this.cube4.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            coll.colliderVisible = true;
        }
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(this.cube);
        objCam.markDirty();//标记为需要刷新
        CameraController.instance().init(this.app,this.camera);

    }
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    cube4: gd3d.framework.transform;
    timer: number = 0;
    movetarget: gd3d.math.vector3 = new gd3d.math.vector3();
    inputMgr: gd3d.framework.inputMgr;
    pointDown: boolean = false;
    update(delta: number)
    {
        CameraController.instance().update(delta);
        if (this.pointDown == false && this.inputMgr.point.touch == true)//pointdown
        {
            var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
            let tempinfo = gd3d.math.pool.new_pickInfo();
            var bool = this.scene.pick(ray,tempinfo,true);
            if (bool != null)
            {
                gd3d.math.vec3Clone(tempinfo.hitposition,this.movetarget);
                this.timer = 0;
            }
            gd3d.math.pool.delete_pickInfo(tempinfo);
        }
        this.pointDown = this.inputMgr.point.touch;

        if ((this.cube3.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider).intersectsTransform(this.cube4))
        {
            return;
        }

        if ((this.cube2.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider).intersectsTransform(this.cube3))
        {
            return;
        }

        this.timer += delta;
        this.cube3.localTranslate.x += delta;
        this.cube3.localTranslate = this.cube3.localTranslate;
        this.cube3.markDirty();
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        // var objCam = this.camera.gameObject.transform;
        // objCam.localTranslate.x += delta;
        // objCam.markDirty();

        var tv = new gd3d.math.vector3();
        gd3d.math.vec3SLerp(this.cube2.localTranslate, this.movetarget, this.timer, this.cube2.localTranslate);
        this.cube2.localTranslate = this.movetarget;
        this.cube2.markDirty();

    }
}