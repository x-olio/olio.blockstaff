uniform sampler2D _MainTex; 
uniform sampler2D _asm; 
uniform sampler2D _streamLight; 

uniform lowp float _diffuseRate;
uniform lowp float _speculerRate;
uniform lowp float _LightRate;
uniform mediump vec4 _LightColor;
uniform lowp float _alphaRate;

varying mediump vec2 _maintex_uv;
varying mediump vec2 _asm_uv;
varying mediump vec2 _light_uv;
varying highp vec3 normalDir;
varying mediump vec3 lightDir;

//varying lowp float light2dot;
varying highp float angle;
uniform lowp float _light2_area;
uniform lowp float _Light2Rate;
uniform mediump vec4 _Light2Color;

uniform lowp vec4 _Light3Color;
uniform lowp float _light3_area;
uniform lowp float _Light3Rate;
void main()
{
    lowp vec4 asmcolor=texture2D(_asm,_asm_uv);
    lowp vec4 basecolor=texture2D(_MainTex,_maintex_uv);
    if(basecolor.a*_alphaRate<0.5)
    {
        discard;
    }
    lowp vec3 mainTexcolor=basecolor.rgb*_diffuseRate;
    lowp vec3 specColor=basecolor.rgb*_speculerRate*asmcolor.g;

    highp vec2 streamligtuv=normalDir.xy*0.5+_light_uv;
    highp vec3 lightcolor=texture2D(_streamLight,streamligtuv).rgb;
    lightcolor=min(vec3(asmcolor.b),lightcolor)*_LightColor.rgb*_LightRate;

    highp vec3 lightDir=vec3(cos(angle)*-1.0,0.0,sin(angle)*-1.0);
    highp vec3 normalxz=normalize(vec3(normalDir.x,0,normalDir.z));
    highp vec3 lightcolor2=vec3(pow(max(dot(normalxz,lightDir),0.0),_light2_area))*_Light2Rate*_Light2Color.rgb;
    
    highp float angle3=angle*2.0+3.141592654;
    highp vec3 lightDir3=vec3(cos(angle3)*-8.0+6.0,0.0,pow(sin(angle3),2.0));
    lightDir3=normalize(lightDir3);
    highp float showlight3=max(sin(angle),0.0);
    highp vec3 lightcolor3=pow(max(dot(normalxz,lightDir3),0.0),_light3_area)*_Light3Rate*_Light3Color.rgb*showlight3;

    gl_FragData[0]=vec4(mainTexcolor+specColor+lightcolor+lightcolor2+lightcolor3,1.0);
    //gl_FragData[0]=vec4(normalxz,1.0);
}   