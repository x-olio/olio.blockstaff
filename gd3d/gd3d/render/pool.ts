namespace gd3d.math
{
    /**
    * @public
    * @language zh_CN
    * @classdesc
    * 对常用结构类型数据进行池化处理，
    * 在大量使用结构类型数据的逻辑中尽量使用该结构
    * @version gd3d 1.0
    */
    export class pool
    {
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 释放所有池
        * @version gd3d 1.0
        */
        static collect_all()
        {
            pool.collect_vector4();
            pool.collect_vector3();
            pool.collect_vector2();
            pool.collect_matrix();
            pool.collect_quaternion();
            pool.collect_color();
            pool.collect_pickInfo();
        }
        //需要用啥照着这个加
        //for vector4
        private static _vector4_one: vector4;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取1填充的v4
        * @version gd3d 1.0
        */
        static get vector4_one(): vector4
        {
            if (pool._vector4_one == null)
            {
                pool._vector4_one = new vector4(1, 1, 1, 1);
            }
            return pool._vector4_one;
        }

        private static unused_vector4: vector4[] = [];

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个v4
        * @version gd3d 1.0
        */
        static new_vector4(x: number = 0, y: number = 0, z: number = 0, w: number = 0): vector4
        {
            if (pool.unused_vector4.length > 0)
            {
                let v4 = pool.unused_vector4.pop();
                v4.x = x; v4.y = y; v4.z = z; v4.w = w;
                return v4;
            }
            else
                return new vector4(x, y, z, w);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 有返回值的v4克隆
        * @version gd3d 1.0
        */
        static clone_vector4(src: vector4): vector4
        {
            if (pool.unused_vector4.length > 0)
            {
                var v = pool.unused_vector4.pop();
                // v.x = src.x;
                // v.y = src.y;
                // v.z = src.z;
                // v.w = src.w;
                v.rawData.set(src.rawData);
                return v;
            }
            else
                return new vector4(src.x, src.y, src.z);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个v4
        * @version gd3d 1.0
        */
        static delete_vector4(v: vector4): void
        {
            if (v == null) return;
            if (v instanceof vector4)
            {
                v.x = v.y = v.z = 0;
                v.w = 1;
                pool.unused_vector4.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是vector4吗？");
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除v4池
        * @version gd3d 1.0
        */
        static collect_vector4()
        {
            pool.unused_vector4.length = 0;//清除未使用的vector 池子
        }

        //for color
        private static _color_one: color;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取1填充的color
        * @version gd3d 1.0
        */
        static get color_one(): color
        {
            if (pool._color_one == null)
            {
                pool._color_one = new color(1, 1, 1, 1);
            }
            return pool._color_one;
        }

        private static unused_color: color[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个color
        * @version gd3d 1.0
        */
        static new_color(r: number = 0, g: number = 0, b: number = 0, a: number = 0): color
        {
            if (pool.unused_color.length > 0)
            {
                let c = pool.unused_color.pop();
                c.r = r; c.g = g; c.b = b; c.a = a;
                return c;
            }
            else
                return new color(r, g, b, a);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收color
        * @version gd3d 1.0
        */
        static delete_color(v: color): void
        {
            if (v == null) return;
            if (v instanceof color)
            {
                v.r = v.g = v.b = 0;
                v.a = 1;
                pool.unused_color.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是color吗？");
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除color池
        * @version gd3d 1.0
        */
        static collect_color()
        {
            pool.unused_color.length = 0;//清除未使用的vector 池子
        }

        //for vector3
        private static _vector3_up: vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v3朝y轴正向
        * @version gd3d 1.0
        */
        static get vector3_up(): vector3
        {
            if (pool._vector3_up == null)
            {
                pool._vector3_up = new vector3(0, 1, 0);
            }
            pool._vector3_up.y = 1;
            pool._vector3_up.x = pool._vector3_up.z = 0;
            return pool._vector3_up;
        }
        private static _vector3_right: vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v3朝x轴正向
        * @version gd3d 1.0
        */
        static get vector3_right(): vector3
        {
            if (pool._vector3_right == null)
            {
                pool._vector3_right = new vector3(1, 0, 0);
            }
            pool._vector3_right.x = 1;
            pool._vector3_right.y = pool._vector3_right.z = 0;
            return pool._vector3_right;
        }
        private static _vector3_forward: vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v3朝z轴正向
        * @version gd3d 1.0
        */
        static get vector3_forward(): vector3
        {
            if (pool._vector3_forward == null)
            {
                pool._vector3_forward = new vector3(0, 0, 1);
            }
            pool._vector3_forward.x = pool._vector3_forward.y = 0;
            pool._vector3_forward.z = 1;
            return pool._vector3_forward;
        }
        private static _vector3_zero: vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取0填充的v3
        * @version gd3d 1.0
        */
        static get vector3_zero(): vector3
        {
            if (pool._vector3_zero == null)
            {
                pool._vector3_zero = new vector3(0, 0, 0);
            }
            pool._vector3_zero.x = pool._vector3_zero.y = pool._vector3_zero.z = 0;
            return pool._vector3_zero;
        }
        private static _vector3_one: vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取1填充的v3
        * @version gd3d 1.0
        */
        static get vector3_one(): vector3
        {
            if (pool._vector3_one == null)
            {
                pool._vector3_one = new vector3(1, 1, 1);
            }
            pool._vector3_one.x = pool._vector3_one.y = pool._vector3_one.z = 1;
            return pool._vector3_one;
        }

        private static unused_vector3: vector3[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个v3
        * @version gd3d 1.0
        */
        static new_vector3(x: number = 0, y: number = 0, z: number = 0): vector3
        {
            if (pool.unused_vector3.length > 0)
            {
                let v3 = pool.unused_vector3.pop();
                v3.x = x; v3.y = y; v3.z = z;
                return v3;
            }
            else
                return new vector3(x, y, z);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的v3克隆
        * @version gd3d 1.0
        */
        static clone_vector3(src: vector3): vector3
        {
            if (pool.unused_vector3.length > 0)
            {
                var v = pool.unused_vector3.pop();
                // v.x = src.x;
                // v.y = src.y;
                // v.z = src.z;
                v.rawData.set(src.rawData);
                return v;
            }
            else
                return new vector3(src.x, src.y, src.z);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个v3
        * @version gd3d 1.0
        */
        static delete_vector3(v: vector3): void
        {
            if (v == null) return;
            if (v instanceof vector3)
            {
                v.x = v.y = v.z = 0;
                pool.unused_vector3.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是vector3吗？");
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个v3数组
        * @version gd3d 1.0
        */
        static delete_vector3Array(vs: vector3[]): void
        {
            for (let i = 0; i < vs.length; i++)
            {
                if (vs[i] != undefined)
                {
                    this.delete_vector3(vs[i]);
                }
            }
            vs.length = 0;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除v3池
        * @version gd3d 1.0
        */
        static collect_vector3()
        {
            pool.unused_vector3.length = 0;//清除未使用的vector 池子
        }

        //for vector2
        private static _vector2_zero: vector2;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v2 zero
        * @version gd3d 1.0
        */
        static get vector2_zero(): vector2
        {
            if (pool._vector2_zero == null)
            {
                pool._vector2_zero = new vector2(0, 0);
            }
            pool._vector2_zero.x = pool._vector2_zero.y = 1;
            return pool._vector2_zero;
        }

        private static _vector2_up: vector2;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v2朝y轴正向
        * @version gd3d 1.0
        */
        static get vector2_up(): vector2
        {
            if (pool._vector2_up == null)
            {
                pool._vector2_up = new vector2(0, 1);
            }
            pool._vector2_up.x = 0; pool._vector2_up.y = 1;
            return pool._vector2_up;
        }
        private static _vector2_right: vector2;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取v2朝x轴正向
        * @version gd3d 1.0
        */
        static get vector2_right(): vector2
        {
            if (pool._vector2_right == null)
            {
                pool._vector2_right = new vector2(1, 0);
            }
            pool._vector2_right.x = 1; pool._vector2_right.y = 0;
            return pool._vector2_right;
        }
        private static unused_vector2: vector2[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个v2
        * @version gd3d 1.0
        */
        static new_vector2(x: number = 0, y: number = 0): vector2
        {
            if (pool.unused_vector2.length > 0)
            {
                let v2 = pool.unused_vector2.pop();
                v2.x = x; v2.y = y;
                return v2;
            }
            else
                return new vector2(x, y);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的v2克隆
        * @version gd3d 1.0
        */
        static clone_vector2(src: vector2): vector2
        {
            if (pool.unused_vector2.length > 0)
            {
                var v = pool.unused_vector2.pop();
                // v.x = src.x;
                // v.y = src.y;
                if (src.rawData.length > v.rawData.length)
                {
                    src.rawData[0] = v.rawData[0];
                    src.rawData[1] = v.rawData[1];
                } else
                    v.rawData.set(src.rawData);

                return v;
            }
            else
                return new vector2(src.x, src.y);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个v2
        * @version gd3d 1.0
        */
        static delete_vector2(v: vector2): void
        {
            if (v == null) return;
            if (v instanceof vector2)
            {
                v.x = v.y = 0;
                pool.unused_vector2.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是vector2吗？");
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个v2数组
        * @version gd3d 1.0
        */
        static delete_vector2Array(vs: vector2[]): void
        {
            for (let i = 0; i < vs.length; i++)
            {
                if (vs[i] != undefined)
                {
                    this.delete_vector2(vs[i]);
                }
            }
            vs.length = 0;
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除v2池
        * @version gd3d 1.0
        */
        static collect_vector2()
        {
            pool.unused_vector2.length = 0;//清除未使用的vector 池子
        }

        //for matrix3x2
        private static unused_matrix3x2: matrix3x2[] = [];

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个3x2matrix
        * @version gd3d 1.0
        */
        static new_matrix3x2(): matrix3x2
        {
            if (pool.unused_matrix3x2.length > 0)
                return pool.unused_matrix3x2.pop();
            else
                return new matrix3x2();
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的3x2matrix克隆
        * @version gd3d 1.0
        */
        static clone_matrix3x2(src: matrix3x2): matrix3x2
        {
            var v: matrix3x2 = pool.new_matrix3x2();
            // for (var i = 0; i < 6; i++)
            //     v.rawData[i] = src.rawData[i];
            v.rawData.set(src.rawData);
            return v;
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个3x2matrix
        * @version gd3d 1.0
        */
        static delete_matrix3x2(v: matrix3x2): void
        {
            if (v == null) return;
            if (v instanceof matrix3x2)
            {
                v.rawData[0] = 1;
                v.rawData[1] = 0;
                v.rawData[2] = 0;
                v.rawData[3] = 1;
                v.rawData[4] = 0;
                v.rawData[5] = 0;
                pool.unused_matrix3x2.push(v);
            } else
            {
                console.error("kindding me?确定你要回收的是matrix3x2吗？");
            }
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除3x2matrix池
        * @version gd3d 1.0
        */
        static collect_matrix3x2()
        {
            pool.unused_matrix3x2.length = 0;//清除未使用的池子
        }

        //for matrix
        private static unused_matrix: matrix[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个matrix
        * @version gd3d 1.0
        */
        static new_matrix(): matrix
        {
            if (pool.unused_matrix.length > 0)
                return pool.unused_matrix.pop();
            else
                return new matrix();
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的matrix克隆
        * @version gd3d 1.0
        */
        static clone_matrix(src: matrix): matrix
        {
            var v: matrix = pool.new_matrix();
            // for (var i = 0; i < 16; i++)
            //     v.rawData[i] = src.rawData[i];
            v.rawData.set(src.rawData);
            return v;
        }
        static readonly identityMat: matrix = new matrix();
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个matrix
        * @version gd3d 1.0
        */
        static delete_matrix(v: matrix): void
        {
            if (v == null) return;
            if (v instanceof matrix)
            {
                v.rawData[0] = 1;
                v.rawData[1] = 0;
                v.rawData[2] = 0;
                v.rawData[3] = 0;

                v.rawData[4] = 0;
                v.rawData[5] = 1;
                v.rawData[6] = 0;
                v.rawData[7] = 0;

                v.rawData[8] = 0;
                v.rawData[9] = 0;
                v.rawData[10] = 1;
                v.rawData[11] = 0;

                v.rawData[12] = 0;
                v.rawData[13] = 0;
                v.rawData[14] = 0;
                v.rawData[15] = 1;
                pool.unused_matrix.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是matrix吗？");
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除matrix池
        * @version gd3d 1.0
        */
        static collect_matrix()
        {
            pool.unused_matrix.length = 0;//清除未使用的池子
        }

        //for quaternion
        private static unused_quaternion: quaternion[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个quat
        * @version gd3d 1.0
        */
        static new_quaternion(x = 0, y = 0, z = 0, w = 1): quaternion
        {
            if (pool.unused_quaternion.length > 0){
                let q = pool.unused_quaternion.pop();
                q.x=x; q.y=y; q.z=z; q.w=w;
                return q;
            }
            else
                return new quaternion(x,y,z,w);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的quat克隆
        * @version gd3d 1.0
        */
        static clone_quaternion(src: quaternion): quaternion
        {
            if (pool.unused_quaternion.length > 0)
            {
                var v = pool.unused_quaternion.pop();
                // v.x = src.x;
                // v.y = src.y;
                // v.z = src.z;
                // v.w = src.w;
                v.rawData.set(src.rawData);
                return v;
            }
            else
                return new quaternion(src.x, src.y, src.z, src.w);
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个quat
        * @version gd3d 1.0
        */
        static delete_quaternion(v: quaternion): void
        {
            if (v == null) return;
            if (v instanceof quaternion)
            {
                v.x = v.y = v.z = 0;
                v.w = 1;
                pool.unused_quaternion.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是quaternion吗？");
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 清除quat池
        * @version gd3d 1.0
        */
        static collect_quaternion()
        {
            pool.unused_quaternion.length = 0;//清除未使用的池子
        }



        private static unused_pickInfo: framework.pickinfo[] = [];

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个pickInfo
        * @version gd3d 1.0
        */
        static new_pickInfo(bu: number = 0, bv: number = 0, distance: number = 0): framework.pickinfo
        {
            if (pool.unused_pickInfo.length > 0)
            {
                let pk = pool.unused_pickInfo.pop();
                pk.bu = bu;
                pk.bv = bv;
                pk.distance = distance;
                return pk;
            }
            else
                return new framework.pickinfo(bu, bv, distance);
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个pickInfo
        * @version gd3d 1.0
        */
        static delete_pickInfo(v: framework.pickinfo): void
        {
            if (v == null) return;
            if (v instanceof framework.pickinfo)
            {
                v.init();
                pool.unused_pickInfo.push(v);
            }
            else
                console.error("kindding me?确定你要回收的是pickInfo吗？");
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 清除pickInfo池
         * @version gd3d 1.0
         */
        static collect_pickInfo()
        {
            pool.unused_pickInfo.length = 0;
        }

        //for rect
        private static unused_rect: rect[] = [];
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取一个rect
        * @version gd3d 1.0
        */
        static new_rect(x:number =0 ,y:number =0 ,w:number = 0 ,h:number = 0): rect
        {
            if (pool.unused_rect.length > 0){
                let r = pool.unused_rect.pop();
                r.x = x; r.y = y; r.w = w; r.h = h;
                return r;
            }
            else
                return new rect(x,y,w,h);
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 带返回值的rect克隆
        * @version gd3d 1.0
        */
       static clone_rect(src: rect): rect
       {
           if (pool.unused_rect.length > 0)
           {
               var v = pool.unused_rect.pop();
               v.x = src.x; v.y = src.y; v.w = src.w; v.h = src.h;
               return v;
           }
           else
               return new rect(src.x, src.y, src.w, src.h);
       }

       /**
        * @public
        * @language zh_CN
        * @classdesc
        * 回收一个rect
        * @version gd3d 1.0
        */
       static delete_rect(v: rect): void
       {
           if (v == null) return;
           if (v instanceof rect)
           {
               v.x = v.y = v.w = v.h =0;
               pool.unused_rect.push(v);
           }
           else
               console.error("kindding me?确定你要回收的是rect吗？");
       }

       /**
         * @public
         * @language zh_CN
         * @classdesc
         * 清除rect池
         * @version gd3d 1.0
         */
        static collect_rect()
        {
            pool.unused_rect.length = 0;
        }

    }
}