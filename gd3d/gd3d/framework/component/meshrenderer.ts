/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
     /**
     * @public
     * @language zh_CN
     * @classdesc
     * mesh的渲染组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeRender
    @reflect.nodeComponent
    export class meshRenderer implements IRenderer
    {
        static readonly ClassName:string="meshRenderer";

        constructor()
        {

        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * mesh的材质数组
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("material[]")
        materials: material[]=[];

        /**
         * @private
         * 使用全局的lightMap
         */
        useGlobalLightMap:boolean=true;
        /**
         * @private
         */
        @gd3d.reflect.Field("number")
        lightmapIndex: number = -1;
         /**
         * @private
         */
        @gd3d.reflect.Field("vector4")
        lightmapScaleOffset: math.vector4 = new math.vector4(1, 1, 0, 0);
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 场景渲染层级（common、transparent、overlay）
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        layer: RenderLayerEnum = RenderLayerEnum.Common;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染mask层级（和相机相对应）
         * @version egret-gd3d 1.0
         */
        // @gd3d.reflect.Field("number")
        // renderLayer: gd3d.framework.CullingMask = CullingMask.default;
        get renderLayer() {return this.gameObject.layer;}
        set renderLayer(layer:number){
            this.gameObject.layer = layer;
        }
        private issetq = false;
         /**
         * @private
         */
        _queue: number = 0;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 返回此组件的场景渲染层级排序依据queue大小
         * @version egret-gd3d 1.0
         */
        get queue(): number
        {
            return this._queue;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置此组件的场景渲染层级排序number大小
         * @version egret-gd3d 1.0
         */
        set queue(value: number)
        {
            this._queue = value;
            this.issetq = true;
        }
         /**
         * @private
         */
        filter: meshFilter;
        start()
        {
            this.filter = this.gameObject.getComponent("meshFilter") as meshFilter;
          
            this.refreshLayerAndQue();

            if(this.lightmapIndex ==-2)
            {
                this.useGlobalLightMap=false;
            }
        }

        onPlay()
        {

        }


        // material(mat:material|material[])
        // {
        //     if(mat==null) this.materials.length=0;
        //     if(mat instanceof material)
        //     {
        //         this.materials[0]=mat;
        //     }else
        //     {
        //         this.materials=mat;
        //     }
        //     this.refreshLayerAndQue();
        // }
        private refreshLayerAndQue()
        {
            if (this.materials == null || this.materials.length == 0)
            {
                this.materials = [];
                let material = new framework.material();
                material.use();
                this.materials.push(material);
                this.materials[0].setShader(sceneMgr.app.getAssetMgr().getShader("shader/def"));
            }

            this.layer = this.materials[0].getLayer();
            if (!this.issetq)
                this._queue = this.materials[0].getQueue();
        }

        update(delta: number)
        {
            if (this.materials != null && this.materials.length > 0)
            {
                let _mat = this.materials[0];
                if (_mat)
                {
                    this.layer = _mat.getLayer();
                    if (!this.issetq)
                        this._queue = _mat.getQueue();
                }
            }
            if(this.filter==null)
            {
                this.filter = this.gameObject.getComponent("meshFilter") as meshFilter;
            }
        }
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
        {
            DrawCallInfo.inc.currentState=DrawCallEnum.Meshrender;

            context.updateLightMask(this.gameObject.layer);
            context.updateModel(this.gameObject.transform);
            if (this.filter != null)
            {
                var mesh = this.filter.getMeshOutput();
                if (mesh != null && mesh.glMesh)
                {
                    mesh.glMesh.bindVboBuffer(context.webgl);
                    if (mesh.submesh != null)
                    {
                        for (var i = 0; i < mesh.submesh.length; i++)
                        {
                            var sm = mesh.submesh[i];

                            var mid = mesh.submesh[i].matIndex;//根据这个找到使用的具体哪个材质    
                            var usemat = this.materials[mid];
                            var drawtype = this.gameObject.transform.scene.fog ? "base_fog" : "base";
                            if (this.lightmapIndex >= 0&&this.gameObject.transform.scene.lightmaps.length>0)
                            {
                                drawtype = this.gameObject.transform.scene.fog ? "lightmap_fog" : "lightmap";
                                //usemat.shaderStatus = shaderStatus.Lightmap;
                                if (this.gameObject.transform.scene.lightmaps.length > this.lightmapIndex)
                                {
                                    context.lightmap = this.gameObject.transform.scene.lightmaps[this.lightmapIndex];
                                    context.lightmapOffset = this.lightmapScaleOffset;
                                    context.lightmapUV = mesh.glMesh.vertexFormat & gd3d.render.VertexFormatMask.UV1 ? 1 : 0;
                                }

                            }
                            else
                            {
                                if(!this.useGlobalLightMap)
                                {
                                    drawtype = this.gameObject.transform.scene.fog ? "lightmap_fog" : "lightmap";
                                    context.lightmap=usemat.statedMapUniforms["_LightmapTex"];
                                    context.lightmapOffset = this.lightmapScaleOffset;
                                    context.lightmapUV = mesh.glMesh.vertexFormat & gd3d.render.VertexFormatMask.UV1 ? 1 : 0;
                                }
                            }
                            if (this.gameObject.transform.scene.fog)
                            {
                                context.fog = this.gameObject.transform.scene.fog;
                            }
                            if (usemat != null)
                                usemat.draw(context, mesh, sm, drawtype,this.useGlobalLightMap);
                        }
                    }
                }
            }
           
        }
         /**
         * @private
         */
        remove()
        {
            this.materials.forEach(element=>{
                if(element) element.unuse();                
            });
            this.materials.length=0;
        }
         /**
         * @private
         */
        clone()
        {

        }
    }

}