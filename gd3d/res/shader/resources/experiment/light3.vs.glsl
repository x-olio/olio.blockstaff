
// in  attributes from our SpriteBatch
attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;
attribute vec4 _glesColor;
attribute lowp vec3 _glesNormal;
attribute lowp vec3 _glesTangent;  

uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp vec4 glstate_eyepos;

uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];



// out  varyings to our fragment shader
//varying highp vec4 xlv_COLOR;
//varying highp vec3 xlv_Position;      
varying mediump vec2 xlv_TEXCOORD0;
//varying highp vec3 xlv_Normal;

//varying highp mat4 normalmat;
varying lowp mat3 TBNmat;
varying lowp vec3 worldpos;
varying lowp vec3 eyedir;


lowp mat3 calBTNMatrix(lowp mat4 NormalMatToWorld,lowp vec3 _normal,lowp vec3 _tangent)
{
    lowp vec3 normal=normalize(vec3(NormalMatToWorld*vec4(_normal,0.0)));
    lowp vec3 tangent=normalize(vec3(NormalMatToWorld*vec4(_tangent,0.0)));
    lowp vec3 binormal=cross(normal,tangent);
  	return (mat3(tangent,binormal,normal));

}
void main()
{
	//求世界空间法线
  	highp mat4  normalmat = glstate_matrix_model;
	normalmat[3] =vec4(0,0,0,1);

   	TBNmat=calBTNMatrix(normalmat,_glesNormal,_glesTangent);

    worldpos =(glstate_matrix_model * vec4(_glesVertex.xyz, 1.0)).xyz;
	eyedir = glstate_eyepos.xyz - worldpos;

	//xlv_COLOR = _glesColor;
	//xlv_Normal = _glesNormal;
	//xlv_Position = _glesVertex.xyz;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
	gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
}

