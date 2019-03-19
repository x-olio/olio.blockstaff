attribute lowp vec4 _glesVertex;   
uniform lowp vec4 _Color;                      
uniform lowp mat4 glstate_matrix_mvp;      
varying lowp vec4 xlv_COLOR;                
void main()                                     
{                                               
    lowp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz = _glesVertex.xyz;             
    xlv_COLOR = _Color;                     
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}