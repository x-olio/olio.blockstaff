uniform lowp sampler2D _MainTex;
uniform lowp sampler2D _LightTex;
uniform lowp vec4 _LightColor;
uniform lowp float _LightRate;
uniform lowp sampler2D _MaskTex;
uniform lowp float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;
varying mediump vec2 _StreamLightUV;
void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);
    if(tmpvar_3.a < _AlphaCut)
        discard;

    lowp vec4 light = texture2D(_LightTex, _StreamLightUV) * _LightColor * _LightRate;
    lowp vec4 mask = texture2D(_MaskTex, xlv_TEXCOORD0);
    light = min(light,mask);

    tmpvar_3.rgb += light.rgb;
    
    gl_FragData[0] = tmpvar_3;
}