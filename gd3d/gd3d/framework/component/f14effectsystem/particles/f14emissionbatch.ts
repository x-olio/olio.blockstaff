namespace gd3d.framework
{
    export class F14EmissionBatch implements F14Basebatch
    {

        type: F14TypeEnum;
        effect: f14EffectSystem;

        //public Material mat;
        public emission:F14Emission;//
        
        //-------------------------------
        private mesh:mesh;
        private mat:material;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        // private totalVertexCount:number=0;
        // private toltalIndexCount:number=0;

        curRealVboCount:number=0;
        curVertexcount:number=0;
        curIndexCount:number=0;

        vertexLength:number=0;
        //private maxcoun:number;
        public constructor(effect:f14EffectSystem,element:F14Emission)
        {
            this.type= F14TypeEnum.particlesType;
            this.effect = effect;
            this.emission=element;

            let datamesh=this.emission.baseddata.mesh;
            this.mesh=new mesh();
            this.mat=this.emission.baseddata.material;
            //---------------------
            this.vertexLength=gd3d.render.meshData.calcByteSize(this.effect.VF)/4;

            let maxParticlesCount=this.getMaxParticleCount();
            //this.maxcoun=maxParticlesCount;
            let particleVertexCount=datamesh.data.pos.length;
            let particleIndexCount=datamesh.data.trisindex.length;
            let totalVertex=maxParticlesCount*particleVertexCount;
            let totalIndex=maxParticlesCount*particleIndexCount;

            this.dataForVbo=new Float32Array(totalVertex*this.vertexLength);
            this.dataForEbo=new Uint16Array(totalIndex);


            this.mesh.glMesh = new gd3d.render.glMesh();
            this.mesh.glMesh.initBuffer(this.effect.webgl,this.effect.VF,totalVertex,render.MeshTypeEnum.Dynamic);
            //this.mesh.glMesh.uploadVertexData(webgl, v32);

            this.mesh.glMesh.addIndex(this.effect.webgl, this.dataForEbo.length);
            //this.mesh.glMesh.uploadIndexData(webgl, 0, i16);
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
        }
        private getMaxParticleCount():number
        {
            let maxrate:number;
            let basrat=this.emission.baseddata.rateOverTime;
            maxrate=basrat.isRandom?basrat._valueLimitMax:basrat._value;
            let liftime=this.emission.baseddata.lifeTime;        
            let maxlife=liftime.isRandom?Math.max(liftime._valueLimitMax,liftime._valueLimitMin):liftime._value;

            if(!this.emission.baseddata.beloop)
            {
                let duration=this.emission.baseddata.duration;
                if(duration<maxlife)
                {
                    maxlife=duration;
                }
            }


            for(let item in this.emission.layer.frameList)
            {
                let frame=this.emission.layer.frameList[item];

                let framerate=this.emission.layer.frames[frame].data.EmissionData.rateOverTime;
                let rate=framerate.isRandom?framerate._valueLimitMax:framerate._value;
                if(rate>maxrate)
                {
                    maxrate=rate;
                }
            }

            let burstCount:number=0;
            for(let i=0;i<this.emission.baseddata.bursts.length;i++)
            {
                let info=this.emission.baseddata.bursts[i];
                let Count=info.count.isRandom?info.count._valueLimitMax:info.count._value;
                burstCount+=Count;
            }
            return Math.floor(maxrate*maxlife+burstCount+2);
        }

        public render(context: renderContext, assetmgr: assetMgr, camera: camera,Effqueue:number)
        {
            //gd3d.math.matrixMultiply(this.effect.mvpMat,gd3d.math.pool.identityMat, context.matrixModelViewProject);
            if(this.emission.baseddata.simulateInLocalSpace)
            {
                gd3d.math.matrixClone(this.effect.mvpMat, context.matrixModelViewProject);
            }else
            {
                //gd3d.math.matrixClone(context.matrixViewProject, context.matrixModelViewProject);
                context.updateModeTrail();
            }
            this.mat.setQueue(Effqueue);
            //---------------------集合数据
            this.curIndexCount=0;
            this.curVertexcount=0;
            this.curRealVboCount=0;
            // console.log("emissionCount:   "+this.emission.particlelist.length);
            for(let i=0,len=this.emission.particlelist.length;i<len;i++)
            {
                this.emission.particlelist[i].uploadMeshdata();
                
            }
            //---------------------render
            //this.mesh.glMesh.bindVboBuffer(context.webgl);      

            this.mesh.glMesh.uploadVertexData(context.webgl,this.dataForVbo);
            this.mesh.glMesh.uploadIndexData(context.webgl, 0, this.dataForEbo);
            this.mesh.submesh[0].size=this.curIndexCount;


            //console.log("ebo leng="+this.dataForEbo.length+" vbo leng="+this.dataForVbo.length+" draw size="+this.curIndexCount+"particle count="+this.curVertexcount/this.emission.vertexCount+"max count:"+this.maxcoun);
            this.mat.draw(context,this.mesh,this.mesh.submesh[0]);    
        }
        unRender() {
            
        }
        getElementCount(): number {
            return 1;
        }
        public dispose()
        {
            this.effect=null;
            this.emission=null;
            this.mesh=null;
            this.mat=null;
            delete this.dataForEbo;
            delete this.dataForVbo;
        }
    
    }
}