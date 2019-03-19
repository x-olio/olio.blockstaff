class test_postCamera implements IState{
    
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application) {       
            console.log("i see you are a dog!");
            this.app = app;
            this.scene = this.app.getScene();
            let name = "yongzhedalu_02_1024";
            let isloaded = false;
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state)=>{
                if (state.isfinish){
    
                    this.app.getAssetMgr().load("res/scenes/"+name+"/" + name + ".assetbundle.json",gd3d.framework.AssetTypeEnum.Auto,
                    (s)=>{
                        if (s.isfinish){
                        // if(s.bundleLoadState & gd3d.framework.AssetBundleLoadState.Scene && !isloaded){
                            isloaded = true;
                            console.error(s.isfinish);
    
                            var _scene:gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName(name + ".scene.json") as gd3d.framework.rawscene;
                            var _root = _scene.getSceneRoot();
                            this.scene.addChild(_root);
                            // _root.localTranslate = new gd3d.math.vector3(-60, -30, 26.23);
                            _root.localEulerAngles = new gd3d.math.vector3(0,0,0);
                            _root.markDirty();
                            this.app.getScene().lightmaps = [];
                            _scene.useLightMap(this.app.getScene());
                            _scene.useFog(this.app.getScene());
                        }
                    });

                    this.addCamera();
                }
            });       
            
        }
    
        camera:gd3d.framework.camera;
        timer: number = 0;
        update(delta: number) {
            this.timer += delta;
            CameraController.instance().update(delta);
            var x = Math.sin(this.timer);
            var z = Math.cos(this.timer);
            var x2 = Math.sin(this.timer * 0.5);
            var z2 = Math.cos(this.timer * 0.5);
            if (this.camera){
                var objCam = this.camera.gameObject.transform;
                // if (this.camera.fov < 1.18){
                //     this.camera.fov += delta * 1.2;               
                // }else{
                //     this.camera.fov = 0.7
                // }
                // let pos = new gd3d.math.vector3(0.5, 0, 0);
                // gd3d.math.vec3Add(this.camTran.localTranslate, pos, pos);
                // gd3d.math.vec3SLerp(this.camTran.localTranslate, pos, 10*delta, pos);
                // this.camTran.localTranslate = pos;
                // this.camTran.markDirty();
                
                // objCam.localTranslate = new gd3d.math.vector3(x2 * 10, 53, z2 * 10);
                objCam.markDirty();//标记为需要刷新
            }
            
        }
    
        camTran:gd3d.framework.transform;
        postColor:gd3d.framework.cameraPostQueue_Color;
        postQuad:gd3d.framework.cameraPostQueue_Quad;
        depthColor:gd3d.framework.cameraPostQueue_Depth;
        private addCamera()
        {
            this.camTran = new gd3d.framework.transform();
            this.camTran.name = "Camera";
            this.scene.addChild(this.camTran);
            this.camera = this.camTran.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.1;
            this.camera.far = 1000;
            this.camera.fov = 1.047;
            this.camTran.localTranslate = new gd3d.math.vector3(105, 53, 57);
            this.camTran.localEulerAngles = new gd3d.math.vector3(8, -46.5, 0);
            // objCam.lookatPoint(new gd3d.math.vector3(133.6694, 97.87, 67));
            this.camTran.lookatPoint(new gd3d.math.vector3(105, 53, 70));
            this.camTran.markDirty();

            this.camera.postQueues=[];
            this.postColor = new gd3d.framework.cameraPostQueue_Color();
            this.postColor.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
            this.camera.postQueues.push(this.postColor);

            this.depthColor = new gd3d.framework.cameraPostQueue_Depth();
            this.depthColor.renderTarget=new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
            this.camera.postQueues.push(this.depthColor);                         

            var textcolor = new gd3d.framework.texture("_color");
            textcolor.glTexture = this.postColor.renderTarget;

            var depthcolor = new gd3d.framework.texture("_depthcolor");
            depthcolor.glTexture = this.depthColor.renderTarget;
            var texsize:number=512;
            var post = new gd3d.framework.cameraPostQueue_Quad();
            post.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl,texsize, texsize, true, false);
            post.material.setShader(this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
            post.material.setTexture("_MainTex", textcolor);
            post.material.setVector4("sample_offsets", new gd3d.math.vector4(0,1.0,0,-1.0));
            post.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0/texsize,1.0/texsize,texsize,texsize));
            this.camera.postQueues.push(post);

            var texBlur0= new gd3d.framework.texture("_blur0");
            texBlur0.glTexture = post.renderTarget;

            var post1 = new gd3d.framework.cameraPostQueue_Quad();
            post1.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl,texsize, texsize, true, false);
            post1.material.setShader(this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
            post1.material.setTexture("_MainTex", texBlur0);
            post1.material.setVector4("sample_offsets", new gd3d.math.vector4(1.0,0,-1.0,0));
            post1.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0/texsize,1.0/texsize,texsize,texsize));
            this.camera.postQueues.push(post1);

            var texBlur= new gd3d.framework.texture("_blur");
            texBlur.glTexture = post1.renderTarget;

            this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
            this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("dof.shader.json"));
            this.postQuad.material.setTexture("_MainTex", textcolor);
            this.postQuad.material.setTexture("_BlurTex",texBlur);
            this.postQuad.material.setTexture("_DepthTex",depthcolor);

            var focalDistance=0.985;
            this.postQuad.material.setFloat("_focalDistance", focalDistance);

            this.camera.postQueues.push(this.postQuad);

            CameraController.instance().init(this.app, this.camera);
        }

    }