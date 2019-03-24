
/** 
 * 加载动作的dome
*/
class dome_loadaniplayer implements IState {

    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskmgr = new gd3d.framework.taskMgr();
    role: gd3d.framework.transform;
    assetmgr: gd3d.framework.assetMgr;
    //角色名
    private roleName = "pc2";
    //武器名
    private weaponName = "wp_ds_001";
    //技能名,动作名
    private skillName = "pc2_cskill1.FBAni.aniclip.bin";

    private names: string[] = ["pc2_cskill1.FBAni.aniclip.bin", "pc2_skill1.FBAni.aniclip.bin", "pc2_skill34.FBAni.aniclip.bin","pc2_skill27.FBAni.aniclip.bin","pc1_skill27.FBAni.aniclip.bin"];
    //动作的Component
    private ani: gd3d.framework.aniplayer;

    private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
            if (s.isfinish) {
                state.finish = true;
            }
        });
    }

    private loadRole(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {

        let name = this.roleName;
        //加载人物资源
        this.app.getAssetMgr().load(`res/prefabs/roles/${name}/${name}.assetbundle.json`, gd3d.framework.AssetTypeEnum.Auto, (s) => {
            if (s.isfinish) {
                //通过prefab拿到任务的transform
                let p = this.assetmgr.getAssetByName(`${name}.prefab.json`) as gd3d.framework.prefab;
                this.role = p.getCloneTrans();


                this.ani = this.role.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                this.ani.autoplay = false;
                this.scene.addChild(this.role);
                this.role.markDirty();

                if (this.weaponName) {
                    //加载武器
                    this.loadWeapon(this.weaponName);
                }

                if (this.skillName) {
                    //加载指定动作
                    this.loadSkill(this.skillName)
                }

                state.finish = true;
            }
        });
    }

    private loadSkill(name: string) {
        this.assetmgr.load(`res/prefabs/roles/${this.roleName}/Resources/${name}`, gd3d.framework.AssetTypeEnum.Auto, (s) => {
            // if (s.isfinish) {
            //     let skill = this.assetmgr.getAssetByName(name) as gd3d.framework.animationClip;
            //     //在aniplayer控件的 clipnames 中找到动作名为name动作的id
            //     let j = this.ani.clipnames[name];
            //     if (j != null) {
            //         //把动作的索引付给clips中与name对应的id中
            //         this.ani.clips[j] = skill;
            //     }
            // }
        });
    }

    private loadWeapon(name: string) {
        this.assetmgr.load(`res/prefabs/weapons/${name}/${name}.assetbundle.json`, gd3d.framework.AssetTypeEnum.Auto, (s) => {
            if (s.isfinish) {
                let p = this.assetmgr.getAssetByName(`${name}.prefab.json`) as gd3d.framework.prefab;
                let rhand = this.role.find("Bip01 Prop1");
                let lhand = this.role.find("Bip01 Prop2");
                if (rhand) {
                    let weapon = p.getCloneTrans();
                    rhand.addChild(weapon);
                    weapon.localRotate = new gd3d.math.quaternion();
                    weapon.localTranslate = new gd3d.math.vector3();
                    weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    weapon.markDirty();
                }

                if (lhand) {
                    let weapon = p.getCloneTrans();
                    lhand.addChild(weapon);
                    weapon.localRotate = new gd3d.math.quaternion();
                    weapon.localTranslate = new gd3d.math.vector3();
                    weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    weapon.markDirty();
                }

            }
        });
    }

    //初始化操作按钮
    private ctrlBtn(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let play = document.createElement("button") as HTMLButtonElement;
        let stop = document.createElement("button") as HTMLButtonElement;
        let playspeed = document.createElement("input") as HTMLInputElement;
        let sel = document.createElement("select") as HTMLSelectElement;
        sel.value = sel.innerText = this.names[0];

        for(let i = 0 ; i<this.names.length ; i++){
            let op = document.createElement("option") as HTMLOptionElement;
            op.value = op.innerText = this.names[i];
            sel.appendChild(op);
        }

        sel.onchange = (e)=>{
            this.loadSkill(this.skillName = (e.target as HTMLSelectElement).value);
        }

        
        sel.style.height="20px";
        sel.style.width = "200px";
        sel.style.fontSize="12px";
        sel.style.top = "150px";

        play.value = "PLAY";
        play.textContent = "PLAY";
        stop.value = "STOP";
        stop.textContent = "STOP";
        play.style.position = stop.style.position = playspeed.style.position =sel.style.position= "absolute";
        play.style.height = stop.style.height = playspeed.style.height = "30px";
        play.style.width = stop.style.width = playspeed.style.width = "100px";
        play.style.left = stop.style.left = playspeed.style.left = sel.style.left = "30px";
        play.style.top = "50px";
        stop.style.top = "85px";
        playspeed.style.top = "120px";
        


        playspeed.type = "text";
        playspeed.value = "1.0";
        let speed = 1.0;
        playspeed.style.height

        playspeed.onchange = () => {
            let num = parseFloat(playspeed.value);
            if (isNaN(num)) {
                playspeed.value = speed + "";
            } else {
                speed = num;
            }
        }
        let i = 0;

        play.onclick = () => {
            //this.ani.stop();
             this.ani.play(this.skillName);
            let ap = this.ani;
            if(ap.haveClip(this.skillName)) {
                ap.play(this.skillName);
                return;
            }
            let list = ap.awaitLoadClipNames();
            if(!list.indexOf(this.skillName)) return;
            let resPath = `res/prefabs/roles/${this.roleName}/resources/`;
            let cname = this.skillName;
            ap.addClipByNameLoad(this.app.getAssetMgr(),resPath,cname,(sta,clipName)=>{
                if(sta.isfinish){
                    let clip = ap.getClip(cname);
                    ap.play(cname);
                }
            });
        }

        stop.onclick = () => {
            this.ani.stop();
        }

        this.app.container.appendChild(play);
        this.app.container.appendChild(stop);
        this.app.container.appendChild(playspeed);
        this.app.container.appendChild(sel);

        state.finish = true;
    }

    //初始化摄像机
    private addCam(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let objCam = new gd3d.framework.transform;
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        let camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        camera.near = 0.01;
        camera.far = 2000;
        camera.fov = Math.PI * 0.3;
        camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(5, 5, 5);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    }

    start(app: gd3d.framework.application) {
        this.app = app;
        this.scene = app.getScene();
        this.assetmgr = app.getAssetMgr();
        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadRole.bind(this));
        this.taskmgr.addTaskCall(this.ctrlBtn.bind(this));
        this.taskmgr.addTaskCall(this.addCam.bind(this));

    }

    update(delta: number) {
        this.taskmgr.move(delta);
    }
}