namespace t
{

    export class test_three_leaved_rose_curve implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number = 0;
        cube2: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        count: number = 0;
        counttimer: number = 0;


        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => {
                if (_state.isfinish) {
                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/trailtest2_00000.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
        }
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength: number;
        private loadRole(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/prefabs/dragon/dragon.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("dragon.prefab.json") as gd3d.framework.prefab;
                    this.role = _prefab.getCloneTrans();
                    this.role.name = "dragon";
                    // this.roleLength = this.role.children.length;
                    this.scene.addChild(this.role);


                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.y = 0.005;
                    
                    this.role.addChild(trailtrans);               
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward, 90, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender") as gd3d.framework.trailRender;
                    //trailrender.color=new gd3d.math.color(1.0,0,0,1.0);
                    trailrender.setspeed(0.35);
                    trailrender.setWidth(0.5);
                    var mat = new gd3d.framework.material();
                    let shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json") as gd3d.framework.shader;
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json") as gd3d.framework.texture;
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex)

                    trailrender.material = mat;
                    // this.aniplayer = this.role.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                    state.finish = true;
                }
            });
        }

        private addcam(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 1000;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, 10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新

            state.finish = true;

        }

        private addcube(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            //添加一个盒子
            {
                //添加一个盒子
                {
                    let cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = 0.5;                    
                    cube.localScale.z =2;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null)
                    {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        cuber.materials[0].setTexture("_MainTex", texture);

                    }
                    this.cube = cube;

                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.z = -0.5;
                    
                    this.cube.addChild(trailtrans);               
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward, 90, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender") as gd3d.framework.trailRender;
                    //trailrender.color=new gd3d.math.color(1.0,0,0,1.0);
                    trailrender.setspeed(0.25);
                    trailrender.setWidth(0.25);
                    var mat = new gd3d.framework.material();
                    let shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json") as gd3d.framework.shader;
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json") as gd3d.framework.texture;
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex)

                    trailrender.material = mat;
                }
                {
                    let ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 1;
                   // ref_cube.localTranslate.x = 2;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    var sh = this.app.getAssetMgr().getShader("shader/def");
                    if (sh != null)
                    {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        cuber.materials[0].setTexture("_MainTex", texture);

                    }



                    this.cube2 = ref_cube;


                }
            }
            state.finish = true;
        }


        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            // this.taskmgr.addTaskCall(this.addcube.bind(this))
            this.taskmgr.addTaskCall(this.addcam.bind(this));
        }

        private angularVelocity: gd3d.math.vector3 = new gd3d.math.vector3(10, 0, 0);
        private eulerAngle = gd3d.math.pool.new_vector3();

        private  zeroPoint=new gd3d.math.vector3(0,0,0);
        update(delta: number)
        {
            this.taskmgr.move(delta);

            this.timer += delta;

            if(this.role!=null)
            {
                let a = 5;
                {

                    let theta = this.timer *0.5;
                    this.role.localTranslate.x = a * Math.cos(3 * theta) * Math.cos(theta);
                    this.role.localTranslate.z = a * Math.cos(3 * theta) * Math.sin(theta);
                }
                {
                    let deltaTheta = this.timer * 0.5 + 0.001;
                    let targetPoint = gd3d.math.pool.new_vector3();
                    targetPoint.x  = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                    targetPoint.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                    this.role.lookatPoint(targetPoint);
                    gd3d.math.pool.delete_vector3(targetPoint);

                    let q = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatFromEulerAngles(-90,0,0,q);
                    gd3d.math.quatMultiply(this.role.localRotate,q,this.role.localRotate);
                    gd3d.math.pool.delete_quaternion(q);
                }


                // {
                //     let deltaTheta = this.timer*0.5 + 0.001;
                //     this.cube.localTranslate.x = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                //     this.cube.localTranslate.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                //     this.role.lookat(this.cube);
                // }
                // // gd3d.math.quatFromEulerAngles(0,theta * 3,0,this.cube.localRotate);
                // // this.cube.lookatPoint(this.zeroPoint);
                // this.role.markDirty();
                this.role.markDirty();
                this.role.updateWorldTran();
            }

            if (this.cube != null)
            {
                // this.cube.localTranslate.x=Math.cos(this.timer)*3.0;
                // this.cube.localTranslate.z=Math.sin(this.timer)*3.0;
                let a = 5;
                {

                    let theta = this.timer *0.5;
                    this.cube.localTranslate.x = a * Math.cos(3 * theta) * Math.cos(theta);
                    this.cube.localTranslate.z = a * Math.cos(3 * theta) * Math.sin(theta);
                }
                {
                    let deltaTheta = this.timer * 0.5 + 0.001;
                    let targetPoint = gd3d.math.pool.new_vector3();
                    targetPoint.x  = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                    targetPoint.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                    this.cube.lookatPoint(targetPoint);
                    gd3d.math.pool.delete_vector3(targetPoint);
                }


                // {
                //     let deltaTheta = this.timer*0.5 + 0.001;
                //     this.cube.localTranslate.x = a * Math.cos(3 * deltaTheta) * Math.cos(deltaTheta);
                //     this.cube.localTranslate.z = a * Math.cos(3 * deltaTheta) * Math.sin(deltaTheta);
                //     this.role.lookat(this.cube);
                // }
                // // gd3d.math.quatFromEulerAngles(0,theta * 3,0,this.cube.localRotate);
                // // this.cube.lookatPoint(this.zeroPoint);
                // this.role.markDirty();
                this.cube.markDirty();
                this.cube.updateWorldTran();
            }
            if(this.cube2)
            {
                //this.cube2.lookat(this.cube);
                this.cube2.lookatPoint(this.cube.getWorldTranslate());
                this.cube2.markDirty();
            }
        }
    }
}