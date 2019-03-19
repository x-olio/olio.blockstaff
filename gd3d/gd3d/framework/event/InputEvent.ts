namespace gd3d.event
{
    export class InputEvent extends AEvent
    {
        OnEnum_key(event: KeyEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.On(KeyEventEnum[event],func,thisArg);
        }
        EmitEnum_key(event: KeyEventEnum, ...args: Array<any>){
            super.Emit(KeyEventEnum[event],args);
        }

        OnEnum_point(event: PointEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.On(PointEventEnum[event],func,thisArg);
        }
        EmitEnum_point(event: PointEventEnum, ...args: Array<any>){
            super.Emit(PointEventEnum[event],args);
        }
        
    }
}