namespace t
{

    export class TestRotate implements IState
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
        name: string = "rock256.png";

        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                //state.finish = true;
              
                if(_state.isfinish)
                {
                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
        }

        private loadPvr(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/resources/" + this.name, gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    state.finish = true;
                }
            });
        }
        private changeShader()
        {
            var btn = document.createElement("button");
            // btn.textContent = "切换Shader到：diffuse.shader.json";
            btn.textContent = "save";

            btn.onclick = () =>
            {
                // var sh = this.app.getAssetMgr().getShader("diffuse.shader.json") as gd3d.framework.shader;
                // this.change(sh);
                let trans = this.cube;
                let name = trans.name;
                let prefab = new gd3d.framework.prefab(name + ".prefab.json");
                prefab.assetbundle = name + ".assetbundle.json";
                prefab.apply(trans);
                // this.app.getAssetMgr().setAssetUrl(prefab, url);
                this.app.getAssetMgr().use(prefab);
                this.app.getAssetMgr().savePrefab(trans, name + ".prefab.json", (data: gd3d.framework.SaveInfo, resourses?: string[], content?: any) =>
                {
                    console.log(data);
                });
            }
            btn.style.top = "160px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);

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
            objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
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
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
                    cube.localTranslate.x = 0;
                    this.scene.addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;
                    // "rock256.png"
                    var sh = this.app.getAssetMgr().getShader("diffuse.shader.json");
                    if (sh != null)
                    {
                        console.log("sh 不是空的");
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        if (texture == null)
                            console.error("为什么他是空的呀");
                        else
                        {
                            console.log("texture 不是空的");
                            cuber.materials[0].setTexture("_MainTex", texture);
                        }                           
                    }
                    this.cube = cube;

                    // var tt=dome.addcube(this.app.getAssetMgr());
                    // this.cube.addChild(tt);
                    // tt.localTranslate.z=1;
                    // tt.localScale=new gd3d.math.vector3(0.2,0.2,0.2);
                    // tt.markDirty();
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
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(sh);//----------------使用shader
                        let texture = this.app.getAssetMgr().getAssetByName(this.name) as gd3d.framework.texture;
                        renderer.materials[0].setTexture("_MainTex", texture);

                    }
                    this.cube2 = ref_cube;
                }

                {
                    this.cubetrail = new gd3d.framework.transform();
                    this.cubetrail.localScale.x = this.cubetrail.localScale.y = this.cubetrail.localScale.z = 0.2;
                    this.cubetrail.localTranslate.x = -3;
                    var mesh = this.cubetrail.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = smesh;
                    this.cubetrail.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    this.scene.addChild(this.cubetrail);
                    this.cubetrail.markDirty();
                }
            }
            state.finish = true;
        }

        cubetrail: gd3d.framework.transform;
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadPvr.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this))
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.changeShader();
        }

        private angularVelocity: gd3d.math.vector3 = new gd3d.math.vector3(10, 0, 0);
        private eulerAngle = gd3d.math.pool.new_vector3();

        private zeroPoint = new gd3d.math.vector3(0, 0, 0);

        //--------------------
        private startdir = new gd3d.math.vector3(-1, 0, 0);
        private enddir = new gd3d.math.vector3(0, 0, -1);
        private targetdir = new gd3d.math.vector3();
        //-------------
        update(delta: number)
        {
            this.taskmgr.move(delta);

            this.timer += delta;

            if (this.cube != null)
            {
                this.cube.localTranslate.x = Math.cos(this.timer) * 3.0;
                this.cube.localTranslate.z = Math.sin(this.timer) * 3.0;

                this.cube.lookatPoint(this.zeroPoint);
                this.cube.markDirty();
            }
            if (this.cube2)
            {
                //this.cube2.lookat(this.cube);
                this.cube2.lookatPoint(this.cube.getWorldTranslate());
                this.cube2.markDirty();
            }
            if (this.cubetrail)
            {
                var cube = this.cubetrail.clone();
                this.scene.addChild(cube);
                //gd3d.framework.traillerp(this.startdir,this.enddir,this.timer*0.1,this.targetdir);
                gd3d.math.vec3ScaleByNum(this.targetdir, 3, this.targetdir);
                gd3d.math.vec3Clone(this.targetdir, cube.localTranslate);
                cube.markDirty();


            }
        }
    }
}