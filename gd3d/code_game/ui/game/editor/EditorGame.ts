namespace Game.ui
{
    export class EditorGame
    {
        public uiroot: gd3d.framework.transform2D;

        private allblock_scroll: ui.ScrollFrame;
        private refblock_scroll: ui.ScrollFrame;
        private tex_border: gd3d.framework.texture;
        private curBlock: gd3d.framework.rawImage2D;
        private assetMgr: gd3d.framework.assetMgr;


        public OnAddBlockTex: (file: File) => void;
        public OnSaveMap: (name: string, width: number, height: number) => void;
        constructor(private mapName: string)
        {
            this.uiroot = new gd3d.framework.transform2D();
            this.uiroot.markDirty();
            this.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
        }
        public Init()
        {
            this.CreateUI();
            return this.uiroot;
        }

        CreateUI()
        {

            let atlasComp = this.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            this.tex_border = this.assetMgr.getAssetByName("border.png") as gd3d.framework.texture;
            let inp_name = ui.createInput({
                placeholder: "地图名",
                text: this.mapName,
                assetMgr: this.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 5, y: 5,
                width: 70,
                owner: this.uiroot
            });
            let inp_w = ui.createInput({
                placeholder: "宽度",
                assetMgr: this.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 95, y: 5,
                width: 50,
                owner: this.uiroot
            });
            let inp_h = ui.createInput({
                placeholder: "高度",
                assetMgr: this.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 165, y: 5,
                width: 50,
                owner: this.uiroot
            });
            ui.createButton({
                assetMgr: this.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 225, y: 5,
                width: 150,
                text: "确定",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: this.uiroot,
                onClick: () =>
                {
                    let name = inp_name.text;
                    let widht = Number(inp_w.text) || 0;
                    let height = Number(inp_h.text) || 0;
                    // console.log(`${name},${widht},${height}`);
                    if (!name || !widht || !height)
                        return console.error("地图数据正确,无法保存");
                    if (this.OnSaveMap)
                        this.OnSaveMap(name, widht, height);
                }
            });

            this.curBlock = ui.CreateFrameImage({
                bg: null,
                width: 64, height: 64,
                x: 395, y: 5,
                owner: this.uiroot
            });
            this.CreateBlockUI();
            this.CreateRefBlockUI();
        }

     


        CreateBlockUI()
        {

            this.allblock_scroll = new ui.ScrollFrame({
                width: 70,
                height: 300,
                owner: this.uiroot,
                x: 5, y: 50
            });

            this.RefreshBlockList();
        }

        CreateRefBlockUI()
        {
            this.refblock_scroll = new ui.ScrollFrame({
                width: 70,
                height: 300,
                owner: this.uiroot,
                x: 75, y: 50
            });
        }


        RefreshBlockList()
        {
            this.allblock_scroll.Clear();
            setTimeout(() =>
            {
                let tex_add64 = this.assetMgr.getAssetByName("add_64.png") as gd3d.framework.texture;
                this.allblock_scroll.Add({
                    width: 64,
                    height: 64,
                    bg: tex_add64,
                    border: this.tex_border,
                    onClick: () =>
                    {
                        ui.CFile.Show(async (file: File) =>
                        {
                            if (this.OnAddBlockTex)
                                this.OnAddBlockTex(file);
                            let blockName = md5(`${file.name}_${Date.now()}`);
                            let blockData = System.Map2DSystem.CreateEmitBlock();
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

            Common.AssetTools.loadAsset(this.assetMgr, texUrl).then(() =>
            {
                let texName = texUrl.substring(texUrl.lastIndexOf("/") + 1);

                let bgTex = this.assetMgr.getAssetByName(texName) as gd3d.framework.texture;

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


    }
}