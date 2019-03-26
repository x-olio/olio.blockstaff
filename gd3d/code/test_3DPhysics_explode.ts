/** 
 * 3d物理 爆炸
 */
class test_3DPhysics_explode implements IState {
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
        this.iptMgr = physics3dDemoTool.iptMgr;
        this.camera = physics3dDemoTool.camera;
        this.init();
        return null;
    }

    private redSphere = new gd3d.framework.transform();
    private targetTran : gd3d.framework.transform;
    private boxTran : gd3d.framework.transform;
    private floor : gd3d.framework.transform;
    private boxList : gd3d.framework.meshRenderer []= [];
    init(){
        
        let mat_activated = physics3dDemoTool.mats["activated"];
        let mat_sleeping = physics3dDemoTool.mats["sleeping"];
        let mat_stick = physics3dDemoTool.mats["yellow"];
        let mat_white = physics3dDemoTool.mats["white"];
        let mat_purple = physics3dDemoTool.mats["purple"];
        //构建物体-------------------
        //底面
        let trans=new gd3d.framework.transform();
        this.floor = trans;
        trans.localScale.x= 20;
        trans.localScale.y= 0.01;
        trans.localScale.z= 20;
        this.scene.addChild(trans);
        physics3dDemoTool.attachMesh(trans , mat_white ,"cube");

        //爆炸点 qiu
        let redSphere = new gd3d.framework.transform();
        gd3d.math.vec3SetAll(redSphere.localScale,0.5);
        this.redSphere = redSphere;
        redSphere.name = `redSphere`;
        gd3d.math.vec3Set(redSphere.localPosition,1,3,1);
        this.scene.addChild(redSphere);
        physics3dDemoTool.attachMesh(redSphere , mat_purple ,"sphere");

        let boxList : gd3d.framework.meshRenderer []= [];
        this.boxList = boxList;
        //堆一个塔
        let gap = 0.3;
        let size = 1;
        let posOffset = new gd3d.math.vector3(0,0.2,0);
        let w = 2;
        let d = 2;
        let h = 3;
        for(let i = 0 ;i < w ;i++){
            for(let j = 0 ;j < d ;j++){
                for(let k = 0 ;k < h ;k++){
                    let boxtran=new gd3d.framework.transform();
                    boxtran.name = `box_${i}_${j}_${k}`;
                    boxtran.localPosition.x= posOffset.x + i * size + gap;
                    boxtran.localPosition.z= posOffset.z + j * size + gap;
                    boxtran.localPosition.y= posOffset.y + k * size + gap;
                    this.scene.addChild(boxtran);
                    let mr = physics3dDemoTool.attachMesh(boxtran , mat_activated ,"cube");
                    boxList.push(mr);
                    this.mrs.push(mr);
                }
            }
        }

        //初始化 物理世界-----------------------
        this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0),new gd3d.framework.OimoJSPlugin());
        let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.PlaneImpostor, { mass: 0, restitution: 0.1 , friction: 0.9});
        boxList.forEach(box=>{
            new gd3d.framework.PhysicsImpostor(box.gameObject.transform, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.6 ,friction: 0.5 });
        });

        //apply Target set
        // this.targetTran = this.cylinderTran;
        
        //鼠标事件
        //this.iptMgr.addPointListener(gd3d.event.PointEventEnum.PointMove,this.onPonitMove,this);

        this.iptMgr.addKeyListener(gd3d.event.KeyEventEnum.KeyDown,this.keyDown,this);

        //GUI
        this.setGUI();
    }

    private guiMsg = "中心点爆炸 样例 ";
    setGUI(){
        if(!dat) return;
        let gui = new dat.GUI();
        gui.add(this, 'guiMsg');
        gui.add(this,"explodeFroce",1,100); //爆点 推力
        gui.add(this,"explodeRadius",0.1,10); //爆炸冲击半径
        //方法
        let folderFun = gui.addFolder("触发方法");
        folderFun.open();
        //folderFun.add(this, 'impulseTarget' );
        folderFun.add(this, 'doExplode' );
        folderFun.add(this, 'applyReset' );

    }

    private applyReset(){
        physics3dDemoTool.resetObj(this.mrs);
    }
    
    private enumArr : number[] = [];
    private optStrs: string[] = [];
    private freezeDic : {[opt:string]: boolean} = {};

    private impulseTarget(){
        if(!this.targetTran) return;
        this.doImpulse(this.targetTran.physicsImpostor);
    }

    private force = new gd3d.math.vector3(-10,0,5);
    private contactlocalPoint = new gd3d.math.vector3(0,0,0);
    private tempV3 = new gd3d.math.vector3();
    private doImpulse(phyImpostor : gd3d.framework.PhysicsImpostor){
        let pos = this.tempV3;
        gd3d.math.vec3Add(phyImpostor.object.getWorldPosition(),this.contactlocalPoint,pos);
        phyImpostor.applyImpulse(this.force, pos);
    }

    private doExplode(){
        this.explode(this.redSphere.localPosition);
    }

    delta= 0 ;
    movespeed = 10;
    /** 移动 ↑ ↓ ← → 7 4  ， 爆炸 0 */
    keyDown([keyCode]){
        switch(keyCode){
            case gd3d.event.KeyCode.ArrowUp: 
                this.redSphere.localPosition.y += this.delta * this.movespeed;
            break;
            case gd3d.event.KeyCode.ArrowDown: 
                this.redSphere.localPosition.y -= this.delta * this.movespeed;
            break;
            case gd3d.event.KeyCode.ArrowLeft: 
                this.redSphere.localPosition.x -= this.delta * this.movespeed;
            break;
            case gd3d.event.KeyCode.ArrowRight: 
                this.redSphere.localPosition.x += this.delta * this.movespeed;
            break;
            case gd3d.event.KeyCode.Numpad7: 
                this.redSphere.localPosition.z += this.delta * this.movespeed;
            break;
            case gd3d.event.KeyCode.Numpad4: 
                this.redSphere.localPosition.z -= this.delta * this.movespeed;
            break;
        }
        this.redSphere.localPosition = this.redSphere.localPosition;
    }

    private explodeFroce = 100; //爆炸冲击力
    private explodeRadius = 10; //爆炸冲击半径（线性衰减）
    /** 爆炸 */
    explode(point: gd3d.math.vector3){
        if(!point) return;
        this.boxList.forEach(box=>{
            if(box){
                gd3d.math.vec3Subtract(box.gameObject.transform.localPosition,point,helpv3);
                let len = gd3d.math.vec3Length(helpv3);
                gd3d.math.vec3Normalize(helpv3,helpv3);
                len = Math.min(len,this.explodeRadius);
                let rate = 1 - (len/ this.explodeRadius);
                if(rate > 0.00001){
                    let froce = rate * this.explodeFroce;  //承受的力
                    gd3d.math.vec3ScaleByNum(helpv3,froce,helpv3);
                    box.gameObject.transform.physicsImpostor.applyImpulse(helpv3,box.gameObject.transform.localPosition);
                }
            }
        });
    }

    private tcount = 0;
    private time = 0.5;
    update(delta: number) {
        this.tcount += delta;
        this.delta = delta;
        if(this.tcount > this.time){
            physics3dDemoTool.ckBodySleeped(this.mrs);
            this.tcount = 0;
        }

    }
}