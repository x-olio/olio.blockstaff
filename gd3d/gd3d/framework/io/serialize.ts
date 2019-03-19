/// <reference path="../../io/reflect.ts" />

namespace gd3d.io
{
    export enum SaveAssetType
    {
        FullUrl,
        NameAndContent,
        DefaultAssets
    }
    //依赖的资源路径
    /**
     * @private
     */
    export class SerializeDependent
    {
        static resourseDatas: any[] = [];
        // static resourcesContent: any[] = [];
        static GetAssetContent(asset: any)
        {
            let data: any = {};
            if (asset instanceof gd3d.framework.material){
                let t = asset.getName();
                let names = t.split(".");
                if(t.lastIndexOf('.mat.json') == -1) {
                    return { "name": names[0] + ".mat.json", "value": (asset as gd3d.framework.material).save(), "type": SaveAssetType.NameAndContent };
                }
                return { "name": t, "value": (asset as gd3d.framework.material).save(), "type": SaveAssetType.NameAndContent };
            }
            // if (asset instanceof gd3d.framework.mesh)
            //     return { "name": asset.getName() + "_enginedefault.mesh.bin", "type": SaveAssetType.DefaultAssets };
            // if (asset instanceof gd3d.framework.texture)
            //     return { "name": asset.getName() + "_enginedefault.png", "type": SaveAssetType.DefaultAssets };
        }
        static GetAssetUrl(asset: any, assetMgr: any)
        {
            if (!assetMgr || !asset)
                return;
            let url: string = assetMgr.getAssetUrl(asset);
            // if (!url)
            //     return;
            //为了序列化存储而修改的逻辑hjx
            if (url && !(asset instanceof framework.material)){    //material 资源 存在 编辑器中修改的情况 不能 走URL 保存原文件
                SerializeDependent.resourseDatas.push({ "url": url, "type": SaveAssetType.FullUrl });

                if((asset instanceof framework.f14eff)){  //f14eff 处理
                    let assets = (asset as framework.f14eff).getDependents();
                    let note = {};  //过滤重复
                    assets.forEach(asset=>{
                        if(asset){
                            let url: string = assetMgr.getAssetUrl(asset);
                            if(url){
                                if(!note[url]){
                                    SerializeDependent.resourseDatas.push({ "url": url, "type": SaveAssetType.FullUrl });
                                    if(asset instanceof framework.texture && asset.realName && asset.realName != ""){
                                        asset;
                                        let idx = url.lastIndexOf("/");
                                        if(idx != -1){
                                            let haed = url.substring(0,idx+1);
                                            SerializeDependent.resourseDatas.push({ "url": haed + asset.realName , "type": SaveAssetType.FullUrl });
                                        }
                                    }
                                }
                                note[url] = true;
                            }
                        }
                    })
                }
            }
            else
                SerializeDependent.resourseDatas.push(SerializeDependent.GetAssetContent(asset));
            if (asset instanceof gd3d.framework.material)
            {
                // let _mapUniform = (asset as gd3d.framework.material).statedMapUniforms;
                let ass = (asset as gd3d.framework.material);


                for (let newKey in ass.statedMapUniforms)
                {
                    if (!ass.statedMapUniforms[newKey])
                        continue;
                    if (ass.defaultMapUniform[newKey].type != render.UniformTypeEnum.Texture)
                        continue;
                    let _texture = ass.statedMapUniforms[newKey];
                    if (!_texture)
                        continue;
                    url = assetMgr.getAssetUrl(_texture);
                    // if (!url)
                    //     continue;
                    //为了序列化存储而修改的逻辑hjx
                    if (url)
                        SerializeDependent.resourseDatas.push({ "url": url, "type": SaveAssetType.FullUrl });
                    else
                    {
                        if ((_texture as gd3d.framework.texture).defaultAsset == true)
                            continue;
                        let content = SerializeDependent.GetAssetContent(_texture);
                        if (content)
                            SerializeDependent.resourseDatas.push(content);
                        continue;
                    }
                    if (url.indexOf(".imgdesc.json") < 0)
                        continue;

                    if (!_texture.realName)
                        continue;

                    url = url.replace(_texture.getName(), _texture.realName);
                    SerializeDependent.resourseDatas.push({ "url": url, "type": SaveAssetType.FullUrl });
                }
            }
        }
    }


    /**
     * @private
     */
    export function SerializeForInspector(obj: any): string
    {
        var str = JSON.stringify(serializeObjForInspector(obj, false));
        return str;
    }


