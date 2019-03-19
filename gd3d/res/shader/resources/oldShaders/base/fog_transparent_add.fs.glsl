uniform lowp sampler2D _MainTex;
uniform lowp float _AlphaCut;
uniform lowp vec4 glstate_fog_color; 
uniform lowp vec4 _TintColor;

varying lowp float factor; 
varying mediump vec2 xlv_TEXCOORD0;
void main() 
{
    lowp vec4 tmpvar_3 = _TintColor * texture2D(_MainTex, xlv_TEXCOORD0);
    if(tmpvar_3.a < _AlphaCut)
        discard;


    lowp vec4 afterFog = mix(vec4(0,0,0,0), tmpvar_3, factor);
    gl_FragData[0] =afterFog;
}