#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D _MainTex;
uniform float _Power;
varying highp vec2 xlv_TEXCOORD0;

const int num_iter = 20;

vec2 barrelDistortion(vec2 coord, float amt)
{
    vec2 cc = coord - 0.5;
    float dist = dot(cc, cc);
    return coord + cc * dist * amt;
}

float linterp(float t)
{
    return clamp(1.0 - abs(2.0 * t - 1.0), 0.0, 1.0);
}

float remap (float t, float a, float b)
{
    return clamp((t - a) / (b - a), 0.0, 1.0);
}

vec3 spectrum_offset(float t)
{
    vec3 ret;
    float lo = step(t, 0.5);
    float hi = 1.0 - lo;
    float w = linterp(remap(t, 1.0 / 6.0, 5.0 / 6.0));
    ret = vec3(lo, 1.0, hi) * vec3(1.0 - w, w, 1.0 - w);
    return pow(ret, vec3(1.0 / 2.2));
}

void main()
{
    vec2 uv = xlv_TEXCOORD0.xy;
    vec3 sumcol = vec3(0.0);
    vec3 sumw = vec3(0.0);
    float reci_num_iter_f = 1.0 / float(num_iter);
    for (int i = 0; i < num_iter; i++)
    {
        float t = float(i) * reci_num_iter_f;
        vec3 w = spectrum_offset(t);
        sumw += w;
        sumcol += w * texture2D(_MainTex, barrelDistortion(uv, _Power * t)).rgb;
    }

    gl_FragData[0] = vec4(sumcol.rgb / sumw, 1.0);
}