namespace gd3d.render
{
    export class shaderUniform
    {
        static texindex:number=0;
        static applyuniformFunc:{[type:number]:(location,value)=>void}={};
        static webgl:WebGLRenderingContext;
        static initApplyUnifmFunc()
        {
            this.applyuniformFunc[UniformTypeEnum.Float]=(location,value)=>{//number
                this.webgl.uniform1f(location,value);
            };
            this.applyuniformFunc[UniformTypeEnum.Floatv]=(location,value)=>{//Float32Array
                this.webgl.uniform1fv(location,value);
            };
            this.applyuniformFunc[UniformTypeEnum.Float4]=(location,value)=>{//vector4
                this.webgl.uniform4f(location,value.x,value.y,value.z,value.w);
            };

            this.applyuniformFunc[UniformTypeEnum.Float4v]=(location,value)=>{//Float32Array
                this.webgl.uniform4fv(location,value);
            };

            this.applyuniformFunc[UniformTypeEnum.Float4x4]=(location,value)=>{//matrix
                this.webgl.uniformMatrix4fv(location,false,value.rawData);
            };

            this.applyuniformFunc[UniformTypeEnum.Float4x4v]=(location,value)=>{//Float32Array
                this.webgl.uniformMatrix4fv(location,false,value);
            };
            this.applyuniformFunc[UniformTypeEnum.Texture]=(location,value)=>{//texture
                var tex = value.glTexture.texture;
                this.webgl.activeTexture(render.webglkit.GetTextureNumber(this.webgl, this.texindex));
                this.webgl.bindTexture(this.webgl.TEXTURE_2D, tex);
                this.webgl.uniform1i(location, this.texindex);
                this.texindex++;
            };
            this.applyuniformFunc[UniformTypeEnum.CubeTexture]=(location,value)=>{//cubetexture
                var tex = value.glTexture.texture;
                this.webgl.activeTexture(render.webglkit.GetTextureNumber(this.webgl, this.texindex));
                this.webgl.bindTexture(this.webgl.TEXTURE_CUBE_MAP, tex);
                this.webgl.uniform1i(location, this.texindex);
                this.texindex++;
            };
        }
    }
}