/// <reference path="../../render/struct.ts" />

namespace gd3d.math
{

    //临时写在这里
    export function floatClamp(v: number, min: number = 0, max: number = 1): number
    {
        if (v < min)
            return min;
        else if (v > max)
            return max;
        else
            return v;
    }
    export function sign(value: number): number
    {
        value = +value; // convert to a number

        if (value === 0 || isNaN(value))
            return value;

        return value > 0 ? 1 : -1;
    }

    export function getKeyCodeByAscii(ev: KeyboardEvent)
    {
        if (ev.shiftKey)
        {
            return ev.keyCode - 32;
        } else
        {
            return ev.keyCode;
        }
    }


    export function numberLerp(fromV: number, toV: number, v: number)
    {
        return fromV * (1 - v) + toV * v;
    }

    export function x_AXIS()
    {
        return commonStatic.x_axis;
    }
    export function y_AXIS()
    {
        return commonStatic.y_axis;
    }
    export function z_AXIS()
    {
        return commonStatic.z_axis;
    }

    export class commonStatic
    {
        public static x_axis: gd3d.math.vector3 = new gd3d.math.vector3(1, 0, 0);
        public static y_axis: gd3d.math.vector3 = new gd3d.math.vector3(0, 1, 0);
        public static z_axis: gd3d.math.vector3 = new gd3d.math.vector3(0, 0, 1);

    }
}