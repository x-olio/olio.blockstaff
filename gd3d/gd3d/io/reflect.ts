/// <reference path="../../lib/Reflect.d.ts"/>


namespace gd3d {

    export var gd3d_reflect_root = {};
    
    export namespace reflect {

        /**
         * @private
         */
        function regType(constructorObj: any, customInfo: { [id: string]: string }) {
            let target=constructorObj.prototype;
            if (target["__gdmeta__"] == undefined) target["__gdmeta__"] = {};
            if (target["__gdmeta__"]["class"] == undefined) target["__gdmeta__"]["class"] = {};
            var name = target["constructor"]["name"];
            if (name == null)//this is for ie
            {
                var fs: string = target["constructor"].toString();
                var i = fs.indexOf("(");
                name = fs.substring(9, i);
            }
            let classname=constructorObj["ClassName"];
            name=classname?classname:name;

            target["__gdmeta__"]["class"]["typename"] = name;

            //注册全局类型标记
            if (gd3d_reflect_root["__gdmeta__"] == null)
                gd3d_reflect_root["__gdmeta__"] = {};
            gd3d_reflect_root["__gdmeta__"][name] = target;

            //fill custom info
            if (target["__gdmeta__"]["class"]["custom"] == null)
                target["__gdmeta__"]["class"]["custom"] = {};
            if (customInfo != null) {
                for (var key in customInfo) {
                    target["__gdmeta__"]["class"]["custom"][key] = customInfo[key];
                }
            }
        }
        /**
         * @private
         */
        function regFunc(target: any, funcname: string, customInfo: { [id: string]: string }) {
            //fill type
            if (target["__gdmeta__"] == undefined)
                target["__gdmeta__"] = {};
            if (target["__gdmeta__"][funcname] == null)
                target["__gdmeta__"][funcname] = {};

            target["__gdmeta__"][funcname]["type"] = "function";

            //fill meta
            var tp = Reflect.getMetadata("design:paramtypes", target, funcname);
            var tr = Reflect.getMetadata("design:returntype", target, funcname);
            target["__gdmeta__"][funcname]["paramtypes"] = [];
            for (var i in tp) {
                target["__gdmeta__"][funcname]["paramtypes"][i] = tp[i]["name"];
            }
            target["__gdmeta__"][funcname]["returntype"] = tr == null ? null : tr["name"];

            //fill custom info
            if (target["__gdmeta__"][funcname]["custom"] == null)
                target["__gdmeta__"][funcname]["custom"] = {};
            if (customInfo != null) {
                for (var key in customInfo) {
                    target["__gdmeta__"][funcname]["custom"][key] = customInfo[key];
                }
            }
        }
        /**
         * @private
         */
        function regField(target: Object, fieldName: string, customInfo: { [id: string]: any }) {
            //fill type
            if (target["__gdmeta__"] == undefined)
                target["__gdmeta__"] = {};
            if (target["__gdmeta__"][fieldName] == null)
                target["__gdmeta__"][fieldName] = {};


            target["__gdmeta__"][fieldName]["type"] = "field";

            //fill meta 
            // var t = Reflect.getMetadata("design:type", target, fieldName);
            // if (t == null)//ie.反射这套sb 机制 ，居然和ie不兼容
            // {
            //     target["__gdmeta__"][fieldName]["valuetype"] = null;
            // }
            // else
            // {
            //     target["__gdmeta__"][fieldName]["valuetype"] = t["name"];
            // }
            //fill custom info
            if (target["__gdmeta__"][fieldName]["custom"] == null)
                target["__gdmeta__"][fieldName]["custom"] = {};
            if (customInfo != null) {
                for (var key in customInfo) {
                    target["__gdmeta__"][fieldName]["custom"][key] = customInfo[key];
                }
            }
        }

        /**
         * @private
         */
        export function getPrototypes(): { [id: string]: any } {

            return gd3d_reflect_root["__gdmeta__"];
        }
        /**
         * @private
         */
        export function getPrototype(name: string) {
            return gd3d_reflect_root["__gdmeta__"][name];
        }
        /**
         * @private
         */
        export function createInstance(prototype: any, matchTag: { [id: string]: string }): any {
            // var type = getProtoTypes()[name];
            // if (type[name] == null)
            //     return null;
            if (matchTag == null) {
                var ctor = prototype.constructor;
                return new ctor();
            }
            else {
                var info = prototype["__gdmeta__"]["class"]["custom"];
                for (var key in matchTag) {
                    if (info[key] != matchTag[key]) {
                        console.warn("createInstance:" + name + ". tag do not match.");
                        return null;
                    }
                }
                var ctor = prototype.constructor;
                return new ctor();
            }
        }
        /**
         * @private
         */
        export function getClassName(prototype: any) {
            var info = prototype["__gdmeta__"]["class"]["typename"];
            return info;
        }
        /**
         * @private
         */
        export function getClassTag(prototype: any, tag: string) {
            var info = prototype["__gdmeta__"]["class"]["custom"];
            return info[tag];
        }
        /**
         * @private
         */
        export function getMeta(prototype: any): any {
            var meta = prototype.__gdmeta__;
            return meta;
        }
        /**
         * @private
         */
        export function attr_Class(constructorObj: any) {
            regType(constructorObj, null);
        }


