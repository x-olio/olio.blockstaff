attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;
uniform lowp float _speedu;
uniform lowp float _speedv;
uniform lowp float glstate_timer;

varying mediump vec2 _base_uv;


void main()
{
    lowp vec2 _speed= vec2(_speedu,_speedv);
	_base_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw+ _speed * glstate_timer;

	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

