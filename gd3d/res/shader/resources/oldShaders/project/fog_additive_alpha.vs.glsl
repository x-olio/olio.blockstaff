attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST;

uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;

varying lowp float factor;
varying mediump vec2 _base_uv;


void main()
{
	_base_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;

	highp vec4 pos = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;
}