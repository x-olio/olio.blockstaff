uniform sampler2D _MainTex;
uniform lowp float _AlphaCut;
varying highp vec2 xlv_TEXCOORD0;
void main() 
{
    lowp vec3 tmpvar_3 = vec3(xlv_TEXCOORD0.y);
    gl_FragData[0] = vec4(tmpvar_3,1.0);
}