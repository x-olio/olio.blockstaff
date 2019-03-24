//导航RVO_防挤Demo
declare var RVO;
/** 射线碰撞 碰撞体 */
class test_pick_boxcollider implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr:gd3d.framework.NavMeshLoadManager;
    inputMgr:gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize = 0.5;
    player:gd3d.framework.transform;
    sim = new RVO.Simulator(1, 40, 10, 20, 5, 0.5, 0.05, [0, 0]);
    goals = [];
    mods:gd3d.framework.transform[] = [];
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();
        this.app.closeFps();
        //说明
        var descr = document.createElement("p");
        descr.textContent = `提示: \n 点击碰撞框 可发射小球到碰撞位置！`;
        descr.style.top = 0 + "px";
        descr.style.left = 0 + "px";
        descr.style.position = "absolute";
        this.app.container.appendChild(descr);

        let names: string[] = ["MainCity_","testnav","city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
        let name = names[1];
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
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
    }
    private loadScene(assetName:string , isCompress = false){
        let ShowBoxcollder = (trans:gd3d.framework.transform) =>{
            if(!trans) return;
            let boxc = trans.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
            if(boxc)    boxc.colliderVisible = true;
            //test
            let meshC = trans.gameObject.getComponent("meshcollider") as gd3d.framework.meshcollider;
            if(meshC){
                meshC.colliderVisible = true;
            } 

            console.error(` layer : ${trans.gameObject.layer} `);
            if(!trans.children)return;
            trans.children.forEach(sub =>{
                if(sub)   ShowBoxcollder(sub);
            });
        }

        let addScene = ()=>{
            let beAddScene = true;
            if(beAddScene){
                var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(assetName + ".scene.json") as gd3d.framework.rawscene;
                var _root = _scene.getSceneRoot();
                _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
                _root.markDirty();
                this.app.getScene().lightmaps = [];
                _scene.useLightMap(this.app.getScene());
                // _scene.useFog(this.app.getScene());
                this.scene.addChild(_root);
                ShowBoxcollder(_root);
            }
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

    private colorMap :{[key:string]:gd3d.math.vector4} = {};
    private getColor(r,g,b){
        let key = `${r}_${g}_${b}`;
        if(!this.colorMap[key]) this.colorMap[key] = new gd3d.math.vector4(r,g,b,1);
        return this.colorMap[key];
    }

    private balls=[];
    private addBall(pos:gd3d.math.vector3){
        let ball= this.generateGeomtry("sphere",this.getColor(1,0,0));
        gd3d.math.vec3Clone(pos,ball.localTranslate);
        this.scene.addChild(ball);
        this.balls.push(ball);
        ball.markDirty();
    }

    private pickLayer = 8;
    pickDown():void{
        let v3  =  this.rayCollider();
        if(v3){
            this.addBall(v3.hitposition);
        }
    }
    private rayCollider( ):gd3d.framework.pickinfo{
        let inputMgr = this.app.getInputMgr();
        let ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        let temp  = gd3d.math.pool.new_pickInfo();
        //let bool = this.scene.pick(ray,temp,false,this.scene.getRoot(),this.pickLayer);
        let bool = this.scene.pick(ray,temp,false);
        return bool? temp: null;
    }
    //----------- 绘制路径线段----------------
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

    camera: gd3d.framework.camera;
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
    }
}