        /**
         * @private
         */
        export function attr_Func(customInfo: { [id: string]: string } = null) {
            return function (target, propertyKey: string, value: any) {
                regFunc(target, propertyKey, customInfo);
            }
        }
        /**
         * @private
         */
        export function attr_Field(customInfo: { [id: string]: string } = null) {
            return function (target: Object, propertyKey: string) {
                regField(target, propertyKey, customInfo);
            }
        }


        /**
         * @private
         */
        export function userCode(constructorObj: any) {
            regType(constructorObj, { "usercode": "1" });
        }
        /**
         * @private
         */
        export function editorCode(constructorObj: any) {
            regType(constructorObj, { "editorcode": "1" });
        }
        /**
         * @private
         */
        export function selfClone(constructorObj: any) {
            regType(constructorObj, { "selfclone": "1" });
        }
        /**
         * @private
         */
        export function nodeComponent(constructorObj: any) {
            regType(constructorObj, { "nodecomp": "1" });
        }
        /**
         * @private
         */
        export function nodeComponentInspector(constructorObj: any) {
            regType(constructorObj, { "nodecomp_inspector": "1" });
        }
        /**
         * @private
         */
        export function nodeRender(constructorObj: any) {
            regType(constructorObj, { "renderer": "1" });
        }
        /**
         * @private
         */
        export function nodeCamera(constructorObj: any) {
            regType(constructorObj, { "camera": "1" });
        }
        /**
         * @private
         */
        export function nodeLight(constructorObj: any) {
            regType(constructorObj, { "light": "1" });
        }
        /**
         * @private
         */
        export function nodeBoxCollider(constructorObj: any) {
            regType(constructorObj, { "boxcollider": "1" });
        }
        /**
         * @private
         */
        export function nodeBoxCollider2d(constructorObj: any) {
            regType(constructorObj, { "boxcollider2d": "1" });
        }
        /**
         * @private
         */
        export function nodeSphereCollider(constructorObj: any) {
            regType(constructorObj, { "spherecollider": "1" });
        }
        /**
         * @private
         */
        export function nodeEffectBatcher(constructorObj: any) {
            regType(constructorObj, { "effectbatcher": "1" });
        }
        /**
         * @private
         */
        export function nodeMeshCollider(constructorObj: any) {
            regType(constructorObj, { "meshcollider": "1" });
        }
        /**
         * @private
         */
        export function nodeCanvasRendererCollider(constructorObj: any) {
            regType(constructorObj, { "canvasRenderer": "1" });
        }
        /**
         * @private
         */
        export function node2DComponent(constructorObj: any) {
            regType(constructorObj, { "2dcomp": "1" });
        }
        /**
         * @private
         */
        export function pluginMenuItem(constructorObj: any) {
            regType(constructorObj, { "plugin_menuitem": "1" });
        }
        /**
         * @private
         */
        export function pluginWindow(constructorObj: any) {
            regType(constructorObj, { "plugin_window": "1" });
        }
        /**
         * @private
         */
        export function pluginExt(constructorObj: any) {
            regType(constructorObj, { "plugin_ext": "1" });
        }
        /**
         * @private
         */
        export function compValue(integer: boolean = false, defvalue: number = 0, min: number = Number.MIN_VALUE, max: number = Number.MAX_VALUE) {
            return function (target: Object, propertyKey: string) {
                regField(target, propertyKey, {
                    "compValue": "1",
                    "integer": integer ? "1" : "0",
                    "defvalue": defvalue.toString(),
                    "min": min.toString(),
                    "max": max.toString(),
                });
            }
        }

        /**
         * @private
         */
        export function compCall(customInfo: { [id: string]: string } = null) {
            return function (target, propertyKey: string, value: any) {
                regFunc(target, propertyKey, { "compcall": "1" });
                regFunc(target, propertyKey, customInfo);
            }
        }




        /**
         * @private
         */
        export function SerializeType(constructorObj: any) {
            regType(constructorObj, { "SerializeType": "1" });
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * Field 
         * @version egret-gd3d 1.0
         * @param valueType 值类型
         * @param defaultValue 默认值
         * @param referenceType valueType 为 reference类型时 的具体类型
         */
        export function Field(valueType: string, defaultValue: any = undefined, referenceType: string = undefined) {
            return function (target: Object, propertyKey: string) {
                regField(target, propertyKey, {
                    "SerializeField": true,
                    "valueType": valueType
                });
                if (defaultValue == undefined) {
                }
                else {
                    regField(target, propertyKey, {
                        "defaultValue": defaultValue
                    });
                }
                if (valueType == "reference" && referenceType != undefined) {
                    regField(target, propertyKey, {
                        "referenceType": referenceType
                    });
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 属性面板提示修饰
         * @version egret-gd3d 1.0
         */
        export function UIComment(comment: string) {
            return function (target: Object, propertyKey: string) {
                regField(target, propertyKey, {
                    "UIComment": comment
                });
            }
        }

        /**
         * @private
         */
        export enum FieldUIStyle {
            None = 0,
            RangeFloat = 1,
            MultiLineString = 2,
            Enum = 3//序列化的时候枚举获取不到具体类型。先占坑
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 属性面板显示方式修饰
         * @version egret-gd3d 1.0
         */
        export function UIStyle(style: string, min?: number, max?: number, defvalue?: any) {
            return function (target: Object, propertyKey: string) {
                regField(target, propertyKey, {
                    "FieldUIStyle": style,
                    "min": min ? min : null,
                    "max": max ? max : null,
                    "defvalue": defvalue ? defvalue : null
                });
            }
        }

    }

}

