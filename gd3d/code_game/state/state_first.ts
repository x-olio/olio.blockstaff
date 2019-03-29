namespace Game.State
{
    export class State_First implements IGameState
    {
        env: Environment;
        statemgr: StateMgr;


        static temp: gd3d.framework.transform2D;
        async OnInit(env: Environment, statemgr: StateMgr)
        {
            this.env = env;
            this.statemgr = statemgr;

            console.log("i am here. FirstState");

            //任务排队执行系统
            await this.loadTexture();
            await this.createUI();
        }

        OnExit()
        {
            var childs = this.env.overlay.getChildren();
            for (var i in childs)
            {
                this.env.overlay.removeChild(childs[i]);
            }
        }

        OnUpdate(delta: number)
        {

        }

        //切换状态
        OnBtn_ChangeState()
        {
            this.statemgr.ChangeState(new State_Second(""));

        }

        private async createUI(): Promise<void>
        {
            let atlasComp = this.env.assetMgr.getAssetByName("comp.atlas.json") as gd3d.framework.atlas;
            let tex_0 = this.env.assetMgr.getAssetByName("zg03_256.png") as gd3d.framework.texture;

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
            bg_t.setLayoutValue(gd3d.framework.layoutOption.LEFT, 60);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.TOP, 60);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 60);
            bg_t.setLayoutValue(gd3d.framework.layoutOption.BOTTOM, 60);

            //文本
            let lab_t = new gd3d.framework.transform2D;
            lab_t.name = "我是段文本_lable";
            lab_t.width = 120;
            lab_t.height = 100;
            lab_t.localTranslate.x = -10;
            lab_t.localTranslate.y = -10;
            bg_t.addChild(lab_t);
            let lab_l = lab_t.addComponent("label") as gd3d.framework.label;
            this["lab"] = lab_l;
            lab_l.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
            lab_l.fontsize = 24;
            lab_l.text = "我是段文本\n换行测试";
            lab_l.color = new gd3d.math.color(0.2, 0.2, 0.2, 1);
            this["obj"] = this;

            //按鈕
            let btn_t = new gd3d.framework.transform2D;
            btn_t.name = "btn_按鈕"
            btn_t.width = 100;
            btn_t.height = 36;
            btn_t.pivot.x = 0;
            btn_t.pivot.y = 0;
            btn_t.localTranslate.x = 10;
            btn_t.localTranslate.y = 70;
            bg_t.addChild(btn_t);
            let btn_b = btn_t.addComponent("button") as gd3d.framework.button;
            btn_b.targetImage = btn_t.addComponent("image2D") as gd3d.framework.image2D;
            btn_b.targetImage.sprite = atlasComp.sprites["ui_public_button_hits"];
            btn_b.pressedGraphic = atlasComp.sprites["ui_public_button_1"];
            btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
            btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;

            //关闭按钮
            let closeSce = 0.8;
            let close_bt = new gd3d.framework.transform2D;
            close_bt.width = 25 * closeSce;
            close_bt.height = 25 * closeSce;
            close_bt.pivot.x = 0;
            close_bt.pivot.y = 0;
            close_bt.localTranslate.x = 370;
            close_bt.localTranslate.y = 2;
            bg_t.addChild(close_bt);
            let close_b = close_bt.addComponent("button") as gd3d.framework.button;
            close_b.targetImage = close_bt.addComponent("image2D") as gd3d.framework.image2D;
            close_b.targetImage.sprite = atlasComp.sprites["ui_boundary_close_in"];
            close_b.pressedGraphic = atlasComp.sprites["ui_boundary_close"];
            close_b.transition = gd3d.framework.TransitionType.SpriteSwap;
            close_bt.layoutState = 0 | gd3d.framework.layoutOption.RIGHT | gd3d.framework.layoutOption.TOP;
            close_bt.setLayoutValue(gd3d.framework.layoutOption.RIGHT, 5);
            close_bt.setLayoutValue(gd3d.framework.layoutOption.TOP, 3);

            //精灵图 数字
            let nums = "45789";
            let scale = 0.6;
            let numIconarr: gd3d.framework.image2D[] = [];
            for (var i = 0; i < nums.length; i++)
            {
                let spt_t = new gd3d.framework.transform2D;
                spt_t.width = 32 * scale;
                spt_t.height = 42 * scale;
                spt_t.pivot.x = 0;
                spt_t.pivot.y = 0;
                spt_t.localTranslate.x = spt_t.width * i + 10;
                spt_t.localTranslate.y = 120;
                bg_t.addChild(spt_t);
                let spt = spt_t.addComponent("image2D") as gd3d.framework.image2D;
                spt.sprite = atlasComp.sprites["ui_lianji_" + nums[i]];
                numIconarr.push(spt);
            }

            btn_b.addListener(gd3d.event.UIEventEnum.PointerClick, () =>
            {
                this.OnBtn_ChangeState();
            }, this);


            //一个输入框
            let iptFrame_t = new gd3d.framework.transform2D;
            iptFrame_t.width = 120;
            iptFrame_t.height = 30;
            iptFrame_t.pivot.x = 0;
            iptFrame_t.pivot.y = 0;
            iptFrame_t.localTranslate.x = 10;
            iptFrame_t.localTranslate.y = 160;
            bg_t.addChild(iptFrame_t);
            let ipt = iptFrame_t.addComponent("inputField") as gd3d.framework.inputField;
            ipt.LineType = gd3d.framework.lineType.MultiLine;

            let img_t = new gd3d.framework.transform2D;
            img_t.width = iptFrame_t.width;
            img_t.height = iptFrame_t.height;
            iptFrame_t.addChild(img_t);
            ipt.frameImage = img_t.addComponent("image2D") as gd3d.framework.image2D;
            ipt.frameImage.sprite = atlasComp.sprites["ui_public_input"];
            ipt.frameImage.imageType = gd3d.framework.ImageType.Sliced;
            ipt.frameImage.imageBorder.l = 16;
            ipt.frameImage.imageBorder.t = 14;
            ipt.frameImage.imageBorder.r = 16;
            ipt.frameImage.imageBorder.b = 14;

            let text_t = new gd3d.framework.transform2D;
            text_t.width = iptFrame_t.width;
            text_t.height = iptFrame_t.height;
            iptFrame_t.addChild(text_t);
            ipt.TextLabel = text_t.addComponent("label") as gd3d.framework.label;
            ipt.TextLabel.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
            ipt.TextLabel.fontsize = 24
            ipt.TextLabel.color = new gd3d.math.color(1, 1, 1, 1);
            text_t.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER;
            text_t.setLayoutValue(gd3d.framework.layoutOption.H_CENTER, 0);
            text_t.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 0);

            let p_t = new gd3d.framework.transform2D;
            p_t.width = iptFrame_t.width;
            p_t.height = iptFrame_t.height;
            iptFrame_t.addChild(p_t);
            ipt.PlaceholderLabel = p_t.addComponent("label") as gd3d.framework.label;
            ipt.PlaceholderLabel.font = this.env.assetMgr.getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
            ipt.PlaceholderLabel.fontsize = 24
            ipt.PlaceholderLabel.color = new gd3d.math.color(0.6, 0.6, 0.6, 1);

            //滑动卷轴框
            let scroll_t = new gd3d.framework.transform2D;
            scroll_t.width = 160;
            scroll_t.height = 200;
            bg_t.addChild(scroll_t);
            scroll_t.localTranslate.x = 160;
            scroll_t.localTranslate.y = 30;
            let scroll_ = scroll_t.addComponent("scrollRect") as gd3d.framework.scrollRect;
            let ct = new gd3d.framework.transform2D;
            scroll_t.addChild(ct);
            scroll_.inertia = true;
            ct.width = 300;
            ct.height = 300;
            scroll_.decelerationRate = 0.135;
            scroll_.content = ct;
            scroll_t.isMask = true;
            scroll_.horizontal = true;
            scroll_.vertical = true;

            //raw png
            let raw_t2 = new gd3d.framework.transform2D;
            raw_t2.name = "滑动卷轴框png";
            raw_t2.width = 300;
            raw_t2.height = 300;
            let raw_i2 = raw_t2.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
            raw_i2.image = tex_0;
            ct.addChild(raw_t2);




            State_First.temp = iptFrame_t;


            //key dwon test
            let inputMgr = this.env.app.getInputMgr();

            this.env.app.webgl.canvas.addEventListener("keydown", (ev: KeyboardEvent) =>
            {
                if (ev.keyCode == 81)
                {

                }
            }, false);



            return;
        }

        private async loadTexture(): Promise<void>
        {
            //手写promise 方法
            var promise = new Promise<void>((__resolve) =>
            {
                //加载图片资源
                this.env.assetMgr.load("res/comp/comp.json.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        this.env.assetMgr.load("res/comp/comp.atlas.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                        {
                            if (s.isfinish)
                            {
                                //加载字体资源
                                this.env.assetMgr.load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                                {
                                    if (s.isfinish)
                                    {
                                        this.env.assetMgr.load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                                        {
                                            this.env.assetMgr.load("res/zg03_256.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                                            {
                                                if (s.isfinish)
                                                {
                                                    __resolve();
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
            return promise;
        }




        testFun()
        {
            let lab = this["lab"] as gd3d.framework.label;
            let datater = lab["datar"] as number[];
            let frist = new gd3d.math.vector2(datater[0], datater[1]);
            let endIdx_0 = datater.length - 13;
            let endIdx_1 = datater.length - 12;
            let end = new gd3d.math.vector2(datater[endIdx_0], datater[endIdx_1]);

            let canvas = lab.transform.canvas;
            let temp = new gd3d.math.vector2();

            canvas.ModelPosToCanvasPos(frist, temp);
            console.error(`frist:${temp.toString()}`);
            canvas.ModelPosToCanvasPos(end, temp);
            console.error(`end:${temp.toString()}`);

        }
    }
}