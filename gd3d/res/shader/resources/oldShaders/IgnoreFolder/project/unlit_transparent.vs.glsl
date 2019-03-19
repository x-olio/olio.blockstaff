attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MaskTex_ST;  
varying mediump vec2 xlv_TEXCOORD0;

void main()
{
    highp vec4 tmpvar_1;
    tmpvar_1.w = 1.0;
    tmpvar_1.xyz = _glesVertex.xyz;
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MaskTex_ST.xy + _MaskTex_ST.zw;  
    gl_Position = (glstate_matrix_mvp * tmpvar_1);
}