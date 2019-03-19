// namespace gd3d.framework
// {
//     /**
//      * @public
//      * @language zh_CN
//      * @classdesc
//      * 特效组件
//      * @version egret-gd3d 1.0
//      */
//     @reflect.nodeRender
//     @reflect.nodeComponent
//     @reflect.selfClone
//     export class effectSystemNew implements IRenderer
//     {
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 挂载的gameobject
//          * @version egret-gd3d 1.0
//          */
//         gameObject: gameObject;
//         layer: RenderLayerEnum = RenderLayerEnum.Transparent;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 渲染层级
//          * @version egret-gd3d 1.0
//          */
//         renderLayer: CullingMask = CullingMask.default;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 同层级渲染排序依据
//          * @version egret-gd3d 1.0
//          */
//         queue: number = 0;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 自动播放
//          * @version egret-gd3d 1.0
//          */
//         @gd3d.reflect.Field("boolean")
//         autoplay: boolean = true;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 特效是否循环
//          * @version egret-gd3d 1.0
//          */
//         @gd3d.reflect.Field("boolean")
//         beLoop: boolean;
//         /**
//         * @private
//         */
//         state: EffectPlayStateEnum = EffectPlayStateEnum.None;
//         private curFrameId: number = -1;

//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 特效播放速度
//          * @version egret-gd3d 1.0
//          */
//         public static fps: number = 30;
//         private playTimer: number = 0;
//         private speed: number = 1;
//         /**
//         * @private
//         */
//         public webgl: WebGLRenderingContext;
//         // private time: number = 0;

//         private parser = new gd3d.framework.EffectParser();
//         /**
//         * @private
//         */
//         public vf = gd3d.render.VertexFormatMask.Position | render.VertexFormatMask.Normal | render.VertexFormatMask.Tangent | render.VertexFormatMask.Color | render.VertexFormatMask.UV0;
//         /**
//         * @private
//         */
//         //public particleVF=gd3d.render.VertexFormatMask.Position | render.VertexFormatMask.Color | render.VertexFormatMask.UV0;//法线切线不要

//         private effectBatchers: EffectBatcherNew[] = [];
//         private matDataGroups: EffectMatData[] = [];


//         private particles: Particles;//粒子系统 发射器统一管理
//         private particleElementDic: { [name: string]: EffectElementData } = {};

//         /**
//         * @private
//         */
//         @gd3d.reflect.Field("textasset")
//         jsonData: textasset;
//         /**
//          * @public
//          * @language zh_CN
//          * @classdesc
//          * 设置特效数据 textasset
//          * @version egret-gd3d 1.0
//          */
//         setJsonData(_jsonData: textasset)
//         {
//             this.webgl = gd3d.framework.sceneMgr.app.webgl;
//             this.jsonData = _jsonData;
//             this.data = this.parser.Parse(this.jsonData.content, gd3d.framework.sceneMgr.app.getAssetMgr());
//         }
//         /**
//         * @private
//         */
//         set data(value: EffectSystemData)
//         {
//             this._data = value;
//         }
//         /**
//         * @private
//         */
//         get data(): EffectSystemData
//         {
//             return this._data;
//         }
//         /**
//         * @private
//         */
//         init()
//         {

//         }
//         private _data: EffectSystemData;
//         /**
//         * @private
//         */
//         get totalFrameCount(): number
//         {
//             return this.data.life * effectSystem.fps;
//         }

//         start()
//         {
//             this.init();
//         }
//         update(delta: number)
//         {
//             if (this.gameObject.getScene() == null || this.gameObject.getScene() == undefined)
//                 return;
//             if (this.state == EffectPlayStateEnum.Play || this.state == EffectPlayStateEnum.Pause)
//             {
//                 if (this.state == EffectPlayStateEnum.Play)
//                     this.playTimer += delta * this.speed;
//                 if (!this.beLoop)
//                 {
//                     if (this.playTimer >= this.data.life)
//                     {
//                         this.stop();
//                     }
//                 }
//                 this._update(delta);
//             }
//             else if (this.state == EffectPlayStateEnum.BeReady)
//             {
//                 if (this.autoplay)
//                 {
//                     this.play();
//                     this._update(delta);
//                 }
//                 else
//                 {
//                     this.gameObject.visible = false;
//                     this.gameObject.transform.markDirty();
//                 }
//             }
//         }

