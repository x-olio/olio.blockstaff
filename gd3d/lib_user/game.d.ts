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
    class Map2DSystem {
        env: Environment;
        InitAsync(env: Environment): Promise<void>;
        LoadTmxAsync(urlJsonTMX: string, urlImgForTmx: string): Promise<void>;
        Close(): void;
        tex: gd3d.framework.texture;
        map: string;
        private loadMap;
        private loadText;
        private addcube;
    }
}
