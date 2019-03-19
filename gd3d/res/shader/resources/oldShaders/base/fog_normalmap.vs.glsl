
// in  attributes from our SpriteBatch
attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;
attribute lowp vec4 _glesColor;
attribute lowp vec3 _glesNormal;
attribute lowp vec3 _glesTangent;  

uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform lowp vec4 glstate_eyepos;

uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];
uniform lowp float glstate_lightcount;
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;

varying lowp float factor;

// out  varyings to our fragment shader
varying lowp vec4 xlv_COLOR;
varying lowp vec3 xlv_Position;      
varying mediump vec2 xlv_TEXCOORD0;

varying lowp mat3 TBNmat;
varying lowp vec3 worldpos;


lowp mat3 calBTNMatrix(lowp mat3 NormalMatToWorld,lowp vec3 _normal,lowp vec3 _tangent)
{
    lowp vec3 normal=normalize(NormalMatToWorld*_normal);
    lowp vec3 tangent=normalize(NormalMatToWorld*_tangent);
    lowp vec3 binormal=cross(normal,tangent);
  	return (mat3(tangent,binormal,normal));

}
void main()
{
	//求世界空间法线
    mat3 normalmat = mat3(glstate_matrix_model);
	//normalmat[3] =vec4(0,0,0,1);

   	TBNmat=calBTNMatrix(normalmat,_glesNormal,_glesTangent);

    worldpos =(glstate_matrix_model * vec4(_glesVertex.xyz, 1.0)).xyz;
	//eyedir = glstate_eyepos - worldpos;

	xlv_COLOR = _glesColor;
	xlv_Position = _glesVertex.xyz;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;

	highp vec4 pos = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;
}




