/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * shader资源
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class shader implements IAsset
    {
        static readonly ClassName:string="shader";

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
                assetName = "shader_" + this.getGUID();
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
            //shader 其实没有多大dispose的价值
            //shader 里面引用三种资源  vs fs program，都有比较复杂的引用关系，而且不怎么占内存，不和他jiu

            // for (var i = 0; i < this.passes.length; i++)
            // {
            //     this.passes[0].dispose(assetmgr.webgl);
            // }
            //this.glMesh.dispose(webgl);
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
            return total;
        }
        passes: { [id: string]: gd3d.render.glDrawPass[] } = {};

        // @gd3d.reflect.Field("UniformData")
        /**
         * @private
         * shader mapunifrom 默认值
         */
        defaultMapUniform: { [key: string]: { type: render.UniformTypeEnum, value?: any,becolor?:boolean,min?:number,max?:number} } = {};
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置渲染的层级
         * @version egret-gd3d 1.0
         */
        layer: RenderLayerEnum = RenderLayerEnum.Common;
        // /**
        //  * @private
        //  */
        // queue: number = 0;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param buf buffer数组
         * @version egret-gd3d 1.0
         */
        parse(assetmgr: assetMgr, json: any)
        {
            this._parseProperties(assetmgr, json.properties);

            if (json.layer)
            {
                var layer = json.layer;
                if (layer == "transparent")
                    this.layer = RenderLayerEnum.Transparent;
                else if (layer == "overlay")
                    this.layer = RenderLayerEnum.Overlay;
                else if (layer == "common")
                    this.layer = RenderLayerEnum.Common;
            }
            // if (json.queue)
            // {
            //     this.queue = json.queue;
            // }
            var passes = json.passes;
            this.passes = {};
            for (var key in passes)
            {
                var passbass = passes[key];
                var curpasses: render.glDrawPass[];

                //限制一下pass的名字
                if (key == "base" || key == "lightmap" || key == "skin" || key == "quad")
                {

                }
                else if (key.indexOf("base_") == 0 || key.indexOf("lightmap_") == 0 || key.indexOf("skin_") == 0)
                {

                }
                else
                {
                    continue;
                }
                this.passes[key] = [];
                for (var i = 0; i < passbass.length; i++)
                {
                    this.passes[key].push(this._parsePass(assetmgr, passbass[i],key));
                }
            }
            if (this.passes["base"] == undefined)
            {
                throw new Error("do not have base passgroup.");
            }
            this.fillUnDefUniform(this.passes["base"][0]);
        }

        public _parseProperties(assetmgr: assetMgr, properties: any)
        {
            this.defaultMapUniform = {};
            for (var index in properties)
            {
                let property = properties[index] as string;

                //检测字符串格式有无错误
                let words = property.match(RegexpUtil.floatRegexp);
                if (words == null)
                    words = property.match(RegexpUtil.rangeRegexp);
                if (words == null)
                    words = property.match(RegexpUtil.vectorRegexp);
                if (words == null)
                    words = property.match(RegexpUtil.textureRegexp);
                if (words == null)
                {
                    alert(this.getName() + " property error! info:\n" + property);
                    return;
                }

                if (words != null && words.length >= 4)
                {
                    let key = words[1];
                    let showName = words[2];
                    let type = words[3].toLowerCase();

                    switch (type)
                    {
                        case "float":
                            this.defaultMapUniform[key] = { type: render.UniformTypeEnum.Float, value: parseFloat(words[4]) };
                            break;
                        case "range":
                            //this.defaultValue[key] = { type: render.UniformTypeEnum.Float, min: parseFloat(words[4]), max: parseFloat(words[5]), value: parseFloat(words[6]) };
                            this.defaultMapUniform[key] = { type: render.UniformTypeEnum.Float, value: parseFloat(words[6]),min:parseFloat(words[4]),max:parseFloat(words[5])};
                            break;
                        case "vector":
                            let _vector = new gd3d.math.vector4(parseFloat(words[4]), parseFloat(words[5]), parseFloat(words[6]), parseFloat(words[7]));
                            this.defaultMapUniform[key] = { type: render.UniformTypeEnum.Float4, value: _vector};
                            break;
                        case "color":
                            let _color = new gd3d.math.vector4(parseFloat(words[4]), parseFloat(words[5]), parseFloat(words[6]), parseFloat(words[7]));
                            this.defaultMapUniform[key] = { type: render.UniformTypeEnum.Float4, value: _color,becolor:true};
                            break;
                        case "texture":
                            this.defaultMapUniform[key] = { type: render.UniformTypeEnum.Texture, value: assetmgr.getDefaultTexture(words[4]) };
                            break;
                        default:
                            alert(this.getName() + " property error! unknown type : " + type);
                            break;
                    }
                }
            }
        }
        private _parsePass(assetmgr: assetMgr, json: any,type:string): render.glDrawPass
        {
            var pass = new render.glDrawPass();

            var vs = json["vs"];
            var fs = json["fs"];

            switch (json["showface"])
            {
                case "cw":
                    pass.state_showface = render.ShowFaceStateEnum.CW;
                    break;
                case "ccw":
                    pass.state_showface = render.ShowFaceStateEnum.CCW;
                    break;
                default:
                    pass.state_showface = render.ShowFaceStateEnum.ALL;
                    break;
            }

            var blendmode = render.BlendModeEnum.Close;
            switch (json["zwrite"])
            {
                case "off":
                    pass.state_zwrite = false;
                    break;
                case "on":
                default:
                    pass.state_zwrite = true;
                    break;
            }

            pass.state_ztest = true;
            switch (json["ztest"])
            {
                case "greater":
                    pass.state_ztest_method = render.webglkit.GREATER;
                    break;
                case "gequal":
                    pass.state_ztest_method = render.webglkit.GEQUAL;
                    break;
                case "less":
                    pass.state_ztest_method = render.webglkit.LESS;
                    break;
                case "equal":
                    pass.state_ztest_method = render.webglkit.EQUAL
                    break;
                case "notequal":
                    pass.state_ztest_method = render.webglkit.NOTEQUAL
                    break;
                case "always":
                case "off":
                    pass.state_ztest = false;
                    break;
                case "never":
                    pass.state_ztest_method = render.webglkit.NEVER;
                    break;
                case "lequal":
                default:
                    pass.state_ztest_method = render.webglkit.LEQUAL;
                    break;
            }
            switch (json["blendmode"])
            {
                case "add":
                    blendmode = render.BlendModeEnum.Add;
                    break;
                case "addpremult":
                    blendmode = render.BlendModeEnum.Add_PreMultiply;
                    break;
                case "blend":
                    blendmode = render.BlendModeEnum.Blend;
                    break;
                case "blendpremult":
                    blendmode = render.BlendModeEnum.Blend_PreMultiply;
                    break;
            }
            pass.setAlphaBlend(blendmode);

            //var program = assetmgr.shaderPool.linkProgram(assetmgr.webgl, vs, fs);
            var program = assetmgr.shaderPool.linkProgrambyPassType(assetmgr.webgl,type,vs, fs);
            pass.setProgram(program);

            if (this.layer == RenderLayerEnum.Overlay)
            {
                pass.state_ztest = true;
                pass.state_zwrite = true;
                pass.state_ztest_method = render.webglkit.ALWAYS;
            }
            return pass;
        }
        fillUnDefUniform(pass:render.glDrawPass)
        {
            for(let key in pass.mapuniforms)
            {
                let item=pass.mapuniforms[key];
                if(uniformSetter.autoUniformDic[item.name]==null&&this.defaultMapUniform[item.name]==null)
                {
                    switch(item.type)
                    {
                        case render.UniformTypeEnum.Float:
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float,value:0};
                            break;
                        case render.UniformTypeEnum.Floatv:
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4x4v,value:null};
                            break;
                        case render.UniformTypeEnum.Float4:
                            if(item.name.indexOf("_ST")>=0||item.name.indexOf("_st")>=0)
                            {
                                this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4,value:new gd3d.math.vector4(1,1,0,0)};
                            }else
                            {
                                this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4,value:new gd3d.math.vector4(1,1,1,1)};
                            }
                            break;
                        case render.UniformTypeEnum.Float4v:
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4v,value:null};
                            break;
                        case render.UniformTypeEnum.Float4x4:
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4x4,value:null};
                            break;
                        case render.UniformTypeEnum.Float4x4v:
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Float4x4v,value:null};
                            break;
                        case render.UniformTypeEnum.Texture:
                            let tex=sceneMgr.app.getAssetMgr().getDefaultTexture("white");
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.Texture,value:tex};
                            break;
                        case render.UniformTypeEnum.CubeTexture:
                            let cubetex=sceneMgr.app.getAssetMgr().getDefaultCubeTexture("white");
                            this.defaultMapUniform[item.name]={type:render.UniformTypeEnum.CubeTexture,value:cubetex};
                            break;
                    }
                }
            }
        }
    }
}