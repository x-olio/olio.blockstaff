

//主要的入口
namespace gd3d.framework
{

    /**
     * @private
     */
    export interface INotify
    {
        notify(trans: any, type: NotifyType);
    }
    /**
     * @private
     */
    export enum NotifyType
    {
        AddChild,
        RemoveChild,
        ChangeVisible,
        AddCamera,
        AddCanvasRender,
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 设定画布的渲染大小，选择长或者宽作为标准锁定画布大小进行渲染。横屏选择FixedWidthType，竖屏选择FixedHeightType。目的是锁定屏幕大小，防止分辨率过高导致渲染压力过大
     * @version egret-gd3d 1.0
     */
    export enum CanvasFixedType
    {
        /** 随着窗口自由适应 */
        Free,
        /** 固定宽度 */
        FixedWidthType,
        /** 固定高度 */
        FixedHeightType
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 引擎的主入口
     * @version egret-gd3d 1.0
     */
    export class application
    {

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 全局webgl实例
         * @version egret-gd3d 1.0
         */
        webgl: WebGLRenderingContext;
        stats: Stats.Stats;
        container: HTMLDivElement;
        outcontainer: HTMLDivElement;
        edModel: boolean;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 绘制区域宽度 像素单位
         * @version egret-gd3d 1.0
         */
        get width()
        {
            return this.webgl.canvas.width;
            // return this.webgl.canvas.getBoundingClientRect().width;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 绘制区域高度 像素单位
         * @version egret-gd3d 1.0
         */
        get height()
        {
            return this.webgl.canvas.height;
            // return this.webgl.canvas.getBoundingClientRect().height;
        }
        limitFrame: boolean = true;
        notify: INotify;
        private _timeScale: number;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置timescale
         * @version egret-gd3d 1.0
         */
        set timeScale(val: number)
        {
            this._timeScale = val;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取timescale
         * @version egret-gd3d 1.0
         */
        get timeScale(): number
        {
            return this._timeScale;
        }
        private version: string = "v0.0.1";
        private build: string = "b000077";
        private _tar: number = -1;
        private _standDeltaTime: number = -1;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置固定帧数 不设置即为不限制帧数
         * @version egret-gd3d 1.0
         */
        set targetFrame(val: number)
        {
            if (val == 0)
                val = -1;
            this._tar = val;
            this._standDeltaTime = 1 / this._tar;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取当前固定帧数
         * @version egret-gd3d 1.0
         */
        get targetFrame()
        {
            return this._tar;
        }
        screenAdaptiveType: string;
        private _fixHeight: number;
        private _fixWidth: number;
        // private beWidthSetted: boolean = false;
        // private beHeightSetted: boolean = false;

        public ccWidth: number;
        public ccHeight: number;

        private canvasFixedType: CanvasFixedType = CanvasFixedType.Free;
        private _canvasClientWidth: number;
        private _canvasClientHeight: number;
        set canvasFixHeight(val: number)
        {
            this._fixHeight = val;
        }
        set canvasFixWidth(val: number)
        {
            this._fixWidth = val;
        }
        get canvasClientWidth(): number
        {
            return this._canvasClientWidth;
        }
        get canvasClientHeight(): number
        {
            return this._canvasClientHeight;
        }

        get scaleFromPandding() { return this._scaleFromPandding; }
        private _scaleFromPandding: number = 1;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引擎的启动方法
         * @param div 绘制区域的dom
         * @version egret-gd3d 1.0
         */
        start(div: HTMLDivElement, type: CanvasFixedType = CanvasFixedType.Free, val: number = 1200, webglDebug = false)
        {
            console.log("version: " + this.version + "  build: " + this.build);
            // var metas = document.getElementsByName("viewport") as NodeListOf<HTMLMetaElement>;
            // var meta: HTMLMetaElement;
            // if (!metas || metas.length < 1)
            // {
            //     meta = document.createElement("meta") as HTMLMetaElement;
            //     meta.name = "viewport";
            //     document.head.appendChild(meta);
            // }
            // else
            //     meta = metas[0];
            // meta.content = "width=device-width, height=device-height, user-scalable=no, initial-scale=1, minimum-scale=0.5, maximum-scale=0.5";

            if (div == null)
            {
                console.error("root div does Null at application start ");
                return;
            }
            div.style.overflow = "hidden";
            div.style.position = "absolute";
            div.style.width = "100%";
            div.style.height = "100%";


            this.outcontainer = div;
            var rotateDiv = document.createElement("div");
            rotateDiv.className = "full";
            rotateDiv.style.overflow = "hidden";
            rotateDiv.style.position = "absolute";
            rotateDiv.style.width = "100%";
            rotateDiv.style.height = "100%";

            this.container = rotateDiv;
            div.appendChild(rotateDiv);

            var canvas = document.createElement("canvas");
            if (canvas == null)
            {
                alert("Failed to create canvas at the application.start()");
                throw Error("Failed to create canvas at the application.start()");
            }
            canvas.className = "full";
            canvas.style.position = "absolute";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.backgroundColor = "#1e1e1e";
            canvas.setAttribute("tabindex", "1");
            rotateDiv.appendChild(canvas);

            //this.updateOrientationMode();

            //init webgl;

            // this.webgl = <WebGLRenderingContext>canvas.getContext('webgl') ||
            //     <WebGLRenderingContext>canvas.getContext("experimental-webgl");

            this.startForCanvas(canvas, type, val, webglDebug);

            //this.showDrawCall();
        }

        startForCanvas(canvas: HTMLCanvasElement, type: CanvasFixedType = CanvasFixedType.Free, val: number = 1200, webglDebug = false)
        {
            this.ccWidth = this.ccWidth == undefined ? canvas.clientWidth : this.ccWidth;
            this.ccHeight = this.ccHeight == undefined ? canvas.clientHeight : this.ccHeight;

            this._timeScale = 1;
            sceneMgr.app = this;
            let tempWebGlUtil = new WebGLUtils();
            this.webgl = tempWebGlUtil.setupWebGL(canvas);
            // console.error(" i am ---tempWebGlUtil-" + webglDebug);
            if (this.webgl == null)
            {
                alert("Failed to get webgl at the application.start()");
                throw Error("Failed to get webgl at the application.start()");
            }

            switch (type)
            {
                case CanvasFixedType.FixedWidthType: this.canvasFixWidth = val; break;
                case CanvasFixedType.FixedHeightType: this.canvasFixHeight = val; break;
            }

            // let devicePixelRatio = window.devicePixelRatio || 1;
            this.canvasFixedType = type;
            // // if (this.outcontainer)
            // {
            //     switch (type)
            //     {
            //         case CanvasFixedType.Free:
            //             this.screenAdaptiveType = "宽高度自适应(宽高都不固定,真实像素宽高)";
            //             canvas.width = this.ccWidth*devicePixelRatio;
            //             canvas.height = this.ccHeight*devicePixelRatio;
            //             this._scaleFromPandding = 1;
            //             break;
            //         case CanvasFixedType.FixedWidthType:
            //             this.canvasFixWidth = val;
            //             this.screenAdaptiveType = "宽度自适应(宽度固定,一般横屏使用)";
            //             canvas.width = this._fixWidth*devicePixelRatio;
            //             canvas.height = canvas.width * this.ccHeight / this.ccWidth;
            //             //this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
            //             this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
            //             break;
            //         case CanvasFixedType.FixedHeightType:
            //             this.canvasFixHeight = val;
            //             this.screenAdaptiveType = "高度自适应(高度固定，一般竖屏使用)";
            //             canvas.height = this._fixHeight*devicePixelRatio;
            //             canvas.width = canvas.height * this._fixHeight / this.ccHeight;
            //             this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
            //             break;
            //     }
            // }
            this.setScreenAsp();

            // this._canvasClientWidth = canvas.width; //this.webgl.canvas.clientWidth;
            // this._canvasClientHeight = canvas.height;//this.webgl.canvas.clientHeight;
            this._canvasClientWidth = this.ccWidth; //this.webgl.canvas.clientWidth;
            this._canvasClientHeight = this.ccHeight;//this.webgl.canvas.clientHeight;
            gd3d.render.webglkit.initConst(this.webgl);
            this.initRender();
            this.initAssetMgr();
            this.initInputMgr();

            this.initScene();


            this.beginTimer = this.lastTimer = this.pretimer = Date.now() / 1000;
            this.loop();
            gd3d.io.referenceInfo.regDefaultType();

            let initovercallback = window["initovercallback"];
            if (initovercallback != null)
            {
                initovercallback(this);
            }

            //debug
            if (webglDebug)
            {
                let tempWebGLDebugUtils = new WebGLDebugUtils();
                this.webgl = tempWebGLDebugUtils.makeDebugContext(this.webgl);
                console.error(" i am ---webglDebug-");
            }
        }

        markNotify(trans: any, type: NotifyType)
        {
            // this.doNotify(trans, type);
        }

        private doNotify(trans: transform, type: NotifyType)
        {
            if (trans == null)
                return;
            if (!this.checkFilter(trans))
                return;
            if (this.notify)
                this.notify.notify(trans, type);
            if (trans.children != null)
            {
                for (let index in trans.children)
                {
                    this.doNotify(trans.children[index], type);
                }
            }
        }
        /**
         * @private
         * @param trans
         */
        checkFilter(trans: any)
        {
            if (trans instanceof gd3d.framework.transform)
            {
                if (trans.gameObject.hideFlags & gd3d.framework.HideFlags.HideInHierarchy)
                {
                    return false;
                }
            }
            if (trans instanceof gd3d.framework.transform2D)
            {
                if (trans.hideFlags & gd3d.framework.HideFlags.HideInHierarchy)
                {
                    return false;
                }
            }
            return true;
        }


        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 显示性能参数面板
         * @version egret-gd3d 1.0
         */
        showFps()
        {
            if (!this.container) return;
            if (this.stats == null)
            {
                this.stats = new Stats.Stats(this);
                this.stats.container.style.position = 'absolute'; //绝对坐标
                this.stats.container.style.left = '0px';// (0,0)px,左上角
                this.stats.container.style.top = '0px';
                this.container.appendChild(this.stats.container);
            }
            else
            {
                this.container.appendChild(this.stats.container);
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 关闭性能参数面板
         * @param div 绘制区域的dom
         * @version egret-gd3d 1.0
         */
        closeFps()
        {
            if (this.stats != null)
            {
                this.container.removeChild(this.stats.container);
            }
        }

        showDrawCall()
        {
            DrawCallInfo.inc.showDrawcallInfo();
        }
        closeDrawCall()
        {
            DrawCallInfo.inc.closeDrawCallInfo();
        }

        private beStepNumber = 0;
        //delta 单位秒
        private update(delta: number)
        {
            try
            {
                //if (this.outcontainer.clientWidth != this._canvasClientWidth || this.outcontainer.clientHeight != this._canvasClientHeight)
                {
                    this.updateOrientationMode();
                }

                this.updateScreenAsp();

                if (this.bePlay)
                {
                    if (this.bePause)
                    {
                        if (this.beStepForward && this.beStepNumber > 0)
                        {
                            this.beStepNumber--;
                            this.updateUserCode(delta);
                        }
                    }
                    else
                    {
                        if (this._inputmgr)
                            this._inputmgr.update(delta);
                        this.updateUserCode(delta);
                    }
                }
                this.updateEditorCode(delta);

                if (this._scene != null)
                {
                    this._scene.update(delta);
                }
            } catch (e)
            {
                console.error(e);
            }
        }

        private updateScreenAsp()
        {
            if (!this.outcontainer)
                return;
            if (this.webgl && this.webgl.canvas)
            {
                this.ccWidth = this.webgl.canvas.clientWidth != null ? this.webgl.canvas.clientWidth : this.ccWidth;
                this.ccHeight = this.webgl.canvas.clientHeight != null ? this.webgl.canvas.clientHeight : this.ccHeight;
            }

            if (this.ccWidth != this._canvasClientWidth || this.ccHeight != this._canvasClientHeight)
            {
                this._canvasClientWidth = this.ccWidth;
                this._canvasClientHeight = this.ccHeight;
                this.setScreenAsp();

                // if (this.canvasFixedType == CanvasFixedType.Free)
                // {
                //     this.webgl.canvas.width = this.ccWidth;
                //     this.webgl.canvas.height = this.ccHeight;
                //     this._scaleFromPandding = 1;
                // }
                // else if (this.canvasFixedType == CanvasFixedType.FixedWidthType)
                // {
                //     this.webgl.canvas.width = this._fixWidth;
                //     this.webgl.canvas.height = this._fixWidth * this.ccHeight / this.ccWidth;
                //     this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
                // } else if (this.canvasFixedType == CanvasFixedType.FixedHeightType)
                // {
                //     this.webgl.canvas.height = this._fixHeight;
                //     this.webgl.canvas.width = this.ccWidth * this._fixHeight / this.ccHeight;
                //     this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
                // }
                // console.log("_fixWidth:" + this._fixWidth + "   _fixHeight:" + this._fixHeight);
                // console.log("canvas resize.   width:" + this.webgl.canvas.width + "   height:" + this.webgl.canvas.height);
                // console.log("canvas resize.   clientWidth:" + this.webgl.canvas.clientWidth + "   clientHeight:" + this.webgl.canvas.clientHeight);

            }
        }

        //设置屏幕的 ASP
        private setScreenAsp()
        {
            if (!this.webgl || !this.webgl.canvas) return;
            let canvas = this.webgl.canvas;
            let devicePixelRatio = window.devicePixelRatio || 1;
            let type = this.canvasFixedType;
            switch (type)
            {
                case CanvasFixedType.Free:
                    this.screenAdaptiveType = "宽高度自适应(宽高都不固定,真实像素宽高)";
                    canvas.width = this.ccWidth * devicePixelRatio;
                    canvas.height = this.ccHeight * devicePixelRatio;
                    this._scaleFromPandding = 1;
                    break;
                case CanvasFixedType.FixedWidthType:
                    this.screenAdaptiveType = "宽度自适应(宽度固定,一般横屏使用)";
                    canvas.width = this._fixWidth * devicePixelRatio;
                    canvas.height = canvas.width * this.ccHeight / this.ccWidth;
                    //this._scaleFromPandding = this.ccHeight / this.webgl.canvas.height;
                    this._scaleFromPandding = this.ccHeight * devicePixelRatio / this.webgl.canvas.height;
                    break;
                case CanvasFixedType.FixedHeightType:
                    this.screenAdaptiveType = "高度自适应(高度固定，一般竖屏使用)";
                    canvas.height = this._fixHeight * devicePixelRatio;
                    canvas.width = this.ccWidth * canvas.height / this.ccHeight;
                    this._scaleFromPandding = this.ccHeight * devicePixelRatio / this.webgl.canvas.height;
                    break;
            }
        }

        /**
         * @private
         */
        public preusercodetimer: number;
        /**
         * @private
         */
        public usercodetime: number;
        /**
         * @private
         */
        getUserUpdateTimer()
        {
            return this.usercodetime;
        }
        private beginTimer;
        private lastTimer;
        private totalTime;
        /**
         * @private
         */
        getTotalTime(): number
        {
            return this.totalTime;
        }

        private _deltaTime;
        /**
         * @private
         */
        public get deltaTime()
        {
            return this._deltaTime * this._timeScale;
        }
        private pretimer: number = 0;
        private updateTimer;
        /**
         * @private
         */
        getUpdateTimer()
        {
            return this.updateTimer;
        }

        /**
         * @private
         */
        public isFrustumCulling: boolean = true;
        private loop()
        {
            var now = Date.now() / 1000;
            this._deltaTime = now - this.lastTimer;
            this.totalTime = now - this.beginTimer;
            this.updateTimer = now - this.pretimer;
            if (this._deltaTime < this._standDeltaTime)
            {
                let _this = this;
                let del = this._standDeltaTime - this._deltaTime;
                setTimeout(function ()
                {
                    var _now = Date.now() / 1000;
                    _this.lastTimer = _now;
                    _this.pretimer = _now;
                    _this.update(_this._standDeltaTime);
                    if (_this.stats != null)
                        _this.stats.update();
                    _this.loop();
                }, del * 1000);
            }
            else
            {
                this.update(this.deltaTime);
                if (this.stats != null)
                    this.stats.update();
                this.lastTimer = now;
                this.pretimer = now;
                if (this.limitFrame)
                {
                    requestAnimationFrame(this.loop.bind(this));
                }
                else
                {
                    setTimeout(this.loop.bind(this), 1);
                }
            }
        }

        //一个Program 拥有横竖两条控制线，横向是时间线，用状态机表达UserState
        //纵向是 多个Scene，每个Scene拥有多个Camera，多个Scene用到的情况极少
        //Unity放弃了纵向，直接用Scene表达横向的时间线
        //我们也可以放弃纵向，同时只能拥有单个Scene，这样逻辑清晰
        //但是横向时间线也用Scene明显是个失败设计,控制层逻辑是高于Scene的，unity却用组件表达一切
        //我们只留一个控制层即可

        private _scene: scene;
        private initScene()
        {
            if (this._scene == null)
            {
                this._scene = new scene(this);
                sceneMgr.scene = this._scene;
            }
        }
        private initRender(): any
        {
            uniformSetter.initAutouniform();
            render.shaderUniform.webgl = this.webgl;
            render.shaderUniform.initApplyUnifmFunc();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取场景实例
         * @version egret-gd3d 1.0
         */
        getScene(): scene
        {
            return this._scene;
        }

        private _assetmgr: assetMgr
        private initAssetMgr()
        {
            if (this._assetmgr == null)
            {
                this._assetmgr = new assetMgr(this);
                this._assetmgr.initDefAsset();
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源管理器实例
         * @version egret-gd3d 1.0
         */
        getAssetMgr()
        {
            return this._assetmgr;
        }

        private _inputmgr: inputMgr
        private initInputMgr()
        {
            if (this._inputmgr == null)
            {
                this._inputmgr = new inputMgr(this);
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取输入管理器实例
         * @version egret-gd3d 1.0
         */
        getInputMgr()
        {
            return this._inputmgr;
        }

        //用户控制层代码，逻辑非常简单，就是给用户一个全局代码插入的机会，update不受场景切换的影响
        private _userCode: IUserCode[] = [];
        private _userCodeNew: IUserCode[] = [];
        private _editorCode: IUserCode[] = [];
        private _editorCodeNew: IUserCode[] = [];
        private _bePlay: boolean = false;
        /**
         * @private
         */
        be2dstate: boolean = false;
        public curcameraindex: number = -1;
        /**
         * @private
         */
        public get bePlay()
        {
            return this._bePlay;
        }
        /**
         * @private
         */
        public set bePlay(value: boolean)
        {
            this._bePlay = value;
        }
        private _bePause: boolean = false;
        /**
         * @private
         */
        public get bePause()
        {
            return this._bePause;
        }
        /**
         * @private
         */
        public set bePause(value: boolean)
        {
            this._bePause = value;
        }
        private _beStepForward: boolean = false;
        /**
         * @private
         */
        public get beStepForward()
        {
            return this._beStepForward;
        }
        /**
         * @private
         */
        public set beStepForward(value: boolean)
        {
            this._beStepForward = value;
        }
        private updateUserCode(delta: number)
        {
            //add new code;
            for (var i = this._userCodeNew.length - 1; i >= 0; i--)
            {
                var c = this._userCodeNew[i];
                if (c.isClosed() == false)
                {
                    c.onStart(this);
                    this._userCode.push(c);
                    this._userCodeNew.splice(i, 1);
                }
            }
            // this._userCodeNew.length = 0;

            //update logic
            var closeindex = -1;
            for (var i = 0; i < this._userCode.length; i++)
            {
                var c = this._userCode[i];
                if (c.isClosed() == false)
                {
                    c.onUpdate(delta);
                }
                else if (closeindex < 0)
                {
                    closeindex = i;
                }
            }

            //remove closed
            if (closeindex >= 0)
            {
                this._userCode.splice(closeindex, 1);
            }
        }

        private updateEditorCode(delta: number)
        {
            for (let i = this._editorCodeNew.length - 1; i >= 0; i--)
            {
                let c = this._editorCodeNew[i];
                if (c.isClosed() == false)
                {
                    c.onStart(this);
                    this._editorCode.push(c);
                    this._editorCodeNew.splice(i, 1);
                }
            }
            let closeindex = -1;
            for (let i = this._editorCode.length - 1; i >= 0; i--)
            {
                let c = this._editorCode[i];
                if (c.isClosed())
                {
                    this._editorCode.splice(i, 1);
                } else
                {
                    c.onUpdate(delta);
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 直接添加usercode实例
         * @param program usercode实例
         * @version egret-gd3d 1.0
         */
        addUserCodeDirect(program: IUserCode)
        {
            this._userCodeNew.push(program);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 根据classname添加usercode
         * @param classname usercode类名
         * @version egret-gd3d 1.0
         */
        addUserCode(classname: string)
        {
            //反射创建实例的方法
            var prototype = gd3d.reflect.getPrototype(classname);
            if (prototype != null)
            {
                var code = gd3d.reflect.createInstance(prototype, { "usercode": "1" });
                this.addUserCodeDirect(code);
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 根据classname添加editorcode
         * @param classname editorcode类名
         * @version egret-gd3d 1.0
         */
        addEditorCode(classname: string)
        {
            //反射创建实例的方法
            var prototype = gd3d.reflect.getPrototype(classname);
            if (prototype != null)
            {
                var code = gd3d.reflect.createInstance(prototype, { "editorcode": "1" });
                this.addEditorCodeDirect(code);
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 直接添加editorcode实例
         * @param program editorcode实例
         * @version egret-gd3d 1.0
         */
        addEditorCodeDirect(program: IEditorCode)
        {
            this._editorCodeNew.push(program);
        }

        public orientation: string = OrientationMode.AUTO;//旋转角度
        public shouldRotate = false; //需要旋转
        private lastWidth = 0;
        private lastHeight = 0;
        public OffOrientationUpdate = false;  //关闭更新
        private updateOrientationMode()
        {
            if (this.OffOrientationUpdate || !this.outcontainer) return;
            let screenRect = this.outcontainer.getBoundingClientRect();

            this.shouldRotate = false;
            if (this.orientation != OrientationMode.AUTO)
            {
                this.shouldRotate =
                    (this.orientation == OrientationMode.LANDSCAPE || this.orientation == OrientationMode.LANDSCAPE_FLIPPED) && screenRect.height > screenRect.width ||
                    this.orientation == OrientationMode.PORTRAIT && screenRect.width > screenRect.height;
            }

            let screenWidth = this.shouldRotate ? screenRect.height : screenRect.width;
            let screenHeight = this.shouldRotate ? screenRect.width : screenRect.height;

            if (this.lastWidth == screenWidth && this.lastHeight == screenHeight) return; //不再重复

            this.lastWidth = screenWidth;
            this.lastHeight = screenHeight;
            // if (this.width !== screenWidth) {
            //     this.width = screenWidth;
            // }
            // if (this.height !== screenHeight) {
            //     this.height = screenHeight;
            // }
            if (this.container)
            {
                this.container.style[getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
                this.container.style.width = screenWidth + "px";
                this.container.style.height = screenHeight + "px";


                let rotation = 0;
                if (this.shouldRotate)
                {
                    if (this.orientation == OrientationMode.LANDSCAPE)
                    {//
                        rotation = 90;
                        this.container.style.top = (screenRect.height - screenWidth) / 2 + "px";
                        this.container.style.left = (screenRect.width + screenHeight) / 2 + "px";
                    }
                    else
                    {
                        rotation = -90;
                        this.container.style.top = (screenRect.height + screenWidth) / 2 + "px";
                        this.container.style.left = (screenRect.width - screenHeight) / 2 + "px";
                    }
                }
                else
                {
                    this.container.style.top = (screenRect.height - screenHeight) / 2 + "px";
                    this.container.style.left = (screenRect.width - screenWidth) / 2 + "px";
                }

                let transform = `rotate(${rotation}deg)`;
                this.container.style[getPrefixStyleName("transform")] = transform;
            }
        }
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * usercode接口
     * @version egret-gd3d 1.0
     */
    export interface IUserCode
    {
        onStart(app: gd3d.framework.application);
        //以秒为单位的间隔
        onUpdate(delta: number);
        isClosed(): boolean;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * editorcode接口
     * @version egret-gd3d 1.0
     */
    export interface IEditorCode
    {
        onStart(app: gd3d.framework.application);
        //以秒为单位的间隔
        onUpdate(delta: number);
        isClosed(): boolean;
    }

    export const OrientationMode = {

        /**
         * 适配屏幕
         */
        AUTO: "auto",
        /**
         * 默认竖屏
         */
        PORTRAIT: "portrait",
        /**
         * 默认横屏，舞台顺时针旋转90度
         */
        LANDSCAPE: "landscape",
        /**
         * 默认横屏，舞台逆时针旋转90度
         */
        LANDSCAPE_FLIPPED: "landscapeFlipped"
    }

    /**
     * @private
     */
    let currentPrefix: string = null;

    /**
     * @private
     */
    export function getPrefixStyleName(name: string, element?: any): string
    {
        let header: string = "";

        if (element != null)
        {
            header = getPrefix(name, element);
        }
        else
        {
            if (currentPrefix == null)
            {
                let tempStyle = document.createElement('div').style;
                currentPrefix = getPrefix("transform", tempStyle);
            }
            header = currentPrefix;
        }

        if (header == "")
        {
            return name;
        }

        return header + name.charAt(0).toUpperCase() + name.substring(1, name.length);
    }

    /**
     * @private
     */
    export function getPrefix(name: string, element: any): string
    {
        if (name in element)
        {
            return "";
        }

        name = name.charAt(0).toUpperCase() + name.substring(1, name.length);
        let transArr: string[] = ["webkit", "ms", "Moz", "O"];
        for (let i: number = 0; i < transArr.length; i++)
        {
            let tempStyle: string = transArr[i] + name;

            if (tempStyle in element)
            {
                return transArr[i];
            }
        }

        return "";
    }

}
