uniform lowp sampler2D _MainTex;  
uniform lowp sampler2D _asm;
uniform lowp sampler2D _streamlight;
uniform lowp float _LightRate;
uniform lowp vec4 _LightColor;
uniform lowp float _emitpow;
uniform lowp float _diffuse;
//uniform highp float _Cutoff;


varying mediump vec2 _base_uv;
varying mediump vec2 _asm_uv;
varying mediump vec2 _light_uv;

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif
void main() 
{
    
    lowp vec4 baseTex=texture2D(_MainTex,_base_uv);
    if(baseTex.a<0.5)
    {
        discard;
    }
    lowp vec3 asi=texture2D(_asm,_asm_uv).rgb;
    lowp vec3 d_color=baseTex.rgb*_diffuse;
    lowp vec3 e_color=baseTex.rgb*_emitpow*asi.g;
    lowp vec3 light = texture2D(_streamlight, _light_uv).rgb* _LightRate*_LightColor.xyz;
    light = min(light,asi.b);
    light = light*_LightRate*_LightColor.xyz;
    lowp vec4 emission=vec4(d_color+e_color+light,1.0);

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif

    gl_FragData[0] = emission;
}

