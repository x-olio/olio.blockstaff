uniform lowp sampler2D _MainTex;
uniform lowp float _Alpha;                                                                                                
varying highp vec2 xlv_TEXCOORD0;
void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);
    tmpvar_3.w = tmpvar_3.w * _Alpha; 
    gl_FragData[0] = tmpvar_3;
}