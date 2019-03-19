namespace gd3d.math
{
    export function vec2Subtract(a: vector2, b: vector2, out: vector2) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
    }
    export function vec2Add(a: vector2, b: vector2, out: vector2) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
    }
    export function vec2Clone(from: vector2, to: vector2) {
        // to.x = from.x;
        // to.y = from.y;
        //to.rawData.set(from.rawData);
        to.rawData[0]=from.rawData[0];
        to.rawData[1]=from.rawData[1];
    }
    export function vec2Distance(a: vector2, b: vector2): number
    {
        var out = pool.new_vector2();
        vec2Subtract(a, b, out);
        var result = Math.sqrt(out.x * out.x + out.y * out.y);
        pool.delete_vector2(out);
        return result;
    }
    export function vec2ScaleByNum(from: vector2, scale: number, out: vector2)
    {
        out.x = from.x * scale;
        out.y = from.y * scale;
    }
    export function vec2ScaleByVec2(from: vector2, scale: vector2, out: vector2)
    {
        out.x = from.x * scale.x;
        out.y = from.y * scale.y;
    }
    export function vec2Length(a: vector2): number
    {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    }

    export function vec2SLerp(vector: vector2, vector2: vector2, v: number, out: vector2) {
        out.x = vector.x * (1 - v) + vector2.x * v;
        out.y = vector.y * (1 - v) + vector2.y * v;
    }

    export function vec2Normalize(from: vector2, out: vector2)
    {
        var num: number = vec2Length(from);
        if (num > Number.MIN_VALUE) {
            out.x = from.x / num;
            out.y = from.y / num;
        } else {
            out.x = 0;
            out.y = 0;
        }
    }
    export function vec2Multiply(a: vector2, b: vector2): number
    {
        return a.x * b.x + a.y * b.y;
    }
    export function vec2Dot(lhs: vector2, rhs: vector2): number
    {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    }

    //阀值先写这里了，回头
    export function vec2Equal(vector: vector2, vector2: vector2, threshold = 0.00001): boolean {
       if (Math.abs(vector.x - vector2.x) > threshold)
           return false;

       if (Math.abs(vector.y - vector2.y) > threshold)
           return false;

       return true;
    }

    export function vec2SetAll(vector : vector2 , value : number){
        vector.rawData[0] = value;
        vector.rawData[1] = value;
    }

    export function vec2Set (vector : vector2 , x : number ,  y : number){
        vector.rawData[0] = x;
        vector.rawData[1] = y;
    }
}
