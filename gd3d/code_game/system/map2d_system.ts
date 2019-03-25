namespace Game.System
{
    class TmxLayer
    {
        data: number[];
        height: number;
        id: number;
        name: string
        opacity: number;
        properties: TmxProperty[];
        type: string;
        visible: boolean;
        width: number;
        x: number;
        y: number;
    }
    class TmxProperty
    {
        name: string;
        type: string;
        value: string;
    }
    class TmxTile
    {
        id: number;
        properties: TmxProperty[];
    }
    class TmxTileSet
    {
        columns: number;
        firstgid: number;
        image: string;
        imageheight: number;
        imagewidth: number;
        margin: number;
        name: string;
        spacing: number;
        tilecount: number;
        tileheight: number;
        tiles: TmxTile[];
        tilewidth: number;
    }
    class TmxStruct
    {
        height: number;
        infinite: boolean;
        layers: TmxLayer[];
        nextlayerid: number;
        nextobjectid: number;
        orientation: string;
        renderorder: string;
        tiledversion: string;
        tileheight: number;
        tilesets: TmxTileSet[];
        tilewidth: number;
        type: string;
        version: number;
        width: number;
    }


    interface IDisplayData
    {
        type: "static" | "animation" | "nine";
        pics: []
    }
    interface IBlockData
    {
        bound;
        dispay;
    }
    interface IBlockfileData
    {
        pics: Array<string>;
        blocks: { [id: string]: IBlockData }
    }
    interface ILayerData
    {
        type: string;
        data: Array<number>;
        blocks: Array<IBlockData>;
    }

    interface IMapInfoData
    {
        version: string;
        height: number;
        width: number;
        blockwidht: number;
        blockheight: number;
        layers: Array<ILayerData>;
    }



    class MapBlock
    {
        data: IBlockData
    }
    class MapLayer
    {
        data: ILayerData;
        blockfile: IBlockfileData;
    }

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
            this.tex = await this.loadText(urlImgForTmx);
            this.map = await this.loadMap(urlJsonTMX);
            await this.addcube();

        }


        tex: gd3d.framework.texture;

        map: TmxStruct;

        private async loadMap(url: string): Promise<TmxStruct> 
        {
            var promise = new Promise<TmxStruct>((__resolve) =>
            {
                var assetMgr = this.env.app.getAssetMgr();
                assetMgr.load(url, gd3d.framework.AssetTypeEnum.TextAsset, (s) =>
                {
                    if (s.isfinish)
                    {
                        var textasset = s.resstateFirst.res as gd3d.framework.textasset;
                        var maptxt = textasset.content;
                        var mapobj = JSON.parse(maptxt) as TmxStruct;
                        __resolve(mapobj);
                        return;

                    }
                });
            });
            return promise;
        }
        private async loadText(url: string): Promise<gd3d.framework.texture>
        {
            // var promise = new Promise<gd3d.framework.texture>((__resolve) =>
            // {
            //     var assetMgr = this.env.app.getAssetMgr();
            //     assetMgr.load(url, gd3d.framework.AssetTypeEnum.Texture, (s) =>
            //     {
            //         if (s.isfinish)
            //         {

            //             var tex = s.resstateFirst.res as gd3d.framework.texture;
            //             __resolve(tex);
            //             // state.finish=true;
            //             // this.tex = this.app.getAssetMgr().getAssetByName("tmx.png") as gd3d.framework.texture;
            //         }
            //     });
            // });
            // return promise;
            //assetMgr.loadSingleRes()
            //創建一個貼圖
            var tex = new gd3d.framework.texture();
            tex.glTexture = new gd3d.render.glTexture2D(this.env.app.webgl, gd3d.render.TextureFormatEnum.RGBA, false, false);
            var wt = tex.glTexture as gd3d.render.glTexture2D;


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
            var promise = new Promise<gd3d.framework.texture>((__resolve) =>
            {
                // //用圖片填充貼圖部分數據
                var img = new Image();
                img.onload = (e) =>
                {
                    wt.uploadImage(img, false, false, false, false, false, false);
                    __resolve(tex);
                    //     state.finish = true;
                    //     wt.updateRectImg( img, 0, 0);
                };

                img.src = "res/_game/tmx.png";
            });
            return promise;
        }

        _addQuad(x: number, y: number, tileX: number, tileY: number, tileWidth: number, tileHeight: number): void
        {
            var cube = new gd3d.framework.transform();
            cube.name = "cube";
            cube.localScale.x = cube.localScale.y = cube.localScale.z = 1
            cube.localTranslate.x = x;
            cube.localTranslate.y = y;
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
                cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(tileWidth, tileHeight, tileX, tileY));
            }

        }
        private async addcube(): Promise<void>
        {
            var tileset = this.map.tilesets[0];

            for (var i = 0; i < this.map.layers.length; i++)
            {
                console.log(`layers:${i}`);
                let mapString = "";
                var layer = this.map.layers[i];
                for (var y = 0; y < this.map.height; y++)
                {
                    for (var x = 0; x < this.map.width; x++)
                    {
                        var id = layer.data[y * layer.width + x];


                        if (id == 0)
                        {
                            mapString += "  ";
                            continue;
                        }
                        let idStr = `${id}`;
                        mapString += idStr.length < 2 ? `0${id}` : idStr;

                        var tileWidth = (tileset.tileheight / tileset.imageheight);
                        var tileHeight = (tileset.tileheight / tileset.imageheight);
                        var tileX = (((id - 1) % tileset.columns) | 0) * tileWidth;
                        var tileY = (((id - 1) / tileset.columns) | 0) * tileHeight;
                        tileY = 1.0 - tileY - tileHeight;
                        this._addQuad(x, -y, tileX, tileY, tileWidth, tileHeight);
                    }
                    mapString += "\n";
                }
                console.log(mapString);
            }

            return;
        }


        private baseData: IMapInfoData;

        Parse(baseData: string)
        {

            let mapInfo: IMapInfoData = JSON.parse(baseData);

            this.baseData = mapInfo;

            for (let layer of mapInfo.layers)
            {
                for (let y = 0; y < mapInfo.height; ++y)
                {
                    for (let x = 0; x < mapInfo.width; ++x)
                    {
                        let id = layer.blocks[y * mapInfo.width + x];
                        if (!id)
                            continue;
                    }
                }
            }
        }


        GetData()
        {
            return this.baseData;
        }

    }
}