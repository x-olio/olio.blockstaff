namespace t
{
    export class test_metal implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
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
            //rock_n256_1.png
            c++;
            this.app.getAssetMgr().load("res/rock_n256_1.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
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
            this.app.getAssetMgr().load("res/cube_texture_1.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
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
            this.app.getAssetMgr().load("res/cube_specular_1.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
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
            state.finish = true;
            // this.app.getAssetMgr().load("res/prefabs/cube/resources/Cube.mesh.bin", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            // {
            //     if (s.isfinish)
            //     {
            //         c--;
            //         if (c == 0)
            //             state.finish = true;
            //     }
            //     else
            //     {
            //         state.error = true;
            //     }
            // }
            // );

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
            objCam.localTranslate = new gd3d.math.vector3(0, 3, -3);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新


            var lighttran = new gd3d.framework.transform();
            this.scene.addChild(lighttran);
            this.light = lighttran.gameObject.addComponent("light") as gd3d.framework.light;
            lighttran.localTranslate.x = 2;
            lighttran.localTranslate.z = 1;
            lighttran.localTranslate.y = 3;
            // lighttran.lookatPoint(new gd3d.math.vector3(0,0,0));
            lighttran.markDirty();

            {
                var cube = new gd3d.framework.transform();
                cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;

                lighttran.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

                var sh=this.app.getAssetMgr().getShader("diffuse.shader.json")as gd3d.framework.shader;
                var tex1=this.app.getAssetMgr().getDefaultTexture("grid")as gd3d.framework.texture;
                var mat=new gd3d.framework.material();
                mat.setShader(sh);
                mat.setTexture("_MainTex",tex1);
                renderer.materials=[];
                renderer.materials.push(mat);
                let cuber = renderer;
            }
            state.finish = true;

        }
        private addmetalmodel(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/prefabs/specular/0122_huanghunshibing.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("0122_huanghunshibing.prefab.json") as gd3d.framework.prefab;
                    var model = _prefab.getCloneTrans();
                    model.localTranslate.x=0;
                    model.localTranslate.y=0;
                    model.localTranslate.z=0;
                    
                    this.scene.addChild(model);
                    model.markDirty();
                    this.model = model;
                    state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
        }

        private addAsiModel(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/prefabs/asi_streamlight/asi_streamlight.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("asi_streamlight.prefab.json") as gd3d.framework.prefab;
                    var model = _prefab.getCloneTrans();
                    model.localTranslate.x=0;
                    model.localTranslate.y=0;
                    model.localTranslate.z=0;
                    
                    this.scene.addChild(model);
                    model.markDirty();
                    this.model = model;
                    state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );         
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
            //this.taskmgr.addTaskCall(this.addmetalmodel.bind(this));
            this.taskmgr.addTaskCall(this.addAsiModel.bind(this));            
            // this.taskmgr.addTaskCall(this.addcube.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));

            this.addinput("260px","0px","diffuse","string");      
            var input=this.addinput("260px","100px","0");
            this.addinput("300px","0px","emitpower","string");
            var input1=this.addinput("300px","100px","1");


            this.diffuse=input;
            this.emitpower=input1;
        }
        private addinput(top:string,left:string,text:string,type:string="number"):HTMLInputElement
        {
            var input: HTMLInputElement = document.createElement("input");
            input.type = type;
            this.app.container.appendChild(input);
            input.style.top = top;
            input.style.left=left;
            
            input.style.position = "absolute";
            input.value=text;
            return input;
        }
        private addbtn(top:string,left:string,text:string):HTMLButtonElement
        {
            var btn = document.createElement("button");
            btn.style.top=top;
            btn.style.left=left;
            btn.style.position = "absolute";
            btn.textContent="diffuse";
            this.app.container.appendChild(btn);

            return btn;
        }

        diffuse:HTMLInputElement;
        emitpower:HTMLInputElement;

        model: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        cube1render: gd3d.framework.meshRenderer;
        cube2render: gd3d.framework.meshRenderer;
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
            // if (this.camera != null)
            // {
            //     var objCam = this.camera.gameObject.transform;
            //     objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 4, -z2 * 5);
            //     // objCam.markDirty();
            //     //objCam.updateWorldTran();
            //     objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            //     objCam.markDirty();
            // }
            if (this.light != null)
            {
                var objlight = this.light.gameObject.transform;
                objlight.localTranslate = new gd3d.math.vector3(x * 3, 3, z * 3);

                //objlight.updateWorldTran();
                objlight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objlight.markDirty();
            }
            if (this.model != undefined)
            {
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 5, this.model.localRotate);
                this.model.markDirty();

                var ss = this.model.find("0107_lmsb");

                if (ss)
                {
                    var meshrender = ss.gameObject.getComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
                    meshrender.materials[0].setFloat("_diffuse", this.diffuse.valueAsNumber);
                    meshrender.materials[0].setFloat("_emitPow",this.emitpower.valueAsNumber);
                }
            }


        }
    }

}