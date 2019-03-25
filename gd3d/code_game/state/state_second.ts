namespace Game.State
{
    export class State_Second implements IGameState
    {
        env: Environment;
        statemgr: StateMgr;


        map2d: Game.System.Map2DSystem;
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;

            console.log("i am here. SecondState");

            this.map2d = new Game.System.Map2DSystem();
            await this.map2d.InitAsync(this.env);
            await this.map2d.LoadTmxAsync("res/_game/tmx.json","res/_game/tmx.png");
         
        }

        OnExit()
        {

        }

        OnUpdate(delta: number)
        {

        }

     
    }
}