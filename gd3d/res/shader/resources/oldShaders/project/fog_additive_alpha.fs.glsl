uniform mediump sampler2D _MainTex;  
uniform lowp vec4 _MainColor;
uniform lowp float _alpha;
varying mediump vec2 _base_uv;

uniform lowp vec4 glstate_fog_color; 
varying lowp float factor; 
void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, _base_uv)*_MainColor;
    lowp float alpha=_alpha*tmpvar_3.a;
    lowp vec3 afterFog = mix(vec3(0,0,0), tmpvar_3.rgb, factor);
    gl_FragData[0] = vec4(afterFog,alpha);
}