//         /**
//          * 更新特效数据
//          * 
//          * @private
//          * @param {number} delta 
//          * 
//          * @memberof effectSystem
//          */
//         private _update(delta: number)
//         {
//             // if (this.delayElements.length > 0)
//             // {
//             //     if (this.refElements.length > 0)
//             //         this.refElements = [];
//             //     for (let i = this.delayElements.length - 1; i >= 0; i--)
//             //     {
//             //         let data = this.delayElements[i];
//             //         if (data.delayTime <= this.playTimer)
//             //         {
//             //             this.addElement(this.delayElements[i]);
//             //             this.delayElements.splice(i, 1);
//             //         }
//             //     }
//             // }
//             if (this.checkFrameId())
//             {
//                 for (let i in this.effectBatchers)
//                 {
//                     let subEffectBatcher = this.effectBatchers[i];
//                     for (let key in subEffectBatcher.effectElements)
//                     {
//                         let element = subEffectBatcher.effectElements[key];
//                         if (element.delayTime == undefined || element.delayTime <= this.playTimer)
//                         {
//                             //没有延时或者延时已经结束
//                             subEffectBatcher.mesh.submesh[0].size = element.endEboIndex;
//                         } else
//                         {
//                             if (subEffectBatcher.mesh.submesh[0].size > element.startEboIndex)
//                                 subEffectBatcher.mesh.submesh[0].size = element.startEboIndex;
//                         }
//                         // let frameId = this.curFrameId % element.loopFrame;
//                         let frameId = (this.curFrameId - this.getDelayFrameCount(element.delayTime)) % element.loopFrame;
                        
//                         if (element.active)
//                         {
//                             element.actionActive = false;
//                             this.mergeLerpAttribData(element.curAttrData, element, frameId);
//                             if (element.actions != undefined)
//                             {
//                                 element.actionActive = true;
//                                 for (let j in element.actions)
//                                 {
//                                     element.actions[j].update(frameId);
//                                 }
//                             }
//                         }
//                         element.update();
//                         if (element.isCurFrameNeedRefresh(frameId))
//                         {
//                             this.updateEffectBatcher(element.effectBatcher, element.curAttrData, element.mesh, element.startVboIndex);
//                         }
//                     }
//                 }
//                 // if (this.particles != undefined)
//                 // {
//                 //     this.particles.update(1 / effectSystem.fps);
//                 // }
//             }

//         }

//         /**
//          * 将插值信息合并到当前帧数据
//          * 
//          * @param {EffectAttrsData} realUseCurFrameData 
//          * @param {EffectFrameData} curFrameData 
//          * @returns 
//          * 
//          * @memberof effectSystem
//          */
//         private mergeLerpAttribData(realUseCurFrameData: EffectAttrsData, effect: EffectElementSingleMesh, frameId: number)
//         {
//             let timeLinePos = effect.timelineFrames[AttributeType.PositionType];
//             if (timeLinePos[frameId] != undefined)
//                 realUseCurFrameData.pos = timeLinePos[frameId];
//             let timeLineEuler = effect.timelineFrames[AttributeType.EulerType];
//             if (timeLineEuler[frameId] != undefined)
//                 realUseCurFrameData.euler = timeLineEuler[frameId];
//             let timeLineScale = effect.timelineFrames[AttributeType.ScaleType];
//             if (timeLineScale[frameId] != undefined)
//                 realUseCurFrameData.scale = timeLineScale[frameId];
//             let timeLineColor = effect.timelineFrames[AttributeType.ColorType];
//             if (timeLineColor[frameId] != undefined)
//                 realUseCurFrameData.color = timeLineColor[frameId];
//             let timeLineAlpha = effect.timelineFrames[AttributeType.AlphaType];
//             if (timeLineAlpha[frameId] != undefined)
//                 realUseCurFrameData.alpha = timeLineAlpha[frameId];

