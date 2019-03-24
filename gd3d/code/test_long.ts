namespace demo
{
    export class DragonTest implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        dragon: gd3d.framework.transform;
        camTran: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();

        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if(s.isfinish)
                {
                    state.finish = true;
                }
            });
        }

        private loadLongPrefab(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            let resName = "long"
            this.app.getAssetMgr().load(`res/prefabs/${resName}/${resName}.assetbundle.json`, gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(`${resName}.prefab.json`) as gd3d.framework.prefab;
                    this.dragon = _prefab.getCloneTrans();
                    this.scene.addChild(this.dragon);
                    this.dragon.markDirty();
                    this.camTran = this.dragon.find("Dummy001");
                    let ap =  this.dragon.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                    let list = ap.awaitLoadClipNames();
                    let resPath = `res/prefabs/${resName}/resources/`;
                    if(list.length >0 ){
                        let cname = list[0];
                        ap.addClipByNameLoad(this.app.getAssetMgr(),resPath,cname,(sta,clipName)=>{
                            if(sta.isfinish){
                                let clip = ap.getClip(cname);
                                ap.play(cname);
                            }
                        });
                    }
                    state.finish = true;
                }
            });
        }

        private loadScene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/scenes/test_scene/test_scene.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName("test_scene.scene.json") as gd3d.framework.rawscene;
                    var _root = _scene.getSceneRoot();
                    this.scene.addChild(_root);
                    _root.localTranslate.y = -0.1;

                    this.app.getScene().lightmaps = [];
                    _scene.useLightMap(this.app.getScene());

                    state.finish = true;
                }
            });
        }

        private addCameraAndLight(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.camTran.addChild(tranCam);
            tranCam.localEulerAngles = new gd3d.math.vector3(0, 270, 0);
            this.camera = tranCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.001;
            this.camera.far = 200;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            tranCam.markDirty();

            var tranLight = new gd3d.framework.transform();
            tranLight.name = "light";
            this.scene.addChild(tranLight);
            this.light = tranLight.gameObject.addComponent("light") as gd3d.framework.light;
            this.light.type = gd3d.framework.LightTypeEnum.Direction;
            tranLight.localTranslate.x = 5;
            tranLight.localTranslate.y = 5;
            tranLight.localTranslate.z = -5;
            tranLight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranLight.markDirty();

            state.finish = true;
        }

        start(app: gd3d.framework.application)
        {
            this.app = app;
            this.scene = app.getScene();

            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadLongPrefab.bind(this));
            // this.taskmgr.addTaskCall(this.loadScene.bind(this));
            this.taskmgr.addTaskCall(this.addCameraAndLight.bind(this));
        }

        update(delta: number)
        {
            this.taskmgr.move(delta);
        }

    }

}