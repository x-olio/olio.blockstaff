varying lowp vec4 xlv_COLOR;        
void main() 
{
    gl_FragData[0] = xlv_COLOR;
    step(xlv_COLOR.a,0.5);
}
