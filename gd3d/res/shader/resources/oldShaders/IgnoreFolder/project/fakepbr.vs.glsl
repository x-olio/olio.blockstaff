attribute highp vec4 _glesVertex;
attribute mediump vec2 _glesMultiTexCoord0;
attribute lowp vec3 _glesTangent;
attribute lowp vec3 _glesNormal;
uniform highp mat4 glstate_matrix_model;
uniform highp mat4 glstate_matrix_mvp;
uniform mediump vec4 _MainTex_ST; 

varying mediump vec2 xlv_TEXCOORD0;
varying highp vec3 posWorld;
varying lowp vec3 normalDir;
varying lowp vec3 tangentDir;
varying lowp vec3 bitangentDir;
void main()
{
    xlv_TEXCOORD0 = _glesMultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw; 
    posWorld = (glstate_matrix_model * _glesVertex).xyz;
    highp mat3 normalmat = mat3(glstate_matrix_model);

    normalDir = normalize(normalmat*_glesNormal);
    tangentDir = normalize(normalmat*_glesTangent);
    bitangentDir = cross(normalDir,tangentDir);

    gl_Position = (glstate_matrix_mvp * _glesVertex);
}