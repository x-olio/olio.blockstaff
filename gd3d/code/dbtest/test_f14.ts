namespace dome{
    export class db_test_f14eff implements IState {
        rotEuler: number;
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        label: HTMLLabelElement;
    
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            let cuttime=Date.now();
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                if (_state.isfinish)
                {
                    state.finish = true;
                    let endtime=Date.now();
                    console.log();
                }
            }
            );
        }
        rot:gd3d.math.quaternion=new gd3d.math.quaternion();
        
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            //gd3d.framework.assetMgr.useBinJs=true;
            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            //this.taskmgr.addTaskCall(this.loadmesh.bind(this));
            
            this.taskmgr.addTaskCall(this.loadSkill.bind(this));
            this.taskmgr.addTaskCall(this.addcam.bind(this));
            this.taskmgr.addTaskCall(this.addcontroll.bind(this));

            this.taskmgr.addTaskCall(this.loadWeapon.bind(this));
            this.taskmgr.addTaskCall(this.loadEffectPrefab.bind(this));
            
            
            // this.taskmgr.addTaskCall(this.loadEffect.bind(this));
            document.onkeypress=(ev)=>{
                let key=ev.keyCode;
                let keystr=ev.key.toUpperCase();//safari浏览器不支持keypress事件中的key属性
                console.log(keystr);
                if(keystr=="P"&&this.role!=null)
                {
                    this.rotEuler+=1;
                    gd3d.math.quatFromEulerAngles(0,1,0,this.rot);
                    gd3d.math.quatMultiply(this.role.localRotate,this.rot,this.role.localRotate);
                    this.role.markDirty();
                }
            };


        }
        model:gd3d.framework.transform;
        suitTrans:gd3d.framework.transform;
        suitSkin:gd3d.framework.skinnedMeshRenderer;
        private loadmesh(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var name="zs_chuangjue_01";
            name="cwc_001";
            name="pc1";
            name="Quad_1";
            name="baoxiang_ceshinn";
            name="pc2_MergeSuit_104";

            this.app.getAssetMgr().load("res/prefabs/"+name+"/"+name+".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name+".prefab.json") as gd3d.framework.prefab;
                    let value=_prefab.getCloneTrans()
                    this.model=value;
                    let skins=this.model.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER) as gd3d.framework.skinnedMeshRenderer[];

                    let roleskins=this.role.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER) as gd3d.framework.skinnedMeshRenderer[];
                    for(let item in roleskins)
                    {
                        let skin=roleskins[item];
                        let nameARR=skin.gameObject.transform.name.split('_')
                        if(nameARR[1]!=null&&nameARR[1]=="MergeSuit")
                        {
                            this.role.removeChild(skin.gameObject.transform);
                            this.role.addChild(skins[0].gameObject.transform);
                            this.suitTrans=skins[0].gameObject.transform;
                            this.suitSkin=skins[0];
                        }
                    }

                    this.model.markDirty();
                    state.finish = true;
                }
            });
        }
        private loadWeapon(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            let name="wp_ds_001";
             name="box";
            this.app.getAssetMgr().load("res/prefabs/"+name+"/"+name+".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name+".prefab.json") as gd3d.framework.prefab;
                    let rhand=this.role.find("Bip01 Prop1");
                    let lhand=this.role.find("Bip01 Prop2");
                    if(rhand)
                    {
                        let weapon= _prefab.getCloneTrans();
                        rhand.addChild(weapon);
                        weapon.localRotate=new gd3d.math.quaternion();
                        weapon.localTranslate=new gd3d.math.vector3();
                        weapon.localScale=new gd3d.math.vector3(1,1,1);
                        // weapon.addChild(this.effPrefab);
                        weapon.markDirty();
                    }
                    if(lhand)
                    {
                        let weapon= _prefab.getCloneTrans();
                        lhand.addChild(weapon);
                        weapon.localRotate=new gd3d.math.quaternion();
                        weapon.localTranslate=new gd3d.math.vector3();
                        weapon.localScale=new gd3d.math.vector3(1,1,1);
                        weapon.markDirty();
                    }
                    state.finish=true;
                }
            });
        }
        private beTrailParticle=false;
        private f14eff:gd3d.framework.f14EffectSystem;
        private effPrefab:gd3d.framework.transform;
        effbaseprefab: gd3d.framework.prefab
        private loadEffectPrefab(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var name="effprefab";
            name="GameObject";
            name="ceshi";
            name="fx_cg_ui";
            name="s_b";
            name="fx_zgg_Skill01_S";
            name="fx_wp_bj";
            name="fx_wd";
            name = "fx_wd";
            name = "fx_js";
            this.app.getAssetMgr().load("res/f14effprefab/"+name+"/"+name+".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name+".prefab.json") as gd3d.framework.prefab;
                    this.effbaseprefab=_prefab;
                    let prefab=_prefab.getCloneTrans();
                    this.effPrefab=prefab;
                    let f14Effect=this.effPrefab.gameObject.getComponent("f14EffectSystem")as gd3d.framework.f14EffectSystem;
                    this.f14eff=f14Effect;
                    if(this.role)
                    {
                        this.role.addChild(this.effPrefab);
                    }else
                    {
                        this.scene.addChild(this.effPrefab);
                    }
                    let delayTime=f14Effect.delay;
                    state.finish=true;
                    // // this.effPrefab.markDirty();


                }
            });
        }
        SkillName:string;
        private loadSkill(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            let name="xc_skill1.FBAni.aniclip.bin";
            name="skill.FBAni.aniclip.bin";
            name="pc1_run.FBAni.aniclip.bin";
            //name="pc1_skill_aoyi.FBAni.aniclip.bin";
            name="pc2_run.FBAni.aniclip.bin";
            name="GWB02_sw_die1.FBAni.aniclip.bin";
            name="UIbaoxiang_no_idle.FBAni.aniclip.bin";
            name="gmd_xs_run.FBAni.aniclip.bin";
            name = "Run.FBAni.aniclip.bin";
            this.SkillName=name;
            let url="res/prefabs/"+this.RoleName+"/resources/"+this.SkillName;
            //let url="res/prefabs/"+"pc2/resources/"+this.SkillName;

            this.app.getAssetMgr().load(url,gd3d.framework.AssetTypeEnum.Auto,(s) =>
            {
                if(s.isfinish)
                {
                    let clip=this.app.getAssetMgr().getAssetByName(this.SkillName) as gd3d.framework.animationClip;
                    this.aniPlayer.addClip(clip);
                    state.finish=true;
                    console.log("加载技能完成. res name:"+clip.getName());
                }
            });
        }
        private addcontroll(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.addButton();
            this.addButton2();
            state.finish=true;
        }

        private beActive=false;
        private currentalpha=0.9;
        private addButton()
        {
            var btn = document.createElement("button");
            btn.textContent = "Play";
            btn.onclick = () =>
            {
                // let eff=this.effbaseprefab.getCloneTrans();
                // eff.name="cloneEff";
                // this.scene.addChild(eff);
                // let f14Effect0=eff.gameObject.getComponent("f14EffectSystem")as gd3d.framework.f14EffectSystem;
                // f14Effect0.play();
                // setTimeout(()=>{
                //     eff.dispose();
                // },5);
                // this.f14eff.play(()=>{
                //     console.log("特效播放结束！");
                // });
                // this.effPrefab.localPosition.z=0;
                // this.enableMove=true;
                // this.beActive=true;
                //this.aniPlayer.stop();

                this.currentalpha*=0.5;
                this.f14eff.changeAlpha(this.currentalpha);

                this.aniPlayer.play(this.SkillName);

                //console.log("delay",this.f14eff.delay);
            }
            btn.style.top = "160px";
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
        }
        private boneIndex=0;
        private testtrans:gd3d.framework.transform;

        private addButton2()
        {
            var btn = document.createElement("button");
            btn.textContent = "stop";
            btn.onclick = () =>
            {
                // this.beActive=false;
                this.f14eff.stop();
                this.enableMove=false;
                // if(this.testtrans==undefined)
                // {
                //     let cube = new gd3d.framework.transform();
                //     let meshf = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                //     cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                //     meshf.mesh=this.app.getAssetMgr().getDefaultMesh("cube");
                //     this.testtrans=cube;
                // }
                // let bone=this.suitSkin.bones[this.boneIndex];
                // if(bone)
                // {
                //     let tbone=this.role.find(bone.name);
                //     tbone.addChild(this.testtrans);
                //     this.testtrans.localPosition=new gd3d.math.vector3();
                //     this.testtrans.markDirty();
                //     this.boneIndex+=1;
                //     this.aniPlayer.addToCareList(tbone);
                //     console.log("bonename:"+bone.name);
                // }
            }
            btn.style.top = "200px";
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
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            // let campoint=this.role.find("cam");
            // gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up,180,objCam.localRotate);
            // campoint.addChild(objCam);
            // objCam.markDirty();
            objCam.localTranslate = new gd3d.math.vector3(0,0,-15);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新
            // let controller=new CameraController();
            CameraController.instance().init(this.app,this.camera);
            this.app.getScene().mainCamera=this.camera;
            state.finish = true;
        }
        role:gd3d.framework.transform;
        RoleName:string;
        aniPlayer:gd3d.framework.aniplayer;
        aniclips:gd3d.framework.animationClip[];
        private loadRole(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var name="hmb";
            name="GWB02";
            name="UIbaoxiang";
            name="gmd";
            name = "elong";
            this.RoleName=name;
            this.app.getAssetMgr().load("res/prefabs/"+name+"/"+name+".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name+".prefab.json") as gd3d.framework.prefab;
                    let role=_prefab.getCloneTrans();
                    this.role=role;
                    this.aniPlayer = this.role.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                    this.aniPlayer.autoplay=false;
                    this.aniclips=this.aniPlayer.clips;
                    this.scene.addChild(this.role);
                    this.role.markDirty();


                    let skins=this.role.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER) as gd3d.framework.skinnedMeshRenderer[];
                    for(let key in skins)
                    {
                        skins[key].gameObject.transform.localScale=new gd3d.math.vector3(1.2,1.2,1.2);
                        skins[key].gameObject.transform.markDirty();
                    }  

                    state.finish = true;
                }
            });
        }
        tr: gd3d.framework.transform;
        count:number=0;
        beplay:boolean=false;


        a:gd3d.math.vector3=new gd3d.math.vector3(1,12,123);
        b:gd3d.math.vector3=new gd3d.math.vector3(1,12,123);
        c:gd3d.math.vector3=new gd3d.math.vector3(1,12,123);
        
        private enableMove:boolean=false;
        update(delta: number)
        {
            this.taskmgr.move(delta);
            CameraController.instance().update(delta);
            if(this.enableMove)
            {
                this.effPrefab.localPosition.z+=0.2;
                this.effPrefab.markDirty();
            }
        }

        

    }
}