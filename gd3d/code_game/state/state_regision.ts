namespace Game.State
{
    export class State_Regision implements IGameState
    {

        env: Environment;
        statemgr: StateMgr;

        OnInit(env: Environment, statemgr: StateMgr)
        {

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