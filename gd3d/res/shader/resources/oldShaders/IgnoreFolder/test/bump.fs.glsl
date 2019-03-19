//#extension GL_OES_standard_derivatives : enable

//our texture samplers
uniform highp sampler2D _MainTex;   //diffuse map
uniform highp sampler2D _NormalTex;   //normal map
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp mat4 glstate_matrix_normal;

uniform highp float shiness;
// varying highp vec4 ambient,diffuse,specular;

// varying highp float amb = 0.2;
// varying highp float diff = 0.2;
// varying highp float spec = 0.6;

//values used for shading algorithm...
 //light position, normalized

//attributes from vertex shader
varying highp vec2 xlv_TEXCOORD0;
varying highp vec3 lightdir;
varying highp vec3 halfvec;
varying highp vec3 normal;
varying highp vec3 eyedir;
varying highp vec4 xlv_COLOR;
varying highp vec4 mvPosition;

// highp vec3 calculateTangent(vec3 normal,highp vec3 position,vec2 uv)
// {
// 	highp vec3 dp1 =dFdx(position);
// 	highp vec3 dp2 =dFdy(position);
// 	highp vec2 duv1 = dFdx(uv);
// 	highp vec2 duv2 = dFdy(uv);

// 	highp vec3 dp2perp = cross(dp2, normal);
// 	highp vec3 dp1perp = cross(normal, dp1);
// 	highp vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;

// 	//construct a scale-invariant frame
// 	return tangent;
// }

// highp mat3 cotangentFrame(vec3 normal,highp vec3 position,vec2 uv)
// {
// 	highp vec3 dp1 =dFdx(position);
// 	highp vec3 dp2 =dFdy(position);
// 	highp vec2 duv1 = dFdx(uv);
// 	highp vec2 duv2 = dFdy(uv);

// 	highp vec3 dp2perp = cross(dp2, normal);
// 	highp vec3 dp1perp = cross(normal, dp1);
// 	highp vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
// 	highp vec3 binormal = dp2perp * duv1.y + dp1perp * duv2.y;

// 	//construct a scale-invariant frame
// 	highp float invmax = inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));
// 	return mat3(tangent * invmax, binormal *invmax,normal);
// }


// highp vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) {
//   highp mat3 TBN = cotangentFrame(N, -V, texcoord);
//   return normalize(TBN * map);
// }

void main() {
gl_FragColor=vec4(1,1,1,1);
	// highp vec4 albedo = texture2D(_MainTex, xlv_TEXCOORD0);
	// // ambient = vec4(0.3 * albedo.xyz, 1.0);
	// //RGB of our normal map
	// highp vec3 NormalMap = texture2D(_NormalTex, xlv_TEXCOORD0).rgb;
	// NormalMap = normalize(NormalMap * 2.0 - 1.0);
	// NormalMap.y *= -1.0;

	// highp vec3 vlightdir = normalize(lightdir);
	// highp vec3 veyedir = normalize(eyedir);
	// highp vec3 vnormal = normalize(normal);
	// highp vec3 vhalfvec = normalize(halfvec);


    // highp mat3 TBN = cotangentFrame(vnormal.xyz, -mvPosition.xyz, xlv_TEXCOORD0);

	// vlightdir = normalize(TBN * lightdir);
	// veyedir = normalize(TBN * eyedir);

	// // highp vec3 diffuse = max(dot(vlightdir, vnormal), 0.0);

	// vhalfvec = normalize(vlightdir + veyedir);

	// //highp mat4 normalMatrix = inverse(glstate_matrix_modelview);
	// //normalMatrix = transpose(normalMatrix);
	// //highp vec4 vtangent = normalize(normalMatrix * _Tangent);//T

	// highp float diffusefract = max(dot(vlightdir, NormalMap), 0.0);
	// highp float specularfract = max(dot(vhalfvec, NormalMap) , 0.0);

	// if(specularfract > 0.0)
	// {
	// 	specularfract = pow(specularfract,15);
	// }

	// highp vec3 specular = vec3(1,0,0);

	// //col = baseColor * (amb + diffuse) + specular;
	// gl_FragColor = vec4(diffusefract * albedo.xyz + 0.3 * albedo.xyz + specularfract * specular.xyz,1.0);
	// gl_FragColor = vec4(amb * ambient.xyz * baseColor.xyz
    //              + diff * diffuse.xyz * diffusefract * baseColor.xyz
    //              + spec * specular.xyz * specularfract ,1.0);
}

