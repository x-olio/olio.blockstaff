
namespace gd3d.framework
{
    /**
     * @private
     */
    export class EffectSystemData
    {
        public life: number;
        public beLoop: boolean = false;
        public elementDic: { [name: string]: EffectElementData } = {};
        clone()
        {
            let data: EffectSystemData = new EffectSystemData();
            data.life = this.life;
            data.beLoop = this.beLoop;
            for (let key in this.elementDic)
            {
                data.elementDic[key] = this.elementDic[key].clone();
            }
            return data;
        }
        dispose()
        {
            for (let key in this.elementDic)
            {
                this.elementDic[key].dispose();
                delete this.elementDic[key];
            }
        }
    }
    /**
     * @private
     */
    export class EffectElement
    {
        /**整个特效 */
        public transform: transform;
        public data: EffectElementData;
        public name: string;
        public timelineFrame: { [frameIndex: number]: EffectFrameData };
        public ref: string;//数据整体引用
        public actions: IEffectAction[];
        public curAttrData: EffectAttrsData;
        public effectBatcher: EffectBatcher;
        //在effectbatcher中顶点的开始位置
        public startVboIndex: number = 0;
        //在effectbatcher中索引的开始位置，用来动态计算当前要渲染到哪个顶点，主要针对delaytime类型的特效重播时的处理
        public startEboIndex: number = 0;
        //在effectbatcher中索引的结束位置，用来动态计算当前要渲染到哪个顶点，主要针对delaytime类型的特效重播时的处理
        public endEboIndex: number = 0;
        public delayTime: number = 0;
        public actionActive: boolean = false;//当前帧action状态
        public loopFrame: number = Number.MAX_VALUE;//循环帧数
        public active: boolean = true;//激活状态
        constructor(_data: EffectElementData)
        {
            this.data = _data;
            this.name = this.data.name;
            this.timelineFrame = {};
            this.delayTime = _data.delayTime;
            this.initActions();
            this.recordElementLerpAttributes();
        }

        private recordElementLerpAttributes()
        {
            if (this.data.timelineFrame != undefined)
            {
                for (let i in this.data.timelineFrame)
                {
                    let frameData = this.data.timelineFrame[i];
                    if (frameData.frameIndex != -1)
                    {
                        if (frameData.lerpDatas != undefined && frameData.lerpDatas.length != 0)
                        {
                            this.recordLerpValues(frameData);
                        } else if (frameData.attrsData != undefined)
                        {
                            if (this.timelineFrame[frameData.frameIndex] == undefined)
                            {
                                this.timelineFrame[frameData.frameIndex] = new EffectFrameData();
                                this.timelineFrame[frameData.frameIndex].attrsData = new EffectAttrsData();
                                this.timelineFrame[frameData.frameIndex].frameIndex = frameData.frameIndex;
                            }
                            for (let k in frameData.attrsData)
                            {
                                this.timelineFrame[frameData.frameIndex].attrsData.setLerpAttribute(k, frameData.attrsData.getAttribute(k));
                            }
                        }
                    }
                }
            }
        }

