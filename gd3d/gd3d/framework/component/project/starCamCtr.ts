namespace gd3d.framework
{
    @reflect.nodeComponent
    export class starCamCtr implements INodeComponent {
        static readonly ClassName:string="starCamCtr";

        moveDuration:number=1;//移动速度
        minSpeed=5;//角速度

        relativelocation:math.vector3=new math.vector3(0,6,0);
        relativeEuler:math.vector3=new math.vector3(90,0,0);
        private relativeRot:math.quaternion=new math.quaternion();

        private starteCamRot:math.quaternion=new math.quaternion();
        private targetCamPos:math.vector3=new math.vector3();
        private targetCamRot:math.quaternion=new math.quaternion();
        
        private distance:number;
        private movedir:math.vector3=new math.vector3();
        private moveSpeed:number;
        private eulerSpeed:number;


        private active:boolean=false;
        start() {
            
        }

        onPlay()
        {

        }

        private moveDis:math.vector3=new math.vector3();
        update(delta: number) {
            if(!this.active) return;
            let pos=this.gameObject.transform.localTranslate
            let rot=this.gameObject.transform.localRotate;

            let distanc=math.vec3Distance(pos,this.targetCamPos);
            let movedis=this.moveSpeed*delta;
            if(distanc>movedis)
            {
                math.vec3ScaleByNum(this.movedir,movedis,this.moveDis);
                math.vec3Add(pos,this.moveDis,this.gameObject.transform.localTranslate);
                math.quatLerp(this.starteCamRot,this.targetCamRot,this.gameObject.transform.localRotate,(this.distance-distanc)/this.distance);

                this.gameObject.transform.markDirty();
                this.gameObject.transform.updateWorldTran();
            }else
            {
                this.active=false;
            }
        }

        gameObject: gameObject;

        remove() {
            
        }

        clone() {
            
        }

        moveTo(to:transform)
        {
            gd3d.math.quatClone(this.gameObject.transform.localRotate,this.starteCamRot);

            math.quatFromEulerAngles(this.relativeEuler.x,this.relativeEuler.y,this.relativeEuler.z,this.relativeRot);
            math.quatTransformVector(to.localRotate,this.relativelocation,this.targetCamPos);
            math.vec3Add(to.localTranslate,this.targetCamPos,this.targetCamPos);
            math.quatMultiply(to.localRotate,this.relativeRot,this.targetCamRot);

            let distanc=math.pool.new_vector3();
            math.vec3Subtract(this.targetCamPos,this.gameObject.transform.localTranslate,distanc);
            math.vec3Normalize(distanc,this.movedir);

            this.distance=math.vec3Length(distanc);
            this.moveSpeed=this.distance/this.moveDuration;

            gd3d.math.pool.delete_vector3(distanc);
            this.active=true;
        }
    }
}