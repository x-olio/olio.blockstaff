namespace gd3d.framework
{
    export class uniformSetter
    {
        static autoUniformDic:{[name:string]:(context: renderContext)=>any}={};

        static initAutouniform()
        {
            this.autoUniformDic["glstate_matrix_model"]=(context: renderContext)=>{
                return context.matrixModel;
            };
            this.autoUniformDic["glstate_matrix_world2object"]=(context: renderContext)=>{
                return context.matrixWorld2Object;
            };
            this.autoUniformDic["glstate_matrix_view"]=(context: renderContext)=>{
                return context.matrixView;
            };
            this.autoUniformDic["glstate_matrix_project"]=(context: renderContext)=>{
                return context.matrixProject;
            };
            this.autoUniformDic["glstate_matrix_modelview"]=(context: renderContext)=>{
                return context.matrixModelView;
            };
            this.autoUniformDic["glstate_matrix_viewproject"]=(context: renderContext)=>{
                return context.matrixViewProject;
            };
            this.autoUniformDic["glstate_matrix_mvp"]=(context: renderContext)=>{
                return context.matrixModelViewProject;
            };
            this.autoUniformDic["glstate_timer"]=(context: renderContext)=>{
                return context.floatTimer;
            };
            this.autoUniformDic["glstate_lightcount"]=(context: renderContext)=>{
                return context.intLightCount;
            };
            this.autoUniformDic["glstate_vec4_lightposs"]=(context: renderContext)=>{
                return context.vec4LightPos;
            };
            this.autoUniformDic["glstate_vec4_lightdirs"]=(context: renderContext)=>{
                return context.vec4LightDir;
            };
            this.autoUniformDic["glstate_vec4_lightcolors"]=(context: renderContext)=>{
                return context.vec4LightColor;
            };
            this.autoUniformDic["glstate_float_lightrange"]=(context: renderContext)=>{
                return context.floatLightRange;
            };
            this.autoUniformDic["glstate_float_lightintensity"]=(context: renderContext)=>{
                return context.floatLightIntensity;
            };
            this.autoUniformDic["glstate_float_spotangelcoss"]=(context: renderContext)=>{
                return context.floatLightSpotAngleCos;
            };
            this.autoUniformDic["glstate_eyepos"]=(context: renderContext)=>{
                return context.eyePos;
            };
            this.autoUniformDic["_LightmapTex"]=(context: renderContext)=>{
                return context.lightmap;
            };
            this.autoUniformDic["glstate_lightmapOffset"]=(context: renderContext)=>{
                return context.lightmapOffset;
            };
            this.autoUniformDic["glstate_fog_start"]=(context: renderContext)=>{
                return context.fog._Start;
            };
            this.autoUniformDic["glstate_fog_end"]=(context: renderContext)=>{
                return context.fog._End;
            };
            this.autoUniformDic["glstate_fog_color"]=(context: renderContext)=>{
                return context.fog._Color;
            };
            this.autoUniformDic["glstate_vec4_bones"]=(context: renderContext)=>{
                return context.vec4_bones;
            };
            this.autoUniformDic["glstate_matrix_bones"]=(context: renderContext)=>{
                return context.matrix_bones;
            };
        }
    }
}