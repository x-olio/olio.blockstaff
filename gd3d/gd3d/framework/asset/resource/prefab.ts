namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 预设资源
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class prefab implements IAsset
    {
        static readonly ClassName:string="prefab";

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
                assetName = "prefab_" + this.getGUID();
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
         * prefab依赖的AssetBundle
         * @version egret-gd3d 1.0
         */
        assetbundle: string = null;
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
        unuse(disposeNow: boolean = false)
        {
            sceneMgr.app.getAssetMgr().unuse(this, disposeNow);
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
            this.trans.dispose();
            this.jsonstr = null;
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
            let total = 0;
            return total;
        }
        private trans: transform | transform2D;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取克隆的transform
         * @version egret-gd3d 1.0
         */
        getCloneTrans(): transform 
        {
         
            let temp = io.cloneObj(this.trans);
            if (temp instanceof transform)
                return temp;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取克隆的transform2D
         * @version egret-gd3d 1.0
         */
        getCloneTrans2D(): transform2D 
        {
            
            let temp = io.cloneObj(this.trans);
            if (temp instanceof transform2D)
                return temp;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置当前指定的transform
         * @param trans transform实例
         * @version egret-gd3d 1.0
         */
        apply(trans: transform)
        {
            // if (this.trans)
            // {
            //     this.trans.dispose();
            // }
            this.trans = trans;
        }
        /**
         * @private
         */
        jsonstr: string;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析资源
         * @param jsonStr json数据
         * @param assetmgr 资源管理实例
         * @version egret-gd3d 1.0
         */
        Parse(jsonStr: string, assetmgr: assetMgr)
        {
            //    return new threading.gdPromise((resolve) =>
            //     {
            this.jsonstr = jsonStr;
            let jsonObj = JSON.parse(jsonStr);
            let type = jsonObj["type"];
            switch (type)
            {
                case "transform": this.trans = new transform; break;
                case "transform2D": this.trans = new transform2D; break;
            }

            if (type != null)
                io.deSerialize(jsonObj, this.trans, assetmgr, this.assetbundle);
            //     resolve();
            // });
        }
    }
}