//mat4 transpose(mat4 inMatrix)
//{
//	vec4 i0 = inMatrix[0];
//	vec4 i1 = inMatrix[1];
//	vec4 i2 = inMatrix[2];
//	vec4 i3 = inMatrix[3];
//	mat4 outMatrix = mat4(
//		vec4(i0.x, i1.x, i2.x, i3.x),
//		vec4(i0.y, i1.y, i2.y, i3.y),
//		vec4(i0.z, i1.z, i2.z, i3.z),
//		vec4(i0.w, i1.w, i2.w, i3.w)
//	);
//	return outMatrix;
//}

//mat4 inverse(mat4 m) {
//	float
//		a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
//		a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
//		a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
//		a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],
//		b00 = a00 * a11 - a01 * a10,
//		b01 = a00 * a12 - a02 * a10,
//		b02 = a00 * a13 - a03 * a10,
//		b03 = a01 * a12 - a02 * a11,
//		b04 = a01 * a13 - a03 * a11,
//		b05 = a02 * a13 - a03 * a12,
//		b06 = a20 * a31 - a21 * a30,
//		b07 = a20 * a32 - a22 * a30,
//		b08 = a20 * a33 - a23 * a30,
//		b09 = a21 * a32 - a22 * a31,
//		b10 = a21 * a33 - a23 * a31,
//		b11 = a22 * a33 - a23 * a32,
//		det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
//	return mat4(
//		a11 * b11 - a12 * b10 + a13 * b09,
//		a02 * b10 - a01 * b11 - a03 * b09,
//		a31 * b05 - a32 * b04 + a33 * b03,
//		a22 * b04 - a21 * b05 - a23 * b03,
//		a12 * b08 - a10 * b11 - a13 * b07,
//		a00 * b11 - a02 * b08 + a03 * b07,
//		a32 * b02 - a30 * b05 - a33 * b01,
//		a20 * b05 - a22 * b02 + a23 * b01,
//		a10 * b10 - a11 * b08 + a13 * b06,
//		a01 * b08 - a00 * b10 - a03 * b06,
//		a30 * b04 - a31 * b02 + a33 * b00,
//		a21 * b02 - a20 * b04 - a23 * b00,
//		a11 * b07 - a10 * b09 - a12 * b06,
//		a00 * b09 - a01 * b07 + a02 * b06,
//		a31 * b01 - a30 * b03 - a32 * b00,
//		a20 * b03 - a21 * b01 + a22 * b00) / det;
//}
//
//mat3 TBN;
//mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) {
//	vec3 dp1 = dFdx(p);
//	vec3 dp2 = dFdy(p);
//	vec2 duv1 = dFdx(uv);
//	vec2 duv2 = dFdy(uv);
//
//	vec3 dp2perp = cross(dp2, N);
//	vec3 dp1perp = cross(N, dp1);
//	vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
//	vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
//
//	float invmax = 1.0 / sqrt(max(dot(T, T), dot(B, B)));
//	return mat3(T * invmax, B * invmax, N);
//}

// highp vec3 cotangentFrame(vec3 normal,highp vec3 position,vec2 uv)
// {
// 	highp vec3 dp1 =dFdx(position);
// 	highp vec3 dp2 =dFdy(position);
// 	highp vec2 duv1 = dFdx(uv);
// 	highp vec2 duv2 = dFdy(uv);

// 	highp vec3 dp2perp = cross(dp2, normal);
// 	highp vec3 dp1perp = cross(normal, dp1);
// 	highp vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
// 	highp vec3 binormal = dp2perp * duv1.y + dp1perp * duv2.y;

// 	//construct a scale-invariant frame
// 	float invmax = inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));
// 	return mat3(tangent * invmax, binormal *invmax,normal);
// }
