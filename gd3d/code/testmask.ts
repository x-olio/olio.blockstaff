namespace t
{
    export class test_xinshouMask implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        imageRenderMask: gd3d.framework.meshRenderer;
        texture: gd3d.framework.texture;
        start(app: gd3d.framework.application)
        {
            this.app = app;
            this.scene = this.app.getScene();
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
            {
                if (state.isfinish)
                {
                    //添加一个片
                    var image = new gd3d.framework.transform();
                    image.name = "cube";
                    image.localScale.x = image.localScale.y = image.localScale.z = 1;
                    image.localTranslate.z = 0.01;

                    this.scene.addChild(image);
                    var mesh = image.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                    mesh.mesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    let imageRender = image.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;



                    var imageMask = new gd3d.framework.transform();
                    imageMask.name = "mask";
                    imageMask.localScale.x = imageMask.localScale.y = imageMask.localScale.z = 1;
                    this.scene.addChild(imageMask);
                    var meshMask = imageMask.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                    meshMask.mesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    this.imageRenderMask = imageMask.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

                    //添加一个摄像机
                    var objCam = new gd3d.framework.transform();
                    objCam.name = "sth.";
                    this.scene.addChild(objCam);
                    this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
                    this.camera.near = 0.01;
                    this.camera.far = 110;
                    objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
                    objCam.lookat(image);
                    // objCam.lookat(imageMask);
                    objCam.markDirty();//标记为需要刷新

                    let assetmgr = this.app.getAssetMgr();
                    var sh = assetmgr.getShader("diffuse.shader.json");
                    if (sh != null)
                    {
                        //用了从资源里加载出来的shader
                        imageRender.materials = [];
                        imageRender.materials.push(new gd3d.framework.material());
                        imageRender.materials[0].setShader(sh);
                        
                        this.app.getAssetMgr().load("res/uvSprite.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
                        {
                            if (s.isfinish) 
                            {
                                console.warn("Finish load img.");
                                let texture = this.app.getAssetMgr().getAssetByName("uvSprite.png") as gd3d.framework.texture;
                                imageRender.materials[0].setTexture("_MainTex", texture);
                            }
                        })
                    }

                    let shaderMask = assetmgr.getShader("unlit_transparent.shader.json");
                    debugger;
                    if (shaderMask != null)
                    {
                        this.imageRenderMask.materials = [];
                        this.imageRenderMask.materials.push(new gd3d.framework.material());
                        this.imageRenderMask.materials[0].setShader(shaderMask);
                        let url = "res/mask.png";
                        gd3d.io.loadImg(url, (_tex, _err) =>
                        {
                            let fileName = getFileName(url);
                            this.texture = new gd3d.framework.texture(fileName);
                            var _textureFormat = gd3d.render.TextureFormatEnum.RGBA;//这里需要确定格式
                            var t2d = new gd3d.render.glTexture2D(this.app.getAssetMgr().webgl, _textureFormat);
                            t2d.uploadImage(_tex, true, true, true, false);
                            this.texture.glTexture = t2d;
                            this.app.getAssetMgr().setAssetUrl(this.texture, url);
                            this.app.getAssetMgr().use(this.texture);
                            this.imageRenderMask.materials[0].setTexture("_MainTex", this.texture);
                            this.imageRenderMask.materials[0].setVector4("_MaskTex_ST", new gd3d.math.vector4(1, 1, 0, 0));

                        }, (loadedLength, totalLength) => { });
                    }

                }
            });
            this.addDomUI();
        }


        addDomUI()
        {
            let tillingX = document.createElement("label");
            tillingX.style.top = "160px";
            tillingX.style.position = "absolute";
            tillingX.textContent = "tillingX:"
            this.app.container.appendChild(tillingX);

            let inputEle0 = document.createElement("input");
            inputEle0.style.top = "160px";
            inputEle0.style.left = "60px";
            inputEle0.style.width = "100px";
            inputEle0.style.position = "absolute";
            inputEle0.value = "1";
            this.app.container.appendChild(inputEle0);

            let tillingY = document.createElement("label");
            tillingY.style.top = "160px";
            tillingY.style.left = "180px";
            tillingY.style.position = "absolute";
            tillingY.textContent = "tillingY:"
            this.app.container.appendChild(tillingY);

            let inputEle1 = document.createElement("input");
            inputEle1.style.top = "160px";
            inputEle1.style.left = "240px";
            inputEle1.style.width = "100px";
            inputEle1.style.position = "absolute";
            inputEle1.value = "1";
            this.app.container.appendChild(inputEle1);


            let offsetX = document.createElement("label");
            offsetX.style.top = "160px";
            offsetX.style.left = "360px";
            offsetX.style.position = "absolute";
            offsetX.textContent = "offsetX:"
            this.app.container.appendChild(offsetX);

            let inputEle2 = document.createElement("input");
            inputEle2.style.top = "160px";
            inputEle2.style.left = "420px";
            inputEle2.style.width = "100px";
            inputEle2.style.position = "absolute";
            inputEle2.value = "0";
            this.app.container.appendChild(inputEle2);

            let offsetY = document.createElement("label");
            offsetY.style.top = "160px";
            offsetY.style.left = "540px";
            offsetY.style.position = "absolute";
            offsetY.textContent = "offsetY:"
            this.app.container.appendChild(offsetY);

            let inputEle3 = document.createElement("input");
            inputEle3.style.top = "160px";
            inputEle3.style.left = "620px";
            inputEle3.style.width = "100px";
            inputEle3.style.position = "absolute";
            inputEle3.value = "0";
            this.app.container.appendChild(inputEle3);


            let button = document.createElement("button");
            button.style.top = "220px";
            button.textContent = "update";
            button.style.position = "absolute";
            button.onclick = () =>
            {
                let tillingXVal = parseFloat(inputEle0.value);
                let tillingYVal = parseFloat(inputEle1.value);
                let offsetXVal = parseFloat(inputEle2.value);
                let offsetYVal = parseFloat(inputEle3.value);
                this.imageRenderMask.materials[0].setVector4("_MaskTex_ST", new gd3d.math.vector4(tillingXVal, tillingYVal, offsetXVal, offsetYVal));
            };
            this.app.container.appendChild(button);
        }

        camera: gd3d.framework.camera;
        timer: number = 0;
        update(delta: number)
        {
            this.timer += delta;
            var x2 = Math.sin(this.timer * 0.1);
            var z2 = Math.cos(this.timer * 0.1);
            if (!this.camera)
                return;
            var objCam = this.camera.gameObject.transform;
            // objCam.localTranslate = new gd3d.math.vector3(x2 * 2, 2.25, -z2 * 2);
            // objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        }
    }
    export function getFileName(url: string)
    {
        var filei = url.lastIndexOf("/");
        var file = url.substr(filei + 1);
        return file;
    }
}