uniform lowp sampler2D _MainTex;
varying lowp vec4 xlv_COLOR;
uniform lowp float _AlphaCut;
uniform lowp vec4 glstate_fog_color; 

varying lowp float factor;  
varying mediump vec2 xlv_TEXCOORD0;          
void main() 
{
    lowp vec4 outColor = texture2D(_MainTex, xlv_TEXCOORD0);
    if(outColor.a < _AlphaCut)
        discard;
    lowp vec4 tmpvar_3 = xlv_COLOR * outColor;
    lowp vec3 afterFog = mix(glstate_fog_color.rgb, tmpvar_3.rgb, factor);
    gl_FragData[0] = vec4(afterFog,tmpvar_3.a);
}