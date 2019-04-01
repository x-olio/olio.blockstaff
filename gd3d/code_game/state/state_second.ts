declare var md5;
namespace Game.State
{
    export class State_Second implements IGameState
    {
        env: Environment;
        statemgr: StateMgr;
        map2d: Game.System.Map2DSystem;

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
                // this.CreateEditorUI();
                let editorGame = new Game.ui.EditorGame(this.mapName);
                this.env.overlay.addChild(editorGame.Init());
                editorGame.OnSaveMap = (name, width, height) =>
                {
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

                        let emitData = this.map2d.CreateEmitData(width, height, defBlockKey);

                        this.map2d.LoadTmxAsync(emitData, System.Map2DSystem.mapBlockStore);
                    }
                    this.curlayer = this.map2d.baseData.layers[0];
                }

            }
        }



        OnExit()
        {

        }

        OnUpdate(delta: number)
        {

        }


    }
}