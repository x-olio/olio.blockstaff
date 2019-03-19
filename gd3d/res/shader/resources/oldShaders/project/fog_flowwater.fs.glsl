uniform lowp sampler2D _MainTex;  
uniform lowp vec4 _MainColor;
uniform lowp float _alpha;
uniform lowp vec4 glstate_fog_color; 

varying lowp float factor; 
varying mediump vec2 _base_uv;

void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, _base_uv)*_MainColor;
    tmpvar_3.a=_alpha;

    lowp vec4 afterfog=mix(vec4(0,0,0,0), tmpvar_3, factor);
    gl_FragData[0] = afterfog;
}