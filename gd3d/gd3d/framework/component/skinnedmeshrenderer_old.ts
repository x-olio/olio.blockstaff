// /// <reference path="../../io/reflect.ts" />

// namespace gd3d.framework
// {
//     /**
//     * @public
//     * @language zh_CN
//     * @classdesc
//     * 蒙皮网格渲染组件
//     * @version egret-gd3d 1.0
//     */
//     @reflect.nodeRender
//     @reflect.nodeComponent
//     export class skinnedMeshRenderer implements IRenderer
//     {
//         constructor()
//         {
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 挂载的gameobject
//          * @version egret-gd3d 1.0
//          */
//         gameObject: gameObject;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 场景渲染层级（common、transparent、overlay）
//          * @version egret-gd3d 1.0
//          */
//         layer: RenderLayerEnum = RenderLayerEnum.Common;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 渲染mask层级（和相机相对应）
//          * @version egret-gd3d 1.0
//          */
//         //renderLayer: CullingMask = CullingMask.default;
//         get renderLayer() { return this.gameObject.layer; }
//         set renderLayer(layer: number)
//         {
//             this.gameObject.layer = layer;
//         }
//         private issetq = false;
//         /**
//          * @private
//          */
//         _queue: number = 0;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 返回此组件的场景渲染层级排序依据queue大小
//          * @version egret-gd3d 1.0
//          */
//         get queue(): number
//         {
//             return this._queue;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 设置此组件的场景渲染层级排序number大小
//          * @version egret-gd3d 1.0
//          */
//         set queue(value: number)
//         {
//             this._queue = value;
//             this.issetq = true;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 材质数组
//          * @version egret-gd3d 1.0
//          */
//         @gd3d.reflect.Field("material[]")
//         materials: material[];
//         /**
//          * @private
//          */
//         _player: aniplayer;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 返回动画播放组件
//          * @version egret-gd3d 1.0
//          */
//         get player(): aniplayer
//         {
//             if (this._player == null)
//             {
//                 this._player = this.gameObject.getComponentInParent("aniplayer") as aniplayer;
//             }
//             return this._player;
//         }

//         private _mesh: mesh;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 返回mesh数据
//          * @version egret-gd3d 1.0
//          */
//         @gd3d.reflect.Field("mesh")
//         get mesh()
//         {
//             return this._mesh;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 设置mesh数据
//          * @version egret-gd3d 1.0
//          */
//         set mesh(mesh: mesh)
//         {
//             if (this._mesh != null)
//             {
//                 this._mesh.unuse();
//             }
//             this._mesh = mesh;
//             if (this._mesh != null)
//             {
//                 this._mesh.use();
//             }
//         }
//         /**
//          * @private
//          */
//         @gd3d.reflect.Field("transform[]")
//         bones: transform[];
//         /**
//          * @private
//          */
//         @gd3d.reflect.Field("transform")
//         rootBone: transform;
//         /**
//          * @private
//          */
//         // @gd3d.reflect.Field("vector3")
//         center: math.vector3;
//         /**
//          * @private
//          */
//         // @gd3d.reflect.Field("vector3")
//         size: math.vector3;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 最大骨骼数量
//          * @version egret-gd3d 1.0
//          */
//         maxBoneCount: number = 0;

//         //骨骼数据提交形态
//         private _skintype: number = 0;

//         //这个数据是扣掉tpose之后的
//         private _skeletonMatrixData: Float32Array;
//         /**
//          * @private
//          */
//         public static dataCaches: { key: string, data: Float32Array }[] = [];
//         private cacheData: Float32Array;

//         //是否高效
//         private _efficient: boolean = true;
//         start()
//         {

//         }

//         onPlay()
//         {

//         }


//         /**
//          * @private
//          * @param index 
//          */
//         getMatByIndex(index: number)
//         {
//             let data = this.mesh.data;

//             if (data.blendIndex[index].v0 >= this.maxBoneCount || data.blendIndex[index].v1 >= this.maxBoneCount || data.blendIndex[index].v2 >= this.maxBoneCount || data.blendIndex[index].v3 >= this.maxBoneCount)
//             {
//                 return null;
//             }
//             let mat = new gd3d.math.matrix();
//             if (this._efficient)
//             {
//                 let vec40r = gd3d.math.pool.new_vector4();
//                 let vec30p = gd3d.math.pool.new_vector3();
//                 vec40r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 0];
//                 vec40r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 1];
//                 vec40r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 2];
//                 vec40r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 3];

