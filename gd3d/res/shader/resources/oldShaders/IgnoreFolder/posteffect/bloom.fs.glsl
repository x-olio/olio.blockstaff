uniform sampler2D _MainTex;//清晰图
uniform sampler2D _BlurTex;//模糊高光的图
uniform highp float _bloomFactor;
varying highp vec2 xlv_TEXCOORD0;

void main() 
{
	lowp vec4 basecolor =texture2D(_MainTex,xlv_TEXCOORD0);
    lowp vec4 blurcolor=texture2D(_BlurTex,xlv_TEXCOORD0);
    lowp vec4 finalcolor=vec4(basecolor.rgb+blurcolor.rgb*_bloomFactor,1.0);

    gl_FragData[0] = finalcolor;
}