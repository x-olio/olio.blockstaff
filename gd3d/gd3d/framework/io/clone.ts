/// <reference path="../../io/reflect.ts" />

namespace gd3d.io
{

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 对可序列化实例的克隆
     * @param instanceObj 被克隆实例
     * @param clonedObj 克隆实例引用
     * @version egret-gd3d 1.0
     */
    export function cloneObj(instanceObj: any, clonedObj: any = undefined): any
    {
        referenceInfo.oldmap = {};
        clonedObj = _cloneObj(instanceObj, clonedObj);
        referenceInfo.oldmap[instanceObj["insId"].getInsID()] = clonedObj;
        fillCloneReference(instanceObj, clonedObj);
        return clonedObj;
    }
    /**
     * @private
     */
    export function fillCloneReference(instanceObj: any, clonedObj: any): any
    {
        //过滤掉不需要序列化的对象
        let _flag: gd3d.framework.HideFlags = gd3d.framework.HideFlags.None;
        let _type: string;
        if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"])
        {
            _type = reflect.getClassName(instanceObj);
        }
        if (_type == "transform")
        {
            _flag = instanceObj["gameObject"].hideFlags;
        }
        else if (_type == "transform2D")
        {
            _flag = instanceObj.hideFlags;
        }
        if ((_flag & gd3d.framework.HideFlags.DontSaveInBuild) || (_flag & gd3d.framework.HideFlags.DontSaveInEditor) || (_flag & gd3d.framework.HideFlags.HideInHierarchy))
        {
            return null;
        }

        for (let key in instanceObj["__gdmeta__"])
        {
            let t = instanceObj["__gdmeta__"][key];

            if (t["custom"] == null)
                continue;
            if (t["custom"]["SerializeField"] == null && t["custom"]["nodecomp"] == null && t["custom"]["2dcomp"] == null)
                continue;
            let valueType: string = t["custom"]["valueType"];
            if (valueType == null)
            {
                continue;
            }

            //基本类型和定义为SerializeType的类型才会关心
            switch (valueType.toLowerCase())
            {
                case "number":
                case "string":
                case "boolean":
                    break;
                default:
                    fillCloneReferenceTypeOrArray(instanceObj, clonedObj, key);
                    break;
            }
        }
        return clonedObj;
    }

    /**
     * @private
     */
    export function fillCloneReferenceTypeOrArray(instanceObj: any, clonedObj: any, key: string)
    {
        if (instanceObj[key])
        {
            if (instanceObj[key]["__gdmeta__"])
            {
                fillCloneReferenceType(instanceObj, clonedObj, key);
            }
            else if (instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["valueType"])
            {
                for (var newkey in instanceObj[key])
                {
                    let field = instanceObj[key][newkey];

                    if (field && field["__gdmeta__"])
                    {
                        let _meta = field["__gdmeta__"];
                        if (_meta["class"] && _meta["class"]["typename"] == "UniformData" && field.type == 3)
                        {
                            //排除掉Matrix类型的序列化
                        }
                        else
                        {
                            fillCloneReferenceType(instanceObj[key], clonedObj[key], newkey, instanceObj, clonedObj, key);
                        }
                    }
                }
                if (clonedObj["waitDelArray"])
                {
                    let children = clonedObj[key] as Array<any>;
                    //清除 被过滤的 null 元素
                    for (let index of clonedObj["waitDelArray"])
                        children.splice(index, 1);
                    delete clonedObj["waitDelArray"];
                }
            }
        }
    }

