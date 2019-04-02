namespace Game.State
{
    export class State_Regision implements IGameState
    {

        env: Environment;
        statemgr: StateMgr;


        private ipt_nickname: gd3d.framework.inputField;
        private ipt_loginame: gd3d.framework.inputField;
        private ipt_password: gd3d.framework.inputField;
        private ipt_email: gd3d.framework.inputField;
        private ipt_phone: gd3d.framework.inputField;
        private ipt_repassword: gd3d.framework.inputField;
        private btn_back: gd3d.framework.button;
        private btn_ok: gd3d.framework.button;
        private lab_message: gd3d.framework.label;

        constructor(private upstate: IGameState)
        {

        }

        OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
            this.createUI();
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

        createUI()
        {
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            let root = new gd3d.framework.transform2D();
            this.env.overlay.addChild(root);
            root.markDirty();

            this.lab_message = ui.createLabel({
                name: "lib_msg", text: "", assetMgr: this.env.assetMgr,
                x: 180,
                y: 20,
                width: 300,
                fontcolor: new gd3d.math.color(255, 0, 0, 1),
                owner: root
            });

            ui.createLabel({ text: "昵称:", assetMgr: this.env.assetMgr, x: 75, y: 50, owner: root });
            this.ipt_nickname = ui.createInput({
                placeholder: "昵称...",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 80,
                width: 280,
                owner: root
            });

            ui.createLabel({ text: "用户名:", assetMgr: this.env.assetMgr, x: 75, y: 100, owner: root });
            this.ipt_loginame = ui.createInput({
                placeholder: "请输入用户名...",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 135,
                width: 280,
                owner: root
            });

            ui.createLabel({ text: "密码:", assetMgr: this.env.assetMgr, x: 75, y: 160, owner: root });
            this.ipt_password = ui.createInput({
                placeholder: "输入您的密码",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 195,
                width: 280,
                contentType: gd3d.framework.contentType.PassWord,
                owner: root
            });

            ui.createLabel({ text: "重复密码:", assetMgr: this.env.assetMgr, x: 75, y: 220, owner: root });
            this.ipt_repassword = ui.createInput({
                placeholder: "再次输入密码",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 255,
                width: 280,
                contentType: gd3d.framework.contentType.PassWord,
                owner: root
            });

            ui.createLabel({ text: "邮箱:", assetMgr: this.env.assetMgr, x: 75, y: 285, owner: root });
            this.ipt_email = ui.createInput({
                placeholder: ".....@qq.com",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 315,
                width: 280,
                owner: root
            });


            ui.createLabel({ text: "联系电话:", assetMgr: this.env.assetMgr, x: 75, y: 345, owner: root });
            this.ipt_phone = ui.createInput({
                placeholder: "+86.....",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 375,
                width: 280,
                owner: root
            });

            this.btn_back = ui.createButton({
                name: "btn_back",
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 40, y: 375 + 45,
                width: 200,
                text: "返回",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: root,
                onClick: this.OnBack.bind(this)
            });

            this.btn_ok = ui.createButton({
                name: "btn_ok",
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 260, y: 375 + 45,
                width: 200,
                text: "确定",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
                owner: root,
                onClick: this.OnRegister.bind(this)
            });
        }

        private OnBack()
        {
            this.statemgr.ChangeState(this.upstate);
        }

        private async OnRegister()
        {
            if (this.ipt_loginame.text.trim().length < 4)
                return this.lab_message.text = "登录名不能小于4个字符";
            if (this.ipt_nickname.text.trim().length < 2)
                return this.lab_message.text = "请输入昵称";
            if (this.ipt_password.text.trim().length < 6)
                return this.lab_message.text = "请输入6位密码";
            if (this.ipt_password.text != this.ipt_repassword.text)
                return this.lab_message.text = "两次密码不一致";

            let result = await Common.APITools.Register({
                nickname: this.ipt_nickname.text,
                username: this.ipt_loginame.text,
                password: this.ipt_password.text,
                email: this.ipt_email.text,
                phone: this.ipt_phone.text
            });

            if (result.error != 0)
                return this.lab_message.text = result.message;

            this.statemgr.ChangeState(new State_Menu());
        }
    }
}