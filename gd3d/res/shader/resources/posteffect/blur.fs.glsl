uniform sampler2D _MainTex;
uniform lowp float _BlurGap; //卷积每层间隔单位
uniform highp vec4 _MainTex_TexelSize;
varying highp vec2 xlv_TEXCOORD0;
void main() 
{
	lowp float offset_x = _MainTex_TexelSize.x * _BlurGap;
	lowp float offset_y = _MainTex_TexelSize.y * _BlurGap;
    highp vec4 sample0,sample1,sample2,sample3;
	sample0=texture2D(_MainTex,vec2(xlv_TEXCOORD0.x-offset_x,xlv_TEXCOORD0.y-offset_y));
	sample1=texture2D(_MainTex,vec2(xlv_TEXCOORD0.x+offset_x,xlv_TEXCOORD0.y-offset_y));
	sample2=texture2D(_MainTex,vec2(xlv_TEXCOORD0.x+offset_x,xlv_TEXCOORD0.y+offset_y));
	sample3=texture2D(_MainTex,vec2(xlv_TEXCOORD0.x-offset_x,xlv_TEXCOORD0.y+offset_y));
	highp vec4 color=(sample0+sample1+sample2+sample3) / 4.0;
    gl_FragData[0] = color;
}