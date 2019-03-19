#ifdef GL_FRAGMENT_PRECISION_HIGH  
precision highp float;  
#else  
precision mediump float;  
#endif 

uniform lowp sampler2D _MainTex;
uniform lowp vec4 _MainColor;
uniform float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;
void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);
    if(tmpvar_3.a < _AlphaCut)
        discard;
    gl_FragData[0] = tmpvar_3*_MainColor;
}