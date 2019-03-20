declare class main implements gd3d.framework.IUserCode {
    app: gd3d.framework.application;
    camera: gd3d.framework.camera;
    overlay: gd3d.framework.overlay2D;
    taskmgr: gd3d.framework.taskMgr;
    onStart(app: gd3d.framework.application): void;
    tex: gd3d.framework.texture;
    map: string;
    private loadShader;
    private loadMap;
    private loadText;
    private addcube;
    onUpdate(delta: number): void;
    isClosed(): boolean;
}
