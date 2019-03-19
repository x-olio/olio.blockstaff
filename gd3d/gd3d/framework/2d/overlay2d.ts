/// <reference path="../../io/reflect.ts" />


namespace gd3d.framework
{
    /**
     * UI 缩放模式
     */
    export enum UIScaleMode{
        /** 固定像素尺寸*/
        CONSTANT_PIXEL_SIZE,
        /**参考屏幕尺寸比例缩放*/
        SCALE_WITH_SCREEN_SIZE
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2DUI的容器类，与canvasrender(3DUI)相对应。
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class overlay2D implements IOverLay
    {
        static readonly ClassName:string="overlay2D";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 构造函数
         * @version egret-gd3d 1.0
         */
        constructor()
        {
            this.canvas = new canvas();
            sceneMgr.app.markNotify(this.canvas.getRoot(), NotifyType.AddChild);
        }

        /**
         * @private
         * @language zh_CN
         * @classdesc
         * 是否初始化完成，在执行完start之后设置为true
         * @version egret-gd3d 1.0
         */
        init: boolean = false;

        private camera: camera;
        private app: application;
        private inputmgr: inputMgr;

        /**
         * @private
         */
        start(camera: camera)
        {
            if (camera == this.camera) return;
            this.camera = camera;
            this.app = camera.gameObject.getScene().app;
            this.canvas.scene = camera.gameObject.getScene();
            this.inputmgr = camera.gameObject.getScene().app.getInputMgr();
        }

        /**
         * @private
         */
        @gd3d.reflect.Field("canvas")
        canvas: canvas;

        // /**
        //  * @public
        //  * @language zh_CN
        //  * @classdesc
        //  * 是否自适应
        //  * @version egret-gd3d 1.0
        //  */
        // @gd3d.reflect.Field("boolean")
        // autoAsp: boolean = true;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 屏幕宽高匹配模式 (range 0-1  =0:固定宽  =1:固定高)
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        screenMatchRate : number = 0;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 屏幕匹配参考宽度
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        matchReference_width = 800;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 屏幕匹配参考高度
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        matchReference_height =600;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 缩放模式 
         * 
         * 配合参数 ：
         * matchReference_height
         * matchReference_width
         * screenMatchRate
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        scaleMode : UIScaleMode = UIScaleMode.CONSTANT_PIXEL_SIZE;

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 渲染排序
        * @version egret-gd3d 1.0
        */
        @gd3d.reflect.Field("number")
        sortOrder: number = 0;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 添加2d子节点
         * @param node 2d节点实例
         * @version egret-gd3d 1.0
         */
        addChild(node: transform2D)
        {
            this.canvas.addChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 移除2d子节点
         * @param node 2d节点实例
         * @version egret-gd3d 1.0
         */
        removeChild(node: transform2D)
        {
            this.canvas.removeChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取所有的2d子节点
         * @version egret-gd3d 1.0
         */
        getChildren(): transform2D[]
        {
            return this.canvas.getChildren();
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取2d子节点的数量
         * @version egret-gd3d 1.0
         */
        getChildCount(): number
        {
            return this.canvas.getChildCount();
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取2d子节点
         * @param index 索引
         * @version egret-gd3d 1.0
         */
        getChild(index: number): transform2D
        {
            return this.canvas.getChild(index);
        }

        /**
         * @private
         */
        render(context: renderContext, assetmgr: assetMgr, camera: camera)
        {
            if (!this.canvas.getRoot().visible || !this.camera) return;
            // if (!(camera.CullingMask & this.renderLayer)) return;
            
            // if (this.autoAsp)
            // {
            //     let vp = new gd3d.math.rect();
            //     this.camera.calcViewPortPixel(assetmgr.app, vp);
            //     let aspcam = vp.w / vp.h;
            //     let aspc = this.canvas.pixelWidth / this.canvas.pixelHeight;
            //     if (aspc != aspcam)
            //     {
            //         this.canvas.pixelWidth = this.canvas.pixelHeight * aspcam;
            //         this.canvas.getRoot().markDirty();
            //     }
            // }

            context.updateOverlay();
            this.canvas.render(context, assetmgr);
        }

        private viewPixelrect = new math.rect();
        private helpv2 = new gd3d.math.vector2();
        private helpv2_1 = new gd3d.math.vector2();
        /**
         * @private
         */
        update(delta: number)
        {
            //layout update
            this.ckScaleMode();

            // this.camera.calcViewPortPixel(this.app, this.viewPixelrect);
            // let rect = this.camera.viewport;
            // let real_x = this.inputmgr.point.x - rect.x * this.app.width ;
            // let real_y = this.inputmgr.point.y - rect.y * this.app.height;
            // let sx = (real_x / this.viewPixelrect.w) * 2 - 1;
            // let sy = (real_y / this.viewPixelrect.h) * -2 + 1;
            //用屏幕空间坐标系丢给canvas
            this.helpv2.x = this.inputmgr.point.x;
            this.helpv2.y = this.inputmgr.point.y;
            let sPos = this.helpv2;
            let mPos = this.helpv2_1;
            this.calScreenPosToModelPos(sPos,mPos);

            //canvas de update 直接集成pointevent处理
            this.canvas.update(delta, this.inputmgr.point.touch, mPos.x, mPos.y);
        }

        private lastVPRect = new math.rect();
        private lastScreenMR = 0;
        private lastMR_width = 0;
        private lastMR_height = 0;
        //检查缩放模式 改变
        private ckScaleMode(){
            if(!this.canvas.getRoot().visible || !this.camera) return;
            this.camera.calcViewPortPixel(this.app, this.viewPixelrect);
            let dirty = false;
            if(math.rectEqul(this.lastVPRect,this.viewPixelrect)){
                switch(this.scaleMode){
                    case UIScaleMode.CONSTANT_PIXEL_SIZE:
                    break;
                    case UIScaleMode.SCALE_WITH_SCREEN_SIZE:
                    if(this.lastScreenMR != this.screenMatchRate || this.lastMR_width != this.matchReference_width || this.lastMR_height != this.matchReference_height){
                        dirty = true;
                    }
                    break;
                }
            }else{
                //rect 不等 需要重刷
                dirty = true;
            }

            if(!dirty) return;
            
            let _w = 0; let _h = 0;
            math.rectClone(this.viewPixelrect,this.lastVPRect);
            this.lastScreenMR = this.screenMatchRate;
            this.lastMR_width = this.matchReference_width;
            this.lastMR_height = this.matchReference_height;

            //计算w h
            switch(this.scaleMode){
                case UIScaleMode.CONSTANT_PIXEL_SIZE:
                    _w = this.viewPixelrect.w;
                    _h = this.viewPixelrect.h;
                break;
                case UIScaleMode.SCALE_WITH_SCREEN_SIZE:
                    let match = this.screenMatchRate < 0 ? 0: this.screenMatchRate;
                    match = match>1? 1:match;
                    let asp = this.viewPixelrect.w / this.viewPixelrect.h;
                    _w = math.numberLerp(this.matchReference_width,this.matchReference_height * asp,match);
                    _h = math.numberLerp(this.matchReference_height,this.matchReference_width / asp, 1 - match );
                break;
            }

            //赋值
            this.canvas.pixelWidth = _w;
            this.canvas.pixelHeight = _h;
            this.canvas.getRoot().markDirty();
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 事件检测
         * @param mx x偏移
         * @param my y偏移
         * @version egret-gd3d 1.0
         */
        pick2d(mx: number, my: number, tolerance: number = 0): transform2D
        {
            if (this.camera == null) return null;
            var root = this.canvas.getRoot();
            this.helpv2.x = mx;
            this.helpv2.y = my;
            let sPos = this.helpv2;
            let mPos = this.helpv2_1;
            this.calScreenPosToModelPos(sPos,mPos);
            let trans = this.dopick2d(mPos, root, tolerance);
            return trans;
        }

        /**
         * @private
         */
        private dopick2d(ModelPos: math.vector2, tran: transform2D, tolerance: number = 0): transform2D
        {
            if (tran.components != null)
            {
                for (var i = tran.components.length - 1; i >= 0; i--)
                {
                    var comp = tran.components[i];
                    if (comp != null)
                        //if (comp.init && comp.comp.transform.ContainsCanvasPoint(outv,tolerance))
                        if (comp.comp.transform.ContainsCanvasPoint(ModelPos, tolerance))
                        {
                            return comp.comp.transform;
                        }
                }
            }

            if (tran.children != null)
            {
                for (var i = tran.children.length - 1; i >= 0; i--)
                {
                    var tran2 = this.dopick2d(ModelPos, tran.children[i], tolerance);
                    if (tran2 != null) return tran2;
                }
            }
            return null;
        }

         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 屏幕空间坐标 转到 canvas坐标
         * @version egret-gd3d 1.0
         */
        calScreenPosToCanvasPos(screenPos: gd3d.math.vector2, outCanvasPos: gd3d.math.vector2)
        {
            if(!this.camera || !this.canvas)    return;
            let mPos = this.helpv2;
            this.calScreenPosToModelPos(screenPos,mPos);
            
            // var mat: gd3d.math.matrix3x2 = gd3d.math.pool.new_matrix3x2();
            // gd3d.math.matrix3x2Clone(this.canvas.getRoot().getWorldMatrix(), mat);
            // gd3d.math.matrix3x2Inverse(mat, mat);
            // gd3d.math.matrix3x2TransformVector2(mat, mPos, outCanvasPos);

            // gd3d.math.pool.delete_matrix3x2(mat);

            this.canvas.ModelPosToCanvasPos(mPos,outCanvasPos);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * canvas坐标 转到 屏幕空间坐标
         * @param canvasPos canvas坐标
         * @param outScreenPos 输出的屏幕空间坐标
         * @version egret-gd3d 1.0
         */
        calCanvasPosToScreenPos(canvasPos: gd3d.math.vector2, outScreenPos: gd3d.math.vector2){
            if(!this.camera || !this.canvas)    return;
            let mPos = this.helpv2;
            this.canvas.CanvasPosToModelPos(canvasPos,mPos);
            this.calModelPosToScreenPos(mPos,outScreenPos);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 屏幕空间坐标 转到 Model坐标
         * @version egret-gd3d 1.0
         */
        calScreenPosToModelPos(screenPos: gd3d.math.vector2 , outModelPos : gd3d.math.vector2){
            if(!screenPos || !outModelPos || !this.camera)    return;
            this.camera.calcViewPortPixel(this.app, this.viewPixelrect);
            let rect = this.camera.viewport;

            let real_x = screenPos.x - rect.x * this.app.width;
            let real_y = screenPos.y - rect.y * this.app.height;
            outModelPos.x = (real_x / this.viewPixelrect.w) * 2 - 1;
            outModelPos.y = (real_y / this.viewPixelrect.h) * -2 + 1;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * Model坐标 转到 屏幕空间坐标
         * @param modelPos Model坐标
         * @param outScreenPos 输出的屏幕空间坐标
         * @version egret-gd3d 1.0
         */
        calModelPosToScreenPos(modelPos: gd3d.math.vector2 , outScreenPos : gd3d.math.vector2){
            if(!modelPos || !outScreenPos || !this.camera)    return;
            this.camera.calcViewPortPixel(this.app, this.viewPixelrect);
            let rect = this.camera.viewport;

            let real_x = this.viewPixelrect.w * (modelPos.x + 1)/2; 
            let real_y = this.viewPixelrect.h * (modelPos.y - 1)/-2; 

            outScreenPos.x = real_x + rect.x * this.app.width;
            outScreenPos.y = real_y + rect.y * this.app.height;
        }
    }

}