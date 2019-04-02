namespace Game.State
{
    export class State_List implements IGameState
    {
        private env: Environment;
        private statemgr: StateMgr;
        private scroll: ui.ScrollFrame;

        CreateUI()
        {
            this.CreateFunc("登陆测试", new State_Login());
            this.CreateFunc("地块上传", new State_Second("", true));
            this.CreateFunc("注册测试", new State_Regision(this));
            this.CreateFunc("场景与角色", new State_GamePlayer());
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
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;

            this.statemgr = statemgr;
            await this.loadTexture();

            this.scroll = new ui.ScrollFrame({
                width: 300,
                height: this.env.app.height - 100
            });

            //设置居中
            this.scroll.root.layoutState = gd3d.framework.layoutOption.V_CENTER | gd3d.framework.layoutOption.H_CENTER;

            this.scroll.root.markDirty();
            this.env.overlay.addChild(this.scroll.root);

            this.CreateUI();
        }

        CreateFunc(text: string, state: IGameState)
        {
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            let button = ui.createButton({
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
            });

            this.scroll.AddComp(button);
            this.scroll.root.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 1);
            
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