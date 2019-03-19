attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;
attribute mediump vec4 _glesMultiTexCoord1;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 glstate_lightmapOffset;
uniform mediump float glstate_lightmapUV;

uniform mediump vec4 _Splat0_ST;
uniform mediump vec4 _Splat1_ST;
uniform mediump vec4 _Splat2_ST;
uniform mediump vec4 _Splat3_ST;
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;

varying lowp float factor;
varying mediump vec2 xlv_TEXCOORD0;
varying mediump vec2 xlv_TEXCOORD1;
varying mediump vec2 uv_Splat0;
varying mediump vec2 uv_Splat1;
varying mediump vec2 uv_Splat2;
varying mediump vec2 uv_Splat3;


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
    lowp float v = beforelightUV.y * glstate_lightmapOffset.y + glstate_lightmapOffset.w;
    xlv_TEXCOORD1 = vec2(u,v);
    
    highp vec4 pos = (glstate_matrix_mvp * tmpvar_1);
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;
}