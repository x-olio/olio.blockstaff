uniform lowp sampler2D _MainTex;
uniform lowp sampler2D _LightmapTex;
uniform lowp float _AlphaCut;
uniform lowp vec4 _MainColor;

uniform lowp vec4 glstate_fog_color;  

varying lowp float factor;    
varying mediump vec2 xlv_TEXCOORD0;
varying mediump vec2 xlv_TEXCOORD1;
lowp vec3 decode_hdr(lowp vec4 data)
{
    lowp float power =pow( 2.0 ,data.a * 255.0 - 128.0);
    return data.rgb * power * 2.0 ;
}
void main() 
{
    lowp vec4 outColor = texture2D(_MainTex, xlv_TEXCOORD0);
    outColor*=_MainColor;
    if(outColor.a < _AlphaCut)
        discard;
    lowp vec4 lightmap = texture2D(_LightmapTex, xlv_TEXCOORD1);
    outColor.xyz *= decode_hdr(lightmap);

    lowp vec3 afterFog = mix(glstate_fog_color.rgb, outColor.rgb, factor);

    gl_FragData[0] = vec4(afterFog,outColor.a);
}