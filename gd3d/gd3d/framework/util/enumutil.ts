namespace gd3d.framework
{
    /**
     * @private
     * @language zh_CN
     * @classdesc
     * 给编辑器用的工具类，用eval方式获取enum对象
     * @version egret-gd3d 1.0
     */
    export class EnumUtil
    {
        static getEnumObjByType(enumType: string): any
        {
            let index = enumType.indexOf("gd3d.framework.");
            if (index == 0)
                enumType = enumType.substr(15);

            return eval("{result:" + enumType + "}");
        }
    }
}