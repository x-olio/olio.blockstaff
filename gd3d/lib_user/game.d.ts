declare namespace Game {
    class Environment {
        constructor(app: gd3d.framework.application);
        app: gd3d.framework.application;
        camera: gd3d.framework.camera;
        overlay: gd3d.framework.overlay2D;
        assetMgr: gd3d.framework.assetMgr;
        Init(): Promise<void>;
        Update(delta: number): void;
        private loadShader;
    }
}
declare namespace Game {
    class main implements gd3d.framework.IUserCode {
        env: Environment;
        stateMgr: StateMgr;
        hadInit: boolean;
        onStart(app: gd3d.framework.application): Promise<void>;
        onUpdate(delta: number): void;
        isClosed(): boolean;
    }
}
declare namespace Game {
    class StateMgr {
        constructor();
        state: IGameState;
        env: Environment;
        Init(env: Environment): void;
        ChangeState(state: IGameState): void;
        Update(delta: number): void;
    }
    interface IGameState {
        OnInit(env: Environment, statemgr: StateMgr): any;
        OnUpdate(delta: number): any;
        OnExit(): any;
    }
}
declare namespace Game.Common {
    interface IResult {
        error: number;
        body: any;
        message: string;
    }
    class APITools {
        static api: string;
        static loginInfo: {
            token: string;
            validtime: number;
        };
        static APIPost(url: string, data?: any, binrary?: boolean): Promise<IResult>;
        static APIGet(url: string, data?: any): Promise<IResult>;
        static Login(data: {
            username: string;
            password: string;
        }): Promise<IResult>;
        static Register(data: {
            nickname: string;
            username: string;
            password: string;
            phone: string;
            email: string;
        }): Promise<IResult>;
        static CheckToken(): Promise<boolean>;
    }
}
declare namespace Game.Common {
    class AssetTools {
        static promiseQueueExec(promises: Array<Function>): Promise<void>;
        static loadAsset(assetMgr: gd3d.framework.assetMgr, url: string): Promise<{}>;
    }
}
declare namespace Game.Common {
    class LocalStore {
        private static storeInstance;
        static Get(key: string): string;
        static Set(key: string, value: string): void;
        static Clean(): void;
    }
}
declare namespace Game.Common {
    class NetTools {
        static Get(url: string, params?: {
            [key: string]: string | number | boolean;
        }, encoding?: boolean): Promise<{}>;
        static Post(url: string, data?: {
            [key: string]: any;
        } | ArrayBuffer): Promise<{}>;
        static GetXhr(url: string, method: string, loadend?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void, error?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void, statechage?: (xhr: XMLHttpRequest, ev: Event) => void): XMLHttpRequest;
    }
}
declare namespace Game.State {
    class State_First implements IGameState {
        env: Environment;
        statemgr: StateMgr;
        static temp: gd3d.framework.transform2D;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        OnExit(): void;
        OnUpdate(delta: number): void;
        OnBtn_ChangeState(): void;
        private createUI;
        private loadTexture;
        testFun(): void;
    }
}
declare namespace Game.State {
    class State_Login implements IGameState {
        private env;
        private statemgr;
        private bg_t;
        private btn_login;
        private btn_register;
        private ipt_loginame;
        private ipt_password;
        private lab_message;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        OnUpdate(delta: number): void;
        OnExit(): void;
        loadTexture(): Promise<void>;
        createUI(): void;
        OnLogin(): Promise<void>;
        OnRegister(): void;
    }
}
declare namespace Game.State {
    class State_Menu implements IGameState {
        private env;
        private statemgr;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        loadTexture(): Promise<void>;
        OnUpdate(delta: number): void;
        OnExit(): void;
        CreateUI(): void;
    }
}
declare namespace Game.State {
    class State_Regision implements IGameState {
        private upstate;
        env: Environment;
        statemgr: StateMgr;
        private ipt_nickname;
        private ipt_loginame;
        private ipt_password;
        private ipt_email;
        private ipt_phone;
        private ipt_repassword;
        private btn_back;
        private btn_ok;
        private lab_message;
        constructor(upstate: IGameState);
        OnInit(env: Environment, statemgr: StateMgr): void;
        OnUpdate(delta: number): void;
        OnExit(): void;
        createUI(): void;
        private OnBack;
        private OnRegister;
    }
}
declare namespace Game.State {
    class State_Second implements IGameState {
        env: Environment;
        statemgr: StateMgr;
        map2d: Game.System.Map2DSystem;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        OnExit(): void;
        OnUpdate(delta: number): void;
    }
}
declare namespace Game.System {
    class TmxLayer {
        data: number[];
        height: number;
        id: number;
        name: string;
        opacity: number;
        properties: TmxProperty[];
        type: string;
        visible: boolean;
        width: number;
        x: number;
        y: number;
    }
    class TmxProperty {
        name: string;
        type: string;
        value: string;
    }
    class TmxTile {
        id: number;
        properties: TmxProperty[];
    }
    class TmxTileSet {
        columns: number;
        firstgid: number;
        image: string;
        imageheight: number;
        imagewidth: number;
        margin: number;
        name: string;
        spacing: number;
        tilecount: number;
        tileheight: number;
        tiles: TmxTile[];
        tilewidth: number;
    }
    class TmxStruct {
        height: number;
        infinite: boolean;
        layers: TmxLayer[];
        nextlayerid: number;
        nextobjectid: number;
        orientation: string;
        renderorder: string;
        tiledversion: string;
        tileheight: number;
        tilesets: TmxTileSet[];
        tilewidth: number;
        type: string;
        version: number;
        width: number;
    }
    interface IBlockData {
        bound: any;
        display: {
            type: string;
            pics: Array<number>;
        };
    }
    interface IBlockFileData {
        pics: Array<string>;
        files: {
            [id: string]: IBlockData;
        };
    }
    interface ILayerBlockData {
        file: string;
    }
    interface ILayerData {
        type: string;
        data: Array<number>;
        blocks: Array<ILayerBlockData>;
        imageheight: number;
        imagewidth: number;
        blockwidht: number;
        blockheight: number;
    }
    interface IBlockFileDescData {
        bound: string;
        pics: Array<string>;
    }
    interface IMapInfoData {
        version: string;
        height: number;
        width: number;
        layers: Array<ILayerData>;
        blockfile: IBlockFileData;
        files: Array<IBlockFileDescData>;
    }
    class Map2DSystem {
        env: Environment;
        InitAsync(env: Environment): Promise<void>;
        LoadTmxAsync(urlJsonTMX: string, urlImgForTmx: string): Promise<void>;
        constructor();
        tex: gd3d.framework.texture;
        map: TmxStruct;
        private loadMap;
        private loadText;
        _addQuad(x: number, y: number, tileX: number, tileY: number, tileWidth: number, tileHeight: number, tex: gd3d.framework.texture): void;
        private addcube;
        private baseData;
        Parse(baseData: string): Promise<void>;
        GetData(): IMapInfoData;
        CreateEmitData(w: number, h: number): any[];
        CalcID(x: number, y: number, mapWitdh: number, layer: ILayerData): number;
        CalcIndex(x: number, y: number, w: number): number;
    }
}
declare namespace Game.ui {
    interface ILabelOption {
        name?: string;
        text?: string;
        assetMgr: gd3d.framework.assetMgr;
        owner?: gd3d.framework.transform2D;
        fontsize?: number;
        fontasset?: string;
        fontcolor?: gd3d.math.color;
        width?: number;
        height?: number;
        x?: number;
        y?: number;
    }
    interface IButtonOption extends ILabelOption {
        hitsSprite?: gd3d.framework.sprite;
        backSprite?: gd3d.framework.sprite;
    }
    interface IInputOption extends ILabelOption {
        backSprite: gd3d.framework.sprite;
        LineType?: gd3d.framework.lineType;
        placeholder?: string;
        contentType?: gd3d.framework.contentType;
    }
    function createLabel(option: ILabelOption): gd3d.framework.label;
    function createInput(option: IInputOption): gd3d.framework.inputField;
    function createButton(option: IButtonOption): gd3d.framework.button;
}
