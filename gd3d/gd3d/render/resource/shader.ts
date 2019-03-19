namespace gd3d.render
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * uniform类型枚举
     * @version egret-gd3d 1.0
     */
    export enum UniformTypeEnum
    {
        Texture=0,
        Float=1,
        Floatv=2,
        Float4=3,
        Float4v=4,
        Float4x4=5,
        Float4x4v=6,
        CubeTexture=7
    }
    /**
     * @private
     */
    export class uniform
    {
        name: string;
        type: UniformTypeEnum;
        location: WebGLUniformLocation;
        //默认值跟着类型走即可
    }
    /**
     * @private
     */
    export enum ShaderTypeEnum
    {
        VS,
        FS,
    }
    /**
     * @private
     */
    export class glShader
    {
        constructor(name: string, type: ShaderTypeEnum, shader: WebGLShader, code: string)
        {
            this.name = name;
            this.type = type;
            this.shader = shader;
            //this._scanUniform(code);
        }
        name: string;
        type: ShaderTypeEnum;
        shader: WebGLShader;
        //mapUniform: { [id: string]: { name: string, type: UniformTypeEnum } } = {};

        // private _scanUniform(txt: string)
        // {
        //     var lines1 = txt.split(";");
        //     for (var ii in lines1)
        //     {
        //         var lines = lines1[ii].split("\n");

        //         for (var i in lines)
        //         {
        //             var line = lines[i];

        //             var words = line.match(new RegExp("([_a-zA-Z0-9]+)|([/=;]+)", "g"));
        //             if (words != null && words.length >= 3 && words[0] == "uniform")
        //             {
        //                 var t = words[1];
        //                 var n = words[2];

        //                 if (t == "highp" || t == "lowp" || t == "mediump")
        //                 {
        //                     t = words[2];
        //                     n = words[3];
        //                 }
        //                 var info: { name: string, type: UniformTypeEnum } = { name: n, type: UniformTypeEnum.Float };
        //                 this.mapUniform[n] = info;
        //                 //info.name = n;
        //                 if (t == "sampler2D")
        //                 {
        //                     info.type = UniformTypeEnum.Texture;
        //                     //info.defvalue = null;
        //                 }
        //                 else if (t == "float" && line.indexOf("[") >= 0 && line.indexOf("]") >= 0)
        //                 {
        //                     info.type = UniformTypeEnum.Floatv;
        //                 }
        //                 else if (t == "float")
        //                 {
        //                     info.type = UniformTypeEnum.Float;
        //                     //info.defvalue = 0;
        //                 }
        //                 else if (t == "vec4" && line.indexOf("[") >= 0 && line.indexOf("]") >= 0)
        //                 {
        //                     info.type = UniformTypeEnum.Float4v;
        //                 }
        //                 else if (t == "vec4")
        //                 {
        //                     info.type = UniformTypeEnum.Float4;
        //                     //info.defvalue = new TSM.vec4(0, 0, 0, 0);
        //                 }
        //                 else if (t == "mat4" && line.indexOf("[") >= 0 && line.indexOf("]") >= 0)
        //                 {
        //                     info.type = UniformTypeEnum.Float4x4v;
        //                 }
        //                 else if (t == "mat4")
        //                 {
        //                     info.type = UniformTypeEnum.Float4x4;
        //                     //info.defvalue = TSM.mat4.identity;
        //                 }
        //                 else
        //                 {
        //                     throw new Error("uniform type:"+t+" not defined.");
        //                 }
        //             }
        //         }
        //     }
        // }

    }
    /**
     * @private
     */
    export class glProgram
    {
        constructor(vs: glShader, fs: glShader, program: WebGLProgram)
        {
            this.vs = vs;
            this.fs = fs;
            this.program = program;
        }
        initAttribute(webgl: WebGLRenderingContext)
        {
            //绑定vbo和shader顶点格式，这部分应该要区分材质改变与参数改变，可以少切换一些状态
            this.posPos = webgl.getAttribLocation(this.program, "_glesVertex");
            this.posColor = webgl.getAttribLocation(this.program, "_glesColor");
            this.posUV0 = webgl.getAttribLocation(this.program, "_glesMultiTexCoord0");
            this.posUV2 = webgl.getAttribLocation(this.program, "_glesMultiTexCoord1");//猜测
            this.posNormal = webgl.getAttribLocation(this.program, "_glesNormal");//未测试
            this.posTangent = webgl.getAttribLocation(this.program, "_glesTangent");
            this.posBlendIndex4 = webgl.getAttribLocation(this.program, "_glesBlendIndex4");//未测试
            this.posBlendWeight4 = webgl.getAttribLocation(this.program, "_glesBlendWeight4");//未测试
            this.posColorEx = webgl.getAttribLocation(this.program, "_glesColorEx");
        }
        vs: glShader;
        fs: glShader;
        program: WebGLProgram;

        //pos可以穷尽
        posPos: number = -1;
        posNormal: number = -1;
        posTangent: number = -1;
        //可以有双color
        posColor: number = -1;
        posUV0: number = -1;
        posUV2: number = -1;
        posBlendIndex4: number = -1;
        posBlendWeight4: number = -1;

        posColorEx: number = -1;


        mapUniform: { [id: string]: uniform } = {};
        use(webgl: WebGLRenderingContext)
        {
            webgl.useProgram(this.program);
        }

        initUniforms(webgl: WebGLRenderingContext)
        {
            var numUniforms = webgl.getProgramParameter(this.program, webgl.ACTIVE_UNIFORMS);
            for (var i = 0; i < numUniforms; i++) 
            {
                var uniformInfo = webgl.getActiveUniform(this.program, i);
                if (!uniformInfo) break;

                var name = uniformInfo.name;
                // remove the array suffix.
                if (name.substr(-3) === "[0]") 
                {
                  name = name.substr(0, name.length - 3);
                }

                var location = webgl.getUniformLocation(this.program, uniformInfo.name);
                var type = uniformInfo.type;
                var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");

                let _uniform=new uniform();
                _uniform.name=name;
                _uniform.location=location;
                this.mapUniform[name]=_uniform;
                
                if (type === webgl.FLOAT && isArray) {
                    _uniform.type=UniformTypeEnum.Floatv;
                }
                else if (type === webgl.FLOAT) {
                    _uniform.type=UniformTypeEnum.Float;
                }
                else if (type === webgl.FLOAT_VEC4 && isArray) {
                    _uniform.type=UniformTypeEnum.Float4v;
                }
                else if (type === webgl.FLOAT_VEC4) {
                    _uniform.type=UniformTypeEnum.Float4;
                }
                else if (type === webgl.FLOAT_MAT4 && isArray) {
                    _uniform.type=UniformTypeEnum.Float4x4v;
                }
                else if (type === webgl.FLOAT_MAT4) {
                    _uniform.type=UniformTypeEnum.Float4x4;
                }
                else if (type === webgl.SAMPLER_2D) {
                    _uniform.type=UniformTypeEnum.Texture;
                }
                else if (type === webgl.SAMPLER_CUBE) {
                    _uniform.type=UniformTypeEnum.CubeTexture;
                }else{
                    console.log("Unifrom parse Erorr : not have this type!");
                }
            }
        }
    }

    /**
     * @private
     */
    export class shaderPool
    {
        mapVS: { [id: string]: glShader } = {};
        mapFS: { [id: string]: glShader } = {};
        mapProgram: { [id: string]: glProgram } = {};
        disposeVS(webgl: WebGLRenderingContext, id: string)
        {
            webgl.deleteShader(this.mapVS[id].shader);
        }
        disposeFS(webgl: WebGLRenderingContext, id: string)
        {
            webgl.deleteShader(this.mapFS[id].shader);
        }
        disposeProgram(webgl: WebGLRenderingContext, id: string)
        {
            webgl.deleteProgram(this.mapProgram[id].program);
        }
        disposeAll(webgl: WebGLRenderingContext)
        {
            for (var key in this.mapVS)
            {
                this.disposeVS(webgl, key);
            }
            for (var key in this.mapFS)
            {
                this.disposeFS(webgl, key);
            }
            for (var key in this.mapProgram)
            {
                this.disposeProgram(webgl, key);
            }
            this.mapVS = {};
            this.mapFS = {};
            this.mapProgram = {};
        }
        //编译并扫描 attribute 和 uniform
        compileVS(webgl: WebGLRenderingContext, name: string, code: string): glShader
        {
            var vs = webgl.createShader(webgl.VERTEX_SHADER);
            webgl.shaderSource(vs, code);
            webgl.compileShader(vs);
            var r1 = webgl.getShaderParameter(vs, webgl.COMPILE_STATUS);
            if (r1 == false)
            {
                if (confirm("a vs:" + name + " error!!!" + webgl.getShaderInfoLog(vs) + "\n" + "did you want see the code?"))
                {
                    webgl.deleteShader(vs);
                    alert(code);
                }
                return null;
            }
            var s = new glShader(name, ShaderTypeEnum.VS, vs, code);
            this.mapVS[name] = s;
            return s;
        }
        //编译并扫描 attribute 和 uniform
        compileFS(webgl: WebGLRenderingContext, name: string, code: string): glShader
        {
            var fs = webgl.createShader(webgl.FRAGMENT_SHADER);
            webgl.shaderSource(fs, code);
            webgl.compileShader(fs);
            var r1 = webgl.getShaderParameter(fs, webgl.COMPILE_STATUS);
            if (r1 == false)
            {
                if (confirm("a fs:" + name + " error!!!" + webgl.getShaderInfoLog(fs) + "\n" + "did you want see the code?"))
                {
                    webgl.deleteShader(fs);
                    alert(code);
                }
                return null;
            }

            var s = new glShader(name, ShaderTypeEnum.FS, fs, code);
            this.mapFS[name] = s;
            return s;
        }
        //link 并寻找出 attribute pos 和 uniform组
        linkProgram(webgl: WebGLRenderingContext, nameVS: string, nameFS: string): glProgram
        {
            var program = webgl.createProgram();

            webgl.attachShader(program, this.mapVS[nameVS].shader);
            webgl.attachShader(program, this.mapFS[nameFS].shader);

            webgl.linkProgram(program);
            var r3 = webgl.getProgramParameter(program, webgl.LINK_STATUS);
            if (r3 == false)
            {
                alert("vs:" + nameVS + "   fs:" + nameFS + "a webgl program error:" + webgl.getProgramInfoLog(program));
                webgl.deleteProgram(program);
                return null;
            }
            var name = nameVS + "_" + nameFS;
            var glp = new glProgram(this.mapVS[nameVS], this.mapFS[nameFS], program);
            // //合并uniform
            // for (var key in this.mapVS[nameVS].mapUniform)
            // {
            //     var u = this.mapVS[nameVS].mapUniform[key];
            //     glp.mapUniform[key] = { name: u.name, type: u.type, location: null };
            // }
            // for (var key in this.mapFS[nameFS].mapUniform)
            // {
            //     var u = this.mapFS[nameFS].mapUniform[key];
            //     glp.mapUniform[key] = { name: u.name, type: u.type, location: null };
            // }

            // for (var key in glp.mapUniform)
            // {
            //     glp.mapUniform[key].location = webgl.getUniformLocation(program, key);
            // }
            //----------
            glp.initUniforms(webgl);
            glp.initAttribute(webgl);
            this.mapProgram[name] = glp;
            return glp;

        }
        //--------------------------------------shader 版本2
        mapVSString: { [id: string]: string } = {};
        mapFSString: { [id: string]: string } = {};
        
        linkProgrambyPassType(webgl: WebGLRenderingContext, type:string,nameVS: string, nameFS: string):glProgram
        {
            let vsStr=this.mapVSString[nameVS];
            let fsStr=this.mapFSString[nameFS];

            if(type=="base")
            {
                
            }else if(type=="base_fog"||type=="fog")
            {
                vsStr="#define FOG \n"+vsStr;
                fsStr="#define FOG \n"+fsStr;
            }else if(type=="skin")
            {
                vsStr="#define SKIN \n"+vsStr;
                fsStr="#define SKIN \n"+fsStr;   
            }else if(type=="skin_fog")
            {
                vsStr="#define SKIN \n"+"#define FOG \n"+vsStr;
                fsStr="#define SKIN \n"+"#define FOG \n"+fsStr;  
            }else if(type=="lightmap")
            {
                vsStr="#define LIGHTMAP \n"+vsStr;
                fsStr="#define LIGHTMAP \n"+fsStr;     
            }else if(type=="lightmap_fog")
            {
                vsStr="#define LIGHTMAP \n"+"#define FOG \n"+vsStr;
                fsStr="#define LIGHTMAP \n"+"#define FOG \n"+fsStr;    
            }else if(type=="quad")
            {
                vsStr="#define QUAD \n"+vsStr;
                fsStr="#define QUAD \n"+fsStr; 
            }
            this.compileVS(webgl,nameVS+type,vsStr);
            this.compileFS(webgl,nameFS+type,fsStr);
            
            let pro=this.linkProgram(webgl,nameVS+type,nameFS+type);
            return pro;
        }

    }

}