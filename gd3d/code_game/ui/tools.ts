namespace Game.ui
{

    export interface ILabelOption
    {
        name: string,
        text?: string,
        assetMgr: gd3d.framework.assetMgr
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
        //一个输入框
        let iptFrame_t = new gd3d.framework.transform2D;
        iptFrame_t.width = option.width || 120;
        iptFrame_t.height = option.height || 30;
        iptFrame_t.pivot.x = 0;
        iptFrame_t.pivot.y = 0;
        iptFrame_t.localTranslate.x = option.x || 0;
        iptFrame_t.localTranslate.y = option.y || 0;

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

        createLabel({
            owner: btn_t, text: option.text, assetMgr: option.assetMgr,
            name: `lib_${option.name}`, fontcolor: option.fontcolor,
            x: 55,
            y: -30
        })


        return btn_b;
    }
}