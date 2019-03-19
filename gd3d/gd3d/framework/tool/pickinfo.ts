namespace gd3d.framework
{
    /**
    * @private
    * @language zh_CN
    * @classdesc
    * 拾取到的信息
    * @version egret-gd3d 1.0
    */
    export class pickinfo
    {
        normal:math.vector3=new math.vector3();
        public pickedtran: transform;
        public distance: number = 0;
        public hitposition: math.vector3 = new math.vector3();
        public bu: number = 0;
        public bv: number = 0;
        public faceId: number = -1;
        public subMeshId: number = 0;
        constructor(_bu: number =0, _bv: number =0, _distance: number = 0)
        {
            this.distance = _distance;
            this.bu = _bu;
            this.bv = _bv;
        }
        init(){
            this.pickedtran = null;
            this.hitposition.x = this.hitposition.y = this.hitposition.z = this.distance = this.bu = this.bv = this.subMeshId = 0;
            this.faceId = -1;
        }
        cloneFrom(from:pickinfo){
            math.vec3Clone(from.normal,this.normal);
            this.pickedtran = from.pickedtran;
            math.vec3Clone(from.hitposition,this.hitposition);
            this.distance = from.distance;
            this.bu = from.bu;
            this.bv = from.bv;
            this.subMeshId = from.subMeshId;
            this.faceId = from.faceId;
        }
    }
}