namespace Game.ui
{

    export interface ILabelOption
    {
        name?: string,
        text?: string,
        assetMgr?: gd3d.framework.assetMgr
        owner?: gd3d.framework.transform2D
        fontsize?: number,
        fontasset?: string,
        fontcolor?: gd3d.math.color
        width?: number,
        height?: number,
        x?: number,
        y?: number,

    }
    export interface IButtonOption extends ILabelOption
    {
        hitsSprite?: gd3d.framework.sprite;
        backSprite?: gd3d.framework.sprite;
        onClick?: () => void;
    }
    export interface IInputOption extends ILabelOption
    {
        backSprite: gd3d.framework.sprite,
        LineType?: gd3d.framework.lineType,
        placeholder?: string,
        contentType?: gd3d.framework.contentType
    }

    export function createLabel(option: ILabelOption)
    {
        if (!option.assetMgr)
            option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
        let lab_t = new gd3d.framework.transform2D;
        lab_t.name = option.name;
        lab_t.width = option.width || 120;
        lab_t.height = option.height || 100;
        lab_t.localTranslate.x = option.x || 0;
        lab_t.localTranslate.y = option.y || 0;
        if (option.owner)
            option.owner.addChild(lab_t);
        let lab_l = lab_t.addComponent("label") as gd3d.framework.label;
        lab_l.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json") as gd3d.framework.font;
        lab_l.fontsize = option.fontsize || 24;
        lab_l.text = option.text;
        lab_l.color = option.fontcolor || new gd3d.math.color(0.2, 0.2, 0.2, 1);
        return lab_l;
    }
    export function createInput(option: IInputOption)
    {
        if (!option.assetMgr)
            option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
        //一个输入框
        let iptFrame_t = new gd3d.framework.transform2D;
        iptFrame_t.width = option.width || 120;
        iptFrame_t.height = option.height || 30;
        iptFrame_t.pivot.x = 0;
        iptFrame_t.pivot.y = 0;
        iptFrame_t.localTranslate.x = option.x || 0;
        iptFrame_t.localTranslate.y = option.y || 0;
        if (option.owner)
            option.owner.addChild(iptFrame_t);
        let ipt = iptFrame_t.addComponent("inputField") as gd3d.framework.inputField;

        ipt.LineType = option.LineType || gd3d.framework.lineType.SingleLine;
        ipt.ContentType = option.contentType || gd3d.framework.contentType.Word;
        let img_t = new gd3d.framework.transform2D;
        img_t.width = iptFrame_t.width;
        img_t.height = iptFrame_t.height;
        iptFrame_t.addChild(img_t);
        ipt.frameImage = img_t.addComponent("image2D") as gd3d.framework.image2D;
        ipt.frameImage.sprite = option.backSprite;
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
        ipt.TextLabel.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json") as gd3d.framework.font;
        ipt.TextLabel.fontsize = option.fontsize || 24;
        ipt.TextLabel.color = new gd3d.math.color(1, 1, 1, 1);
        text_t.layoutState = 0 | gd3d.framework.layoutOption.H_CENTER | gd3d.framework.layoutOption.V_CENTER;
        text_t.setLayoutValue(gd3d.framework.layoutOption.H_CENTER, 0);
        text_t.setLayoutValue(gd3d.framework.layoutOption.V_CENTER, 0);

        let p_t = new gd3d.framework.transform2D;
        p_t.width = iptFrame_t.width;
        p_t.height = iptFrame_t.height;
        iptFrame_t.addChild(p_t);
        ipt.PlaceholderLabel = p_t.addComponent("label") as gd3d.framework.label;
        ipt.PlaceholderLabel.font = option.assetMgr.getAssetByName(option.fontasset || "STXINGKA.font.json") as gd3d.framework.font;
        ipt.PlaceholderLabel.fontsize = option.fontsize || 24;
        ipt.PlaceholderLabel.color = new gd3d.math.color(0.6, 0.6, 0.6, 1);
        if (option.placeholder)
            ipt.PlaceholderLabel.text = option.placeholder;

        return ipt;
    }
    export function createButton(option: IButtonOption)
    {
        if (!option.assetMgr)
            option.assetMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
        //按鈕
        let btn_t = new gd3d.framework.transform2D;
        btn_t.name = option.name;
        btn_t.width = option.width || 100;
        btn_t.height = option.height || 36;
        btn_t.pivot.x = 0;
        btn_t.pivot.y = 0;
        btn_t.localTranslate.x = option.x || 0;
        btn_t.localTranslate.y = option.y || 0;
        if (option.owner)
            option.owner.addChild(btn_t);
        let btn_b = btn_t.addComponent("button") as gd3d.framework.button;
        btn_b.targetImage = btn_t.addComponent("image2D") as gd3d.framework.image2D;

        btn_b.targetImage.sprite = option.hitsSprite;
        btn_b.pressedGraphic = option.backSprite;
        btn_b.pressedColor = new gd3d.math.color(1, 1, 1, 1);
        btn_b.transition = gd3d.framework.TransitionType.SpriteSwap;

        if (option.text)
        {
            let lab = createLabel({
                owner: btn_t, text: option.text, assetMgr: option.assetMgr,
                name: `lib_${option.name}`, fontcolor: option.fontcolor,
                width: btn_t.width,
                height: btn_t.height
            });

            lab.horizontalType = gd3d.framework.HorizontalType.Center;
            lab.verticalType = gd3d.framework.VerticalType.Center;
        }
        if (option.onClick)
            btn_b.addListener(gd3d.event.UIEventEnum.PointerClick, option.onClick, this);

        return btn_b;
    }


