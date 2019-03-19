namespace gd3d.framework
{

    //还是要抽象出粒子的概念
    //这里根据发射器定义的初始参数  计算当前要提交的数据
    /**
     * @private
     */
    export class Particle
    {
        private batcher: EmissionBatcher;
        public gameObject: gameObject;
        private emisson:EmissionElement;
        private vf: number;

        public renderModel: RenderModel = RenderModel.Mesh;

        private startScale: math.vector3 = new gd3d.math.vector3();
        public startRotation: gd3d.math.quaternion = new gd3d.math.quaternion();
        public rotationByShape: math.quaternion = new math.quaternion();
        public euler: math.vector3;
        public rotationByEuler: math.quaternion = new math.quaternion();

        public localMatrix: math.matrix = new math.matrix();


        public localTranslate: math.vector3;
        public localRotation: math.quaternion = new math.quaternion();
        public localScale: math.vector3;
        public color: math.vector3;
        public colorRate: number;
        public uv: math.vector2;
        public alpha: number;
        public tilling: math.vector2 = new math.vector2(1, 1);


        private totalLife:number;//总生命
        private curLife: number;//当前经过的生命周期
        private speedDir: gd3d.math.vector3 = new gd3d.math.vector3(0, 0, 0);
        private movespeed:gd3d.math.vector3;
        private simulationSpeed: number;
       // private uvSpriteFrameInternal: number;

        public data: Emission;
        private vertexSize: number;//单个顶点大小
        private vertexCount: number;//顶点数量
        public sourceVbo: Float32Array;
        public vertexStartIndex: number;
        public dataForVbo: Float32Array; //自己维护一个顶点数据的数组
        public dataForEbo: Uint16Array;

        //在emission是在simulate in world space 时候,将发射器的这个矩阵保存起来,为静态的
        //在emission是在simulate in local space 时候，为动态的
        private emissionMatToWorld:gd3d.math.matrix;
        private emissionWorldRotation:gd3d.math.quaternion;
        //根据发射器定义 初始化
        constructor(batcher: EmissionBatcher)//, _data: EmissionNew, startIndex: number, format: number
        {
            this.batcher = batcher;
            this.gameObject = batcher.gameObject;
            this.emisson=batcher.emissionElement;
            this.vf = batcher.vf;
            this.data = batcher.data.clone();//--------------------todo
            
            this.vertexSize = gd3d.render.meshData.calcByteSize(this.vf) / 4;
            this.vertexStartIndex = batcher.curVerCount;
            this.vertexCount = this.emisson.perVertexCount;

            this.dataForVbo = new Float32Array(this.vertexCount * this.vertexSize);
            this.dataForEbo = this.data.mesh.data.genIndexDataArray();
            this.dataForVbo.set(this.data.mesh.data.genVertexDataArray(this.vf), 0);
            this.sourceVbo = this.data.getVboData(this.vf);

            this.initByData();
            //计算得出初始vbo ebo
        }

        public uploadData(array: Float32Array)
        {
            array.set(this.dataForVbo, this.vertexStartIndex * this.vertexSize);
        }
        initByData()
        {
            this.totalLife=this.data.life.getValueRandom();
            this.renderModel=this.data.renderModel;
            this.curLife = 0;

            //box方向随着中心轴朝向
            let localRandomDirection = this.data.particleStartData.randomDirection;
            this.speedDir = gd3d.math.pool.clone_vector3(localRandomDirection);

            let localRandomTranslate = this.data.particleStartData.position;
            this.localTranslate=gd3d.math.pool.clone_vector3(localRandomTranslate);

            this.simulationSpeed = this.data.simulationSpeed != undefined ? this.data.simulationSpeed.getValue() : 0;

            if (this.data.euler == undefined)
                this.euler = new gd3d.math.vector3(0, 0, 0);
            else
                this.euler = this.data.euler.getValueRandom();
            if (this.data.scale == undefined)
                this.localScale = new gd3d.math.vector3(1, 1, 1);
            else
                this.localScale = this.data.scale.getValueRandom();
            if (this.data.color == undefined)
                this.color = new gd3d.math.vector3(0, 0, 0);
            else
                this.color = this.data.color.getValueRandom();
            if (this.data.alpha == undefined)
                this.alpha = 1;
            else
                this.alpha = this.data.alpha.getValueRandom();
            if (this.data.uv == undefined)
                this.uv = new gd3d.math.vector2();
            else
                this.uv = this.data.uv.getValueRandom();

            if(this.data.moveSpeed!=undefined)
            {
                this.movespeed=this.data.moveSpeed.getValue();
            }
            else
            {
                this.movespeed=new gd3d.math.vector3();
            }
            if (this.data.colorRate == undefined)
                this.colorRate = this.data.colorRate;
            else
                this.colorRate = 1;
            //记下初始scale
            gd3d.math.vec3Clone(this.localScale, this.startScale);

            gd3d.math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z, this.rotationByEuler);
            //模型初始旋转量
            if (this.renderModel == RenderModel.None || this.renderModel == RenderModel.StretchedBillBoard)
            {
                if (this.data.particleStartData.shapeType != ParticleSystemShape.NORMAL)
                {
                    let localOrgin = gd3d.math.pool.vector3_zero;
                    gd3d.math.quatLookat(localOrgin, localRandomDirection, this.rotationByShape);

                    let initRot = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatFromEulerAngles(90, 0, 90, initRot);
                    gd3d.math.quatMultiply(this.rotationByShape, initRot, this.rotationByShape);
                    gd3d.math.quatClone(this.rotationByShape,this.localRotation);
                    
                    gd3d.math.pool.delete_quaternion(initRot);
                }
            }
            if(!this.emisson.simulateInLocalSpace)
            {
                this.emissionMatToWorld=new gd3d.math.matrix();
                var mat=this.emisson.getmatrixToWorld();
                gd3d.math.matrixClone(mat,this.emissionMatToWorld);
                this.emissionWorldRotation=new gd3d.math.quaternion();
                var quat=this.emisson.getWorldRotation();
                gd3d.math.quatClone(quat,this.emissionWorldRotation);
            }
        }
        actived:boolean=true;
        update(delta: number)
        {
            if(!this.actived) return;
            this.curLife += delta;
            if (this.curLife >= this.totalLife)
            {
                //矩阵置零
                gd3d.math.matrixZero(this.transformVertex);
                this._updateVBO();
                this.emisson.deadParticles.push(this);
                this.curLife=0;
                this.actived=false;
                return;
            }
            this._updatePos(delta);
            this._updateScale(delta);
            this._updateEuler(delta);
            this._updateRotation(delta);
            this._updateLocalMatrix(delta);
            this._updateColor(delta);
            this._updateAlpha(delta);
            this._updateUV(delta);
            this._updateVBO();
        }
        /**
         * 在emission是在simulate in local space 时候，为matTobathcer
         * 在emission是在simulate in world space 时候，为matToWorld
         */
        private transformVertex:gd3d.math.matrix=new gd3d.math.matrix();
        private _updateLocalMatrix(delta: number)
        {
            gd3d.math.matrixMakeTransformRTS(this.localTranslate, this.localScale, this.localRotation, this.localMatrix);
            if(this.emisson.simulateInLocalSpace)
            {
                gd3d.math.matrixMultiply(this.emisson.matToBatcher,this.localMatrix,this.transformVertex);
            }
            else
            {
                gd3d.math.matrixMultiply(this.emissionMatToWorld,this.localMatrix,this.transformVertex);
            }
            
        }

        private matToworld:gd3d.math.matrix=new gd3d.math.matrix();
        private refreshEmissionData()
        {
            if(this.emisson.simulateInLocalSpace)
            {
                this.emissionMatToWorld=this.emisson.getmatrixToWorld();
                this.emissionWorldRotation=this.emisson.getWorldRotation();
            }
        }

        private _updateRotation(delta: number)
        {
            this._updateElementRotation();
        }
        

        private _updateElementRotation()
        {
            if (this.renderModel != RenderModel.Mesh)
            {
                this.refreshEmissionData();

                let translation = gd3d.math.pool.new_vector3();
                let worldTranslation = gd3d.math.pool.new_vector3();
                let worldRotation = gd3d.math.pool.new_quaternion();
                let invTransformRotation = gd3d.math.pool.new_quaternion();

                gd3d.math.vec3Clone(this.localTranslate, translation);
                //var cam = gd3d.framework.sceneMgr.app.getScene().mainCamera;
                //var cam = gd3d.framework.sceneMgr.camera;
                var cam=this.batcher.emissionElement.renderCamera;
                if(cam==null)
                {
                    cam = gd3d.framework.sceneMgr.app.getScene().mainCamera;
                }
                var camPosInWorld=cam.gameObject.transform.getWorldTranslate();

                gd3d.math.matrixTransformVector3(translation, this.emissionMatToWorld, worldTranslation);
                if (this.renderModel == RenderModel.BillBoard)
                {
                    gd3d.math.quatLookat(worldTranslation, camPosInWorld, worldRotation);
                }
                else if (this.renderModel == RenderModel.HorizontalBillBoard)
                {
                    worldRotation.x = -0.5;
                    worldRotation.y = 0.5;
                    worldRotation.z = 0.5;
                    worldRotation.w = 0.5;
                }
                else if (this.renderModel == RenderModel.VerticalBillBoard)
                {
                    let forwardTarget = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Clone(camPosInWorld, forwardTarget);
                    forwardTarget.y = worldTranslation.y;
                    gd3d.math.quatLookat(worldTranslation, forwardTarget, worldRotation);
                    gd3d.math.pool.delete_vector3(forwardTarget);

                }
                else if (this.renderModel == RenderModel.StretchedBillBoard)
                {
                    gd3d.math.matrixMakeTransformRTS(this.localTranslate, this.localScale, this.localRotation, this.localMatrix);
                    gd3d.math.matrixMultiply(this.emissionMatToWorld,this.localMatrix,this.matToworld);
                    //-------------------------------------------------------------------------------
                    // gd3d.math.quatClone(this.rotationByShape, this.localRotation);
                    // gd3d.math.quatLookat(worldTranslation, camPosInWorld, worldRotation);
                    // let lookRot = new gd3d.math.quaternion();
                    // gd3d.math.quatClone(this.emisson.getWorldRotation(), invTransformRotation);
                    // gd3d.math.quatInverse(invTransformRotation, invTransformRotation);
                    // gd3d.math.quatMultiply(invTransformRotation, worldRotation, lookRot);

                    // let inverRot = gd3d.math.pool.new_quaternion();
                    // gd3d.math.quatInverse(this.localRotation, inverRot);
                    // gd3d.math.quatMultiply(inverRot, lookRot, lookRot);

                    // let angle = gd3d.math.pool.new_vector3();
                    // gd3d.math.quatToEulerAngles(lookRot, angle);
                    // gd3d.math.quatFromEulerAngles(0, angle.x, 0, lookRot);
                    // gd3d.math.quatMultiply(this.localRotation, lookRot, this.localRotation);
                    //----------------------------------------------------------------------------
                    var xaxis=gd3d.math.pool.new_vector3();
                    var yaxis=gd3d.math.pool.new_vector3();
                    var zaxis=gd3d.math.pool.new_vector3();
                    gd3d.math.matrixTransformNormal(gd3d.math.pool.vector3_right,this.matToworld,xaxis);
                    gd3d.math.vec3Normalize(xaxis,xaxis);
                    gd3d.math.matrixTransformNormal(gd3d.math.pool.vector3_up,this.matToworld,yaxis);
                    gd3d.math.vec3Normalize(yaxis,yaxis);
                    gd3d.math.matrixTransformNormal(gd3d.math.pool.vector3_forward,this.matToworld,zaxis);
                    gd3d.math.vec3Normalize(zaxis,zaxis);
                    
                    EffectUtil.lookatbyXAxis(worldTranslation,xaxis,yaxis,zaxis,camPosInWorld,worldRotation);
                    gd3d.math.quatMultiply(this.localRotation,worldRotation,this.localRotation);
                    


                    gd3d.math.pool.delete_quaternion(worldRotation);
                    gd3d.math.pool.delete_vector3(translation);
                    gd3d.math.pool.delete_quaternion(invTransformRotation);
                    gd3d.math.pool.delete_vector3(xaxis);
                    gd3d.math.pool.delete_vector3(yaxis);                    
                    gd3d.math.pool.delete_vector3(zaxis);
                    return;
                }
                
                //消除transform组件对粒子本身的影响
                gd3d.math.quatClone(this.emissionWorldRotation, invTransformRotation);
                gd3d.math.quatInverse(invTransformRotation, invTransformRotation);
                gd3d.math.quatMultiply(invTransformRotation, worldRotation, this.localRotation);
                
                gd3d.math.quatMultiply(this.localRotation, this.rotationByEuler, this.localRotation);//eulerrot有的不是必要的，todo

                gd3d.math.pool.delete_vector3(translation);
                gd3d.math.pool.delete_vector3(worldTranslation);
                gd3d.math.pool.delete_quaternion(worldRotation);
                gd3d.math.pool.delete_quaternion(invTransformRotation);
            } else
            {
                gd3d.math.quatClone(this.rotationByEuler,this.localRotation);
            }


        }
        private _updatePos(delta: number)
        {

            if (this.data.moveSpeed != undefined)
            {
                this.localTranslate.x += this.movespeed.x * delta;
                this.localTranslate.y += this.movespeed.y* delta;
                this.localTranslate.z += this.movespeed.z * delta;
            }

            let currentTranslate = EffectUtil.vecMuliNum(this.speedDir, this.simulationSpeed);
            gd3d.math.vec3Add(this.localTranslate, currentTranslate, this.localTranslate);

        }
        private _updateEuler(delta: number)
        {
            let index = 0;
            if (this.data.eulerNodes != undefined && this.data.eulerSpeed != undefined)
            {
                console.error("scale只能通过插值或者speed来修改，不能两个同时存在！");
                return;
            }
            if (this.data.eulerNodes != undefined)
            {
                this._updateNode(this.data.eulerNodes, this.totalLife, this.euler);
                gd3d.math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z, this.rotationByEuler);
            } else if (this.data.eulerSpeed != undefined)
            {
                if (this.data.eulerSpeed.x != undefined)
                    this.euler.x += this.data.eulerSpeed.x.getValue() * delta;
                if (this.data.eulerSpeed.y != undefined)
                    this.euler.y += this.data.eulerSpeed.y.getValue() * delta;
                if (this.data.eulerSpeed.z != undefined)
                    this.euler.z += this.data.eulerSpeed.z.getValue() * delta;
                gd3d.math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z, this.rotationByEuler);
            }
        }
        private _startNode: ParticleNode;
        private endNode: ParticleNode;
        private _updateScale(delta: number)
        {
            let index = 0;
            if (this.data.scaleNodes != undefined && this.data.scaleSpeed != undefined)
            {
                console.error("scale只能通过插值或者speed来修改，不能两个同时存在！");
                return;
            }
            if (this.data.scaleNodes != undefined)
            {
                this._updateNode(this.data.scaleNodes, this.totalLife, this.localScale, nodeType.scale);
            } else if (this.data.scaleSpeed != undefined)
            {
                if (this.data.scaleSpeed.x != undefined)
                    this.localScale.x += this.data.scaleSpeed.x.getValue() * delta;
                if (this.data.scaleSpeed.y != undefined)
                    this.localScale.y += this.data.scaleSpeed.y.getValue() * delta;
                if (this.data.scaleSpeed.z != undefined)
                    this.localScale.z += this.data.scaleSpeed.z.getValue() * delta;
            }
        }
        private _updateColor(delta: number)
        {
            let index = 0;
            if (this.data.colorNodes != undefined && this.data.colorSpeed != undefined)
            {
                console.error("color只能通过插值或者speed来修改，不能两个同时存在！");
                return;
            }
            if (this.data.colorNodes != undefined)
            {
                this._updateNode(this.data.colorNodes, this.totalLife, this.color);
            } else if (this.data.colorSpeed != undefined)
            {
                if (this.data.colorSpeed.x != undefined)
                    this.color.x += this.data.colorSpeed.x.getValue() * delta;
                if (this.data.colorSpeed.y != undefined)
                    this.color.y += this.data.colorSpeed.y.getValue() * delta;
                if (this.data.colorSpeed.z != undefined)
                    this.color.z += this.data.colorSpeed.z.getValue() * delta;
            }
        }

        private tempStartNode: any;
        private tempEndNode: any;
        private _updateNode(nodes: any, life: number, out: any, nodetype: nodeType = nodeType.none)
        {
            let index = 0;
            var duration = 0;
            if (nodes != undefined)
            {
                for (var i = 0; i < nodes.length; i++)
                {
                    if (i + 1 < nodes.length)
                    {
                        if (nodes[i].key * life <= this.curLife && nodes[i + 1].key * life >= this.curLife)
                        {
                            this.tempStartNode = nodes[i];
                            this.tempEndNode = nodes[i + 1];
                            index++;
                            duration = (this.tempEndNode.key - this.tempStartNode.key) * life;
                            break;
                        }
                    } else
                    {
                        if (this.curLife < nodes[i].key * life)
                        {
                            this.tempStartNode = nodes[i - 1];
                            this.tempEndNode = nodes[i];
                            duration = (this.tempEndNode.key - this.tempStartNode.key) * life;
                        }
                    }
                }
                if (this.tempStartNode instanceof ParticleNode)
                {
                    if (duration > 0)
                    {
                        gd3d.math.vec3SLerp(this.tempStartNode.getValue(), this.tempEndNode.getValue(), (this.curLife - this.tempStartNode.key * life) / duration, out);

                    }
                } else if (this.tempStartNode instanceof ParticleNodeNumber)
                {
                    //目前这里只刷了alpha值，
                    if (duration > 0)
                    {
                        if (nodetype == nodeType.alpha)
                        {
                            this.alpha = gd3d.math.numberLerp(this.tempStartNode.getValue(), this.tempEndNode.getValue(), (this.curLife - this.tempStartNode.key * life) / duration);
                        }
                        else if (nodetype = nodeType.scale)
                        {
                            var targetscale = gd3d.math.numberLerp(this.tempStartNode.getValue(), this.tempEndNode.getValue(), (this.curLife - this.tempStartNode.key * life) / duration);
                            gd3d.math.vec3ScaleByNum(this.startScale, targetscale, out);
                        }
                    }
                } else if (this.tempStartNode instanceof UVSpeedNode)
                {
                    if (duration > 0)
                    {
                        gd3d.math.vec2SLerp(this.tempStartNode.getValue(), this.tempEndNode.getValue(), (this.curLife - this.tempStartNode.key * life) / duration, out);
                    }
                }

            }

        }

        private _startNodeNum: ParticleNodeNumber;
        private _curNodeNum: ParticleNodeNumber;

        private _updateAlpha(delta: number)
        {
            let index = 0;
            if (this.data.alphaNodes != undefined && this.data.alphaSpeed != undefined)
            {
                console.error("color只能通过插值或者speed来修改，不能两个同时存在！");
                return;
            }
            if (this.data.alphaNodes != undefined)
            {
                this._updateNode(this.data.alphaNodes, this.totalLife, this.alpha, nodeType.alpha);
            } else if (this.data.alphaSpeed != undefined)
            {
                this.alpha += this.data.alphaSpeed.getValue() * delta;
            }
        }
        private _startUVSpeedNode: UVSpeedNode;
        private _curUVSpeedNode: UVSpeedNode;
        private spriteIndex: number;
        private _updateUV(delta: number)
        {
            if (this.uv == undefined)
                this.uv = new gd3d.math.vector2();
            if (this.data.uvType == UVTypeEnum.NONE)
            {
                this.uv = this.data.uv.getValue();
            } else if (this.data.uvType == UVTypeEnum.UVRoll)
            {
                if (this.data.uvRoll != undefined)
                {
                    if (this.data.uvRoll.uvSpeedNodes != undefined && this.data.uvRoll.uvSpeed != undefined)
                    {
                        console.error("uv只能通过插值或者speed来修改，不能两个同时存在！");
                        return;
                    }
                    let index = 0;
                    if (this.data.uvRoll.uvSpeedNodes != undefined)
                    {
                        this._updateNode(this.data.uvRoll.uvSpeedNodes, this.totalLife, this.uv);
                    } else if (this.data.uvRoll.uvSpeed != undefined)
                    {
                        if (this.data.uvRoll.uvSpeed.u != undefined)
                            this.tex_ST.z += this.data.uvRoll.uvSpeed.u.getValue() * delta;
                        if (this.data.uvRoll.uvSpeed.v != undefined)
                            this.tex_ST.w += this.data.uvRoll.uvSpeed.v.getValue() * delta;
                    }
                }
            } else if (this.data.uvType == UVTypeEnum.UVSprite)
            {
                if (this.data.uvSprite != undefined)
                {

                    var spriteindex=Math.floor(this.curLife/this.totalLife*this.data.uvSprite.totalCount);

                    gd3d.math.spriteAnimation(this.data.uvSprite.row,this.data.uvSprite.column,spriteindex,this.tex_ST);
                }
            }

        }
        private tex_ST:gd3d.math.vector4=new gd3d.math.vector4(1,1,0,0);
        private _updateVBO()
        {
            let vertexSize = this.vertexSize;

            for (let i = 0; i < this.vertexCount; i++)
            {
                {//postion
                    let vertex = gd3d.math.pool.new_vector3();
                    vertex.x = this.sourceVbo[i * vertexSize + 0];
                    vertex.y = this.sourceVbo[i * vertexSize + 1];
                    vertex.z = this.sourceVbo[i * vertexSize + 2];

                    gd3d.math.matrixTransformVector3(vertex, this.transformVertex, vertex); 

                    this.dataForVbo[i * vertexSize + 0] = vertex.x;
                    this.dataForVbo[i * vertexSize + 1] = vertex.y;
                    this.dataForVbo[i * vertexSize + 2] = vertex.z;
                    gd3d.math.pool.delete_vector3(vertex);
                }

                {//color
                    //处理一下颜色，以防灰度值 > 1
                    let r = math.floatClamp(this.sourceVbo[i * vertexSize + 3], 0, 1);
                    let g = math.floatClamp(this.sourceVbo[i * vertexSize + 4], 0, 1);
                    let b = math.floatClamp(this.sourceVbo[i * vertexSize + 5], 0, 1);
                    let a = math.floatClamp(this.sourceVbo[i * vertexSize + 6], 0, 1);
                    if (this.color != undefined)
                    {
                        r = this.color.x;
                        g = this.color.y;
                        b = this.color.z;
                    }
                    if (this.alpha != undefined)
                        a = this.alpha;
                    if (this.colorRate != undefined)
                    {
                        r *= this.colorRate;
                        g *= this.colorRate;
                        b *= this.colorRate;
                        a *= this.colorRate;
                    }
                    r = math.floatClamp(r, 0, 3);
                    g = math.floatClamp(g, 0, 3);
                    b = math.floatClamp(b, 0, 3);
                    a = math.floatClamp(a, 0, 3);
                    this.dataForVbo[i * this.vertexSize + 3] = r;
                    this.dataForVbo[i * this.vertexSize + 4] = g;
                    this.dataForVbo[i * this.vertexSize + 5] = b;
                    this.dataForVbo[i * this.vertexSize + 6] = a;
                }
                {
                    //uv
                    this.dataForVbo[i * vertexSize + 7] = this.sourceVbo[i * vertexSize + 7] *this.tex_ST.x + this.tex_ST.z;
                    this.dataForVbo[i * vertexSize + 8] = this.sourceVbo[i * vertexSize + 8] * this.tex_ST.y + this.tex_ST.w;
                }
            }
        }

        dispose()
        {
            this.dataForVbo = null;
            this.dataForEbo = null;
            this.startRotation = null;
            this.localRotation = null;
            //this.startPitchYawRoll = null;
            this.rotationByEuler = null;
            this.rotationByShape = null;
            this.tilling = null;
            this.localMatrix = null;
            this.localTranslate = null;
            this.euler = null;
            this.localScale = null;
            this.colorRate = 1;
            this.color = null;
            this.uv = null;
        }
    }
    /**
     * @private
     */
    export enum nodeType
    {
        none,
        alpha,
        scale

    }
}