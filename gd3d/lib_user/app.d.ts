/// <reference path="../lib/gd3d.d.ts" />
/// <reference path="../lib/htmlui.d.ts" />
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
    private initPlayer;
    private loadScene;
    private Goals;
    private PosRayNavmesh;
    pickDown(): void;
    private rayNavMesh;
    private enemys;
    private addEnemy;
    private pos;
    private tryFindingPath;
    private lastLine;
    private drawLine;
    private genLineMesh;
    private createAllPoint;
    private setRoadPoint;
    private points;
    private generateGeomtry;
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
    private addbtn;
}
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
    private loadShader;
    private loadRole;
    private loadSkill;
    private loadWeapon;
    private ctrlBtn;
    private addCam;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare namespace t {
    class light_d1 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader;
        private loadText;
        private addcube;
        private addcamandlight;
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
    private addBtn;
    private clearBtn;
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
declare class test_anim implements IState {
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
        private changeShader;
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
        private loadShader;
        private loadTexture;
        sh: gd3d.framework.shader;
        private initscene;
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
    private loadShader;
    private loadText;
    private addcube;
    private dragon;
    private loadModel;
    start(app: gd3d.framework.application): void;
    private text;
    private loadEffect;
    private addButton;
    private getNameFromURL;
    private addcam;
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
        private loadShader;
        private loadText;
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole;
        private weapon;
        private loadWeapon;
        sh: gd3d.framework.shader;
        cube2: gd3d.framework.transform;
        private initscene;
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
        private addbtn;
    }
}
declare namespace t {
    class test_light1 implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        tex: gd3d.framework.texture;
        private loadShader;
        private loadText;
        private addcube;
        private addcamandlight;
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
        private loadShader;
        dragon: gd3d.framework.transform;
        cameraPoint: gd3d.framework.transform;
        private loadmesh;
        private loadweapon;
        private test;
        camera: gd3d.framework.camera;
        private addCamera;
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
        private loadShader;
        private loadText;
        private addcamandlight;
        private addmetalmodel;
        private addAsiModel;
        start(app: gd3d.framework.application): void;
        private addinput;
        private addbtn;
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
    infos: {
        [boneCount: number]: {
            abName: string;
            prefabName: string;
            materialCount: number;
        };
    };
    init(): void;
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
        private loadShader;
        private loadText;
        cuber: gd3d.framework.meshRenderer;
        private normalCube;
        private addnormalcube;
        private addcube;
        private addcamandlight;
        start(app: gd3d.framework.application): void;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_pathAsset implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application): void;
        private loadShader;
        private loadTexture;
        private loadpath;
        private loadasset;
        sh: gd3d.framework.shader;
        private initscene;
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
        private addbtns;
        private addBtn;
    }
    function DBgetAtrans(mat: gd3d.framework.material, meshname?: string): gd3d.framework.transform;
    function DBgetMat(texname?: string, shaderstring?: string): gd3d.framework.material;
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
    class test_posteffect implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader;
        private loadText;
        private addcube;
        private addcamandlight;
        start(app: gd3d.framework.application): void;
        private addbtn;
        camera: gd3d.framework.camera;
        light: gd3d.framework.light;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare namespace t {
    class test_post_bloom implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader;
        private loadText;
        private addcamandlight;
        start(app: gd3d.framework.application): void;
        private addbtn;
        camera: gd3d.framework.camera;
        timer: number;
        taskmgr: gd3d.framework.taskMgr;
        update(delta: number): void;
    }
}
declare class test_loadprefab implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    refreshTexture(tran: gd3d.framework.transform): void;
    refreshAniclip(tran: gd3d.framework.transform, name: string): void;
    start(app: gd3d.framework.application): void;
    private changeShader;
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
        private loadShader;
        private loadText;
        private loadPvr;
        private changeShader;
        private addcam;
        private addcube;
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
    private collectMat;
    private setmat;
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
        private loadShader;
        private loadText;
        private addcam;
        private addcube;
        private loadRole;
        private playAniAndEffect;
        effect: gd3d.framework.effectSystem;
        effect2: gd3d.framework.effectSystem;
        private loadEffect;
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
        private loadShader;
        private loadText;
        private addcam;
        private addcube;
        private loadSoundInfe;
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
        private loadShader;
        private loadText;
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole;
        private weapon;
        private loadWeapon;
        sh: gd3d.framework.shader;
        cube2: gd3d.framework.transform;
        private initscene;
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
        private addbtn;
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
        private loadShader;
        private loadText;
        sh: gd3d.framework.shader;
        private initscene;
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
        private addbtn;
    }
}
declare namespace t {
    enum enumcheck {
        AA = 0,
        BB = 1,
        CC = 2
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
        private loadShader;
        private loadText;
        private addcube;
        private addcam;
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
declare class test_3DPhysics_baseShape implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    init(): void;
    initCamera(): void;
    ckBodySleeped(): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_compound implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private types;
    private sizes;
    private positions;
    private chairId;
    private crateChair;
    private targetTran;
    private boxTran;
    private cylinderTran;
    private floor;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private reStartDemo;
    private impulseTarget;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string, needReset?: boolean): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_freeze implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private targetTran;
    private boxTran;
    private cylinderTran;
    private floor;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private reStartDemo;
    private enumArr;
    private optStrs;
    private freezeDic;
    private applyFreezeOpt;
    private impulseTarget;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_ballandSocket implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_distance implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_hinge implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_prismatic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_slider implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_joint_wheel implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private connectedPivot;
    private mainPivot;
    private pole;
    private pole_1;
    addDisplayObj(): void;
    private tempV3;
    syncDisplayRT(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    private tcount;
    private time;
    update(delta: number): void;
}
declare let help_v2: gd3d.math.vector2;
declare class test_3DPhysics_kinematic implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    taskmgr: gd3d.framework.taskMgr;
    astMgr: gd3d.framework.assetMgr;
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    floor: gd3d.framework.transform;
    ctrBox: gd3d.framework.transform;
    init(): void;
    cachePickInfo: gd3d.framework.pickinfo;
    cacheRota: gd3d.math.quaternion;
    cache_y: number;
    onPonitMove([x, y]: [any, any]): void;
    updateRoate(): void;
    doRay(): void;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_hinge implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private motorSpeed;
    private targetMotor;
    private changeMotorSpeed;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_slider implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
    private boxTran;
    init(): void;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private tempV3;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private motorSpeed;
    private targetMotor;
    private changeMotorSpeed;
    private tcount;
    private time;
    update(delta: number): void;
}
declare class test_3DPhysics_motor_wheel implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    background: gd3d.framework.transform;
    parts: gd3d.framework.transform;
    timer: number;
    taskmgr: gd3d.framework.taskMgr;
    count: number;
    counttimer: number;
    astMgr: gd3d.framework.assetMgr;
    mrs: gd3d.framework.meshRenderer[];
    iptMgr: gd3d.framework.inputMgr;
    start(app: gd3d.framework.application): Promise<any>;
    mats: {
        [name: string]: gd3d.framework.material;
    };
    initMats(): void;
    private addMat;
    loadbySync(url: string): gd3d.threading.gdPromise<any>;
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
    private changeMotorSpeed;
    attachMesh(tran: gd3d.framework.transform, mat: gd3d.framework.material, meshName: string): gd3d.framework.meshRenderer;
    private guiMsg;
    setGUI(): void;
    private impulseBox;
    private force;
    private contactlocalPoint;
    private doImpulse;
    initCamera(): void;
    ckBodySleeped(): void;
    private tcount;
    private time;
    update(delta: number): void;
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
        private loadShader;
        private loadText;
        private addcam;
        foreground: gd3d.framework.transform;
        private addplane;
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
    private loadShader;
    private loadasset;
    private iniscene;
    private addbtns;
    private addbtn;
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
        private loadShader;
        private loadText;
        sh: gd3d.framework.shader;
        private initscene;
        private add3dmodelbeforeUi;
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
        private loadShader;
        private loadLongPrefab;
        private loadScene;
        private addCameraAndLight;
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
    private drawLine;
    private genMesh;
    private createAllPoint;
    private setPoint;
    private points;
    private generatePoint;
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
    private init;
    private PBRPath;
    private material;
    private skyName;
    private iblPath;
    private loadpbrRes;
    private loadpbrRes1;
    private loadpbrRes2;
    private loadpbrRes3;
    private loadpbrRes4;
    private loadTexture;
    private addCube;
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
    private addSphere;
    private init;
    private PBRPath;
    private material;
    private skyName;
    private iblPath;
    private loadpbrRes;
    private loadpbrRes1;
    private loadpbrRes2;
    private loadpbrRes3;
    private loadpbrRes4;
    private loadTexture;
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
    private loadScene;
    private colorMap;
    private getColor;
    private balls;
    private addBall;
    private pickLayer;
    pickDown(): void;
    private rayCollider;
    private points;
    private generateGeomtry;
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
    private addCamera;
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
declare class test_softCut implements IState {
    static temp: any;
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    taskmgr: gd3d.framework.taskMgr;
    assetMgr: gd3d.framework.assetMgr;
    rooto2d: gd3d.framework.overlay2D;
    start(app: gd3d.framework.application): void;
    private createUI;
    private loadTexture;
    update(delta: number): void;
}
declare class test_sssss implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    renderer: gd3d.framework.meshRenderer[];
    skinRenders: gd3d.framework.skinnedMeshRenderer[];
    taskmgr: gd3d.framework.taskMgr;
    lightcamera: gd3d.framework.camera;
    start(app: gd3d.framework.application): void;
    private loadpbrRes;
    private loadIBL;
    camera: gd3d.framework.camera;
    baihu: gd3d.framework.transform;
    timer: number;
    update(delta: number): void;
}
declare enum ShockType {
    Vertical = 0,
    Horizontal = 1,
    Both = 2
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
    private loadTexture;
    private addJoystick;
    leftAxis: gd3d.math.vector2;
    rightAxis: gd3d.math.vector2;
    private maxScale;
    private touchLeft;
    private touchRight;
    private mouseLeft;
    private mouseRight;
    readonly leftTouching: boolean;
    readonly rightTouching: boolean;
    private onMouseDown;
    private onMouseUp;
    private onMouseMove;
    private onTouchStart;
    private onTouchEnd;
    private onTouchMove;
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
        private loadShader;
        private loadTexture;
        private loadHeroPrefab;
        private loadEnemyPrefab;
        private loadScene;
        private cameraShock;
        private addCameraAndLight;
        private addJoystick;
        private addObject;
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
        private fire;
        private updateBullet;
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
        private loadShader;
        private loadText;
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength;
        private loadRole;
        private addcam;
        private addcube;
        start(app: gd3d.framework.application): void;
        private angularVelocity;
        private eulerAngle;
        private zeroPoint;
        update(delta: number): void;
    }
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
    private test;
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
    BOTTOM_RIGHT = 9
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
    private createUI;
    targetui: gd3d.framework.transform2D;
    private doLoad;
    private loadShaders;
    private loadTexture;
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
    private createUI;
    private loadTexture;
    update(delta: number): void;
    testFun(): void;
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
    private doMouseWheel;
    remove(): void;
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
    private doMouseWheel;
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
        private checkMeshCapacity;
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
        private loadShader;
        private gamerun;
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
        private detectTarget_2;
        private detectSecond_Colliders;
        private detectSecond_Collider;
        private detectSecond_Meshs;
        private detectSecond_Mesh;
        private linedetectcollider;
        private lineDetectMesh;
        private cam2;
        private camctr;
        private addcam;
        private addcube;
        private cubes;
        private addscaledCube;
        getDirByRotAngle(euler: gd3d.math.vector3, dir: gd3d.math.vector3): void;
        private mesh;
        private lerpCount;
        private guanghuantoPaoJia;
        private pointArr;
        private endpos;
        private hPos;
        private startPos;
        getMeshData(anglex: number, gravity: number, speed: number, paoLen: number, paojiaPosY?: number): gd3d.framework.mesh;
        private initmesh;
        private actived;
        private enableWASD;
        private addUI;
        private apply;
        private addBtn;
        private loadmesh;
        private intersects;
        private intersectCollider;
        private getRotAnlge;
        private fromToRotation;
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
        private loadShader;
        private targets;
        private loadmesh;
        private addcam;
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
        private fireBullet;
        private temp_pickInfo;
        private pickScene;
        gameupdate(delta: number): void;
        private temptPos;
        private temptdir;
        private lookpos;
        private lastPos;
        private realDIr;
        private winddisturb;
        private gravitydisturb;
        private onEndCollision;
        private updateBullet;
        private screenpos;
        private updateUI;
        private targetRotation;
        private lastRotaion;
        private paoheight;
        private paoLen;
        private paokouPos;
        private beforeRotatePaojia;
        private onberforeFire;
        private beActiveRot;
        private rotTotalTime;
        private rottime;
        private onRotEnd;
        private updateRotPaojia;
        private scaleAndAdd;
        rayInstersetScene(ray: gd3d.framework.ray, fuc: (info: gd3d.framework.pickinfo) => void): void;
        intersetMesh(ray: gd3d.framework.ray, info: gd3d.framework.pickinfo, tran: gd3d.framework.transform): boolean;
        intersetColliders(ray: gd3d.framework.ray, trans: gd3d.framework.transform[]): gd3d.framework.pickinfo[];
        addcube(pos: gd3d.math.vector3, scale?: gd3d.math.vector3): gd3d.framework.transform;
        private addBtn;
        private adjustMiddlePoint;
        private bessel;
        private getBeselDir;
        private getRotationByDir;
        private getRotAnlge;
        private fromToRotation;
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
    private createUI;
    private crea2dWall;
    private creatbox;
    private loadTexture;
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
        private loadShader;
        rot: gd3d.math.quaternion;
        start(app: gd3d.framework.application): void;
        model: gd3d.framework.transform;
        suitTrans: gd3d.framework.transform;
        suitSkin: gd3d.framework.skinnedMeshRenderer;
        private loadmesh;
        private loadWeapon;
        private beTrailParticle;
        private f14eff;
        private effPrefab;
        effbaseprefab: gd3d.framework.prefab;
        private loadEffectPrefab;
        SkillName: string;
        private loadSkill;
        private addcontroll;
        private beActive;
        private currentalpha;
        private addButton;
        private boneIndex;
        private testtrans;
        private addButton2;
        private addcam;
        role: gd3d.framework.transform;
        RoleName: string;
        aniPlayer: gd3d.framework.aniplayer;
        aniclips: gd3d.framework.animationClip[];
        private loadRole;
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
    private loadShader;
    private loadTexture;
    private addCam;
    private addCube;
    isMaterial1: boolean;
    private addBtn;
    private setMaterial;
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
    private loadShader;
    private loadTexture;
    private addCam;
    private addCube;
    private addBtnLoadSound;
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
    private addElement;
    private play;
    private loadShader;
    private loadText;
    private loadEffect;
    private addButton;
    private getNameFromURL;
    private addcam;
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
        private onPointDown;
        private onPointUp;
        private onPointMove;
        private onWheel;
        private onTouch;
        remove(): void;
    }
}
declare let dat: any;
declare let Promise: any;
declare class datGui {
    private static _inited;
    static init(): Promise<void>;
    private static loadJs;
}
declare class UseAniplayClipDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    aniClip: gd3d.framework.animationClip;
    taskMgr: gd3d.framework.taskMgr;
    aniplayer: gd3d.framework.aniplayer;
    private loadAniplayClip;
    private loadRole;
    private loadShader;
    private addCamera;
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
    private addBtn;
    private clearBtn;
    update(delta: any): void;
}
declare class UseAudioDemo implements IState {
    audioplay: gd3d.framework.AudioPlayer;
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    objCam: gd3d.framework.transform;
    audiobuf: AudioBuffer;
    private loadAudio;
    private addCamera;
    private addAudioPlay;
    private loadShader;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseF14EffectDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    eff: gd3d.framework.transform;
    effectSystems: gd3d.framework.f14EffectSystem;
    private useF14Effect;
    private loadF14Effect;
    playEffect(): void;
    stopEffect(): void;
    addCtrl(): void;
    private addCamera;
    private loadShader;
    start(app: gd3d.framework.application): void;
    update(delta: number): void;
}
declare class UseMeshAndMatDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr;
    private loadMesh;
    private loadMaterial;
    private useMeshAndMat;
    private loadShader;
    private addCamera;
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
    private useRawScene;
    private loadScene;
    private loadShader;
    private addCamera;
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
    private loadTexture;
    private useTexture;
    private loadShader;
    private loadQuad;
    private addCtrl;
    update(delta: number): void;
}