    export function CreateFrameImage(option: {
        bg: gd3d.framework.texture,
        border?: gd3d.framework.texture,
        width?: number,
        height?: number,
        x?: number,
        y?: number,
        owner?: gd3d.framework.transform2D
    })
    {
        let raw_t2 = new gd3d.framework.transform2D;
        raw_t2.width = option.width || 0;
        raw_t2.height = option.height || 0;
        raw_t2.transform.localTranslate.x = option.x || 0;
        raw_t2.transform.localTranslate.y = option.y || 0;
        let raw_i2 = raw_t2.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
        raw_i2.image = option.bg;

        if (option.border)
        {//边框
            let bg_t = new gd3d.framework.transform2D;
            let bg_i = bg_t.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
            bg_t.width = option.width || 0;
            bg_t.height = option.height || 0;
            bg_i.image = option.border;
            bg_i.color = new gd3d.math.color(.3, .3, .3, .2);
            raw_t2.addChild(bg_t);
        }

        if (option.owner)
            option.owner.addChild(raw_t2);
        return raw_i2;
    }

    let helpV2 = new gd3d.math.vector2();

    export function AddEventInComp(trans2d: gd3d.framework.IRectRenderer, eventEnum: gd3d.event.UIEventEnum, func: (...args: Array<any>) => void, thisArg: any)
    {
        let _this: any = trans2d;

        _this.UIEventer = _this.UIEventer || new gd3d.event.UIEvent();
        _this.UIEventer.OnEnum(eventEnum, func, thisArg);
        _this.downPointV2 = _this.downPointV2 || new gd3d.math.vector2();
        let time = 0;
        trans2d.onPointEvent = function (canvas, ev, oncap)
        {
            if (oncap == false)
            {
                helpV2.x = ev.x;
                helpV2.y = ev.y;
                var b = _this.transform.ContainsCanvasPoint(helpV2);

                if (b)
                {
                    if (ev.type == gd3d.event.PointEventEnum.PointDown)
                    {
                        _this._downInThis = true;

                        let pd = gd3d.event.UIEventEnum.PointerDown;
                        if (_this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pd]) > 0)
                        {
                            ev.eated = true;
                            _this.UIEventer.EmitEnum(pd, ev);
                        }
                        _this.downPointV2.x = ev.x;
                        _this.downPointV2.y = ev.y;
                        _this.isMovedLimit = false;
                    }
                    else if (ev.type == gd3d.event.PointEventEnum.PointHold && _this._downInThis)
                    {
                        if (_this._dragOut == true)
                        {
                            _this._dragOut = false;
                        }
                        if (!_this.isMovedLimit)
                        {
                            _this.isMovedLimit = gd3d.math.vec2Distance(helpV2, _this.downPointV2) > _this.movedLimit;
                        }
                    }
                    else if (ev.type == gd3d.event.PointEventEnum.PointUp && _this._downInThis)
                    {
                        _this._downInThis = false;

                        let pu = gd3d.event.UIEventEnum.PointerUp;
                        if (_this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pu]) > 0)
                        {
                            ev.eated = true;
                            _this.UIEventer.EmitEnum(pu, ev);
                        }

                        let pc: gd3d.event.UIEventEnum;
                        if (Date.now() - time < 300)
                        {
                            pc = gd3d.event.UIEventEnum.PointerDoubleClick;
                        } else
                        {
                            pc = gd3d.event.UIEventEnum.PointerClick;
                        }


                        if (!_this.isMovedLimit && _this.UIEventer.listenerCount(gd3d.event.UIEventEnum[pc]) > 0)
                        {
                            ev.eated = true;
                            _this.UIEventer.EmitEnum(pc, ev);
                        }
                        time = Date.now();

                    }
                }
                else
                {
                    if (ev.type == gd3d.event.PointEventEnum.PointUp)
                    {//在区域外抬起
                        _this._downInThis = false;
                    }
                    else if (ev.type == gd3d.event.PointEventEnum.PointHold && _this._downInThis)
                    {
                        if (_this._dragOut == false)
                        {
                            _this._dragOut = true;
                        }
                    }
                }
            }
        }
    }



}