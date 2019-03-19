attribute highp vec3 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;

uniform lowp float glstate_timer;
uniform highp mat4 glstate_matrix_mvp;

uniform mediump vec4 _MainTex_ST;
uniform mediump vec4 _Mask_ST;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _mask_uv;


uniform float _speedu;
uniform float _speedv;


attribute vec4 _glesBlendIndex4;
attribute vec4 _glesBlendWeight4;
uniform highp vec4 glstate_vec4_bones[110];
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

	lowp vec2 _speed= vec2(_speedu,_speedv);
    _maintex_uv = _glesMultiTexCoord0.xy * _MainTex_ST.xy +_MainTex_ST.zw + _speed * glstate_timer;
    _mask_uv = _glesMultiTexCoord0.xy * _Mask_ST.xy + _Mask_ST.zw;

	//gl_Position = (glstate_matrix_mvp * vec4(_glesVertex.xyz, 1.0));

    lowp vec4 tmpvar_1=vec4(_glesVertex.xyz, 1.0);                       
    int i = int(_glesBlendIndex4.x);  
    int i2 =int(_glesBlendIndex4.y);
	int i3 =int(_glesBlendIndex4.z);
	int i4 =int(_glesBlendIndex4.w);
	
    mat4 mat = buildMat4(i)*_glesBlendWeight4.x 
			 + buildMat4(i2)*_glesBlendWeight4.y 
			 + buildMat4(i3)*_glesBlendWeight4.z 
			 + buildMat4(i4)*_glesBlendWeight4.w;
			 
    gl_Position = (glstate_matrix_mvp * mat)* tmpvar_1;
}