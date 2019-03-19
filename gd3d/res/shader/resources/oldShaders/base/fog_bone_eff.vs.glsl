attribute highp vec4 _glesVertex;   
attribute lowp vec4 _glesBlendIndex4;
attribute lowp vec4 _glesBlendWeight4;
attribute mediump vec4 _glesMultiTexCoord0;
uniform highp mat4 glstate_matrix_mvp;
uniform highp vec4 glstate_vec4_bones[110];
uniform lowp float glstate_fog_start;
uniform lowp float glstate_fog_end;
uniform mediump vec4 _MainTex_ST; 
varying lowp float factor;
varying mediump vec2 xlv_TEXCOORD0;
mat4 buildMat4(int index)
{
	vec4 quat = glstate_vec4_bones[index * 2 + 0];
	vec4 translation = glstate_vec4_bones[index * 2 + 1];
	float xy2 = 2.0 * quat.x * quat.y;
	float xz2 = 2.0 * quat.x * quat.z;
	float xw2 = 2.0 * quat.x * quat.w;
	float yz2 = 2.0 * quat.y * quat.z;
	float yw2 = 2.0 * quat.y * quat.w;
	float zw2 = 2.0 * quat.z * quat.w;
	float xx = quat.x * quat.x;
	float yy = quat.y * quat.y;
	float zz = quat.z * quat.z;
	float ww = quat.w * quat.w;
	mat4 matrix = mat4(
	xx - yy - zz + ww, xy2 + zw2, xz2 - yw2, 0,
	xy2 - zw2, -xx + yy - zz + ww, yz2 + xw2, 0,
	xz2 + yw2, yz2 - xw2, -xx - yy + zz + ww, 0,
	translation.x, translation.y, translation.z, 1);
	return matrix;
}
void main()
{                                               
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz = _glesVertex.xyz;  
	
    int i = int(_glesBlendIndex4.x);  
    int i2 =int(_glesBlendIndex4.y);
	int i3 =int(_glesBlendIndex4.z);
	int i4 =int(_glesBlendIndex4.w);
	
    mat4 mat = buildMat4(i)*_glesBlendWeight4.x 
			 + buildMat4(i2)*_glesBlendWeight4.y 
			 + buildMat4(i3)*_glesBlendWeight4.z 
			 + buildMat4(i4)*_glesBlendWeight4.w;
			 
	highp vec4 pos = (glstate_matrix_mvp * mat)* tmpvar_1;
    factor = (glstate_fog_end - abs(pos.z))/(glstate_fog_end - glstate_fog_start); 
    factor = clamp(factor, 0.0, 1.0);  
    gl_Position = pos;

	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;  
}