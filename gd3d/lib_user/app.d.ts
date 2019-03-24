/// <reference path="../lib/gd3d.d.ts" />
/// <reference path="../lib/htmlui.d.ts" />
declare class demo_ScreenSplit implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    cameraCurseHover: number;
    windowRate: number;
    windowHorizon: boolean;
    mouseOver: boolean;
    mouseEnter: boolean;
    mouseDown: boolean;
    mouseMove: boolean;
    outcontainer: HTMLDivElement;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    camera1: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    cube4: gd3d.framework.transform;
    timer: number;
    movetarget: gd3d.math.vector3;
    targetCamera: gd3d.framework.camera;
    inputMgr: gd3d.framework.inputMgr;
    pointDown: boolean;
    splitline: HTMLDivElement;
    update(delta: number): void;
}
declare var RVO: any;
declare class demo_navigaionRVO implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr: gd3d.framework.NavMeshLoadManager;
    inputMgr: gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize: number;
    player: gd3d.framework.transform;
    static TestRVO: demo_navigaionRVO;
    rvoMgr: gd3d.framework.RVOManager;
    start(app: gd3d.framework.application): void;
    private isInitPlayer;
    private initPlayer(x, y, z);
    private loadScene(assetName, isCompress?);
    private Goals;
    private PosRayNavmesh(oPos);
    pickDown(): void;
    private rayNavMesh();
    private enemys;
    private addEnemy();
    private pos;
    private tryFindingPath();
    private lastLine;
    private drawLine(points);
    private genLineMesh(points);
    private createAllPoint(count);
    private setRoadPoint(index, x, y, z, color);
    private points;
    private generateGeomtry(meshType?, color?);
    baihu: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    isAKeyDown: boolean;
    private pointDown;
    update(delta: number): void;
    private addbtn(topOffset, textContent, func);
}
declare class dome_loadaniplayer implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskmgr: gd3d.framework.taskMgr;
    role: gd3d.framework.transform;
    assetmgr: gd3d.framework.assetMgr;
    private roleName;
    private weaponName;
    private skillName;
    private names;
    private ani;
    private loadShader(laststate, state);
    private loadRole(laststate, state);
    private loadSkill(name);
    private loadWeapon(name);
    private ctrlBtn(laststate, state);
    private addCam(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare namespace t {
    class light_d1 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcube(laststate, state);
        private addcamandlight(laststate, state);
        start(app: gd3d.framework.application): void;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare class localSave {
    private static _instance;
    static readonly Instance: localSave;
    localServerPath: string;
    stringToUtf8Array(str: string): number[];
    file_str2blob(string: string): Blob;
    file_u8array2blob(array: Uint8Array): Blob;
    save(path: string, file: Blob | File): number;
    startDirect(exec: string, path: string, argc: string): any;
    start(path: string): any;
    startnowait(path: string, fun?: (_txt: string, _err: Error) => void): any;
    loadTextImmediate(url: string, fun: (_txt: string, _err: Error) => void): void;
    loadBlobImmediate(url: string, fun: (_blob: Blob, _err: Error) => void): void;
}
interface IState {
    start(app: gd3d.framework.application): any;
    update(delta: number): any;
}
declare class main implements gd3d.framework.IUserCode {
    app: gd3d.framework.application;
    state: IState;
    onStart(app: gd3d.framework.application): void;
    private x;
    private y;
    private btns;
    private addBtn(text, act);
    private clearBtn();
    onUpdate(delta: number): void;
    isClosed(): boolean;
}
declare class test_01 implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class test_loadScene implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    loadScene(assetName: string, isCompress?: boolean): void;
    baihu: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    update(delta: number): void;
}
declare class test_loadMulBundle implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    refreshTexture(tran: gd3d.framework.transform): void;
    refreshAniclip(tran: gd3d.framework.transform): void;
    refreshLightMap(scene: gd3d.framework.scene, rawscene: gd3d.framework.rawscene): void;
    start(app: gd3d.framework.application): void;
    baihu: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    update(delta: number): void;
}
declare namespace t {
    class test_pathAsset implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application): void;
        private loadShader(laststate, state);
        private loadTexture(laststate, state);
        private loadpath(laststate, state);
        private loadasset(laststate, state);
        sh: gd3d.framework.shader;
        private initscene(laststate, state);
        private parentlist;
        private dragonlist;
        private traillist;
        private guippaths;
        private path;
        private showcamera;
        target: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        angle: number;
        timer: number;
        update(delta: number): void;
        private addbtns();
        private addBtn(text, x, y, func);
    }
    function DBgetAtrans(mat: gd3d.framework.material, meshname?: string): gd3d.framework.transform;
    function DBgetMat(texname?: string, shaderstring?: string): gd3d.framework.material;
}
declare class test_loadprefab implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    refreshTexture(tran: gd3d.framework.transform): void;
    refreshAniclip(tran: gd3d.framework.transform, name: string): void;
    start(app: gd3d.framework.application): void;
    private changeShader();
    change(sha: gd3d.framework.shader): void;
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class testReload implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    uileft: number;
    createChangeBtn(role: gd3d.framework.transform, role1: gd3d.framework.transform, o2d: gd3d.framework.overlay2D, part: string): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class test_3DPhysics_baseShape implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    start(app: gd3d.framework.application): Promise<any>;
    init(): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_compound implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private types;
    private sizes;
    private positions;
    private chairId;
    private crateChair();
    private crateCapsule(showCollisionMesh?);
    private targetTran;
    private boxTran;
    private cylinderTran;
    private floor;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private impulseTarget();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_explode implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    iptMgr: gd3d.framework.inputMgr;
    mrs: gd3d.framework.meshRenderer[];
    start(app: gd3d.framework.application): Promise<any>;
    private redSphere;
    private targetTran;
    private boxTran;
    private floor;
    private boxList;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private enumArr;
    private optStrs;
    private freezeDic;
    private impulseTarget();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private doExplode();
    delta: number;
    movespeed: number;
    keyDown([keyCode]: [any]): void;
    private explodeFroce;
    private explodeRadius;
    explode(point: gd3d.math.vector3): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_freeze implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    iptMgr: gd3d.framework.inputMgr;
    mrs: gd3d.framework.meshRenderer[];
    start(app: gd3d.framework.application): Promise<any>;
    private targetTran;
    private boxTran;
    private cylinderTran;
    private floor;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private enumArr;
    private optStrs;
    private freezeDic;
    private applyFreezeOpt();
    private impulseTarget();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_ballandSocket implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_distance implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_hinge implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private applyReset();
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_prismatic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_slider implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_wheel implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private connectedPivot;
    private mainPivot;
    private pole;
    private pole_1;
    addDisplayObj(): void;
    private tempV3;
    syncDisplayRT(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox();
    private force;
    private contactlocalPoint;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare let help_v2: gd3d.math.vector2;
declare class test_3DPhysics_kinematic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    iptMgr: gd3d.framework.inputMgr;
    mrs: gd3d.framework.meshRenderer[];
    start(app: gd3d.framework.application): Promise<any>;
    floor: gd3d.framework.transform;
    ctrBox: gd3d.framework.transform;
    init(): void;
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    updateRoate(): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_hinge implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private motorSpeed;
    private targetMotor;
    private changeMotorSpeed();
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_slider implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox();
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse(phyImpostor);
    private motorSpeed;
    private targetMotor;
    private changeMotorSpeed();
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_wheel implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    private boxTran;
    init(): void;
    private connectedPivot;
    private mainPivot;
    private pole;
    private pole_1;
    addDisplayObj(): void;
    private tempV3;
    syncDisplayRT(): void;
    private motorSpeed;
    private targetMotor;
    private changeMotorSpeed();
    private guiMsg;
    setGUI(): void;
    private impulseBox();
    private force;
    private contactlocalPoint;
    private doImpulse(phyImpostor);
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_RangeScreen implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    cube4: gd3d.framework.transform;
    timer: number;
    movetarget: gd3d.math.vector3;
    inputMgr: gd3d.framework.inputMgr;
    pointDown: boolean;
    update(delta: number): void;
}
declare var RVO: any;
declare class test_Rvo2 implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    inputMgr: gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    sim: any;
    goals: any[];
    size: number;
    start(app: gd3d.framework.application): void;
    spheres: gd3d.framework.transform[];
    init(): void;
    camera: gd3d.framework.camera;
    update(delta: number): void;
    reachedGoals(sim: any, goals: any): boolean;
    setPreferredVelocities(sim: any, goals: any): void;
    updateVisualization(sim: any): void;
}
declare class test_UIEffect implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    img_3: gd3d.framework.image2D;
    img_4: gd3d.framework.image2D;
    img_5: gd3d.framework.image2D;
    img_7: gd3d.framework.image2D;
    img_8: gd3d.framework.image2D;
    amount: number;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    bere1: boolean;
    update(delta: number): void;
}
declare class test_UI_Component implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    static temp: gd3d.framework.transform2D;
    start(app: gd3d.framework.application): void;
    private createUI(astState, state);
    private loadTexture(lastState, state);
    update(delta: number): void;
    testFun(): void;
}
declare namespace t {
    class test_blend implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        background: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        counttimer: number;
        private angularVelocity;
        private eulerAngle;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcam(laststate, state);
        foreground: gd3d.framework.transform;
        private addplane(laststate, state);
        start(app: gd3d.framework.application): void;
        update(delta: number): void;
    }
}
declare class test_fakepbr implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    light: gd3d.framework.light;
    light2: gd3d.framework.light;
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class test_keyFrameAni implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskMgr: gd3d.framework.taskMgr;
    obj3d: gd3d.framework.transform;
    start(app: gd3d.framework.application): void;
    private loadShader(laststate, state);
    private loadasset(laststate, state);
    private iniscene(laststate, state);
    private addbtns();
    private addbtn(text, x, y, func);
    update(delta: number): void;
}
declare class testLiChangeMesh implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    uileft: number;
    createChangeBtn(role: gd3d.framework.transform, role1: gd3d.framework.transform, o2d: gd3d.framework.overlay2D, part: string, part2: any): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare namespace t {
    class test_rendertexture implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        sh: gd3d.framework.shader;
        private initscene(laststate, state);
        private add3dmodelbeforeUi(laststate, state);
        start(app: gd3d.framework.application): void;
        wath_camer: gd3d.framework.camera;
        target: gd3d.framework.transform;
        targetMat: gd3d.framework.material;
        show_cube: gd3d.framework.transform;
        showcamera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        angle: number;
        update(delta: number): void;
    }
}
declare class test_loadCompressUseAssetbundle implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare namespace demo {
    class DragonTest implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        dragon: gd3d.framework.transform;
        camTran: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        private loadShader(laststate, state);
        private loadLongPrefab(laststate, state);
        private loadScene(laststate, state);
        private addCameraAndLight(laststate, state);
        start(app: gd3d.framework.application): void;
        update(delta: number): void;
    }
}
declare class test_navMesh implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr: gd3d.framework.NavMeshLoadManager;
    inputMgr: gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize: number;
    start(app: gd3d.framework.application): void;
    loadScene(assetName: string, isCompress?: boolean): void;
    private pos;
    pickDown(): void;
    private lastLine;
    private drawLine(points);
    private genMesh(points);
    private createAllPoint(count);
    private setPoint(index, x, y, z, color);
    private points;
    private generatePoint();
    baihu: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    private pointDown;
    update(delta: number): void;
}
declare class test_pbr implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    cube: gd3d.framework.transform;
    static temp: gd3d.framework.transform2D;
    start(app: gd3d.framework.application): void;
    private init(astState, state);
    private PBRPath;
    private material;
    private skyName;
    private iblPath;
    private loadpbrRes(lastState, state);
    private loadpbrRes1(lastState, state);
    private loadpbrRes2(lastState, state);
    private loadpbrRes3(lastState, state);
    private loadpbrRes4(lastState, state);
    private loadTexture(lastState, state);
    private addCube();
    update(delta: number): void;
}
declare class test_pbr_scene implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    cube: gd3d.framework.transform;
    static temp: gd3d.framework.transform2D;
    start(app: gd3d.framework.application): void;
    private lightPos1;
    private lightPos2;
    private addSphere(x, y, z, IBL, IBL_1, IBL_2, IBL_3, IBL_4, IBL_5, albedo, metallic, roughness);
    private init(astState, state);
    private PBRPath;
    private material;
    private skyName;
    private iblPath;
    private loadpbrRes(lastState, state);
    private loadpbrRes1(lastState, state);
    private loadpbrRes2(lastState, state);
    private loadpbrRes3(lastState, state);
    private loadpbrRes4(lastState, state);
    private loadTexture(lastState, state);
    timer: number;
    update(delta: number): void;
}
declare namespace demo {
    class test_performance implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        assetMgr: gd3d.framework.assetMgr;
        camera: gd3d.framework.camera;
        camTran: gd3d.framework.transform;
        start(app: gd3d.framework.application): void;
        cubes: gd3d.framework.transform[];
        count: number;
        all: number;
        tryadd(): void;
        update(delta: number): void;
        randome(): void;
    }
}
declare var RVO: any;
declare class test_pick_boxcollider implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    navmeshMgr: gd3d.framework.NavMeshLoadManager;
    inputMgr: gd3d.framework.inputMgr;
    assetMgr: gd3d.framework.assetMgr;
    cubesize: number;
    player: gd3d.framework.transform;
    sim: any;
    goals: any[];
    mods: gd3d.framework.transform[];
    start(app: gd3d.framework.application): void;
    private loadScene(assetName, isCompress?);
    private colorMap;
    private getColor(r, g, b);
    private balls;
    private addBall(pos);
    private pickLayer;
    pickDown(): void;
    private rayCollider();
    private points;
    private generateGeomtry(meshType?, color?);
    camera: gd3d.framework.camera;
    timer: number;
    bere: boolean;
    isAKeyDown: boolean;
    private pointDown;
    update(delta: number): void;
}
declare class test_postCamera implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    timer: number;
    update(delta: number): void;
    camTran: gd3d.framework.transform;
    postColor: gd3d.framework.cameraPostQueue_Color;
    postQuad: gd3d.framework.cameraPostQueue_Quad;
    depthColor: gd3d.framework.cameraPostQueue_Depth;
    private addCamera();
}
declare class test_softCut implements IState {
    static temp: any;
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    start(app: gd3d.framework.application): void;
    private createUI(astState, state);
    private loadTexture(lastState, state);
    update(delta: number): void;
}
declare class test_sssss implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    taskmgr: gd3d.framework.taskMgr;
    cam: gd3d.framework.camera;
    start(app: gd3d.framework.application): void;
    private init();
    private loadpbrRes(lastState, state);
    private loadIBL(lastState, state);
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare enum ShockType {
    Vertical = 0,
    Horizontal = 1,
    Both = 2,
}
declare class CameraShock implements gd3d.framework.INodeComponent {
    gameObject: gd3d.framework.gameObject;
    private isPlaying;
    private fade;
    private oldTranslate;
    private shockType;
    private strength;
    private life;
    private ticker;
    start(): void;
    onPlay(): void;
    play(strength?: number, life?: number, fade?: boolean, shockType?: ShockType): void;
    update(delta: number): void;
    remove(): void;
    clone(): void;
}
declare class Joystick {
    app: gd3d.framework.application;
    overlay2d: gd3d.framework.overlay2D;
    private joystickLeft0;
    private joystickLeft1;
    private joystickRight0;
    private joystickRight1;
    private taskmgr;
    triggerFunc: Function;
    init(app: gd3d.framework.application, overlay2d: gd3d.framework.overlay2D): void;
    private loadTexture(laststate, state);
    private addJoystick(laststate, state);
    leftAxis: gd3d.math.vector2;
    rightAxis: gd3d.math.vector2;
    private maxScale;
    private touchLeft;
    private touchRight;
    private mouseLeft;
    private mouseRight;
    readonly leftTouching: boolean;
    readonly rightTouching: boolean;
    private onMouseDown(e);
    private onMouseUp(e);
    private onMouseMove(e);
    private onTouchStart(e);
    private onTouchEnd(e);
    private onTouchMove(e);
    update(delta: number): void;
}
declare namespace demo {
    class TankGame implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        postQuad: gd3d.framework.cameraPostQueue_Quad;
        light: gd3d.framework.light;
        heroTank: gd3d.framework.transform;
        heroGun: gd3d.framework.transform;
        heroSlot: gd3d.framework.transform;
        enemyTank: gd3d.framework.transform;
        enemyGun: gd3d.framework.transform;
        enemySlot: gd3d.framework.transform;
        ground: gd3d.framework.transform;
        cubes: gd3d.framework.transform[];
        walls: gd3d.framework.transform[];
        overlay2d: gd3d.framework.overlay2D;
        joystick: Joystick;
        taskmgr: gd3d.framework.taskMgr;
        tankMoveSpeed: number;
        tankRotateSpeed: gd3d.math.vector3;
        gunRotateSpeed: gd3d.math.vector3;
        angleLimit: number;
        colVisible: boolean;
        private label;
        private loadShader(laststate, state);
        private loadTexture(laststate, state);
        private loadHeroPrefab(laststate, state);
        private loadEnemyPrefab(laststate, state);
        private loadScene(laststate, state);
        private cameraShock;
        private addCameraAndLight(laststate, state);
        private addJoystick(laststate, state);
        private addObject(laststate, state);
        private keyMap;
        start(app: gd3d.framework.application): void;
        update(delta: number): void;
        testTankCol(tran: gd3d.framework.transform): boolean;
        tempTran: gd3d.framework.transform;
        tankControl(delta: number): void;
        bulletId: number;
        bulletList: any[];
        bulletSpeed: number;
        fireStep: number;
        fireTick: number;
        private fire();
        private updateBullet(delta);
    }
}
declare namespace t {
    class test_three_leaved_rose_curve implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number;
        cube2: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        counttimer: number;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole(laststate, state);
        private addcam(laststate, state);
        private addcube(laststate, state);
        start(app: gd3d.framework.application): void;
        private angularVelocity;
        private eulerAngle;
        private zeroPoint;
        update(delta: number): void;
    }
}
declare class test_uiPerfabLoad implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    start(app: gd3d.framework.application): void;
    private bgui;
    private createUI(astState, state);
    targetui: gd3d.framework.transform2D;
    private doLoad(name);
    private loadShaders(lastState, state);
    private loadTexture(lastState, state);
    update(delta: number): void;
}
declare class test_uimove implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
    private test();
}
declare class Rect extends gd3d.framework.transform {
    width: number;
    height: number;
    offset: gd3d.math.vector3;
    parent: Rect;
    children: Rect[];
    alignType: AlignType;
    points: gd3d.math.vector3[];
    alignPos: gd3d.math.vector3;
    layout(): void;
}
declare enum AlignType {
    NONE = 0,
    CENTER = 1,
    LEFT = 2,
    RIGHT = 3,
    TOP = 4,
    BOTTOM = 5,
    TOP_LEFT = 6,
    BOTTOM_LEFT = 7,
    TOP_RIGHT = 8,
    BOTTOM_RIGHT = 9,
}
declare class test_anim implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    player: gd3d.framework.transform;
    cubes: {
        [id: string]: gd3d.framework.transform;
    };
    _assetMgr: gd3d.framework.assetMgr;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class test_loadAsiprefab implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    trans: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare class test_assestmgr implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    assetName: string;
    count: number;
    start(app: gd3d.framework.application): void;
    _prefab: gd3d.framework.prefab;
    baihu: gd3d.framework.transform[];
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    bere: boolean;
    update(delta: number): void;
}
declare namespace t {
    class test_changeshader implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        renderer: gd3d.framework.meshRenderer;
        skinrender: gd3d.framework.skinnedMeshRenderer;
        objCam: gd3d.framework.transform;
        start(app: gd3d.framework.application): void;
        private changeShader();
        change(sha: gd3d.framework.shader): void;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        cube2: gd3d.framework.transform;
        cube3: gd3d.framework.transform;
        timer: number;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_clearDepth0 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application): void;
        private loadShader(laststate, state);
        private loadTexture(laststate, state);
        sh: gd3d.framework.shader;
        private initscene(laststate, state);
        private fuckLabel;
        private showcamera;
        target: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        angle: number;
        timer: number;
        update(delta: number): void;
    }
}
declare class test_effect implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    effect: gd3d.framework.effectSystem;
    label: HTMLLabelElement;
    private loadShader(laststate, state);
    private loadText(laststate, state);
    private addcube(laststate, state);
    private dragon;
    private loadModel(laststate, state);
    start(app: gd3d.framework.application): void;
    private text;
    private loadEffect(laststate, state);
    private addButton();
    private getNameFromURL(path);
    private addcam(laststate, state);
    tr: gd3d.framework.transform;
    ttr: gd3d.framework.transform;
    beclone: boolean;
    effectloaded: boolean;
    bestop: boolean;
    bereplay: boolean;
    update(delta: number): void;
}
declare namespace t {
    class test_integratedrender implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole(laststate, state);
        private weapon;
        private loadWeapon(laststate, state);
        sh: gd3d.framework.shader;
        cube2: gd3d.framework.transform;
        private initscene(laststate, state);
        trailrender: gd3d.framework.trailRender;
        start(app: gd3d.framework.application): void;
        org: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        grassMat: gd3d.framework.material;
        private wind;
        private WaveFrequency;
        private WaveAmplitude;
        play: boolean;
        update(delta: number): void;
        private addbtn(top, left, text);
    }
}
declare namespace t {
    class test_light1 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        tex: gd3d.framework.texture;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcube(laststate, state);
        private addcamandlight(laststate, state);
        start(app: gd3d.framework.application): void;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare class testloadImmediate implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare namespace dome {
    class testCJ implements IState {
        private loadShader(laststate, state);
        dragon: gd3d.framework.transform;
        cameraPoint: gd3d.framework.transform;
        private loadmesh(laststate, state);
        private loadweapon(laststate, state);
        private test(laststate, state);
        camera: gd3d.framework.camera;
        private addCamera(laststate, state);
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        taskmgr: gd3d.framework.taskMgr;
        assetMgr: gd3d.framework.assetMgr;
        start(app: gd3d.framework.application): void;
        trans: gd3d.framework.transform;
        time: number;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_xinshouMask implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        imageRenderMask: gd3d.framework.meshRenderer;
        texture: gd3d.framework.texture;
        start(app: gd3d.framework.application): void;
        addDomUI(): void;
        camera: gd3d.framework.camera;
        timer: number;
        update(delta: number): void;
    }
    function getFileName(url: string): string;
}
declare class test_load implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare namespace t {
    class test_metal implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcamandlight(laststate, state);
        private addmetalmodel(laststate, state);
        private addAsiModel(laststate, state);
        start(app: gd3d.framework.application): void;
        private addinput(top, left, text, type?);
        private addbtn(top, left, text);
        diffuse: HTMLInputElement;
        emitpower: HTMLInputElement;
        model: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        cube1render: gd3d.framework.meshRenderer;
        cube2render: gd3d.framework.meshRenderer;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare class test_multipleplayer_anim implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    player: gd3d.framework.transform;
    cubes: {
        [id: string]: gd3d.framework.transform;
    };
    resName: string;
    readonly abName: string;
    readonly prefabName: string;
    readonly resPath: string;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    aniplayers: gd3d.framework.aniplayer[];
    update(delta: number): void;
}
declare namespace t {
    class Test_NormalMap implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        cuber: gd3d.framework.meshRenderer;
        private normalCube;
        private addnormalcube(laststate, state);
        private addcube(laststate, state);
        private addcamandlight(laststate, state);
        start(app: gd3d.framework.application): void;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare class test_pick implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    cube4: gd3d.framework.transform;
    timer: number;
    movetarget: gd3d.math.vector3;
    inputMgr: gd3d.framework.inputMgr;
    pointDown: boolean;
    update(delta: number): void;
}
declare class test_pick_4p implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    cube4: gd3d.framework.transform;
    timer: number;
    movetarget: gd3d.math.vector3;
    inputMgr: gd3d.framework.inputMgr;
    pointDown: boolean;
    update(delta: number): void;
}
declare namespace t {
    class test_post_bloom implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcamandlight(laststate, state);
        start(app: gd3d.framework.application): void;
        private addbtn(topOffset, textContent, func);
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_posteffect implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcube(laststate, state);
        private addcamandlight(laststate, state);
        start(app: gd3d.framework.application): void;
        private addbtn(topOffset, textContent, func);
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare namespace t {
    class TestRotate implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number;
        cube2: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        counttimer: number;
        name: string;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private loadPvr(laststate, state);
        private changeShader();
        private addcam(laststate, state);
        private addcube(laststate, state);
        cubetrail: gd3d.framework.transform;
        start(app: gd3d.framework.application): void;
        private angularVelocity;
        private eulerAngle;
        private zeroPoint;
        private startdir;
        private enddir;
        private targetdir;
        update(delta: number): void;
    }
}
declare class test_ShadowMap implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    assetmgr: gd3d.framework.assetMgr;
    start(app: gd3d.framework.application): void;
    private shadowSh;
    private mats;
    private collectMat();
    private setmat(key, value);
    lightcamera: gd3d.framework.camera;
    depthTexture: gd3d.framework.texture;
    viewcamera: gd3d.framework.camera;
    timer: number;
    posToUV: gd3d.math.matrix;
    lightProjection: gd3d.math.matrix;
    update(delta: number): void;
    FitToScene(lightCamera: gd3d.framework.camera, aabb: gd3d.framework.aabb): void;
    asp: number;
    labelNear: HTMLLabelElement;
    labelFar: HTMLLabelElement;
    inputNear: HTMLInputElement;
    inputFar: HTMLInputElement;
    ShowUI(): void;
    ShowCameraInfo(camera: gd3d.framework.camera): void;
}
declare namespace t {
    class test_skillsystem implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number;
        cube2: gd3d.framework.transform;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        counttimer: number;
        private role;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcam(laststate, state);
        private addcube(laststate, state);
        private loadRole(laststate, state);
        private playAniAndEffect(aniplayer, aniName, effectName, playAniDelay, afterAni_PlayEffectDelay);
        effect: gd3d.framework.effectSystem;
        effect2: gd3d.framework.effectSystem;
        private loadEffect(laststate, state);
        start(app: gd3d.framework.application): void;
        private angularVelocity;
        private eulerAngle;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_sound implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        parts: gd3d.framework.transform;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        counttimer: number;
        private angularVelocity;
        private eulerAngle;
        loopedBuffer: AudioBuffer;
        once1: AudioBuffer;
        once2: AudioBuffer;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcam(laststate, state);
        private addcube(laststate, state);
        private loadSoundInfe(laststate, state);
        start(app: gd3d.framework.application): void;
        update(delta: number): void;
    }
}
declare class test_streamlight implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    player: gd3d.framework.transform;
    cubes: {
        [id: string]: gd3d.framework.transform;
    };
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare namespace t {
    class test_trailrenderrecorde implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole(laststate, state);
        private weapon;
        private loadWeapon(laststate, state);
        sh: gd3d.framework.shader;
        cube2: gd3d.framework.transform;
        private initscene(laststate, state);
        trailrender: gd3d.framework.trailRender;
        start(app: gd3d.framework.application): void;
        org: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        grassMat: gd3d.framework.material;
        private wind;
        private WaveFrequency;
        private WaveAmplitude;
        play: boolean;
        update(delta: number): void;
        private addbtn(top, left, text);
    }
}
declare class test_texuv implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare namespace t {
    class test_trailrender implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        texResName: string;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        sh: gd3d.framework.shader;
        private initscene(laststate, state);
        start(app: gd3d.framework.application): void;
        org: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        grassMat: gd3d.framework.material;
        private wind;
        private WaveFrequency;
        private WaveAmplitude;
        play: boolean;
        update(delta: number): void;
        private addbtn(top, left, text);
    }
}
declare namespace t {
    enum enumcheck {
        AA = 0,
        BB = 1,
        CC = 2,
    }
    class test_ui implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application): void;
        img_3: gd3d.framework.image2D;
        img_4: gd3d.framework.image2D;
        img_5: gd3d.framework.image2D;
        img_7: gd3d.framework.image2D;
        img_8: gd3d.framework.image2D;
        amount: number;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        timer: number;
        bere: boolean;
        bere1: boolean;
        update(delta: number): void;
    }
}
declare class testUserCodeUpdate implements gd3d.framework.IUserCode {
    beExecuteInEditorMode: boolean;
    trans: gd3d.framework.transform;
    timer: number;
    app: gd3d.framework.application;
    onStart(app: gd3d.framework.application): void;
    onUpdate(delta: number): void;
    isClosed(): boolean;
}
declare namespace t {
    class test_uvroll implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate, state);
        private loadText(laststate, state);
        private addcube(laststate, state);
        private addcam(laststate, state);
        start(app: gd3d.framework.application): void;
        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        cube1: gd3d.framework.transform;
        cube2: gd3d.framework.transform;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        count: number;
        row: number;
        col: number;
        totalframe: number;
        fps: number;
        private cycles;
        update(delta: number): void;
    }
}
declare class UseAniplayClipDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    aniClip: gd3d.framework.animationClip;
    taskMgr: gd3d.framework.taskMgr;
    aniplayer: gd3d.framework.aniplayer;
    private loadAniplayClip(laststate, state);
    private loadRole(laststate, state);
    private loadShader(laststate, state);
    private addCamera(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseAssetByLoadDemoList implements IState {
    app: gd3d.framework.application;
    state: IState;
    start(app: gd3d.framework.application): void;
    private x;
    private y;
    private btns;
    private addBtn(text, act);
    private clearBtn();
    update(delta: any): void;
}
declare class UseAudioDemo implements IState {
    audioplay: gd3d.framework.AudioPlayer;
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    objCam: gd3d.framework.transform;
    audiobuf: AudioBuffer;
    private loadAudio(laststate, state);
    private addCamera(laststate, state);
    private addAudioPlay(laststate, state);
    private loadShader(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseF14EffectDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    eff: gd3d.framework.transform;
    effectSystems: gd3d.framework.f14EffectSystem;
    private useF14Effect();
    private loadF14Effect(laststate, state);
    playEffect(): void;
    stopEffect(): void;
    addCtrl(): void;
    private addCamera(laststate, state);
    private loadShader(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseMeshAndMatDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    private loadMesh(laststate, state);
    private loadMaterial(laststate, state);
    private useMeshAndMat(laststate, state);
    private loadShader(laststate, state);
    private addCamera(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UsePrefebDemo implements IState {
    app: gd3d.framework.application;
    assetMgr: gd3d.framework.assetMgr;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UsePrefebDemo2 implements IState {
    app: gd3d.framework.application;
    assetMgr: gd3d.framework.assetMgr;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseSceneDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    private useRawScene();
    private loadScene(laststate, state);
    private loadShader(laststate, state);
    private addCamera(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseTextureDemo implements IState {
    app: gd3d.framework.application;
    assetMgr: gd3d.framework.assetMgr;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    texture: gd3d.framework.texture;
    quad: gd3d.framework.transform;
    start(app: gd3d.framework.application): void;
    private loadTexture(laststate, state);
    private useTexture();
    private loadShader(laststate, state);
    private loadQuad(laststate, state);
    private addCtrl();
    update(delta: number): void;
}
declare class Test_CameraController {
    private static g_this;
    static instance(): Test_CameraController;
    gameObject: gd3d.framework.gameObject;
    app: gd3d.framework.application;
    target: gd3d.framework.camera;
    moveSpeed: number;
    movemul: number;
    wheelSpeed: number;
    rotateSpeed: number;
    keyMap: {
        [id: number]: boolean;
    };
    beRightClick: boolean;
    update(delta: number): void;
    cameras: gd3d.framework.camera[];
    add(camera: gd3d.framework.camera): void;
    rotAngle: gd3d.math.vector3;
    isInit: boolean;
    decideCam(target: gd3d.framework.camera): void;
    init(app: gd3d.framework.application): void;
    private moveVector;
    doMove(delta: number): void;
    doRotate(rotateX: number, rotateY: number): void;
    lookat(trans: gd3d.framework.transform): void;
    checkOnRightClick(mouseEvent: MouseEvent): boolean;
    private doMouseWheel(ev, isFirefox);
    remove(): void;
}
declare class CameraController {
    private static g_this;
    static instance(): CameraController;
    gameObject: gd3d.framework.gameObject;
    app: gd3d.framework.application;
    target: gd3d.framework.camera;
    moveSpeed: number;
    movemul: number;
    wheelSpeed: number;
    rotateSpeed: number;
    keyMap: {
        [id: number]: boolean;
    };
    beRightClick: boolean;
    update(delta: number): void;
    rotAngle: gd3d.math.vector3;
    isInit: boolean;
    init(app: gd3d.framework.application, target: gd3d.framework.camera): void;
    private moveVector;
    doMove(delta: number): void;
    doRotate(rotateX: number, rotateY: number): void;
    lookat(trans: gd3d.framework.transform): void;
    checkOnRightClick(mouseEvent: MouseEvent): boolean;
    private doMouseWheel(ev, isFirefox);
    remove(): void;
}
declare namespace dome {
    class GMesh {
        vf: number;
        vertexByteSize: number;
        mat: gd3d.framework.material;
        mesh: gd3d.framework.mesh;
        maxVerteCount: number;
        currentVerteCount: number;
        maxVboLen: number;
        realVboLen: number;
        vbodata: Float32Array;
        maxEboLen: number;
        realEboLen: number;
        ebodata: Uint16Array;
        constructor(mat: gd3d.framework.material, vCount: number, vf: number, webgl: WebGLRenderingContext);
        reset(): void;
        private temptPos;
        uploadMeshData(mat: gd3d.math.matrix, mesh: gd3d.framework.mesh, webgl: WebGLRenderingContext): void;
        mixToGLmesh(webgl: WebGLRenderingContext): void;
        private checkMeshCapacity(vertexcount, eboLen, webgl);
    }
    class mixMesh implements IState {
        app: gd3d.framework.application;
        prefab: gd3d.framework.transform;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        root: gd3d.framework.transform;
        picker: any[];
        obs: any;
        flag: boolean;
        start(app: gd3d.framework.application): void;
        refresh(): void;
        generateSignelObs(target: any): void;
        load(path: string, cb: any): void;
        loadPrefab(name: string, cb: any): void;
        update(delta: number): void;
        targets: gd3d.framework.transform[];
        matDic: {
            [matID: number]: gd3d.framework.transform[];
        };
        matinstance: {
            [matID: number]: gd3d.framework.material;
        };
        mixmeshDic: {
            [matID: number]: GMesh;
        };
        mixMesh(targets: gd3d.framework.transform[], vf?: number): {
            nobatch: gd3d.framework.transform[];
            batch: gd3d.framework.transform[];
            mixMeshId: number[];
        };
    }
}
declare namespace dome {
    class paowuxian implements IState {
        camera: gd3d.framework.camera;
        scene: gd3d.framework.scene;
        app: gd3d.framework.application;
        assetmgr: gd3d.framework.assetMgr;
        taskmgr: gd3d.framework.taskMgr;
        private paoLen;
        private paojia;
        private paodan;
        private guiji;
        private guanghuan;
        private orgPos;
        rotEuler: gd3d.math.vector3;
        gravity: number;
        speed: number;
        dir: gd3d.math.vector3;
        start(app: gd3d.framework.application): void;
        private loadShader(laststate, state);
        private gamerun(laststate, state);
        private paoKouPos;
        private timer;
        private forward;
        update(delta: number): void;
        private beNeedRecompute;
        private worldPoints;
        private targets;
        private worldStart;
        private startTrans;
        private worldEnd;
        private endTrans;
        private worldMiddle;
        private middleTrans;
        private detectTarget_2(targets1, targets2, info);
        private detectSecond_Colliders(target, info);
        private detectSecond_Collider(target, info);
        private detectSecond_Meshs(target, info);
        private detectSecond_Mesh(target, info);
        private linedetectcollider(start, end, targets, newtargets);
        private lineDetectMesh(start, end, target, info);
        private cam2;
        private camctr;
        private addcam();
        private addcube();
        private cubes;
        private addscaledCube(scale);
        getDirByRotAngle(euler: gd3d.math.vector3, dir: gd3d.math.vector3): void;
        private mesh;
        private lerpCount;
        private guanghuantoPaoJia;
        private pointArr;
        private endpos;
        private hPos;
        private startPos;
        getMeshData(anglex: number, gravity: number, speed: number, paoLen: number, paojiaPosY?: number): gd3d.framework.mesh;
        private initmesh(anglex, gravity, speed, paoLen, paojiaPosY?);
        private actived;
        private enableWASD;
        private addUI();
        private apply();
        private addBtn(text, x, y, func);
        private loadmesh(laststate, state);
        private intersects(LinePoints, mesh, matrix, outInfo);
        private intersectCollider(LinePoints, target, outInfo);
        private getRotAnlge(speed, h, g, target, forward);
        private fromToRotation(from, to, right);
    }
    class camCtr implements gd3d.framework.INodeComponent {
        gameObject: gd3d.framework.gameObject;
        type: string;
        private _target;
        private _worldOffset;
        private _distance;
        private _offset;
        private camrotAgnle;
        setTarget(target: gd3d.framework.transform, worldOffset?: gd3d.math.vector3): void;
        setRotAngle(yanle: number, xangle: number): void;
        setDistanceToTarget(distance: number): void;
        onPlay(): void;
        start(): void;
        private targetpos;
        update(delta: number): void;
        remove(): void;
        clone(): void;
    }
}
declare namespace dome {
    class paowuxian2 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        assetmgr: gd3d.framework.assetMgr;
        taskmgr: gd3d.framework.taskMgr;
        camera: gd3d.framework.camera;
        inputMgr: gd3d.framework.inputMgr;
        rooto2d: gd3d.framework.overlay2D;
        start(app: gd3d.framework.application): void;
        private pointDown;
        update(delta: number): void;
        private loadShader(laststate, state);
        private targets;
        private loadmesh(laststate, state);
        private addcam(laststate, state);
        paojia: gd3d.framework.transform;
        paodan: gd3d.framework.transform;
        cam2: gd3d.framework.gameObject;
        camctr: camCtr;
        testUI: gd3d.framework.transform2D;
        beUIFollow: boolean;
        hitPosition: gd3d.math.vector3;
        behit: boolean;
        middlePos: gd3d.math.vector3;
        gameInit(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate): void;
        addPaoDancam(): void;
        private targetPos;
        private floor;
        fire(): void;
        private beLaunched;
        private time;
        private totaltime;
        private fireBullet();
        private temp_pickInfo;
        private pickScene(fuc);
        gameupdate(delta: number): void;
        private temptPos;
        private temptdir;
        private lookpos;
        private lastPos;
        private realDIr;
        private winddisturb;
        private gravitydisturb;
        private onEndCollision;
        private updateBullet(delta);
        private screenpos;
        private updateUI();
        private targetRotation;
        private lastRotaion;
        private paoheight;
        private paoLen;
        private paokouPos;
        private beforeRotatePaojia();
        private onberforeFire;
        private beActiveRot;
        private rotTotalTime;
        private rottime;
        private onRotEnd;
        private updateRotPaojia(delta);
        private scaleAndAdd(from, scale, add, out);
        rayInstersetScene(ray: gd3d.framework.ray, fuc: (info: gd3d.framework.pickinfo) => void): void;
        intersetMesh(ray: gd3d.framework.ray, info: gd3d.framework.pickinfo, tran: gd3d.framework.transform): boolean;
        intersetColliders(ray: gd3d.framework.ray, trans: gd3d.framework.transform[]): gd3d.framework.pickinfo[];
        addcube(pos: gd3d.math.vector3, scale?: gd3d.math.vector3): gd3d.framework.transform;
        private addBtn(text, x, y, func);
        private adjustMiddlePoint(from, to, pos);
        private bessel(from, middle, to, t, out);
        private getBeselDir(from, middle, to, t, out);
        private getRotationByDir(dir, forward, out);
        private getRotAnlge(dir, forward);
        private fromToRotation(from, to, right);
    }
}
declare class physic2d_dome implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    static temp: gd3d.framework.transform2D;
    start(app: gd3d.framework.application): void;
    private createUI(astState, state);
    private crea2dWall(posx, posy, width, height, texture, root);
    private creatbox(posx, posy, width, height, texture, root);
    private loadTexture(lastState, state);
    update(delta: number): void;
}
declare namespace PhysicDemo {
    class physic_01 implements IState {
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        start(app: gd3d.framework.application): void;
        update(delta: number): void;
    }
}
declare namespace dome {
    class db_test_f14eff implements IState {
        rotEuler: number;
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        label: HTMLLabelElement;
        private loadShader(laststate, state);
        rot: gd3d.math.quaternion;
        start(app: gd3d.framework.application): void;
        model: gd3d.framework.transform;
        suitTrans: gd3d.framework.transform;
        suitSkin: gd3d.framework.skinnedMeshRenderer;
        private loadmesh(laststate, state);
        private loadWeapon(laststate, state);
        private beTrailParticle;
        private f14eff;
        private effPrefab;
        effbaseprefab: gd3d.framework.prefab;
        private loadEffectPrefab(laststate, state);
        SkillName: string;
        private loadSkill(laststate, state);
        private addcontroll(laststate, state);
        private beActive;
        private currentalpha;
        private addButton();
        private boneIndex;
        private testtrans;
        private addButton2();
        private addcam(laststate, state);
        role: gd3d.framework.transform;
        RoleName: string;
        aniPlayer: gd3d.framework.aniplayer;
        aniclips: gd3d.framework.animationClip[];
        private loadRole(laststate, state);
        tr: gd3d.framework.transform;
        count: number;
        beplay: boolean;
        a: gd3d.math.vector3;
        b: gd3d.math.vector3;
        c: gd3d.math.vector3;
        private enableMove;
        update(delta: number): void;
    }
}
declare class test_ChangeMaterial implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    cube: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    isCube: boolean;
    timer: number;
    material1: gd3d.framework.material;
    material2: gd3d.framework.material;
    taskmgr: gd3d.framework.taskMgr;
    private loadShader(laststate, state);
    private loadTexture(laststate, state);
    private addCam(laststate, state);
    private addCube(laststate, state);
    isMaterial1: boolean;
    private addBtn();
    private setMaterial(laststate, state);
    start(app: gd3d.framework.application): void;
    zeroPoint: gd3d.math.vector3;
    update(delta: number): void;
}
declare class test_ChangeMesh implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    cube: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    isCube: boolean;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class test_NewGameObject implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    cube: gd3d.framework.transform;
    camera: gd3d.framework.camera;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class test_NewScene implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class test_Sound implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskmgr: gd3d.framework.taskMgr;
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    time: number;
    private loadShader(laststate, state);
    private loadTexture(laststate, state);
    private addCam(laststate, state);
    private addCube(laststate, state);
    private addBtnLoadSound(laststate, state);
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class EffectElement extends gd3d.framework.transform {
    type: gd3d.framework.EffectElementTypeEnum;
    beLoop: boolean;
    name: string;
}
declare class test_effecteditor implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    effect: gd3d.framework.effectSystem;
    label: HTMLLabelElement;
    gui: lighttool.htmlui.gui;
    transformRoot: gd3d.framework.transform;
    effectSystem: gd3d.framework.effectSystem;
    effectSysData: gd3d.framework.EffectSystemData;
    setVal(val: string, property: string, data: any): void;
    start(app: gd3d.framework.application): void;
    private scaleChecked;
    private positionChecked;
    private eulerChecked;
    private length;
    private addElement();
    private play();
    private loadShader(laststate, state);
    private loadText(laststate, state);
    private loadEffect(laststate, state);
    private addButton();
    private getNameFromURL(path);
    private addcam(laststate, state);
    tr: gd3d.framework.transform;
    ttr: gd3d.framework.transform;
    eff: gd3d.framework.effectSystem;
    beclone: boolean;
    effectloaded: boolean;
    bestop: boolean;
    bereplay: boolean;
    update(delta: number): void;
}
declare namespace gd3d.framework {
    class HoverCameraScript extends gd3d.framework.behaviour {
        lookAtPoint: gd3d.math.vector3;
        lookAtTarget: gd3d.framework.transform;
        distance: number;
        minPanAngle: number;
        maxPanAngle: number;
        minTileAngle: number;
        maxTileAngle: number;
        scaleSpeed: number;
        private inputMgr;
        private _lastMouseX;
        private _lastMouseY;
        private _mouseDown;
        private _lastTouchX;
        private _lastTouchY;
        private _fingerTwo;
        private _lastDistance;
        private _panAngle;
        private _panRad;
        panAngle: number;
        private _tiltAngle;
        private _tiltRad;
        tiltAngle: number;
        onPlay(): void;
        start(): void;
        private cupTargetV3;
        update(delta: number): void;
        private onPointDown();
        private onPointUp();
        private onPointMove();
        private onWheel();
        private onTouch();
        remove(): void;
    }
}
declare let dat: any;
declare let Promise: any;
declare class datGui {
    private static _inited;
    static init(): Promise<void>;
    private static loadJs();
}
declare class physics3dDemoTool {
    static app: gd3d.framework.application;
    static scene: gd3d.framework.scene;
    static camera: gd3d.framework.camera;
    static astMgr: gd3d.framework.assetMgr;
    static iptMgr: gd3d.framework.inputMgr;
    static mats: {
        [name: string]: gd3d.framework.material;
    };
    static init(app: gd3d.framework.application): Promise<void>;
    static loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private static initMats();
    private static initCamera();
    private static addMat(name, color);
    private static tag_isCompound;
    private static tag_pos;
    private static tag_Rot;
    private static tag_resFun;
    static attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string, isCompound?: boolean): gd3d.framework.meshRenderer;
    static resetObj(mrs: gd3d.framework.meshRenderer[]): void;
    private static lastsleepTag;
    static ckBodySleeped(mrs: gd3d.framework.meshRenderer[]): void;
    private static defMatTag;
    private static cgDefMat(mr, isSleeping);
}
