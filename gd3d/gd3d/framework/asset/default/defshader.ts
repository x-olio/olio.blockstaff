namespace gd3d.framework
{
    export class defShader
    {

        // static vscode_test: string = "\
        // attribute vec4 _glesVertex;   \
        // attribute vec4 _glesColor;                  \
        // attribute vec4 _glesMultiTexCoord0;         \
        // uniform highp mat4 glstate_matrix_mvp;      \
        // varying lowp vec4 xlv_COLOR;                \
        // varying highp vec2 xlv_TEXCOORD0;           \
        // void main()                                     \
        // {                                               \
        //     highp vec4 tmpvar_1;                        \
        //     tmpvar_1.w = 1.0;                           \
        //     tmpvar_1.xyz = _glesVertex.xyz;             \
        //     xlv_COLOR = _glesColor;                     \
        //     xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;     \
        //     gl_Position = (glstate_matrix_mvp * tmpvar_1);  \
        // }";

        // static fscode_test: string = "         \
        // varying lowp vec4 xlv_COLOR;                                                 \
        // varying highp vec2 xlv_TEXCOORD0;   \
        // void main() \
        // {\
        //     gl_FragData[0] = xlv_COLOR;\
        // }\
        // ";
        static shader0: string = "{\
            \"properties\": [\
              \"_MainTex('MainTex',Texture)='white'{}\"\
            ]\
          }";
        static vscode: string = "\
        attribute vec4 _glesVertex;   \
        attribute vec4 _glesColor;                  \
        attribute vec4 _glesMultiTexCoord0;         \
        uniform highp mat4 glstate_matrix_mvp;      \
        varying lowp vec4 xlv_COLOR;                \
        varying highp vec2 xlv_TEXCOORD0;           \
        void main()                                     \
        {                                               \
            highp vec4 tmpvar_1;                        \
            tmpvar_1.w = 1.0;                           \
            tmpvar_1.xyz = _glesVertex.xyz;             \
            xlv_COLOR = _glesColor;                     \
            xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;     \
            gl_Position = (glstate_matrix_mvp * tmpvar_1);  \
        }";
        static fscode: string = "         \
        uniform sampler2D _MainTex;                                                 \
        varying lowp vec4 xlv_COLOR;                                                 \
        varying highp vec2 xlv_TEXCOORD0;   \
        void main() \
        {\
            lowp vec4 col_1;    \
            mediump vec4 prev_2;\
            lowp vec4 tmpvar_3;\
            tmpvar_3 = (xlv_COLOR * texture2D(_MainTex, xlv_TEXCOORD0));\
            prev_2 = tmpvar_3;\
            mediump vec4 tmpvar_4;\
            tmpvar_4 = mix(vec4(1.0, 1.0, 1.0, 1.0), prev_2, prev_2.wwww);\
            col_1 = tmpvar_4;\
            col_1.x =xlv_TEXCOORD0.x;\
            col_1.y =xlv_TEXCOORD0.y;\
            gl_FragData[0] = col_1;\
        }\
        ";

        static fscode2: string = "         \
        void main() \
        {\
            gl_FragData[0] = vec4(1.0, 1.0, 1.0, 1.0);\
        }\
        ";
        //----------------------------------------UI-------------------------
        static uishader: string = "{\
            \"properties\": [\
              \"_MainTex('MainTex',Texture)='white'{}\",\
              \"_MaskTex('MaskTex',Texture)='white'{}\"\
            ]\
            }";
        
        static fscodeUI: string = `
            uniform sampler2D _MainTex;
            varying lowp vec4 xlv_COLOR;
            varying highp vec2 xlv_TEXCOORD0;
            void main()
            {
                lowp vec4 tmpvar_3;
                tmpvar_3 = (xlv_COLOR * texture2D(_MainTex, xlv_TEXCOORD0));
                gl_FragData[0] = tmpvar_3;
            }`;
        static vscodeUI : string =`
            attribute vec4 _glesVertex;    
            attribute vec4 _glesColor;                   
            attribute vec4 _glesMultiTexCoord0;          
            uniform highp mat4 glstate_matrix_mvp;       
            varying lowp vec4 xlv_COLOR;                 
            varying highp vec2 xlv_TEXCOORD0;            
            void main()                                      
            {                                                
                highp vec4 tmpvar_1;                         
                tmpvar_1.w = 1.0;                            
                tmpvar_1.xyz = _glesVertex.xyz;              
                xlv_COLOR = _glesColor;                      
                xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);      
                gl_Position = (glstate_matrix_mvp * tmpvar_1);   
            }
        `;
        static vscodeMaskUI:string = ` 
        attribute vec4 _glesVertex;    
        attribute vec4 _glesColor;                   
        attribute vec4 _glesMultiTexCoord0;          
        uniform highp mat4 glstate_matrix_mvp;       
        varying lowp vec4 xlv_COLOR;                 
        varying highp vec2 xlv_TEXCOORD0;            
        varying highp vec2 mask_TEXCOORD;            
        void main()                                      
        {                                                
            highp vec4 tmpvar_1;                         
            tmpvar_1.w = 1.0;                            
            tmpvar_1.xyz = _glesVertex.xyz;              
            xlv_COLOR = _glesColor;                      
            xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);      
            mask_TEXCOORD.x = (_glesVertex.x - 1.0)/-2.0; 
            mask_TEXCOORD.y = (_glesVertex.y - 1.0)/-2.0; 
            gl_Position = (glstate_matrix_mvp * tmpvar_1);   
        }`;

        static fscodeMaskUI:string = `          
        uniform sampler2D _MainTex;                                                  
        uniform highp vec4 _maskRect;                                                  
        varying lowp vec4 xlv_COLOR;                                                  
        varying highp vec2 xlv_TEXCOORD0;    
        varying highp vec2 mask_TEXCOORD;            
        bool CalcuCut(){    
            highp float l; 
            highp float t; 
            highp float r; 
            highp float b; 
            highp vec2 texc1; 
            bool beCut; 
            l = _maskRect.x; 
            t = _maskRect.y; 
            r = _maskRect.z + l; 
            b = _maskRect.w + t; 
            texc1 = mask_TEXCOORD; 
            if(texc1.x >(1.0 - l) || texc1.x <(1.0 - r) || texc1.y <t || texc1.y>b){  
                beCut = true;  
            }else{ 
                beCut = false; 
            } 
            return beCut; 
        } 
            
        void main()  
        { 
            if(CalcuCut()) discard; 
            lowp vec4 tmpvar_3; 
            tmpvar_3 = (xlv_COLOR * texture2D(_MainTex, xlv_TEXCOORD0)); 
            gl_FragData[0] = tmpvar_3 ; 
        } 
        `;
        static shaderuifront: string = "{\
            \"properties\": [\
              \"_MainTex('MainTex',Texture)='white'{}\"\
            ]\
            }";

        static vscodefontUI: string = ` 
        attribute vec4 _glesVertex;    
        attribute vec4 _glesColor;                   
        attribute vec4 _glesColorEx;                   
        attribute vec4 _glesMultiTexCoord0;          
        uniform highp mat4 glstate_matrix_mvp;       
        varying lowp vec4 xlv_COLOR;                 
        varying lowp vec4 xlv_COLOREx;                                                  
        varying highp vec2 xlv_TEXCOORD0;            
        void main()                                      
        {                                                
            highp vec4 tmpvar_1;                         
            tmpvar_1.w = 1.0;                            
            tmpvar_1.xyz = _glesVertex.xyz;              
            xlv_COLOR = _glesColor;                      
            xlv_COLOREx = _glesColorEx;                      
            xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);      
            gl_Position = (glstate_matrix_mvp * tmpvar_1);   
        }`;

        
        static fscodefontUI: string = ` 
            precision mediump float ; 
            uniform sampler2D _MainTex; 
            varying lowp vec4 xlv_COLOR; 
            varying lowp vec4 xlv_COLOREx; 
            varying highp vec2 xlv_TEXCOORD0;     
            void main()   
            {  
                float scale = 10.0;    
                float d = (texture2D(_MainTex, xlv_TEXCOORD0).r - 0.47)*scale;    
                float bd = (texture2D(_MainTex, xlv_TEXCOORD0).r - 0.4)*scale;    
                
                float c=xlv_COLOR.a * clamp ( d,0.0,1.0);   
                float bc=xlv_COLOREx.a * clamp ( bd,0.0,1.0);   
                bc =min(1.0-c,bc);  
            gl_FragData[0] =xlv_COLOR*c + xlv_COLOREx*bc;  
        }`;
    
        static vscodeuifontmask: string = ` 
            attribute vec4 _glesVertex;    
            attribute vec4 _glesColor;                   
            attribute vec4 _glesColorEx;                   
            attribute vec4 _glesMultiTexCoord0;          
            uniform highp mat4 glstate_matrix_mvp;       
            varying lowp vec4 xlv_COLOR;                 
            varying lowp vec4 xlv_COLOREx;                                                  
            varying highp vec2 xlv_TEXCOORD0;            
            varying highp vec2 mask_TEXCOORD;            
            void main()                                      
            {                                                
                highp vec4 tmpvar_1;                         
                tmpvar_1.w = 1.0;                            
                tmpvar_1.xyz = _glesVertex.xyz;              
                xlv_COLOR = _glesColor;                      
                xlv_COLOREx = _glesColorEx;                      
                xlv_TEXCOORD0 = vec2(_glesMultiTexCoord0.x,1.0-_glesMultiTexCoord0.y);      
                mask_TEXCOORD.x = (_glesVertex.x - 1.0)/-2.0; 
                mask_TEXCOORD.y = (_glesVertex.y - 1.0)/-2.0; 
                gl_Position = (glstate_matrix_mvp * tmpvar_1);   
            }`;

        static fscodeuifontmask:string = ` 
            precision mediump float; 
            uniform sampler2D _MainTex;   
            uniform highp vec4 _maskRect;        
            varying lowp vec4 xlv_COLOR;  
            varying lowp vec4 xlv_COLOREx;  
            varying highp vec2 xlv_TEXCOORD0;     
            varying highp vec2 mask_TEXCOORD;      
            bool CalcuCut(){    
                highp float l; 
                highp float t; 
                highp float r; 
                highp float b; 
                highp vec2 texc1; 
                bool beCut; 
                l = _maskRect.x; 
                t = _maskRect.y; 
                r = _maskRect.z + l; 
                b = _maskRect.w + t; 
                texc1 = mask_TEXCOORD; 
                if(texc1.x >(1.0 - l) || texc1.x <(1.0 - r) || texc1.y <t || texc1.y>b){  
                    beCut = true;  
                }else{ 
                    beCut = false; 
                } 
                return beCut; 
            } 
             
            void main()   
            {  
                if(CalcuCut())  discard; 
                float scale = 10.0;    
                float d = (texture2D(_MainTex, xlv_TEXCOORD0).r - 0.47)*scale;   
                float bd = (texture2D(_MainTex, xlv_TEXCOORD0).r - 0.4)*scale;   
                
                float c=xlv_COLOR.a * clamp ( d,0.0,1.0);   
                float bc=xlv_COLOREx.a * clamp ( bd,0.0,1.0);   
                bc =min(1.0-c,bc);  
                lowp vec4 final =  xlv_COLOR*c + xlv_COLOREx*bc ; 
                gl_FragData[0] = final ; 
            }`;

        static diffuseShader: string = "{\
            \"properties\": [\
              \"_MainTex('MainTex',Texture)='white'{}\",\
              \"_AlphaCut('AlphaCut',Range(0.0,1.0)) = 0.5\"\
            ]\
            }";

        static vsdiffuse: string = "\
        attribute vec4 _glesVertex;\
        attribute vec4 _glesMultiTexCoord0;\
        uniform highp mat4 glstate_matrix_mvp;\
        varying highp vec2 xlv_TEXCOORD0;\
        void main()\
        {\
            highp vec4 tmpvar_1;\
            tmpvar_1.w = 1.0;\
            tmpvar_1.xyz = _glesVertex.xyz;\
            xlv_TEXCOORD0 = _glesMultiTexCoord0.xy;\
            gl_Position = (glstate_matrix_mvp * tmpvar_1);\
        }";

        static fsdiffuse: string = "\
        uniform sampler2D _MainTex;\
        uniform lowp float _AlphaCut;\
        varying highp vec2 xlv_TEXCOORD0;\
        void main() \
        {\
            lowp vec4 tmpvar_3 = texture2D(_MainTex, xlv_TEXCOORD0);\
            if(tmpvar_3.a < _AlphaCut)\
                discard;\
            gl_FragData[0] = tmpvar_3;\
        }";


        //editor
        static vsline: string = "\
        attribute vec4 _glesVertex;\
        attribute vec4 _glesColor;\
        uniform highp mat4 glstate_matrix_mvp;\
        varying lowp vec4 xlv_COLOR;\
        void main()\
        {\
            highp vec4 tmpvar_1;\
            tmpvar_1.w = 1.0;\
            tmpvar_1.xyz = _glesVertex.xyz;\
            xlv_COLOR = _glesColor;\
            gl_Position = (glstate_matrix_mvp * tmpvar_1);\
        }";

        static fsline: string = "\
        varying lowp vec4 xlv_COLOR;\
        void main()\
        {\
            gl_FragData[0] = xlv_COLOR;\
        }";


        static materialShader: string = "{\
            \"properties\": [\
              \"_Color('Color',Vector) = (1,1,1,1)\",\
              \"_Alpha('Alpha', Range(0.0, 1.0)) = 1.0\"\
            ]\
            }";
        static vsmaterialcolor: string = "\
        attribute vec4 _glesVertex;\
        uniform vec4 _Color;\
        uniform float _Alpha;\
        uniform highp mat4 glstate_matrix_mvp;\
        varying lowp vec4 xlv_COLOR;\
        void main()\
        {\
            highp vec4 tmpvar_1;\
            tmpvar_1.w = 1.0;\
            tmpvar_1.xyz = _glesVertex.xyz;\
            xlv_COLOR = _Color;\
            xlv_COLOR.a = xlv_COLOR.a * _Alpha;\
            gl_Position = (glstate_matrix_mvp * tmpvar_1);\
        }";

        static initDefaultShader(assetmgr: assetMgr)
        {
            var pool = assetmgr.shaderPool;
            //鍙戠幇鏄簳灞備竴涓紩鐢ㄤ贡浜嗭紝鍘熺粨鏋勬病闂

            // pool.compileVS(assetmgr.webgl, "test", defShader.vscode_test);
            // pool.compileFS(assetmgr.webgl, "test", defShader.fscode_test);

            pool.compileVS(assetmgr.webgl, "def", defShader.vscode);
            pool.compileFS(assetmgr.webgl, "def", defShader.fscode);

            pool.compileFS(assetmgr.webgl, "def2", defShader.fscode2);

            pool.compileVS(assetmgr.webgl, "defui", defShader.vscodeUI);
            pool.compileFS(assetmgr.webgl, "defui", defShader.fscodeUI);

            pool.compileVS(assetmgr.webgl, "defuifont", defShader.vscodefontUI);
            pool.compileFS(assetmgr.webgl, "defuifont", defShader.fscodefontUI);

            pool.compileVS(assetmgr.webgl, "diffuse", defShader.vsdiffuse);
            pool.compileFS(assetmgr.webgl, "diffuse", defShader.fsdiffuse);

            pool.compileVS(assetmgr.webgl, "line", defShader.vsline);
            pool.compileFS(assetmgr.webgl, "line", defShader.fsline);

            pool.compileVS(assetmgr.webgl, "materialcolor", defShader.vsmaterialcolor);
            
            pool.compileVS(assetmgr.webgl, "defUIMaskVS", defShader.vscodeMaskUI);
            pool.compileFS(assetmgr.webgl, "defUIMaskFS", defShader.fscodeMaskUI);

            pool.compileVS(assetmgr.webgl, "defuifontMaskVS", defShader.vscodeuifontmask);
            pool.compileFS(assetmgr.webgl, "defuifontMaskFS", defShader.fscodeuifontmask);

            // var program_test = pool.linkProgram(assetmgr.webgl, "test", "test");

            var program = pool.linkProgram(assetmgr.webgl, "def", "def");
            var program2 = pool.linkProgram(assetmgr.webgl, "defui", "defui");
            var programuifont = pool.linkProgram(assetmgr.webgl, "defuifont", "defuifont");
            var programdiffuse = pool.linkProgram(assetmgr.webgl, "diffuse", "diffuse");
            var programline = pool.linkProgram(assetmgr.webgl, "line", "line");
            var programmaterialcolor = pool.linkProgram(assetmgr.webgl, "materialcolor", "line");
            var programMaskUI = pool.linkProgram(assetmgr.webgl,"defUIMaskVS","defUIMaskFS");
            var programMaskfont = pool.linkProgram(assetmgr.webgl,"defuifontMaskVS","defuifontMaskFS");
            // {
            //     var sh = new shader("shader/test");
            //     sh.defaultAsset = true;
            //     sh.passes["base"] = [];
            //     var p = new render.glDrawPass();
            //     p.setProgram(program_test);
            //     sh.passes["base"].push(p);
            //     sh.fillUnDefUniform(p);
            //     //sh._parseProperties(assetmgr,JSON.parse(this.shader0).properties);
            //     p.state_ztest = true;
            //     p.state_ztest_method = render.webglkit.LEQUAL;
            //     p.state_zwrite = false;
            //     p.state_showface = render.ShowFaceStateEnum.ALL;
            //     p.setAlphaBlend(render.BlendModeEnum.Close);
            //     //p.uniformTexture("_MainTex", null);
            //     assetmgr.mapShader[sh.getName()] = sh;
            // }

            {
                var sh = new shader("shader/def");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                p.setProgram(program);
                sh.passes["base"].push(p);
                sh.fillUnDefUniform(p);
                //sh._parseProperties(assetmgr,JSON.parse(this.shader0).properties);
                p.state_ztest = true;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.state_zwrite = true;
                p.state_showface = render.ShowFaceStateEnum.CCW;
                p.setAlphaBlend(render.BlendModeEnum.Close);
                //p.uniformTexture("_MainTex", null);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/def3dbeforeui");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                p.setProgram(programdiffuse);
                sh.passes["base"].push(p);
                sh.fillUnDefUniform(p);
                //sh._parseProperties(assetmgr,JSON.parse(this.diffuseShader).properties);
                p.state_ztest = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.state_zwrite = false;
                p.state_showface = render.ShowFaceStateEnum.CCW;
                p.setAlphaBlend(render.BlendModeEnum.Close);
                //p.uniformTexture("_MainTex", null);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/def2");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                p.setProgram(program2);
                sh.passes["base"].push(p);
                sh.fillUnDefUniform(p);
                //sh._parseProperties(assetmgr,JSON.parse(this.uishader).properties);
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.state_ztest = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.setAlphaBlend(render.BlendModeEnum.Close);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/defui");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                p.setProgram(program2);
                sh.passes["base"].push(p);
                sh.fillUnDefUniform(p);
                sh._parseProperties(assetmgr,JSON.parse(this.uishader).properties);
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.state_ztest = false;
                p.state_zwrite = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.setAlphaBlend(render.BlendModeEnum.Blend);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/defuifont");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                p.setProgram(programuifont);
                sh.passes["base"].push(p);
                sh.fillUnDefUniform(p);
                sh._parseProperties(assetmgr,JSON.parse(this.shaderuifront).properties); 
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.state_ztest = false;
                p.state_zwrite = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.setAlphaBlend(render.BlendModeEnum.Blend);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/line");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                sh.passes["base"].push(p);
                p.setProgram(programline);
                sh.fillUnDefUniform(p);                
                p.state_ztest = true;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.state_zwrite = true;
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.setAlphaBlend(render.BlendModeEnum.Close);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/materialcolor");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                sh.passes["base"].push(p);
                //sh._parseProperties(assetmgr,JSON.parse(this.materialShader).properties);
                p.setProgram(programmaterialcolor);
                sh.fillUnDefUniform(p);                
                p.state_ztest = false;
                //p.state_ztest_method = render.webglkit.LEQUAL;
                //p.state_zwrite = true;
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.setAlphaBlend(render.BlendModeEnum.Blend);
                sh.layer = RenderLayerEnum.Overlay;
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/defmaskui");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                sh.passes["base"].push(p);
                sh._parseProperties(assetmgr,JSON.parse(this.uishader).properties);
                p.setProgram(programMaskUI);
                sh.fillUnDefUniform(p);                
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.state_ztest = false;
                p.state_zwrite = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.setAlphaBlend(render.BlendModeEnum.Blend);
                assetmgr.mapShader[sh.getName()] = sh;
            }
            {
                var sh = new shader("shader/defmaskfont");
                sh.defaultAsset = true;
                sh.passes["base"] = [];
                var p = new render.glDrawPass();
                sh.passes["base"].push(p);
                sh._parseProperties(assetmgr,JSON.parse(this.shaderuifront).properties);                
                p.setProgram(programMaskfont);
                sh.fillUnDefUniform(p);
                
                p.state_showface = render.ShowFaceStateEnum.ALL;
                p.state_ztest = false;
                p.state_zwrite = false;
                p.state_ztest_method = render.webglkit.LEQUAL;
                p.setAlphaBlend(render.BlendModeEnum.Blend);
                assetmgr.mapShader[sh.getName()] = sh;
            }
        }
    }

}