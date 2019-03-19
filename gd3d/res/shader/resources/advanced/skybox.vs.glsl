attribute highp vec3    _glesVertex;

uniform highp mat4      glstate_matrix_mvp;
uniform highp mat4      glstate_matrix_model;

varying highp vec3      v_pos;

void main () {
    v_pos           = (glstate_matrix_model * vec4(_glesVertex, 1.0)).xyz;

    gl_Position     = glstate_matrix_mvp * vec4(_glesVertex, 1.0);
}