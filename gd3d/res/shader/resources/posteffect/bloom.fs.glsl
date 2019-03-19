#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D       _MainTex;//清晰图
uniform sampler2D       _BlurTex;//模糊高光的图
uniform highp vec4      _MainTex_TexelSize;

uniform highp float     _bloomIntensity;
// 强度 - 附加光（影响到该特效的光源）的全局光强
uniform highp vec4     _blurSpread;
// 模糊扩散 - Frag down sample 的偏移距离
uniform highp float     _bloomThreshold;
// 阈值 - 图像中亮度高于该阈值的区域将产生泛光效果

varying highp vec2      xlv_TEXCOORD0;   // 每个片元的纹素坐标

#define INTENSITY       _bloomIntensity
#define THRESHOLD       _bloomThreshold
#define BLUR_SPREAD     vec2(_blurSpread.xy * _MainTex_TexelSize.xy)

#define tex(t, uv)      texture2D((t), (uv))


float luminance(vec3 rgb) {
    const vec3 w = vec3(0.2125, 0.7154, 0.0721);
    return dot(rgb, w);
}
// Blur spread 扩撒
vec4 fragDownsample(sampler2D image, vec2 uv) {
    vec2 uv2[4];
    uv2[0] = uv + _MainTex_TexelSize.xy * vec2(1.5, 1.5);
    uv2[1] = uv + _MainTex_TexelSize.xy * vec2(-1.5, 1.5);
    uv2[2] = uv + _MainTex_TexelSize.xy * vec2(-1.5, -1.5);
    uv2[3] = uv + _MainTex_TexelSize.xy * vec2(1.5, -1.5);
    vec4 color;
    color += texture2D(image, uv2[0]);
    color += texture2D(image, uv2[1]);
    color += texture2D(image, uv2[2]);
    color += texture2D(image, uv2[3]);
    return max(color/4.0 - THRESHOLD, vec4(0.0)) * INTENSITY;
}
vec4 fastBlur(sampler2D image, vec2 uv, vec2 netFilterWidth) {

    vec4 blur = vec4(0.0);
    vec2 _offset[7];
    vec4 curve[7];
    curve[0] = vec4(0.0205, 0.0205, 0.0205, 0.0);
    curve[1] = vec4(0.0855, 0.0855, 0.0855, 0.0);
    curve[2] = vec4(0.232, 0.232, 0.232, 0.0);
    curve[3] = vec4(0.324, 0.324, 0.324, 1.0);
    curve[4] = vec4(0.232, 0.232, 0.232, 0.0);
    curve[5] = vec4(0.0855, 0.0855, 0.0855, 0.0);
    curve[6] = vec4(0.0205, 0.0205, 0.0205, 0.0);
    // horizontal or vertical blur, defined by netFilterWidth vector
    _offset[0] = uv + netFilterWidth * 3.0;
    _offset[1] = uv + netFilterWidth * 2.0;
    _offset[2] = uv + netFilterWidth;
    _offset[3] = uv;
    _offset[4] = uv - netFilterWidth;
    _offset[5] = uv - netFilterWidth * 2.0;
    _offset[6] = uv - netFilterWidth * 3.0;
    for(int l = 0; l < 7; l++) {
        blur += tex(image, _offset[l]) * curve[l];
    }

    return blur;
}

void main () {
    if(BLUR_SPREAD.x == 0.0 && BLUR_SPREAD.y == 0.0) {    // 不泛光, 只过滤
        gl_FragColor = fragDownsample(_MainTex, xlv_TEXCOORD0);
    } else if(THRESHOLD == 1.0){    // 不过滤, 只泛光
        gl_FragColor = fastBlur(_MainTex, xlv_TEXCOORD0, BLUR_SPREAD);
    } else {    // Final Composition
        vec4 originColor = texture2D(_MainTex, xlv_TEXCOORD0);
        originColor = vec4(originColor.rgb * INTENSITY, originColor.a);
        vec4 bloomColor = texture2D(_BlurTex, xlv_TEXCOORD0);
        gl_FragColor = originColor + bloomColor;
    }

    // vec4 c = texture2D(_MainTex, xlv_TEXCOORD0);
    // vec4 cur_color;
    // cur_color = fastBlur(_MainTex, xlv_TEXCOORD0,BLUR_SPREAD);
    //
    // c = vec4(c.rgb * INTENSITY, c.a) / 2.0;
    // gl_FragColor = c;
}
