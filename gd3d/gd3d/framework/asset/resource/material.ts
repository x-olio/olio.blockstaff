/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @private
     */
    @gd3d.reflect.SerializeType
    export class UniformData
    {
        @gd3d.reflect.Field("number")
        @gd3d.reflect.UIStyle("UniformTypeEnum")
        type: render.UniformTypeEnum;
        @gd3d.reflect.Field("any")
        value: any;
        defaultValue: any;

        resname: string;

        constructor(type: render.UniformTypeEnum, value: any, defaultValue: any = null)
        {
            this.type = type;
            this.value = value;
            this.defaultValue = defaultValue;
        }
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 材质资源
     * @param buf buffer数组
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class material implements IAsset
    {
        static readonly ClassName:string="material";

        @gd3d.reflect.Field("constText")
        private name: constText = null;
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
                assetName = "material_" + this.getGUID();
            }
            this.name = new constText(assetName);
            gd3d.io.enumMgr.enumMap["UniformTypeEnum"] = render.UniformTypeEnum;
            // this.mapUniformTemp = {};
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
            if (this.name == undefined)
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
         * 释放资源
         * @version egret-gd3d 1.0
         */
        dispose()
        {
            for (let id in this.statedMapUniforms)
            {
                switch (this.defaultMapUniform[id].type)
                {
                    case render.UniformTypeEnum.Texture:
                    case render.UniformTypeEnum.CubeTexture:
                        if (this.statedMapUniforms[id] != null)
                            this.statedMapUniforms[id].unuse(true);
                        break;
                }
            }
            delete this.statedMapUniforms;
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
         * 计算资源字节大小
         * @version egret-gd3d 1.0
         */
        caclByteLength(): number
        {
            let total = 0;
            if (this.shader)
            {
                total += this.shader.caclByteLength();
            }
            for (let k in this.statedMapUniforms)
            {
                let type = this.defaultMapUniform[k].type;
                let value = this.statedMapUniforms[k].value;
                let defaultValue = this.defaultMapUniform[k].value;
                switch (type)
                {
                    case render.UniformTypeEnum.Float:
                        total += 4;
                        break;
                    case render.UniformTypeEnum.Floatv:
                        total += value.byteLength;
                        break;
                    case render.UniformTypeEnum.Float4:
                        total += 16;
                        break;
                    case render.UniformTypeEnum.Float4v:
                        total += value.byteLength;
                        break;
                    case render.UniformTypeEnum.Float4x4:
                        total += 64;
                        break;
                    case render.UniformTypeEnum.Float4x4v:
                        total += value.byteLength;
                        break;
                    case render.UniformTypeEnum.Texture:
                    case render.UniformTypeEnum.CubeTexture:
                        if (value != null)
                        {
                            total += value.caclByteLength();
                        }
                        else if (defaultValue != null)
                        {
                            total += defaultValue.caclByteLength();
                        }
                        break;
                }
            }
            return total;
        }

        uploadUnifoms(pass: render.glDrawPass, context: renderContext)
        {
            render.shaderUniform.texindex = 0;
            for (let key in pass.mapuniforms)
            {
                let unifom = pass.mapuniforms[key];
                let func = render.shaderUniform.applyuniformFunc[unifom.type];
                let unifomValue: any;
                if (uniformSetter.autoUniformDic[unifom.name] != null)
                {
                    let autoFunc = uniformSetter.autoUniformDic[unifom.name];
                    unifomValue = autoFunc(context);
                } else
                {
                    if (this.statedMapUniforms[unifom.name] != null)
                    {
                        unifomValue = this.statedMapUniforms[unifom.name];
                    } else if (this.defaultMapUniform[unifom.name])
                    {
                        unifomValue = this.defaultMapUniform[unifom.name].value;
                    } else
                    {
                        console.error("Uniform don't be setted or have def value. uniform:" + unifom.name + "mat:" + this.getName());
                    }
                }
                func(unifom.location, unifomValue);
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置shader 不保留原有数据
         * @param shader shader实例
         * @version egret-gd3d 1.0
         */
        setShader(shader: shader)
        {
            this.shader = shader;
            this.defaultMapUniform = shader.defaultMapUniform;
        }
        // private _changeShaderMap: { [name: string]: material } = {};
        // /**
        //  * @public
        //  * @language zh_CN
        //  * @classdesc
        //  * 修改shader 保留原有数据
        //  * @param shader shader实例
        //  * @version egret-gd3d 1.0
        //  */
        // changeShader(shader: shader)
        // {
        //     let map: { [id: string]: UniformData };
        //     if (this._changeShaderMap[shader.getName()] != undefined)
        //     {
        //         map = this._changeShaderMap[shader.getName()].mapUniform;
        //     }
        //     else
        //     {
        //         let mat: material = this.clone();
        //         map = mat.mapUniform;
        //         this._changeShaderMap[shader.getName()] = mat;
        //     }
        //     this.setShader(shader);
        //     for (let key in map)
        //     {
        //         if (this.mapUniform[key] != undefined)
        //         {
        //             this.mapUniform[key] = map[key];
        //         }
        //     }
        // }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取shader的layer
         * @version egret-gd3d 1.0
         */
        getLayer()
        {
            return this.shader.layer;
        }
        private queue: number = 0;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取shader的queue
         * @version egret-gd3d 1.0
         */
        getQueue()
        {
            return this.queue;
        }
        setQueue(queue: number)
        {
            this.queue = queue;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取shader
         * @version egret-gd3d 1.0
         */
        getShader()
        {
            return this.shader;
        }
        @gd3d.reflect.Field("shader")
        private shader: shader;

        /**
         * @private
         */
        //@gd3d.reflect.Field("UniformDataDic")
        //mapUniform: {[id: string]: UniformData} = {};//参数
        defaultMapUniform:{ [key: string]: { type: render.UniformTypeEnum, value?: any,becolor?:boolean,min?:number,max?:number}};
        statedMapUniforms:{[id:string]:any}={};
        //private mapUniformTemp: {[id: string]: UniformData}={};
        /**
         * @private
         */
        setFloat(_id: string, _number: number)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Float)
            {
                this.statedMapUniforms[_id] = _number;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setFloatv(_id: string, _numbers: Float32Array)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Floatv)
            {
                this.statedMapUniforms[_id] = _numbers;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setVector4(_id: string, _vector4: math.vector4)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Float4)
            {
                this.statedMapUniforms[_id] = _vector4;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setVector4v(_id: string, _vector4v: Float32Array)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Float4v)
            {
                this.statedMapUniforms[_id] = _vector4v;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setMatrix(_id: string, _matrix: math.matrix)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Float4x4)
            {
                this.statedMapUniforms[_id] = _matrix;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setMatrixv(_id: string, _matrixv: Float32Array)
        {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Float4x4v)
            {
                this.statedMapUniforms[_id] = _matrixv;
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }
        /**
         * @private
         */
        setTexture(_id: string, _texture: gd3d.framework.texture, resname: string = "")
        {
            if ((this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.Texture)||_id=="_LightmapTex")
            {
                if (this.statedMapUniforms[_id] != null && (!this.statedMapUniforms[_id].defaultAsset))
                {
                    this.statedMapUniforms[_id].unuse();
                }
                this.statedMapUniforms[_id] = _texture;
                if (_texture != null)
                {
                    if(_texture.getName() == "_color" ){
                        _texture;
                    }
                    if (!_texture.defaultAsset)
                    {
                        _texture.use();
                    }
                    //图片的尺寸信息(1/width,1/height,width,height)
                    let _texelsizeName = _id + "_TexelSize";
                    let _gltexture = _texture.glTexture;
                    if (_gltexture != null&&this.defaultMapUniform[_texelsizeName] != null)
                    {
                        this.setVector4(_texelsizeName, new math.vector4(1.0 / _gltexture.width, 1.0 / _gltexture.height, _gltexture.width, _gltexture.height));
                    }
                }
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }

        }

        setCubeTexture(_id: string, _texture: gd3d.framework.texture) {
            if (this.defaultMapUniform[_id] != null && this.defaultMapUniform[_id].type == render.UniformTypeEnum.CubeTexture)
            {
                if (this.statedMapUniforms[_id] != null && (!this.statedMapUniforms[_id].defaultAsset))
                {
                    this.statedMapUniforms[_id].unuse();
                }
                this.statedMapUniforms[_id] = _texture;
                if (_texture != null)
                {
                    if (!_texture.defaultAsset)
                    {
                        _texture.use();
                    }
                    //图片的尺寸信息(1/width,1/height,width,height)
                    let _texelsizeName = _id + "_TexelSize";
                    let _gltexture = _texture.glTexture;
                    if ( _gltexture != null)
                    {
                        this.setVector4(_texelsizeName, new math.vector4(1.0 / _gltexture.width, 1.0 / _gltexture.height, _gltexture.width, _gltexture.height));
                    }
                }
            } else
            {
                console.log("Set wrong uniform value. Mat Name: " + this.getName() + " Unifom :" + _id);
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 绘制
         * @param context 渲染上下文
         * @param mesh 渲染的mesh
         * @param sm 渲染的submesh信息
         * @version egret-gd3d 1.0
         */
        draw(context: renderContext, mesh: mesh, sm: subMeshInfo, basetype: string = "base", useGLobalLightMap: boolean = true)
        {
            
            let drawPasses = this.shader.passes[basetype + context.drawtype];
            if (drawPasses == undefined){
                basetype = basetype.indexOf("fog") != -1 ? "base_fog":"base";
                drawPasses = this.shader.passes[basetype + context.drawtype];
                if (drawPasses == undefined){
                    drawPasses = this.shader.passes["base" + context.drawtype];
                    if (drawPasses == undefined)
                    return;
                }
            }
            for (var i = 0; i < drawPasses.length; i++)
            {
                var pass = drawPasses[i];
                pass.use(context.webgl);
                this.uploadUnifoms(pass, context);

                mesh.glMesh.bind(context.webgl, pass.program, sm.useVertexIndex);

                DrawCallInfo.inc.add();
                if (sm.useVertexIndex < 0)
                {
                    if (sm.line)
                    {
                        mesh.glMesh.drawArrayLines(context.webgl, sm.start, sm.size);
                    }
                    else
                    {
                        mesh.glMesh.drawArrayTris(context.webgl, sm.start, sm.size);
                    }
                }
                else
                {
                    if (sm.line)
                    {
                        mesh.glMesh.drawElementLines(context.webgl, sm.start, sm.size);
                    }
                    else
                    {
                        mesh.glMesh.drawElementTris(context.webgl, sm.start, sm.size);
                    }
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param assetmgr 资源管理实例
         * @param json json数据
         * @version egret-gd3d 1.0
         */
        Parse(assetmgr: assetMgr, json: any, bundleName: string = null)
        {
            var shaderName = json["shader"];
            var shader = assetmgr.getShader(shaderName) as gd3d.framework.shader;
            if (shader == null)
            {
                console.error("shader 为空！shadername：" + shaderName + " bundleName: " + bundleName);
            }
            this.setShader(shader);
            var queue = json["queue"];
            if (queue)
            {
                this.queue = queue;
            }

            var mapUniform = json["mapUniform"];
            for (var i in mapUniform)
            {
                var jsonChild = mapUniform[i];
                var _uniformType: render.UniformTypeEnum = jsonChild["type"] as render.UniformTypeEnum;
                if (_uniformType == null) continue;
                switch (_uniformType)
                {
                    case render.UniformTypeEnum.Texture:
                    case render.UniformTypeEnum.CubeTexture:
                        var _value: string = jsonChild["value"];
                        var _texture: gd3d.framework.texture = assetmgr.getAssetByName(_value, bundleName) as gd3d.framework.texture;
                        if (_texture == null)
                        {
                            console.error("Material Mapuniform Texture 无效(" + _value + ")！shadername：" + shaderName + " bundleName: " + bundleName);
                            //_texture = assetmgr.getDefaultTexture("grid");
                        } else
                        {
                            this.setTexture(i, _texture, _value);
                        }
                        break;
                    case render.UniformTypeEnum.Float:
                        var _value: string = jsonChild["value"];
                        this.setFloat(i, parseFloat(_value));
                        break;
                    case render.UniformTypeEnum.Float4:
                        var tempValue = jsonChild["value"];
                        try
                        {
                            let values = tempValue.match(RegexpUtil.vector4Regexp);
                            if (values != null)
                            {
                                var _float4: math.vector4 = new math.vector4(parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]), parseFloat(values[4]));
                                this.setVector4(i, _float4);
                            }
                        }
                        catch (e)
                        {
                            //数据不合法就不提交了
                            console.error("Material Mapuniform float4 无效:value (" + tempValue + ")！shadername：" + shaderName + " bundleName: " + bundleName);
                        }
                        break;
                    default:
                        console.error("Material Mapuniform 无效: 未识别类型(" + jsonChild["type"] + ")！shadername：" + shaderName + " bundleName: " + bundleName);
                        break;
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 克隆
         * @version egret-gd3d 1.0
         */
        public clone(): material
        {
            let mat: material = new material(this.getName());
            mat.setShader(this.shader);
            for (var i in this.statedMapUniforms)
            {
                var _uniformType: render.UniformTypeEnum = this.defaultMapUniform[i].type;
                let value=this.statedMapUniforms[i];
                switch (_uniformType)
                {
                    case render.UniformTypeEnum.Texture:
                        mat.setTexture(i, value);
                        break;
                    case render.UniformTypeEnum.CubeTexture:
                        mat.setCubeTexture(i, value);
                        break;
                    case render.UniformTypeEnum.Float:
                        mat.setFloat(i, value);
                        break;
                    case render.UniformTypeEnum.Float4:
                        mat.setVector4(i, value);
                        break;
                    default:
                        break;
                }
            }
            return mat;
        }

        public save(): string
        {
            let obj: any = {};
            obj["shader"] = this.shader.getName();
            obj["srcshader"] = "";
            obj["mapUniform"] = {};
            for (let item in this.statedMapUniforms)
            {
                let __type = this.defaultMapUniform[item].type;
                let val = this.statedMapUniforms;
                let jsonValue = {};
                jsonValue["type"] = __type;
                switch (__type)
                {
                    case render.UniformTypeEnum.CubeTexture:
                    case render.UniformTypeEnum.Texture:
                        jsonValue["value"] = `${val[item].name.name}`;
                        break;
                    case render.UniformTypeEnum.Float4:
                        jsonValue["value"] = `(${val[item].x},${val[item].y},${val[item].z},${val[item].w})`;
                        break;
                    case render.UniformTypeEnum.Float:
                        jsonValue["value"] = val[item];
                        break;
                    default:
                        console.warn(`无法存储未解析类型:${__type},${item}`);
                        continue;
                }
                obj["mapUniform"][item] = jsonValue;
            }
            return JSON.stringify(obj);
        }
    }
}