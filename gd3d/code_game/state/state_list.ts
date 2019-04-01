namespace Game.State
{
    export class State_List implements IGameState
    {
        private env: Environment;
        private statemgr: StateMgr;
        private scroll: ui.ScrollFrame;


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
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
            await this.loadTexture();
            let uiroot = new gd3d.framework.transform2D();
            uiroot.markDirty();
            this.scroll = new ui.ScrollFrame({
                width: 300,
                height: this.env.app.height,
                owner: uiroot
            });
            this.env.overlay.addChild(uiroot);

            this.CreateUI();
        }

        CreateFunc(text: string, state: IGameState)
        {
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            this.scroll.AddComp(ui.createButton({
                width: 300,
                height: 40,
                text: text,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                onClick: () =>
                {
                    this.statemgr.ChangeState(state);
                }
            }));
            this.scroll.root.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 1);
            console.log(`create func :${text}`);
        }

        CreateUI()
        {
            this.CreateFunc("登陆测试", new State_Login());
            this.CreateFunc("场景测试", new State_Second("", true));
            this.CreateFunc("注册测试", new State_Regision(this));
        }

        OnUpdate(delta: number)
        {

        }

        OnExit()
        {
            var childs = this.env.overlay.getChildren();
            for (var i in childs)
            {
                this.env.overlay.removeChild(childs[i]);
            }
        }



    }
}