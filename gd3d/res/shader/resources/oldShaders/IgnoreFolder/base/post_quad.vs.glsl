attribute lowp vec4 _glesVertex;
attribute mediump vec4 _glesMultiTexCoord0; 
uniform mediump vec4 _MainTex_ST; 
varying mediump vec2 xlv_TEXCOORD0;   
void main()                     
{ 
    gl_Position = _glesVertex;
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw; 
}   