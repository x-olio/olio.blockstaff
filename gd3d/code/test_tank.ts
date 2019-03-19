/// <reference path="../lib/gd3d.d.ts" />

enum ShockType
{
    Vertical,
    Horizontal,
    Both
}

@gd3d.reflect.nodeComponent
class CameraShock implements gd3d.framework.INodeComponent
{
    gameObject: gd3d.framework.gameObject;
    private isPlaying: boolean;
    private fade: boolean;
    private oldTranslate: gd3d.math.vector3;
    private shockType: ShockType;
    private strength: number;
    private life: number;
    private ticker: number;
    start()
    {
        this.isPlaying = false;
    }

    onPlay(){
        
    }
    play(strength: number = 0.2, life: number = 0.5, fade: boolean = false, shockType: ShockType = ShockType.Both)
    {
        if (this.oldTranslate == null)
            this.oldTranslate = new gd3d.math.vector3();
        gd3d.math.vec3Clone(this.gameObject.transform.localTranslate, this.oldTranslate);
        this.isPlaying = true;
        this.strength = strength;
        this.ticker = this.life = life;
        this.fade = fade;
        this.shockType = shockType;
    }
    update(delta: number)
    {
        if (this.isPlaying)
        {
            if (this.ticker > 0)
            {
                this.ticker -= delta;
                let s = this.fade ? this.strength * (this.ticker / this.life) : this.strength;

                if (this.shockType == ShockType.Horizontal || this.shockType == ShockType.Both)
                    this.gameObject.transform.localTranslate.x = this.oldTranslate.x + (Math.random() - 0.5) * s;
                if (this.shockType == ShockType.Vertical || this.shockType == ShockType.Both)
                    this.gameObject.transform.localTranslate.y = this.oldTranslate.y + (Math.random() - 0.5) * s;

                this.gameObject.transform.markDirty();
            }
            else
            {
                this.gameObject.transform.localTranslate.x = this.oldTranslate.x;
                this.gameObject.transform.localTranslate.y = this.oldTranslate.y;
                this.isPlaying = false;
            }
        }
    }
    remove()
    {

    }
    clone()
    {

    }
}

class Joystick
{
    app: gd3d.framework.application;
    overlay2d: gd3d.framework.overlay2D;
    private joystickLeft0: gd3d.framework.transform2D;
    private joystickLeft1: gd3d.framework.transform2D;
    private joystickRight0: gd3d.framework.transform2D;
    private joystickRight1: gd3d.framework.transform2D;
    private taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();

    triggerFunc: Function;

    init(app: gd3d.framework.application, overlay2d: gd3d.framework.overlay2D)
    {
        this.app = app;
        this.overlay2d = overlay2d;

        this.taskmgr.addTaskCall(this.loadTexture.bind(this));
        this.taskmgr.addTaskCall(this.addJoystick.bind(this));

        document.addEventListener("mousedown", (e) => { this.onMouseDown(e); });
        document.addEventListener("mouseup", (e) => { this.onMouseUp(e); });
        document.addEventListener("mousemove", (e) => { this.onMouseMove(e); });
        document.addEventListener("touchstart", (e) => { this.onTouchStart(e); e.preventDefault(); });
        document.addEventListener("touchend", (e) => { this.onTouchEnd(e); e.preventDefault(); });
        document.addEventListener("touchmove", (e) => { this.onTouchMove(e); e.preventDefault(); });
    }

    private loadTexture(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        this.app.getAssetMgr().load("res/joystick0.png", gd3d.framework.AssetTypeEnum.Auto, (s0) =>
        {
            if (s0.isfinish)
            {
                this.app.getAssetMgr().load("res/joystick1.png", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
                {
                    if (s1.isfinish)
                    {
                        state.finish = true;
                    }
                    else
                    {
                        state.error = true;
                    }
                });
            }
            else
            {
                state.error = true;
            }
        });
    }

    private addJoystick(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        {//left
            this.joystickLeft0 = new gd3d.framework.transform2D();
            this.joystickLeft0.name = "left0";
            this.joystickLeft0.width = 256;
            this.joystickLeft0.height = 256;
            this.joystickLeft0.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickLeft0.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.16, window.innerHeight * 0.75);
            let img0 = this.joystickLeft0.addComponent("image2D") as gd3d.framework.image2D;
            img0.imageType = gd3d.framework.ImageType.Simple;
            let tex0 = this.app.getAssetMgr().getAssetByName("joystick0.png") as gd3d.framework.texture;
            img0.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickLeft0);
            this.joystickLeft0.markDirty();

