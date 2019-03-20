///this is the GameMain
namespace Game
{
    @gd3d.reflect.userCode
    class main implements gd3d.framework.IUserCode
    {
        app: gd3d.framework.application;

        camera: gd3d.framework.camera;
        overlay: gd3d.framework.overlay2D;
        taskmgr: gd3d.framework.taskMgr;

        onStart(app: gd3d.framework.application)
        {
            this.taskmgr = new gd3d.framework.taskMgr();

            console.log("i am here.");
            this.app = app;

            var scene = this.app.getScene();
            var assetMgr = this.app.getAssetMgr();

            //相机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 10;
            //opvalue=0 表示是一个正交相机
            this.camera.opvalue = 0;

            objCam.localTranslate.x = 0;
            objCam.localTranslate.y = 0;
            objCam.localTranslate.z = 1;
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            //2dUI root
            this.overlay = new gd3d.framework.overlay2D();
            this.camera.addOverLay(this.overlay);

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadMap.bind(this));
            this.taskmgr.addTaskCall(this.addcube.bind(this));
        }
        tex: gd3d.framework.texture;
        map: string;
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
            {
                if (_state.isfinish)
                {
                    state.finish = true;
                }
            }
            );
        }
        private loadMap(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var assetMgr = this.app.getAssetMgr();
            assetMgr.load("res/_game/tmx.json", gd3d.framework.AssetTypeEnum.TextAsset, (s) =>
            {
                if (s.isfinish)
                {
                    var textasset = s.resstateFirst.res as gd3d.framework.textasset;
                    this.map = textasset.content;
                    console.log("map=" + this.map);
                    state.finish = true;
                    return;

                }
            });
        }
        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var assetMgr = this.app.getAssetMgr();
            assetMgr.load("res/_game/tmx.png", gd3d.framework.AssetTypeEnum.Texture, (s) =>
            {
                if (s.isfinish)
                {

                    this.tex = s.resstateFirst.res as gd3d.framework.texture;
                    state.finish = true;

                    // state.finish=true;
                    // this.tex = this.app.getAssetMgr().getAssetByName("tmx.png") as gd3d.framework.texture;
                }
            });
            //assetMgr.loadSingleRes()
            //創建一個貼圖
            // this.tex = new gd3d.framework.texture();
            // this.tex.glTexture = new gd3d.render.WriteableTexture2D(this.app.webgl, gd3d.render.TextureFormatEnum.RGBA, 512, 512, true);
            // var wt = this.tex.glTexture as gd3d.render.WriteableTexture2D;


            // //填充貼圖部分數據
            // var da = new Uint8Array(256 * 256 * 4);
            // for (var x = 0; x < 256; x++)
            //     for (var y = 0; y < 256; y++)
            //     {
            //         var seek = y * 256 * 4 + x * 4;
            //         da[seek] = 235;
            //         da[seek + 1] = 50;
            //         da[seek + 2] = 230;
            //         da[seek + 3] = 230;
            //     }
            // wt.updateRect(da, 256, 256, 256, 256);

            // //用圖片填充貼圖部分數據
            // var img = new Image();
            // img.onload = (e) => {
            //     state.finish = true;
            //     wt.updateRectImg( img, 0, 0);
            // };

            // img.src = "res/_game/tmx.png";

        }

        private addcube(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            for (var i = -4; i < 5; i++)
            {
                for (var j = -4; j < 5; j++)
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 0.5;
                    cube.localTranslate.x = i;
                    cube.localTranslate.y = j;
                    cube.markDirty();
                    this.app.getScene().addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    var sh = this.app.getAssetMgr().getShader("color.shader.json");
                    if (sh != null)
                    {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        //cuber.materials[0].setVector4("_Color", new gd3d.math.vector4(0.4, 0.4, 0.2, 1.0));

                        //let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        cuber.materials[0].setTexture("_MainTex", this.tex);

                    }

                }
            }

            state.finish = true;
        }
        onUpdate(delta: number)
        {
            this.taskmgr.move(delta);
        }
        isClosed(): boolean
        {
            return false;
        }
    }
}