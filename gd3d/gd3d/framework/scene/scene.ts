namespace gd3d.framework
{
    export declare let physic: PhysicsEngine;
    export declare let physic2D:physicEngine2D;
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 场景是基础的功能，有场景图，相当于Unity的Level
     * @version egret-gd3d 1.0
     */
    export class scene
    {
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 全局的application实例
         * @version egret-gd3d 1.0
         */
        app: application;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 全局的webgl实例
         * @version egret-gd3d 1.0
         */
        webgl: WebGLRenderingContext;
        /**
         * @private
         * @param app 
         */
        constructor(app: application)
        {
            this.app = app;
            this.webgl = app.webgl;
            this.assetmgr = app.getAssetMgr();

            this.rootNode = new transform();
            this.rootNode.scene = this;
            this.renderList = new renderList();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景名称
         * @version egret-gd3d 1.0
         */
        name: string;
        private rootNode: transform;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染列表
         * @version egret-gd3d 1.0
         */
        renderList: renderList;
        private assetmgr: assetMgr;
        private _overlay2d: Array<overlay2D>;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 添加ScreenSpaceOverlay
         * @version egret-gd3d 1.0
         */
        addScreenSpaceOverlay(overlay: overlay2D)
        {
            if (!overlay) return;
            if (!this._overlay2d) this._overlay2d = [];
            if (this._overlay2d.indexOf(overlay) != -1) return;
            this._overlay2d.push(overlay);
            this.sortOverLays(this._overlay2d);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 删除ScreenSpaceOverlay
         * @version egret-gd3d 1.0
         */
        removeScreenSpaceOverlay(overlay)
        {
            if (!overlay || !this._overlay2d) return;
            let idx = this._overlay2d.indexOf(overlay);
            if (idx != -1) this._overlay2d.splice(idx, 1);
            this.sortOverLays(this._overlay2d);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 参与渲染的相机
         * @version egret-gd3d 1.0
         */
        public renderCameras: camera[] = [];//需要camera class 

        private _mainCamera: camera = null;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取当前主相机
         * @version egret-gd3d 1.0
         */
        public get mainCamera()
        {
            if (this._mainCamera == null)
            {
                this._mainCamera = this.renderCameras[0];
            }
            return this._mainCamera;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置当前主相机
         * @param _camera 相机组件实例
         * @version egret-gd3d 1.0
         */
        public set mainCamera(_camera: camera)
        {
            for (let i in this.renderCameras)
            {
                if (this.renderCameras[i] == _camera)
                {
                    this._mainCamera = _camera;
                }
            }
        }
        public renderContext: renderContext[] = [];
        private renderLights: light[] = [];//需要光源 class
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * lightmap列表
         * @version egret-gd3d 1.0
         */
        lightmaps: texture[] = [];//lightmap
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 雾效
         * @version egret-gd3d 1.0
         */
        fog: Fog;

        onLateUpdate:(delta:number)=>any;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景的刷新函数
         * @param delta
         * @version egret-gd3d 1.0
         */
        update(delta: number)
        {
            

            //更新矩阵
            //this.rootNode.updateTran(false);
            //this.rootNode.updateAABBChild();//更新完tarn再更新子物体aabb 确保每个transform的aabb正确

            //更新跑一遍，刷出渲染列表
            this.renderCameras.length = 0;
            this.renderLights.length = 0;
            this.renderList.clear();

            // aniplayer.playerCaches = [];

            //递归的更新与填充渲染列表
            this.updateScene(this.rootNode, delta);
            if(this.onLateUpdate)
                this.onLateUpdate(delta);

            if(physic)
            {
                physic._step(delta);
            }
            //排序
            //排序camera 并绘制
            if (this.renderCameras.length > 1)
            {
                this.renderCameras.sort((a, b) =>
                {
                    return a.order - b.order;
                });
            }


            this.RealCameraNumber = 0;
            for (var i = 0; i < this.renderCameras.length; i++)
            {
                render.glDrawPass.resetLastState();
                this._renderCamera(i);
            }

            this.updateSceneOverLay(delta);

            if (this.RealCameraNumber == 0)
            {
                this.webgl.clearColor(0, 0, 0, 1);
                this.webgl.clearDepth(1.0);
                this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);
            }
            this.webgl.flush();

            if(DrawCallInfo.BeActived)
            {
                DrawCallInfo.inc.showPerFrame();
                DrawCallInfo.inc.reset();
            }
        }

        //更新和渲染 scene overlayers
        private updateSceneOverLay(delta: number)
        {
            if (!this._overlay2d || this._overlay2d.length < 1) return;

            let targetcamera = this.mainCamera;
            if (!this._overlay2d || !targetcamera) return;
            let mainCamIdx = this.renderCameras.indexOf(targetcamera);
            if (mainCamIdx == -1)
            {
                let cname = targetcamera.gameObject.getName();
                let oktag = false;
                for (var i = 0; i < this.renderCameras.length; i++)
                {
                    let cam = this.renderCameras[i];
                    if (cam && cam.gameObject.getName() == cname)
                    {
                        targetcamera = this.mainCamera = cam;
                        oktag = true;
                        break;
                    }
                }
                if (!oktag)
                {
                    this._mainCamera = null;
                    targetcamera = this.mainCamera;
                }
            }
            mainCamIdx = this.renderCameras.indexOf(targetcamera);
            if (!targetcamera) return;
            if (this._overlay2d)
            {
                this._overlay2d.forEach(overlay =>
                {
                    if (overlay)
                    {
                        overlay.start(targetcamera);
                        overlay.update(delta);
                        overlay.render(this.renderContext[mainCamIdx], this.assetmgr, targetcamera);
                    }
                });
            }

            //test----
            // for(var i=0;i< this.renderCameras.length;i++){
            //     let cam = this.renderCameras[i];
            //     let contx = this.renderContext[i];
            //     if(!cam || !contx) return;
            //     if(this._overlay2d){
            //         this._overlay2d.forEach(overlay=>{
            //             if(overlay){
            //                 overlay.start( cam);
            //                 overlay.update(delta);
            //                 overlay.render(contx, this.assetmgr, cam);
            //             }
            //         });
            //     }
            // }
        }

        private RealCameraNumber: number = 0;
        //这个函数后面还有别的过程，应该留给camera
        private _renderCamera(camindex: number)
        {
            //增加当前编辑器状态，管控场编相机
            //一个camera 不是一次单纯的绘制，camera 还有多个绘制遍
            var cam = this.renderCameras[camindex];
            var context = this.renderContext[camindex];
            //sceneMgr.camera=cam;
            if (this.app.bePlay && cam.gameObject.transform.name.toLowerCase().indexOf("editor") < 0)
            {
                context.updateCamera(this.app, cam);
                context.updateLights(this.renderLights);
                cam.fillRenderer(this);
                cam.renderScene(this, context);
                this.RealCameraNumber++;

                // //还有overlay
                let overLays: IOverLay[] = cam.getOverLays();
                for (var i = 0; i < overLays.length; i++)
                {
                    if (cam.CullingMask & CullingMask.ui)
                    {
                        overLays[i].render(context, this.assetmgr, cam);
                    }
                }
            }
            else if (!this.app.bePlay && cam.gameObject.transform.name.toLowerCase().indexOf("editor") >= 0)
            {
                context.updateCamera(this.app, cam);
                context.updateLights(this.renderLights);
                cam.fillRenderer(this);
                cam.renderScene(this, context);
                this.RealCameraNumber++;
                //----------------------------------场编相机的overlay展示----------------------------------------------------
                if (this.app.be2dstate)
                {
                    let overLays: IOverLay[] = cam.getOverLays();
                    for (var i = 0; i < overLays.length; i++)
                    {
                        if (cam.CullingMask & CullingMask.ui)
                        {
                            overLays[i].render(context, this.assetmgr, cam);
                        }
                    }
                }
            }
            if (!this.app.bePlay && this.app.be2dstate)
            {
                if (camindex == this.app.curcameraindex)
                {
                    let overLays: IOverLay[] = cam.getOverLays();
                    for (var i = 0; i < overLays.length; i++)
                    {
                        if (cam.CullingMask & CullingMask.ui)
                        {
                            overLays[i].render(context, this.assetmgr, cam);
                        }
                    }
                }
            }
        }

        private sortOverLays(lays: IOverLay[])
        {
            if (!lays || lays.length < 1) return;
            lays.sort((a, b) =>
            {
                return a.sortOrder - b.sortOrder;
            });
        }

        private updateScene(node: transform, delta)
        {
            if (this.app.bePlay)
            {
                this.objupdate(node, delta);
            }
            else
            {
                this.objupdateInEditor(node, delta);
            }
        }

        private objupdateInEditor(node: transform, delta)//场编下
        {
            node.gameObject.init();//组件还未初始化的初始化
            if (node.gameObject.renderer != null)
            {
                node.gameObject.renderer.update(delta);//update 了啥
            }
            var c = node.gameObject.camera;
            if (c != null)
            {
                node.gameObject.camera.update(delta);//update 了啥
            }

            this.collectCameraAndLight(node);

            if (node.children != null)
            {
                for (var i = 0; i < node.children.length; i++)
                {
                    this.objupdateInEditor(node.children[i], delta);
                }
            }
        }
        private objupdate(node: transform, delta)//play状态下
        {
            if (node.hasComponent == false && node.hasComponentChild == false)
                return;
            node.gameObject.init(this.app.bePlay);//组件还未初始化的初始化
            if (node.gameObject.components.length > 0)
            {
                node.gameObject.update(delta);

                this.collectCameraAndLight(node);
            }
            if (node.children)
            {
                for (let item of node.children)
                    this.objupdate(item, delta);
                // for (var i = 0; i < node.children.length; i++)
                // {
                //     this.objupdate(node.children[i], delta);
                // }
            }
        }

        private collectCameraAndLight(node: transform)
        {
            //update 的时候只收集摄像机和灯光信息
            //收集摄像机
            var c = node.gameObject.camera;
            if (c != null && c.gameObject.visibleInScene)
            {
                this.renderCameras.push(c);
            }
            while (this.renderContext.length < this.renderCameras.length)
            {
                this.renderContext.push(new renderContext(this.webgl));
            }
            //收集灯光
            var l = node.gameObject.light;
            if (l != null && node.gameObject.visible)
            {
                this.renderLights.push(l);
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景根节点下添加物体
         * @param node 要添加的transform
         * @version egret-gd3d 1.0
         */
        addChild(node: transform)
        {
            this.rootNode.addChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景根节点下移出物体
         * @param node 要移出的transform
         * @version egret-gd3d 1.0
         */
        removeChild(node: transform)
        {
            this.rootNode.removeChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取children列表
         * @version egret-gd3d 1.0
         */
        getChildren(): transform[]
        {
            return this.rootNode.children;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取children数量
         * @version egret-gd3d 1.0
         */
        getChildCount(): number
        {
            if (this.rootNode.children == null) return 0;
            return this.rootNode.children.length;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 根据索引获取child
         * @param index 索引
         * @version egret-gd3d 1.0
         */
        getChild(index: number): transform
        {
            return this.rootNode.children[index];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 根据name获取child
         * @param name
         * @version egret-gd3d 1.0
         */
        getChildByName(name: string): transform
        {
            let res = this.rootNode.find(name);
            return res;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取场景根节点
         * @version egret-gd3d 1.0
         */
        getRoot()
        {
            return this.rootNode;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取射线路径上的所有物体
         * @param ray 射线实例
         * @param isPickMesh 是否为拾取mesh 否为拾取collider
         * @version egret-gd3d 1.0
         */
        public pickAll(ray: ray, outInfos: pickinfo[], isPickMesh: boolean = false, root: transform = this.getRoot(), layermask: number = NaN): boolean
        {
            if (!outInfos || !ray) return false;
            let isHited = this.doPick(ray, true, isPickMesh, root, outInfos, layermask);
            return isHited;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取射线拾取到的最近物体
         * @param ray 射线实例
         * @param isPickMesh 是否为拾取mesh 否为拾取collider
         * @version egret-gd3d 1.0
         */
        public pick(ray: ray, outInfo: pickinfo, isPickMesh: boolean = false, root: transform = this.getRoot(), layermask: number = NaN): boolean
        {
            if (!outInfo || !ray) return false;
            let isHited = this.doPick(ray, false, isPickMesh, root, outInfo, layermask);
            return isHited;

            //pickinfo.pickedtran.gameObject.collider.subTran.gameObject.visible = !pickinfo.pickedtran.gameObject.collider.subTran.gameObject.visible;
            //pickinfo.pickedtran.markDirty();

        }
        private doPick(ray: ray, pickall: boolean, isPickMesh: boolean, root: transform, out: any, layermask: number = NaN): boolean
        {
            let ishited = false;
            var pickedList: Array<pickinfo> = new Array<pickinfo>();
            if (isPickMesh)
            {
                ishited = this.pickMesh(ray, root, pickedList, layermask);
            }
            else
            {
                ishited = this.pickCollider(ray, root, pickedList, layermask);
            }

            if (pickedList.length == 0) return ishited;

            if (pickall)
            {
                out.length = 0;
                pickedList.forEach(element =>
                {
                    out.push(element);
                });
            }
            else
            {
                var index = 0;
                for (var i = 1; i < pickedList.length; i++)
                {
                    if (pickedList[i].distance < pickedList[index].distance) index = i;
                }
                //return pickedList[index];
                let temp = pickedList.splice(index, 1);
                (out as pickinfo).cloneFrom(temp[0]);
                pickedList.forEach(element =>
                {
                    math.pool.delete_pickInfo(element);
                });
                pickedList.length = 0;
            }

            return ishited;
        }

        private pickMesh(ray: ray, tran: transform, pickedList: pickinfo[], layermask: number = NaN): boolean
        {
            let ishited = false;
            if (tran.gameObject != null)
            {
                if (!tran.gameObject.visible) return ishited;
                let canDo = true;
                //if(!isNaN(layermask) && layermask != tran.gameObject.layer) canDo = false;
                if (!isNaN(layermask) && (layermask & (1 << tran.gameObject.layer)) == 0) canDo = false;
                if (canDo)
                {
                    var meshFilter = tran.gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
                    if (meshFilter != null)
                    {
                        //3d normal mesh
                        var mesh = meshFilter.getMeshOutput();
                        if (mesh)
                        {
                            let pinfo = math.pool.new_pickInfo();
                            let bool = mesh.intersects(ray, tran.getWorldMatrix(), pinfo);
                            if (bool)
                            {
                                ishited = true;
                                pickedList.push(pinfo);
                                pinfo.pickedtran = tran;
                            }
                        }
                    }
                    else
                    {
                        var skinmesh = tran.gameObject.getComponent("skinnedMeshRenderer") as gd3d.framework.skinnedMeshRenderer;
                        if (skinmesh != null)
                        {
                            //3d skinmesh
                            let pinfo = math.pool.new_pickInfo();
                            var bool = skinmesh.intersects(ray, pinfo);
                            if (bool)
                            {
                                ishited = true;
                                pickedList.push(pinfo);
                                pinfo.pickedtran = tran;
                            }
                        }

                    }
                }
            }
            if (tran.children != null)
            {
                for (var i = 0; i < tran.children.length; i++)
                {
                    let bool = this.pickMesh(ray, tran.children[i], pickedList, layermask);
                    if (!ishited)
                        ishited = bool;
                }
            }
            return ishited;
        }

        private pickCollider(ray: ray, tran: transform, pickedList: Array<pickinfo>, layermask: number = NaN): boolean
        {
            let ishited = false;
            if (tran.gameObject != null)
            {
                if (!tran.gameObject.visible) return ishited;
                if (tran.gameObject.collider != null)
                {
                    let canDo = true;
                    if (!isNaN(layermask) && (layermask & (1 << tran.gameObject.layer)) == 0) canDo = false;
                    //console.error(`${tran.gameObject.layer}  --  ${layermask}`);
                    if (canDo)
                    {
                        //挂了collider
                        let pinfo = math.pool.new_pickInfo();
                        var bool = ray.intersectCollider(tran, pinfo);
                        if (bool)
                        {
                            ishited = true;
                            pickedList.push(pinfo);
                            pinfo.pickedtran = tran;
                        }
                    }
                }
            }
            if (tran.children != null)
            {
                for (var i = 0; i < tran.children.length; i++)
                {
                    let bool = this.pickCollider(ray, tran.children[i], pickedList, layermask);
                    if (!ishited)
                        ishited = bool;
                }
            }
            return ishited;
        }
        

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 启用物理到当前场景
         * @param gravity 定义场景物理世界的重力向量
         * @param plugin 定义场景物理世界引擎插件
         * @version egret-gd3d 1.0
         */
        enablePhysics(gravity: math.vector3, plugin?: IPhysicsEnginePlugin)
        {
            if (physic) {
                return true;
            }

            if(!plugin) plugin = new OimoJSPlugin();
        
            try {
                physic = new PhysicsEngine(gravity, plugin);
                return true;
            } catch (e) {
                console.error(e.message);
                return false;
            }

            //physic=new PhysicsEngine(new math.vector3(0,-9.8,0),new OimoJSPlugin());
        }

        enable2DPhysics()
        {
            physic2D=new physicEngine2D();
        }
    }
}