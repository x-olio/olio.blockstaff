namespace t
{

    export class test_trailrender implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        texResName = "trailtest2_00000.imgdesc.json";
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                if (_state.isfinish)
                {
                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var i=2;
            this.app.getAssetMgr().load("res/swingFX.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
            {
                if (s.isfinish) 
                {
                    i--;
                    if (i == 0)
                    {
                        state.finish = true;
                    }
                }
                else
                {
                    state.error = true;
                }
            }
            );
            // this.app.getAssetMgr().load("res/soul_trail.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, (s) => 
            this.app.getAssetMgr().load(`res/${this.texResName}`, gd3d.framework.AssetTypeEnum.Auto, (s) => 
            {
                if (s.isfinish) 
                {
                    i--;
                    if (i == 0)
                    {
                        state.finish = true;
                    }
                }
                else
                {
                    state.error = true;
                }
            }
            );
        }
        sh: gd3d.framework.shader;
        private initscene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 100;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0, 0, 0, 1);
            objCam.localTranslate = new gd3d.math.vector3(0, 20, -20);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新

            {
                // var plane = new gd3d.framework.transform();
                // plane.localTranslate.y=-0.2;
                // var meshp = this.app.getAssetMgr().getAssetByName("plane") as gd3d.framework.mesh;
                // this.scene.addChild(plane);
                // plane.markDirty();
                // var meshf = plane.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
                // var meshr = plane.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
                // meshf.mesh = meshp;
                // var mat = new gd3d.framework.material();
                // var shader = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json") as gd3d.framework.shader;
                // mat.setShader(shader);
                // var tex = this.app.getAssetMgr().getAssetByName("cube_texture_1.png")as gd3d.framework.texture;
                // mat.setTexture("_MainTex",tex);
                // meshr.materials=[];
                // meshr.materials[0]=mat;

                var org = new gd3d.framework.transform();
                org.name = "org";
                this.org = org;
                this.scene.addChild(org);

                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                this.cube = cube;
                org.addChild(cube);
                cube.localTranslate.x = -5;
                cube.localScale.y = 0.1;
                cube.localScale.z = 0.5;
                cube.localScale.x = 5;
                cube.markDirty();
                var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                let cuber = renderer;


                var trailtrans = new gd3d.framework.transform();
                trailtrans.localTranslate.x = -10;
                org.addChild(trailtrans);
                //gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward, 90, trailtrans.localRotate);
                trailtrans.markDirty();
                //------------------------------------------trailRender_recorde
                // var trailrender = trailtrans.gameObject.addComponent("trailRender_recorde") as gd3d.framework.trailRender_recorde;
                // //trailrender.color=new gd3d.math.color(1.0,0,0,1.0);
                // //particles_blend_premultiply.shader.json
                // //particles_additive.shader.json
                // //particles_additive_premultiply.shader.json
                // var mat = new gd3d.framework.material();
                // var shader = this.app.getAssetMgr().getShader("particles_add.shader.json") as gd3d.framework.shader;
                // var tex = this.app.getAssetMgr().getAssetByName("soul_trail.imgdesc.json") as gd3d.framework.texture;
                // mat.setShader(shader);
                // mat.setTexture("_Main_Tex", tex)

                // trailrender.material = mat;
                // trailrender.lifetime=1;
                // trailrender.minStickDistance=1.3;
                // trailrender.interpolate=true;
                // trailrender.setWidth(3,3);
                //--------------------------------------------trailrender
                var trailrender = trailtrans.gameObject.addComponent("trailRender") as gd3d.framework.trailRender;
                var mat = new gd3d.framework.material();
                var shader = this.app.getAssetMgr().getShader("particles_add.shader.json") as gd3d.framework.shader;
                var tex = this.app.getAssetMgr().getAssetByName(`${this.texResName}`) as gd3d.framework.texture;
                mat.setShader(shader);
                mat.setTexture("_Main_Tex", tex);

                trailrender.setspeed(0.3);
                trailrender.setWidth(5);
                trailrender.material = mat;
                trailrender.lookAtCamera=true;
                trailrender.extenedOneSide=false;

                trailrender.play();
                
            }
            state.finish = true;

        }
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.wind = new gd3d.math.vector4()

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));

            var tbn = this.addbtn("80px", "0px", "start");
            tbn.onclick = () =>
            {
                this.play = true;
            }
            var btn = this.addbtn("120px", "0px", "stop");
            btn.onclick = () =>
            {
                this.play = false;
            }
        }
        org: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        camera: gd3d.framework.camera;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        grassMat: gd3d.framework.material;
        private wind: gd3d.math.vector4;
        private WaveFrequency: number = 4.0;
        private WaveAmplitude: number = 0.05;

        play: boolean = true;
        update(delta: number)
        {
            this.taskmgr.move(delta);


            if (this.org != undefined && this.play)
            {
                this.timer++;
                // var x = Math.sin(this.timer * 0.01);
                // var z = Math.cos(this.timer * 0.01);
                // this.cube.localTranslate.x = x * 5;
                // this.cube.localTranslate.z = z * 5;

                // this.cube.markDirty();
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer*5, this.org.localRotate);
                this.org.markDirty();
            }

        }

        private addbtn(top: string, left: string, text: string): HTMLButtonElement
        {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = text;
            this.app.container.appendChild(btn);

            return btn;
        }
    }
}