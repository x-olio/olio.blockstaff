let help_v2 = new gd3d. math.vector2();
class test_3DPhysics_kinematic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    astMgr : gd3d.framework.assetMgr;
    iptMgr : gd3d.framework.inputMgr;

    async start  (app: gd3d.framework.application) {
        this.app = app;
        this.scene = this.app.getScene();
        this.astMgr = this.app.getAssetMgr();
        this.iptMgr = this.app.getInputMgr();
        await this.loadbySync(`./res/shader/shader.assetbundle.json`);
        await this.loadbySync(`./res/prefabs/Capsule/Capsule.assetbundle.json`);
        this.init();
        return null;
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

    floor : gd3d.framework.transform;
    ctrBox :gd3d.framework.transform;
    init(){
        //构建物体
        //底面
        let trans=new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x= 20;
        trans.localScale.y= 0.01;
        trans.localScale.z= 20;
        // gd3d.math.quatFromEulerAngles(-90,0,0,trans.localRotate);
        this.scene.addChild(trans);
        let mf=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf.mesh=this.astMgr.getDefaultMesh("cube");

        //box ctr 操控的box
        let ctrBox=new gd3d.framework.transform();
        this.ctrBox = ctrBox;
        this.ctrBox.localPosition.y = 3;
        this.scene.addChild(ctrBox);
        let mf_ctr=ctrBox.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr_ctr=ctrBox.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf_ctr.mesh=this.astMgr.getDefaultMesh("cube");

        //box
        let trans2=new gd3d.framework.transform();
        trans2.localPosition.y=5;
        trans2.localPosition.x= -0.3;
        trans2.localPosition.z=0.3;
        this.scene.addChild(trans2);
        let mf2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf2.mesh=this.astMgr.getDefaultMesh("cube");

        //sphere
        let trans3=new gd3d.framework.transform();
        trans3.localPosition.y = 10;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        let mf3=trans3.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr3=trans3.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf3.mesh=this.astMgr.getDefaultMesh("sphere");


        //组合 碰撞体--------------------
        //父层级
        let combination = new gd3d.framework.transform();
        combination.name = "combination"
        // gd3d.math.vec3SetAll(combination.localScale,3);
        combination.localPosition.y = 10;
        this.scene.addChild(combination);

        //显示模型
        //外部加载mesh (capsule)
        let p1= this.astMgr.getAssetByName("Capsule.prefab.json") as gd3d.framework.prefab;
        let capsule = p1.getCloneTrans();
        capsule.name = "capsule"
        let mf4 = capsule.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
        combination.addChild(capsule);

        //top sphere
        let sphere_top =new gd3d.framework.transform();
        sphere_top.name = "sphere_top";
        // sphere_top.gameObject.visible = false;
        sphere_top.localPosition.y = 0.5;
        gd3d.math.vec3SetAll(sphere_top.localScale,0.5);
        combination.addChild(sphere_top);
        let mf_st=sphere_top.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr_st=sphere_top.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf_st.mesh=this.astMgr.getDefaultMesh("sphere");

        //mid 
        let cylinder_mid =new gd3d.framework.transform();
        cylinder_mid.name = "cylinder_mid";
        // cylinder_mid.gameObject.visible = false;
        gd3d.math.vec3Set(cylinder_mid.localScale,1,0.5,1);
        combination.addChild(cylinder_mid);
        let mf_cl=cylinder_mid.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr_cl=cylinder_mid.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf_cl.mesh=this.astMgr.getDefaultMesh("cylinder");

        //bottom sphere
        let sphere_bottom =new gd3d.framework.transform();
        // sphere_bottom.gameObject.visible = false;
        sphere_bottom.name = "sphere_bottom"
        sphere_bottom.localPosition.y = -0.5;
        gd3d.math.vec3SetAll(sphere_bottom.localScale,0.5);
        combination.addChild(sphere_bottom);
        let mf_sb=sphere_bottom.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
        let mr_sb=sphere_bottom.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
        mf_sb.mesh=this.astMgr.getDefaultMesh("sphere");


        //初始化 物理
        this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0),new gd3d.framework.OimoJSPlugin());
        let ctrBoxImpostor = new gd3d.framework.PhysicsImpostor(ctrBox, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.8 , kinematic : true });
        let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.3});
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.3 });
        let sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3 });
        //组合 碰撞体
        let s_top_Impostor = new gd3d.framework.PhysicsImpostor(sphere_top, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3 , disableBidirectionalTransformation:true});
        let c_mid_Impostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.3});
        let s_bottom_Impostor = new gd3d.framework.PhysicsImpostor(sphere_bottom, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3});
        let combImpostor = new gd3d.framework.PhysicsImpostor(combination, gd3d.framework.ImpostorType.NoImpostor, { mass: 1, restitution: 0.3});


        // let pWorld = gd3d.framework.physic.getPhysicsPlugin().world;
        // pWorld.broadphase = new CANNON.NaiveBroadphase();
        this.scene = this.app.getScene();

        //相机
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
        objCam.markDirty();//标记为需要刷新
        let hoverc = this.camera.gameObject.addComponent("HoverCameraScript") as gd3d.framework.HoverCameraScript;
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30 ;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0)

        //光;
        let light = new gd3d.framework.transform();
        light.localRotate;
        gd3d.math.quatFromEulerAngles(45,10,0,light.localRotate);
        light.name = "light";
        let lComp = light.gameObject.addComponent("light") as gd3d.framework.light;
        lComp.type = gd3d.framework.LightTypeEnum.Direction;
        this.scene.addChild(light);

        //鼠标事件
        this.iptMgr.addPointListener(gd3d.event.PointEventEnum.PointMove,this.onPonitMove,this);
    }

    cachePickInfo = new gd3d.framework.pickinfo();
    cacheRota = new gd3d.math.quaternion();
    cache_y = 0;
    onPonitMove([x,y]){
        let viewPos = help_v2;
        viewPos.x = x;
        viewPos.y = y;
        console.log(`x: ${x} ,y :${y}`);
        let ray = this.camera.creatRayByScreen(viewPos,this.app);
        let mf = this.floor.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
        let isinsrt = mf.mesh.intersects(ray,this.floor.getWorldMatrix(),this.cachePickInfo);
        if(!isinsrt || !this.cachePickInfo || !this.cachePickInfo.hitposition)return;
        let pos = this.cachePickInfo.hitposition;
        console.log(`pos  x: ${pos.x} ,y :${pos.y} , z: ${pos.z}`);

        //同步ctr box 位置
        pos.y += 0.55;
        this.ctrBox.physicsImpostor.kinematicSetPosition(pos);  //更新动力学 位置
    }

    updateRoate(){
        if(!this.ctrBox) return;
        this.cache_y += 3;
        gd3d.math.quatFromEulerAngles(0,this.cache_y,0,this.cacheRota);
        this.ctrBox.physicsImpostor.kinematicSetRotation(this.cacheRota); //更新动力学 旋转
        
    }

    doRay(){
        
    }


    update(delta: number) {
        this.updateRoate();
        
    }
}