/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d图片组件
     * @version egret-gd3d 1.0
     */
    @reflect.node2DComponent
    @reflect.nodeRender
    export class image2D implements IRectRenderer
    {
        static readonly ClassName:string="image2D";

        /**
         * @private
         */
        constructor()
        {
            gd3d.io.enumMgr.enumMap["ImageType"] = ImageType;
            gd3d.io.enumMgr.enumMap["FillMethod"] = FillMethod;
        }

        private _unitLen = 13; 
        //2d使用固定的顶点格式
        //pos[0,1,2]color[3,4,5,6]uv[7,8]color2[9,10,11,12] length=13
        private datar: number[] = [
            0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
            0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];

        private _sprite: sprite;
        private needRefreshImg = false;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 颜色
         * @version egret-gd3d 1.0
         */
        @reflect.Field("color")
        @reflect.UIStyle("color")
        color: math.color = new math.color(1.0, 1.0, 1.0, 1.0);

        private static readonly defUIShader = `shader/defui`;  //非mask 使用shader
        private static readonly defMaskUIShader = `shader/defmaskui`; //mask 使用shader

        private _CustomShaderName = ``;//自定义UIshader
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置rander Shader名字
         * @version egret-gd3d 1.0
         */
        setShaderByName(shaderName:string){
            this._CustomShaderName = shaderName;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取rander 的材质
         * @version egret-gd3d 1.0
         */
        getMaterial(){
            if(!this._uimat){
                return this.uimat;
            }
            return this._uimat;
        }

        private _darwRect : gd3d.math.rect = new gd3d.math.rect();

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取渲染绘制矩形边界
         * @version egret-gd3d 1.0
         */
        getDrawBounds(){
            return this._darwRect;
        }

        /**
         * @private
         * ui默认材质
         */
        private _uimat: material;
        private get uimat(){
            let assetmgr = this.transform.canvas.assetmgr;
            if(!assetmgr) return this._uimat;

            this.searchTexture();
            if (this._sprite  && this._sprite.texture){
                let pMask = this.transform.parentIsMask;
                let mat = this._uimat;
                let rectTag = "";
                let uiTag = "_ui";
                if(pMask){
                    let prect = this.transform.maskRect;
                    rectTag = `mask(${prect.x}_${prect.y}_${prect.w}_${prect.h})`; //when parentIsMask,can't multiplexing material , can be multiplexing when parent equal
                }
                let matName =this._sprite.texture.getName() + uiTag + rectTag;
                if(!mat || mat.getName() != matName){
                    if(mat) mat.unuse(); 
                    mat = assetmgr.getAssetByName(matName) as gd3d.framework.material;
                    if(mat) mat.use();
                }
                if(!mat){
                    mat = new material(matName);
                    let sh = assetmgr.getShader(this._CustomShaderName);
                    sh = sh? sh : assetmgr.getShader(pMask? image2D.defMaskUIShader : image2D.defUIShader);
                    mat.setShader(sh);
                    mat.use();
                    this.needRefreshImg = true;
                }
                this._uimat = mat;
            }
            return this._uimat;
        }

        private _imageType: ImageType = ImageType.Simple;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 图片显示模式
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        @reflect.UIStyle("enum")
        get imageType()
        {
            return this._imageType;
        }
        set imageType(type: ImageType)
        {
            this._imageType = type;
            this.prepareData();
            if (this.transform != null)
                this.transform.markDirty();
        }

        private _fillMethod: FillMethod = FillMethod.Horizontal;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 图片填充方式
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        @reflect.UIStyle("enum")
        get fillMethod()
        {
            return this._fillMethod;
        }
        set fillMethod(method: FillMethod)
        {
            this._fillMethod = method;
            this.prepareData();
            if (this.transform != null)
                this.transform.markDirty();
        }

        private _fillAmmount: number = 1;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 填充率
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        get fillAmmount()
        {
            return this._fillAmmount;
        }
        set fillAmmount(ammount: number)
        {
            this._fillAmmount = ammount;
            if (this.transform != null)
                this.transform.markDirty();
            }

        transform: transform2D;
            
        // /**
        //  * @public
        //  * @language zh_CN
        //  * @classdesc
        //  * 设置图片
        //  * @param texture 图片
        //  * @param border 切片信息
        //  * @param rect 显示范围
        //  * @version egret-gd3d 1.0
        //  */
        // setTexture(texture: texture, border?: math.border, rect?: math.rect)
        // {   //image 不应该有setTexture
        //     this.needRefreshImg = true;
        //     if(this.sprite)
        //     {
        //         this.sprite.unuse();
        //     }
        //     var _sprite = new sprite();
        //     _sprite.texture = texture;
        //     if (border != null)
        //         _sprite.border = border;
        //     else
        //         _sprite.border = new math.border(0, 0, 0, 0);
        //     if (rect != null)
        //         _sprite.rect = rect;
        //     else
        //         _sprite.rect = new math.rect(0, 0, texture.glTexture.width, texture.glTexture.height);

        //     this.sprite = _sprite;
        //     this.sprite.use();
        //     this.prepareData();
        //     if (this.transform != null){
        //         this.transform.markDirty();
        //         this.updateTran();
        //     }
        // }
        
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 精灵
         * @version egret-gd3d 1.0
         */
        public set sprite(sprite: sprite)
        {
            if(sprite == this._sprite) return;
            
            if(this._sprite)
            {
                this._sprite.unuse();
            }
            if(!this._sprite || this._sprite.texture != sprite.texture ){
                this.needRefreshImg = true;
            }
            
            this._sprite = sprite;
            if(sprite){
                // this._imageBorder.l = sprite.border.l;
                // this._imageBorder.t = sprite.border.t;
                // this._imageBorder.r = sprite.border.r;
                // this._imageBorder.b = sprite.border.b;
                this._sprite.use();
                this._spriteName = this._sprite.getName();
                this.prepareData();
                if (this.transform != null){
                    this.transform.markDirty();
                    this.updateTran();
                }
            }else{
                this._spriteName = "";
            }

        }
        public get sprite()
        {
            return this._sprite;
        }

        @gd3d.reflect.Field("string")
        private _spriteName:string = "";
        
        
        @reflect.Field("border")
        private _imageBorder = new math.border();
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 9宫格边距
         * @version egret-gd3d 1.0
         */
        get imageBorder(){
            return this._imageBorder;
        }

        /**
         * @private
         */
        render(canvas: canvas)
        {
            let mat = this.uimat;
            if(!mat) return;

            let img ;
            if (this._sprite  && this._sprite.texture )
            {
                img = this._sprite.texture;
            }


            if(img){
                if(this.needRefreshImg){
                    mat.setTexture("_MainTex", img);
                    this.needRefreshImg = false;
                }
                
                if(this.transform.parentIsMask){
                    if(!this._cacheMaskV4 ) this._cacheMaskV4 = new math.vector4();
                    let rect = this.transform.maskRect;
                    if(this._cacheMaskV4.x != rect.x || this._cacheMaskV4.y != rect.y || this._cacheMaskV4.w != rect.w || this._cacheMaskV4.z != rect.h){
                        this._cacheMaskV4.x = rect.x; this._cacheMaskV4.y = rect.y;this._cacheMaskV4.z = rect.w;this._cacheMaskV4.w = rect.h;
                        mat.setVector4("_maskRect",this._cacheMaskV4);
                    }
                }
                
                canvas.pushRawData(mat, this.datar);
            }

        }

        //资源管理器中寻找 指定的贴图资源
        private searchTexture(){
            if(this._sprite) return;
            let assetmgr = this.transform.canvas.assetmgr;
            let temp = assetmgr.mapNamed[this._spriteName];
            let tspr:sprite;
            if(temp != null){
                tspr = assetmgr.getAssetByName(this._spriteName) as gd3d.framework.sprite;
            }else{
                if(assetmgr.mapDefaultSprite[this._spriteName]) //找默认资源
                    tspr = assetmgr.getDefaultSprite(this._spriteName);
            }
            if(tspr){
                this.sprite = tspr;
                this.needRefreshImg = true;
                return;  //捕获到目标sprite后强制 下一帧渲染 （防止 transform树同步延迟 导致 右上角ghostShadow 问题）
            }
        }

        private _cacheMaskV4:math.vector4;
        
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
        }

        /**
         * @private
         */
        remove()
        {
            if(this._sprite) this._sprite.unuse(true);
            if(this._uimat) this._uimat.unuse(true);
            this.datar.length = 0;
            this.transform = null;
            this._imageBorder = null;
        }

        /**
         * @private
         */
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean)
        {

        }

        /**
         * @private
         * 根据显示方式来准备数据
         */
        private prepareData()
        {
            if (this._sprite == null) return;
            let urange = this._sprite.urange;
            let vrange = this._sprite.vrange;
            let ulen = urange.y - urange.x;
            let vlen = vrange.y - vrange.x;
            switch (this._imageType)
            {
                case ImageType.Simple:
                    this.datar = [
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1
                    ];
                    break;
                case ImageType.Sliced:
                    this.datar = [
                        //topleft
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //top
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //topright
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //left
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //center
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //right
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //bottomleft
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //bottom
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                        //bottomright
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                    ];
                    break;
                case ImageType.Tiled:
                    this.datar = [
                        //0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        //0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        //0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        //0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        //0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        //0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1
                    ];
                    break;
                case ImageType.Filled:
                    let halfu = urange.x + 0.5 * ulen;
                    let halfv = vrange.x + 0.5 * vlen;
                    switch (this._fillMethod)
                    {
                        case FillMethod.Horizontal:
                        case FillMethod.Vertical:
                        case FillMethod.Radial_90:
                            this.datar = [
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1
                            ];
                            break;
                        case FillMethod.Radial_180:
                            this.datar = [
                                //左半边
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                                //右半边
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1
                            ];
                            break;
                        case FillMethod.Radial_360:
                            this.datar = [
                                //左上
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, halfv, 1, 1, 1, 1,
                                //右上
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, halfv, 1, 1, 1, 1,
                                //左下
                                0, 0, 0, 1, 1, 1, 1, urange.x, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                                //右下
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, halfv, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1,
                                0, 0, 0, 1, 1, 1, 1, halfu, vrange.y, 1, 1, 1, 1,
                            ];
                            break;
                    }
                    break;
            }

        }

        /**
         * @private
         */
        updateTran()
        {
            var m = this.transform.getWorldMatrix();

            var l = -this.transform.pivot.x * this.transform.width;
            var r = this.transform.width + l;
            var t = -this.transform.pivot.y * this.transform.height;
            var b = this.transform.height + t;

            var x0 = l * m.rawData[0] + t * m.rawData[2] + m.rawData[4];
            var y0 = l * m.rawData[1] + t * m.rawData[3] + m.rawData[5];
            var x1 = r * m.rawData[0] + t * m.rawData[2] + m.rawData[4];
            var y1 = r * m.rawData[1] + t * m.rawData[3] + m.rawData[5];
            var x2 = l * m.rawData[0] + b * m.rawData[2] + m.rawData[4];
            var y2 = l * m.rawData[1] + b * m.rawData[3] + m.rawData[5];
            var x3 = r * m.rawData[0] + b * m.rawData[2] + m.rawData[4];
            var y3 = r * m.rawData[1] + b * m.rawData[3] + m.rawData[5];


            if (this._sprite == null) return;
            switch (this._imageType)
            {
                case ImageType.Simple:
                    this.updateSimpleData(x0, y0, x1, y1, x2, y2, x3, y3);
                    break;
                case ImageType.Sliced:
                    this.updateSlicedData(x0, y0, x1, y1, x2, y2, x3, y3);
                    break;
                case ImageType.Tiled:
                    this.updateTiledData(x0, y0, x1, y1, x2, y2, x3, y3);
                    break;
                case ImageType.Filled:
                    this.updateFilledData(x0, y0, x1, y1, x2, y2, x3, y3);
                    break;
            }
            //主color
            let vertexCount = this.datar.length / this._unitLen;
            for (var i = 0; i < vertexCount; i++)
            {
                this.datar[i * this._unitLen + 3] = this.color.r;
                this.datar[i * this._unitLen + 4] = this.color.g;
                this.datar[i * this._unitLen + 5] = this.color.b;
                this.datar[i * this._unitLen + 6] = this.color.a;
            }

            //drawRect 
            this.min_x = Math.min(x0,x1,x2,x3,this.min_x);
            this.min_y = Math.min(y0,y1,y2,y3,this.min_y);
            this.max_x = Math.max(x0,x1,x2,x3,this.max_x);
            this.max_y = Math.max(y0,y1,y2,y3,this.max_y);
            this.calcDrawRect();
        }

        private min_x : number = Number.MAX_VALUE;
        private max_x : number = Number.MAX_VALUE * -1;
        private min_y : number = Number.MAX_VALUE;
        private max_y : number = Number.MAX_VALUE * -1;
        /** 计算drawRect */
        private calcDrawRect(){
            //drawBounds (y 轴反向)
            let canvas = this.transform.canvas;
            if(!canvas)return;
            let minPos = helpv2;
            minPos.x = this.min_x;
            minPos.y = this.max_y;
            canvas.ModelPosToCanvasPos(minPos,minPos);

            let maxPos = helpv2_1;
            maxPos.x = this.max_x;
            maxPos.y = this.min_y;
            canvas.ModelPosToCanvasPos(maxPos,maxPos);

            this._darwRect.x = minPos.x;
            this._darwRect.y = minPos.y;
            this._darwRect.w = maxPos.x - minPos.x;
            this._darwRect.h = maxPos.y - minPos.y;

            this.min_x = this.min_y = Number.MAX_VALUE;
            this.max_x = this.max_y = Number.MAX_VALUE * -1;
        }

        

        /**
         * @private
         * 更新quad的顶点数据
         */
        private updateQuadData(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, quadIndex = 0, mirror: boolean = false)
        {
            let _index: number = quadIndex * 6;
            if (!mirror)
            {
                this.datar[(_index + 0) * this._unitLen] = x0;
                this.datar[(_index + 0) * this._unitLen + 1] = y0;
                this.datar[(_index + 1) * this._unitLen] = x1;
                this.datar[(_index + 1) * this._unitLen + 1] = y1;
                this.datar[(_index + 2) * this._unitLen] = x2;
                this.datar[(_index + 2) * this._unitLen + 1] = y2;
                this.datar[(_index + 3) * this._unitLen] = x2;
                this.datar[(_index + 3) * this._unitLen + 1] = y2;
                this.datar[(_index + 4) * this._unitLen] = x1;
                this.datar[(_index + 4) * this._unitLen + 1] = y1;
                this.datar[(_index + 5) * this._unitLen] = x3;
                this.datar[(_index + 5) * this._unitLen + 1] = y3;
            }
            else
            {
                this.datar[(_index + 0) * this._unitLen] = x0;
                this.datar[(_index + 0) * this._unitLen + 1] = y0;
                this.datar[(_index + 1) * this._unitLen] = x1;
                this.datar[(_index + 1) * this._unitLen + 1] = y1;
                this.datar[(_index + 2) * this._unitLen] = x3;
                this.datar[(_index + 2) * this._unitLen + 1] = y3;
                this.datar[(_index + 3) * this._unitLen] = x0;
                this.datar[(_index + 3) * this._unitLen + 1] = y0;
                this.datar[(_index + 4) * this._unitLen] = x3;
                this.datar[(_index + 4) * this._unitLen + 1] = y3;
                this.datar[(_index + 5) * this._unitLen] = x2;
                this.datar[(_index + 5) * this._unitLen + 1] = y2;
            }
        }

        /**
         * @private
         * 更新常规数据
         */
        private updateSimpleData(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number)
        {
            this.updateQuadData(x0, y0, x1, y1, x2, y2, x3, y3);
        }

        /**
         * @private
         * 更新9宫数据
         */
        private updateSlicedData(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number)
        {
            let border = this._imageBorder;
            let rect = this._sprite.rect;

            //顶点
            let r1c1 = math.pool.new_vector2();
            let r1c4 = math.pool.new_vector2();
            let r4c1 = math.pool.new_vector2();
            let r4c4 = math.pool.new_vector2();

            let r1c2 = math.pool.new_vector2();
            let r1c3 = math.pool.new_vector2();
            let r2c1 = math.pool.new_vector2();
            let r3c1 = math.pool.new_vector2();

            let r2c2 = math.pool.new_vector2();
            let r2c3 = math.pool.new_vector2();
            let r2c4 = math.pool.new_vector2();
            let r3c2 = math.pool.new_vector2();
            let r3c3 = math.pool.new_vector2();
            let r3c4 = math.pool.new_vector2();
            let r4c2 = math.pool.new_vector2();
            let r4c3 = math.pool.new_vector2();

            //uv
            let r1c1_uv = math.pool.new_vector2();
            let r1c4_uv = math.pool.new_vector2();
            let r4c1_uv = math.pool.new_vector2();
            let r4c4_uv = math.pool.new_vector2();

            let r1c2_uv = math.pool.new_vector2();
            let r1c3_uv = math.pool.new_vector2();
            let r2c1_uv = math.pool.new_vector2();
            let r3c1_uv = math.pool.new_vector2();

            let r2c2_uv = math.pool.new_vector2();
            let r2c3_uv = math.pool.new_vector2();
            let r2c4_uv = math.pool.new_vector2();
            let r3c2_uv = math.pool.new_vector2();
            let r3c3_uv = math.pool.new_vector2();
            let r3c4_uv = math.pool.new_vector2();
            let r4c2_uv = math.pool.new_vector2();
            let r4c3_uv = math.pool.new_vector2();

            let help1 = math.pool.new_vector2();
            let help2 = math.pool.new_vector2();
            let help3 = math.pool.new_vector2();


            r1c1.x = x0;
            r1c1.y = y0;
            r1c4.x = x1;
            r1c4.y = y1;
            r4c1.x = x2;
            r4c1.y = y2;
            r4c4.x = x3;
            r4c4.y = y3;
            let width: number = math.vec2Distance(r1c1, r1c4);
            let height: number = math.vec2Distance(r1c1, r4c1);
            let urange = this._sprite.urange;
            let vrange = this._sprite.vrange;

            let l_vertex: number = (border.l) / this.transform.width;
            let r_vertex: number = (border.r) / this.transform.width;
            let t_vertex: number = (border.t) / this.transform.height;
            let b_vertex: number = (border.b) / this.transform.height;

            let l: number = (border.l) / rect.w * (urange.y - urange.x);
            let r: number = (border.r) / rect.w * (urange.y - urange.x);
            let t: number = (border.t) / rect.h * (vrange.y - vrange.x);
            let b: number = (border.b) / rect.h * (vrange.y - vrange.x);

            math.vec2Subtract(r1c4, r1c1, r1c2);
            math.vec2ScaleByNum(r1c2, l_vertex, r1c2);
            math.vec2Add(r1c2, r1c1, r1c2);

            math.vec2Subtract(r1c1, r1c4, r1c3);
            math.vec2ScaleByNum(r1c3, r_vertex, r1c3);
            math.vec2Add(r1c3, r1c4, r1c3);

            math.vec2Subtract(r4c1, r1c1, r2c1);
            math.vec2ScaleByNum(r2c1, t_vertex, r2c1);
            math.vec2Add(r2c1, r1c1, r2c1);

            math.vec2Subtract(r1c1, r4c1, r3c1);
            math.vec2ScaleByNum(r3c1, b_vertex, r3c1);
            math.vec2Add(r3c1, r4c1, r3c1);


            math.vec2Subtract(r1c2, r1c1, help1);
            math.vec2Subtract(r2c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r2c2);

            math.vec2Subtract(r1c3, r1c1, help1);
            math.vec2Subtract(r2c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r2c3);

            math.vec2Subtract(r1c4, r1c1, help1);
            math.vec2Subtract(r2c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r2c4);

            math.vec2Subtract(r1c2, r1c1, help1);
            math.vec2Subtract(r3c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r3c2);

            math.vec2Subtract(r1c3, r1c1, help1);
            math.vec2Subtract(r3c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r3c3);

            math.vec2Subtract(r1c4, r1c1, help1);
            math.vec2Subtract(r3c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r3c4);

            math.vec2Subtract(r1c2, r1c1, help1);
            math.vec2Subtract(r4c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r4c2);

            math.vec2Subtract(r1c3, r1c1, help1);
            math.vec2Subtract(r4c1, r1c1, help2);
            math.vec2Add(help1, help2, help3);
            math.vec2Add(help3, r1c1, r4c3);

            r1c1_uv.x = urange.x;
            r1c1_uv.y = vrange.x;
            r1c2_uv.x = l + urange.x;
            r1c2_uv.y = vrange.x;
            r1c3_uv.x = urange.y - r;
            r1c3_uv.y = vrange.x;
            r1c4_uv.x = urange.y;
            r1c4_uv.y = vrange.x;
            r2c1_uv.x = urange.x;
            r2c1_uv.y = t + vrange.x;
            r2c2_uv.x = l + urange.x;
            r2c2_uv.y = t + vrange.x;
            r2c3_uv.x = urange.y - r;
            r2c3_uv.y = t + vrange.x;
            r2c4_uv.x = urange.y;
            r2c4_uv.y = t + vrange.x;
            r3c1_uv.x = urange.x;
            r3c1_uv.y = vrange.y - b;
            r3c2_uv.x = l + urange.x;
            r3c2_uv.y = vrange.y - b;
            r3c3_uv.x = urange.y - r;
            r3c3_uv.y = vrange.y - b;
            r3c4_uv.x = urange.y;
            r3c4_uv.y = vrange.y - b;
            r4c1_uv.x = urange.x;
            r4c1_uv.y = vrange.y;
            r4c2_uv.x = l + urange.x;
            r4c2_uv.y = vrange.y;
            r4c3_uv.x = urange.y - r;
            r4c3_uv.y = vrange.y;
            r4c4_uv.x = urange.y;
            r4c4_uv.y = vrange.y;


            let vertexs = [r1c1, r1c2, r1c3, r1c4, r2c1, r2c2, r2c3, r2c4, r3c1, r3c2, r3c3, r3c4, r4c1, r4c2, r4c3, r4c4];
            let uvs = [r1c1_uv, r1c2_uv, r1c3_uv, r1c4_uv, r2c1_uv, r2c2_uv, r2c3_uv, r2c4_uv, r3c1_uv, r3c2_uv, r3c3_uv, r3c4_uv, r4c1_uv, r4c2_uv, r4c3_uv, r4c4_uv];

            let partVertexs: math.vector2[];
            let partUVs: math.vector2[];
            for (let i = 0; i < 9; i++)
            {
                let r: number = Math.floor(i / 3);
                let c: number = i % 3;

                //根据行列获取到9宫的当前部分的四个顶点和uv
                partVertexs = [vertexs[0 + c + r * 4], vertexs[1 + c + r * 4], vertexs[4 + c + r * 4], vertexs[5 + c + r * 4]];
                partUVs = [uvs[0 + c + r * 4], uvs[1 + c + r * 4], uvs[4 + c + r * 4], uvs[5 + c + r * 4]];

                this.updateQuadData(partVertexs[0].x, partVertexs[0].y, partVertexs[1].x, partVertexs[1].y, partVertexs[2].x, partVertexs[2].y, partVertexs[3].x, partVertexs[3].y, i);

                this.datar[(0 + i * 6) * this._unitLen + 7] = partUVs[0].x;
                this.datar[(0 + i * 6) * this._unitLen + 8] = partUVs[0].y;
                this.datar[(1 + i * 6) * this._unitLen + 7] = partUVs[1].x;
                this.datar[(1 + i * 6) * this._unitLen + 8] = partUVs[1].y;
                this.datar[(2 + i * 6) * this._unitLen + 7] = partUVs[2].x;
                this.datar[(2 + i * 6) * this._unitLen + 8] = partUVs[2].y;
                this.datar[(3 + i * 6) * this._unitLen + 7] = partUVs[2].x;
                this.datar[(3 + i * 6) * this._unitLen + 8] = partUVs[2].y;
                this.datar[(4 + i * 6) * this._unitLen + 7] = partUVs[1].x;
                this.datar[(4 + i * 6) * this._unitLen + 8] = partUVs[1].y;
                this.datar[(5 + i * 6) * this._unitLen + 7] = partUVs[3].x;
                this.datar[(5 + i * 6) * this._unitLen + 8] = partUVs[3].y;

                partVertexs.length = 0;
                partUVs.length = 0;
            }

            math.pool.delete_vector2Array(vertexs);
            math.pool.delete_vector2Array(uvs);
            math.pool.delete_vector2Array([help1, help2, help3]);
        }

        /**
         * @private
         * 更新填充数据
         */
        private updateFilledData(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number)
        {
            let urange = this._sprite.urange;
            let vrange = this._sprite.vrange;
            let ulen = urange.y - urange.x;
            let vlen = vrange.y - vrange.x;
            let halfu = urange.x + 0.5 * ulen;
            let halfv = vrange.x + 0.5 * vlen;
            switch (this._fillMethod)
            {
                case FillMethod.Horizontal:
                case FillMethod.Vertical:
                case FillMethod.Radial_90:
                    if (this._fillMethod == FillMethod.Horizontal)
                    {
                        x1 = x1 - (1 - this.fillAmmount) * (x1 - x0);
                        y1 = y1 - (1 - this.fillAmmount) * (y1 - y0);
                        x3 = x3 - (1 - this.fillAmmount) * (x3 - x2);
                        y3 = y3 - (1 - this.fillAmmount) * (y3 - y2);

                        this.datar[1 * this._unitLen + 7] = urange.x + this.fillAmmount * ulen;
                        this.datar[4 * this._unitLen + 7] = urange.x + this.fillAmmount * ulen;
                        this.datar[5 * this._unitLen + 7] = urange.x + this.fillAmmount * ulen;
                    }
                    else if (this._fillMethod == FillMethod.Vertical)
                    {
                        x0 = x0 - (1 - this.fillAmmount) * (x0 - x2);
                        y0 = y0 - (1 - this.fillAmmount) * (y0 - y2);
                        x1 = x1 - (1 - this.fillAmmount) * (x1 - x3);
                        y1 = y1 - (1 - this.fillAmmount) * (y1 - y3);

                        this.datar[0 * this._unitLen + 8] = (vrange.y - this.fillAmmount * vlen);
                        this.datar[1 * this._unitLen + 8] = (vrange.y - this.fillAmmount * vlen);
                        this.datar[4 * this._unitLen + 8] = (vrange.y - this.fillAmmount * vlen);

                    }
                    else if (this._fillMethod == FillMethod.Radial_90)
                    {
                        if (this.fillAmmount >= 0.5)
                        {
                            let _fillRate = 2 * (1 - this.fillAmmount);
                            x0 = x0 - _fillRate * (x0 - x1);
                            y0 = y0 - _fillRate * (y0 - y1);

                            this.datar[0 * this._unitLen + 7] = urange.x + _fillRate * ulen;
                            this.datar[1 * this._unitLen + 8] = vrange.x;
                            this.datar[4 * this._unitLen + 8] = vrange.x;
                        }
                        else
                        {
                            let _fillRate = 2 * (0.5 - this.fillAmmount);
                            x1 = x1 - _fillRate * (x1 - x3);
                            y1 = y1 - _fillRate * (y1 - y3);
                            x0 = x1;
                            y0 = y1;

                            this.datar[0 * this._unitLen + 8] = vrange.x + _fillRate * vlen;
                            this.datar[1 * this._unitLen + 8] = vrange.x + _fillRate * vlen;
                            this.datar[4 * this._unitLen + 8] = vrange.x + _fillRate * vlen;
                        }
                    }
                    this.updateQuadData(x0, y0, x1, y1, x2, y2, x3, y3);
                    break;
                case FillMethod.Radial_180:
                    let tx = (x0 + x1) / 2;
                    let ty = (y0 + y1) / 2;
                    let bx = (x2 + x3) / 2;
                    let by = (y2 + y3) / 2;
                    if (this.fillAmmount >= 0.75)
                    {
                        let _fillRate = 4 * (1 - this.fillAmmount);
                        x2 = x2 - _fillRate * (x2 - x0);
                        y2 = y2 - _fillRate * (y2 - y0);

                        this.datar[5  * this._unitLen + 8] = vrange.y - _fillRate * vlen;
                        this.datar[0  * this._unitLen + 7] = urange.x;
                        this.datar[3  * this._unitLen + 7] = urange.x;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                    }
                    else if (this.fillAmmount >= 0.5)
                    {
                        let _fillRate = 4 * (0.75 - this.fillAmmount);
                        x0 = x0 - _fillRate * (x0 - tx);
                        y0 = y0 - _fillRate * (y0 - ty);
                        x2 = x0;
                        y2 = y0;

                        this.datar[0  * this._unitLen + 7] = urange.x + 0.5 * ulen * _fillRate;
                        this.datar[3  * this._unitLen + 7] = urange.x + 0.5 * ulen * _fillRate;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                    }
                    else if (this.fillAmmount >= 0.25)
                    {
                        let _fillRate = 4 * (0.5 - this.fillAmmount);
                        tx = tx - _fillRate * (tx - x1);
                        ty = ty - _fillRate * (ty - y1);
                        x0 = tx;
                        y0 = ty;
                        x2 = x0;
                        y2 = y0;

                        this.datar[6  * this._unitLen + 7] = halfu + 0.5 * ulen * _fillRate;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                    }
                    else
                    {
                        let _fillRate = 4 * (0.25 - this.fillAmmount);
                        x1 = x1 - _fillRate * (x1 - x3);
                        y1 = y1 - _fillRate * (y1 - y3);
                        tx = x1;
                        ty = y1;
                        x0 = tx;
                        y0 = ty;
                        x2 = x0;
                        y2 = y0;

                        this.datar[7  * this._unitLen + 8] = vrange.x + _fillRate * vlen;
                        this.datar[10 * this._unitLen + 8] = vrange.x + _fillRate * vlen;
                    }
                    this.updateQuadData(x0, y0, tx, ty, x2, y2, bx, by, 0, true);
                    this.updateQuadData(tx, ty, x1, y1, bx, by, x3, y3, 1);
                    break;
                case FillMethod.Radial_360:
                    let t_x = (x0 + x1) / 2;
                    let t_y = (y0 + y1) / 2;
                    let l_x = (x0 + x2) / 2;
                    let l_y = (y0 + y2) / 2;
                    let b_x = (x2 + x3) / 2;
                    let b_y = (y2 + y3) / 2;
                    let r_x = (x1 + x3) / 2;
                    let r_y = (y1 + y3) / 2;
                    let c_x = (l_x + r_x) / 2;
                    let c_y = (l_y + r_y) / 2;

                    let b_x1 = b_x;
                    let b_y1 = b_y;
                    if (this.fillAmmount >= 0.875)
                    {
                        let _fillRate = 8 * (1 - this.fillAmmount);
                        b_x = b_x - _fillRate * (b_x - x2);
                        b_y = b_y - _fillRate * (b_y - y2);

                        this.datar[17 * this._unitLen + 7] = halfu - 0.5 * _fillRate * ulen;
                        this.datar[14 * this._unitLen + 8] = vrange.y;
                        this.datar[15 * this._unitLen + 8] = vrange.y;
                        this.datar[5  * this._unitLen + 8] = halfv;
                        this.datar[0  * this._unitLen + 7] = urange.x;
                        this.datar[3  * this._unitLen + 7] = urange.x;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.75)
                    {
                        let _fillRate = 8 * (0.875 - this.fillAmmount);
                        x2 = x2 - _fillRate * (x2 - l_x);
                        y2 = y2 - _fillRate * (y2 - l_y);
                        b_x = x2;
                        b_y = y2;

                        this.datar[14 * this._unitLen + 8] = vrange.y - 0.5 * _fillRate * vlen;
                        this.datar[15 * this._unitLen + 8] = vrange.y - 0.5 * _fillRate * vlen;
                        this.datar[5  * this._unitLen + 8] = halfv;
                        this.datar[0  * this._unitLen + 7] = urange.x;
                        this.datar[3  * this._unitLen + 7] = urange.x;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.625)
                    {
                        let _fillRate = 8 * (0.75 - this.fillAmmount);
                        l_x = l_x - _fillRate * (l_x - x0);
                        l_y = l_y - _fillRate * (l_y - y0);
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[5  * this._unitLen + 8] = halfv - 0.5 * _fillRate * vlen;
                        this.datar[0  * this._unitLen + 7] = urange.x;
                        this.datar[3  * this._unitLen + 7] = urange.x;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.5)
                    {
                        let _fillRate = 8 * (0.625 - this.fillAmmount);
                        x0 = x0 - _fillRate * (x0 - t_x);
                        y0 = y0 - _fillRate * (y0 - t_y);
                        l_x = x0;
                        l_y = y0;
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[0  * this._unitLen + 7] = urange.x + 0.5 * _fillRate * ulen;
                        this.datar[3  * this._unitLen + 7] = urange.x + 0.5 * _fillRate * ulen;
                        this.datar[6  * this._unitLen + 7] = halfu;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.375)
                    {
                        let _fillRate = 8 * (0.5 - this.fillAmmount);
                        t_x = t_x - _fillRate * (t_x - x1);
                        t_y = t_y - _fillRate * (t_y - y1);
                        x0 = t_x;
                        y0 = t_y;
                        l_x = x0;
                        l_y = y0;
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[6  * this._unitLen + 7] = halfu + 0.5 * _fillRate * ulen;
                        this.datar[7  * this._unitLen + 8] = vrange.x;
                        this.datar[10 * this._unitLen + 8] = vrange.x;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.25)
                    {
                        let _fillRate = 8 * (0.375 - this.fillAmmount);
                        x1 = x1 - _fillRate * (x1 - r_x);
                        y1 = y1 - _fillRate * (y1 - r_y);
                        t_x = x1;
                        t_y = y1;
                        x0 = t_x;
                        y0 = t_y;
                        l_x = x0;
                        l_y = y0;
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[7  * this._unitLen + 8] = vrange.x + 0.5 * _fillRate * vlen;
                        this.datar[10 * this._unitLen + 8] = vrange.x + 0.5 * _fillRate * vlen;
                        this.datar[19 * this._unitLen + 8] = halfv;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else if (this.fillAmmount >= 0.125)
                    {
                        let _fillRate = 8 * (0.25 - this.fillAmmount);
                        r_x = r_x - _fillRate * (r_x - x3);
                        r_y = r_y - _fillRate * (r_y - y3);
                        x1 = r_x;
                        y1 = r_y;
                        t_x = x1;
                        t_y = y1;
                        x0 = t_x;
                        y0 = t_y;
                        l_x = x0;
                        l_y = y0;
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[19 * this._unitLen + 8] = halfv + 0.5 * _fillRate * vlen;
                        this.datar[20 * this._unitLen + 7] = urange.y;
                        this.datar[22 * this._unitLen + 7] = urange.y;
                    }
                    else
                    {
                        let _fillRate = 8 * (0.125 - this.fillAmmount);
                        x3 = x3 - _fillRate * (x3 - b_x);
                        y3 = y3 - _fillRate * (y3 - b_y);
                        r_x = x3;
                        r_y = y3;
                        x1 = r_x;
                        y1 = r_y;
                        t_x = x1;
                        t_y = y1;
                        x0 = t_x;
                        y0 = t_y;
                        l_x = x0;
                        l_y = y0;
                        x2 = l_x;
                        y2 = l_y;
                        b_x = x2;
                        b_y = y2;

                        this.datar[20 * this._unitLen + 7] = urange.y - 0.5 * _fillRate * ulen;
                        this.datar[22 * this._unitLen + 7] = urange.y - 0.5 * _fillRate * ulen;
                    }



                    this.updateQuadData(x0, y0, t_x, t_y, l_x, l_y, c_x, c_y, 0, true);
                    this.updateQuadData(t_x, t_y, x1, y1, c_x, c_y, r_x, r_y, 1);
                    this.updateQuadData(l_x, l_y, c_x, c_y, x2, y2, b_x, b_y, 2);
                    this.updateQuadData(c_x, c_y, r_x, r_y, b_x1, b_y1, x3, y3, 3, true);
                    break;
            }
        }

        /**
         * @private
         * 更新瓦片数据。这里只是没有border的瓦片。如果有border就要复杂很多
         */
        private updateTiledData(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number)
        {
            let rect = this._sprite.rect;
            let border = this._imageBorder;

            let urange = this._sprite.urange;
            let vrange = this._sprite.vrange;
            let ulen = urange.y - urange.x;
            let vlen = vrange.y - vrange.x;
            let xlen = x1 - x0;
            let ylen = y2 - y0;

            let _ul: number = this.transform.width / rect.w;
            let _vl: number = this.transform.height / rect.h;
            let inv_ul = 1 / _ul;
            let inv_vl = 1 / _vl;
            let dindex = 0;
            //创建完整的
            for (var i = 0; i < _vl - 1; i++)
            {
                for (var j = 0; j < _ul - 1; j++)
                {
                    let tdata = [
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                        0, 0, 0, 1, 1, 1, 1, urange.y, vrange.y, 1, 1, 1, 1
                    ];
                    this.datar = this.datar.concat(tdata);

                    let tx0 = x0 + inv_ul * xlen * j;
                    let ty0 = y0 + inv_vl * ylen * i;
                    let tx1 = x0 + inv_ul * xlen * (j + 1);
                    let ty1 = y0 + inv_vl * ylen * i;
                    let tx2 = x0 + inv_ul * xlen * j;
                    let ty2 = y0 + inv_vl * ylen * (i + 1);
                    let tx3 = x0 + inv_ul * xlen * (j + 1);
                    let ty3 = y0 + inv_vl * ylen * (i + 1);
                    this.updateQuadData(tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, dindex);
                    dindex++;
                }
            }
            //最后一行
            var intvl = Math.ceil(_vl) - 1;
            var tvl = _vl - Math.ceil(_vl) + 1;
            for (var j = 0; j < _ul - 1; j++)
            {
                let tdata = [
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x + tvl * vlen, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x + tvl * vlen, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.y, vrange.x + tvl * vlen, 1, 1, 1, 1
                ];
                this.datar = this.datar.concat(tdata);

                let tx0 = x0 + inv_ul * xlen * j;
                let ty0 = y0 + inv_vl * ylen * intvl;
                let tx1 = x0 + inv_ul * xlen * (j + 1);
                let ty1 = y0 + inv_vl * ylen * intvl;
                let tx2 = x0 + inv_ul * xlen * j;
                let ty2 = y0 + inv_vl * ylen * (intvl + tvl);
                let tx3 = x0 + inv_ul * xlen * (j + 1);
                let ty3 = y0 + inv_vl * ylen * (intvl + tvl);
                this.updateQuadData(tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, dindex);
                dindex++;
            }
            //最后一列
            var intul = Math.ceil(_ul) - 1;
            var tul = _ul - Math.ceil(_ul) + 1;
            for (var i = 0; i < _vl - 1; i++)
            {
                let tdata = [
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.y, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.y, 1, 1, 1, 1
                ];
                this.datar = this.datar.concat(tdata);

                let tx0 = x0 + inv_ul * xlen * intul;
                let ty0 = y0 + inv_vl * ylen * i;
                let tx1 = x0 + inv_ul * xlen * (intul + tul);
                let ty1 = y0 + inv_vl * ylen * i;
                let tx2 = x0 + inv_ul * xlen * intul;
                let ty2 = y0 + inv_vl * ylen * (i + 1);
                let tx3 = x0 + inv_ul * xlen * (intul + tul);
                let ty3 = y0 + inv_vl * ylen * (i + 1);
                this.updateQuadData(tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, dindex);
                dindex++;
            }
            //最后一个
            {
                let tdata = [
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x + tvl * vlen, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x, vrange.x + tvl * vlen, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.x, 1, 1, 1, 1,
                    0, 0, 0, 1, 1, 1, 1, urange.x + tul * ulen, vrange.x + tvl * vlen, 1, 1, 1, 1
                ];
                this.datar = this.datar.concat(tdata);

                let tx0 = x0 + inv_ul * xlen * intul;
                let ty0 = y0 + inv_vl * ylen * intvl;
                let tx1 = x0 + inv_ul * xlen * (intul + tul);
                let ty1 = y0 + inv_vl * ylen * intvl;
                let tx2 = x0 + inv_ul * xlen * intul;
                let ty2 = y0 + inv_vl * ylen * (intvl + tvl);
                let tx3 = x0 + inv_ul * xlen * (intul + tul);
                let ty3 = y0 + inv_vl * ylen * (intvl + tvl);
                this.updateQuadData(tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, dindex);
                dindex++;
            }
        }
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 贴图的显示方式
     * @version egret-gd3d 1.0
     */
    export enum ImageType
    {
        Simple,//普通贴图
        Sliced,//九宫
        Tiled,//平铺,根据显示的尺寸和图片的尺寸来计算mesh的uv，平铺上去。这里暂不考虑九宫的平铺（需要动态创建顶点）。
        Filled//填充
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 更新瓦片数据。这里只是没有border的瓦片。如果有border就要复杂很多
     * @version egret-gd3d 1.0
     */
    export enum FillMethod
    {
        Horizontal,//横向填充
        Vertical,//纵向填充
        Radial_90,//角度填充
        Radial_180,
        Radial_360
    }
}