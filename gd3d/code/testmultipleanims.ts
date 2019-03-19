class test_multipleplayer_anim implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    player: gd3d.framework.transform;
    cubes: { [id: string]: gd3d.framework.transform } = {};
    infos: { [boneCount: number]: { abName: string, prefabName: string, materialCount: number } } = {};

    init()
    {
        // this.infos[25] = { abName: "gblgongjiang/gblgongjiang.assetbundle.json", prefabName: "gblgongjiang.prefab.json", materialCount: 1 };
        // this.infos[60] = { abName: "emoshou/emoshou.assetbundle.json", prefabName: "emoshou.prefab.json", materialCount: 3 };
        this.infos[53] = { abName: "prefabs/elong/elong.assetbundle.json", prefabName: "elong.prefab.json", materialCount: 1 };


    }
    start(app: gd3d.framework.application)
    {
        this.app = app;
        this.scene = this.app.getScene();
        this.init();
        var baihu = new gd3d.framework.transform();
        baihu.name = "baihu";
        baihu.localScale.x = baihu.localScale.y = baihu.localScale.z = 1;

        this.scene.addChild(baihu);

        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) =>
        {
            if (state.isfinish)
            {
                //let _shader = this.app.getAssetMgr().getShader("bone.shader.json");
                let data = this.infos[53];
                this.app.getAssetMgr().load("res/" + data.abName, gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                    {
                        var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(data.prefabName) as gd3d.framework.prefab;
                        let a = 10;
                        let b = 10;
                        let count = 13;
                        for (let i = -count; i <=count; i++)
                        {
                            for (let j = -count; j <=count; j++)
                            {
                                let trans = _prefab.getCloneTrans();

                                this.scene.addChild(trans);
                                trans.localScale = new gd3d.math.vector3(1, 1, 1);
                                // trans.localTranslate = new gd3d.math.vector3((-a + i) * 5, 0, (-b + j) * 5);
                                trans.localTranslate = new gd3d.math.vector3(i * 5,0,j*5);
                                if (i ==0 && j == 0)
                                {
                                    objCam.lookat(trans);
                                }
                                var ap = trans.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                                this.aniplayers.push(ap);
                            }
                        }
                        objCam.markDirty();
                    }
                });
            }
        });
        this.cube = baihu;

        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 399;
        objCam.localTranslate = new gd3d.math.vector3(0, 286, 0);
        // objCam.lookat(baihu);
        objCam.markDirty();//标记为需要刷新



        var tipsLabel = document.createElement("label");
        tipsLabel.style.top = "300px";
        tipsLabel.style.position = "absolute";
        tipsLabel.textContent = "开启cache";
        this.app.container.appendChild(tipsLabel);

        let cacheOpenCheckBox = document.createElement("input");
        cacheOpenCheckBox.type = "checkbox";
        cacheOpenCheckBox.checked = false;
        cacheOpenCheckBox.onchange = () =>
        {
            // for(let key in this.aniplayers)
            // {
            //     this.aniplayers[key].isCache = cacheOpenCheckBox.checked;
            // }
        }
        cacheOpenCheckBox.style.top = "350px";
        cacheOpenCheckBox.style.position = "absolute";
        this.app.container.appendChild(cacheOpenCheckBox);
    }

    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    aniplayers:gd3d.framework.aniplayer[] = [];
    update(delta: number)
    {

    }
}