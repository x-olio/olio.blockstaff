/// <reference path="../../io/reflect.ts" />
namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * Bloom后期效果 控制器
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.nodeComponent
    export class bloomctr implements  INodeComponent
    {
        static readonly ClassName:string="bloomctr";

        private _bloomIntensity:number = 1.4;  //rang
        private _bloomThreshold:number = 0.5;   //rang 0-1
        private _blurSpread:number = 3;
    
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 发光阈值 - 图像中亮度高于该阈值的区域将产生泛光效果
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        get bloomThreshold(){ return this._bloomThreshold};
        set bloomThreshold(value:number){
            this._bloomThreshold = value;
            if(!this.material || !this.material_1 || !this.material_2) return;
            this.material.setFloat("_bloomThreshold", this._bloomThreshold);
        }
    
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 强度 - 附加光（影响到该特效的光源）的全局光强
         * @version egret-gd3d 1.0
         */
        @reflect.Field("number")
        get bloomIntensity(){ return this._bloomIntensity};
        set bloomIntensity(value:number){
            this._bloomIntensity = value;
            if (!this.material || !this.material_3) return;
            //this.material.setFloat("_bloomIntensity", this._bloomIntensity);
            this.material_3.setFloat("_bloomIntensity", this._bloomIntensity);
        }
    
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 模糊扩散 - Frag down sample 的偏移距离
         * @version egret-gd3d 1.0
         */
        get blurSpread(){ return this._blurSpread};
        set blurSpread(value:number){
            this._blurSpread = value;
            if ( !this.material_1 || !this.material_2) return;
            let v4_1 = gd3d.math.pool.new_vector4();
            let v4_2 = gd3d.math.pool.new_vector4();
            v4_1.x = value; v4_1.y = 0;
            v4_2.x = 0; v4_2.y = value;
            this.material_1.setVector4("_blurSpread", v4_1);
            this.material_2.setVector4("_blurSpread", v4_2);
    
            //gd3d.math.pool.delete_vector4(v4_1);
            //gd3d.math.pool.delete_vector4(v4_2);
        }
    
        private app:  application;
        private scene:  scene;
        private camera:  camera;
        private material: material;
        private material_1:  material;
        private material_2:  material;
        private material_3:  material;
        private readonly tag = "__bloomtag__";
        /**
             * @public
             * @language zh_CN
             * @classdesc
             * 挂载的gameobject
             * @version egret-gd3d 1.0
             */
        gameObject:  gameObject;
    
    
        private _init = false;
        private init(){
            let sh = this.scene.app.getAssetMgr().getShader("bloom.shader.json");
            if (!sh) {
                console.warn(`bloom.shader.json not find`);
                return;
            }
    
            let psize = 1024;
            var color = new  cameraPostQueue_Color();
            color[this.tag] = true;
            color.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);
            if(!this.camera.postQueues) this.camera.postQueues = [];
            this.camera.postQueues.push(color);
            var textcolor = new  texture("_color");
            textcolor.glTexture = color.renderTarget;
    
    // Stage 1 - threshold and fragdown sample (based on main texture)
            var post0 = new  cameraPostQueue_Quad();
            post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);
            post0[this.tag] = true;
            this.material = post0.material;
            this.material.use();
    
            post0.material.setShader(sh);
            post0.material.setTexture("_MainTex", textcolor);   // based on main texture
            post0.material.setTexture("_BlurTex", textcolor);   // NOTE: useless
    
            post0.material.setFloat("_bloomIntensity", 1.2);
            post0.material.setFloat("_bloomThreshold", this._bloomThreshold);
            post0.material.setVector4("_blurSpread", new gd3d.math.vector4(0, 0, 0, 0)); // NOTE: offset value must be 0 during filter stage
            post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
            this.camera.postQueues.push(post0);
            // Generate threshold texture:
            var threTex = new  texture("_threshold");
            threTex.glTexture = post0.renderTarget;
    
    // Stage 2 - horizontal blur (based on threshold texture)
            var post0 = new  cameraPostQueue_Quad();
            post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);
    
            post0[this.tag] = true;
            this.material_1 = post0.material;
            this.material_1.use();
    
            post0.material.setShader(sh);
            post0.material.setTexture("_MainTex", threTex);   // based on threshold texture
            post0.material.setTexture("_BlurTex", threTex);   // NOTE: useless
    
            post0.material.setFloat("_bloomIntensity", this._bloomIntensity);
            post0.material.setFloat("_bloomThreshold", 1.0);    // NOTE: blur frag, must be 1.0 during blur stage
            post0.material.setVector4("_blurSpread", new gd3d.math.vector4(this._blurSpread, 0, 0, 0));
            post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
            this.camera.postQueues.push(post0);
            // Generate blur texture
            var hBlur = new  texture("_blur0");
            hBlur.glTexture = post0.renderTarget;
    
    // Stage 3 - vertical blur (based on horizontal blur texture)
            var post0 = new  cameraPostQueue_Quad();
            post0.renderTarget = new gd3d.render.glRenderTarget(this.scene.webgl, psize, psize, true, false);
    
            post0[this.tag] = true;
            this.material_2 = post0.material;
            this.material_2.use();
    
            post0.material.setShader(sh);
            post0.material.setTexture("_MainTex", hBlur);   // based on horizontal blur texture
            post0.material.setTexture("_BlurTex", hBlur);   // NOTE: useless
    
            post0.material.setFloat("_bloomIntensity", this._bloomIntensity);
            post0.material.setFloat("_bloomThreshold", 1.0);    // NOTE: blur frag
            post0.material.setVector4("_blurSpread", new gd3d.math.vector4(0, this._blurSpread, 0, 0)); // NOTE: Empty offset value
            post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
            this.camera.postQueues.push(post0);
            // Generate threshold texture:
            var hvBlur = new  texture("_blur1");
            hvBlur.glTexture = post0.renderTarget;
    
    // Stage 4 - Composition - render final effect
            var post0 = new  cameraPostQueue_Quad();
    
            post0[this.tag] = true;
            this.material_3 = post0.material;
            post0.material.use();
    
            post0.material.setShader(sh);
            post0.material.setTexture("_MainTex", textcolor);
            post0.material.setTexture("_BlurTex", hvBlur);
    
            post0.material.setFloat("_bloomIntensity", this._bloomIntensity);
            post0.material.setFloat("_bloomThreshold", 0.5);    // NOTE: threshold != 1.0 during final render
            post0.material.setVector4("_blurSpread", new gd3d.math.vector4(0.5, 0.5, 0, 0));    // NOTE: spread != 0.0
            post0.material.setVector4("_MainTex_TexelSize",new gd3d.math.vector4( 1/psize,1/psize,psize,psize));
            this.camera.postQueues.push(post0);
    
    
            this._init = true;
        }
    
        start()
        {
            this.app = this.gameObject.transform.scene.app;
            this.scene = this.app.getScene();
    
        }

        onPlay()
        {

        }

        update(delta: number)
        {
            if (this._init) return;
            if(!this.camera )  this.camera = this.gameObject.getComponent("camera") as  camera;
            if(this.camera) this.init();
        }
        /**
         * @private
         */
        remove()
        {
            this._init = false;
            if(this.camera){
                let arr = this.camera.postQueues;
                let dArr = [];
                for(var i=0;i<arr.length ;i++){
                    let temp = arr[i];
                    if(temp[this.tag]){
                        dArr.push(temp);
                    }
                }
                dArr.forEach(element => {
                    if(element) {
                        let idx = arr.indexOf(element);
                        if (idx != -1) {
                             arr.splice(idx,1);
                        }
                    }
                });
            }
            if (this.material) {
                this.material.unuse();
                this.material = null;
            }
            if (this.material_1) {
                this.material_1.unuse();
                this.material_1 = null;
            }
            if (this.material_2) {
                this.material_2.unuse();
                this.material_2 = null;
            }
            if (this.material_3) {
                this.material_3.unuse();
                this.material_3 = null;
            }
        }
        /**
         * @private
         */
        clone()
        {
    
        }
    }
}

