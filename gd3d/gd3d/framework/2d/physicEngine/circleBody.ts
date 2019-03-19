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
    export class circleBody extends bassBody implements I2DComponent,I2DBody
    {
        static readonly ClassName:string="circleBody";

        transform: transform2D;
        radius:number=1;

        start() {
            if(this.initData!=null)
            {
                this.body=physic2D.creatCircleBodyByInitData(this.transform.localTranslate.x,this.transform.localTranslate.y,this.radius,this.initData);
            }else
            {
                this.body=physic2D.creatCircleBodyByInitData(this.transform.localTranslate.x,this.transform.localTranslate.y,this.radius,{});
            }
        }
        onPlay(){

        }

        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean) {

        }
    }
}