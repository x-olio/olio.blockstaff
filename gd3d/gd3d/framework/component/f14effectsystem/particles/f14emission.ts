namespace gd3d.framework
{
    export class F14Emission implements F14Element
    {
        type: F14TypeEnum;
        layer: F14Layer;
        drawActive: boolean;
        public effect: f14EffectSystem;

        public baseddata: F14EmissionBaseData;
        public currentData: F14EmissionBaseData;
        //-------------------------数据------------------------------------
        public particlelist: F14Particle[] = [];
        public deadParticles: F14Particle[] = [];


        //--------------------------------------------------------
        private frameLife: number = 0;

        private TotalTime: number = 0;
        private newStartDataTime: number = 0;//改变currentdata的时间
        public curTime: number = 0;//减去dely剩下的
        private beover: boolean = false;
        //private bool beBurst = false;
        private numcount: number = 0;

        //--------------------
        localMatrix: math.matrix = new math.matrix();
        private _worldMatrix: math.matrix = new math.matrix();
        private localrot = new math.quaternion();
        private worldRot = new math.quaternion();

        vertexCount: number;
        vertexLength: number;
        dataforvboLen: number;
        dataforebo: Uint16Array;
        posArr: math.vector3[];
        colorArr: math.color[];
        uvArr: math.vector2[];

        public constructor(effect: f14EffectSystem, layer: F14Layer)
        {
            this.type = F14TypeEnum.particlesType;
            this.effect = effect;
            this.layer = layer;
            this.baseddata = layer.data.elementdata as F14EmissionBaseData;
            this.currentData = this.baseddata;

            this.newStartDataTime = this.baseddata.delayTime;

            this.initBycurrentdata();
            if (this.currentData.mesh.data)
            {
                this.vertexCount = this.currentData.mesh.data.pos.length;
                this.posArr = this.currentData.mesh.data.pos;
                this.colorArr = this.currentData.mesh.data.color;
                this.uvArr = this.currentData.mesh.data.uv;
                this.dataforebo = this.currentData.mesh.data.genIndexDataArray();
                this.vertexLength = gd3d.render.meshData.calcByteSize(this.effect.VF) / 4;
                this.dataforvboLen = this.vertexCount * this.vertexLength;
            } else
            {
                this.vertexCount = 0;
                this.posArr = [];
                this.colorArr = [];
                this.uvArr = [];
                this.dataforebo = new Uint16Array(0);
            }
        }

        private lastFrame: number = 0;
        public update(deltaTime: number, frame: number, fps: number)
        {
            //this.drawActive = true;
            this.TotalTime += deltaTime;

            this.refreshByFrameData(fps);
            this.updateLife();
            for (let i = 0; i < this.particlelist.length; i++)
            {
                this.particlelist[i].update(deltaTime);
            }
        }
        private refreshByFrameData(fps: number)
        {
            this.frameLife = Math.floor(this.baseddata.duration * fps);
            if (this.frameLife == 0) this.frameLife = 1;
            let frame = Math.floor(this.TotalTime * fps) % this.frameLife;
            //-------------------------------change current basedata------------------------------------------------------------
            if (frame != this.lastFrame && this.layer.frames[frame])
            {
                if (frame == this.layer.frameList[0])
                {
                    this.currentData = this.baseddata;
                }
                if (this.layer.frames[frame].data.EmissionData != this.currentData)
                {
                    this.changeCurrentBaseData(this.layer.frames[frame].data.EmissionData);
                }
            }
            this.lastFrame = frame;
        }

        public changeCurrentBaseData(data: F14EmissionBaseData)
        {
            this.currentData = data;
            this.newStartDataTime = this.TotalTime;
            this.numcount = 0;
            this.initBycurrentdata();
        }

        private initBycurrentdata()
        {
            math.quatFromEulerAngles(this.currentData.rotEuler.x, this.currentData.rotEuler.y, this.currentData.rotEuler.z, this.localrot);
            math.matrixMakeTransformRTS(this.currentData.rotPosition, this.currentData.rotScale, this.localrot, this.localMatrix);
        }

        getWorldMatrix(): math.matrix
        {
            let mat = this.effect.root.getWorldMatrix();
            math.matrixMultiply(mat, this.localMatrix, this._worldMatrix);
            return this._worldMatrix;
        }
        getWorldRotation(): math.quaternion
        {
            let rot = this.effect.root.getWorldRotate();
            gd3d.math.quatMultiply(rot, this.localrot, this.worldRot);
            return this.worldRot;
        }

        private updateLife()
        {
            if (this.beover) return;
            this.curTime = this.TotalTime - this.baseddata.delayTime;
            if (this.curTime <= 0) return;
            //--------------update in Livelife-------------------
            this.updateEmission();

            if (this.curTime > this.baseddata.duration)
            {
                if (this.baseddata.beloop)
                {
                    switch (this.baseddata.loopenum)
                    {
                        case LoopEnum.Restart:
                            this.reInit();
                            break;
                        case LoopEnum.TimeContinue:
                            this.beover = true;
                            break;
                    }
                }
                else
                {
                    this.beover = true;
                }
            }
        }
        private reInit()
        {
            this.currentData = this.baseddata;
            this.newStartDataTime = this.baseddata.delayTime;
            this.beover = false;
            this.TotalTime = 0;
            this.numcount = 0;

            this.currentData.rateOverTime.getValue(true);//重新随机

            if(this.settedAlpha!=null)
            {
                this.currentData.startAlpha = new NumberData(this.baseddata.startAlpha._value*this.settedAlpha);
            }
            // for (let i = 0; i < this.baseddata.bursts.length; i++)
            // {
            //     this.baseddata.bursts[i].burst(false);
            // }
            this.bursts = [];
        }

        private bursts: number[] = [];
        private updateEmission()
        {
            let needCount = Math.floor(this.currentData.rateOverTime.getValue() * (this.TotalTime - this.newStartDataTime));
            let realcount = needCount - this.numcount;
            if (realcount > 0)
            {
                this.addParticle(realcount);
            }
            this.numcount += realcount;

            if (this.baseddata.bursts.length > 0)
            {
                for (let i = 0; i < this.baseddata.bursts.length; i++)
                {
                    let index = this.bursts.indexOf(this.baseddata.bursts[i].time);
                    if (index < 0 && this.baseddata.bursts[i].time <= this.TotalTime)
                    {
                        let count = this.baseddata.bursts[i].count.getValue(true);
                        this.baseddata.bursts[i].burst();
                        this.bursts.push(this.baseddata.bursts[i].time);
                        this.addParticle(count);
                    }
                    // if(!this.baseddata.bursts[i].beburst()&&this.baseddata.bursts[i].time<=this.TotalTime)
                    // {
                    //     let count = this.baseddata.bursts[i].count.getValue(true);
                    //     this.baseddata.bursts[i].burst();
                    //     this.addParticle(count);
                    // }
                }
            }
        }

        private addParticle(count: number = 1)
        {
            for (let i = 0; i < count; i++)
            {
                if (this.deadParticles.length > 0)
                {
                    let pp = this.deadParticles.pop();
                    pp.initByEmissionData(this.currentData);
                }
                else
                {
                    let pp = new F14Particle(this, this.currentData);
                    this.particlelist.push(pp);
                }
            }
        }
        //重置，例子啥的消失
        reset()
        {
            this.reInit();
            //----------------
            for (let i = 0; i < this.particlelist.length; i++)
            {
                if (this.particlelist[i].actived)
                {
                    this.particlelist[i].actived = false;
                    this.deadParticles.push(this.particlelist[i]);
                }
            }
        }

        changeColor(value: math.color)
        {
            this.currentData.startColor = new Vector3Data(value.r, value.g, value.b);
            this.currentData.startAlpha = new NumberData(value.a);
        }

        private settedAlpha:number;
        changeAlpha(value:number)
        {
            this.currentData.startAlpha = new NumberData(this.baseddata.startAlpha._value*value);
            this.settedAlpha=value;
        }

        OnEndOnceLoop()
        {

        }

        dispose()
        {
            this.effect = null;
            this.baseddata = null;
            this.currentData = null;

            delete this.dataforebo;
            delete this.posArr;
            delete this.colorArr;
            delete this.uvArr;
            delete this.bursts;

            for (let key in this.particlelist)
            {
                this.particlelist[key].dispose();
            }
            for (let key in this.deadParticles)
            {
                this.deadParticles[key].dispose();
            }
        }
    }

}