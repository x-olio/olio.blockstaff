uniform lowp sampler2D _MainTex;
varying lowp vec4 xlv_COLOR;
uniform lowp float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;          
void main() 
{
    lowp vec4 outColor = texture2D(_MainTex, xlv_TEXCOORD0);
    if(outColor.a < _AlphaCut)
        discard;
    lowp vec4 tmpvar_3 = xlv_COLOR * outColor;
    gl_FragData[0] = tmpvar_3;
}