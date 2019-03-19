attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;

varying mediump vec2 _base_uv;


void main()
{
	_base_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;

	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

