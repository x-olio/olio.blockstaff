/// <reference path="../io/reflect.ts" />

namespace gd3d.math
{


    export type byte = number;
    export type ubyte = number;
    export type short = number;
    export type int = number;
    export type ushort = number;
    export type uint = number;
    export type float = number;
    export type double = number;

    var _ubyte: Uint8Array = new Uint8Array(1);
    var _byte: Int8Array = new Int8Array(1);
    var _int16: Int16Array = new Int16Array(1);
    var _int32: Int32Array = new Int32Array(1);
    var _uint16: Uint16Array = new Uint16Array(1);
    var _uint32: Uint32Array = new Uint32Array(1);
    var _float32: Float32Array = new Float32Array(1);
    var _float64: Float64Array = new Float64Array(1);

    export function UByte(v: number | string = 0): ubyte
    {
        if (typeof (v) == "string")
            v = Number(v);
        _ubyte[0] = v;
        return _ubyte[0];
    }
    export function Byte(v: number | string = 0): byte
    {
        if (typeof (v) == "string")
            v = Number(v);
        _byte[0] = v;
        return _byte[0];
    }

    export function Int16(v: number | string = 0): short
    {
        if (typeof (v) == "string")
            v = Number(v);
        _int16[0] = v;
        return _int16[0];
    }

    export function Int32(v: number | string = 0): int
    {
        if (typeof (v) == "string")
            v = Number(v);
        _int32[0] = v;
        return _int32[0];
    }


    export function UInt16(v: number | string = 0): ushort
    {
        if (typeof (v) == "string")
            v = Number(v);
        _uint16[0] = v;
        return _uint16[0];
    }

    export function UInt32(v: number | string = 0): uint
    {
        if (typeof (v) == "string")
            v = Number(v);
        _uint32[0] = v;
        return _uint32[0];
    }

    export function Float(v: number | string = 0): float
    {
        if (typeof (v) == "string")
            v = Number(v);
        _float32[0] = v;
        return _float32[0];
    }

