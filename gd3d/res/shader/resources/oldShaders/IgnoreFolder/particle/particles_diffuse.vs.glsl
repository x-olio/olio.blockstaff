attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;   
attribute lowp vec4 _glesColor;                   
uniform highp mat4 glstate_matrix_mvp;      
varying lowp vec4 xlv_COLOR;
varying mediump vec2 xlv_TEXCOORD0;                
void main()                                     
{                                               
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;
    tmpvar_1.xyz = _glesVertex.xyz;             
    xlv_COLOR = _glesColor;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;                     
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}