/// <reference path="Reflect.d.ts" />
declare namespace gd3d.framework {
    interface INotify {
        notify(trans: any, type: NotifyType): any;
    }
    enum NotifyType {
        AddChild = 0,
        RemoveChild = 1,
        ChangeVisible = 2,
        AddCamera = 3,
        AddCanvasRender = 4
    }
    enum CanvasFixedType {
        Free = 0,
        FixedWidthType = 1,
        FixedHeightType = 2
    }
    class application {
        webgl: WebGLRenderingContext;
        stats: Stats.Stats;
        container: HTMLDivElement;
        outcontainer: HTMLDivElement;
        edModel: boolean;
        readonly width: number;
        readonly height: number;
        limitFrame: boolean;
        notify: INotify;
        private _timeScale;
        timeScale: number;
        private version;
        private build;
        private _tar;
        private _standDeltaTime;
        targetFrame: number;
        screenAdaptiveType: string;
        private _fixHeight;
        private _fixWidth;
        ccWidth: number;
        ccHeight: number;
        private canvasFixedType;
        private _canvasClientWidth;
        private _canvasClientHeight;
        canvasFixHeight: number;
        canvasFixWidth: number;
        readonly canvasClientWidth: number;
        readonly canvasClientHeight: number;
        readonly scaleFromPandding: number;
        private _scaleFromPandding;
        start(div: HTMLDivElement, type?: CanvasFixedType, val?: number, webglDebug?: boolean): void;
        startForCanvas(canvas: HTMLCanvasElement, type?: CanvasFixedType, val?: number, webglDebug?: boolean): void;
        markNotify(trans: any, type: NotifyType): void;
        private doNotify;
        checkFilter(trans: any): boolean;
        showFps(): void;
        closeFps(): void;
        showDrawCall(): void;
        closeDrawCall(): void;
        private beStepNumber;
        private update;
        private updateScreenAsp;
        private setScreenAsp;
        preusercodetimer: number;
        usercodetime: number;
        getUserUpdateTimer(): number;
        private beginTimer;
        private lastTimer;
        private totalTime;
        getTotalTime(): number;
        private _deltaTime;
        readonly deltaTime: number;
        private pretimer;
        private updateTimer;
        getUpdateTimer(): any;
        isFrustumCulling: boolean;
        private loop;
        private _scene;
        private initScene;
        private initRender;
        getScene(): scene;
        private _assetmgr;
        private initAssetMgr;
        getAssetMgr(): assetMgr;
        private _inputmgr;
        private initInputMgr;
        getInputMgr(): inputMgr;
        private _userCode;
        private _userCodeNew;
        private _editorCode;
        private _editorCodeNew;
        private _bePlay;
        be2dstate: boolean;
        curcameraindex: number;
        bePlay: boolean;
        private _bePause;
        bePause: boolean;
        private _beStepForward;
        beStepForward: boolean;
        private updateUserCode;
        private updateEditorCode;
        addUserCodeDirect(program: IUserCode): void;
        addUserCode(classname: string): void;
        addEditorCode(classname: string): void;
        addEditorCodeDirect(program: IEditorCode): void;
        orientation: string;
        shouldRotate: boolean;
        private lastWidth;
        private lastHeight;
        OffOrientationUpdate: boolean;
        private updateOrientationMode;
    }
    interface IUserCode {
        onStart(app: gd3d.framework.application): any;
        onUpdate(delta: number): any;
        isClosed(): boolean;
    }
    interface IEditorCode {
        onStart(app: gd3d.framework.application): any;
        onUpdate(delta: number): any;
        isClosed(): boolean;
    }
    const OrientationMode: {
        AUTO: string;
        PORTRAIT: string;
        LANDSCAPE: string;
        LANDSCAPE_FLIPPED: string;
    };
    function getPrefixStyleName(name: string, element?: any): string;
    function getPrefix(name: string, element: any): string;
}
declare namespace gd3d.framework {
    class DeviceInfo {
        private static debuginfo;
        private static getExtension;
        static readonly GraphDevice: string;
        static readonly CanvasWidth: number;
        static readonly CanvasHeight: number;
        static readonly ScreenAdaptiveType: string;
        static readonly ScreenWidth: number;
        static readonly ScreenHeight: number;
    }
    enum DrawCallEnum {
        UI = 0,
        SKinrender = 1,
        Meshrender = 2,
        EffectSystem = 3
    }
    class DrawCallInfo {
        private static _inc;
        static readonly inc: DrawCallInfo;
        static BeActived: boolean;
        data: number[];
        currentState: DrawCallEnum;
        reset(): void;
        add(): void;
        private SKinrenderDraw;
        private MeshrenderDraw;
        private EffectrenderDraw;
        private UIrenderDraw;
        private rootdiv;
        private initShowPlane;
        showPerFrame(): void;
        showDrawcallInfo(): void;
        closeDrawCallInfo(): void;
    }
}
declare namespace gd3d.framework {
    class sceneMgr {
        private static _ins;
        static readonly ins: sceneMgr;
        static app: application;
        static scene: scene;
    }
}
declare namespace Stats {
    class Stats {
        constructor(app: gd3d.framework.application);
        update(): void;
        app: gd3d.framework.application;
        container: HTMLDivElement;
        private mode;
        private REVISION;
        private beginTime;
        private prevTime;
        private frames;
        private fpsPanel;
        private msPanel;
        private memPanel;
        private ratePanel;
        private userratePanel;
        private showPanel;
        private addPanel;
        private begin;
        private end;
    }
}
declare namespace gd3d {
    var gd3d_reflect_root: {};
    namespace reflect {
        function getPrototypes(): {
            [id: string]: any;
        };
        function getPrototype(name: string): any;
        function createInstance(prototype: any, matchTag: {
            [id: string]: string;
        }): any;
        function getClassName(prototype: any): any;
        function getClassTag(prototype: any, tag: string): any;
        function getMeta(prototype: any): any;
        function attr_Class(constructorObj: any): void;
        function attr_Func(customInfo?: {
            [id: string]: string;
        }): (target: any, propertyKey: string, value: any) => void;
        function attr_Field(customInfo?: {
            [id: string]: string;
        }): (target: Object, propertyKey: string) => void;
        function userCode(constructorObj: any): void;
        function editorCode(constructorObj: any): void;
        function selfClone(constructorObj: any): void;
        function nodeComponent(constructorObj: any): void;
        function nodeComponentInspector(constructorObj: any): void;
        function nodeRender(constructorObj: any): void;
        function nodeCamera(constructorObj: any): void;
        function nodeLight(constructorObj: any): void;
        function nodeBoxCollider(constructorObj: any): void;
        function nodeBoxCollider2d(constructorObj: any): void;
        function nodeSphereCollider(constructorObj: any): void;
        function nodeEffectBatcher(constructorObj: any): void;
        function nodeMeshCollider(constructorObj: any): void;
        function nodeCanvasRendererCollider(constructorObj: any): void;
        function node2DComponent(constructorObj: any): void;
        function pluginMenuItem(constructorObj: any): void;
        function pluginWindow(constructorObj: any): void;
        function pluginExt(constructorObj: any): void;
        function compValue(integer?: boolean, defvalue?: number, min?: number, max?: number): (target: Object, propertyKey: string) => void;
        function compCall(customInfo?: {
            [id: string]: string;
        }): (target: any, propertyKey: string, value: any) => void;
        function SerializeType(constructorObj: any): void;
        function Field(valueType: string, defaultValue?: any, referenceType?: string): (target: Object, propertyKey: string) => void;
        function UIComment(comment: string): (target: Object, propertyKey: string) => void;
        enum FieldUIStyle {
            None = 0,
            RangeFloat = 1,
            MultiLineString = 2,
            Enum = 3
        }
        function UIStyle(style: string, min?: number, max?: number, defvalue?: any): (target: Object, propertyKey: string) => void;
    }
}
declare namespace gd3d.math {
    type byte = number;
    type ubyte = number;
    type short = number;
    type int = number;
    type ushort = number;
    type uint = number;
    type float = number;
    type double = number;
    function UByte(v?: number | string): ubyte;
    function Byte(v?: number | string): byte;
    function Int16(v?: number | string): short;
    function Int32(v?: number | string): int;
    function UInt16(v?: number | string): ushort;
    function UInt32(v?: number | string): uint;
    function Float(v?: number | string): float;
    function Double(v?: number | string): double;
    class vector2 {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(x?: float, y?: float);
        x: float;
        y: float;
        toString(): string;
    }
    class rect {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(x?: float, y?: float, w?: float, h?: float);
        x: float;
        y: float;
        w: float;
        h: float;
        toString(): string;
    }
    class border {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(l?: float, t?: float, r?: float, b?: float);
        l: float;
        t: float;
        r: float;
        b: float;
        toString(): string;
    }
    class color {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(r?: float, g?: float, b?: float, a?: float);
        r: float;
        g: float;
        b: float;
        a: float;
        toString(): string;
    }
    class vector3 {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(x?: float, y?: float, z?: float);
        x: float;
        y: float;
        z: float;
        toString(): string;
    }
    class vector4 {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(x?: float, y?: float, z?: float, w?: float);
        x: float;
        y: float;
        z: float;
        w: float;
        toString(): string;
    }
    class quaternion {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(x?: float, y?: float, z?: float, w?: float);
        x: float;
        y: float;
        z: float;
        w: float;
        toString(): string;
    }
    class matrix {
        static readonly ClassName: string;
        rawData: Float32Array;
        constructor(datas?: Float32Array);
        toString(): string;
    }
    class matrix3x2 {
        rawData: Float32Array;
        constructor(datas?: Float32Array);
        toString(): string;
    }
    function vec4FormJson(json: string, vec4: vector4): void;
    function vec3FormJson(json: string, vec3: vector3): void;
    function vec2FormJson(json: string, vec2: vector2): void;
    function colorFormJson(json: string, _color: color): void;
}
declare namespace gd3d.framework {
    class batcher2D {
        private mesh;
        private drawMode;
        private vboCount;
        private curPass;
        private eboCount;
        private dataForVbo;
        private dataForEbo;
        initBuffer(webgl: WebGLRenderingContext, vf: render.VertexFormatMask, drawMode: render.DrawModeEnum): void;
        begin(webgl: WebGLRenderingContext, pass: render.glDrawPass): void;
        private static limitCount;
        push(webgl: WebGLRenderingContext, vbodata: number[], ebodata: number[]): void;
        end(webgl: WebGLRenderingContext): void;
    }
    class canvas {
        static readonly ClassName: string;
        constructor();
        is2dUI: boolean;
        isDrawByDepth: boolean;
        parentTrans: transform;
        batcher: batcher2D;
        webgl: WebGLRenderingContext;
        scene: scene;
        addChild(node: transform2D): void;
        removeChild(node: transform2D): void;
        getChildren(): transform2D[];
        getChildCount(): number;
        getChild(index: number): transform2D;
        private pointDown;
        private pointEvent;
        private pointX;
        private pointY;
        private lastWidth;
        private lastHeight;
        update(delta: number, touch: Boolean, XOnModelSpace: number, YOnModelSpace: number): void;
        private objupdate;
        private lastMat;
        afterRender: Function;
        beforeRender: Function;
        render(context: renderContext, assetmgr: assetMgr): void;
        pushRawData(mat: material, data: number[]): void;
        private context;
        private lastMaskSta;
        private lastMaskV4;
        assetmgr: assetMgr;
        drawScene(node: transform2D, context: renderContext, assetmgr: assetMgr): void;
        static readonly depthTag = "__depthTag__";
        static readonly flowIndexTag = "__flowIndexTag__";
        private rendererDic;
        private depthList;
        private sortedList;
        private canvasBounds;
        private readonly qt_maxObjNum;
        private readonly qt_maxlevel;
        private depthQTree;
        private drawSceneByDepth;
        private helpMap;
        private sortDepthList;
        private flowCount;
        private collectToDepthL;
        private checkBottomUI;
        pixelWidth: number;
        pixelHeight: number;
        private rootNode;
        getRoot(): transform2D;
        ModelPosToCanvasPos(fromP: math.vector2, outP: math.vector2): void;
        CanvasPosToModelPos(canvasPos: math.vector2, outModelPos: math.vector2): void;
    }
}
declare namespace gd3d.framework {
    class canvasRenderer implements IRenderer, ICollider {
        static readonly ClassName: string;
        constructor();
        renderLayer: number;
        subTran: transform;
        getBound(): any;
        intersectsTransform(tran: transform): boolean;
        layer: RenderLayerEnum;
        queue: number;
        gameObject: gameObject;
        canvas: canvas;
        inputmgr: inputMgr;
        cameraTouch: camera;
        start(): void;
        onPlay(): void;
        addChild(node: transform2D): void;
        removeChild(node: transform2D): void;
        getChildren(): transform2D[];
        getChildCount(): number;
        getChild(index: number): transform2D;
        update(delta: number): void;
        pickModelPos(ray: gd3d.framework.ray, outModelPos: math.vector2): boolean;
        pickAll2d(ray: gd3d.framework.ray): transform2D[];
        pick2d(ray: gd3d.framework.ray): transform2D;
        private cupTans2ds;
        private dopick2d;
        calScreenPosToCanvasPos(camera: framework.camera, screenPos: gd3d.math.vector2, outCanvasPos: gd3d.math.vector2): void;
        calCanvasPosToWorldPos(from: math.vector2, out: math.vector3): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    enum UIScaleMode {
        CONSTANT_PIXEL_SIZE = 0,
        SCALE_WITH_SCREEN_SIZE = 1
    }
    class overlay2D implements IOverLay {
        static readonly ClassName: string;
        constructor();
        init: boolean;
        private camera;
        private app;
        private inputmgr;
        start(camera: camera): void;
        canvas: canvas;
        screenMatchRate: number;
        matchReference_width: number;
        matchReference_height: number;
        scaleMode: UIScaleMode;
        sortOrder: number;
        addChild(node: transform2D): void;
        removeChild(node: transform2D): void;
        getChildren(): transform2D[];
        getChildCount(): number;
        getChild(index: number): transform2D;
        render(context: renderContext, assetmgr: assetMgr, camera: camera): void;
        private viewPixelrect;
        private helpv2;
        private helpv2_1;
        update(delta: number): void;
        private lastVPRect;
        private lastScreenMR;
        private lastMR_width;
        private lastMR_height;
        private ckScaleMode;
        pick2d(mx: number, my: number, tolerance?: number): transform2D;
        private dopick2d;
        calScreenPosToCanvasPos(screenPos: gd3d.math.vector2, outCanvasPos: gd3d.math.vector2): void;
        calCanvasPosToScreenPos(canvasPos: gd3d.math.vector2, outScreenPos: gd3d.math.vector2): void;
        calScreenPosToModelPos(screenPos: gd3d.math.vector2, outModelPos: gd3d.math.vector2): void;
        calModelPosToScreenPos(modelPos: gd3d.math.vector2, outScreenPos: gd3d.math.vector2): void;
    }
}
declare namespace gd3d.framework {
    enum layoutOption {
        LEFT = 1,
        TOP = 2,
        RIGHT = 4,
        BOTTOM = 8,
        H_CENTER = 16,
        V_CENTER = 32
    }
    interface I2DComponent {
        onPlay(): any;
        start(): any;
        update(delta: number): any;
        transform: transform2D;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): any;
        remove(): any;
    }
    interface ICollider2d {
        transform: transform2D;
        getBound(): obb2d;
        intersectsTransform(tran: transform2D): boolean;
    }
    interface IRectRenderer extends I2DComponent {
        render(canvas: canvas): any;
        updateTran(): any;
        getMaterial(): gd3d.framework.material;
        getDrawBounds(): gd3d.math.rect;
    }
    class C2DComponent {
        static readonly ClassName: string;
        comp: I2DComponent;
        init: boolean;
        constructor(comp: I2DComponent, init?: boolean);
    }
    class transform2D {
        static readonly ClassName: string;
        private _canvas;
        prefab: string;
        canvas: canvas;
        layer: number;
        tag: string;
        name: string;
        isStatic: boolean;
        parent: transform2D;
        children: transform2D[];
        width: number;
        height: number;
        pivot: math.vector2;
        hideFlags: HideFlags;
        private _visible;
        readonly visibleInScene: boolean;
        visible: boolean;
        readonly transform: this;
        insId: insID;
        private dirty;
        private dirtyChild;
        private dirtyWorldDecompose;
        localTranslate: math.vector2;
        localScale: math.vector2;
        localRotate: number;
        private _maskRect;
        private _temp_maskRect;
        readonly maskRect: math.rect;
        private _isMask;
        isMask: boolean;
        private updateMaskRect;
        private _parentIsMask;
        readonly parentIsMask: boolean;
        private localMatrix;
        private worldMatrix;
        private canvasWorldMatrix;
        private worldRotate;
        private worldTranslate;
        private worldScale;
        addChild(node: transform2D): void;
        addChildAt(node: transform2D, index: number): void;
        removeChild(node: transform2D): void;
        removeAllChild(): void;
        markDirty(): void;
        updateTran(parentChange: boolean): void;
        updateWorldTran(): void;
        private CalcReCanvasMtx;
        private decomposeWorldMatrix;
        getWorldTranslate(): math.vector2;
        getWorldScale(): math.vector2;
        getWorldRotate(): math.angelref;
        getLocalMatrix(): gd3d.math.matrix3x2;
        getWorldMatrix(): gd3d.math.matrix3x2;
        getCanvasWorldMatrix(): gd3d.math.matrix3x2;
        static getTransInfoInCanvas(trans: transform2D, out: t2dInfo): void;
        setWorldPosition(pos: math.vector2): void;
        dispose(): void;
        renderer: IRectRenderer;
        collider: ICollider2d;
        components: C2DComponent[];
        private componentsInit;
        private componentplayed;
        update(delta: number): void;
        init(bePlayed?: boolean): void;
        addComponent(type: string): I2DComponent;
        addComponentDirect(comp: I2DComponent): I2DComponent;
        removeComponent(comp: I2DComponent): void;
        removeComponentByTypeName(type: string): C2DComponent;
        removeAllComponents(): void;
        getComponent(type: string): I2DComponent;
        getComponents(): I2DComponent[];
        getComponentsInChildren(type: string): I2DComponent[];
        private getNodeCompoents;
        onCapturePointEvent(canvas: canvas, ev: PointEvent): void;
        ContainsCanvasPoint(ModelPos: math.vector2, tolerance?: number): boolean;
        onPointEvent(canvas: canvas, ev: PointEvent): void;
        private readonly optionArr;
        private _layoutState;
        layoutState: number;
        private layoutValueMap;
        setLayoutValue(option: layoutOption, value: number): void;
        getLayoutValue(option: layoutOption): number;
        private _layoutPercentState;
        layoutPercentState: number;
        private layoutDirty;
        private lastWidth;
        private lastHeight;
        private lastParentWidth;
        private lastParentHeight;
        private lastParentPivot;
        private lastPivot;
        private refreshLayout;
        private getLayValue;
        setSiblingIndex(siblingIndex: number): void;
        getSiblingIndex(): number;
        clone(): transform2D;
    }
    class t2dInfo {
        pivot: math.vector2;
        pivotPos: math.vector2;
        width: number;
        height: number;
        rot: number;
        static getCenter(info: t2dInfo, outCenter: math.vector2): void;
    }
}
declare namespace gd3d.framework {
    class behaviour2d implements I2DComponent {
        transform: transform2D;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    class boxcollider2d implements I2DComponent, ICollider2d {
        static readonly ClassName: string;
        transform: transform2D;
        private _obb;
        getBound(): obb2d;
        intersectsTransform(tran: transform2D): boolean;
        private build;
        refreshTofullOver(): void;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    enum TransitionType {
        None = 0,
        ColorTint = 1,
        SpriteSwap = 2
    }
    class button implements I2DComponent, event.IUIEventer {
        static readonly ClassName: string;
        private _transition;
        transition: TransitionType;
        private _originalColor;
        private _originalSprite;
        private _origianlSpriteName;
        private _pressedSpriteName;
        private _targetImage;
        targetImage: image2D;
        private _pressedSprite;
        pressedGraphic: sprite;
        private _normalColor;
        normalColor: math.color;
        private _pressedColor;
        pressedColor: math.color;
        private _fadeDuration;
        fadeDuration: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        transform: transform2D;
        remove(): void;
        private downPointV2;
        private isMovedLimit;
        private readonly movedLimit;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        private UIEventer;
        addListener(eventEnum: event.UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        removeListener(eventEnum: event.UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        private _downInThis;
        private _dragOut;
        private showNormal;
        private showPress;
        private tryGetSprite;
        private changeColor;
        private changeSprite;
    }
}
declare namespace gd3d.framework {
    class image2D implements IRectRenderer {
        static readonly ClassName: string;
        constructor();
        private _unitLen;
        private datar;
        private _sprite;
        private needRefreshImg;
        color: math.color;
        private static readonly defUIShader;
        private static readonly defMaskUIShader;
        private _CustomShaderName;
        setShaderByName(shaderName: string): void;
        getMaterial(): material;
        private _darwRect;
        getDrawBounds(): math.rect;
        private _uimat;
        private readonly uimat;
        private _imageType;
        imageType: ImageType;
        private _fillMethod;
        fillMethod: FillMethod;
        private _fillAmmount;
        fillAmmount: number;
        transform: transform2D;
        sprite: sprite;
        private _spriteName;
        private _imageBorder;
        readonly imageBorder: math.border;
        render(canvas: canvas): void;
        private searchTexture;
        private _cacheMaskV4;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        private prepareData;
        updateTran(): void;
        private min_x;
        private max_x;
        private min_y;
        private max_y;
        private calcDrawRect;
        private updateQuadData;
        private updateSimpleData;
        private updateSlicedData;
        private updateFilledData;
        private updateTiledData;
    }
    enum ImageType {
        Simple = 0,
        Sliced = 1,
        Tiled = 2,
        Filled = 3
    }
    enum FillMethod {
        Horizontal = 0,
        Vertical = 1,
        Radial_90 = 2,
        Radial_180 = 3,
        Radial_360 = 4
    }
}
declare namespace gd3d.framework {
    class inputField implements I2DComponent {
        static readonly ClassName: string;
        transform: transform2D;
        private _frameImage;
        frameImage: image2D;
        private customRegexStr;
        private beFocus;
        private inputElement;
        private _text;
        readonly text: string;
        private _charlimit;
        characterLimit: number;
        private _lineType;
        LineType: lineType;
        private _contentType;
        ContentType: number;
        private _textLable;
        TextLabel: label;
        private _placeholderLabel;
        PlaceholderLabel: label;
        private layoutRefresh;
        start(): void;
        onPlay(): void;
        private inputElmLayout;
        private textRefresh;
        private filterContentText;
        update(delta: number): void;
        remove(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
    enum lineType {
        SingleLine = 0,
        MultiLine = 1
    }
    enum contentType {
        None = 0,
        Number = 1,
        Word = 2,
        Underline = 4,
        ChineseCharacter = 8,
        NoneChineseCharacter = 16,
        Email = 32,
        PassWord = 64,
        Custom = 128
    }
}
declare namespace gd3d.framework {
    class label implements IRectRenderer {
        static readonly ClassName: string;
        private _text;
        text: string;
        private initdater;
        private _font;
        font: font;
        private needRefreshFont;
        private _fontName;
        private _fontsize;
        fontsize: number;
        linespace: number;
        horizontalType: HorizontalType;
        verticalType: VerticalType;
        horizontalOverflow: boolean;
        verticalOverflow: boolean;
        private indexarr;
        private remainarrx;
        updateData(_font: gd3d.framework.font): void;
        private data_begin;
        private datar;
        color: math.color;
        color2: math.color;
        private static readonly defUIShader;
        private static readonly defMaskUIShader;
        private _CustomShaderName;
        setShaderByName(shaderName: string): void;
        getMaterial(): material;
        private _darwRect;
        getDrawBounds(): math.rect;
        private _uimat;
        private readonly uimat;
        private dirtyData;
        render(canvas: canvas): void;
        private searchTexture;
        private _cacheMaskV4;
        updateTran(): void;
        private min_x;
        private max_x;
        private min_y;
        private max_y;
        private calcDrawRect;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        transform: transform2D;
        remove(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
    enum HorizontalType {
        Center = 0,
        Left = 1,
        Right = 2
    }
    enum VerticalType {
        Center = 0,
        Top = 1,
        Boom = 2
    }
}
declare namespace gd3d.framework {
    class progressbar implements I2DComponent {
        static readonly ClassName: string;
        private _cutPanel;
        cutPanel: transform2D;
        private _barBg;
        barBg: image2D;
        private _barOverImg;
        barOverImg: image2D;
        private _value;
        value: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private refreshBar;
        private adjustOverImg;
        transform: transform2D;
        remove(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
}
declare namespace gd3d.framework {
    class rawImage2D implements IRectRenderer {
        static readonly ClassName: string;
        private datar;
        private _image;
        private needRefreshImg;
        image: texture;
        color: math.color;
        private static readonly defUIShader;
        private static readonly defMaskUIShader;
        private _CustomShaderName;
        setShaderByName(shaderName: string): void;
        getMaterial(): material;
        private _darwRect;
        getDrawBounds(): math.rect;
        private _uimat;
        private readonly uimat;
        render(canvas: canvas): void;
        private _cacheMaskV4;
        updateTran(): void;
        private min_x;
        private max_x;
        private min_y;
        private max_y;
        private calcDrawRect;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        transform: transform2D;
        remove(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
}
declare namespace gd3d.framework {
    class scrollRect implements I2DComponent {
        static readonly ClassName: string;
        private _content;
        content: transform2D;
        horizontal: boolean;
        vertical: boolean;
        inertia: boolean;
        decelerationRate: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        transform: transform2D;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        private isPointDown;
        private lastPoint;
        private strPoint;
        private strPos;
        private SlideTo;
        private readonly collectNum;
        private points;
        private collectPointing;
        private flyVelocity;
        private onInertiaSliderUp;
        private canfly;
        private readonly threshold;
        private readonly cgTime;
        private cgCount;
        private lastfv;
        private flyingSlidr;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    class uirect implements I2DComponent {
        static readonly ClassName: string;
        canbeClick: boolean;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        transform: transform2D;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    interface I2DBody {
        initData: IBodyData;
        transform: transform2D;
        body: Ibody;
        addForce(Force: gd3d.math.vector2): any;
        setVelocity(velocity: math.vector2): any;
        setDesity(Desity: number): any;
        setFrictionAir(frictionAir: number): any;
        setFriction(friction: number): any;
        setFrictionStatic(frictionStatic: number): any;
        setRestitution(restitution: number): any;
        setMass(mass: number): any;
    }
    interface IBodyData {
        mass?: number;
        density?: number;
        inertia?: number;
        restitution?: number;
        frictionStatic?: number;
        frictionAir?: number;
        friction?: number;
        collisionFilter?: collisionFilter;
        slop?: number;
        isStatic?: boolean;
        type?: string;
        tag?: string;
        name?: string;
    }
    class bassBody implements I2DBody {
        transform: transform2D;
        body: Ibody;
        m_velocity: math.vector2;
        addForce(Force: math.vector2): void;
        setVelocity(velocity: math.vector2): void;
        setAngularVelocity(velocity: number): void;
        readonly angularVelocity: number;
        readonly speed: number;
        readonly velocity: math.vector2;
        type: string;
        readonly collisionFilter: collisionFilter;
        tag: string;
        name: string;
        setDesity(Desity: number): void;
        setFrictionAir(frictionAir: number): void;
        setFriction(friction: number): void;
        setFrictionStatic(frictionStatic: number): void;
        setRestitution(restitution: number): void;
        setMass(mass: number): void;
        initData: IBodyData;
        setInitData(att: IBodyData): void;
        setPosition(pos: math.vector2): void;
        update(delta: number): void;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    class circleBody extends bassBody implements I2DComponent, I2DBody {
        static readonly ClassName: string;
        transform: transform2D;
        radius: number;
        start(): void;
        onPlay(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
}
declare namespace gd3d.framework {
    interface Itiming {
        timeScale?: number;
        timestamp?: number;
    }
    interface IEngine2DOP {
        constraintIterations?: number;
        timing?: Itiming;
        velocityIterations?: number;
    }
    class physicEngine2D {
        matterEngine: any;
        private engineWorld;
        private matterVector;
        constructor(op?: IEngine2DOP);
        update(delta: number): void;
        creatRectBodyByInitData(posx: number, posy: number, width: number, height: number, initData: IBodyData): any;
        creatCircleBodyByInitData(posx: number, posy: number, radius: number, initData: IBodyData): any;
        addBody(body: Ibody): void;
        applyForce(body: Ibody, positon: math.vector2, force: math.vector2): void;
        applyForceAtCenter(body: Ibody, force: math.vector2): void;
        setGravity(x: number, y: number): void;
        setVelocity(body: Ibody, velocity: math.vector2): void;
        setPosition(body: Ibody, pos: math.vector2): void;
        setMass(body: Ibody, mass: number): void;
        setDesity(body: Ibody, Desity: number): void;
        setFrictionAir(body: Ibody, frictionAir: number): void;
        setFriction(body: Ibody, friction: number): void;
        setFrictionStatic(body: Ibody, frictionStatic: number): void;
        setRestitution(body: Ibody, restitution: number): void;
        setAngularVelocity(body: Ibody, angularVelocity: number): void;
        private set;
        addEvent(eventname: string, callback: Function): void;
        removeEvent(eventname: string, callback: Function): void;
        removeBody(body: Ibody): void;
    }
    interface Ibody {
        angle: number;
        position: matterVector;
        speed: number;
        type: string;
        tag: string;
        name: string;
        angularVelocity: number;
        velocity: matterVector;
        collisionFilter: collisionFilter;
        applyForce(body: Ibody, positon: matterVector, force: matterVector): void;
    }
    interface matterVector {
        x: number;
        y: number;
        create(x: number, y: number): matterVector;
    }
    interface collisionFilter {
        group?: number;
        category?: number;
        mask?: number;
    }
}
declare namespace gd3d.framework {
    class rectBody extends bassBody implements I2DComponent, I2DBody {
        static readonly ClassName: string;
        transform: transform2D;
        start(): void;
        onPlay(): void;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean): void;
    }
}
declare namespace gd3d.framework {
    class resID {
        constructor();
        private static idAll;
        private static next;
        private id;
        getID(): number;
    }
    class constText {
        constructor(text: string);
        private name;
        getText(): string;
    }
    interface IAsset {
        defaultAsset: boolean;
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): any;
        caclByteLength(): number;
    }
}
declare namespace gd3d.framework {
    class assetBundle {
        name: string;
        private id;
        assetmgr: assetMgr;
        private files;
        private packages;
        private bundlePackBin;
        private bundlePackJson;
        url: string;
        path: string;
        totalLength: number;
        loadLightMap: boolean;
        constructor(url: string);
        loadCompressBundle(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetmgr: assetMgr): void;
        parse(json: any, totalLength?: number): void;
        unload(): void;
        load(assetmgr: assetMgr, onstate: (state: stateLoad) => void, state: stateLoad): void;
        downloadFinsih(state: any, list: any, haveBin: boolean, onstate: any, packlist: any, mapPackes: any, assetmgr: assetMgr, handles: any): void;
        NextHandle(list: any, state: any, onstate: any): void;
        private mapIsNull;
        mapNamed: {
            [id: string]: number;
        };
    }
}
declare namespace gd3d.framework {
    enum AssetTypeEnum {
        Unknown = 0,
        Auto = 1,
        Bundle = 2,
        CompressBundle = 3,
        GLVertexShader = 4,
        GLFragmentShader = 5,
        Shader = 6,
        Texture = 7,
        TextureDesc = 8,
        Mesh = 9,
        Prefab = 10,
        Material = 11,
        Aniclip = 12,
        KeyFrameAniclip = 13,
        Scene = 14,
        Atlas = 15,
        Font = 16,
        TextAsset = 17,
        PackBin = 18,
        PackTxt = 19,
        PathAsset = 20,
        PVR = 21,
        F14Effect = 22,
        DDS = 23
    }
    class ResourceState {
        res: IAsset;
        state: number;
        loadedLength: number;
    }
    class RefResourceState extends ResourceState {
        refLoadedLength: number;
    }
    class stateLoad {
        isloadFail: boolean;
        iserror: boolean;
        isfinish: boolean;
        resstate: {
            [id: string]: ResourceState;
        };
        resstateFirst: ResourceState;
        curtask: number;
        totaltask: number;
        readonly fileProgress: number;
        readonly curByteLength: number;
        totalByteLength: number;
        readonly progress: number;
        progressCall: boolean;
        compressTextLoaded: number;
        compressBinLoaded: number;
        logs: string[];
        errs: Error[];
        url: string;
    }
    class assetMgr {
        app: application;
        webgl: WebGLRenderingContext;
        shaderPool: gd3d.render.shaderPool;
        constructor(app: application);
        initDefAsset(): void;
        mapShader: {
            [id: string]: shader;
        };
        getShader(name: string): shader;
        mapDefaultMesh: {
            [id: string]: mesh;
        };
        getDefaultMesh(name: string): mesh;
        mapDefaultTexture: {
            [id: string]: texture;
        };
        getDefaultTexture(name: string): texture;
        mapDefaultCubeTexture: {
            [id: string]: texture;
        };
        getDefaultCubeTexture(name: string): texture;
        mapDefaultSprite: {
            [id: string]: sprite;
        };
        getDefaultSprite(name: string): sprite;
        mapMaterial: {
            [id: string]: material;
        };
        getMaterial(name: string): material;
        mapBundle: {
            [id: string]: assetBundle;
        };
        mapRes: {
            [id: number]: assetRef;
        };
        mapNamed: {
            [id: string]: number[];
        };
        getAsset(id: number): IAsset;
        getAssetByName(name: string, bundlename?: string): IAsset;
        getAssetBundle(bundlename: string): assetBundle;
        static useBinJs: boolean;
        private static bin;
        static correctFileName(name: string): string;
        static txt: string;
        static correctTxtFileName(name: string): string;
        unuse(res: IAsset, disposeNow?: boolean): void;
        use(res: IAsset): void;
        private readonly _loadingTag;
        regRes(name: string, asset: IAsset): void;
        releaseUnuseAsset(): void;
        getAssetsRefcount(): {
            [id: string]: number;
        };
        private mapInLoad;
        removeAssetBundle(name: string): void;
        private assetUrlDic;
        setAssetUrl(asset: IAsset, url: string): void;
        getAssetUrl(asset: IAsset): string;
        loadSingleRes(url: string, type: AssetTypeEnum, onstate: (state: stateLoad) => void, state: stateLoad, asset: IAsset, call: (handle: any) => void): void;
        loadResByPack(respack: any, url: string, type: AssetTypeEnum, onstate: (state: stateLoad) => void, state: stateLoad, asset: IAsset, call: (handle: any) => void): void;
        private assetFactorys;
        private regAssetFactory;
        private getAssetFactory;
        private initAssetFactorys;
        private waitStateDic;
        doWaitState(name: string, state: stateLoad): void;
        private waitQueueState;
        private loadingQueueState;
        private loadingCountLimit;
        private checkFreeChannel;
        private unPkg;
        loadCompressBundle(url: string, onstate?: (state: stateLoad) => void): void;
        maploaded: {
            [url: string]: IAsset;
        };
        load(url: string, type?: AssetTypeEnum, onstate?: (state: stateLoad) => void): void;
        private loadForNoCache;
        unload(url: string, onstate?: () => void): void;
        waitlightmapScene: {
            [sceneurl: string]: string[];
        };
        loadSceneAssetbundleWithoutLightMap(url: string, type?: AssetTypeEnum, onstate?: (state: stateLoad) => void): void;
        loadSceneLightmap(sceneurl: string): void;
        loadScene(sceneName: string, onComplete: (firstChilds: Array<transform>) => void): void;
        saveScene(fun: (data: SaveInfo, resourses?: string[]) => void): void;
        savePrefab(trans: transform, prefabName: string, fun: (data: SaveInfo, resourses?: string[], contents?: any[]) => void): void;
        saveMaterial(mat: material, fun: (data: SaveInfo) => void): void;
        loadSingleResImmediate(url: string, type: AssetTypeEnum): any;
        loadImmediate(url: string, type?: AssetTypeEnum): any;
        getFileName(url: string): string;
        calcType(url: string | any): AssetTypeEnum;
        private particlemat;
        getDefParticleMat(): material;
    }
    class assetRef {
        asset: IAsset;
        refcount: number;
    }
    class SaveInfo {
        files: {
            [key: string]: string;
        };
    }
}
declare class PvrParse {
    private version;
    private flags;
    private pixelFormatH;
    private pixelFormatL;
    private channelType;
    height: number;
    width: number;
    private depth;
    private numFaces;
    private mipMapCount;
    private metaDataSize;
    private gl;
    constructor(gl: WebGLRenderingContext);
    parse(_buffer: ArrayBuffer): gd3d.render.glTexture2D;
    private parseV3;
}
declare enum ChannelTypes {
    UnsignedByteNorm = 0,
    SignedByteNorm = 1,
    UnsignedByte = 2,
    SignedByte = 3,
    UnsignedShortNorm = 4,
    SignedShortNorm = 5,
    UnsignedShort = 6,
    SignedShort = 7,
    UnsignedIntegerNorm = 8,
    SignedIntegerNorm = 9,
    UnsignedInteger = 10,
    SignedInteger = 11,
    SignedFloat = 12,
    Float = 12,
    UnsignedFloat = 13
}
declare namespace gd3d.framework {
    class defmaterial {
        static initDefaultMaterial(assetmgr: assetMgr): void;
    }
}
declare namespace gd3d.framework {
    class defMesh {
        static initDefaultMesh(assetmgr: assetMgr): void;
        private static createDefaultMesh;
    }
}
declare namespace gd3d.framework {
    class defShader {
        static shader0: string;
        static vscode: string;
        static fscode: string;
        static fscode2: string;
        static uishader: string;
        static fscodeUI: string;
        static vscodeUI: string;
        static vscodeMaskUI: string;
        static fscodeMaskUI: string;
        static shaderuifront: string;
        static vscodefontUI: string;
        static fscodefontUI: string;
        static vscodeuifontmask: string;
        static fscodeuifontmask: string;
        static diffuseShader: string;
        static vsdiffuse: string;
        static fsdiffuse: string;
        static vsline: string;
        static fsline: string;
        static materialShader: string;
        static vsmaterialcolor: string;
        static initDefaultShader(assetmgr: assetMgr): void;
    }
}
declare namespace gd3d.framework {
    class defsprite {
        static initDefaultSprite(assetmgr: assetMgr): void;
    }
}
declare namespace gd3d.framework {
    class defTexture {
        static initDefaultTexture(assetmgr: assetMgr): void;
        private static initDefaultCubeTexture;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Aniclip implements IAssetFactory {
        newAsset(): animationClip;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: animationClip, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: animationClip, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Atlas implements IAssetFactory {
        newAsset(): atlas;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: atlas, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: atlas, call: (handle: () => void) => void): void;
    }
}
declare var WebGLTextureUtil: any;
declare namespace gd3d.framework {
    class AssetFactory_DDS implements IAssetFactory {
        newAsset(): texture;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_f14eff implements IAssetFactory {
        newAsset(): f14eff;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: f14eff, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: f14eff, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Font implements IAssetFactory {
        newAsset(filename?: string): font;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: font, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: font, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_GLFragmentShader implements IAssetFactory {
        newAsset(): IAsset;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_GLVertexShader implements IAssetFactory {
        newAsset(): IAsset;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    interface IAssetFactory {
        newAsset(assetName?: string): IAsset;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void): void;
    }
    class AssetFactoryTools {
        static catchError(err: Error, onstate: (state: stateLoad) => void, state: stateLoad): boolean;
        static useAsset(assetMgr: assetMgr, onstate: (state: stateLoad) => void, state: stateLoad, asset: IAsset, url: string): void;
        static onProgress(loadedLength: number, totalLength: number, onstate: (state: stateLoad) => void, state: stateLoad, filename: string): void;
        static onRefProgress(loadedLength: number, totalLength: number, onstate: (state: stateLoad) => void, state: stateLoad, filename: string): void;
    }
    function getFileName(url: string): string;
}
declare namespace gd3d.framework {
    class assetfactory_keyFrameAniClip implements IAssetFactory {
        newAsset(): keyFrameAniClip;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: keyFrameAniClip, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: keyFrameAniClip, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Material implements IAssetFactory {
        newAsset(filename?: string): material;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: material, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: material, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Mesh implements IAssetFactory {
        newAsset(): mesh;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: mesh, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: mesh, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_PathAsset implements IAssetFactory {
        newAsset(): pathasset;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: pathasset, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: pathasset, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Prefab implements IAssetFactory {
        newAsset(): prefab;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: prefab, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: prefab, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_PVR implements IAssetFactory {
        newAsset(): texture;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Scene implements IAssetFactory {
        newAsset(): rawscene;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: rawscene, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: rawscene, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Shader implements IAssetFactory {
        newAsset(): shader;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: shader, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: shader, call: (handle: () => void) => void): void;
        private TryParseMap;
        private parseShader;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_TextAsset implements IAssetFactory {
        newAsset(): textasset;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: textasset, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: textasset, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_Texture implements IAssetFactory {
        newAsset(): texture;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class AssetFactory_TextureDesc implements IAssetFactory {
        newAsset(): texture;
        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void): void;
    }
}
declare namespace gd3d.framework {
    class animationClip implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        Parse(buf: ArrayBuffer): threading.gdPromise<any>;
        fps: number;
        loop: boolean;
        readonly time: number;
        boneCount: number;
        bones: string[];
        indexDic: {
            [boneName: string]: number;
        };
        frameCount: number;
        frames: {
            [fid: string]: Float32Array;
        };
        subclipCount: number;
        subclips: subClip[];
    }
    class PoseBoneMatrix {
        static readonly ClassName: string;
        t: math.vector3;
        r: math.quaternion;
        static caclByteLength(): number;
        Clone(): PoseBoneMatrix;
        load(read: io.binReader): void;
        static createDefault(): PoseBoneMatrix;
        copyFrom(src: PoseBoneMatrix): void;
        copyFromData(src: Float32Array, seek: number): void;
        invert(): void;
        lerpInWorld(_tpose: PoseBoneMatrix, from: PoseBoneMatrix, to: PoseBoneMatrix, v: number): void;
        lerpInWorldWithData(_tpose: PoseBoneMatrix, from: PoseBoneMatrix, todata: Float32Array, toseek: number, v: number): void;
        static sMultiply(left: PoseBoneMatrix, right: PoseBoneMatrix, target?: PoseBoneMatrix): PoseBoneMatrix;
        static sMultiplytpose(left: PoseBoneMatrix, right: tPoseInfo, target?: PoseBoneMatrix): PoseBoneMatrix;
        static sMultiplyDataAndMatrix(leftdata: Float32Array, leftseek: number, right: PoseBoneMatrix, target?: PoseBoneMatrix): PoseBoneMatrix;
        static sLerp(left: PoseBoneMatrix, right: PoseBoneMatrix, v: number, target?: PoseBoneMatrix): PoseBoneMatrix;
        private static poolmats;
        static recycle(mat: PoseBoneMatrix): void;
        static create(): PoseBoneMatrix;
    }
    class subClip {
        name: string;
        loop: boolean;
        startframe: number;
        endframe: number;
        static caclByteLength(): number;
    }
}
declare namespace gd3d.framework {
    class atlas implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        texturewidth: number;
        textureheight: number;
        private _texture;
        texture: texture;
        sprites: {
            [id: string]: sprite;
        };
        Parse(jsonStr: string, assetmgr: assetMgr): void;
    }
}
declare namespace gd3d.framework {
    class f14node {
        trans: transform;
        f14Effect: f14EffectSystem;
    }
    class f14eff implements IAsset {
        static readonly ClassName: string;
        defaultAsset: boolean;
        private name;
        private id;
        constructor(assetName?: string);
        assetbundle: string;
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        data: F14EffectData;
        delayTime: number;
        Parse(jsonStr: string, assetmgr: assetMgr): void;
        getDependents(): IAsset[];
        private doSearch;
    }
}
declare namespace gd3d.framework {
    class font implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        private _texture;
        texture: texture;
        cmap: {
            [id: string]: charinfo;
        };
        fontname: string;
        pointSize: number;
        padding: number;
        lineHeight: number;
        baseline: number;
        atlasWidth: number;
        atlasHeight: number;
        Parse(jsonStr: string, assetmgr: assetMgr): void;
    }
    class charinfo {
        x: number;
        y: number;
        w: number;
        h: number;
        xSize: number;
        ySize: number;
        xOffset: number;
        yOffset: number;
        xAddvance: number;
        static caclByteLength(): number;
    }
}
declare namespace gd3d.framework {
    class transform {
        static readonly ClassName: string;
        private helpLRotate;
        private helpLPos;
        private helpLScale;
        private checkLRTSChange;
        private fastEqual;
        private _scene;
        scene: scene;
        name: string;
        insId: insID;
        prefab: string;
        updateWorldTran(): void;
        updateTran(bool: boolean): void;
        private _dirtyAABB;
        private _aabb;
        readonly aabb: aabb;
        private _buildAABB;
        private _children;
        children: transform[];
        private _physicsImpostor;
        physicsImpostor: PhysicsImpostor;
        private _parent;
        readonly parent: transform;
        addChild(node: transform): void;
        addChildAt(node: transform, index: number): void;
        removeAllChild(): void;
        removeChild(node: transform): void;
        find(name: string): transform;
        checkImpactTran(tran: transform): boolean;
        checkImpact(): Array<transform>;
        private doImpact;
        private dirtyLocal;
        private dirtyWorld;
        private dirtify;
        private sync;
        markDirty(): void;
        markHaveComponent(): void;
        markHaveRendererComp(): void;
        hasComponent: boolean;
        hasComponentChild: boolean;
        hasRendererComp: boolean;
        hasRendererCompChild: boolean;
        private _localRotate;
        localRotate: math.quaternion;
        private _localTranslate;
        localTranslate: math.vector3;
        localPosition: math.vector3;
        private _localScale;
        localScale: math.vector3;
        private localMatrix;
        private _localEulerAngles;
        localEulerAngles: math.vector3;
        private worldMatrix;
        private worldRotate;
        private worldTranslate;
        private worldScale;
        getWorldRotate(): math.quaternion;
        setWorldRotate(rotate: math.quaternion): void;
        getWorldTranslate(): math.vector3;
        getWorldPosition(): math.vector3;
        setWorldPosition(pos: math.vector3): void;
        getWorldScale(): math.vector3;
        setWorldScale(scale: math.vector3): void;
        getLocalMatrix(): math.matrix;
        getWorldMatrix(): math.matrix;
        private checkToTop;
        getForwardInWorld(out: math.vector3): void;
        getRightInWorld(out: math.vector3): void;
        getUpInWorld(out: math.vector3): void;
        setWorldMatrix(mat: math.matrix): void;
        lookat(trans: transform): void;
        lookatPoint(point: math.vector3): void;
        private calcLookAt;
        private _gameObject;
        readonly gameObject: gameObject;
        clone(): transform;
        readonly beDispose: boolean;
        private _beDispose;
        onDispose: () => void;
        dispose(): void;
    }
    class insID {
        constructor();
        private static idAll;
        private static next;
        private id;
        getInsID(): number;
    }
}
declare namespace gd3d.framework {
    interface ICollider {
        gameObject: gameObject;
        subTran: transform;
        getBound(): any;
        intersectsTransform(tran: transform): boolean;
    }
    class boxcollider implements INodeComponent, ICollider {
        static readonly ClassName: string;
        gameObject: gameObject;
        subTran: transform;
        filter: meshFilter;
        obb: obb;
        center: math.vector3;
        size: math.vector3;
        getBound(): obb;
        private static _tempMatrix;
        readonly matrix: gd3d.math.matrix;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        _colliderVisible: boolean;
        colliderVisible: boolean;
        intersectsTransform(tran: transform): boolean;
        private build;
        private buildMesh;
        private getColliderMesh;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class meshcollider implements INodeComponent, ICollider {
        static readonly ClassName: string;
        gameObject: gameObject;
        subTran: transform;
        private _mesh;
        private _filter;
        getBound(): mesh;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private _colliderVisible;
        colliderVisible: boolean;
        intersectsTransform(tran: transform): boolean;
        private _builded;
        private ckbuildMesh;
        private getColliderMesh;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class meshFilter implements INodeComponent {
        static readonly ClassName: string;
        gameObject: gameObject;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private _mesh;
        mesh: mesh;
        getMeshOutput(): mesh;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class meshRenderer implements IRenderer {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        materials: material[];
        useGlobalLightMap: boolean;
        lightmapIndex: number;
        lightmapScaleOffset: math.vector4;
        layer: RenderLayerEnum;
        renderLayer: number;
        private issetq;
        _queue: number;
        queue: number;
        filter: meshFilter;
        start(): void;
        onPlay(): void;
        private refreshLayerAndQue;
        update(delta: number): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class skinnedMeshRenderer implements IRenderer {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        layer: RenderLayerEnum;
        renderLayer: number;
        private issetq;
        _queue: number;
        queue: number;
        materials: material[];
        _player: aniplayer;
        readonly player: aniplayer;
        private _mesh;
        mesh: mesh;
        bones: transform[];
        rootBone: transform;
        center: math.vector3;
        size: math.vector3;
        maxBoneCount: number;
        private _efficient;
        private _skeletonMatrixData;
        start(): void;
        onPlay(): void;
        getMatByIndex(index: number): math.matrix;
        intersects(ray: ray, outInfo: pickinfo): boolean;
        update(delta: number): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    enum WrapMode {
        Default = 0,
        Once = 1,
        Clamp = 1,
        Loop = 2,
        PingPong = 4,
        ClampForever = 8
    }
    class keyFrameAniClip implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        Parse(jsonStr: string): void;
        private length;
        readonly wrapMode: WrapMode;
        _wrapMode: WrapMode;
        readonly fps: number;
        private frameRate;
        readonly time: number;
        readonly frameCount: number;
        curves: AnimationCurve[];
    }
    class AnimationCurve {
        path: string;
        type: string;
        propertyName: string;
        keyFrames: keyFrame[];
    }
    class keyFrame {
        inTangent: number;
        outTangent: number;
        tangentMode: number;
        time: number;
        value: number;
    }
}
declare namespace gd3d.framework {
    class UniformData {
        type: render.UniformTypeEnum;
        value: any;
        defaultValue: any;
        resname: string;
        constructor(type: render.UniformTypeEnum, value: any, defaultValue?: any);
    }
    class material implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        dispose(): void;
        use(): void;
        unuse(disposeNow?: boolean): void;
        caclByteLength(): number;
        uploadUnifoms(pass: render.glDrawPass, context: renderContext): void;
        setShader(shader: shader): void;
        getLayer(): RenderLayerEnum;
        private queue;
        getQueue(): number;
        setQueue(queue: number): void;
        getShader(): shader;
        private shader;
        defaultMapUniform: {
            [key: string]: {
                type: render.UniformTypeEnum;
                value?: any;
                becolor?: boolean;
                min?: number;
                max?: number;
            };
        };
        statedMapUniforms: {
            [id: string]: any;
        };
        setFloat(_id: string, _number: number): void;
        setFloatv(_id: string, _numbers: Float32Array): void;
        setVector4(_id: string, _vector4: math.vector4): void;
        setVector4v(_id: string, _vector4v: Float32Array): void;
        setMatrix(_id: string, _matrix: math.matrix): void;
        setMatrixv(_id: string, _matrixv: Float32Array): void;
        setTexture(_id: string, _texture: gd3d.framework.texture, resname?: string): void;
        setCubeTexture(_id: string, _texture: gd3d.framework.texture): void;
        draw(context: renderContext, mesh: mesh, sm: subMeshInfo, basetype?: string, useGLobalLightMap?: boolean): void;
        Parse(assetmgr: assetMgr, json: any, bundleName?: string): void;
        clone(): material;
        save(): string;
    }
}
declare namespace gd3d.framework {
    class mesh implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        glMesh: gd3d.render.glMesh;
        updateByEffect: boolean;
        data: gd3d.render.meshData;
        submesh: subMeshInfo[];
        onReadFinish: () => void;
        private reading;
        private readProcess;
        private readFinish;
        Parse(buf: ArrayBuffer, webgl: WebGLRenderingContext): threading.gdPromise<{}>;
        intersects(ray: ray, matrix: gd3d.math.matrix, outInfo: pickinfo): boolean;
        clone(): mesh;
        private _cacheMinP;
        private _cacheMaxP;
        calcVectexMinMax(outMin: math.vector3, outMax: math.vector3): void;
    }
    class subMeshInfo {
        matIndex: number;
        useVertexIndex: number;
        line: boolean;
        start: number;
        size: number;
    }
}
declare namespace gd3d.framework {
    class pathasset implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(): void;
        dispose(): void;
        caclByteLength(): number;
        paths: gd3d.math.vector3[];
        private type;
        private instertPointcount;
        private items;
        Parse(json: JSON): void;
        private lines;
        private getpaths;
        private getBeisaierPointAlongCurve;
        private vec3Lerp;
    }
    enum pathtype {
        once = 0,
        loop = 1,
        pingpong = 2
    }
    enum epointtype {
        VertexPoint = 0,
        ControlPoint = 1
    }
    class pointitem {
        point: gd3d.math.vector3;
        type: epointtype;
    }
}
declare namespace gd3d.framework {
    class prefab implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        assetbundle: string;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        private trans;
        getCloneTrans(): transform;
        getCloneTrans2D(): transform2D;
        apply(trans: transform): void;
        jsonstr: string;
        Parse(jsonStr: string, assetmgr: assetMgr): void;
    }
}
declare namespace gd3d.framework {
    class rawscene implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        fog: Fog;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        assetbundle: string;
        use(): void;
        unuse(disposeNow?: boolean): void;
        caclByteLength(): number;
        resetLightMap(assetmgr: assetMgr): void;
        private lightmapData;
        Parse(txt: string, assetmgr: assetMgr): void;
        getSceneRoot(): transform;
        useLightMap(scene: scene): void;
        useFog(scene: scene): void;
        useNavMesh(scene: scene): boolean;
        dispose(): void;
        private navMeshJson;
        private rootNode;
        private lightmaps;
    }
    class Fog {
        _Start: number;
        _End: number;
        _Color: gd3d.math.vector4;
        _Density: number;
    }
}
declare namespace gd3d.framework {
    class shader implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        passes: {
            [id: string]: gd3d.render.glDrawPass[];
        };
        defaultMapUniform: {
            [key: string]: {
                type: render.UniformTypeEnum;
                value?: any;
                becolor?: boolean;
                min?: number;
                max?: number;
            };
        };
        layer: RenderLayerEnum;
        parse(assetmgr: assetMgr, json: any): void;
        _parseProperties(assetmgr: assetMgr, properties: any): void;
        private _parsePass;
        fillUnDefUniform(pass: render.glDrawPass): void;
    }
}
declare namespace gd3d.framework {
    class sprite implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        caclByteLength(): number;
        private _texture;
        texture: texture;
        atlas: string;
        rect: math.rect;
        border: math.border;
        private _urange;
        private _vrange;
        readonly urange: math.vector2;
        readonly vrange: math.vector2;
    }
}
declare namespace gd3d.framework {
    class textasset implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(): void;
        dispose(): void;
        content: string;
        caclByteLength(): number;
    }
}
declare namespace gd3d.framework {
    class texture implements IAsset {
        static readonly ClassName: string;
        private name;
        private id;
        defaultAsset: boolean;
        constructor(assetName?: string);
        getName(): string;
        getGUID(): number;
        use(): void;
        unuse(disposeNow?: boolean): void;
        dispose(): void;
        glTexture: gd3d.render.ITexture;
        caclByteLength(): number;
        private _realName;
        realName: string;
    }
}
declare namespace gd3d.framework {
    class AudioEx {
        private static g_this;
        static instance(): AudioEx;
        audioContext: AudioContext;
        private constructor();
        clickInit(): void;
        loadAudioBufferFromArrayBuffer(ab: ArrayBuffer, fun: (buf: AudioBuffer, _err: Error) => void): void;
        loadAudioBuffer(url: string, fun: (buf: AudioBuffer, _err: Error) => void): void;
        isAvailable(): boolean;
        createAudioChannel(be3DSound: boolean): AudioChannel;
        private static loadArrayBuffer;
    }
    class AudioChannel {
        source: AudioBufferSourceNode;
        gainNode: GainNode;
        pannerNode: PannerNode;
        volume: number;
        isplay: boolean;
        stop(): void;
    }
}
declare namespace gd3d.framework {
    class aniplayer implements INodeComponent {
        static readonly ClassName: string;
        gameObject: gameObject;
        clips: animationClip[];
        autoplay: boolean;
        bones: tPoseInfo[];
        startPos: PoseBoneMatrix[];
        private _playClip;
        private clipnames;
        private bePlay;
        speed: number;
        private beCross;
        private beRevert;
        private _playTimer;
        private _playFrameid;
        private _playCount;
        private crossTotalTime;
        private crossRestTimer;
        private crossPercentage;
        private curFrame;
        private lastFrame;
        private carelist;
        private careBoneMat;
        private inversTpos;
        private startepose;
        readonly PlayFrameID: number;
        readonly currentAniclipName: string;
        readonly currentAniclip: animationClip;
        readonly playCount: number;
        private init;
        addToCareList(bone: transform): void;
        private _awaitClips;
        awaitLoadClipNames(): string[];
        private _allClipNames;
        allClipNames(): string[];
        private collected;
        private collectClipNames;
        addClipByNameLoad(_assetMgr: assetMgr, resPath: string, clipName: string, callback?: (state: stateLoad, clipName: string) => any): void;
        addClip(clip: animationClip): void;
        haveClip(name: string): boolean;
        getClip(name: string): animationClip;
        start(): void;
        onPlay(): void;
        private temptMat;
        update(delta: number): void;
        private playEndDic;
        play(animName: string, onPlayEnd?: () => void, speed?: number, beRevert?: boolean): void;
        playCross(animName: string, crosstimer: number, onPlayEnd?: () => void, speed?: number, beRevert?: boolean): void;
        private beActivedEndFrame;
        private endFrame;
        playToXFrame(animName: string, endframe: number, crosstimer?: number, onPlayEnd?: () => void, speed?: number): void;
        private recordeLastFrameData;
        private playAniclip;
        stop(): void;
        pause(): void;
        isPlay(): boolean;
        isStop(): boolean;
        remove(): void;
        clone(): void;
        private checkFrameId;
        private OnClipPlayEnd;
        private beActived;
        private boneCache;
        private recyclecache;
        fillPoseData(data: Float32Array, bones: transform[]): void;
    }
}
declare namespace gd3d.framework {
    class tPoseInfo {
        static readonly ClassName: string;
        name: string;
        tposep: math.vector3;
        tposeq: math.quaternion;
    }
    enum PlayStyle {
        NormalPlay = 0,
        FramePlay = 1,
        PingPang = 2
    }
}
declare namespace gd3d.framework {
    class asbone implements INodeComponent {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class AudioListener implements INodeComponent {
        static readonly ClassName: string;
        private listener;
        start(): void;
        onPlay(): void;
        private lastX;
        private lastY;
        private lastZ;
        private curPos;
        gameObject: gameObject;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class AudioPlayer implements INodeComponent {
        static readonly ClassName: string;
        buffer: AudioBuffer;
        beLoop: boolean;
        be3DSound: boolean;
        private audioChannel;
        gameObject: gameObject;
        play(buffer: AudioBuffer, beLoop?: boolean, volume?: number, onended?: Function): void;
        stop(): void;
        volume: number;
        isPlaying(): boolean;
        start(): void;
        onPlay(): void;
        private lastX;
        private lastY;
        private lastZ;
        private curPos;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class BeBillboard implements INodeComponent {
        static readonly ClassName: string;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        gameObject: gameObject;
        remove(): void;
        clone(): void;
        private beActive;
        setActive(active: boolean): void;
        private target;
        setTarget(trans: transform): void;
    }
}
declare namespace gd3d.framework {
    class behaviour implements INodeComponent {
        gameObject: gameObject;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class bloomctr implements INodeComponent {
        static readonly ClassName: string;
        private _bloomIntensity;
        private _bloomThreshold;
        private _blurSpread;
        bloomThreshold: number;
        bloomIntensity: number;
        blurSpread: number;
        private app;
        private scene;
        private camera;
        private material;
        private material_1;
        private material_2;
        private material_3;
        private readonly tag;
        gameObject: gameObject;
        private _init;
        private init;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare let helpv3: gd3d.math.vector3;
declare let helpv3_1: gd3d.math.vector3;
declare let helpv3_2: gd3d.math.vector3;
declare let helpv3_3: gd3d.math.vector3;
declare let helpv3_4: gd3d.math.vector3;
declare let helpv3_5: gd3d.math.vector3;
declare let helpv3_6: gd3d.math.vector3;
declare let helpv3_7: gd3d.math.vector3;
declare let helpv2: gd3d.math.vector2;
declare let helpv2_1: gd3d.math.vector2;
declare let helpmtx: gd3d.math.matrix;
declare let helpmtx_1: gd3d.math.matrix;
declare let helpmtx_2: gd3d.math.matrix;
declare let helpmtx_3: gd3d.math.matrix;
declare let helprect: gd3d.math.rect;
declare namespace gd3d.framework {
    interface ICameraPostQueue {
        render(scene: scene, context: renderContext, camera: camera): any;
        renderTarget: render.glRenderTarget;
    }
    class cameraPostQueue_Depth implements ICameraPostQueue {
        constructor();
        render(scene: scene, context: renderContext, camera: camera): void;
        renderTarget: render.glRenderTarget;
    }
    class cameraPostQueue_Quad implements ICameraPostQueue {
        material: material;
        constructor();
        render(scene: scene, context: renderContext, camera: camera): void;
        renderTarget: render.glRenderTarget;
    }
    class cameraPostQueue_Color implements ICameraPostQueue {
        constructor();
        render(scene: scene, context: renderContext, camera: camera): void;
        renderTarget: render.glRenderTarget;
    }
    interface IOverLay {
        init: boolean;
        sortOrder: number;
        start(camera: camera): any;
        render(context: renderContext, assetmgr: assetMgr, camera: camera): any;
        update(delta: number): any;
    }
    class camera implements INodeComponent {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        private _near;
        near: number;
        private _far;
        far: number;
        CullingMask: CullingMask;
        readonly CurrContextIndex: number;
        private _contextIdx;
        markDirty(): void;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        clearOption_Color: boolean;
        clearOption_Depth: boolean;
        backgroundColor: gd3d.math.color;
        viewport: gd3d.math.rect;
        renderTarget: gd3d.render.glRenderTarget;
        order: number;
        private overlays;
        addOverLay(overLay: IOverLay): void;
        getOverLays(): IOverLay[];
        removeOverLay(overLay: IOverLay): void;
        private sortOverLays;
        calcViewMatrix(matrix: gd3d.math.matrix): void;
        calcViewPortPixel(app: application, viewPortPixel: math.rect): void;
        calcProjectMatrix(asp: number, matrix: gd3d.math.matrix): void;
        private static _shareRay;
        creatRayByScreen(screenpos: gd3d.math.vector2, app: application, shareRayCache?: boolean): ray;
        calcWorldPosFromScreenPos(app: application, screenPos: math.vector3, outWorldPos: math.vector3): void;
        calcScreenPosFromWorldPos(app: application, worldPos: math.vector3, outScreenPos: math.vector2): void;
        private lastCamMtx;
        private lastCamRect;
        private paraArr;
        private calcCameraFrame;
        private matView;
        private matProjP;
        private matProjO;
        private matProj;
        private frameVecs;
        fov: number;
        size: number;
        private _opvalue;
        opvalue: number;
        getPosAtXPanelInViewCoordinateByScreenPos(screenPos: gd3d.math.vector2, app: application, z: number, out: gd3d.math.vector2): void;
        fillRenderer(scene: scene): void;
        private _fillRenderer;
        testFrustumCulling(scene: scene, node: transform): boolean;
        _targetAndViewport(target: render.glRenderTarget, scene: scene, context: renderContext, withoutClear: boolean): void;
        _renderOnce(scene: scene, context: renderContext, drawtype: string): void;
        postQueues: ICameraPostQueue[];
        renderScene(scene: scene, context: renderContext): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class canvascontainer implements INodeComponent {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        readonly canvas: canvas;
        private _overlay2d;
        setOverLay(lay: overlay2D): void;
        getOverLay(): overlay2D;
        sortOrder: number;
        private isCanvasinit;
        private canvasInit;
        private _lastMode;
        private _renderMode;
        renderMode: canvasRenderMode;
        private styleToMode;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
    enum canvasRenderMode {
        ScreenSpaceOverlay = 0,
        ScreenSpaceCamera = 1,
        WorldSpace = 2
    }
}
declare namespace gd3d.framework {
    class effectSystem implements IRenderer {
        static readonly ClassName: string;
        gameObject: gameObject;
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        autoplay: boolean;
        beLoop: boolean;
        state: EffectPlayStateEnum;
        private curFrameId;
        static fps: number;
        private playTimer;
        private speed;
        webgl: WebGLRenderingContext;
        private parser;
        vf: number;
        private effectBatchers;
        private particles;
        private matDataGroups;
        private particleElementDic;
        private _textasset;
        jsonData: textasset;
        setJsonData(_jsonData: textasset): void;
        setJsonDataStr(_jsonStr: string): void;
        updateJsonData(_jsonData: textasset): void;
        updateJsonDataStr(_jsonStr: string): void;
        data: EffectSystemData;
        init(): void;
        private _data;
        readonly totalFrameCount: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private _update;
        private mergeLerpAttribData;
        private updateEffectBatcher;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        clone(): effectSystem;
        play(speed?: number): void;
        pause(): void;
        stop(): void;
        reset(restSinglemesh?: boolean, resetParticle?: boolean): void;
        private resetSingleMesh;
        private resetparticle;
        private delayElements;
        private refElements;
        private addElements;
        private addElement;
        private addInitFrame;
        setFrameId(id: number): void;
        getDelayFrameCount(delayTime: number): number;
        private beExecuteNextFrame;
        private checkFrameId;
        remove(): void;
        readonly leftLifeTime: number;
    }
}
declare namespace gd3d.framework {
    class TestEffectSystem implements IRenderer {
        static readonly ClassName: string;
        gameObject: gameObject;
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        autoplay: boolean;
        beLoop: boolean;
        state: EffectPlayStateEnum;
        private curFrameId;
        static fps: number;
        private playTimer;
        private speed;
        webgl: WebGLRenderingContext;
        private parser;
        vf: number;
        private emissionElement;
        private effectBatchers;
        private particles;
        private matDataGroups;
        private particleElementDic;
        jsonData: textasset;
        setJsonData(_jsonData: textasset): void;
        data: EffectSystemData;
        init(): void;
        private _data;
        readonly totalFrameCount: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private _update;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        clone(): effectSystem;
        play(speed?: number): void;
        pause(): void;
        stop(): void;
        reset(restSinglemesh?: boolean, resetParticle?: boolean): void;
        private resetSingleMesh;
        private delayElements;
        private refElements;
        private addElements;
        private addElement;
        addEmissionElement(data?: EffectElementData): void;
        setFrameId(id: number): void;
        getDelayFrameCount(delayTime: number): number;
        private beExecuteNextFrame;
        private checkFrameId;
        remove(): void;
        readonly leftLifeTime: number;
    }
}
declare namespace gd3d.framework {
    class frustumculling implements INodeComponent {
        static readonly ClassName: string;
        constructor();
        gameObject: gameObject;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class guidpath implements INodeComponent {
        static readonly ClassName: string;
        private paths;
        private _pathasset;
        pathasset: pathasset;
        speed: number;
        private isactived;
        play(loopCount?: number): void;
        pause(): void;
        stop(): void;
        replay(loopCount?: number): void;
        private mystrans;
        private datasafe;
        private folowindex;
        isloop: boolean;
        lookforward: boolean;
        private loopCount;
        private oncomplete;
        setpathasset(pathasset: pathasset, speed?: number, oncomplete?: () => void): void;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private adjustDir;
        private followmove;
        gameObject: gameObject;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class keyFrameAniPlayer implements INodeComponent {
        static readonly ClassName: string;
        clips: keyFrameAniClip[];
        private nowClip;
        private readonly nowFrame;
        private nowTime;
        private pathPropertyMap;
        gameObject: gameObject;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        private displayByTime;
        private calcValueByTime;
        private refrasCurveProperty;
        private timeFilterCurves;
        private checkPlayEnd;
        private init;
        isPlaying(ClipName: string): boolean;
        playByName(ClipName: string): void;
        play(): void;
        stop(): void;
        rewind(): void;
        private collectPropertyObj;
        private collectPathPropertyObj;
        private serchChild;
        clone(): void;
        remove(): void;
    }
}
declare namespace gd3d.framework {
    enum LightTypeEnum {
        Direction = 0,
        Point = 1,
        Spot = 2
    }
    class light implements INodeComponent {
        static readonly ClassName: string;
        gameObject: gameObject;
        type: LightTypeEnum;
        spotAngelCos: number;
        range: number;
        intensity: number;
        color: math.color;
        cullingMask: number;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare let helpMat: gd3d.framework.material;
declare namespace gd3d.framework {
    class spherestruct {
        center: gd3d.math.vector3;
        radius: number;
        srcradius: number;
        private tempScale;
        private srcCenter;
        constructor(_center: math.vector3, _r: number);
        update(worldmatrix: math.matrix): void;
        intersects(bound: any): boolean;
        computeExtentsByAxis(axis: math.vector3, out: math.vector2): void;
    }
    class spherecollider implements INodeComponent, ICollider {
        static readonly ClassName: string;
        gameObject: gameObject;
        subTran: transform;
        filter: meshFilter;
        spherestruct: spherestruct;
        center: math.vector3;
        radius: number;
        _worldCenter: math.vector3;
        readonly worldCenter: math.vector3;
        getBound(): spherestruct;
        readonly matrix: gd3d.math.matrix;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        _colliderVisible: boolean;
        colliderVisible: boolean;
        caclPlaneInDir(v0: math.vector3, v1: math.vector3, v2: math.vector3): boolean;
        intersectsTransform(tran: transform): boolean;
        private build;
        private buildMesh;
        private setMeshRenderer;
        private getColliderMesh;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class trailRender implements IRenderer {
        static readonly ClassName: string;
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        private width;
        private _material;
        private _color;
        private mesh;
        private vertexcount;
        private dataForVbo;
        private dataForEbo;
        private sticks;
        private active;
        private reInit;
        start(): void;
        onPlay(): void;
        private app;
        private webgl;
        private camerapositon;
        extenedOneSide: boolean;
        update(delta: number): void;
        gameObject: gameObject;
        material: gd3d.framework.material;
        color: gd3d.math.color;
        setspeed(upspeed: number): void;
        setWidth(Width: number): void;
        play(): void;
        stop(): void;
        lookAtCamera: boolean;
        private initmesh;
        private reInitdata;
        isAlphaGradual: boolean;
        private inited;
        private intidata;
        private speed;
        private updateTrailData;
        render(context: renderContext, assetmgr: assetMgr, camera: camera): void;
        clone(): void;
        remove(): void;
    }
    class trailStick {
        location: gd3d.math.vector3;
        updir: gd3d.math.vector3;
    }
}
declare namespace gd3d.framework {
    class trailRender_recorde implements IRenderer {
        static readonly ClassName: string;
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        private _startWidth;
        private _endWidth;
        lifetime: number;
        minStickDistance: number;
        maxStickCout: number;
        private _material;
        private _startColor;
        private _endColor;
        private trailTrans;
        private nodes;
        private mesh;
        private dataForVbo;
        private dataForEbo;
        interpolate: boolean;
        interpNumber: number;
        interpPath: trailNode[];
        private targetPath;
        material: gd3d.framework.material;
        startColor: gd3d.math.color;
        endColor: gd3d.math.color;
        setWidth(startWidth: number, endWidth?: number): void;
        private activeMaxpointlimit;
        setMaxpointcontroll(value?: boolean): void;
        start(): void;
        onPlay(): void;
        private app;
        private webgl;
        update(delta: number): void;
        gameObject: gameObject;
        remove(): void;
        private refreshTrailNode;
        private notRender;
        private updateTrailData;
        private checkBufferSize;
        render(context: renderContext, assetmgr: assetMgr, camera: camera): void;
        clone(): void;
    }
    class trailNode {
        location: gd3d.math.vector3;
        updir: gd3d.math.vector3;
        time: number;
        handle: gd3d.math.vector3;
        trailNodes: trailNode[];
        constructor(p: gd3d.math.vector3, updir: gd3d.math.vector3, t: number);
    }
}
declare namespace gd3d.framework {
    class vignettingCtr implements INodeComponent {
        static readonly ClassName: string;
        private app;
        private scene;
        private camera;
        private material;
        material_1: material;
        private material_2;
        private material_3;
        private readonly tag;
        gameObject: gameObject;
        private _init;
        private init;
        start(): void;
        onPlay(): void;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace gd3d.framework {
    class f14EffectSystem implements IRenderer {
        static readonly ClassName: string;
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        start(): void;
        onPlay(): void;
        gameObject: gameObject;
        private fps;
        data: F14EffectData;
        layers: F14Layer[];
        VF: number;
        webgl: WebGLRenderingContext;
        private _f14eff;
        f14eff: f14eff;
        private _delayTime;
        delay: number;
        setData(data: F14EffectData): void;
        readonly root: transform;
        _root: transform;
        private elements;
        renderBatch: F14Basebatch[];
        private loopCount;
        private allTime;
        private renderActive;
        beref: boolean;
        update(deltaTime: number): void;
        private OnEndOnceLoop;
        private _renderCamera;
        readonly renderCamera: camera;
        mvpMat: math.matrix;
        render(context: renderContext, assetmgr: assetMgr, camera: camera, Effqueue?: number): void;
        private totalTime;
        restartFrame: number;
        totalFrame: number;
        private addF14layer;
        getElementCount(): number;
        private playRate;
        enabletimeFlow: boolean;
        enableDraw: boolean;
        private onFinish;
        play(onFinish?: () => void, PlayRate?: number): void;
        stop(): void;
        pause(): void;
        changeColor(newcolor: math.color): void;
        changeAlpha(newAlpha: number): void;
        reset(): void;
        clone(): void;
        remove(): void;
    }
    enum PlayStateEnum {
        play = 0,
        beReady = 1,
        pause = 2
    }
}
declare namespace gd3d.framework {
    enum F14TypeEnum {
        SingleMeshType = 0,
        particlesType = 1,
        RefType = 2
    }
    interface F14Element {
        type: F14TypeEnum;
        update(deltaTime: number, frame: number, fps: number): any;
        dispose(): any;
        reset(): any;
        OnEndOnceLoop(): any;
        changeColor(value: math.color): any;
        changeAlpha(value: number): any;
        layer: F14Layer;
        drawActive: boolean;
    }
}
declare namespace gd3d.framework {
    class F14Layer {
        active: boolean;
        effect: f14EffectSystem;
        data: F14LayerData;
        type: F14TypeEnum;
        frameList: number[];
        frames: {
            [index: number]: F14Frame;
        };
        Attlines: {
            [name: string]: F14AttTimeLine;
        };
        element: F14Element;
        batch: F14Basebatch;
        constructor(effect: f14EffectSystem, data: F14LayerData);
        addFrame(index: number, framedata: F14FrameData): F14Frame;
        removeFrame(frame: number): void;
        dispose(): void;
    }
    class F14Frame {
        layer: F14Layer;
        data: F14FrameData;
        attDic: {
            [name: string]: any;
        };
        constructor(layer: F14Layer, data: F14FrameData);
        setdata(name: string, obj: any): void;
        removedata(name: string): void;
        getdata(name: string): any;
    }
    class F14AttTimeLine {
        name: string;
        lerpFunc: (from: any, to: any, lerp: any, out: any) => void;
        cloneFunc: (from: any, to: any) => void;
        constructor(name: string, lerpfunc: (from: any, to: any, lerp: any, out: any) => void, clonefunc: (from: any, to: any) => void);
        frameList: number[];
        line: {
            [index: number]: any;
        };
        addNode(frame: number, value: any): void;
        remove(frame: number): void;
        getValue(frame: number, basedate: F14SingleMeshBaseData, out: any): void;
    }
}
declare namespace gd3d.framework {
    class F14EffectData {
        beloop: boolean;
        lifeTime: number;
        layers: F14LayerData[];
        parsejson(json: any, assetmgr: assetMgr, assetbundle: string): void;
    }
    class F14LayerData {
        Name: string;
        type: F14TypeEnum;
        elementdata: F14ElementData;
        frames: {
            [frame: number]: F14FrameData;
        };
        constructor();
        parse(json: any, assetmgr: assetMgr, assetbundle: string): void;
    }
    class F14FrameData {
        frameindex: number;
        singlemeshAttDic: {
            [name: string]: any;
        };
        EmissionData: F14EmissionBaseData;
        constructor(index: number, type: F14TypeEnum);
    }
}
declare namespace gd3d.framework {
    interface F14ElementData {
        parse(json: any, assetmgr: assetMgr, assetbundle: string): any;
    }
}
declare namespace gd3d.framework {
    class NumberData {
        isRandom: boolean;
        _value: number;
        _valueLimitMin: number;
        _valueLimitMax: number;
        beInited: boolean;
        key: number;
        setValue(value: number): void;
        setRandomValue(max: number, min: number): void;
        getValue(reRandom?: boolean): number;
        constructor(value?: number);
        static copyto(from: NumberData, to: NumberData): void;
        static FormJson(json: string, data: NumberData): void;
    }
    class Vector3Data {
        x: NumberData;
        y: NumberData;
        z: NumberData;
        constructor(x?: number, y?: number, z?: number);
        getValue(reRandom?: boolean): math.vector3;
        static copyto(from: Vector3Data, to: Vector3Data): void;
        static FormJson(json: string, data: Vector3Data): void;
    }
    class NumberKey {
        key: number;
        value: number;
        constructor(_key: number, _value: number);
    }
    class Vector3Key {
        key: number;
        value: math.vector3;
        constructor(_key: number, _value: math.vector3);
    }
    class Vector2Key {
        key: number;
        value: math.vector2;
        constructor(_key: number, _value: math.vector2);
    }
}
declare namespace gd3d.framework {
    class F14Emission implements F14Element {
        type: F14TypeEnum;
        layer: F14Layer;
        drawActive: boolean;
        effect: f14EffectSystem;
        baseddata: F14EmissionBaseData;
        currentData: F14EmissionBaseData;
        particlelist: F14Particle[];
        deadParticles: F14Particle[];
        private frameLife;
        private TotalTime;
        private newStartDataTime;
        curTime: number;
        private beover;
        private numcount;
        localMatrix: math.matrix;
        private _worldMatrix;
        private localrot;
        private worldRot;
        vertexCount: number;
        vertexLength: number;
        dataforvboLen: number;
        dataforebo: Uint16Array;
        posArr: math.vector3[];
        colorArr: math.color[];
        uvArr: math.vector2[];
        constructor(effect: f14EffectSystem, layer: F14Layer);
        private lastFrame;
        update(deltaTime: number, frame: number, fps: number): void;
        private refreshByFrameData;
        changeCurrentBaseData(data: F14EmissionBaseData): void;
        private initBycurrentdata;
        getWorldMatrix(): math.matrix;
        getWorldRotation(): math.quaternion;
        private updateLife;
        private reInit;
        private bursts;
        private updateEmission;
        private addParticle;
        reset(): void;
        changeColor(value: math.color): void;
        private settedAlpha;
        changeAlpha(value: number): void;
        OnEndOnceLoop(): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    enum RenderModelEnum {
        None = 0,
        BillBoard = 1,
        StretchedBillBoard = 2,
        HorizontalBillBoard = 3,
        VerticalBillBoard = 4,
        Mesh = 5
    }
    class F14EmissionBaseData implements F14ElementData {
        loopenum: LoopEnum;
        mesh: mesh;
        material: material;
        rotPosition: math.vector3;
        rotScale: math.vector3;
        rotEuler: math.vector3;
        rendermodel: RenderModelEnum;
        beloop: boolean;
        lifeTime: NumberData;
        simulateInLocalSpace: boolean;
        startScaleRate: NumberData;
        startScale: Vector3Data;
        startEuler: Vector3Data;
        startColor: Vector3Data;
        startAlpha: NumberData;
        colorRate: number;
        simulationSpeed: NumberData;
        start_tex_st: math.vector4;
        delayTime: number;
        duration: number;
        rateOverTime: NumberData;
        bursts: busrtInfo[];
        shapeType: ParticleSystemShape;
        width: number;
        height: number;
        depth: number;
        radius: number;
        angle: number;
        emitFrom: emitfromenum;
        enableVelocityOverLifetime: boolean;
        moveSpeed: Vector3Data;
        enableSizeOverLifetime: boolean;
        sizeNodes: NumberKey[];
        enableRotOverLifeTime: boolean;
        angleSpeed: NumberData;
        enableColorOverLifetime: boolean;
        colorNodes: Vector3Key[];
        alphaNodes: NumberKey[];
        enableTexAnimation: boolean;
        uvType: UVTypeEnum;
        uSpeed: number;
        vSpeed: number;
        row: number;
        column: number;
        count: number;
        parse(json: any, assetmgr: assetMgr, assetbundle: string): void;
        static getRandomDirAndPosByZEmission(emission: F14EmissionBaseData, outDir: gd3d.math.vector3, outPos: gd3d.math.vector3): void;
    }
    class busrtInfo {
        time: number;
        count: NumberData;
        private _beburst;
        beburst(): boolean;
        burst(bebusrt?: boolean): void;
        static CreatformJson(json: any): busrtInfo;
    }
}
declare namespace gd3d.framework {
    class F14EmissionBatch implements F14Basebatch {
        type: F14TypeEnum;
        effect: f14EffectSystem;
        emission: F14Emission;
        private mesh;
        private mat;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        curRealVboCount: number;
        curVertexcount: number;
        curIndexCount: number;
        vertexLength: number;
        constructor(effect: f14EffectSystem, element: F14Emission);
        private getMaxParticleCount;
        render(context: renderContext, assetmgr: assetMgr, camera: camera, Effqueue: number): void;
        unRender(): void;
        getElementCount(): number;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class F14Particle {
        private data;
        private element;
        private totalLife;
        private startScaleRate;
        private startScale;
        Starteuler: math.vector3;
        StartPos: math.vector3;
        startColor: math.vector3;
        startAlpha: number;
        colorRate: number;
        private simulationSpeed;
        private simulateInLocalSpace;
        private starTex_ST;
        private speedDir;
        enableVelocityOverLifetime: boolean;
        private movespeed;
        enableSizeOverLifetime: boolean;
        private sizeNodes;
        enableRotOverLifeTime: boolean;
        eulerSpeed: number;
        enableColorOverLifetime: boolean;
        private colorNodes;
        private alphaNodes;
        enableTexAnimation: boolean;
        uvType: UVTypeEnum;
        tex_ST: math.vector4;
        rotationByEuler: math.quaternion;
        rotationByShape: math.quaternion;
        startRotation: math.quaternion;
        rotAngle: number;
        localMatrix: math.matrix;
        localTranslate: math.vector3;
        localRotation: math.quaternion;
        localScale: math.vector3;
        color: math.vector3;
        alpha: number;
        private Color;
        private curLife;
        private life01;
        actived: boolean;
        private emissionMatToWorld;
        private emissionWorldRotation;
        private getEmissionMatToWorld;
        private getemissionWorldRotation;
        constructor(element: F14Emission, data: F14EmissionBaseData);
        initByEmissionData(data: F14EmissionBaseData): void;
        update(deltaTime: number): void;
        private tempos;
        private temcolor;
        private temUv;
        uploadMeshdata(): void;
        private transformVertex;
        private updateLocalMatrix;
        private updatePos;
        private updateSize;
        private updateEuler;
        private angleRot;
        private worldpos;
        private tarWorldpos;
        private worldspeeddir;
        private lookDir;
        private temptx;
        private worldRotation;
        private invParWorldRot;
        private worldStartPos;
        private updateRot;
        private updateColor;
        private updateUV;
        getCurTex_ST(data: F14EmissionBaseData): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class F14RefElementBatch implements F14Basebatch {
        type: F14TypeEnum;
        effect: f14EffectSystem;
        private element;
        constructor(effect: f14EffectSystem, element: F14RefElement);
        unRender(): void;
        getElementCount(): number;
        render(context: renderContext, assetmgr: assetMgr, camera: camera, Effqueue: number): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class F14RefBaseData implements F14ElementData {
        beLoop: boolean;
        refdataName: string;
        refData: F14EffectData;
        localPos: math.vector3;
        localEuler: math.vector3;
        localScale: math.vector3;
        parse(json: any, assetmgr: assetMgr, assetbundle: string): void;
    }
}
declare namespace gd3d.framework {
    class F14RefElement implements F14Element {
        type: F14TypeEnum;
        layer: F14Layer;
        drawActive: boolean;
        baseddata: F14RefBaseData;
        startFrame: number;
        endFrame: number;
        effect: f14EffectSystem;
        constructor(effect: f14EffectSystem, layer: F14Layer);
        RefEffect: f14EffectSystem;
        reset(): void;
        private refreshStartEndFrame;
        update(deltaTime: number, frame: number, fps: number): void;
        OnEndOnceLoop(): void;
        changeColor(value: math.color): void;
        changeAlpha(value: number): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class F14SingleMesh implements F14Element {
        drawActive: boolean;
        type: F14TypeEnum;
        layer: F14Layer;
        private effect;
        RenderBatch: F14SingleMeshBath;
        position: math.vector3;
        scale: math.vector3;
        euler: math.vector3;
        color: math.color;
        tex_ST: math.vector4;
        baseddata: F14SingleMeshBaseData;
        private localRotate;
        startFrame: number;
        endFrame: number;
        private vertexCount;
        private posArr;
        private colorArr;
        private uvArr;
        dataforvbo: Float32Array;
        dataforebo: Uint16Array;
        constructor(effect: f14EffectSystem, layer: F14Layer);
        refreshStartEndFrame(): void;
        update(deltaTime: number, frame: number, fps: number): void;
        OnEndOnceLoop(): void;
        targetMat: math.matrix;
        refreshTargetMatrix(): void;
        private tempos;
        private temColor;
        private temUv;
        uploadMeshdata(): void;
        refreshCurTex_ST(curframe: number, detalTime: number, fps: number): void;
        private eulerRot;
        private worldpos;
        private worldRot;
        private inverseRot;
        private lookDir;
        private worldDirx;
        private worldDiry;
        updateRotByBillboard(): void;
        reset(): void;
        changeColor(value: math.color): void;
        settedAlpha: number;
        changeAlpha(value: number): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    interface F14Basebatch {
        type: F14TypeEnum;
        effect: f14EffectSystem;
        render(context: renderContext, assetmgr: assetMgr, camera: camera, Effqueue: number): any;
        unRender(): any;
        dispose(): any;
        getElementCount(): number;
    }
    class F14SingleMeshBath implements F14Basebatch {
        type: F14TypeEnum;
        effect: f14EffectSystem;
        ElementMat: gd3d.framework.material;
        meshlist: F14SingleMesh[];
        private activemeshlist;
        private mesh;
        indices: number[];
        vertices: math.vector3[];
        colors: math.color[];
        uv: math.vector2[];
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        curRealVboCount: number;
        curVertexcount: number;
        curIndexCount: number;
        vertexLength: number;
        constructor(mat: material, effect: f14EffectSystem);
        private noBatch;
        OnEndCollectElement(): void;
        reInit(mat: material, effect: f14EffectSystem): void;
        addElement(mesh: F14SingleMesh, insert?: boolean): void;
        canBatch(mesh: F14SingleMesh): boolean;
        getElementCount(): number;
        private mat;
        private defST;
        private temptColorv4;
        private uploadData;
        render(context: renderContext, assetmgr: assetMgr, camera: camera, Effqueue: number): void;
        unRender(): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    enum LoopEnum {
        Restart = 0,
        TimeContinue = 1
    }
    enum BindAxis {
        X = 0,
        Y = 1,
        NONE = 2
    }
    class F14SingleMeshBaseData implements F14ElementData {
        loopenum: LoopEnum;
        mesh: mesh;
        material: material;
        position: gd3d.math.vector3;
        scale: gd3d.math.vector3;
        euler: gd3d.math.vector3;
        color: gd3d.math.color;
        tex_ST: gd3d.math.vector4;
        enableTexAnimation: boolean;
        uvType: UVTypeEnum;
        uSpeed: number;
        vSpeed: number;
        row: number;
        column: number;
        count: number;
        beBillboard: boolean;
        bindAxis: BindAxis;
        firtstFrame: number;
        constructor(firstFrame: number);
        parse(json: any, assetmgr: assetMgr, assetbundle: string): void;
    }
}
declare namespace gd3d.framework {
    class starCamCtr implements INodeComponent {
        static readonly ClassName: string;
        moveDuration: number;
        minSpeed: number;
        relativelocation: math.vector3;
        relativeEuler: math.vector3;
        private relativeRot;
        private starteCamRot;
        private targetCamPos;
        private targetCamRot;
        private distance;
        private movedir;
        private moveSpeed;
        private eulerSpeed;
        private active;
        start(): void;
        onPlay(): void;
        private moveDis;
        update(delta: number): void;
        gameObject: gameObject;
        remove(): void;
        clone(): void;
        moveTo(to: transform): void;
    }
}
declare namespace gd3d {
    abstract class AEvent {
        private events;
        On(event: string, func: (...args: Array<any>) => void, thisArg: any): void;
        Emit(event: string, ...args: Array<any>): void;
        RemoveListener(event: string, func: Function, thisArg: any): void;
        RemoveListenerAll(): void;
        listenerCount(event: string): number;
    }
}
declare namespace gd3d.event {
    enum UIEventEnum {
        PointerDown = 0,
        PointerUp = 1,
        PointerClick = 2,
        PointerDoubleClick = 3,
        PointerEnter = 4,
        PointerExit = 5
    }
    enum PointEventEnum {
        PointDown = 0,
        PointHold = 1,
        PointUp = 2,
        PointMove = 3,
        PointClick = 4,
        MouseWheel = 5
    }
    enum KeyEventEnum {
        KeyDown = 0,
        KeyUp = 1
    }
    enum KeyCode {
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        NumpadMultiply = 106,
        NumpadAdd = 107,
        NumpadSubtract = 109,
        NumpadDecimal = 110,
        NumpadDivide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        Enter = 13,
        NumLock = 144,
        ScrollLock = 145,
        ShiftLeft = 16,
        ControlRight = 17,
        AltRight = 18,
        Semicolon = 186,
        Comma = 188,
        Pause = 19,
        Period = 190,
        Slash = 191,
        CapsLock = 20,
        BracketLeft = 219,
        Backslash = 220,
        BracketRight = 221,
        Quote = 222,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        ArrowLeft = 37,
        ArrowUp = 38,
        ArrowRight = 39,
        ArrowDown = 40,
        Insert = 45,
        Delete = 46,
        Digit1 = 49,
        Digit2 = 50,
        Digit3 = 51,
        Digit4 = 52,
        KeyA = 65,
        KeyB = 66,
        KeyC = 67,
        KeyD = 68,
        KeyE = 69,
        KeyF = 70,
        KeyG = 71,
        KeyH = 72,
        KeyI = 73,
        KeyJ = 74,
        KeyK = 75,
        KeyL = 76,
        KeyM = 77,
        KeyN = 78,
        KeyO = 79,
        KeyP = 80,
        KeyQ = 81,
        KeyR = 82,
        KeyS = 83,
        KeyT = 84,
        KeyU = 85,
        KeyV = 86,
        KeyW = 87,
        KeyX = 88,
        KeyY = 89,
        Tab = 9,
        KeyZ = 90,
        MetaLeft = 91,
        ContextMenu = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99
    }
}
declare namespace gd3d.event {
    class InputEvent extends AEvent {
        OnEnum_key(event: KeyEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        EmitEnum_key(event: KeyEventEnum, ...args: Array<any>): void;
        OnEnum_point(event: PointEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        EmitEnum_point(event: PointEventEnum, ...args: Array<any>): void;
    }
}
declare namespace gd3d.event {
    interface IUIEventer {
        addListener(eventEnum: UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): any;
        removeListener(eventEnum: UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): any;
    }
    class UIEvent extends AEvent {
        OnEnum(event: UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        EmitEnum(event: UIEventEnum, ...args: Array<any>): void;
    }
}
declare namespace gd3d.framework {
    class PointEvent {
        type: event.PointEventEnum;
        x: number;
        y: number;
        eated: boolean;
        selected: transform2D;
        c_x: number;
        c_y: number;
    }
}
declare namespace gd3d.framework {
    class pointinfo {
        id: number;
        touch: boolean;
        x: number;
        y: number;
    }
    class inputMgr {
        private app;
        private _element;
        private _buttons;
        private _lastbuttons;
        private eventer;
        private inputlast;
        private keyboardMap;
        private handlers;
        private _wheel;
        readonly wheel: number;
        private _point;
        readonly point: pointinfo;
        private _touches;
        readonly touches: {
            [id: number]: pointinfo;
        };
        private rMtr_90;
        private rMtr_n90;
        constructor(app: application);
        private attach;
        private detach;
        private _mousedown;
        private _mouseup;
        private _mousemove;
        private _mousewheel;
        private tryAddTouchP;
        private syncPointByTouches;
        private _touchstart;
        private _touchmove;
        private _touchend;
        private _touchcancel;
        private _keydown;
        private _keyup;
        private _blur;
        private readonly moveTolerance;
        private lastTouch;
        private hasPointDown;
        private hasPointUP;
        private hasPointMove;
        private downPoint;
        private lastPoint;
        update(delta: any): void;
        private pointCk;
        private keyDownCode;
        private keyUpCode;
        private keyCodeCk;
        private hasWheel;
        private lastWheel;
        private mouseWheelCk;
        isPressed(button: number): boolean;
        wasPressed(button: number): boolean;
        private _contextMenu;
        disableContextMenu(): void;
        enableContextMenu(): void;
        addPointListener(eventEnum: event.PointEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        removePointListener(eventEnum: event.PointEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        addKeyListener(eventEnum: event.KeyEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        removeKeyListener(eventEnum: event.KeyEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
        anyKey(): boolean;
        GetKeyDown(name: string): any;
        GetKeyDown(key: event.KeyCode): any;
        GetKeyUP(name: string): any;
        GetKeyUP(key: event.KeyCode): any;
        KeyDownCount(): number;
        private tempV2_0;
        private tempV2_1;
        private devicePixelRatio;
        private CalcuPoint;
    }
}
declare namespace gd3d.io {
    class converter {
        static getApplyFun(value: any): any;
        private static dataBuffer;
        private static dataView;
        static ULongToArray(value: number, target?: Uint8Array, offset?: number): Uint8Array | number[];
        static LongToArray(value: number, t?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Float64ToArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Float32ToArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Int32ToArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Int16ToArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Uint32toArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static Uint16ToArray(value: number, target?: Uint8Array | number[], offset?: number): Uint8Array | number[];
        static StringToUtf8Array(str: string): Uint8Array;
        static ArrayToLong(buf: Uint8Array, offset?: number): number;
        static ArrayToULong(buf: Uint8Array, offset?: number): number;
        static ArrayToFloat64(buf: Uint8Array, offset?: number): number;
        static ArrayToFloat32(buf: Uint8Array, offset?: number): number;
        static ArrayToInt32(buf: Uint8Array, offset?: number): number;
        static ArrayToUint32(buf: Uint8Array, offset?: number): number;
        static ArrayToInt16(buf: Uint8Array, offset?: number): number;
        static ArrayToUint16(buf: Uint8Array, offset?: number): number;
        static ArrayToInt8(buf: Uint8Array, offset?: number): number;
        static ArrayToString(buf: Uint8Array, offset?: number): string;
    }
    class binTool {
        private buffer;
        r_offset: number;
        w_offset: number;
        constructor(size?: number);
        private ckl;
        readSingle(): number;
        readLong(): number;
        readULong(): number;
        readDouble(): number;
        readInt8(): number;
        readUInt8(): number;
        readInt16(): number;
        readUInt16(): number;
        readInt32(): number;
        readUInt32(): number;
        readBoolean(): boolean;
        readByte(): number;
        readUnsignedShort(): number;
        readUnsignedInt(): number;
        readFloat(): number;
        readSymbolByte(): number;
        readShort(): number;
        readInt(): number;
        readBytes(length: number): Uint8Array;
        readStringUtf8(): string;
        readUTFBytes(): string;
        readUTFByLen(length: number): string;
        readStringUtf8FixLength(length: number): string;
        readStringAnsi(): string;
        getLength(): number;
        getBytesAvailable(): number;
        readonly length: number;
        writeInt8(num: number): void;
        writeUInt8(num: number): void;
        writeInt16(num: number): void;
        writeUInt16(num: number): void;
        writeInt32(num: number): void;
        writeUInt32(num: number): void;
        writeSingle(num: number): void;
        writeLong(num: number): void;
        writeULong(num: number): void;
        writeDouble(num: number): void;
        writeStringAnsi(str: string): void;
        writeStringUtf8(str: string): void;
        writeStringUtf8DataOnly(str: string): void;
        writeByte(num: number): void;
        writeBytes(array: Uint8Array | number[] | number, offset?: number, length?: number): void;
        writeUint8Array(array: Uint8Array | number[] | number, offset?: number, length?: number): void;
        writeUnsignedShort(num: number): void;
        writeUnsignedInt(num: number): void;
        writeFloat(num: number): void;
        writeUTFBytes(str: string): void;
        writeSymbolByte(num: number): void;
        writeShort(num: number): void;
        writeInt(num: number): void;
        write(array: Uint8Array | number[] | number | any, offset?: number, length?: number): void;
        dispose(): void;
        getBuffer(): Uint8Array;
        getUint8Array(): Uint8Array;
    }
}
declare namespace gd3d.io {
    function cloneObj(instanceObj: any, clonedObj?: any): any;
    function fillCloneReference(instanceObj: any, clonedObj: any): any;
    function fillCloneReferenceTypeOrArray(instanceObj: any, clonedObj: any, key: string): void;
    function fillCloneReferenceType(instanceObj: any, clonedObj: any, key: string, instanceParent?: any, clonedParent?: any, instanceKey?: string): void;
    function _cloneObj(instanceObj: any, clonedObj?: any): any;
    function cloneOtherTypeOrArray(instanceObj: any, clonedObj: any, key: string): void;
    function cloneOtherType(instanceObj: any, clonedObj: any, key: string, instanceParent?: any, clonedParent?: any, instanceKey?: string): void;
}
declare namespace gd3d.io {
    function stringToBlob(content: string): Blob;
    function stringToUtf8Array(str: string): number[];
}
declare namespace gd3d.io {
    enum SaveAssetType {
        FullUrl = 0,
        NameAndContent = 1,
        DefaultAssets = 2
    }
    class SerializeDependent {
        static resourseDatas: any[];
        static GetAssetContent(asset: any): {
            "name": string;
            "value": string;
            "type": SaveAssetType;
        };
        static GetAssetUrl(asset: any, assetMgr: any): void;
    }
    function SerializeForInspector(obj: any): string;
    function serializeObjForInspector(instanceObj: any, beComponent: boolean, serializedObj?: any): any;
    function serializeOtherTypeOrArrayForInspector(instanceObj: any, serializedObj: any, key: string, beComponent: boolean): void;
    function serializeOtherTypeForInspector(instanceObj: any, serializedObj: any, key: string, beComponent: boolean, arrayInst?: any): void;
    function Serialize(obj: any, assetMgr?: any): string;
    function serializeObj(instanceObj: any, serializedObj?: any, assetMgr?: any): any;
    function serializeOtherTypeOrArray(instanceObj: any, serializedObj: any, key: string, assetMgr?: any): void;
    function serializeOtherType(instanceObj: any, serializedObj: any, key: string, arrayInst?: any, assetMgr?: any): void;
    function deSerialize(serializedObj: string, instanceObj: any, assetMgr: any, bundlename?: string): void;
    function fillReference(serializedObj: any, instanceObj: any): void;
    function dofillReferenceOrArray(serializedObj: any, instanceObj: any, key: string): void;
    function dofillReference(serializedObj: any, instanceObj: any, key: string): void;
    function deSerializeObj(serializedObj: any, instanceObj: any, assetMgr: any, bundlename?: string): void;
    function deSerializeOtherTypeOrArray(serializedObj: any, instanceObj: any, key: string, assetMgr: any, bundlename?: string): void;
    function deSerializeOtherType(serializedObj: any, instanceObj: any, key: string, assetMgr: any, bundlename?: string): void;
    function isArray(type: string): boolean;
    function isArrayOrDic(type: string): boolean;
    function isAsset(type: string): boolean;
    function isAssetInspector(type: string): boolean;
    class referenceInfo {
        static oldmap: {
            [id: number]: any;
        };
        static regtypelist: string[];
        static regDefaultType(): void;
        static regType(type: string): void;
        static isRegType(type: string): boolean;
    }
    class enumMgr {
        static enumMap: {
            [id: string]: any;
        };
    }
}
declare namespace gd3d.io {
    class binReader {
        private _data;
        constructor(buf: ArrayBuffer, seek?: number);
        private _seek;
        seek(seek: number): void;
        peek(): number;
        length(): number;
        canread(): number;
        readStringAnsi(): string;
        static utf8ArrayToString(array: Uint8Array | number[]): string;
        readStringUtf8(): string;
        readStringUtf8FixLength(length: number): string;
        readSingle(): number;
        readDouble(): number;
        readInt8(): number;
        readUInt8(): number;
        readInt16(): number;
        readUInt16(): number;
        readInt32(): number;
        readUInt32(): number;
        readUint8Array(target?: Uint8Array, offset?: number, length?: number): Uint8Array;
        readUint8ArrayByOffset(target: Uint8Array, offset: number, length?: number): Uint8Array;
        position: number;
        readBoolean(): boolean;
        readByte(): number;
        readBytes(target?: Uint8Array, offset?: number, length?: number): Uint8Array;
        readUnsignedShort(): number;
        readUnsignedInt(): number;
        readFloat(): number;
        readUTFBytes(length: number): string;
        readSymbolByte(): number;
        readShort(): number;
        readInt(): number;
    }
    class binWriter {
        _buf: Uint8Array;
        private _data;
        private _length;
        private _seek;
        constructor();
        private sureData;
        getLength(): number;
        getBuffer(): ArrayBuffer;
        seek(seek: number): void;
        peek(): number;
        writeInt8(num: number): void;
        writeUInt8(num: number): void;
        writeInt16(num: number): void;
        writeUInt16(num: number): void;
        writeInt32(num: number): void;
        writeUInt32(num: number): void;
        writeSingle(num: number): void;
        writeDouble(num: number): void;
        writeStringAnsi(str: string): void;
        writeStringUtf8(str: string): void;
        static stringToUtf8Array(str: string): number[];
        writeStringUtf8DataOnly(str: string): void;
        writeUint8Array(array: Uint8Array | number[], offset?: number, length?: number): void;
        readonly length: number;
        writeByte(num: number): void;
        writeBytes(array: Uint8Array | number[], offset?: number, length?: number): void;
        writeUnsignedShort(num: number): void;
        writeUnsignedInt(num: number): void;
        writeFloat(num: number): void;
        writeUTFBytes(str: string): void;
        writeSymbolByte(num: number): void;
        writeShort(num: number): void;
        writeInt(num: number): void;
    }
}
declare namespace gd3d.math {
    function colorSet_White(out: color): void;
    function colorSet_Black(out: color): void;
    function colorSet_Gray(out: color): void;
    function colorMultiply(srca: color, srcb: color, out: color): void;
    function scaleToRef(src: color, scale: number, out: color): void;
    function colorClone(src: color, out: color): void;
    function colorLerp(srca: color, srcb: color, t: number, out: color): void;
}
declare namespace gd3d.math {
    function calPlaneLineIntersectPoint(planeVector: vector3, planePoint: vector3, lineVector: vector3, linePoint: vector3, out: vector3): void;
    function isContain(p1: vector2, p2: vector2, p3: vector2, p4: vector2, mp: vector2): boolean;
    function Multiply(p1: vector2, p2: vector2, p0: vector2): number;
}
declare namespace gd3d.math {
    function matrixGetTranslation(src: matrix, out: vector3): void;
    function matrixTranspose(src: matrix, out: matrix): void;
    function matrixDecompose(src: matrix, scale: vector3, rotation: quaternion, translation: vector3): boolean;
    class angelref {
        v: number;
    }
    function matrix3x2Decompose(src: matrix3x2, scale: vector2, rotation: angelref, translation: vector2): boolean;
    function matrixGetRotation(src: matrix, result: quaternion): void;
    function matrix2Quaternion(matrix: matrix, result: quaternion): void;
    function unitxyzToRotation(xAxis: vector3, yAxis: vector3, zAxis: vector3, out: quaternion): void;
    function matrixClone(src: matrix, out: matrix): void;
    function matrix3x2Clone(src: matrix3x2, out: matrix3x2): void;
    function matrixMakeIdentity(out: matrix): void;
    function matrix3x2MakeIdentity(out: matrix3x2): void;
    function matrixInverse(src: matrix, out: matrix): void;
    function matrix3x2Inverse(src: matrix3x2, out: matrix3x2): void;
    function matrixMakeTransformRTS(pos: vector3, scale: vector3, rot: quaternion, out: matrix): void;
    function matrix3x2MakeTransformRTS(pos: vector2, scale: vector2, rot: number, out: matrix3x2): void;
    function matrixMakeTranslate(x: number, y: number, z: number, out: matrix): void;
    function matrix3x2MakeTranslate(x: number, y: number, out: matrix3x2): void;
    function matrixGetScale(src: matrix, scale: vector3): void;
    function matrixMakeScale(xScale: number, yScale: number, zScale: number, out: matrix): void;
    function matrix3x2TransformVector2(mat: matrix, inp: vector2, out: vector2): void;
    function matrix3x2TransformNormal(mat: matrix, inp: vector2, out: vector2): void;
    function matrix3x2MakeScale(xScale: number, yScale: number, out: matrix3x2): void;
    function matrixMakeRotateAxisAngle(axis: vector3, angle: number, out: matrix): void;
    function matrix3x2MakeRotate(angle: number, out: matrix3x2): void;
    function matrixMultiply(lhs: matrix, rhs: matrix, out: matrix): void;
    function matrix3x2Multiply(lhs: matrix3x2, rhs: matrix3x2, out: matrix3x2): void;
    function matrix3x2Equal(mtx1: matrix3x2, mtx2: matrix3x2, threshold?: number): boolean;
    function matrixProject_PerspectiveLH(fov: number, aspect: number, znear: number, zfar: number, out: matrix): void;
    function matrixProject_OrthoLH(width: number, height: number, znear: number, zfar: number, out: matrix): void;
    function matrixLookatLH(forward: vector3, up: vector3, out: matrix): void;
    function matrixViewLookatLH(eye: vector3, forward: vector3, up: vector3, out: matrix): void;
    function matrixLerp(left: matrix, right: matrix, v: number, out: matrix): void;
    function matrixTransformVector3(vector: vector3, transformation: matrix, result: vector3): void;
    function matrixTransformVector4(src: gd3d.math.vector4, mtx: gd3d.math.matrix, out: gd3d.math.vector4): void;
    function matrixTransformNormal(vector: vector3, transformation: matrix, result: vector3): void;
    function matrixGetVector3ByOffset(src: matrix, offset: number, result: vector3): void;
    function matrixReset(mat: matrix): void;
    function matrixZero(mat: matrix): void;
    function matrixScaleByNum(value: number, mat: matrix): void;
    function matrixAdd(left: matrix, right: matrix, out: matrix): void;
    function matrixEqual(mtx1: matrix, mtx2: matrix, threshold?: number): boolean;
    function matrixIsIdentity(mtx: matrix): boolean;
}
declare namespace gd3d.math {
    function floatClamp(v: number, min?: number, max?: number): number;
    function sign(value: number): number;
    function getKeyCodeByAscii(ev: KeyboardEvent): number;
    function numberLerp(fromV: number, toV: number, v: number): number;
    function x_AXIS(): vector3;
    function y_AXIS(): vector3;
    function z_AXIS(): vector3;
    class commonStatic {
        static x_axis: gd3d.math.vector3;
        static y_axis: gd3d.math.vector3;
        static z_axis: gd3d.math.vector3;
    }
}
declare namespace gd3d.math {
    function quatIdentity(src: quaternion): void;
    function quatNormalize(src: quaternion, out: quaternion): void;
    function quatTransformVector(src: quaternion, vector: vector3, out: vector3): void;
    function quatTransformVectorDataAndQuat(src: Float32Array, srcseek: number, vector: vector3, out: vector3): void;
    function quatMagnitude(src: quaternion): number;
    function quatClone(src: quaternion, out: quaternion): void;
    function quatEqual(quat: quaternion, quat2: quaternion, threshold?: number): boolean;
    function quatToMatrix(src: quaternion, out: matrix): void;
    function quatInverse(src: quaternion, out: quaternion): void;
    function quatFromYawPitchRoll(yaw: number, pitch: number, roll: number, result: quaternion): void;
    function quatMultiply(srca: quaternion, srcb: quaternion, out: quaternion): void;
    function quatMultiplyDataAndQuat(srca: Float32Array, srcaseek: number, srcb: quaternion, out: quaternion): void;
    function quatMultiplyVector(vector: vector3, scr: quaternion, out: quaternion): void;
    function quatLerp(srca: quaternion, srcb: quaternion, out: quaternion, t: number): void;
    function quatFromAxisAngle(axis: vector3, angle: number, out: quaternion): void;
    function quatToAxisAngle(src: quaternion, axis: vector3): number;
    function quatFromEulerAngles(ax: number, ay: number, az: number, out: quaternion): void;
    function quatToEulerAngles(src: quaternion, result: vector3): void;
    function quatReset(src: quaternion): void;
    function quatLookat(pos: vector3, targetpos: vector3, out: quaternion): void;
    function quat2Lookat(pos: vector3, targetpos: vector3, out: quaternion, updir?: gd3d.math.vector3): void;
    function quat2LookRotation(pos: vector3, targetpos: vector3, upwards: vector3, out: quaternion): void;
    function quatLookRotation(dir: vector3, upwards: vector3, out: quaternion): void;
    function quatYAxis(pos: vector3, targetpos: vector3, out: quaternion): void;
    function rotationTo(from: vector3, to: vector3, out: quaternion): void;
    function myLookRotation(dir: vector3, out: quaternion, up?: vector3): void;
}
declare namespace gd3d.math {
    function rectSet_One(out: rect): void;
    function rectSet_Zero(out: rect): void;
    function rectEqul(src1: rect, src2: rect): boolean;
    function rectInner(x: number, y: number, src: rect): boolean;
    function rectCollided(r1: rect, r2: rect): boolean;
    function rectClone(src: rect, out: rect): void;
}
declare namespace gd3d.math {
    function caclStringByteLength(value: string): number;
}
declare namespace gd3d.math {
    function spriteAnimation(row: number, column: number, index: number, out: vector4): void;
    function GetPointAlongCurve(curveStart: vector3, curveStartHandle: vector3, curveEnd: vector3, curveEndHandle: vector3, t: number, out: vector3, crease?: number): void;
}
declare namespace gd3d.math {
    function vec2Subtract(a: vector2, b: vector2, out: vector2): void;
    function vec2Add(a: vector2, b: vector2, out: vector2): void;
    function vec2Clone(from: vector2, to: vector2): void;
    function vec2Distance(a: vector2, b: vector2): number;
    function vec2ScaleByNum(from: vector2, scale: number, out: vector2): void;
    function vec2ScaleByVec2(from: vector2, scale: vector2, out: vector2): void;
    function vec2Length(a: vector2): number;
    function vec2SLerp(vector: vector2, vector2: vector2, v: number, out: vector2): void;
    function vec2Normalize(from: vector2, out: vector2): void;
    function vec2Multiply(a: vector2, b: vector2): number;
    function vec2Dot(lhs: vector2, rhs: vector2): number;
    function vec2Equal(vector: vector2, vector2: vector2, threshold?: number): boolean;
    function vec2SetAll(vector: vector2, value: number): void;
    function vec2Set(vector: vector2, x: number, y: number): void;
}
declare namespace gd3d.math {
    function vec3Clone(from: vector3, to: vector3): void;
    function vec3ToString(result: string): void;
    function vec3Add(a: vector3, b: vector3, out: vector3): void;
    function vec3Subtract(a: vector3, b: vector3, out: vector3): void;
    function vec3Minus(a: vector3, out: vector3): void;
    function vec3Length(a: vector3): number;
    function vec3SqrLength(value: vector3): number;
    function vec3Set_One(out: vector3): void;
    function vec3Set_Forward(out: vector3): void;
    function vec3Set_Back(out: vector3): void;
    function vec3Set_Up(out: vector3): void;
    function vec3Set_Down(out: vector3): void;
    function vec3Set_Left(out: vector3): void;
    function vec3Set_Right(out: vector3): void;
    function vec3Normalize(value: vector3, out: vector3): void;
    function vec3ScaleByVec3(from: vector3, scale: vector3, out: vector3): void;
    function vec3ScaleByNum(from: vector3, scale: number, out: vector3): void;
    function vec3Product(a: vector3, b: vector3, out: vector3): void;
    function vec3Cross(lhs: vector3, rhs: vector3, out: vector3): void;
    function vec3Reflect(inDirection: vector3, inNormal: vector3, out: vector3): void;
    function vec3Dot(lhs: vector3, rhs: vector3): number;
    function vec3Project(vector: vector3, onNormal: vector3, out: vector3): void;
    function vec3ProjectOnPlane(vector: vector3, planeNormal: vector3, out: vector3): void;
    function vec3Exclude(excludeThis: vector3, fromThat: vector3, out: vector3): void;
    function vec3Angle(from: vector3, to: vector3): number;
    function vec3Distance(a: vector3, b: vector3): number;
    function vec3ClampLength(vector: vector3, maxLength: number, out: vector3): void;
    function vec3Min(lhs: vector3, rhs: vector3, out: vector3): void;
    function vec3Max(lhs: vector3, rhs: vector3, out: vector3): void;
    function vec3AngleBetween(from: vector3, to: vector3): number;
    function vec3Reset(out: vector3): void;
    function vec3SLerp(vector: vector3, vector2: vector3, v: number, out: vector3): void;
    function vec3SetByFloat(x: number, y: number, z: number, out: vector3): void;
    function vec3Format(vector: vector3, maxDot: number, out: vector3): void;
    function quaternionFormat(vector: quaternion, maxDot: number, out: quaternion): void;
    function floatFormat(num: number, maxDot: number): number;
    function vec3Equal(vector: vector3, vector2: vector3, threshold?: number): boolean;
    function vec3SetAll(vector: vector3, value: number): void;
    function vec3Set(vector: vector3, x: number, y: number, z: number): void;
}
declare namespace gd3d.math {
    function vec4Clone(from: vector4, to: vector4): void;
    function vec4SLerp(vector: vector4, vector2: vector4, v: number, out: vector4): void;
    function vec4Add(a: gd3d.math.vector4, b: gd3d.math.vector4, out: gd3d.math.vector4): void;
    function vec4ScaleByNum(from: gd3d.math.vector4, scale: number, out: gd3d.math.vector4): void;
    function vec4SetAll(vector: vector3, value: number): void;
    function vec4Set(vector: vector4, x: number, y: number, z: number, w: number): void;
}
declare namespace gd3d.framework {
    class navVec3 {
        x: number;
        y: number;
        z: number;
        realy: number;
        clone(): navVec3;
        static DistAZ(start: navVec3, end: navVec3): number;
        static NormalAZ(start: navVec3, end: navVec3): navVec3;
        static Cross(start: navVec3, end: navVec3): navVec3;
        static DotAZ(start: navVec3, end: navVec3): number;
        static Angle(start: navVec3, end: navVec3): number;
        static Border(start: navVec3, end: navVec3, dist: number): navVec3;
        static lerp(from: navVec3, to: navVec3, lerp: number, out: navVec3): void;
    }
    class navNode {
        nodeID: number;
        poly: number[];
        borderByPoly: string[];
        borderByPoint: string[];
        center: navVec3;
        genBorder(): void;
        isLinkTo(info: navMeshInfo, nid: number): string;
        getLinked(info: navMeshInfo): number[];
        genCenter(info: navMeshInfo): void;
    }
    class navBorder {
        borderName: string;
        nodeA: number;
        nodeB: number;
        pointA: number;
        pointB: number;
        length: number;
        center: navVec3;
    }
    class navMeshInfo {
        vecs: navVec3[];
        nodes: navNode[];
        borders: {
            [id: string]: navBorder;
        };
        min: navVec3;
        max: navVec3;
        calcBound(): void;
        private static cross;
        inPoly(p: navVec3, poly: number[]): boolean;
        genBorder(): void;
        static LoadMeshInfo(s: string): navMeshInfo;
    }
}
declare namespace gd3d.framework {
    class NavMeshLoadManager {
        private static _instance;
        private navMeshVertexOffset;
        navMesh: gd3d.framework.mesh;
        private app;
        navigate: gd3d.framework.Navigate;
        navTrans: gd3d.framework.transform;
        readonly navmeshJson: string;
        private _navmeshJson;
        loadNavMesh(navMeshUrl: string, app: gd3d.framework.application, onstate?: (state: stateLoad) => void): void;
        loadNavMeshByDate(dataStr: string, app: gd3d.framework.application, callback: () => any): void;
        private navmeshLoaded;
        private createMesh;
        showNavmesh(isshow: boolean, material?: gd3d.framework.material): void;
        dispose(): void;
        static readonly Instance: NavMeshLoadManager;
        moveToPoints(startPos: gd3d.math.vector3, endPos: gd3d.math.vector3): Array<gd3d.math.vector3>;
        static findtriIndex(point: gd3d.math.vector3, trans: gd3d.framework.transform): number;
    }
}
declare namespace gd3d.framework {
    class Navigate {
        navindexmap: {
            [id: number]: number;
        };
        navinfo: navMeshInfo;
        constructor(navinfo: gd3d.framework.navMeshInfo, navindexmap: any);
        pathPoints(start: gd3d.math.vector3, end: gd3d.math.vector3, startIndex: number, endIndex: number): Array<gd3d.math.vector3>;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class pathFinding {
        static calcAStarPolyPath(info: navMeshInfo, startPoly: number, endPoly: number, endPos?: navVec3, offset?: number): number[];
        private static NearAngle;
        static FindPath(info: navMeshInfo, startPos: navVec3, endPos: navVec3, offset?: number): navVec3[];
        static calcWayPoints(info: navMeshInfo, startPos: navVec3, endPos: navVec3, polyPath: number[], offset?: number): navVec3[];
        static intersectBorder(a: navVec3, b: navVec3, c: navVec3, d: navVec3): navVec3;
    }
}
declare var RVO: any;
declare namespace gd3d.framework {
    class RVOManager {
        sim: any;
        transforms: gd3d.framework.transform[];
        goals: any[];
        radius: number[];
        attackRanges: number[];
        speeds: number[];
        private map;
        private isRunning;
        private currGoal;
        private lastGoal;
        private currMoveDir;
        private _RoadPoints;
        setRoadPoints(goalQueue: gd3d.math.vector3[]): void;
        addAgent(key: number, transform: gd3d.framework.transform, radius: number, attackRanges: number, speed: number): void;
        removeAgent(key: number): void;
        private reBuildHashMap;
        getTransformByKey(key: number): gd3d.framework.transform;
        setRadius(id: number, value: number): void;
        setSpeed(id: number, value: number): void;
        setAttackRange(id: number, value: number): void;
        disable(): void;
        enable(): void;
        update(): void;
        private isAlmostStatic;
        private RVO_walking;
        private updateTransform;
        private RVO_check;
        private cal2dDir;
    }
}
declare namespace gd3d.framework {
    class EffectSystemData {
        life: number;
        beLoop: boolean;
        elementDic: {
            [name: string]: EffectElementData;
        };
        clone(): EffectSystemData;
        dispose(): void;
    }
    class EffectElement {
        transform: transform;
        data: EffectElementData;
        name: string;
        timelineFrame: {
            [frameIndex: number]: EffectFrameData;
        };
        ref: string;
        actions: IEffectAction[];
        curAttrData: EffectAttrsData;
        effectBatcher: EffectBatcher;
        startVboIndex: number;
        startEboIndex: number;
        endEboIndex: number;
        delayTime: number;
        actionActive: boolean;
        loopFrame: number;
        active: boolean;
        constructor(_data: EffectElementData);
        private recordElementLerpAttributes;
        private recordLerpValues;
        private recordLerp;
        initActions(): void;
        update(): void;
        private updateElementRotation;
        isCurFrameNeedRefresh(frameIndex: number): boolean;
        setActive(_active: boolean): void;
        dispose(): void;
    }
    class EffectElementData {
        name: string;
        type: EffectElementTypeEnum;
        timelineFrame: {
            [frameIndex: number]: EffectFrameData;
        };
        refFrom: string;
        beloop: boolean;
        delayTime: number;
        actionData: EffectActionData[];
        emissionData: Emission;
        initFrameData: EffectFrameData;
        clone(): EffectElementData;
        dispose(): void;
    }
    class EffectAttrsData {
        pos: math.vector3;
        euler: math.vector3;
        color: math.vector3;
        colorRate: number;
        scale: math.vector3;
        uv: math.vector2;
        alpha: number;
        mat: EffectMatData;
        renderModel: RenderModel;
        matrix: math.matrix;
        tilling: math.vector2;
        rotationByEuler: math.quaternion;
        localRotation: math.quaternion;
        mesh: mesh;
        meshdataVbo: Float32Array;
        setLerpAttribute(attribute: string, val: any): void;
        getAttribute(attribute: string): any;
        initAttribute(attribute: string): void;
        resetMatrix(): void;
        copyandinit(): EffectAttrsData;
        clone(): EffectAttrsData;
    }
    class EffectFrameData {
        frameIndex: number;
        attrsData: EffectAttrsData;
        lerpDatas: EffectLerpData[];
        delayTime: number;
        clone(): EffectFrameData;
        dispose(): void;
    }
    class EffectLerpData {
        type: EffectLerpTypeEnum;
        fromFrame: number;
        toFrame: ValueData;
        attrsData: EffectAttrsData;
        attrsList: any[];
        clone(): EffectLerpData;
    }
    class EffectActionData {
        actionType: string;
        startFrame: number;
        endFrame: number;
        params: any;
        clone(): EffectActionData;
    }
    class EffectMatData {
        shader: shader;
        diffuseTexture: texture;
        alphaTexture: texture;
        alphaCut: number;
        static beEqual(data0: EffectMatData, data1: EffectMatData): boolean;
        clone(): EffectMatData;
    }
    enum EffectBatcherState {
        NotInitedStateType = 0,
        InitedStateType = 1,
        ResizeCapacityStateType = 2
    }
    class EffectBatcher {
        mesh: mesh;
        mat: material;
        state: EffectBatcherState;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        effectElements: EffectElement[];
        private _totalVertexCount;
        curTotalVertexCount: number;
        private _indexStartIndex;
        indexStartIndex: number;
        private _vbosize;
        resizeVboSize(value: number): void;
        dispose(): void;
        vertexSize: number;
        constructor(formate: number);
    }
    enum EffectPlayStateEnum {
        None = 0,
        BeReady = 1,
        Play = 2,
        Pause = 3,
        Stop = 4,
        Dispose = 5
    }
    enum EffectElementTypeEnum {
        SingleMeshType = 0,
        EmissionType = 1,
        MultiMeshType = 2
    }
    enum EffectLerpTypeEnum {
        Linear = 0
    }
    enum RenderModel {
        None = 0,
        BillBoard = 1,
        StretchedBillBoard = 2,
        HorizontalBillBoard = 3,
        VerticalBillBoard = 4,
        Mesh = 5
    }
}
declare namespace gd3d.framework {
    enum ParticleEmissionType {
        burst = 0,
        continue = 1
    }
    class EmissionData {
        type: ParticleEmissionType;
        emissionName: string;
        time: number;
        count: number;
        constructor();
    }
}
declare namespace gd3d.framework {
    class Emission {
        emissionType: ParticleEmissionType;
        simulateInLocalSpace: boolean;
        rootpos: gd3d.math.vector3;
        rootRotAngle: gd3d.math.vector3;
        rootScale: gd3d.math.vector3;
        maxEmissionCount: number;
        emissionCount: number;
        time: number;
        moveSpeed: ParticleNode;
        gravity: number;
        euler: ParticleNode;
        eulerNodes: Array<ParticleNode>;
        eulerSpeed: ParticleNode;
        scale: ParticleNode;
        scaleNodes: Array<ParticleNodeNumber>;
        scaleSpeed: ParticleNode;
        color: ParticleNode;
        colorRate: number;
        colorNodes: Array<ParticleNode>;
        colorSpeed: ParticleNode;
        simulationSpeed: ParticleNodeNumber;
        alpha: ParticleNodeNumber;
        alphaNodes: Array<ParticleNodeNumber>;
        alphaSpeed: ParticleNodeNumber;
        uv: ParticleNodeVec2;
        uvType: UVTypeEnum;
        uvRoll: UVRoll;
        uvSprite: UVSprite;
        tilling: math.vector2;
        mat: EffectMatData;
        life: ValueData;
        renderModel: RenderModel;
        mesh: mesh;
        particleStartData: gd3d.framework.ParticleStartData;
        private dataForVbo;
        getVboData(vf: number): Float32Array;
        clone(): Emission;
        getworldRotation(): void;
        cloneParticleNodeArray(_array: Array<ParticleNode>): ParticleNode[];
        cloneParticleNodeNumberArray(_array: Array<ParticleNodeNumber>): ParticleNodeNumber[];
    }
    class UVSprite {
        row: number;
        column: number;
        totalCount: number;
        clone(): UVSprite;
    }
    class UVRoll {
        uvSpeed: UVSpeedNode;
        uvSpeedNodes: Array<UVSpeedNode>;
        clone(): UVRoll;
    }
    enum UVTypeEnum {
        NONE = 0,
        UVRoll = 1,
        UVSprite = 2
    }
}
declare namespace gd3d.framework {
    class ParticleNode {
        x: ValueData;
        y: ValueData;
        z: ValueData;
        key: number;
        constructor();
        getValue(): gd3d.math.vector3;
        getValueRandom(): gd3d.math.vector3;
        clone(): ParticleNode;
    }
    class AlphaNode {
        alpha: ValueData;
        key: number;
        getValue(): number;
    }
    class UVSpeedNode {
        u: ValueData;
        v: ValueData;
        key: number;
        getValue(): gd3d.math.vector2;
        getValueRandom(): gd3d.math.vector2;
        clone(): UVSpeedNode;
    }
    class ParticleNodeVec2 {
        x: ValueData;
        y: ValueData;
        key: number;
        getValue(): gd3d.math.vector2;
        getValueRandom(): gd3d.math.vector2;
        clone(): ParticleNodeVec2;
    }
    class ParticleNodeNumber {
        num: ValueData;
        key: number;
        getValue(): number;
        getValueRandom(): number;
        clone(): ParticleNodeNumber;
    }
}
declare namespace gd3d.framework {
    enum ParticleSystemShape {
        NORMAL = 0,
        BOX = 1,
        SPHERE = 2,
        HEMISPHERE = 3,
        CONE = 4,
        EDGE = 5,
        CIRCLE = 6
    }
    class ParticleStartData {
        shapeType: ParticleSystemShape;
        private _position;
        position: gd3d.math.vector3;
        private _direction;
        direction: gd3d.math.vector3;
        private _width;
        width: number;
        private _height;
        height: number;
        depth: number;
        private _radius;
        radius: number;
        private _angle;
        angle: number;
        readonly randomDirection: gd3d.math.vector3;
        readonly boxDirection: gd3d.math.vector3;
        readonly sphereDirection: gd3d.math.vector3;
        readonly hemisphereDirection: gd3d.math.vector3;
        emitFrom: emitfromenum;
        readonly coneDirection: gd3d.math.vector3;
        readonly circleDirection: gd3d.math.vector3;
        readonly edgeDirection: math.vector3;
        private getposition;
        clone(): ParticleStartData;
    }
    enum emitfromenum {
        base = 0,
        volume = 1
    }
}
declare namespace gd3d.framework {
    class ValueData {
        isRandom: boolean;
        private _value;
        private _valueLimitMin;
        private _valueLimitMax;
        private beInited;
        value: number;
        valueLimitMin: number;
        valueLimitMax: number;
        clone(): ValueData;
        getValue(): number;
        getValueRandom(): number;
        constructor();
        static RandomRange(min: number, max: number, isInteger?: boolean): number;
    }
}
declare namespace gd3d.framework {
    class Particle_new {
        gameObject: gameObject;
        private emisson;
        private batcher;
        private startScale;
        startRotation: gd3d.math.quaternion;
        rotationByShape: math.quaternion;
        Starteuler: math.vector3;
        rotAngle: number;
        eulerSpeed: number;
        rotationByEuler: math.quaternion;
        localMatrix: math.matrix;
        localTranslate: math.vector3;
        localRotation: math.quaternion;
        localScale: math.vector3;
        startColor: math.color;
        color: math.vector3;
        alpha: number;
        tex_ST: math.vector4;
        private totalLife;
        private curLife;
        private life;
        private speedDir;
        private movespeed;
        private simulationSpeed;
        sourceVbo: Float32Array;
        vertexStartIndex: number;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        private emissionMatToWorld;
        private emissionWorldRotation;
        private sizeNodes;
        private colorNodes;
        private alphaNodes;
        constructor(batcher: EmissionBatcher_new);
        uploadData(array: Float32Array): void;
        initByData(): void;
        actived: boolean;
        update(delta: number): void;
        private transformVertex;
        private _updateLocalMatrix;
        private matToworld;
        private refreshEmissionData;
        private _updateRotation;
        private _updatePos;
        private _updateEuler;
        private _updateScale;
        private _updateColor;
        private spriteIndex;
        private _updateUV;
        private _updateVBO;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    interface IAttributeData {
        uiState: AttributeUIState;
        data: {
            [frameIndex: number]: FrameKeyPointData;
        };
        frameIndexs: number[];
        attributeValType: AttributeValType;
        attributeType: AttributeType;
        actions: {
            [frameIndex: number]: IEffectAction[];
        };
        init(): any;
    }
    class Vector3AttributeData implements IAttributeData, ILerpAttributeInterface {
        uiState: AttributeUIState;
        attributeValType: AttributeValType;
        attributeType: AttributeType;
        data: {
            [frameIndex: number]: FrameKeyPointData;
        };
        frameIndexs: number[];
        actions: {
            [frameIndex: number]: IEffectAction[];
        };
        constructor();
        init(): void;
        addFramePoint(data: FrameKeyPointData, func?: Function): void;
        removeFramePoint(frameId: number, data: any, func?: Function): void;
        updateFramePoint(data: any, func?: Function): void;
    }
    class Vector2AttributeData implements IAttributeData, ILerpAttributeInterface {
        uiState: AttributeUIState;
        attributeValType: AttributeValType;
        attributeType: AttributeType;
        frameIndexs: number[];
        data: {
            [frameIndex: number]: FrameKeyPointData;
        };
        actions: {
            [frameIndex: number]: IEffectAction[];
        };
        constructor();
        init(): void;
        addFramePoint(data: FrameKeyPointData, func?: Function): void;
        removeFramePoint(frameId: number, data: gd3d.math.vector2, func?: Function): void;
        updateFramePoint(data: any, func?: Function): void;
    }
    class NumberAttributeData implements IAttributeData, ILerpAttributeInterface {
        uiState: AttributeUIState;
        attributeValType: AttributeValType;
        attributeType: AttributeType;
        data: {
            [frameIndex: number]: FrameKeyPointData;
        };
        frameIndexs: number[];
        timeLine: {
            [frameIndex: number]: number;
        };
        actions: {
            [frameIndex: number]: IEffectAction[];
        };
        constructor();
        init(): void;
        addFramePoint(data: any, func?: Function): void;
        removeFramePoint(frameId: number, data: number, func?: Function): void;
        updateFramePoint(data: any, func?: Function): void;
    }
    interface ILerpAttributeInterface {
        addFramePoint(data: any, func?: Function): any;
        removeFramePoint(frameId: number, data: any, func?: Function): any;
        updateFramePoint(data: any, func?: Function): any;
    }
    enum AttributeUIState {
        None = 0,
        Show = 1,
        Hide = 2
    }
    enum AttributeUIType {
        Number = 0,
        Vector2 = 1,
        Vector3 = 2,
        Vector4 = 3
    }
    enum AttributeValType {
        FixedValType = 0,
        LerpType = 1
    }
    class FrameKeyPointData {
        frameIndex: number;
        val: any;
        actions: IEffectAction[];
        constructor(frameIndex: number, val: any);
    }
    class AttributeUtil {
        static addFrameIndex(datas: number[], index: number): void;
    }
}
declare namespace gd3d.framework {
    interface IEffectElement {
        name: string;
        elementType: EffectElementTypeEnum;
        beloop: boolean;
        delayTime: number;
        mat: material;
        mesh: mesh;
        writeToJson(obj: any): any;
        dispose(): any;
    }
    enum AttributeType {
        PositionType = 1,
        EulerType = 2,
        ScaleType = 3,
        ColorType = 4,
        ColorRateType = 5,
        AlphaType = 6,
        TillingType = 7
    }
    class EffectElementSingleMesh implements IEffectElement {
        name: string;
        elementType: gd3d.framework.EffectElementTypeEnum;
        beloop: boolean;
        delayTime: number;
        life: number;
        mat: gd3d.framework.material;
        mesh: gd3d.framework.mesh;
        colorRate: number;
        renderModel: gd3d.framework.RenderModel;
        tex_ST: math.vector4;
        position: Vector3Key[];
        euler: Vector3Key[];
        scale: Vector3Key[];
        color: Vector3Key[];
        alpha: NumberKey[];
        actions: IEffectAction[];
        curAttrData: EffectAttrsData;
        loopFrame: number;
        active: boolean;
        transform: transform;
        private mgr;
        private effectSys;
        rotationByEuler: math.quaternion;
        localRotation: math.quaternion;
        constructor(sys: TestEffectSystem, data?: EffectElementData);
        private initByElementdata;
        private initByDefData;
        writeToJson(obj: any): any;
        update(): void;
        private updateElementRotation;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class EffectElementEmission implements IEffectElement {
        webgl: WebGLRenderingContext;
        gameObject: gameObject;
        effectSys: TestEffectSystem;
        active: boolean;
        vf: number;
        private maxVertexCount;
        rotTranslate: gd3d.math.vector3;
        rotScale: gd3d.math.vector3;
        rotRotation: gd3d.math.vector3;
        private rotQuta;
        name: string;
        elementType: EffectElementTypeEnum;
        delayTime: number;
        beloop: boolean;
        lifeTime: NumberData;
        simulateInLocalSpace: boolean;
        startScale: Vector3Data;
        startEuler: Vector3Data;
        startColor: math.color;
        colorRate: number;
        duration: NumberData;
        emissionCount: NumberData;
        emissionType: ParticleEmissionType;
        shapeType: ParticleSystemShape;
        simulationSpeed: NumberData;
        width: number;
        height: number;
        depth: number;
        radius: number;
        angle: number;
        emitFrom: emitfromenum;
        rendermodel: RenderModel;
        mat: material;
        mesh: gd3d.framework.mesh;
        enableVelocityOverLifetime: boolean;
        moveSpeed: Vector3Data;
        enableSizeOverLifetime: boolean;
        sizeNodes: NumberKey[];
        enableRotOverLifeTime: boolean;
        angleSpeed: NumberData;
        enableColorOverLifetime: boolean;
        colorNodes: Vector3Key[];
        alphaNodes: NumberKey[];
        enableTexAnimation: boolean;
        uvType: UVTypeEnum;
        uSpeed: number;
        vSpeed: number;
        row: number;
        column: number;
        count: number;
        private _continueSpaceTime;
        perVertexCount: number;
        perIndexxCount: number;
        vertexSize: number;
        emissionBatchers: EmissionBatcher_new[];
        private curbatcher;
        deadParticles: Particle_new[];
        private curTime;
        private beBurst;
        private numcount;
        private beover;
        constructor(sys: TestEffectSystem, data?: EffectElementData);
        private initDefparticleData;
        private initByEmissonData;
        private worldRotation;
        getWorldRotation(): gd3d.math.quaternion;
        matToObj: gd3d.math.matrix;
        private matToWorld;
        getmatrixToObj(): void;
        getmatrixToWorld(): gd3d.math.matrix;
        update(delta: number): void;
        private updateBatcher;
        private updateLife;
        private reInit;
        private updateEmission;
        private addParticle;
        private addBatcher;
        private _renderCamera;
        readonly renderCamera: camera;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        dispose(): void;
        vbo: Float32Array;
        private ebo;
        private getMesh;
        cloneMeshVBO(): Float32Array;
        cloneMeshEBO(): Uint16Array;
        writeToJson(obj: any): void;
    }
}
declare namespace gd3d.framework {
    class EmissionBatcher_new {
        emission: EffectElementEmission;
        private webgl;
        mesh: mesh;
        mat: material;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        particles: Particle_new[];
        constructor(emissionElement: EffectElementEmission);
        private initMesh;
        curVerCount: number;
        curIndexCount: number;
        addParticle(): void;
        private refreshBuffer;
        update(delta: number): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class effTools {
        static getRandomDirAndPosByZEmission(emission: EffectElementEmission, outDir: gd3d.math.vector3, outPos: gd3d.math.vector3): void;
        static getTex_ST(emission: EffectElementEmission, out_St: math.vector4): void;
    }
}
declare namespace gd3d.framework {
    class Curve3 {
        private _beizerPoints;
        private _bezierPointNum;
        beizerPoints: gd3d.math.vector3[];
        bezierPointNum: number;
        static CreateLinearBezier(start: gd3d.math.vector3, end: gd3d.math.vector3, indices: number): Curve3;
        static GetLerpBezier(nodes: gd3d.framework.ParticleNode[]): Curve3;
        static CreateQuadraticBezier(v0: gd3d.math.vector3, v1: gd3d.math.vector3, v2: gd3d.math.vector3, bezierPointNum: number): Curve3;
        static CreateCubicBezier(v0: gd3d.math.vector3, v1: gd3d.math.vector3, v2: gd3d.math.vector3, v3: gd3d.math.vector3, bezierPointNum: number): Curve3;
        constructor(points: gd3d.math.vector3[], nbPoints: number);
        getPoints(): math.vector3[];
    }
}
declare namespace gd3d.framework {
    interface IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): any;
        update(frameIndex: number): any;
    }
    class LinearAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        attriname: string;
        attrival: any;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class DestroyAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class LoopAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class UVRollAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        speedu: number;
        speedv: number;
        startu: number;
        startv: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class UVSpriteAnimationAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        fps: number;
        row: number;
        colum: number;
        totalCount: number;
        private frameInternal;
        private spriteIndex;
        private tex_ST;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class RotationAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        velocity: any;
        frameInternal: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class RoseCurveAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        radius: number;
        polar: any;
        level: number;
        frameInternal: number;
        speed: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class TrailAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        radius: number;
        position: any;
        eular: any;
        width: number;
        frameInternal: number;
        speed: number;
        transform: gd3d.framework.transform;
        startRotation: gd3d.math.quaternion;
        color: any;
        alpha: number;
        offsetTransalte: gd3d.math.vector3;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        update(frameIndex: number): void;
    }
    class BreathAction implements IEffectAction {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        attriname: string;
        startvalue: any;
        targetvalue: any;
        loopframe: number;
        halfloopframe: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement): void;
        curTargetFrame: number;
        update(frameIndex: number): void;
        swap(): void;
        getLerpValue(frameIndex: number): any;
    }
}
declare namespace gd3d.framework {
    class EffectParser {
        asMgr: assetMgr;
        Parse(str: string, assetmgr: assetMgr): EffectSystemData;
        private _parse;
        private copyAndOverWrite;
        _parseSingleMeshTypeData(elementData: any, element: EffectElementData): void;
        _parseEmissionTypeData(elementData: any, element: EffectElementData): void;
        _parseEmissionShape(_startdata: any, element: EffectElementData): void;
        _parseToObjData(attrib: string, content: any): any;
        _parseToParticleNode(content: string): ParticleNode;
        _parseToValueData(content: string): ValueData;
        _parseToNumberArray(content: string): number[];
    }
}
declare namespace gd3d.framework {
    class EffectUtil {
        static lookatbyXAxis(pos: gd3d.math.vector3, xAxis: gd3d.math.vector3, yAxis: gd3d.math.vector3, zAxis: gd3d.math.vector3, targetpos: gd3d.math.vector3, quat: gd3d.math.quaternion): void;
        static eulerFromQuaternion(out: math.vector3, q: math.quaternion, order: any): void;
        static RandomRange(min: number, max: number, isInteger?: boolean): number;
        static vecMuliNum(vec: gd3d.math.vector3, num: number): gd3d.math.vector3;
        static parseVector3(value: any): gd3d.math.vector3;
        static parseEffectVec3(value: any): ParticleNode;
        static parseEffectVec2(value: any): ParticleNodeVec2;
        static parseEffectNum(value: any): ParticleNodeNumber;
        static parseEffectNumNode(value: any): ParticleNodeNumber;
        static parseEffectValueData(value: any): ValueData;
        static parseEffectUVSpeed(value: any): UVSpeedNode;
        static lookat(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, up?: gd3d.math.vector3): void;
        static RotateVector3(source: gd3d.math.vector3, direction: gd3d.math.vector3, out: gd3d.math.vector3): void;
        static bindAxisBillboard(localAxis: gd3d.math.vector3, out: gd3d.math.quaternion): void;
        static lookatVerticalBillboard(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, up?: gd3d.math.vector3): void;
        static quatLookatZ(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, forward?: gd3d.math.vector3): void;
        static quatLookatX(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, right?: gd3d.math.vector3): void;
    }
}
declare namespace gd3d.framework {
    class EmissionBatcher {
        emissionElement: EmissionElement;
        private webgl;
        gameObject: gameObject;
        data: Emission;
        mesh: mesh;
        mat: material;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        particles: Particle[];
        private vertexSize;
        vf: number;
        constructor(emissionElement: EmissionElement);
        initMesh(): void;
        curVerCount: number;
        curIndexCount: number;
        addParticle(): void;
        private refreshBuffer;
        update(delta: number): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class Particle {
        private batcher;
        gameObject: gameObject;
        private emisson;
        private vf;
        renderModel: RenderModel;
        private startScale;
        startRotation: gd3d.math.quaternion;
        rotationByShape: math.quaternion;
        euler: math.vector3;
        rotationByEuler: math.quaternion;
        localMatrix: math.matrix;
        localTranslate: math.vector3;
        localRotation: math.quaternion;
        localScale: math.vector3;
        color: math.vector3;
        colorRate: number;
        uv: math.vector2;
        alpha: number;
        tilling: math.vector2;
        private totalLife;
        private curLife;
        private speedDir;
        private movespeed;
        private simulationSpeed;
        data: Emission;
        private vertexSize;
        private vertexCount;
        sourceVbo: Float32Array;
        vertexStartIndex: number;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        private emissionMatToWorld;
        private emissionWorldRotation;
        constructor(batcher: EmissionBatcher);
        uploadData(array: Float32Array): void;
        initByData(): void;
        actived: boolean;
        update(delta: number): void;
        private transformVertex;
        private _updateLocalMatrix;
        private matToworld;
        private refreshEmissionData;
        private _updateRotation;
        private _updateElementRotation;
        private _updatePos;
        private _updateEuler;
        private _startNode;
        private endNode;
        private _updateScale;
        private _updateColor;
        private tempStartNode;
        private tempEndNode;
        private _updateNode;
        private _startNodeNum;
        private _curNodeNum;
        private _updateAlpha;
        private _startUVSpeedNode;
        private _curUVSpeedNode;
        private spriteIndex;
        private _updateUV;
        private tex_ST;
        private _updateVBO;
        dispose(): void;
    }
    enum nodeType {
        none = 0,
        alpha = 1,
        scale = 2
    }
}
declare namespace gd3d.framework {
    class Particles {
        emissionElements: EmissionElement[];
        vf: number;
        effectSys: effectSystem;
        constructor(sys: effectSystem);
        addEmission(_emissionNew: EffectElementData): void;
        updateForEmission(delta: number): void;
        update(delta: number): void;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        dispose(): void;
    }
    class EmissionElement {
        webgl: WebGLRenderingContext;
        gameObject: gameObject;
        effectSys: effectSystem;
        ParticleMgr: Particles;
        vf: number;
        emissionData: Emission;
        private maxVertexCount;
        private localtranslate;
        private localScale;
        private localrotate;
        private eluerAngle;
        private beloop;
        simulateInLocalSpace: boolean;
        active: boolean;
        private _continueSpaceTime;
        perVertexCount: number;
        perIndexxCount: number;
        emissionBatchers: EmissionBatcher[];
        private curbatcher;
        deadParticles: Particle[];
        private curTime;
        private numcount;
        private isover;
        constructor(_emission: EffectElementData, sys: effectSystem, mgr: Particles);
        private worldRotation;
        getWorldRotation(): gd3d.math.quaternion;
        matToBatcher: gd3d.math.matrix;
        private matToWorld;
        getmatrixToWorld(): gd3d.math.matrix;
        update(delta: number): void;
        private testtime;
        updateForEmission(delta: number): void;
        updateBatcher(delta: number): void;
        updateEmission(delta: number): void;
        addParticle(count?: number): void;
        private addBatcher;
        renderCamera: camera;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): void;
        dispose(): void;
        isOver(): boolean;
    }
}
declare namespace gd3d.framework {
    class CannonJSPlugin implements IPhysicsEnginePlugin {
        private _useDeltaForWorldStep;
        BJSCANNON: any;
        world: any;
        name: string;
        private _physicsMaterials;
        private _fixedTimeStep;
        constructor(_useDeltaForWorldStep?: boolean, iterations?: number);
        setGravity(gravity: math.vector3): void;
        setTimeStep(timeStep: number): void;
        getTimeStep(): number;
        executeStep(delta: number, impostors: Array<PhysicsImpostor>): void;
        applyImpulse(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        applyForce(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        generatePhysicsBody(impostor: PhysicsImpostor): void;
        removePhysicsBody(impostor: PhysicsImpostor): void;
        generateJoint(impostorJoint: PhysicsImpostorJoint): void;
        removeJoint(impostorJoint: PhysicsImpostorJoint): void;
        private _addMaterial;
        private _checkWithEpsilon;
        private _createShape;
        private vec3Copy;
        private QuatCopy;
        setTransformationFromPhysicsBody(impostor: PhysicsImpostor): void;
        setPhysicsBodyTransformation(impostor: PhysicsImpostor, newPosition: math.vector3, newRotation: math.vector3): void;
        isSupported(): boolean;
        setLinearVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        setAngularVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        getLinearVelocity(impostor: PhysicsImpostor): math.vector3;
        getAngularVelocity(impostor: PhysicsImpostor): math.vector3;
        setBodyMass(impostor: PhysicsImpostor, mass: number): void;
        getBodyMass(impostor: PhysicsImpostor): number;
        getBodyFriction(impostor: PhysicsImpostor): number;
        setBodyFriction(impostor: PhysicsImpostor, friction: number): void;
        getBodyRestitution(impostor: PhysicsImpostor): number;
        setBodyRestitution(impostor: PhysicsImpostor, restitution: number): void;
        sleepBody(impostor: PhysicsImpostor): void;
        isSleeping(impostor: PhysicsImpostor): boolean;
        wakeUpBody(impostor: PhysicsImpostor): void;
        updateDistanceJoint(joint: PhysicsJoint, maxDistance: number, minDistance?: number): void;
        setMotor(joint: IMotorEnabledJoint, speed?: number, maxForce?: number, motorIndex?: number): void;
        setLimit(joint: IMotorEnabledJoint, upperLimit: number, lowerLimit?: number): void;
        getRadius(impostor: PhysicsImpostor): number;
        getBoxSizeToRef(impostor: PhysicsImpostor, result: math.vector3): void;
        dispose(): void;
        private _extendNamespace;
    }
}
declare namespace gd3d.framework {
    class OimoJSPlugin implements IPhysicsEnginePlugin {
        world: any;
        name: string;
        private _physicsMaterials;
        private _fixedTimeStep;
        BJSOIMO: any;
        constructor(iterations?: number, oimoInjection?: any);
        setGravity(gravity: math.vector3): void;
        setTimeStep(timeStep: number): void;
        getTimeStep(): number;
        private _tmpImpostorsArray;
        executeStep(delta: number, impostors: Array<PhysicsImpostor>): void;
        applyImpulse(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        applyForce(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        private checkWithEpsilon;
        generatePhysicsBody(impostor: PhysicsImpostor): void;
        private _tmpPositionVector;
        removePhysicsBody(impostor: PhysicsImpostor): void;
        generateJoint(impostorJoint: PhysicsImpostorJoint): void;
        removeJoint(impostorJoint: PhysicsImpostorJoint): void;
        setTransformationFromPhysicsBody(impostor: PhysicsImpostor): void;
        setPhysicsBodyTransformation(impostor: PhysicsImpostor, newPosition: math.vector3, newRotation: math.quaternion): void;
        isSupported(): boolean;
        setLinearVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        setAngularVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        getLinearVelocity(impostor: PhysicsImpostor): math.vector3;
        getAngularVelocity(impostor: PhysicsImpostor): math.vector3;
        setBodyMass(impostor: PhysicsImpostor, mass: number): void;
        getBodyMass(impostor: PhysicsImpostor): number;
        getBodyFriction(impostor: PhysicsImpostor): number;
        setBodyFriction(impostor: PhysicsImpostor, friction: number): void;
        getBodyRestitution(impostor: PhysicsImpostor): number;
        setBodyRestitution(impostor: PhysicsImpostor, restitution: number): void;
        sleepBody(impostor: PhysicsImpostor): void;
        isSleeping(impostor: PhysicsImpostor): any;
        wakeUpBody(impostor: PhysicsImpostor): void;
        updateDistanceJoint(joint: PhysicsJoint, maxDistance: number, minDistance?: number): void;
        setMotor(joint: IMotorEnabledJoint, speed?: number, force?: number, motorIndex?: number): void;
        setLimit(joint: IMotorEnabledJoint, upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
        getRadius(impostor: PhysicsImpostor): number;
        getBoxSizeToRef(impostor: PhysicsImpostor, result: math.vector3): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    interface PhysicsImpostorJoint {
        mainImpostor: PhysicsImpostor;
        connectedImpostor: PhysicsImpostor;
        joint: PhysicsJoint;
    }
    class PhysicsEngine {
        private _physicsPlugin;
        gravity: math.vector3;
        constructor(gravity?: math.vector3, _physicsPlugin?: IPhysicsEnginePlugin);
        setGravity(gravity: math.vector3): void;
        setTimeStep(newTimeStep?: number): void;
        getTimeStep(): number;
        dispose(): void;
        getPhysicsPluginName(): string;
        static Epsilon: number;
        private _impostors;
        private _joints;
        addImpostor(impostor: PhysicsImpostor): void;
        removeImpostor(impostor: PhysicsImpostor): void;
        addJoint(mainImpostor: PhysicsImpostor, connectedImpostor: PhysicsImpostor, joint: PhysicsJoint): void;
        removeJoint(mainImpostor: PhysicsImpostor, connectedImpostor: PhysicsImpostor, joint: PhysicsJoint): void;
        _step(delta: number): void;
        getPhysicsPlugin(): IPhysicsEnginePlugin;
        getImpostors(): Array<PhysicsImpostor>;
        getImpostorForPhysicsObject(object: transform): PhysicsImpostor;
        getImpostorWithPhysicsBody(body: any): PhysicsImpostor;
    }
    interface IPhysicsEnginePlugin {
        world: any;
        name: string;
        setGravity(gravity: math.vector3): void;
        setTimeStep(timeStep: number): void;
        getTimeStep(): number;
        executeStep(delta: number, impostors: Array<PhysicsImpostor>): void;
        applyImpulse(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        applyForce(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3): void;
        generatePhysicsBody(impostor: PhysicsImpostor): void;
        removePhysicsBody(impostor: PhysicsImpostor): void;
        generateJoint(joint: PhysicsImpostorJoint): void;
        removeJoint(joint: PhysicsImpostorJoint): void;
        isSupported(): boolean;
        setTransformationFromPhysicsBody(impostor: PhysicsImpostor): void;
        setPhysicsBodyTransformation(impostor: PhysicsImpostor, newPosition: math.vector3, newRotation: math.quaternion): void;
        setLinearVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        setAngularVelocity(impostor: PhysicsImpostor, velocity: math.vector3): void;
        getLinearVelocity(impostor: PhysicsImpostor): math.vector3;
        getAngularVelocity(impostor: PhysicsImpostor): math.vector3;
        setBodyMass(impostor: PhysicsImpostor, mass: number): void;
        getBodyMass(impostor: PhysicsImpostor): number;
        getBodyFriction(impostor: PhysicsImpostor): number;
        setBodyFriction(impostor: PhysicsImpostor, friction: number): void;
        getBodyRestitution(impostor: PhysicsImpostor): number;
        setBodyRestitution(impostor: PhysicsImpostor, restitution: number): void;
        sleepBody(impostor: PhysicsImpostor): void;
        isSleeping(impostor: PhysicsImpostor): boolean;
        wakeUpBody(impostor: PhysicsImpostor): void;
        updateDistanceJoint(joint: PhysicsJoint, maxDistance: number, minDistance?: number): void;
        setMotor(joint: IMotorEnabledJoint, speed: number, maxForce?: number, motorIndex?: number): void;
        setLimit(joint: IMotorEnabledJoint, upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
        getRadius(impostor: PhysicsImpostor): number;
        getBoxSizeToRef(impostor: PhysicsImpostor, result: math.vector3): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    interface PhysicsImpostorParameters {
        mass: number;
        friction?: number;
        restitution?: number;
        nativeOptions?: any;
        ignoreParent?: boolean;
        disableBidirectionalTransformation?: boolean;
        kinematic?: boolean;
        heightFieldMatrix?: number[][];
        heightFieldOptions?: {
            minValue?: number;
            maxValue?: number;
            elementSize?: number;
        };
    }
    interface IPhysicsEnabledObject {
        position: math.vector3;
        rotationQuaternion: math.quaternion;
        scaling: math.vector3;
        rotation?: math.vector3;
        parent?: any;
        getWorldMatrix?(): math.matrix;
        getAbsolutePosition(): math.vector3;
        getAbsolutePivotPoint(): math.vector3;
    }
    class PhysicsImpostor {
        object: transform;
        type: ImpostorType;
        _options: PhysicsImpostorParameters;
        static DEFAULT_OBJECT_SIZE: math.vector3;
        static IDENTITY_QUATERNION: math.quaternion;
        private _physicsEngine;
        private _physicsBody;
        private _bodyUpdateRequired;
        private _onBeforePhysicsStepCallbacks;
        private _onAfterPhysicsStepCallbacks;
        private _onPhysicsCollideCallbacks;
        private _deltaPosition;
        private _deltaRotation;
        private _deltaRotationConjugated;
        private _parent;
        private _isDisposed;
        private static _tmpVecs;
        private static _tmpQuat;
        readonly isDisposed: boolean;
        mass: number;
        friction: number;
        restitution: number;
        uniqueId: number;
        private _joints;
        constructor(object: transform, type: ImpostorType, _options?: PhysicsImpostorParameters);
        _init(): void;
        private _getPhysicsParent;
        isBodyInitRequired(): boolean;
        setScalingUpdated(updated: boolean): void;
        forceUpdate(): void;
        physicsBody: any;
        parent: PhysicsImpostor;
        resetUpdateFlags(): void;
        private _obb;
        private getObb;
        private _cacheSizeWorld;
        getObjectExtendSize(): math.vector3;
        getObjectCenter(): math.vector3;
        getParam(paramName: string): any;
        setParam(paramName: string, value: number): void;
        setMass(mass: number): void;
        getLinearVelocity(): math.vector3;
        setLinearVelocity(velocity: math.vector3): void;
        getAngularVelocity(): math.vector3;
        setAngularVelocity(velocity: math.vector3): void;
        executeNativeFunction(func: (world: any, physicsBody: any) => void): void;
        registerBeforePhysicsStep(func: (impostor: PhysicsImpostor) => void): void;
        unregisterBeforePhysicsStep(func: (impostor: PhysicsImpostor) => void): void;
        registerAfterPhysicsStep(func: (impostor: PhysicsImpostor) => void): void;
        unregisterAfterPhysicsStep(func: (impostor: PhysicsImpostor) => void): void;
        registerOnPhysicsCollide(collideAgainst: PhysicsImpostor | Array<PhysicsImpostor>, func: (collider: PhysicsImpostor, collidedAgainst: PhysicsImpostor) => void): void;
        unregisterOnPhysicsCollide(collideAgainst: PhysicsImpostor | Array<PhysicsImpostor>, func: (collider: PhysicsImpostor, collidedAgainst: PhysicsImpostor | Array<PhysicsImpostor>) => void): void;
        private lastObjwPos;
        private lastObjwRot;
        beforeStep: () => void;
        private _freezeMask;
        setFreeze(option: FreezeType, beSelect: boolean): void;
        getFreeze(option: FreezeType): number;
        private lastbodywPos;
        private lastbodywRot;
        private lastEuler;
        private lastRotMask;
        afterStep: () => void;
        onCollideEvent: (collider: PhysicsImpostor, collidedWith: PhysicsImpostor) => void;
        onCollide: (e: {
            body: any;
        }) => void;
        applyForce(force: math.vector3, contactPoint: math.vector3): PhysicsImpostor;
        applyImpulse(force: math.vector3, contactPoint: math.vector3): PhysicsImpostor;
        createJoint(otherImpostor: PhysicsImpostor, jointType: number, jointData: PhysicsJointData): PhysicsImpostor;
        addJoint(otherImpostor: PhysicsImpostor, joint: PhysicsJoint): PhysicsImpostor;
        sleep(): PhysicsImpostor;
        readonly isSleeping: boolean;
        wakeUp(): PhysicsImpostor;
        clone(newObject: transform): PhysicsImpostor;
        dispose(): void;
        setDeltaPosition(position: math.vector3): void;
        setDeltaRotation(rotation: math.quaternion): void;
        getBoxSizeToRef(result: math.vector3): PhysicsImpostor;
        getRadius(): number;
        kinematicSetPosition(position: math.vector3): void;
        kinematicSetRotation(rotation: math.quaternion): void;
    }
    enum ImpostorType {
        NoImpostor = 0,
        SphereImpostor = 1,
        BoxImpostor = 2,
        PlaneImpostor = 3,
        MeshImpostor = 4,
        CylinderImpostor = 7,
        ParticleImpostor = 8,
        HeightmapImpostor = 9,
        ConvexHullImpostor = 10,
        RopeImpostor = 101,
        ClothImpostor = 102,
        SoftbodyImpostor = 103
    }
    enum FreezeType {
        Position_x = 1,
        Position_y = 2,
        Position_z = 4,
        Rotation_x = 8,
        Rotation_y = 16,
        Rotation_z = 32
    }
}
declare namespace gd3d.framework {
    interface PhysicsJointData {
        mainPivot?: math.vector3;
        connectedPivot?: math.vector3;
        mainAxis?: math.vector3;
        connectedAxis?: math.vector3;
        collision?: boolean;
        nativeParams?: any;
    }
    class PhysicsJoint {
        type: number;
        jointData: PhysicsJointData;
        private _physicsJoint;
        protected _physicsPlugin: IPhysicsEnginePlugin;
        constructor(type: number, jointData: PhysicsJointData);
        physicsJoint: any;
        physicsPlugin: IPhysicsEnginePlugin;
        executeNativeFunction(func: (world: any, physicsJoint: any) => void): void;
        static DistanceJoint: number;
        static HingeJoint: number;
        static BallAndSocketJoint: number;
        static WheelJoint: number;
        static SliderJoint: number;
        static PrismaticJoint: number;
        static UniversalJoint: number;
        static Hinge2Joint: number;
        static PointToPointJoint: number;
        static SpringJoint: number;
        static LockJoint: number;
    }
    class DistanceJoint extends PhysicsJoint {
        constructor(jointData: DistanceJointData);
        updateDistance(maxDistance: number, minDistance?: number): void;
    }
    class MotorEnabledJoint extends PhysicsJoint implements IMotorEnabledJoint {
        constructor(type: number, jointData: PhysicsJointData);
        setMotor(force?: number, maxForce?: number): void;
        setLimit(upperLimit: number, lowerLimit?: number): void;
    }
    class HingeJoint extends MotorEnabledJoint {
        constructor(jointData: PhysicsJointData);
        setMotor(force?: number, maxForce?: number): void;
        setLimit(upperLimit: number, lowerLimit?: number): void;
    }
    class Hinge2Joint extends MotorEnabledJoint {
        constructor(jointData: PhysicsJointData);
        setMotor(force?: number, maxForce?: number, motorIndex?: number): void;
        setLimit(upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
    }
    interface IMotorEnabledJoint {
        physicsJoint: any;
        setMotor(force?: number, maxForce?: number, motorIndex?: number): void;
        setLimit(upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
    }
    interface DistanceJointData extends PhysicsJointData {
        maxDistance: number;
    }
    interface SpringJointData extends PhysicsJointData {
        length: number;
        stiffness: number;
        damping: number;
    }
}
declare namespace gd3d.framework {
    class physicTool {
        static Ivec3Equal(a: any, b: any): boolean;
        static IQuatEqual(a: any, b: any): boolean;
        static Ivec3Copy(from: {
            x: any;
            y: any;
            z: any;
        }, to: {
            x: any;
            y: any;
            z: any;
        }): void;
        static IQuatCopy(from: {
            x: any;
            y: any;
            z: any;
            w: any;
        }, to: {
            x: any;
            y: any;
            z: any;
            w: any;
        }): void;
        static vec3AsArray(vec3: math.vector3): any[];
    }
}
declare namespace gd3d.framework {
    enum HideFlags {
        None = 0,
        HideInHierarchy = 1,
        HideInInspector = 2,
        DontSaveInEditor = 4,
        NotEditable = 8,
        DontSaveInBuild = 16,
        DontUnloadUnusedAsset = 32,
        DontSave = 52,
        HideAndDontSave = 61
    }
    interface INodeComponent {
        onPlay(): any;
        start(): any;
        update(delta: number): any;
        gameObject: gameObject;
        remove(): any;
        clone(): any;
    }
    class nodeComponent {
        static readonly ClassName: string;
        comp: INodeComponent;
        init: boolean;
        constructor(comp: INodeComponent, init?: boolean);
    }
    class gameObject {
        static readonly ClassName: string;
        getScene(): scene;
        layer: number;
        tag: string;
        hideFlags: HideFlags;
        isStatic: boolean;
        transform: transform;
        components: nodeComponent[];
        private componentsInit;
        private componentsPlayed;
        renderer: IRenderer;
        camera: camera;
        light: light;
        collider: ICollider;
        private _visible;
        readonly visibleInScene: boolean;
        visible: boolean;
        getName(): string;
        init(bePlay?: boolean): void;
        update(delta: number): void;
        addComponentDirect(comp: INodeComponent): INodeComponent;
        getComponent(type: string): INodeComponent;
        getComponents(): INodeComponent[];
        getComponentsInChildren(type: string): INodeComponent[];
        private _getComponentsInChildren;
        getComponentInParent(type: string): INodeComponent;
        addComponent(type: string): INodeComponent;
        removeComponent(comp: INodeComponent): void;
        private remove;
        removeComponentByTypeName(type: string): void;
        removeAllComponents(): void;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class renderContext {
        constructor(webgl: WebGLRenderingContext);
        drawtype: string;
        webgl: WebGLRenderingContext;
        viewPortPixel: gd3d.math.rect;
        eyePos: gd3d.math.vector4;
        matrixView: gd3d.math.matrix;
        matrixProject: gd3d.math.matrix;
        matrixModel: gd3d.math.matrix;
        private _matrixWorld2Object;
        readonly matrixWorld2Object: math.matrix;
        matrixModelViewProject: gd3d.math.matrix;
        matrixModelView: gd3d.math.matrix;
        matrixViewProject: gd3d.math.matrix;
        floatTimer: number;
        intLightCount: number;
        vec4LightPos: Float32Array;
        vec4LightDir: Float32Array;
        vec4LightColor: Float32Array;
        floatLightRange: Float32Array;
        floatLightIntensity: Float32Array;
        floatLightSpotAngleCos: Float32Array;
        private _intLightCount;
        private _lightCullingMask;
        private _vec4LightPos;
        private _vec4LightDir;
        private _vec4LightColor;
        private _floatLightRange;
        private _floatLightIntensity;
        private _floatLightSpotAngleCos;
        lightmap: gd3d.framework.texture;
        lightmapUV: number;
        lightmapOffset: gd3d.math.vector4;
        fog: Fog;
        vec4_bones: Float32Array;
        matrix_bones: Float32Array;
        updateCamera(app: application, camera: camera): void;
        updateLights(lights: light[]): void;
        updateOverlay(): void;
        updateModel(model: transform): void;
        updateModeTrail(): void;
        updateLightMask(layer: number): void;
    }
    enum RenderLayerEnum {
        Common = 0,
        Transparent = 1,
        Overlay = 2
    }
    interface IRenderer extends INodeComponent {
        layer: RenderLayerEnum;
        renderLayer: number;
        queue: number;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera): any;
    }
    class renderList {
        constructor();
        clear(): void;
        addRenderer(renderer: IRenderer): void;
        renderLayers: renderLayer[];
    }
    class renderLayer {
        needSort: boolean;
        list: IRenderer[];
        constructor(_sort?: boolean);
    }
}
declare namespace gd3d.framework {
    let physic: PhysicsEngine;
    let physic2D: physicEngine2D;
    class scene {
        app: application;
        webgl: WebGLRenderingContext;
        constructor(app: application);
        name: string;
        private rootNode;
        renderList: renderList;
        private assetmgr;
        private _overlay2d;
        addScreenSpaceOverlay(overlay: overlay2D): void;
        removeScreenSpaceOverlay(overlay: any): void;
        renderCameras: camera[];
        private _mainCamera;
        mainCamera: camera;
        renderContext: renderContext[];
        private renderLights;
        lightmaps: texture[];
        fog: Fog;
        onLateUpdate: (delta: number) => any;
        update(delta: number): void;
        private updateSceneOverLay;
        private RealCameraNumber;
        private _renderCamera;
        private sortOverLays;
        private updateScene;
        private objupdateInEditor;
        private objupdate;
        private collectCameraAndLight;
        addChild(node: transform): void;
        removeChild(node: transform): void;
        getChildren(): transform[];
        getChildCount(): number;
        getChild(index: number): transform;
        getChildByName(name: string): transform;
        getRoot(): transform;
        pickAll(ray: ray, outInfos: pickinfo[], isPickMesh?: boolean, root?: transform, layermask?: number): boolean;
        pick(ray: ray, outInfo: pickinfo, isPickMesh?: boolean, root?: transform, layermask?: number): boolean;
        private doPick;
        private pickMesh;
        private pickCollider;
        enablePhysics(gravity: math.vector3, plugin?: IPhysicsEnginePlugin): boolean;
        enable2DPhysics(): void;
    }
}
declare namespace gd3d.framework {
    class uniformSetter {
        static autoUniformDic: {
            [name: string]: (context: renderContext) => any;
        };
        static initAutouniform(): void;
    }
}
declare namespace gd3d.framework {
    class taskstate {
        finish: boolean;
        error: boolean;
        message: string;
        cancel: boolean;
        taskCall: (taskstate: any, state: taskstate) => void;
        taskInterface: ITask;
    }
    interface ITask {
        move(delta: number, laststate: taskstate, state: taskstate): any;
    }
    class taskMgr {
        tasks: taskstate[];
        addTaskCall(task: (laststate: taskstate, state: taskstate) => void): void;
        addTask(task: ITask): void;
        laststate: taskstate;
        move(delta: number): void;
        cancel(): void;
    }
}
declare namespace gd3d.threading {
    class gdPromise<T> {
        private execQueue;
        private catchMethod;
        constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void);
        resolve(value?: T): void;
        reject(reason?: any): void;
        then(thenCall: (value?: T) => void): gdPromise<T>;
        catch(callbcack: (val: any) => void): gdPromise<T>;
    }
}
declare namespace gd3d.threading {
    class thread {
        static workerInstance: Worker;
        private static instance;
        static readonly Instance: thread;
        private worker;
        private callID;
        private callMap;
        constructor();
        OnMessage(e: MessageEvent): void;
        Call(name: string, data: any, callback: (result: any) => void): void;
    }
}
declare namespace gd3d.framework {
    class aabb {
        minimum: gd3d.math.vector3;
        maximum: gd3d.math.vector3;
        private srcmin;
        private srcmax;
        private opmin;
        private opmax;
        private _center;
        constructor(_minimum: gd3d.math.vector3, _maximum: gd3d.math.vector3);
        update(worldmatrix: gd3d.math.matrix): void;
        addVector3(vec: gd3d.math.vector3): void;
        containsVector3(vec: gd3d.math.vector3): boolean;
        intersectAABB(aabb: aabb): boolean;
        addAABB(aabb: gd3d.framework.aabb): void;
        readonly center: gd3d.math.vector3;
        clear(): void;
        clone(): aabb;
        cloneTo(to: aabb): void;
        getVec3(vecs: gd3d.math.vector3[]): void;
    }
}
declare namespace gd3d.framework {
    class collision {
        static obbVsObb(a: obb, b: obb): boolean;
        static sphereVsSphere(a: spherestruct, b: spherestruct): boolean;
        static obbVsSphere(a: obb, b: spherestruct): boolean;
        private static obb_SphereOverLap;
        private static obbOverLap;
        private static extentsOverlap;
    }
}
declare namespace gd3d.framework {
    class obb {
        private _directions;
        private _halfSizeWorld;
        private _vectorsWorld;
        private _worldCenter;
        private _worldMatrix;
        center: math.vector3;
        halfsize: math.vector3;
        vectors: math.vector3[];
        private static tag_wCenter;
        private static tag_wVectors;
        private static tag_wHalfSize;
        private static tag_directions;
        private static tags;
        private dirtyMap;
        readonly vectorsWorld: math.vector3[];
        readonly worldCenter: math.vector3;
        readonly halfSizeWorld: math.vector3;
        readonly directions: math.vector3[];
        getWorldMatrix(): math.matrix;
        buildByMaxMin(minimum: math.vector3, maximum: math.vector3): void;
        buildByCenterSize(center: math.vector3, size: math.vector3): void;
        update(worldmatrix: math.matrix): void;
        intersects(bound: any): boolean;
        computeExtentsByAxis(axis: math.vector3, out: math.vector2): void;
        clone(): obb;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class obb2d {
        private rotate;
        private scale;
        private center;
        offset: gd3d.math.vector2;
        private halfWidth;
        private halfHeight;
        private directions;
        private _size;
        size: gd3d.math.vector2;
        buildByCenterSize(center: gd3d.math.vector2, width: number, height: number): void;
        update(canvasWorldMtx: gd3d.math.matrix3x2): void;
        intersects(_obb: obb2d): boolean;
        private computeBoxExtents;
        private axisOverlap;
        private extentsOverlap;
        clone(): obb2d;
        dispose(): void;
    }
}
declare namespace gd3d.framework {
    class pickinfo {
        normal: math.vector3;
        pickedtran: transform;
        distance: number;
        hitposition: math.vector3;
        bu: number;
        bv: number;
        faceId: number;
        subMeshId: number;
        constructor(_bu?: number, _bv?: number, _distance?: number);
        init(): void;
        cloneFrom(from: pickinfo): void;
    }
}
declare namespace gd3d.framework {
    class quadTree {
        private rootNode;
        private readonly MAX_OBJECTS;
        private readonly MAX_LEVELS;
        constructor(bounds: math.rect, maxObjNum?: number, maxLevel?: number);
        insert(rect: math.rect): void;
        private cacheArr;
        retrieve(bounds: math.rect, outRects: math.rect[]): void;
        clear(): void;
    }
}
declare namespace gd3d.framework {
    class ray {
        origin: math.vector3;
        direction: math.vector3;
        constructor(_origin: gd3d.math.vector3, _dir: gd3d.math.vector3);
        set(_origin: gd3d.math.vector3, _dir: gd3d.math.vector3): void;
        intersectAABB(_aabb: aabb): boolean;
        intersectPlaneTransform(tran: transform, outInfo: pickinfo): boolean;
        intersectPlane(planePoint: gd3d.math.vector3, planeNormal: gd3d.math.vector3, outHitPoint: gd3d.math.vector3): boolean;
        private static tempMData;
        private static tempVecs;
        intersectCollider(tran: transform, outInfo: pickinfo): boolean;
        intersectBoxMinMax(minimum: gd3d.math.vector3, maximum: gd3d.math.vector3): boolean;
        intersectsSphere(center: gd3d.math.vector3, radius: number): boolean;
        intersectsTriangle(vertex0: gd3d.math.vector3, vertex1: gd3d.math.vector3, vertex2: gd3d.math.vector3, outInfo: pickinfo): boolean;
    }
}
declare namespace gd3d.framework {
    class tweenUtil {
        static GetEaseProgress(ease_type: tweenMethod, linear_progress: number): number;
        static Linear(t: number, b: number, c: number, d: number): number;
        static ExpoEaseOut(t: number, b: number, c: number, d: number): number;
        static ExpoEaseIn(t: number, b: number, c: number, d: number): number;
        static ExpoEaseInOut(t: number, b: number, c: number, d: number): number;
        static ExpoEaseOutIn(t: number, b: number, c: number, d: number): number;
        static CircEaseOut(t: number, b: number, c: number, d: number): number;
        static CircEaseIn(t: number, b: number, c: number, d: number): number;
        static CircEaseInOut(t: number, b: number, c: number, d: number): number;
        static CircEaseOutIn(t: number, b: number, c: number, d: number): number;
        static QuadEaseOut(t: number, b: number, c: number, d: number): number;
        static QuadEaseIn(t: number, b: number, c: number, d: number): number;
        static QuadEaseInOut(t: number, b: number, c: number, d: number): number;
        static QuadEaseOutIn(t: number, b: number, c: number, d: number): number;
        static SineEaseOut(t: number, b: number, c: number, d: number): number;
        static SineEaseIn(t: number, b: number, c: number, d: number): number;
        static SineEaseInOut(t: number, b: number, c: number, d: number): number;
        static SineEaseOutIn(t: number, b: number, c: number, d: number): number;
        static CubicEaseOut(t: number, b: number, c: number, d: number): number;
        static CubicEaseIn(t: number, b: number, c: number, d: number): number;
        static CubicEaseInOut(t: number, b: number, c: number, d: number): number;
        static CubicEaseOutIn(t: number, b: number, c: number, d: number): number;
        static QuartEaseOut(t: number, b: number, c: number, d: number): number;
        static QuartEaseIn(t: number, b: number, c: number, d: number): number;
        static QuartEaseInOut(t: number, b: number, c: number, d: number): number;
        static QuartEaseOutIn(t: number, b: number, c: number, d: number): number;
        static QuintEaseOut(t: number, b: number, c: number, d: number): number;
        static QuintEaseIn(t: number, b: number, c: number, d: number): number;
        static QuintEaseInOut(t: number, b: number, c: number, d: number): number;
        static QuintEaseOutIn(t: number, b: number, c: number, d: number): number;
        static ElasticEaseOut(t: number, b: number, c: number, d: number): number;
        static ElasticEaseIn(t: number, b: number, c: number, d: number): number;
        static ElasticEaseInOut(t: number, b: number, c: number, d: number): number;
        static ElasticEaseOutIn(t: number, b: number, c: number, d: number): number;
        static BounceEaseOut(t: number, b: number, c: number, d: number): number;
        static BounceEaseIn(t: number, b: number, c: number, d: number): number;
        static BounceEaseInOut(t: number, b: number, c: number, d: number): number;
        static BounceEaseOutIn(t: number, b: number, c: number, d: number): number;
        static BackEaseOut(t: number, b: number, c: number, d: number): number;
        static BackEaseIn(t: number, b: number, c: number, d: number): number;
        static BackEaseInOut(t: number, b: number, c: number, d: number): number;
        static BackEaseOutIn(t: number, b: number, c: number, d: number): number;
    }
    enum tweenMethod {
        Linear = 0,
        ExpoEaseOut = 1,
        ExpoEaseIn = 2,
        ExpoEaseInOut = 3,
        ExpoEaseOutIn = 4,
        CircEaseOut = 5,
        CircEaseIn = 6,
        CircEaseInOut = 7,
        CircEaseOutIn = 8,
        QuadEaseOut = 9,
        QuadEaseIn = 10,
        QuadEaseInOut = 11,
        QuadEaseOutIn = 12,
        SineEaseOut = 13,
        SineEaseIn = 14,
        SineEaseInOut = 15,
        SineEaseOutIn = 16,
        CubicEaseOut = 17,
        CubicEaseIn = 18,
        CubicEaseInOut = 19,
        CubicEaseOutIn = 20,
        QuartEaseOut = 21,
        QuartEaseIn = 22,
        QuartEaseInOut = 23,
        QuartEaseOutIn = 24,
        QuintEaseOut = 25,
        QuintEaseIn = 26,
        QuintEaseInOut = 27,
        QuintEaseOutIn = 28,
        ElasticEaseOut = 29,
        ElasticEaseIn = 30,
        ElasticEaseInOut = 31,
        ElasticEaseOutIn = 32,
        BounceEaseOut = 33,
        BounceEaseIn = 34,
        BounceEaseInOut = 35,
        BounceEaseOutIn = 36,
        BackEaseOut = 37,
        BackEaseIn = 38,
        BackEaseInOut = 39,
        BackEaseOutIn = 40
    }
}
declare namespace gd3d.framework {
    enum CullingMask {
        nothing = 0,
        default = 1,
        transparentFx = 2,
        IgnoreRaycast = 4,
        editor = 8,
        water = 16,
        ui = 32,
        preview = 64,
        builtin_0 = 1,
        builtin_1 = 2,
        builtin_2 = 4,
        builtin_3 = 8,
        builtin_4 = 16,
        builtin_5 = 32,
        builtin_6 = 64,
        builtin_7 = 128,
        modelbeforeui = 256,
        user_8 = 256,
        user_9 = 512,
        user_10 = 1024,
        user_11 = 2048,
        user_12 = 4096,
        user_13 = 8192,
        user_14 = 16384,
        user_15 = 32768,
        user_16 = 65536,
        user_17 = 131072,
        user_18 = 262144,
        user_19 = 524288,
        user_20 = 1048576,
        user_21 = 2097152,
        user_22 = 4194304,
        user_23 = 8388608,
        user_24 = 16777216,
        user_25 = 33554432,
        user_26 = 67108864,
        user_27 = 134217728,
        user_28 = 268435456,
        user_29 = 536870912,
        user_30 = 1073741824,
        user_31 = 2147483648,
        everything = 4294967295
    }
    class cullingmaskutil {
        static maskTolayer(mask: number): number;
        static layerToMask(layer: number): number;
    }
}
declare namespace gd3d.framework {
    class EnumUtil {
        static getEnumObjByType(enumType: string): any;
    }
}
declare namespace gd3d.framework {
    class NumberUtil {
        static KEY_A: number;
        static KEY_D: number;
        static KEY_E: number;
        static KEY_Q: number;
        static KEY_R: number;
        static KEY_S: number;
        static KEY_W: number;
        static KEY_a: number;
        static KEY_d: number;
        static KEY_e: number;
        static KEY_q: number;
        static KEY_r: number;
        static KEY_s: number;
        static KEY_w: number;
    }
}
declare namespace gd3d.framework {
    class RegexpUtil {
        static textureRegexp: RegExp;
        static vectorRegexp: RegExp;
        static floatRegexp: RegExp;
        static rangeRegexp: RegExp;
        static vector4Regexp: RegExp;
        static vector3FloatOrRangeRegexp: RegExp;
    }
}
declare namespace gd3d.framework {
    class StringUtil {
        static builtinTag_Untagged: string;
        static builtinTag_Player: string;
        static builtinTag_EditorOnly: string;
        static builtinTag_MainCamera: string;
        static COMPONENT_CAMERA: string;
        static COMPONENT_BOXCOLLIDER: string;
        static COMPONENT_LIGHT: string;
        static COMPONENT_MESHFILTER: string;
        static COMPONENT_MESHRENDER: string;
        static COMPONENT_EFFECTSYSTEM: string;
        static COMPONENT_LABEL: string;
        static COMPONENT_uirect: string;
        static COMPONENT_IMAGE: string;
        static COMPONENT_RAWIMAGE: string;
        static COMPONENT_BUTTON: string;
        static COMPONENT_SKINMESHRENDER: string;
        static COMPONENT_AUDIOPLAYER: string;
        static COMPONENT_CAMERACONTROLLER: string;
        static COMPONENT_CANVASRENDER: string;
        static UIStyle_RangeFloat: string;
        static UIStyle_Enum: string;
        static RESOURCES_MESH_CUBE: string;
        static replaceAll(srcStr: string, fromStr: string, toStr: string): string;
        static trimAll(str: string): string;
        static firstCharToLowerCase(str: string): string;
        static isNullOrEmptyObject(obj: any): boolean;
    }
}
declare namespace gd3d.framework {
    class textureutil {
        static loadUtil(path: string): void;
    }
}
declare namespace gd3d.framework {
    enum PrimitiveType {
        Sphere = 0,
        Capsule = 1,
        Cylinder = 2,
        Cube = 3,
        Plane = 4,
        Quad = 5,
        Pyramid = 6
    }
    enum Primitive2DType {
        RawImage2D = 0,
        Image2D = 1,
        Label = 2,
        Button = 3
    }
    class TransformUtil {
        static CreatePrimitive(type: PrimitiveType, app: application): transform;
        static Create2DPrimitive(type: Primitive2DType, app: application): transform2D;
        private static create2D_rawImage;
        private static create2D_image2D;
        private static create2D_label;
        private static create2D_button;
    }
}
declare namespace gd3d.framework {
    class WebGLDebugUtils {
        private log;
        static readonly glValidEnumContexts: {
            'enable': {
                0: boolean;
            };
            'disable': {
                0: boolean;
            };
            'getParameter': {
                0: boolean;
            };
            'drawArrays': {
                0: boolean;
            };
            'drawElements': {
                0: boolean;
                2: boolean;
            };
            'createShader': {
                0: boolean;
            };
            'getShaderParameter': {
                1: boolean;
            };
            'getProgramParameter': {
                1: boolean;
            };
            'getVertexAttrib': {
                1: boolean;
            };
            'vertexAttribPointer': {
                2: boolean;
            };
            'bindTexture': {
                0: boolean;
            };
            'activeTexture': {
                0: boolean;
            };
            'getTexParameter': {
                0: boolean;
                1: boolean;
            };
            'texParameterf': {
                0: boolean;
                1: boolean;
            };
            'texParameteri': {
                0: boolean;
                1: boolean;
                2: boolean;
            };
            'texImage2D': {
                0: boolean;
                2: boolean;
                6: boolean;
                7: boolean;
            };
            'texSubImage2D': {
                0: boolean;
                6: boolean;
                7: boolean;
            };
            'copyTexImage2D': {
                0: boolean;
                2: boolean;
            };
            'copyTexSubImage2D': {
                0: boolean;
            };
            'generateMipmap': {
                0: boolean;
            };
            'bindBuffer': {
                0: boolean;
            };
            'bufferData': {
                0: boolean;
                2: boolean;
            };
            'bufferSubData': {
                0: boolean;
            };
            'getBufferParameter': {
                0: boolean;
                1: boolean;
            };
            'pixelStorei': {
                0: boolean;
                1: boolean;
            };
            'readPixels': {
                4: boolean;
                5: boolean;
            };
            'bindRenderbuffer': {
                0: boolean;
            };
            'bindFramebuffer': {
                0: boolean;
            };
            'checkFramebufferStatus': {
                0: boolean;
            };
            'framebufferRenderbuffer': {
                0: boolean;
                1: boolean;
                2: boolean;
            };
            'framebufferTexture2D': {
                0: boolean;
                1: boolean;
                2: boolean;
            };
            'getFramebufferAttachmentParameter': {
                0: boolean;
                1: boolean;
                2: boolean;
            };
            'getRenderbufferParameter': {
                0: boolean;
                1: boolean;
            };
            'renderbufferStorage': {
                0: boolean;
                1: boolean;
            };
            'clear': {
                0: boolean;
            };
            'depthFunc': {
                0: boolean;
            };
            'blendFunc': {
                0: boolean;
                1: boolean;
            };
            'blendFuncSeparate': {
                0: boolean;
                1: boolean;
                2: boolean;
                3: boolean;
            };
            'blendEquation': {
                0: boolean;
            };
            'blendEquationSeparate': {
                0: boolean;
                1: boolean;
            };
            'stencilFunc': {
                0: boolean;
            };
            'stencilFuncSeparate': {
                0: boolean;
                1: boolean;
            };
            'stencilMaskSeparate': {
                0: boolean;
            };
            'stencilOp': {
                0: boolean;
                1: boolean;
                2: boolean;
            };
            'stencilOpSeparate': {
                0: boolean;
                1: boolean;
                2: boolean;
                3: boolean;
            };
            'cullFace': {
                0: boolean;
            };
            'frontFace': {
                0: boolean;
            };
        };
        private glEnums;
        private init;
        private checkInit;
        private mightBeEnum;
        private glEnumToString;
        private glFunctionArgToString;
        makeDebugContext(ctx: WebGLRenderingContext, opt_onErrorFunc?: (err: any, funcName: any, args: any) => void): WebGLRenderingContext;
        private resetToInitialState;
        private makeLostContextSimulatingContext;
    }
}
declare namespace gd3d.framework {
    class WebGLUtils {
        private makeFailHTML;
        private GET_A_WEBGL_BROWSER;
        private OTHER_PROBLEM;
        setupWebGL(canvas: Element, opt_attribs?: WebGLContextAttributes, opt_onError?: (msg: string) => void): any;
        create3DContext(canvas: any, opt_attribs: any): any;
        constructor();
    }
}
declare namespace gd3d.io {
    function xhrLoad(url: string, fun: (ContentData: any, _err: Error, isloadFail?: boolean) => void, onprocess: (curLength: number, totalLength: number) => void, responseType: XMLHttpRequestResponseType, loadedFun: (req: XMLHttpRequest) => void): void;
    function loadText(url: string, fun: (_txt: string, _err: Error, isloadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
    function loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error, isloadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
    function loadBlob(url: string, fun: (_blob: Blob, _err: Error, isloadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
    function loadImg(url: string, fun: (_tex: HTMLImageElement, _err: Error, loadFail?: boolean) => void, onprocess?: (curLength: number, totalLength: number) => void): void;
}
declare namespace gd3d.math {
    class pool {
        static collect_all(): void;
        private static _vector4_one;
        static readonly vector4_one: vector4;
        private static unused_vector4;
        static new_vector4(x?: number, y?: number, z?: number, w?: number): vector4;
        static clone_vector4(src: vector4): vector4;
        static delete_vector4(v: vector4): void;
        static collect_vector4(): void;
        private static _color_one;
        static readonly color_one: color;
        private static unused_color;
        static new_color(r?: number, g?: number, b?: number, a?: number): color;
        static delete_color(v: color): void;
        static collect_color(): void;
        private static _vector3_up;
        static readonly vector3_up: vector3;
        private static _vector3_right;
        static readonly vector3_right: vector3;
        private static _vector3_forward;
        static readonly vector3_forward: vector3;
        private static _vector3_zero;
        static readonly vector3_zero: vector3;
        private static _vector3_one;
        static readonly vector3_one: vector3;
        private static unused_vector3;
        static new_vector3(x?: number, y?: number, z?: number): vector3;
        static clone_vector3(src: vector3): vector3;
        static delete_vector3(v: vector3): void;
        static delete_vector3Array(vs: vector3[]): void;
        static collect_vector3(): void;
        private static _vector2_zero;
        static readonly vector2_zero: vector2;
        private static _vector2_up;
        static readonly vector2_up: vector2;
        private static _vector2_right;
        static readonly vector2_right: vector2;
        private static unused_vector2;
        static new_vector2(x?: number, y?: number): vector2;
        static clone_vector2(src: vector2): vector2;
        static delete_vector2(v: vector2): void;
        static delete_vector2Array(vs: vector2[]): void;
        static collect_vector2(): void;
        private static unused_matrix3x2;
        static new_matrix3x2(): matrix3x2;
        static clone_matrix3x2(src: matrix3x2): matrix3x2;
        static delete_matrix3x2(v: matrix3x2): void;
        static collect_matrix3x2(): void;
        private static unused_matrix;
        static new_matrix(): matrix;
        static clone_matrix(src: matrix): matrix;
        static readonly identityMat: matrix;
        static delete_matrix(v: matrix): void;
        static collect_matrix(): void;
        private static unused_quaternion;
        static new_quaternion(x?: number, y?: number, z?: number, w?: number): quaternion;
        static clone_quaternion(src: quaternion): quaternion;
        static delete_quaternion(v: quaternion): void;
        static collect_quaternion(): void;
        private static unused_pickInfo;
        static new_pickInfo(bu?: number, bv?: number, distance?: number): framework.pickinfo;
        static delete_pickInfo(v: framework.pickinfo): void;
        static collect_pickInfo(): void;
        private static unused_rect;
        static new_rect(x?: number, y?: number, w?: number, h?: number): rect;
        static clone_rect(src: rect): rect;
        static delete_rect(v: rect): void;
        static collect_rect(): void;
    }
}
declare namespace gd3d.render {
    class caps {
        maxTexturesImageUnits: number;
        maxTextureSize: number;
        maxCubemapTextureSize: number;
        maxRenderTextureSize: number;
        standardDerivatives: boolean;
        s3tc: WEBGL_compressed_texture_s3tc;
        textureFloat: boolean;
        textureAnisotropicFilterExtension: EXT_texture_filter_anisotropic;
        maxAnisotropy: number;
        instancedArrays: ANGLE_instanced_arrays;
        uintIndices: boolean;
        highPrecisionShaderSupported: boolean;
        fragmentDepthSupported: boolean;
        textureFloatLinearFiltering: boolean;
        textureLOD: boolean;
        drawBuffersExtension: any;
        pvrtcExtension: any;
        atcExtension: any;
    }
    class webglkit {
        private static _maxVertexAttribArray;
        static SetMaxVertexAttribArray(webgl: WebGLRenderingContext, count: number): void;
        private static _texNumber;
        static GetTextureNumber(webgl: WebGLRenderingContext, index: number): number;
        static FUNC_ADD: number;
        static FUNC_SUBTRACT: number;
        static FUNC_REVERSE_SUBTRACT: number;
        static ONE: number;
        static ZERO: number;
        static SRC_ALPHA: number;
        static SRC_COLOR: number;
        static ONE_MINUS_SRC_ALPHA: number;
        static ONE_MINUS_SRC_COLOR: number;
        static ONE_MINUS_DST_ALPHA: number;
        static ONE_MINUS_DST_COLOR: number;
        static LEQUAL: number;
        static EQUAL: number;
        static GEQUAL: number;
        static NOTEQUAL: number;
        static LESS: number;
        static GREATER: number;
        static ALWAYS: number;
        static NEVER: number;
        static caps: caps;
        static initConst(webgl: WebGLRenderingContext): void;
    }
}
declare namespace gd3d.render {
    enum ShowFaceStateEnum {
        ALL = 0,
        CCW = 1,
        CW = 2
    }
    enum DrawModeEnum {
        VboTri = 0,
        VboLine = 1,
        EboTri = 2,
        EboLine = 3
    }
    enum BlendModeEnum {
        Close = 0,
        Blend = 1,
        Blend_PreMultiply = 2,
        Add = 3,
        Add_PreMultiply = 4
    }
    class glDrawPass {
        static lastShowFace: number;
        static lastZWrite: boolean;
        static lastZTest: boolean;
        static lastZTestMethod: number;
        static lastBlend: boolean;
        static lastBlendMode: BlendModeEnum;
        program: glProgram;
        state_showface: ShowFaceStateEnum;
        state_zwrite: boolean;
        state_ztest: boolean;
        state_ztest_method: number;
        state_blend: boolean;
        state_blendMode: BlendModeEnum;
        state_blendEquation: number;
        state_blendSrcRGB: number;
        state_blendDestRGB: number;
        state_blendSrcAlpha: number;
        state_blendDestALpha: number;
        mapuniforms: {
            [id: string]: uniform;
        };
        setProgram(program: glProgram, uniformDefault?: boolean): void;
        setAlphaBlend(mode: BlendModeEnum): void;
        static resetLastState(): void;
        use(webgl: WebGLRenderingContext, applyUniForm?: boolean): void;
        draw(webgl: WebGLRenderingContext, mesh: glMesh, drawmode?: DrawModeEnum, drawindexindex?: number, drawbegin?: number, drawcount?: number): void;
        private getCurDrawState;
        private getCurBlendVal;
        private formate;
    }
}
declare namespace gd3d.render {
    enum VertexFormatMask {
        Position = 1,
        Normal = 2,
        Tangent = 4,
        Color = 8,
        UV0 = 16,
        UV1 = 32,
        BlendIndex4 = 64,
        BlendWeight4 = 128,
        ColorEX = 256
    }
    class number4 {
        v0: number;
        v1: number;
        v2: number;
        v3: number;
    }
    enum MeshTypeEnum {
        Static = 0,
        Dynamic = 1,
        Stream = 2
    }
    class drawInfo {
        private static _ins;
        static readonly ins: drawInfo;
        triCount: number;
        vboCount: number;
        renderCount: number;
    }
    class glMesh {
        initBuffer(webgl: WebGLRenderingContext, vf: VertexFormatMask, vertexCount: number, mode?: MeshTypeEnum): void;
        addIndex(webgl: WebGLRenderingContext, indexcount: number): number;
        resetVboSize(webgl: WebGLRenderingContext, vertexCount: number): void;
        resetEboSize(webgl: WebGLRenderingContext, eboindex: number, indexcount: number): void;
        dispose(webgl: WebGLRenderingContext): void;
        caclByteLength(): number;
        mode: number;
        vbo: WebGLBuffer;
        vertexCount: number;
        vertexByteSize: number;
        ebos: WebGLBuffer[];
        indexCounts: number[];
        lineMode: number;
        bindVboBuffer(webgl: WebGLRenderingContext): void;
        bindIndex: number;
        vertexFormat: VertexFormatMask;
        bind(webgl: WebGLRenderingContext, shadercode: glProgram, bindEbo?: number): void;
        uploadVertexSubData(webgl: WebGLRenderingContext, varray: Float32Array, offset?: number): void;
        uploadVertexData(webgl: WebGLRenderingContext, varray: Float32Array): void;
        uploadIndexSubData(webgl: WebGLRenderingContext, eboindex: number, data: Uint16Array, offset?: number): void;
        uploadIndexData(webgl: WebGLRenderingContext, eboindex: number, data: Uint16Array): void;
        drawArrayTris(webgl: WebGLRenderingContext, start?: number, count?: number): void;
        drawArrayLines(webgl: WebGLRenderingContext, start?: number, count?: number): void;
        drawElementTris(webgl: WebGLRenderingContext, start?: number, count?: number): void;
        drawElementLines(webgl: WebGLRenderingContext, start?: number, count?: number): void;
    }
}
declare namespace gd3d.render {
    class meshData {
        originVF: number;
        pos: gd3d.math.vector3[];
        color: gd3d.math.color[];
        colorex: gd3d.math.color[];
        uv: gd3d.math.vector2[];
        uv2: gd3d.math.vector2[];
        normal: gd3d.math.vector3[];
        tangent: gd3d.math.vector3[];
        blendIndex: number4[];
        blendWeight: number4[];
        trisindex: number[];
        static addQuadPos(data: meshData, quad: gd3d.math.vector3[]): void;
        static addQuadPos_Quad(data: meshData, quad: gd3d.math.vector3[]): void;
        static addQuadVec3ByValue(array: gd3d.math.vector3[], value: gd3d.math.vector3): void;
        static addQuadVec3(array: gd3d.math.vector3[], quad: gd3d.math.vector3[]): void;
        static addQuadVec2(array: gd3d.math.vector2[], quad: gd3d.math.vector2[]): void;
        static genQuad(size: number): meshData;
        static genQuad_forparticle(size: number): meshData;
        static genPlaneCCW(size: number): meshData;
        static genCylinderCCW(height: number, radius: number, segment?: number): meshData;
        static genPyramid(height: number, halfsize: number): meshData;
        static genSphereCCW(radius?: number, widthSegments?: number, heightSegments?: number): meshData;
        static genBoxCCW(size: number): meshData;
        static genBoxByArray(array: gd3d.math.vector3[], outData: meshData): void;
        static genBoxByArray_Quad(array: gd3d.math.vector3[]): meshData;
        static genCircleLineCCW(radius: number, segment?: number, wide?: number): meshData;
        caclByteLength(): number;
        static calcByteSize(vf: VertexFormatMask): number;
        genVertexDataArray(vf: VertexFormatMask): Float32Array;
        genIndexDataArray(): Uint16Array;
        genIndexDataArrayTri2Line(): Uint16Array;
        genIndexDataArrayQuad2Line(): Uint16Array;
        static cloneByObj(target: meshData): meshData;
    }
}
declare namespace gd3d.render {
    class staticMeshRenderer {
        material: glDrawPass;
        mesh: glMesh;
        eboIndex: number;
        drawMode: DrawModeEnum;
        drawbegin: number;
        drawcount: number;
        draw(webgl: WebGLRenderingContext): void;
    }
    class batchRenderer {
        curmaterial: glDrawPass;
        mesh: glMesh;
        drawMode: DrawModeEnum;
        vboCount: number;
        eboCount: number;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        initBuffer(webgl: WebGLRenderingContext, vf: VertexFormatMask, drawMode: DrawModeEnum): void;
        begin(webgl: WebGLRenderingContext, mat: glDrawPass): void;
        push(webgl: WebGLRenderingContext, vbodata: number[], ebodata: number[]): void;
        end(webgl: WebGLRenderingContext): void;
    }
}
declare namespace gd3d.render {
    class shaderUniform {
        static texindex: number;
        static applyuniformFunc: {
            [type: number]: (location: any, value: any) => void;
        };
        static webgl: WebGLRenderingContext;
        static initApplyUnifmFunc(): void;
    }
}
declare namespace gd3d.render {
    enum UniformTypeEnum {
        Texture = 0,
        Float = 1,
        Floatv = 2,
        Float4 = 3,
        Float4v = 4,
        Float4x4 = 5,
        Float4x4v = 6,
        CubeTexture = 7
    }
    class uniform {
        name: string;
        type: UniformTypeEnum;
        location: WebGLUniformLocation;
    }
    enum ShaderTypeEnum {
        VS = 0,
        FS = 1
    }
    class glShader {
        constructor(name: string, type: ShaderTypeEnum, shader: WebGLShader, code: string);
        name: string;
        type: ShaderTypeEnum;
        shader: WebGLShader;
    }
    class glProgram {
        constructor(vs: glShader, fs: glShader, program: WebGLProgram);
        initAttribute(webgl: WebGLRenderingContext): void;
        vs: glShader;
        fs: glShader;
        program: WebGLProgram;
        posPos: number;
        posNormal: number;
        posTangent: number;
        posColor: number;
        posUV0: number;
        posUV2: number;
        posBlendIndex4: number;
        posBlendWeight4: number;
        posColorEx: number;
        mapUniform: {
            [id: string]: uniform;
        };
        use(webgl: WebGLRenderingContext): void;
        initUniforms(webgl: WebGLRenderingContext): void;
    }
    class shaderPool {
        mapVS: {
            [id: string]: glShader;
        };
        mapFS: {
            [id: string]: glShader;
        };
        mapProgram: {
            [id: string]: glProgram;
        };
        disposeVS(webgl: WebGLRenderingContext, id: string): void;
        disposeFS(webgl: WebGLRenderingContext, id: string): void;
        disposeProgram(webgl: WebGLRenderingContext, id: string): void;
        disposeAll(webgl: WebGLRenderingContext): void;
        compileVS(webgl: WebGLRenderingContext, name: string, code: string): glShader;
        compileFS(webgl: WebGLRenderingContext, name: string, code: string): glShader;
        linkProgram(webgl: WebGLRenderingContext, nameVS: string, nameFS: string): glProgram;
        mapVSString: {
            [id: string]: string;
        };
        mapFSString: {
            [id: string]: string;
        };
        linkProgrambyPassType(webgl: WebGLRenderingContext, type: string, nameVS: string, nameFS: string): glProgram;
    }
}
declare namespace gd3d.render {
    enum TextureFormatEnum {
        RGBA = 1,
        RGB = 2,
        Gray = 3,
        PVRTC4_RGB = 4,
        PVRTC4_RGBA = 4,
        PVRTC2_RGB = 4,
        PVRTC2_RGBA = 4
    }
    class textureReader {
        constructor(webgl: WebGLRenderingContext, texRGBA: WebGLTexture, width: number, height: number, gray?: boolean);
        private webgl;
        private _width;
        readonly width: number;
        private _height;
        readonly height: number;
        private _data;
        private _grayData;
        readonly data: Uint8Array;
        private _gray;
        readonly gray: boolean;
        getPixel(u: number, v: number): any;
        refresh(texRGBA: WebGLTexture): void;
    }
    interface ITexture {
        texture: WebGLTexture;
        width: number;
        height: number;
        isFrameBuffer(): boolean;
        dispose(webgl: WebGLRenderingContext): any;
        caclByteLength(): number;
    }
    class glRenderTarget implements ITexture {
        width: number;
        height: number;
        constructor(webgl: WebGLRenderingContext, width: number, height: number, depth?: boolean, stencil?: boolean);
        fbo: WebGLFramebuffer;
        renderbuffer: WebGLRenderbuffer;
        texture: WebGLTexture;
        use(webgl: WebGLRenderingContext): void;
        static useNull(webgl: WebGLRenderingContext): void;
        dispose(webgl: WebGLRenderingContext): void;
        caclByteLength(): number;
        isFrameBuffer(): boolean;
    }
    class glTexture2D implements ITexture {
        ext: any;
        private linear;
        private premultiply;
        private repeat;
        private mirroredU;
        private mirroredV;
        constructor(webgl: WebGLRenderingContext, format?: TextureFormatEnum, mipmap?: boolean, linear?: boolean);
        private getExt;
        uploadImage(img: HTMLImageElement, mipmap: boolean, linear: boolean, premultiply?: boolean, repeat?: boolean, mirroredU?: boolean, mirroredV?: boolean): void;
        uploadByteArray(mipmap: boolean, linear: boolean, width: number, height: number, data: Uint8Array, repeat?: boolean, mirroredU?: boolean, mirroredV?: boolean): void;
        webgl: WebGLRenderingContext;
        loaded: boolean;
        texture: WebGLTexture;
        format: TextureFormatEnum;
        width: number;
        height: number;
        mipmap: boolean;
        caclByteLength(): number;
        reader: textureReader;
        getReader(redOnly?: boolean): textureReader;
        dispose(webgl: WebGLRenderingContext): void;
        isFrameBuffer(): boolean;
        private static mapTexture;
        static formGrayArray(webgl: WebGLRenderingContext, array: number[] | Float32Array | Float64Array, width: number, height: number): glTexture2D;
        static staticTexture(webgl: WebGLRenderingContext, name: string): glTexture2D;
    }
    class glTextureCube implements ITexture {
        constructor(webgl: WebGLRenderingContext, format?: TextureFormatEnum, mipmap?: boolean, linear?: boolean);
        uploadImages(Texture_NEGATIVE_X: framework.texture, Texture_NEGATIVE_Y: framework.texture, Texture_NEGATIVE_Z: framework.texture, Texture_POSITIVE_X: framework.texture, Texture_POSITIVE_Y: framework.texture, Texture_POSITIVE_Z: framework.texture): void;
        private upload;
        webgl: WebGLRenderingContext;
        loaded: boolean;
        texture: WebGLTexture;
        format: TextureFormatEnum;
        width: number;
        height: number;
        mipmap: boolean;
        linear: boolean;
        caclByteLength(): number;
        dispose(webgl: WebGLRenderingContext): void;
        isFrameBuffer(): boolean;
    }
    class WriteableTexture2D implements ITexture {
        constructor(webgl: WebGLRenderingContext, format: TextureFormatEnum, width: number, height: number, linear: boolean, premultiply?: boolean, repeat?: boolean, mirroredU?: boolean, mirroredV?: boolean);
        linear: boolean;
        premultiply: boolean;
        repeat: boolean;
        mirroredU: boolean;
        mirroredV: boolean;
        updateRect(data: Uint8Array, x: number, y: number, width: number, height: number): void;
        updateRectImg(data: ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement, x: number, y: number): void;
        isFrameBuffer(): boolean;
        webgl: WebGLRenderingContext;
        texture: WebGLTexture;
        format: TextureFormatEnum;
        formatGL: number;
        width: number;
        height: number;
        dispose(webgl: WebGLRenderingContext): void;
        caclByteLength(): number;
    }
}
