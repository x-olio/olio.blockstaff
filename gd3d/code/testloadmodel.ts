///// <reference path="../lib/gl-matrix.d.ts" />
//import * as glMatrix from 'gl-matrix'

namespace dome{
    export class testCJ implements IState
    {


        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if(s.isfinish)
                {
                    state.finish = true;
                }
            });
        }
        // testmat:gd3d.framework.material;
        // private loadmat(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        // {
            
        // }

        // private loadLongPrefab(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        // {
            //     this.app.getAssetMgr().load("res/prefabs/zs_chuangjue_02/resources/MU1.0----1.9_TeXiao_Guoyichen_Effect_Mesh_Plane_danxiangsuofang_01.FBX_Plane01.mesh.bin", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            //     {
                //         if (s.isfinish)
                //         {
                    
                    
                    //         }
                    //     });
                    // }
                    
        dragon:gd3d.framework.transform;
        cameraPoint:gd3d.framework.transform;
        private loadmesh(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var name="zs_chuangjue_01";
            //name="Sphere";
            name="gs_chuangjue_01";
            name="0000_fs_female_1024";
            this.app.getAssetMgr().load("res/prefabs/"+name+"/"+name+".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name+".prefab.json") as gd3d.framework.prefab;
                    this.dragon= _prefab.getCloneTrans();
                    this.dragon.localEulerAngles=new gd3d.math.vector3(0,-180,0);
                    this.scene.addChild(this.dragon);
                    this.dragon.markDirty();

                    this.cameraPoint=this.dragon.find("Camera001");
                    state.finish = true;
                    
                }
            });
        }
        private loadweapon(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var name="Quad";//Bip01Prop1/
            this.app.getAssetMgr().load("res/prefabs/Quad/Quad.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("Quad.prefab.json") as gd3d.framework.prefab;
                    var pp= _prefab.getCloneTrans();
                    pp.localTranslate=new gd3d.math.vector3();
                    pp.localEulerAngles=new gd3d.math.vector3();
                    //this.dragon.localEulerAngles=new gd3d.math.vector3(0,90,0);
                    this.scene.addChild(pp);
                    //this.dragon.markDirty();

                    state.finish = true;
                    
                }
            });
        }
        private test(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.dragon=new gd3d.framework.transform();
            //this.dragon.localEulerAngles=new gd3d.math.vector3(0,90,0);
            var mesh=this.assetMgr.getAssetByName("MU1.0----1.9_TeXiao_Guoyichen_Effect_Mesh_Plane_danxiangsuofang_01.FBX_Plane01.mesh.bin") as gd3d.framework.mesh;
            //var mesh=this.assetMgr.getDefaultMesh("quad");
            var mat=this.assetMgr.getAssetByName("WuQi_zhenhong_02.mat.json") as gd3d.framework.material;
            var shder=this.assetMgr.getAssetByName("diffuse_bothside.shader.json") as gd3d.framework.shader;
            var mattt=new gd3d.framework.material();
            mattt.setShader(shder);
            
            var meshf=this.dragon.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
            meshf.mesh=mesh;
            var meshr=this.dragon.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
            meshr.materials[0]=mat;
            this.dragon.localScale=new gd3d.math.vector3(13,41,21);
            this.dragon.markDirty();
            this.scene.addChild(this.dragon);
            
            state.finish = true;
        }
        camera:gd3d.framework.camera;
        private addCamera(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.scene.addChild(tranCam);
            //tranCam.localEulerAngles = new gd3d.math.vector3(0, -75,-5);
            tranCam.localTranslate =new gd3d.math.vector3(0,0,-3);
            this.camera = tranCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.001;
            this.camera.far = 1000;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            // tranCam.lookatPoint(new gd3d.math.vector3(0,0,0));
            tranCam.markDirty();
            state.finish = true;
        }

        app:gd3d.framework.application;
        scene:gd3d.framework.scene;
        taskmgr:gd3d.framework.taskMgr;
        assetMgr:gd3d.framework.assetMgr;
        start(app: gd3d.framework.application) 
        {
            this.app=app;
            this.scene=this.app.getScene();
            this.assetMgr=this.app.getAssetMgr();
            this.taskmgr=new gd3d.framework.taskMgr();
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.addCamera.bind(this));
            this.taskmgr.addTaskCall(this.loadweapon.bind(this));
            //this.taskmgr.addTaskCall(this.loadmesh.bind(this));            
            //  this.taskmgr.addTaskCall(this.test.bind(this));
            

        }


        trans:gd3d.framework.transform;
        time:number=0;
        update(delta: number) {

            this.taskmgr.move(delta);

            // if(this.dragon&&this.camera)
            // {
            //     this.camera.gameObject.transform.lookat(this.dragon);
            // }
            // if(this.cameraPoint)
            // {
            //     this.cameraPoint.addChild(this.camera.gameObject.transform);
            //     this.camera.gameObject.transform.localEulerAngles=new gd3d.math.vector3(0,270,0);
            //     this.camera.gameObject.transform.markDirty();
            // }

        }

    }
}