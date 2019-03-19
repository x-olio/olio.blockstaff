namespace gd3d.math
{
    //重构原则2，一个函数，一种用法，不给默认值
    //重构原则3，内部不new，所有计算函数需要外部提供out 参数，最后一个参数为out 参数
    // export function vec2Subtract(a: vector2, b: vector2, out: vector2)
    // {
    //     out.x = a.x - b.x;
    //     out.y = a.y - b.y;
    // }
    // export function vec2Add(a: vector2, b: vector2, out: vector2) {
    //     out.x = a.x + b.x;
    //     out.y = a.y + b.y;
    // }

    export function vec3Clone(from: vector3, to: vector3)
    {
        // to.x = from.x;
        // to.y = from.y;
        // to.z = from.z;
        //to.rawData.set(from.rawData);
        to.rawData[0]=from.rawData[0];
        to.rawData[1]=from.rawData[1];
        to.rawData[2]=from.rawData[2];
    }
    export function vec3ToString(result: string)
    {
        result = this.x + "," + this.y + "," + this.z;
    }

    export function vec3Add(a: vector3, b: vector3, out: vector3)
    {
        out.rawData[0] = a.x + b.x;
        out.rawData[1] = a.y + b.y;
        out.rawData[2] = a.z + b.z;
    }
    export function vec3Subtract(a: vector3, b: vector3, out: vector3)
    {
        out.rawData[0] = a.x - b.x;
        out.rawData[1] = a.y - b.y;
        out.rawData[2] = a.z - b.z;
    }
    export function vec3Minus(a: vector3, out: vector3)
    {
        out.rawData[0] = -a.x;
        out.rawData[1] = -a.y;
        out.rawData[2] = -a.z;
    }
    export function vec3Length(a: vector3): number
    {
        return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    }
    export function vec3SqrLength(value: vector3): number
    {
        return value.x * value.x + value.y * value.y + value.z * value.z;
    }
    export function vec3Set_One(out: vector3)
    {
        out.rawData[0] = out.rawData[1] = out.rawData[2] = 1;
    }
    export function vec3Set_Forward(out: vector3)
    {
        out.rawData[0] = out.rawData[1] = 0;
        out.rawData[2] = 1;
    }
    export function vec3Set_Back(out: vector3)
    {
        out.rawData[0] = out.rawData[1] = 0;
        out.rawData[2] = -1;
    }
    export function vec3Set_Up(out: vector3)
    {
        out.rawData[0] = out.rawData[2] = 0;
        out.rawData[1] = 1;
    }
    export function vec3Set_Down(out: vector3)
    {
        out.rawData[0] = out.rawData[2] = 0;
        out.rawData[1] = -1;
    }
    export function vec3Set_Left(out: vector3)
    {
        out.rawData[0] = -1;
        out.rawData[1] = out.rawData[2] = 0;
    }
    export function vec3Set_Right(out: vector3)
    {
        out.rawData[0] = 1;
        out.rawData[1] = out.rawData[2] = 0;
    }
    export function vec3Normalize(value: vector3, out: vector3)
    {
        var num: number = vec3Length(value);
        if (num > Number.MIN_VALUE)
        {
            out.rawData[0] = value.x / num;
            out.rawData[1] = value.y / num;
            out.rawData[2] = value.z / num;
        } else
        {
            out.rawData[0] = 0;
            out.rawData[1] = 0;
            out.rawData[2] = 0;
        }
    }

    export function vec3ScaleByVec3(from: vector3, scale: vector3, out: vector3)
    {
        out.rawData[0] = from.x * scale.x;
        out.rawData[1] = from.y * scale.y;
        out.rawData[2] = from.z * scale.z;
    }
    export function vec3ScaleByNum(from: vector3, scale: number, out: vector3)
    {
        out.rawData[0] = from.x * scale;
        out.rawData[1] = from.y * scale;
        out.rawData[2] = from.z * scale;
    }
    export function vec3Product(a: vector3, b: vector3, out: vector3)
    {
        out.rawData[0] = a.x * b.x;
        out.rawData[1] = a.y * b.y;
        out.rawData[2] = a.z * b.z;
    }
    export function vec3Cross(lhs: vector3, rhs: vector3, out: vector3)
    {
        out.rawData[0] = lhs.y * rhs.z - lhs.z * rhs.y;
        out.rawData[1] = lhs.z * rhs.x - lhs.x * rhs.z;
        out.rawData[2] = lhs.x * rhs.y - lhs.y * rhs.x;
    }
    export function vec3Reflect(inDirection: vector3, inNormal: vector3, out: vector3)
    {
        //return -2 * vector3.Dot(inNormal, inDirection) * inNormal + inDirection;
        var v1: number = 0;
        v1 = vec3Dot(inNormal, inDirection);
        vec3ScaleByNum(out, v1 * -2, out);
        vec3Add(out, inDirection, out);
    }
    export function vec3Dot(lhs: vector3, rhs: vector3): number
    {
        return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
    }
    export function vec3Project(vector: vector3, onNormal: vector3, out: vector3)
    {
        var num: number = 0;
        num = vec3Dot(onNormal, onNormal);
        if (num < Number.MIN_VALUE)
        {
            out.rawData[0] = out.rawData[1] = out.rawData[2] = 0;
        } else
        {
            //return onNormal * vector3.Dot(vector, onNormal) / num;
            let num2: number = 0;
            num2 = vec3Dot(vector, onNormal);
            vec3ScaleByNum(onNormal, num2 / num, out);
        }
    }
    export function vec3ProjectOnPlane(vector: vector3, planeNormal: vector3, out: vector3)
    {
        //return vector - vector3.Project(vector, planeNormal);
        vec3Project(vector, planeNormal, out);
        vec3Subtract(vector, out, out);
    }
    export function vec3Exclude(excludeThis: vector3, fromThat: vector3, out: vector3)
    {
        vec3Project(fromThat, excludeThis, out);
        vec3Subtract(fromThat, out, out);
        //return fromThat - vector3.Project(fromThat, excludeThis);
    }
    export function vec3Angle(from: vector3, to: vector3): number
    {
        var out1 = pool.new_vector3();
        var out2 = pool.new_vector3();
        vec3Normalize(from, out1);
        vec3Normalize(to, out2);
        var result = vec3Dot(out1, out2);
        result = floatClamp(result, -1, 1);
        result = Math.acos(result) * 57.29578;
        pool.delete_vector3(out1);
        pool.delete_vector3(out1);
        return result;
    }
    export function vec3Distance(a: vector3, b: vector3): number
    {
        var out = pool.new_vector3();
        vec3Subtract(a, b, out);
        var result = Math.sqrt(out.x * out.x + out.y * out.y + out.z * out.z);
        pool.delete_vector3(out);
        return result;
    }
    export function vec3ClampLength(vector: vector3, maxLength: number, out: vector3)
    {
        let val: number = 0;
        val = vec3SqrLength(vector);
        if (val > maxLength * maxLength)
        {
            vec3Normalize(vector, out);
            vec3ScaleByNum(out, maxLength, out);
        }
        out.rawData.set(vector.rawData);
    }
    export function vec3Min(lhs: vector3, rhs: vector3, out: vector3)
    {
        out.rawData[0] = Math.min(lhs.x, rhs.x);
        out.rawData[1] = Math.min(lhs.y, rhs.y);
        out.rawData[2] = Math.min(lhs.z, rhs.z);
    }
    export function vec3Max(lhs: vector3, rhs: vector3, out: vector3)
    {
        out.rawData[0] = Math.max(lhs.x, rhs.x);
        out.rawData[1] = Math.max(lhs.y, rhs.y);
        out.rawData[2] = Math.max(lhs.z, rhs.z);
    }
    export function vec3AngleBetween(from: vector3, to: vector3): number
    {
        vec3Normalize(from, from);
        vec3Normalize(to, to);
        var result = vec3Dot(from, to);
        result = floatClamp(result, -1, 1);
        result = Math.acos(result);
        return result;
    }
    export function vec3Reset(out: vector3)
    {
        out.rawData[0] = 0;
        out.rawData[1] = 0;
        out.rawData[2] = 0;
    }
    export function vec3SLerp(vector: vector3, vector2: vector3, v: number, out: vector3)
    {
        out.rawData[0] = vector.x * (1 - v) + vector2.x * v;
        out.rawData[1] = vector.y * (1 - v) + vector2.y * v;
        out.rawData[2] = vector.z * (1 - v) + vector2.z * v;
    }
    export function vec3SetByFloat(x: number, y: number, z: number, out: vector3)
    {
        out.rawData[0] = x;
        out.rawData[1] = y;
        out.rawData[2] = z;
    }

    export function vec3Format(vector: vector3, maxDot: number, out: vector3)
    {
        out.rawData[0] = floatFormat(vector.x, maxDot);
        out.rawData[1] = floatFormat(vector.y, maxDot);
        out.rawData[2] = floatFormat(vector.z, maxDot);
    }

    export function quaternionFormat(vector: quaternion, maxDot: number, out: quaternion)
    {
        out.rawData[0] = floatFormat(vector.x, maxDot);
        out.rawData[1] = floatFormat(vector.y, maxDot);
        out.rawData[2] = floatFormat(vector.z, maxDot);
        out.rawData[3] = floatFormat(vector.w, maxDot);
    }
    export function floatFormat(num: number, maxDot: number)
    {
        var vv = Math.pow(10, maxDot);
        return Math.round(num * vv) / vv;
    }
    //toQuat(dest: Cengine.quaternion = null): Cengine.quaternion {
    //    if (!dest) dest = new Cengine.quaternion();

    //    var c = new vector3();
    //    var s = new vector3();

    //    c.x = Math.cos(this.x * 0.5);
    //    s.x = Math.sin(this.x * 0.5);

    //    c.y = Math.cos(this.y * 0.5);
    //    s.y = Math.sin(this.y * 0.5);

    //    c.z = Math.cos(this.z * 0.5);
    //    s.z = Math.sin(this.z * 0.5);

    //    dest.x = s.x * c.y * c.z - c.x * s.y * s.z;
    //    dest.y = c.x * s.y * c.z + s.x * c.y * s.z;
    //    dest.z = c.x * c.y * s.z - s.x * s.y * c.z;
    //    dest.w = c.x * c.y * c.z + s.x * s.y * s.z;

    //    return dest;
    //}

    //multiplyByMat3(matrix: Matrix3x3): void {
    //    matrix.multiplyVec3(this, this);
    //}

    //multiplyByQuat(quat: Cengine.quaternion): void {
    //    quat.multiplyVec3(this, this);
    //}

    ////又有参数又有返回值的必须是static
    export function vec3Equal(vector: vector3, vector2: vector3, threshold = 0.00001): boolean {
       if (Math.abs(vector.x - vector2.x) > threshold)
           return false;

       if (Math.abs(vector.y - vector2.y) > threshold)
           return false;

       if (Math.abs(vector.z - vector2.z) > threshold)
           return false;

       return true;
    }

    export function vec3SetAll(vector : vector3 , value : number){
        vector.rawData[0] = value;
        vector.rawData[1] = value;
        vector.rawData[2] = value;
    }

    export function vec3Set(vector : vector3 , x : number ,  y : number , z : number){
        vector.rawData[0] = x;
        vector.rawData[1] = y;
        vector.rawData[2] = z;
    }

    //static sDirection(vector: vector3, vector2: vector3, dest: vector3 = null): vector3 {
    //    if (!dest) dest = new vector3();

    //    var x = vector.x - vector2.x,
    //        y = vector.y - vector2.y,
    //        z = vector.z - vector2.z;

    //    var length = Math.sqrt(x * x + y * y + z * z);

    //    if (length === 0)
    //    {
    //        dest.x = 0;
    //        dest.y = 0;
    //        dest.z = 0;

    //        return dest;
    //    }

    //    length = 1 / length;

    //    dest.x = x * length;
    //    dest.y = y * length;
    //    dest.z = z * length;

    //    return dest;
    //}


}