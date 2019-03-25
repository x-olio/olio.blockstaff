/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d文本输入框
     * @version egret-gd3d 1.0
     */
    @reflect.node2DComponent
    export class inputField implements I2DComponent
    {
        static readonly ClassName:string="inputField";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 当前组件的2d节点
         * @version egret-gd3d 1.0
         */
        transform: transform2D;
        
        private _frameImage: image2D;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 底框显示图像
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("reference",null,"image2D")
        get frameImage()
        {
            return this._frameImage;
        }
        set frameImage(frameImg : image2D){
            this._frameImage = frameImg;
        }

        private customRegexStr:string = "";
        private beFocus:boolean = false;
        private inputElement:HTMLInputElement;
        private _text: string = "";
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 文字内容
         * @version egret-gd3d 1.0
         */
        get text(): string
        {
            return this._text;
        }
        

        private _charlimit:number = 0;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 限制输入字符数
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        get characterLimit(){return this._charlimit;}
        set characterLimit(charlimit:number){
            this._charlimit = parseInt(`${charlimit}`);
            this._charlimit = isNaN(this._charlimit) || this._charlimit< 0 ? 0: this._charlimit;
        }

        private _lineType :lineType = lineType.SingleLine;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 文本行格式
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
         get LineType(){  return this._lineType; }
         set LineType(lineType:lineType) {
             this._lineType = lineType;
         }

         private _contentType :number = contentType.None;
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 文本内容格式
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        get ContentType(){  return this._contentType; }
        set ContentType(contentType:number) {
            this._contentType = contentType;
        }
        
        private _textLable : label;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 输入内容label
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("reference",null,"label")
        get TextLabel():label{

            return this._textLable;
        }
        set TextLabel(textLabel:label){
            textLabel.text = this._text;
            this._textLable = textLabel;
        }

        private _placeholderLabel:label;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 输入内容label
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("reference",null,"label")
        get PlaceholderLabel():label{

            return this._placeholderLabel;
        }
        set PlaceholderLabel(placeholderLabel:label){
            if(placeholderLabel.text ==null || placeholderLabel.text == "")
                placeholderLabel.text = "Enter Text...";
            this._placeholderLabel = placeholderLabel;
        }

        /**
         * 刷新布局
         */
        private layoutRefresh()
        {
            this.inputElmLayout();
            
            if(this._placeholderLabel){
                if(this._placeholderLabel.transform.width != this.transform.width)
                    this._placeholderLabel.transform.width = this.transform.width;
                if(this._placeholderLabel.transform.height != this.transform.height)
                    this._placeholderLabel.transform.height = this.transform.height;
            }
            if(this._textLable){
                if(this._textLable.transform.width != this.transform.width)
                    this._textLable.transform.width = this.transform.width;
                if(this._textLable.transform.height != this.transform.height)
                    this._textLable.transform.height = this.transform.height;
            }

        }

        /**
         * @private
         */
        start()
        {
            this.inputElement = <HTMLInputElement>document.createElement("Input");
            this.inputElement.style.opacity = "0";
            this.inputElement.style.visibility = "hidden";
            if (this.transform.canvas.scene){
                let htmlCanv = this.transform.canvas.scene.webgl.canvas;
                if(htmlCanv)
                htmlCanv.parentElement.appendChild(this.inputElement);
            }
            
            this.inputElement.onblur = (e)=>{
                this.beFocus = false;
            }

            this.inputElement.onfocus = (e)=>{
                this.beFocus = true;
            }

            this.inputElmLayout();
        }

        onPlay(){

        }
        
         /**
         * @private
         * inputElement 位置、宽高刷新
         */
        private inputElmLayout(){
            if(this.inputElement == null )   return;
            let pos = this.transform.getWorldTranslate();
            let cssStyle:CSSStyleDeclaration = this.inputElement.style;
            if(pos.x +"px" == cssStyle.left && pos.y + "px" == cssStyle.top && this.transform.width + "px" == cssStyle.width && this.transform.height + "px" == cssStyle.height)
                return;
            
            let scale = this.transform.canvas.scene.app.canvasClientHeight/this.transform.canvas.pixelHeight;
            cssStyle.position = "absolute";
            cssStyle.left = pos.x * scale + "px";
            cssStyle.top = pos.y * scale + "px";

            cssStyle.width = this.transform.width * scale + "px";
            cssStyle.height = this.transform.height * scale + "px";
        }

        /**
         * @private
         * 输入文本刷新
         */
        private textRefresh(){
            if(!this.beFocus || !this._textLable || !this._placeholderLabel || !this.inputElement || this._text == this.inputElement.value) return;

            if(this._charlimit>0 && this.inputElement.value.length >= this._charlimit ){
                if(this.inputElement.value != this._text)
                    if(this.inputElement.value.length > this._text.length){
                        this.inputElement.value = this._text;
                    }else{
                        this._text = this.inputElement.value;
                    }
                return;
            }

            this._text = this.inputElement.value;
            if (this._contentType == contentType.Custom)
            {
                if(this.customRegexStr != null && this.customRegexStr != "")
                    this._text = this._text.replace(this.customRegexStr, '');
            }else{
                if (this._contentType == contentType.None)
                {

                }
                //英文字母，数字，汉字，下划线
                else if ((this._contentType & contentType.Number) && (this._contentType & contentType.Word) && (this._contentType & contentType.ChineseCharacter) && (this._contentType & contentType.Underline)) {
                    this._text = this._text.replace(/^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/ig, '');
                }
                //英文字母，数字，下划线
                else if ((this._contentType & contentType.Number) && (this._contentType & contentType.Word) && (this._contentType & contentType.Underline))
                {
                    this._text = this._text.replace(/[^\w\.\/]/ig, '');
                }
                //数字，字符
                else if ((this._contentType & contentType.Number) && (this._contentType & contentType.Word))
                {
                    this._text = this._text.replace(/[^(A-Za-z0-9)]/ig, '');
                }
                //汉字，字符
                else if ((this._contentType & contentType.ChineseCharacter) && (this._contentType & contentType.Word))
                {
                    this._text = this._text.replace(/[^(A-Za-z\u4E00-\u9FA5)]/ig, '');
                }
                //数字
                else if (this._contentType == contentType.Number)
                {
                    this._text = this._text.replace(/\D+/g, '');
                }
                //汉字
                else if (this._contentType == contentType.ChineseCharacter)
                {
                    this._text = this._text.replace(/[^\u4E00-\u9FA5]/g, '');
                }

            }
            this.inputElement.value = this._text;
            if(this._textLable){
                this._textLable.text = this._text;
                if(this.ContentType == contentType.PassWord)
                    this._textLable.text = this._textLable.text.replace(/(.\**)/g,"*");
                this.filterContentText();
            }

            if(this._text == ""){
                this._placeholderLabel.transform.visible = true;
                this._textLable.transform.visible = false;
            }else{
                this._placeholderLabel.transform.visible = false;
                this._textLable.transform.visible = true;
            }
        }

        private filterContentText(){
            if(!this._textLable || this._text == null) return;
            let lab = this._textLable;
            let rate = lab.fontsize / lab.font.lineHeight;
            let font = lab.font;
            let addw = 0;
            let addh = 0;
            let str = "";
            switch(this._lineType){
                case lineType.SingleLine:
                for(var i=lab.text.length - 1 ;i>=0 ;i--){
                    let c = lab.text.charAt(i);
                    let cinfo = font.cmap[c];
                    if(!cinfo){
                        console.warn(`can't find character "${c}" in ${font.getName()} Font`);
                        continue;
                    }
                    addw += cinfo.xAddvance * rate;

                    if(addw > lab.transform.width ){
                        lab.text = str;
                        break;
                    }
                    str = lab.text[i] + str;
                }

                break;
                case lineType.MultiLine:
                let fristline = true;
                addh += lab.fontsize * lab.linespace;
                for(var i=lab.text.length - 1 ;i>=0 ;i--){
                    let c = lab.text.charAt(i);
                    let cinfo = font.cmap[c];
                    if(!cinfo){
                        console.warn(`can't find character "${c}" in ${font.getName()} Font`);
                        continue;
                    }
                    addw += cinfo.xAddvance * rate;

                    if(addw > lab.transform.width ){
                        addw = 0;
                        fristline = false;
                        addh += lab.fontsize * lab.linespace;
                    }
                    if(!fristline && addh > lab.transform.height){
                        lab.text = str;
                        break;
                    }
                    str = lab.text[i] + str;
                }
                break;
            }

        }

        /**
         * @private
         */
        update(delta: number)
        {
            this.layoutRefresh();
            this.textRefresh();
        }

        /**
         * @private
         */
        remove()
        {
            this._placeholderLabel = null;
            this._textLable = null;
            this.transform = null;
            this._frameImage = null;
            if(this.inputElement) {
                this.inputElement.disabled = false;
                this.inputElement.value = "";
                this.inputElement.style.visibility = "hidden";
                if(this.inputElement.parentElement)
                    this.inputElement.parentElement.removeChild(this.inputElement);
                this.inputElement = null;
            }

        }
        
        /**
         * @private
         */
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean)
        {
            if(oncap == false ){
                if(ev.type != event.PointEventEnum.PointDown )    return;
                
                var b = this.transform.ContainsCanvasPoint(new math.vector2(ev.x, ev.y));
                if(b){
                    this.inputElement.style.visibility = "visible";
                    this.inputElement.focus();
                }else{
                    if(this.beFocus)
                        this.inputElement.blur();

                    if(this.inputElement.style.visibility != "hidden")
                        this.inputElement.style.visibility = "hidden";
                }       
            }
        }
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 文本行显示方式
     * @version egret-gd3d 1.0
     */
    export enum lineType
    {
        SingleLine,
        MultiLine,
    }
    
    /**
     * @language zh_CN
     * @classdesc
     * 文本内容类型
     * @version egret-gd3d 1.0
     */
    export enum contentType
    {
        None = 0,
        Number = 1,//数字
        Word = 2,//字母
        Underline = 4,//下划线
        ChineseCharacter = 8,//中文字符
        NoneChineseCharacter = 16,//没有中文字符
        Email = 32,//邮件
        PassWord = 64,//密码
        Custom = 128,//自定义
    }
}