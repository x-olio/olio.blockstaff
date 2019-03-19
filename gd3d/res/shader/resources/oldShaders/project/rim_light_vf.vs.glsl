attribute highp vec4 _glesVertex;
attribute highp vec3 _glesNormal;
uniform highp mat4 glstate_matrix_mvp;
uniform highp mat4 glstate_matrix_world2object;
uniform mediump vec4 glstate_eyepos; 
uniform mediump float _RimIntensity;
uniform mediump vec4 _RimColor;

varying mediump vec4 rimcolor;

void main()
{
    highp vec4 tmpvar_1;
    tmpvar_1.w = 1.0;
    tmpvar_1.xyz = _glesVertex.xyz;
    mediump vec3 viewDir = normalize((glstate_matrix_world2object * glstate_eyepos).xyz - _glesVertex.xyz);
    mediump float val = 1.0 - dot(_glesNormal, viewDir);//计算点乘值
    rimcolor = _RimColor * val * (1.0 + _RimIntensity);//计算强度
    gl_Position = (glstate_matrix_mvp * tmpvar_1);
}