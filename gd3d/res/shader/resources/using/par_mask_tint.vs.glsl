attribute highp vec3 _glesVertex;
attribute highp vec4 _glesColor;
attribute mediump vec2 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;

uniform mediump vec4 _Main_Tex_ST;
uniform mediump vec4 _Mask_ST;
varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;

uniform mediump vec4 _Main_Color;
uniform mediump float _mixColorRate;
uniform mediump float _mixAlphaRate;

varying mediump vec4 v_color;

void main()
{
    highp vec4 position=vec4(_glesVertex.xyz,1.0);
	position =glstate_matrix_mvp * position;
	 
    _maintex_uv = _glesMultiTexCoord0.xy * _Main_Tex_ST.xy + _Main_Tex_ST.zw;
    _mask_uv = _glesMultiTexCoord0.xy * _Mask_ST.xy + _Mask_ST.zw;
	v_color=_glesColor*_Main_Color;
	v_color.rgb=v_color.rgb*_mixColorRate;
	v_color.a=v_color.a*_mixAlphaRate;

	gl_Position = position;
}