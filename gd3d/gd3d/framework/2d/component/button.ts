/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    let helpV2 = new gd3d.math.vector2();
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 按钮变换类型
     * @version egret-gd3d 1.0
     */
    export enum TransitionType
    {
        None,
        ColorTint,
        SpriteSwap
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d按钮组件
     * @version egret-gd3d 1.0
     */
    @reflect.node2DComponent
    export class button implements I2DComponent ,event.IUIEventer
    {
        static readonly ClassName:string="button";

        private _transition: TransitionType = TransitionType.ColorTint;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 按钮变换类型
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        get transition()
        {
            return this._transition;
        }
        set transition(transition: TransitionType)
        {
            this._transition = transition;
            if (this._targetImage != null)
            {
                if (transition == TransitionType.ColorTint)
                {
                    this._targetImage.color = this.normalColor;
                }
                else
                {
                    this._targetImage.color = this._originalColor;
                }
            }
        }

        private _originalColor: math.color;
        private _originalSprite: sprite;
        @gd3d.reflect.Field("string")
        private _origianlSpriteName:string ="";
        @gd3d.reflect.Field("string")
        private _pressedSpriteName:string ="";


        private _targetImage: image2D;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认显示图像
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("reference",null,"image2D")
        get targetImage()
        {
            return this._targetImage;
        }
        set targetImage(graphic: image2D)
        {
            if (this._targetImage != null)
            {
                this._targetImage.color = this._originalColor;
            }
            if (graphic != null)
            {
                this._originalColor = graphic.color;
                this._originalSprite = graphic.sprite;
                if(graphic.sprite)
                    this._origianlSpriteName = graphic.sprite.getName();
                if (this._transition == TransitionType.ColorTint)
                {
                    graphic.color = this.normalColor;
                }
            }
            else
            {
                this._originalColor = null;
                this._originalSprite = null;
            }
            this._targetImage = graphic;
        }

        private _pressedSprite: sprite;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 按下时要显示的sprite
         * @version egret-gd3d 1.0
         */
        get pressedGraphic()
        {
            return this._pressedSprite;
        }
        set pressedGraphic(sprite: sprite)
        {
            this._pressedSprite = sprite;
            if(sprite != null){
                this._pressedSpriteName = sprite.getName();
            }
        }

        private _normalColor: math.color = new math.color(1, 1, 1, 1);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 正常的显示颜色
         * @version egret-gd3d 1.0
         */
        @reflect.Field("color")
        @reflect.UIStyle("color")
        get normalColor()
        {
            return this._normalColor;
        }
        set normalColor(color: math.color)
        {
            this._normalColor = color;
            if (this._targetImage != null && this.transition == TransitionType.ColorTint)
            {
                this._targetImage.color = color;
            }
        }

        private _pressedColor: math.color = new math.color(0.5, 0.5, 0.5, 1);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 按下后的颜色
         * @version egret-gd3d 1.0
         */
        @reflect.Field("color")
        @reflect.UIStyle("color")
        get pressedColor()
        {
            return this._pressedColor;
        }
        set pressedColor(color: math.color)
        {
            this._pressedColor = color;
        }

        private _fadeDuration: number = 0.1;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 颜色淡出持续时间
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        get fadeDuration()
        {
            return this._fadeDuration;
        }
        set fadeDuration(duration: number)
        {
            this._fadeDuration = duration;
        }

        /**
         * @private
         */
        start()
        {
        }
        onPlay(){

        }

        /**
         * @private
         */
        update(delta: number)
        {
            // math.colorLerp();
        }
        transform: transform2D;
        /**
         * @private
         */
        remove()
        {
            this._targetImage = null;
            this.transform = null;
            this._normalColor = null;
            this._originalColor = null;
            this._pressedColor = null;
            if(this.pressedGraphic) this.pressedGraphic.unuse(true);
        }
        
        private downPointV2 = new gd3d.math.vector2();
        private isMovedLimit = false; //point 移动范围是否超出限制值
        private readonly movedLimit = 0.02; //point 移动范围限制值
        /**
         * @private
         */
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean)
        {
            //oncap==true 是捕获阶段，一般的行为，只在pop阶段处理
            if (oncap == false)
            {
                helpV2.x = ev.x;
                helpV2.y = ev.y;
                var b = this.transform.ContainsCanvasPoint(helpV2);

                if (b)
                {
                    if (ev.type == event.PointEventEnum.PointDown)
                    {
                        this._downInThis = true;
                        this.showPress();
                        let pd = event.UIEventEnum.PointerDown;
                        if(this.UIEventer.listenerCount(event.UIEventEnum[pd]) > 0){
                            ev.eated = true;
                            this.UIEventer.EmitEnum(pd,ev);
                        }
                        this.downPointV2.x = ev.x;
                        this.downPointV2.y = ev.y;
                        this.isMovedLimit = false;
                    }
                    else if (ev.type == event.PointEventEnum.PointHold && this._downInThis)
                    {
                        if (this._dragOut == true)
                        {
                            this._dragOut = false;
                            this.showPress();
                        }
                        if(!this.isMovedLimit){
                            this.isMovedLimit = gd3d.math.vec2Distance(helpV2,this.downPointV2) > this.movedLimit;
                        }
                    }
                    else if (ev.type == event.PointEventEnum.PointUp && this._downInThis)
                    {
                        this._downInThis = false;
                        this.showNormal();
                        let pu = event.UIEventEnum.PointerUp;
                        if(this.UIEventer.listenerCount(event.UIEventEnum[pu]) > 0){
                            ev.eated = true;
                            this.UIEventer.EmitEnum(pu,ev);
                        }
                        
                        //this.onClick.excute();
                        let pc = event.UIEventEnum.PointerClick;
                        if(!this.isMovedLimit && this.UIEventer.listenerCount(event.UIEventEnum[pc]) > 0){
                            ev.eated = true;
                            this.UIEventer.EmitEnum(pc,ev);
                        }
                    }
                }
                else
                {
                    if (ev.type == event.PointEventEnum.PointUp)
                    {//在区域外抬起
                        this._downInThis = false;
                    }
                    else if (ev.type == event.PointEventEnum.PointHold && this._downInThis)
                    {
                        if (this._dragOut == false)
                        {
                            this._dragOut = true;
                            this.showNormal();
                        }
                    }
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 点击事件
         * @version egret-gd3d 1.0
         */
        //onClick: UIEvent = new UIEvent();
        private UIEventer: event.UIEvent = new event.UIEvent();

        /**
        * 添加UI事件监听者
        * @param eventEnum 事件类型
        * @param func 事件触发回调方法 (Warn: 不要使用 func.bind() , 它会导致相等判断失败)
        * @param thisArg 回调方法执行者
        */
        addListener(eventEnum: event.UIEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.UIEventer.OnEnum(eventEnum,func,thisArg);
        }
        /**
         * 移除事件监听者
         * @param event 事件类型
         * @param func 事件触发回调方法
         * @param thisArg 回调方法执行者
         */
        removeListener(eventEnum: event.UIEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.UIEventer.RemoveListener(event.UIEventEnum[eventEnum],func,thisArg);
        }

        private _downInThis = false;
        private _dragOut = false;

        /**
         * @private
         */
        private showNormal()
        {
            if (this.transition == TransitionType.ColorTint)
            {
                this.changeColor(this._normalColor);
            }
            else if (this.transition == TransitionType.SpriteSwap)
            {
                if(!this._originalSprite){
                    this._originalSprite = this.tryGetSprite(this._origianlSpriteName);
                }
                this.changeSprite(this._originalSprite);
            }
        }

        
        /**
         * @private
         */
        private showPress()
        {
            if(this.transition == TransitionType.None){
                return;
            }else if (this.transition == TransitionType.ColorTint)
            {
                this.changeColor(this._pressedColor);
            }
            else if (this.transition == TransitionType.SpriteSwap)
            {
                if (this._targetImage != null && this._targetImage.sprite != null && this._originalSprite == null){
                    this._originalSprite = this._targetImage.sprite;
                }
                if(!this._pressedSprite){
                    this._pressedSprite = this.tryGetSprite(this._pressedSpriteName);
                }
                this.changeSprite(this._pressedSprite);
            }
        }

        private tryGetSprite(spriteName:string){
            let temp = this.transform.canvas.assetmgr.mapNamed[spriteName];
            if(temp != null){
                let tsprite = this.transform.canvas.assetmgr.getAssetByName(spriteName) as gd3d.framework.sprite;
                if(tsprite)   return tsprite;
            }
        }

        /**
         * @private
         */
        private changeColor(targetColor: math.color): void
        {
            if (this._targetImage != null)
            {
                this._targetImage.color = targetColor;
                this._targetImage.transform.markDirty();
            }
        }

        /**
         * @private
         */
        private changeSprite(sprite: sprite)
        {
            if(sprite == null) return;
            if (this._targetImage != null)
            {
                this._targetImage.sprite = sprite;
                this._targetImage.transform.markDirty();
            }
        }
    }
}