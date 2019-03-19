class test_navMesh implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr:gd3d.framework.NavMeshLoadManager;
    inputMgr:gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize = 0.5;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.inputMgr = this.app.getInputMgr();
        this.assetMgr = app.getAssetMgr();

        let names: string[] = ["MainCity_","city", "1042_pata_shenyuan_01", "1030_huodongchuangguan", "xinshoucun_fuben_day", "chuangjue-01"];
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
        objCam.localTranslate = new gd3d.math.vector3(-20, 50, -20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 100));
        objCam.markDirty();//标记为需要刷新
        CameraController.instance().init(this.app, this.camera);
        this.navmeshMgr = gd3d.framework.NavMeshLoadManager.Instance;
    }

    loadScene(assetName:string , isCompress = false){

        let addScene = ()=>{
            var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(assetName + ".scene.json") as gd3d.framework.rawscene;
            var _root = _scene.getSceneRoot();
            this.scene.addChild(_root);
            // _root.localTranslate = new gd3d.math.vector3(-60, -30, 26.23);
            _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
            _root.markDirty();
            this.app.getScene().lightmaps = [];
            _scene.useLightMap(this.app.getScene());
            _scene.useFog(this.app.getScene());

            this.navmeshMgr.loadNavMesh(`res/navmesh/${assetName}.nav.json`,this.app,(s)=>{
                if(s.iserror){
                    console.error(` ${s.errs} `);
                    return;
                }
                console.error(`scene navmesh : ${assetName}  is loaded`);
                //this.navmeshMgr.showNavmesh(true);
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

    private pos = [];
    pickDown():void{
        let navTrans = this.navmeshMgr.navTrans;
        let navmesh = this.navmeshMgr.navMesh;
        if (navmesh == null) return;
        let inputMgr = this.app.getInputMgr();
        let ray = this.camera.creatRayByScreen(new gd3d.math.vector2(inputMgr.point.x, inputMgr.point.y), this.app);
        let pickinfo = new gd3d.framework.pickinfo(); 
        let bool = navmesh.intersects(ray, navTrans.getWorldMatrix(),pickinfo);
        if (!bool) return;
        // let startPos = gd3d.math.pool.new_vector3();
        // gd3d.math.vec3Clone(this.cube.localTranslate, startPos);
        let endPos = pickinfo.hitposition;
        console.error(endPos);
        this.pos.push(endPos);
        // let points = this.navMeshLoader.moveToPoints(startPos, endPos);
        if (this.pos.length > 1){
            let arr = this.navmeshMgr.moveToPoints(this.pos.pop(), this.pos.pop());
            console.error(arr);
            this.pos.length = 0;
            let color = new gd3d.math.color(1,0,0,0.5);
            this.createAllPoint(arr.length);
            for(var i= 0;i<arr.length ;i++){
                let p = arr[i];
                this.setPoint(i,p.x,p.y,p.z,color);
            }
            this.drawLine(arr);
        }
    }

    private lastLine:gd3d.framework.transform;
    private drawLine(points:gd3d.math.vector3[]){
        if(this.lastLine){
            this.lastLine.gameObject.visible = false;
            this.lastLine.markDirty();
            if(this.lastLine.parent)
                this.lastLine.parent.removeChild(this.lastLine);
            this.lastLine.dispose();
        }
        let mesh = this.genMesh(points);
        this.lastLine =new gd3d.framework.transform();
        let mf = this.lastLine.gameObject.addComponent(`meshFilter`) as gd3d.framework.meshFilter;
        mf.mesh = mesh;
        mesh.glMesh.lineMode = WebGLRenderingContext.LINE_STRIP;
        this.lastLine.gameObject.addComponent(`meshRenderer`) as gd3d.framework.meshRenderer;
        this.lastLine.localTranslate.x =this.lastLine.localTranslate.y =this.lastLine.localTranslate.z = 0;
        this.scene.addChild(this.lastLine);
        this.lastLine.markDirty();
    }
    
    private genMesh(points:gd3d.math.vector3[]){
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
                this.generatePoint();
            }
        }
    }

    private setPoint(index,x,y,z,color:gd3d.math.color){
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
    private generatePoint(){
        let cube = new gd3d.framework.transform;
        let mf = cube.gameObject.addComponent(`meshFilter`) as gd3d.framework.meshFilter;
        mf.mesh = (this.assetMgr.getDefaultMesh("cube") as gd3d.framework.mesh).clone();
        let mr = cube.gameObject.addComponent(`meshRenderer`) as gd3d.framework.meshRenderer;
        mr.materials = [];
        mr.materials[0] = new gd3d.framework.material(`mat`);
        mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        mr.materials[0].setTexture("_MainTex",this.assetMgr.getDefaultTexture("white"));
        this.points.push(cube);
        this.scene.addChild(cube);
        cube.localScale.x = cube.localScale.y = cube.localScale.z = this.cubesize;
    }

    baihu:gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    bere: boolean = false;
    private pointDown = false;
    update(delta: number)
    {

        if (this.pointDown == false && this.inputMgr.point.touch == true)//pointdown
        {
            // var ray = this.camera.creatRayByScreen(new gd3d.math.vector2(this.inputMgr.point.x, this.inputMgr.point.y), this.app);
            // var pickinfo = this.scene.pick(ray);
            // if (pickinfo != null)
            // {
                
            //     this.movetarget = pickinfo.hitposition;
            //     console.log(this.movetarget);
            //     this.timer = 0;
            // }
            this.pickDown();
        }
        this.pointDown = this.inputMgr.point.touch;

        this.timer += delta;
        CameraController.instance().update(delta);
        // var x = Math.sin(this.timer);
        // var z = Math.cos(this.timer);
        // var x2 = Math.sin(this.timer * 0.5);
        // var z2 = Math.cos(this.timer * 0.5);
        // var objCam = this.camera.gameObject.transform;
        // objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 30, z2 * 10);
        // objCam.markDirty();//标记为需要刷新

    }
}