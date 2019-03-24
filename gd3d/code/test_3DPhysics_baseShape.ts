class test_3DPhysics_baseShape implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr : gd3d.framework.assetMgr;
    mrs : gd3d.framework.meshRenderer[] = [];

    async start  (app: gd3d.framework.application) {
        await physics3dDemoTool.init(app);
        this.app = app;
        this.scene = physics3dDemoTool.scene;
        this.astMgr = physics3dDemoTool.astMgr;
        this.camera = physics3dDemoTool.camera;
        this.init();
        return null;
    }

    init(){

        let mat_activated = physics3dDemoTool.mats["activated"];
        let mat_floor = physics3dDemoTool.mats["white"];
        //构建物体-------------------
        //底面
        let trans=new gd3d.framework.transform();
        trans.localScale.x= 20;
        trans.localScale.y= 0.01;
        trans.localScale.z= 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans , mat_floor ,"cube");

        //box
        let trans2=new gd3d.framework.transform();
        trans2.name = "box"
        trans2.localPosition.y=5;
        trans2.localPosition.x= -0.3;
        trans2.localPosition.z=0.3;
        this.scene.addChild(trans2);
        let mr2 = physics3dDemoTool.attachMesh(trans2 , mat_activated ,"cube");

        //sphere
        let trans3=new gd3d.framework.transform();
        trans3.name = "sphere";
        trans3.localPosition.y = 15;
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

        //初始化 物理世界-----------------------
        this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0),new gd3d.framework.OimoJSPlugin());
        let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1 , friction: 0.9});
        let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5 , disableBidirectionalTransformation:true});
        let sphereImpostor = new gd3d.framework.PhysicsImpostor(trans3, gd3d.framework.ImpostorType.SphereImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});
        let cylinderImpostor = new gd3d.framework.PhysicsImpostor(cylinder_mid, gd3d.framework.ImpostorType.CylinderImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5});

        this.mrs.push(mr2,mr3,mr_cl);
        
    }

    private tcount = 0;
    private time = 0.5;
    update(delta: number) {
        this.tcount += delta;
        if(this.tcount > this.time){
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }

    }
}