//             let timeLineTilling = effect.timelineFrames[AttributeType.TillingType];
//             if (timeLineTilling[frameId] != undefined)
//                 realUseCurFrameData.tilling = timeLineTilling[frameId];
//         }

//         /**
//          * 根据当前帧的数据更新EffectBatcher中的vbo，ebo信息
//          * 
//          * @private
//          * @param {EffectBatcher} effectBatcher 
//          * @param {EffectAttrsData} curAttrsData 
//          * @param {EffectFrameData} initFrameData 
//          * @param {number} vertexStartIndex 
//          * @param {number} delta 
//          * @returns 
//          * 
//          * @memberof effectSystem
//          */
//         private updateEffectBatcher(effectBatcher: EffectBatcherNew, curAttrsData: EffectAttrsData, mesh: gd3d.framework.mesh, vertexStartIndex: number)
//         {
//             // let mesh = curAttrsData.mesh;
//             // if (mesh == undefined)
//             // {
//             //     mesh = initFrameData.attrsData.mesh;
//             // }
//             if (mesh == undefined)
//                 return;
//             if (curAttrsData.meshdataVbo == undefined)
//             {
//                 curAttrsData.meshdataVbo = mesh.data.genVertexDataArray(this.vf);
//             }
//             let vertexCount = mesh.data.pos.length;//顶点数量
//             let vertexArr = curAttrsData.meshdataVbo;
//             let vertexSize = effectBatcher.vertexSize;
//             for (let i = 0; i < vertexCount; i++)
//             {
//                 {//postion
//                     let vertex = gd3d.math.pool.new_vector3();
//                     vertex.x = vertexArr[i * vertexSize + 0];
//                     vertex.y = vertexArr[i * vertexSize + 1];
//                     vertex.z = vertexArr[i * vertexSize + 2];

//                     gd3d.math.matrixTransformVector3(vertex, curAttrsData.matrix, vertex);

//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 0] = vertex.x;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 1] = vertex.y;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 2] = vertex.z;
//                     gd3d.math.pool.delete_vector3(vertex);
//                 }

//                 {//color
//                     //处理一下颜色，以防灰度值 > 1
//                     let r = vertexArr[i * vertexSize + 9];
//                     let g = vertexArr[i * vertexSize + 10];
//                     let b = vertexArr[i * vertexSize + 11];
//                     let a = vertexArr[i * vertexSize + 12];
//                     if (curAttrsData.color != undefined)
//                     {
//                         r = curAttrsData.color.x;
//                         g = curAttrsData.color.y;
//                         b = curAttrsData.color.z;
//                     }
//                     if (curAttrsData.alpha != undefined)
//                         a = a * curAttrsData.alpha;//配置的alpha作为整体的百分比使用 源alpha依然是具体顶点的
//                     if (curAttrsData.colorRate != undefined)
//                     {
//                         r *= curAttrsData.colorRate;
//                         g *= curAttrsData.colorRate;
//                         b *= curAttrsData.colorRate;
//                         a *= curAttrsData.colorRate;
//                     }

//                     r = math.floatClamp(r, 0, 3);
//                     g = math.floatClamp(g, 0, 3);
//                     b = math.floatClamp(b, 0, 3);
//                     a = math.floatClamp(a, 0, 3);

//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 9] = r;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 10] = g;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 11] = b;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 12] = a;
//                 }
//                 {
//                     //uv
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 13] = vertexArr[i * vertexSize + 13] * curAttrsData.tilling.x + curAttrsData.uv.x;
//                     effectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 14] = vertexArr[i * vertexSize + 14] * curAttrsData.tilling.y + curAttrsData.uv.y;
//                 }
//             }
//         }

