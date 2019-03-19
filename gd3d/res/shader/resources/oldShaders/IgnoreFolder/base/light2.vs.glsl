attribute highp vec3 _glesVertex;   
attribute lowp vec3 _glesNormal;   
attribute lowp vec4 _glesColor;                  
attribute mediump vec4 _glesMultiTexCoord0; 

uniform lowp sampler2D _NormalTex;   //normal map

uniform highp mat4 glstate_matrix_mvp;      
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_modelview;
uniform highp vec4 glstate_eyepos;

varying lowp vec3 vWorldpos;
varying lowp vec3 vNormal;
varying mediump vec2 xlv_TEXCOORD0;
varying lowp vec3 vEyepos;


void main()
{
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz =_glesVertex;
    vWorldpos=(glstate_matrix_model*tmpvar_1).xyz;
    //vWorldpos =glstate_matrix_model[3].xyz;//计算输出定点位置

    vEyepos=glstate_eyepos.xyz;
      
    //求世界空间法线
    lowp mat4 vnormalMat = glstate_matrix_model;
    vnormalMat[3] =vec4(0,0,0,1);
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;
    lowp vec3 NormalMap = texture2D(_NormalTex, xlv_TEXCOORD0).rgb;
    lowp vec3 N = normalize(NormalMap * 2.0 - vec3(1.0));

    vNormal =normalize((vec4(_glesNormal,1)*vnormalMat).xyz);

    //vNormal=N;

    gl_Position = (glstate_matrix_mvp * tmpvar_1);
}

