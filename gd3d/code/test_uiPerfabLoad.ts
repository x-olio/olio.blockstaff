//UI 组件样例
class test_uiPerfabLoad implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    start(app: gd3d.framework.application) {

        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();

        this.app.closeFps();

        //相机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 10;

        //2dUI root
        this.rooto2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(this.rooto2d);


        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadShaders.bind(this));
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));

        //html 输入框
        let inputh = document.createElement("input");
        this.app.container.appendChild(inputh);
        inputh.style.position = "absolute";
        inputh.style.width = 100 + "px";
        inputh.style.height = 30 + "px";
        inputh.value = "button_comb1";
        
        let btn = document.createElement("button");
        this.app.container.appendChild(btn);
        btn.textContent = "加载";
        btn.style.position = "absolute";
        btn.style.left = 120 + "px";
        btn.onclick = ()=>{
            console.error(inputh.innerText);
            console.error(inputh.textContent);
            console.error(inputh.value);
            this.doLoad(inputh.value);
        }

    }

    private bgui :gd3d.framework.transform2D;
    private createUI(astState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let atlasComp = this.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
        let tex_0 = this.assetMgr.getAssetByName("zg03_256.png") as gd3d.framework.texture;

        //9宫格拉伸底图
        let bg_t = new gd3d.framework.transform2D;
        bg_t.width = 400;
        bg_t.height = 260;
        bg_t.pivot.x = 0;
        bg_t.pivot.y = 0;
        //bg_t.localTranslate.x = 100;
        bg_t.localTranslate.y = 100;
        this.rooto2d.addChild(bg_t);
        let bg_i = bg_t.addComponent("image2D") as gd3d.framework.image2D;
        bg_i.imageType = gd3d.framework.ImageType.Sliced;
        bg_i.sprite = atlasComp.sprites["bg"];
        bg_i.imageBorder.l = 10;
        bg_i.imageBorder.t = 50;
        bg_i.imageBorder.r = 10;
        bg_i.imageBorder.b = 10;
        bg_t.layoutState = 0 | gd3d.framework.layoutOption.LEFT | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP | gd3d.framework.layoutOption.BOTTOM;
        bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT,60);
        bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP,60);
        bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT,60);
        bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM,60);

        this.bgui = bg_t;

        let prefabName = "button";
        //this.doLoad(prefabName);

        //key dwon test
        let inputMgr = this.app.getInputMgr();

        this.app.webgl.canvas.addEventListener("keydown", (ev: KeyboardEvent) =>
        {
            if(ev.keyCode == 81){
               
            }
        }, false);



        state.finish = true;
    }

    targetui :gd3d.framework.transform2D ;
    private doLoad(name){
        if(!this.bgui) return;
        if(this.targetui){
            this.bgui.removeChild(this.targetui);
            this.targetui.dispose();
        }

        let prefabName = name;
        // 加载 ui  预制体
        this.assetMgr.load(`res/prefabs/UI/${prefabName}/${prefabName}.assetbundle.json`, gd3d.framework.AssetTypeEnum.Auto, (s1) => {
            if (s1.isfinish) {
                let ass =  this.assetMgr;
                let temp = this.assetMgr.getAssetByName(`${prefabName}.prefab.json`) as gd3d.framework.prefab; 
                let t2d = temp.getCloneTrans2D() as gd3d.framework.transform2D;
                this.bgui.addChild(t2d);
                t2d.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER ;
                t2d.markDirty();
                this.targetui = t2d;
        }
        });
    }

    private loadShaders(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load("res/shader/shader.assetbundle.json",gd3d.framework.AssetTypeEnum.Auto,(s)=>{
            if(s.isfinish){
                state.finish = true;
            }
        });
    }

    private loadTexture(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        //加载图片资源
        this.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
            if (s.isfinish) {
                this.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                    if(s.isfinish){
                        //加载字体资源
                        this.assetMgr.load("res/STXINGKA.TTF.png",gd3d.framework.AssetTypeEnum.Auto,(s)=>{
                            if(s.isfinish){
                                this.assetMgr.load("res/resources/STXINGKA.font.json",gd3d.framework.AssetTypeEnum.Auto,(s)=>{
                                    this.assetMgr.load("res/zg03_256.png",gd3d.framework.AssetTypeEnum.Auto,(s)=>{
                                        if(s.isfinish){
                                            state.finish = true;
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    update(delta: number) {
        this.taskmgr.move(delta); //推进task

    }

}