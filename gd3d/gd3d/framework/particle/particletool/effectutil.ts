namespace gd3d.framework
{
    /**
     * @private
     */
    export class EffectUtil
    {

        public static lookatbyXAxis(pos:gd3d.math.vector3,xAxis:gd3d.math.vector3,yAxis:gd3d.math.vector3,zAxis:gd3d.math.vector3,targetpos:gd3d.math.vector3,quat:gd3d.math.quaternion)
        {
            var dir=gd3d.math.pool.new_vector3();
            gd3d.math.vec3Subtract(targetpos,pos,dir);
            gd3d.math.vec3Normalize(dir,dir);

            var crossup=gd3d.math.pool.new_vector3();
            gd3d.math.vec3Cross(dir,xAxis,crossup);
            gd3d.math.vec3Normalize(crossup,crossup);

            var anglerot=gd3d.math.vec3Dot(yAxis,crossup);
            anglerot=Math.acos(anglerot)*180/Math.PI;

            var dot=gd3d.math.vec3Dot(zAxis,crossup);
            dot=Math.acos(dot)*180/Math.PI;
            if(dot>90)
            {
                anglerot=-anglerot;
            }
            gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_right,anglerot,quat);

            gd3d.math.pool.delete_vector3(dir);
            gd3d.math.pool.delete_vector3(crossup);
        }
        public static eulerFromQuaternion(out:math.vector3, q:math.quaternion, order) {
            // Borrowed from Three.JS :)
            // q is assumed to be normalized
            // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
            var sqx = q.x * q.x;
            var sqy = q.y * q.y;
            var sqz = q.z * q.z;
            var sqw = q.w * q.w;

            if ( order === 'XYZ' ) {
                out.x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
                out.y = Math.asin(  gd3d.math.floatClamp( 2 * ( q.x * q.z + q.y * q.w ), -1, 1 ) );
                out.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );
            } else if ( order ===  'YXZ' ) {
                out.x = Math.asin(   gd3d.math.floatClamp( 2 * ( q.x * q.w - q.y * q.z ), -1, 1 ) );
                out.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
                out.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );
            } else if ( order === 'ZXY' ) {
                out.x = Math.asin(   gd3d.math.floatClamp( 2 * ( q.x * q.w + q.y * q.z ), -1, 1 ) );
                out.y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
                out.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );
            } else if ( order === 'ZYX' ) {
                out.x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
                out.y = Math.asin(   gd3d.math.floatClamp( 2 * ( q.y * q.w - q.x * q.z ), -1, 1 ) );
                out.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );
            } else if ( order === 'YZX' ) {
                out.x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
                out.y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
                out.z = Math.asin(   gd3d.math.floatClamp( 2 * ( q.x * q.y + q.z * q.w ), -1, 1 ) );
            } else if ( order === 'XZY' ) {
                out.x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
                out.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
                out.z = Math.asin(   gd3d.math.floatClamp( 2 * ( q.z * q.w - q.x * q.y ), -1, 1 ) );
            } else {
                console.log('No order given for quaternion to euler conversion.');
                return;
            }
        }

        //范围内随机  isInteger是否为整数
        public static RandomRange(min: number, max: number, isInteger: boolean = false)
        {
            if (isInteger)
            {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            return Math.random() * (max - min) + min;
        }
        public static vecMuliNum(vec: gd3d.math.vector3, num: number): gd3d.math.vector3
        {
            var v = new gd3d.math.vector3(vec.x * num, vec.y * num, vec.z * num);
            return v;
        }

        public static parseVector3(value:any):gd3d.math.vector3
        {
            var vector3=new gd3d.math.vector3();
            vector3.x=value["x"];
            vector3.y=value["y"];
            vector3.z=value["z"];
            return vector3;
        }

        public static parseEffectVec3(value: any): ParticleNode
        {
            let node: ParticleNode = new ParticleNode();
            for (let key in value)
            {
                if (value[key] instanceof Array)
                {
                    node[key].valueLimitMin = value[key][0];
                    node[key].valueLimitMax = value[key][1];
                    node[key].isRandom = true;
                }
                else
                {
                    if (key == "key")
                    {
                        node[key] = value[key];
                    } else
                    {
                        node[key].value = value[key];
                        node[key].isRandom = false;
                    }
                }
            }
            return node;
        }
        public static parseEffectVec2(value: any): ParticleNodeVec2
        {
            let node: ParticleNodeVec2 = new ParticleNodeVec2();
            for (let key in value)
            {
                if (value[key] instanceof Array)
                {
                    node[key].valueLimitMin = value[key][0];
                    node[key].valueLimitMax = value[key][1];
                    node[key].isRandom = true;
                }
                else
                {
                    if (key == "key")
                    {
                        node[key] = value[key];
                    } else
                    {
                        node[key].value = value[key];
                        node[key].isRandom = false;
                    }
                }
            }
            return node;
        }
        public static parseEffectNum(value: any): ParticleNodeNumber
        {
            let node = new ParticleNodeNumber();
            if (value instanceof Array)
            {
                node.num.valueLimitMin = value[0];
                node.num.valueLimitMax = value[1];
                node.num.isRandom = true;
            } else
            {
                node.num.value = value;
                node.num.isRandom = false;
            }
            return node;
        }

        public static parseEffectNumNode(value:any):ParticleNodeNumber
        {
            let node = new ParticleNodeNumber();
            for (let key in value)
            {
                if(value[key] instanceof Array)
                {
                    node[key].valueLimitMin=value[key][0];
                    node[key].valueLimitMax=value[key][1];
                }
                else
                {
                    if(key=="key")
                    {
                        node[key]=value[key];
                    }else
                    {
                        node.num.value=value[key];
                    }
                }
            }
            return node;
        }

        public static parseEffectValueData(value: any): ValueData
        {
            let val = new ValueData();
            if (value instanceof Array)
            {
                val.valueLimitMin = value[0];
                val.valueLimitMax = value[1];
                val.isRandom = true;
            } else
            {
                val.value = value;
                val.isRandom = false;
            }
            return val;
        }
        public static parseEffectUVSpeed(value: any): UVSpeedNode
        {
            let node: UVSpeedNode = new UVSpeedNode();
            for (let key in value)
            {
                node[key].value = value[key];
            }
            return node;
        }
        public static lookat(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, up: gd3d.math.vector3 = gd3d.math.pool.vector3_up)
        {

            let dir = new gd3d.math.vector3();
            math.vec3Subtract(targetpos, eye, dir);
            math.vec3Normalize(dir, dir);

            //dir在xz面上的单位投影          
            let unitprojectedXZ = new gd3d.math.vector3(dir.x, 0, dir.z);
            math.vec3Normalize(unitprojectedXZ, unitprojectedXZ);


            var yaw = Math.acos(unitprojectedXZ.z) / Math.PI * 180;
            if (unitprojectedXZ.x < 0)
            {
                yaw = -yaw;
            }
            gd3d.math.quatFromAxisAngle(up, yaw, out);

            let right = gd3d.math.pool.new_vector3();
            math.vec3Cross(up, dir, right);
            math.vec3Normalize(right, right);

            //dir在xz面上的投影   
            let projectedXZ = new gd3d.math.vector3(dir.x, 0, dir.z);
            let length = math.vec3Length(projectedXZ);
            var pitch = Math.acos(length) / Math.PI * 180;
            if (dir.y < 0)
            {
                pitch = -pitch;
            }
            var quadRight = gd3d.math.pool.new_quaternion();
            math.quatFromAxisAngle(right, pitch, quadRight);
            // math.quatMultiply(quadRight,out,out);

        }


        public static RotateVector3(source: gd3d.math.vector3, direction: gd3d.math.vector3, out: gd3d.math.vector3)
        {
            math.vec3Normalize(source, source);
            math.vec3Normalize(direction, direction);

            let forward = new gd3d.math.vector3(0, 0, 1);
            let axis = gd3d.math.pool.new_vector3();
            math.vec3Cross(forward, direction, axis);
            math.vec3Normalize(axis, axis);

            if (axis.x == 0 && axis.y == 0 && axis.z == 0)
            {
                // axis = new gd3d.math.vector3(1, 0, 0);
                axis.x = 1;
                axis.y = 0;
                axis.z = 0;
            }

            let cos = math.vec3Dot(forward, direction);

            let angle = Math.acos(cos) * 180 / Math.PI;
            if (cos < 0)
            {
                angle = -angle;
            }
            let quatertion = gd3d.math.pool.new_quaternion();
            gd3d.math.quatFromAxisAngle(axis, angle, quatertion);
            gd3d.math.quatTransformVector(quatertion, source, out);
            gd3d.math.pool.delete_vector3(axis);
            gd3d.math.pool.delete_quaternion(quatertion);
        }

        public static bindAxisBillboard(localAxis:gd3d.math.vector3,out:gd3d.math.quaternion)
        {
            math.vec3Normalize(localAxis, localAxis);

            let yAxis = gd3d.math.pool.vector3_up;
            let normal = gd3d.math.pool.new_vector3();

            math.vec3Cross(yAxis, localAxis, normal);
            math.vec3Normalize(normal, normal);

            if (normal.x == 0 && normal.y == 0 && normal.z == 0)
            {
                // axis = new gd3d.math.vector3(1, 0, 0);
                normal.x = 1;
                normal.y = 0;
                normal.z = 0;
            }

            let cos = math.vec3Dot(yAxis, localAxis);

            let angle = Math.acos(cos) * 180 / Math.PI;
            if (cos < 0)
            {
                angle = -angle;
            }

            // let quatertion = gd3d.math.pool.new_quaternion();
            gd3d.math.quatFromAxisAngle(normal, angle, out);

        }


        public static lookatVerticalBillboard(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, up: gd3d.math.vector3 = gd3d.math.pool.vector3_up)
        {
            let dir = new gd3d.math.vector3();
            math.vec3Subtract(targetpos, eye, dir);
            math.vec3Normalize(dir, dir);

            //dir在xz面上的单位投影          
            let dirxz = new gd3d.math.vector3(dir.x, 0, dir.z);
            math.vec3Normalize(dirxz, dirxz);


            var yaw = Math.acos(dirxz.z) / Math.PI * 180;
            if (dirxz.x < 0)
            {
                yaw = -yaw;
            }
            gd3d.math.quatFromAxisAngle(up, yaw, out);
        }

        /**
        * 沿Z轴旋转
        * @param eye 注视点  
        * @param targetpos 目标点 
        * @param forward Z轴朝向
        * @param out 旋转得到的四元数
        */
        public static quatLookatZ(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, forward: gd3d.math.vector3 = gd3d.math.pool.vector3_forward)
        {
            let dir = new gd3d.math.vector3();
            math.vec3Subtract(targetpos, eye, dir);
            math.vec3Normalize(dir, dir);

            let dirxy = new gd3d.math.vector3(-dir.x, dir.y, 0);
            math.vec3Normalize(dirxy, dirxy);

            let roll = Math.acos(dirxy.y) / Math.PI * 180;
            if (dirxy.x < 0)
            {
                roll = -roll;
            }
            gd3d.math.quatFromAxisAngle(forward, roll, out);
        }

        /**
         * 沿X轴旋转
         * @param eye 注视点  
         * @param targetpos 目标点 
         * @param right X轴朝向
         * @param out 旋转得到的四元数
         */
        public static quatLookatX(eye: gd3d.math.vector3, targetpos: gd3d.math.vector3, out: gd3d.math.quaternion, right: gd3d.math.vector3 = gd3d.math.pool.vector3_right)
        {
            // let dir = new gd3d.math.vector3();
            let dir = gd3d.math.pool.new_vector3();
            math.vec3Subtract(targetpos, eye, dir);
            math.vec3Normalize(dir, dir);

            let diryz = new gd3d.math.vector3(0, -dir.y, dir.z);
            math.vec3Normalize(diryz, diryz);

            let pitch = Math.acos(diryz.z) / Math.PI * 180;
            if (diryz.y < 0)
            {
                pitch = -pitch;
            }
            gd3d.math.quatFromAxisAngle(right, pitch, out);
        }


        //public static cacldir(pn: gd3d.math.vector3, pos: gd3d.math.vector3, time: number): gd3d.math.vector3
        //{
        //    //var dir = pn.subtract(pos);
        //    //var x = dir.length;
        //    //dir.normalize(x * EffectSystem.fps / time);
        //    var dir: gd3d.math.vector3 = new gd3d.math.vector3();
        //    gd3d.math.vec3Subtract(pn, pos, dir);
        //    var x = gd3d.math.vec3Length(dir) * EffectSystem.fps / time;
        //    gd3d.math.vec3Normalize(dir, dir);
        //    gd3d.math.vec3ScaleByNum(dir, x, dir);

        //    return dir;
        //}
    }
}