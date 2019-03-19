//UI 组件样例
class physic2d_dome implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    static temp:gd3d.framework.transform2D;
    start(app: gd3d.framework.application) {

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

        this.scene.enable2DPhysics();

        gd3d.framework.physic2D.setGravity(0,0);
        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.createUI.bind(this));


    }

    private createUI(astState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let atlasComp = this.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
        let tex_0 = this.assetMgr.getAssetByName("zg03_256.png") as gd3d.framework.texture;
        

        //raw png
        this.creatbox(100,100,120,120,tex_0,this.rooto2d);
        this.creatbox(130,300,120,120,tex_0,this.rooto2d);


        let wallWidth=1200;
        let wallheigth=600;


        this.crea2dWall(0,wallheigth/2,50,wallheigth,tex_0,this.rooto2d);
        this.crea2dWall(wallWidth,wallheigth/2,50,wallheigth,tex_0,this.rooto2d);
        this.crea2dWall(wallWidth/2,0,wallWidth,50,tex_0,this.rooto2d);
        this.crea2dWall(wallWidth/2,wallheigth,wallWidth,50,tex_0,this.rooto2d);

        state.finish = true;
    }

    private crea2dWall(posx:number,posy:number,width:number,height:number,texture:gd3d.framework.texture,root:gd3d.framework.overlay2D):gd3d.framework.transform2D
    {
        let bound3 = new gd3d.framework.transform2D;
        bound3.localTranslate.x=posx;
        bound3.localTranslate.y=posy;
        bound3.width = width;
        bound3.height = height;
        bound3.pivot.x=0.5;
        bound3.pivot.y=0.5;
        let boundimag3 = bound3.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        boundimag3.image = texture;
        let body3=bound3.addComponent("rectBody") as gd3d.framework.rectBody;
        body3.setInitData({isStatic:true});

        root.addChild(bound3);
        return bound3;
    }

    private creatbox(posx:number,posy:number,width:number,height:number,texture:gd3d.framework.texture,root:gd3d.framework.overlay2D):gd3d.framework.transform2D
    {
        let bound3 = new gd3d.framework.transform2D;
        bound3.localTranslate.x=posx;
        bound3.localTranslate.y=posy;
        bound3.width = width;
        bound3.height = height;
        bound3.pivot.x=0.5;
        bound3.pivot.y=0.5;
        let boundimag3 = bound3.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        boundimag3.image = texture;
        let body3=bound3.addComponent("rectBody") as gd3d.framework.rectBody;

        setTimeout(()=>{
            body3.addForce(new gd3d.math.vector2(1,0));
        },3000);

        root.addChild(bound3);
        return bound3;
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