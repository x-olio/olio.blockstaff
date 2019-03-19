    class test_UIEffect implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        start(app: gd3d.framework.application)
        {

            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();

            console.warn("Finish it.");

            //目前材质是内置配置的，
            //这个加载机制弄完之后，就可以根据name 访问资源包里的shader
            //然后用shader 构造材质，和unity相同
            // 配置代码如下
            var sh = this.app.getAssetMgr().getShader("color");
            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 10;
            objCam.localTranslate = new gd3d.math.vector3(0, 0, -10);
            objCam.markDirty();//标记为需要刷新

            //2dtest overlay
            var o2d = new gd3d.framework.overlay2D();

            this.camera.addOverLay(o2d);

            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
            {
                if (s.isfinish) 
                {
                    this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
                    {
                        if (s.isfinish) 
                        {
                            console.warn("Finish load img.");
    
                            let count = 80;
                            let size = 30;
                            let gap = 10;
                            for(var i=0; i<count ; i++){
                                for(var j =0 ;j<count ; j++){
                                    //图片
                                    // let assetStr = j%2 ==0 ?  "rock256.png":"zg256.png"  ;
                                    let assetStr = "zg256.png"  ;
                                    let texture = app.getAssetMgr().getAssetByName(assetStr) as gd3d.framework.texture;
                                    //image
                                    let t2d_1 = new gd3d.framework.transform2D();
                                    t2d_1.width = t2d_1.height = size;
                                    t2d_1.pivot.x = t2d_1.pivot.y = 0;
                                    t2d_1.localTranslate.x = i * gap;  
                                    t2d_1.localTranslate.y = j * gap;
                                    o2d.addChild(t2d_1);
                                    let img_1 = t2d_1.addComponent("image2D") as gd3d.framework.image2D;
                                    img_1.imageType = gd3d.framework.ImageType.Simple;
                                    img_1.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");

                                    //rawimage
                                    // let robj = new gd3d.framework.transform2D();
                                    // robj.width = robj.height = size;
                                    // robj.pivot.x = robj.pivot.y = 0;
                                    // robj.localTranslate.x = i * gap;
                                    // robj.localTranslate.y = j * gap;
                                    // o2d.addChild(robj);
                                    // let rawimg = robj.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
                                    // rawimg.image = texture;
                                }
                            }
                            
                        }
                    });
                }
            });


            // {//一个片
            //     var t2d = new gd3d.framework.transform2D();
            //     t2d.width = 150;
            //     t2d.height = 150;
            //     t2d.pivot.x = 0;
            //     t2d.pivot.y = 0;
            //     t2d.markDirty();
            //     t2d.addComponent("rawImage2D");

            //     //o2d.addChild(t2d);
            // }

            // {
            //     //普通显示
            //     let t2d_1 = new gd3d.framework.transform2D();
            //     t2d_1.width = 150;
            //     t2d_1.height = 150;
            //     t2d_1.pivot.x = 0;
            //     t2d_1.pivot.y = 0;
            //     t2d_1.localTranslate.x = 150;
            //     let img_1 = t2d_1.addComponent("image2D") as gd3d.framework.image2D;
            //     img_1.imageType = gd3d.framework.ImageType.Simple;
            //     //o2d.addChild(t2d_1);

            //     //九宫显示
            //     let t2d_2 = new gd3d.framework.transform2D();
            //     t2d_2.width = 150;
            //     t2d_2.height = 150;
            //     t2d_2.pivot.x = 0;
            //     t2d_2.pivot.y = 0;
            //     t2d_2.localTranslate.x = 300;
            //     let img_2 = t2d_2.addComponent("image2D") as gd3d.framework.image2D;
            //     img_2.imageType = gd3d.framework.ImageType.Sliced;
            //     //o2d.addChild(t2d_2);

            //     //纵向填充
            //     let t2d_3 = new gd3d.framework.transform2D();
            //     t2d_3.width = 150;
            //     t2d_3.height = 150;
            //     t2d_3.pivot.x = 0;
            //     t2d_3.pivot.y = 0;
            //     t2d_3.localTranslate.x = 450;
            //     this.img_3 = t2d_3.addComponent("image2D") as gd3d.framework.image2D;
            //     this.img_3.imageType = gd3d.framework.ImageType.Filled;
            //     this.img_3.fillMethod = gd3d.framework.FillMethod.Vertical;
            //     this.img_3.fillAmmount = 1;
            //     //o2d.addChild(t2d_3);

            //     //横向填充
            //     let t2d_4 = new gd3d.framework.transform2D();
            //     t2d_4.width = 150;
            //     t2d_4.height = 150;
            //     t2d_4.pivot.x = 0;
            //     t2d_4.pivot.y = 0;
            //     t2d_4.localTranslate.x = 600;
            //     this.img_4 = t2d_4.addComponent("image2D") as gd3d.framework.image2D;
            //     this.img_4.imageType = gd3d.framework.ImageType.Filled;
            //     this.img_4.fillMethod = gd3d.framework.FillMethod.Horizontal;
            //     this.img_4.fillAmmount = 1;
            //     //o2d.addChild(t2d_4);

            //     //90扇形填充
            //     let t2d_5 = new gd3d.framework.transform2D();
            //     t2d_5.width = 150;
            //     t2d_5.height = 150;
            //     t2d_5.pivot.x = 0;
            //     t2d_5.pivot.y = 0;
            //     t2d_5.localTranslate.x = 750;
            //     this.img_5 = t2d_5.addComponent("image2D") as gd3d.framework.image2D;
            //     this.img_5.imageType = gd3d.framework.ImageType.Filled;
            //     this.img_5.fillMethod = gd3d.framework.FillMethod.Radial_90;
            //     this.img_5.fillAmmount = 1;
            //     //o2d.addChild(t2d_5);

            //     //瓦片填充
            //     let t2d_6 = new gd3d.framework.transform2D();
            //     t2d_6.width = 150;
            //     t2d_6.height = 150;
            //     t2d_6.pivot.x = 0;
            //     t2d_6.pivot.y = 0;
            //     t2d_6.localTranslate.x = 150;
            //     t2d_6.localTranslate.y = 150;
            //     let img_6 = t2d_6.addComponent("image2D") as gd3d.framework.image2D;
            //     img_6.imageType = gd3d.framework.ImageType.Tiled;
            //     //o2d.addChild(t2d_6);

            //     //180度填充
            //     let t2d_7 = new gd3d.framework.transform2D();
            //     t2d_7.width = 150;
            //     t2d_7.height = 150;
            //     t2d_7.pivot.x = 0;
            //     t2d_7.pivot.y = 0;
            //     t2d_7.localTranslate.x = 300;
            //     t2d_7.localTranslate.y = 150;
            //     this.img_7 = t2d_7.addComponent("image2D") as gd3d.framework.image2D;
            //     this.img_7.imageType = gd3d.framework.ImageType.Filled;
            //     this.img_7.fillMethod = gd3d.framework.FillMethod.Radial_180;
            //     this.img_7.fillAmmount = 1;
            //     //o2d.addChild(t2d_7);

            //     //360度填充
            //     let t2d_8 = new gd3d.framework.transform2D();
            //     t2d_8.width = 150;
            //     t2d_8.height = 150;
            //     t2d_8.pivot.x = 0;
            //     t2d_8.pivot.y = 0;
            //     t2d_8.localTranslate.x = 450;
            //     t2d_8.localTranslate.y = 150;
            //     this.img_8 = t2d_8.addComponent("image2D") as gd3d.framework.image2D;
            //     this.img_8.imageType = gd3d.framework.ImageType.Filled;
            //     this.img_8.fillMethod = gd3d.framework.FillMethod.Radial_360;
            //     this.img_8.fillAmmount = 1;
            //     //o2d.addChild(t2d_8);

            //     //颜色变换按钮
            //     let t2d_9 = new gd3d.framework.transform2D();
            //     t2d_9.width = 150;
            //     t2d_9.height = 50;
            //     t2d_9.pivot.x = 0;
            //     t2d_9.pivot.y = 0;
            //     t2d_9.localTranslate.x = 150;
            //     t2d_9.localTranslate.y = 300;
            //     let btn = t2d_9.addComponent("button") as gd3d.framework.button;
            //     let img9 = t2d_9.addComponent("image2D") as gd3d.framework.image2D;
            //     img9.imageType = gd3d.framework.ImageType.Sliced;
            //     btn.targetImage = img9;
            //     btn.transition = gd3d.framework.TransitionType.ColorTint;//颜色变换
            //     btn.onClick.addListener(() =>
            //     {
            //         console.log("按钮点下了");
            //     });
            //     //o2d.addChild(t2d_9);

            //     var lab = new gd3d.framework.transform2D();
            //     lab.name = "lab111";
            //     lab.width = 150;
            //     lab.height = 50;
            //     lab.pivot.x = 0;
            //     lab.pivot.y = 0;
            //     lab.localTranslate.y = -10;
            //     lab.markDirty();
            //     var label = lab.addComponent("label") as gd3d.framework.label;
            //     label.text = "这是按钮";
            //     label.fontsize = 25;
            //     label.color = new gd3d.math.color(1, 0, 0, 1);
            //     t2d_9.addChild(lab);



            //     //atlas资源
            //     this.app.getAssetMgr().load("res/1.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            //     {
            //         if (s.isfinish)
            //         {
            //             this.app.getAssetMgr().load("res/resources/1.atlas.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
            //             {
            //                 if(state.isfinish)
            //                 {
            //                     var atlas = this.app.getAssetMgr().getAssetByName("1.atlas.json") as gd3d.framework.atlas;
            //                     img_1.setTexture(atlas.texture);
            //                     img_2.sprite = atlas.sprites["card_role_1_face"];
            //                     img_2.sprite.border = new gd3d.math.border(10, 10, 10, 10);
            //                     this.img_3.sprite = atlas.sprites["card_role_1_face"];
            //                     this.img_4.sprite = atlas.sprites["card_role_1_face"];
            //                     this.img_5.sprite = atlas.sprites["card_role_1_face"];
            //                     img_6.sprite = atlas.sprites["card_role_1_face"];
            //                     this.img_7.sprite = atlas.sprites["card_role_1_face"];
            //                     this.img_8.sprite = atlas.sprites["card_role_1_face"];
            //                 }
            //                 //img9.sprite = atlas.sprites["card_role_1_face"];
            //             });
            //         }
            //     });

            //     this.app.getAssetMgr().load("res/uisprite.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
            //     {
            //         if (s.isfinish) 
            //         {
            //             let texture = this.app.getAssetMgr().getAssetByName("uisprite.png") as gd3d.framework.texture;
            //             //img_1.setTexture(texture);
            //             //img_2.setTexture(texture, new gd3d.math.border(15, 15, 15, 15));
            //             //this.img_3.setTexture(texture);
            //             //this.img_4.setTexture(texture);
            //             //this.img_5.setTexture(texture);
            //             //img_6.setTexture(texture);
            //             //this.img_7.setTexture(texture);
            //             //this.img_8.setTexture(texture);
            //             img9.setTexture(texture, new gd3d.math.border(15, 15, 15, 15));
            //         }
            //     });

            //     this.app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
            //     {
            //         if (s.isfinish)
            //         {
            //             this.app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
            //             {
            //                 if(s1.isfinish)
            //                     label.font = this.app.getAssetMgr().getAssetByName("STXINGKA.font.json") as gd3d.framework.font;//;
            //             });
            //         }
            //     });

            // }

            // // for (var i = 0; i < 10; i++)
            // // {//一个片
            // //     var t2d = new gd3d.framework.transform2D();
            // //     t2d.width = 50;
            // //     t2d.height = 50;
            // //     t2d.pivot.x = 25;
            // //     t2d.pivot.y = 25;
            // //     t2d.localTranslate.x = 100 * i;
            // //     t2d.localTranslate.y = 25;
            // //     t2d.localRotate = i;
            // //     t2d.markDirty();
            // //     var img = t2d.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
            // //     img.color.b = i * 0.1;
            // //     img.image = this.app.getAssetMgr().getDefaultTexture("white");
            // //     o2d.addChild(t2d);
            // // }
            // //2d test

            // var t = new gd3d.framework.transform();
            // t.localScale.x = t.localScale.y = t.localScale.z = 1;
            // var c2d = t.gameObject.addComponent("canvasRenderer") as gd3d.framework.canvasRenderer;
            // t.localTranslate.y = 1;
            // //t.localTranslate.z = 2;
            // this.scene.addChild(t);
            // {//一个片
            //     var t2d = new gd3d.framework.transform2D();
            //     t2d.width = 400;
            //     t2d.height = 400;
            //     t2d.pivot.x = 0;
            //     t2d.pivot.y = 0;
            //     t2d.markDirty();
            //     t2d.addComponent("rawImage2D");

            //     c2d.addChild(t2d);
            // }
            // for (var i = 0; i < 10; i++)
            // {//一个片
            //     var t2d = new gd3d.framework.transform2D();
            //     t2d.width = 50;
            //     t2d.height = 50;
            //     t2d.pivot.x = 0;
            //     t2d.pivot.y = 0;
            //     t2d.localTranslate.x = 100 * i;
            //     t2d.localRotate = i;
            //     t2d.markDirty();
            //     var img = t2d.addComponent("rawImage2D") as gd3d.framework.rawImage2D;
            //     img.color.b = i * 0.1;
            //     img.image = this.app.getAssetMgr().getDefaultTexture("white");
            //     c2d.addChild(t2d);
            // }
        }

        img_3: gd3d.framework.image2D;
        img_4: gd3d.framework.image2D;
        img_5: gd3d.framework.image2D;
        img_7: gd3d.framework.image2D;
        img_8: gd3d.framework.image2D;
        amount: number = 1;

        camera: gd3d.framework.camera;
        cube: gd3d.framework.transform;
        timer: number = 0;
        bere = false;
        bere1 = false;
        update(delta: number)
        {

        }
    }