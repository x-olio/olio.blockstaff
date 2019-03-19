/** 
 * 3d物理 车轮马达 motor wheel(hinge2)
 */
class test_3DPhysics_motor_wheel implements IState {
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
        let mat_joint = this.mats["yellow"];
        //构建物体-------------------
        //box
        let trans2=new gd3d.framework.transform();
        this.boxTran = trans2;
        trans2.name = "box"
        gd3d.math.vec3Set(trans2.localPosition,-this.connectedPivot.x, -this.mainPivot.y,0);
        trans2.localScale.x = 0.5;
        this.scene.addChild(trans2);
        let mr2 =  this.attachMesh(trans2,mat_activated,"cube");

        //sphere mid
        let mid_sphere =new gd3d.framework.transform();
        mid_sphere.name = "sphere_1"
        mid_sphere.localPosition.y = 8;
        gd3d.math.vec3SetAll(mid_sphere.localScale,0.5);
        this.scene.addChild(mid_sphere);
        let mr_cl =  this.attachMesh(mid_sphere,mat_joint,"sphere");

        //初始化 物理世界-----------------------
        this.scene.enablePhysics(new gd3d.math.vector3(0,0,0),new gd3d.framework.OimoJSPlugin());
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 2 });
        let cylinderImpostor = new gd3d.framework.PhysicsImpostor(mid_sphere, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 0 ,friction:0.5});

        this.mrs.push(mr2);

        //Add Joint
        let phyJ = gd3d.framework.MotorEnabledJoint;
        let joint1 = new phyJ(phyJ.WheelJoint,{
            mainPivot: this.mainPivot,
            connectedPivot: this.connectedPivot,
            mainAxis: new gd3d.math.vector3(0, 1, 0),
            connectedAxis: new gd3d.math.vector3(1, 0, 0),
            nativeParams: {
        }
        });
        this.targetMotor = joint1;
        cylinderImpostor.addJoint(boxImpostor , joint1);
        
        joint1.setMotor(1,100);

        //GUI
        this.setGUI();

        //
        this.addDisplayObj();
    }
    private connectedPivot = new gd3d.math.vector3(-2, 0, 0);
    private mainPivot = new gd3d.math.vector3(0, -1.5, 0);

    private pole : gd3d.framework.transform;
    private pole_1 : gd3d.framework.transform;
    //辅助显示连接轴
    addDisplayObj(){
        let mat_pole = this.mats["purple"];
        let diameter = 0.25;
        let m_y = Math.abs( this.mainPivot.y);
        let m_x = Math.abs( this.connectedPivot.x);
        //横杆
        this.pole =new gd3d.framework.transform();
        this.scene.addChild(this.pole);
        let _pole = new gd3d.framework.transform();
        this.pole.addChild(_pole);
        gd3d.math.vec3Set( _pole.localScale,m_x,diameter,diameter);
        gd3d.math.vec3Set( _pole.localPosition, - _pole.localScale.x /2 ,0,0);
        this.attachMesh( _pole,mat_pole,"cube");

        //竖杆
        this.pole_1 =new gd3d.framework.transform();
        this.scene.addChild(this.pole_1);
        let _pole_1 = new gd3d.framework.transform();
        gd3d.math.vec3Set(_pole_1.localScale,diameter,m_y,diameter);
        gd3d.math.vec3Set(_pole_1.localPosition, 0  , _pole_1.localScale.y/2 , 0);
        this.pole_1.addChild(_pole_1);
        this.attachMesh(_pole_1,mat_pole,"cube");
    }

    private tempV3 = new gd3d.math.vector3();
    syncDisplayRT(){
        if(!this.boxTran || !this.pole) return;
        let bPos = this.boxTran.localPosition;
        gd3d.math.vec3Clone(bPos,this.pole.localPosition);
        //屏蔽x 轴的旋转
        gd3d.math.quatClone(this.boxTran.localRotate,this.pole.localRotate);
        this.pole.localPosition = this.pole.localPosition;
        this.pole.localRotate = this.pole.localRotate;
        //
        gd3d.math.vec3Set(this.pole_1.localPosition, 0 , bPos.y , 0);
        this.pole_1.localPosition = this.pole_1.localPosition;
    }

    private motorSpeed = 10;
    private targetMotor :  gd3d.framework.MotorEnabledJoint;
    private changeMotorSpeed (){
        if(!this.targetMotor) return;
        this.targetMotor.setMotor(this.motorSpeed);
    }

    attachMesh(tran:gd3d.framework.transform, mat: gd3d.framework.material, meshName : string) : gd3d.framework.meshRenderer{
        let mf=tran.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr=tran.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mr.materials[0] = mat;
        mf.mesh=this.astMgr.getDefaultMesh(meshName);
        return mr;
    }

    private guiMsg = "车轮马达测试demo wheel(hinge2)";
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
        gui.add(this , "motorSpeed",1,100);
        let folderFun = gui.addFolder("触发方法");
        folderFun.open();

        folderFun.add(this, 'impulseBox' );
        folderFun.add(this, 'changeMotorSpeed' );
    }

    private impulseBox(){
        this.doImpulse(this.boxTran.physicsImpostor);
    }

    private force = new gd3d.math.vector3(0,10,0);
    private contactlocalPoint = new gd3d.math.vector3(0,-0.5,0.45);
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


    private tcount = 0;
    private time = 0.5;
    update(delta: number) {
        this.tcount += delta;
        if(this.tcount > this.time){
            this.ckBodySleeped();
            this.tcount = 0;
        }

        //同步辅助显示
        this.syncDisplayRT(); 
    }
}