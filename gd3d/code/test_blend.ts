namespace t {

    export class test_blend implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        background: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        count: number = 0;
        counttimer: number = 0;
        private angularVelocity: gd3d.math.vector3 = new gd3d.math.vector3(10, 0, 0);
        private eulerAngle = gd3d.math.pool.new_vector3();

        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => {
                if (_state.isfinish) {

                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            let t = 2;
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    t--;
                    if (t == 0) {
                        state.finish = true;

                    }
                }
                else {
                    state.error = true;
                }
            }
            );

            this.app.getAssetMgr().load("res/trailtest2.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    t--;
                    if (t == 0) {
                        state.finish = true;

                    }
                }
                else {
                    state.error = true;
                }
            }
            );
        }

        private addcam(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 120;
            objCam.localTranslate = new gd3d.math.vector3(0, 10, 10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新
            state.finish = true;

        }

        foreground: gd3d.framework.transform;
        private addplane(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            {
                {
                    let background = new gd3d.framework.transform();
                    background.name = "background";
                    background.localScale.x = background.localScale.y = 5;
                    background.localTranslate.z =-1;
                    console.log(background);
                    this.scene.addChild(background);
                    background.markDirty();
                    background.updateWorldTran();
                    var mesh = background.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = background.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let meshRender = renderer;

                    var sh = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json") as gd3d.framework.shader;
                    if (sh != null) {
                        meshRender.materials = [];
                        meshRender.materials.push(new gd3d.framework.material());
                        meshRender.materials[0].setShader(sh);
                        let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        meshRender.materials[0].setTexture("_MainTex", texture);
                    }
                    this.background = background;
                }
            }

            {
                {
                    let foreground = new gd3d.framework.transform();
                    foreground.name = "foreground ";
                    foreground.localScale.x = foreground.localScale.y = 5;
                    this.scene.addChild(foreground);
                    foreground.markDirty();
                    foreground.updateWorldTran();
                    var mesh = foreground.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = foreground.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let meshRender = renderer;

                    var sh = this.app.getAssetMgr().getShader("particles_additive.shader.json") as gd3d.framework.shader;
                    if (sh != null) {
                        meshRender.materials = [];
                        meshRender.materials.push(new gd3d.framework.material());
                        meshRender.materials[0].setShader(sh);
                        let texture = this.app.getAssetMgr().getAssetByName("trailtest2.png") as gd3d.framework.texture;
                        meshRender.materials[0].setTexture("_MainTex", texture);
                    }
                    this.foreground = foreground;
                }
            }
            state.finish = true;
        }


        start(app: gd3d.framework.application) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.addplane.bind(this))
            this.taskmgr.addTaskCall(this.addcam.bind(this));

        }


        update(delta: number) {
            this.taskmgr.move(delta);

            this.timer += delta;
            if (this.background != undefined) {
                let x = Math.cos(this.timer * 1);
                let y = Math.sin(this.timer * 1);

                this.background.localTranslate.x = 1.5 * x;
                this.background.localTranslate.y = 1.5 * y;

                // this.cube.markDirty();
                // gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 20, this.background.localRotate);
                this.background.markDirty();
            }
        }
    }

}