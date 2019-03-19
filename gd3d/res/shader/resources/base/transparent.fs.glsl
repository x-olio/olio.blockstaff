uniform lowp sampler2D _MainTex;                                                                                                
varying highp vec2 xlv_TEXCOORD0;
uniform lowp float _Alpha;
uniform lowp float _Superimposition;

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif

void main() 
{
    lowp vec4 emission = texture2D(_MainTex, xlv_TEXCOORD0);
    emission.a=emission.a*_Alpha;
    emission.xyz *= _Superimposition;
    //----------------------------------------------------------
    #ifdef FOG
    emission.xyz= mix(glstate_fog_color.xyz, emission.xyz, factor);
    #endif
    gl_FragData[0] = emission;

}