            this.joystickLeft1 = new gd3d.framework.transform2D();
            this.joystickLeft1.name = "left1";
            this.joystickLeft1.width = 256;
            this.joystickLeft1.height = 256;
            this.joystickLeft1.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickLeft1.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.16, window.innerHeight * 0.75);
            let img1 = this.joystickLeft1.addComponent("image2D") as gd3d.framework.image2D;
            img1.imageType = gd3d.framework.ImageType.Simple;
            let tex1 = this.app.getAssetMgr().getAssetByName("joystick1.png") as gd3d.framework.texture;
            img1.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickLeft1);
            this.joystickLeft1.markDirty();
        }
        {//right
            this.joystickRight0 = new gd3d.framework.transform2D();
            this.joystickRight0.name = "right0";
            this.joystickRight0.width = 256;
            this.joystickRight0.height = 256;
            this.joystickRight0.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickRight0.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.84, window.innerHeight * 0.75);
            let img0 = this.joystickRight0.addComponent("image2D") as gd3d.framework.image2D;
            img0.imageType = gd3d.framework.ImageType.Simple;
            let tex0 = this.app.getAssetMgr().getAssetByName("joystick0.png") as gd3d.framework.texture;
            img0.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickRight0);
            this.joystickRight0.markDirty();

            this.joystickRight1 = new gd3d.framework.transform2D();
            this.joystickRight1.name = "right1";
            this.joystickRight1.width = 256;
            this.joystickRight1.height = 256;
            this.joystickRight1.pivot = new gd3d.math.vector2(0.5, 0.5);
            this.joystickRight1.localTranslate = new gd3d.math.vector2(window.innerWidth * 0.84, window.innerHeight * 0.75);
            let img1 = this.joystickRight1.addComponent("image2D") as gd3d.framework.image2D;
            img1.imageType = gd3d.framework.ImageType.Simple;
            let tex1 = this.app.getAssetMgr().getAssetByName("joystick1.png") as gd3d.framework.texture;
            img1.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            this.overlay2d.addChild(this.joystickRight1);
            this.joystickRight1.markDirty();
        }

        state.finish = true;
    }

    leftAxis: gd3d.math.vector2 = new gd3d.math.vector2(0, 0);
    rightAxis: gd3d.math.vector2 = new gd3d.math.vector2(0, 0);
    private maxScale: number = 128;
    private touchLeft: number = 0;
    private touchRight: number = 0;
    private mouseLeft: boolean = false;
    private mouseRight: boolean = false;

    get leftTouching(): boolean
    {
        return this.touchLeft != 0;
    }

    get rightTouching(): boolean
    {
        return this.touchRight != 0;
    }

    private onMouseDown(e: MouseEvent)
    {
        if (e.clientX <= this.overlay2d.canvas.pixelWidth / 2)
        {
            this.mouseLeft = true;

            let v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else
            {
                this.joystickLeft1.localTranslate.x = e.clientX;
                this.joystickLeft1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else
        {
            this.mouseRight = true;

            let v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else
            {
                this.joystickRight1.localTranslate.x = e.clientX;
                this.joystickRight1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    }

    private onMouseUp(e: MouseEvent)
    {
        if (this.mouseRight)
        {
            if (this.triggerFunc != null)
            {
                this.triggerFunc();
            }
        }

        this.mouseLeft = false;
        this.joystickLeft1.localTranslate.x = this.joystickLeft0.localTranslate.x;
        this.joystickLeft1.localTranslate.y = this.joystickLeft0.localTranslate.y;
        this.leftAxis = new gd3d.math.vector2(0, 0);
        this.joystickLeft1.markDirty();

        this.mouseRight = false;
        this.joystickRight1.localTranslate.x = this.joystickRight0.localTranslate.x;
        this.joystickRight1.localTranslate.y = this.joystickRight0.localTranslate.y;
        this.rightAxis = new gd3d.math.vector2(0, 0);
        this.joystickRight1.markDirty();
    }

    private onMouseMove(e: MouseEvent)
    {
        if (this.mouseLeft)
        {
            let v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else
            {
                this.joystickLeft1.localTranslate.x = e.clientX;
                this.joystickLeft1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        if (this.mouseRight)
        {
            let v = new gd3d.math.vector2(e.clientX, e.clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else
            {
                this.joystickRight1.localTranslate.x = e.clientX;
                this.joystickRight1.localTranslate.y = e.clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    }

    private onTouchStart(e: TouchEvent)
    {
        if (e.touches[0].clientX <= this.overlay2d.canvas.pixelWidth / 2)
        {
            this.touchLeft = e.touches[0].identifier;
            let v = new gd3d.math.vector2(e.touches[0].clientX, e.touches[0].clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else
            {
                this.joystickLeft1.localTranslate.x = e.touches[0].clientX;
                this.joystickLeft1.localTranslate.y = e.touches[0].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else
        {
            this.touchRight = e.touches[0].identifier;
            let v = new gd3d.math.vector2(e.touches[0].clientX, e.touches[0].clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else
            {
                this.joystickRight1.localTranslate.x = e.touches[0].clientX;
                this.joystickRight1.localTranslate.y = e.touches[0].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }

        if (e.touches[1] != null && e.touches[1].clientX <= this.overlay2d.canvas.pixelWidth / 2 && this.touchLeft == 0)
        {
            this.touchLeft = e.touches[1].identifier;
            let v = new gd3d.math.vector2(e.touches[1].clientX, e.touches[1].clientY);
            gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
            }
            else
            {
                this.joystickLeft1.localTranslate.x = e.touches[1].clientX;
                this.joystickLeft1.localTranslate.y = e.touches[1].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
            this.joystickLeft1.markDirty();
        }
        else if (e.touches[1] != null && e.touches[1].clientX > this.overlay2d.canvas.pixelWidth / 2 && this.touchRight == 0)
        {
            this.touchRight = e.touches[1].identifier;
            let v = new gd3d.math.vector2(e.touches[1].clientX, e.touches[1].clientY);
            gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
            if (gd3d.math.vec2Length(v) > this.maxScale)
            {
                gd3d.math.vec2Normalize(v, v);
                gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
            }
            else
            {
                this.joystickRight1.localTranslate.x = e.touches[1].clientX;
                this.joystickRight1.localTranslate.y = e.touches[1].clientY;
            }
            gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
            this.joystickRight1.markDirty();
        }
    }

    private onTouchEnd(e: TouchEvent)
    {
        if (this.touchLeft)
        {
            var flag = false;
            for (let i = 0; i < e.touches.length; i++)
            {
                if (this.touchLeft == e.touches[i].identifier)
                {
                    flag = true;
                }
            }
            if (!flag)
            {
                this.touchLeft = 0;

                this.joystickLeft1.localTranslate.x = this.joystickLeft0.localTranslate.x;
                this.joystickLeft1.localTranslate.y = this.joystickLeft0.localTranslate.y;
                this.leftAxis.x = 0;
                this.leftAxis.y = 0;
                this.joystickLeft1.markDirty();
            }
        }

        if (this.touchRight)
        {
            var flag = false;
            for (let i = 0; i < e.touches.length; i++)
            {
                if (this.touchRight == e.touches[i].identifier)
                {
                    flag = true;
                }
            }
            if (!flag)
            {
                this.touchRight = 0;

                this.joystickRight1.localTranslate.x = this.joystickRight0.localTranslate.x;
                this.joystickRight1.localTranslate.y = this.joystickRight0.localTranslate.y;
                this.rightAxis.x = 0;
                this.rightAxis.y = 0;
                this.joystickRight1.markDirty();

                if (this.triggerFunc != null)
                {
                    this.triggerFunc();
                }
            }
        }
    }

    private onTouchMove(e: TouchEvent)
    {
        if (this.touchLeft != 0)
        {
            let index = -1;
            if (this.touchLeft == e.touches[0].identifier)
            {
                index = 0;
            }
            else if (e.touches[1] != null && this.touchLeft == e.touches[1].identifier)
            {
                index = 1;
            }
            if (index != -1)
            {
                let v = new gd3d.math.vector2(e.touches[index].clientX, e.touches[index].clientY);
                gd3d.math.vec2Subtract(v, this.joystickLeft0.localTranslate, v);
                if (gd3d.math.vec2Length(v) > this.maxScale)
                {
                    gd3d.math.vec2Normalize(v, v);
                    gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                    gd3d.math.vec2Add(this.joystickLeft0.localTranslate, v, this.joystickLeft1.localTranslate);
                }
                else
                {
                    this.joystickLeft1.localTranslate.x = e.touches[index].clientX;
                    this.joystickLeft1.localTranslate.y = e.touches[index].clientY;
                }
                gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.leftAxis);
                this.joystickLeft1.markDirty();
            }
        }
        if (this.touchRight != 0)
        {
            let index = -1;
            if (this.touchRight == e.touches[0].identifier)
            {
                index = 0;
            }
            else if (e.touches[1] != null && this.touchRight == e.touches[1].identifier)
            {
                index = 1;
            }
            if (index != -1)
            {
                let v = new gd3d.math.vector2(e.touches[index].clientX, e.touches[index].clientY);
                gd3d.math.vec2Subtract(v, this.joystickRight0.localTranslate, v);
                if (gd3d.math.vec2Length(v) > this.maxScale)
                {
                    gd3d.math.vec2Normalize(v, v);
                    gd3d.math.vec2ScaleByNum(v, this.maxScale, v);
                    gd3d.math.vec2Add(this.joystickRight0.localTranslate, v, this.joystickRight1.localTranslate);
                }
                else
                {
                    this.joystickRight1.localTranslate.x = e.touches[index].clientX;
                    this.joystickRight1.localTranslate.y = e.touches[index].clientY;
                }
                gd3d.math.vec2ScaleByNum(v, 1.0 / this.maxScale, this.rightAxis);
                this.joystickRight1.markDirty();
            }
        }
    }

    update(delta: number)
    {
        this.taskmgr.move(delta);
    }
}

namespace demo
{
    export class TankGame implements IState
    {
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
        cubes: gd3d.framework.transform[] = [];
        walls: gd3d.framework.transform[] = [];
        overlay2d: gd3d.framework.overlay2D;
        joystick: Joystick;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();

        tankMoveSpeed: number = 4;
        tankRotateSpeed: gd3d.math.vector3 = new gd3d.math.vector3(0, 72, 0);
        gunRotateSpeed: gd3d.math.vector3 = new gd3d.math.vector3(0, 150, 0);
        angleLimit: number = 5;

        colVisible: boolean = false;

        private label: HTMLDivElement;

        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if(s.isfinish)
                {
                    state.finish = true;
                }
            });
        }

        private loadTexture(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if(s.isfinish)
                {
                    state.finish = true;
                }
            });
        }

        private loadHeroPrefab(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/prefabs/tank01/tank01.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("tank01.prefab.json") as gd3d.framework.prefab;
                    this.heroTank = _prefab.getCloneTrans();
                    this.scene.addChild(this.heroTank);
                    this.heroTank.localScale = new gd3d.math.vector3(4, 4, 4);
                    this.heroTank.localTranslate = new gd3d.math.vector3(0, 0, 0);

                    var col = this.heroTank.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
                    col.center = new gd3d.math.vector3(0, 0.2, 0);
                    col.size = new gd3d.math.vector3(0.46, 0.4, 0.54);
                    col.colliderVisible = this.colVisible;

                    this.heroGun = this.heroTank.find("tank_up");
                    this.heroSlot = this.heroGun.find("slot");

                    state.finish = true;
                }
            });
        }

        private loadEnemyPrefab(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/prefabs/tank02/tank02.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("tank02.prefab.json") as gd3d.framework.prefab;
                    this.enemyTank = _prefab.getCloneTrans();
                    this.scene.addChild(this.enemyTank);
                    this.enemyTank.localScale = new gd3d.math.vector3(4, 4, 4);
                    this.enemyTank.localTranslate = new gd3d.math.vector3(0, 0, -6);

                    var col = this.enemyTank.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
                    col.center = new gd3d.math.vector3(0, 0.2, 0);
                    col.size = new gd3d.math.vector3(0.46, 0.4, 0.54);
                    col.colliderVisible = this.colVisible;

                    this.enemyGun = this.enemyTank.find("tank_up");
                    this.enemySlot = this.enemyGun.find("slot");

                    state.finish = true;
                }
            });
        }

        private loadScene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.app.getAssetMgr().load("res/scenes/test_scene/test_scene.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            {
                if (s.isfinish)
                {
                    var _scene: gd3d.framework.rawscene = this.app.getAssetMgr().getAssetByName("test_scene.scene.json") as gd3d.framework.rawscene;
                    var _root = _scene.getSceneRoot();
                    this.scene.addChild(_root);
                    _root.localTranslate.y = -0.1;
                    for (var i = 0; i < 8; i++)
                    {
                        var tran = _root.find("wall" + i);
                        var col = tran.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
                        col.colliderVisible = this.colVisible;
                        this.walls.push(tran);
                    }

                    this.app.getScene().lightmaps = [];
                    _scene.useLightMap(this.app.getScene());

                    state.finish = true;
                }
            });
        }

        private cameraShock: CameraShock;
        private addCameraAndLight(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            var tranCam = new gd3d.framework.transform();
            tranCam.name = "Cam";
            this.scene.addChild(tranCam);
            this.camera = tranCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.1;
            this.camera.far = 200;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
            this.cameraShock = tranCam.gameObject.addComponent("CameraShock") as CameraShock;
            tranCam.localTranslate = new gd3d.math.vector3(0, 20, -16);
            tranCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranCam.markDirty();

            let list: string[] = [
                "标准",
                "马赛克",
                "径向模糊",
                "旋转扭曲",
                "桶模糊",
                "灰度图",
                "棕褐色调",
                "反色",
                "高斯滤波",
                "均值滤波",
                "锐化",
                "膨胀",
                "腐蚀",
                "HDR"
            ];

            var select = document.createElement("select");
            select.style.top = "240px";
            select.style.right = "0px";
            select.style.position = "absolute";
            this.app.container.appendChild(select);
            for (let i = 0; i < list.length; i++)
            {
                let op = document.createElement("option");
                op.value = i.toString();
                op.innerText = list[i];
                select.appendChild(op);
            }
            select.onchange = () => 
            {
                this.camera.postQueues = [];

                var color = new gd3d.framework.cameraPostQueue_Color();
                color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, 2048, 2048, true, false);
                this.camera.postQueues.push(color);
                var textcolor = new gd3d.framework.texture("_color");
                textcolor.glTexture = color.renderTarget;

                if (select.value == "0")
                {
                    this.camera.postQueues = [];
                }
                else if (select.value == "1")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("mosaic.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "2")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("radial_blur.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_Level", 25);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "3")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("contort.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_UD", 120);
                    this.postQuad.material.setFloat("_UR", 0.3);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "4")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("barrel_blur.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_Power", 0.3);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "5")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 1);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "6")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 2);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "7")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 3);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "8")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 4);
                    this.postQuad.material.setFloat("_Step", 2);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "9")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 5);
                    this.postQuad.material.setFloat("_Step", 2);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "10")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 6);
                    this.postQuad.material.setFloat("_Step", 0.1);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "11")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 7);
                    this.postQuad.material.setFloat("_Step", 0.3);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "12")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("filter_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_FilterType", 8);
                    this.postQuad.material.setFloat("_Step", 0.3);
                    this.camera.postQueues.push(this.postQuad);
                }
                else if (select.value == "13")
                {
                    this.postQuad = new gd3d.framework.cameraPostQueue_Quad();
                    this.postQuad.material.setShader(this.scene.app.getAssetMgr().getShader("hdr_quad.shader.json"));
                    this.postQuad.material.setTexture("_MainTex", textcolor);
                    this.postQuad.material.setFloat("_K", 1.5);
                    this.camera.postQueues.push(this.postQuad);
                }
            };

            var tranLight = new gd3d.framework.transform();
            tranLight.name = "light";
            this.scene.addChild(tranLight);
            this.light = tranLight.gameObject.addComponent("light") as gd3d.framework.light;
            this.light.type = gd3d.framework.LightTypeEnum.Direction;
            tranLight.localTranslate.x = 5;
            tranLight.localTranslate.y = 5;
            tranLight.localTranslate.z = -5;
            tranLight.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            tranLight.markDirty();

            state.finish = true;
        }

        private addJoystick(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            this.overlay2d = new gd3d.framework.overlay2D();
            // this.overlay2d.autoAsp = false;
            this.overlay2d.canvas.pixelWidth = window.innerWidth;
            this.overlay2d.canvas.pixelHeight = window.innerHeight;
            this.camera.addOverLay(this.overlay2d);

            this.joystick = new Joystick();
            this.joystick.init(this.app, this.overlay2d);
            this.joystick.triggerFunc = () => 
            {
                if (this.fireTick >= this.fireStep) 
                {
                    this.fireTick = 0;
                    this.fire();
                }
            };

            state.finish = true;
        }

        private addObject(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
        {
            {//add some puppets
                var n = 2;
                for (var i = 0; i < n; i++)
                {
                    let cube = new gd3d.framework.transform();
                    cube.name = "cube" + i;
                    cube.localScale = new gd3d.math.vector3(3, 3, 3);
                    cube.localTranslate = new gd3d.math.vector3(-2 * (n - 1) + i * 4, 2, 16);
                    this.scene.addChild(cube);
                    let filter = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                    let smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    filter.mesh = smesh;
                    let renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    var shader = this.app.getAssetMgr().getShader("light1.shader.json");
                    if (shader != null)
                    {
                        renderer.materials = [];
                        renderer.materials.push(new gd3d.framework.material());
                        renderer.materials[0].setShader(shader);
                        let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                        renderer.materials[0].setTexture("_MainTex", texture);
                    }
                    let col = cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
                    // col.size = new gd3d.math.vector3(1, 1, 1);
                    col.colliderVisible = this.colVisible;
                    cube.markDirty();
                    this.cubes.push(cube);
                }
            }

            state.finish = true;
        }

        private keyMap: { [id: number]: boolean } = {};
        start(app: gd3d.framework.application)
        {
            this.label = document.getElementById("Label") as HTMLDivElement;

            this.app = app;
            this.scene = app.getScene();

            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadTexture.bind(this));
            this.taskmgr.addTaskCall(this.loadHeroPrefab.bind(this));
            this.taskmgr.addTaskCall(this.loadEnemyPrefab.bind(this));
            this.taskmgr.addTaskCall(this.loadScene.bind(this));
            this.taskmgr.addTaskCall(this.addCameraAndLight.bind(this));
            this.taskmgr.addTaskCall(this.addObject.bind(this));
            this.taskmgr.addTaskCall(this.addJoystick.bind(this));

            document.addEventListener("keydown", (e) => { this.keyMap[e.keyCode] = true; });
        }

        update(delta: number)
        {
            this.taskmgr.move(delta);
            if (this.joystick != null)
            {
                this.joystick.update(delta);
            }

            this.tankControl(delta);
            
            this.updateBullet(delta);

            for (var i = 0; i < this.bulletList.length; i++)
            {
                let col = this.bulletList[i].transform.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
                for (var j = 0; j < this.cubes.length; j++)
                {
                    let c = this.cubes[j];
                    if (c != null && col.intersectsTransform(c))
                    {
                        this.scene.removeChild(c);
                        c.dispose();
                        this.bulletList[i].life = 0;
                        break;
                    }
                }
            }

            this.fireTick += delta;
        }

        testTankCol(tran: gd3d.framework.transform): boolean
        {
            var col = tran.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;

            for (var i = 0; i < this.cubes.length; i++)
            {
                let c = this.cubes[i].gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
                if (c != null && col.obb.intersects(c.obb))
                {
                    return true;
                }
            }
            for (var i = 0; i < this.walls.length; i++)
            {
                let c = this.walls[i].gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
                if (col.obb.intersects(c.obb))
                {
                    return true;
                }
            }
            let c = this.enemyTank.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
            if (col.obb.intersects(c.obb))
            {
                return true;
            }
            return false;
        }

        tempTran: gd3d.framework.transform;
        tankControl(delta: number)
        {
            if (this.joystick != null)
            {
                var targetAngle = new gd3d.math.vector3();
                var goForward = true;
                if (gd3d.math.vec2Length(this.joystick.leftAxis) > 0.05)
                {// tank rotate
                    let point = new gd3d.math.vector3(this.joystick.leftAxis.x, 0, -this.joystick.leftAxis.y);
                    gd3d.math.vec3Add(this.heroTank.getWorldTranslate(), point, point);
                    let quat = new gd3d.math.quaternion();
                    gd3d.math.quatLookat(this.heroTank.getWorldTranslate(), point, quat);
                    gd3d.math.quatToEulerAngles(quat, targetAngle);
                    let rotateSpeed = new gd3d.math.vector3();
                    gd3d.math.vec3ScaleByNum(this.tankRotateSpeed, delta, rotateSpeed);
                    let d = Math.abs(this.heroTank.localEulerAngles.y - targetAngle.y);
                    if (d > 180)
                    {
                        d = 360 - d;
                    }
                    if (d <= 90)
                    {
                        goForward = true;
                    }
                    else
                    {
                        if (targetAngle.y > 0)
                        {
                            targetAngle.y -= 180;
                        }
                        else
                        {
                            targetAngle.y += 180;
                        }
                        goForward = false;
                    }
                    if (d > rotateSpeed.y)
                    {
                        let vec = new gd3d.math.vector3();
                        if (this.heroTank.localEulerAngles.y > targetAngle.y && this.heroTank.localEulerAngles.y - targetAngle.y < 180
                        || targetAngle.y > this.heroTank.localEulerAngles.y && targetAngle.y - this.heroTank.localEulerAngles.y >= 180)
                        {
                            gd3d.math.vec3Subtract(this.heroTank.localEulerAngles, rotateSpeed, vec);
                        }
                        else
                        {
                            gd3d.math.vec3Add(this.heroTank.localEulerAngles, rotateSpeed, vec);
                        }
                        // var temp = new gd3d.math.vector3();
                        // gd3d.math.vec3Clone(this.heroTank.localEulerAngles, temp);
                        this.heroTank.localEulerAngles = vec;
                        // if (this.testTankCol(this.heroTank))
                        // {
                        //     this.heroTank.localEulerAngles = temp;
                        // }
                    }
                    else
                    {
                        // var temp = new gd3d.math.vector3();
                        // gd3d.math.vec3Clone(this.heroTank.localEulerAngles, temp);
                        this.heroTank.localEulerAngles = targetAngle;
                        // if (this.testTankCol(this.heroTank))
                        // {
                        //     this.heroTank.localEulerAngles = temp;
                        // }
                    }
                    this.heroTank.markDirty();
                }
                if (gd3d.math.vec2Length(this.joystick.leftAxis) > 0.05)
                {// tank move
                    let speed = 0;
                    if (Math.abs(this.heroTank.localEulerAngles.y - targetAngle.y) < this.angleLimit)
                    {
                        speed = this.tankMoveSpeed * delta;
                    }
                    else
                    {
                        speed = this.tankMoveSpeed * delta * 0.8;
                    }
                    let v = new gd3d.math.vector3();
                    this.heroTank.getForwardInWorld(v);
                    gd3d.math.vec3ScaleByNum(v, speed, v);
                    if (!goForward)
                    {
                        gd3d.math.vec3ScaleByNum(v, -1, v);
                    }
                    let col = this.heroTank.gameObject.getComponent("boxcollider") as gd3d.framework.boxcollider;
                    let f = false;
                    let r = false;
                    let l = false;
                    gd3d.math.vec3Add(col.obb.center, v, col.obb.center);
                    f = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v, col.obb.center);

                    let q = new gd3d.math.quaternion();
                    let v1 = new gd3d.math.vector3();
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, 45, q);
                    gd3d.math.quatTransformVector(q, v, v1);
                    gd3d.math.vec3ScaleByNum(v1, 0.5, v1);
                    gd3d.math.vec3Add(col.obb.center, v1, col.obb.center);
                    r = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v1, col.obb.center);

                    let v2 = new gd3d.math.vector3();
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, -45, q);
                    gd3d.math.quatTransformVector(q, v, v2);
                    gd3d.math.vec3ScaleByNum(v2, 0.5, v2);
                    gd3d.math.vec3Add(col.obb.center, v2, col.obb.center);
                    l = this.testTankCol(this.heroTank);
                    gd3d.math.vec3Subtract(col.obb.center, v2, col.obb.center);

                    if (!f)
                    {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v, this.heroTank.localTranslate);
                    }
                    else if (!r && l)
                    {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v1, this.heroTank.localTranslate);
                    }
                    else if (r && !l)
                    {
                        gd3d.math.vec3Add(this.heroTank.localTranslate, v2, this.heroTank.localTranslate);
                    }

                    this.heroTank.markDirty();
                }
                if (gd3d.math.vec2Length(this.joystick.rightAxis) > 0.2)
                {// gun rotate
                    let point = new gd3d.math.vector3(this.joystick.rightAxis.x, 0, -this.joystick.rightAxis.y);
                    gd3d.math.vec3Add(this.heroGun.getWorldTranslate(), point, point);
                    let quat = new gd3d.math.quaternion();
                    gd3d.math.quatLookat(this.heroGun.getWorldTranslate(), point, quat);
                    let vec = new gd3d.math.vector3();
                    gd3d.math.quatToEulerAngles(quat, vec);
                    gd3d.math.vec3Subtract(vec, this.heroTank.localEulerAngles, vec);
                    if (vec.y > 180)
                    {
                        vec.y -= 360;
                    }
                    if (vec.y < -180)
                    {
                        vec.y += 360;
                    }
                    let rotateSpeed = new gd3d.math.vector3();
                    gd3d.math.vec3ScaleByNum(this.gunRotateSpeed, delta, rotateSpeed);
                    if (Math.abs(this.heroGun.localEulerAngles.y - vec.y) > rotateSpeed.y)
                    {
                        if (this.heroGun.localEulerAngles.y > vec.y && this.heroGun.localEulerAngles.y - vec.y < 180
                        || vec.y > this.heroGun.localEulerAngles.y && vec.y - this.heroGun.localEulerAngles.y >= 180)
                        {
                            gd3d.math.vec3Subtract(this.heroGun.localEulerAngles, rotateSpeed, vec);
                        }
                        else
                        {
                            gd3d.math.vec3Add(this.heroGun.localEulerAngles, rotateSpeed, vec);
                        }
                        this.heroGun.localEulerAngles = vec;
                    }
                    else
                    {
                        this.heroGun.localEulerAngles = vec;
                    }
                    this.heroGun.markDirty();
                }

                if (this.camera != null)
                {
                    this.camera.gameObject.transform.localTranslate.x = this.heroTank.localTranslate.x;
                    this.camera.gameObject.transform.localTranslate.y = this.heroTank.localTranslate.y + 20;
                    this.camera.gameObject.transform.localTranslate.z = this.heroTank.localTranslate.z - 16;
                    this.camera.gameObject.transform.markDirty();
                }
            }
            
        }

        bulletId = 0;
        bulletList = [];
        bulletSpeed = 30;
        fireStep = 0.5;
        fireTick = 0;
        private fire()
        {
            var tran = new gd3d.framework.transform();
            tran.name = "bullet" + this.bulletId;
            tran.localScale = new gd3d.math.vector3(0.2, 0.2, 0.2);
            tran.localTranslate = this.heroSlot.getWorldTranslate();
            this.scene.addChild(tran);
            var filter = tran.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            var smesh = this.app.getAssetMgr().getDefaultMesh("sphere");
            filter.mesh = smesh;
            var renderer = tran.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            var shader = this.app.getAssetMgr().getShader("light1.shader.json");
            if (shader != null)
            {
                renderer.materials = [];
                renderer.materials.push(new gd3d.framework.material());
                renderer.materials[0].setShader(shader);
                var texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                renderer.materials[0].setTexture("_MainTex", texture);
            }
            var col = tran.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            col.size = new gd3d.math.vector3(0.2, 0.2, 0.2);
            col.colliderVisible = this.colVisible;
            tran.markDirty();

            var dir = new gd3d.math.vector3();
            this.heroGun.getForwardInWorld(dir);
            let bullet = {
                id: this.bulletId++,
                transform: tran,
                direction: dir,
                life: 3
            };
            this.bulletList.push(bullet);
            
            // this.cameraShock.play(1, 0.5, true);
        }

        private updateBullet(delta: number)
        {
            for (var i = 0; i < this.bulletList.length; i++)
            {
                var b = this.bulletList[i];
                var v = gd3d.math.pool.new_vector3();
                var speed = gd3d.math.pool.new_vector3();
                gd3d.math.vec3ScaleByNum(b.direction, this.bulletSpeed * delta, speed);
                gd3d.math.vec3Add(b.transform.localTranslate, speed, v);
                b.transform.localTranslate = v;
                b.transform.markDirty();
                b.life -= delta;
                
            }
            for (var i = 0; i < this.bulletList.length; i++)
            {
                var b = this.bulletList[i];
                if (b.life <= 0)
                {
                    this.bulletList.splice(i, 1);
                    this.scene.removeChild(b.transform);
                    b.transform.dispose();
                }
            }

        }

    }

}