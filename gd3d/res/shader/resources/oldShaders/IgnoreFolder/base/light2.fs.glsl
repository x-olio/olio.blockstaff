uniform lowp sampler2D _MainTex;


uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];

varying highp vec3 vWorldpos;
varying lowp vec3 vNormal;
varying mediump vec2 xlv_TEXCOORD0;
varying lowp vec3 vEyepos;


//calcDiffuse 计算漫反射强度函数
//统一三种光源的传参方式，在函数内混合，方便就不高效
//只需要方向光时另写
//N 世界空间法线
//worldpos 世界空间pos
//lightPos 光源位置,w=0 表示方向光
//lightDir 光源方向，W=0 表示点光源，和楼上的w一起为1 表示 探照灯 spot
//cosspot cos(a) a为spot的半径 a取值0到90度，算好cos再传进来
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

lowp float calSpec(lowp vec3 worldpos,lowp vec4 lightPos,lowp vec4 lightDir)
{
   // highp vec3 ks=vec3(0.5,0.5,0.5);//物体对于反射光线的衰减系数
    lowp float shininess=1.0;//高光系数
   // highp vec3 lightcolor=vec3(1.0,1.0,1.0);

    lowp vec3 N=normalize(vNormal);

   // highp vec3 L = normalize(lightPos.xyz - worldpos); 
    lowp vec3 L = normalize(-lightDir.xyz); 
    lowp vec3 v=normalize(vEyepos-worldpos);
    lowp vec3 H=normalize(L+v);
    //highp vec3 R=reflect(-L,N);
    //R=normalize(R);

    lowp  float specularLight = pow(clamp(dot(N,H),0.0,1.0), shininess);

    //highp vec3 spec=ks*lightcolor*specularLight;
    lowp float spec=specularLight;
    return spec;
}
void main() 
{
    lowp float diff=0.0;
    lowp float specularColor=0.0;
    for(int i=0;i<8;i++)
    {
        diff+=calcDiffuse(vNormal,vWorldpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i]);
        specularColor+=calSpec(vWorldpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i]);
    }
    lowp vec4 xlv_COLOR=vec4(diff,diff,diff,1.0);
    xlv_COLOR+=vec4(specularColor,specularColor,specularColor,1.0);

    lowp vec4 col_1;    
    lowp vec4 prev_2;
    lowp vec4 tmpvar_3;
    tmpvar_3 = (xlv_COLOR * texture2D(_MainTex, xlv_TEXCOORD0));

    prev_2 = tmpvar_3;
    lowp vec4 tmpvar_4;
    tmpvar_4 = mix(vec4(1.0, 1.0, 1.0, 1.0), prev_2, prev_2.wwww);
    col_1 = tmpvar_4;
    
   gl_FragData[0] = col_1;
    //gl_FragData[0]=vec4(specularColor,1.0);
    //gl_FragData[0] = xlv_COLOR;
}