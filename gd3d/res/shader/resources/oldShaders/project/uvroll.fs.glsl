uniform lowp sampler2D _MainTex;
uniform lowp float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;
void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);
    if(tmpvar_3.a < _AlphaCut)
        discard;
    gl_FragData[0] = tmpvar_3;
}