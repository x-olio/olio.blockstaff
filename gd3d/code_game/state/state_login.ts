namespace Game.State
{
    export class State_Login implements IGameState
    {
        private env: Environment;
        private statemgr: StateMgr;

        private bg_t: gd3d.framework.transform2D;
        private btn_login: gd3d.framework.button;
        private btn_register: gd3d.framework.button;
        private ipt_loginame: gd3d.framework.inputField;
        private ipt_password: gd3d.framework.inputField;
        private lab_message: gd3d.framework.label;
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;
            await this.loadTexture();
            console.log("loadtexture finish");
            this.createUI();
        }

        OnUpdate(delta: number)
        {

        }

        OnExit()
        {
            this.btn_login.removeListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
            this.btn_register.removeListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
            this.bg_t.dispose();
            var childs = this.env.overlay.getChildren();
            for (var i in childs)
                this.env.overlay.removeChild(childs[i]);
        }


        loadTexture()
        {
            return Common.AssetTools.promiseQueueExec([
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.json.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/comp/comp.atlas.json"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/STXINGKA.TTF.png"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/resources/STXINGKA.font.json"),
                Common.AssetTools.loadAsset.bind(this, this.env.assetMgr, "res/zg03_256.png"),
            ]);
        }



        createUI()
        {

            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            // let tex_0 = this.env.assetMgr.getAssetByName("zg03_256.png") as gd3d.framework.texture;
            //9宫格拉伸底图
            let bg_t = new gd3d.framework.transform2D;
            bg_t.name = "框底图"
            bg_t.width = 400;
            bg_t.height = 260;
            bg_t.pivot.x = 0;
            bg_t.pivot.y = 0;
            //bg_t.localTranslate.x = 100;
            bg_t.localTranslate.y = 100;
            this.env.overlay.addChild(bg_t);
            let bg_i = bg_t.addComponent("image2D") as gd3d.framework.image2D;
            bg_i.imageType = gd3d.framework.ImageType.Sliced;
            bg_i.sprite = atlasComp.sprites["bg"];
            bg_i.imageBorder.l = 10;
            bg_i.imageBorder.t = 50;
            bg_i.imageBorder.r = 10;
            bg_i.imageBorder.b = 10;
            bg_t.layoutState = 0 | gd3d.framework.layoutOption.LEFT | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP | gd3d.framework.layoutOption.BOTTOM;
            bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT, 0);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP, 0);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 0);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM, 0);
            this.bg_t = bg_t;
            this.lab_message = ui.createLabel({
                name: "lib_msg", text: "", assetMgr: this.env.assetMgr,
                x: 200,
                y: 70,
                width: 300,
                fontcolor: new gd3d.math.color(255, 0, 0, 1)
            });
            bg_t.addChild(this.lab_message.transform);

            bg_t.addChild(ui.createLabel({
                name: "lib_loginame", text: "用户名:", assetMgr: this.env.assetMgr,
                x: 100,
                y: 100
            }).transform);

            this.ipt_loginame = ui.createInput({
                name: "txt_loginname",
                placeholder: "请输入用户名...",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 135,
                width: 280
            });
            bg_t.addChild(this.ipt_loginame.transform);


            bg_t.addChild(ui.createLabel({
                name: "lib_loginame", text: "密码:", assetMgr: this.env.assetMgr,
                x: 100,
                y: 160
            }).transform);

            this.ipt_password = ui.createInput({
                name: "txt_password",
                placeholder: "",
                assetMgr: this.env.assetMgr,
                backSprite: atlasComp.sprites["ui_public_input"],
                x: 180, y: 195,
                width: 280,
                contentType: gd3d.framework.contentType.PassWord
            });
            bg_t.addChild(this.ipt_password.transform);


            this.btn_register = ui.createButton({
                name: "btn_login",
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 100, y: 195 + 45,
                width: 200,
                text: "注册新号",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
            });

            this.btn_login = ui.createButton({
                name: "btn_login",
                assetMgr: this.env.assetMgr,
                hitsSprite: atlasComp.sprites["ui_public_button_hits"],
                backSprite: atlasComp.sprites["ui_public_button_1"],
                x: 300, y: 195 + 45,
                width: 200,
                text: "进入游戏",
                fontcolor: new gd3d.math.color(1, 1, 1, 1),
            });

            this.btn_login.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnLogin.bind(this), this);
            this.btn_register.addListener(gd3d.event.UIEventEnum.PointerClick, this.OnRegister.bind(this), this);

            bg_t.addChild(this.btn_login.transform);
            bg_t.addChild(this.btn_register.transform);
        }

        async OnLogin()
        {
            console.log(`登录-> loginname:${this.ipt_loginame.text},password:${this.ipt_password.text}`);
            this.lab_message.text = null;
            try
            {
                let result = await Common.APITools.Login({ username: this.ipt_loginame.text, password: this.ipt_password.text });
                if (result.error != 0)
                {
                    this.lab_message.text = result.message;
                    return;
                }
                this.statemgr.ChangeState(new State_Menu());
            } catch (e)
            {
                this.lab_message.text = `${e.message}`;
            }

        }

        OnRegister()
        {
            console.log("注册");
            this.statemgr.ChangeState(new State_Regision(this));
        }



    }

}

