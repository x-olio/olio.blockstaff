
// in  attributes from our SpriteBatch
attribute vec4 _glesVertex;
attribute vec2 _glesMultiTexCoord0;
attribute vec4 _glesColor;
attribute vec3 _glesNormal;

uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp mat4 glstate_matrix_normal;
uniform highp vec4 eyepos;
uniform highp vec4 lightpos;

// out  varyings to our fragment shader
varying highp vec4 xlv_COLOR;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec3 lightdir;
varying highp vec3 halfvec;
varying highp vec3 normal;
varying highp vec3 eyedir;
varying highp vec4 mvPosition;


void main()
{
	mvPosition = (glstate_matrix_modelview * vec4(_glesVertex.xyz, 1.0));
	mvPosition = (mvPosition / mvPosition.w);

	highp vec4 vlightpos = (glstate_matrix_modelview * vec4(lightpos.xyz,1.0));
	highp vec4 veyepos = (glstate_matrix_modelview * vec4(eyepos.xyz,1.0));

	lightdir = normalize(vlightpos.xyz - mvPosition.xyz);
	eyedir = normalize(veyepos.xyz - mvPosition.xyz);

    //求世界空间法线
    highp mat4 normalmat = glstate_matrix_model;
    normalmat[3] =vec4(0,0,0,1);
    normal =normalize((vec4(_glesNormal,1)*normalmat).xyz);

	xlv_COLOR = _glesColor;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}




