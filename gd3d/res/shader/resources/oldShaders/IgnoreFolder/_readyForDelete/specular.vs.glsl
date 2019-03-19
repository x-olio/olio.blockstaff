attribute vec3 _glesVertex;
attribute vec2 _glesMultiTexCoord0;
attribute vec3 _glesNormal;

uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;
uniform highp vec4 _base_ST;
uniform highp vec4 _emit_ST;



varying highp vec2 _base_uv;
varying highp vec2 _emit_uv;
varying lowp vec4 xlv_COLOR;     
varying highp vec3 Normalinworld;
varying highp vec3 worldpos; 


void main()
{
	_base_uv = _glesMultiTexCoord0.xy * _base_ST.xy + _base_ST.zw;
	_emit_uv = _glesMultiTexCoord0.xy * _emit_ST.xy + _emit_ST.zw;

	    //求世界空间法线
    highp mat3 normalmat = mat3(glstate_matrix_model);
    Normalinworld =normalize(normalmat*_glesNormal);

    worldpos =(glstate_matrix_model * vec4(_glesVertex.xyz, 1.0)).xyz;

    highp float diff=0.0;
    //calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
     
    // xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;     

	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

