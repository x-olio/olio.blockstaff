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


void main() 
{
    if(texture2D(_asm,_asm_uv).r<0.5)
    {
        discard;
    }
    lowp vec3 baseTex=texture2D(_MainTex,_base_uv).rgb;

    lowp float asi_g=texture2D(_asm,_asm_uv).g;

    lowp vec3 d_color=baseTex*_diffuse;
    lowp vec3 e_color=baseTex*_emitpow*asi_g;
    
    lowp vec3 light = texture2D(_streamlight, _light_uv).rgb* _LightRate*_LightColor.xyz;
    lowp float maskv=texture2D(_asm,_asm_uv).b;
    lowp vec3 mask = vec3(maskv,maskv,maskv);
    light = min(light,mask);

    gl_FragData[0] = vec4(d_color+e_color+light,1.0);
}

