precision lowp float;
uniform lowp sampler2D _MainTex;
uniform lowp vec4 _MainColor;
uniform lowp float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;

//light
lowp vec4 xlv_COLOR = vec4(0.0,0.0,0.0,1.0); 
bool hasLight = false;
lowp vec3 fixedAmbient = vec3(0.6,0.6,0.6);
uniform lowp float glstate_lightcount;
uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];
uniform lowp vec4 glstate_vec4_lightcolors[8];
uniform lowp float glstate_float_lightrange[8];
uniform lowp float glstate_float_lightintensity[8];

varying lowp vec3 v_N;
varying lowp vec3 v_Mpos;


#ifdef LIGHTMAP
uniform lowp sampler2D _LightmapTex;
varying mediump vec2 lightmap_TEXCOORD;
lowp vec3 decode_hdr(lowp vec4 data)
{
    lowp float power =pow( 2.0 ,data.a * 255.0 - 128.0);
    return data.rgb * power * 2.0 ;
}
#endif

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif

//calcDiffuse 计算漫反射强度函数
//统一三种光源的传参方式，在函数内混合，方便就不高效
//只需要方向光时另写
//N 世界空间法线
//worldpos 世界空间pos
//lightPos 光源位置,w=0 表示方向光
//lightDir 光源方向，W=0 表示点光源，和楼上的w一起为1 表示 探照灯 spot
//cosspot cos(a) a为spot的半径 a取值0到90度，算好cos再传进来
lowp float calcDiffuse(lowp vec3 N,lowp vec3 worldpos,lowp vec4 lightPos,lowp vec4 lightDir,lowp float cosspot,lowp float range )
{
    lowp vec3 v3 = lightPos.xyz - worldpos;
    lowp float len = length(v3);
    len = len > range ? range : len;
    //求入射角，点光源&聚光灯
    lowp vec3 L = normalize(v3); 
    //求张角 聚光灯 也是方向光入射角
    lowp vec3 L2 = -lightDir.xyz;
    lowp float dotSpot = dot(L,L2);
    //漫反射强度
    lowp float diffuse =clamp(dot(N.xyz,L.xyz),0.0,1.0) * pow(1.0 - len/range,2.0); 
    lowp float diffuseD =clamp(dot(N.xyz,L2.xyz),0.0,1.0); 
    //pos.w 和 dir.w 至少有一个1，刚好组合出三种光源
    diffuse= mix(diffuse,diffuse*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    diffuse= mix(diffuseD,diffuse,lightPos.w);
    return diffuse;
}

void calcCOLOR(){
    int c =int(glstate_lightcount);
	if(c>0){
        hasLight = true;
        lowp float diff=0.0;
		//calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
		for(int i=0;i<8;i++)
		{
			if(i>=c)break;
			//diff += calcDiffuse(v_N,v_Mpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i],glstate_float_lightrange[i]);
			diff = calcDiffuse(v_N,v_Mpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i],glstate_float_lightrange[i]);
            xlv_COLOR += glstate_float_lightintensity[i] * glstate_vec4_lightcolors[i] * diff;
		}
		xlv_COLOR.w = 1.0;  
    }
}

void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, xlv_TEXCOORD0);
    if(basecolor.a < _AlphaCut)
        discard;
    lowp vec4 fristColor=basecolor*_MainColor;
    lowp vec4 emission = fristColor;

    //----------------------------------------------------------
    //light
    calcCOLOR();
    
    #ifdef LIGHTMAP
    lowp vec4 lightmap = texture2D(_LightmapTex, lightmap_TEXCOORD);
    emission.xyz *= decode_hdr(lightmap);
    if(hasLight){ // have light
        fristColor = fristColor * xlv_COLOR ;
        emission = emission + mix(vec4(1.0, 1.0, 1.0, 1.0), fristColor, fristColor.wwww);
    }
    #else
	if(hasLight){ // have light
        emission = (fristColor * xlv_COLOR) + (fristColor * vec4(fixedAmbient,1.0));
    }
    #endif

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    gl_FragData[0] = emission;
}