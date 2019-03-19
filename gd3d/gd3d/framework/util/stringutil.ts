namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 正则表达式的工具类，提供一些引擎用到的正则表达式
     * @version egret-gd3d 1.0
     */
    export class StringUtil
    {
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 内建TAG “Untagged”
         * @version egret-gd3d 1.0
         */
        static builtinTag_Untagged = "Untagged";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 内建TAG “Player”
         * @version egret-gd3d 1.0
         */
        static builtinTag_Player = "Player";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 内建TAG “EditorOnly”
         * @version egret-gd3d 1.0
         */
        static builtinTag_EditorOnly = "EditorOnly";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 内建TAG “MainCamera”
         * @version egret-gd3d 1.0
         */
        static builtinTag_MainCamera = "MainCamera";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取camera组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_CAMERA = "camera";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取boxcollider组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_BOXCOLLIDER = "boxcollider";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取light组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_LIGHT = "light";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取meshFilter组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_MESHFILTER = "meshFilter";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取meshRenderer组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_MESHRENDER = "meshRenderer";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取effectSystem组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_EFFECTSYSTEM = "effectSystem";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取label组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_LABEL = "label";
        public static COMPONENT_uirect = "uirect";
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取image2D组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_IMAGE = "image2D";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取rawImage2D组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_RAWIMAGE = "rawImage2D";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取button组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_BUTTON = "button";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取skinnedMeshRenderer组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_SKINMESHRENDER = "skinnedMeshRenderer";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取AudioPlayer组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_AUDIOPLAYER = "AudioPlayer";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取cameraController组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_CAMERACONTROLLER = "cameraController";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取canvasRenderer组件的名字
         * @version egret-gd3d 1.0
         */
        public static COMPONENT_CANVASRENDER = "canvasRenderer";

        /**
         * @private
         */
        public static UIStyle_RangeFloat = "rangeFloat";

        /**
         * @private
         */
        public static UIStyle_Enum = "enum";

        /**
         * @private
         */
        public static RESOURCES_MESH_CUBE = "cube";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 将一个字符串中的所有指定字符替换为指定字符
         * @param srcStr 要处理的字符串
         * @param fromStr 原字符串中的指定字符串
         * @param toStr 将被替换为的字符串
         * @version egret-gd3d 1.0
         */
        static replaceAll(srcStr: string, fromStr: string, toStr: string)
        {
            return srcStr.replace(new RegExp(fromStr, 'gm'), toStr);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 剔除掉字符串中所有的空格
         * @param str 要处理的字符串
         * @version egret-gd3d 1.0
         */
        static trimAll(str: string)
        {
            str += "";//可能传进来number，number没有replace方法
            var result = str.replace(/(^\s+)|(\s+$)/g, "");
            result = result.replace(/\s/g, "");
            return result;
        }

        /**
         * @private
         * @language zh_CN
         * @classdesc
         * 将一个字符串中的第一个字符转为小写
         * @param str 要处理的字符串
         * @version egret-gd3d 1.0
         */
        static firstCharToLowerCase(str: string)
        {
            let firstChar = str.substr(0, 1).toLowerCase();
            let other = str.substr(1);
            return firstChar + other;
        }


        static isNullOrEmptyObject(obj: any): boolean
        {
            if (!obj)
                return true;
            for (var n in obj) {
                return false
            }
            return true;
        }
    }

}