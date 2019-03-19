attribute highp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0;   
attribute lowp vec4 _glesColor;

uniform lowp vec4 _Main_Color;
uniform highp mat4 glstate_matrix_mvp;


varying lowp vec4 xlv_COLOR;
varying mediump vec2 xlv_TEXCOORD0;                
void main()                                     
{                                               
    highp vec4 tmpvar_1=vec4(_glesVertex.xyz,1.0);
    xlv_COLOR = _Main_Color*_glesColor;
	xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;                     
    gl_Position = (glstate_matrix_mvp *tmpvar_1);  
}