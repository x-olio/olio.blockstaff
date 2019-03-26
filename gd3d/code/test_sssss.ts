class test_sssss implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    cam : gd3d.framework.camera;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();
        this.scene.getRoot().localTranslate = new gd3d.math.vector3(0, 0, 0);

        this.taskmgr.addTaskCall(this.loadpbrRes.bind(this));
        this.taskmgr.addTaskCall(this.loadIBL.bind(this));
        this.taskmgr.addTaskCall(this.init.bind(this));

        // this.changeShader();
        // name="elong";
        // let isloaded= false;
        // this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        // {
        //     if (state.isfinish)
        //     {
        //         this.app.getAssetMgr().loadCompressBundle("res/prefabs/" + name + "/" + name + ".assetbundle.json",
        //             (s) =>
        //             {
        //                 console.log(s.curtask + "/" + s.totaltask);
        //                 console.log(s.curByteLength+"/"+s.totalByteLength);
        //                 if (s.bundleLoadState & gd3d.framework.AssetBundleLoadState.Prefab && !isloaded)
        //                 {
        //                     isloaded = true;
        //                     var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name + ".prefab.json") as gd3d.framework.prefab;
        //                     this.baihu = _prefab.getCloneTrans();
        //                     this.scene.addChild(this.baihu);
        //                     // this.baihu.localScale = new gd3d.math.vector3(50, 50, 50);
        //                     this.baihu.localTranslate = new gd3d.math.vector3(0, 0, 0);
        //                     this.baihu.localEulerAngles = new gd3d.math.vector3(0, 180, 0);

        //                     // this.baihu.localEulerAngles = new gd3d.math.vector3();
        //                     this.baihu = _prefab.getCloneTrans();
        //                     objCam.localTranslate = new gd3d.math.vector3(0, 20, -10);
        //                     objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        //                     objCam.markDirty();
        //                     this.renderer = this.baihu.gameObject.getComponentsInChildren("meshRenderer") as gd3d.framework.meshRenderer[];
        //                     this.skinRenders = this.baihu.gameObject.getComponentsInChildren(gd3d.framework.StringUtil.COMPONENT_SKINMESHRENDER) as gd3d.framework.skinnedMeshRenderer[];
        //                     // this.changeShader();
        //                     // for(let i=0; i<22; i++)
        //                     // {
        //                     //     for(let j=0; j<22; j++)
        //                     //     {
        //                     //         let bp = _prefab.getCloneTrans();
        //                     //         bp.localTranslate = new gd3d.math.vector3(i - 11, 0, j - 11);
        //                     //         bp.markDirty();
        //                     //         this.scene.addChild(bp);
        //                     //     }
        //                     // }
        //                 }
        //             });
        //     }
        // });


        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 10000;
        this.camera.backgroundColor = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);

        // // objCam.localTranslate = new gd3d.math.vector3(0, 0, -30);
        // CameraController.instance().init(this.app,this.camera);
        // objCam.markDirty();//标记为需要刷新

        //相机展示控制器
        let hoverc = this.camera.gameObject.addComponent("HoverCameraScript") as gd3d.framework.HoverCameraScript;
        hoverc.panAngle = 180;
        hoverc.tiltAngle = 45;
        hoverc.distance = 30 ;
        hoverc.scaleSpeed = 0.1;
        hoverc.lookAtPoint = new gd3d.math.vector3(0, 2.5, 0)

    }

    private init(){
        let names: string[] = ["elongmul", "0060_duyanshou", "Cube", "0001_fashion", "193_meirenyu"];
        let name = names[0];
        this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if(state.isfinish)
            {
                name = "Head";
                this.app.getAssetMgr().load("res/prefabs/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto,
                (s) =>
                {
                    if(s.isfinish)
                    {
                        var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(name + ".prefab.json") as gd3d.framework.prefab;
                        this.baihu = _prefab.getCloneTrans();
                        this.scene.addChild(this.baihu);
                        // this.baihu.localScale = new gd3d.math.vector3(50, 50, 50);
                        this.baihu.localTranslate = new gd3d.math.vector3(0, 0, 0);
                        this.baihu.localEulerAngles = new gd3d.math.vector3(0, 180, 0);
                        let objCam = this.camera.gameObject.transform;
                        objCam.localTranslate = new gd3d.math.vector3(0, 0, -2);
                        objCam.lookat(this.baihu);
                        objCam.markDirty();

                        // let ani = this.baihu.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                        // ani.clipnames;
                        // this.refreshTexture(this.baihu);

                        let assetMgr = this.app.getAssetMgr();

                        let negx_1 = this.app.getAssetMgr().getAssetByName(`negx_1.jpg`)as gd3d.framework.texture;
                        let negy_1 = this.app.getAssetMgr().getAssetByName(`negy_1.jpg`)as gd3d.framework.texture;
                        let negz_1 = this.app.getAssetMgr().getAssetByName(`negz_1.jpg`)as gd3d.framework.texture;
                        let posx_1 = this.app.getAssetMgr().getAssetByName(`posx_1.jpg`)as gd3d.framework.texture;
                        let posy_1 = this.app.getAssetMgr().getAssetByName(`posy_1.jpg`)as gd3d.framework.texture;
                        let posz_1 = this.app.getAssetMgr().getAssetByName(`posz_1.jpg`)as gd3d.framework.texture;
                        let skytex1 = new gd3d.framework.texture("skyCubeTex");
                        skytex1.glTexture = new gd3d.render.glTextureCube(this.app.webgl);
                        skytex1.use();
                        (skytex1.glTexture as gd3d.render.glTextureCube).uploadImages(negx_1,negy_1,negz_1,posx_1,posy_1,posz_1);
                        // this.baihu.localTranslate.x = 0;
                        this.baihu.localTranslate.y = -4;
                        // this.baihu.localTranslate.z = 10;
                        this.baihu.localScale.x = 10;
                        this.baihu.localScale.y = 10;
                        this.baihu.localScale.z = 10;
                        this.baihu.markDirty();
                        // for(let i = 0; i < this.baihu.children.length; i++) {
                            let mr = this.baihu.gameObject.getComponent("meshRenderer") as gd3d.framework.meshRenderer;
                            mr.materials[0] = new gd3d.framework.material("testmat");
                            mr.materials[0].setShader(assetMgr.getAssetByName("pbr_sss.shader.json") as gd3d.framework.shader);
                            let brdfimg = assetMgr.getAssetByName(`brdf.png`)as gd3d.framework.texture;
                            let temp2d = (brdfimg.glTexture as gd3d.render.glTexture2D);
                            temp2d.getReader();
                            temp2d.uploadByteArray(true,false,temp2d.width,temp2d.height,temp2d.reader.data,true);
                            mr.materials[0].setTexture("brdf",assetMgr.getAssetByName(`brdf.png`)as gd3d.framework.texture);
                            mr.materials[0].setTexture("uv_Basecolor",assetMgr.getAssetByName(`albedo.jpg`)as gd3d.framework.texture);
                            mr.materials[0].setTexture("uv_Thickness",assetMgr.getAssetByName(`thickness.png`)as gd3d.framework.texture);
                            mr.materials[0].setTexture("uv_Normal",assetMgr.getAssetByName(`normals.png`)as gd3d.framework.texture);
                            mr.materials[0].setCubeTexture("u_sky",skytex1);

                            mr.materials[0].setFloat("CustomMetallic", 0.3);
                            mr.materials[0].setFloat("CustomRoughness", 0.8);

                        // NOTE: Screen Space Sub-Surface Scaterring

                        let blur_options = [
                            new gd3d.math.vector4(0.22, 0.437, 0.635, 0.042),
                            new gd3d.math.vector4(0.101, 0.355, 0.365, 0.220),
                            new gd3d.math.vector4(0.119, 0.208, 0.0, 0.433),
                            new gd3d.math.vector4(0.114, 0.0, 0.0, 0.753),
                            new gd3d.math.vector4(0.364, 0.0, 0.0, 1.412),
                            new gd3d.math.vector4(0.080, 0.0, 0.0, 2.722)
                        ];

                        let sh = this.scene.app.getAssetMgr().getShader("sssss.shader.json");
                        if (!sh) {
                            console.warn(`sssss.shader.json not find`);
                            return;
                        }

                        // let psize = 1024;
                        let psize = 2048;
                        var color = new gd3d.framework.cameraPostQueue_Color();
                        color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);
                        if(!this.camera.postQueues) this.camera.postQueues = [];
                        this.camera.postQueues.push(color);

                        var depth = new gd3d.framework.cameraPostQueue_Depth();
                        depth.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                        this.camera.postQueues.push(depth);

                        var text = new gd3d.framework.texture("_depth");
                        text.glTexture = depth.renderTarget;
                        var textcolor = new gd3d.framework.texture("_color");
                        textcolor.glTexture = color.renderTarget;

                // SSSSS Start
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[0]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[0]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[1]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[1]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[2]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[2]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[3]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[3]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[4]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[4]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=
                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);
                        post0.material.setVector4("_BlurOptions", blur_options[5]); // NOTE
                        post0.material.setTexture("_MainTex", textcolor);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(1.0, 0.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        var blurText = new gd3d.framework.texture("_color");
                        blurText.glTexture = post0.renderTarget;

                        var post0 = new gd3d.framework.cameraPostQueue_Quad();
                        // post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);

                        post0.material.setShader(sh);

                        post0.material.setVector4("_BlurOptions", blur_options[5]); // NOTE
                        post0.material.setTexture("_MainTex", blurText);
                        post0.material.setTexture("_DepthTex", text);
                        post0.material.setVector4("_BlurDirection", new gd3d.math.vector4(0.0, 1.0));
                        post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
                        this.camera.postQueues.push(post0);

                        // var blurText = new gd3d.framework.texture("_color");
                        // blurText.glTexture = post0.renderTarget;
//_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=



                        // var blurText = new gd3d.framework.texture("_color");
                        // blurText.glTexture = post0.renderTarget;



                        // new gd3d.math.vector3(blur_weights[0][0], );

                        // This function can be precomputed for efficiency
                        // float3 T(float s) {
                        //   return float3(0.233, 0.455, 0.649) * exp(-s * s / 0.0064) +
                        //          float3(0.1,   0.336, 0.344) * exp(-s * s / 0.0484) +
                        //          float3(0.118, 0.198, 0.0)   * exp(-s * s / 0.187)  +
                        //          float3(0.113, 0.007, 0.007) * exp(-s * s / 0.567)  +
                        //          float3(0.358, 0.004, 0.0)   * exp(-s * s / 1.99)   +
                        //          float3(0.078, 0.0,   0.0)   * exp(-s * s / 7.41);
                        // }
                    }
                });
            }
        });
    }

    private loadpbrRes(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "albedo.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "normals.png",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.app.getAssetMgr().load("res/pbrRes/" + "brdf.png",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.app.getAssetMgr().load("res/pbrRes/SSSSS/" + "thickness.png",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
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

    private loadIBL(lastState: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negx_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s0)=>{
            if(s0.isfinish){
                this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negy_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s1)=>{
                    if(s1.isfinish){
                        this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "negz_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s2)=>{
                            if(s2.isfinish){
                                this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posx_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s3)=>{
                                    if(s3.isfinish){
                                        this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posy_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s4)=>{
                                            if(s4.isfinish){
                                                this.app.getAssetMgr().load("res/pbrRes/IBL/map/" + "posz_1.jpg",gd3d.framework.AssetTypeEnum.Auto,(s5)=>{
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



    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {
        // this.timer += delta;
        // var x = Math.sin(this.timer);
        // var z = Math.cos(this.timer);
        // var x2 = Math.sin(this.timer * 0.1);
        // var z2 = Math.cos(this.timer * 0.1);
        // var objCam = this.camera.gameObject.transform;
        // // objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);

        this.taskmgr.move(delta); //推进task

    //    CameraController.instance().update(delta);
    }
}