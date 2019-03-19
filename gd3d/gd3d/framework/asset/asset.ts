namespace gd3d.framework
{
    //资源不能随意改名，否则药丸
    //资源需要有一个固定的名字，一个唯一的id
    //唯一的id 是定位的需求，他不需要assetMgr就能够满足
    //name 是我们做named的管理时，需要

    //资源的来源有三种，     
    //一，随意new，这个也可以用引用计数管理，随你
    //二，加载而来，也是这个使用引用计数管理
    //三，静态管理，这个是特殊的，不要为他设计
    export class resID
    {
        constructor()
        {
            this.id = resID.next();
        }
        private static idAll: number = 1;
        private static next(): number
        {
            var next = resID.idAll;
            resID.idAll++;
            return next;
        }
        private id: number;
        getID(): number
        {
            return this.id;
        }
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 静态text 初始化后不可修改
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class constText
    {
        constructor(text: string)
        {
            this.name = text;
        }
        private name: string;
        getText(): string
        {
            return this.name;
        }
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 资源接口 扩展资源需要继承此接口
     * @version egret-gd3d 1.0
     */
    export interface IAsset //
    {
        defaultAsset:boolean;//是否为系统默认资源
        //setName(name: string);//名字只能设置一次
        getName(): string;//资源自己解决命名问题，比如构造函数，不能改资源的名字
        getGUID(): number;
        // init(assetmgr: assetMgr, name: string, guid: number);
        use():void;
        unuse(disposeNow?: boolean):void;
        dispose();
        caclByteLength(): number;
        
    }
}