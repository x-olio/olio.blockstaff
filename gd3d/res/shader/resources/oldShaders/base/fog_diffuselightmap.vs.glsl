attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;
attribute mediump vec4 _glesMultiTexCoord1;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 glstate_lightmapOffset;
uniform mediump float glstate_lightmapUV;
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
uniform mediump vec4 _MainTex_ST; 
varying lowp float factor;
varying mediump vec2 xlv_TEXCOORD0;
varying mediump vec2 xlv_TEXCOORD1;
void main()
{
    highp vec4 tmpvar_1;
    tmpvar_1.w = 1.0;
    tmpvar_1.xyz = _glesVertex.xyz;
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;  
    mediump vec2 beforelightUV = _glesMultiTexCoord1.xy;
    if(glstate_lightmapUV == 0.0)
    {
        beforelightUV = _glesMultiTexCoord0.xy;
    }
    lowp float u = beforelightUV.x * glstate_lightmapOffset.x + glstate_lightmapOffset.z;
    lowp float v = beforelightUV.y* glstate_lightmapOffset.y + glstate_lightmapOffset.w;
    xlv_TEXCOORD1 = vec2(u,v);

    highp vec4 pos = (glstate_matrix_mvp * tmpvar_1);
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;
}