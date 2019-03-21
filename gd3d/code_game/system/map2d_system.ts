namespace Game.System
{
    export class Map2DSystem
    {
        env: Environment;
        //初始化
        async InitAsync(env: Environment): Promise<void>
        {
            this.env = env;
            return;
            // var promise = new Promise<void>((finish) =>
            // {
            //     this.env = env;
            //     finish();
            // });
            // return promise;
        }
        async LoadTmxAsync(urlJsonTMX: string, urlImgForTmx: string): Promise<void>
        {
            //任务排队执行系统
            this.tex = await this.loadText();
            this.map = await this.loadMap();
            await this.addcube();

        }
        Close()
        {

        }
        tex: gd3d.framework.texture;
        map: string;

        private async loadMap(): Promise<string> 
        {
            var promise = new Promise<string>((__resolve) =>
            {
                var assetMgr = this.env.app.getAssetMgr();
                assetMgr.load("res/_game/tmx.json", gd3d.framework.AssetTypeEnum.TextAsset, (s) =>
                {
                    if (s.isfinish)
                    {
                        var textasset = s.resstateFirst.res as gd3d.framework.textasset;
                        var map = textasset.content;
                        console.log("map=" + map);

                        __resolve(map);
                        return;

                    }
                });
            });
            return promise;
        }
        private async loadText(): Promise<gd3d.framework.texture>
        {
            var promise = new Promise<gd3d.framework.texture>((__resolve) =>
            {
                var assetMgr = this.env.app.getAssetMgr();
                assetMgr.load("res/_game/tmx.png", gd3d.framework.AssetTypeEnum.Texture, (s) =>
                {
                    if (s.isfinish)
                    {

                        var tex = s.resstateFirst.res as gd3d.framework.texture;
                        __resolve(tex);
                        // state.finish=true;
                        // this.tex = this.app.getAssetMgr().getAssetByName("tmx.png") as gd3d.framework.texture;
                    }
                });
            });
            return promise;
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

        private async addcube(): Promise<void>
        {
            for (var i = -4; i < 5; i++)
            {
                for (var j = -4; j < 5; j++)
                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    cube.localScale.x = cube.localScale.y = cube.localScale.z = 1
                    cube.localTranslate.x = i;
                    cube.localTranslate.y = j;
                    cube.markDirty();
                    this.env.app.getScene().addChild(cube);
                    var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.env.app.getAssetMgr().getDefaultMesh("quad");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    var sh = this.env.app.getAssetMgr().getShader("color.shader.json");
                    if (sh != null)
                    {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        //cuber.materials[0].setVector4("_Color", new gd3d.math.vector4(0.4, 0.4, 0.2, 1.0));

                        //let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        cuber.materials[0].setTexture("_MainTex", this.tex);
                        cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(1 / 4, 1 / 4, 1 / 2, 1 / 2));
                    }

                }
            }
            return;
        }
    }
}