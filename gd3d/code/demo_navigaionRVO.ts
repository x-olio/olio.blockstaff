//导航RVO_防挤Demo
declare var RVO;
class demo_navigaionRVO implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr:gd3d.framework.NavMeshLoadManager;
    inputMgr:gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize = 0.5;
    player:gd3d.framework.transform;
    static TestRVO: demo_navigaionRVO;

    rvoMgr: gd3d.framework.RVOManager = new gd3d.framework.RVOManager(); // RVO Manager


    start(app: gd3d.framework.application)
    {
        demo_navigaionRVO.TestRVO = this;
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        this.app.closeFps();
        //说明
        var descr = document.createElement("p");
        descr.textContent = `提示: \n 按住键盘 A 键，点击 navmesh 可添加敌人！`;
        descr.style.top = 0 + "px";
        descr.style.left = 0 + "px";
        descr.style.position = "absolute";
        this.app.container.appendChild(descr);

        let names: string[] = ["MainCity_","testnav","city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        let name = names[0];
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.loadScene(name);
            }
        });
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.far = 10000;
        objCam.localTranslate = new gd3d.math.vector3(0, 100,0);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();//标记为需要刷新
        CameraController.instance().init(this.app, this.camera);
        this.navmeshMgr = gd3d.framework.NavMeshLoadManager.Instance;



        // this.sim.processObstacles();
        this.addbtn("50px","打开 RVO",()=>{
            this.rvoMgr.enable();   // 打开 RVO
        })
        this.addbtn("100px","关闭 RVO",()=>{
            this.rvoMgr.disable();  // 关闭 RVO
        })
        this.addbtn("150px","删除元素",()=>{
        })
    }

    private isInitPlayer = false;
    private initPlayer(x,y,z){
        if(this.isInitPlayer) return;
        this.player = this.generateGeomtry("cylinder" , new gd3d.math.vector4(0,1,0.2,1));
        this.player.localTranslate.x=x;
        this.player.localTranslate.y=y;
        this.player.localTranslate.z=z;
        this.player.localScale.x = this.player.localScale.z = 2;
        this.player.markDirty();
        this.isInitPlayer = true;

        // Add agent
        this.rvoMgr.addAgent(Math.round(Math.random() * 100), this.player, 1, 0, 0.2);  // 添加玩家

        // this.mods = this.rvoMgr.transforms;
        // this.goals = this.rvoMgr.goals;
        // this.sim.addAgent([x, z]);
        // this.sim.agents[0].radius = 1;
        // this.sim.agents[0].neighborDist = 0;    // 玩家不会被小怪挤
        // this.sim.agents[0].maxSpeed = 0.2;
        // this.sim.agents[0].timeHorizon = 5;
        // this.sim.agents[0].timeHorizonObst = 20;
        // this.mods.push(this.player);
        // this.goals.push([x, z]);
    }

    private loadScene(assetName:string , isCompress = false){
        let addScene = ()=>{
            let beAddScene = false;
            if(beAddScene){
                var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(assetName + ".scene.json") as gd3d.framework.rawscene;
                var _root = _scene.getSceneRoot();
                _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
                _root.markDirty();
                this.app.getScene().lightmaps = [];
                _scene.useLightMap(this.app.getScene());
                // _scene.useFog(this.app.getScene());
                this.scene.addChild(_root);
            }

            this.navmeshMgr.loadNavMesh(`res/navmesh/${assetName}.nav.json`,this.app,(s)=>{
                if(s.iserror){
                    console.error(` ${s.errs} `);
                    return;
                }
                console.error(`scene navmesh : ${assetName}  is loaded`);
                let mtr = new gd3d.framework.material("navmesh_mtr");
                let ass = this.app.getAssetMgr();
                let sdr = ass.getShader("diffuse.shader.json");
                mtr.setShader(sdr);
                this.navmeshMgr.showNavmesh(true,mtr);
                console.error(this.navmeshMgr.navMesh);

                let cc = false;
                if(cc) return;
            });
        }

        if(isCompress){
            this.app.getAssetMgr().loadCompressBundle(`res/scenes/${assetName}/${assetName}.packs.txt`,(s) =>
            {
                 if(s.isfinish){
                     //if (s.bundleLoadState & gd3d.framework.AssetBundleLoadState.Scene && !isloaded)
                     {
                         addScene();
                     }
                 }
                });
        }else{
            this.app.getAssetMgr().load(`res/scenes/${assetName}/${assetName}.assetbundle.json`,gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                if(s1.isfinish)
                {
                    addScene();
                }
            });
        }
    }

    //----------- player 移动控制 ----------------
    // private moveSpeed = 0.2;

    // private cal2dDir(oPos:gd3d.math.vector3,tPos:gd3d.math.vector3,out:gd3d.math.vector2){
    //     if(!oPos || !tPos || !out)  return;
    //     let ov2 = gd3d.math.pool.new_vector2();
    //     ov2.x = oPos.x; ov2.y = oPos.z;
    //     let tv2 = gd3d.math.pool.new_vector2();
    //     tv2.x = tPos.x; tv2.y = tPos.z;
    //     gd3d.math.vec2Subtract(tv2,ov2,out);
    //     gd3d.math.pool.delete_vector2(ov2);
    //     gd3d.math.pool.delete_vector2(tv2);
    // }

    // private currGoal:gd3d.math.vector3;
    // private lastGoal:gd3d.math.vector3;
    private Goals:gd3d.math.vector3[] = [];


    //----------- 点击navmesh处理 ----------------

    private PosRayNavmesh(oPos:gd3d.math.vector3){
        if(!this.navmeshMgr.navMesh || !this.navmeshMgr.navTrans) return;
        var pickinfo = new gd3d.framework.pickinfo();
        let mesh = this.navmeshMgr.navMesh ;
        let ray = new gd3d.framework.ray(new gd3d.math.vector3(oPos.x, oPos.y + 500, oPos.z), new gd3d.math.vector3(0, -1, 0));
        let bool = mesh.intersects(ray, this.navmeshMgr.navTrans.getWorldMatrix(),pickinfo);
        if (!bool) return;
        return pickinfo.hitposition;
    }

    pickDown():void{
        if(this.isAKeyDown){
            //添加 敌人
            this.addEnemy();
        }else{
            //player寻路
            this.tryFindingPath();
        }
    }
    private rayNavMesh():gd3d.math.vector3{
        let navTrans = this.navmeshMgr.navTrans;
        let navmesh = this.navmeshMgr.navMesh;
        if (navmesh == null) return;
        let inputMgr = this.app.getInputMgr();
        let ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        let pickinfo = new gd3d.framework.pickinfo();
        let bool = navmesh.intersects(ray, navTrans.getWorldMatrix(),pickinfo);
        if (!bool) return;
        //console.error(pickinfo.hitposition);
        return pickinfo.hitposition;
    }

    private enemys:gd3d.framework.transform[] = [];
    private addEnemy(){
        let endPos = this.rayNavMesh();
        if(!endPos) return;
        let trans = this.generateGeomtry("cylinder" , new gd3d.math.vector4(1,0,0,1));
        if(!trans) return;
        this.enemys.push(trans);
        this.scene.addChild(trans);
        trans.localTranslate.x = endPos.x;
        trans.localTranslate.y = endPos.y;
        trans.localTranslate.z = endPos.z;
        trans.markDirty();
        // Add agent
        this.rvoMgr.addAgent(Math.round(Math.random() * 100), trans, 0.5, 3, 0.05); // 添加小怪
        // this.sim.addAgent([endPos.x, endPos.z]);
        // this.goals.push([endPos.x, endPos.z]);
        // this.mods.push(trans);
    }

    private pos = [];
    private tryFindingPath(){
        let endPos = this.rayNavMesh();
        if(!endPos) return;
        if(this.player){
            let v3 = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(this.player.localTranslate,v3);
            let temp = this.PosRayNavmesh(this.player.localTranslate);
            if(temp){
                gd3d.math.vec3Clone(temp,v3);
            }
            this.pos.push(v3);
        }else{
            //初始化玩家
            if(!this.isInitPlayer) this.initPlayer(endPos.x,endPos.y,endPos.z);
        }
        this.pos.push(endPos);
        // let points = this.navMeshLoader.moveToPoints(startPos, endPos);
        if (this.pos.length > 1){
            let arr = this.navmeshMgr.moveToPoints(this.pos.pop(), this.pos.pop());
            if(!arr) return;
            this.pos.length = 0;
            let color = new gd3d.math.color(1,0,0,0.5);
            this.createAllPoint(arr.length);
            for(var i= 0;i<arr.length ;i++){
                let p = arr[i];
                this.setRoadPoint(i,p.x,p.y,p.z,color);
            }
            this.drawLine(arr);
            if(this.Goals){
                this.Goals.forEach(g=>{
                    if(g)gd3d.math.pool.delete_vector3(g);
                });
            }
            // this.Goals.length = 0;
            // this.Goals = arr;
            // this.rvoMgr.currGoal = this.Goals.pop(); // 初始化玩家当前目标点
            this.rvoMgr.setRoadPoints(arr);
        }
    }

    //----------- 绘制路径线段----------------
    private lastLine:gd3d.framework.transform;
    private drawLine(points:gd3d.math.vector3[]){
        if(this.lastLine){
            this.lastLine.gameObject.visible = false;
            this.lastLine.markDirty();
            if(this.lastLine.parent)
                this.lastLine.parent.removeChild(this.lastLine);
            this.lastLine.dispose();
        }
        let mesh = this.genLineMesh(points);
        this.lastLine =new gd3d.framework.transform();
        let mf = this.lastLine.gameObject.addComponent(`meshFilter`) as gd3d.framework.meshFilter;
        mf.mesh = mesh;
        mesh.glMesh.lineMode = WebGLRenderingContext.LINE_STRIP;
        this.lastLine.gameObject.addComponent(`meshRenderer`) as gd3d.framework.meshRenderer;
        this.lastLine.localTranslate.x =this.lastLine.localTranslate.y =this.lastLine.localTranslate.z = 0;
        this.scene.addChild(this.lastLine);
        this.lastLine.markDirty();
    }

    private genLineMesh(points:gd3d.math.vector3[]){
        var meshD = new gd3d.render.meshData();
        meshD.pos = [];
        meshD.color = [];
        meshD.trisindex = [];
        for(var i=0 ; i < points.length ; i++){
            let pos = points[i];
            meshD.pos.push(new gd3d.math.vector3(pos.x, pos.y+(this.cubesize /2), pos.z));
            meshD.trisindex.push(i);
            meshD.color.push(new gd3d.math.color(1,0,0,1));
        }

        var _mesh = new gd3d.framework.mesh();
        _mesh.data = meshD;
        var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Color;
        var v32 = _mesh.data.genVertexDataArray(vf);
        var i16 = _mesh.data.genIndexDataArray();

        _mesh.glMesh = new gd3d.render.glMesh();
        _mesh.glMesh.initBuffer(this.app.webgl, vf, _mesh.data.pos.length);
        _mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);

        _mesh.glMesh.addIndex(this.app.webgl, i16.length);
        _mesh.glMesh.uploadIndexSubData(this.app.webgl, 0, i16);
        _mesh.submesh = [];
        {
            var sm = new gd3d.framework.subMeshInfo();
            sm.matIndex = 0;
            sm.useVertexIndex = 0;
            sm.start = 0;
            sm.size = i16.length;
            sm.line = true;
            _mesh.submesh.push(sm);
        }
        return _mesh;
    }

    private createAllPoint(count:number){
        this.points.forEach(element => {
            if(element) element.gameObject.visible = false;
        });

        let need =count - this.points.length;
        if(need > 0) {
            for(var i=0;i<need ;i++){
                let G3D = this.generateGeomtry("cube",new gd3d.math.vector4(0,0,1,1));
                this.points.push(G3D);
                G3D.localScale.x = G3D.localScale.y = G3D.localScale.z = this.cubesize;
            }
        }
    }

    private setRoadPoint(index,x,y,z,color:gd3d.math.color){
        let cube = this.points[index];
        cube.localTranslate.x = x;
        cube.localTranslate.y = y;
        cube.localTranslate.z = z;
        cube.markDirty();
        let mf = cube.gameObject.getComponent(`meshFilter`) as gd3d.framework.meshFilter;
        if(mf.mesh.data.color == null)  mf.mesh.data.color = [];
        mf.mesh.data.color.forEach(c=>{
            if(c) {
                c.r = color.r;c.g = color.g;c.b = color.b; c.a = color.a;
            }
        });
        let vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal| gd3d.render.VertexFormatMask.Tangent | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0;
        let v32 = mf.mesh.data.genVertexDataArray(vf);
        mf.mesh.glMesh.uploadVertexSubData(this.app.webgl, v32);
        cube.gameObject.visible = true;
    }

    private points: gd3d.framework.transform[] = [];
    private generateGeomtry(meshType:string = "cube",color:gd3d.math.vector4 = null){
        let G3D = new gd3d.framework.transform;
        let mf = G3D.gameObject.addComponent(`meshFilter`) as gd3d.framework.meshFilter;
        mf.mesh = (this.assetMgr.getDefaultMesh(meshType) as gd3d.framework.mesh);
        let mr = G3D.gameObject.addComponent(`meshRenderer`) as gd3d.framework.meshRenderer;
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material(`mat`);
        //mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        mr.materials[0].setShader(this.assetMgr.getShader("diffuse.shader.json"));
        mr.materials[0].setTexture("_MainTex",this.assetMgr.getDefaultTexture("white"));
        if(color)
            mr.materials[0].setVector4("_MainColor",color);
        this.scene.addChild(G3D);
        return G3D;
    }

    baihu:gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    bere: boolean = false;
    isAKeyDown = false;
    private pointDown = false;
    update(delta: number)
    {

        if (this.pointDown == false && this.inputMgr.point.touch == true)//pointdown
        {
            this.pickDown();
        }
        this.pointDown = this.inputMgr.point.touch;
        if(this.inputMgr.GetKeyDown(65)){
            this.isAKeyDown = true;
        }else{
            this.isAKeyDown = false;
        }

        this.timer += delta;
        CameraController.instance().update(delta);

        this.rvoMgr.update(); // 更新 Transform
    }

    private addbtn(topOffset:string,textContent:string,func:()=>void)
    {
        var btn = document.createElement("button");
        btn.style.top = topOffset;
        btn.style.position = "fixed";
        btn.style.border = "none";
        btn.style.height = "32px";
        btn.style.borderRadius = "16px";
        btn.style.cursor = "pointer";
        btn.style.margin = "32px";
        btn.style.minWidth = "80px";


        this.app.container.appendChild(btn);

        btn.textContent = textContent;
        btn.onclick = () =>
        {
            this.camera.postQueues = [];
            func();
            console.log("Handle Clicking..."+textContent);
        }
    }

}