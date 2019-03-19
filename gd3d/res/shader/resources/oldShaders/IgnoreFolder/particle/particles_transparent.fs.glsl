uniform mediump sampler2D _MainTex;
uniform lowp vec4 _TintColor;
varying lowp vec4 xlv_COLOR;
varying mediump vec2 xlv_TEXCOORD0;          
void main() 
{
    lowp vec4 tmpvar_3 = xlv_COLOR*_TintColor*texture2D(_MainTex, xlv_TEXCOORD0);
    gl_FragData[0] = 4.0*tmpvar_3;
}