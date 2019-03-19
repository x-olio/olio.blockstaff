namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 原生3d模型类型
     * @version egret-gd3d 1.0
     */
    export enum PrimitiveType
    {
        Sphere,
        Capsule,
        Cylinder,
        Cube,
        Plane,
        Quad,
        Pyramid
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 原生2d类型
     * @version egret-gd3d 1.0
     */
    export enum Primitive2DType
    {
        RawImage2D,
        Image2D,
        Label,
        Button
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * Transform工具类
     * @version egret-gd3d 1.0
     */
    export class TransformUtil
    {
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 创建默认的3d对象
         * @param type 原生3d对象类型
         * @param app application的实例
         * @version egret-gd3d 1.0
         */
        static CreatePrimitive(type: PrimitiveType, app: application): transform
        {
            let objName = (PrimitiveType[type] as string);

            let trans = new transform();
            trans.name = objName;
            var mesh = trans.gameObject.addComponent("meshFilter") as meshFilter;
            var smesh = app.getAssetMgr().getDefaultMesh(objName.toLowerCase());
            mesh.mesh = smesh;
            var renderer = trans.gameObject.addComponent("meshRenderer") as meshRenderer;
            renderer.materials = [];
            renderer.materials.push(new framework.material());
            renderer.materials[0].setShader(app.getAssetMgr().getShader("shader/def"));
            return trans;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 创建默认的2d控件
         * @param type 2d控件类型
         * @param app application的实例
         * @version egret-gd3d 1.0
         */
        static Create2DPrimitive(type: Primitive2DType, app: application): transform2D
        {
            // let enumObj = EnumUtil.getEnumObjByType("gd3d.framework.Primitive2DType");
            let objName = (Primitive2DType[type] as string);
            let componentName = StringUtil.firstCharToLowerCase(objName);

            let t2d = new transform2D();
            t2d.name = objName;
            let i2dComp = t2d.addComponent(componentName);

            t2d.pivot.x = 0;
            t2d.pivot.y = 0;

            switch (type)
            {
                case Primitive2DType.RawImage2D:
                    TransformUtil.create2D_rawImage(i2dComp as rawImage2D, app);
                    break;
                case Primitive2DType.Image2D:
                    TransformUtil.create2D_image2D(i2dComp as image2D, app);
                    break;
                case Primitive2DType.Label:
                    TransformUtil.create2D_label(i2dComp as label, app);
                    break;
                case Primitive2DType.Button:
                    TransformUtil.create2D_button(i2dComp as button, app);
                    break;
            }
            return t2d;
        }

        private static create2D_rawImage(img: rawImage2D, app: application)
        {
            img.transform.width = 100;
            img.transform.height = 100;
            img.image = app.getAssetMgr().getDefaultTexture("white");
        }

        private static create2D_image2D(img: image2D, app: application)
        {
            img.transform.width = 100;
            img.transform.height = 100;
            img.sprite = app.getAssetMgr().getDefaultSprite("white_sprite");
        }

        private static create2D_label(label: label, app: application)
        {
            label.transform.width = 150;
            label.transform.height = 50;
            label.text = "label";
            label.fontsize = 25;
            label.color = new gd3d.math.color(1, 0, 0, 1);
            let _font = app.getAssetMgr().getAssetByName("STXINGKA.font.json");
            if (_font == null)
            {
                app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
                        {
                            label.font = app.getAssetMgr().getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
                            label.transform.markDirty();
                        });
                    }
                });
            }
            else
            {
                label.font = _font as gd3d.framework.font;;
                label.transform.markDirty();
            }

        }

        private static create2D_button(btn: button, app: application)
        {
            btn.transform.width = 150;
            btn.transform.height = 50;
            let img = btn.transform.addComponent("image2D") as gd3d.framework.image2D;
            img.sprite = app.getAssetMgr().getDefaultSprite("white_sprite");
            img.imageType = gd3d.framework.ImageType.Sliced;
            btn.targetImage = img;
            btn.transition = gd3d.framework.TransitionType.ColorTint;//颜色变换

            var lab = new gd3d.framework.transform2D();
            lab.name = "label";
            lab.width = 150;
            lab.height = 50;
            lab.pivot.x = 0;
            lab.pivot.y = 0;
            lab.localTranslate.y = -10;
            var label = lab.addComponent("label") as gd3d.framework.label;
            label.text = "button";
            label.fontsize = 25;
            label.color = new gd3d.math.color(1, 0, 0, 1);
            btn.transform.addChild(lab);


            let _font = app.getAssetMgr().getAssetByName("STXINGKA.font.json");
            if (_font == null)
            {
                app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
                        {
                            label.font = app.getAssetMgr().getAssetByName("STXINGKA.font.json") as gd3d.framework.font;
                            btn.transform.markDirty();
                        });
                    }
                });
            }
            else
            {
                label.font = _font as gd3d.framework.font;;
                btn.transform.markDirty();
            }
        }
    }
}