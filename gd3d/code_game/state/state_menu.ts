namespace Game.State
{
    export class State_Menu implements IGameState
    {

        private env: Environment;
        private statemgr: StateMgr;
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
            await this.loadTexture();
            this.CreateUI();
        }

        loadTexture()
        {
            return Common.AssetTools.promiseQueueExec([
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
            ]);
        }
        OnUpdate(delta: number)
        {

        }

        OnExit()
        {
            var childs = this.env.overlay.getChildren();
            for (var i in childs)
                this.env.overlay.removeChild(childs[i]);
        }

        CreateUI()
        {
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            let root = new gd3d.framework.transform2D();
            this.env.overlay.addChild(root);
            root.markDirty();

            let x = gd3d.framework.sceneMgr.app.width / 2 - (300 / 2);
            let btn_enterGame = ui.createButton({
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: x, y: 135,
                width: 300,
                text: "           选择地图",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: root,
                onClick: () =>
                {
                    this.statemgr.ChangeState(new State_SelectMap());
                }
            });


            ui.createButton({
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: x, y: 135 + 60 * 1,
                width: 300,
                text: "           编辑模式",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: root,
                onClick: () =>
                {
                    this.statemgr.ChangeState(new State_SelectMap(true));
                }
            });

            ui.createButton({
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: x, y: 135 + 60 * 2,
                width: 300,
                text: "           退出登录",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: root,
                onClick: () =>
                {
                    Common.LocalStore.Clean();
                    this.statemgr.ChangeState(new State_Login());
                }

            });


        }
    }
}