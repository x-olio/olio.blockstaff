/// <reference path="../../lib/gd3d.d.ts" />
class Test_CameraController {
    private static g_this: Test_CameraController;
    public static instance() {
        if (Test_CameraController.g_this == null) {
            Test_CameraController.g_this = new Test_CameraController();
        }
        return Test_CameraController.g_this;
    }
    gameObject: gd3d.framework.gameObject;
    app: gd3d.framework.application;
    target: gd3d.framework.camera;
    moveSpeed: number = 10;
    movemul: number = 5;
    wheelSpeed: number = 1;
    rotateSpeed: number = 0.1;
    keyMap: { [id: number]: boolean } = {};
    beRightClick: boolean = false;

    update(delta: number) {
        if (this.beRightClick) {
            this.doMove(delta);
        }
    }

    cameras:gd3d.framework.camera[]=[];
    
    add(camera:gd3d.framework.camera)
    {
        this.cameras.push(new gd3d.framework.camera());
        this.cameras[this.cameras.length-1]=camera;
    }


    rotAngle: gd3d.math.vector3;
    isInit: boolean = false;

    decideCam(target:gd3d.framework.camera)
    {
        this.target = target;
        this.rotAngle = new gd3d.math.vector3();
        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
    }


    init(app: gd3d.framework.application) {
        this.isInit = true;
        this.app = app;
        // this.target = target;
        // this.rotAngle = new gd3d.math.vector3();
        // gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
        this.app.webgl.canvas.addEventListener("mousedown", (ev: MouseEvent) => {
            this.checkOnRightClick(ev);
        }, false);
        this.app.webgl.canvas.addEventListener("mouseup", (ev: MouseEvent) => {
            this.beRightClick = false;
        }, false);
        this.app.webgl.canvas.addEventListener("mousemove", (ev: MouseEvent) => {
            if (this.beRightClick) {
                this.doRotate(ev.movementX, ev.movementY);
            }
        }, false);
        this.app.webgl.canvas.addEventListener("keydown", (ev: KeyboardEvent) => {
            this.keyMap[ev.keyCode] = true;
        }, false);
        this.app.webgl.canvas.addEventListener("keyup", (ev: KeyboardEvent) => {
            this.moveSpeed = 10;
            this.keyMap[ev.keyCode] = false;
        }, false);

        if (navigator.userAgent.indexOf('Firefox') >= 0)
        {
            this.app.webgl.canvas.addEventListener("DOMMouseScroll", (ev: MouseWheelEvent) => {
                this.doMouseWheel(ev,true);
            }, false);

        } else
        {
            this.app.webgl.canvas.addEventListener("mousewheel", (ev: MouseWheelEvent) => {
                this.doMouseWheel(ev,false);
            }, false);
        }
        this.app.webgl.canvas.addEventListener("mouseout", (ev: MouseWheelEvent) => {
            this.beRightClick = false;
        }, false);
        document.oncontextmenu = (ev) => {
            ev.preventDefault();
        }
    }

    private moveVector: gd3d.math.vector3 = new gd3d.math.vector3(0, 0, 1);
    doMove(delta: number) {
        if (this.target == null)
            return;
        //w
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_W] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_W])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_w] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_w])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        //s
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_S] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_S])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_s] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_s])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }

        //a
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_A] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_A])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_a] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_a])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        //d
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_D] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_D])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_d] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_d])) {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getRightInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }

        //q
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_Q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_Q])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_q] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_q]))
        {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, -this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }
        //e
        if ((this.keyMap[gd3d.framework.NumberUtil.KEY_E] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_E])
            || (this.keyMap[gd3d.framework.NumberUtil.KEY_e] != undefined && this.keyMap[gd3d.framework.NumberUtil.KEY_e]))
        {
            this.moveSpeed += this.movemul * delta;
            this.target.gameObject.transform.getUpInWorld(this.moveVector);
            gd3d.math.vec3ScaleByNum(this.moveVector, this.moveSpeed * delta, this.moveVector);
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
        }

        this.target.gameObject.transform.markDirty();
    }
    doRotate(rotateX: number, rotateY: number) {
        this.rotAngle.x += rotateY * this.rotateSpeed;
        this.rotAngle.y += rotateX * this.rotateSpeed;

        this.rotAngle.x %= 360;
        this.rotAngle.y %= 360;

        gd3d.math.quatFromEulerAngles(this.rotAngle.x, this.rotAngle.y, this.rotAngle.z, this.target.gameObject.transform.localRotate);
    }

    lookat(trans: gd3d.framework.transform) {
        this.target.gameObject.transform.lookat(trans);
        this.target.gameObject.transform.markDirty();

        gd3d.math.quatToEulerAngles(this.target.gameObject.transform.localRotate, this.rotAngle);
    }

    checkOnRightClick(mouseEvent: MouseEvent) {
        var value = mouseEvent.button;
        if (value == 2) {
            //alert('点击的是鼠标右键');
            this.beRightClick = true;
            return true;
        } else if (value == 0) {
            this.beRightClick = false;
            //alert('点击的是鼠标左键');
            return false;
        }
    }

    private doMouseWheel(ev: MouseWheelEvent, isFirefox: boolean) {
        if (!this.target)
            return;
        if (this.target.opvalue == 0) {
            //正交相机
        }
        else //if (this.target.opvalue == 1)
        {
            //透视相机
            this.target.gameObject.transform.getForwardInWorld(this.moveVector);
            if (isFirefox)
            {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * (ev.detail * (-0.5)), this.moveVector);
            } else
            {
                gd3d.math.vec3ScaleByNum(this.moveVector, this.wheelSpeed * ev.deltaY * (-0.01), this.moveVector);
            }
            gd3d.math.vec3Add(this.target.gameObject.transform.localTranslate, this.moveVector, this.target.gameObject.transform.localTranslate);
            this.target.gameObject.transform.markDirty();

        }
    }
    remove() {

    }

}