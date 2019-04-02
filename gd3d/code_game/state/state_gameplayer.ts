namespace Game.State
{
    export class State_GamePlayer implements IGameState
    {
        private env: Environment;
        private stateMgr: StateMgr;
        m2dSys: System.Map2DSystem;
        private gamePlayer: GamePlayer;

        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.stateMgr = statemgr;

            this.m2dSys = new System.Map2DSystem();

            this.m2dSys.InitAsync(this.env);

            this.m2dSys.LoadTmxAsync(null, null);

            this.gamePlayer = new GamePlayer();

            await this.gamePlayer.Init();

            this.m2dSys.Entry(new gd3d.math.vector2(0, 1), this.gamePlayer.trans);

            this.m2dSys.PrintMapInfo();
        }




        OnUpdate(delta: number)
        {
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