        /**
         * 录制插值数据
         * 
         * @private
         * @param {EffectElementData} elementData 
         * @param {EffectFrameData} effectFrameData 
         * 
         * @memberof effectSystem
         */
        private recordLerpValues(effectFrameData: EffectFrameData)
        {
            //每一帧所需要进行插值的属性分别进行插值
            for (let i in effectFrameData.lerpDatas)
            {
                if (effectFrameData.lerpDatas[i].type == EffectLerpTypeEnum.Linear)
                {
                    //effectFrameData.lerpDatas[i].attrsList 每一帧中的需要插值的列表
                    for (let key in effectFrameData.lerpDatas[i].attrsList)
                    {
                        //attrname 插值的属性名
                        let attrname = effectFrameData.lerpDatas[i].attrsList[key];
                        //对该属性进行插值
                        this.recordLerp(effectFrameData, effectFrameData.lerpDatas[i], attrname);
                    }
                }
            }
        }
        // private newFrameData: EffectFrameData;
        /**
         * 记录插值
         */
        private recordLerp(effectFrameData: EffectFrameData, lerpData: EffectLerpData, key: string)
        {

            let fromFrame = lerpData.fromFrame;
            let toFrame = lerpData.toFrame.getValue();
            let toVal = lerpData.attrsData.getAttribute(key);
            if (effectFrameData.attrsData[key] == undefined)
            {
                effectFrameData.attrsData.initAttribute(key);
            }
            let fromVal = effectFrameData.attrsData.getAttribute(key);
            //在需要进行插值的帧里面进行插值
            for (let i = fromFrame + 1; i <= toFrame; i++)
            {
                let outVal;
                if (fromVal instanceof gd3d.math.vector3)
                {
                    outVal = new gd3d.math.vector3();
                    gd3d.math.vec3SLerp(fromVal, toVal, (i - fromFrame) / (toFrame - fromFrame), outVal);
                }
                else if (fromVal instanceof gd3d.math.vector2)
                {
                    outVal = new gd3d.math.vector2();
                    gd3d.math.vec2SLerp(fromVal, toVal, (i - fromFrame) / (toFrame - fromFrame), outVal);
                } else if (typeof (fromVal) === 'number')
                {
                    outVal = gd3d.math.numberLerp(fromVal, toVal, (i - fromFrame) / (toFrame - fromFrame));
                }

                let newFrameData: EffectFrameData = this.timelineFrame[i];
                if (newFrameData == undefined) 
                {
                    newFrameData = new EffectFrameData();
                    newFrameData.attrsData = new EffectAttrsData();
                    newFrameData.frameIndex = i;
                    this.timelineFrame[i] = newFrameData;
                }
                newFrameData.attrsData.setLerpAttribute(key, outVal);
            }
        }

        initActions()
        {
            this.actions = [];
            let action: IEffectAction;
            for (let key in this.data.actionData)
            {
                let actiondata = this.data.actionData[key];
                switch (actiondata.actionType)
                {
                    case "linear":
                        action = new LinearAction();
                        break;
                    case "destroy":
                        action = new DestroyAction();
                        break;
                    case "loop":
                        action = new LoopAction();
                        break;
                    case "destroy":
                        action = new DestroyAction();
                        break;
                    case "rotation":
                        action = new RotationAction();
                        break;
                    case "breath":
                        action = new BreathAction();
                        break;
                    case "uvroll":
                        action = new UVRollAction();
                        break;
                    case "uvsprite":
                        action = new UVSpriteAnimationAction();
                        break;
                    case "rosepath":
                        action = new RoseCurveAction();
                        break;
                    case "trail":
                        action = new TrailAction();
                        break;
                }
                action.init(actiondata.startFrame, actiondata.endFrame, actiondata.params, this);
                this.actions.push(action);
            }
        }


        update()
        {
            if (this.curAttrData == undefined || this.curAttrData == null)
                return;
            if (this.active)
            {
                // if (this.curAttrData.startEuler)
                // {
                //     gd3d.math.quatFromEulerAngles(this.curAttrData.startEuler.x, this.curAttrData.startEuler.y, this.curAttrData.startEuler.z, this.curAttrData.startRotation);
                // }
                if (this.curAttrData.euler != undefined)
                {
                    // console.log("euler:" + this.curAttrData.euler.toString());
                    gd3d.math.quatFromEulerAngles(this.curAttrData.euler.x, this.curAttrData.euler.y, this.curAttrData.euler.z, this.curAttrData.rotationByEuler);
                }
                this.updateElementRotation();
                gd3d.math.matrixMakeTransformRTS(this.curAttrData.pos, this.curAttrData.scale, this.curAttrData.localRotation, this.curAttrData.matrix);
            }
            else
            {
                this.curAttrData.resetMatrix();
            }
        }

