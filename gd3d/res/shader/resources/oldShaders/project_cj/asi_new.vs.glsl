attribute highp vec3 _glesVertex;
attribute highp vec3 _glesNormal;
attribute mediump vec2 _glesMultiTexCoord0;

uniform lowp float glstate_timer;
uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;

uniform mediump vec4 _MainTex_ST;
uniform mediump vec4 _asm_ST;
uniform mediump vec4 _streamLight_ST;

uniform lowp float _speedu;
uniform lowp float _speedv;

uniform lowp float _lightAngleSpeed;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _asm_uv;
varying mediump vec2 _light_uv;
varying highp vec3 normalDir;
varying mediump	float angle;

void main()
{

	_maintex_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
	_asm_uv = _glesMultiTexCoord0.xy * _asm_ST.xy + _asm_ST.zw;
	lowp vec2 _speed= vec2(_speedu,_speedv);
    _light_uv =_speed * glstate_timer;
 	angle=_lightAngleSpeed*glstate_timer;

   	mediump vec3 temnormal=mat3(glstate_matrix_model)*_glesNormal;
	normalDir=temnormal;
	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

