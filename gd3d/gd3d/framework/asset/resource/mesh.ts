namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * mesh资源
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class mesh implements IAsset
    {
        static readonly ClassName:string="mesh";

        private name: constText;
        private id: resID = new resID();
        defaultAsset: boolean = false;
        constructor(assetName: string = null)
        {
            if (!assetName)
            {
                assetName = "mesh_" + this.getGUID();
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
            if (!this.name)
            {
                return null;
            }
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
            this.glMesh.dispose(sceneMgr.app.getAssetMgr().webgl);
            this.data = null;
            delete this.submesh;
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
            total += this.glMesh.caclByteLength();
            if (this.data)
            {
                total += this.data.caclByteLength();
            }
            return total;
        }
        /**
         * @private
         */
        glMesh: gd3d.render.glMesh;

        updateByEffect: boolean = false;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * mesh数据实例
         * @version egret-gd3d 1.0
         */
        data: gd3d.render.meshData;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * submesh信息列表
         * @version egret-gd3d 1.0
         */
        submesh: subMeshInfo[] = [];

        //加载完成事件
        public onReadFinish: () => void;
        // //分片加载状态变量
        private reading = false;
        // //分片加载器
        private readProcess(read, data, objVF, vcount, vec10tpose, callback)
        {

            if (this.reading) return;

            var tag = read.readUInt8();
            //end
            if (tag == 255) 
            {
                callback();
                return;
            }
            if (tag == 1)//pos
            {
                if (data.pos == undefined)
                {
                    data.pos = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Position;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var _position = new gd3d.math.vector3();
                    _position.x = read.readSingle();
                    _position.y = read.readSingle();
                    _position.z = read.readSingle();
                    data.pos.push(_position);
                }
            }
            else if (tag == 2)//color
            {
                if (data.color == undefined)
                {
                    data.color = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Color;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var _color = new gd3d.math.color();
                    _color.a = math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                    _color.r = math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                    _color.g = math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                    _color.b = math.floatClamp(read.readUInt8() / 255, 0, 1.0);
                    data.color.push(_color);
                }
            }
            else if (tag == 3)//normal
            {
                if (data.normal == undefined)
                {
                    data.normal = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Normal;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var _normal = new gd3d.math.vector3();
                    _normal.x = read.readSingle();
                    _normal.y = read.readSingle();
                    _normal.z = read.readSingle();
                    data.normal.push(_normal);
                }
            }
            else if (tag == 4)//uv
            {
                if (data.uv == undefined)
                {
                    data.uv = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.UV0;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var uv = new gd3d.math.vector2();
                    uv.x = read.readSingle();
                    uv.y = read.readSingle();
                    data.uv.push(uv);
                }
            }
            else if (tag == 5)//uv1
            {
                if (data.uv2 == undefined)
                {
                    data.uv2 = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.UV1;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var uv = new gd3d.math.vector2();
                    uv.x = read.readSingle();
                    uv.y = read.readSingle();
                    data.uv2.push(uv);

                }
            }
            else if (tag == 6)//uv2
            {
                //meshdata.vec2uvs2 = new Float32Array(vcount * 2);
                for (var i = 0; i < vcount; i++)
                {
                    //meshdata.vec2uvs2[i * 2 + 0] =
                    read.readSingle();//u
                    //meshdata.vec2uvs2[i * 2 + 1] =
                    read.readSingle();//v

                }
            }
            else if (tag == 7)//tangent
            {
                if (data.tangent == undefined)
                {
                    data.tangent = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.Tangent;
                }
                for (var i = 0; i < vcount; i++)
                {

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
            else if (tag == 8)//uv3
            {
                for (var i = 0; i < vcount; i++)
                {
                    //meshdata.vec2uvs2[i * 2 + 0] =
                    read.readSingle();//u
                    //meshdata.vec2uvs2[i * 2 + 1] =
                    read.readSingle();//v

                }
            }
            else if (tag == 16)//tpose
            {
                var tposelen = read.readUInt8();
                //meshdata.vec10tpose = new Float32Array(tposelen * 10);
                for (var i = 0; i < tposelen; i++)
                {
                    vec10tpose[i * 10 + 0] = read.readSingle();//posx;
                    vec10tpose[i * 10 + 1] = read.readSingle();//posy;
                    vec10tpose[i * 10 + 2] = read.readSingle();//posz;
                    vec10tpose[i * 10 + 3] = read.readSingle();//scalex;
                    vec10tpose[i * 10 + 4] = read.readSingle();//scaley;
                    vec10tpose[i * 10 + 5] = read.readSingle();//scalez;
                    vec10tpose[i * 10 + 6] = read.readSingle();//quatx;
                    vec10tpose[i * 10 + 7] = read.readSingle();//quaty;
                    vec10tpose[i * 10 + 8] = read.readSingle();//quatz;
                    vec10tpose[i * 10 + 9] = read.readSingle();//quatw;
                }
            }
            else if (tag == 17)//skinwidget;
            {
                if (data.blendIndex == undefined)
                {
                    data.blendIndex = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.BlendIndex4;
                }
                if (data.blendWeight == undefined)
                {
                    data.blendWeight = [];
                    objVF.vf = objVF.vf | gd3d.render.VertexFormatMask.BlendWeight4;
                }
                for (var i = 0; i < vcount; i++)
                {
                    var _boneIndex = new render.number4();
                    _boneIndex.v0 = read.readUInt32();
                    _boneIndex.v1 = read.readUInt32();
                    _boneIndex.v2 = read.readUInt32();
                    _boneIndex.v3 = read.readUInt32();

                    var _boneWeight = new render.number4();
                    _boneWeight.v0 = read.readSingle();
                    _boneWeight.v1 = read.readSingle();
                    _boneWeight.v2 = read.readSingle();
                    _boneWeight.v3 = read.readSingle();

                    data.blendIndex.push(_boneIndex);
                    data.blendWeight.push(_boneWeight);
                }
            }
            else
            {
                throw "notwrite" + tag;
            }
            this.reading = false;
            setTimeout(() =>
            {
                this.readProcess(read, data, objVF, vcount, vec10tpose, () =>
                {
                    callback();
                });
            });
        }
        //分片加载完成
        private readFinish(read, data, buf, objVF, webgl)
        {
            var subcount = read.readUInt8();
            data.trisindex = [];
            this.submesh = [];
            for (var i = 0; i < subcount; i++)
            {
                var _submeshinfo: subMeshInfo = new subMeshInfo();
                var tv = read.readUInt32();//代表之前submesh中的drawstyle

                var sublen = read.readUInt32();
                _submeshinfo.start = data.trisindex.length;
                _submeshinfo.size = sublen;
                _submeshinfo.matIndex = i;
                this.submesh.push(_submeshinfo);
                for (var j = 0; j < sublen; j++)
                {
                    var index = read.readUInt32();
                    data.trisindex.push(index);
                }

            }

            buf = null;
            data.originVF = objVF.vf;
            this.data = data;
            this.glMesh = new gd3d.render.glMesh();
            var vertexs = this.data.genVertexDataArray(objVF.vf);
            var indices = this.data.genIndexDataArray();

            this.glMesh.initBuffer(webgl, objVF.vf, this.data.pos.length);
            this.glMesh.uploadVertexData(webgl, vertexs);
            this.glMesh.addIndex(webgl, indices.length);
            this.glMesh.uploadIndexData(webgl, 0, indices);

            // this.onReadFinish();
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param buf buffer数组
         * @param webgl webgl实例
         * @version egret-gd3d 1.0
         */
        Parse(buf: ArrayBuffer, webgl: WebGLRenderingContext)
        {
            return new threading.gdPromise((reslove) =>
            {
                threading.thread.Instance.Call("meshDataHandle", buf, (result) =>
                {

                    let objVF = result.objVF;
                    let data = result.meshData;
                    data.originVF = objVF.vf;
                    // this.data = new gd3d.render.meshData();
                    this.data = render.meshData.cloneByObj(data);
                    // for (let k in data)
                    //     this.data[k] = data[k];
                    this.submesh = result.subMesh;

                    this.glMesh = new gd3d.render.glMesh();
                    var vertexs = this.data.genVertexDataArray(objVF.vf);
                    var indices = this.data.genIndexDataArray();

                    let __webgl = sceneMgr.app.getAssetMgr().webgl;
                    this.glMesh.initBuffer(webgl, objVF.vf, this.data.pos.length);
                    this.glMesh.uploadVertexData(webgl, vertexs);
                    this.glMesh.addIndex(webgl, indices.length);
                    this.glMesh.uploadIndexData(webgl, 0, indices);
                    reslove();
                });
            });

            // return new threading.gdPromise((reslove) =>
            // {

                
            //     var objVF = { vf: 0 };//顶点属性
            //     var data: gd3d.render.meshData = new gd3d.render.meshData();
            //     var read: gd3d.io.binReader = new gd3d.io.binReader(buf);              

            //     var meshName = read.readStringAnsi();
                
            //     read.position = read.position + 24;

            //     var vcount = read.readUInt32();

            //     var vec10tpose: number[] = [];

            //     //分片加载 
            //     this.readProcess(read, data, objVF, vcount, vec10tpose, () =>
            //     {
            //         this.readFinish(read, data, buf, objVF, webgl);
            //         reslove();
            //     });

            // });

        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 检测射线碰撞
         * @param ray 射线
         * @param matrix 所在transform的矩阵
         * @version egret-gd3d 1.0
         */
        intersects(ray: ray, matrix: gd3d.math.matrix, outInfo: pickinfo): boolean
        {
            let ishided = false;
            if (!this.submesh) return ishided;
            let lastDistance = Number.MAX_VALUE;
            for (var i = 0; i < this.submesh.length; i++)
            {
                var submesh = this.submesh[i];
                if (submesh.line)
                {

                }
                else
                {
                    if (submesh.useVertexIndex < 0)
                    {
                        //不使用index
                    }
                    else
                    {
                        var t0 = gd3d.math.pool.new_vector3();
                        var t1 = gd3d.math.pool.new_vector3();
                        var t2 = gd3d.math.pool.new_vector3();
                        for (var index = submesh.start; index < submesh.size; index += 3)
                        {
                            var p0 = this.data.pos[this.data.trisindex[index]];
                            var p1 = this.data.pos[this.data.trisindex[index + 1]];
                            var p2 = this.data.pos[this.data.trisindex[index + 2]];

                            gd3d.math.matrixTransformVector3(p0, matrix, t0);
                            gd3d.math.matrixTransformVector3(p1, matrix, t1);
                            gd3d.math.matrixTransformVector3(p2, matrix, t2);

                            let tempinfo = math.pool.new_pickInfo();
                            var bool = ray.intersectsTriangle(t0, t1, t2, tempinfo);
                            if (bool)
                            {
                                if (tempinfo.distance < 0) continue;
                                if (lastDistance > tempinfo.distance)
                                {
                                    ishided = true;
                                    outInfo.cloneFrom(tempinfo);
                                    lastDistance = outInfo.distance;
                                    outInfo.faceId = index / 3;
                                    outInfo.subMeshId = i;
                                    var tdir = gd3d.math.pool.new_vector3();
                                    math.vec3ScaleByNum(ray.direction, outInfo.distance, tdir);
                                    math.vec3Add(ray.origin, tdir, outInfo.hitposition);
                                    math.pool.delete_vector3(tdir);
                                }
                            }
                            math.pool.delete_pickInfo(tempinfo);
                        }
                        math.pool.delete_vector3(t0);
                        math.pool.delete_vector3(t1);
                        math.pool.delete_vector3(t2);
                    }
                }
            }
            return ishided;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 克隆mesh
         * @version egret-gd3d 1.0
         */
        clone(): mesh
        {
            let _result = new mesh(this.getName());
            var vf = this.glMesh.vertexFormat;//顶点属性
            // var data: gd3d.render.meshData = new gd3d.render.meshData();
            var data: gd3d.render.meshData = render.meshData.cloneByObj(this.data);

            // if (this.data.pos != undefined)
            // {
            //     data.pos = [];
            //     // for (let i = 0,len = this.data.pos.length; i < len; ++i)
            //     for (let item of this.data.pos)
            //     {
            //         var _position = new gd3d.math.vector3();
            //         _position.rawData.set(item.rawData);
            //         // _position.x = this.data.pos[i].x;
            //         // _position.y = this.data.pos[i].y;
            //         // _position.z = this.data.pos[i].z;
            //         data.pos.push(_position);
            //     }
            // }
            // if (this.data.color != undefined)
            // {
            //     data.color = [];
            //     // for (let i = 0, len = this.data.color.length; i < len; i++)
            //     for (let item of this.data.color)
            //     {
            //         let _color = new gd3d.math.color();
            //         // _color.a = this.data.color[i].a;
            //         // _color.r = this.data.color[i].r;
            //         // _color.g = this.data.color[i].g;
            //         // _color.b = this.data.color[i].b;
            //         _color.rawData.set(item.rawData);
            //         data.color.push(_color);
            //     }
            // }
            // if (this.data.normal != undefined)
            // {
            //     data.normal = [];
            //     // for (let i = 0; i < this.data.normal.length; i++)
            //     for (let item of this.data.normal)
            //     {
            //         var _normal = new gd3d.math.vector3();
            //         _normal.rawData.set(item.rawData);
            //         // _normal.x = this.data.normal[i].x;
            //         // _normal.y = this.data.normal[i].y;
            //         // _normal.z = this.data.normal[i].z;
            //         data.normal.push(_normal);
            //     }
            // }
            // if (this.data.uv != undefined)
            // {
            //     data.uv = [];
            //     // for (var i = 0; i < this.data.uv.length; i++)
            //     for (let item of this.data.uv)
            //     {
            //         var uv = new gd3d.math.vector2();
            //         uv.rawData.set(item.rawData);
            //         // uv.x = this.data.uv[i].x;
            //         // uv.y = this.data.uv[i].y;
            //         data.uv.push(uv);
            //     }
            // }
            // if (this.data.uv2 != undefined)
            // {
            //     data.uv2 = [];
            //     // for (var i = 0; i < this.data.uv2.length; i++)
            //     for (let item of this.data.uv2)
            //     {
            //         var uv = new gd3d.math.vector2();
            //         // uv.x = this.data.uv2[i].x;
            //         // uv.y = this.data.uv2[i].y;
            //         uv.rawData.set(uv.rawData);
            //         data.uv2.push(uv);
            //     }
            // }
            // if (this.data.tangent != undefined)
            // {
            //     data.tangent = [];
            //     // for (var i = 0; i < this.data.tangent.length; i++)
            //     for (let item of this.data.tangent)
            //     {
            //         var tangent = new gd3d.math.vector3();
            //         // tangent.x = this.data.tangent[i].x;
            //         // tangent.y = this.data.tangent[i].y;
            //         // tangent.z = this.data.tangent[i].z;
            //         tangent.rawData.set(item.rawData);
            //         data.tangent.push(tangent);
            //     }
            // }
            // if (this.data.blendIndex != undefined)
            // {
            //     data.blendIndex = [];
            //     for (let i = 0, len = this.data.blendIndex.length; i < len; ++i)
            //     {
            //         let item = this.data.blendIndex[i];
            //         let _boneIndex = new render.number4();
            //         _boneIndex.v0 = item.v0;
            //         _boneIndex.v1 = item.v1;
            //         _boneIndex.v2 = item.v2;
            //         _boneIndex.v3 = item.v3;
            //         data.blendIndex.push(_boneIndex);
            //     }
            // }
            // if (this.data.blendWeight != undefined)
            // {
            //     data.blendWeight = [];
            //     for (let i = 0, len = this.data.blendWeight.length; i < len; ++i)
            //     {
            //         let item = this.data.blendWeight[i];
            //         let _boneWeight = new render.number4();
            //         _boneWeight.v0 = item.v0;
            //         _boneWeight.v1 = item.v1;
            //         _boneWeight.v2 = item.v2;
            //         _boneWeight.v3 = item.v3;
            //         data.blendWeight.push(_boneWeight);
            //     }
            // }

            // _result.submesh = [];
            // for (var i = 0; i < this.submesh.length; i++)
            // {
            //     var _submeshinfo: subMeshInfo = new subMeshInfo();

            //     _submeshinfo.start = this.submesh[i].start;
            //     _submeshinfo.size = this.submesh[i].size;
            //     _submeshinfo.matIndex = i;
            //     _result.submesh.push(_submeshinfo);
            // }
            // data.trisindex = this.data.trisindex.slice();

            _result.data = data;
            _result.glMesh = new gd3d.render.glMesh();

            var vertexs = _result.data.genVertexDataArray(vf);
            var indices = _result.data.genIndexDataArray();

            _result.glMesh.initBuffer(sceneMgr.app.getAssetMgr().webgl, vf, this.data.pos.length);
            _result.glMesh.uploadVertexData(sceneMgr.app.getAssetMgr().webgl, vertexs);
            _result.glMesh.addIndex(sceneMgr.app.getAssetMgr().webgl, indices.length);
            _result.glMesh.uploadIndexData(sceneMgr.app.getAssetMgr().webgl, 0, indices);
            return _result;
        }

        private _cacheMinP : math.vector3;
        private _cacheMaxP : math.vector3;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 计算模型顶点的 最大最小值
         * @param outMin 输出最小
         * @param outMax 输出最大
         * @version egret-gd3d 1.0
         */
        calcVectexMinMax(outMin:math.vector3,outMax:math.vector3){
            if(!outMin || !outMax) return;
            if(!this._cacheMinP || !this._cacheMaxP){
                this._cacheMinP = new math.vector3();
                this._cacheMaxP = new math.vector3();
                let meshdata = this.data;
                gd3d.math.vec3SetByFloat(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, this._cacheMinP);
                gd3d.math.vec3SetByFloat(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE, this._cacheMaxP);
                for (var i = 0; i < meshdata.pos.length; i++)
                {
                    gd3d.math.vec3Max(meshdata.pos[i], this._cacheMaxP , this._cacheMaxP );
                    gd3d.math.vec3Min(meshdata.pos[i], this._cacheMinP, this._cacheMinP);
                }
            }
            math.vec3Clone(this._cacheMinP,outMin);
            math.vec3Clone(this._cacheMaxP,outMax);
        }
    }
    /**
     * @private
     */
    export class subMeshInfo
    {
        matIndex: number = 0;
        useVertexIndex: number = 0;//-1 表示不用indexbuffer,>=0 表示第几个，
        //通常都是用第一个indexbuffer，只有用wireframe显示模式，使用第二个部分
        line: boolean = false;
        start: number = 0;
        size: number = 0;
    }


}