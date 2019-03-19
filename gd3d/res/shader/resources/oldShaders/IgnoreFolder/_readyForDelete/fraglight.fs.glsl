//#extension GL_OES_standard_derivatives : enable
uniform sampler2D _MainTex;    

uniform highp mat4 glstate_matrix_mvp;      
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp vec4 glstate_vec4_lightposs[8];
uniform highp vec4 glstate_vec4_lightdirs[8];
uniform highp float glstate_float_spotangelcoss[8];

varying lowp vec4 xlv_COLOR;                                                 
varying highp vec2 xlv_TEXCOORD0;   
varying highp vec3 xlv_NORMAL;
varying highp vec3 xlv_WORLDPOS;



//calcDiffuse 计算漫反射强度函数
//统一三种光源的传参方式，在函数内混合，方便就不高效
//只需要方向光时另写
//N 世界空间法线
//worldpos 世界空间pos
//lightPos 光源位置,w=0 表示方向光
//lightDir 光源方向，W=0 表示点光源，和楼上的w一起为1 表示 探照灯 spot
//cosspot cos(a) a为spot的半径 a取值0到90度，算好cos再传进来
// highp float calcDiffuse(highp vec3 N,highp vec3 worldpos,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot)
// {
//     //求入射角，点光源&聚光灯
//     highp vec3 L = normalize(lightPos.xyz - worldpos); 
//     //求张角 聚光灯 也是方向光入射角
//     highp vec3 L2 = -lightDir.xyz;
//     highp float dotSpot = dot(L,L2);
//     //漫反射强度
//     highp float diffuse =clamp(dot(N.xyz,L.xyz),0.0,1.0); 
//     highp float diffuseD =clamp(dot(N.xyz,L2.xyz),0.0,1.0); 

//     //pos.w 和 dir.w 至少有一个1，刚好组合出三种光源
//     diffuse= mix(diffuse,diffuse*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
//     diffuse= mix(diffuseD,diffuse,lightPos.w);


//     return diffuse;
     
// }

// highp float calcSpecular(highp vec3 N,highp vec3 worldpos,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot)
// {
//         //求入射角，点光源&聚光灯
//     highp vec3 L = normalize(lightPos.xyz - worldpos); 
//     // //求张角 聚光灯 也是方向光入射角
//     highp vec3 L2 = -lightDir.xyz;

//     highp float dotSpot = dot(L,L2);

//     highp vec3 EyeDir = normalize(-worldpos);

//     highp vec3 halfVec = normalize(L + EyeDir);
//     highp vec3 halfVecD = normalize(L2 + EyeDir);

//     highp float specular = clamp(dot(N.xyz,halfVec.xyz),0.0,1.0);
//     highp float specularD = clamp(dot(N.xyz,halfVecD.xyz),0.0,1.0);

//     specular = mix(specular, specular * smoothstep(cosspot, 1.0, dotSpot), lightDir.w);
//     specular = mix(specularD, specular, lightPos.w);

//     return specular;


// }

void main() 
{
gl_FragData[0] =vec4(1,1,1,1);
    // highp float diff = 0.0;
    // highp float spec = 0.0;
    // //calcDiffuse(N,worldpos,glstate_vec4_lightposs[0],glstate_vec4_lightdirs[0],0.8);
    // highp float materialShininess = 32.0;
    // highp float Ks = spec;
    // for(int i=0;i<8;i++)
    // {
    //     diff += calcDiffuse(xlv_NORMAL,xlv_WORLDPOS,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i]);
    //     spec = calcSpecular(xlv_NORMAL,xlv_WORLDPOS,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i]);
    //     Ks += pow(spec,materialShininess);
    // }


    // highp vec4 color = vec4(diff,diff,diff,1.0);     

    // highp vec4 materialSpecular = vec4(1.0,0.0,0.0, 1.0);
    // highp vec4 lightSpecular = vec4(1.0,1.0,1.0,1.0);
    // highp vec4 specularProduct = materialSpecular * lightSpecular;
    // specularProduct.xyz = normalize(specularProduct.xyz);
    // highp vec4 specular = vec4(Ks * specularProduct.xyz,1.0);
    // specular[3] = 1.0;

    // lowp vec4 col_1;    
    // mediump vec4 prev_2;
    // lowp vec4 tmpvar_3;
    // tmpvar_3 = (color) * texture2D(_MainTex, xlv_TEXCOORD0) + specular;
    // // prev_2 = tmpvar_3;
    // // mediump vec4 tmpvar_4;
    // // tmpvar_4 = mix(vec4(1.0, 1.0, 1.0, 1.0), prev_2, prev_2.wwww);
    // // col_1 = tmpvar_4;
    // //col_1.x = xlv_TEXCOORD0.x;
    // //col_1.y = xlv_TEXCOORD0.y;
    // gl_FragData[0] = tmpvar_3;
}