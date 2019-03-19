uniform lowp sampler2D _MainTex;                                                 
varying lowp vec4 xlv_COLOR;                                                 
varying mediump vec2 xlv_TEXCOORD0;   
void main() 
{
    lowp vec4 tmpvar_3= (xlv_COLOR * texture2D(_MainTex, xlv_TEXCOORD0));
    lowp vec4 tmpvar_4 = mix(vec4(1.0, 1.0, 1.0, 1.0), tmpvar_3, tmpvar_3.wwww);
    gl_FragData[0] = tmpvar_4;
}