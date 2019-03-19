attribute vec4 _glesVertex;   
attribute vec4 _glesColor;                  
attribute vec4 _glesMultiTexCoord0;      
uniform vec4 _MainColor;  
uniform highp mat4 glstate_matrix_mvp;//这个uniform 是自动传递的      
varying lowp vec4 xlv_COLOR;                
varying highp vec2 xlv_TEXCOORD0;    
uniform highp vec4 _MainTex_STSpeed;     
uniform highp float glstate_timer;//这个uniform 是自动的，不需要用户在material 里指定

void main()                                     
{                                               
    highp vec4 tmpvar_1;                        
    tmpvar_1.w = 1.0;                           
    tmpvar_1.xyz = _glesVertex.xyz;             
    xlv_COLOR = _glesColor + _MainColor;                     
    highp float step =  mod(glstate_timer , 2.0);
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy - vec2(step*_MainTex_STSpeed.x,step*_MainTex_STSpeed.y);   
    gl_Position = (glstate_matrix_mvp * tmpvar_1);  
}
