namespace gd3d.framework
{
    export class F14Layer
    {
        public active:boolean = true;//timeline window 的toggle
        public effect:f14EffectSystem;

        public data:F14LayerData;
        public type:F14TypeEnum;

        public frameList:number[] =[];//记录存在的frame，再排个序  boolcontainframe (关键帧的索引值，从小到大)
        public frames:{[index:number]:F14Frame} = {};//取得对应Frame的信息
    
        public Attlines:{[name:string]:F14AttTimeLine} ={}; //记录了五种数据的（关键帧位置和值）
    
        public element:F14Element;
        public batch:F14Basebatch;
        constructor(effect:f14EffectSystem,data:F14LayerData)
        {
            this.effect = effect;
            this.data = data;
            this.type = data.type;
            for(var ff in this.data.frames)
            {
                let framedata = this.data.frames[ff];
                this.addFrame(framedata.frameindex, framedata);
            }
        }
        // //改变data的life
        // public OnChangeEffectLife()
        // {
        //     for(let i= this.frameList.length-1; i>=0;i--)
        //     {
        //        if(this.frameList[i]>=this.effect.data.lifeTime)
        //         {
        //             this.removeFrame(this.frameList[i]);
        //         } 
        //     }
        // }
        public addFrame(index:number,framedata:F14FrameData):F14Frame
        {
            if (this.frames[index]) return this.frames[index];
            // if(framedata == null)
            // {
            //     framedata = new F14FrameData(index,this.type);
            //     if(this.type==F14TypeEnum.particlesType)
            //     {
            //         F14EmissionBaseData.copyto(this.data.elementdata, framedata.EmissionData);
            //     }
            //     // //scriptableObject
            //     this.data.frames[index]=framedata;
            // }
            let frame = new F14Frame(this, framedata);
            this.frameList.push(index);
            this.frameList.sort((a,b)=>{return a-b;});
            this.frames[index]=frame;
            return frame;
        }
        public removeFrame(frame:number)
        {
            if (this.frames[frame])
            {
                delete this.frames[frame];
                let index=this.frameList.indexOf(frame);
                this.frameList.splice(index,1);

                //scriptableObject
                delete this.data.frames[frame];
            } 
    
            for(var item in this.Attlines)
            {
                this.Attlines[item].remove(frame);
            }
    
        }

        public dispose()
        {
            this.data=null;
            this.effect=null;
            this.frameList.length=0;
            this.frames=null;
            this.Attlines=null;
            this.element=null;
            this.batch=null;
        }
    }
    export class F14Frame
    {
        public layer:F14Layer;
        public data:F14FrameData;
        public attDic:{[name:string]:any};//自行设置的data 包含5种关键数据
        constructor(layer:F14Layer,data:F14FrameData)
        {
            this.layer = layer;
            this.data = data;
            this.attDic=this.data.singlemeshAttDic;

            for(let key in this.data.singlemeshAttDic)
            {
                this.setdata(key,this.data.singlemeshAttDic[key]);
            }

        }
    
        public setdata(name:string,obj)
        {
            if(this.layer.Attlines[name]==null)
            {
                if(obj instanceof gd3d.math.vector3)
                {
                    this.layer.Attlines[name]=new F14AttTimeLine(name,gd3d.math.vec3SLerp,gd3d.math.vec3Clone);
                }else if(obj instanceof gd3d.math.vector4)
                {
                    this.layer.Attlines[name]=new F14AttTimeLine(name,gd3d.math.vec4SLerp,math.vec4Clone);
                }else if(obj instanceof gd3d.math.color)
                {
                    this.layer.Attlines[name]=new F14AttTimeLine(name,gd3d.math.colorLerp,math.colorClone);                    
                }
            }
            this.layer.Attlines[name].addNode(this.data.frameindex, obj);
            this.attDic[name]=obj;
        }
        public removedata(name:string)
        {
            delete this.attDic[name];
            if(this.layer.Attlines[name])
            {
                this.layer.Attlines[name].remove(this.data.frameindex);
            }
        }
    
        public getdata(name:string)
        {
            return this.attDic[name];
        }
    }
    
    export class F14AttTimeLine
    {

        public name:string;
        public lerpFunc:(from,to,lerp,out)=>void;
        public cloneFunc:(from,to)=>void;
        constructor(name:string,lerpfunc:(from,to,lerp,out)=>void,clonefunc:(from,to)=>void)
        {
            this.name = name;
            this.lerpFunc=lerpfunc;
            this.cloneFunc=clonefunc;
        }
        
        public frameList:number[] =[];    //记录了关键帧的索引值
        public line:{[index:number]:any} ={};//记录了关键帧的帧索引和某一项值
    
        //public Dictionary<int, object> cacheData = new Dictionary<int, object>();
        public addNode(frame:number,value:any)
        {
            let index:number=this.frameList.indexOf(frame);
            if(index<0)
            {
                this.frameList.push(frame);   
                this.frameList.sort((a,b)=>{return a-b;});             
            }
            this.line[frame] = value;
        }
        public remove(frame:number)
        {
            if(this.line[frame])
            {
                delete this.line[frame];
                let index=this.frameList.indexOf(frame);
                this.frameList.splice(index,1);
            }

        }
    
        public getValue(frame:number, basedate:F14SingleMeshBaseData,out:any)
        {
            //if (this.frameList.Contains(frame)) return this.line[frame];
            if (this.frameList.length == 0)
            {
                return;
            }
            if(this.line[frame])
            {
                this.cloneFunc(this.line[frame],out);
                return;
            }

            if(frame < this.frameList[0])
            {
                let toindex = this.frameList[0];
                let from=basedate[this.name];
                let to = this.line[toindex];
                let lerp=(frame-basedate.firtstFrame)/toindex;
                this.lerpFunc(from, to,lerp,out);
            }else if(frame>=this.frameList[this.frameList.length-1])
            {
                //out=this.line[this.frameList[this.frameList.length - 1]];
                this.cloneFunc(this.line[this.frameList[this.frameList.length - 1]],out);
            }else
            {
                for (let i=0;i<this.frameList.length;i++)
                {
                    if(this.frameList[i]>frame)
                    {
                        let to = this.frameList[i];
                        let from = this.frameList[i - 1];
                        this.lerpFunc(this.line[from],this.line[to], (frame - from)/(to - from),out);
                        return;
                    }
                }
            }
    

        }
    }
    
    

}