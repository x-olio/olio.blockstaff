/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 路径编辑资源
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class pathasset implements IAsset
    {
        static readonly ClassName:string="pathasset";

        @gd3d.reflect.Field("constText")
        private name: constText;
        private id: resID = new resID();
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 是否为默认资源
         * @version egret-gd3d 1.0
         */
        defaultAsset: boolean = false;
        constructor(assetName: string = null)
        {
            if (!assetName)
            {
                assetName = "path_" + this.getGUID();
            }
            this.name = new constText(assetName);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源名称
         * @version egret-gd3d 1.0
         */
        getName(): string
        {
            return this.name.getText();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源唯一id
         * @version egret-gd3d 1.0
         */
        getGUID(): number
        {
            return this.id.getID();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引用计数加一
         * @version egret-gd3d 1.0
         */
        use()
        {
            sceneMgr.app.getAssetMgr().use(this);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引用计数减一
         * @version egret-gd3d 1.0
         */
        unuse()
        {
            sceneMgr.app.getAssetMgr().unuse(this);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 释放资源
         * @version egret-gd3d 1.0
         */
        dispose()
        {
           this.paths.length=0;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 计算资源字节大小
         * @version egret-gd3d 1.0
         */
        caclByteLength(): number
        {
            if (this.paths)
            {
                var length=this.paths.length;
                var value=length*12;
                return value;
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 路径节点数据
         * @version egret-gd3d 1.0
         */
        paths:gd3d.math.vector3[]=[];
        private type:pathtype;
        private instertPointcount:number;
        private items:pointitem[]=[];
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param json json数据
         * @version egret-gd3d 1.0
         */
        Parse(json:JSON)
        {
           var type:string=json["type"];
           switch(type)
           {
               case "once":
               this.type=pathtype.once;
               break;
               case "loop":
               this.type=pathtype.loop;
               break;
               case "pingpong":
               this.type=pathtype.pingpong;
           }
           this.instertPointcount=json["insertPointcount"];
           var paths=json["path"];
           for (var key in paths)
           {
                var item=new pointitem();
                var pointnode=paths[key];
                var pointtype=pointnode["type"];
                switch(pointtype)
                {
                    case "VertexPoint":
                    item.type=epointtype.VertexPoint;
                    break;

                    case "ControlPoint":
                    item.type=epointtype.ControlPoint;
                    break;
                }
                var pointlocation:string=pointnode["point"];
                var arr=pointlocation.split(",");
                item.point=new gd3d.math.vector3(parseFloat(arr[0]),parseFloat(arr[1]),parseFloat(arr[2]));
                this.items.push(item);
           }
           this.getpaths();
           //------------------------------------------------
           this.items.length=0;
           for(var i=0;i<this.lines.length;i++)
           {
               this.lines[i].length=0;
           }
           this.lines.length=0;
        }
        private lines:Array<gd3d.math.vector3>[]=[];
        private getpaths()
        {
            var line=new Array();
            for(var i=0;i<this.items.length;i++)
            {
                var item=this.items[i];
                if(i==0)
                {
                    line.push(item.point);
                    this.lines.push(line);
                }
                else if(i==this.items.length-1)
                {
                    if(this.type==pathtype.loop)
                    {
                        if(item.type==epointtype.VertexPoint)
                        {
                            line.push(item.point);
                            line=new Array();
                            line.push(item.point);
                            line.push(this.items[0].point);
                            this.lines.push(line);
                        }
                        else
                        {
                            line.push(item.point);
                            line.push(this.items[0].point);
                        }
                    }
                    else
                    {
                        line.push(item.point);
                    }
                }
                else
                {
                    if(item.type==epointtype.VertexPoint)
                    {
                        line.push(item.point);
                        line=new Array();
                        line.push(item.point);
                        this.lines.push(line);
                    }
                    else
                    {
                        line.push(item.point);
                    }
                }
            }
            //-------------------------------------
            var linecount=this.lines.length;
            var pathindex=0;
            for(var i=0;i<linecount;i++)
            {
                if(i==linecount-1)
                {
                    for(var k=0;k<this.instertPointcount;k++)
                    {
                        var rate=k/(this.instertPointcount-1);
                        this.paths[pathindex]=this.getBeisaierPointAlongCurve(this.lines[i],rate);
                        pathindex++;
                    }
                }
                else
                {
                    for(var k=0;k<this.instertPointcount;k++)
                    {
                        var rate=k/this.instertPointcount;
                        this.paths[pathindex]=this.getBeisaierPointAlongCurve(this.lines[i],rate);
                        pathindex++;
                    }
                }

            }
        }

        private getBeisaierPointAlongCurve(points:any[],rate:number,clearflag:boolean=false):gd3d.math.vector3
        {
            var length=points.length;
            if(points.length<2)
            {
                console.log("計算貝塞爾需要超過2個點");
                return;
            }
            if(length==2)
            {
                var out:gd3d.math.vector3=new gd3d.math.vector3();
                this.vec3Lerp(points[0],points[1],rate,out);
                if(clearflag)
                {
                    points.length=0;
                }
                return out;
            }
            var temptpoints:gd3d.math.vector3[]=[];
            for(var i=0;i<length-1;i++)
            {
                var temp=gd3d.math.pool.new_vector3();
                this.vec3Lerp(points[i],points[i+1],rate,temp);
                temptpoints[i]=temp;
            }
            if(clearflag)
            {
                points.length=0;
            }
            return this.getBeisaierPointAlongCurve(temptpoints,rate,true);
        }
        private vec3Lerp(start:gd3d.math.vector3,end:gd3d.math.vector3,lerp:number,out:gd3d.math.vector3)
        {
            gd3d.math.vec3Subtract(end,start,out);
            gd3d.math.vec3ScaleByNum(out,lerp,out);
            gd3d.math.vec3Add(start,out,out);
        }
    }
    /**
     * @private
     */
    export enum pathtype
    {
        once,
        loop,
        pingpong
    }
    /**
     * @private
     */
    export enum epointtype
    {
        VertexPoint,
	    ControlPoint
    }
    /**
     * @private
     */
    export  class pointitem
    {
        point:gd3d.math.vector3;
        type:epointtype;
        // constructor(point:gd3d.framework.transform,type:pointtype)
        // {
        //     this.point=point;
        //     this.type=type;
        // }
    }
    
}