namespace gd3d.io
{
    export class converter
    {
        static getApplyFun(value: any): any
        {
            return Array.prototype.concat.apply([], value);
        }
        private static dataBuffer: Uint8Array = new Uint8Array(8);
        private static dataView: DataView = new DataView(converter.dataBuffer.buffer);//八字节临时空间
        static ULongToArray(value: number, target: Uint8Array = null, offset: number = 0): Uint8Array | number[]
        {
            //这里注意不能直接用dataView.setFloat64，因为float64是float类型
            var uint1: number = value % 0x100000000;
            var uint2: number = (value / 0x100000000) | 0;
            converter.dataView.setUint32(0, uint1, true);
            converter.dataView.setUint32(4, uint2, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 8));
        }
        static LongToArray(value: number, t: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            let target: any = t;
            //这里注意不能直接用dataView.setFloat64，因为float64是float类型
            var uint1: number = value % 0x100000000;
            var uint2: number = (value / 0x100000000) | 0;
            converter.dataView.setInt32(0, uint1, true);
            converter.dataView.setInt32(4, uint2, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 8));
        }

        static Float64ToArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setFloat64(0, value, false);
            return new Uint8Array(converter.dataBuffer.subarray(0, 8));
        }
        static Float32ToArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setFloat32(0, value, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 4));
        }
        static Int32ToArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setInt32(0, value, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 4));
        }
        static Int16ToArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setInt16(0, value, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 2));
        }
        static Uint32toArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setInt32(0, value, true);

            return new Uint8Array(converter.dataBuffer.subarray(0, 4));
        }
        static Uint16ToArray(value: number, target: Uint8Array | number[] = null, offset: number = 0): Uint8Array | number[]
        {
            converter.dataView.setUint16(0, value, true);
            return new Uint8Array(converter.dataBuffer.subarray(0, 2));
        }
        static StringToUtf8Array(str: string): Uint8Array 
        {
            var bstr: number[] = [];
            for (var i = 0, len = str.length; i < len; ++i)
            {
                var c = str.charAt(i);
                var cc = c.charCodeAt(0);
                if (cc > 0xFFFF)
                {
                    throw new Error("InvalidCharacterError");
                }
                if (cc > 0x80)
                {
                    if (cc < 0x07FF)
                    {
                        var c1 = (cc >>> 6) | 0xC0;
                        var c2 = (cc & 0x3F) | 0x80;
                        bstr.push(c1, c2);
                    }
                    else
                    {
                        var c1 = (cc >>> 12) | 0xE0;
                        var c2 = ((cc >>> 6) & 0x3F) | 0x80;
                        var c3 = (cc & 0x3F) | 0x80;
                        bstr.push(c1, c2, c3);
                    }
                }
                else
                {
                    bstr.push(cc);
                }
            }
            return new Uint8Array(bstr);
        }
        static ArrayToLong(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 4));
            var n1 = converter.dataView.getInt32(0, true);

            converter.dataBuffer.set(buf.subarray(offset + 4, offset + 8));
            var n2 = converter.dataView.getInt32(4, true);
            n1 += n2 * 0x100000000;
            return n1;
        }
        static ArrayToULong(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 4));
            var n1 = converter.dataView.getUint32(0, true);

            converter.dataBuffer.set(buf.subarray(offset + 4, offset + 8));
            var n2 = converter.dataView.getUint32(4, true);
            n1 += n2 * 0x100000000;
            return n1;
        }

        static ArrayToFloat64(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 8))
            return converter.dataView.getFloat64(0, true);
        }
        static ArrayToFloat32(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 4))
            return converter.dataView.getFloat32(0, true);
        }
        static ArrayToInt32(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 4))
            return converter.dataView.getInt32(0, true);
        }
        static ArrayToUint32(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 4));
            return converter.dataView.getUint32(0, true);
        }
        static ArrayToInt16(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 2))
            return converter.dataView.getInt16(0, true);
        }
        static ArrayToUint16(buf: Uint8Array, offset: number = 0): number
        {
            converter.dataBuffer.set(buf.subarray(offset, offset + 2));
            return converter.dataView.getUint16(0, true);
        }
        static ArrayToInt8(buf: Uint8Array, offset: number = 0): number
        {
            return buf[offset];
        }



        static ArrayToString(buf: Uint8Array, offset: number = 0): string
        {
            var ret: string[] = [];
            for (var i = 0; i < buf.length; i++)
            {
                var cc = buf[i];
                if (cc == 0)
                    break;
                var ct = 0;
                if (cc > 0xE0)
                {
                    ct = (cc & 0x0F) << 12;
                    cc = buf[++i];
                    ct |= (cc & 0x3F) << 6;
                    cc = buf[++i];
                    ct |= cc & 0x3F;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0xC0)
                {
                    ct = (cc & 0x1F) << 6;
                    cc = buf[++i];
                    ct |= (cc & 0x3F) << 6;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0x80)
                {
                    console.warn("InvalidCharacterError");
                    return "";
                }
                else
                {
                    ret.push(String.fromCharCode(buf[i]));
                }
            }
            return ret.join('');
        }
    }

    export class binTool
    {
        // private buffer: Array<number>;
        private buffer: Uint8Array;
        public r_offset: number = 0;
        public w_offset: number = 0;
        constructor(size: number = undefined)
        {
            //this.buffer = new Array(size);
            // if (size)
            //     this.buffer = new Array(size);
            // else

            this.buffer = memoryPool.Insance.newUint8Array();//new Uint8Array(1024);
        }

        private ckl()
        {
            if (this.r_offset > this.w_offset)
                throw Error("[binTool] 内存读取失败 请检查当前输入的内存");
        }
        readSingle(): number
        {
            this.ckl();
            let ret = converter.ArrayToFloat32(this.buffer, this.r_offset);
            this.r_offset += 4;
            return ret;
        }
        readLong(): number
        {
            this.ckl();
            let ret = converter.ArrayToLong(this.buffer, this.r_offset);
            this.r_offset += 8;
            return ret;
        }
        readULong(): number
        {
            this.ckl();
            let ret = converter.ArrayToULong(this.buffer, this.r_offset);
            this.r_offset += 8;
            return ret;
        }
        readDouble(): number
        {
            this.ckl();
            let ret = converter.ArrayToFloat64(this.buffer, this.r_offset);
            this.r_offset += 8;
            return ret;
        }
        readInt8(): number
        {
            this.ckl();
            let ret = this.buffer[this.r_offset];
            this.r_offset += 1;
            return ret;
        }
        readUInt8(): number
        {
            this.ckl();
            let ret = this.buffer[this.r_offset];
            this.r_offset += 1;
            return ret;
        }
        readInt16(): number
        {
            this.ckl();
            let ret = converter.ArrayToInt16(this.buffer, this.r_offset);
            this.r_offset += 2;
            return ret;
        }
        readUInt16(): number
        {
            this.ckl();
            let ret = converter.ArrayToUint16(this.buffer, this.r_offset);
            this.r_offset += 2;
            return ret;
        }
        readInt32(): number
        {
            this.ckl();
            let ret = converter.ArrayToInt32(this.buffer, this.r_offset);
            this.r_offset += 4;
            return ret;
        }
        readUInt32(): number
        {
            this.ckl();
            let ret = converter.ArrayToUint32(this.buffer, this.r_offset);
            this.r_offset += 4;
            return ret;
        }
        readBoolean(): boolean
        {
            this.ckl();
            let ret = this.buffer[this.r_offset] != 0;
            this.r_offset += 1;
            return ret;
        }
        readByte(): number
        {
            return this.readUInt8();
        }
        readUnsignedShort(): number
        {
            return this.readUInt16();
        }
        readUnsignedInt(): number
        {
            this.ckl();
            let ret = converter.ArrayToUint32(this.buffer, this.r_offset);
            this.r_offset += 4;
            return ret;
        }
        readFloat(): number
        {
            return this.readSingle();
        }
        /// <summary>
        /// 有符号 Byte
        /// </summary>
        readSymbolByte(): number
        {
            return this.readInt8();
        }
        readShort(): number
        {
            return this.readInt16();
        }
        readInt(): number
        {
            return this.readInt32();
        }
        readBytes(length: number): Uint8Array
        {
            this.ckl();
            let array = this.buffer.subarray(this.r_offset, this.r_offset + length);
            this.r_offset += length;
            return array;
        }
        readStringUtf8(): string
        {
            this.ckl();
            let length = this.readInt8();
            let array = this.buffer.subarray(this.r_offset, this.r_offset + length);
            this.r_offset += length;
            return converter.ArrayToString(array);
        }
        readUTFBytes(/*length: number*/): string
        {
            this.ckl();
            let length = this.readUInt16();
            return this.readUTFByLen(length);
            // this.r_offset += length;
            // return converter.ArrayToString(array);
        }

        readUTFByLen(length: number): string
        {
            this.ckl();
            let array = this.buffer.subarray(this.r_offset, this.r_offset + length);
            this.r_offset += length;
            return converter.ArrayToString(array);
        }
        readStringUtf8FixLength(length: number): string
        {
            this.ckl();
            let array = this.buffer.subarray(this.r_offset, this.r_offset + length);
            this.r_offset += length;
            return converter.ArrayToString(array);
        }
        readStringAnsi(): string
        {
            this.ckl();
            let slen = this.readUInt8();
            var bs: string = "";
            for (var i = 0; i < slen; i++)
            {
                bs += String.fromCharCode(this.readByte());
            }
            return bs;
        }

        getLength(): number
        {
            return this.w_offset;
        }
        getBytesAvailable(): number
        {
            return this.w_offset;
        }
        get length(): number
        {
            return this.w_offset;
        }

        writeInt8(num: number): void
        {
            //this.write(converter.Int8ToArray(num));
            this.write(num);
        }
        writeUInt8(num: number): void
        {
            // this.write(converter.Uint8ToArray(num));
            this.write(num);
        }
        writeInt16(num: number): void
        {
            this.write(converter.Int16ToArray(num));
        }
        writeUInt16(num: number): void
        {
            this.write(converter.Uint16ToArray(num));
        }
        writeInt32(num: number): void
        {
            this.write(converter.Int32ToArray(num));
        }
        writeUInt32(num: number): void
        {
            this.write(converter.Uint32toArray(num));
        }
        writeSingle(num: number): void
        {
            this.write(converter.Float32ToArray(num));
        }

        writeLong(num: number): void
        {
            this.write(converter.LongToArray(num));
        }
        writeULong(num: number): void
        {
            this.write(converter.ULongToArray(num));
        }
        writeDouble(num: number): void
        {
            this.write(converter.Float64ToArray(num));
        }
        writeStringAnsi(str: string): void
        {
            var slen = str.length;
            this.writeUInt8(slen);
            for (var i = 0; i < slen; i++)
                this.writeUInt8(str.charCodeAt(i));
        }
        writeStringUtf8(str: string)
        {
            var bstr = converter.StringToUtf8Array(str);
            this.writeUInt8(bstr.length);
            this.write(bstr);
        }
        writeStringUtf8DataOnly(str: string)
        {
            var bstr = converter.StringToUtf8Array(str);
            this.write(bstr);
        }
        writeByte(num: number): void
        {
            this.write(num);
        }

        writeBytes(array: Uint8Array | number[] | number, offset: number = 0, length: number = -1)
        {
            this.write(array, offset, length);
        }

        writeUint8Array(array: Uint8Array | number[] | number, offset: number = 0, length: number = -1)
        {
            this.write(array, offset, length);
        }

        writeUnsignedShort(num: number): void
        {
            this.write(converter.Uint16ToArray(num));
        }

        writeUnsignedInt(num: number): void
        {
            this.write(converter.Uint32toArray(num));
        }

        writeFloat(num: number): void
        {
            this.write(converter.Float32ToArray(num));
        }

        writeUTFBytes(str: string): void
        {
            this.write(converter.StringToUtf8Array(str));
        }

        writeSymbolByte(num: number): void
        {
            this.write(num);
        }

        writeShort(num: number): void
        {
            this.write(converter.Int16ToArray(num));
        }

        writeInt(num: number): void
        {
            this.write(converter.Int32ToArray(num));
        }

        write(array: Uint8Array | number[] | number | any, offset: number = 0, length: number = -1)
        {

            let arrLenName = "";
            if(array["byteLength"] != undefined){
                arrLenName = "byteLength";
            }else if(array["length"] != undefined){
                arrLenName = "length";
            }

            //数组
            if(arrLenName!= ""){
                let needSize = array[arrLenName] + this.w_offset;
                if (this.buffer.byteLength > needSize)
                    this.buffer.set(array, this.w_offset);
                else {
                    let tnum = this.buffer.byteLength;
                    while(tnum < needSize){
                        tnum *= 2;
                    }

                    var buf = new Uint8Array(tnum);
                    buf.set(this.buffer);
                    buf.set(array, this.w_offset);
                    this.buffer = buf;
                }
                this.w_offset += array.byteLength;
            }else{
                this.buffer[this.w_offset] = array;
                this.w_offset += 1;
            }
        }

        dispose()
        {
            if (this.buffer.byteLength == 1024)
                memoryPool.Insance.deleteUint8Array(this.buffer);
            this.buffer = null;
        }

        public getBuffer(): Uint8Array
        {
            // let retBuff = new Uint8Array(this.w_offset);
            // memoryCopy(this.buffer, retBuff, 0);
            // return retBuff;
            return new Uint8Array(this.buffer.subarray(0, this.w_offset));
        }
        public getUint8Array(): Uint8Array
        {
            return new Uint8Array(this.buffer.subarray(0, this.w_offset));
        }
    }


    class memoryPool
    {
        private static instnace: memoryPool
        public static get Insance()
        {
            if (!this.instnace)
                this.instnace = new memoryPool();
            return memoryPool.instnace;
        };
        private pool: Array<Uint8Array> = new Array();
        constructor()
        {
            // for (let i = 0; i < 30; ++i)
            //     this.pool.push(new Uint8Array(1024));
        }

        public newUint8Array()
        {
            if (this.pool.length > 0)
                return this.pool.shift();
            return new Uint8Array(1024);
        }

        public deleteUint8Array(array: Uint8Array)
        {
            this.pool.push(array);
        }
    }


}