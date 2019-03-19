/// <reference path="../../io/reflect.ts" />
let helpv3 = new gd3d.math.vector3();
let helpv3_1 = new gd3d.math.vector3();
let helpv3_2 = new gd3d.math.vector3();
let helpv3_3 = new gd3d.math.vector3();
let helpv3_4 = new gd3d.math.vector3();
let helpv3_5 = new gd3d.math.vector3();
let helpv3_6 = new gd3d.math.vector3();
let helpv3_7 = new gd3d.math.vector3();

let helpv2 = new gd3d.math.vector2();
let helpv2_1 = new gd3d.math.vector2();

let helpmtx = new gd3d.math.matrix();
let helpmtx_1 = new gd3d.math.matrix();
let helpmtx_2 = new gd3d.math.matrix();
let helpmtx_3 = new gd3d.math.matrix();

let helprect = new gd3d.math.rect();

namespace gd3d.framework
{
    /**
     * @private
     */
    export interface ICameraPostQueue
    {
        render(scene: scene, context: renderContext, camera: camera);
        renderTarget: render.glRenderTarget;
    }
    /**
     * @private
     */
    export class cameraPostQueue_Depth implements ICameraPostQueue
    {
        constructor()
        {
            this.renderTarget = null;
        }
        render(scene: scene, context: renderContext, camera: camera)
        {

            //最后一个参数true 表示不用camera的clear 配置
            camera._targetAndViewport(this.renderTarget, scene, context, true);
            context.webgl.depthMask(true);//zwrite 會影響clear depth，這個查了好一陣
            gd3d.render.glDrawPass.lastZWrite = true;


            context.webgl.clearColor(0, 0, 0, 0);
            context.webgl.clearDepth(1.0);
            context.webgl.clear(context.webgl.COLOR_BUFFER_BIT | context.webgl.DEPTH_BUFFER_BIT);
            camera._renderOnce(scene, context, "_depth");

            render.glRenderTarget.useNull(context.webgl);
        }
        renderTarget: render.glRenderTarget;
    }
    /**
     * @private
     */
    export class cameraPostQueue_Quad implements ICameraPostQueue
    {
        material: material;//shader & uniform
        constructor()
        {
            this.renderTarget = null;
            this.material = new material();
        }
        render(scene: scene, context: renderContext, camera: camera)
        {

            camera._targetAndViewport(this.renderTarget, scene, context, true);

            context.webgl.depthMask(true);//zwrite 會影響clear depth，這個查了好一陣
            gd3d.render.glDrawPass.lastZWrite = true;
            context.webgl.clearColor(0, 0.3, 0, 0);
            context.webgl.clearDepth(1.0);
            context.webgl.clear(context.webgl.COLOR_BUFFER_BIT | context.webgl.DEPTH_BUFFER_BIT);
            let mesh = scene.app.getAssetMgr().getDefaultMesh("quad");
            //画四边形
            context.drawtype = "";
            mesh.glMesh.bindVboBuffer(context.webgl);
            this.material.draw(context, mesh, mesh.submesh[0], "quad");

            render.glRenderTarget.useNull(context.webgl);

        }
        renderTarget: render.glRenderTarget;
    }
    /**
     * @private
     */
    export class cameraPostQueue_Color implements ICameraPostQueue
    {
        constructor()
        {
            this.renderTarget = null;
        }
        render(scene: scene, context: renderContext, camera: camera)
        {
            camera._targetAndViewport(this.renderTarget, scene, context, false);
            camera._renderOnce(scene, context, "");
            render.glRenderTarget.useNull(context.webgl);
        }
        renderTarget: render.glRenderTarget;
    }
    /**
     * @private
     */
    export interface IOverLay
    {
        init: boolean;
        sortOrder: number;
        start(camera: camera);
        render(context: renderContext, assetmgr: assetMgr, camera: camera);
        update(delta: number);
    }
    /**
    * @public
    * @language zh_CN
    * @classdesc
    * 视锥剔除组件，作为标记存在
    * @version egret-gd3d 1.0
    */
    @reflect.nodeComponent
    @reflect.nodeCamera
    export class camera implements INodeComponent
    {
        static readonly ClassName:string="camera";

