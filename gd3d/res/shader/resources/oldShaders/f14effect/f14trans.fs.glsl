uniform mediump sampler2D _Main_Tex;

varying lowp vec4 xlv_COLOR;
varying mediump vec2 xlv_TEXCOORD0;          
void main() 
{
    lowp vec4 basecolor = texture2D(_Main_Tex, xlv_TEXCOORD0);
    gl_FragData[0] =basecolor*xlv_COLOR;
    //gl_FragData[0] =vec4(1,0,0,1);
}