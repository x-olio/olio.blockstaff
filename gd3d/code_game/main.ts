///this is the GameMain
namespace Game
{
    @gd3d.reflect.userCode
    export class main implements gd3d.framework.IUserCode
    {
        env:Environment;
        stateMgr:StateMgr;

        onStart(app: gd3d.framework.application)
        {
            this.env =new Environment(app);
            this.env.Init();
            this.stateMgr =new StateMgr();
            this.stateMgr.Init(this.env);
            this.stateMgr.ChangeState(new State.State_First());





  
        }
 
        onUpdate(delta: number)
        {
            this.env.Update(delta);
            this.stateMgr.Update(delta);

        }
        isClosed(): boolean
        {
            return false;
        }
    }
}