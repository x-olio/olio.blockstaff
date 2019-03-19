namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * UI画布容器组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeComponent
    export class canvascontainer implements INodeComponent
    {
        static readonly ClassName:string="canvascontainer";

        constructor(){
            
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;
        
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * UI canvas 
         * @version egret-gd3d 1.0
         */
        get canvas(){
            if(this._overlay2d && this._overlay2d.canvas) 
                return this._overlay2d.canvas;
        }

        //overlay2d
        @reflect.Field("reference")
        private _overlay2d:overlay2D;
        setOverLay(lay:overlay2D){
            this._overlay2d = lay;
            this.canvasInit();
        }
        
        getOverLay(){
            return this._overlay2d;
        }

        //渲染排序
        get sortOrder(){
            return this._overlay2d ? this._overlay2d.sortOrder: 0;         
        }
        set sortOrder(order:number){
            if(this._overlay2d)
                this._overlay2d.sortOrder = order;
        }

        private isCanvasinit = false;
        private canvasInit(){
            if(!this.gameObject || !this.gameObject.transform || !this.gameObject.transform.scene) return; 
            if(!this._overlay2d || !this._overlay2d.canvas) return;
            this._overlay2d.canvas.scene = this.gameObject.transform.scene;
            this._overlay2d.canvas.assetmgr = this._overlay2d.canvas.scene.app.getAssetMgr();
            this.isCanvasinit = true;
        }

        private _lastMode:canvasRenderMode = canvasRenderMode.ScreenSpaceOverlay;
        private _renderMode:canvasRenderMode = canvasRenderMode.ScreenSpaceOverlay;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * renderMode UI render模式
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        get renderMode(){return this._renderMode;}
        set renderMode(mode:canvasRenderMode){ 
            if(this._renderMode == mode) return;
            this._lastMode = this._renderMode;
            this._renderMode = mode;
            this.styleToMode();
        }

        private styleToMode(){
            switch(this._renderMode){
                case canvasRenderMode.ScreenSpaceOverlay:
                    if(!this._overlay2d) return;
                    let scene =this.gameObject.getScene();
                    scene.addScreenSpaceOverlay(this._overlay2d);
                break;
            }

        }

        start()
        {
            this.styleToMode();
        }

        onPlay()
        {

        }

        update(delta: number)
        {   
            if(!this.isCanvasinit) this.canvasInit();

        }
        /**
         * @private
         */
        remove()
        {
            if(this.gameObject.getScene())
                this.gameObject.getScene().removeScreenSpaceOverlay(this._overlay2d);
        }
        /**
         * @private
         */
        clone()
        {

        }
    }
    
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * UI画布容器RenderMode
     * @version egret-gd3d 1.0
     */
    export enum canvasRenderMode{
        ScreenSpaceOverlay,
        ScreenSpaceCamera,
        WorldSpace
    }

}