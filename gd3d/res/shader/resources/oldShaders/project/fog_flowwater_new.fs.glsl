uniform lowp sampler2D _MainTex;  
varying mediump vec2 _base_uv;
varying lowp vec4 attcolor;


uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;

void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, _base_uv);
    lowp vec4 emission=basecolor*attcolor;

    lowp vec4 afterfog=mix(vec4(0,0,0,0), emission, factor);
    gl_FragData[0] = afterfog;
}