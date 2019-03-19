attribute highp vec3 _glesVertex;
//attribute lowp vec4 _glesColor;
attribute mediump vec2 _glesMultiTexCoord0;

uniform highp mat4 glstate_matrix_mvp;

uniform mediump vec4 _MainTex_ST;
uniform mediump vec4 _Mask_ST;
uniform mediump vec4 _Main_Color;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;


uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
varying lowp float factor;

void main()
{

    _maintex_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    _mask_uv = _glesMultiTexCoord0.xy * _Mask_ST.xy + _Mask_ST.zw;

	//gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));

    highp vec4 pos = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;
}