let help_v2 = new gd3d. math.vector2();
class test_3DPhysics_kinematic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr : gd3d.framework.assetMgr;
    iptMgr : gd3d.framework.inputMgr;
    mrs : gd3d.framework.meshRenderer[] = [];

    async start  (app: gd3d.framework.application) {
        await physics3dDemoTool.init(app);
        this.app = app;
        this.scene = physics3dDemoTool.scene;
        this.astMgr = physics3dDemoTool.astMgr;
        this.camera = physics3dDemoTool.camera;
        this.iptMgr = physics3dDemoTool.iptMgr;
        this.init();
        return null;
    }

    floor : gd3d.framework.transform;
    ctrBox :gd3d.framework.transform;
    init(){
        let mat_activated = physics3dDemoTool.mats["activated"];
        let mat_floor = physics3dDemoTool.mats["white"];

        //构建物体
        //底面
        let trans=new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x= 20;
        trans.localScale.y= 0.01;
        trans.localScale.z= 20;
        this.scene.addChild(trans);
        let mr = physics3dDemoTool.attachMesh(trans , mat_floor ,"cube");
        //box ctr 操控的box
        let ctrBox=new gd3d.framework.transform();
        this.ctrBox = ctrBox;
        this.ctrBox.localPosition.y = 3;
        this.scene.addChild(ctrBox);
        let mr_ctr = physics3dDemoTool.attachMesh(ctrBox , mat_activated ,"cube");
        //box
        let trans2=new gd3d.framework.transform();
        trans2.localPosition.y=5;
        trans2.localPosition.x= -0.3;
        trans2.localPosition.z=0.3;
        this.scene.addChild(trans2);
        let mr2 = physics3dDemoTool.attachMesh(trans2 , mat_activated ,"cube");
        //sphere
        let trans3=new gd3d.framework.transform();
        trans3.localPosition.y = 10;
        trans3.localPosition.x = -0.2;
        trans3.localPosition.z = 0.2;
        this.scene.addChild(trans3);
        let mr3 = physics3dDemoTool.attachMesh(trans3 , mat_activated ,"sphere");
        //cylinder
        let cylinder_mid =new gd3d.framework.transform();
        cylinder_mid.name = "cylinder"
        cylinder_mid.localPosition.y = 8;
        this.scene.addChild(cylinder_mid);
        let mr_cl = physics3dDemoTool.attachMesh(cylinder_mid , mat_activated ,"cylinder");

        //初始化 物理
        this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0),new gd3d.framework.OimoJSPlugin());
        let ctrBoxImpostor = new gd3d.framework.PhysicsImpostor(ctrBox, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.8 , kinematic : true });
        let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.3});
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.3 });
        let sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.3 });
        let cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});

        this.mrs.push(mr_cl,mr3,mr2,mr_ctr);
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

    private tcount = 0;
    private time = 0.5;
    update(delta: number) {
        this.updateRoate();
        this.tcount += delta;
        if(this.tcount > this.time){
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }

    }
}