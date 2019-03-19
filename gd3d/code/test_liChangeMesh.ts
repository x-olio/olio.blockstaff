class testLiChangeMesh implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        var role;
        var role1;

        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                this.app.getAssetMgr().load("res/prefabs/FS_01/FS_01.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("FS_01.prefab.json") as gd3d.framework.prefab;
                        role = _prefab.getCloneTrans();
                        this.scene.addChild(role);
                        role.localScale = new gd3d.math.vector3(1, 1, 1);
                        role.localTranslate = new gd3d.math.vector3(0, 0, 0);

                        var _aniplayer = role.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                        _aniplayer.autoplay = true;

                        this.cube = role;

                        if (role1 != null)
                        {
                            // this.createChangeBtn(role, role1, o2d, "body_01", "body_002");
                            this.createChangeBtn(role, role1, o2d, "feet", "feet");
                            // this.createChangeBtn(role, role1, o2d, "hand_01", "hand_002");
                            // this.createChangeBtn(role, role1, o2d, "head_01", "head_002");
                            // this.createChangeBtn(role, role1, o2d, "Leg_01", "leg_002");
                        }
                    }
                });

                this.app.getAssetMgr().load("res/prefabs/FS_002/FS_002.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("FS_002.prefab.json") as gd3d.framework.prefab;
                        role1 = _prefab.getCloneTrans();
                        // this.scene.addChild(role1);
                        // role1.localScale = new gd3d.math.vector3(1, 1, 1);
                        // role1.localTranslate = new gd3d.math.vector3(2, 0, 0);

                        if (role != null)
                        {
                            // this.createChangeBtn(role, role1, o2d, "body_01", "body_002");
                            this.createChangeBtn(role, role1, o2d, "feet", "feet");
                            // this.createChangeBtn(role, role1, o2d, "hand_01", "hand_002");
                            // this.createChangeBtn(role, role1, o2d, "head_01", "head_002");
                            // this.createChangeBtn(role, role1, o2d, "Leg_01", "leg_002");
                        }
                    }
                });
            }
        });

        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);


        var o2d = new gd3d.framework.overlay2D();
        this.camera.addOverLay(o2d);




    }

    uileft: number = 0;
    createChangeBtn(role: gd3d.framework.transform, role1: gd3d.framework.transform, o2d: gd3d.framework.overlay2D, part: string, part2)
    {
        let t2d_9 = new gd3d.framework.transform2D();
        t2d_9.width = 150;
        t2d_9.height = 50;
        t2d_9.pivot.x = 0;
        t2d_9.pivot.y = 0;
        t2d_9.localTranslate.x = this.uileft;
        t2d_9.localTranslate.y = 300;
        let btn = t2d_9.addComponent("button") as gd3d.framework.button;
        let img9 = t2d_9.addComponent("image2D") as gd3d.framework.image2D;
        img9.imageType = gd3d.framework.ImageType.Sliced;
        btn.targetImage = img9;
        btn.transition = gd3d.framework.TransitionType.ColorTint;//颜色变换

        let role_part: gd3d.framework.skinnedMeshRenderer;
        let role1_part: gd3d.framework.skinnedMeshRenderer;
        btn.addListener(gd3d.event.UIEventEnum.PointerClick,() =>
        {
            if (role_part == null)
            {
                let role_skinMeshRenders = role.gameObject.getComponentsInChildren("skinnedMeshRenderer") as gd3d.framework.skinnedMeshRenderer[];
                let role1_skinMeshRenders = role1.gameObject.getComponentsInChildren("skinnedMeshRenderer") as gd3d.framework.skinnedMeshRenderer[];

                for (var key in role_skinMeshRenders)
                {
                    if (role_skinMeshRenders[key].gameObject.getName().indexOf("_" + part) >= 0)
                    {
                        role_part = role_skinMeshRenders[key];
                    }
                }
                for (var key in role1_skinMeshRenders)
                {
                    if (role1_skinMeshRenders[key].gameObject.getName().indexOf("_" + part2) >= 0)
                    {
                        role1_part = role1_skinMeshRenders[key];
                    }
                }
            }

            let role_part_parent = role_part.gameObject.transform.parent;
            role1_part.gameObject.transform.parent.addChild(role_part.gameObject.transform);
            role_part_parent.addChild(role1_part.gameObject.transform);

            let role_part_player =  role_part.player;
            role_part._player = role1_part.player;
            role1_part._player = role_part_player;

        },this);
        o2d.addChild(t2d_9);

        var lab = new gd3d.framework.transform2D();
        lab.name = "lab111";
        lab.width = 150;
        lab.height = 50;
        lab.pivot.x = 0;
        lab.pivot.y = 0;
        lab.markDirty();
        var label = lab.addComponent("label") as gd3d.framework.label;
        label.text = "换" + part;
        label.fontsize = 25;
        label.color = new gd3d.math.color(1, 0, 0, 1);
        t2d_9.addChild(lab);

        this.app.getAssetMgr().load("res/uisprite.png", gd3d.framework.AssetTypeEnum.Auto, (s) => 
        {
            if (s.isfinish) 
            {
                let texture = this.app.getAssetMgr().getAssetByName("uisprite.png") as gd3d.framework.texture;
                img9.sprite = this.app.getAssetMgr().getDefaultSprite("grid_sprite");
            }
        });

        this.app.getAssetMgr().load("res/STXINGKA.TTF.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
        {
            if (s.isfinish)
            {
                this.app.getAssetMgr().load("res/resources/STXINGKA.font.json", gd3d.framework.AssetTypeEnum.Auto, (s1) =>
                {
                    if(s1.isfinish)
                        label.font = this.app.getAssetMgr().getAssetByName("STXINGKA.font.json") as gd3d.framework.font;//;
                });
            }
        });
        this.uileft += 150;
    }

    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number)
    {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        if (this.cube != null)
        {
            objCam.lookat(this.cube);
            objCam.markDirty();//标记为需要刷新
            objCam.updateWorldTran();
        }
    }
}