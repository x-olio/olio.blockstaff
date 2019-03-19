#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI          3.141592653589

uniform vec4        light_1;
uniform vec4        light_2;

uniform samplerCube u_sky;      // IBL
uniform samplerCube u_sky_1;    // IBL
uniform samplerCube u_sky_2;    // IBL
uniform samplerCube u_sky_3;    // IBL
uniform samplerCube u_sky_4;    // IBL
// uniform samplerCube u_sky_5;    // IBL

uniform sampler2D   brdf;       // BRDF LUT
uniform vec4        glstate_eyepos;

// PBR 材质贴图
uniform sampler2D   uv_Normal;
uniform sampler2D   uv_Basecolor;
uniform sampler2D   uv_MetallicRoughness;
uniform sampler2D   uv_AO;

// Customize value
uniform vec4        CustomBasecolor;
uniform float       CustomMetallic;
uniform float       CustomRoughness;

#define TEX_FORMAT_METALLIC     rgb
#define TEX_FORMAT_ROUGHNESS    a

varying vec3        v_normal;
varying vec3        v_pos;
varying vec2        xlv_TEXCOORD0;

vec3 Fresnel(vec3 f0, float LoN, float roughness) {
    return f0 + (max(vec3(1.0 - roughness), f0) - f0) * pow(1.0 - LoN, 5.0);
}

float Distribution(float roughness, float NoH) {
    float alpha = roughness * roughness;
    float alphaSq = alpha * alpha;
    float NoHsqr = NoH * NoH;
    return alphaSq / (pow( NoHsqr * alphaSq - NoHsqr + 1.0, 2.0) * PI);;
}

float Geometric(float roughness, float NoL, float NoV) {
    float k = pow(roughness + 1.0, 2.0) / 8.0;
    float Gl = NoL / ((NoL - NoL * k) + k);
    float Gv = NoV / ((NoV - NoV * k) + k);
    return Gl * Gv;
}

mat3 cotangent_frame(vec3 N, vec3 p, vec2 uv){
    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx( p );
    vec3 dp2 = dFdy( p );
    vec2 duv1 = dFdx( uv );
    vec2 duv2 = dFdy( uv );

    // solve the linear system
    vec3 dp2perp = cross( dp2, N );
    vec3 dp1perp = cross( N, dp1 );
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

    // construct a scale-invariant frame
    float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );
    return mat3( T * invmax, B * invmax, N );
}

vec3 getIBL(float roughness, vec3 r) {
    float a = roughness * 4.0;

    if ( a < 1.0)   return mix(textureCube(u_sky, r).rgb, textureCube(u_sky_1, r).rgb, a);
    if ( a < 2.0)   return mix(textureCube(u_sky_1, r).rgb, textureCube(u_sky_2, r).rgb, a - 1.0);
    if ( a < 3.0)   return mix(textureCube(u_sky_2, r).rgb, textureCube(u_sky_3, r).rgb, a - 2.0);
    if ( a < 4.0)   return mix(textureCube(u_sky_3, r).rgb, textureCube(u_sky_4, r).rgb, a - 3.0);
    // if ( a < 5.0)   return mix(textureCube(u_sky_4, r).rgb, textureCube(u_sky_5, r).rgb, a - 4.0);

    return textureCube(u_sky_4,r).xyz;
}

struct st_core {
    vec3    f0;
    float   Roughness;
    vec4    Basecolor;
    vec4    Normal;
    vec3    Metallic;
    vec4    AO;
    vec3    N;
    vec3    V;
    vec3    L;
    vec3    H;
    vec3    R;
    float   NdotV;
    float   NdotL;
    float   LdotH;
};

st_core init() {
    st_core temp;

    // PBR Material
    temp.Basecolor  = texture2D(uv_Basecolor, xlv_TEXCOORD0) * CustomBasecolor;
    temp.Normal     = texture2D(uv_Normal, xlv_TEXCOORD0);
    temp.Metallic   = texture2D(uv_MetallicRoughness, xlv_TEXCOORD0).TEX_FORMAT_METALLIC * CustomMetallic;
    temp.Roughness  = texture2D(uv_MetallicRoughness, xlv_TEXCOORD0).TEX_FORMAT_ROUGHNESS * CustomRoughness;
    temp.AO         = texture2D(uv_AO, xlv_TEXCOORD0);

    vec3 f0 = vec3(0.04);
    temp.f0 = mix(f0, temp.Basecolor.xyz, temp.Metallic);

    temp.V = normalize(glstate_eyepos.xyz - v_pos);
    temp.N = normalize(v_normal);
    mat3 TBN = cotangent_frame(temp.N, temp.V, xlv_TEXCOORD0);
    vec3 normalAddation = temp.Normal.rgb * 2.0 - 1.0;
    temp.N = normalize(TBN * normalAddation);
    temp.NdotV = abs(dot(temp.N, temp.V));
    temp.R = reflect(-temp.V,temp.N);

    return temp;
}

vec3 lightBRDF(vec3 L, st_core c) {
    L = normalize(L);
    vec3 H = normalize(c.V + L);

    float LoH = max(0.0, dot(L, H));
    float NoH = max(0.0, dot(c.N, H));
    float NoL = max(0.001, dot(c.N, L));
    float NoV = max(0.0, c.NdotV);
    float roughness = clamp(c.Roughness, 0.05, 0.9999999);  // NOTE: in case roughness equal 0

    vec3 diffuse = c.Basecolor.rgb * NoL / PI;

    vec3 F = Fresnel(c.f0, LoH, roughness);
    float D = Distribution(roughness, NoH);
    float G = Geometric(roughness, NoL, NoV);

    vec3 specular = D * F * G / (4.0 * NoL * NoV);
    return max(vec3(0.0), diffuse + specular);
}

void main () {
    st_core c = init();

    vec3 envLight   = getIBL(c.Roughness, c.R);
    vec2 envBRDF    = texture2D(brdf, vec2(clamp(c.NdotV, 0.0, 0.9999999), clamp(1.0-c.Roughness, 0.0, 0.9999999))).rg;

    vec3 F = Fresnel(c.f0, c.NdotV, c.Roughness);
    vec3 indirectSpecular = envLight * (F * envBRDF.r + envBRDF.g) * vec3(0.3, 0.4, 0.8);

    vec3 finalColor = vec3(0.0);
    finalColor += lightBRDF(light_1.xyz, c) * vec3(0.6, 0.4, 0.6);
    finalColor += lightBRDF(light_2.xyz - v_pos, c) * vec3(0.6, 0.6, 0.4);
    finalColor += ((1.0 - F) * (1.0 - c.Metallic) * c.Basecolor.rgb + indirectSpecular) * c.AO.rgb; // IBL+PBR

    gl_FragColor = vec4(finalColor, 1.0);
}