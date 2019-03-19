namespace t {
    export class test_clearDepth0 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application) {
            this.app = app;
            this.scene = this.app.getScene();

            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadTexture.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
        }
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => {
                if (_state.isfinish) {
                    state.finish = true;
                }
            }
            );
        }

        private loadTexture(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
        }
        sh: gd3d.framework.shader;
        private initscene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            var objCam = new gd3d.framework.transform();
            objCam.name = "cam_show";
            this.scene.addChild(objCam);
            this.showcamera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.showcamera.order = 0;
            this.showcamera.near = 0.01;
            this.showcamera.far = 30;
            this.showcamera.fov = Math.PI * 0.3;
            console.log(this.showcamera.fov);
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//鏍囪涓洪渶瑕佸埛鏂?
            
            
            {
                var o2ds = new gd3d.framework.overlay2D();

                this.showcamera.addOverLay(o2ds);
                {
                    var t2d = new gd3d.framework.transform2D();
                    t2d.name = "ceng1";
                    t2d.localTranslate.x = 0;
                    t2d.localTranslate.y = 0;
                    t2d.width = 150;
                    t2d.height = 150;
                    t2d.pivot.x = 0;
                    t2d.pivot.y = 0;
                    t2d.markDirty();
                    var rawiamge = t2d.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                    rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("rock256.png") as gd3d.framework.texture;
                    t2d.markDirty();
                    o2ds.addChild(t2d);


                }
                {
                    var cube1 = new gd3d.framework.transform();
                    cube1.localTranslate.x = -3;
                    cube1.name = "cube1";
                    this.scene.addChild(cube1);
                    cube1.localScale.x = 4;
                    cube1.localScale.y = 4;
                    cube1.localScale.z = 1;

                    cube1.markDirty();

                    var mesh1 = cube1.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("plane");
                    mesh1.mesh = (smesh);
                    var renderer = cube1.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    renderer.materials = [];
                    let mat = new gd3d.framework.material();
                    renderer.materials[0] = mat;
                    mat.setShader(this.app.getAssetMgr().getShader("diffuse.shader.json"));
                    mat.setTexture("_MainTex", this.app.getAssetMgr().getAssetByName("rock256.png") as gd3d.framework.texture);
                }
            }
            state.finish = true;
        }



        private fuckLabel: gd3d.framework.label;
        private showcamera: gd3d.framework.camera;

        target: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        angle: number;
        timer: number;
        update(delta: number) {
            this.taskmgr.move(delta);

            if (this.target == undefined) return;
            // if (this.show_cube == undefined) return;
            this.timer += delta;
            gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 3, this.target.localRotate);
            this.target.markDirty();
        }
    }
}