namespace Game.State
{
    export class State_SelectMap implements IGameState
    {
        private env: Environment;
        private statemgr: StateMgr;

        constructor(public isEditor: boolean = false)
        {

        }
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
            await this.LoadTexture();
            this.CreateUI();

        }

        LoadTexture()
        {
            return Common.AssetTools.promiseQueueExec([
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/add_64.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/del_16.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/_game/test/border.png"),
            ]);
        }

        async CreateUI()
        {
            let root = new gd3d.framework.transform2D();
            this.env.overlay.addChild(root);
            root.markDirty();

            let tex_add64 = this.env.assetMgr.getAssetByName("add_64.png") as gd3d.framework.texture;
            
            let tex_border = this.env.assetMgr.getAssetByName("border.png") as gd3d.framework.texture;
            


            let scroll = new ui.ScrollFrame({
                width: this.env.app.width,
                height: this.env.app.height,
                owner: root
            });

            if (this.isEditor)
            {

                scroll.Add({
                    bg: tex_add64, border: tex_border, width: 128, height: 128, onClick: () =>
                    {
                        this.statemgr.ChangeState(new State_Second(null, true));
                    }
                });
            }



            let blocks = Game.System.Map2DSystem.mapBlockStore = {};
            let bresult = await Common.APITools.ReadBlockList();
            for (let blockInfo of bresult.body)
            {
                blocks[blockInfo.name] = JSON.parse(blockInfo.data);
            }

            let result = await Common.APITools.ReadMapList();
            let maps = Game.System.Map2DSystem.mapsDataStore = {};

            for (let item of result.body)
            {
                maps[item.name] = JSON.parse(item.data);
                scroll.Add({
                    text: item.name, bg: tex_add64, border: tex_border, width: 128, height: 128, onClick: () =>
                    {
                        this.statemgr.ChangeState(new State_Second(item.name, this.isEditor));
                    }
                });
            }
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


    }
}