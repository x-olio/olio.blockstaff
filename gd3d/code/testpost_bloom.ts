namespace t
{
    export class test_post_bloom implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                if (_state.isfinish) 
                {
                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
            {
                if (s.isfinish) 
                {
                    state.finish = true;
                }
                else
                {
                    state.error = true;
                }
            }
            );
        }
        private addcamandlight(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 1;
            this.camera.far = 15;
            this.camera.fov = Math.PI * 0.3;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新

            state.finish = true;

        }
        start(app: gd3d.framework.application)
        {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            this.addbtn("50px","normal",()=>{
                this.camera.postQueues=[];
            })
            this.addbtn("150px","模糊",()=>{
                this.camera.postQueues=[];
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                //color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 512, 512, true, false);
                this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;

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
                post1.material.setShader(this.scene.app.getAssetMgr().getShader("separate_blur.shader.json"));
                post1.material.setTexture("_MainTex", texBlur0);
                post1.material.setVector4("sample_offsets", new gd3d.math.vector4(1.0,0,-1.0,0));
                post1.material.setVector4("_MainTex_TexelSize", new gd3d.math.vector4(1.0/texsize,1.0/texsize,texsize,texsize));
                this.camera.postQueues.push(post1);
            });
            this.addbtn("350px","景深",()=>{
                this.camera.postQueues=[];
                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;

                var depth = new gd3d.framework.cameraPostQueue_Depth();
                depth.renderTarget=new gd3d.render.glRenderTarget(this.scene.webgl, 1024, 1024, true, false);
                this.camera.postQueues.push(depth);    
                var depthcolor = new gd3d.framework.texture("_depthcolor");
                depthcolor.glTexture = depth.renderTarget;

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

                var post2 = new gd3d.framework.cameraPostQueue_Quad();
                post2.material.setShader(this.scene.app.getAssetMgr().getShader("dof.shader.json"));
                post2.material.setTexture("_MainTex",textcolor);
                post2.material.setTexture("_BlurTex",texBlur);
                post2.material.setTexture("_DepthTex",depthcolor);
                //var focalDistance=(10-this.camera.near)/(this.camera.far-this.camera.near);
                var focalDistance=0.96;

                post2.material.setFloat("_focalDistance",focalDistance);

                this.camera.postQueues.push(post2);
            });
            this.addbtn("350px","bloom",()=>{
                this.camera.postQueues=[];
                
            })

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.addcamandlight.bind(this));
        }

        private addbtn(topOffset:string,textContent:string,func:()=>void)
        {
            var btn = document.createElement("button");
            btn.style.top = topOffset;
            btn.style.position = "absolute";
            this.app.container.appendChild(btn);
            
            btn.textContent = textContent;
            btn.onclick = () =>
            {
                this.camera.postQueues = [];
                func();
            }
        }


        camera: gd3d.framework.camera;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        update(delta: number)
        {
            this.taskmgr.move(delta);

        }
    }

    
}