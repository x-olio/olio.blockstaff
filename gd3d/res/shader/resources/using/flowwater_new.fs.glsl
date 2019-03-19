uniform lowp sampler2D _MainTex;  
varying mediump vec2 _base_uv;
varying lowp vec4 attcolor;

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif


void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, _base_uv);
    lowp vec4 emission=basecolor*attcolor;

    #ifdef FOG
    //emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    emission= mix(vec4(0,0,0,0), emission, factor);
    #endif

    gl_FragData[0] =emission;
}