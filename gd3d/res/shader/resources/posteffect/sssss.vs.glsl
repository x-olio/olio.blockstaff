attribute highp vec3    _glesVertex;
attribute highp vec2    _glesMultiTexCoord0;
attribute highp vec3    _glesNormal;

uniform highp mat4      glstate_matrix_mvp;
uniform highp mat4      glstate_matrix_model;
uniform highp mat4      glstate_matrix_world2object;

varying highp vec2      xlv_TEXCOORD0;

void main () {
    v_pos           = (glstate_matrix_model * vec4(_glesVertex, 1.0)).xyz;
    v_normal        = normalize((glstate_matrix_world2object * vec4(_glesNormal, 0.0)).xyz);
    xlv_TEXCOORD0   = _glesMultiTexCoord0;

    gl_Position     = glstate_matrix_mvp * vec4(_glesVertex, 1.0);
}