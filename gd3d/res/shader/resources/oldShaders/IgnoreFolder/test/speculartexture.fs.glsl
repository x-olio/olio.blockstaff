uniform sampler2D _MainTex;  
uniform sampler2D _NormalTex;   //normal map
uniform sampler2D _SpecularTex;

uniform highp vec4 glstate_vec4_lightposs[8];
uniform highp vec4 glstate_vec4_lightdirs[8];
uniform highp float glstate_float_spotangelcoss[8];
uniform highp float glstate_lightcount;
                                        
varying highp vec2 xlv_TEXCOORD0; 
varying highp mat3 TBNmat;
//varying highp vec3 normal;
varying highp vec3 worldpos; 
varying highp vec3 eyedir;

highp float calcDiffuse(highp vec3 N,highp vec3 worldpos,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot);
highp float calcSpec(highp vec3 N,highp vec3 worldpos,highp vec3 eyedir,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot);
void main() 
{
    highp float diff=0.0;
    highp float spec=0.0;
    //calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
    for(int i=0;i<8;i++)
    {
        int c =int(glstate_lightcount);
        if(i>=c)break;
    
		highp vec4 lpos=glstate_vec4_lightposs[i];
		highp vec4 ldir =glstate_vec4_lightdirs[i];

		//这是进入切空间的原因
		highp vec3 normal;// = TBN*N;
		normal =  texture2D(_NormalTex, xlv_TEXCOORD0).xyz *2.0 -1.0;
        normal =normalize(normal);
		normal =TBNmat*(normal);


        diff += calcDiffuse(normal,worldpos,lpos,ldir,glstate_float_spotangelcoss[i]);
        spec += calcSpec(normal,worldpos,eyedir,lpos,ldir,glstate_float_spotangelcoss[i]);
    }
	//diff=1.0;
	lowp vec4 color = vec4(diff,diff,diff,1.0);
    lowp vec4 colorspec =vec4(spec,spec,spec,1.0);
    lowp vec4 fcolor;
    fcolor = (color * texture2D(_MainTex, xlv_TEXCOORD0) + colorspec);

    gl_FragData[0] = fcolor;
}

highp float calcDiffuse(highp vec3 N,highp vec3 worldpos,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot)
{
    //求入射角，点光源&聚光灯
    highp vec3 L = normalize(lightPos.xyz - worldpos); 
    //求张角 聚光灯 也是方向光入射角
    highp vec3 L2 = -lightDir.xyz;
    highp float dotSpot = dot(L,L2);
    //漫反射强度
    highp float diffuse =clamp(dot(N.xyz,L.xyz),0.0,1.0); 
    highp float diffuseD =clamp(dot(N.xyz,L2.xyz),0.0,1.0); 

    //pos.w 和 dir.w 至少有一个1，刚好组合出三种光源
    diffuse= mix(diffuse,diffuse*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    diffuse= mix(diffuseD,diffuse,lightPos.w);

    return diffuse;
     
}
highp float calcSpec(highp vec3 N,highp vec3 worldpos,highp vec3 eyedir,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot)
{

    highp float shininess=30.0;//高光系数
    highp vec3 L = normalize(lightPos.xyz - worldpos); 
    highp vec3 L2 = -lightDir.xyz;
    highp float dotSpot = dot(L,L2);
    //三种光源 计算出三个 高光强度，然后根据条件选出一个
    highp vec4 specularc=texture2D(_SpecularTex,xlv_TEXCOORD0);
    highp vec3 specluarcolor=specularc.xyz;
    highp float specular=specularc.w;

    highp float spec =pow(clamp(dot(N,normalize(L+eyedir)),0.0,1.0), shininess)*specular;
    highp float specD =pow(clamp(dot(N,normalize(L2+eyedir)),0.0,1.0), shininess)*specular;
    spec= mix(spec,spec*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    spec= mix(specD,spec,lightPos.w);

    //highp  float specularLight = pow(clamp(dot(N,H),0.0,1.0), shininess);

    return spec;
}