//                 vec30p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 4];
//                 vec30p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 5];
//                 vec30p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v0 + 6];

//                 let vec41r = gd3d.math.pool.new_vector4();
//                 let vec31p = gd3d.math.pool.new_vector3();
//                 vec41r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 0];
//                 vec41r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 1];
//                 vec41r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 2];
//                 vec41r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 3];

//                 vec31p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 4];
//                 vec31p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 5];
//                 vec31p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v1 + 6];

//                 let vec42r = gd3d.math.pool.new_vector4();
//                 let vec32p = gd3d.math.pool.new_vector3();
//                 vec42r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 0];
//                 vec42r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 1];
//                 vec42r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 2];
//                 vec42r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 3];

//                 vec32p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 4];
//                 vec32p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 5];
//                 vec32p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v2 + 6];

//                 let vec43r = gd3d.math.pool.new_vector4();
//                 let vec33p = gd3d.math.pool.new_vector3();
//                 vec43r.x = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 0];
//                 vec43r.y = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 1];
//                 vec43r.z = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 2];
//                 vec43r.w = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 3];

//                 vec33p.x = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 4];
//                 vec33p.y = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 5];
//                 vec33p.z = this._skeletonMatrixData[8 * data.blendIndex[index].v3 + 6];

//                 let mat0 = gd3d.math.pool.new_matrix();
//                 let mat1 = gd3d.math.pool.new_matrix();
//                 let mat2 = gd3d.math.pool.new_matrix();
//                 let mat3 = gd3d.math.pool.new_matrix();
//                 gd3d.math.matrixMakeTransformRTS(vec30p, math.pool.vector3_one, vec40r, mat0);
//                 gd3d.math.matrixMakeTransformRTS(vec31p, math.pool.vector3_one, vec41r, mat1);
//                 gd3d.math.matrixMakeTransformRTS(vec32p, math.pool.vector3_one, vec42r, mat2);
//                 gd3d.math.matrixMakeTransformRTS(vec33p, math.pool.vector3_one, vec43r, mat3);

//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v0, mat0);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v1, mat1);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v2, mat2);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v3, mat3);

//                 gd3d.math.matrixAdd(mat0, mat1, mat);
//                 gd3d.math.matrixAdd(mat, mat2, mat);
//                 gd3d.math.matrixAdd(mat, mat3, mat);

//                 gd3d.math.pool.delete_vector4(vec40r);
//                 gd3d.math.pool.delete_vector4(vec41r);
//                 gd3d.math.pool.delete_vector4(vec42r);
//                 gd3d.math.pool.delete_vector4(vec43r);
//                 gd3d.math.pool.delete_vector3(vec30p);
//                 gd3d.math.pool.delete_vector3(vec31p);
//                 gd3d.math.pool.delete_vector3(vec32p);
//                 gd3d.math.pool.delete_vector3(vec33p);
//                 gd3d.math.pool.delete_matrix(mat0);
//                 gd3d.math.pool.delete_matrix(mat1);
//                 gd3d.math.pool.delete_matrix(mat2);
//                 gd3d.math.pool.delete_matrix(mat3);
//             }
//             else
//             {
//                 let mat0 = gd3d.math.pool.new_matrix();
//                 mat0.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v0, 16 * data.blendIndex[index].v0 + 16);
//                 let mat1 = gd3d.math.pool.new_matrix();
//                 mat1.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v1, 16 * data.blendIndex[index].v1 + 16);
//                 let mat2 = gd3d.math.pool.new_matrix();
//                 mat2.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v2, 16 * data.blendIndex[index].v2 + 16);
//                 let mat3 = gd3d.math.pool.new_matrix();
//                 mat3.rawData = this._skeletonMatrixData.slice(16 * data.blendIndex[index].v3, 16 * data.blendIndex[index].v3 + 16);

//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v0, mat0);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v1, mat1);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v2, mat2);
//                 gd3d.math.matrixScaleByNum(data.blendWeight[index].v3, mat3);

//                 gd3d.math.matrixAdd(mat0, mat1, mat);
//                 gd3d.math.matrixAdd(mat, mat2, mat);
//                 gd3d.math.matrixAdd(mat, mat3, mat);

