namespace gd3d.framework
{
    export class DeviceInfo
    {
        private static debuginfo;
        private static getExtension()
        {
            this.debuginfo= sceneMgr.app.webgl.getExtension('WEBGL_debug_renderer_info');
            if(this.debuginfo==null)
            {
                console.warn("extension(WEBGL_debug_renderer_info) not support!");
            }
        }
        /**
         * GPU类型
         */
        public static get GraphDevice():string
        {
            if(this.debuginfo==null)
            {
                this.getExtension();
            }
            if(this.debuginfo)
            {
                let device:string=sceneMgr.app.webgl.getParameter(this.debuginfo.UNMASKED_RENDERER_WEBGL);
                return device;
            }else
            {
                return "unknown";
            }
        }
        /**
         * canvas 宽度
         */
        public static get CanvasWidth():number
        {
           if(sceneMgr.app)
           {
                return sceneMgr.app.webgl.canvas.width;
           }else
           {
               return null;
           }
        }
        /**
         * canvas 高度
         */
        public static get CanvasHeight():number
        {
            if(sceneMgr.app)
            {
                return sceneMgr.app.webgl.canvas.height;
            }else
            {
                return null;
            }
            
        }
        /**
         * 屏幕自适应方式
         */
        public static get ScreenAdaptiveType():string
        {
            if(sceneMgr.app)
            {
                return sceneMgr.app.screenAdaptiveType;
            }else
            {
                return "unknown";
            }
        }
        /**
         * 屏幕宽度
         */
        public static get ScreenWidth():number
        {
            return window.screen.width*(window.devicePixelRatio || 1);
        }
        /**
         * 屏幕高度
         */
        public static get ScreenHeight():number
        {
            return  window.screen.height*(window.devicePixelRatio || 1);
        }

    }

    export enum DrawCallEnum
    {
        UI,
        SKinrender,
        Meshrender,
        EffectSystem
    }

    export class DrawCallInfo
    {
        private static _inc:DrawCallInfo;
        static get inc():DrawCallInfo
        {
            if(this._inc==null)
            {
                this._inc=new DrawCallInfo();
            }
            return this._inc;
        }
        static BeActived:boolean=false;

        data:number[]=[];
        currentState:DrawCallEnum=DrawCallEnum.Meshrender;
        reset()
        {
            this.data[DrawCallEnum.UI]=0;
            this.data[DrawCallEnum.SKinrender]=0;
            this.data[DrawCallEnum.Meshrender]=0;
            this.data[DrawCallEnum.EffectSystem]=0;
        }

        add()
        {
            this.data[this.currentState]+=1;
        }

        private SKinrenderDraw:HTMLLIElement;
        private MeshrenderDraw:HTMLLIElement;
        private EffectrenderDraw:HTMLLIElement;
        private UIrenderDraw:HTMLLIElement;
        
        private rootdiv:HTMLDivElement;
        private initShowPlane()
        {
            let div = document.createElement("div");
            this.rootdiv=div;
            sceneMgr.app.container.appendChild(div);
            div.style.display="inline-block";
            div.style.position="absolute";
            div.style.left = "100px";
            div.style.top = "0px";
            div.style.height="200px";
            div.style.width = "200px";
    
            let ul = document.createElement("ul");
            div.appendChild(ul);
            let li1 = document.createElement("li");
            li1.textContent="SkinMeshDrawcall: ";
            li1.style.fontSize="12px";
            li1.style.color="Aqua";
            li1.style.height="20px";
            li1.style.width="200px";
            li1.style.left="0px";
            ul.appendChild(li1);
            this.SKinrenderDraw=li1;
    
            let li3 = document.createElement("li");
            li3.textContent="MeshrenderDrawcall: ";
            li3.style.fontSize="12px";
            li3.style.color="Aqua";
            li3.style.height="20px";
            li3.style.width="200px";
            li3.style.left="0px";
            ul.appendChild(li3);
            this.MeshrenderDraw=li3;
    
            let li2 = document.createElement("li");
            li2.textContent="EffectrenderDrawcall: ";
            li2.style.fontSize="12px";
            li2.style.color="Aqua";
            li2.style.height="20px";
            li2.style.width="200px";
            li2.style.left="0px";
            ul.appendChild(li2);
            this.EffectrenderDraw=li2;

            let li4 = document.createElement("li");
            li4.textContent="EffectrenderDrawcall: ";
            li4.style.fontSize="12px";
            li4.style.color="Aqua";
            li4.style.height="20px";
            li4.style.width="200px";
            li4.style.left="0px";
            ul.appendChild(li4);
            this.UIrenderDraw=li4;

        }

        showPerFrame()
        {
            this.MeshrenderDraw.textContent="MeshrenderDrawcall: "+this.data[DrawCallEnum.Meshrender];
            this.SKinrenderDraw.textContent="SkinMeshDrawcall: "+this.data[DrawCallEnum.SKinrender];
            this.EffectrenderDraw.textContent="EffectrenderDrawcall: "+this.data[DrawCallEnum.EffectSystem];
            this.UIrenderDraw.textContent="UIrenderDrawcall: "+this.data[DrawCallEnum.UI];
            
        }


        showDrawcallInfo()
        {
            if(this.SKinrenderDraw==null)
            {
                this.initShowPlane();
            }
            DrawCallInfo.BeActived=true;
            this.rootdiv.style.visibility="visible";
        }
        closeDrawCallInfo()
        {
            DrawCallInfo.BeActived=false;
            this.rootdiv.style.visibility="hidden";
        }
    }

}