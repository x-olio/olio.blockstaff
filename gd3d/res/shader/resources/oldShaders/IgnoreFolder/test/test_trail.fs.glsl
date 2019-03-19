uniform sampler2D _MainTex;
uniform highp float _AlphaCut;
varying lowp vec4 xlv_COLOR;
varying highp vec2 xlv_TEXCOORD0;          
void main() 
{
    // if(texture2D(_MainTex, xlv_TEXCOORD0).r<_AlphaCut)
    // {
    //     discard;
    // }
    lowp vec3 tmpvar_3 = xlv_COLOR*texture2D(_MainTex, xlv_TEXCOORD0).rgb;

    gl_FragData[0] =vec4(tmpvar_3,tmpvar_3.x) ;
}