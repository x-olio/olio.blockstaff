declare var md5;
namespace Game.State
{
    export class State_Second implements IGameState
    {
        env: Environment;
        statemgr: StateMgr;
        map2d: Game.System.Map2DSystem;
        private root: gd3d.framework.transform2D;
        private allblock_scroll: ui.ScrollFrame;
        private layerblock_scroll: ui.ScrollFrame;
        private tex_border: gd3d.framework.texture;
        private curBlock: gd3d.framework.rawImage2D;
        private curlayer: System.ILayerData;

        constructor(private mapName: string, private isEditor: boolean = false)
        {

        }

        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;

            console.log("i am here. SecondState");

            this.map2d = new Game.System.Map2DSystem();

            await this.map2d.InitAsync(this.env);

            if (this.mapName)
            {
                await this.map2d.LoadTmxAsync(Game.System.Map2DSystem.mapsDataStore[this.mapName],
                    Game.System.Map2DSystem.mapBlockStore);
            }
            if (this.isEditor)
            {
                this.CreateEditorUI();
            }
        }
        async CreateEditorUI()
        {
            this.root = new gd3d.framework.transform2D();
            this.env.overlay.addChild(this.root);
            this.root.markDirty();
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;

            let inp_name = ui.createInput({
                placeholder: "地图名",
                text: this.mapName,
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 5, y: 5,
                width: 70,
                owner: this.root
            });
            let inp_w = ui.createInput({
                placeholder: "宽度",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 95, y: 5,
                width: 50,
                owner: this.root
            });
            let inp_h = ui.createInput({
                placeholder: "高度",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 165, y: 5,
                width: 50,
                owner: this.root
            });
            ui.createButton({
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 225, y: 5,
                width: 150,
                text: "确定",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: this.root,
                onClick: () =>
                {
                    let name = inp_name.text;
                    let widht = Number(inp_w.text) || 0;
                    let height = Number(inp_h.text) || 0;
                    // console.log(`${name},${widht},${height}`);
                    if (!name || !widht || !height)
                        return console.error("地图数据正确,无法保存");

                    this.map2d.root.removeAllChild();
                    // if (!this.map2d.baseData)
                    {
                        let defBlockKey: string;
                        for (let key in System.Map2DSystem.mapBlockStore)
                        {
                            defBlockKey = key;
                            this.map2d.mapBlocks[key] = System.Map2DSystem.mapBlockStore[key];
                            break;
                        }
                        let emitData = this.map2d.CreateEmitData(widht, height, defBlockKey);


                        this.map2d.LoadTmxAsync(emitData, System.Map2DSystem.mapBlockStore);
                    }
                    this.curlayer = this.map2d.baseData.layers[0];

                }
            });

            this.curBlock = ui.CreateFrameImage({
                bg: null,
                width: 64, height: 64,
                x: 395, y: 5,
                owner: this.root
            });

            this.CreateBlockUI();

        }

        CreateLayerBlockUI()
        {
            this.layerblock_scroll = new ui.ScrollFrame({
                width: 300,
                height: 64,
                x: 520, y: 5,
                owner: this.root
            });
        }


        CreateBlockUI()
        {

            this.tex_border = this.env.assetMgr.getAssetByName("border.png") as gd3d.framework.texture;
            this.allblock_scroll = new ui.ScrollFrame({
                width: 70,
                height: 300,
                owner: this.root,
                x: 5, y: 50
            });

            this.RefreshBlockList();
        }


        RefreshBlockList()
        {
            this.allblock_scroll.Clear();
            setTimeout(() =>
            {
                let tex_add64 = this.env.assetMgr.getAssetByName("add_64.png") as gd3d.framework.texture;
                this.allblock_scroll.Add({
                    width: 64,
                    height: 64,
                    bg: tex_add64,
                    border: this.tex_border,
                    onClick: () =>
                    {
                        ui.File.Show(async (file: File) =>
                        {
                            let blockName = md5(`${file.name}_${Date.now()}`);
                            let blockData = this.map2d.CreateEmitBlock();

                            let result = await Common.APITools.CreateBlock({
                                name: blockName,
                                desc: "",
                                data: JSON.stringify(blockData),
                                file: file
                            } as any);
                            if (result.error == 0)
                            {
                                System.Map2DSystem.mapBlockStore[blockName] = result.body;
                                this.CreateBlockItem(blockName, result.body);
                            } else
                                console.error(result.message);
                        }, "*.png,*.jpg");
                    },
                    onDbClick: () =>
                    {
                        if (this.curlayer)
                        {

                        }
                    }
                });
                let blocks = System.Map2DSystem.mapBlockStore;
                for (let key in blocks)
                    this.CreateBlockItem(key, blocks[key]);
            }, 50);
        }

        CreateBlockItem(blockName: string, block: System.IBlockDesc)
        {
            if (!block || !block.refImgs || block.refImgs.length < 1)
                return;

            let texUrl = Common.APITools.GetBlockTexUrl(block.refImgs[0]);

            Common.AssetTools.loadAsset(this.env.assetMgr, texUrl).then(() =>
            {
                let texName = texUrl.substring(texUrl.lastIndexOf("/") + 1);

                let bgTex = this.env.assetMgr.getAssetByName(texName) as gd3d.framework.texture;

                this.allblock_scroll.Add({
                    width: 64,
                    height: 64,
                    bg: bgTex,
                    border: this.tex_border,
                    onClick: () =>
                    {
                        this.curBlock.image = bgTex;
                    },
                    onDelete: async () =>
                    {

                        let result = await Common.APITools.DelBlock({ name: blockName });
                        if (result.error == 0)
                        {
                            delete System.Map2DSystem.mapBlockStore[blockName];
                            this.RefreshBlockList();
                        } else
                            console.error(result.message);
                    }
                });
            });
        }



        OnExit()
        {

        }

        OnUpdate(delta: number)
        {

        }


    }
}