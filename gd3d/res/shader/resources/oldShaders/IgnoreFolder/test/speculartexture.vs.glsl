attribute vec3 _glesVertex;
attribute vec2 _glesMultiTexCoord0;
attribute vec4 _glesColor;
attribute vec3 _glesNormal;
attribute vec3 _glesTangent;  

uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp vec4 glstate_eyepos;

varying highp vec2 xlv_TEXCOORD0;
varying highp mat3 TBNmat;
//varying highp vec3 normal;
varying highp vec3 worldpos;
varying highp vec3 eyedir;


highp mat3 calBTNMatrix(highp mat3 NormalMatToWorld,highp vec3 _normal,highp vec3 _tangent)
{
    highp vec3 normal=normalize(NormalMatToWorld*_normal);
    highp vec3 tangent=normalize(NormalMatToWorld*_tangent);
    highp vec3 binormal=cross(normal,tangent);
  	return (mat3(tangent,binormal,normal));
}
void main()
{
	//求世界空间法线
  	highp mat3  normalmat = mat3(glstate_matrix_model);

   	TBNmat=calBTNMatrix(normalmat,_glesNormal,_glesTangent);
    //normal=normalmat*_glesNormal;

    worldpos =(glstate_matrix_model * vec4(_glesVertex.xyz, 1.0)).xyz;
	eyedir = glstate_eyepos.xyz - worldpos;

	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