    /**
     * @private
     */
    export function serializeObjForInspector(instanceObj: any, beComponent: boolean, serializedObj: any = undefined): any
    {
        let _flag: gd3d.framework.HideFlags = gd3d.framework.HideFlags.None;
        let _type: string;

        if (boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }

        if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"])
        {
            _type = reflect.getClassName(instanceObj);
        }
        if (_type == "transform" && instanceObj["gameObject"])
        {
            _flag = instanceObj["gameObject"].hideFlags;
        }
        else if (_type == "transform2D")
        {
            _flag = instanceObj.hideFlags;
        }
        if ((_flag & gd3d.framework.HideFlags.HideInInspector))
        {
            return null;
        }

        if (serializedObj == undefined)
        {
            serializedObj = {};
        }
        for (let key in instanceObj["__gdmeta__"])
        {
            if (key == "children") continue;
            let t = instanceObj["__gdmeta__"][key];
            if (boolInNull(t))
            {
                continue;
            }
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
                    let info: inspectorValueInfo = new inspectorValueInfo(instanceObj[key], valueType);
                    if (t["custom"]["FieldUIStyle"]) info.UIStyle = t["custom"]["FieldUIStyle"];
                    if (t["custom"]["defvalue"]) info.defvalue = t["custom"]["defvalue"];
                    if (t["custom"]["min"]) info.min = t["custom"]["min"];
                    if (t["custom"]["max"]) info.max = t["custom"]["max"];
                    serializedObj[key] = info;
                    break;
                default:
                    serializeOtherTypeOrArrayForInspector(instanceObj, serializedObj, key, beComponent);
                    break;
            }
        }
        return serializedObj;
    }
    /**
     * @private
     */
    export function serializeOtherTypeOrArrayForInspector(instanceObj: any, serializedObj: any, key: string, beComponent: boolean)
    {
        if (boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(serializedObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (instanceObj[key])
        {
            if (instanceObj[key]["__gdmeta__"])
            {
                serializeOtherTypeForInspector(instanceObj, serializedObj, key, beComponent);
            }
            else if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["valueType"])
            {
                let isArray: boolean = instanceObj[key] instanceof Array;
                if (isArray)
                    serializedObj[key] = new inspectorValueInfo([], instanceObj["__gdmeta__"][key]["custom"]["valueType"]);
                else
                    serializedObj[key] = new inspectorValueInfo({}, instanceObj["__gdmeta__"][key]["custom"]["valueType"]);

                for (var newkey in instanceObj[key])
                {
                    if (instanceObj[key][newkey] == null || instanceObj[key][newkey] == undefined)
                    {
                        continue;
                    }
                    if (instanceObj[key][newkey]["__gdmeta__"])
                    {
                        let _meta = instanceObj[key][newkey]["__gdmeta__"];
                        if (_meta["class"] && _meta["class"]["typename"] == "UniformData" && instanceObj[key][newkey].type == 3)
                        {
                            //排除掉Matrix类型的序列化
                        }
                        else
                        {
                            serializeOtherTypeForInspector(instanceObj[key], serializedObj[key]["value"], newkey, beComponent, instanceObj);
                        }
                    }
                    else
                    {
                        //如果数组是int、string、boolean。
                        if (!instanceObj[key]["__gdmeta__"])
                        {
                            let baseType: string = typeof (instanceObj[key][newkey]);
                            switch (baseType.toLowerCase())
                            {
                                case "number":
                                case "string":
                                case "boolean":
                                    if (boolInNull(serializedObj[key]["value"]))
                                    {
                                        continue;
                                    }

                                    let info: inspectorValueInfo = new inspectorValueInfo(instanceObj[key][newkey], baseType);

                                    if (isArray)
                                    {
                                        serializedObj[key]["value"].push(info);
                                    }
                                    else
                                    {
                                        serializedObj[key]["value"][newkey] = info;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        } else
        {
            let isArray: boolean = instanceObj instanceof Array;
            if (instanceObj["__gdmeta__"])
            {
                if (instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"])//&& instanceObj["__gdmeta__"][key]["custom"]["FieldUIStyle"]
                {
                    let custom = instanceObj["__gdmeta__"][key]["custom"];
                    if (custom["valueType"])
                    {
                        var info = new inspectorValueInfo(null, custom["valueType"]);
                        if (custom["FieldUIStyle"]) info.UIStyle = custom["FieldUIStyle"];
                        if (custom["defvalue"]) info.defvalue = custom["defvalue"];
                        if (custom["min"]) info.min = custom["min"];
                        if (custom["max"]) info.max = custom["max"];
                        if (isArray)
                        {
                            serializedObj.push(info);//new valueInfo(_serializeObj, type, id));
                        }
                        else
                        {
                            serializedObj[key] = info;//new valueInfo(_serializeObj, type, id);
                        }
                    }
                }
            }
        }
    }

    /**
     * @private
     */
    export function serializeOtherTypeForInspector(instanceObj: any, serializedObj: any, key: string, beComponent: boolean, arrayInst: any = null)
    {
        if (boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(serializedObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(instanceObj[key]) || boolInNull(instanceObj[key]["__gdmeta__"]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        let _meta = instanceObj[key]["__gdmeta__"];
        if (_meta["class"] && _meta["class"]["custom"] && (_meta["class"]["custom"]["SerializeType"] || _meta["class"]["custom"]["nodecomp"] || _meta["class"]["custom"]["2dcomp"]))
        {
            let isArray: boolean = instanceObj instanceof Array;

            let type: string = _meta["class"]["typename"];
            if (isAssetInspector(type))
            {
                let _defaultAsset: boolean = instanceObj[key].defaultAsset;
                let _assetName: string = instanceObj[key].getName();
                if (_assetName != null)
                {
                    if (_defaultAsset)
                    {
                        _assetName = "SystemDefaultAsset-" + _assetName;
                    }
                    var info = new inspectorValueInfo(_assetName, type)
                    if (isArray)
                    {
                        serializedObj.push(info);
                    }
                    else
                    {
                        serializedObj[key] = info;
                    }
                }
            }
            else
            {
                let isreference = false;
                let insid = -1;
                if ((isArray && arrayInst["__gdmeta__"] && arrayInst["__gdmeta__"]["class"] && arrayInst["__gdmeta__"]["class"]["custom"] && (arrayInst["__gdmeta__"]["class"]["custom"]["nodecomp"] || arrayInst["__gdmeta__"]["class"]["custom"]["2dcomp"])) ||
                    (!isArray && instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"] && instanceObj["__gdmeta__"]["class"]["custom"] && (instanceObj["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceObj["__gdmeta__"]["class"]["custom"]["2dcomp"])))
                {
                    beComponent = true;
                    //当前instance是组件
                    if (_meta["class"]["custom"]["nodecomp"])
                    {
                        //属性是组件
                        insid = instanceObj[key]["gameObject"]["transform"]["insId"].getInsID();
                        isreference = true;
                    }
                    else if (_meta["class"]["custom"]["2dcomp"])
                    {
                        insid = instanceObj[key]["transform"]["insId"].getInsID();
                        isreference = true;
                    }
                    else if (type == "transform" || type == "transform2D")
                    {
                        //属性是tranform
                        insid = instanceObj[key]["insId"].getInsID();
                        isreference = true;
                    }
                    else if (!referenceInfo.isRegType(type))
                    {
                        //不是组件和transform 也不是基础类型  忽视
                        return;
                    }
                }
                if (isreference)
                {
                    var info = new inspectorValueInfo(insid, type, "reference");
                    if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["FieldUIStyle"])
                    {
                        let custom = instanceObj["__gdmeta__"][key]["custom"];
                        info.UIStyle = instanceObj["__gdmeta__"][key]["custom"]["FieldUIStyle"];
                        if (custom["defvalue"]) info.defvalue = custom;
                        if (custom["min"]) info.min = custom["min"];
                        if (custom["max"]) info.max = custom["max"];
                    }
                    if (isArray)
                    {
                        serializedObj.push(info);
                    }
                    else
                    {
                        serializedObj[key] = info;
                    }
                }
                else
                {
                    if (!referenceInfo.isRegType(type) && beComponent)
                        return;
                    let _serializeObj = serializeObjForInspector(instanceObj[key], beComponent, serializedObj[key]);

                    if (_serializeObj != null)
                    {
                        var info = new inspectorValueInfo(_serializeObj, type);
                        if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["FieldUIStyle"])
                        {
                            let custom = instanceObj["__gdmeta__"][key]["custom"];
                            info.UIStyle = custom["FieldUIStyle"];
                            if (custom["defvalue"]) info.defvalue = custom;
                            if (custom["min"]) info.min = custom["min"];
                            if (custom["max"]) info.max = custom["max"];
                        }
                        if (isArray)
                        {
                            serializedObj.push(info);//new valueInfo(_serializeObj, type, id));
                        }
                        else
                        {
                            serializedObj[key] = info;//new valueInfo(_serializeObj, type, id);
                        }
                    }
                }

            }

        }
    }

    /**
     * 序列化
     */
    /**
     * @private
     */
    export function Serialize(obj: any, assetMgr: any = null): string
    {
        return JSON.stringify(serializeObj(obj, null, assetMgr));
    }

    //根据反射类型将对象进行序列化
    /**
     * @private
     */
    export function serializeObj(instanceObj: any, serializedObj: any = undefined, assetMgr: any = null): any
    {
        if (boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        //过滤掉不需要序列化的对象
        let _flag: gd3d.framework.HideFlags = gd3d.framework.HideFlags.None;
        let _type: string;
        if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"])
        {
            _type = reflect.getClassName(instanceObj);//["__gdmeta__"]["class"]["typename"];
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

        if (serializedObj == undefined)
        {
            serializedObj = new valueInfo({}, _type);
            if (instanceObj["insId"] != undefined)
            {
                serializedObj["insid"] = instanceObj["insId"].getInsID();
            }
        }
        for (let key in instanceObj["__gdmeta__"])
        {
            let t = instanceObj["__gdmeta__"][key];
            if (t == null)
            {
                continue;
            }
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
                    let info: valueInfo = new valueInfo(instanceObj[key], valueType);
                    serializedObj["value"][key] = info;
                    break;
                default:
                    serializeOtherTypeOrArray(instanceObj, serializedObj["value"], key, assetMgr);
                    break;
            }
        }
        return serializedObj;
    }

    /**
     * @private
     */
    export function serializeOtherTypeOrArray(instanceObj: any, serializedObj: any, key: string, assetMgr: any = null)
    {
        if (boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(serializedObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (instanceObj[key])
        {
            if (instanceObj[key]["__gdmeta__"])
            {
                serializeOtherType(instanceObj, serializedObj, key, null, assetMgr);
            }
            else if (instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"][key] && instanceObj["__gdmeta__"][key]["custom"] && instanceObj["__gdmeta__"][key]["custom"]["valueType"])
            {
                let isArray: boolean = instanceObj[key] instanceof Array;
                if (isArray)
                    serializedObj[key] = new valueInfo([], instanceObj["__gdmeta__"][key]["custom"]["valueType"]);
                else
                    serializedObj[key] = new valueInfo({}, instanceObj["__gdmeta__"][key]["custom"]["valueType"]);

                for (var newkey in instanceObj[key])
                {
                    if (instanceObj[key][newkey] && instanceObj[key][newkey]["__gdmeta__"])
                    {
                        let _meta = instanceObj[key][newkey]["__gdmeta__"];
                        if (_meta["class"] && _meta["class"]["typename"] == "UniformData" && instanceObj[key][newkey].type == 3)
                        {
                            //排除掉Matrix类型的序列化
                        }
                        else
                        {
                            serializeOtherType(instanceObj[key], serializedObj[key]["value"], newkey, instanceObj, assetMgr);
                        }
                    }
                    else
                    {
                        //如果数组是int、string、boolean。
                        if (!instanceObj[key]["__gdmeta__"])
                        {
                            if (instanceObj[key][newkey] == null || instanceObj[key][newkey] == undefined)
                            {
                                continue;
                            }
                            let baseType: string = typeof (instanceObj[key][newkey]);
                            switch (baseType.toLowerCase())
                            {
                                case "number":
                                case "string":
                                case "boolean":
                                    let info: valueInfo = new valueInfo(instanceObj[key][newkey], baseType);
                                    if (serializedObj[key]["value"])
                                    {
                                        if (isArray)
                                        {
                                            serializedObj[key]["value"].push(info);
                                        }
                                        else
                                        {
                                            serializedObj[key]["value"][newkey] = info;
                                        }
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
    export function serializeOtherType(instanceObj: any, serializedObj: any, key: string, arrayInst: any = null, assetMgr: any = null)
    {
        if (boolInNull(instanceObj || boolInNull(serializedObj)))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(instanceObj[key]) || boolInNull(instanceObj[key]["__gdmeta__"]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        let _meta = instanceObj[key]["__gdmeta__"];
        if (_meta["class"] && _meta["class"]["custom"] && (_meta["class"]["custom"]["SerializeType"] || _meta["class"]["custom"]["nodecomp"] || _meta["class"]["custom"]["2dcomp"]))
        {
            let isArray: boolean = instanceObj instanceof Array;

            let type: string = _meta["class"]["typename"];
            if (isAsset(type))
            {
                let _defaultAsset: boolean = instanceObj[key].defaultAsset;
                let _assetName: string = instanceObj[key].getName();
                if (_assetName != null)
                {
                    if (_defaultAsset)
                    {
                        _assetName = "SystemDefaultAsset-" + _assetName;
                    }
                    else
                    {
                        if (assetMgr)
                        {
                            SerializeDependent.GetAssetUrl(instanceObj[key], assetMgr);
                        }
                    }
                    if (isArray)
                    {
                        serializedObj.push(new valueInfo(_assetName, type));
                    }
                    else
                    {
                        serializedObj[key] = new valueInfo(_assetName, type);
                    }
                }
            }
            else
            {
                let isreference = false;
                let insid = -1;
                if ((isArray && arrayInst["__gdmeta__"] && arrayInst["__gdmeta__"]["class"] && arrayInst["__gdmeta__"]["class"]["custom"] && (arrayInst["__gdmeta__"]["class"]["custom"]["nodecomp"] || arrayInst["__gdmeta__"]["class"]["custom"]["2dcomp"])) ||
                    (!isArray && instanceObj["__gdmeta__"] && instanceObj["__gdmeta__"]["class"] && instanceObj["__gdmeta__"]["class"]["custom"] && (instanceObj["__gdmeta__"]["class"]["custom"]["nodecomp"] || instanceObj["__gdmeta__"]["class"]["custom"]["2dcomp"])))
                {
                    //当前instance是组件
                    if (_meta["class"]["custom"]["nodecomp"])
                    {
                        //属性是组件
                        if(instanceObj[key] && instanceObj[key]["gameObject"])
                        insid = instanceObj[key]["gameObject"]["transform"]["insId"].getInsID();
                        isreference = true;
                    }
                    else if (_meta["class"]["custom"]["2dcomp"])
                    {
                        if(instanceObj[key] && instanceObj[key]["transform"])
                        insid = instanceObj[key]["transform"]["insId"].getInsID();
                        isreference = true;
                    }
                    else if (type == "transform" || type == "transform2D")
                    {
                        //属性是tranform
                        if(instanceObj[key])
                        insid = instanceObj[key]["insId"].getInsID();
                        isreference = true;
                    }
                }
                if (isreference)
                {
                    if (isArray)
                    {
                        serializedObj.push(new valueInfo(insid, type, "reference"));
                    }
                    else
                    {
                        serializedObj[key] = new valueInfo(insid, type, "reference");
                    }
                }
                else
                {
                    let _serializeObj = serializeObj(instanceObj[key], serializedObj[key], assetMgr);

                    if (_serializeObj != null)
                    {
                        if (isArray)
                        {
                            serializedObj.push(_serializeObj);
                        }
                        else
                        {
                            serializedObj[key] = _serializeObj;
                        }
                    }
                }

            }

        }
    }



    /**
     * 反序列化  传入的源数据为json
     */
    /**
     * @private
     */
    export function deSerialize(serializedObj: string, instanceObj: any, assetMgr: any, bundlename: string = null)
    {
        if (boolInNull(serializedObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        referenceInfo.oldmap = {};
        //var serializedObj = JSON.parse(json);
        deSerializeObj(serializedObj["value"], instanceObj, assetMgr, bundlename);
        let insid = serializedObj["insid"];
        if (!insid)
        {
            //console.error(serializedObj);
        }
        else
            referenceInfo.oldmap[insid] = instanceObj;

        fillReference(serializedObj["value"], instanceObj);
    }

    /**
     * @private
     */
    export function fillReference(serializedObj: any, instanceObj: any)
    {
        if (boolInNull(instanceObj) || boolInNull(instanceObj["__gdmeta__"]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        for (let key in instanceObj["__gdmeta__"])
        {
            let t = instanceObj["__gdmeta__"][key];

            if (boolInNull(t))
            {
                continue;
            }
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
                    dofillReferenceOrArray(serializedObj, instanceObj, key);
                    break;
            }
        }
    }
    /**
     * @private
     */
    export function dofillReferenceOrArray(serializedObj: any, instanceObj: any, key: string)
    {
        if (boolInNull(serializedObj) || boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (serializedObj[key])
        {
            let type: string = serializedObj[key].type;
            if (isArrayOrDic(type.toLowerCase()))
            {
                let _isArray: boolean = serializedObj[key].value instanceof Array;
                // let _isArray: boolean = isArray(type);
                if (!instanceObj[key])
                {
                    if (_isArray)
                        instanceObj[key] = [];
                    else
                        instanceObj[key] = {};
                }
                let arrayObj = null;

                if (boolInNull(instanceObj["__gdmeta__"]) && boolInNull(instanceObj["__gdmeta__"][key]) && boolInNull(instanceObj["__gdmeta__"][key]["custom"])
                    && instanceObj["__gdmeta__"][key]["custom"]["valueType"] != serializedObj[key].type)
                {
                    throw new Error("反序列化失败，类型不匹配：" + instanceObj["__gdmeta__"][key]["custom"]["valueType"] + " as " + serializedObj[key].type);
                }
                arrayObj = serializedObj[key].value;

                for (var newkey in arrayObj)
                {
                    if (boolInNull(arrayObj[newkey]))
                    {
                        continue;
                    }
                    let baseType: string = arrayObj[newkey].type;
                    switch (baseType.toLowerCase())
                    {
                        case "number":
                        case "string":
                        case "boolean":
                            break;
                        default:
                            dofillReference(serializedObj[key]["value"], instanceObj[key], newkey);
                            break;
                    }
                }
            }
            else
            {
                dofillReference(serializedObj, instanceObj, key);
            }
        }
    }
    /**
     * @private
     */
    export function dofillReference(serializedObj: any, instanceObj: any, key: string)
    {
        if (boolInNull(instanceObj) || boolInNull(serializedObj) || boolInNull(serializedObj[key]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        let _isArray = instanceObj instanceof Array;
        let type: string = serializedObj[key].type;
        let _parentType: string = typeof (instanceObj);

        if (isAsset(type))
        {

        }
        else
        {
            if (serializedObj[key].parse == "reference")
            {
                let instance = referenceInfo.oldmap[serializedObj[key].value];
                if (type == "transform" || type == "transform2D")
                {
                }
                else
                {
                    //是组件直接找value对应transform的type
                    if (instance instanceof gd3d.framework.transform2D)
                    {
                        instance = instance.getComponent(type);
                    }
                    else if (instance instanceof gd3d.framework.transform)
                    {
                        instance = instance.gameObject.getComponent(type);
                    }
                }
                if (_isArray)
                {
                    instanceObj.push(instance);
                }
                else
                {
                    instanceObj[key] = instance;
                }
            }
            else
            {
                if (!instanceObj[key])
                    return console.warn(`${serializedObj[key].value.comp.type} 填充值失败`);
                fillReference(serializedObj[key].value, instanceObj[key]);
            }
        }
    }
    //反序列化赋值
    /**
     * @private
     */
    export function deSerializeObj(serializedObj: any, instanceObj: any, assetMgr: any, bundlename: string = null)
    {
        if (instanceObj == undefined)
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (boolInNull(instanceObj["__gdmeta__"]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        for (let key in instanceObj["__gdmeta__"])
        {
            let t = instanceObj["__gdmeta__"][key];
            if (boolInNull(t))
            {
                continue;
            }
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
                    if (serializedObj[key] == undefined || valueType != serializedObj[key].type)
                    {
                        continue;
                        // throw new Error("反序列化失败，类型不匹配：" + valueType + " as " + serializedObj[key].type);
                    }
                    else
                    {
                        instanceObj[key] = serializedObj[key].value;
                    }
                    break;
                default:
                    deSerializeOtherTypeOrArray(serializedObj, instanceObj, key, assetMgr, bundlename);
                    break;
            }
        }
    }



    /**
     * @private
     */
    export function deSerializeOtherTypeOrArray(serializedObj: any, instanceObj: any, key: string, assetMgr: any, bundlename: string = null)
    {
        if (boolInNull(serializedObj) || boolInNull(instanceObj))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        if (serializedObj[key])
        {
            let type: string = serializedObj[key].type;
            if (type == null)
            {
                throw new Error("必须传入一个实例，用来赋值");
            }
            if (isArrayOrDic(type.toLowerCase()))
            {
                let _isArray: boolean = serializedObj[key].value instanceof Array;
                // let _isArray: boolean = isArray(type);
                if (!instanceObj[key])
                {
                    if (_isArray)
                        instanceObj[key] = [];
                    else
                        instanceObj[key] = {};
                }
                let arrayObj = null;

                if (boolInNull(instanceObj["__gdmeta__"]) && boolInNull(instanceObj["__gdmeta__"][key]) && boolInNull(instanceObj["__gdmeta__"][key]["custom"])
                    && instanceObj["__gdmeta__"][key]["custom"]["valueType"] != serializedObj[key].type)
                {
                    throw new Error("反序列化失败，类型不匹配：" + instanceObj["__gdmeta__"][key]["custom"]["valueType"] + " as " + serializedObj[key].type);
                }
                arrayObj = serializedObj[key].value;

                for (var newkey in arrayObj)
                {
                    let baseType: string = arrayObj[newkey].type;
                    switch (baseType.toLowerCase())
                    {
                        case "number":
                        case "string":
                        case "boolean":
                            if (baseType != serializedObj[key]["value"][newkey].type)
                            {
                                throw new Error("反序列化失败，类型不匹配：" + baseType + " as " + serializedObj[key]["value"][newkey].type);
                            }
                            if (_isArray)
                            {
                                instanceObj[key].push(serializedObj[key]["value"][newkey].value);
                            }
                            else
                            {
                                instanceObj[key][newkey] = serializedObj[key]["value"][newkey].value;
                            }
                            break;
                        default:
                            if (baseType == "nodeComponent" && key == "components" && reflect.getClassName(instanceObj) == "gameObject")
                            {
                                let _nodeComponent = [];
                                deSerializeOtherType(serializedObj[key]["value"], _nodeComponent, newkey, assetMgr, bundlename);
                                if (_nodeComponent[0].comp)
                                    instanceObj.addComponentDirect(_nodeComponent[0].comp);
                            }
                            else if (baseType == "transform" && key == "children" && reflect.getClassName(instanceObj) == "transform")
                            {
                                let _transforms = [];
                                deSerializeOtherType(serializedObj[key]["value"], _transforms, newkey, assetMgr, bundlename);
                                instanceObj.addChild(_transforms[0]);
                            }
                            else if (baseType == "C2DComponent" && key == "components" && reflect.getClassName(instanceObj) == "transform2D")
                            {
                                let _nodeComponent = [];
                                deSerializeOtherType(serializedObj[key]["value"], _nodeComponent, newkey, assetMgr, bundlename);
                                if (_nodeComponent[0].comp)
                                    instanceObj.addComponentDirect(_nodeComponent[0].comp);
                            }
                            else if (baseType == "transform2D" && key == "children" && reflect.getClassName(instanceObj) == "transform2D")
                            {
                                let _transforms2D = [];
                                deSerializeOtherType(serializedObj[key]["value"], _transforms2D, newkey, assetMgr, bundlename);
                                instanceObj.addChild(_transforms2D[0]);
                            }
                            else
                            {
                                deSerializeOtherType(serializedObj[key]["value"], instanceObj[key], newkey, assetMgr, bundlename);
                            }
                            break;
                    }
                }
            }
            else
            {
                deSerializeOtherType(serializedObj, instanceObj, key, assetMgr, bundlename);
            }
        }
    }

    /**
     * @private
     */
    export function deSerializeOtherType(serializedObj: any, instanceObj: any, key: string, assetMgr: any, bundlename: string = null)
    {
        if (boolInNull(serializedObj) || boolInNull(instanceObj) || boolInNull(serializedObj[key]))
        {
            throw new Error("必须传入一个实例，用来赋值");
        }
        let _isArray = instanceObj instanceof Array;
        let type: string = serializedObj[key].type;
        let _parentType: string = typeof (instanceObj);

        if (isAsset(type))
        {
            let assetName: string = serializedObj[key].value;
            let _asset;
            if (assetName.indexOf("SystemDefaultAsset-") >= 0)
            {
                assetName = assetName.replace("SystemDefaultAsset-", "");
                if (type == "mesh")
                {
                    assetName = assetName.replace(".mesh.bin", "");
                    _asset = assetMgr.getDefaultMesh(assetName);
                }
                else if (type == "texture")
                {
                    _asset = assetMgr.getDefaultTexture(assetName);
                }
            }
            else
            {
                _asset = assetMgr.getAssetByName(assetName, bundlename);
            }

            // if (type == "mesh" && _parentType == "meshFilter")
            // {
            //     instanceObj.setMesh(_asset);
            // }
            // else
            if (_asset == null && type == "animationClip")
            {
                _asset = assetMgr.getAssetByName(assetName); //资源可能不在同一个包
                if (!_asset)
                {
                    _asset = new framework.animationClip(assetName);
                    (_asset as framework.IAsset).use();
                }
            }
            {
                if (instanceObj instanceof Array)
                {
                    instanceObj.push(_asset);
                }
                else
                {
                    instanceObj[key] = _asset;
                }
            }
        }
        else
        {
            if (serializedObj[key].parse == "reference")
            {

            }
            else
            {
                let _newInstance;
                let componentType = gd3d_reflect_root["__gdmeta__"][type];
                if (!componentType)
                {
                    console.warn(instanceObj);
                    console.warn(type);
                    return console.warn(`无法找到组件:${gd3d_reflect_root["__gdmeta__"][type]}`);
                }
                if (type == "gameObject" && key == "gameObject" && reflect.getClassName(instanceObj) == "transform")
                {
                    _newInstance = instanceObj.gameObject;
                }
                else if (type == "transform2D" && key == "rootNode" && reflect.getClassName(instanceObj) == "canvas")
                {
                    _newInstance = reflect.createInstance(componentType, null);
                    instanceObj.rootNode = _newInstance;
                    _newInstance.canvas = instanceObj;
                }
                else
                {
                    _newInstance = reflect.createInstance(componentType, null);
                    if (_isArray)
                        instanceObj.push(_newInstance);
                    else{
                        instanceObj[key] = _newInstance;
                        _newInstance = instanceObj[key];
                    }
                }
                deSerializeObj(serializedObj[key].value, _newInstance, assetMgr, bundlename);
                let insid = serializedObj[key].insid;
                if (!insid)
                {
                    // console.error(serializedObj[key]);
                } else
                    referenceInfo.oldmap[insid] = _newInstance;
            }
        }
    }


    /**
     * @private
     */
    export function isArray(type: string)
    {
        if (type.indexOf("[]") > 0 || type.indexOf("array") >= 0)
        {
            return true;
        }
        return false;
    }

    /**
     * @private
     */
    export function isArrayOrDic(type: string)
    {
        if (type.indexOf("[]") > 0 || type.indexOf("array") >= 0 || type.indexOf("dic") >= 0)
        {
            return true;
        }
        return false;
    }

    /**
     * @private
     */
    export function isAsset(type: string)
    {
        //rawscene比较特殊、不可能存在结构中
        if (type == "mesh" || type == "texture" || type == "shader" ||
            type == "material" || type == "animationClip" || type == "atlas" || type == "keyFrameAniClip" ||
            type == "font" || type == "prefab" || type == "sprite" || type == "textasset" || type == "f14eff")
            return true;
        return false;
    }

    /**
     * @private
     */
    export function isAssetInspector(type: string)
    {
        if (type == "prefab")
            return true;
    }

    /**
     * @private
     */
    class valueInfo
    {
        value: any;
        type: string;
        parse: string;
        constructor(value: any, type: string, _parse: string = "direct")
        {
            if (isAsset(type))
            {
                _parse = "nameonly";
                if (type == "material")
                {
                    if (value.lastIndexOf(".mat.json") < 0)
                        value += ".mat.json";
                }
            }
            this.value = value;
            this.type = type;
            this.parse = _parse;
        }
    }

    /**
     * @private
     */
    class inspectorValueInfo
    {
        value: any;
        type: string;
        UIStyle: number;
        min: number;
        max: number;
        defvalue: any;
        parse: string;
        constructor(_value: any, _type: string, _parse: string = "direct")
        {
            this.value = _value;
            this.type = _type;
            if (isAssetInspector(_type))
            {
                _parse = "nameonly";
            }
            this.parse = _parse;
        }
    }
    /**
     * @private
     */
    export class referenceInfo
    {
        static oldmap: { [id: number]: any } = {};
        static regtypelist: string[] = [];
        static regDefaultType()
        {
            //referenceInfo.regType("vector3");
            referenceInfo.regType("vector4");
            referenceInfo.regType("color");
            referenceInfo.regType("border");
            referenceInfo.regType("quaternion");
            referenceInfo.regType("material");
            referenceInfo.regType("gameObject");
            referenceInfo.regType("transform2D");
            referenceInfo.regType("shader");
            referenceInfo.regType("atlas");
            referenceInfo.regType("font");
            referenceInfo.regType("sprite");
            referenceInfo.regType("texture");
            referenceInfo.regType("mesh");
            referenceInfo.regType("animationclip");
            referenceInfo.regType("keyFrameAniClip");
            referenceInfo.regType("constText");
            referenceInfo.regType("UniformData");
            referenceInfo.regType("f14eff");
        }
        static regType(type: string)
        {
            referenceInfo.regtypelist.push(type);
        }

        static isRegType(type: string): boolean
        {
            return this.regtypelist.indexOf(type) >= 0;
        }

    }
    /**
     * @private
     */
    export class enumMgr
    {
        static enumMap: { [id: string]: any } = {};
    }

    function boolInNull(obj: any)
    {
        if (obj == null || obj == undefined)
        {
            return true;
        }
        return false;
    }
}