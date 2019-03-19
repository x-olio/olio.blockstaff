#ifdef GL_FRAGMENT_PRECISION_HIGH  
precision highp float;  
#else  
precision mediump float;  
#endif 

uniform sampler2D _MainTex;
uniform sampler2D _Light_Depth;

uniform float _AlphaCut;
uniform float _bias;//这个是根据视角算的。这里先偷个懒，外部传个固定值进来

varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 _WorldPos;


const float UnpackDownscale = 255. / 256.; 
const vec3 PackFactors = vec3(256. * 256. * 256., 256. * 256.,  256.);
const vec4 UnpackFactors = UnpackDownscale / vec4(PackFactors, 1.);


float unpackRGBAToDepth(const in vec4 v) 
{
    return dot(v, UnpackFactors);
}

void main() 
{
    lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);

	float shadowDepth = unpackRGBAToDepth(texture2D(_Light_Depth, _WorldPos.xy));
    float worldDepth = (_WorldPos.z +1.)/2.;//不理解这里为啥要做变换。

    float _depth = step(shadowDepth + _bias,worldDepth);
    lowp vec4 temvar_4 = vec4(0.5,0.5,0.5,0) * _depth;

    gl_FragData[0] = tmpvar_3 - temvar_4;
}