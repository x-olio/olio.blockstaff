///this is the GameMain
namespace Game
{
    @gd3d.reflect.userCode
    export class main implements gd3d.framework.IUserCode
    {
        env: Environment;
        stateMgr: StateMgr;

        hadInit = false;
        async onStart(app: gd3d.framework.application)
        {
            this.env = new Environment(app);
            await this.env.Init();
            this.stateMgr = new StateMgr();
            this.stateMgr.Init(this.env);

            this.stateMgr.ChangeState(new State.State_List());
            let loginInfo = Common.LocalStore.Get("loginInfo");
            if(loginInfo)
                Common.APITools.loginInfo = JSON.parse(loginInfo);
            // let loginInfo = Common.LocalStore.Get("loginInfo");
            // if (loginInfo)
            // {
            //     Common.APITools.loginInfo = JSON.parse(loginInfo);
            //     if (await Common.APITools.CheckToken())
            //         this.stateMgr.ChangeState(new State.State_Menu());
            //     else
            //         this.stateMgr.ChangeState(new State.State_Login());
            // } else
            //     this.stateMgr.ChangeState(new State.State_Login());

            this.hadInit = true;
        }

        onUpdate(delta: number)
        {
            if (this.hadInit)
            {
                this.env.Update(delta);
                this.stateMgr.Update(delta);
            }

        }
        isClosed(): boolean
        {
            return false;
        }
    }
}