    /**
     * @private
     */
    export function fillCloneReferenceType(instanceObj: any, clonedObj: any, key: string, instanceParent: any = null, clonedParent: any = null, instanceKey: string = "")
    {
        let _meta = instanceObj[key]["__gdmeta__"];
        if (_meta["class"] && _meta["class"]["custom"] && (_meta["class"]["custom"]["SerializeType"] || _meta["class"]["custom"]["nodecomp"] || _meta["class"]["custom"]["2dcomp"]))
        {
            let isArray: boolean = instanceObj instanceof Array;

            let type: string = _meta["class"]["typename"];
            if (isAsset(type))
            {

            }
            else
            {
                let isreference = false;
                let insid = -1;
                let instance;
                if ((isArray && instanceParent["__gdmeta__"] && instanceParent["__gdmeta__"]["class"] && instanceParent["__gdmeta__"]["class"]["custom"] && (instanceParent["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceParent["__gdmeta__"]["class"]["custom"]["2dcomp"])) ||
                    (!isArray && instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"] && instanceObj["__gdmeta__"]["class"]["custom"] && (instanceObj["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceObj["__gdmeta__"]["class"]["custom"]["2dcomp"])))
                {
                    //当前instance是组件
                    if (_meta["class"]["custom"]["nodecomp"])
                    {
                        //属性是组件
                        insid = instanceObj[key]["gameObject"]["transform"]["insId"].getInsID();
                        isreference = true;
                        instance = referenceInfo.oldmap[insid].gameObject.getComponent(type);
                    }
                    else if (_meta["class"]["custom"]["2dcomp"])
                    {
                        insid = instanceObj[key]["transform"]["insId"].getInsID();
                        isreference = true;
                        instance = referenceInfo.oldmap[insid].getComponent(type);
                    }
                    else if (type == "transform" || type == "transform2D")
                    {
                        //属性是tranform
                        insid = instanceObj[key]["insId"].getInsID();
                        isreference = true;
                        instance = referenceInfo.oldmap[insid];
                    }
                }
                if (isreference)
                {
                    if (isArray)
                    {
                        clonedObj.push(instance);
                    }
                    else
                    {
                        clonedObj[key] = instance;
                    }
                }
                else
                {
                    if (clonedObj[key])
                        fillCloneReference(instanceObj[key], clonedObj[key]);
                    else
                    {
                        if (!clonedParent["waitDelArray"])
                            clonedParent["waitDelArray"] = [];
                        clonedParent["waitDelArray"].push(parseInt(key));
                    }
                }

            }

        }
    }

    /**
     * @private
     */
    export function _cloneObj(instanceObj: any, clonedObj: any = undefined): any
    {
        //过滤掉不需要序列化的对象
        // let _flag: gd3d.framework.HideFlags = gd3d.framework.HideFlags.None;
        // let _type: string;
        // if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"])
        // {
        //     _type = reflect.getClassName(instanceObj);
        // }
        // if (_type == "transform")
        // {
        //     _flag = instanceObj["gameObject"].hideFlags;
        // }
        // else if (_type == "transform2D")
        // {
        //     _flag = instanceObj.hideFlags;
        // }
        // if ((_flag & gd3d.framework.HideFlags.DontSaveInBuild) || (_flag & gd3d.framework.HideFlags.DontSaveInEditor) || (_flag & gd3d.framework.HideFlags.HideInHierarchy))
        // {
        //     return null;
        // }

        if (clonedObj == undefined)
        {
            let insid = -1;
            clonedObj = reflect.createInstance(instanceObj, null);
            if (instanceObj["__gdmeta__"]["class"]["custom"]["nodecomp"])
            {
                insid = instanceObj["gameObject"]["transform"]["insId"].getInsID();
            }
            else if (instanceObj["__gdmeta__"]["class"]["custom"]["2dcomp"])
            {
                insid = instanceObj["transform"]["insId"].getInsID();
            }
            else if (instanceObj["__gdmeta__"]["class"]["typename"] == "transform" || instanceObj["__gdmeta__"]["class"]["typename"] == "transform2D")
            {
                insid = instanceObj["insId"].getInsID();
                referenceInfo.oldmap[insid] = clonedObj;
            }
        }
        for (let key in instanceObj["__gdmeta__"])
        {
            let t = instanceObj["__gdmeta__"][key];

            if (t["custom"] == null)
                continue;
            if (t["custom"]["SerializeField"] == null && t["custom"]["nodecomp"] == null && t["custom"]["2dcomp"] == null)
                continue;
            let valueType: string = t["custom"]["valueType"];
            if (valueType == null)
            {
                continue;
            }

            //基本类型和定义为SerializeType的类型才会关心
            switch (valueType.toLowerCase())
            {
                case "number":
                case "string":
                case "boolean":
                    clonedObj[key] = instanceObj[key];
                    break;
                default:
                    cloneOtherTypeOrArray(instanceObj, clonedObj, key);
                    break;
            }
        }
        return clonedObj;
    }

    /**
     * @private
     */
    export function cloneOtherTypeOrArray(instanceObj: any, clonedObj: any, key: string)
    {
        if (instanceObj[key])
        {
            if (instanceObj[key]["__gdmeta__"])
            {
                cloneOtherType(instanceObj, clonedObj, key);
            }
            else if (instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["valueType"])
            {
                let isArray: boolean = instanceObj[key] instanceof Array;
                if (isArray)
                    clonedObj[key] = [];
                else
                    clonedObj[key] = {};

                for (var newkey in instanceObj[key])
                {
                    let field = instanceObj[key][newkey];

                    if (field && field["__gdmeta__"])
                    {
                        let _meta = field["__gdmeta__"];
                        if (_meta["class"] && _meta["class"]["typename"] == "UniformData" && field.type == 3)
                        {
                            //排除掉Matrix类型的序列化
                        }
                        else
                        {
                            cloneOtherType(instanceObj[key], clonedObj[key], newkey, instanceObj, clonedObj, key);
                        }
                    }
                    else
                    {
                        //如果数组是int、string、boolean。
                        if (!instanceObj[key]["__gdmeta__"])
                        {
                            let baseType: string = typeof (field);
                            switch (baseType.toLowerCase())
                            {
                                case "number":
                                case "string":
                                case "boolean":
                                    if (isArray)
                                    {
                                        clonedObj[key].push(field);
                                    }
                                    else
                                    {
                                        clonedObj[key][newkey] = field;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * @private
     */
    export function cloneOtherType(instanceObj: any, clonedObj: any, key: string, instanceParent: any = null, clonedParent: any = null, instanceKey: string = "")
    {
        let _meta = instanceObj[key]["__gdmeta__"];
        if (_meta["class"] && _meta["class"]["custom"] && (_meta["class"]["custom"]["SerializeType"] || _meta["class"]["custom"]["nodecomp"] || _meta["class"]["custom"]["2dcomp"]))
        {
            let isArray: boolean = instanceObj instanceof Array;

            let type: string = _meta["class"]["typename"];
            if (isAsset(type))
            {
                let _defaultAsset: boolean = instanceObj[key].defaultAsset;
                if (instanceObj[key].use)
                {
                    instanceObj[key].use();
                }

                if (isArray)
                {
                    clonedObj.push(instanceObj[key]);
                }
                else
                {
                    clonedObj[key] = instanceObj[key];
                }
            }
            else
            {
                let isreference = false;
                if ((isArray && instanceParent["__gdmeta__"] && instanceParent["__gdmeta__"]["class"] && instanceParent["__gdmeta__"]["class"]["custom"] && (instanceParent["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceParent["__gdmeta__"]["class"]["custom"]["2dcomp"])) ||
                    (!isArray && instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"] && instanceObj["__gdmeta__"]["class"]["custom"] && (instanceObj["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceObj["__gdmeta__"]["class"]["custom"]["2dcomp"])))
                {
                    if (_meta["class"]["custom"]["nodecomp"] || _meta["class"]["custom"]["2dcomp"] || type == "transform" || type == "transform2D")
                    {
                        isreference = true;
                    }
                }
                if (isreference)
                {
                    if (isArray)
                    {
                        // clonedObj.push(instanceObj[key]);
                    }
                    else
                    {
                        // clonedObj[key] = instanceObj[key];
                    }
                }
                else
                {
                    let _clonedObj;
                    if (_meta["class"]["custom"]["selfclone"])
                    {
                        _clonedObj = instanceObj[key].clone();
                    }
                    else
                    {
                        _clonedObj = _cloneObj(instanceObj[key], clonedObj[key]);
                    }
                  
                    if (_clonedObj != null)
                    {
                        if (isArray)
                        {
                            if (type == "nodeComponent" && instanceKey == "components" && reflect.getClassName(instanceParent) == "gameObject")
                            {
                                clonedParent.addComponentDirect(_clonedObj.comp);
                            }
                            else if (type == "transform" && instanceKey == "children" && reflect.getClassName(instanceParent) == "transform")
                            {
                                clonedParent.addChild(_clonedObj);
                            }
                            else if (type == "C2DComponent" && instanceKey == "components" && reflect.getClassName(instanceParent) == "transform2D")
                            {
                                clonedParent.addComponentDirect(_clonedObj.comp);
                            }
                            else if (type == "transform2D" && instanceKey == "children" && reflect.getClassName(instanceParent) == "transform2D")
                            {
                                clonedParent.addChild(_clonedObj);
                            }
                            else
                            {
                                clonedObj.push(_clonedObj);
                            }
                        }
                        else
                        {
                            clonedObj[key] = _clonedObj;
                        }
                    }else if(isArray)
                    {
                        clonedObj.push(null);
                    }
                }

            }

        }
    }
}