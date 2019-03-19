uniform sampler2D _MainTex;
varying highp vec2 xlv_TEXCOORD0;
void main() 
{
	lowp vec4 color =texture2D(_MainTex,xlv_TEXCOORD0);
    gl_FragData[0] = color;
}