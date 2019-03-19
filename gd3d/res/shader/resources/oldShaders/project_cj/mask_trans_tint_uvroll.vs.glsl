attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;

uniform lowp float glstate_timer;
uniform highp mat4 glstate_matrix_mvp;

uniform float _speedu;
uniform float _speedv;

uniform mediump vec4 _MainTex_ST;
uniform mediump vec4 _Mask_ST;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;

void main()
{
	lowp vec2 _speed= vec2(_speedu,_speedv);
    _maintex_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy +_MainTex_ST.zw + _speed * glstate_timer;
    _mask_uv = _glesMultiTexCoord0.xy * _Mask_ST.xy + _Mask_ST.zw;
	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}