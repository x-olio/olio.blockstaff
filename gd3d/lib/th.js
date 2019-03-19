var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var gd3d;
(function (gd3d) {
    var threading;
    (function (threading) {
        function threadHandle() {
            return function (constructor) {
                console.log("\u6CE8\u518C\u591A\u7EBF\u7A0B\u5904\u7406\u5668:" + constructor.name);
                // handleMaps.set(constructor.name, new constructor());
                handleMaps[constructor.name] = new constructor();
            };
        }
        threading.threadHandle = threadHandle;
    })(threading = gd3d.threading || (gd3d.threading = {}));
})(gd3d || (gd3d = {}));
var handleMaps = {}; //new Map<string, any>();
onmessage = function (ev) {
    var data = ev.data || ev;
    // if (handleMaps.has(data.handle))
    if (handleMaps[data.handle]) {
        // let result = handleMaps.get(data.handle).handle(data.data);
        var result = handleMaps[data.handle].handle(data.data);
        var _data = {
            result: result,
            id: ev.data.id
        };
        postMessage(_data, undefined);
    }
};
var gd3d;
(function (gd3d) {
    var math;
    (function (math) {
        var _byte = new Uint8Array(1);
        var _int16 = new Int32Array(1);
        var _int32 = new Int32Array(1);
        var _uint16 = new Int32Array(1);
        var _uint32 = new Int32Array(1);
        var _float32 = new Float32Array(1);
        var _float64 = new Float64Array(1);
        function Byte(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _byte[0] = v;
            return _byte[0];
        }
        math.Byte = Byte;
        function Int16(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _int16[0] = v;
            return _int16[0];
        }
        math.Int16 = Int16;
        function Int32(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _int32[0] = v;
            return _int32[0];
        }
        math.Int32 = Int32;
        function UInt16(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _uint16[0] = v;
            return _uint16[0];
        }
        math.UInt16 = UInt16;
        function UInt32(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _uint32[0] = v;
            return _uint32[0];
        }
        math.UInt32 = UInt32;
        function Float(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _float32[0] = v;
            return _float32[0];
        }
        math.Float = Float;
        function Double(v) {
            if (v === void 0) { v = 0; }
            if (typeof (v) == "string")
                v = Number(v);
            _float64[0] = v;
            return _float64[0];
        }
        math.Double = Double;
        /**
         * @private
         */
        var vector2 = /** @class */ (function () {
            function vector2(x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            return vector2;
        }());
        math.vector2 = vector2;
        /**
         * @private
         */
        var rect = /** @class */ (function () {
            function rect(x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            return rect;
        }());
        math.rect = rect;
        /**
         * @private
         */
        var border = /** @class */ (function () {
            function border(l, t, r, b) {
                if (l === void 0) { l = 0; }
                if (t === void 0) { t = 0; }
                if (r === void 0) { r = 0; }
                if (b === void 0) { b = 0; }
                this.l = l;
                this.t = t;
                this.r = r;
                this.b = b;
            }
            return border;
        }());
        math.border = border;
        /**
         * @private
         */
        var color = /** @class */ (function () {
            function color(r, g, b, a) {
                if (r === void 0) { r = 1; }
                if (g === void 0) { g = 1; }
                if (b === void 0) { b = 1; }
                if (a === void 0) { a = 1; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
            return color;
        }());
        math.color = color;
        /**
         * @private
         */
        var vector3 = /** @class */ (function () {
            function vector3(x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
            }
            return vector3;
        }());
        math.vector3 = vector3;
        /**
         * @private
         */
        var vector4 = /** @class */ (function () {
            function vector4(x, y, z, w) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            return vector4;
        }());
        math.vector4 = vector4;
        /**
         * @private
         */
        var quaternion = /** @class */ (function () {
            function quaternion(x, y, z, w) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 1; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            return quaternion;
        }());
        math.quaternion = quaternion;
        /**
         * @private
         */
        var matrix = /** @class */ (function () {
            function matrix(datas) {
                if (datas === void 0) { datas = null; }
                if (datas) {
                    this.rawData = datas;
                }
                else
                    this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            matrix.prototype.toString = function () {
                return "[" + this.rawData[0] + "," + this.rawData[1] + "," + this.rawData[2] + "," + this.rawData[3] + "],"
                    + "[" + this.rawData[4] + "," + this.rawData[5] + "," + this.rawData[6] + "," + this.rawData[7] + "],"
                    + "[" + this.rawData[8] + "," + this.rawData[9] + "," + this.rawData[10] + "," + this.rawData[11] + "],"
                    + "[" + this.rawData[12] + "," + this.rawData[13] + "," + this.rawData[14] + "," + this.rawData[15] + "]";
            };
            return matrix;
        }());
        math.matrix = matrix;
        /**
         * @private
         */
        var matrix3x2 = /** @class */ (function () {
            function matrix3x2(datas) {
                if (datas === void 0) { datas = null; }
                if (datas) {
                    this.rawData = datas;
                }
                else
                    this.rawData = new Float32Array([1, 0, 0, 1, 0, 0]);
            }
            matrix3x2.prototype.toString = function () {
                return "[" + this.rawData[0] + "," + this.rawData[1] + "," + this.rawData[2] + "],"
                    + "[" + this.rawData[3] + "," + this.rawData[4] + "," + this.rawData[5] + "]";
            };
            return matrix3x2;
        }());
        math.matrix3x2 = matrix3x2;
    })(math = gd3d.math || (gd3d.math = {}));
})(gd3d || (gd3d = {}));
var gd3d;
(function (gd3d) {
    var render;
    (function (render) {
        /**
         * @private
         */
        var meshData = /** @class */ (function () {
            function meshData() {
            }
            return meshData;
        }());
        render.meshData = meshData;
    })(render = gd3d.render || (gd3d.render = {}));
})(gd3d || (gd3d = {}));
var gd3d;
(function (gd3d) {
    var math;
    (function (math) {
        //临时写在这里
        function floatClamp(v, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            if (v < min)
                return min;
            else if (v > max)
                return max;
            else
                return v;
        }
        math.floatClamp = floatClamp;
        function sign(value) {
            value = +value; // convert to a number
            if (value === 0 || isNaN(value))
                return value;
            return value > 0 ? 1 : -1;
        }
        math.sign = sign;
        function getKeyCodeByAscii(ev) {
            if (ev.shiftKey) {
                return ev.keyCode - 32;
            }
            else {
                return ev.keyCode;
            }
        }
        math.getKeyCodeByAscii = getKeyCodeByAscii;
        function numberLerp(fromV, toV, v) {
            return fromV * (1 - v) + toV * v;
        }
        math.numberLerp = numberLerp;
        function x_AXIS() {
            return commonStatic.x_axis;
        }
        math.x_AXIS = x_AXIS;
        function y_AXIS() {
            return commonStatic.y_axis;
        }
        math.y_AXIS = y_AXIS;
        function z_AXIS() {
            return commonStatic.z_axis;
        }
        math.z_AXIS = z_AXIS;
        var commonStatic = /** @class */ (function () {
            function commonStatic() {
            }
            commonStatic.x_axis = new gd3d.math.vector3(1, 0, 0);
            commonStatic.y_axis = new gd3d.math.vector3(0, 1, 0);
            commonStatic.z_axis = new gd3d.math.vector3(0, 0, 1);
            return commonStatic;
        }());
        math.commonStatic = commonStatic;
    })(math = gd3d.math || (gd3d.math = {}));
})(gd3d || (gd3d = {}));
var gd3d;
(function (gd3d) {
    var render;
    (function (render) {
        /**
         * @private
         */
        var VertexFormatMask;
        (function (VertexFormatMask) {
            VertexFormatMask[VertexFormatMask["Position"] = 1] = "Position";
            VertexFormatMask[VertexFormatMask["Normal"] = 2] = "Normal";
            VertexFormatMask[VertexFormatMask["Tangent"] = 4] = "Tangent";
            VertexFormatMask[VertexFormatMask["Color"] = 8] = "Color";
            VertexFormatMask[VertexFormatMask["UV0"] = 16] = "UV0";
            VertexFormatMask[VertexFormatMask["UV1"] = 32] = "UV1";
            VertexFormatMask[VertexFormatMask["BlendIndex4"] = 64] = "BlendIndex4";
            VertexFormatMask[VertexFormatMask["BlendWeight4"] = 128] = "BlendWeight4";
            VertexFormatMask[VertexFormatMask["ColorEX"] = 256] = "ColorEX";
        })(VertexFormatMask = render.VertexFormatMask || (render.VertexFormatMask = {}));
        /**
         * @private
         */
        var number4 = /** @class */ (function () {
            function number4() {
            }
            return number4;
        }());
        render.number4 = number4;
        /**
         * @private
         */
        var MeshTypeEnum;
        (function (MeshTypeEnum) {
            MeshTypeEnum[MeshTypeEnum["Static"] = 0] = "Static";
            MeshTypeEnum[MeshTypeEnum["Dynamic"] = 1] = "Dynamic";
            MeshTypeEnum[MeshTypeEnum["Stream"] = 2] = "Stream";
        })(MeshTypeEnum = render.MeshTypeEnum || (render.MeshTypeEnum = {}));
    })(render = gd3d.render || (gd3d.render = {}));
})(gd3d || (gd3d = {}));
//0.04
//处理utf8 string 还是不能用encode decode，有些特殊情况没覆盖
var gd3d;
//0.04
//处理utf8 string 还是不能用encode decode，有些特殊情况没覆盖
(function (gd3d) {
    var io;
    (function (io) {
        /**
         * @private
         */
        var binReader = /** @class */ (function () {
            function binReader(buf, seek) {
                if (seek === void 0) { seek = 0; }
                this._seek = seek;
                this._data = new DataView(buf, seek);
            }
            binReader.prototype.seek = function (seek) {
                this._seek = seek;
            };
            binReader.prototype.peek = function () {
                return this._seek;
            };
            binReader.prototype.length = function () {
                return this._data.byteLength;
            };
            binReader.prototype.canread = function () {
                //LogManager.Warn(this._buf.byteLength + "  &&&&&&&&&&&   " + this._seek + "    " + this._buf.buffer.byteLength);
                return this._data.byteLength - this._seek;
            };
            binReader.prototype.readStringAnsi = function () {
                var slen = this._data.getUint8(this._seek);
                this._seek++;
                var bs = "";
                for (var i = 0; i < slen; i++) {
                    bs += String.fromCharCode(this._data.getUint8(this._seek));
                    this._seek++;
                }
                return bs;
            };
            binReader.utf8ArrayToString = function (array) {
                var ret = [];
                for (var i = 0; i < array.length; i++) {
                    var cc = array[i];
                    if (cc == 0)
                        break;
                    var ct = 0;
                    if (cc > 0xE0) {
                        ct = (cc & 0x0F) << 12;
                        cc = array[++i];
                        ct |= (cc & 0x3F) << 6;
                        cc = array[++i];
                        ct |= cc & 0x3F;
                        ret.push(String.fromCharCode(ct));
                    }
                    else if (cc > 0xC0) {
                        ct = (cc & 0x1F) << 6;
                        cc = array[++i];
                        ct |= (cc & 0x3F) << 6;
                        ret.push(String.fromCharCode(ct));
                    }
                    else if (cc > 0x80) {
                        throw new Error("InvalidCharacterError");
                    }
                    else {
                        ret.push(String.fromCharCode(array[i]));
                    }
                }
                return ret.join('');
                //                var b = array[i];
                //    if (b > 0 && b < 16)
                //    {
                //        uri += '%0' + b.toString(16);
                //    }
                //    else if (b > 16)
                //    {
                //        uri += '%' + b.toString(16);
                //    }
                //}
                //return decodeURIComponent(uri);
            };
            binReader.prototype.readStringUtf8 = function () {
                var length = this._data.getInt8(this._seek);
                this._seek++;
                var arr = new Uint8Array(length);
                this.readUint8Array(arr);
                return binReader.utf8ArrayToString(arr);
            };
            binReader.prototype.readStringUtf8FixLength = function (length) {
                var arr = new Uint8Array(length);
                this.readUint8Array(arr);
                return binReader.utf8ArrayToString(arr);
            };
            binReader.prototype.readSingle = function () {
                var num = this._data.getFloat32(this._seek, true);
                this._seek += 4;
                return num;
            };
            binReader.prototype.readDouble = function () {
                var num = this._data.getFloat64(this._seek, true);
                this._seek += 8;
                return num;
            };
            binReader.prototype.readInt8 = function () {
                var num = this._data.getInt8(this._seek);
                this._seek += 1;
                return num;
            };
            binReader.prototype.readUInt8 = function () {
                //LogManager.Warn(this._data.byteLength + "  @@@@@@@@@@@@@@@@@  " + this._seek);
                var num = this._data.getUint8(this._seek);
                this._seek += 1;
                return num;
            };
            binReader.prototype.readInt16 = function () {
                //LogManager.Log(this._seek + "   " + this.length());
                var num = this._data.getInt16(this._seek, true);
                this._seek += 2;
                return num;
            };
            binReader.prototype.readUInt16 = function () {
                var num = this._data.getUint16(this._seek, true);
                this._seek += 2;
                //LogManager.Warn("readUInt16 " + this._seek);
                return num;
            };
            binReader.prototype.readInt32 = function () {
                var num = this._data.getInt32(this._seek, true);
                this._seek += 4;
                return num;
            };
            binReader.prototype.readUInt32 = function () {
                var num = this._data.getUint32(this._seek, true);
                this._seek += 4;
                return num;
            };
            binReader.prototype.readUint8Array = function (target, offset, length) {
                if (target === void 0) { target = null; }
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = -1; }
                if (length < 0)
                    length = target.length;
                for (var i = 0; i < length; i++) {
                    target[i] = this._data.getUint8(this._seek);
                    this._seek++;
                }
                return target;
            };
            binReader.prototype.readUint8ArrayByOffset = function (target, offset, length) {
                if (length === void 0) { length = 0; }
                if (length < 0)
                    length = target.length;
                for (var i = 0; i < length; i++) {
                    target[i] = this._data.getUint8(offset);
                    offset++;
                }
                return target;
            };
            Object.defineProperty(binReader.prototype, "position", {
                get: function () {
                    return this.peek();
                },
                set: function (value) {
                    this.seek(value);
                },
                enumerable: true,
                configurable: true
            });
            binReader.prototype.readBoolean = function () {
                return this.readUInt8() > 0;
            };
            binReader.prototype.readByte = function () {
                return this.readUInt8();
            };
            binReader.prototype.readBytes = function (target, offset, length) {
                if (target === void 0) { target = null; }
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = -1; }
                return this.readUint8Array(target, offset, length);
            };
            binReader.prototype.readUnsignedShort = function () {
                return this.readUInt16();
            };
            binReader.prototype.readUnsignedInt = function () {
                return this.readUInt32();
            };
            binReader.prototype.readFloat = function () {
                return this.readSingle();
            };
            binReader.prototype.readUTFBytes = function (length) {
                var arry = new Uint8Array(length);
                return binReader.utf8ArrayToString(this.readUint8Array(arry));
            };
            /// <summary>
            /// 有符号 Byte
            /// </summary>
            binReader.prototype.readSymbolByte = function () {
                return this.readInt8();
            };
            binReader.prototype.readShort = function () {
                return this.readInt16();
            };
            binReader.prototype.readInt = function () {
                return this.readInt32();
            };
            return binReader;
        }());
        io.binReader = binReader;
        var binWriter = /** @class */ (function () {
            function binWriter() {
                //if (buf == null)
                {
                    var buf = new ArrayBuffer(1024);
                    this._length = 0;
                }
                this._buf = new Uint8Array(buf);
                this._data = new DataView(this._buf.buffer);
                this._seek = 0;
            }
            binWriter.prototype.sureData = function (addlen) {
                var nextlen = this._buf.byteLength;
                while (nextlen < (this._length + addlen)) {
                    nextlen += 1024;
                }
                if (nextlen != this._buf.byteLength) {
                    var newbuf = new Uint8Array(nextlen);
                    for (var i = 0; i < this._length; i++) {
                        newbuf[i] = this._buf[i];
                    }
                    this._buf = newbuf;
                    this._data = new DataView(this._buf.buffer);
                }
                this._length += addlen;
            };
            binWriter.prototype.getLength = function () {
                return length;
            };
            binWriter.prototype.getBuffer = function () {
                return this._buf.buffer.slice(0, this._length);
            };
            binWriter.prototype.seek = function (seek) {
                this._seek = seek;
            };
            binWriter.prototype.peek = function () {
                return this._seek;
            };
            binWriter.prototype.writeInt8 = function (num) {
                this.sureData(1);
                this._data.setInt8(this._seek, num);
                this._seek++;
            };
            binWriter.prototype.writeUInt8 = function (num) {
                this.sureData(1);
                this._data.setUint8(this._seek, num);
                this._seek++;
            };
            binWriter.prototype.writeInt16 = function (num) {
                this.sureData(2);
                this._data.setInt16(this._seek, num, true);
                this._seek += 2;
            };
            binWriter.prototype.writeUInt16 = function (num) {
                this.sureData(2);
                this._data.setUint16(this._seek, num, true);
                this._seek += 2;
            };
            binWriter.prototype.writeInt32 = function (num) {
                this.sureData(4);
                this._data.setInt32(this._seek, num, true);
                this._seek += 4;
            };
            binWriter.prototype.writeUInt32 = function (num) {
                this.sureData(4);
                this._data.setUint32(this._seek, num, true);
                this._seek += 4;
            };
            binWriter.prototype.writeSingle = function (num) {
                this.sureData(4);
                this._data.setFloat32(this._seek, num, true);
                this._seek += 4;
            };
            binWriter.prototype.writeDouble = function (num) {
                this.sureData(8);
                this._data.setFloat64(this._seek, num, true);
                this._seek += 8;
            };
            binWriter.prototype.writeStringAnsi = function (str) {
                var slen = str.length;
                this.sureData(slen + 1);
                this._data.setUint8(this._seek, slen);
                this._seek++;
                for (var i = 0; i < slen; i++) {
                    this._data.setUint8(this._seek, str.charCodeAt(i));
                    this._seek++;
                }
            };
            binWriter.prototype.writeStringUtf8 = function (str) {
                var bstr = binWriter.stringToUtf8Array(str);
                this.writeUInt8(bstr.length);
                this.writeUint8Array(bstr);
            };
            binWriter.stringToUtf8Array = function (str) {
                var bstr = [];
                for (var i = 0; i < str.length; i++) {
                    var c = str.charAt(i);
                    var cc = c.charCodeAt(0);
                    if (cc > 0xFFFF) {
                        throw new Error("InvalidCharacterError");
                    }
                    if (cc > 0x80) {
                        if (cc < 0x07FF) {
                            var c1 = (cc >>> 6) | 0xC0;
                            var c2 = (cc & 0x3F) | 0x80;
                            bstr.push(c1, c2);
                        }
                        else {
                            var c1 = (cc >>> 12) | 0xE0;
                            var c2 = ((cc >>> 6) & 0x3F) | 0x80;
                            var c3 = (cc & 0x3F) | 0x80;
                            bstr.push(c1, c2, c3);
                        }
                    }
                    else {
                        bstr.push(cc);
                    }
                }
                return bstr;
            };
            binWriter.prototype.writeStringUtf8DataOnly = function (str) {
                var bstr = binWriter.stringToUtf8Array(str);
                this.writeUint8Array(bstr);
            };
            binWriter.prototype.writeUint8Array = function (array, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = -1; }
                if (length < 0)
                    length = array.length;
                this.sureData(length);
                for (var i = offset; i < offset + length; i++) {
                    this._data.setUint8(this._seek, array[i]);
                    this._seek++;
                }
            };
            Object.defineProperty(binWriter.prototype, "length", {
                get: function () {
                    return this._seek;
                },
                enumerable: true,
                configurable: true
            });
            binWriter.prototype.writeByte = function (num) {
                this.writeUInt8(num);
            };
            binWriter.prototype.writeBytes = function (array, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                this.writeUint8Array(array, offset, length);
            };
            binWriter.prototype.writeUnsignedShort = function (num) {
                this.writeUInt16(num);
            };
            binWriter.prototype.writeUnsignedInt = function (num) {
                this.writeUInt32(num);
            };
            binWriter.prototype.writeFloat = function (num) {
                this.writeSingle(num);
            };
            binWriter.prototype.writeUTFBytes = function (str) {
                var strArray = binWriter.stringToUtf8Array(str);
                this.writeUint8Array(strArray);
            };
            /// <summary>
            /// 写入有符号 Byte
            /// </summary>
            binWriter.prototype.writeSymbolByte = function (num) {
                this.writeInt8(num);
            };
            binWriter.prototype.writeShort = function (num) {
                this.writeInt16(num);
            };
            binWriter.prototype.writeInt = function (num) {
                this.writeInt32(num);
            };
            return binWriter;
        }());
        io.binWriter = binWriter;
    })(io = gd3d.io || (gd3d.io = {}));
})(gd3d || (gd3d = {}));
var gd3d;
(function (gd3d) {
    var threading;
    (function (threading) {
        var animiclipHandle = /** @class */ (function () {
            function animiclipHandle() {
            }
            animiclipHandle.prototype.handle = function (buf) {
                var read = new gd3d.io.binReader(buf);
                var result = {
                    fps: undefined,
                    loop: undefined,
                    boneCount: undefined,
                    bones: undefined,
                    indexDic: undefined,
                    subclipCount: undefined,
                    subclips: undefined,
                    frameCount: undefined,
                    frames: undefined
                };
                //let _name = 
                read.readStringAnsi(); //空读字符串
                result.fps = read.readFloat();
                result.loop = read.readBoolean();
                result.boneCount = read.readInt();
                result.bones = [];
                result.indexDic = {};
                for (var i = 0; i < result.boneCount; ++i) {
                    var bonename = read.readStringAnsi();
                    result.bones.push(bonename);
                    result.indexDic[bonename] = i;
                }
                result.subclipCount = read.readInt();
                result.subclips = [];
                for (var i = 0; i < result.subclipCount; ++i) {
                    var _subClip = { name: undefined, loop: undefined };
                    _subClip.name = read.readStringAnsi();
                    _subClip.loop = read.readBoolean();
                    result.subclips.push(_subClip);
                }
                result.frameCount = read.readInt();
                result.frames = {};
                for (var i = 0; i < result.frameCount; ++i) {
                    var _fid = read.readInt().toString();
                    var _key = read.readBoolean();
                    var _frame = Array(result.boneCount * 7 + 1); //new Float32Array(result.boneCount * 7 + 1);
                    _frame[0] = _key ? 1 : 0;
                    var _boneInfo = { r: undefined, t: undefined }; //new PoseBoneMatrix();
                    for (var i_1 = 0; i_1 < result.boneCount; i_1++) {
                        // _boneInfo.load(read);
                        {
                            var x = read.readSingle();
                            var y = read.readSingle();
                            var z = read.readSingle();
                            var w = read.readSingle();
                            _boneInfo.r = new gd3d.math.quaternion(x, y, z, w);
                        }
                        {
                            var x = read.readSingle();
                            var y = read.readSingle();
                            var z = read.readSingle();
                            _boneInfo.t = new gd3d.math.vector3(x, y, z);
                        }
                        _frame[i_1 * 7 + 1] = _boneInfo.r.x;
                        _frame[i_1 * 7 + 2] = _boneInfo.r.y;
                        _frame[i_1 * 7 + 3] = _boneInfo.r.z;
                        _frame[i_1 * 7 + 4] = _boneInfo.r.w;
                        _frame[i_1 * 7 + 5] = _boneInfo.t.x;
                        _frame[i_1 * 7 + 6] = _boneInfo.t.y;
                        _frame[i_1 * 7 + 7] = _boneInfo.t.z;
                    }
                    result.frames[_fid] = _frame;
                }
                return result;
            };
            animiclipHandle = __decorate([
                threading.threadHandle()
            ], animiclipHandle);
            return animiclipHandle;
        }());
        threading.animiclipHandle = animiclipHandle;
    })(threading = gd3d.threading || (gd3d.threading = {}));
})(gd3d || (gd3d = {}));
var gd3d;
(function (gd3d) {
    var threading;
    (function (threading) {
        /**
          * @private
          */
        var subMeshInfo = /** @class */ (function () {
            function subMeshInfo() {
                this.useVertexIndex = 0; //-1 表示不用indexbuffer,>=0 表示第几个，
                //通常都是用第一个indexbuffer，只有用wireframe显示模式，使用第二个部分
                this.line = false;
            }
            return subMeshInfo;
        }());
        threading.subMeshInfo = subMeshInfo;
        var meshDataHandle = /** @class */ (function () {
            function meshDataHandle() {
            }
            meshDataHandle.prototype.handle = function (buf) {
                var data = {};
                //console.log("hello world");
                var objVF = { vf: 0 }; //顶点属性
                // var data: gd3d.render.meshData = new gd3d.render.meshData();
                var read = new gd3d.io.binReader(buf);
                //meshdata.name = read.readString();
                //var bound = read.readBound();
                var meshName = read.readStringAnsi();
                //this.setName(read.readStringAnsi());
                read.position = read.position + 24;
                var vcount = read.readUInt32();
                var vec10tpose = [];
                var tag = read.readUInt8();
                while (tag && tag < 18) {
                    //end
                    if (tag == 255) {
                        break;
                    }
                    if (tag == 1) {
                        if (data.pos == undefined) {
                            data.pos = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Position;
                            //data.posview=new Float32Array(buf,read.peek(),vcount*3);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var _position = new gd3d.math.vector3();
                            _position.x = read.readSingle();
                            _position.y = read.readSingle();
                            _position.z = read.readSingle();
                            data.pos.push(_position);
                        }
                    }
                    else if (tag == 2) {
                        if (data.color == undefined) {
                            data.color = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Color;
                            //data.colorview=new Uint8Array(buf,read.peek(),vcount*4);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var _color = new gd3d.math.color();
                            _color.a = gd3d.math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                            _color.r = gd3d.math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                            _color.g = gd3d.math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                            _color.b = gd3d.math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                            data.color.push(_color);
                        }
                    }
                    else if (tag == 3) {
                        if (data.normal == undefined) {
                            data.normal = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Normal;
                            //data.normalview=new Float32Array(buf,read.peek(),vcount*3);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var _normal = new gd3d.math.vector3();
                            _normal.x = read.readSingle();
                            _normal.y = read.readSingle();
                            _normal.z = read.readSingle();
                            data.normal.push(_normal);
                        }
                    }
                    else if (tag == 4) {
                        if (data.uv == undefined) {
                            data.uv = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.UV0;
                            //data.uvview=new Float32Array(buf,read.peek(),vcount*2);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var uv = new gd3d.math.vector2();
                            uv.x = read.readSingle();
                            uv.y = read.readSingle();
                            data.uv.push(uv);
                        }
                    }
                    else if (tag == 5) {
                        if (data.uv2 == undefined) {
                            data.uv2 = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.UV1;
                            //data.uv2view=new Float32Array(buf,read.peek(),vcount*2);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var uv = new gd3d.math.vector2();
                            uv.x = read.readSingle();
                            uv.y = read.readSingle();
                            data.uv2.push(uv);
                        }
                    }
                    else if (tag == 6) {
                        //meshdata.vec2uvs2 = new Float32Array(vcount * 2);
                        for (var i = 0; i < vcount; i++) {
                            //meshdata.vec2uvs2[i * 2 + 0] =
                            read.readSingle(); //u
                            //meshdata.vec2uvs2[i * 2 + 1] =
                            read.readSingle(); //v
                        }
                    }
                    else if (tag == 7) {
                        if (data.tangent == undefined) {
                            data.tangent = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Tangent;
                            //data.tangentview=new Float32Array(buf,read.peek(),vcount*4);
                        }
                        for (var i = 0; i < vcount; i++) {
                            var tangent = new gd3d.math.vector3();
                            var x = read.readSingle();
                            var y = read.readSingle();
                            var z = read.readSingle();
                            var w = read.readSingle();
                            tangent.x = x / w;
                            tangent.y = y / w;
                            tangent.z = z / w;
                            data.tangent.push(tangent);
                        }
                    }
                    else if (tag == 8) {
                        for (var i = 0; i < vcount; i++) {
                            //meshdata.vec2uvs2[i * 2 + 0] =
                            read.readSingle(); //u
                            //meshdata.vec2uvs2[i * 2 + 1] =
                            read.readSingle(); //v
                        }
                    }
                    else if (tag == 16) {
                        var tposelen = read.readUInt8();
                        //meshdata.vec10tpose = new Float32Array(tposelen * 10);
                        for (var i = 0; i < tposelen; i++) {
                            vec10tpose[i * 10 + 0] = read.readSingle(); //posx;
                            vec10tpose[i * 10 + 1] = read.readSingle(); //posy;
                            vec10tpose[i * 10 + 2] = read.readSingle(); //posz;
                            vec10tpose[i * 10 + 3] = read.readSingle(); //scalex;
                            vec10tpose[i * 10 + 4] = read.readSingle(); //scaley;
                            vec10tpose[i * 10 + 5] = read.readSingle(); //scalez;
                            vec10tpose[i * 10 + 6] = read.readSingle(); //quatx;
                            vec10tpose[i * 10 + 7] = read.readSingle(); //quaty;
                            vec10tpose[i * 10 + 8] = read.readSingle(); //quatz;
                            vec10tpose[i * 10 + 9] = read.readSingle(); //quatw;
                        }
                    }
                    else if (tag == 17) {
                        if (data.blendIndex == undefined) {
                            data.blendIndex = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.BlendIndex4;
                        }
                        if (data.blendWeight == undefined) {
                            data.blendWeight = [];
                            objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.BlendWeight4;
                        }
                        for (var i = 0; i < vcount; i++) {
                            var _boneIndex = new gd3d.render.number4();
                            _boneIndex.v0 = read.readUInt32();
                            _boneIndex.v1 = read.readUInt32();
                            _boneIndex.v2 = read.readUInt32();
                            _boneIndex.v3 = read.readUInt32();
                            var _boneWeight = new gd3d.render.number4();
                            _boneWeight.v0 = read.readSingle();
                            _boneWeight.v1 = read.readSingle();
                            _boneWeight.v2 = read.readSingle();
                            _boneWeight.v3 = read.readSingle();
                            data.blendIndex.push(_boneIndex);
                            data.blendWeight.push(_boneWeight);
                        }
                    }
                    else {
                        throw "notwrite" + tag;
                    }
                    tag = read.readUInt8();
                }
                var subcount = read.readUInt8();
                data.trisindex = [];
                var submesh = [];
                for (var i = 0; i < subcount; i++) {
                    var _submeshinfo = new subMeshInfo();
                    var tv = read.readUInt32(); //代表之前submesh中的drawstyle
                    var sublen = read.readUInt32();
                    _submeshinfo.start = data.trisindex.length;
                    _submeshinfo.size = sublen;
                    _submeshinfo.matIndex = i;
                    submesh.push(_submeshinfo);
                    for (var j = 0; j < sublen; j++) {
                        var index = read.readUInt32();
                        data.trisindex.push(index);
                    }
                }
                return {
                    meshData: data,
                    subMesh: submesh,
                    objVF: objVF
                };
            };
            meshDataHandle = __decorate([
                threading.threadHandle()
            ], meshDataHandle);
            return meshDataHandle;
        }());
        threading.meshDataHandle = meshDataHandle;
    })(threading = gd3d.threading || (gd3d.threading = {}));
})(gd3d || (gd3d = {}));
//# sourceMappingURL=th.js.map