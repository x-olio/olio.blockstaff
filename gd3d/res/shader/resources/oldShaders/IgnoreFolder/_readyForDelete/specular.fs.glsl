uniform sampler2D _base;  
uniform sampler2D _emit;
uniform highp float _emitPow;

uniform highp vec4 glstate_vec4_lightposs[8];
uniform highp vec4 glstate_vec4_lightdirs[8];
uniform highp float glstate_float_spotangelcoss[8];
uniform highp float glstate_lightcount;

varying highp vec2 _base_uv;
varying highp vec2 _emit_uv;
varying lowp vec4 xlv_COLOR;
varying highp vec3 Normalinworld;
varying highp vec3 worldpos;

highp float calcDiffuse(highp vec3 N,highp vec3 worldpos,highp vec4 lightPos,highp vec4 lightDir,highp float cosspot)
{
    //求入射角，点光源&聚光灯
    highp vec3 L = normalize(lightPos.xyz - worldpos); 
    //求张角 聚光灯 也是方向光入射角
    highp vec3 L2 = -lightDir.xyz;
    highp float dotSpot = dot(L,L2);
    //漫反射强度
    highp float diffuse =clamp(dot(N.xyz,L.xyz),0.0,1.0); 
    highp float diffuseD =clamp(dot(N.xyz,L2.xyz),0.0,1.0); 

    //pos.w 和 dir.w 至少有一个1，刚好组合出三种光源
    diffuse= mix(diffuse,diffuse*smoothstep(cosspot,1.0,dotSpot),lightDir.w);
    diffuse= mix(diffuseD,diffuse,lightPos.w);

    return diffuse;
     
}
void main() 
{
    highp float diff=0.0;
    for(int i=0;i<8;i++)
    {
        int c =int(glstate_lightcount);
        if(i>=c)break;
        diff += calcDiffuse(Normalinworld,worldpos,glstate_vec4_lightposs[i],glstate_vec4_lightdirs[i],glstate_float_spotangelcoss[i]);
    }
    lowp vec4 color = vec4(diff,diff,diff,1.0);

    lowp vec4 tmpvar_3;
    tmpvar_3 = (color * texture2D(_base, _base_uv)); 

    highp vec4 _emit_var=texture2D(_emit,_emit_uv);
    highp vec3 emissive=_emitPow*_emit_var.xyz;
    //highp vec3 emissive=3.0*_emit_var.xyz;

    gl_FragData[0] = tmpvar_3+vec4(emissive,1.0);
    //gl_FragData[0] = texture2D(_base,_base_uv);
}

