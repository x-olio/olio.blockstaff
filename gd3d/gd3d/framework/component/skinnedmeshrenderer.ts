/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
    * @public
    * @language zh_CN
    * @classdesc
    * 蒙皮网格渲染组件
    * @version egret-gd3d 1.0
    */
    @reflect.nodeRender
    @reflect.nodeComponent
    export class skinnedMeshRenderer implements IRenderer
    {
        static readonly ClassName:string="skinnedMeshRenderer";

        constructor()
        {
        }
        /**
         * 挂载的gameobject
         */
        gameObject: gameObject;
        /**
         * 场景渲染层级（common、transparent、overlay）
         */
        layer: RenderLayerEnum = RenderLayerEnum.Common;
        /**
         * 渲染mask层级（和相机相对应）
         */
        //renderLayer: CullingMask = CullingMask.default;
        get renderLayer() { return this.gameObject.layer; }
        set renderLayer(layer: number)
        {
            this.gameObject.layer = layer;
        }
        private issetq = false;
        _queue: number = 0;
        /**
         * 返回此组件的场景渲染层级排序依据queue大小
         */
        get queue(): number
        {
            return this._queue;
        }
        /**
         * 设置此组件的场景渲染层级排序number大小
         */
        set queue(value: number)
        {
            this._queue = value;
            this.issetq = true;
        }
        /**
         * 材质数组
         */
        @gd3d.reflect.Field("material[]")
        materials: material[];
        /**
         * @private
         */
        _player: aniplayer;
        /**
         * 返回动画播放组件
         */
        get player(): aniplayer
        {
            if (this._player == null)
            {
                this._player = this.gameObject.getComponentInParent("aniplayer") as aniplayer;
            }
            return this._player;
        }

        private _mesh: mesh;
        /**
         * 返回mesh数据
         */
        @gd3d.reflect.Field("mesh")
        get mesh()
        {
            return this._mesh;
        }
        /**
         * 设置mesh数据
         */
        set mesh(mesh: mesh)
        {
            if (this._mesh != null)
            {
                this._mesh.unuse();
            }
            this._mesh = mesh;
            if (this._mesh != null)
            {
                this._mesh.use();
            }
        }
        /**
         * @private
         */
        @gd3d.reflect.Field("transform[]")
        bones: transform[];
        /**
         * @private
         */
        @gd3d.reflect.Field("transform")
        rootBone: transform;
        /**
         * @private
         */
        // @gd3d.reflect.Field("vector3")
        center: math.vector3;
        /**
         * @private
         */
        // @gd3d.reflect.Field("vector3")
        size: math.vector3;
        /**
         * 最大骨骼数量
         * @version egret-gd3d 1.0
         */
        maxBoneCount: number = 55;
        //是否高效
        private _efficient: boolean = true;
        //这个数据是扣掉tpose之后的
        private _skeletonMatrixData: Float32Array;
        start()
        {

        }

        onPlay()
        {

        }


        /**
         * @private
         * @param index 
         */
        getMatByIndex(index: number)
        {
            let data = this.mesh.data;

            if (data.blendIndex[index].v0 >= this.maxBoneCount || data.blendIndex[index].v1 >= this.maxBoneCount || data.blendIndex[index].v2 >= this.maxBoneCount || data.blendIndex[index].v3 >= this.maxBoneCount)
            {
                return null;
            }
            let mat = new gd3d.math.matrix();
            if (this._efficient)
            {
                let vec40r = gd3d.math.pool.new_vector4();
                let vec30p = gd3d.math.pool.new_vector3();
                vec40r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 0];
                vec40r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 1];
                vec40r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 2];
                vec40r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 3];

                vec30p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 4];
                vec30p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 5];
                vec30p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 6];

                let vec41r = gd3d.math.pool.new_vector4();
                let vec31p = gd3d.math.pool.new_vector3();
                vec41r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 0];
                vec41r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 1];
                vec41r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 2];
                vec41r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 3];

                vec31p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 4];
                vec31p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 5];
                vec31p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 6];

                let vec42r = gd3d.math.pool.new_vector4();
                let vec32p = gd3d.math.pool.new_vector3();
                vec42r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 0];
                vec42r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 1];
                vec42r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 2];
                vec42r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 3];

                vec32p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 4];
                vec32p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 5];
                vec32p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 6];

                let vec43r = gd3d.math.pool.new_vector4();
                let vec33p = gd3d.math.pool.new_vector3();
                vec43r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 0];
                vec43r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 1];
                vec43r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 2];
                vec43r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 3];

                vec33p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 4];
                vec33p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 5];
                vec33p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 6];

                let mat0 = gd3d.math.pool.new_matrix();
                let mat1 = gd3d.math.pool.new_matrix();
                let mat2 = gd3d.math.pool.new_matrix();
                let mat3 = gd3d.math.pool.new_matrix();
                gd3d.math.matrixMakeTransformRTS(vec30p, math.pool.vector3_one, vec40r, mat0);
                gd3d.math.matrixMakeTransformRTS(vec31p, math.pool.vector3_one, vec41r, mat1);
                gd3d.math.matrixMakeTransformRTS(vec32p, math.pool.vector3_one, vec42r, mat2);
                gd3d.math.matrixMakeTransformRTS(vec33p, math.pool.vector3_one, vec43r, mat3);

                gd3d.math.matrixScaleByNum(data.blendWeight[index].v0, mat0);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v1, mat1);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v2, mat2);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v3, mat3);

                gd3d.math.matrixAdd(mat0, mat1, mat);
                gd3d.math.matrixAdd(mat, mat2, mat);
                gd3d.math.matrixAdd(mat, mat3, mat);

                gd3d.math.pool.delete_vector4(vec40r);
                gd3d.math.pool.delete_vector4(vec41r);
                gd3d.math.pool.delete_vector4(vec42r);
                gd3d.math.pool.delete_vector4(vec43r);
                gd3d.math.pool.delete_vector3(vec30p);
                gd3d.math.pool.delete_vector3(vec31p);
                gd3d.math.pool.delete_vector3(vec32p);
                gd3d.math.pool.delete_vector3(vec33p);
                gd3d.math.pool.delete_matrix(mat0);
                gd3d.math.pool.delete_matrix(mat1);
                gd3d.math.pool.delete_matrix(mat2);
                gd3d.math.pool.delete_matrix(mat3);
            }
            else
            {
                let mat0 = gd3d.math.pool.new_matrix();
                mat0.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v0, 16 * data.blendIndex[index].v0 + 16);
                let mat1 = gd3d.math.pool.new_matrix();
                mat1.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v1, 16 * data.blendIndex[index].v1 + 16);
                let mat2 = gd3d.math.pool.new_matrix();
                mat2.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v2, 16 * data.blendIndex[index].v2 + 16);
                let mat3 = gd3d.math.pool.new_matrix();
                mat3.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v3, 16 * data.blendIndex[index].v3 + 16);

                gd3d.math.matrixScaleByNum(data.blendWeight[index].v0, mat0);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v1, mat1);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v2, mat2);
                gd3d.math.matrixScaleByNum(data.blendWeight[index].v3, mat3);

                gd3d.math.matrixAdd(mat0, mat1, mat);
                gd3d.math.matrixAdd(mat, mat2, mat);
                gd3d.math.matrixAdd(mat, mat3, mat);

                gd3d.math.pool.delete_matrix(mat0);
                gd3d.math.pool.delete_matrix(mat1);
                gd3d.math.pool.delete_matrix(mat2);
                gd3d.math.pool.delete_matrix(mat3);
            }
            return mat;
        }
        /**
         * @public
         * @language zh_CN
         * @param ray 射线
         * @classdesc
         * 射线检测
         * @version egret-gd3d 1.0
         */
        intersects(ray: ray, outInfo: pickinfo): boolean
        {
            let ishided = false;
            let lastDistance = Number.MAX_VALUE;
            let mvpmat = this.player.gameObject.transform.getWorldMatrix();
            let data = this.mesh.data;
            for (var i = 0; i < this.mesh.submesh.length; i++)
            {
                var submesh = this.mesh.submesh[i];
                var t0 = gd3d.math.pool.new_vector3();
                var t1 = gd3d.math.pool.new_vector3();
                var t2 = gd3d.math.pool.new_vector3();
                for (var index = submesh.start; index < submesh.size; index += 3)
                {
                    let verindex0 = data.trisindex[index];
                    let verindex1 = data.trisindex[index + 1];
                    let verindex2 = data.trisindex[index + 2];

                    var p0 = data.pos[verindex0];
                    var p1 = data.pos[verindex1];
                    var p2 = data.pos[verindex2];

                    let mat0 = this.getMatByIndex(verindex0);
                    let mat1 = this.getMatByIndex(verindex1);
                    let mat2 = this.getMatByIndex(verindex2);
                    if (mat0 == null || mat1 == null || mat2 == null) continue;

                    let mat00 = gd3d.math.pool.new_matrix();
                    gd3d.math.matrixMultiply(mvpmat, mat0, mat00);
                    let mat11 = gd3d.math.pool.new_matrix();
                    gd3d.math.matrixMultiply(mvpmat, mat1, mat11);
                    let mat22 = gd3d.math.pool.new_matrix();
                    gd3d.math.matrixMultiply(mvpmat, mat2, mat22);

                    gd3d.math.matrixTransformVector3(p0, mat00, t0);
                    gd3d.math.matrixTransformVector3(p1, mat11, t1);
                    gd3d.math.matrixTransformVector3(p2, mat22, t2);

                    let tempinfo = math.pool.new_pickInfo();
                    var bool = ray.intersectsTriangle(t0, t1, t2, tempinfo);
                    if (bool)
                    {
                        if (tempinfo.distance < 0) continue;
                        if (lastDistance > tempinfo.distance)
                        {
                            ishided = true;
                            outInfo.cloneFrom(tempinfo);
                            lastDistance = outInfo.distance;
                            outInfo.faceId = index / 3;
                            outInfo.subMeshId = i;
                            var tdir = gd3d.math.pool.new_vector3();
                            gd3d.math.vec3ScaleByNum(ray.direction, outInfo.distance, tdir);
                            gd3d.math.vec3Add(ray.origin, tdir, outInfo.hitposition);
                            gd3d.math.pool.delete_vector3(tdir);
                        }
                    }
                    math.pool.delete_pickInfo(tempinfo);
                }
                gd3d.math.pool.delete_vector3(t0);
                gd3d.math.pool.delete_vector3(t1);
                gd3d.math.pool.delete_vector3(t2);
            }
            return ishided;
        }

        update(delta: number)
        {
            if (this._skeletonMatrixData == null)
            {
                this.maxBoneCount = 55;
                this._skeletonMatrixData = new Float32Array(8 * this.maxBoneCount);
                //this._efficient = true;
            }

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

            if (this.player != null)
            {
                this.player.fillPoseData(this._skeletonMatrixData, this.bones);
            }
        }

        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
        {
            DrawCallInfo.inc.currentState=DrawCallEnum.SKinrender;

            if (this.player != null)
            {
                context.updateLightMask(this.gameObject.layer);
                context.updateModel(this.player.gameObject.transform);
            }
            context.vec4_bones = this._skeletonMatrixData;
            if (this._mesh && this.mesh.glMesh)
            {
                this._mesh.glMesh.bindVboBuffer(context.webgl);
                if (this._mesh.submesh != null)
                {
                    for (let i = 0; i < this._mesh.submesh.length; i++)
                    {
                        let sm = this._mesh.submesh[i];

                        let mid = this._mesh.submesh[i].matIndex;//根据这个找到使用的具体哪个材质
                        let usemat = this.materials[mid];
                        if (usemat != null)
                        {
                            if (this.gameObject.transform.scene.fog)
                            {
                                context.fog = this.gameObject.transform.scene.fog;
                                usemat.draw(context, this._mesh, sm, "skin_fog");
                            } else
                            {
                                usemat.draw(context, this._mesh, sm, "skin");
                            }
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
            this.materials.forEach(element =>
            {
                if (element) element.unuse();
            });
            if (this.mesh)
                this.mesh.unuse(true);
            this.bones.length = 0;
            this._skeletonMatrixData=null;
        }
        /**
         * @private
         */
        clone()
        {

        }
    }


}