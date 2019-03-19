/// <reference path="../../../io/reflect.ts" />

namespace gd3d.framework
{
    @reflect.node2DComponent
    export class uirect implements I2DComponent
    {
        static readonly ClassName:string="uirect";

        canbeClick:boolean=true;

        start() {

        }

        onPlay(){

        }
        
        update(delta: number) {

        }
        transform: transform2D;
        onPointEvent(canvas: canvas, ev: PointEvent, oncap: boolean) {

        }
        remove() {
            this.transform = null;
        }

    }

}