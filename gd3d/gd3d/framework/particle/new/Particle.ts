namespace gd3d.framework
{
    /**
     * @private
     */
    export class Particle_new
    {
        public gameObject: gameObject;
        private emisson:EffectElementEmission;
        private batcher: EmissionBatcher_new;

        private startScale: math.vector3 = new gd3d.math.vector3();
        public startRotation: gd3d.math.quaternion = new gd3d.math.quaternion();
        public rotationByShape: math.quaternion = new math.quaternion();
        public Starteuler: math.vector3;
        public rotAngle:number=0;
        public eulerSpeed:number;
        public rotationByEuler: math.quaternion = new math.quaternion();

        public localMatrix: math.matrix = new math.matrix();

        public localTranslate: math.vector3=new math.vector3();
        public localRotation: math.quaternion = new math.quaternion();
        public localScale: math.vector3=new math.vector3(1,1,1);
        public startColor:math.color;
        public color: math.vector3=new math.vector3(1,1,1);
        public alpha: number;
        public tex_ST:math.vector4=new gd3d.math.vector4(1,1,0,0);

        private totalLife:number;//总生命
        private curLife: number=0;//当前经过的生命周期
        private life:number=0;//(0---1)
        private speedDir: gd3d.math.vector3 = new gd3d.math.vector3(0, 0, 0);
        private movespeed:gd3d.math.vector3;
        private simulationSpeed: number;

        public sourceVbo: Float32Array;
        public vertexStartIndex: number;
        public dataForVbo: Float32Array; //自己维护一个顶点数据的数组
        public dataForEbo: Uint16Array;

        //在emission是在simulate in world space 时候,将发射器的这个矩阵保存起来,为静态的
        //在emission是在simulate in local space 时候，为动态的
        private emissionMatToWorld:gd3d.math.matrix;
        private emissionWorldRotation:gd3d.math.quaternion;

        private sizeNodes:NumberKey[];
        private colorNodes:Vector3Key[];
        private alphaNodes:NumberKey[];
        //根据发射器定义 初始化
        constructor(batcher: EmissionBatcher_new)//, _data: EmissionNew, startIndex: number, format: number
        {
            this.batcher = batcher;
            this.emisson=batcher.emission;
            this.gameObject = this.emisson.gameObject;
            this.vertexStartIndex = batcher.curVerCount;

            this.dataForVbo=this.emisson.cloneMeshVBO();
            this.dataForEbo=this.emisson.cloneMeshEBO();
            this.sourceVbo = this.emisson.vbo;

            this.initByData();
            //计算得出初始vbo ebo
        }

        public uploadData(array: Float32Array)
        {
            array.set(this.dataForVbo, this.vertexStartIndex * this.emisson.vertexSize);
        }
        initByData()
        {
            this.totalLife=this.emisson.lifeTime.getValue();
            //--------------location speed
            effTools.getRandomDirAndPosByZEmission(this.emisson,this.speedDir,this.localTranslate);
            this.simulationSpeed=this.emisson.simulationSpeed.getValue();
            //--------------rotation
            this.Starteuler=this.emisson.startEuler.getValue();
            gd3d.math.quatFromEulerAngles(this.Starteuler.x, this.Starteuler.y, this.Starteuler.z, this.rotationByEuler);
            //--------------scale
            this.localScale=this.emisson.startScale.getValue();
            //--------------color
            this.startColor=this.emisson.startColor;

            //-------------------------------------------------可选类型----------------------
            this.sizeNodes=this.emisson.sizeNodes;
            this.colorNodes=this.emisson.colorNodes;
            this.alphaNodes=this.emisson.alphaNodes;

            if(this.emisson.enableVelocityOverLifetime)
            {
                this.movespeed=this.emisson.moveSpeed.getValue();
            }
            if(this.emisson.enableRotOverLifeTime)
            {
                this.eulerSpeed=this.emisson.angleSpeed.getValue();
            }


            if(this.emisson.rendermodel==RenderModel.StretchedBillBoard)
            {
                let localOrgin = gd3d.math.pool.vector3_zero;
                gd3d.math.quatLookat(localOrgin, this.speedDir, this.rotationByShape);
                let initRot = gd3d.math.pool.new_quaternion();
                gd3d.math.quatFromEulerAngles(90, 0, 90, initRot);
                gd3d.math.quatMultiply(this.rotationByShape, initRot, this.rotationByShape);
                gd3d.math.quatClone(this.rotationByShape,this.localRotation);
                gd3d.math.pool.delete_quaternion(initRot);   
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
            this.life=this.curLife/this.totalLife;
            math.floatClamp(this.life,0,1);
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
                gd3d.math.matrixMultiply(this.emisson.matToObj,this.localMatrix,this.transformVertex);
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
            if(this.emisson.rendermodel==RenderModel.Mesh)
            {
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up,this.rotAngle,this.rotationByEuler);
                gd3d.math.quatClone(this.rotationByEuler,this.localRotation);
            }else
            {
                gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_forward,this.rotAngle,this.rotationByEuler);
                this.refreshEmissionData();
                let translation = gd3d.math.pool.new_vector3();
                let worldTranslation = gd3d.math.pool.new_vector3();
                let worldRotation = gd3d.math.pool.new_quaternion();
                let invTransformRotation = gd3d.math.pool.new_quaternion();

                gd3d.math.vec3Clone(this.localTranslate, translation);

                var cam=this.emisson.renderCamera;
                var camPosInWorld=cam.gameObject.transform.getWorldTranslate();

                gd3d.math.matrixTransformVector3(translation, this.emissionMatToWorld, worldTranslation);
                if (this.emisson.rendermodel == RenderModel.BillBoard)
                {
                    gd3d.math.quatLookat(worldTranslation, camPosInWorld, worldRotation);
                }
                else if (this.emisson.rendermodel == RenderModel.HorizontalBillBoard)
                {
                    worldRotation.x = -0.5;
                    worldRotation.y = 0.5;
                    worldRotation.z = 0.5;
                    worldRotation.w = 0.5;
                }
                else if (this.emisson.rendermodel == RenderModel.VerticalBillBoard)
                {
                    let forwardTarget = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Clone(camPosInWorld, forwardTarget);
                    forwardTarget.y = worldTranslation.y;
                    gd3d.math.quatLookat(worldTranslation, forwardTarget, worldRotation);
                    gd3d.math.pool.delete_vector3(forwardTarget);

                }
                else if (this.emisson.rendermodel == RenderModel.StretchedBillBoard)
                {
                    gd3d.math.matrixMakeTransformRTS(this.localTranslate, this.localScale, this.localRotation, this.localMatrix);
                    gd3d.math.matrixMultiply(this.emissionMatToWorld,this.localMatrix,this.matToworld);

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
            }
        }
        private _updatePos(delta: number)
        {
            let currentTranslate = EffectUtil.vecMuliNum(this.speedDir, this.simulationSpeed);
            gd3d.math.vec3Add(this.localTranslate, currentTranslate, this.localTranslate);
            if(this.emisson.enableVelocityOverLifetime)
            {
                this.localTranslate.x += this.movespeed.x * delta;
                this.localTranslate.y += this.movespeed.y* delta;
                this.localTranslate.z += this.movespeed.z * delta;
            }

        }
        private _updateEuler(delta: number)
        {
            if(this.emisson.enableRotOverLifeTime)
            {
                this.rotAngle= this.eulerSpeed * this.curLife;
            }
        }

        private _updateScale(delta: number)
        {
            if(this.emisson.enableSizeOverLifetime)
            {
                for (var i = 0; i < this.sizeNodes.length-1; i++)
                {
                    if(this.sizeNodes[i].key<=this.life&&this.sizeNodes[i+1].key>=this.life)
                    {
                        var target=math.numberLerp(this.sizeNodes[i].value,this.sizeNodes[i+1].value,(this.life-this.sizeNodes[i].key)/(this.sizeNodes[i+1].key-this.sizeNodes[i].key));
                        gd3d.math.vec3ScaleByNum(this.startScale,target,this.localScale);
                        break;
                    }
                }
            }
        }

        private _updateColor(delta: number)
        {
            if(this.emisson.enableColorOverLifetime)
            {
                if(this.colorNodes!=null)
                {
                    for (var i = 0; i < this.colorNodes.length-1; i++)
                    {
                        if(this.colorNodes[i].key<=this.life&&this.colorNodes[i+1].key>=this.life)
                        {
                            math.vec3SLerp(this.colorNodes[i].value,this.colorNodes[i+1].value,(this.life-this.colorNodes[i].key)/(this.colorNodes[i+1].key-this.colorNodes[i].key),this.color);
                            break;
                        }
                    }
                }
                if(this.alphaNodes!=null)
                {
                    for (var i = 0; i < this.alphaNodes.length-1; i++)
                    {
                        if(this.alphaNodes[i].key<=this.life&&this.alphaNodes[i+1].key>=this.life)
                        {
                            this.alpha=math.numberLerp(this.alphaNodes[i].value,this.alphaNodes[i+1].value,(this.life-this.colorNodes[i].key)/(this.colorNodes[i+1].key-this.colorNodes[i].key));
                            break;
                        }
                    }
                }
            }
        }

        private spriteIndex: number;
        private _updateUV(delta: number)
        {
            if(this.emisson.uvType==UVTypeEnum.UVRoll)
            {
                this.tex_ST.z=this.emisson.uSpeed*this.curLife;
                this.tex_ST.w=this.emisson.vSpeed*this.curLife;
            }else if(this.emisson.uvType==UVTypeEnum.UVSprite)
            {
                var spriteindex=Math.floor(this.life*this.emisson.count);
                gd3d.math.spriteAnimation(this.emisson.row,this.emisson.column,spriteindex,this.tex_ST);
            }
        }
        private _updateVBO()
        {
            let vertexSize = this.emisson.vertexSize;

            for (let i = 0; i < this.emisson.perVertexCount; i++)
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
                    let r = this.sourceVbo[i * vertexSize + 3]*this.startColor.r;
                    let g = this.sourceVbo[i * vertexSize + 4]*this.startColor.g;
                    let b = this.sourceVbo[i * vertexSize + 5]*this.startColor.b;
                    let a = this.sourceVbo[i * vertexSize + 6]*this.startColor.a;
                    if (this.colorNodes!=null)
                    {
                        r = this.color.x;
                        g = this.color.y;
                        b = this.color.z;
                    }
                    if (this.alphaNodes !=null)
                    {
                        a = this.alpha;
                    }
                    r *= this.emisson.colorRate;
                    g *= this.emisson.colorRate;
                    b *= this.emisson.colorRate;
                    a *= this.emisson.colorRate;
                    r = math.floatClamp(r, 0, 3);
                    g = math.floatClamp(g, 0, 3);
                    b = math.floatClamp(b, 0, 3);
                    a = math.floatClamp(a, 0, 3);
                    this.dataForVbo[i * this.emisson.vertexSize + 3] = r;
                    this.dataForVbo[i * this.emisson.vertexSize + 4] = g;
                    this.dataForVbo[i * this.emisson.vertexSize + 5] = b;
                    this.dataForVbo[i * this.emisson.vertexSize + 6] = a;
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
            this.rotationByEuler = null;
            this.rotationByShape = null;
            this.tex_ST = null;
            this.localMatrix = null;
            this.localTranslate = null;
            this.Starteuler = null;
            this.localScale = null;
            this.color = null;

        }
    }
}