attribute highp vec3 _glesVertex;   
attribute lowp vec3 _glesNormal;   
attribute lowp vec4 _glesColor;                  
attribute lowp vec4 _glesMultiTexCoord0;        
uniform highp mat4 glstate_matrix_mvp;      
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform lowp vec4 glstate_vec4_lightposs[8];
uniform lowp vec4 glstate_vec4_lightdirs[8];
uniform lowp float glstate_float_spotangelcoss[8];
uniform lowp float glstate_lightcount;

varying lowp vec4 xlv_COLOR;                
varying mediump vec2 xlv_TEXCOORD0;     

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
void main()                                     
{                                               
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz = _glesVertex.xyz;    

    //求世界空间法线
    lowp mat3 normalmat = mat3(glstate_matrix_model);
    lowp vec3 N =normalize(normalmat*_glesNormal);

    highp vec3 worldpos =(glstate_matrix_model * vec4(_glesVertex.xyz, 1.0)).xyz;

    lowp float diff=0.0;
    //calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
    for(int i=0;i<8;i++)
    {
        int c =int(glstate_lightcount);
        if(i>=c)break;
        diff += calcDiffuse(N,worldpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i]);
    }

    xlv_COLOR = vec4(diff,diff,diff,1.0);         
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;     
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}