/** 
 * 3d物理 铰链关节 joint hinge
 */
class test_3DPhysics_joint_hinge implements IState {
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
    iptMgr : gd3d.framework.inputMgr;
    async start  (app: gd3d.framework.application) {
        this.app = app;
        this.scene = this.app.getScene();
        this.astMgr = this.app.getAssetMgr();
        this.iptMgr = this.app.getInputMgr();
        await this.loadbySync(`./res/shader/shader.assetbundle.json`);
        await this.loadbySync(`./res/prefabs/Capsule/Capsule.assetbundle.json`);
        await datGui.init();
        this.initMats();
        this.initCamera();
        this.init();
        return null;
    }


    mats : {[name:string] : gd3d.framework.material} = {};
    initMats(){
        //激活状态
        this.addMat("activated",new gd3d.math.vector4(0.51,0.39,0.96,1));
        //yellow
        this.addMat("yellow",new gd3d.math.vector4(0.8,0.8,0,1));
        //休眠状态
        this.addMat("sleeping",new gd3d.math.vector4(0.4,0.4,0.4,1));
        //purple
        this.addMat("purple",new gd3d.math.vector4(0.8,0,0.8,1));
    }

    private addMat(name: string, color:gd3d.math.vector4){
        let mat = this.mats[name] = new gd3d.framework.material();
        mat.setShader(this.astMgr.getShader("diffuse.shader.json"));
        mat.setVector4("_MainColor", color );
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

    private boxTran : gd3d.framework.transform;
    init(){
        let mat_activated = this.mats["activated"];
        let mat_sleeping = this.mats["sleeping"];
        let mat_stick = this.mats["yellow"];
        //构建物体-------------------
        // //底面
        // let trans=new gd3d.framework.transform();
        // trans.localScale.x= 20;
        // trans.localScale.y= 0.01;
        // trans.localScale.z= 20;
        // this.scene.addChild(trans);
        // let mf=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        // let mr=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        // mr.materials[0] = mat_floor;
        // mf.mesh=this.astMgr.getDefaultMesh("cube");

        //box
        let trans2=new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box"
        trans2.localPosition.y=5;
        trans2.localPosition.x= -0.3;
        trans2.localPosition.z=0.3;
        trans2.localScale.z = 2;
        trans2.localScale.y = 3;
        this.scene.addChild(trans2);
        let mr = this.attachMesh(trans2 , mat_activated ,"cube");

        //sphere
        let trans3=new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 8;
        trans3.localPosition.x = -3;
        this.scene.addChild(trans3);
        let mr1 = this.attachMesh(trans3 , mat_activated ,"sphere");

        //cylinder
        let cylinder_mid =new gd3d.framework.transform();
        cylinder_mid.name = "cylinder"
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        this.attachMesh(cylinder_mid , mat_stick ,"cylinder");

        //初始化 物理世界-----------------------
        this.scene.enablePhysics(new gd3d.math.vector3(0,0,0),new gd3d.framework.OimoJSPlugin());
        // let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        let sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 0.5, restitution: 0.6 ,friction: 0.5});
        let cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0 ,friction:0.5});

        this.mrs.push(mr,mr1);


        //Add Joint
        let jointData = {
            mainPivot: new gd3d.math.vector3(0, 0, 0),
            connectedPivot: new gd3d.math.vector3(0, -2, 0),
            mainAxis: new gd3d.math.vector3(0, 0, 1),
            connectedAxis: new gd3d.math.vector3(0, 0, 0),
            nativeParams: {}
            };

        let phyJ = gd3d.framework.PhysicsJoint;
        let joint1 = new phyJ(phyJ.HingeJoint,jointData);
        // let joint1 = new gd3d.framework.HingeJoint({
        //     mainPivot: new gd3d.math.vector3(0, 0, 0),
        //     connectedPivot: new gd3d.math.vector3(0, -2, 0),
        //     mainAxis: new gd3d.math.vector3(0, 0, 1),
        //     connectedAxis: new gd3d.math.vector3(0, 0, 0),
        //     nativeParams: {
        //     }
        // });
        cylinderImpostor.addJoint(boxImpostor , joint1);

        //圆柱朝向
        gd3d.math.quatFromEulerAngles(90,0,0,cylinder_mid.localRotate);

        //GUI
        this.setGUI();
    }

    private guiMsg = "铰链关节测试demo hinge";
    setGUI(){
        if(!dat) return;
        let gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        //force
        let folderF = gui.addFolder("force (冲量)");
        let limitf = 100;
        folderF.add(this.force, 'x', -limitf, limitf);
        folderF.add(this.force, 'y', -limitf, limitf);
        folderF.add(this.force, 'z', -limitf, limitf);
        let folderC = gui.addFolder("contactPoint (施加点)");
        let limitc = 3;
        folderC.add(this.contactlocalPoint, 'x', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'y', -limitc, limitc);
        folderC.add(this.contactlocalPoint, 'z', -limitc, limitc);
        let folderFun = gui.addFolder("触发方法");
        folderFun.open();

        folderFun.add(this, 'impulseBox' );
    }

    private impulseBox(){
        this.doImpulse(this.boxTran.physicsImpostor);
    }

    private force = new gd3d.math.vector3(-50,0,0);
    private contactlocalPoint = new gd3d.math.vector3(0,0,0);
    private tempV3 = new gd3d.math.vector3();
    private doImpulse(phyImpostor : gd3d.framework.PhysicsImpostor){
        let pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(),this.contactlocalPoint,pos);
        phyImpostor.applyImpulse(this.force, pos);
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

    attachMesh(tran:gd3d.framework.transform, mat: gd3d.framework.material, meshName : string) : gd3d.framework.meshRenderer{
        let mf=tran.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr=tran.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr.materials[0] = mat;
        mf.mesh=this.astMgr.getDefaultMesh(meshName);
        return mr;
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