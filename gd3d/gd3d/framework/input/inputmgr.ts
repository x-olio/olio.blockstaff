namespace gd3d.framework
{

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 鼠标(触屏)点击信息
     * @version egret-gd3d 1.0
     */
    export class pointinfo
    {
        id: number;
        touch: boolean = false;
        x: number;
        y: number;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 键盘、鼠标(触屏)事件管理类 应用状态机区分状态
     * @version egret-gd3d 1.0
     */
    export class inputMgr
    {
        private app:gd3d.framework.application;
        private _element: HTMLElement | null = null;
        private _buttons:boolean[] = [false, false, false];
        private _lastbuttons:boolean[] = [false, false, false];
        private eventer:event.InputEvent = new event.InputEvent();
        private inputlast: HTMLInputElement = null;
        private keyboardMap: { [id: number]: boolean } = {};
        private handlers:Array<any> = [];

        private _wheel:number = 0;
        get wheel(){return this._wheel;};
        private _point: pointinfo = new pointinfo();
        get point (){return this._point;};
        private _touches: { [id: number]: pointinfo } = {};
        get touches (){return this._touches};


        private rMtr_90 =new gd3d.math.matrix3x2();
        private rMtr_n90 =new gd3d.math.matrix3x2();
        constructor(app: application)
        {
            this.app = app;
            gd3d.math.matrix3x2MakeRotate(Math.PI * 90 / 180,this.rMtr_90);
            gd3d.math.matrix3x2MakeRotate(Math.PI * -90 / 180,this.rMtr_n90);

            this.handlers.push(["touchstart",this._touchstart.bind(this)]);
            this.handlers.push(["touchmove",this._touchmove.bind(this)]);
            this.handlers.push(["touchend",this._touchend.bind(this)]);
            this.handlers.push(["touchcancel",this._touchcancel.bind(this)]);
            this.handlers.push(["mousedown",this._mousedown.bind(this)]);
            this.handlers.push(["mouseup",this._mouseup.bind(this)]);
            this.handlers.push(["mousemove",this._mousemove.bind(this)]);
            this.handlers.push(["mousewheel",this._mousewheel.bind(this)]);
            this.handlers.push(["DOMMouseScroll",this._mousewheel.bind(this)]);
            this.handlers.push(["keydown",this._keydown.bind(this)]);
            this.handlers.push(["keyup",this._keyup.bind(this)]);
            this.handlers.push(["blur",this._blur.bind(this)]);

            this.attach(app.webgl.canvas);
            this.disableContextMenu();
        }

        private attach(element: HTMLElement) {
            if (this._element) {
                this.detach();
            }
            this._element = element;
            this.handlers.forEach(handler=>{
                if(handler)
                    this._element.addEventListener(handler[0],handler[1],false);  //reg
            });
        }

        private detach() {
            if(!this._element) return;
            this.handlers.forEach(handler=>{
                if(handler)
                    this._element.removeEventListener(handler[0],handler[1],false);  //unreg
            });
            this._element = null;
        }

        //mouse
        private _mousedown(ev:MouseEvent){
            this.CalcuPoint(ev.offsetX,ev.offsetY,this._point);
            this._buttons[ev.button] = true;
            this._point.touch = true;
        }
        private _mouseup(ev:MouseEvent){
            this._buttons[ev.button] = false;
            this._point.touch = false;
        }
        private _mousemove(ev:MouseEvent){
            this.CalcuPoint(ev.offsetX,ev.offsetY,this._point);
        }
        private _mousewheel(ev:MouseWheelEvent){
            this.hasWheel = true;
            if (ev.detail) {
                this.lastWheel = -1 * ev.detail;
            }  else if (ev["wheelDelta"]) {
                this.lastWheel = ev["wheelDelta"] / 120;
            } else if (ev.DOM_DELTA_PIXEL) {
                this.lastWheel = ev.DOM_DELTA_PIXEL / 120;
            } else {
                this.lastWheel = 0;
            }
        }

        //touch
        private tryAddTouchP(id:number){
            if(!this._touches[id]){
                this._touches[id] = new pointinfo();
                this._touches[id].id = id;
            }
        }

        private syncPointByTouches(){
            let count = 0;
            let xs = 0;
            let ys = 0;
            for (var key in this._touches)
            {
                if (this._touches[key].touch == true)
                {
                    xs += this._touches[key].x;
                    ys += this._touches[key].y;
                    count++;
                }
            }
            // this.point.x = x / (count * app.scale);
            // this.point.y = y / (count * app.scale);
            //this.CalcuPoint(x / count,y / count,this._point);
            this._point.x = xs/count;
            this._point.y = ys/count;
        }

        private _touchstart(ev:TouchEvent){
            // this.CalcuPoint(ev.touches[0].clientX,ev.touches[0].clientY,this._point);
                this._point.touch = true;

                for (var i = 0; i < ev.changedTouches.length; i++)
                {
                    var touch = ev.changedTouches[i];
                    var id = touch.identifier;
                    this.tryAddTouchP(id);
                    this._touches[id].touch = true;
                    this.CalcuPoint(touch.clientX,touch.clientY,this._touches[id]);
                    
                    // this._touches[id].x = touch.clientX;
                    // this._touches[id].y = touch.clientY;
                }

                this.syncPointByTouches();
        }
        private _touchmove(ev:TouchEvent){
            this._point.touch = true;
            for (var i = 0; i < ev.changedTouches.length; i++)
                {
                    var touch = ev.changedTouches[i];
                    var id = touch.identifier;
                    this.tryAddTouchP(id);
                    this._touches[id].touch = true;
                    this.CalcuPoint(touch.clientX,touch.clientY,this._touches[id]);
                    // this._touches[id].x = touch.clientX;
                    // this._touches[id].y = touch.clientY;
                }

                this.syncPointByTouches();
        }
        private _touchend(ev:TouchEvent){
            for (var i = 0; i < ev.changedTouches.length; i++)
                {
                    var touch = ev.changedTouches[i];
                    var id = touch.identifier;
                    this.tryAddTouchP(id);
                    this._touches[id].touch = false;
                }

                //所有触点全放开，point.touch才false
                for (var key in this._touches)
                {
                    if (this._touches[key].touch == true)
                        return;
                }
                this._point.touch = false;
        }
        private _touchcancel(ev:TouchEvent){
            this._touchend(ev);
        }

        //key
        private _keydown(ev:KeyboardEvent){
            this.keyboardMap[ev.keyCode] = true;
            this.keyDownCode = ev.keyCode;
        }
        private _keyup(ev:KeyboardEvent){
            delete this.keyboardMap[ev.keyCode];
            this.keyUpCode = ev.keyCode;
        }
        //
        private _blur(ev){
            this._point.touch = false;
        }


        private readonly moveTolerance = 2;  //move 状态容忍值
        private lastTouch = false;
        private hasPointDown = false;
        private hasPointUP = false;
        private hasPointMove = false;
        private downPoint = new gd3d.math.vector2();
        private lastPoint = new gd3d.math.vector2();
        update(delta){
            this._lastbuttons[0] = this._buttons[0];
            this._lastbuttons[1] = this._buttons[1];
            this._lastbuttons[2] = this._buttons[2];
            this._wheel = 0;

            this.mouseWheelCk();
            this.pointCk();
            this.keyCodeCk();
        }

        private pointCk(){
            let pt = this._point;
            if(this.lastPoint.x != pt.x || this.lastPoint.y != pt.y){
                //on move
                this.eventer.EmitEnum_point( event.PointEventEnum.PointMove,pt.x,pt.y);
            }

            if(!this.lastTouch && pt.touch){
                //on down
                this.hasPointDown = true;
                this.downPoint.x = pt.x;
                this.downPoint.y = pt.y;
                this.eventer.EmitEnum_point(event.PointEventEnum.PointDown,pt.x,pt.y);
            }else if(this.lastTouch && !pt.touch){
                //on up
                this.hasPointUP = true;
                this.eventer.EmitEnum_point(event.PointEventEnum.PointUp,pt.x,pt.y);
            }else if(this.lastTouch && pt.touch){
                //on hold
                this.eventer.EmitEnum_point(event.PointEventEnum.PointHold,pt.x,pt.y);
            }

            if(this.hasPointUP && this.hasPointDown){
                let isMoveTolerance = (Math.abs(this.downPoint.x - pt.x)> this.moveTolerance || Math.abs(this.downPoint.y - pt.y)> this.moveTolerance)
                if(!isMoveTolerance){
                    //on click
                    this.hasPointDown = this.hasPointUP = false;
                    this.eventer.EmitEnum_point(event.PointEventEnum.PointClick,pt.x,pt.y);
                }
            }

            if(!pt.touch){
                this.hasPointDown = false;
            }

            this.lastTouch = pt.touch;
            this.lastPoint.x = pt.x;
            this.lastPoint.y = pt.y;
        }

        private keyDownCode : number = -1;
        private keyUpCode : number = -1;
        private keyCodeCk(){
            if(this.keyDownCode != -1)
                this.eventer.EmitEnum_key(event.KeyEventEnum.KeyDown, this.keyDownCode);
            if(this.keyUpCode != -1)
                this.eventer.EmitEnum_key(event.KeyEventEnum.KeyUp, this.keyUpCode);

            this.keyDownCode = this.keyUpCode = -1;
        }

        private hasWheel = false;
        private lastWheel = 0;
        private mouseWheelCk(){
            if(this.hasWheel){
                this._wheel = this.lastWheel;
                this.eventer.EmitEnum_point(event.PointEventEnum.MouseWheel,null);
            }

            this.hasWheel = false;
            this.lastWheel =0;
        }

        /**
         * 按键是否在按下状态
         * @param button 按键, 0: 左键；1: 中键；2: 右键
         */
        public isPressed(button:number):boolean {
            return this._buttons[button];
        }

        /**
         * 按键被按下一次
         * @param button 按键, 0: 左键；1: 中键；2: 右键
         */
        public wasPressed(button:number):boolean {
            return (this._buttons[button] && !this._lastbuttons[button]);
        }

        private _contextMenu = (ev)=>{ev.preventDefault()};
        /**
         * 禁用右键菜单
         */
        public disableContextMenu() {
            if(!this._element) return;
            this._element.addEventListener("contextmenu", this._contextMenu);
        }
        /**
         * 启用右键菜单
         */
        public enableContextMenu() {
            if(!this._element) return;
            this._element.removeEventListener("contextmenu", this._contextMenu);
        }

        /**
        * 添加point事件监听者
        * @param eventEnum 事件类型
        * @param func 事件触发回调方法 (Warn: 不要使用 func.bind() , 它会导致相等判断失败)
        * @param thisArg 回调方法执行者
        */
        addPointListener(eventEnum: event.PointEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.eventer.OnEnum_point(eventEnum,func,thisArg);
        }
        /**
         * 移除point事件监听者
         * @param eventEnum 事件类型
         * @param func 事件触发回调方法
         * @param thisArg 回调方法执行者
         */
        removePointListener(eventEnum: event.PointEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.eventer.RemoveListener(event.PointEventEnum[eventEnum],func,thisArg);
        }

        /**
        * 添加按键事件监听者
        * @param eventEnum 事件类型
        * @param func 事件触发回调方法 (Warn: 不要使用 func.bind() , 它会导致相等判断失败)
        * @param thisArg 回调方法执行者
        */
        addKeyListener(eventEnum: event.KeyEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.eventer.OnEnum_key(eventEnum,func,thisArg);
        }
        /**
         * 移除按键事件监听者
         * @param eventEnum 事件类型
         * @param func 事件触发回调方法
         * @param thisArg 回调方法执行者
         */
        removeKeyListener(eventEnum: event.KeyEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.eventer.RemoveListener(event.KeyEventEnum[eventEnum],func,thisArg);
        }

        /**
         * 任意一按键被按下
         */
        anyKey(){
            if(this._point.touch) return true;
            for (const key in this.keyboardMap) {
                if (this.keyboardMap.hasOwnProperty(key)) {
                    const element = this.keyboardMap[key];
                    if(element == true)
                        return true;
                }
            }
            return false;
        }

         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取 指定按键是否Down
         * @version egret-gd3d 1.0
         */
        GetKeyDown(name:string)
        GetKeyDown(key:event.KeyCode)
        GetKeyDown(value:any){
            if( typeof(value) === "number" ){
                if(this.keyboardMap[value] != null)
                   return this.keyboardMap[value];
            }else if(typeof(value) === "string"){
                let id = event.KeyCode[value];
                if(id != null && this.keyboardMap[id] != null)
                    return this.keyboardMap[id];
            }
            return false;
        }

         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取 指定按键是否UP
         * @version egret-gd3d 1.0
         */
        GetKeyUP(name:string)
        GetKeyUP(key:event.KeyCode)
        GetKeyUP(value:any):boolean{
            if( typeof(value) === "number" ){
                return !this.keyboardMap[value];
            }else if(typeof(value) === "string"){
                let id = event.KeyCode[value];
                if(id != null )
                    return !this.keyboardMap[id];
            }
            return false;
        }

        /**
         * 按键按下的数量
         */
        KeyDownCount(){
            let count = 0;
            for (const key in this.keyboardMap) {
                if (this.keyboardMap.hasOwnProperty(key)) {
                    if( this.keyboardMap[key] === true)
                        count ++;
                }
            }
            return count;
        }

        private tempV2_0:gd3d.math.vector2 = new gd3d.math.vector2();
        private tempV2_1:gd3d.math.vector2 = new gd3d.math.vector2();
        private devicePixelRatio =  window.devicePixelRatio || 1;
        private CalcuPoint(clientX:number,clientY:number , out:pointinfo){
            if(!out || !this.app || isNaN(clientX) || isNaN(clientY)) return;
            this.tempV2_0.x = clientX * this.devicePixelRatio/ this.app.scaleFromPandding;
            this.tempV2_0.y = clientY * this.devicePixelRatio/ this.app.scaleFromPandding;
            gd3d.math.vec2Clone(this.tempV2_0,this.tempV2_1);

            if(this.app.shouldRotate){
                switch (this.app.orientation){
                    case gd3d.framework.OrientationMode.PORTRAIT:
                    gd3d.math.matrix3x2TransformVector2(this.rMtr_90,this.tempV2_0,this.tempV2_1);
                    out.x = this.tempV2_1.x + this.app.webgl.canvas.width;
                    out.y = this.tempV2_1.y;
                    break;
                    case gd3d.framework.OrientationMode.LANDSCAPE:
                    gd3d.math.matrix3x2TransformVector2(this.rMtr_n90,this.tempV2_0,this.tempV2_1);
                    out.x = this.tempV2_1.x;
                    out.y = this.tempV2_1.y + this.app.webgl.canvas.height;
                    break;
                    case gd3d.framework.OrientationMode.LANDSCAPE_FLIPPED:
                    gd3d.math.matrix3x2TransformVector2(this.rMtr_90,this.tempV2_0,this.tempV2_1);
                    out.x = this.tempV2_1.x + this.app.webgl.canvas.width;
                    out.y = this.tempV2_1.y;
                    break;
                }
            }else{
                out.x = this.tempV2_0.x;
                out.y = this.tempV2_0.y;
            }

            //console.error(`x :${this.point.x}  y :${this.point.y}  w :${this.app.webgl.canvas.width}  h :${this.app.webgl.canvas.height}`);
        }
    }
}