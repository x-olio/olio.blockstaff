
uniform lowp sampler2D _MainTex;  
uniform lowp sampler2D _NormalTex;   //normal map

uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];
uniform lowp float glstate_lightcount;
//varying lowp vec4 xlv_COLOR;     
//varying highp vec3 xlv_Position;                                             
varying mediump vec2 xlv_TEXCOORD0; 
//varying highp vec3 xlv_Normal; 
//varying highp mat4 normalmat;
varying lowp mat3 TBNmat;
varying lowp vec3 worldpos; 
varying lowp vec3 eyedir;

lowp float calcDiffuse(lowp vec3 N,lowp vec3 worldpos,lowp vec4 lightPos,lowp vec4 lightDir,lowp float cosspot);
lowp float calcSpec(lowp vec3 N,lowp vec3 worldpos,lowp vec3 eyedir,lowp vec4 lightPos,lowp vec4 lightDir,lowp float cosspot);
void main() 
{
    //不需要法线图时，normal 就是这个N
    //highp vec3 N =normalize((vec4(xlv_Normal,1)*normalmat).xyz);

    lowp float diff=0.0;
    lowp float spec=0.0;
    //calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
    for(int i=0;i<8;i++)
    {
        int c =int(glstate_lightcount);
        if(i>=c)break;
    
		lowp vec4 lpos=glstate_vec4_lightposs[i];
		//lpos.xyz = TBN*lpos.xyz;
		lowp vec4 ldir =glstate_vec4_lightdirs[i];
		//ldir.xyz = TBN*ldir.xyz;
		
		//这是进入切空间的原因
		lowp vec3 normal;// = TBN*N;
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

lowp float calcDiffuse(lowp vec3 N,lowp vec3 worldpos,lowp vec4 lightPos,lowp vec4 lightDir,lowp float cosspot)
{
    //求入射角，点光源&聚光灯
    lowp vec3 L = normalize(lightPos.xyz - worldpos); 
    //求张角 聚光灯 也是方向光入射角
    lowp vec3 L2 = -lightDir.xyz;
    lowp float dotSpot = dot(L,L2);
    //漫反射强度
    lowp float diffuse =clamp(dot(N.xyz,L.xyz),0.0,1.0); 
    lowp float diffuseD =clamp(dot(N.xyz,L2.xyz),0.0,1.0); 

    //pos.w 和 dir.w 至少有一个1，刚好组合出三种光源
    diffuse= mix(diffuse,diffuse*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    diffuse= mix(diffuseD,diffuse,lightPos.w);

    return diffuse;
     
}
lowp float calcSpec(lowp vec3 N,lowp vec3 worldpos,lowp vec3 eyedir,lowp vec4 lightPos,lowp vec4 lightDir,lowp float cosspot)
{

    lowp float shininess=30.0;//高光系数
    lowp vec3 L = normalize(lightPos.xyz - worldpos); 
    lowp vec3 L2 = -lightDir.xyz;
    lowp float dotSpot = dot(L,L2);
    //三种光源 计算出三个 高光强度，然后根据条件选出一个
    lowp float spec =pow(clamp(dot(N,normalize(L+eyedir)),0.0,1.0), shininess);
    lowp float specD =pow(clamp(dot(N,normalize(L2+eyedir)),0.0,1.0), shininess);
    spec= mix(spec,spec*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    spec= mix(specD,spec,lightPos.w);

    //highp  float specularLight = pow(clamp(dot(N,H),0.0,1.0), shininess);

    return spec;
}