    export function Double(v: number | string = 0): double
    {
        if (typeof (v) == "string")
            v = Number(v);
        _float64[0] = v;
        return _float64[0];
    }


    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class vector2
    {
        static readonly ClassName:string="vector2";

        public rawData = new Float32Array(2);
        constructor(x: float = 0, y: float = 0)
        {
            this.rawData[0] = x;
            this.rawData[1] = y;
        }
        @gd3d.reflect.Field("number")
        get x(): float
        {
            return this.rawData[0];
        };
        set x(x: float)
        {
            this.rawData[0] = x;
        }
        @gd3d.reflect.Field("number")
        get y(): float
        {
            return this.rawData[1];
        };
        set y(y: float)
        {
            this.rawData[1] = y;
        }
        toString(): string
        {
            return `${this.x},${this.y}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class rect
    {
        static readonly ClassName:string="rect";

        public rawData = new Float32Array(4);
        constructor(x: float = 0, y: float = 0, w: float = 0, h: float = 0)
        {
            this.rawData[0] = x;
            this.rawData[1] = y;
            this.rawData[2] = w;
            this.rawData[3] = h;
        }
        @gd3d.reflect.Field("number")
        get x(): float
        {
            return this.rawData[0];
        };
        set x(x: float)
        {
            this.rawData[0] = x;
        }
        @gd3d.reflect.Field("number")
        get y(): float
        {
            return this.rawData[1];
        };
        set y(y: float)
        {
            this.rawData[1] = y;
        }
        @gd3d.reflect.Field("number")
        get w(): float
        {
            return this.rawData[2];
        };
        set w(w: float)
        {
            this.rawData[2] = w;
        }

        @gd3d.reflect.Field("number")
        get h(): float
        {
            return this.rawData[3];
        };
        set h(h: float)
        {
            this.rawData[3] = h;
        }

        toString(): string
        {
            return `${this.rawData[0]},${this.rawData[1]},${this.rawData[2]},${this.rawData[3]}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class border
    {
        static readonly ClassName:string="border";

        public rawData = new Float32Array(4);
        constructor(l: float = 0, t: float = 0, r: float = 0, b: float = 0)
        {
            this.rawData[0] = l;
            this.rawData[1] = t;
            this.rawData[2] = r;
            this.rawData[3] = b;
        }
        @gd3d.reflect.Field("number")
        get l(): float
        {
            return this.rawData[0];
        };
        set l(l: float)
        {
            this.rawData[0] = l;
        }
        @gd3d.reflect.Field("number")
        get t(): float
        {
            return this.rawData[1];
        };
        set t(t: float)
        {
            this.rawData[1] = t;
        }
        @gd3d.reflect.Field("number")
        get r(): float
        {
            return this.rawData[2];
        };
        set r(r: float)
        {
            this.rawData[2] = r;
        }
        @gd3d.reflect.Field("number")
        get b(): float
        {
            return this.rawData[3];
        };
        set b(b: float)
        {
            this.rawData[3] = b;
        }

        toString(): string
        {
            return `${this.r},${this.t},${this.r},${this.b}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class color
    {
        static readonly ClassName:string="color";

        public rawData = new Float32Array(4);
        constructor(r: float = 1, g: float = 1, b: float = 1, a: float = 1)
        {
            this.rawData[0] = r;
            this.rawData[1] = g;
            this.rawData[2] = b;
            this.rawData[3] = a;
        }
        @gd3d.reflect.Field("number")
        get r(): float
        {
            return this.rawData[0];
        };
        set r(r: float)
        {
            this.rawData[0] = r;
        }
        @gd3d.reflect.Field("number")
        get g(): float
        {
            return this.rawData[1];
        };
        set g(g: float)
        {
            this.rawData[1] = g;
        }
        @gd3d.reflect.Field("number")
        get b(): float
        {
            return this.rawData[2];
        };
        set b(b: float)
        {
            this.rawData[2] = b;
        }
        @gd3d.reflect.Field("number")
        get a(): float
        {
            return this.rawData[3];
        };
        set a(a: float)
        {
            this.rawData[3] = a;
        }
        toString(): string
        {
            return `${this.r},${this.g},${this.b},${this.a}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class vector3
    {
        static readonly ClassName:string="vector3";

        public rawData = new Float32Array(3);
        constructor(x: float = 0, y: float = 0, z: float = 0)
        {
            this.rawData[0] = x;
            this.rawData[1] = y;
            this.rawData[2] = z;
        }
        @gd3d.reflect.Field("number")
        get x(): float
        {
            return this.rawData[0];
        };
        set x(x: float)
        {
            this.rawData[0] = x;
        }
        @gd3d.reflect.Field("number")
        get y(): float
        {
            return this.rawData[1];
        };
        set y(y: float)
        {
            this.rawData[1] = y;
        }
        @gd3d.reflect.Field("number")
        get z(): float
        {
            return this.rawData[2];
        };
        set z(z: float)
        {
            this.rawData[2] = z;
        }

        toString(): string
        {
            return `${this.rawData[0]},${this.rawData[1]},${this.rawData[2]}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class vector4
    {
        static readonly ClassName:string="vector4";

        public rawData = new Float32Array(4);
        constructor(x: float = 0, y: float = 0, z: float = 0, w: float = 0)
        {
            this.rawData[0] = x;
            this.rawData[1] = y;
            this.rawData[2] = z;
            this.rawData[3] = w;
        }
        @gd3d.reflect.Field("number")
        get x(): float
        {
            return this.rawData[0];
        };
        set x(x: float)
        {
            this.rawData[0] = x;
        }
        @gd3d.reflect.Field("number")
        get y(): float
        {
            return this.rawData[1];
        };
        set y(y: float)
        {
            this.rawData[1] = y;
        }
        @gd3d.reflect.Field("number")
        get z(): float
        {
            return this.rawData[2];
        };
        set z(z: float)
        {
            this.rawData[2] = z;
        }
        @gd3d.reflect.Field("number")
        get w(): float
        {
            return this.rawData[3];
        };
        set w(w: float)
        {
            this.rawData[3] = w;
        }
        toString(): string
        {
            return `${this.rawData[0]},${this.rawData[1]},${this.rawData[2]},${this.rawData[3]}`;
        }
    }

    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class quaternion
    {
        static readonly ClassName:string="quaternion";

        public rawData = new Float32Array(4);
        constructor(x: float = 0, y: float = 0, z: float = 0, w: float = 1)
        {
            this.rawData[0] = x;
            this.rawData[1] = y;
            this.rawData[2] = z;
            this.rawData[3] = w;
        }
        @gd3d.reflect.Field("number")
        get x(): float
        {
            return this.rawData[0];
        };
        set x(x: float)
        {
            this.rawData[0] = x;
        }
        @gd3d.reflect.Field("number")
        get y(): float
        {
            return this.rawData[1];
        };
        set y(y: float)
        {
            this.rawData[1] = y;
        }
        @gd3d.reflect.Field("number")
        get z(): float
        {
            return this.rawData[2];
        };
        set z(z: float)
        {
            this.rawData[2] = z;
        }
        @gd3d.reflect.Field("number")
        get w(): float
        {
            return this.rawData[3];
        };
        set w(w: float)
        {
            this.rawData[3] = w;
        }
        toString(): string
        {
            return `${this.rawData[0]},${this.rawData[1]},${this.rawData[2]},${this.rawData[3]}`;
        }
    }

    /**
     * @private
     */
    export class matrix
    {
        static readonly ClassName:string="matrix";

        public rawData: Float32Array;
        constructor(datas: Float32Array = null)
        {
            if (datas)
            {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        toString(): string
        {
            return "[" + this.rawData[0] + "," + this.rawData[1] + "," + this.rawData[2] + "," + this.rawData[3] + "],"
                + "[" + this.rawData[4] + "," + this.rawData[5] + "," + this.rawData[6] + "," + this.rawData[7] + "],"
                + "[" + this.rawData[8] + "," + this.rawData[9] + "," + this.rawData[10] + "," + this.rawData[11] + "],"
                + "[" + this.rawData[12] + "," + this.rawData[13] + "," + this.rawData[14] + "," + this.rawData[15] + "]";
        }
    }
    /**
     * @private
     */
    export class matrix3x2
    {
        public rawData: Float32Array;
        constructor(datas: Float32Array = null)
        {
            if (datas)
            {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 1, 0, 0]);
        }
        toString(): string
        {
            return "[" + this.rawData[0] + "," + this.rawData[1] + "," + this.rawData[2] + "],"
                + "[" + this.rawData[3] + "," + this.rawData[4] + "," + this.rawData[5] + "]";
        }
    }
    // //表示一个变换
    // export class transform
    // {
    //     rot: quaternion = new quaternion();
    //     tran: vector3 = new vector3();
    //     scale: vector3 = new vector3(1, 1, 1);
    // }
    // //表示一个不含缩放的变换
    // export class TransformWithoutScale
    // {
    //     rot: quaternion = new quaternion();
    //     tran: vector3 = new vector3();
    // }

    export function vec4FormJson(json: string, vec4: vector4)
    {
        json = json.replace("(", "");
        json = json.replace(")", "");
        let arr = json.split(",");
        vec4.x = Number(arr[0]);
        vec4.y = Number(arr[1]);
        vec4.z = Number(arr[2]);
        vec4.w = Number(arr[3]);
    }
    export function vec3FormJson(json: string, vec3: vector3)
    {
        json = json.replace("(", "");
        json = json.replace(")", "");

        let arr = json.split(",");
        vec3.x = Number(arr[0]);
        vec3.y = Number(arr[1]);
        vec3.z = Number(arr[2]);
    }
    export function vec2FormJson(json: string, vec2: vector2)
    {
        json = json.replace("(", "");
        json = json.replace(")", "");
        let arr = json.split(",");
        vec2.x = Number(arr[0]);
        vec2.y = Number(arr[1]);
    }
    export function colorFormJson(json: string, _color: color)
    {
        json = json.replace("RGBA(", "");
        json = json.replace(")", "");
        let arr = json.split(",");
        _color.r = Number(arr[0]);
        _color.g = Number(arr[1]);
        _color.b = Number(arr[2]);
        _color.a = Number(arr[3]);
    }
}