namespace t
{
    export class Test_NormalMap implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                if(_state.isfinish)
                {
                    state.finish = true;                    
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            let c = 0;
            c++;
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
            c++;
            this.app.getAssetMgr().load("res/map_diffuse.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
            c++;
            this.app.getAssetMgr().load("res/map_normal.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    c--;
                    if (c == 0)
                        state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
        }

        cuber: gd3d.framework.meshRenderer;
        private normalCube: gd3d.framework.transform;

        private addnormalcube(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {

            this.normalCube = new gd3d.framework.transform();
            this.normalCube.name = "cube";
            this.normalCube.localScale.x = this.normalCube.localScale.y = this.normalCube.localScale.z = 3;
            this.scene.addChild(this.normalCube);

            var mesh = this.normalCube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = (smesh);

            let renderer = this.normalCube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            this.cuber = renderer;
            let sh = this.app.getAssetMgr().getShader("normalmap.shader.json");
            if (sh != null)
            {
                this.cuber.materials = [];
                this.cuber.materials.push(new gd3d.framework.material());
                this.cuber.materials[0].setShader(sh);//----------------使用shader
                //cuber.materials[0].setVector4("_Color", new gd3d.math.vector4(0.4, 0.4, 0.2, 1.0));

                let texture = this.app.getAssetMgr().getAssetByName("map_diffuse.png") as gd3d.framework.texture;
                this.cuber.materials[0].setTexture("_MainTex", texture);

                let normalTexture = this.app.getAssetMgr().getAssetByName("map_normal.png") as gd3d.framework.texture;
                this.cuber.materials[0].setTexture("_NormalTex", normalTexture);

                // 瞎搞
                // if(this.light)
                // {
                //      let objlight = this.light.gameObject.transform;
                //      this.cuber.materials[0].setVector4("lightpos",new gd3d.math.vector4(objlight.localTranslate.x,objlight.localTranslate.y,objlight.localTranslate.z,1));
                // }

            }

            state.finish = true;
        }

        private addcube(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var cube = new gd3d.framework.transform();
            cube.name = "cube";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 2;
            cube.localTranslate.x = 3;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = (smesh);
            var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            let cuber = renderer;

            var sh = this.app.getAssetMgr().getShader("light1.shader.json");
            if (sh != null)
            {
                cuber.materials = [];
                cuber.materials.push(new gd3d.framework.material());
                cuber.materials[0].setShader(sh);//----------------使用shader

                let texture = this.app.getAssetMgr().getAssetByName("map_diffuse.png") as gd3d.framework.texture;
                cuber.materials[0].setTexture("_MainTex", texture);

            }
            state.finish = true;
        }

        private addcamandlight(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 30;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -5);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新


            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light") as gd3d.framework.light;
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            lighttran.markDirty();

            {
                var cube = new gd3d.framework.transform();
                cube.name = "cube";
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;

                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                let cuber = renderer;

                var sh = this.app.getAssetMgr().getShader("light1.shader.json");
                if (sh != null)
                {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(sh);//----------------使用shader
                    //cuber.materials[0].setVector4("_Color", new gd3d.math.vector4(0.4, 0.4, 0.2, 1.0));

                    let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                    cuber.materials[0].setTexture("_MainTex", texture);

                }
            }
            state.finish = true;

        }
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            var btn = document.createElement("button");
            btn.textContent = "切换光源类型";
            btn.onclick = () =>
            {
                if (this.light != null)
                {
                    if (this.light.type == gd3d.framework.LightTypeEnum.Direction)
                    {
                        this.light.type = gd3d.framework.LightTypeEnum.Point;
                        console.log("点光源");
                    }
                    else if (this.light.type == gd3d.framework.LightTypeEnum.Point)
                    {
                        this.light.type = gd3d.framework.LightTypeEnum.Spot;
                        console.log("聚光灯");
                    }
                    else
                    {
                        this.light.type = gd3d.framework.LightTypeEnum.Direction;
                        console.log("方向光");
                    }
                }
            }
            btn.style.top = "124px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addnormalcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        }

        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        update(delta: number)
        {
            this.taskmgr.move(delta);

            this.timer += delta;

            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);

            if (this.camera != null)
            {
                var objCam = this.camera.gameObject.transform;
                objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 2.25, -z2 * 10);
                // objCam.markDirty();
                objCam.updateWorldTran();
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                //objCam.markDirty();
            }
            // if (this.normalCube != null) {
            //     let transform = this.normalCube.gameObject.transform;
            //     gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up,this.timer*30,transform.localRotate);
            //     transform.markDirty();
            // }

            // what the fuck。
            if (this.light != null)
            {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 5, 3, z * 5);
                //     // objlight.markDirty();
                //     objlight.updateWorldTran();
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));


                //     let lightPos = new gd3d.math.vector4(x * 5, 3, z * 5,1.0);
                //     this.cuber.materials[0].setVector4("lightpos",lightPos);

                //     let eyePos = new gd3d.math.vector4(x2 * 10, 2.25, -z2 * 10);
                //     this.cuber.materials[0].setVector4("eyepos",eyePos);
            }

        }
    }

}