namespace gd3d.framework
{
     /**
     * @public
     * @language zh_CN
     * @classdesc
     * 拖尾组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeRender
    @reflect.nodeComponent
    export class trailRender implements IRenderer
    {
        static readonly ClassName:string="trailRender";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景渲染层级（common、transparent、overlay）
         * @version egret-gd3d 1.0
         */
        layer: RenderLayerEnum = RenderLayerEnum.Common;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染mask层级（和相机相对应）
         * @version egret-gd3d 1.0
         */
        //renderLayer: gd3d.framework.CullingMask = CullingMask.default;
        get renderLayer() {return this.gameObject.layer;}
        set renderLayer(layer:number){
            this.gameObject.layer = layer;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 同场景渲染层级时候先后排序依据
         * @version egret-gd3d 1.0
         */
        queue: number = 0;

        private width: number = 1.0;
        private _material: gd3d.framework.material;
        private _color: gd3d.math.color;

        private mesh: gd3d.framework.mesh;

        private vertexcount = 24;
        private dataForVbo: Float32Array;
        private dataForEbo: Uint16Array;
        private sticks: trailStick[];
        // private targetpos:Float32Array;
        private active: boolean = false;
        private reInit: boolean = false;
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * start
         * @version egret-gd3d 1.0
         */
        start()
        {
            this.app = this.gameObject.getScene().app;
            this.webgl = this.app.webgl;
            this.initmesh();
        }

        onPlay()
        {

        }

        private app: application;
        private webgl: WebGLRenderingContext;

        private camerapositon: gd3d.math.vector3;
          /**
         * @public
         * @language zh_CN
         * @classdesc
         * 拖尾mesh是否向经过路径的单边延展
         * @version egret-gd3d 1.0
         */
        extenedOneSide: boolean = true;//延展方向
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * update
         * @version egret-gd3d 1.0
         */
        update(delta: number)
        {
            if (!this.active) return;

            if(!this.inited){
                this.intidata();
            }
            if (this.reInit)
            {
                this.reInitdata();
                this.reInit = false;
            }
            var targetpos = this.gameObject.transform.getWorldTranslate();
            if (this.lookAtCamera)
            {
                this.camerapositon = sceneMgr.app.getScene().mainCamera.gameObject.transform.getWorldTranslate();
                var camdir = gd3d.math.pool.new_vector3();
                gd3d.math.vec3Subtract(this.camerapositon, this.sticks[0].location, camdir);
                gd3d.math.vec3Normalize(camdir, camdir);

                var direction: gd3d.math.vector3 = gd3d.math.pool.new_vector3();
                gd3d.math.vec3Subtract(targetpos, this.sticks[0].location, direction);
                gd3d.math.vec3Normalize(direction, direction);
                gd3d.math.vec3Cross(camdir, direction, this.sticks[0].updir);
                gd3d.math.vec3ScaleByNum(this.sticks[0].updir, this.width, this.sticks[0].updir);
                gd3d.math.pool.delete_vector3(direction);
            }
            gd3d.math.vec3Clone(targetpos, this.sticks[0].location);

            var length = this.sticks.length;
            for (var i = 1; i < length; i++)
            {
                gd3d.math.vec3SLerp(this.sticks[i].location, this.sticks[i - 1].location, this.speed, this.sticks[i].location);
            }
            //--------------------------------延展面片方向-------------------------------------------------
            if (this.lookAtCamera)
            {
                for (var i = 1; i < length; i++)
                {
                    var tocamdir = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Subtract(this.camerapositon, this.sticks[i].location, tocamdir);
                    gd3d.math.vec3Normalize(tocamdir, tocamdir);
                    var movedir = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Subtract(this.sticks[i - 1].location, this.sticks[i].location, movedir);
                    gd3d.math.vec3Normalize(movedir, movedir);
                    gd3d.math.vec3Cross(tocamdir, movedir, this.sticks[i].updir);
                    gd3d.math.vec3ScaleByNum(this.sticks[i].updir, this.width, this.sticks[i].updir);
                    gd3d.math.pool.delete_vector3(tocamdir);
                }
            }
            else
            {
                this.gameObject.transform.getUpInWorld(this.sticks[0].updir);
                gd3d.math.vec3ScaleByNum(this.sticks[0].updir, this.width, this.sticks[0].updir);
                for (var i = 1; i < length; i++)
                {
                    gd3d.math.vec3SLerp(this.sticks[i].updir, this.sticks[i - 1].updir, this.speed, this.sticks[i].updir);
                }
            }
            this.updateTrailData();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;

        //-----------------------------------------------------------------------------------------------
        /**
         * @public
         * @language zh_CN
        * @param material 材质
         * @classdesc
         * 设置拖尾的材质
         * @version egret-gd3d 1.0
         */
        public set material(material: gd3d.framework.material)
        {
            this._material = material;
            this.layer = this.material.getLayer();
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 得到拖尾上的材质
         * @version egret-gd3d 1.0
         */
        public get material()
        {
            if (this._material != undefined)
            {
                return this._material;
            }
            else
            {
                var mat = new gd3d.framework.material();
                mat.setShader(this.app.getAssetMgr().getShader("shader/def"));
                this.material = mat;
                return this._material;
            }
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         *  返回 matrial调色
         * @version egret-gd3d 1.0
         */        
        public get color()
        {
            if (this._color == undefined)
            {
                this._color = new gd3d.math.color(1, 1, 1, 1);
            }
            return this._color;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         *设置 matrial颜色
         * @version egret-gd3d 1.0
         */    
        public set color(color: gd3d.math.color)
        {
            this._color = color;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 拖尾速度，调节拖尾长短（0-1）
         * @version egret-gd3d 1.0
         */  
        public setspeed(upspeed: number)
        {
            this.speed = upspeed;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 调节拖尾宽度
         * @version egret-gd3d 1.0
         */ 
        public setWidth(Width: number)
        {
            this.width = Width;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 开始拖尾
         * @version egret-gd3d 1.0
         */ 
        public play()
        {
            //this.intidata();//项目喜欢添加组件后立刻播放，会报错，此时组件的start还没走
            this.reInit = true;
            this.active = true;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 关闭拖尾
         * @version egret-gd3d 1.0
         */ 
        public stop()
        {
            this.active = false;
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 拖尾是否朝向相机
         * @version egret-gd3d 1.0
         */ 
        lookAtCamera: boolean = false;
        //------------------------------------------------------------------------------------------------------
        private initmesh()
        {
            this.mesh = new gd3d.framework.mesh();
            this.mesh.data = new gd3d.render.meshData();
            this.mesh.glMesh = new gd3d.render.glMesh();

            this.dataForVbo = new Float32Array(this.vertexcount * 9);
            this.dataForEbo = new Uint16Array((this.vertexcount / 2 - 1) * 6);

            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0;
            this.mesh.glMesh.initBuffer(this.webgl, vf, this.vertexcount, render.MeshTypeEnum.Dynamic);

            this.mesh.glMesh.addIndex(this.webgl, this.dataForEbo.length);

            this.mesh.submesh = [];
            {
                var sm = new subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = this.dataForEbo.length;
                sm.line = false;
                this.mesh.submesh.push(sm);
            }
            //this.intidata();
        }

        private reInitdata(){
            if(!this.inited) return;

            length = this.vertexcount / 2;
            for (var i = 0; i < length; i++)
            {
                let sti = this.sticks[i];
                gd3d.math.vec3Clone(this.gameObject.transform.getWorldTranslate(), sti.location);
                this.gameObject.transform.getUpInWorld(sti.updir);
                gd3d.math.vec3ScaleByNum(sti.updir, this.width, sti.updir);
            }
        }

        //透明渐变
        isAlphaGradual = false; 
        private inited = false;
        private intidata()
        {
            //用棍子去刷顶点
            //用逻辑去刷棍子
            this.sticks = [];
            for (var i = 0; i < this.vertexcount / 2; i++)
            {
                var ts = new trailStick();
                this.sticks.push(ts);
                ts.location = new gd3d.math.vector3();
                gd3d.math.vec3Clone(this.gameObject.transform.getWorldTranslate(), ts.location);
                ts.updir = new gd3d.math.vector3();
                this.gameObject.transform.getUpInWorld(ts.updir);
                gd3d.math.vec3ScaleByNum(ts.updir, this.width, ts.updir);
            }

            var length = this.vertexcount / 2;
            //-----------------------------------------------
            var updir = gd3d.math.pool.new_vector3();
            this.gameObject.transform.getUpInWorld(updir);
            gd3d.math.vec3ScaleByNum(updir, this.width, updir);

            var pos = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(this.gameObject.transform.getWorldTranslate(), pos);

            var uppos = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Add(pos, updir, uppos);

            var downpos = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Subtract(pos, updir, downpos);

            for (var i = 0; i < length; i++)
            {
                let tempA = this.isAlphaGradual ? (length - i -1)/length: 1;
                this.dataForVbo[i * 2 * 9] = uppos.x;
                this.dataForVbo[i * 2 * 9 + 1] = uppos.y;
                this.dataForVbo[i * 2 * 9 + 2] = uppos.z;
                this.dataForVbo[i * 2 * 9 + 3] = this.color.r;
                this.dataForVbo[i * 2 * 9 + 4] = this.color.g;
                this.dataForVbo[i * 2 * 9 + 5] = this.color.b;
                this.dataForVbo[i * 2 * 9 + 6] = this.color.a * tempA;
                this.dataForVbo[i * 2 * 9 + 7] = i / (length - 1);
                this.dataForVbo[i * 2 * 9 + 8] = 0;

                this.dataForVbo[(i * 2 + 1) * 9] = downpos.x;
                this.dataForVbo[(i * 2 + 1) * 9 + 1] = downpos.y;
                this.dataForVbo[(i * 2 + 1) * 9 + 2] = downpos.z;
                this.dataForVbo[(i * 2 + 1) * 9 + 3] = this.color.r;
                this.dataForVbo[(i * 2 + 1) * 9 + 4] = this.color.g;
                this.dataForVbo[(i * 2 + 1) * 9 + 5] = this.color.b;
                this.dataForVbo[(i * 2 + 1) * 9 + 6] = this.color.a * tempA;
                this.dataForVbo[(i * 2 + 1) * 9 + 7] = i / (length - 1);
                this.dataForVbo[(i * 2 + 1) * 9 + 8] = 1;

            }
            //--------------------------------------     
            for (var k = 0; k < length - 1; k++)
            {
                this.dataForEbo[k * 6 + 0] = k * 2;
                this.dataForEbo[k * 6 + 1] = (k + 1) * 2;
                this.dataForEbo[k * 6 + 2] = k * 2 + 1;

                this.dataForEbo[k * 6 + 3] = k * 2 + 1;
                this.dataForEbo[k * 6 + 4] = (k + 1) * 2;
                this.dataForEbo[k * 6 + 5] = (k + 1) * 2 + 1;
            }
            this.mesh.glMesh.uploadVertexData(this.webgl, this.dataForVbo);
            this.mesh.glMesh.uploadIndexData(this.webgl, 0, this.dataForEbo);

            gd3d.math.pool.delete_vector3(updir);
            gd3d.math.pool.delete_vector3(pos);
            gd3d.math.pool.delete_vector3(uppos);
            gd3d.math.pool.delete_vector3(downpos);

            this.inited = true;
        }

        private speed: number = 0.5;

        private updateTrailData()
        {
            var length = this.vertexcount / 2;

            if (this.extenedOneSide)
            {
                for (var i = 0; i < length; i++)
                {
                    var pos = this.sticks[i].location;
                    var up = this.sticks[i].updir;
                    this.dataForVbo[i * 2 * 9] = pos.x;
                    this.dataForVbo[i * 2 * 9 + 1] = pos.y;
                    this.dataForVbo[i * 2 * 9 + 2] = pos.z;

                    this.dataForVbo[(i * 2 + 1) * 9] = pos.x + up.x;
                    this.dataForVbo[(i * 2 + 1) * 9 + 1] = pos.y + up.y;
                    this.dataForVbo[(i * 2 + 1) * 9 + 2] = pos.z + up.z;
                }
            }
            else
            {
                for (var i = 0; i < length; i++)
                {
                    var pos = this.sticks[i].location;
                    var up = this.sticks[i].updir;
                    this.dataForVbo[i * 2 * 9] = pos.x - up.x;
                    this.dataForVbo[i * 2 * 9 + 1] = pos.y - up.y;
                    this.dataForVbo[i * 2 * 9 + 2] = pos.z - up.z;

                    this.dataForVbo[(i * 2 + 1) * 9] = pos.x + up.x;
                    this.dataForVbo[(i * 2 + 1) * 9 + 1] = pos.y + up.y;
                    this.dataForVbo[(i * 2 + 1) * 9 + 2] = pos.z + up.z;
                }
            }

        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * render
         * @version egret-gd3d 1.0
         */
        render(context: renderContext, assetmgr: assetMgr, camera: camera)
        {
            if (!this.active) return;
            context.updateModeTrail();
            this.mesh.glMesh.uploadVertexData(context.webgl, this.dataForVbo);
            //--------------------------render-------------------------------------------
            if (this.gameObject.getScene().fog)
            {
                context.fog = this.gameObject.getScene().fog;
                this.material.draw(context, this.mesh, this.mesh.submesh[0], "base_fog");
            } else
            {
                this.material.draw(context, this.mesh, this.mesh.submesh[0], "base");
            }
        }
         /**
         * @private
         */
        clone()
        {

        }
         /**
         * @private
         */
        remove()
        {

        }
    }
    /**
     * @private
     */
    export class trailStick
    {
        location: gd3d.math.vector3;
        updir: gd3d.math.vector3;
    }
}