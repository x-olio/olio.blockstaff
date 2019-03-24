
/** 3d物理 demo 工具 */
class physics3dDemoTool{
    static app : gd3d.framework.application;
    static scene: gd3d.framework.scene;
    static camera: gd3d.framework.camera;
    static astMgr : gd3d.framework.assetMgr;
    static iptMgr : gd3d.framework.inputMgr;
    static mats : {[name:string] : gd3d.framework.material} = {};

    static async init(app:gd3d.framework.application){
        this.app = app;
        this.scene = this.app.getScene();
        this.astMgr = this.app.getAssetMgr();
        this.iptMgr = this.app.getInputMgr();
        await this.loadbySync(`./res/shader/shader.assetbundle.json`);
        await datGui.init();
        this.initMats();
        this.initCamera();
    }

    static loadbySync(url:string){
        return new gd3d.threading.gdPromise<any>((resolve,reject)=>{
            this.astMgr.load(url,gd3d.framework.AssetTypeEnum.Auto,(state)=>{
                if(state && state.isfinish){
                    resolve();
                }
            });
        });
    }

    private static initMats(){
        //地板
        this.addMat("white",new gd3d.math.vector4(1,1,1,1));

        this.addMat("uvTest",new gd3d.math.vector4(1,1,1,1));
        //激活状态
        this.addMat("activated",new gd3d.math.vector4(0.51,0.39,0.96,1));
        //yellow
        this.addMat("yellow",new gd3d.math.vector4(0.8,0.8,0,1));
        //休眠状态
        this.addMat("sleeping",new gd3d.math.vector4(0.4,0.4,0.4,1));
        //purple
        this.addMat("purple",new gd3d.math.vector4(0.8,0,0.8,1));
    }

    private static initCamera(){
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

    private static addMat(name: string, color:gd3d.math.vector4 ){
        let mat = this.mats[name] = new gd3d.framework.material(name);
        mat.setShader(this.astMgr.getShader("diffuse.shader.json"));
        mat.setVector4("_MainColor", color );
        if(name == "uvTest"){
            //
            let url = `./res/uvTest.jpg`;
            this.astMgr.load(url,gd3d.framework.AssetTypeEnum.Texture,(sta)=>{
                if(sta.isfinish){
                    let t = this.astMgr.getAssetByName("uvTest.jpg") as gd3d.framework.texture;
                    mat.setTexture("_MainTex",t);
                }
            });
        }
    }

    private static tag_isCompound = "__isCompound";
    private static tag_pos = "__reCachePos";
    private static tag_Rot = "__reCacheRot";
    private static tag_resFun = "__reCacheResFun";
    static attachMesh(tran:gd3d.framework.transform, mat: gd3d.framework.material, meshName : string , isCompound = false) : gd3d.framework.meshRenderer{
        let mf = tran.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
        if(!mf) mf = tran.gameObject.addComponent("meshFilter") as any;
        let mr=tran.gameObject.getComponent("meshRenderer") as gd3d.framework.meshRenderer;
        if(!mr) mr = tran.gameObject.addComponent("meshRenderer") as any ;
        mr.materials[0] = mat;
        mf.mesh=this.astMgr.getDefaultMesh(meshName);

        if(isCompound && tran.parent){
            tran = tran.parent;
            tran[this.tag_isCompound] = true;
        }
        if(tran[this.tag_resFun]) return;

        //RT cache
        tran[this.tag_pos] = gd3d.math.pool.clone_vector3(tran.getWorldPosition());
        tran[this.tag_Rot] = gd3d.math.pool.clone_quaternion(tran.getWorldRotate());
        tran[this.tag_resFun] = ()=>{
            //有物理 代理
            let phy = tran.physicsImpostor;
            if(phy){ //速度清理
                let lv =  phy.physicsBody.linearVelocity;
                let gv = phy.physicsBody.angularVelocity;
                lv.x = lv.y = lv.z = gv.x = gv.y = gv.z = 0;
            }
            tran.setWorldPosition(tran[this.tag_pos]);
            tran.setWorldRotate(tran[this.tag_Rot]);
        }
        return mr;
    }

    //重置 复位
    static resetObj( mrs : gd3d.framework.meshRenderer[] ){
        mrs.forEach(mr=>{
            if(mr){
                let tran = mr.gameObject.transform;
                if(tran[this.tag_resFun])
                    tran[this.tag_resFun]();
            }
        });
    }

    private static lastsleepTag = "_lastsleep_";
    static ckBodySleeped( mrs : gd3d.framework.meshRenderer[] ){
        mrs.forEach(mr=>{
            if(mr && mr.gameObject.transform.physicsImpostor ){
                let tran = mr.gameObject.transform;
                let phy = tran.physicsImpostor;
                if(phy[this.lastsleepTag] == null || phy[this.lastsleepTag] != phy.isSleeping) {
                    this.cgDefMat(mr,phy.isSleeping);
                    if(mr.gameObject.transform[this.tag_isCompound]){
                        mr.gameObject.transform.children.forEach(sub=>{
                            let smr = sub.gameObject.getComponent("meshRenderer") as gd3d.framework.meshRenderer;
                            this.cgDefMat(smr,phy.isSleeping);
                        });
                    }
                }
                phy[this.lastsleepTag] = phy.isSleeping;
            }
        });
    }

    private static defMatTag = "_defMat_";
    private static cgDefMat(mr: gd3d.framework.meshRenderer, isSleeping :boolean){
        if(!mr) return;
        let tran = mr.gameObject.transform;
        if(!tran[this.defMatTag]){
            tran[this.defMatTag] = mr.materials[0];
        }
        let mat = isSleeping ? physics3dDemoTool.mats["sleeping"] : tran[this.defMatTag];
        mr.materials[0] = mat;
    }

}