//         /**
//          * 提交各个EffectBatcher中的数据进行渲染
//          * 
//          * @param {renderContext} context 
//          * @param {assetMgr} assetmgr 
//          * @param {gd3d.framework.camera} camera 
//          * 
//          * @memberof effectSystem
//          */
//         render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
//         {
//             if (!(camera.CullingMask & this.renderLayer)) return;
//             if (this.state == EffectPlayStateEnum.Play)
//             {
//                 context.updateModel(this.gameObject.transform);
//                 for (let i in this.effectBatchers)
//                 {
//                     let subEffectBatcher = this.effectBatchers[i];
//                     let mesh = subEffectBatcher.mesh;
//                     if (subEffectBatcher.state === EffectBatcherState.NotInitedStateType)
//                     {
//                         mesh.glMesh.initBuffer(context.webgl, this.vf, subEffectBatcher.curTotalVertexCount);
//                         if (mesh.glMesh.ebos.length == 0)
//                         {
//                             mesh.glMesh.addIndex(context.webgl, subEffectBatcher.dataForEbo.length);
//                         }
//                         else
//                         {
//                             mesh.glMesh.resetEboSize(context.webgl, 0, subEffectBatcher.dataForEbo.length);
//                         }
//                         mesh.glMesh.uploadIndexSubData(context.webgl, 0, subEffectBatcher.dataForEbo);
//                         mesh.submesh[0].size = subEffectBatcher.dataForEbo.length;
//                         subEffectBatcher.state = EffectBatcherState.InitedStateType;
//                     }
//                     else if (subEffectBatcher.state === EffectBatcherState.ResizeCapacityStateType)
//                     {

//                         mesh.glMesh.resetEboSize(context.webgl, 0, subEffectBatcher.dataForEbo.length);//动态修正掉mesh中的ebo大小
//                         mesh.submesh[0].size = subEffectBatcher.dataForEbo.length;
//                         mesh.glMesh.uploadIndexSubData(context.webgl, 0, subEffectBatcher.dataForEbo);
//                         mesh.glMesh.resetVboSize(context.webgl, subEffectBatcher.curTotalVertexCount * subEffectBatcher.vertexSize);//动态修正mesh中的vbo大小
//                         subEffectBatcher.state = EffectBatcherState.InitedStateType;
//                     }

//                     mesh.glMesh.uploadVertexSubData(context.webgl, subEffectBatcher.dataForVbo);
//                     if (this.gameObject.getScene().fog)
//                     {
//                         context.fog = this.gameObject.getScene().fog;
//                         subEffectBatcher.mat.draw(context, mesh, mesh.submesh[0], "base_fog");//只有一个submesh
//                     } else
//                     {
//                         subEffectBatcher.mat.draw(context, mesh, mesh.submesh[0], "base");//只有一个submesh
//                     }
//                 }
//                 if (this.particles != undefined)
//                 {
//                     this.particles.render(context, assetmgr, camera);
//                 }
//             }
//         }
//         /**
//          * @private
//          */
//         clone()
//         {
//             let effect = new effectSystem();
//             effect.data = this.data.clone();
//             return effect;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @param speed 播放速度
//          * @classdesc
//          * 播放特效
//          * @version egret-gd3d 1.0
//          */
//         play(speed: number = 1)
//         {
//             this.speed = speed;
//             this.state = EffectPlayStateEnum.Play;
//             this.gameObject.visible = true;
//             this.gameObject.transform.markDirty();
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @param speed 播放速度
//          * @classdesc
//          * 暂停播放
//          * @version egret-gd3d 1.0
//          */
//         pause()
//         {
//             this.state = EffectPlayStateEnum.Pause;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @param speed 播放速度
//          * @classdesc
//          * 停止播放
//          * @version egret-gd3d 1.0
//          */
//         stop()
//         {
//             this.reset();
//             this.state = EffectPlayStateEnum.Stop;
//         }
//         /**
//          * @public
//          * @language zh_CN
//          * @param speed 播放速度
//          * @classdesc
//          * 重置到初始状态
//          * @version egret-gd3d 1.0
//          */
//         reset(restSinglemesh: boolean = true, resetParticle: boolean = true)
//         {
//             this.state = EffectPlayStateEnum.BeReady;
//             this.gameObject.visible = false;
//             this.playTimer = 0;

