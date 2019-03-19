#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D _MainTex;
uniform lowp float _FilterType;
uniform lowp float _Step;
varying highp vec2 xlv_TEXCOORD0;
void main()
{
    vec2 tcOffset[25];
    lowp float xInc = _Step / 1024.0;
    lowp float yInc = _Step / 1024.0;
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            tcOffset[(((i * 5) + j) * 2)] = vec2((-2.0 * xInc) + (float(i) * xInc), (-2.0 * yInc) + (float(j) * yInc));
        }
    }

    // 灰度图
    if (_FilterType == 1.)
    {
        float gray = dot(texture2D(_MainTex, xlv_TEXCOORD0.xy).rgb, vec3(0.299, 0.587, 0.114));
        gl_FragData[0] = vec4(gray, gray, gray, 1.0);
    }

    // 棕褐色调
    else if (_FilterType == 2.)
    {
        float gray = dot(texture2D(_MainTex, xlv_TEXCOORD0.xy).rgb, vec3(0.299, 0.587, 0.114));
        gl_FragData[0] = vec4(gray * vec3(1.2, 1.0, 0.8), 1.0);
    }

    // 反色
    else if (_FilterType == 3.)
    {
        vec4 color = texture2D(_MainTex, xlv_TEXCOORD0.xy);
        gl_FragData[0] = vec4(1.0 - color.rgb, 1.0);
    }

    // 高斯滤波
    else if (_FilterType == 4.)
    {
        vec4 sample[25];
        for (int i = 0; i < 25; i++)
        {
            sample[i] = texture2D(_MainTex, xlv_TEXCOORD0.xy + tcOffset[i]);
        }

        // 1  4  7  4 1
        // 4 16 26 16 4
        // 7 26 41 26 7 / 273 (除权重总和)
        // 4 16 26 16 4
        // 1  4  7  4 1
        gl_FragData[0] = (
                            (1.0  * (sample[0] + sample[4]  + sample[20] + sample[24])) +
                            (4.0  * (sample[1] + sample[3]  + sample[5]  + sample[9] + sample[15] + sample[19] + sample[21] + sample[23])) +
                            (7.0  * (sample[2] + sample[10] + sample[14] + sample[22])) +
                            (16.0 * (sample[6] + sample[8]  + sample[16] + sample[18])) +
                            (26.0 * (sample[7] + sample[11] + sample[13] + sample[17])) +
                            (41.0 * sample[12])
                         ) / 273.0;
    }

    // 均值滤波
    else if (_FilterType == 5.)
    {
        vec4 sample[25];
        for (int i = 0; i < 25; i++)
        {
            sample[i] = texture2D(_MainTex, xlv_TEXCOORD0.xy + tcOffset[i]);
        }

        vec4 color;
        for (int i = 0; i < 25; i++)
        {
            color += sample[i];
        }

        gl_FragData[0] = color / 25.0;
    }

    // 锐化
    else if (_FilterType == 6.)
    {
        vec4 sample[25];
        for (int i = 0; i < 25; i++)
        {
            sample[i] = texture2D(_MainTex, xlv_TEXCOORD0.xy + tcOffset[i]);
        }

        // -1 -1 -1 -1 -1
        // -1 -1 -1 -1 -1
        // -1 -1 25 -1 -1
        // -1 -1 -1 -1 -1
        // -1 -1 -1 -1 -1
        vec4 color = sample[12] * 25.0;
        for (int i = 0; i < 25; i++)
        {
            if (i != 12)
            {
                color -= sample[i];
            }
        }

        gl_FragData[0] = color;
    }

    // 膨胀
    else if (_FilterType == 7.)
    {
        vec4 sample[25];
        vec4 maxValue = vec4(0.0);
        for (int i = 0; i < 25; i++)
        {
            sample[i] = texture2D(_MainTex, xlv_TEXCOORD0.xy + tcOffset[i]);
            maxValue = max(sample[i], maxValue);
        }

        gl_FragData[0] = maxValue;
    }

    // 腐蚀
    else if (_FilterType == 8.)
    {
        vec4 sample[25];
        vec4 minValue = vec4(1.0);
        for (int i = 0; i < 25; i++)
        {
            sample[i] = texture2D(_MainTex, xlv_TEXCOORD0.xy + tcOffset[i]);
            minValue = min(sample[i], minValue);
        }
        gl_FragData[0] = minValue;
    }

    // 标准
    else
    {
        gl_FragData[0] = texture2D(_MainTex, xlv_TEXCOORD0.xy);
    }
}