//                 gd3d.math.pool.delete_matrix(mat0);
//                 gd3d.math.pool.delete_matrix(mat1);
//                 gd3d.math.pool.delete_matrix(mat2);
//                 gd3d.math.pool.delete_matrix(mat3);
//             }
//             return mat;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @param ray 射线
//          * @classdesc
//          * 射线检测
//          * @version egret-gd3d 1.0
//          */
//         intersects(ray: ray, outInfo: pickinfo): boolean
//         {
//             let ishided = false;
//             let lastDistance = Number.MAX_VALUE;
//             let mvpmat = this.player.gameObject.transform.getWorldMatrix();
//             let data = this.mesh.data;
//             for (var i = 0; i < this.mesh.submesh.length; i++)
//             {
//                 var submesh = this.mesh.submesh[i];
//                 var t0 = gd3d.math.pool.new_vector3();
//                 var t1 = gd3d.math.pool.new_vector3();
//                 var t2 = gd3d.math.pool.new_vector3();
//                 for (var index = submesh.start; index < submesh.size; index += 3)
//                 {
//                     let verindex0 = data.trisindex[index];
//                     let verindex1 = data.trisindex[index + 1];
//                     let verindex2 = data.trisindex[index + 2];

//                     var p0 = data.pos[verindex0];
//                     var p1 = data.pos[verindex1];
//                     var p2 = data.pos[verindex2];

//                     let mat0 = this.getMatByIndex(verindex0);
//                     let mat1 = this.getMatByIndex(verindex1);
//                     let mat2 = this.getMatByIndex(verindex2);
//                     if (mat0 == null || mat1 == null || mat2 == null) continue;

//                     let mat00 = gd3d.math.pool.new_matrix();
//                     gd3d.math.matrixMultiply(mvpmat, mat0, mat00);
//                     let mat11 = gd3d.math.pool.new_matrix();
//                     gd3d.math.matrixMultiply(mvpmat, mat1, mat11);
//                     let mat22 = gd3d.math.pool.new_matrix();
//                     gd3d.math.matrixMultiply(mvpmat, mat2, mat22);

//                     gd3d.math.matrixTransformVector3(p0, mat00, t0);
//                     gd3d.math.matrixTransformVector3(p1, mat11, t1);
//                     gd3d.math.matrixTransformVector3(p2, mat22, t2);

//                     let tempinfo = math.pool.new_pickInfo();
//                     var bool = ray.intersectsTriangle(t0, t1, t2, tempinfo);
//                     if (bool)
//                     {
//                         if (tempinfo.distance < 0) continue;
//                         if (lastDistance > tempinfo.distance)
//                         {
//                             ishided = true;
//                             outInfo.cloneFrom(tempinfo);
//                             lastDistance = outInfo.distance;
//                             outInfo.faceId = index / 3;
//                             outInfo.subMeshId = i;
//                             var tdir = gd3d.math.pool.new_vector3();
//                             gd3d.math.vec3ScaleByNum(ray.direction, outInfo.distance, tdir);
//                             gd3d.math.vec3Add(ray.origin, tdir, outInfo.hitposition);
//                             gd3d.math.pool.delete_vector3(tdir);
//                         }
//                     }
//                     math.pool.delete_pickInfo(tempinfo);
//                 }
//                 gd3d.math.pool.delete_vector3(t0);
//                 gd3d.math.pool.delete_vector3(t1);
//                 gd3d.math.pool.delete_vector3(t2);
//             }
//             return ishided;
//         }

//         update(delta: number)
//         {
//             if (this._skeletonMatrixData == null)
//             {
//                 //根据shader决定传什么数据
//                 this._skintype = this.useBoneShader(this.materials[0]);
//                 if (this._skintype == 1)
//                 {
//                     this.maxBoneCount = 24;
//                     this._skeletonMatrixData = new Float32Array(16 * this.maxBoneCount);
//                     this._efficient = false;
//                 }
//                 else if (this._skintype == 2)
//                 {
//                     this.maxBoneCount = 55;
//                     this._skeletonMatrixData = new Float32Array(8 * this.maxBoneCount);
//                     this._efficient = true;
//                 }
//             }

//             if (this.materials != null && this.materials.length > 0)
//             {
//                 let _mat = this.materials[0];
//                 if (_mat)
//                 {
//                     this.layer = _mat.getLayer();
//                     if (!this.issetq)
//                         this._queue = _mat.getQueue();
//                 }
//             }

