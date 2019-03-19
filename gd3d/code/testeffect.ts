/// <reference path="localSave.ts" />
class test_effect implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    timer: number = 0;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    effect: gd3d.framework.effectSystem;
    label: HTMLLabelElement;

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
    private addcube(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        //添加一个盒子
        {
            //添加一个盒子
            {
                let cube = new gd3d.framework.transform();
                cube.name = "cube";
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
            }
        }
        state.finish = true;
    }

    private dragon: gd3d.framework.transform;
    private loadModel(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
        {
            if (s.isfinish)
            {
                this.app.getAssetMgr().load("res/prefabs/fx_shuijing_cj/fx_shuijing_cj.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                    (_s) =>
                    {
                        if (_s.isfinish)
                        {
                            let _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("fx_shuijing_cj.prefab.json") as gd3d.framework.prefab;
                            this.dragon = _prefab.getCloneTrans();
                            this.scene.addChild(this.dragon);
                            state.finish = true;
                        }
                    });
            }
        });

    }
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadText.bind(this));
        this.taskmgr.addTaskCall(this.addcam.bind(this));
        // this.taskmgr.addTaskCall(this.addcube.bind(this));
        // this.taskmgr.addTaskCall(this.loadModel.bind(this));
        this.taskmgr.addTaskCall(this.loadEffect.bind(this));
    }

    private text:gd3d.framework.textasset;
    private loadEffect(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) 
    {
        // this._loadEffect("res/particleEffect/hjxnew/hjxnew.assetbundle.json", "hjxnew");//
        // this._loadEffect("res/particleEffect/particle/particle.assetbundle.json", "particle.effect.json");//
        //fx_0005_sword_sword
        let names: string[] = ["0fx_boss_02", "fx_boss_02", "fx_shengji_jiaose", "fx_ss_female@attack_03", "fx_ss_female@attack_02", "fx_0_zs_male@attack_02", "fx_shuijing_cj", "fx_fs_female@attack_02", "fx_0005_sword_sword", "fx_0005_sword_sword", "fx_0_zs_male@attack_02", "fx_fs_female@attack_02"];
        let name = names[2];
        this.app.getAssetMgr().load("res/particleEffect/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
        {
            if (_state.isfinish)
            {
                this.tr = new gd3d.framework.transform();
                this.effect = this.tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM) as gd3d.framework.effectSystem;
                this.text = this.app.getAssetMgr().getAssetByName(name + ".effect.json") as gd3d.framework.textasset;
                this.effect.setJsonData(this.text);
                this.scene.addChild(this.tr);
                this.tr.markDirty();
                state.finish = true;
                this.effectloaded = true;
                this.addButton();
            }
        }
        );

    }

    private addButton()
    {

        var btn = document.createElement("button");
        btn.textContent = "Play";
        btn.onclick = () =>
        {
            // this.app.getAssetMgr().savePrefab(this.tr, "prefabName", (data: gd3d.framework.SaveInfo, resourses: string[]) =>
            // {
            //     console.log(data.files);
            //     console.log(resourses.length);

            // });

            // this.effect.stop();
            // this.effect.play();

            // let tr = new gd3d.framework.transform();
            // this.scene.addChild(tr);
            // let effect = tr.gameObject.addComponent("effectSystemNew") as gd3d.framework.effectSystemNew;
            // let ins = effect.addEffectElement(gd3d.framework.EffectElementTypeEnum.SingleMeshType);
            // gd3d.io.serializeObj(effect);

            this.effect.updateJsonData(this.text);
        }
        btn.style.top = "160px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);


        var btn1 = document.createElement("button");
        btn1.textContent = "Save To Prefab";
        btn1.onclick = () =>
        {
            let name: string = this.tr.name;
            let _prefab = new gd3d.framework.prefab(name);
            this.app.getAssetMgr().use(_prefab);
            _prefab.assetbundle = name;
            let path: string = "";
            this.app.getAssetMgr().savePrefab(this.tr, name, (data: gd3d.framework.SaveInfo, resourses: string[]) =>
            {
                console.log(data.files);
                console.log(resourses.length);
                for (let key in data.files)
                {
                    let val = data.files[key];
                    let blob = localSave.Instance.file_str2blob(val);

                    let files = [];

                    let resPath = path + "/resources/";
                    //保存资源
                    for (let i = 0; i < resourses.length; i++)
                    {
                        let resourceUrl = resourses[i];
                        let resourceName: string = this.getNameFromURL(resourceUrl);
                        let resourceLength = 0;

                        if (resourceName.indexOf(".txt") != -1 || resourceName.indexOf(".json"))
                        {
                            localSave.Instance.loadTextImmediate(resourceUrl, (_txt, _err) =>
                            {
                                let blob = localSave.Instance.file_str2blob(_txt);
                                localSave.Instance.save(resPath + resourceName, blob);
                            });
                        }
                        else
                        {
                            localSave.Instance.loadBlobImmediate(resourceUrl, (_blob, _err) =>
                            {
                                localSave.Instance.save(resPath + resourceName, _blob);
                            });
                        }


                        let fileInfo = { "name": "resources/" + resourceName, "length": 100 }
                        files.push(fileInfo);
                    }

                    localSave.Instance.save(resPath + name + ".prefab.json", blob);
                    let fileInfo = { "name": "resources/" + name + ".prefab.json", "length": 100 }
                    files.push(fileInfo);

                    let assetBundleStr = JSON.stringify({ "files": files });
                    let assetBundleBlob = localSave.Instance.file_str2blob(assetBundleStr);


                    localSave.Instance.save(path + "/" + name + ".assetbundle.json", assetBundleBlob);
                }
            });
        }
        btn1.style.top = "320px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
    }

    private getNameFromURL(path: string)
    {
        let index = path.lastIndexOf("/");
        return path.substring(index + 1);
    }

    private addcam(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 200;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0, 20, 20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();//标记为需要刷新
        state.finish = true;
    }

    tr: gd3d.framework.transform;
    ttr: gd3d.framework.transform;
    beclone = false;
    effectloaded = false;
    bestop = false;
    bereplay = false;
    update(delta: number)
    {
        this.taskmgr.move(delta);
        // if(this.effectloaded)
        // {
        //     this.timer += delta;
        //     if(this.timer > 1 && !this.beclone)
        //     {
        //         this.beclone = true;
        //         this.ttr = this.tr.clone(); 
        //         this.eff = this.ttr.gameObject.getComponent("effectSystem") as gd3d.framework.effectSystem;
        //         this.scene.addChild(this.ttr);
        //     }
        //     if(this.timer > 3 && !this.bestop)
        //     {
        //         this.bestop = true;
        //         this.eff.stop();
        //     }

        //     if(this.timer > 6 && !this.bereplay)
        //     {
        //         this.bereplay = true;
        //         this.eff.play();
        //     }
        // }
    }
}