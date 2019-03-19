namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 路径组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeComponent
    export class guidpath implements INodeComponent
    {
        static readonly ClassName:string="guidpath";
        
        private paths:gd3d.math.vector3[];
        private _pathasset:pathasset;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置路径组件需要的路径资源
         * @version egret-gd3d 1.0
         */
        set pathasset(pathasset:pathasset){
            if(this._pathasset)
            {
                this._pathasset.unuse();
            }
            this._pathasset=pathasset;
            if(this._pathasset)
            {
                this._pathasset.use();
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 路径组件的pathasset
         * @version egret-gd3d 1.0
         */
        get pathasset()
        {
            return this._pathasset;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 移动速度
         * @version egret-gd3d 1.0
         */
        public speed:number=1;

        private isactived:boolean=false;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 按照路径开始移动
         * @version egret-gd3d 1.0
         */
        play(loopCount:number=1)
        {
            this.isactived=true;
            this.loopCount=loopCount;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 暂停移动
         * @version egret-gd3d 1.0
         */
        pause()
        {
            this.isactived=false;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 停止移动
         * @version egret-gd3d 1.0
         */
        stop()
        {
            this.isactived=false;
            this.folowindex=0;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 重新按照路径移动
         * @version egret-gd3d 1.0
         */
        replay(loopCount:number=1)
        {
            this.isactived=true;
            this.folowindex=0;
            this.loopCount=loopCount;
        }

        private mystrans:transform;
        private datasafe:boolean=false;
        private folowindex:number=0;
        public isloop:boolean=false;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载此组件的gameobject是否朝向前方
         * @version egret-gd3d 1.0
         */
        lookforward:boolean=false;
        private loopCount:number=1;

        private oncomplete:()=>void;
        /**
         * @public
         * @language zh_CN
         * @param pathasset 路径资源
         * @param speed 移动速度
         * @param oncomplete 按照路径移动结束需要执行的事件
         * @classdesc
         * 设置路径组件的需要的参数
         * @version egret-gd3d 1.0
         */
        setpathasset(pathasset:pathasset,speed:number=1,oncomplete:()=>void=null)
        {
            this.pathasset=pathasset;
            if(pathasset==null)
            {
                console.log(this.gameObject.getName().toString+":are you sure set the right pathasset（error：null）");
                return;
            }
            this.paths=pathasset.paths;
            if(this.paths[0]!=null)
            {
                gd3d.math.vec3Clone(this.paths[0],this.gameObject.transform.localTranslate);
                this.datasafe=true;
            }
            this.mystrans=this.gameObject.transform;
            this.speed=speed;
            
            this.oncomplete=oncomplete;
        }
        start() 
        {

        }

        onPlay()
        {

        }

        update(delta: number) 
        {
            if(!this.isactived||!this.datasafe) return;
            this.followmove(delta);
            
        }
        private adjustDir:boolean=false;
        private followmove(delta: number)
        {
            var dist=gd3d.math.vec3Distance(this.mystrans.localTranslate,this.paths[this.folowindex]);
            
            if(dist<0.01)
            {
                if(this.folowindex<this.paths.length-1)
                {
                    
                    var dir=new gd3d.math.vector3();
                    gd3d.math.vec3Clone(this.paths[this.folowindex],this.mystrans.localTranslate);
                    this.folowindex++;
                    this.adjustDir=true;
                }
                else
                {
                    this.folowindex=0;
                    if(!this.isloop)
                    {
                        this.loopCount--;
                        if(this.loopCount==0)
                        {
                            this.isactived=false;
                            this.loopCount=1;
                            if(this.oncomplete)
                            {
                                this.oncomplete();
                            }
                        }
                    }
                }
            }
            else
            {
                var dir=new gd3d.math.vector3();
                gd3d.math.vec3Subtract(this.paths[this.folowindex],this.mystrans.localTranslate,dir);

                if(this.adjustDir)
                {
                    var targetpos=this.paths[this.folowindex];
                    var localppos=this.mystrans.localTranslate;
                    var quat=gd3d.math.pool.new_quaternion();
                    gd3d.math.quatLookat(localppos,targetpos,quat);
                    gd3d.math.quatClone(quat,this.mystrans.localRotate);
                    gd3d.math.pool.delete_quaternion(quat);
                    this.adjustDir=false;
                }

                var distadd=this.speed*delta;
                if(distadd>dist) distadd=dist;
                var lerp=distadd/dist;
                gd3d.math.vec3SLerp(this.mystrans.localTranslate,this.paths[this.folowindex],lerp,this.mystrans.localTranslate);
                this.mystrans.markDirty();
            }
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;
         /**
         * @private
         */
        remove() 
        {
            if(this._pathasset)
            {
                this._pathasset.unuse();
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