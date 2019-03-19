namespace gd3d.event
{
    export interface IUIEventer{
        /**
        * 添加事件监听者
        * @param eventEnum 事件类型
        * @param func 事件触发回调方法 (Warn: 不要使用 func.bind() , 它会导致相等判断失败)
        * @param thisArg 回调方法执行者
        */
        addListener(eventEnum: UIEventEnum, func: (...args: Array<any>) => void , thisArg:any);
        /**
         * 移除事件监听者
         * @param eventEnum 事件类型
         * @param func 事件触发回调方法
         * @param thisArg 回调方法执行者
         */
        removeListener(eventEnum: UIEventEnum, func: (...args: Array<any>) => void , thisArg:any);
    }

    

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * ui事件
     * @version egret-gd3d 1.0
     */
    export class UIEvent extends AEvent
    {
        OnEnum(event: UIEventEnum, func: (...args: Array<any>) => void , thisArg:any){
            this.On(UIEventEnum[event],func,thisArg);
        }
        EmitEnum(event: UIEventEnum, ...args: Array<any>){
            super.Emit(UIEventEnum[event],args);
        }
    }
}