//             if (this.player != null)
//             {
//                 if (this.player.isCache && !this.player.mix)
//                 {
//                     let cacheKey = this.player.cacheKey + "_" + this.mesh.getGUID();
//                     let data: Float32Array = skinnedMeshRenderer.dataCaches[cacheKey];
//                     if (!data)
//                     {
//                         let _cachePlayer = aniplayer.playerCaches[this.player.cacheKey];
//                         if (_cachePlayer)
//                         {
//                             let baseSize = this._efficient ? 8 : 16;
//                             data = new Float32Array(this.maxBoneCount * baseSize);
//                             _cachePlayer.fillPoseData(data, this.bones, this._efficient);
//                             skinnedMeshRenderer.dataCaches[cacheKey] = data;
//                             this.cacheData = data;
//                             return;
//                         }
//                     }
//                     else
//                     {
//                         this.cacheData = data;
//                         return;
//                     }
//                 }
//                 this.cacheData = null;

//                 if (this._skeletonMatrixData != null)
//                 {
//                     this.player.fillPoseData(this._skeletonMatrixData, this.bones, this._efficient);
//                 }
//             }


//         }

//         render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
//         {
//             DrawCallInfo.inc.currentState=DrawCallEnum.SKinrender;

//             if (this.player != null)
//             {
//                 context.updateLightMask(this.gameObject.layer);
//                 context.updateModel(this.player.gameObject.transform);
//             }


//             for (let i = 0; i < this.materials.length; i++)
//             {
//                 if (this.materials[i] == null) continue;
//                 if (this.cacheData != null && this._skintype > 0)
//                 {
//                     if (this._efficient)
//                     {
//                         //this.materials[i].setVector4v("glstate_vec4_bones", this.cacheData);
//                         context.vec4_bones = this.cacheData;
//                     }
//                     else
//                     {
//                         //this.materials[i].setMatrixv("glstate_matrix_bones", this.cacheData);
//                         context.matrix_bones = this.cacheData;
//                     }
//                     continue;
//                 }
//                 if (this._skeletonMatrixData != null && this._skintype > 0)
//                 {
//                     if (this._efficient)
//                     {
//                         //this.materials[i].setVector4v("glstate_vec4_bones", this._skeletonMatrixData);
//                         context.vec4_bones = this._skeletonMatrixData;

//                     }
//                     else
//                     {
//                         //this.materials[i].setMatrixv("glstate_matrix_bones", this._skeletonMatrixData);
//                         context.matrix_bones = this._skeletonMatrixData;

//                     }
//                 }
//             }
//             if (this._mesh && this.mesh.glMesh)
//             {
//                 this._mesh.glMesh.bindVboBuffer(context.webgl);
//                 if (this._mesh.submesh != null)
//                 {
//                     for (var i = 0; i < this._mesh.submesh.length; i++)
//                     {
//                         var sm = this._mesh.submesh[i];

//                         var mid = this._mesh.submesh[i].matIndex;//根据这个找到使用的具体哪个材质
//                         var usemat = this.materials[mid];
//                         if (usemat != null)
//                         {
//                             if (this.gameObject.transform.scene.fog)
//                             {
//                                 context.fog = this.gameObject.transform.scene.fog;
//                                 usemat.draw(context, this._mesh, sm, "skin_fog");
//                             } else
//                             {
//                                 usemat.draw(context, this._mesh, sm, "skin");
//                             }
//                         }
//                     }
//                 }
//             }

//         }
//         /**
//          * @private
//          */
//         remove()
//         {
//             this.materials.forEach(element =>
//             {
//                 if (element) element.unuse();
//             });
//             if (this.mesh)
//                 this.mesh.unuse(true);
//             this.bones.length = 0;
//         }
//         /**
//          * @private
//          */
//         clone()
//         {

//         }
//         /**
//          * @private
//          */
//         useBoneShader(mat: material): number
//         {
//             var matpasses: gd3d.render.glDrawPass[] = mat.getShader().passes["skin"];
//             if (matpasses == null || matpasses.length == 0) return 0;
//             if (matpasses[0].mapuniforms["glstate_vec4_bones"] != null)
//                 return 2;
//             else if (matpasses[0].mapuniforms["glstate_matrix_bones"] != null)
//                 return 1;
//             return 0;
//         }
//     }


// }