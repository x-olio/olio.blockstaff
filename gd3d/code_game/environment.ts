namespace Game
{
    export class Environment
    {
        constructor(app: gd3d.framework.application)
        {
            this.app = app;
        }
        app: gd3d.framework.application;
        camera: gd3d.framework.camera;
        overlay: gd3d.framework.overlay2D;
        //taskmgr 是个权宜之计，实现不完整，全面使用await async 替代他
        // taskmgr: gd3d.framework.taskMgr;
        assetMgr: gd3d.framework.assetMgr;


        async Init()
        {
            //this.taskmgr = new gd3d.framework.taskMgr();

            var scene = this.app.getScene();
            this.assetMgr = this.app.getAssetMgr();

            //相机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 10;
            //opvalue=0 表示是一个正交相机
            this.camera.opvalue = 0;
            this.camera.size = 30;
            this.camera.getPosAtXPanelInViewCoordinateByScreenPos
            objCam.localTranslate.x = 0;
            objCam.localTranslate.y = 0;
            objCam.localTranslate.z = -1;
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();
            //2dUI root
            this.overlay = new gd3d.framework.overlay2D();
            
            this.overlay.matchReference_width = this.app.width;
            this.overlay.matchReference_height = this.app.height;
            this.overlay.scaleMode = gd3d.framework.UIScaleMode.SCALE_WITH_SCREEN_SIZE;
            this.camera.addOverLay(this.overlay);

            //任务排队执行系统
            //this.taskmgr.addTaskCall(this.loadShader.bind(this));
            await this.loadShader();

        }
        Update(delta: number)
        {
            //this.taskmgr.move(delta);
        }
        private async loadShader()
        {
            var promise = new Promise<string>((__resolve) =>
            {
                this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
                {
                    if (_state.isfinish)
                    {
                        __resolve();
                    }
                }
                );
            });
            return promise;
        }

    }
}