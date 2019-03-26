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

    interface IDisplayItemData
    {
        data: string;
        rect?: { x: number, y: number, w: number, h: number };

    }
    interface IDisplayData
    {
        type: "static" | "animation" | "nine";
        pics: []
    }
    interface IBlockData
    {
        bound;
        display: {
            type: string,
            pics: Array<number>
        };
    }
    interface IBlockFileData
    {
        pics: Array<string>;
        files: { [id: string]: IBlockData }
    }

    interface ILayerBlockData
    {
        file: string;
    }
    interface ILayerData
    {
        type: string;
        data: Array<number>;
        blocks: Array<ILayerBlockData>;


        blockwidht: number;
        blockheight: number;
    }


    interface IBlockFileDescData
    {
        bound: string;
        pics: Array<string>;
    }

    interface IMapInfoData
    {
        version: string;
        height: number;
        width: number;
        layers: Array<ILayerData>;
        blockfile: IBlockFileData;
        files: Array<IBlockFileDescData>;
    }



    class MapBlock
    {
        data: IBlockData
    }
    // class MapLayer
    // {
    // data: ILayerData;
    // blockfile: IBlockFileData;
    // }

    //应该是block 分四个文件描述
    let blockDesc1= 
    `
    {
        "pics":[{tex:"./res/_game/test/red.png",tileWidth:1,tileHeight:1}]
        //每个文件中有个图片列表，图片有一个基本数据，要把图片横竖切位几份
        这里的tileWidth=1，tileHeight=1 表示这张图片的被切位1x1份

        "bound":"stand",
        "display":{
            "type":"static",
            "pics":[[0,0]]//pics [0,0] 表示第零张图的第零个元素切片
        }
    }
    `
    let blockDesc2=     
    `
    {
        "pics":[{tex:"./res/_game/test/green.png",tileWidth:1,tileHeight:1}]
        "bound":"stand",
        "display":{
            "type":"static",
            "pics":[[0,0]]
        }
    }
    `
    let blockDesc3=    
    `
    {
        "pics":[{tex:"./res/_game/test/blue.png",tileWidth:1,tileHeight:1}]
        "bound":"stand",
        "display":{
            "type":"static",
            "pics":[[0,0]]
        }
    }
    `
    let blockDesc4=     
    `
    {
        "pics":[{tex:"./res/_game/test/stairs.png",tileWidth:1,tileHeight:1}]
        "bound":"stand",
        "display":{
            "type":"static",
            "pics":[[0,0]]
        }
    }
    `

    
    let testJSON = `
{
	"version":"1.0.0",
	"height":16,
	"width":32,
	
	"layers":[
		{
            "blockwidht":32,
            "blockheight":16,
            "imageheight":512,
            "imagewidth": 512,
            "type":"bg",
            "data":[4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"blocks":[
                {
                    "file":"hash1"
                },
                {
                    "file":"hash2"
                },
                {
                    "file":"hash3"
                },
                {
                    "file":"hash4"
                }
			]
		}
	],
	"blockfile":{
        "pics":["./res/_game/test/red.png","./res/_game/test/green.png","./res/_game/test/blue.png","./res/_game/test/stairs.png"],
        "files":{            
            "hash1":{
                "bound":"stand",
                "display":{
                    "type":"static",
                    "pics":[0,1]
                }
            },
            "hash2":{
                "bound":"stand",
                "display":{
                    "type":"static",
                    "pics":[1,0]
                }
            },
            "hash3":{
                "bound":"stand",
                "display":{
                    "type":"static",
                    "pics":[2,0]
                }
            },
            "hash4":{
                "bound":"stand",
                "display":{
                    "type":"static",
                    "pics":[3,0]
                }
            }
        }
	}
}
`
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
            // this.tex = await this.loadText(urlImgForTmx);
            // this.map = await this.loadMap(urlJsonTMX);
            // await this.addcube();
            this.Parse(testJSON);
            return;
        }

        constructor()
        {
            window["map2d"] = this;
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

                img.src = url;//"res/_game/tmx.png";
            });
            return promise;
        }

        _addQuad(x: number, y: number, tileX: number, tileY: number, tileWidth: number, tileHeight: number, tex: gd3d.framework.texture): void
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
                cuber.materials[0].setTexture("_MainTex", tex);
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
                        this._addQuad(x, -y, tileX, tileY, tileWidth, tileHeight, this.tex);
                    }
                    mapString += "\n";
                }
                console.log(mapString);

            }

            return;
        }


        private baseData: IMapInfoData;

        async Parse(baseData: string)
        {

            let mapInfo: IMapInfoData = JSON.parse(baseData);

            this.baseData = mapInfo;

            let loadTexs = [];
            let texMap = {}
            for (let texUrl of mapInfo.blockfile.pics)
            {
                loadTexs.push(this.loadText(texUrl).then((tex) =>
                {
                    texMap[texUrl] = tex;
                }));

            }

            await Promise.all(loadTexs);

            for (let layer of mapInfo.layers)
            {
                let mapString = "";
                for (let y = 0; y < mapInfo.height; ++y)
                {
                    for (let x = 0; x < mapInfo.width; ++x)
                    {
                        let id = layer.data[y * mapInfo.width + x];
                        mapString += id + " ";
                        if (!id)
                            continue;


                        //这里主要的问题，图片提供自己切成了几个图素，也就没办法来计算tileX Y HeighWidth
                        let tileWidth =1.0;// (layer.blockheight / layer.imageheight);
                        let tileHeight =1.0// (layer.blockheight / layer.imageheight);


                        let tileX = 0;// (((id - 1) % layer.blockheight) | 0) * tileWidth;
                        let tileY = 0;//(((id - 1) / layer.blockheight) | 0) * tileHeight;

                        // var tileX = (((id - 1) % tileset.columns) | 0) * tileWidth;
                        // var tileY = (((id - 1) / tileset.columns) | 0) * tileHeight;

                        //tileY = 1.0 - tileY - tileHeight;

                        let bdata = layer.blocks[id - 1];//id-1 = 下标

                        let block = mapInfo.blockfile.files[bdata.file];
                        let texKey = mapInfo.blockfile.pics[block.display.pics[0]];
                        let texture = texMap[texKey];

                        this._addQuad(x, -y, tileX, tileY, tileWidth, tileHeight, texture);
                    }
                    mapString += "\n";
                }
                console.log(mapString);
            }
        }


        GetData()
        {
            return this.baseData;
        }

        CreateEmitData(w: number, h: number)
        {
            let emitData = [];
            for (let y = 0; y < h; ++y)
            {
                for (let x = 0; x < h; ++x)
                {
                    emitData.push(0);
                }
            }
            return emitData;
        }

        CalcID(x: number, y: number, mapWitdh: number, layer: ILayerData)
        {
            return layer.data[y * mapWitdh + x];
        }
        CalcIndex(x: number, y: number, w: number)
        {
            return y * w + x;
        }
    }
}