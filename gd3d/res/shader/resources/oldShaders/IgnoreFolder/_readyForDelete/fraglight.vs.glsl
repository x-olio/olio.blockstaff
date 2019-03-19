//#extension GL_OES_standard_derivatives : enable

attribute vec3 _glesVertex;   
attribute vec3 _glesNormal;   
attribute vec4 _glesColor;                  
attribute vec4 _glesMultiTexCoord0;        
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


void main()                                     
{                                               
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz = _glesVertex.xyz;    

    //求世界空间法线
    highp mat4 normalmat = glstate_matrix_model;
    normalmat[3] =vec4(0,0,0,1);
    xlv_NORMAL =normalize((vec4(_glesNormal,1)*normalmat).xyz);

    xlv_WORLDPOS = glstate_matrix_model[3].xyz;
    
    xlv_COLOR = _glesColor;   
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;     
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}