        private updateElementRotation() 
        {
            let cameraTransform = gd3d.framework.sceneMgr.app.getScene().mainCamera.gameObject.transform;
            let worldRotation = gd3d.math.pool.new_quaternion();
            let localRotation = gd3d.math.pool.new_quaternion();

            if (this.curAttrData.renderModel != RenderModel.None) 
            {
                let invTransformRotation = gd3d.math.pool.new_quaternion();
                let worldTranslation = gd3d.math.pool.new_vector3();
                let translation = gd3d.math.pool.new_vector3();
                gd3d.math.vec3Clone(this.curAttrData.pos, translation);
                if (this.transform != undefined)
                {
                    gd3d.math.matrixTransformVector3(translation, this.transform.getWorldMatrix(), worldTranslation);
                }
                if (this.curAttrData.renderModel == RenderModel.BillBoard) 
                {
                    gd3d.math.quatLookat(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);
                }
                else if (this.curAttrData.renderModel == RenderModel.HorizontalBillBoard)
                {
                    worldRotation.x = -0.5;
                    worldRotation.y = 0.5;
                    worldRotation.z = 0.5;
                    worldRotation.w = 0.5;
                }
                else if (this.curAttrData.renderModel == RenderModel.VerticalBillBoard)
                {
                    let forwardTarget = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Clone(cameraTransform.getWorldTranslate(), forwardTarget);
                    forwardTarget.y = worldTranslation.y;
                    gd3d.math.quatLookat(worldTranslation, forwardTarget, worldRotation);
                    gd3d.math.pool.delete_vector3(forwardTarget);
                }
                else if (this.curAttrData.renderModel == RenderModel.StretchedBillBoard) 
                {

                    gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, this.curAttrData.localRotation);

                    gd3d.math.quatLookat(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);

                    let lookRot = new gd3d.math.quaternion();
                    gd3d.math.quatClone(this.transform.getWorldRotate(), invTransformRotation);
                    gd3d.math.quatInverse(invTransformRotation, invTransformRotation);
                    gd3d.math.quatMultiply(invTransformRotation, worldRotation, lookRot);

                    let inverRot = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatInverse(this.curAttrData.localRotation, inverRot);
                    gd3d.math.quatMultiply(inverRot, lookRot, lookRot);

                    let angle = gd3d.math.pool.new_vector3();
                    gd3d.math.quatToEulerAngles(lookRot, angle);
                    gd3d.math.quatFromEulerAngles(0, angle.y, 0, lookRot);
                    gd3d.math.quatMultiply(this.curAttrData.localRotation, lookRot, this.curAttrData.localRotation);

                    gd3d.math.pool.delete_quaternion(inverRot);
                    gd3d.math.pool.delete_vector3(angle);
                    gd3d.math.pool.delete_quaternion(lookRot);
                    return;
                }
                else if (this.curAttrData.renderModel == RenderModel.Mesh)
                {
                    EffectUtil.quatLookatZ(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);
                }

                gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, worldRotation);
                //消除transform组件对粒子本身的影响
                gd3d.math.quatClone(this.transform.gameObject.transform.getWorldRotate(), invTransformRotation);
                gd3d.math.quatInverse(invTransformRotation, invTransformRotation);

                gd3d.math.quatMultiply(invTransformRotation, worldRotation, this.curAttrData.localRotation);

                // gd3d.math.quatMultiply(invTransformRotation, worldRotation, localRotation);
                // gd3d.math.quatMultiply(this.curAttrData.startRotation, localRotation, this.curAttrData.localRotation);

