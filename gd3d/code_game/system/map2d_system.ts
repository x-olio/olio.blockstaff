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



    export interface ILayerData
    {
        type: string;
        data: Array<number>;
        refblocks: Array<string>;


        width: number;
        height: number;
    }


    export interface IMapInfoData
    {
        version: string;
        layers: Array<ILayerData>;
    }

    export interface IPieceOFPic //图片的一部分
    {
        imgIndex: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    export interface IBlockAnim
    {
        speed: number;
        pieces: number[];
    }
    export interface IBlockDesc
    {
        refImgs: string[];//涉及到的图片
        pieces: IPieceOFPic[];//图片块
        bound: "none" | "wall" | "stand";//这个block和角色的关系，无关/墙/平台
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
            "data":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"refblocks":["hash1","hash2","hash3","hash4"]
		}
    ]
}
`;



    export class Map2DSystem
    {
        static mapsDataStore: { [key: string]: IMapInfoData } = {};
        static mapBlockStore: { [key: string]: IBlockDesc } = {};

        env: Environment;
        baseData: IMapInfoData;
        mapBlocks: { [id: string]: IBlockDesc };
        mapInfo: IMapInfoData;
        mapTexs: { [id: string]: gd3d.framework.texture };

        root: gd3d.framework.transform;
        tex: gd3d.framework.texture;
        map: TmxStruct;

        constructor()
        {
            this.mapBlocks = {};
            this.mapTexs = {};

        }
        //初始化
        async InitAsync(env: Environment): Promise<void>
        {
            this.env = env;
            this.root = new gd3d.framework.transform();
            this.root.markDirty();
            env.app.getScene().addChild(this.root);
            return;
        }
        async LoadTmxAsync(jsonData: IMapInfoData, blocks: { [key: string]: IBlockDesc }): Promise<void>
        {

            var mapInfo: IMapInfoData = jsonData || JSON.parse(testJSON);
            this.baseData = mapInfo;

            if (!blocks)
            {
                var block1 = JSON.parse(blockDesc1) as IBlockDesc
                var block2 = JSON.parse(blockDesc2) as IBlockDesc
                var block3 = JSON.parse(blockDesc3) as IBlockDesc
                var block4 = JSON.parse(blockDesc4) as IBlockDesc
                this.mapBlocks["hash1"] = block1;
                this.mapBlocks["hash2"] = block2;
                this.mapBlocks["hash3"] = block3;
                this.mapBlocks["hash4"] = block4;
            }

            await this.LoadAllBlockImg(blocks == null);
        }
        private async LoadAllBlockImg(isLocal: boolean = false): Promise<void>
        {
            for (let key in this.mapBlocks)
            {
                for (let imgname of this.mapBlocks[key].refImgs)
                {
                    if (this.mapTexs[imgname] == undefined)
                    {
                        var tex = await this.loadText(isLocal ? imgname : Common.APITools.GetBlockTexUrl(imgname));
                        this.mapTexs[imgname] = tex;
                    }
                }
            }

        }

        private async loadText(url: string): Promise<gd3d.framework.texture>
        {
            console.log(`loadtex:${url}`);
            //創建一個貼圖
            var tex = new gd3d.framework.texture();
            tex.glTexture = new gd3d.render.glTexture2D(this.env.app.webgl, gd3d.render.TextureFormatEnum.RGBA, false, false);
            var wt = tex.glTexture as gd3d.render.glTexture2D;

            var promise = new Promise<gd3d.framework.texture>((__resolve) =>
            {
                // //用圖片填充貼圖部分數據
                var img = new Image();
                img.crossOrigin = "";
                img.onload = (e) =>
                {
                    wt.uploadImage(img, false, false, false, false, false, false);
                    __resolve(tex);
                };

                img.src = url;
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
            // this.env.app.getScene().addChild(cube);

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
                cuber.materials[0].setShader(sh);

                cuber.materials[0].setTexture("_MainTex", tex);
                cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(tileWidth, tileHeight, tileX, tileY));
            }
            this.root.addChild(cube);
        }



        async Parse(mapInfo: IMapInfoData)
        {
            for (let layer of mapInfo.layers)
            {

                for (let y = layer.height - 1; y >= 0; --y)
                {
                    for (let x = 0; x < layer.width; ++x)
                    {
                        let id = layer.data[y * layer.width + x];

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

                        this._addQuad(x, y, tileX, tileY, tileWidth, tileHeight, texture);
                    }

                }

            }
        }


        static CreateEmitData(w: number, h: number, defBlockName: string): IMapInfoData
        {
            let emitData = [];

            for (let y = 0; y < h; ++y)
            {
                for (let x = 0; x < w; ++x)
                {
                    if (y == 0)
                        emitData.push(1);
                    else
                        emitData.push(0);
                }
            }
            return {
                layers: [
                    {
                        width: w,
                        height: h,
                        type: "bg",
                        data: emitData,
                        refblocks: [
                            defBlockName
                        ]
                    }
                ],
                version: "1.0.1"
            };
        }

        GetRandomPos()
        {
            let layerIndex = 0
            let w = this.baseData.layers[layerIndex].width;
            let h = this.baseData.layers[layerIndex].height;
            let refblocks = this.baseData.layers[layerIndex].refblocks;
            let pos

            for (let i = 0; i < 50; ++i)
            {
                let y = Common.Random(0, h);
                let x = Common.Random(0, w);
                let id = this.CalcIndex(x, y, w);
                if (id == undefined)
                    continue;
                let block = this.mapBlocks[refblocks[id - 1]];
                if (!block || block.bound == "none")
                {
                    pos = new gd3d.math.vector2(x, y);
                    break;
                }
            }
            return pos;
        }

        static CreateEmitBlock(): IBlockDesc
        {
            return {
                // refImgs: ["./res/_game/test/stairs.png"],
                refImgs: [],
                pieces: [
                    {
                        "imgIndex": 0,
                        "x": 0,
                        "y": 0,
                        "w": 1,
                        "h": 1
                    }
                ],
                bound: "wall",
                layer: "forground",
                displayType: "static",
                displayPicList: {
                    "def": {
                        "speed": 0,
                        "pieces": [0]
                    }
                }
            }
        }

        CalcID(x: number, y: number, mapWitdh: number, layer: ILayerData)
        {
            return layer.data[y * mapWitdh + x];
        }


        CalcIndex(x: number, y: number, w: number = 32)
        {
            if (x < 0 || y < 0)
                return;
            // console.log(`x:${x},y:${y}`);
            // x = Math.ceil(x);
            // y = Math.ceil(y);

            let index = y * w + x;
            // console.log(`x:${x},y:${y},index:${index},ref:${this.baseData.layers[0].data[index]}`);
            return index;
        }

        GetImageData()
        {
            return this.env.app.webgl.canvas.toDataURL("image/png");
        }

        PrintMapInfo()
        {
            for (let layer of this.baseData.layers)
            {
                let mapString = `layer:${layer.type}
`;
                for (let y = layer.height - 1; y >= 0; --y)
                {
                    for (let x = 0; x < layer.width; ++x)
                    {
                        let id = layer.data[y * layer.width + x];

                        if (id != undefined)
                            mapString += id + " ";
                    }
                    mapString += "\n";
                }
                console.log(mapString);
            }
        }

    }
}