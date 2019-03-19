namespace gd3d.framework
{
    //特效系统中的发射器都丢在这里
    /**
     * @private
     */
    export class Particles
    {
        public emissionElements: EmissionElement[] = [];//一个特效系统可以有多个发射器元素
        public vf: number = gd3d.render.VertexFormatMask.Position | render.VertexFormatMask.Color | render.VertexFormatMask.UV0;//法线切线不要
        public effectSys: effectSystem;
        constructor(sys: effectSystem)
        {
            this.effectSys = sys;
        }
        addEmission(_emissionNew: EffectElementData)
        {
            let _emissionElement = new EmissionElement(_emissionNew, this.effectSys, this);
            this.emissionElements.push(_emissionElement);
        }

        updateForEmission(delta: number)
        {
            for (let key in this.emissionElements)
            {
                this.emissionElements[key].updateForEmission(delta);
            }
        }
        update(delta: number)
        {
            for (let key in this.emissionElements)
            {
                this.emissionElements[key].update(delta);
            }
        }
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
        {
            for (let key in this.emissionElements)
            {
                this.emissionElements[key].render(context, assetmgr, camera);
            }
        }
        dispose()
        {
            for (let key in this.emissionElements)
            {
                this.emissionElements[key].dispose();
            }
            this.emissionElements.length = 0;
        }
    }
    //发射器也作为特效系统的一个元素
    /**
     * @private
     */
    export class EmissionElement
    {
        public webgl: WebGLRenderingContext;
        public gameObject: gameObject;
        public effectSys: effectSystem;
        public ParticleMgr: Particles;
        public vf: number;
        public emissionData: Emission;//原始数据，不能被改变

        //-------静态属性----------------------------
        private maxVertexCount: number = 2048;//batcher 最大定点数
        //-------原属性
        private localtranslate: gd3d.math.vector3 = new gd3d.math.vector3();
        private localScale: gd3d.math.vector3 = new gd3d.math.vector3(1, 1, 1);
        private localrotate: gd3d.math.quaternion = new gd3d.math.quaternion();
        private eluerAngle: gd3d.math.vector3 = new gd3d.math.quaternion();

        private beloop: boolean = false;
        public simulateInLocalSpace: boolean = true;//粒子运动运动空间（世界还是本地）
        public active: boolean = true;//激活状态
        // private delayTime: number = 0;
        //---------衍生属性---------------------------
        // private delayFlag: boolean = false;
        private _continueSpaceTime: number;
        public perVertexCount: number;//单个粒子的顶点数
        public perIndexxCount: number;

        //---------------运行逻辑---------------------------------------
        public emissionBatchers: EmissionBatcher[];//一个发射器可能有多个batcher 需要有一个管理机制
        private curbatcher: EmissionBatcher;
        public deadParticles: Particle[];

        private curTime: number;
        private numcount: number;
        private isover: boolean = false;
        //-----------------------------------------------------------------

        constructor(_emission: EffectElementData, sys: effectSystem, mgr: Particles)
        {
            this.webgl = gd3d.framework.sceneMgr.app.webgl;
            this.effectSys = sys;
            this.ParticleMgr = mgr;
            this.vf = mgr.vf;
            this.gameObject = mgr.effectSys.gameObject;

            this.beloop = _emission.beloop;
            this.emissionData = _emission.emissionData;
            // this.delayTime = _emission.delayTime;
            // if (this.delayTime > 0)
            // {
            //     this.delayFlag = true;
            // }
            this.perVertexCount = this.emissionData.mesh.data.pos.length;
            this.perIndexxCount = this.emissionData.mesh.data.trisindex.length;
            this.simulateInLocalSpace = this.emissionData.simulateInLocalSpace;
            switch (this.emissionData.emissionType)
            {
                case ParticleEmissionType.burst:
                    break;
                case ParticleEmissionType.continue:
                    this._continueSpaceTime = this.emissionData.time / (this.emissionData.emissionCount);
                    break;
            }
            gd3d.math.vec3Clone(this.emissionData.rootpos, this.localtranslate);
            gd3d.math.vec3Clone(this.emissionData.rootRotAngle, this.eluerAngle);
            gd3d.math.vec3Clone(this.emissionData.rootScale, this.localScale);
            gd3d.math.quatFromEulerAngles(this.eluerAngle.x, this.eluerAngle.y, this.eluerAngle.z, this.localrotate);
            gd3d.math.matrixMakeTransformRTS(this.localtranslate, this.localScale, this.localrotate, this.matToBatcher);

            this.emissionBatchers = [];
            this.deadParticles = [];
            this.curTime = 0;
            this.numcount = 0;
            this.addBatcher();
        }

        private worldRotation: gd3d.math.quaternion = new gd3d.math.quaternion();
        getWorldRotation(): gd3d.math.quaternion
        {
            var parRot = this.gameObject.transform.getWorldRotate();
            gd3d.math.quatMultiply(parRot, this.localrotate, this.worldRotation);
            return this.worldRotation;
        }

        matToBatcher: gd3d.math.matrix = new gd3d.math.matrix();
        private matToWorld: gd3d.math.matrix = new gd3d.math.matrix();

        public getmatrixToWorld(): gd3d.math.matrix
        {
            var mat = this.gameObject.transform.getWorldMatrix();
            gd3d.math.matrixMultiply(mat, this.matToBatcher, this.matToWorld);
            return this.matToWorld;
        }

        public update(delta: number)
        {
            //this.curTime += delta;
            // if (this.delayTime != undefined && this.curTime < this.delayTime)
            // {
            //     return;
            // } else
            // {
            //     this.curTime = this.curTime - this.delayTime;
            // }
            //this.updateEmission(delta);
            this.updateBatcher(delta);
        }

        private testtime:number=0;
        public updateForEmission(delta: number)
        {
            this.testtime+=delta;
            this.curTime += delta;
            this.updateEmission(delta);
        }


        updateBatcher(delta: number)
        {
            for (let key in this.emissionBatchers)
            {
                this.emissionBatchers[key].update(delta);
            }
        }

        updateEmission(delta: number)
        {
            if (this.isover) return;
            //detal为 0.01699995994567871  造成短短时间发射大量粒子困难(0.1 发射50)至少需要detal<=0.002,按照detal为0.0169需要0.8左右的时间才能发射完，于是不能deta仅发射一个粒子。
            //改为按照时间比例发射粒子
            if (this.emissionData.emissionType == ParticleEmissionType.continue)
            {
                // if (this.numcount == 0) 
                // {
                //     this.addParticle();
                //     this.numcount++;
                // }
                // console.log("curtime:"+this.curTime.toString()+"//detaltime:"+delta.toString());

                // if (this.curTime > this._continueSpaceTime)
                // {
                //     if (this.numcount < this.emissionData.emissionCount)
                //     {
                //         console.log("addparticle  toteltime:"+this.testtime.toString()+"    //curnumber:"+this.numcount.toString());
                //         this.addParticle();
                //         this.curTime = 0;
                //         this.numcount++;
                //     }
                //     else
                //     {
                //         if (this.beloop)
                //         {
                //             this.curTime = 0;
                //             this.numcount = 0;
                //             this.isover = false;
                //         } else
                //         {
                //             this.isover = true;
                //         }
                //     }
                // }

                var rate=this.curTime/this.emissionData.time;
                rate=gd3d.math.floatClamp(rate,0,1);
                var needCount=Math.floor(rate*this.emissionData.emissionCount);
                needCount=needCount-this.numcount;
                for(var i=0;i<needCount;i++)
                {
                    this.addParticle();
                    this.numcount++;
                }
                if(rate==1)
                {
                    if (this.beloop)
                    {
                        this.curTime = 0;
                        this.numcount = 0;
                        this.isover = false;
                    } else
                    {
                        this.isover = true;
                    }
                }

            }
            else if (this.emissionData.emissionType == ParticleEmissionType.burst)
            {
                if (this.curTime > this.emissionData.time)
                {
                    this.addParticle(this.emissionData.emissionCount);
                    if (this.beloop)
                    {
                        this.curTime = 0;
                        this.isover = false;
                    } else
                    {
                        this.isover = true;
                    }
                }
            }
        }

        addParticle(count: number = 1)
        {
            for (var i = 0; i < count; i++)
            {
                if (this.deadParticles.length > 0)
                {
                    var particle = this.deadParticles.pop();
                    particle.initByData();
                    particle.update(0);
                    particle.actived = true;
                }
                else
                {
                    var total = this.curbatcher.curVerCount + this.perVertexCount;
                    if (total <= this.maxVertexCount)
                    {
                        this.curbatcher.addParticle();
                    }
                    else
                    {
                        this.addBatcher();
                        this.curbatcher.addParticle();
                    }
                }
            }
        }

        private addBatcher()
        {
            var batcher = new EmissionBatcher(this);
            this.emissionBatchers.push(batcher);
            this.curbatcher = batcher;
        }

        renderCamera:camera;
        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
        {
            this.renderCamera=camera;
            if (this.simulateInLocalSpace)
            {
                context.updateModel(this.gameObject.transform);
            }
            else
            {
                context.updateModeTrail();
            }
            for (let key in this.emissionBatchers)
            {
                this.emissionBatchers[key].render(context, assetmgr, camera);
            }
        }
        dispose()
        {
            for (let key in this.emissionBatchers)
            {
                this.emissionBatchers[key].dispose();
            }
            this.emissionBatchers.length = 0;
        }
        public isOver(): boolean
        {
            return this.isover;
        }
    }

}