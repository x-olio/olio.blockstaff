namespace gd3d.framework {
    export class NavMeshLoadManager {
    private static _instance: NavMeshLoadManager;

    /**
    *  navMesh偏移量,为方便地图与NavMesh重合设置的临时变量
    */
    private navMeshVertexOffset: gd3d.math.vector3 = new gd3d.math.vector3(0, 0, 0);

    /**
    *场景中的寻路Mesh
    */
    public navMesh: gd3d.framework.mesh;
    private app: gd3d.framework.application;
    public navigate: gd3d.framework.Navigate;
    public navTrans: gd3d.framework.transform;
    /**
     * 导航网格Json数据
     */
    public get navmeshJson(){return this._navmeshJson;}
    private _navmeshJson:string = "";

    /**
    * 加载NavMesh
    * @param navMeshUrl 要加载的navMesh完整路径
    * @param app
    * @param onstate 加载反馈信息
    */
    public loadNavMesh(navMeshUrl: string, app: gd3d.framework.application, onstate?:(state:stateLoad)=>void) {
        if (!app) return;
        this.app = app;
        if (this.navTrans)
            this.navTrans.parent.removeChild(this.navTrans);

        app.getAssetMgr().load(navMeshUrl, gd3d.framework.AssetTypeEnum.Auto, (s)=>{            
            if (s.isfinish){
                let data: gd3d.framework.textasset = app.getAssetMgr().getAssetByName(navMeshUrl.substring(navMeshUrl.lastIndexOf("/")+1)) as gd3d.framework.textasset;
                this.navmeshLoaded(data.content, ()=>{
                    if(onstate){
                        onstate(s);
                    }                   
                });                
            }else if (s.iserror){
                if(onstate){
                    onstate(s);
                }
            }            
        });
    }

    /**
    * 通过数据 装载NavMesh
    * @param dataStr navmesh 的字符串数据
    * @param callback 完成回调
    */
    public loadNavMeshByDate(dataStr:string, app: gd3d.framework.application,callback:()=>any){
        if(!app) return;
        this.app = app;
        this.navmeshLoaded(dataStr,callback);
    }

    /**
     * 地图寻路网格加载完成
     * @param dataStr 寻路网格信息
     */
    private navmeshLoaded(dataStr: string, callback:any) {
        console.warn("navmeshLoaded");
        if(dataStr == null || dataStr == "")    return;
        this._navmeshJson = dataStr;
        if (this.navTrans != null) {
            // CScene.Instance.removePICKEvent();
            if(this.navTrans.parent)
                this.navTrans.parent.removeChild(this.navTrans);
            this.navTrans.dispose();
        }
        this.navTrans = new gd3d.framework.transform();
        this.navTrans.name = "navMesh";
        let HF = gd3d.framework.HideFlags;
        this.navTrans.gameObject.hideFlags = HF.HideInHierarchy | HF.DontSave | HF.NotEditable; //不保存不展示不编辑
        var meshD = new gd3d.render.meshData();
        meshD.pos = [];
        meshD.trisindex = [];

        var navinfo = gd3d.framework.navMeshInfo.LoadMeshInfo(dataStr);
        //var vertexArray: number[] = [];

        for (var i = 0; i < navinfo.vecs.length; i++) {
            var v = navinfo.vecs[i];
            let X = v.x - this.navMeshVertexOffset.x;
            let Y = v.y - this.navMeshVertexOffset.y;
            let Z = v.z - this.navMeshVertexOffset.z;
            meshD.pos[i] = new gd3d.math.vector3(X, Y, Z);
        }

        var navindexmap = {};
        let indexDatas: number[] = [];
        for (var i = 0; i < navinfo.nodes.length; i++) {
            var poly = navinfo.nodes[i].poly;
            for (var fc = 0; fc < poly.length - 2; fc++) {
                var sindex = indexDatas.length / 3;
                navindexmap[sindex] = i;//做一个三角形序号映射表
                /**
                *此处处理顶点索引时按照画面的模式来的，即不需要重复的顶点，如果要在图上画出正确的线框，就用画线框的模式，即需要重复的顶点。
                其实无论哪种模式，只要跟webgl的api对应上就好。
                */
                indexDatas.push(poly[0]);
                indexDatas.push(poly[fc + 2]);
                indexDatas.push(poly[fc + 1]);
            }
        }
        meshD.trisindex = indexDatas;

        let meshFiter = this.navTrans.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        this.navMesh = this.createMesh(meshD, this.app.webgl);
        meshFiter.mesh = this.navMesh;
        // let meshR = this.navTrans.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        // meshR.materials[0] = new gd3d.framework.material();
        // meshR.materials[0].setShader(this.app.getAssetMgr().getShader("shader/def"));

        this.app.getScene().addChild(this.navTrans);
        this.navTrans.markDirty();
        this.navigate = new gd3d.framework.Navigate(navinfo, navindexmap);
        callback();
    }

    //构建mesh 并返回
    private createMesh(meshData: gd3d.render.meshData, webgl: WebGLRenderingContext): gd3d.framework.mesh {
        var _mesh = new gd3d.framework.mesh();
        // _mesh.setName("NavMesh" + ".mesh.bin");
        _mesh.data = meshData;
        var vf = gd3d.render.VertexFormatMask.Position;
        var v32 = _mesh.data.genVertexDataArray(vf);
        var i16 = _mesh.data.genIndexDataArray();

        _mesh.glMesh = new gd3d.render.glMesh();
        _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
        _mesh.glMesh.uploadVertexSubData(webgl, v32);

        _mesh.glMesh.addIndex(webgl, i16.length);
        _mesh.glMesh.uploadIndexSubData(webgl, 0, i16);
        _mesh.submesh = [];

        {
            var sm = new gd3d.framework.subMeshInfo();
            sm.matIndex = 0;
            sm.useVertexIndex = 0;
            sm.start = 0;
            sm.size = i16.length;
            sm.line = false;
            _mesh.submesh.push(sm);
        }
        return _mesh;
    }

    public showNavmesh(isshow: boolean , material:gd3d.framework.material = null) {
        if (this.navTrans) {
            this.navTrans.gameObject.visible = isshow;
            if (!isshow) {
                this.navTrans.localTranslate = new gd3d.math.vector3(0, 0, 0)
                this.navTrans.markDirty();
                return;
            }

            let compent: gd3d.framework.meshRenderer = this.navTrans.gameObject.getComponent("meshRenderer") as gd3d.framework.meshRenderer;
            if (compent == null){
                compent = this.navTrans.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                if(material){
                    compent.materials = [];
                    compent.materials[0] = material;
                }
            }

            this.navTrans.localTranslate = new gd3d.math.vector3(0, 0, 0)
            this.navTrans.markDirty();
        }
    }

    public dispose() {
        if (this.navTrans) {
            this.navTrans.parent.removeChild(this.navTrans);
            this.navTrans.dispose();
            this.navTrans = null;
            this.navMesh.dispose();
            this.navMesh = null;
            this.navigate.dispose();
            this.navigate = null;
        }
    }

    public static get Instance(): NavMeshLoadManager {
        if (NavMeshLoadManager._instance == null)
            NavMeshLoadManager._instance = new NavMeshLoadManager();
        return NavMeshLoadManager._instance;
    }

    public moveToPoints(startPos: gd3d.math.vector3, endPos: gd3d.math.vector3): Array<gd3d.math.vector3> {
        
        let navTrans = NavMeshLoadManager.Instance.navTrans;
        let nav = NavMeshLoadManager.Instance.navigate;
        if (!nav) return;
        let StratIndex = NavMeshLoadManager.findtriIndex(startPos, navTrans);
        if (StratIndex == undefined) {
            let dir = new gd3d.math.vector3();
            let direc: gd3d.math.vector3 = new gd3d.math.vector3();
            gd3d.math.vec3Subtract(endPos, startPos, dir);
            gd3d.math.vec3Normalize(dir, dir);
            for (let i = 0; i < 5; i++) {
                gd3d.math.vec3Clone(dir, direc);
                gd3d.math.vec3ScaleByNum(direc, (i + 1) * 2, direc);
                let pos = new gd3d.math.vector3();
                gd3d.math.vec3Add(startPos, direc, pos);
                StratIndex = NavMeshLoadManager.findtriIndex(pos, navTrans);
                if (StratIndex != undefined) break;
            }
        }
        let endIndex = NavMeshLoadManager.findtriIndex(endPos, navTrans);
        let points = nav.pathPoints(startPos, endPos, StratIndex, endIndex);
        return points;
    }

    /** 获取指定位置的三角形索引*/
    public static findtriIndex(point: gd3d.math.vector3, trans: gd3d.framework.transform): number {
        let result = -1;
        var ray = new gd3d.framework.ray(new gd3d.math.vector3(point.x, point.y + 500, point.z), new gd3d.math.vector3(0, -1, 0));
        var mesh: gd3d.framework.mesh;
        var meshFilter = trans.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
        if (meshFilter != null) {
            //3d normal mesh
            mesh = meshFilter.getMeshOutput();
        }
        if (!mesh) return;
        var tempInfo = math.pool.new_pickInfo();
        if (mesh.intersects(ray, trans.getWorldMatrix(),tempInfo))
            result = tempInfo.faceId;
        math.pool.delete_pickInfo(tempInfo);
        return result;
        }
    }

    
}