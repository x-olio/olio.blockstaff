uniform sampler2D _Main_Tex; 
uniform sampler2D _Mask; 

varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;

varying mediump vec4 v_color;

void main()    
{
    highp vec4 basecolor=texture2D(_Main_Tex,_maintex_uv);
    highp vec4 maskcolor=texture2D(_Mask,_mask_uv);

    mediump vec3 tempcolor=v_color.rgb*basecolor.rgb*maskcolor.rgb;
    mediump float tempAlpha=v_color.a*basecolor.a*maskcolor.a;
    mediump vec4 emission=vec4(tempcolor,tempAlpha);
    
    gl_FragData[0] = emission;
}
