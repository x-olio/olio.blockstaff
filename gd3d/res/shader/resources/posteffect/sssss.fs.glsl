#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D       _MainTex;//清晰图
uniform sampler2D       _DepthTex;//清晰图
uniform highp vec4      _MainTex_TexelSize;

uniform highp vec4      _BlurDirection;
uniform highp vec4      _BlurOptions;
#define BLUR_WIDTH      _BlurOptions.a
#define BLUR_W_RGB      _BlurOptions.rgb
#define BLUR_W_RGBA     vec4(_BlurOptions.rgb, 1.0)

varying highp vec2      xlv_TEXCOORD0;   // 每个片元的纹素坐标

#define DEPTH_CORRECTION 10000.

const float PackUpscale = 256. / 255.;
// fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.;
// 0..1 -> fraction (excluding 1)
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

float unpackRGBAToDepth( const in vec4 v )
{
    return dot( v, UnpackFactors );
}

vec4 blur(vec2 _step) {
    float w[6];
    w[0] = 0.006;
    w[1] = 0.061;
    w[2] = 0.242;
    w[3] = 0.242;
    w[4] = 0.061;
    w[5] = 0.006;

    float o[6];
    o[0] = -1.0;
    o[1] = -0.6667;
    o[2] = -0.3333;
    o[3] = 0.3333;
    o[4] = 0.6667;
    o[5] = 1.0;
    // Fetch color and depth for current pixel
    vec4 curColor = texture2D(_MainTex, xlv_TEXCOORD0);
    float curDepth = unpackRGBAToDepth(texture2D(_DepthTex, xlv_TEXCOORD0));
    vec4 blur = curColor;
    blur.rgb *= 0.382;
    vec2 finalStep = curColor.a * _step;

    for(int i = 0; i < 6; i++) {
        vec2 offset = xlv_TEXCOORD0 + o[i] * finalStep;
        vec3 color = texture2D(_MainTex, offset).rgb;
        float depth = unpackRGBAToDepth(texture2D(_DepthTex, offset));

        // if the difference in depth is huge, we mix color back to center color:
        float s = min(abs(curDepth - depth) * DEPTH_CORRECTION, 1.0);
        // if(abs(curDepth - depth) > 0.00001) // DEBUG
        //     return vec4(1.0, 1.0, 1.0, 1.0);
        color = mix(color, curColor.rgb, s);

        blur.rgb += w[i] * color;
    }
    return blur;

}


void main () {
    vec4 color = texture2D(_MainTex, xlv_TEXCOORD0);
    vec4 cblur = blur(_MainTex_TexelSize.xy * _BlurDirection.xy * BLUR_WIDTH * 1.);
    gl_FragColor = color + cblur * BLUR_W_RGBA;

}
