//UI 组件样例
class test_pbr_scene implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    assetMgr: gd3d.framework.assetMgr;
    cube: gd3d.framework.transform;
    static temp:gd3d.framework.transform2D;
    start(app: gd3d.framework.application) {

        this.app = app;
        this.scene = this.app.getScene();
        this.assetMgr = this.app.getAssetMgr();

        //相机
        var objCam = new gd3d.framework.transform();
        objCam.localTranslate.z = -10;
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 10000;
        this.camera.backgroundColor = new gd3d.math.color(0,0,0,0);
        // CameraController.instance().init(this.app, this.camera);

        //相机展示控制器
        let hoverc = this.camera.gameObject.addComponent("HoverCameraScript") as gd3d.framework.HoverCameraScript;
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30 ;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0)

        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes1.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes2.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes3.bind(this));
        this.taskmgr.addTaskCall(this.loadpbrRes4.bind(this));
        this.taskmgr.addTaskCall(this.init.bind(this));
    }
    private lightPos1 = new gd3d.math.vector4(0.5, 0.5, 0.5, 1.0);
    private lightPos2 = new gd3d.math.vector4(10, 5, 0, 1.0);

    private addSphere(
        x: number,
        y: number,
        z: number,
        IBL: gd3d.framework.texture,
        IBL_1: gd3d.framework.texture,
        IBL_2: gd3d.framework.texture,
        IBL_3: gd3d.framework.texture,
        IBL_4: gd3d.framework.texture,
        IBL_5: gd3d.framework.texture,
        albedo: gd3d.math.vector4,
        metallic: number,
        roughness: number
    ) {
        let temp1 = new gd3d.framework.transform();
        temp1.localTranslate.x = x;
        temp1.localTranslate.y = y;
        temp1.localTranslate.z = z;
        this.scene.addChild(temp1);
        let mf= temp1.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        mf.mesh = this.assetMgr.getDefaultMesh("sphere_quality");
        let mr = temp1.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        mr.materials[0] = new gd3d.framework.material("testmat");
        // mr.materials[0].setShader(this.assetMgr.getShader("shader/def"));
        // mr.materials[0].setTexture("_MainTex",this.assetMgr.getDefaultTexture("grid"));

        //pbr
        mr.materials[0].setShader(this.assetMgr.getAssetByName("pbr.shader.json") as gd3d.framework.shader);
        let brdfimg = this.assetMgr.getAssetByName(`brdf.png`)as gd3d.framework.texture;
        let temp2d = (brdfimg.glTexture as gd3d.render.glTexture2D);
        temp2d.getReader();
        temp2d.uploadByteArray(true,false,temp2d.width,temp2d.height,temp2d.reader.data,true);

        mr.materials[0].setTexture("brdf",this.assetMgr.getAssetByName(`brdf.png`)as gd3d.framework.texture);
        // User customize
        mr.materials[0].setVector4("CustomBasecolor", albedo);
        mr.materials[0].setFloat("CustomMetallic", metallic);
        mr.materials[0].setFloat("CustomRoughness", roughness);

        // Light
        mr.materials[0].setVector4("light_1", this.lightPos1);
        mr.materials[0].setVector4("light_2", this.lightPos2);
        // External texture
        // mr.materials[0].setTexture("uv_Basecolor",this.assetMgr.getAssetByName(`basecolor.png`)as gd3d.framework.texture);
        // mr.materials[0].setTexture("uv_Normal",this.assetMgr.getAssetByName(`normal.png`)as gd3d.framework.texture);
        // mr.materials[0].setTexture("uv_MetallicRoughness",this.assetMgr.getAssetByName(`metallicRoughness.png`)as gd3d.framework.texture);
        // mr.materials[0].setTexture("uv_AO",this.assetMgr.getAssetByName(`AO.png`)as gd3d.framework.texture);
        mr.materials[0].setCubeTexture("u_sky",IBL);
        mr.materials[0].setCubeTexture("u_sky_1",IBL_1);
        mr.materials[0].setCubeTexture("u_sky_2",IBL_2);
        mr.materials[0].setCubeTexture("u_sky_3",IBL_3);
        mr.materials[0].setCubeTexture("u_sky_4",IBL_4);
        // mr.materials[0].setCubeTexture("u_sky_5",IBL_5);
    }

    private init(astState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {

        //sky
        let negx = this.assetMgr.getAssetByName(`negx.jpg`)as gd3d.framework.texture;
        let negy = this.assetMgr.getAssetByName(`negy.jpg`)as gd3d.framework.texture;
        let negz = this.assetMgr.getAssetByName(`negz.jpg`)as gd3d.framework.texture;
        let posx = this.assetMgr.getAssetByName(`posx.jpg`)as gd3d.framework.texture;
        let posy = this.assetMgr.getAssetByName(`posy.jpg`)as gd3d.framework.texture;
        let posz = this.assetMgr.getAssetByName(`posz.jpg`)as gd3d.framework.texture;

        let negx_1 = this.assetMgr.getAssetByName(`negx_1.jpg`)as gd3d.framework.texture;
        let negy_1 = this.assetMgr.getAssetByName(`negy_1.jpg`)as gd3d.framework.texture;
        let negz_1 = this.assetMgr.getAssetByName(`negz_1.jpg`)as gd3d.framework.texture;
        let posx_1 = this.assetMgr.getAssetByName(`posx_1.jpg`)as gd3d.framework.texture;
        let posy_1 = this.assetMgr.getAssetByName(`posy_1.jpg`)as gd3d.framework.texture;
        let posz_1 = this.assetMgr.getAssetByName(`posz_1.jpg`)as gd3d.framework.texture;

        let negx_2 = this.assetMgr.getAssetByName(`negx_2.jpg`)as gd3d.framework.texture;
        let negy_2 = this.assetMgr.getAssetByName(`negy_2.jpg`)as gd3d.framework.texture;
        let negz_2 = this.assetMgr.getAssetByName(`negz_2.jpg`)as gd3d.framework.texture;
        let posx_2 = this.assetMgr.getAssetByName(`posx_2.jpg`)as gd3d.framework.texture;
        let posy_2 = this.assetMgr.getAssetByName(`posy_2.jpg`)as gd3d.framework.texture;
        let posz_2 = this.assetMgr.getAssetByName(`posz_2.jpg`)as gd3d.framework.texture;

        let negx_3 = this.assetMgr.getAssetByName(`negx_3.jpg`)as gd3d.framework.texture;
        let negy_3 = this.assetMgr.getAssetByName(`negy_3.jpg`)as gd3d.framework.texture;
        let negz_3 = this.assetMgr.getAssetByName(`negz_3.jpg`)as gd3d.framework.texture;
        let posx_3 = this.assetMgr.getAssetByName(`posx_3.jpg`)as gd3d.framework.texture;
        let posy_3 = this.assetMgr.getAssetByName(`posy_3.jpg`)as gd3d.framework.texture;
        let posz_3 = this.assetMgr.getAssetByName(`posz_3.jpg`)as gd3d.framework.texture;

        let negx_4 = this.assetMgr.getAssetByName(`negx_4.jpg`)as gd3d.framework.texture;
        let negy_4 = this.assetMgr.getAssetByName(`negy_4.jpg`)as gd3d.framework.texture;
        let negz_4 = this.assetMgr.getAssetByName(`negz_4.jpg`)as gd3d.framework.texture;
        let posx_4 = this.assetMgr.getAssetByName(`posx_4.jpg`)as gd3d.framework.texture;
        let posy_4 = this.assetMgr.getAssetByName(`posy_4.jpg`)as gd3d.framework.texture;
        let posz_4 = this.assetMgr.getAssetByName(`posz_4.jpg`)as gd3d.framework.texture;

        let negx_5 = this.assetMgr.getAssetByName(`negx_5.jpg`)as gd3d.framework.texture;
        let negy_5 = this.assetMgr.getAssetByName(`negy_5.jpg`)as gd3d.framework.texture;
        let negz_5 = this.assetMgr.getAssetByName(`negz_5.jpg`)as gd3d.framework.texture;
        let posx_5 = this.assetMgr.getAssetByName(`posx_5.jpg`)as gd3d.framework.texture;
        let posy_5 = this.assetMgr.getAssetByName(`posy_5.jpg`)as gd3d.framework.texture;
        let posz_5 = this.assetMgr.getAssetByName(`posz_5.jpg`)as gd3d.framework.texture;



        let skytex = new gd3d.framework.texture("skyCubeTex");
        skytex.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex.use();
        (skytex.glTexture as gd3d.render.glTextureCube).uploadImages(negx,negy,negz,posx,posy,posz);

        let skytex1 = new gd3d.framework.texture("skyCubeTex");
        skytex1.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex1.use();
        (skytex1.glTexture as gd3d.render.glTextureCube).uploadImages(negx_1,negy_1,negz_1,posx_1,posy_1,posz_1);

        let skytex2 = new gd3d.framework.texture("skyCubeTex");
        skytex2.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex2.use();
        (skytex2.glTexture as gd3d.render.glTextureCube).uploadImages(negx_2,negy_2,negz_2,posx_2,posy_2,posz_2);

        let skytex3 = new gd3d.framework.texture("skyCubeTex");
        skytex3.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex3.use();
        (skytex3.glTexture as gd3d.render.glTextureCube).uploadImages(negx_3,negy_3,negz_3,posx_3,posy_3,posz_3);

        let skytex4 = new gd3d.framework.texture("skyCubeTex");
        skytex4.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
        skytex4.use();
        (skytex4.glTexture as gd3d.render.glTextureCube).uploadImages(negx_4,negy_4,negz_4,posx_4,posy_4,posz_4);

        for(let m = 1; m > 0; m-=0.1) {
            for(let r = 1; r > 0; r-=0.1) {
                this.addSphere(m*60, 0, r*60, skytex, skytex1, skytex2, skytex3, skytex4, skytex4, new gd3d.math.vector4(0.5, 0.5, 0.5, 1.0), m, r);
            }
        }



        //cube sky
        let cubesky = new gd3d.framework.transform();
        cubesky.localScale.x=cubesky.localScale.y=cubesky.localScale.z= 200;
        this.scene.addChild(cubesky);
        let mf_c= cubesky.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        mf_c.mesh = this.assetMgr.getDefaultMesh("cube");
        let mr_c = cubesky.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        mr_c.materials[0] = new gd3d.framework.material("cubeskymat");
        mr_c.materials[0].setShader(this.assetMgr.getAssetByName("skybox.shader.json") as gd3d.framework.shader);
        // let pass = mr_c.materials[0].getShader().passes["base"][0];
        // pass.state_showface = gd3d.render.ShowFaceStateEnum.CW;
        mr_c.materials[0].setCubeTexture("u_sky",skytex);
        //mr_c.materials[0].setTexture("_MainTex",this.assetMgr.getDefaultTexture("grid"));


        state.finish = true;
    }

    private PBRPath:string = "res/pbrRes/";
    private material:string = this.PBRPath + "meta3/";
    private skyName = "map";
    private iblPath:string = this.PBRPath + `IBL/${this.skyName}/`;
    private loadpbrRes(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load(this.iblPath + "negx.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.assetMgr.load(this.iblPath + "negy.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.assetMgr.load(this.iblPath + "negz.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.assetMgr.load(this.iblPath + "posx.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.assetMgr.load(this.iblPath + "posy.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.assetMgr.load(this.iblPath + "posz.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                                    if(s5.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private loadpbrRes1(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load(this.iblPath + "negx_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.assetMgr.load(this.iblPath + "negy_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.assetMgr.load(this.iblPath + "negz_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.assetMgr.load(this.iblPath + "posx_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.assetMgr.load(this.iblPath + "posy_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.assetMgr.load(this.iblPath + "posz_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                                    if(s5.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private loadpbrRes2(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load(this.iblPath + "negx_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.assetMgr.load(this.iblPath + "negy_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.assetMgr.load(this.iblPath + "negz_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.assetMgr.load(this.iblPath + "posx_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.assetMgr.load(this.iblPath + "posy_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.assetMgr.load(this.iblPath + "posz_2.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                                    if(s5.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private loadpbrRes3(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load(this.iblPath + "negx_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.assetMgr.load(this.iblPath + "negy_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.assetMgr.load(this.iblPath + "negz_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.assetMgr.load(this.iblPath + "posx_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.assetMgr.load(this.iblPath + "posy_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.assetMgr.load(this.iblPath + "posz_3.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                                    if(s5.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private loadpbrRes4(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.assetMgr.load(this.iblPath + "negx_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.assetMgr.load(this.iblPath + "negy_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.assetMgr.load(this.iblPath + "negz_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.assetMgr.load(this.iblPath + "posx_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.assetMgr.load(this.iblPath + "posy_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.assetMgr.load(this.iblPath + "posz_4.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                                    if(s5.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private loadTexture(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        //加载图片资源
        this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
        {
            if (s1.isfinish){
                this.assetMgr.load(this.PBRPath + "brdf.png", gd3d.framework.AssetTypeEnum.Auto, (s2) => {
                    if (s2.isfinish) {
                        this.assetMgr.load(this.material + "basecolor.png", gd3d.framework.AssetTypeEnum.Auto, (s3) => {
                            if(s3.isfinish){
                                this.assetMgr.load(this.material + "normal.png",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                    if(s4.isfinish){
                                        this.assetMgr.load(this.material + "metallicRoughness.png",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
                                            if(s5.isfinish){
                                                this.assetMgr.load(this.material + "AO.png",gd3d.framework.AssetTypeEnum.Auto,(s6)=>{
                                                    if(s6.isfinish){
                                                        state.finish = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    timer: number = 0;
    update(delta: number) {
        this.timer += delta;
        this.taskmgr.move(delta); //推进task

        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);

        this.lightPos2.x += x;
        this.lightPos2.z += z;
        // CameraController.instance().update(delta);
    }

}
