/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
     /**
     * @public  
     * @language zh_CN
     * @classdesc
     * rect 刚体
     * @version gd3d 1.0
     */
    @reflect.node2DComponent
    export class rectBody extends bassBody implements I2DComponent,I2DBody
    {
        static readonly ClassName:string="rectBody";

        transform: transform2D;
        start() {
            if(this.initData!=null)
            {
                this.body=physic2D.creatRectBodyByInitData(this.transform.localTranslate.x,this.transform.localTranslate.y,this.transform.width,this.transform.height,this.initData);
            }else
            {
                this.body=physic2D.creatRectBodyByInitData(this.transform.localTranslate.x,this.transform.localTranslate.y,this.transform.width,this.transform.height,{});
            }
            //this.body=physic2D.creatRectBody(this.transform.localTranslate.x,this.transform.localTranslate.y,this.transform.width,this.transform.height,this.beStatic);
        }
        onPlay(){

        }

        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean) {

        }
    }
}