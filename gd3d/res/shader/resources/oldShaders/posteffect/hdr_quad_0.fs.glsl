#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const vec2 texSize = vec2(256., 256.);

uniform sampler2D _MainTex;
varying highp vec2 xlv_TEXCOORD0;

vec4 blur_filter(mat3 filter, vec2 filter_pos_delta[9], sampler2D image, vec2 xy, vec2 texSize)
{
    vec4 final_color = vec4(0., 0., 0., 0.);
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            vec2 new_xy = vec2(xy.x + filter_pos_delta[3 * i + j].x, xy.y + filter_pos_delta[3 * i + j].y);
            vec2 new_uv = vec2(new_xy.x / texSize.x, new_xy.y / texSize.y);
            final_color += texture2D(_MainTex, new_uv) * filter[i][j];
        }
    }
    return final_color;
}

void main()
{
    vec2 filter_pos_delta[9];
    filter_pos_delta[0] = vec2(-1., -1.);
    filter_pos_delta[1] = vec2(0., -1.);
    filter_pos_delta[2] = vec2(1., -1.);
    filter_pos_delta[4] = vec2(-1., 0.);
    filter_pos_delta[5] = vec2(0., 0.);
    filter_pos_delta[6] = vec2(1., 0.);
    filter_pos_delta[7] = vec2(-1., 1.);
    filter_pos_delta[8] = vec2(0., 1.);
    filter_pos_delta[3] = vec2(1., 1.);

    mat3 filter = mat3(1. / 16., 1. / 8., 1. / 16.,
                        1. / 8., 1. / 4., 1. / 8.,
                        1. / 16., 1. / 8., 1. / 16.);

    vec2 xy = vec2(xlv_TEXCOORD0.x * texSize.x, xlv_TEXCOORD0.y * texSize.y);

    vec4 color = blur_filter(filter, filter_pos_delta, _MainTex, xy, texSize);

    gl_FragData[0] = color;
}