        constructor(){
            for(let i=0; i < 8 ;i++){
                this.frameVecs.push(new math.vector3());
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;

        private _near: number = 0.01;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 相机到近裁剪面距离
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.UIStyle("rangeFloat", 1, 1000, 2)//加上这个标记，编辑器就能读取这个显示ui了
        @gd3d.reflect.Field("number")
        get near(): number
        {
            return this._near;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置相机到近裁剪面距离
         * @version egret-gd3d 1.0
         */
        set near(val: number)
        {
            if (this.opvalue > 0)
            {
                if (val < 0.01) val = 0.01;
            }
            if (val >= this.far) val = this.far - 0.01;
            this._near = val;
        }
        private _far: number = 1000;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 相机到远裁剪面距离
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.UIStyle("rangeFloat", 1, 1000, 999)
        @gd3d.reflect.Field("number")
        get far(): number
        {
            return this._far;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置相机到远裁剪面距离
         * @version egret-gd3d 1.0
         */
        set far(val: number)
        {
            if (val <= this.near) val = this.near + 0.01;
            this._far = val;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 相机渲染剔除mask
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        CullingMask: CullingMask = CullingMask.everything ^ CullingMask.editor;
        //CullingMask: CullingMask = CullingMask.everything;
        /**
         * 当前RenderContext 的 Index
         */
        get CurrContextIndex() { return this._contextIdx; }
        private _contextIdx = -1;
        /**
         * @private
         */
        @reflect.compCall({ "use": "dirty", "display": "刷新camera" })
        markDirty()
        {

        }
        start()
        {
        }

        onPlay()
        {

        }

        update(delta: number)
        {
            for (var i = 0; i < this.overlays.length; i++)
            {
                if (!this.overlays[i].init)
                {
                    this.overlays[i].start(this);
                    this.overlays[i].init = true;
                }
                this.overlays[i].update(delta);
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 是否清除颜色缓冲区
         * @version egret-gd3d 1.0
         */
        clearOption_Color: boolean = true;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 是否清除深度缓冲区
         * @version egret-gd3d 1.0
         */
        clearOption_Depth: boolean = true;
        // backgroundColor: gd3d.math.color = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 背景色
         * @version egret-gd3d 1.0
         */
        backgroundColor: gd3d.math.color = new gd3d.math.color(0.5, 0.8, 1, 1);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 相机视窗
         * @version egret-gd3d 1.0
         */
        // @gd3d.reflect.Field("rect")
        viewport: gd3d.math.rect = new gd3d.math.rect(0, 0, 1, 1);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染目标
         * @version egret-gd3d 1.0
         */
        renderTarget: gd3d.render.glRenderTarget = null;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * camera 渲染排序标记
         * @version egret-gd3d 1.0
         */
        order: number = 0;//camera 渲染顺序
        @gd3d.reflect.Field("IOverLay[]")
        private overlays: IOverLay[] = [];
        /**
         * @public
         * @language zh_CN
         * @param overlay 2d组件
         * @classdesc
         * 添加2d渲染组件
         * @version egret-gd3d 1.0
         */
        addOverLay(overLay: IOverLay)
        {
            // if (overLay instanceof overlay2D)
            // {
            //     let lay = overLay as overlay2D;
            //     if (lay.camera != null)
            //     {
            //         lay.camera.removeOverLay(lay);
            //     }
            // }
            this.overlays.push(overLay);
            this.sortOverLays(this.overlays);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 返回此相机上的overlays数组
         * @version egret-gd3d 1.0
         */
        getOverLays()
        {
            return this.overlays;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 移除相机上的所有overly
         * @version egret-gd3d 1.0
         */
        removeOverLay(overLay: IOverLay)
        {
            if (this.overlays == null)
                return;
            let index = this.overlays.indexOf(overLay);
            if (index >= 0)
                this.overlays.splice(index, 1);

            this.sortOverLays(this.overlays);
        }

        //overlays 排序
        private sortOverLays(lays: IOverLay[])
        {
            if (!lays || lays.length < 1) return;
            lays.sort((a, b) =>
            {
                return a.sortOrder - b.sortOrder;
            });
        }
        /**
         * @public
         * @language zh_CN
         * @param matrix 返回的视矩阵
         * @classdesc
         * 计算相机的viewmatrix（视矩阵）
         * @version egret-gd3d 1.0
         */
        calcViewMatrix(matrix: gd3d.math.matrix)
        {
            let camworld = this.gameObject.transform.getWorldMatrix();
            //视矩阵刚好是摄像机世界矩阵的逆
            gd3d.math.matrixInverse(camworld, this.matView);



            gd3d.math.matrixClone(this.matView, matrix);
            return;
        }
        /**
         * @public
         * @language zh_CN
         * @param app 主程序
         * @param viewportpixel 视口rect
         * @classdesc
         * 计算相机视口像素rect
         * @version egret-gd3d 1.0
         */
        calcViewPortPixel(app: application, viewPortPixel: math.rect)
        {

            let w: number;
            let h: number;
            if (this.renderTarget == null)
            {
                w = app.width;
                h = app.height;
            }
            else
            {
                w = this.renderTarget.width;
                h = this.renderTarget.height;
            }
            viewPortPixel.x = w * this.viewport.x;
            viewPortPixel.y = h * this.viewport.y;
            viewPortPixel.w = w * this.viewport.w;
            viewPortPixel.h = h * this.viewport.h;
            //asp = this.viewPortPixel.w / this.viewPortPixel.h;

        }
        /**
         * @public
         * @language zh_CN
         * @param app 主程序
         * @param matrix projectmatrix（投影矩阵）
         * @classdesc
         * 计算相机投影矩阵
         * @version egret-gd3d 1.0
         */
        calcProjectMatrix(asp: number, matrix: gd3d.math.matrix)
        {
            if (this.opvalue > 0)
                math.matrixProject_PerspectiveLH(this.fov, asp, this.near, this.far, this.matProjP);
            if (this.opvalue < 1)
                math.matrixProject_OrthoLH(this.size * asp, this.size, this.near, this.far, this.matProjO);

            if (this.opvalue == 0)
                math.matrixClone(this.matProjO, this.matProj);
            else if (this.opvalue == 1)
                math.matrixClone(this.matProjP, this.matProj);
            else
                math.matrixLerp(this.matProjO, this.matProjP, this.opvalue, this.matProj);
            //投影矩阵函数缺一个
            gd3d.math.matrixClone(this.matProj, matrix);
        }

        private static _shareRay : ray ;
        /**
         * @public
         * @language zh_CN
         * @param screenpos 屏幕坐标
         * @param app 主程序
         * @param shareRayCache 返回ray 实例 共用一个缓存射线对象 ，默认开启
         * @classdesc
         * 由屏幕坐标发射射线
         * @version egret-gd3d 1.0
         */
        public creatRayByScreen(screenpos: gd3d.math.vector2, app: application , shareRayCache :boolean = true ): ray
        {
            let src1 = helpv3;
            math.vec3Set(src1,screenpos.x,screenpos.y,0);
            
            let src2 = helpv3_1;
            math.vec3Set(src2,screenpos.x,screenpos.y,1);

            let dest1 = helpv3_2;
            let dest2 = helpv3_3;
            this.calcWorldPosFromScreenPos(app, src1, dest1);
            this.calcWorldPosFromScreenPos(app, src2, dest2);

            let dir = helpv3_4;
            gd3d.math.vec3Subtract(dest2, dest1, dir);
            gd3d.math.vec3Normalize(dir, dir);
            let ray : ray;
            if(shareRayCache) {
                if(!camera._shareRay) {
                    camera._shareRay = new gd3d.framework.ray(dest1, dir);
                }
                ray = camera._shareRay;
                ray.set(dest1,dir);
            }else{
                ray = new gd3d.framework.ray(dest1, dir);
            }

            return ray;
        }
        /**
         * @public
         * @language zh_CN
         * @param app 主程序
         * @param screenpos 屏幕坐标
         * @param outWorldPos 世界坐标
         * @classdesc
         * 由屏幕坐标得到世界坐标
         * @version egret-gd3d 1.0
         */
        calcWorldPosFromScreenPos(app: application, screenPos: math.vector3, outWorldPos: math.vector3)
        {
            
            let vpp = helprect;
            this.calcViewPortPixel(app, vpp);
            let vppos = helpv2;
            vppos.x = screenPos.x / vpp.w * 2 - 1;
            vppos.y =  1 - screenPos.y / vpp.h * 2;
            // new math.vector2(screenPos.x / vpp.w * 2 - 1, 1 - screenPos.y / vpp.h * 2);
            let matrixView = helpmtx;
            let matrixProject = helpmtx_1;
            let asp = vpp.w / vpp.h;
            this.calcViewMatrix(matrixView);
            this.calcProjectMatrix(asp, matrixProject);
            let matrixViewProject = helpmtx_2;
            let matinv = helpmtx_3;
            gd3d.math.matrixMultiply(matrixProject, matrixView, matrixViewProject);
            gd3d.math.matrixInverse(matrixViewProject, matinv);
            let src1 = helpv3; 
            src1.x = vppos.x;
            src1.y = vppos.y;
            src1.z = screenPos.z;
            // new math.vector3(vppos.x, vppos.y, screenPos.z);
            gd3d.math.matrixTransformVector3(src1, matinv, outWorldPos);

        }
        /**
         * @public
         * @language zh_CN
         * @param app 主程序
         * @param worldPos 世界坐标
         * @param outScreenPos 屏幕坐标
         * @classdesc
         * 由世界坐标得到屏幕坐标
         * @version egret-gd3d 1.0
         */
        calcScreenPosFromWorldPos(app: application, worldPos: math.vector3, outScreenPos: math.vector2)
        {
            let vpp = helprect;
            this.calcViewPortPixel(app, vpp);
            let matrixView = helpmtx;
            let matrixProject = helpmtx_1;
            let asp = vpp.w / vpp.h;
            this.calcViewMatrix(matrixView);
            this.calcProjectMatrix(asp, matrixProject);
            let matrixViewProject = helpmtx_2;
            gd3d.math.matrixMultiply(matrixProject, matrixView, matrixViewProject);

            let ndcPos = helpv3;
            gd3d.math.matrixTransformVector3(worldPos, matrixViewProject, ndcPos);
            outScreenPos.x = (ndcPos.x + 1) * vpp.w / 2;
            outScreenPos.y = (1 - ndcPos.y) * vpp.h / 2;
        }
        
        private lastCamMtx = new math.matrix();
        private lastCamRect = new math.rect();
        private paraArr = [0,0,0];
        /**
         * @private 计算相机框
         * @param app
         */
        private calcCameraFrame(app: application)
        {
            let matrix = this.gameObject.transform.getWorldMatrix();
            let _vpp = math.pool.new_rect();
            this.calcViewPortPixel(app, _vpp);
            //检查是否需要更新
            if(math.matrixEqual(this.lastCamMtx,matrix) && math.rectEqul(this.lastCamRect,_vpp) && 
                this.paraArr[0] == this.fov && this.paraArr[1] == this.near && this.paraArr[2] == this.far){
                return;   
            }

            let near_h = this.near * Math.tan(this.fov * 0.5);
            let asp = _vpp.w / _vpp.h;
            let near_w = near_h * asp;

            let nearLT = helpv3; 
            let nearLD = helpv3_1;
            let nearRT = helpv3_2;
            let nearRD = helpv3_3;
            math.vec3Set(nearLT,-near_w, near_h, this.near);
            math.vec3Set(nearLD,-near_w, -near_h, this.near);
            math.vec3Set(nearRT,near_w, near_h, this.near);
            math.vec3Set(nearRD,near_w, -near_h, this.near);

            let far_h = this.far * Math.tan(this.fov * 0.5);
            let far_w = far_h * asp;

            let farLT = helpv3_4;
            let farLD = helpv3_5;
            let farRT = helpv3_6;
            let farRD = helpv3_7;
            math.vec3Set(farLT,-far_w, far_h, this.far);
            math.vec3Set(farLD,-far_w, -far_h, this.far);
            math.vec3Set(farRT,far_w, far_h, this.far);
            math.vec3Set(farRD,far_w, -far_h, this.far);

            gd3d.math.matrixTransformVector3(farLD, matrix, farLD);
            gd3d.math.matrixTransformVector3(nearLD, matrix, nearLD);
            gd3d.math.matrixTransformVector3(farRD, matrix, farRD);
            gd3d.math.matrixTransformVector3(nearRD, matrix, nearRD);
            gd3d.math.matrixTransformVector3(farLT, matrix, farLT);
            gd3d.math.matrixTransformVector3(nearLT, matrix, nearLT);
            gd3d.math.matrixTransformVector3(farRT, matrix, farRT);
            gd3d.math.matrixTransformVector3(nearRT, matrix, nearRT);
            math.vec3Clone(farLD,this. frameVecs[0]);
            math.vec3Clone(nearLD,this.frameVecs[1]);
            math.vec3Clone(farRD,this. frameVecs[2]);
            math.vec3Clone(nearRD,this.frameVecs[3]);
            math.vec3Clone(farLT,this. frameVecs[4]);
            math.vec3Clone(nearLT,this.frameVecs[5]);
            math.vec3Clone(farRT,this. frameVecs[6]);
            math.vec3Clone(nearRT,this.frameVecs[7]);

            //同步
            math.matrixClone(matrix,this.lastCamMtx);
            math.rectClone(_vpp,this.lastCamRect);
            this.paraArr[0] = this.fov;
            this.paraArr[1] = this.near;
            this.paraArr[2] = this.far;
        }
        private matView: math.matrix = new math.matrix;
        private matProjP: math.matrix = new math.matrix;
        private matProjO: math.matrix = new math.matrix;
        private matProj: math.matrix = new math.matrix;

        private frameVecs: math.vector3[] = [];
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 透视投影的fov
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        fov: number = 60 * Math.PI / 180;//透视投影的fov
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 正交投影的竖向size
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        size: number = 2;//正交投影的竖向size

        private _opvalue = 1;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 0=正交， 1=透视 中间值可以在两种相机间过度
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        set opvalue(val: number)
        {
            if (val > 0 && this._near < 0.01)
            {
                this._near = 0.01;
                if (this._far <= this._near)
                    this._far = this._near + 0.01;
            }
            this._opvalue = val;
        }
        get opvalue(): number
        {
            return this._opvalue;
        }

        /**
         * @private
         */
        getPosAtXPanelInViewCoordinateByScreenPos(screenPos: gd3d.math.vector2, app: application, z: number, out: gd3d.math.vector2)
        {
            let vpp = helprect;
            this.calcViewPortPixel(app, vpp);

            let nearpos = helpv3;
            nearpos.z = -this.near;
            nearpos.x = screenPos.x - vpp.w * 0.5;
            nearpos.y = vpp.h * 0.5 - screenPos.y;

            let farpos = helpv3_1;
            farpos.z = -this.far;
            farpos.x = this.far * nearpos.x / this.near;
            farpos.y = this.far * nearpos.y / this.near;;

            let rate = (nearpos.z - z) / (nearpos.z - farpos.z);
            out.x = nearpos.x - (nearpos.x - farpos.x) * rate;
            out.y = nearpos.y - (nearpos.y - farpos.y) * rate;
        }
        /**
        * @private
        */
        fillRenderer(scene: scene)
        {
            scene.renderList.clear();
            if (scene.app.isFrustumCulling)
                this.calcCameraFrame(scene.app);
            this._fillRenderer(scene, scene.getRoot());
        }
        private _fillRenderer(scene: scene, node: transform)
        {
            if (!node.gameObject.visible || (node.hasRendererComp == false && node.hasRendererCompChild == false)) return;  //自己没有渲染组件 且 子物体也没有 return

            if (scene.app.isFrustumCulling && !this.testFrustumCulling(scene, node)) return;//视锥测试不通过 直接return
            if (node.gameObject != null && node.gameObject.renderer != null )
            {
                scene.renderList.addRenderer(node.gameObject.renderer);
            }
            if (node.children != null )
            {
                for (var i = 0; i < node.children.length; i++)
                {
                    this._fillRenderer(scene, node.children[i]);
                }
            }
        }
        /**
        * @private
        */
        testFrustumCulling(scene: scene, node: transform)
        {
            if (!node.gameObject.getComponent("frustumculling")) return true;//没挂识别组件即为通过测试
            let spherecol = node.gameObject.getComponent("spherecollider") as spherecollider;
            let worldPos = node.getWorldTranslate();

            if (!spherecol.caclPlaneInDir(this.frameVecs[0], this.frameVecs[1], this.frameVecs[5])) return false;
            if (!spherecol.caclPlaneInDir(this.frameVecs[1], this.frameVecs[3], this.frameVecs[7])) return false;
            if (!spherecol.caclPlaneInDir(this.frameVecs[3], this.frameVecs[2], this.frameVecs[6])) return false;
            if (!spherecol.caclPlaneInDir(this.frameVecs[2], this.frameVecs[0], this.frameVecs[4])) return false;
            if (!spherecol.caclPlaneInDir(this.frameVecs[5], this.frameVecs[7], this.frameVecs[6])) return false;
            if (!spherecol.caclPlaneInDir(this.frameVecs[0], this.frameVecs[2], this.frameVecs[3])) return false;
            return true;
        }
        /**
        * @private
        */
        _targetAndViewport(target: render.glRenderTarget, scene: scene, context: renderContext, withoutClear: boolean)
        {
            {
                let w: number;
                let h: number;
                if (target == null)
                {
                    w = scene.app.width;
                    h = scene.app.height;
                    // render.glRenderTarget.useNull(context.webgl);
                }
                else
                {
                    w = target.width;
                    h = target.height;
                    target.use(context.webgl);
                }

                //viewport 管不到clear的区域？
                context.webgl.viewport(w * this.viewport.x, h * this.viewport.y, w * this.viewport.w, h * this.viewport.h);
                context.webgl.depthRange(0, 1);

                if (withoutClear == false)
                {

                    //clear
                    if (this.clearOption_Color && this.clearOption_Depth)
                    {
                        context.webgl.depthMask(true);//zwrite 會影響clear depth，這個查了好一陣
                        gd3d.render.glDrawPass.lastZWrite = true;
                        if(scene.fog)
                        {
                            context.webgl.clearColor(scene.fog._Color.x, scene.fog._Color.y, scene.fog._Color.z, scene.fog._Color.w);
                        }else
                        {
                            context.webgl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
                        }
                        //context.webgl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
                        context.webgl.clearDepth(1.0);
                        context.webgl.clear(context.webgl.COLOR_BUFFER_BIT | context.webgl.DEPTH_BUFFER_BIT);
                    }
                    else if (this.clearOption_Depth)
                    {
                        context.webgl.depthMask(true);
                        gd3d.render.glDrawPass.lastZWrite = true;
                        context.webgl.clearDepth(1.0);
                        context.webgl.clear(context.webgl.DEPTH_BUFFER_BIT);
                    }
                    else if (this.clearOption_Color)
                    {
                        if(scene.fog)
                        {
                            context.webgl.clearColor(scene.fog._Color.x, scene.fog._Color.y, scene.fog._Color.z, scene.fog._Color.w);
                        }else
                        {
                            context.webgl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
                        }

                        //context.webgl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
                        context.webgl.clear(context.webgl.COLOR_BUFFER_BIT);
                    }
                    else
                    {

                    }

                }

            }
        }
        /**
        * @private
        */
        _renderOnce(scene: scene, context: renderContext, drawtype: string)
        {
            context.drawtype = drawtype;

            let assetmgr = scene.app.getAssetMgr();
            for (let layer of scene.renderList.renderLayers)
            {
                for (let item of layer.list)
                {
                    if (item.gameObject.visible == true && this.CullingMask & (1 << item.renderLayer))
                    {
                        if (item.gameObject && item.gameObject.visible == true)
                            item.render(context, assetmgr, this);
                    }
                }
            }
            // for (var i = 0; i < scene.renderList.renderLayers.length; i++)
            // {
            //     var layer = scene.renderList.renderLayers[i];
            //     var list = layer.list;

            //     for (var j = 0; j < list.length; j++)
            //     {
            //         if (this.CullingMask & (1 << list[j].renderLayer))
            //         {
            //             list[j].render(context, assetmgr, this);
            //         }
            //     }
            // }

        }
        /**
        * @private
        */
        postQueues: ICameraPostQueue[] = [];
        /**
        * @private
        */
        renderScene(scene: scene, context: renderContext)
        {
            this._contextIdx = scene.renderContext.indexOf(context);
            for (var i = 0; i < scene.renderList.renderLayers.length; i++)
            {
                let layer = scene.renderList.renderLayers[i];
                let list = layer.list;
                if (layer.needSort)
                {
                    if (list.length > 1)
                    {
                        list.sort((a, b) =>
                        {
                            if (a.queue != b.queue)
                            {
                                return a.queue - b.queue;
                            }
                            else
                            {
                                // var matrixView = math.pool.new_matrix();
                                // this.calcViewMatrix(matrixView);
                                let matrixView = context.matrixView;

                                let az = helpv3;
                                let bz = helpv3_1;

                                gd3d.math.matrixTransformVector3(a.gameObject.transform.getWorldTranslate(), matrixView, az);
                                gd3d.math.matrixTransformVector3(b.gameObject.transform.getWorldTranslate(), matrixView, bz);
                                return bz.z - az.z;
                            }
                        })
                    }
                }
            }
            if (this.postQueues.length == 0)
            {
                // setTimeout(() =>
                // {
                    this._targetAndViewport(this.renderTarget, scene, context, false);
                    this._renderOnce(scene, context, "");
                // });

                //context.webgl.flush();
            }
            else
            {

                // for (var i = 0; i < this.postQueues.length; i++)
                // {
                //     this.postQueues[i].render(scene, context, this);
                // }
                // let count = 0;
                for (let item of this.postQueues)
                {
                    // setTimeout(() =>
                    // {

                        item.render(scene, context, this);
                        // if (++count >= this.postQueues.length)
                            // context.webgl.flush();
                    // });
                }
                context.webgl.flush();
            }


        }
        /**
        * @private
        */
        remove()
        {

        }
        /**
        * @private
        */
        clone()
        {

        }
    }
}
