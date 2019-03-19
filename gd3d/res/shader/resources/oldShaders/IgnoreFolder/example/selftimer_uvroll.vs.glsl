attribute vec4 _glesVertex;   
attribute vec4 _glesMultiTexCoord0;      
uniform highp mat4 glstate_matrix_mvp;
uniform highp float self_timer;
uniform highp float _SpeedU;
uniform highp float _SpeedV;
uniform highp vec4 _MainTex_ST;

varying highp vec2 xlv_TEXCOORD0;

void main()                                     
{                                               
    highp vec4 tmpvar_1 = vec4(_glesVertex.xyz,1);
    highp vec2 _speed = vec2(_SpeedU,_SpeedV);
    xlv_TEXCOORD0 = (_glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw)  + _speed * self_timer;
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}