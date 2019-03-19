declare var RVO;

class test_Rvo2 implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    inputMgr:gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    sim = new RVO.Simulator(1, 10, 5, 10, 10, 1, 0.2, [0, 0]);
    goals = [];
    size = 0.5;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.far = 1000;
        objCam.localTranslate = new gd3d.math.vector3(0, 150, 0);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();//标记为需要刷新
        CameraController.instance().init(this.app, this.camera);

        this.init();
    }

    spheres:gd3d.framework.transform[] = [];
    init(){
        //加球
        let sphere = new gd3d.framework.transform;
        sphere.localTranslate.x =sphere.localTranslate.y =sphere.localTranslate.z = 0;
        let mf = sphere.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        mf.mesh = this.assetMgr.getDefaultMesh("sphere") as gd3d.framework.mesh;
        let mr = sphere.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material("sphere");
        mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        let count = 50;
        let radius = 55;
        let tempdir = gd3d.math.pool.new_vector3();
        for(var i=0; i< count ;i++){
            gd3d.math.vec3Set_One(tempdir);
            let rate = i/count;
            tempdir.x = Math.sin(rate*2*Math.PI);
            tempdir.z = Math.cos(rate*2*Math.PI);
            gd3d.math.vec3Normalize(tempdir,tempdir);
            let temps = sphere.clone();
            this.scene.addChild(temps);
            gd3d.math.vec3ScaleByNum(tempdir,radius,tempdir);
            gd3d.math.vec3Clone(tempdir,temps.localTranslate);
            temps.markDirty();
            this.spheres.push(temps);
            this.sim.addAgent([temps.localTranslate.x,temps.localTranslate.z]);    // 添加 Agent
            this.goals.push([-temps.localTranslate.x, -temps.localTranslate.z]); // 保存对应的目标

        }
        let c = 0;  // 障碍物位置
        this.sim.addObstacle([
            [5+c, -5+c],
            [5+c, 5+c],
            [-5+c, 5+c],
            [-5+c, -5+c]
        ]);
        this.sim.processObstacles();

    }

    camera:gd3d.framework.camera;
    update(delta: number)
    {
        CameraController.instance().update(delta);


        if (this.reachedGoals(this.sim, this.goals)) { // 如果所有小球都到达目标点
          console.error("sim end ");
        }
        else {                                  // 如果有小球没有到达目标点
          this.updateVisualization(this.sim);             // 刷新屏幕
          this.setPreferredVelocities(this.sim, this.goals);   // 给所有小球分配新的速度
          this.sim.doStep(); //走一步
        }
    }
    reachedGoals(sim, goals) {
        for (var i = 0, len = sim.agents.length; i < len; i ++) {
            if (RVO.Vector.absSq(RVO.Vector.subtract(sim.agents[i].position, goals[i])) > 1) {
                  return false;
            }
        }
        return true;
    }
    setPreferredVelocities(sim, goals) {
        for (var i = 0, len = sim.agents.length; i < len; i ++) {
        // 据当前目标重新获取目标方向向量
        var goalVector = RVO.Vector.subtract(goals[i], sim.agents[i].position);
        if (RVO.Vector.absSq(goalVector) > 1) {
            goalVector = RVO.Vector.normalize(goalVector);
        }
            sim.agents[i].prefVelocity = goalVector; // 更新
        }
    }
    updateVisualization (sim){
        for(var i = 0 ; i<this.spheres.length; i++){
            this.spheres[i].localTranslate.x = sim.agents[i].position[0];
            this.spheres[i].localTranslate.z = sim.agents[i].position[1];
            this.spheres[i].markDirty();
        }

    }
}





