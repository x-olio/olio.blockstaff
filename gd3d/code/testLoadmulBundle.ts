class test_loadMulBundle implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    refreshTexture(tran:gd3d.framework.transform)
    {
        let meshrenderer = tran.gameObject.getComponentsInChildren("meshRenderer") as gd3d.framework.meshRenderer[];
        let skinnmeshrenderer = tran.gameObject.getComponentsInChildren("skinnedMeshRenderer") as gd3d.framework.skinnedMeshRenderer[];
        for(let i=0; i<meshrenderer.length; i++)
        {
            let v = meshrenderer[i];
            for(let j=0; j<v.materials.length; j++)
            {
                for(let k in v.materials[j].statedMapUniforms)
                {
                    if(v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture)
                    {
                        let textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname) as gd3d.framework.texture;
                        v.materials[j].setTexture(k, textur);
                    }
                }
                
            }
        }
        for(let i=0; i<skinnmeshrenderer.length; i++)
        {
            let v = skinnmeshrenderer[i];
            for(let j=0; j<v.materials.length; j++)
            {
                for(let k in v.materials[j].statedMapUniforms)
                {
                    if(v.materials[j].statedMapUniforms[k].type == gd3d.render.UniformTypeEnum.Texture)
                    {
                        let textur = this.app.getAssetMgr().getAssetByName(v.materials[j].statedMapUniforms[k].resname) as gd3d.framework.texture;
                        v.materials[j].setTexture(k, textur);
                    }
                }
                
            }
        }
    }
    
    refreshAniclip(tran:gd3d.framework.transform)
    {
        // let anipalyer = tran.gameObject.getComponentsInChildren("aniplayer") as gd3d.framework.aniplayer[];
        // for(let i=0; i<anipalyer.length; i++)
        // {
        //     for(let j=0; j<anipalyer[i].clips.length; j++)
        //     {
        //         let v = anipalyer[i].clips[j];
        //         anipalyer[i].clips[j] = this.app.getAssetMgr().getAssetByName(v.getName()) as gd3d.framework.animationClip;
        //     }
            
        //     anipalyer[i].playByIndex(0);
        // }
    }

    refreshLightMap(scene:gd3d.framework.scene, rawscene:gd3d.framework.rawscene)
    {
        scene.lightmaps = [];
        rawscene.resetLightMap(this.app.getAssetMgr());
        rawscene.useLightMap(this.app.getScene());
        rawscene.useFog(this.app.getScene());
    }
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        let names: string[] = ["MainCity", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        let name = names[0];
        // name="MainCity";
        let isloaded = false;
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.app.getAssetMgr().load("res/scenes/"+name+"/meshprefab/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish)
                    {
                        var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(name + ".scene.json") as gd3d.framework.rawscene;
                        var _root = _scene.getSceneRoot();
                        this.scene.addChild(_root);
                        _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
                        _root.markDirty();
                        
                        this.app.getAssetMgr().load("res/scenes/" + name + "/textures/" + name + "texture.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                        (s) => 
                        {
                            if(s.isfinish)
                            {
                                this.refreshTexture(this.app.getScene().getRoot());
                                this.refreshLightMap(this.app.getScene(), _scene);
                            }
                        });
                        
                        this.app.getAssetMgr().load("res/scenes/" + name + "/aniclip/" + name + "aniclip.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                        (s) => 
                        {
                            if(s.isfinish)
                            {
                                this.refreshAniclip(this.app.getScene().getRoot());
                            }
                        });
                    }
                });
            }
        });
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        //this.camera.postQueues.push(new gd3d.framework.cameraPostQueue_Depth());

        // this.camera.near = 0.01;
        // this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        // objCam.lookatPoint(new gd3d.math.vector3(133.6694, 97.87, 67));
        objCam.lookatPoint(new gd3d.math.vector3(100, 0, 100));

        objCam.markDirty();//标记为需要刷新

        CameraController.instance().init(this.app, this.camera);
    }

    baihu:gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    bere: boolean = false;
    update(delta: number)
    {
        this.timer += delta;
        CameraController.instance().update(delta);
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.5);
        var z2 = Math.cos(this.timer * 0.5);
        var objCam = this.camera.gameObject.transform;
        // objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 30, z2 * 10);
        // objCam.markDirty();//标记为需要刷新

    }
}