                gd3d.math.pool.delete_vector3(translation);
                gd3d.math.pool.delete_vector3(worldTranslation);
                gd3d.math.pool.delete_quaternion(invTransformRotation);
            } else
            {
                gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, this.curAttrData.localRotation);
                // gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, localRotation);
                // gd3d.math.quatMultiply(localRotation, this.curAttrData.startRotation, this.curAttrData.localRotation);
            }

            gd3d.math.pool.delete_quaternion(localRotation);
            gd3d.math.pool.delete_quaternion(worldRotation);

        }

        /**
         * 当前帧的数据是否有变化，有变化才需要去刷新batcher，否则直接用当前batcher中的数据去提交渲染即可。
         * 在以下三种情况下，数据都是变化的，都需要刷新bacther：
         * 1、timeline中有当前帧
         * 2、renderModel不是none
         * 3、有action在刷新
         * @param frameIndex 
         */
        isCurFrameNeedRefresh(frameIndex: number): boolean
        {
            if (this.timelineFrame[frameIndex] != undefined)
            {
                return true;
            }
            if (this.curAttrData != undefined && this.curAttrData.renderModel != RenderModel.None)
            {
                return true;
            }
            return this.actionActive;
        }

        setActive(_active: boolean)
        {
            if (this.active == _active) return;
            this.active = _active;
            if (this.active)
            {

            }
            else
            {
                this.curAttrData.resetMatrix();
            }
        }
        dispose()
        {
            this.data.dispose();
            this.curAttrData = null;
            this.actions.length = 0;
            delete this.timelineFrame;
        }
    }


    /**
     * @private
     */
    export class EffectElementData
    {
        public name: string;
        public type: EffectElementTypeEnum;//singlemesh,emission....
        public timelineFrame: { [frameIndex: number]: EffectFrameData };
        public refFrom: string;//数据整体引用
        public beloop: boolean;
        public delayTime: number = 0;
        public actionData: EffectActionData[];
        public emissionData: Emission;


        public initFrameData: EffectFrameData;
        clone()
        {
            let elementdata = new EffectElementData();
            elementdata.name = this.name;
            elementdata.type = this.type;
            elementdata.refFrom = this.refFrom;
            elementdata.beloop = this.beloop;
            elementdata.actionData = [];
            elementdata.timelineFrame = [];
            if (this.initFrameData)
                elementdata.initFrameData = this.initFrameData.clone();

            if (this.emissionData) 
            {
                elementdata.emissionData = this.emissionData.clone();
            }
            for (let key in this.timelineFrame)
            {
                if (this.timelineFrame[key]) 
                {
                    elementdata.timelineFrame[key] = this.timelineFrame[key].clone();
                }
            }

            for (let key in this.actionData)
            {
                if (this.actionData[key]) 
                {
                    elementdata.actionData[key] = this.actionData[key].clone();
                }
            }
            return elementdata;
        }
        dispose()
        {
            if (this.actionData)
                this.actionData.length = 0;
            if (this.initFrameData)
                this.initFrameData.dispose();
            for (let key in this.timelineFrame)
            {
                this.timelineFrame[key].dispose();
            }
            delete this.timelineFrame;
        }
    }

    /**
     * @private
     */
    export class EffectAttrsData
    {

        public pos: math.vector3;
        public euler: math.vector3;
        public color: math.vector3;
        public colorRate: number;//几倍颜色叠加
        public scale: math.vector3;
        public uv: math.vector2 = new gd3d.math.vector2(1, 1);
        public alpha: number;
        public mat: EffectMatData;
        public renderModel: RenderModel = RenderModel.None;
        public matrix: math.matrix = new math.matrix();
        public tilling: math.vector2;
        /**
         * lerp，action更新euler，再由euler合成rotationByEuler。
         * 下一步拿rotationByEuler乘以billboard生成的四元数得到最终的localRotation。
         * 再用localRotation,pos，scale计算出最终的matrix。
         * matrix作用每个顶点，然后去渲染。
         * 
         * @type {math.quaternion}
         * @memberof EffectAttrsData
         */
        public rotationByEuler: math.quaternion = new math.quaternion();

        // public startEuler: math.vector3;
        // public startRotation: math.quaternion = new math.quaternion();
        /**
         * 本地旋转(经过各种lerp和action后计算的最终值)
         * 
         * @type {math.quaternion}
         * @memberof EffectAttrsData
         */
        public localRotation: math.quaternion = new math.quaternion();
        public mesh: mesh;
        public meshdataVbo: Float32Array;

        // public localAxisX:gd3d.math.vector3 = new gd3d.math.vector3(1,0,0);
        // public localAxisY:gd3d.math.vector3 = new gd3d.math.vector3(0,1,0);
        // public localAxisZ:gd3d.math.vector3 = new gd3d.math.vector3(0,0,1);

        /**
         * 将计算出来的插值存入到帧属性数据
         * 
         * @param {string} attribute 
         * @param {*} val 
         * 
         * @memberof EffectAttrsData
         */
        setLerpAttribute(attribute: string, val: any)
        {
            switch (attribute)
            {
                case "pos":
                    this.pos = val;
                    break;
                case "scale":
                    this.scale = val;
                    break;
                case "euler":
                    this.euler = val;
                    break;
                case "alpha":
                    this.alpha = val;
                    break;
                case "uv":
                    this.uv = val;
                    break;
                case "color":
                    this.color = val;
                    break;
                case "tilling":
                    console.log("tilling 逻辑上不需要插值");
                    break;
            }
        }
        getAttribute(attribute: string): any
        {
            switch (attribute)
            {
                case "pos":
                    return gd3d.math.pool.clone_vector3(this.pos);
                case "scale":
                    return gd3d.math.pool.clone_vector3(this.scale);
                case "euler":
                    return gd3d.math.pool.clone_vector3(this.euler);
                case "alpha":
                    return this.alpha;
                case "color":
                    return gd3d.math.pool.clone_vector3(this.color);
                case "tilling":
                    return gd3d.math.pool.clone_vector2(this.tilling);
                case "uv":
                    return gd3d.math.pool.clone_vector2(this.uv);
                case "mat":
                    return this.mat.clone();
                case "renderModel":
                    return this.renderModel;
                case "rotationByEuler":
                    return gd3d.math.pool.clone_quaternion(this.rotationByEuler);
                case "localRotation":
                    return gd3d.math.pool.clone_quaternion(this.localRotation);
                // case "startRotation":
                //     return gd3d.math.pool.clone_quaternion(this.startRotation);
                case "matrix":
                    return gd3d.math.pool.clone_matrix(this.matrix);
                case "colorRate":
                    return this.colorRate;
            }
        }

        initAttribute(attribute: string)
        {
            switch (attribute)
            {
                case "pos":
                    this.pos = new gd3d.math.vector3(0, 0, 0);
                    break;
                case "scale":
                    this.scale = new gd3d.math.vector3(1, 1, 1);
                    break;
                case "euler":
                    this.euler = new gd3d.math.vector3(0, 0, 0);
                    break;
                case "alpha":
                    this.alpha = 0;
                    break;
                case "color":
                    this.color = new gd3d.math.vector3(0, 0, 0);
                    break;
                case "uv":
                    this.uv = new gd3d.math.vector2(0, 0);
                    break;
                case "tilling":
                    this.tilling = new gd3d.math.vector2(1, 1);
                    break;
                case "colorRate":
                    this.colorRate = 1;
                    break;
                default:
                    console.log("不支持的属性：" + attribute);
                    break;
            }
        }
        resetMatrix()
        {
            math.matrixZero(this.matrix);
        }
        copyandinit(): EffectAttrsData//没有的数据初始化
        {
            let data = new EffectAttrsData();
            if (this.pos != undefined)
                data.pos = math.pool.clone_vector3(this.pos);
            else
                data.initAttribute("pos");
            if (this.euler != undefined)
                data.euler = math.pool.clone_vector3(this.euler);
            else
                data.initAttribute("euler");
            if (this.color != undefined)
                data.color = math.pool.clone_vector3(this.color);
            else
                data.initAttribute("color");
            if (this.scale != undefined)
                data.scale = math.pool.clone_vector3(this.scale);
            else
                data.initAttribute("scale");
            if (this.uv != undefined)
                data.uv = math.pool.clone_vector2(this.uv);
            else
                data.initAttribute("uv");
            if (this.tilling != undefined)
                data.tilling = math.pool.clone_vector2(this.tilling);
            else
                data.initAttribute("tilling");
            if (this.colorRate != undefined)
                data.colorRate = this.colorRate;
            else
                data.initAttribute("colorRate");
            if (this.mat != undefined)
                data.mat = this.mat.clone();
            if (this.rotationByEuler != undefined)
                data.rotationByEuler = math.pool.clone_quaternion(this.rotationByEuler);
            if (this.localRotation != undefined)
                data.localRotation = math.pool.clone_quaternion(this.localRotation);
            if (this.meshdataVbo != undefined)
                data.meshdataVbo = this.meshdataVbo;//这个数组不会被改变，可以直接引用
            // if (this.startEuler != undefined)
            // {
            //     data.startEuler = math.pool.clone_vector3(this.startEuler);
            //     gd3d.math.quatFromEulerAngles(data.startEuler.x, data.startEuler.y, data.startEuler.z, data.startRotation);
            //     // data.startRotation = math.pool.clone_quaternion(this.startRotation);
            // }
            // if (this.localAxisX != undefined)
            //     data.localAxisX = math.pool.clone_vector3(this.localAxisX);
            // if (this.localAxisY != undefined)
            //     data.localAxisY = math.pool.clone_vector3(this.localAxisY);
            // if (this.localAxisZ != undefined)
            //     data.localAxisZ = math.pool.clone_vector3(this.localAxisZ);
            data.alpha = this.alpha;
            data.renderModel = this.renderModel;
            data.mesh = this.mesh;
            return data;
        }
        clone(): EffectAttrsData
        {
            let data = new EffectAttrsData();
            if (this.pos != undefined)
                data.pos = math.pool.clone_vector3(this.pos);
            if (this.euler != undefined)
                data.euler = math.pool.clone_vector3(this.euler);
            if (this.color != undefined)
                data.color = math.pool.clone_vector3(this.color);
            if (this.scale != undefined)
                data.scale = math.pool.clone_vector3(this.scale);
            if (this.tilling != undefined)
                data.tilling = math.pool.clone_vector2(this.tilling);
            if (this.colorRate != undefined)
                data.colorRate = this.colorRate;
            if (this.uv != undefined)
                data.uv = math.pool.clone_vector2(this.uv);
            if (this.mat != undefined)
                data.mat = this.mat.clone();
            if (this.rotationByEuler != undefined)
                data.rotationByEuler = math.pool.clone_quaternion(this.rotationByEuler);
            if (this.localRotation != undefined)
                data.localRotation = math.pool.clone_quaternion(this.localRotation);
            if (this.meshdataVbo != undefined)
                data.meshdataVbo = this.meshdataVbo;//这个数组不会被改变，可以直接引用
            // if (this.startEuler != undefined)
            // {
            //     data.startEuler = math.pool.clone_vector3(this.startEuler);
            //     gd3d.math.quatFromEulerAngles(data.startEuler.x, data.startEuler.y, data.startEuler.z, data.startRotation);
            //     // data.startRotation = math.pool.clone_quaternion(this.startRotation);
            // }
            // if (this.localAxisX != undefined)
            //     data.localAxisX = math.pool.clone_vector3(this.localAxisX);
            // if (this.localAxisY != undefined)
            //     data.localAxisY = math.pool.clone_vector3(this.localAxisY);
            // if (this.localAxisZ != undefined)
            //     data.localAxisZ = math.pool.clone_vector3(this.localAxisZ);
            data.alpha = this.alpha;
            data.renderModel = this.renderModel;
            data.mesh = this.mesh;
            return data;
        }
    }

    /**
     * @private
     */
    export class EffectFrameData
    {
        public frameIndex: number;
        public attrsData: EffectAttrsData;
        public lerpDatas: EffectLerpData[];
        public delayTime: number;
        clone()
        {
            let framedata = new EffectFrameData();
            framedata.frameIndex = this.frameIndex;
            framedata.attrsData = this.attrsData.clone();
            framedata.lerpDatas = [];
            for (let key in this.lerpDatas)
            {
                framedata.lerpDatas[key] = this.lerpDatas[key].clone();
            }
            return framedata;
        }
        dispose()
        {
            this.attrsData = null;
            if (this.lerpDatas)
                this.lerpDatas.length = 0;
        }
    }
    /**
     * @private
     */
    export class EffectLerpData
    {
        public type: EffectLerpTypeEnum;
        public fromFrame: number;
        public toFrame: ValueData;
        public attrsData: EffectAttrsData;
        public attrsList = [];
        clone()
        {
            let lerpdata = new EffectLerpData();
            lerpdata.type = this.type;
            lerpdata.fromFrame = this.fromFrame;
            lerpdata.toFrame = this.toFrame;
            lerpdata.attrsData = this.attrsData.clone();
            for (let key in this.attrsList)
            {
                lerpdata.attrsList[key] = this.attrsList[key];
            }
            return lerpdata;
        }
    }

    /**
     * @private
     */
    export class EffectActionData
    {
        public actionType: string;
        public startFrame: number;
        public endFrame: number;
        public params: any;
        clone()
        {
            let actiondata = new EffectActionData();
            actiondata.actionType = this.actionType;
            actiondata.startFrame = this.startFrame;
            actiondata.endFrame = this.endFrame;
            actiondata.params = [];
            for (let key in this.params)
            {
                actiondata.params[key] = this.params[key];
            }
            return actiondata;
        }
    }
    /**
     * @private
     */
    export class EffectMatData 
    {
        public shader: shader;
        public diffuseTexture: texture;
        public alphaTexture: texture;
        public alphaCut: number;

        static beEqual(data0: EffectMatData, data1: EffectMatData)
        {
            return data0.alphaCut === data1.alphaCut && data0.diffuseTexture === data1.diffuseTexture && data0.shader === data1.shader && data0.alphaTexture === data1.alphaTexture;
        }

        clone(): EffectMatData
        {
            let data = new EffectMatData();
            data.shader = this.shader;
            data.diffuseTexture = this.diffuseTexture;
            data.alphaTexture = this.alphaTexture;
            data.alphaCut = this.alphaCut;
            return data;
        }
    }

    export enum EffectBatcherState
    {
        NotInitedStateType,
        InitedStateType,
        ResizeCapacityStateType
    }

    /**
     * @private
     */
    export class EffectBatcher
    {
        public mesh: mesh;
        public mat: material;
        public state: EffectBatcherState = EffectBatcherState.NotInitedStateType;
        public dataForVbo: Float32Array;
        public dataForEbo: Uint16Array;

        public effectElements: EffectElement[] = [];
        /**
         * 当前总的顶点数量
         * 
         * @private
         * @type {number}
         * @memberof effect
         */
        private _totalVertexCount: number = 0;
        public get curTotalVertexCount(): number
        {
            return this._totalVertexCount;
        }
        public set curTotalVertexCount(val: number)
        {
            this._totalVertexCount = val;
            this.resizeVboSize(this._totalVertexCount * this.vertexSize);
        }

        private _indexStartIndex = 0;
        public get indexStartIndex()
        {
            return this._indexStartIndex;
        }
        public set indexStartIndex(value: number)
        {
            this._indexStartIndex = value;
            if (this.dataForEbo != null)
            {
                let ebo = new Uint16Array(this._indexStartIndex);
                ebo.set(this.dataForEbo, 0);
                this.dataForEbo = ebo;
            } else
            {
                this.dataForEbo = new Uint16Array(this._indexStartIndex);
            }
        }

        private _vbosize: number = 0;
        /**
         * 动态设定vbo大小
         * 
         * @param {number} value 
         * @returns 
         * 
         * @memberof effect
         */
        public resizeVboSize(value: number)
        {
            if (this._vbosize > value) return;
            this._vbosize = value;
            if (this.dataForVbo != null)
            {
                let vbo = new Float32Array(this._vbosize);
                vbo.set(this.dataForVbo, 0);
                this.dataForVbo = vbo;
            } else
            {
                this.dataForVbo = new Float32Array(this._vbosize);
            }
        }
        public dispose()
        {
            this.mesh.dispose();
            this.mat.dispose();
            this.dataForVbo = null;
            this.dataForEbo = null;
            for (let key in this.effectElements)
            {
                this.effectElements[key].dispose();
            }
        }
        /**
         * 顶点大小
         * @public
         * @type {number}
         * @memberof effect
         */
        public vertexSize: number = 0;
        constructor(formate: number)
        {
            this.vertexSize = gd3d.render.meshData.calcByteSize(formate) / 4;
        }
    }

    /**
     * @private
     */
    export enum EffectPlayStateEnum
    {
        None,//未加载完成
        BeReady,//加载完成未播放
        Play,//播放中
        Pause,//暂停中
        Stop,//停止播放状态重置，特效隐藏，但是仍可以再次调用play进行播放
        Dispose,//特效已被回收
    }

    /**
     * @private
     */
    export enum EffectElementTypeEnum
    {
        SingleMeshType,//单mesh
        EmissionType,//发射器
        MultiMeshType//多mesh
    }
    /**
     * @private
     */
    export enum EffectLerpTypeEnum
    {
        Linear//线性插值
    }
    /**
     * @private
     */
    export enum RenderModel
    {
        None,
        BillBoard,
        StretchedBillBoard,
        HorizontalBillBoard,
        VerticalBillBoard,
        Mesh
    }
}