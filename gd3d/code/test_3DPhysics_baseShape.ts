class test_3DPhysics_baseShape implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number = 0;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    count: number = 0;
    counttimer: number = 0;
    astMgr : gd3d.framework.assetMgr;
    mrs : gd3d.framework.meshRenderer[] = [];

    async start  (app: gd3d.framework.application) {
        this.app = app;
        this.scene = this.app.getScene();
        this.astMgr = this.app.getAssetMgr();
        await this.loadbySync(`./res/shader/shader.assetbundle.json`);
        await this.loadbySync(`./res/prefabs/Capsule/Capsule.assetbundle.json`);
        this.initMats();
        this.initCamera();
        this.init();
        return null;
    }


    mats : {[name:string] : gd3d.framework.material} = {};
    initMats(){
        let mat =  new gd3d.framework.material();
        this.mats["activated"] = mat;
        let sh = this.astMgr.getShader("diffuse.shader.json");
        mat.setShader(sh);
        mat.setVector4("_MainColor",new gd3d.math.vector4(0.51,0.39,0.96,1));
        
        //
        mat =  new gd3d.framework.material();
        this.mats["floor"] = mat;
        sh = this.astMgr.getShader("diffuse.shader.json");
        mat.setShader(sh);
        mat.setVector4("_MainColor",new gd3d.math.vector4(0.8,0.8,0.8,1));

        //
        mat =  new gd3d.framework.material();
        this.mats["sleeping"] = mat;
        sh = this.astMgr.getShader("diffuse.shader.json");
        mat.setShader(sh);
        mat.setVector4("_MainColor",new gd3d.math.vector4(0.4,0.4,0.4,1));
    }

    loadbySync(url:string){
        return new gd3d.threading.gdPromise<any>((resolve,reject)=>{
            this.astMgr.load(url,gd3d.framework.AssetTypeEnum.Auto,(state)=>{
                if(state && state.isfinish){
                    resolve();
                }
            });
        });
    }

    init(){

        let mat_activated = this.mats["activated"];
        let mat_sleeping = this.mats["sleeping"];
        let mat_floor = this.mats["floor"];
        //构建物体-------------------
        //底面
        let trans=new gd3d.framework.transform();
        trans.localScale.x= 20;
        trans.localScale.y= 0.01;
        trans.localScale.z= 20;
        this.scene.addChild(trans);
        let mf=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr.materials[0] = mat_floor;
        mf.mesh=this.astMgr.getDefaultMesh("cube");

        //box
        let trans2=new gd3d.framework.transform();
        trans2.name = "box"
        trans2.localPosition.y=5;
        trans2.localPosition.x= -0.3;
        trans2.localPosition.z=0.3;
        this.scene.addChild(trans2);
        let mf2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr2.materials[0] = mat_activated;
        mf2.mesh=this.astMgr.getDefaultMesh("cube");

        //sphere
        let trans3=new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 15;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        let mf3=trans3.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr3=trans3.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr3.materials[0] = mat_activated;
        mf3.mesh=this.astMgr.getDefaultMesh("sphere");

        //cylinder
        let cylinder_mid =new gd3d.framework.transform();
        cylinder_mid.name = "cylinder"
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        let mf_cl=cylinder_mid.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr_cl=cylinder_mid.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr_cl.materials[0] = mat_activated;
        mf_cl.mesh=this.astMgr.getDefaultMesh("cylinder");

        //初始化 物理世界-----------------------
        this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0),new gd3d.framework.OimoJSPlugin());
        let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1 , friction: 0.9});
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5 , disableBidirectionalTransformation:true});
        let sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});
        let cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});

        this.mrs.push(mr2,mr2,mr_cl);
        
    }

    initCamera(){
        //相机-----------------------------------
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 120;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0,15,-15);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        let hoverc = this.camera.gameObject.addComponent("HoverCameraScript") as gd3d.framework.HoverCameraScript;
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30 ;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0)

        ////光;
        let light = new gd3d.framework.transform();
        light.localRotate;
        gd3d.math.quatFromEulerAngles(45,10,0,light.localRotate);
        light.name = "light";
        let lComp = light.gameObject.addComponent("light") as gd3d.framework.light;
        lComp.type = gd3d.framework.LightTypeEnum.Direction;
        this.scene.addChild(light);
    }

    ckBodySleeped(){
        this.mrs.forEach(mr=>{
            if(mr && mr.gameObject.transform.physicsImpostor ){
                let phy = mr.gameObject.transform.physicsImpostor;
                if(mr.gameObject.getName() == "box"){
                    mr;
                    if(phy.isSleeping){
                        mr;
                    }
                }
                let matName = phy.isSleeping ? "sleeping": "activated";
                mr.materials[0] = this.mats[matName];
            }
        });
    }


    private tcount = 0;
    private time = 0.5;
    update(delta: number) {
        this.tcount += delta;
        if(this.tcount > this.time){
            this.ckBodySleeped();
            this.tcount = 0;
        }

    }
}