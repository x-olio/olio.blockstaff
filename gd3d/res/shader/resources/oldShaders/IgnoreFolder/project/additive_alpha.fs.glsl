uniform lowp sampler2D _MainTex;  
uniform lowp vec4 _MainColor;
uniform lowp float _alpha;
varying mediump vec2 _base_uv;

void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, _base_uv)*_MainColor;
    lowp float alpha=_alpha*tmpvar_3.a;
    gl_FragData[0] =vec4(tmpvar_3.xyz,alpha);
}