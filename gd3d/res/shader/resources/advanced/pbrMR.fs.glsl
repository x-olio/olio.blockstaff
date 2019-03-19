precision mediump  float;

#define PI 3.14159265358979
#define GAMMA 2.2

uniform lowp sampler2D uv_Basecolor;
uniform lowp sampler2D uv_Normal;
uniform sampler2D brdf;
uniform samplerCube u_sky;// IBL
uniform samplerCube u_sky_1;// IBL
uniform samplerCube u_sky_2;// IBL
uniform samplerCube u_sky_3;// IBL
uniform samplerCube u_sky_4;// IBL
uniform lowp vec4 _MainColor;
uniform vec4 glstate_eyepos;

varying vec3 v_pos;
varying mediump vec2 xlv_TEXCOORD0;
varying highp vec4 v_color;

varying vec3 v_normal;
varying mat3 TBN;

#ifdef FOG
uniform lowp vec4 glstate_fog_color;
varying lowp float factor;
#endif

#define fixedAmbient    vec4(1, 1, 1, 1.0)
#define LIGHT_COLOR     vec4(1)
#define LIGHT_DIRECTION vec3(0, 1, 0)
#define DIFFUSE_CTB     dot(normalize(v_normal.xyz), normalize(LIGHT_DIRECTION))
#define DIFFUSE         (DIFFUSE_CTB * 0.5) * LIGHT_COLOR

#define METALLIC    0.1
#define ROUGHNESS   0.7

// uniform float ROUGHNESS;
// uniform float METALLIC;

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

void main()
{
    //gl_FragData[0] = v_color;

    vec4 base = sRGBtoLINEAR(texture2D(uv_Basecolor, xlv_TEXCOORD0));
    // vec4 base = sRGBtoLINEAR(vec4(0.8, 0.69, 0.13,1));
    // if(base.a < 0.1)
    //     discard;



    vec4 fristColor = vec4(v_color.rgb, 1);
    vec3 normalAddation = texture2D(uv_Normal, xlv_TEXCOORD0).rgb * 2.0 - 1.0;

    vec3 L = normalize(LIGHT_DIRECTION);
    vec3 N = normalize(TBN * normalAddation);
    // vec3 N = normalize(v_normal);
    vec3 V = normalize(glstate_eyepos.xyz - v_pos);
    vec3 H = normalize(V + L);
    vec3 R = -normalize(reflect(V, N));

    float NoL = clamp(dot(N, L), 0.001, 1.0);
    float NoV = clamp(abs(dot(N, V)), 0.001, 1.0);
    float NoH = clamp(dot(N, H), 0.0, 1.0);
    float LoH = clamp(dot(L, H), 0.0, 1.0);
    float VoH = clamp(dot(V, H), 0.0, 1.0);

    float roughness = clamp(ROUGHNESS, 0.04, 1.0);
    float alphaRoughness = roughness * roughness;
    float metallic = clamp(METALLIC, 0.0, 1.0);

    vec3 f0 = vec3(0.04);
    f0 = mix(f0, base.rgb, metallic);

    vec3 diffuse = base.rgb * (vec3(1) - f0);
    diffuse *= 1.0 - metallic;
    // diffuse /= PI;

    vec3 F = F_Schlick(VoH, f0);
    float G = G_UE4(NoV, NoH, VoH, NoL, roughness);
    // float G = G_CookTorrance(NoV, NoH, VoH, NoL);
    float D = D_GGX(alphaRoughness, NoH);

    vec3 specContrib = F * G * D / (4.0 * NoL * NoV);
    vec3 diffuseContrib = (1.0 - F) * diffuse * (1.0 - metallic);
    vec3 color = NoL * LIGHT_COLOR.xyz * (diffuseContrib + specContrib * 10.0);
    // color += fixedAmbient.rgb * 0.3;


    // IBL
    vec3 brdf = sRGBtoLINEAR(texture2D(brdf, vec2(NoV, 1.0 - alphaRoughness))).rgb;
    // vec3 IBLcolor = vec3(1);
    vec3 IBLcolor = vec3(1, 0.6, 0);
    // vec3 IBLcolor = sRGBtoLINEAR(textureCube(envTex, R)).rgb + vec3(0.5);

    vec3 IBLspecular = 1.0 * IBLcolor * (f0 * brdf.x + brdf.y);
    color += IBLspecular;
    color += IBLspecular;
    color += IBLspecular;
    color += IBLspecular;
    // color += IBLspecular;
    // color += IBLspecular;
    // color += IBLspecular;


    // Diffuse
    vec4 emission = (fristColor * vec4(color, 1)) + (fristColor * fixedAmbient);



    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    //emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, v_color.a);
    #endif

    gl_FragData[0] = LINEARtoSRGB(emission);
    gl_FragData[0] = LINEARtoSRGB(vec4(V, 1));
    gl_FragData[0] = LINEARtoSRGB(vec4(color, 1));
    // gl_FragData[0] = LINEARtoSRGB(vec4(IBLspecular * 2.0, 1));
    // gl_FragData[0] = LINEARtoSRGB(vec4(pow(1.0 - NoV, 5.0)));
    // gl_FragData[0] = LINEARtoSRGB(vec4(G));
    // gl_FragData[0] = LINEARtoSRGB(vec4(G));
    // gl_FragData[0] = LINEARtoSRGB(vec4(D));
}