namespace Game.ui
{

    export class ScrollFrame
    {

        public root: gd3d.framework.transform2D;
        private fimages = [];
        private curRow = 0;
        private context: gd3d.framework.transform2D;
        private click_time = 0;
        private assetMgr: gd3d.framework.assetMgr;
        constructor(private option: {
            width: number, height: number, owner?: gd3d.framework.transform2D
        })
        {

            this.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            let scroll_t = new gd3d.framework.transform2D;
            scroll_t.width = option.width - 60;
            scroll_t.height = option.height - 60;



            scroll_t.localTranslate.x = 30;
            scroll_t.localTranslate.y = 30;
            let scroll_ = scroll_t.addComponent("scrollRect") as gd3d.framework.scrollRect;
            let ct = new gd3d.framework.transform2D;
            ct.width = option.width;

            scroll_t.addChild(ct);
            scroll_.inertia = true;
            scroll_.decelerationRate = 0.135;
            scroll_.content = ct;
            scroll_t.isMask = true;
            scroll_.horizontal = true;
            scroll_.vertical = true;
            this.root = scroll_t;
            this.context = ct;
            if (option.owner)
                option.owner.addChild(scroll_t);

            Common.AssetTools.loadAsset(this.assetMgr, "./res/_game/test/del_16.png");
        }

        public Add(option: {
            bg: gd3d.framework.texture,
            border: gd3d.framework.texture,
            width?: number,
            height?: number,
            x?: number,
            y?: number,
            owner?: gd3d.framework.transform2D,
            onClick?: (bindData?: any) => void,
            onDelete?: () => void,
            text?: string
        })
        {
            let maxWCount = parseInt(`${this.option.width / option.width}`);
            let col = this.fimages.length % maxWCount;
            option.owner = this.context;
            option.x = col * option.width + col * 10;
            option.y = this.curRow * option.height + this.curRow * 10;
            let fimg = this.CreateFrameImage(option);
            this.context.height = this.curRow * option.height + this.curRow * 10;

            this.fimages.push(fimg);
            if (col == maxWCount - 1)
                ++this.curRow;
        }

        CreateFrameImage(option: {
            bg: gd3d.framework.texture,
            border: gd3d.framework.texture,

            width?: number,
            height?: number,
            x?: number,
            y?: number,
            owner?: gd3d.framework.transform2D,
            onClick?: () => void,
            onDelete?: () => void
            text?: string
        })
        {
            let raw_t2 = new gd3d.framework.transform2D;
            raw_t2.width = option.width || 0;
            raw_t2.height = option.height || 0;
            raw_t2.transform.localTranslate.x = option.x || 0;
            raw_t2.transform.localTranslate.y = option.y || 0;
            let raw_i2 = raw_t2.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
            raw_i2.image = option.bg;


            AddEventInComp(raw_i2, gd3d.event.UIEventEnum.PointerClick, () =>
            {
                if (option.onClick)
                    option.onClick();
            }, this);

            if (option.border)
            {//边框
                let bg_t = new gd3d.framework.transform2D;
                let bg_i = bg_t.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                bg_t.width = option.width || 0;
                bg_t.height = option.height || 0;
                bg_i.image = option.border;
                bg_i.color = new gd3d.math.color(.3, .3, .3, .2);
                raw_t2.addChild(bg_t);
                // raw_i2.transform.addChild(bg_t);
            }

            if (option.onDelete)
            {
                let delTex_16 = this.assetMgr.getAssetByName("del_16.png") as gd3d.framework.texture;
                let del_t = new gd3d.framework.transform2D;
                del_t.width = 16;
                del_t.height = 16;
                del_t.transform.localTranslate.x = option.width - 16;
                del_t.transform.localTranslate.y = 0;
                let del_i = del_t.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                del_i.image = delTex_16;

                AddEventInComp(del_i, gd3d.event.UIEventEnum.PointerClick, () =>
                {
                    if (option.onDelete)
                        option.onDelete();
                }, this);
                raw_t2.addChild(del_t);
            }
            if (option.text)
            {
                let lab = createLabel({
                    text: option.text,
                    assetMgr: this.assetMgr,
                    width: option.width - 10,
                    height: 30,
                    owner: raw_t2
                });
                lab.verticalType = gd3d.framework.VerticalType.Center;
                lab.horizontalType = gd3d.framework.HorizontalType.Center;
            }
            if (option.owner)
                option.owner.addChild(raw_t2);
            return raw_t2;
        }
    }

}