uniform lowp sampler2D _MainTex;  
varying mediump vec2 _base_uv;
varying lowp vec4 attcolor;

void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, _base_uv);
    lowp vec4 emission=basecolor*attcolor;
    gl_FragData[0] =emission;
}