namespace gd3d.framework
{
    let helpV2_0 =new gd3d.math.vector2();
    let helpV2_1 =new gd3d.math.vector2();
    let helpV3_0 =new gd3d.math.vector3();
    let helpV3_1 =new gd3d.math.vector3();
    
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 碰撞检测Tool
     * @version egret-gd3d 1.0
     */
    export class collision{ 
        //obb-mesh  obb-obb  mesh-mesh
        
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * obb 碰 obb
        * @version egret-gd3d 1.0
        */
        static obbVsObb(a:obb,b:obb):boolean{
            if (!a || !b) return false;
            let box0 = a;
            let box1 = b;

            let box0_dirs = box0.directions;
            let box1_dirs = box1.directions;

            if (!this.obbOverLap(box0_dirs[0], box0, box1)) return false;
            if (!this.obbOverLap(box0_dirs[1], box0, box1)) return false;
            if (!this.obbOverLap(box0_dirs[2], box0, box1)) return false;
            if (!this.obbOverLap(box1_dirs[0], box0, box1)) return false;
            if (!this.obbOverLap(box1_dirs[1], box0, box1)) return false;
            if (!this.obbOverLap(box1_dirs[2], box0, box1)) return false;

            gd3d.math.vec3Cross(box0_dirs[0], box1_dirs[0], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[0], box1_dirs[1], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[0], box1_dirs[2], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[1], box1_dirs[0], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[1], box1_dirs[1], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[1], box1_dirs[2], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[2], box1_dirs[0], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[2], box1_dirs[1], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;
            gd3d.math.vec3Cross(box0_dirs[2], box1_dirs[2], helpV3_0);
            if (!this.obbOverLap(helpV3_0, box0, box1)) return false;

            return true;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * sphere 碰 sphere
        * @version egret-gd3d 1.0
        */
        static sphereVsSphere(a:spherestruct,b:spherestruct){
            if(!a || !b)    return false;
            let dis = math.vec3Distance(a.center, b.center);
            return dis <= a.radius + b.radius;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * obb 碰 sphere
        * @version egret-gd3d 1.0
        */
        static obbVsSphere(a:obb,b:spherestruct):boolean{
            if(!a || !b)    return false;
            let a_dirs = a.directions;

            if (!this.obb_SphereOverLap(a_dirs[0], a, b)) return false;
            if (!this.obb_SphereOverLap(a_dirs[1], a, b)) return false;
            if (!this.obb_SphereOverLap(a_dirs[2], a, b)) return false;

            let axis = helpV3_0;
            gd3d.math.vec3Subtract(a.worldCenter,b.center,axis); //obb 上 到圆心最近点 的轴
            gd3d.math.vec3Normalize(axis,axis);
            if (!this.obb_SphereOverLap(axis, a, b)) return false;

            gd3d.math.vec3Cross(a_dirs[0], axis, helpV3_1);
            if (!this.obb_SphereOverLap(helpV3_1, a, b)) return false;
            gd3d.math.vec3Cross(a_dirs[1], axis, helpV3_1);
            if (!this.obb_SphereOverLap(helpV3_1, a, b)) return false;
            gd3d.math.vec3Cross(a_dirs[2], axis, helpV3_1);
            if (!this.obb_SphereOverLap(helpV3_1, a, b)) return false;

            return true;
        }

        //MeshVsMesh

        //obbVsMesh

        //SphereVsMesh

        //tool fun

        private static obb_SphereOverLap(axis: gd3d.math.vector3, box0: obb, sphere: spherestruct){
            box0.computeExtentsByAxis(axis,helpV2_0);
            sphere.computeExtentsByAxis(axis,helpV2_1);
            return this.extentsOverlap(helpV2_0,helpV2_1);
        }

        private static obbOverLap(axis: gd3d.math.vector3, box0: obb, box1: obb){
            box0.computeExtentsByAxis(axis,helpV2_0);
            box1.computeExtentsByAxis(axis,helpV2_1);
            return this.extentsOverlap(helpV2_0,helpV2_1);
        }

        private static extentsOverlap(a:math.vector2,b:math.vector2): boolean
        {
            return !(a.x > b.y || b.x > a.y);
        }
    }
}