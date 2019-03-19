#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D _MainTex;
uniform float _K;
varying highp vec2 xlv_TEXCOORD0;

vec4 xposure(vec4 color, float gray, float ex)
{
    float b = (4. * ex - 1.);
    float a = 1. - b;
    float f = gray * (a * gray + b);
    return color * f;
}

void main()
{
    vec4 color = texture2D(_MainTex, xlv_TEXCOORD0);
    float lum = .3 * color.x + .59 * color.y + .11 * color.z;
    gl_FragData[0] = xposure(color, lum, _K);
}