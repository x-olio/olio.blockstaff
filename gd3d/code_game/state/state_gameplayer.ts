namespace Game.State
{
    export class State_GamePlayer implements IGameState
    {
        private env: Environment;
        private stateMgr: StateMgr;
        map2d: System.Map2DSystem;
        private gamePlayer: GamePlayer;

        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.stateMgr = statemgr;

            this.map2d = new System.Map2DSystem();

            this.map2d.InitAsync(this.env);

            await this.map2d.LoadTmxAsync(null, null);

            let index = this.map2d.CalcIndex(3, 1);
            this.map2d.baseData.layers[0].data[index] = 1;

            index = this.map2d.CalcIndex(4, 1);
            this.map2d.baseData.layers[0].data[index] = 3;

            index = this.map2d.CalcIndex(6, 1);
            this.map2d.baseData.layers[0].data[index] = 2;

            index = this.map2d.CalcIndex(1, 4);
            this.map2d.baseData.layers[0].data[index] = 3;

            this.map2d.Parse(this.map2d.baseData);

            this.gamePlayer = new GamePlayer();

            await this.gamePlayer.Init(this.map2d);

            this.gamePlayer.EntryScene(this.map2d, 1, 10);

            this.map2d.PrintMapInfo();
        }




        OnUpdate(delta: number)
        {
            if (this.gamePlayer)
                this.gamePlayer.Update(delta);
        }


        OnExit()
        {
            var childs = this.env.overlay.getChildren();
            for (var i in childs)
                this.env.overlay.removeChild(childs[i]);
        }
    }

}