uniform sampler2D _MainTex; 
uniform sampler2D _Mask; 
uniform mediump vec4 _Main_Color;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;

uniform lowp float _mixColorRate;
uniform lowp float _mixAlphaRate;

varying lowp float factor; 

void main()
{
    highp vec4 basecolor=texture2D(_MainTex,_maintex_uv);
    highp vec4 maskcolor=texture2D(_Mask,_mask_uv);

    lowp vec3 tempcolor=_Main_Color.rgb*basecolor.rgb*maskcolor.rgb*_mixColorRate;
    lowp float tempAlpha=_Main_Color.a*basecolor.a*maskcolor.a*_mixAlphaRate;
    lowp vec4 afterfog=mix(vec4(0,0,0,0), vec4(tempcolor,tempAlpha), factor);

    gl_FragData[0] = afterfog;
}
