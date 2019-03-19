/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 动画片段资源
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class animationClip implements IAsset
    {
        static readonly ClassName:string="animationClip";
        
        @gd3d.reflect.Field("constText")
        private name: constText;
        private id: resID = new resID();
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 是否为默认资源
         * @version egret-gd3d 1.0
         */
        defaultAsset: boolean = false;
        constructor(assetName: string = null)
        {
            if (!assetName)
            {
                assetName = "animationClip_" + this.getGUID();
            }
            this.name = new constText(assetName);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源名称
         * @version egret-gd3d 1.0
         */
        getName(): string
        {
            return this.name.getText();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源唯一id
         * @version egret-gd3d 1.0
         */
        getGUID(): number
        {
            return this.id.getID();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引用计数加一
         * @version egret-gd3d 1.0
         */
        use()
        {
            sceneMgr.app.getAssetMgr().use(this);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引用计数减一
         * @version egret-gd3d 1.0
         */
        unuse(disposeNow: boolean = false)
        {
            sceneMgr.app.getAssetMgr().unuse(this, disposeNow);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 释放资源
         * @version egret-gd3d 1.0
         */
        dispose()
        {
            this.bones.length = 0;
            this.subclips.length = 0;
            delete this.frames;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 计算资源字节大小
         * @version egret-gd3d 1.0
         */
        caclByteLength(): number
        {
            let total = 0;
            for (let k in this.bones)
            {
                total += math.caclStringByteLength(this.bones[k]);
            }

            for (let k in this.frames)
            {
                total += this.frames[k].byteLength;

                total += math.caclStringByteLength(k);
            }

            total += subClip.caclByteLength() * this.subclips.length;

            return total;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param buf buffer数组
         * @version egret-gd3d 1.0
         */
        Parse(buf: ArrayBuffer): threading.gdPromise<any>
        {
            // return new threading.gdPromise((resolve) =>
            // {
            //     threading.thread.Instance.Call("animiclipHandle", buf, (result) =>
            //     {
            //         // this.fps = math.Int16(result.fps);
            //         // this.loop = Boolean(result.loop);
            //         // this.boneCount = result.boneCount;

            //         // this.bones = result.bones.slice();

            //         // this.subclipCount = math.UInt16(result.subclipCount);
            //         // this.subclips = null;
            //         // this.subclips = result.subclips;
            //         // this.frameCount = math.UInt16(result.frameCount);
            //         // this.frames = {};
            //         // for (let key in result.frames)                     
            //         //     this.frames[key] = new Float32Array(result.frames[key]);                   
            //         for(let key in result)
            //             this[key] = result[key];
            //         resolve();
            //     });
            // });

            return new threading.gdPromise((resolve) =>
            {
                var read: gd3d.io.binReader = new gd3d.io.binReader(buf);

                var _name = read.readStringAnsi();

                this.fps = read.readFloat();
                this.loop = read.readBoolean();

                this.boneCount = read.readInt();
                this.bones = [];
                for (let i = 0; i < this.boneCount; i++)
                {
                    let bonename = read.readStringAnsi();
                    this.bones.push(bonename);
                    this.indexDic[bonename] = i;
                }
                this.indexDic["len"] = this.boneCount;

                this.subclipCount = read.readInt();
                this.subclips = [];
                for (let i = 0; i < this.subclipCount; i++)
                {
                    let _subClip = new subClip();
                    _subClip.name = read.readStringAnsi();
                    _subClip.loop = read.readBoolean();
                    this.subclips.push(_subClip);
                }

                this.frameCount = read.readInt();
                this.frames = {};
                for (let i = 0; i < this.frameCount; i++)
                {
                    let _fid = read.readInt().toString();
                    let _key = read.readBoolean();
                    let _frame = new Float32Array(this.boneCount * 7 + 1);
                    _frame[0] = _key ? 1 : 0;

                    let _boneInfo = new PoseBoneMatrix();
                    for (let i = 0; i < this.boneCount; i++)
                    {
                        _boneInfo.load(read);
                        _frame[i * 7 + 1] = _boneInfo.r.x;
                        _frame[i * 7 + 2] = _boneInfo.r.y;
                        _frame[i * 7 + 3] = _boneInfo.r.z;
                        _frame[i * 7 + 4] = _boneInfo.r.w;
                        _frame[i * 7 + 5] = _boneInfo.t.x;
                        _frame[i * 7 + 6] = _boneInfo.t.y;
                        _frame[i * 7 + 7] = _boneInfo.t.z;
                    }
                    this.frames[_fid] = _frame;
                }
                resolve();
            });
        }

        /**
         * @public
         * @language zh_CN
         * 动画片段的帧率
         * @version egret-gd3d 1.0
         */
        fps: number;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 是否循环
         * @version egret-gd3d 1.0
         */
        loop: boolean;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 播放时长
         * @version egret-gd3d 1.0
         */
        get time()
        {
            if (!this.frameCount || !this.fps) return 0;
            return this.frameCount / this.fps;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 骨骼数量
         * @version egret-gd3d 1.0
         */
        boneCount: number;
        /**
         * @private
         */
        bones: string[];

        indexDic: { [boneName: string]: number }={};
        /**
         * @private
         */
        frameCount: number;
        /**
         * @private
         */
        frames: { [fid: string]: Float32Array } = {};

        /**
         * @private
         */
        subclipCount: number;
        /**
         * @private
         */
        subclips: subClip[];

    }

    /**
     * @private
     */
    @reflect.SerializeType
    export class PoseBoneMatrix
    {
        static readonly ClassName:string="PoseBoneMatrix";

        @reflect.Field("vector3")
        t: math.vector3;
        @reflect.Field("quaternion")
        r: math.quaternion;
        static caclByteLength(): number
        {
            let total = 12 + 16;
            return total;
        }
        Clone(): PoseBoneMatrix
        {
            var p = new PoseBoneMatrix();
            p.t = new math.vector3();
            p.r = new math.quaternion();
            math.vec3Clone(this.t, p.t);
            math.quatClone(this.r, p.r);
            return p;
        }
        load(read: io.binReader)
        {
            {
                var x = read.readSingle();
                var y = read.readSingle();
                var z = read.readSingle();
                var w = read.readSingle();
                this.r = new math.quaternion(x, y, z, w);
            }
            {
                var x = read.readSingle();
                var y = read.readSingle();
                var z = read.readSingle();
                this.t = new math.vector3(x, y, z);
            }
        }
        static createDefault(): PoseBoneMatrix
        {
            var pt = new PoseBoneMatrix();
            pt.r = new math.quaternion(0, 0, 0, 1);
            pt.t = new math.vector3(0, 0, 0);
            return pt;
        }
        copyFrom(src: PoseBoneMatrix)
        {
            this.r.rawData.set(src.r.rawData);
            this.t.rawData.set(src.t.rawData);
        }
        copyFromData(src: Float32Array, seek: number)
        {
            this.r.x = src[seek + 0];
            this.r.y = src[seek + 1];
            this.r.z = src[seek + 2];
            this.r.w = src[seek + 3];
            this.t.x = src[seek + 4];
            this.t.y = src[seek + 5];
            this.t.z = src[seek + 6];
        }
        invert()
        {
            math.quatInverse(this.r, this.r)
            math.quatTransformVector(this.r, this.t, this.t);
            this.t.x *= -1;
            this.t.y *= -1;
            this.t.z *= -1;
        }
        lerpInWorld(_tpose: PoseBoneMatrix, from: PoseBoneMatrix, to: PoseBoneMatrix, v: number)
        {
            ////预乘之后，插值奇慢
            // var tpose = new math.matrix();

            // math.matrixMakeTransformRTS(
            //     new math.vector3(_tpose.t.x, _tpose.t.y, _tpose.t.z),
            //     new math.vector3(1, 1, 1),
            //     new math.quaternion(_tpose.r.x, _tpose.r.y, _tpose.r.z, _tpose.r.w),
            //     tpose);

            var t1 = PoseBoneMatrix.sMultiply(from, _tpose);
            var t2 = PoseBoneMatrix.sMultiply(to, _tpose);
            //球插
            var outLerp = PoseBoneMatrix.sLerp(t1, t2, v);

            //再去掉tpose，为了加速这个过程，考虑要存一份 合并tpose的骨骼数据

            var itpose = _tpose.Clone();
            itpose.invert();

            PoseBoneMatrix.sMultiply(outLerp, itpose, this);
        }
        lerpInWorldWithData(_tpose: PoseBoneMatrix, from: PoseBoneMatrix, todata: Float32Array, toseek: number, v: number)
        {
            ////预乘之后，插值奇慢
            // var tpose = new math.matrix();

            // math.matrixMakeTransformRTS(
            //     new math.vector3(_tpose.t.x, _tpose.t.y, _tpose.t.z),
            //     new math.vector3(1, 1, 1),
            //     new math.quaternion(_tpose.r.x, _tpose.r.y, _tpose.r.z, _tpose.r.w),
            //     tpose);

            var t1 = PoseBoneMatrix.sMultiply(from, _tpose);
            var t2 = PoseBoneMatrix.sMultiplyDataAndMatrix(todata, toseek, _tpose);
            //球插
            var outLerp = PoseBoneMatrix.sLerp(t1, t2, v);

            //再去掉tpose，为了加速这个过程，考虑要存一份 合并tpose的骨骼数据

            var itpose = _tpose.Clone();
            itpose.invert();

            PoseBoneMatrix.sMultiply(outLerp, itpose, this);
        }
        static sMultiply(left: PoseBoneMatrix, right: PoseBoneMatrix, target: PoseBoneMatrix = null): PoseBoneMatrix
        {
            if (target == null)
                target = PoseBoneMatrix.createDefault();
            var dir = math.pool.new_vector3();
            math.vec3Clone(right.t, dir);
            var dirtran = math.pool.new_vector3();
            math.quatTransformVector(left.r, dir, dirtran);

            target.t.x = dirtran.x + left.t.x;
            target.t.y = dirtran.y + left.t.y;
            target.t.z = dirtran.z + left.t.z;
            math.quatMultiply(left.r, right.r, target.r);

            math.pool.delete_vector3(dir);
            math.pool.delete_vector3(dirtran);
            return target;
        }
        static sMultiplytpose(left: PoseBoneMatrix, right: tPoseInfo, target: PoseBoneMatrix = null): PoseBoneMatrix
        {
            if (target == null)
                target = PoseBoneMatrix.createDefault();
            var dir = math.pool.new_vector3();
            math.vec3Clone(right.tposep, dir);
            var dirtran = math.pool.new_vector3();
            math.quatTransformVector(left.r, dir, dirtran);

            target.t.x = dirtran.x + left.t.x;
            target.t.y = dirtran.y + left.t.y;
            target.t.z = dirtran.z + left.t.z;
            math.quatMultiply(left.r, right.tposeq, target.r);

            math.pool.delete_vector3(dir);
            math.pool.delete_vector3(dirtran);
            return target;
        }

        static sMultiplyDataAndMatrix(leftdata: Float32Array, leftseek: number, right: PoseBoneMatrix, target: PoseBoneMatrix = null): PoseBoneMatrix
        {
            if (target == null)
                target = PoseBoneMatrix.createDefault();
            var dir = math.pool.new_vector3();
            math.vec3Clone(right.t, dir);
            var dirtran = math.pool.new_vector3();
            math.quatTransformVectorDataAndQuat(leftdata, leftseek + 0, dir, dirtran);

            target.t.x = dirtran.x + leftdata[leftseek + 4];
            target.t.y = dirtran.y + leftdata[leftseek + 5];
            target.t.z = dirtran.z + leftdata[leftseek + 6];
            math.quatMultiplyDataAndQuat(leftdata, leftseek + 0, right.r, target.r);

            math.pool.delete_vector3(dir);
            math.pool.delete_vector3(dirtran);
            return target;
        }
        static sLerp(left: PoseBoneMatrix, right: PoseBoneMatrix, v: number, target: PoseBoneMatrix = null): PoseBoneMatrix
        {
            if (target == null)
                target = PoseBoneMatrix.createDefault();
            target.t.x = left.t.x * (1 - v) + right.t.x * v;
            target.t.y = left.t.y * (1 - v) + right.t.y * v;
            target.t.z = left.t.z * (1 - v) + right.t.z * v;

            math.quatLerp(left.r, right.r, target.r, v);
            return target;
        }

        private static poolmats:PoseBoneMatrix[]=[];
        static recycle(mat:PoseBoneMatrix)
        {
            this.poolmats.push(mat);
        }
        static create():PoseBoneMatrix
        {
            let item=this.poolmats.pop();
            if(item)
            {
                return item;
            }else
            {
                item=PoseBoneMatrix.createDefault();
                return item;
            }
        }
    }

    /**
     * @private
     */
    export class subClip
    {
        name: string;
        loop: boolean;
        startframe: number;
        endframe: number;
        static caclByteLength(): number
        {
            let total = 0;
            total += math.caclStringByteLength(name);
            total += 1;
            total += 8;
            return total;
        }
    }
}