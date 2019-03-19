attribute vec4 _glesVertex;
attribute lowp vec4 _glesMultiTexCoord0;
attribute lowp vec4 _glesMultiTexCoord1;

uniform highp mat4 glstate_matrix_mvp;
uniform lowp vec4 glstate_lightmapOffset;
uniform lowp float glstate_lightmapUV;

uniform lowp vec4 _Splat0_ST;
uniform lowp vec4 _Splat1_ST;
uniform lowp vec4 _Splat2_ST;
uniform lowp vec4 _Splat3_ST;

varying lowp vec2 xlv_TEXCOORD0;
varying lowp vec2 xlv_TEXCOORD1;
varying lowp vec2 uv_Splat0;
varying lowp vec2 uv_Splat1;
varying lowp vec2 uv_Splat2;
varying lowp vec2 uv_Splat3;


void main()
{
    highp vec4 tmpvar_1;
    tmpvar_1.w = 1.0;
    tmpvar_1.xyz = _glesVertex.xyz;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
    uv_Splat0 = _glesMultiTexCoord0.xy * _Splat0_ST.xy + _Splat0_ST.zw;
    uv_Splat1 = _glesMultiTexCoord0.xy * _Splat1_ST.xy + _Splat1_ST.zw;
    uv_Splat2 = _glesMultiTexCoord0.xy * _Splat2_ST.xy + _Splat2_ST.zw;
    uv_Splat3 = _glesMultiTexCoord0.xy * _Splat3_ST.xy + _Splat3_ST.zw;
    
    lowp vec2 beforelightUV = _glesMultiTexCoord1.xy;
    if(glstate_lightmapUV == 0.0)
    {
        beforelightUV = _glesMultiTexCoord0.xy;
    }
    lowp float u = beforelightUV.x * glstate_lightmapOffset.x + glstate_lightmapOffset.z;
    lowp float v = 1.0 - ((1.0 - beforelightUV.y) * glstate_lightmapOffset.y + glstate_lightmapOffset.w);
    xlv_TEXCOORD1 = vec2(u,v);
    
    gl_Position = (glstate_matrix_mvp * tmpvar_1);
}