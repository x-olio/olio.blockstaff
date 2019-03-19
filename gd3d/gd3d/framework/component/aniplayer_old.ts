/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
    // /**
    //  * @public
    //  * @language zh_CN
    //  * @classdesc
    //  * 动画播放器
    //  * @version egret-gd3d 1.0
    //  */
    // @reflect.nodeComponent
    // export class aniplayer implements INodeComponent
    // {
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 挂载的gameobject
    //      * @version egret-gd3d 1.0
    //      */
    //     gameObject: gameObject;

    //     private _clipnameCount = 0;
    //     private _clipnames: { [key: string]: number } = null;
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 返回动画数组（clips）所有动画的名字
    //      * @version egret-gd3d 1.0
    //      */
    //     get clipnames()
    //     {
    //         if (this._clipnames == null || this._clipnameCount != this.clips.length)
    //         {
    //             this._clipnameCount = this.clips.length;
    //             this._clipnames = {};
    //             for (let key in this.clips)
    //             {
    //                 if (this.clips[key])
    //                     this.clipnames[this.clips[key].getName()] = parseInt(key);
    //             }
    //         }
    //         return this._clipnames;
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 动画数组
    //      * @version egret-gd3d 1.0
    //      */
    //     @reflect.Field("animationClip[]")
    //     clips: animationClip[];
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 是否自动播放
    //      * @version egret-gd3d 1.0
    //      */
    //     @reflect.Field("boolean")
    //     public autoplay: boolean = true;
    //     private playIndex: number = 0;
    //     private _playClip: animationClip = null;

    //     /**
    //      * 当前播放 动画片段名
    //      */
    //     get playingClip(){
    //         if(!this._playClip) return "";
    //         return this._playClip.getName();
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 骨骼数组
    //      * @version egret-gd3d 1.0
    //      */
    //     @reflect.Field("tPoseInfo[]")
    //     bones: tPoseInfo[];
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 初始位置
    //      * @version egret-gd3d 1.0
    //      */
    //     @reflect.Field("PoseBoneMatrix[]")
    //     startPos: PoseBoneMatrix[];
    //     /**
    //      * @private
    //      */
    //     tpose: { [key: string]: PoseBoneMatrix } = {};
    //     /**
    //      * @private
    //      */
    //     nowpose: { [key: string]: PoseBoneMatrix } = {};
    //     /**
    //      * @private
    //      */
    //     lerppose: { [key: string]: PoseBoneMatrix } = {};
    //     /**
    //      * @private
    //      */
    //     carelist: { [id: string]: transform } = {};

    //     private _playFrameid: number = 0;
    //     public get PlayFrameID(): number
    //     {
    //         return this._playFrameid;
    //     }
    //     /**
    //     * @private
    //     */
    //     private _playTimer: number = 0;
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 播放速度
    //      * @version egret-gd3d 1.0
    //      */
    //     speed: number = 1.0;
    //     /**
    //     * @private
    //     */
    //     crossdelta: number = 0;
    //     /**
    //     * @private
    //     */
    //     crossspeed: number = 0;

    //     private beRevert: boolean = false;
    //     private playStyle: PlayStyle = PlayStyle.NormalPlay;
    //     private percent: number = 0;
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 是否动画融合
    //      * @version egret-gd3d 1.0
    //      */
    //     public mix: boolean = false;

    //     public isCache: boolean = false;
    //     public static playerCaches: { key: string, data: aniplayer }[] = [];

    //     private _playCount = 0;
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 动画循环播放次数
    //      * @version egret-gd3d 1.0
    //      */
    //     public get playCount() { return this._playCount; }

    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 返回当前播放帧数
    //      * @version egret-gd3d 1.0
    //      */
    //     get cacheKey()
    //     {
    //         if (this._playClip)
    //             return this._playClip.getGUID() + "_" + this._playFrameid;
    //         return this._playFrameid;
    //     }


    //     private init()
    //     {
    //         for (let i = 0; i < this.bones.length; i++)
    //         {
    //             let _info = this.bones[i];
    //             let name = _info.name;
    //             var nb = new PoseBoneMatrix();
    //             nb.r = _info.tposeq;
    //             nb.t = _info.tposep;
    //             nb.invert();

    //             this.tpose[name] = nb;
    //             this.nowpose[name] = this.startPos[i].Clone();
    //         }

    //         let asbones: asbone[] = this.gameObject.getComponentsInChildren("asbone") as asbone[];
    //         for (let key in asbones)
    //         {
    //             this.care(asbones[key].gameObject.transform);
    //         }

    //         if (this.autoplay && this.clips != null && this.clips.length > 0)
    //         {
    //             this.playByIndex(this.playIndex);
    //         }

    //     }

    //     start()
    //     {
    //         if (this.bones != null)
    //         {
    //             this.init();
    //         }
    //     }

    //     onPlay()
    //     {

    //     }

    //     /** 片段有播放 */
    //     private clipHasPlay = false;
    //     update(delta: number)
    //     {
    //         if (this._playClip == null)
    //             return;

    //         this.checkFrameId(delta);
    //         if(!this._playClip) return;
            
    //         this.clipHasPlay = true;

    //         this.mix = false;
    //         if (this.crossdelta > 0)
    //         {
    //             this.crossdelta -= delta / this.speed * this.crossspeed;
    //             this.mix = true;
    //         }

    //         let cached = false;
    //         if (this.isCache && !this.mix && aniplayer.playerCaches[this.cacheKey])
    //         {
    //             cached = true;
    //             if (StringUtil.isNullOrEmptyObject(this.carelist))
    //                 return;
    //         }

    //         for (var i = 0; i < this._playClip.boneCount; i++)
    //         {
    //             var bone = this._playClip.bones[i];

    //             if (cached && !this.carelist[bone])
    //                 continue;
    //             var frame;
    //             if (this._playClip != null && this._playClip.frames != null)
    //             {
    //                 frame = this._playClip.frames[this._playFrameid];
    //             } else
    //             {
    //                 console.warn("is null of animationclip.frames! ");
    //                 return;
    //             }

    //             var nextseek = i * 7 + 1;// this._playClip.frames[this._playFrameid];//.boneInfos[i];
    //             var outb = this.nowpose[bone];
    //             var tpose = this.tpose[bone];
    //             if (outb != undefined || frame == null)
    //             {
    //                 if (this.mix)
    //                 {
    //                     var last = this.lerppose[bone];
    //                     if (last != undefined)
    //                     {
    //                         //把恶心的计算集中提纯到一起去，有空再修改
    //                         //outb.lerpInWorld(tpose, last, next, 1 - this.crossdelta);
    //                         outb.lerpInWorldWithData(tpose, last, frame, nextseek, 1 - this.crossdelta);
    //                     }
    //                     else
    //                     {
    //                         outb.copyFromData(frame, nextseek);
    //                     }
    //                 }
    //                 else
    //                 {
    //                     outb.copyFromData(frame, nextseek);
    //                 }
    //             }

    //             var careobj = this.carelist[bone];
    //             if (careobj != undefined)
    //             {
    //                 //tbone ,一串算出最终坐标
    //                 //把恶心的计算集中提纯到一起去，有空再修改

    //                 let fmat = PoseBoneMatrix.sMultiply(outb, tpose);

    //                 let _matrix: math.matrix = math.pool.new_matrix();
    //                 math.matrixMakeTransformRTS(fmat.t, math.pool.vector3_one, fmat.r, _matrix);

    //                 let _newmatrix: math.matrix = math.pool.new_matrix();
    //                 math.matrixMultiply(this.gameObject.transform.getWorldMatrix(), _matrix, _newmatrix);

    //                 careobj.setWorldMatrix(_newmatrix);
    //                 careobj.updateTran(false);
    //                 math.pool.delete_matrix(_matrix);
    //                 math.pool.delete_matrix(_newmatrix);
    //             }
    //         }

    //         if (!cached)
    //         {
    //             aniplayer.playerCaches[this.cacheKey] = this;
    //         }
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param animIndex 动画片段索引
    //      * @param speed 播放速度
    //      * @param beRevert 是否倒播
    //      * @classdesc
    //      * 根据动画片段索引播放普通动画
    //      * @version egret-gd3d 1.0
    //      */
    //     playByIndex(animIndex: number, speed: number = 1.0, beRevert: boolean = false)
    //     {
    //         this.playIndex = animIndex;
    //         if (this.clips.length <= animIndex)
    //         {
    //             console.error("animIndex out Array of clips");
    //             return;
    //         }
    //         this.playAniamtion(animIndex.toString(), speed, beRevert);
    //         this.crossdelta = 0;
    //     }

    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param animIndex 动画片段索引
    //      * @param crosstimer 融合时间
    //      * @param speed 播放速度
    //      * @param beRevert 是否倒播
    //      * @classdesc
    //      * 根据动画片段索引播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     playCrossByIndex(animIndex: number, crosstimer: number, speed: number = 1.0, beRevert: boolean = false)
    //     {
    //         this.playIndex = animIndex;
    //         if (this.clips.length <= animIndex)
    //         {
    //             console.error("animIndex out Array of clips");
    //             return;
    //         }
    //         this.playAniamtion(animIndex.toString(), speed, beRevert);
    //         this.crossspeed = 1.0 / crosstimer;
    //         this.crossdelta = 1;
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param animName 动画片段名字
    //      * @param speed 播放速度
    //      * @param beRevert 是否倒播
    //      * @classdesc
    //      * 根据动画片段名字播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     play(animName: string, speed: number = 1.0, beRevert: boolean = false)
    //     {
    //         // if (animName.indexOf(this.getPlayName()) >= 0 && !this.isStop()){
    //         //     return;
    //         // }
    //         if (this.clipnames[animName] == null)
    //         {
    //             console.error("animclip " + this.gameObject.transform.name + "  " + animName + " is not exist");
    //             return;
    //         }
    //         this.playByIndex(this.clipnames[animName], speed, beRevert);
    //     }

    //     getPlayName()
    //     {
    //         if (this.isPlay())
    //             return this._playClip.getName();
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param animName 动画片段名字
    //      * @param crosstimer 融合时间
    //      * @param speed 播放速度
    //      * @param beRevert 是否倒播
    //      * @classdesc
    //      * 根据动画片段名字播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     playCross(animName: string, crosstimer: number, speed: number = 1.0, beRevert: boolean = false)
    //     {
    //         // if (animName.indexOf(this.getPlayName()) >= 0 && !this.isStop()){
    //         //     return;
    //         // }
    //         if (this.clipnames[animName] == null)
    //         {
    //             console.error("animclip " + this.gameObject.transform.name + "  " + animName + " is not exist");
    //             return;
    //         }
    //         if (crosstimer <= 0)
    //         {
    //             this.playByIndex(this.clipnames[animName], speed, beRevert);
    //         }
    //         else
    //         {
    //             this.playCrossByIndex(this.clipnames[animName], crosstimer, speed, beRevert);
    //         }
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param animName 动画片段名字
    //      * @param speed 播放速度
    //      * @param beRevert 是否倒播
    //      * @classdesc
    //      * 根据动画片段索引播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     private playAniamtion(index: string, speed: number = 1.0, beRevert: boolean = false)
    //     {
    //         if (this.clips[index] == undefined) return;
            
    //         let isp = this.isPlay();
    //         let cname = isp ? this._playClip.getName(): "";
    //         this._playClip = null;
    //         if(this.onPlayEnd && isp){
    //             this.clipHasPlay = false;
    //             this.onPlayEnd(cname);
    //         }

    //         this._playClip = this.clips[index];
    //         this._playTimer = 0;
    //         this._playFrameid = 0;
    //         this._playCount;
    //         this.speed = speed;

    //         this.beRevert = beRevert;
    //         this.playStyle = PlayStyle.NormalPlay;

    //         this.speed = speed;
    //         this.lerppose = {};
    //         for (var key in this.nowpose)
    //         {
    //             var src = this.nowpose[key];
    //             this.lerppose[key] = src.Clone();
    //         }

    //         this.clipHasPlay = false; //reset
    //     }

    //     public updateAnimation(animIndex: number, _frame: number)
    //     {
    //         if (!this.clips)
    //             return;

    //         if (animIndex >= this.clips.length)
    //             return;

    //         let _clip = this.clips[animIndex];
    //         if (!_clip)
    //             return;

    //         for (var i = 0; i < _clip.boneCount; i++)
    //         {
    //             var bone = _clip.bones[i];
    //             var frame = _clip.frames[_frame];
    //             var nextseek = i * 7 + 1;
    //             var outb = this.nowpose[bone];
    //             var tpose = this.tpose[bone];
    //             if (outb != undefined)
    //             {
    //                 outb.copyFromData(frame, nextseek);
    //             }

    //             var careobj = this.carelist[bone];
    //             if (careobj != undefined)
    //             {
    //                 //tbone ,一串算出最终坐标
    //                 //把恶心的计算集中提纯到一起去，有空再修改

    //                 let fmat = PoseBoneMatrix.sMultiply(outb, tpose);

    //                 let _matrix: math.matrix = math.pool.new_matrix();
    //                 math.matrixMakeTransformRTS(fmat.t, math.pool.vector3_one, fmat.r, _matrix);

    //                 let _newmatrix: math.matrix = math.pool.new_matrix();
    //                 math.matrixMultiply(this.gameObject.transform.getWorldMatrix(), _matrix, _newmatrix);

    //                 careobj.setWorldMatrix(_newmatrix);
    //                 careobj.updateTran(false);
    //                 math.pool.delete_matrix(_matrix);
    //                 math.pool.delete_matrix(_newmatrix);
    //             }
    //         }

    //         let renders = this.gameObject.getComponentsInChildren(StringUtil.COMPONENT_SKINMESHRENDER) as gd3d.framework.skinnedMeshRenderer[];
    //         for (let key in renders)
    //         {
    //             let _render = renders[key];
    //             _render.update(0);
    //         }
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 停止播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     stop(): void
    //     {
    //         let isp = this.isPlay();
    //         let cname = isp ? this._playClip.getName(): "";
    //         this._playClip = null;
    //         if(this.onPlayEnd && isp)
    //             this.onPlayEnd(cname);
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 是否在播放动画
    //      * @version egret-gd3d 1.0
    //      */
    //     isPlay(): boolean
    //     {
    //         return this._playClip && this.clipHasPlay;
    //     }
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @classdesc
    //      * 是否在停止动画
    //      * @version egret-gd3d 1.0
    //      */
    //     isStop(): boolean
    //     {
    //         if (this._playClip == null) return true;
    //         if (this.playStyle != PlayStyle.NormalPlay) return false;
    //         if (this._playClip.loop) return false;
    //         if (this._playFrameid == this._playClip.frameCount - 1)
    //             return true;
    //         return false;
    //     }
    //     /**
    //      * @private
    //      */
    //     remove()
    //     {
    //         if (this.clips)
    //             this.clips.forEach(temp =>
    //             {
    //                 if (temp) temp.unuse();
    //             });

    //         this.clips.length = 0;
    //         this.bones.length = 0;
    //         this.startPos.length = 0;
    //         this._playClip = null;
    //         delete this.tpose;
    //         delete this.nowpose;
    //         delete this.lerppose;
    //         delete this.carelist;
    //         delete this._clipnames;
    //     }
    //     /**
    //      * @private
    //      */
    //     clone()
    //     {

    //     }
    //     private finishCallBack: Function;
    //     private thisObject: any;
    //     /**
    //      * @public
    //      * @language zh_CN
    //      * @param finishCallBack 事件
    //      * @param thisObject 对象
    //      * @classdesc
    //      * 给动画添加结束事件
    //      * @version egret-gd3d 1.0
    //      */
    //     public addFinishedEventListener(finishCallBack: Function, thisObject: any): void
    //     {
    //         this.finishCallBack = finishCallBack;
    //         this.thisObject = thisObject;
    //     }

    //     /**
    //      * @public
    //      * @language zh_CN
    //      * clip播放end
    //      * @param clipname 动画片段名
    //      */
    //     onPlayEnd:(clipname:string)=>any;

    //     private checkFrameId(delay: number): void 
    //     {
    //         if (this.playStyle == PlayStyle.NormalPlay)
    //         {
    //             this._playTimer += delay * this.speed;
    //             this._playFrameid = (this._playClip.fps * this._playTimer) | 0;
    //             if (this._playClip.loop)//加上循环与非循环动画的分别控制
    //             {
    //                 this._playCount += Math.floor(this._playFrameid / this._playClip.frameCount);
    //                 this._playFrameid %= this._playClip.frameCount;
    //             }
    //             else if (this._playFrameid > this._playClip.frameCount - 1)
    //             {
    //                 this._playFrameid = this._playClip.frameCount - 1;
    //             }
    //             if (this.beRevert)
    //             {
    //                 this._playFrameid = this._playClip.frameCount - this._playFrameid - 1;
    //             }

    //         } else if (this.playStyle == PlayStyle.FramePlay)
    //         {
    //             //使用传进来的百分比计算当前播放帧
    //             this._playFrameid = (this._playClip.frameCount * this.percent) - 1;
    //             this._playFrameid = Math.round(this._playFrameid);
    //         }
    //         if (this._playFrameid < 0)
    //         {
    //             this._playFrameid = 0;
    //         }
    //         if (this._playFrameid > this._playClip.frameCount - 1)
    //         {
    //             this._playFrameid = this._playClip.frameCount - 1;
    //         }
    //         if (this.isStop())
    //         {
    //             let isp = this.isPlay();
    //             let cname = isp ? this._playClip.getName(): "";
    //             this._playClip = null;
    //             if(this.onPlayEnd && isp)
    //                 this.onPlayEnd(cname);

    //             if (this.finishCallBack)
    //             {
    //                 this.finishCallBack(this.thisObject);
    //                 this.finishCallBack = null;
    //                 this.thisObject = null;
    //             }
    //         }
    //     }
    //     /**
    //      * @private
    //      */
        // fillPoseData(data: Float32Array, bones: transform[], efficient: boolean = true): void
        // {
        //     var seek: number = 0;
        //     for (var i in bones)
        //     {
        //         var key: string = bones[i].name;
        //         var obj = this.nowpose[key];
        //         if (obj == undefined)
        //         {
        //             if (efficient)
        //             {
        //                 data[seek * 8 + 0] = 0;
        //                 data[seek * 8 + 1] = 0;
        //                 data[seek * 8 + 2] = 0;
        //                 data[seek * 8 + 3] = 1;
        //                 data[seek * 8 + 4] = 0;
        //                 data[seek * 8 + 5] = 0;
        //                 data[seek * 8 + 6] = 0;
        //                 data[seek * 8 + 7] = 1;
        //             }
        //             else
        //             {
        //                 data[seek * 16 + 0] = 1;
        //                 data[seek * 16 + 1] = 0;
        //                 data[seek * 16 + 2] = 0;
        //                 data[seek * 16 + 3] = 0;
        //                 data[seek * 16 + 4] = 0;
        //                 data[seek * 16 + 5] = 1;
        //                 data[seek * 16 + 6] = 0;
        //                 data[seek * 16 + 7] = 0;
        //                 data[seek * 16 + 8] = 0;
        //                 data[seek * 16 + 9] = 0;
        //                 data[seek * 16 + 10] = 1;
        //                 data[seek * 16 + 11] = 0;
        //                 data[seek * 16 + 12] = 0;
        //                 data[seek * 16 + 13] = 0;
        //                 data[seek * 16 + 14] = 0;
        //                 data[seek * 16 + 15] = 1;
        //             }
        //         }
        //         else
        //         {
        //             let _mat = math.pool.new_matrix();
        //             if (efficient)
        //             {
        //                 data[seek * 8 + 0] = obj.r.x;
        //                 data[seek * 8 + 1] = obj.r.y;
        //                 data[seek * 8 + 2] = obj.r.z;
        //                 data[seek * 8 + 3] = obj.r.w;
        //                 data[seek * 8 + 4] = obj.t.x;
        //                 data[seek * 8 + 5] = obj.t.y;
        //                 data[seek * 8 + 6] = obj.t.z;
        //                 data[seek * 8 + 7] = 1;
        //             }
        //             else
        //             {
        //                 math.matrixMakeTransformRTS(obj.t, math.pool.vector3_one, obj.r, _mat);
        //                 for (var j = 0; j < 16; j++)
        //                 {
        //                     data[seek * 16 + j] = _mat.rawData[j];
        //                 }
        //             }
        //             math.pool.delete_matrix(_mat);
        //         }
        //         seek++;
        //     }
        // }
    //     /**
    //      * @private
    //      */
    //     care(node: transform)
    //     {
    //         var pnode = node;
    //         while (true)
    //         {
    //             if (this.nowpose[pnode.name] != undefined)
    //             {
    //                 this.carelist[pnode.name] = pnode;
    //                 return;
    //             }
    //             if (pnode.parent)
    //                 pnode = pnode.parent;
    //             else
    //                 return;
    //             // if (pnode instanceof transform)
    //             // {

    //             // }
    //             // else
    //             // {
    //             //     break;
    //             // }
    //         }
    //     }
    // }
    /**
     * @private
     */
    @reflect.SerializeType
    export class tPoseInfo
    {
        static readonly ClassName:string="tPoseInfo";

        @reflect.Field("string")
        name: string;
        @reflect.Field("vector3")
        tposep: math.vector3;
        @reflect.Field("quaternion")
        tposeq: math.quaternion;
    }

    export enum PlayStyle
    {
        NormalPlay,
        FramePlay,
        PingPang,
    }
}