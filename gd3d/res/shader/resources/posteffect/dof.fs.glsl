#ifdef GL_FRAGMENT_PRECISION_HIGH  
precision highp float;  
#else  
precision mediump float;  
#endif 

uniform sampler2D _MainTex;//清晰图
uniform sampler2D _BlurTex;//模糊的图
uniform sampler2D _DepthTex;//深度图

uniform highp float _focalDistance;//焦点位置
uniform highp float _farBlurScale;
uniform highp float _nearBlurScale;


varying highp vec2 xlv_TEXCOORD0;

const highp float UnpackDownscale = 255. / 256.; 
// 0..1 -> fraction (excluding 1)
const highp vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );
const highp vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
highp float unpackRGBAToDepth( const in vec4 v ) 
{
    return dot( v, UnpackFactors );
}

void main() 
{
	lowp vec4 basecolor =texture2D(_MainTex,xlv_TEXCOORD0);
    lowp vec4 blurcolor=texture2D(_BlurTex,xlv_TEXCOORD0);
    lowp vec4 depthcolor=texture2D(_DepthTex,xlv_TEXCOORD0);
    highp float depth=unpackRGBAToDepth(depthcolor);


    lowp vec4 finalcolor=basecolor;
    if(depth>_focalDistance)
    {
        depth=clamp((depth-_focalDistance)*_farBlurScale,0.0,1.0);
        finalcolor=mix(basecolor,blurcolor,depth);
        //finalcolor=mix(blurcolor,basecolor,1.0);//为1的时候取basecolor
        //finalcolor=vec4(depth,depth,depth,1.0);
    }
    gl_FragData[0] = finalcolor;
}