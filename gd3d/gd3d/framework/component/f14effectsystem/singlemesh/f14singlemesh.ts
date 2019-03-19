namespace gd3d.framework
{
    export class F14SingleMesh implements F14Element
    {
        drawActive: boolean;
        type: F14TypeEnum;
        layer: F14Layer;
        private  effect:f14EffectSystem;
        //public bool BeRecording = false;
        public RenderBatch:F14SingleMeshBath;
    
        public position:math.vector3=new math.vector3();
        public scale:math.vector3=new math.vector3();
        public euler:math.vector3=new math.vector3();
        public color:math.color=new math.color();
        public tex_ST:math.vector4=new math.vector4();
        public baseddata:F14SingleMeshBaseData;
    
        private localRotate:math.quaternion=new math.quaternion();
        //-----------------life from to---------------------
        public startFrame:number;
        public endFrame:number;

        private vertexCount:number;
        private posArr:math.vector3[];
        private colorArr:math.color[];
        private uvArr:math.vector2[];
        dataforvbo:Float32Array;
        dataforebo:Uint16Array;
        
        constructor(effect:f14EffectSystem,layer:F14Layer)
        {
            this.type = F14TypeEnum.SingleMeshType;
            this.effect = effect;
            this.layer = layer;
            this.baseddata = layer.data.elementdata as F14SingleMeshBaseData;

            math.vec3Clone(this.baseddata.position,this.position);
            math.vec3Clone(this.baseddata.scale,this.scale);
            math.vec3Clone(this.baseddata.euler,this.euler);
            math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z,this.localRotate);
            math.colorClone(this.baseddata.color,this.color);
            math.vec4Clone(this.baseddata.tex_ST,this.tex_ST);
            
            this.refreshStartEndFrame();

            this.posArr=this.baseddata.mesh.data.pos;
            this.colorArr=this.baseddata.mesh.data.color;
            this.uvArr=this.baseddata.mesh.data.uv;
            this.vertexCount=this.posArr.length;
            
            this.dataforvbo=this.baseddata.mesh.data.genVertexDataArray(this.effect.VF);
            this.dataforebo=this.baseddata.mesh.data.genIndexDataArray();
        }
    
        public refreshStartEndFrame()
        {
            if (this.layer.frameList.length == 0)
            {
                this.startFrame = 0;
            }else
            {
                this.startFrame = this.layer.frameList[0];
            }
            if(this.layer.frameList.length>1)
            {
                this.endFrame = this.layer.frameList[this.layer.frameList.length - 1];
            }else
            {
                this.endFrame = this.effect.data.lifeTime;
            }
        }
    
        
        public update(deltaTime:number,frame:number, fps:number)
        {
            if (this.layer.frameList.length == 0)
            {
                this.drawActive = false;
                return;
            } 

            if(this.effect.data.beloop)
            {
                switch (this.baseddata.loopenum)
                {
                    case LoopEnum.Restart:
                        frame = this.effect.restartFrame;
                        break;
                    case LoopEnum.TimeContinue:
                        break;
                }
            }
            if (frame < this.startFrame|| frame > this.endFrame)
            {
                this.drawActive = false;
                return;
            }else
            {
                this.drawActive=true;
            }
            ////------------------time line 方式--------------------
            //先传入本身初始的属性值，属性不一定在lin中存在值，需要初始值

            for(var item in this.layer.Attlines)
            {
                let att = this.layer.Attlines[item];
                att.getValue(frame,this.baseddata,this[item]);
                
            }


            if (this.baseddata.enableTexAnimation)
            {
                this.refreshCurTex_ST(frame,deltaTime,fps);
            }
            this.updateRotByBillboard();
            this.refreshTargetMatrix();
        }

        OnEndOnceLoop()
        {
            this.reset();
        }

        targetMat:math.matrix=new math.matrix();
        public refreshTargetMatrix()
        {
            // math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z,this.localRotate);
            math.matrixMakeTransformRTS(this.position,this.scale,this.localRotate,this.targetMat);
            //return Matrix4x4.TRS(this.position, Quaternion.Euler(this.euler.x, this.euler.y, this.euler.z),this.scale);
        }
        //------temp value
        private tempos=math.pool.new_vector3();
        private temColor=math.pool.new_color();
        private temUv=math.pool.new_vector2();
        uploadMeshdata()
        {
            let batch=this.layer.batch as F14SingleMeshBath;
            for(let i=0;i<this.vertexCount;i++)
            {
                math.matrixTransformVector3(this.posArr[i],this.targetMat,this.tempos);
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+0]= this.tempos.x;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+1]= this.tempos.y;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+2]= this.tempos.z;


                if(this.colorArr)
                {
                    math.colorMultiply(this.colorArr[i],this.color,this.temColor);
                }else
                {
                    math.colorClone(this.color,this.temColor);
                }
                
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+3]= this.temColor.r;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+4]= this.temColor.g;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+5]= this.temColor.b;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+6]= this.temColor.a;

                this.temUv.x=this.uvArr[i].x*this.tex_ST.x+this.tex_ST.z;
                this.temUv.y=this.uvArr[i].y*this.tex_ST.y+this.tex_ST.w;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+7]= this.temUv.x;
                batch.dataForVbo[i*batch.vertexLength+batch.curRealVboCount+8]= this.temUv.y;
            }
            for(let i=0;i<this.dataforebo.length;i++)
            {
                batch.dataForEbo[i+batch.curIndexCount]=this.dataforebo[i]+batch.curVertexcount;
            }
            batch.curRealVboCount+=this.dataforvbo.length;
            batch.curIndexCount+=this.dataforebo.length;
            batch.curVertexcount+=this.vertexCount;
        }
    
    
    
        public refreshCurTex_ST(curframe:number,detalTime:number,fps:number)
        {
            if (this.baseddata.uvType == UVTypeEnum.UVRoll)
            {
                this.tex_ST.z +=this.baseddata.uSpeed*detalTime;
                this.tex_ST.w +=this.baseddata.vSpeed*detalTime;
            }
            else if(this.baseddata.uvType==UVTypeEnum.UVSprite)
            {
                let lerp = (curframe - this.startFrame) /(this.endFrame+1 - this.startFrame);
                let spritindex =Math.floor(lerp * this.baseddata.count);
                gd3d.math.spriteAnimation(this.baseddata.row,this.baseddata.column,spritindex,this.tex_ST);
            }
        }
        //----------tempt
        private eulerRot=new math.quaternion();
        private worldpos=new math.vector3();
        private worldRot=new math.quaternion();
        private inverseRot=new math.quaternion();

        private lookDir=new math.vector3();
        private worldDirx=new math.vector3();
        private worldDiry=new math.vector3();
        public updateRotByBillboard()
        {
            if(this.baseddata.beBillboard)
            {
                if(this.baseddata.bindAxis==BindAxis.NONE)
                {
                    let mat=this.effect.root.getWorldMatrix();
                    gd3d.math.matrixTransformVector3(this.position,mat,this.worldpos);
                    let targetpos=this.effect.renderCamera.gameObject.transform.getWorldTranslate();
                    gd3d.math.quatLookat(this.worldpos,targetpos,this.worldRot);
                    let parentRot = this.effect.root.getWorldRotate();
                    math.quatInverse(parentRot,this.inverseRot);
                    gd3d.math.quatMultiply(this.inverseRot,this.worldRot,this.localRotate);
                    gd3d.math.quatFromAxisAngle(math.pool.vector3_forward,this.euler.z,this.eulerRot);
                    gd3d.math.quatMultiply(this.localRotate,this.eulerRot,this.localRotate);
                }else if(this.baseddata.bindAxis==BindAxis.X)
                {
                    let mat=this.effect.root.getWorldMatrix();
                    gd3d.math.matrixTransformVector3(this.position,mat,this.worldpos);
                    let targetpos=this.effect.renderCamera.gameObject.transform.getWorldTranslate();
                    math.vec3Subtract(targetpos,this.worldpos,this.lookDir);
                    math.vec3Normalize(this.lookDir,this.lookDir);
                    math.matrixMakeTransformRTS(this.baseddata.position,this.baseddata.scale,this.localRotate,this.targetMat);
                    math.matrixMultiply(mat,this.targetMat,this.targetMat);
                    gd3d.math.matrixTransformNormal(gd3d.math.pool.vector3_right,this.targetMat,this.worldDirx);
                    math.vec3Normalize(this.worldDirx,this.worldDirx);
                    math.vec3Cross(this.lookDir,this.worldDirx,this.worldDiry);
                    math.vec3Cross(this.worldDirx,this.worldDiry,this.lookDir);
                    math.unitxyzToRotation(this.worldDirx,this.worldDiry,this.lookDir,this.worldRot);
                    let parentRot = this.effect.root.getWorldRotate();
                    math.quatInverse(parentRot,this.inverseRot);
                    gd3d.math.quatMultiply(this.inverseRot,this.worldRot,this.localRotate);
                }else
                {
                    let mat=this.effect.root.getWorldMatrix();
                    gd3d.math.matrixTransformVector3(this.position,mat,this.worldpos);
                    let targetpos=this.effect.renderCamera.gameObject.transform.getWorldTranslate();
                    //gd3d.math.quatLookat(this.worldpos,targetpos,this.worldRot);
                    math.vec3Subtract(targetpos,this.worldpos,this.lookDir);
                    math.vec3Normalize(this.lookDir,this.lookDir);
                    math.matrixMakeTransformRTS(this.position,this.scale,this.localRotate,this.targetMat);
                    math.matrixMultiply(mat,this.targetMat,this.targetMat);
                    gd3d.math.matrixTransformNormal(gd3d.math.pool.vector3_up,this.targetMat,this.worldDiry);
                    math.vec3Normalize(this.worldDiry,this.worldDiry);
                    math.vec3Cross(this.worldDiry,this.lookDir,this.worldDirx);
                    math.vec3Cross(this.worldDirx,this.worldDiry,this.lookDir);
                    math.unitxyzToRotation(this.worldDirx,this.worldDiry,this.lookDir,this.worldRot);
                    let parentRot = this.effect.root.getWorldRotate();
                    math.quatInverse(parentRot,this.inverseRot);
                    gd3d.math.quatMultiply(this.inverseRot,this.worldRot,this.localRotate);
                }
            }else
            {
                math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z,this.localRotate);
            }
        }

        reset()
        {
            math.vec3Clone(this.baseddata.position,this.position);
            math.vec3Clone(this.baseddata.scale,this.scale);
            math.vec3Clone(this.baseddata.euler,this.euler);
            math.quatFromEulerAngles(this.euler.x, this.euler.y, this.euler.z,this.localRotate);
            math.colorClone(this.baseddata.color,this.color);
            math.vec4Clone(this.baseddata.tex_ST,this.tex_ST);
            // if(this.settedAlpha!=null)
            // {
            //     this.color.a=this.baseddata.color.a*this.settedAlpha;
            // }
        }
        changeColor(value:math.color)
        {
            this.color=value;
        }
        public settedAlpha:number;
        changeAlpha(value:number)
        {
            // this.color.a=this.baseddata.color.a*this.settedAlpha;
            this.settedAlpha=value;
        }
        dispose()
        {
            this.layer=null;
            this.RenderBatch=null;
            this.baseddata=null;
            this.effect=null;
            // this.posArr.length=0;
            // this.colorArr.length=0;
            // this.uvArr.length=0;
            delete this.posArr;
            delete this.colorArr;
            delete this.uvArr;
            

            delete this.dataforvbo;
            delete this.dataforebo;
            
        }    }
    
}