//             this.resetSingleMesh();
//             // this.resetparticle();
//         }
//         private resetSingleMesh()
//         {
//             // for (let i in this.effectBatchers)
//             // {
//             //     let subEffectBatcher = this.effectBatchers[i];
//             //     for (let key in subEffectBatcher.effectElements)
//             //     {
//             //         let element = subEffectBatcher.effectElements[key];
//             //         element.setActive(true);
//             //         if (element.data.initFrameData != undefined)//引用问题还没处理
//             //             element.curAttrData = element.data.initFrameData.attrsData.copyandinit();
//             //     }
//             // }
//         }

//         private delayElements: EffectElementData[] = [];
//         private refElements: EffectElementData[] = [];

//         /**
//         * @private
//         */
//         public setFrameId(id: number)
//         {
//             if (this.state == EffectPlayStateEnum.Pause && id >= 0 && id < this.totalFrameCount)
//                 this.curFrameId = id;
//         }

//         /**
//         * @private
//         */
//         public getDelayFrameCount(delayTime: number)
//         {
//             return delayTime * effectSystem.fps;
//         }
//         private beExecuteNextFrame: boolean = true;
//         /**
//          * 计算当前的frameid
//          * 
//          * @private
//          * 
//          * @memberof effectSystem
//          */
//         private checkFrameId(): boolean
//         {
//             // if(this.state == EffectPlayStateEnum.Pause)
//             //     return true;
//             let curid = (effectSystem.fps * this.playTimer) | 0;
//             if (curid != this.curFrameId)
//             {
//                 if (this.state == EffectPlayStateEnum.Play)
//                     this.curFrameId = curid;
//                 this.beExecuteNextFrame = true;
//                 return true;
//             }
//             return false;
//         }
//         /**
//         * @private
//         */
//         remove()
//         {
//             this.state = EffectPlayStateEnum.Dispose;
//             if (this.data)
//                 this.data.dispose();
//             for (let key in this.effectBatchers)
//             {
//                 this.effectBatchers[key].dispose();
//             }
//             if (this.particles)
//                 this.particles.dispose();
//         }
//         /**
//         * @private
//         * 临时测试时显示使用
//         * @readonly
//         * @type {number}
//         * @memberof effectSystem
//         */
//         public get leftLifeTime(): number
//         {
//             if (this.data != null)
//             {
//                 return this.data.life - this.playTimer;
//             } else
//                 return 9999999999;
//         }

//         /**
//          * /////////////////////////////////////////////////////代码重构///////////////////////////////////////////////////////
//          */
//         @gd3d.reflect.Field("IEffectElement[]")
//         public effectElements: IEffectElement[];
//         public addEffectElement(type: gd3d.framework.EffectElementTypeEnum): IEffectElement
//         {
//             if (this.effectElements == undefined)
//                 this.effectElements = [];
//             let effe: IEffectElement;
//             if (type == gd3d.framework.EffectElementTypeEnum.SingleMeshType)
//             {
//                 effe = new gd3d.framework.EffectElementSingleMesh(this.gameObject.getScene().app.getAssetMgr(), this);
//                 effe.name = "singlemesh" + this.effectElements.length;
//                 let singleMeshElement = effe as gd3d.framework.EffectElementSingleMesh;
//                 singleMeshElement.transform = this.gameObject.transform;
//                 this.addInitFrameNew(singleMeshElement);
//                 this.state = EffectPlayStateEnum.BeReady;
//                 // this.beLoop = this.data.beLoop;
//             }
//             else if (type == gd3d.framework.EffectElementTypeEnum.EmissionType)
//             {
//                 //effe = new gd3d.framework.EffectElementEmission();
//                 effe.name = "emission" + this.effectElements.length;

//             }
//             this.effectElements.push(effe);
//             return effe;
//         }


