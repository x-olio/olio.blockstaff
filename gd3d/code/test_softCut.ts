//软裁剪
class test_softCut implements IState{
    static temp ;

    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    start(app: gd3d.framework.application){
        test_softCut.temp = this;
        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();

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
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));

    }

    private createUI(astState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let Temptex = this.assetMgr.getAssetByName("cutbg.png") as gd3d.framework.texture;
        let atlasComp = this.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;

        //over img
        let over_t2 = new gd3d.framework.transform2D;
        over_t2.width = 100;
        over_t2.height = 60;
        over_t2.pivot.x = 0;
        over_t2.pivot.y = 0;
        over_t2.localTranslate.x = 120;
        over_t2.localTranslate.y = 100;
        this.rooto2d.addChild(over_t2);
        let over_i2 = over_t2.addComponent("image2D") as gd3d.framework.image2D;
        over_i2.sprite = atlasComp.sprites["bg"];
        over_i2.imageType = gd3d.framework.ImageType.Sliced;
        over_i2.sprite.border = new gd3d.math.border(10,50,10,10);

        //cut frame
        let cut_t = new gd3d.framework.transform2D;
        cut_t.width = 200;
        cut_t.height = this.rooto2d.canvas.pixelHeight/2;
        cut_t.pivot.x = 0;
        cut_t.pivot.y = 0;
        cut_t.localTranslate.x = 100;
        cut_t.localTranslate.y = 50;
        this.rooto2d.addChild(cut_t);
        cut_t.isMask = true;

        //9宫格拉伸底图
        let bg_t = new gd3d.framework.transform2D;
        bg_t.width = this.rooto2d.canvas.pixelWidth/2;
        bg_t.height = this.rooto2d.canvas.pixelHeight/2;
        bg_t.pivot.x = 0;
        bg_t.pivot.y = 0;
        bg_t.localTranslate.x = -50;
        bg_t.localTranslate.y = 0;
        bg_t.localRotate = 25 * Math.PI/180;
        cut_t.addChild(bg_t);
        let bg_i = bg_t.addComponent("image2D") as gd3d.framework.image2D;
        bg_i.sprite = atlasComp.sprites["bg"];
        bg_i.imageType = gd3d.framework.ImageType.Sliced;
        bg_i.sprite.border = new gd3d.math.border(10,50,10,10);

        //按鈕
        let btn_t = new gd3d.framework.transform2D;
        btn_t.name = "btnt"
        btn_t.width = 100;
        btn_t.height = 36;
        btn_t.pivot.x = 0;
        btn_t.pivot.y = 0;
        btn_t.localTranslate.x = 30;
        btn_t.localTranslate.y = 70;
        bg_t.addChild(btn_t);
        let btn_b = btn_t.addComponent("button") as gd3d.framework.button;
        btn_b.targetImage = btn_t.addComponent("image2D") as gd3d.framework.image2D;
        btn_b.targetImage.sprite = atlasComp.sprites["ui_public_button_hits"];
        btn_b.pressedGraphic = atlasComp.sprites["ui_public_button_1"];
        btn_b.pressedColor = new gd3d.math.color(1,1,1,1);
        btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;
        btn_t.visible = true;
        

        //sub cut farme
        let subc_t = new gd3d.framework.transform2D;
        subc_t.width = 60;
        subc_t.height = 50;
        subc_t.pivot.x = 0;
        subc_t.pivot.y = 0;
        subc_t.localTranslate.x = 170;
        subc_t.localTranslate.y = 200;
        this.rooto2d.addChild(subc_t);
        subc_t.isMask = true;
        

        //sub img
        let over_t = new gd3d.framework.transform2D;
        over_t.width = 100;
        over_t.height = 60;
        over_t.pivot.x = 0;
        over_t.pivot.y = 0;
        subc_t.addChild(over_t);
        over_t.localTranslate.x = -20;
        let over_i = over_t.addComponent("image2D") as gd3d.framework.image2D;
        over_i.sprite = atlasComp.sprites["bg"];
        over_i.imageType = gd3d.framework.ImageType.Sliced;
        over_i.sprite.border = new gd3d.math.border(10,50,10,10);

        //raw png
        let raw_t = new gd3d.framework.transform2D;
        raw_t.width = 130;
        raw_t.height = 130;
        raw_t.pivot.x = 0;
        raw_t.pivot.y = 0;
        subc_t.addChild(raw_t);
        //raw_t.localTranslate.x = -50;
        let raw_i = raw_t.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        raw_i.image = Temptex;
        
        
        //文本
        let lab_t = new gd3d.framework.transform2D;
        lab_t.width = 120;
        lab_t.height = 24;
        lab_t.localTranslate.x = 10;
        lab_t.localTranslate.y = 30;
        this.rooto2d.addChild(lab_t);
        let lab_l = lab_t.addComponent("label") as gd3d.framework.label;
        lab_l.font = this.assetMgr.getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
        lab_l.fontsize = 24;
        lab_l.text = "我是段文本";
        lab_l.color =new gd3d.math.color(0.2,0.2,0.2,1);
        
        //文本
        let lab_t2 = new gd3d.framework.transform2D;
        lab_t2.width = 200;
        lab_t2.height = 24;
        // lab_t2.localTranslate.x = -20;
        // lab_t2.localTranslate.y = 100;
        raw_t.addChild(lab_t2);
        let lab_l2 = lab_t2.addComponent("label") as gd3d.framework.label;
        lab_l2.font = this.assetMgr.getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
        lab_l2.fontsize = 30;
        lab_l2.text = "我是段文本2";
        lab_l2.color =new gd3d.math.color(0.9,0.1,0.2,1);

        //scroll view
        let scroll_t = new gd3d.framework.transform2D;
        scroll_t.width =  200;
        scroll_t.height = 200;
        this.rooto2d.addChild(scroll_t);
        scroll_t.localTranslate.x = 260;
        scroll_t.localTranslate.y = 100;
        let scroll_ = scroll_t.addComponent("scrollRect") as gd3d.framework.scrollRect;
        let ct = new gd3d.framework.transform2D;
        ct.width = 350;
        ct.height = 450;
        scroll_.content = ct;
        scroll_t.isMask = true;
        scroll_.horizontal = true;
        scroll_.vertical = true;
        
        //raw png
        let raw_t2 = new gd3d.framework.transform2D;
        raw_t2.width = 300;
        raw_t2.height = 400;
        let raw_i2 = raw_t2.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        raw_i2.image = Temptex;
        ct.addChild(raw_t2);
        
        
        //sub scroll
        let scroll_t1 = new gd3d.framework.transform2D;
        scroll_t1.width =  200;
        scroll_t1.height = 200;
        ct.addChild(scroll_t1);
        scroll_t1.localTranslate.x = -50;
        scroll_t1.localTranslate.y = 100;
        let scroll_1 = scroll_t1.addComponent("scrollRect") as gd3d.framework.scrollRect;
        let ct1 = new gd3d.framework.transform2D;
        ct1.width = 350;
        ct1.height = 450;
        scroll_1.content = ct1;
        scroll_t1.isMask = true;
        scroll_1.horizontal = true;
        scroll_1.vertical = true;
        
        //raw png
        let raw_t3 = new gd3d.framework.transform2D;
        raw_t3.width = 300;
        raw_t3.height = 400;
        let raw_i3 = raw_t3.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        raw_i3.image = Temptex;
        ct1.addChild(raw_t3);

        // //flame 
        // let flame_t = new gd3d.framework.transform2D;
        // flame_t.width = 400;
        // flame_t.height = 260;
        // flame_t.pivot.x = 0;
        // flame_t.pivot.y = 0;
        // flame_t.localTranslate.x = 100;
        // flame_t.localTranslate.y = 100;
        // this.rooto2d.addChild(flame_t);
        // let bflame_i = flame_t.addComponent("image2D") as gd3d.framework.image2D;
        // bflame_i.imageType = gd3d.framework.ImageType.Simple;
        // bflame_i.setTexture(texture);

        

        //getpixle 
        let Preader = new gd3d.render.textureReader(this.app.webgl,Temptex.glTexture.texture,Temptex.glTexture.width,Temptex.glTexture.height,false);

        //key dwon test
        let inputMgr = this.app.getInputMgr();

        this.app.webgl.canvas.addEventListener("keydown", (ev: KeyboardEvent) =>
        {
            if(ev.keyCode == 81){
                console.error("getpixle: " + Preader.getPixel(1,0.5));
            }
        }, false);



        state.finish = true;
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
                                    if(s.isfinish){
                                        this.assetMgr.load("res/cutbg.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                                            if(s.isfinish){
                                                state.finish = true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    update(delta: number){
        this.taskmgr.move(delta); //推进task

    }

}