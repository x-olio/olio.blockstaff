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
        static UserAPIPost(url: string, data?: any, binrary?: boolean): Promise<IResult>;
        static UserAPIGet(url: string, data?: any): Promise<IResult>;
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
        static SaveMap(data: {
            name: string;
            desc: string;
            data: any;
        }): Promise<IResult>;
        static ReadMapList(): Promise<IResult>;
        static DelMap(data: {
            name: string;
        }): Promise<IResult>;
        static CreateBlock(data: {
            name: string;
            desc: string;
            data: string;
        }): Promise<IResult>;
        static ReadBlockList(): Promise<IResult>;
        static DelBlock(data: {
            name: string;
        }): Promise<IResult>;
        static GetBlockTexUrl(name: string): string;
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
        }, encoding?: boolean): Promise<XMLHttpRequest>;
        static Post(url: string, data?: {
            [key: string]: any;
        } | ArrayBuffer): Promise<{}>;
        static GetXhr(url: string, method: string, loadend?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void, error?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void, statechage?: (xhr: XMLHttpRequest, ev: Event) => void): XMLHttpRequest;
    }
}
declare namespace Game.Common {
    function Random(min: number, max: number): number;
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
    class State_GamePlayer implements IGameState {
        private env;
        private stateMgr;
        map2d: System.Map2DSystem;
        private gamePlayer;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        OnUpdate(delta: number): void;
        OnExit(): void;
    }
}
declare namespace Game.State {
    class State_List implements IGameState {
        private env;
        private statemgr;
        private scroll;
        CreateUI(): void;
        loadTexture(): Promise<void>;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        CreateFunc(text: string, state: IGameState): void;
        OnUpdate(delta: number): void;
        OnExit(): void;
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
declare var md5: any;
declare namespace Game.State {
    class State_Second implements IGameState {
        private mapName;
        private isEditor;
        env: Environment;
        statemgr: StateMgr;
        map2d: Game.System.Map2DSystem;
        private curlayer;
        constructor(mapName: string, isEditor?: boolean);
        LoadTexture(): Promise<void>;
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        OnExit(): void;
        OnUpdate(delta: number): void;
    }
}
declare namespace Game.State {
    class State_SelectMap implements IGameState {
        isEditor: boolean;
        private env;
        private statemgr;
        constructor(isEditor?: boolean);
        OnInit(env: Environment, statemgr: StateMgr): Promise<void>;
        LoadTexture(): Promise<void>;
        CreateUI(): Promise<void>;
        OnUpdate(delta: number): void;
        OnExit(): void;
    }
}
declare namespace Game {
    class GamePlayer {
        trans: gd3d.framework.transform;
        private assertMgr;
        private inputmgr;
        private state;
        jumpHeight: number;
        jumpSpeed: number;
        downSpeed: number;
        private moveSpeed;
        private jumpStartPos;
        private map;
        private dirLR;
        private dirUD;
        constructor();
        Init(map: System.Map2DSystem): Promise<void>;
        LoadTexture(): Promise<{}>;
        Inittrans(): void;
        Jump(): void;
        GetBlock(index: number): System.IBlockDesc;
        CheckBlock(index: any): boolean;
        CheckMoveX(x: any, y: any): boolean;
        CheckMoveY(x: any, y: any): boolean;
        SetPos(x: number, y: number): void;
        Update(delta: number): void;
        EntryScene(map2d: System.Map2DSystem, x: number, y: number): void;
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
    interface ILayerData {
        type: string;
        data: Array<number>;
        refblocks: Array<string>;
        width: number;
        height: number;
    }
    interface IMapInfoData {
        version: string;
        layers: Array<ILayerData>;
    }
    interface IPieceOFPic {
        imgIndex: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface IBlockAnim {
        speed: number;
        pieces: number[];
    }
    interface IBlockDesc {
        refImgs: string[];
        pieces: IPieceOFPic[];
        bound: "none" | "wall" | "stand";
        layer: string;
        displayType: string;
        displayPicList: {
            [id: string]: IBlockAnim;
        };
    }
    class Map2DSystem {
        static mapsDataStore: {
            [key: string]: IMapInfoData;
        };
        static mapBlockStore: {
            [key: string]: IBlockDesc;
        };
        env: Environment;
        baseData: IMapInfoData;
        mapBlocks: {
            [id: string]: IBlockDesc;
        };
        mapInfo: IMapInfoData;
        mapTexs: {
            [id: string]: gd3d.framework.texture;
        };
        root: gd3d.framework.transform;
        tex: gd3d.framework.texture;
        map: TmxStruct;
        constructor();
        InitAsync(env: Environment): Promise<void>;
        LoadTmxAsync(jsonData: IMapInfoData, blocks: {
            [key: string]: IBlockDesc;
        }): Promise<void>;
        private LoadAllBlockImg;
        private loadText;
        _addQuad(x: number, y: number, tileX: number, tileY: number, tileWidth: number, tileHeight: number, tex: gd3d.framework.texture): void;
        Parse(mapInfo: IMapInfoData): Promise<void>;
        static CreateEmitData(w: number, h: number, defBlockName: string): IMapInfoData;
        GetRandomPos(): any;
        static CreateEmitBlock(): IBlockDesc;
        CalcID(x: number, y: number, mapWitdh: number, layer: ILayerData): number;
        CalcIndex(x: number, y: number, w?: number): number;
        GetImageData(): string;
        PrintMapInfo(): void;
    }
}
declare namespace Game.ui {
    class CFile {
        static Show(select: (file: File) => void, mimeType?: string): void;
    }
}
declare namespace Game.ui {
    class ScrollFrame {
        private option;
        root: gd3d.framework.transform2D;
        private fimages;
        private curRow;
        private context;
        private click_time;
        private assetMgr;
        constructor(option: {
            width: number;
            height: number;
            owner?: gd3d.framework.transform2D;
            x?: number;
            y?: number;
        });
        AddComp(comp: gd3d.framework.I2DComponent): void;
        Add(option: {
            bg: gd3d.framework.texture;
            border?: gd3d.framework.texture;
            width?: number;
            height?: number;
            x?: number;
            y?: number;
            owner?: gd3d.framework.transform2D;
            onClick?: () => void;
            onDbClick?: () => void;
            onDelete?: () => void;
            text?: string;
        }): Promise<void>;
        CreateFrameImage(option: {
            bg: gd3d.framework.texture;
            border?: gd3d.framework.texture;
            width?: number;
            height?: number;
            x?: number;
            y?: number;
            owner?: gd3d.framework.transform2D;
            onClick?: () => void;
            onDbClick?: () => void;
            onDelete?: () => void;
            text?: string;
        }): gd3d.framework.transform2D;
        Clear(): void;
    }
}
declare namespace Game.ui {
    interface ILabelOption {
        name?: string;
        text?: string;
        assetMgr?: gd3d.framework.assetMgr;
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
        onClick?: () => void;
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
    function CreateFrameImage(option: {
        bg: gd3d.framework.texture;
        border?: gd3d.framework.texture;
        width?: number;
        height?: number;
        x?: number;
        y?: number;
        owner?: gd3d.framework.transform2D;
    }): gd3d.framework.rawImage2D;
    function AddEventInComp(trans2d: gd3d.framework.IRectRenderer, eventEnum: gd3d.event.UIEventEnum, func: (...args: Array<any>) => void, thisArg: any): void;
}
declare namespace Game.ui.dialog {
    class MesageBox {
        static Show(title: string, content: string): void;
    }
}
declare namespace Game.ui {
    class EditorGame {
        private mapName;
        uiroot: gd3d.framework.transform2D;
        private allblock_scroll;
        private refblock_scroll;
        private tex_border;
        private curBlock;
        private assetMgr;
        OnAddBlockTex: (file: File) => void;
        OnSaveMap: (name: string, width: number, height: number) => void;
        constructor(mapName: string);
        Init(): gd3d.framework.transform2D;
        CreateUI(): void;
        CreateBlockUI(): void;
        CreateRefBlockUI(): void;
        RefreshBlockList(): void;
        CreateBlockItem(blockName: string, block: System.IBlockDesc): void;
    }
}