//         private addInitFrameNew(effect: EffectElementSingleMesh)
//         {
//             if (effect == undefined || effect.mesh == undefined || effect.mat == undefined)//初始化帧如果不存在,或者没有设置mesh信息，就不处理这个元素
//                 return;
//             // let index = -1;
//             // for (let i = 0; i < this.matDataGroups.length; i++)
//             // {
//             //     if (EffectMatData.beEqual(this.matDataGroups[i], effect.mat))
//             //     {
//             //         index = i;
//             //         break;
//             //     }
//             // }

//             let vertexStartIndex = 0;
//             let vertexCount = effect.mesh.data.pos.length;//顶点数量
//             let indexCount = effect.mesh.data.genIndexDataArray();
//             // let subEffectBatcher: EffectBatcher = null;
//             // if (index >= 0)
//             // {
//             //     subEffectBatcher = this.effectBatchers[index];
//             //     vertexStartIndex = subEffectBatcher.curTotalVertexCount;
//             //     subEffectBatcher.curTotalVertexCount += vertexCount;
//             //     if (subEffectBatcher.state == EffectBatcherState.InitedStateType)
//             //         subEffectBatcher.state = EffectBatcherState.ResizeCapacityStateType;
//             // } else
//             // {



//             let subEffectBatcher = new EffectBatcherNew(this.vf);
//             subEffectBatcher.curTotalVertexCount = vertexCount;
//             subEffectBatcher.mesh = new mesh();
//             subEffectBatcher.mesh.data = new render.meshData();
//             subEffectBatcher.mesh.glMesh = new render.glMesh();
//             subEffectBatcher.mat = new material();
//             subEffectBatcher.mesh.submesh = [];
//             {
//                 var sm = new subMeshInfo();
//                 sm.matIndex = 0;
//                 sm.useVertexIndex = 0;
//                 sm.start = 0;
//                 sm.size = 0;
//                 sm.line = false;
//                 subEffectBatcher.mesh.submesh.push(sm);
//             }
//             vertexStartIndex = 0;
//             // index = 0;

//             this.effectBatchers.push(subEffectBatcher);
//             // this.matDataGroups.push(_initFrameData.attrsData.mat);

//             // }
//             effect.effectBatcher = subEffectBatcher;
//             effect.startVboIndex = vertexStartIndex;
//             // element.endEboIndex = ;vertexStartIndex + vertexCount;
//             // element.curAttrData = elementData.initFrameData.attrsData.copyandinit();
//             let vertexSize = subEffectBatcher.vertexSize;
//             let vertexArr = effect.mesh.data.genVertexDataArray(this.vf);
//             effect.curAttrData = effect.copyandinit();
//             effect.update();
//             subEffectBatcher.effectElements.push(effect);

//             for (let i = 0; i < vertexCount; i++)
//             {
//                 {//postion
//                     let vertex = gd3d.math.pool.new_vector3();
//                     vertex.x = vertexArr[i * vertexSize + 0];
//                     vertex.y = vertexArr[i * vertexSize + 1];
//                     vertex.z = vertexArr[i * vertexSize + 2];

//                     gd3d.math.matrixTransformVector3(vertex, effect.curAttrData.matrix, vertex);

//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 0] = vertex.x;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 1] = vertex.y;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 2] = vertex.z;
//                     gd3d.math.pool.delete_vector3(vertex);
//                 }
//                 {//normal
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 3] = vertexArr[i * vertexSize + 3];
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 4] = vertexArr[i * vertexSize + 4];
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 5] = vertexArr[i * vertexSize + 5];
//                 }

//                 {//tangent
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 6] = vertexArr[i * vertexSize + 6];
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 7] = vertexArr[i * vertexSize + 7];
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 8] = vertexArr[i * vertexSize + 8];
//                 }
//                 {//color
//                     //处理一下颜色，以防灰度值 > 1\
//                     let color = effect.getFrameVal(AttributeType.ColorType, 0) as gd3d.math.vector3;
//                     let r = math.floatClamp(color.x, 0, 1);
//                     let g = math.floatClamp(color.y, 0, 1);
//                     let b = math.floatClamp(color.z, 0, 1);
//                     let alpha = <number>effect.getFrameVal(AttributeType.AlphaType, 0);
//                     let a = math.floatClamp(vertexArr[i * vertexSize + 12] * alpha, 0, 1);

