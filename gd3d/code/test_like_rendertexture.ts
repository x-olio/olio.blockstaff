/// <reference path="../lib/gd3d.d.ts" />

namespace t
{

    export class test_rendertexture implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                state.finish = true;
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
        sh: gd3d.framework.shader;
        private initscene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            {
                //camera1
                var objCam = new gd3d.framework.transform();
                objCam.name = "cam_show";
                this.scene.addChild(objCam);
                this.showcamera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
                this.showcamera.order = 0;
                this.showcamera.near = 0.01;
                this.showcamera.far = 30;
                this.showcamera.fov = Math.PI * 0.3;
                objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();//鏍囪涓洪渶瑕佸埛鏂?
            }

            {
                var o2ds = new gd3d.framework.overlay2D();

                this.showcamera.addOverLay(o2ds);
                {//overlay1
                    var t2d = new gd3d.framework.transform2D();
                    t2d.name="ceng1";
                    t2d.localTranslate.x = 200;
                    t2d.localTranslate.y = 200;
                    t2d.width = 300;
                    t2d.height = 300;
                    t2d.pivot.x = 0;
                    t2d.pivot.y = 0;
                    t2d.markDirty();
                    var rawiamge = t2d.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                    rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;

                    o2ds.addChild(t2d);
                }
                {
                    var cube1 = new gd3d.framework.transform();

                    cube1.name = "cube1";
                    this.scene.addChild(cube1);
                    cube1.localScale.x = 8;
                    cube1.localScale.y = 1;
                    cube1.localScale.z = 1;

                    cube1.markDirty();

                    var mesh1 = cube1.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh1.mesh = (smesh);
                    var renderer = cube1.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                }
            }
            


            state.finish = true;

        }

        private add3dmodelbeforeUi(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            {
                var modelcam = new gd3d.framework.transform();
                modelcam.name = "modelcam";
                this.scene.addChild(modelcam);
                this.wath_camer = modelcam.gameObject.addComponent("camera") as gd3d.framework.camera;
                //--------------------------------重要设置-----------------------------------------
                this.wath_camer.order = 1;//这个看向模型的相机的order需要高于场景相机
                this.wath_camer.clearOption_Color = false;
                this.wath_camer.clearOption_Depth=true;
                this.wath_camer.CullingMask=gd3d.framework.CullingMask.modelbeforeui|gd3d.framework.CullingMask.ui;
                //--------------------------------------------------------------------------------------
                
                // this.wath_camer.near = 0.01;
                // this.wath_camer.far = 30;
                // this.wath_camer.fov = Math.PI * 0.3;
                modelcam.localTranslate = new gd3d.math.vector3(0, 10, -10);
                modelcam.lookatPoint(new gd3d.math.vector3(0, 0, 0));//相机要看向你想看到的3d模型
                modelcam.markDirty();
            }
            {//加3d模型，用特定shader
                var cube = new gd3d.framework.transform();

                cube.name = "cube";
                this.scene.addChild(cube);
                cube.localScale.x = 3;
                cube.localScale.y = 3;
                cube.localScale.z = 3;

                cube.markDirty();

                var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                renderer.renderLayer = gd3d.framework.CullingMask.modelbeforeui;
                let cuber = renderer;

                //"shader/def3dbeforeui"
                //"def/defui"
                //"diffuse.shader.json"
                this.sh = this.app.getAssetMgr().getShader("diffuse.shader.json");//3d模型要用这个shader

                if (this.sh != null)
                {
                    cuber.materials = [];
                    cuber.materials.push(new gd3d.framework.material());
                    cuber.materials[0].setShader(this.sh);//

                    let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                    cuber.materials[0].setTexture("_MainTex", texture);
                }
                this.target = cube;
                {//加ui，如果需要在模型上层显示ui
                    var o2d1 = new gd3d.framework.overlay2D();
                    this.wath_camer.addOverLay(o2d1);
                    {//
                        var t2d = new gd3d.framework.transform2D();
                        t2d.name="ceng2";
                        t2d.localTranslate.x = 300;
                        t2d.localTranslate.y = 100;
                        t2d.width = 150;
                        t2d.height = 150;
                        t2d.pivot.x = 0;
                        t2d.pivot.y = 0;
                        t2d.markDirty();
                        var rawiamge = t2d.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                        rawiamge.image = this.scene.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;

                        o2d1.addChild(t2d);
                    }
                }
            }
            state.finish=true;
        }
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            this.taskmgr.addTaskCall(this.add3dmodelbeforeUi.bind(this));


        }
        wath_camer: gd3d.framework.camera;
        target: gd3d.framework.transform;
        targetMat: gd3d.framework.material;
        show_cube: gd3d.framework.transform;
        showcamera: gd3d.framework.camera;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();

        angle: number;
        update(delta: number)
        {
            this.taskmgr.move(delta);

            if (this.target == undefined) return;
            // if (this.show_cube == undefined) return;
            this.timer += delta;

            gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer * 3, this.target.localRotate);
            this.target.markDirty();


        }
    }
}