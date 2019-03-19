attribute vec4 _glesVertex;   
attribute mediump vec4 _glesMultiTexCoord0;      
uniform highp mat4 glstate_matrix_mvp;
uniform lowp float glstate_timer;
uniform lowp float _SpeedU;
uniform lowp float _SpeedV;
uniform mediump vec4 _MainTex_ST;

varying mediump vec2 xlv_TEXCOORD0;

void main()                                     
{                                               
    highp vec4 tmpvar_1 = vec4(_glesVertex.xyz,1);
    lowp vec2 _speed = vec2(_SpeedU,_SpeedV);
    xlv_TEXCOORD0 = (_glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw)  + _speed * glstate_timer;
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}