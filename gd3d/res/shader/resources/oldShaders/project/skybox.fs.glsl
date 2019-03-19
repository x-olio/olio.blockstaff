#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI          3.141592653589

uniform samplerCube u_sky;
uniform vec4        glstate_eyepos;

varying vec3        v_pos;


void main () {
    gl_FragColor = textureCube(u_sky, normalize(v_pos - glstate_eyepos.xyz));
}