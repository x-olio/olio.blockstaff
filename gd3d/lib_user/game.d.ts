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
    class Map2DSystem {
        env: Environment;
        InitAsync(env: Environment): Promise<void>;
        LoadTmxAsync(urlJsonTMX: string, urlImgForTmx: string): Promise<void>;
        Close(): void;
        tex: gd3d.framework.texture;
        map: TmxStruct;
        private loadMap;
        private loadText;
        _addQuad(x: number, y: number, tileX: number, tileY: number, tileWidth: number, tileHeight: number): void;
        private addcube;
    }
}
