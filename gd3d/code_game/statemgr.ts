namespace Game
{

    export class StateMgr
    {
        constructor()
        {
            this.state=null;
        }
        state:IGameState;
        env:Environment;
        Init(env:Environment)
        {
            this.env = env;
        }
        ChangeState(state:IGameState)
        {
            if(this.state!=null)
            {
                this.state.OnExit();
            }
            this.state =state;
            if(this.state!=null)
            {
                this.state.OnInit(this.env,this);
            }
        }
        Update(delta:number):void
        {
            this.state.OnUpdate(delta);
        }
    }
    export interface IGameState
    {
        OnInit(env: Environment, statemgr: StateMgr);
        OnUpdate(delta: number);
        OnExit()
    }
}