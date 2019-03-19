uniform sampler2D _MainTex;
uniform highp vec4 threshold;
varying highp vec2 xlv_TEXCOORD0;
void main() 
{
	lowp vec4 color =texture2D(_MainTex,xlv_TEXCOORD0);
    lowp vec3 color0=clamp(color.rgb-threshold.rgb,0.0,1.0);
    //lowp vec3 color0=clamp(color.rgb-vec3(0.5,0.5,0.5),0.0,1.0);
    gl_FragData[0] = vec4(color0,1.0);
}