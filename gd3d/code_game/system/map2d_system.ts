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



    interface ILayerData
    {
        type: string;
        data: Array<number>;
        refblocks: Array<string>;


        width: number;
        height: number;
    }


    interface IMapInfoData
    {
        version: string;
        layers: Array<ILayerData>;
    }




    // class MapLayer
    // {
    // data: ILayerData;
    // blockfile: IBlockFileData;
    // }
    interface IPieceOFPic //图片的一部分
    {
        imgIndex: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface IBlockAnim
    {
        speed: number;
        pieces: number[];
    }
    interface IBlockDesc
    {
        refImgs: string[];//涉及到的图片
        pieces: IPieceOFPic[];//图片块
        bound: string;//这个block和角色的关系，无关/墙/平台
        layer: string;//这个block是背景，前景，镶嵌物等
        displayType: string;//这个block的显示类型
        displayPicList: { [id: string]: IBlockAnim };
    }
    //应该是block 分四个文件描述
    let blockDesc1 =
        `
    {
        "refImgs":["./res/_game/test/red.png"],
         "pieces":[
            {
                "imgIndex":0,
                "x":0,
                "y":0,
                "w":1,
                "h":1
            }
            ],
        "bound":"wall",
        "layer":"forground",
        "displayType":"static",
        "displayPicList":{
            "def":{
                "speed":0,
                "pieces":[0]
            }
        }
    }
    `
    let blockDesc2 =
        `
    {
        "refImgs":["./res/_game/test/green.png"],
         "pieces":[
            {
                "imgIndex":0,
                "x":0,
                "y":0,
                "w":1,
                "h":1
            }
            ],
        "bound":"wall",
        "layer":"forground",
        "displayType":"static",
        "displayPicList":{
            "def":{
                "speed":0,
                "pieces":[0]
            }
        }
    }
    `
    let blockDesc3 =
        `
    {
        "refImgs":["./res/_game/test/blue.png"],
         "pieces":[
            {
                "imgIndex":0,
                "x":0,
                "y":0,
                "w":1,
                "h":1
            }
            ],
        "bound":"wall",
        "layer":"forground",
        "displayType":"static",
        "displayPicList":{
            "def":{
                "speed":0,
                "pieces":[0]
            }
        }
    }
    `
    let blockDesc4 =
        `
    {
        "refImgs":["./res/_game/test/stairs.png"],
         "pieces":[
            {
                "imgIndex":0,
                "x":0,
                "y":0,
                "w":1,
                "h":1
            }
            ],
        "bound":"wall",
        "layer":"forground",
        "displayType":"static",
        "displayPicList":{
            "def":{
                "speed":0,
                "pieces":[0]
            }
        }
    }
    `


    let testJSON = `
{
	"version":"1.0.0",
	"layers":[
		{
            "width":32,
            "height":16,
            "type":"bg",
            "data":[4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"refblocks":["hash1","hash2","hash3","hash4"];
		}
	]
}
`
    export class Map2DSystem
    {
        env: Environment;
        mapBlocks: { [id: string]: IBlockDesc };
        mapTexs: { [id: string]: gd3d.framework.texture };
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
            var block1 = JSON.parse(blockDesc1) as IBlockDesc
            var block2 = JSON.parse(blockDesc2) as IBlockDesc
            var block3 = JSON.parse(blockDesc3) as IBlockDesc
            var block4 = JSON.parse(blockDesc4) as IBlockDesc
            this.mapBlocks["hash1"] = block1;
            this.mapBlocks["hash2"] = block2;
            this.mapBlocks["hash3"] = block3;
            this.mapBlocks["hash4"] = block4;
            await this.LoadAllBlockImg();


            var mapInfo: IMapInfoData = JSON.parse(testJSON);

            this.baseData = mapInfo;
            this.Parse(mapInfo);
            return;
        }
        private async LoadAllBlockImg(): Promise<void>
        {
            for (var key in this.mapBlocks)
            {
                var imgs = this.mapBlocks[key].refImgs;
                for (var i in imgs)
                {
                    var imgname = imgs[i];
                    if (this.mapTexs[imgname] == undefined)
                    {
                        var tex = await this.loadText(imgs[i]);
                        this.mapTexs[imgs[i]] = tex;
                    }
                }
            }
            return;
        }
        constructor()
        {
            this.mapBlocks = {};
            this.mapTexs = {};
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




        async Parse(mapInfo: IMapInfoData)
        {
            for (let layer of mapInfo.layers)
            {
                let mapString = "";
                for (let y = 0; y < layer.height; ++y)
                {
                    for (let x = 0; x < layer.width; ++x)
                    {
                        let id = layer.data[y * layer.width + x];
                        mapString += id + " ";
                        if (!id)
                            continue;

                        var block = this.mapBlocks[layer.refblocks[id - 1]];
                        if (block.displayType == "static")
                        {
                            //先取动画第0帧
                            var animframe = 0;
                            var pieceid = block.displayPicList["def"].pieces[animframe];
                            var piece = block.pieces[pieceid];
                            var imgurl = block.refImgs[piece.imgIndex];
                            var texture = this.mapTexs[imgurl];
                            var tileX = piece.x;
                            var tileY = piece.x;
                            var tileWidth = piece.w;
                            var tileHeight = piece.h;
                        }
                        //这里主要的问题，图片提供自己切成了几个图素，也就没办法来计算tileX Y HeighWidth
                        // let tileWidth = 1.0;// (layer.blockheight / layer.imageheight);
                        // let tileHeight = 1.0// (layer.blockheight / layer.imageheight);


                        // let tileX = 0;// (((id - 1) % layer.blockheight) | 0) * tileWidth;
                        // let tileY = 0;//(((id - 1) / layer.blockheight) | 0) * tileHeight;

                        // var tileX = (((id - 1) % tileset.columns) | 0) * tileWidth;
                        // var tileY = (((id - 1) / tileset.columns) | 0) * tileHeight;

                        //tileY = 1.0 - tileY - tileHeight;

                        // let bdata = layer.blocks[id - 1];//id-1 = 下标

                        // let block = mapInfo.blockfile.files[bdata.file];
                        // let texKey = mapInfo.blockfile.pics[block.display.pics[0]];
                        // let texture = this.mapTexs[texKey];

                        this._addQuad(x, -y, tileX, tileY, tileWidth, tileHeight, texture);
                    }
                    mapString += "\n";
                }
                console.log(mapString);
            }
        }

        baseData: IMapInfoData;
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