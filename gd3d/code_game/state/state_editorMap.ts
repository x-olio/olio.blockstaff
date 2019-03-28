namespace Game.State
{
    export class State_EditorMap implements IGameState
    {
        env: Environment;
        statemgr: StateMgr;

        constructor(private name?: string)
        {

        }

        OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
        }

        CreateUI()
        {
            
        }

        OnUpdate(delta: number)
        {

        }

        OnExit()
        {

        }


    }
}