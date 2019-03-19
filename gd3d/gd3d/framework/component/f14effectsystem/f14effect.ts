namespace gd3d.framework
{
    @reflect.nodeRender
    @reflect.nodeComponent
    export class f14EffectSystem implements IRenderer
    {
        static readonly ClassName:string="f14EffectSystem";

        layer: RenderLayerEnum=RenderLayerEnum.Transparent;
        
        //renderLayer: CullingMask=CullingMask.default;
        get renderLayer() {return this.gameObject.layer;}
        set renderLayer(layer:number){
            this.gameObject.layer = layer;
        }
        queue: number=10;
        start() {
            if(this.data && this.data.beloop == true){
                this.play();
            }
        }

        onPlay()
        {

        }

        gameObject: gameObject;

        
        private fps:number=30;
        public data:F14EffectData;
        public layers:F14Layer[] =[];
        //--------------------------------------------------------------------
        public VF:number=gd3d.render.VertexFormatMask.Position | render.VertexFormatMask.Color | render.VertexFormatMask.UV0;
        public webgl:WebGLRenderingContext;

        private _f14eff: f14eff;

        /**
         * f14eff 资源
         * @private
         */
        @gd3d.reflect.Field("f14eff")
        @gd3d.reflect.UIStyle("WidgetDragSelect")
        get f14eff()
        {
            return this._f14eff;
        }
        set f14eff(asset: f14eff)
        {
            if (this._f14eff != null)
            {
                this._f14eff.unuse();
            }
            this._f14eff = asset;
            this.setData(asset.data);
        }
        private _delayTime:number=0;
        /**
         * delaytime
         * @private
         */
        @gd3d.reflect.Field("number")
        get delay(){
            return this._delayTime;
        }
        set delay(deley:number){
            this._delayTime = deley;
        }

        setData(data:F14EffectData)
        {
            //-------------------准备各种需要访问
            this.webgl=gd3d.framework.sceneMgr.app.webgl;

            this.data = data;
            for (let i = 0,count=this.data.layers.length; i < count; i++)
            {
                let layerdata:F14LayerData = this.data.layers[i];
                this.addF14layer(layerdata.type,layerdata);
            }
            for(let i=0;i<this.renderBatch.length;i++)
            {
                if(this.renderBatch[i].type==F14TypeEnum.SingleMeshType)
                {
                    (this.renderBatch[i] as F14SingleMeshBath).OnEndCollectElement();
                } 
            }
        }
        /**
         * ref effect 增加transform层控制
         */
        // refRoot:math.matrix=new math.matrix();
        // public setBatchRootMat(pos:math.vector3,euler:math.vector3,scale:math.vector3)
        // {
        //     let temtrot=gd3d.math.pool.new_quaternion();
        //     math.quatFromEulerAngles(euler.x,euler.y,euler.z,temtrot);
        //     math.matrixMakeTransformRTS(pos,scale,temtrot,this.refRoot);
        //     gd3d.math.pool.delete_quaternion(temtrot);
        // }
        get root():transform
        {
            // if(this._root!=null&&this._root.parent==null)
            // {
            //     this._root.parent=this.gameObject.transform;
            // }
            return this._root||this.gameObject.transform;
        }
        _root:transform;
        
        private elements:F14Element[] =[];
        public renderBatch:F14Basebatch[] =[];

        private loopCount:number=0;
        private allTime:number=0;
        private renderActive:boolean=false;
        public beref:boolean=false;
        public update(deltaTime:number)
        {
            if(this.data==null)
            {
                this.renderActive=false;
                return;
            }
            this.renderActive=true;
            if(this.enabletimeFlow)
            {
                this.allTime+=deltaTime*this.playRate;
                this.totalTime=this.allTime-this._delayTime;
                if(this.totalTime<=0)
                {
                    this.renderActive=false;
                    return;
                }
                this.totalFrame=this.totalTime*this.fps;
                if(!this.data.beloop&&this.totalFrame>this.data.lifeTime)
                {
                    this.renderActive=false;
                    this.enabletimeFlow=false;
                    //this.stop();
                    if(this.onFinish)
                    {
                        this.onFinish();
                    }
                    return;
                }

                this.restartFrame = this.totalFrame % this.data.lifeTime;
                this.restartFrame=Math.floor(this.restartFrame);
                let newLoopCount=Math.floor(this.totalFrame/this.data.lifeTime);
                if(newLoopCount!=this.loopCount)
                {
                    this.OnEndOnceLoop();
                }
                this.loopCount=newLoopCount;

                if(this.renderCamera==null) return;
                for (let i = 0; i < this.elements.length; i++)
                {
                    this.elements[i].update(deltaTime, this.totalFrame, this.fps);
                }
            }else
            {
                if(this.totalTime<=0)
                {
                    this.renderActive=false;
                    return;
                }
                if(!this.data.beloop&&this.totalFrame>this.data.lifeTime)
                {
                    this.renderActive=false;
                    return;
                }
            }

            // if (this.data == null||this.playState==PlayStateEnum.beReady)
            // {
            //     this.renderActive=false;
            //     return;
            // }
            // if(this.playState==PlayStateEnum.play)
            // {
            //     this.allTime+=deltaTime*this.playRate;
            //     this.totalTime=this.allTime-this._delayTime;
            //     if(this.totalTime<=0)
            //     {
            //         this.renderActive=false;
            //         return;
            //     }
            // }
            // this.renderActive=true;//上面return了应该不再render 
            // this.totalFrame=this.totalTime*this.fps;
            // if(!this.data.beloop&&this.totalFrame>this.data.lifeTime)
            // {
            //     this.renderActive=false;
            //     this.stop();
            // }
            // this.restartFrame = this.totalFrame % this.data.lifeTime;
            // this.restartFrame=Math.floor(this.restartFrame);
            // let newLoopCount=Math.floor(this.totalFrame/this.data.lifeTime);
            // if(newLoopCount!=this.loopCount)
            // {
            //     this.OnEndOnceLoop();
            // }
            // this.loopCount=newLoopCount;

            // for (let i = 0; i < this.elements.length; i++)
            // {
            //     this.elements[i].update(deltaTime, this.totalFrame, this.fps);
            // }
        }
        private OnEndOnceLoop()
        {
            for (let i = 0; i < this.elements.length; i++)
            {
                this.elements[i].OnEndOnceLoop();
            }
        }

        private _renderCamera:camera;
        get renderCamera():camera
        {
            if(this._renderCamera!=null)
            {
                return this._renderCamera;
            }else
            {
                return gd3d.framework.sceneMgr.app.getScene().mainCamera;
            }
        }
        public mvpMat:math.matrix=new math.matrix();

        public render(context: renderContext, assetmgr: assetMgr, camera: camera,Effqueue:number=0)
        {         
            if(!this.renderActive||!this.enableDraw) return;
            DrawCallInfo.inc.currentState=DrawCallEnum.EffectSystem;

            this._renderCamera=camera;
            let curCount = 0;
            context.updateModel(this.root);
            math.matrixClone(context.matrixModelViewProject,this.mvpMat);
            for (let i = 0; i < this.renderBatch.length; i++)
            {
                this.renderBatch[i].render(context,assetmgr,camera,Effqueue+curCount);
                curCount += this.renderBatch[i].getElementCount();
            }
        }
        private totalTime:number=0;
        public restartFrame:number;
        totalFrame:number=0;
        private addF14layer(type:F14TypeEnum, layerdata:F14LayerData):F14Layer
        {
            if (type==F14TypeEnum.SingleMeshType)
            {
                let layer = new F14Layer(this,layerdata);
                let element = new F14SingleMesh(this, layer);
                layer.element = element;
    
                this.layers.push(layer);
                this.elements.push(element);
                //--------------------------------------放到batcher中----------
                let data=layerdata.elementdata as F14SingleMeshBaseData;
                if(this.layers.length>1&&this.layers[this.layers.length-2].type==type)
                {
                    let batch=this.layers[this.layers.length-2].batch as F14SingleMeshBath;
                    if(batch.type==F14TypeEnum.SingleMeshType&&batch.canBatch(element))
                    {
                        batch.addElement(element);
                        layer.batch = batch;
                    }else
                    {
                        let _batch= new F14SingleMeshBath(data.material,this);
                        _batch.addElement(element);
                        layer.batch = _batch;
                        this.renderBatch.push(_batch);
                    }
                }
                else if(this.layers.length=1)
                {
                    let batch= new F14SingleMeshBath(data.material,this);
                    batch.addElement(element);
                    layer.batch = batch;
                    this.renderBatch.push(batch);
                }
                return layer;
            }else if(type==F14TypeEnum.particlesType)
            {
                let layer = new F14Layer(this,layerdata);
                let element = new F14Emission(this, layer);
                layer.element = element;
    
                this.layers.push(layer);
                this.elements.push(element);
                //--------------------------------------放到batcher中----------
                let batch= new F14EmissionBatch(this,element);
                layer.batch = batch;
                this.renderBatch.push(batch);
                return layer;
            }else
            {
                let layer = new F14Layer(this,layerdata);
                let element = new F14RefElement(this,layer);
                let data=layerdata.elementdata as F14RefBaseData;
                layer.element = element;
                //element.RefEffect.setBatchRootMat(data.localPos,data.localEuler,data.localScale);


                this.layers.push(layer);
                this.elements.push(element);
                var refbath = new F14RefElementBatch(this,element);
                this.renderBatch.push(refbath);
                layer.batch = refbath;
    
                return layer;
            }
        }
    
        //返回element个数（包含reflayer内部的）
        public getElementCount():number
        {
            let totalcount = 0;
            for(let i=0;i<this.layers.length;i++)
            {
                if(this.layers[i].type==F14TypeEnum.RefType)
                {
                    totalcount += this.layers[i].batch.getElementCount();
                }else
                {
                    totalcount++;
                }
            }
            return totalcount;
        }    
        private playRate:number=1.0;
        //private playState:PlayStateEnum=PlayStateEnum.beReady;
        //private active:boolean=false;
        enabletimeFlow=false;
        enableDraw=false;
        private onFinish:any;
        public play(onFinish:()=>void=null,PlayRate:number=1.0,)
        {
            if(this.allTime>0)
            {
                this.reset();
            }
            this.enabletimeFlow=true;
            this.enableDraw=true;
            this.playRate=PlayRate;

            if(onFinish)
            {
                this.onFinish=onFinish;
            }

            // if(this.playState!=PlayStateEnum.beReady)
            // {
            //     this.reset();
            // }
            // this.playState=PlayStateEnum.play;
            // this.playRate=PlayRate;
        }
        public stop()
        {
            this.enabletimeFlow=false;
            this.enableDraw=false;
            this.reset();

            // this.playState=PlayStateEnum.beReady;
            // this.reset();
        }

        //private bePause:boolean=false;
        public pause()
        {
            // if(this.playState==PlayStateEnum.pause)
            // {
            //     this.playState=PlayStateEnum.play;
            // }else
            // {
            //     this.playState=PlayStateEnum.pause;
            // }
            this.enableDraw=true;
            this.enabletimeFlow=false;
        }
        public changeColor(newcolor:math.color)
        {
            for (let i = 0; i < this.elements.length; i++)
            {
                this.elements[i].changeColor(newcolor);
            }
        }

        public changeAlpha(newAlpha:number)
        {
            for (let i = 0; i < this.elements.length; i++)
            {
                this.elements[i].changeAlpha(newAlpha);
            }
        }
        reset()
        {
            this.allTime=0;
            //this.totalTime=0;
            for(let key in this.elements)
            {
                this.elements[key].reset();
            }
        }
        clone() {
            
        }
        remove() {
            this.data=null;
            this._f14eff=null;
            this.webgl=null;
            this._root=null;
            this._renderCamera=null;
            this.gameObject=null;

            for(let key in this.layers)
            {
                this.layers[key].dispose();
            }
            for(let key in this.elements)
            {
                this.elements[key].dispose();
            }
            for(let key in this.renderBatch)
            {
                this.renderBatch[key].dispose();
            }
            delete this.layers;
            delete this.elements;
            delete this.renderBatch;
        }
    }
    export enum PlayStateEnum
    {
        play,
        beReady,
        pause
    }
}