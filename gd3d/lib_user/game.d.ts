declare namespace Game {
    class Environment {
        constructor(app: gd3d.framework.application);
        app: gd3d.framework.application;
        camera: gd3d.framework.camera;
        overlay: gd3d.framework.overlay2D;
        taskmgr: gd3d.framework.taskMgr;
        assetMgr: gd3d.framework.assetMgr;
        Init(): void;
        Update(delta: number): void;
        private loadShader;
    }
}
declare namespace Game {
    class main implements gd3d.framework.IUserCode {
        env: Environment;
        stateMgr: StateMgr;
        onStart(app: gd3d.framework.application): void;
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
        OnInit(env: Environment, statemgr: StateMgr): void;
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
        static temp: gd3d.framework.transform2D;
        OnInit(env: Environment, statemgr: StateMgr): void;
        OnExit(): void;
        OnUpdate(delta: number): void;
        tex: gd3d.framework.texture;
        map: string;
        private loadMap;
        private loadText;
        private addcube;
    }
}
