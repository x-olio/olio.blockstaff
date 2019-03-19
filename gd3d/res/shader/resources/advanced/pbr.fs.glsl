#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI          3.141592653589
#define GAMMA 2.2

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

#ifdef FOG
uniform lowp vec4 glstate_fog_color;
varying lowp float factor;
#endif

vec4 sRGBtoLINEAR(vec4 color) {
    return vec4(pow(color.rgb, vec3(GAMMA)), color.a);
}
vec4 LINEARtoSRGB(vec4 color) {
    return vec4(pow(color.rgb, vec3(1.0/GAMMA)), color.a);
}


// Fresnel - F0 = Metalness
vec3 F_Schlick(float VoH, vec3 F0) {
    return F0 + (vec3(1) - F0) * pow(1.0 - VoH, 5.0);
}
// vec3 Fresnel_CookTorrance(float VoH, vec3 F0) {
// }
vec3 F_UE4(float VoH, vec3 F0) {
    return F0 + (vec3(1.0) - F0) * pow(2.0, (-5.55473 * VoH - 6.98316) * VoH);
}


// Geometric
float G_CookTorrance(float NoV, float NoH, float VoH, float NoL) {
    return min(min(2.0 * NoV * NoH / VoH, 2.0 * NoL * NoH / VoH), 1.0);
}
// >    Schlick with k = α/2 matches Smith very closely
float G_UE4(float NoV, float NoH, float VoH, float NoL, float roughness) {
    float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
    float l = NoL / (NoL * (1.0 - k) + k);  // There are another version which use NoH & LoH
    float v = NoV / (NoV * (1.0 - k) + k);
    return l * v;
}


// a (alphaRoughness) = Roughness
// Distribution AKA normal distribution function (NDF)
// Trowbridge-Reitz
float D_GGX(float a, float NoH) {
    a = a * a;
    // float f = (NoH * a - NoH) * NoH + 1.0;  // NoH * NoH * (a - 1.0) + 1.0;
    float f = NoH * NoH * (a - 1.0) + 1.0;
    return a / (PI * f * f);
}



// vec3 Fresnel(vec3 f0, float LoN, float roughness) {
//     return f0 + (max(vec3(1.0 - roughness), f0) - f0) * pow(1.0 - LoN, 5.0);
// }

// float Distribution(float roughness, float NoH) {
//     float alpha = roughness * roughness;
//     float alphaSq = alpha * alpha;
//     float NoHsqr = NoH * NoH;
//     return alphaSq / (pow( NoHsqr * alphaSq - NoHsqr + 1.0, 2.0) * PI);;
// }

// float Geometric(float roughness, float NoL, float NoV) {
//     float k = pow(roughness + 1.0, 2.0) / 8.0;
//     float Gl = NoL / ((NoL - NoL * k) + k);
//     float Gv = NoV / ((NoV - NoV * k) + k);
//     return Gl * Gv;
// }

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
    float   alphaRoughness;
    vec4    Basecolor;
    vec4    Normal;
    vec3    Metallic;
    vec4    AO;
    vec3    diffuse;
    vec3    N;
    vec3    V;
    vec3    L;
    vec3    H;
    vec3    R;
    float   NoV;
    float   NoL;
    float   LoH;
};

st_core init() {
    st_core temp;

    // PBR Material
    temp.Basecolor  = sRGBtoLINEAR(texture2D(uv_Basecolor, xlv_TEXCOORD0)) * CustomBasecolor;
    temp.Normal     = texture2D(uv_Normal, xlv_TEXCOORD0);
    temp.Metallic   = sRGBtoLINEAR(texture2D(uv_MetallicRoughness, xlv_TEXCOORD0)).TEX_FORMAT_METALLIC * CustomMetallic;
    temp.Roughness  = sRGBtoLINEAR(texture2D(uv_MetallicRoughness, xlv_TEXCOORD0)).TEX_FORMAT_ROUGHNESS * CustomRoughness;
    temp.AO         = sRGBtoLINEAR(texture2D(uv_AO, xlv_TEXCOORD0));
    temp.alphaRoughness = temp.Roughness * temp.Roughness;

    vec3 f0 = vec3(0.04);
    temp.f0 = mix(f0, temp.Basecolor.xyz, temp.Metallic);

    temp.diffuse = temp.Basecolor.rgb * (vec3(1) - f0);
    temp.diffuse *= 1.0 - temp.Metallic;
    temp.diffuse/=PI;

    temp.V = normalize(glstate_eyepos.xyz - v_pos);
    temp.N = normalize(v_normal);
    mat3 TBN = cotangent_frame(temp.N, temp.V, xlv_TEXCOORD0);
    vec3 normalAddation = temp.Normal.rgb * 2.0 - 1.0;
    temp.N = normalize(TBN * normalAddation);

    temp.NoV = clamp(abs(dot(temp.N,temp.V)),0.001,1.0);
    temp.R = -normalize(reflect(temp.V,temp.N));

    return temp;
}

vec3 lightBRDF(vec3 L, st_core core) {
    L = normalize(L);
    vec3 H = normalize(core.V + L);

    float NoL = clamp(dot(core.N, L), 0.001, 1.0);
    float NoH = clamp(dot(core.N, H), 0.0, 1.0);
    float LoH = clamp(dot(L, H), 0.0, 1.0);
    float VoH = clamp(dot(core.V, H), 0.0, 1.0);

    vec3 diffuse = core.Basecolor.rgb * NoL / PI;

    vec3 F = F_Schlick(VoH, core.f0);
    float G = G_UE4(core.NoV, NoH, VoH, NoL, core.Roughness);
    float D = D_GGX(core.alphaRoughness, NoH);

    vec3 specContrib = F * G * D / (4.0 * NoL * core.NoV);
    vec3 diffuseContrib = (1.0 - F) * core.diffuse * (1.0 - core.Metallic);
    vec3 color = NoL * (diffuseContrib + specContrib);

    return color;
}

void main () {
    st_core c = init();

    vec3 envLight   = sRGBtoLINEAR(vec4(getIBL(c.Roughness, c.R),1)).rgb;
    // vec2 envBRDF    = texture2D(brdf, vec2(clamp(c.NoV, 0.0, 0.9999999), clamp(1.0-c.Roughness, 0.0, 0.9999999))).rg;

    // vec3 F = Fresnel(c.f0, c.NdotV, c.Roughness);
    // vec3 indirectSpecular = envLight * (F * envBRDF.r + envBRDF.g) * vec3(0.3, 0.4, 0.8);

    vec3 finalColor = vec3(0.0);
    finalColor += lightBRDF(light_1.xyz, c) * vec3(0.6, 0.4, 0.6) * 5.0;
    finalColor += lightBRDF(light_2.xyz - v_pos, c) * vec3(0.6, 0.6, 0.4);
    // finalColor += ((1.0 - F) * (1.0 - c.Metallic) * c.Basecolor.rgb + indirectSpecular) * c.AO.rgb; // IBL+PBR

    vec3 brdf = sRGBtoLINEAR(texture2D(brdf, vec2(clamp(c.NoV, 0.0, 0.8), clamp(1.0 - c.alphaRoughness, 0.0, 0.8)))).rgb;
    vec3 IBLspecular = 1.0 * envLight * (c.f0 * brdf.x + brdf.y);
    finalColor += IBLspecular;


#ifdef FOG
    finalColor.xyz = mix(glstate_fog_color.rgb, finalColor.rgb, factor);
#endif

    gl_FragColor = LINEARtoSRGB(vec4(finalColor, 1.0));
}