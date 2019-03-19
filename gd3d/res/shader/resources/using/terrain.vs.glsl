attribute vec4 _glesVertex;
attribute lowp vec4 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;

uniform lowp vec4 _Splat0_ST;
uniform lowp vec4 _Splat1_ST;
uniform lowp vec4 _Splat2_ST;
uniform lowp vec4 _Splat3_ST;

varying lowp vec2 xlv_TEXCOORD0;
varying lowp vec2 uv_Splat0;
varying lowp vec2 uv_Splat1;
varying lowp vec2 uv_Splat2;
varying lowp vec2 uv_Splat3;

#ifdef LIGHTMAP
attribute mediump vec4 _glesMultiTexCoord1;
uniform mediump vec4 glstate_lightmapOffset;
varying mediump vec2 lightmap_TEXCOORD;
#endif

#ifdef FOG
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
varying lowp float factor;
#endif

void main()
{
    highp vec4 position=vec4(_glesVertex.xyz,1.0);

	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
    uv_Splat0 = _glesMultiTexCoord0.xy * _Splat0_ST.xy + _Splat0_ST.zw;
    uv_Splat1 = _glesMultiTexCoord0.xy * _Splat1_ST.xy + _Splat1_ST.zw;
    uv_Splat2 = _glesMultiTexCoord0.xy * _Splat2_ST.xy + _Splat2_ST.zw;
    uv_Splat3 = _glesMultiTexCoord0.xy * _Splat3_ST.xy + _Splat3_ST.zw;
    

    //----------------------------------------------------------
    #ifdef LIGHTMAP
    mediump vec2 beforelightUV = _glesMultiTexCoord1.xy;
    lowp float u = beforelightUV.x * glstate_lightmapOffset.x + glstate_lightmapOffset.z;
    lowp float v = beforelightUV.y * glstate_lightmapOffset.y + glstate_lightmapOffset.w;
    lightmap_TEXCOORD = vec2(u,v);
    #endif

    position = (glstate_matrix_mvp * position);

    #ifdef FOG
    factor = (glstate_fog_end - abs(position.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    #endif

    gl_Position = position;
}