//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 9] = r;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 10] = g;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 11] = b;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * 15 + 12] = a;

//                 }
//                 {//uv
//                     let tilling = effect.getFrameVal(AttributeType.TillingType, 0);
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 13] = vertexArr[i * vertexSize + 13] * tilling.x;
//                     subEffectBatcher.dataForVbo[(vertexStartIndex + i) * vertexSize + 14] = vertexArr[i * vertexSize + 14] * tilling.y;
//                     //  this.dataForVbo[(this._vercount + i) * total + 13] = vertexArr[i * total + 13] * materialData.tiling.x + materialData.offset.x;
//                     // this.dataForVbo[(this._vercount + i) * total + 14] = vertexArr[i * total + 14] * materialData.tiling.y + materialData.offset.y;
//                 }
//             }

//             //index
//             var indexArray = effect.mesh.data.genIndexDataArray();
//             let _startIndex = subEffectBatcher.indexStartIndex;
//             effect.startEboIndex = _startIndex;
//             subEffectBatcher.indexStartIndex += indexArray.length;
//             effect.endEboIndex = subEffectBatcher.indexStartIndex;
//             for (var i = 0; i < indexArray.length; i++)
//             {
//                 subEffectBatcher.dataForEbo[_startIndex + i] = indexArray[i] + vertexStartIndex;
//             }

//         }
//     }

//     /**
//     * @private
//     */
//     export class EffectBatcherNew
//     {
//         public mesh: mesh;
//         public mat: material;
//         public state: EffectBatcherState = EffectBatcherState.NotInitedStateType;
//         public dataForVbo: Float32Array;
//         public dataForEbo: Uint16Array;

//         public effectElements: EffectElementSingleMesh[] = [];
//         /**
//          * 当前总的顶点数量
//          * 
//          * @private
//          * @type {number}
//          * @memberof effect
//          */
//         private _totalVertexCount: number = 0;
//         public get curTotalVertexCount(): number
//         {
//             return this._totalVertexCount;
//         }
//         public set curTotalVertexCount(val: number)
//         {
//             this._totalVertexCount = val;
//             this.resizeVboSize(this._totalVertexCount * this.vertexSize);
//         }

//         private _indexStartIndex = 0;
//         public get indexStartIndex()
//         {
//             return this._indexStartIndex;
//         }
//         public set indexStartIndex(value: number)
//         {
//             this._indexStartIndex = value;
//             if (this.dataForEbo != null)
//             {
//                 let ebo = new Uint16Array(this._indexStartIndex);
//                 ebo.set(this.dataForEbo, 0);
//                 this.dataForEbo = ebo;
//             } else
//             {
//                 this.dataForEbo = new Uint16Array(this._indexStartIndex);
//             }
//         }

//         private _vbosize: number = 0;
//         /**
//          * 动态设定vbo大小
//          * 
//          * @param {number} value 
//          * @returns 
//          * 
//          * @memberof effect
//          */
//         public resizeVboSize(value: number)
//         {
//             if (this._vbosize > value) return;
//             this._vbosize = value;
//             if (this.dataForVbo != null)
//             {
//                 let vbo = new Float32Array(this._vbosize);
//                 vbo.set(this.dataForVbo, 0);
//                 this.dataForVbo = vbo;
//             } else
//             {
//                 this.dataForVbo = new Float32Array(this._vbosize);
//             }
//         }
//         public dispose()
//         {
//             this.mesh.dispose();
//             this.mat.dispose();
//             this.dataForVbo = null;
//             this.dataForEbo = null;
//             for (let key in this.effectElements)
//             {
//                 this.effectElements[key].dispose();
//             }
//         }
//         /**
//          * 顶点大小
//          * @public
//          * @type {number}
//          * @memberof effect
//          */
//         public vertexSize: number = 0;
//         constructor(formate: number)
//         {
//             this.vertexSize = gd3d.render.meshData.calcByteSize(formate) / 4;
//         }
//     }
// }
