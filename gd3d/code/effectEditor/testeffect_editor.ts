/// <reference path="../../lib/htmlui.d.ts" />
class test_effecteditor implements IState
{
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    camera: gd3d.framework.camera;
    timer: number = 0;
    taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
    effect: gd3d.framework.effectSystem;
    label: HTMLLabelElement;
    gui: lighttool.htmlui.gui;
    transformRoot: gd3d.framework.transform;
    effectSystem: gd3d.framework.effectSystem;
    effectSysData: gd3d.framework.EffectSystemData;
    setVal(val: string, property: string, data: any)
    {
        if (val != "")
        {
            try
            {
                let v = parseFloat(val);
                data[property] = v;
            } catch (e)
            {

            }
        }
    }
    start(app: gd3d.framework.application)
    {
        this.app = app;
        this.scene = this.app.getScene();
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = "20px";
        this.app.container.appendChild(div);
        this.gui = new lighttool.htmlui.gui(div);
        lighttool.htmlui.panelMgr.instance().init(div);
        this.gui.onchange = () =>
        {
            // if (this.gui.add_Button("new particle"))
            // {
            //     this.transformRoot = new gd3d.framework.transform();
            //     this.effectSystem = this.transformRoot.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM) as gd3d.framework.effectSystem;
            //     this.effectSysData = new gd3d.framework.EffectSystemData();
            //     this.effectSysData.beLoop = false;
            //     this.effectSysData.life = 0;
            //     this.effectSysData.elements = [];
            // }
            // if (this.effectSystem != undefined)
            // {
            //     if (this.gui.add_Button("add element"))
            //     {
            //         this.addElement();
            //     }
            //     if (this.effectSysData.elements.length > 0)
            //     {
            //         this.gui.beginLayout_H();
            //         this.gui.add_A("life:");
            //         this.setVal(this.gui.add_Textbox("5"), "life", this.effectSysData);
            //         this.gui.endLayout();
            //         this.gui.beginLayout_H();
            //         this.gui.add_A("Position:");
            //         this.gui.add_A(" x");
            //         this.setVal(this.gui.add_Textbox("0"), "x", this.effectSysData.elements[0].initFrameData.attrsData.pos);
            //         this.gui.add_A(" y");
            //         this.setVal(this.gui.add_Textbox("0"), "y", this.effectSysData.elements[0].initFrameData.attrsData.pos);
            //         this.gui.add_A(" z");
            //         this.setVal(this.gui.add_Textbox("0"), "z", this.effectSysData.elements[0].initFrameData.attrsData.pos);
            //         this.gui.endLayout();

            //         this.gui.beginLayout_H();
            //         this.gui.add_A("Euler:");
            //         this.gui.add_A(" x");
            //         this.setVal(this.gui.add_Textbox("0"), "x", this.effectSysData.elements[0].initFrameData.attrsData.euler);
            //         this.gui.add_A(" y");
            //         this.setVal(this.gui.add_Textbox("0"), "y", this.effectSysData.elements[0].initFrameData.attrsData.euler);
            //         this.gui.add_A(" z");
            //         this.setVal(this.gui.add_Textbox("0"), "z", this.effectSysData.elements[0].initFrameData.attrsData.euler);
            //         this.gui.endLayout();

            //         this.gui.beginLayout_H();
            //         this.gui.add_A("Scale:");
            //         this.gui.add_A(" x");
            //         this.setVal(this.gui.add_Textbox("1"), "x", this.effectSysData.elements[0].initFrameData.attrsData.scale);
            //         this.gui.add_A(" y");
            //         this.setVal(this.gui.add_Textbox("1"), "y", this.effectSysData.elements[0].initFrameData.attrsData.scale);
            //         this.gui.add_A(" z");
            //         this.setVal(this.gui.add_Textbox("1"), "z", this.effectSysData.elements[0].initFrameData.attrsData.scale);
            //         this.gui.endLayout();

            //         this.gui.beginLayout_H();
            //         this.gui.add_A("Color:");
            //         this.gui.add_A(" x");
            //         this.setVal(this.gui.add_Textbox("1"), "x", this.effectSysData.elements[0].initFrameData.attrsData.color);
            //         this.gui.add_A(" y");
            //         this.setVal(this.gui.add_Textbox("1"), "y", this.effectSysData.elements[0].initFrameData.attrsData.color);
            //         this.gui.add_A(" z");
            //         this.setVal(this.gui.add_Textbox("1"), "z", this.effectSysData.elements[0].initFrameData.attrsData.color);
            //         this.gui.endLayout();

            //         this.gui.beginLayout_H();
            //         this.gui.add_A("拖拽选择mesh文件");
            //         let fileList = this.gui.add_DragFile();
            //         if (fileList != null && fileList.length > 0)
            //         {
            //             let file = fileList[0];
            //             this.effectSysData.elements[0].initFrameData.attrsData.mesh = this.app.getAssetMgr().getAssetByName(file.name) as gd3d.framework.mesh;
            //             console.log(file.name);
            //         }
            //         if (this.effectSysData.elements[0].initFrameData.attrsData.mesh != null)
            //             this.gui.add_A(this.effectSysData.elements[0].initFrameData.attrsData.mesh.getName());
            //         this.gui.endLayout();
            //         if (this.gui.add_Button("创建材质"))
            //         {
            //             let matData = new gd3d.framework.EffectMatData();
            //             this.effectSysData.elements[0].initFrameData.attrsData.mat = matData;
            //         }
            //         if (this.effectSysData.elements[0].initFrameData.attrsData.mat != undefined)
            //         {
            //             this.gui.beginLayout_H();
            //             this.gui.add_A("拖拽选择shader");
            //             let fileList = this.gui.add_DragFile();
            //             if (fileList != null && fileList.length > 0)
            //             {
            //                 let file = fileList[0];
            //                 this.effectSysData.elements[0].initFrameData.attrsData.mat.shader = this.app.getAssetMgr().getShader(file.name) as gd3d.framework.shader;
            //                 console.log(file.name);
            //             }
            //             if (this.effectSysData.elements[0].initFrameData.attrsData.mat.shader != null)
            //                 this.gui.add_A(this.effectSysData.elements[0].initFrameData.attrsData.mat.shader.getName());
            //             this.gui.endLayout();

            //             this.gui.beginLayout_H();
            //             this.gui.add_A("拖拽选择贴图");
            //             fileList = this.gui.add_DragFile();
            //             if (fileList != null && fileList.length > 0)
            //             {
            //                 let file = fileList[0];
            //                 this.effectSysData.elements[0].initFrameData.attrsData.mat.diffuseTexture = this.app.getAssetMgr().getAssetByName(file.name) as gd3d.framework.texture;
            //                 console.log(file.name);
            //             }
            //             if (this.effectSysData.elements[0].initFrameData.attrsData.mat.diffuseTexture != null)
            //                 this.gui.add_A(this.effectSysData.elements[0].initFrameData.attrsData.mat.diffuseTexture.getName());
            //             this.gui.endLayout();
            //         }


            //         this.gui.add_A("TimeLine:");
            //         this.gui.beginLayout_V();
            //         this.gui.add_A("frameIndex:");
            //         let val = this.gui.add_Textbox("30");
            //         if (this.gui.add_Button("Add Breath Action"))
            //         {
            //             if (val != "")
            //             {
            //                 try
            //                 {
            //                     let v = parseFloat(val);
            //                     if (this.effectSysData.elements[0].timelineFrame == undefined)
            //                         this.effectSysData.elements[0].timelineFrame = {};
            //                     if (this.effectSysData.elements[0].timelineFrame[v] == undefined)
            //                         this.effectSysData.elements[0].timelineFrame[v] = new gd3d.framework.EffectFrameData();
            //                     this.effectSysData.elements[0].timelineFrame[v].frameIndex = v;
            //                     let action = new gd3d.framework.EffectActionData();
            //                     action.actionType = "breath";
            //                     action.startFrame = v;
            //                     this.effectSysData.elements[0].actionData = [];
            //                     this.effectSysData.elements[0].actionData.push(action);
            //                 } catch (e)
            //                 {

            //                 }
            //             }
            //         }
            //         if (this.effectSysData.elements[0].actionData != undefined && this.effectSysData.elements[0].actionData.length > 0)
            //         {
            //             this.scaleChecked = this.gui.add_Checkbox("scale", this.scaleChecked);
            //             if (this.scaleChecked)
            //             {
            //                 this.positionChecked = false;
            //                 this.eulerChecked = false;
            //             }
            //             this.positionChecked = this.gui.add_Checkbox("position", this.positionChecked);
            //             if (this.positionChecked)
            //             {
            //                 this.scaleChecked = false;
            //                 this.eulerChecked = false;
            //             }
            //             this.eulerChecked = this.gui.add_Checkbox("euler", this.eulerChecked);
            //             if (this.eulerChecked)
            //             {
            //                 this.positionChecked = false;
            //                 this.scaleChecked = false;
            //             }

            //             if (this.scaleChecked)
            //             {
            //                 if (this.effectSysData.elements[0].actionData[0].params == undefined)
            //                     this.effectSysData.elements[0].actionData[0].params = {};
            //                 this.effectSysData.elements[0].actionData[0].params["name"] = "scale";
            //                 this.gui.beginLayout_H();
            //                 this.gui.add_A("startvalue:");
            //                 this.gui.add_A(" x");
            //                 this.setVal(this.gui.add_Textbox("2"), "x", this.effectSysData.elements[0].actionData[0].params["startvalue"]);
            //                 this.gui.add_A(" y");
            //                 this.setVal(this.gui.add_Textbox("2"), "y", this.effectSysData.elements[0].actionData[0].params["startvalue"]);
            //                 this.gui.add_A(" z");
            //                 this.setVal(this.gui.add_Textbox("2"), "z", this.effectSysData.elements[0].actionData[0].params["startvalue"]);
            //                 this.gui.endLayout();

            //                 this.gui.beginLayout_H();
            //                 this.gui.add_A("targetvalue:");
            //                 this.gui.add_A(" x");
            //                 this.setVal(this.gui.add_Textbox("2"), "x", this.effectSysData.elements[0].actionData[0].params["targetvalue"]);
            //                 this.gui.add_A(" y");
            //                 this.setVal(this.gui.add_Textbox("2"), "y", this.effectSysData.elements[0].actionData[0].params["targetvalue"]);
            //                 this.gui.add_A(" z");
            //                 this.setVal(this.gui.add_Textbox("4"), "z", this.effectSysData.elements[0].actionData[0].params["targetvalue"]);
            //                 this.gui.endLayout();
            //             }
            //             this.gui.beginLayout_H();
            //             this.gui.add_A("loopframe:");
            //             this.setVal(this.gui.add_Textbox("60"), "loopframe", this.effectSysData.elements[0].actionData[0].params);
            //             this.gui.endLayout();
            //         }
            //         this.gui.endLayout();
            //     }
            // }

            // if (this.gui.add_Button("Play"))
            // {
            //     this.play();
            // }
        };
        setInterval(() =>
        {
            this.gui.update();
        }, 300);
        //任务排队执行系统
        this.taskmgr.addTaskCall(this.loadShader.bind(this));
        this.taskmgr.addTaskCall(this.loadText.bind(this));
        this.taskmgr.addTaskCall(this.addcam.bind(this));
        this.taskmgr.addTaskCall(this.loadEffect.bind(this));
    }
    private scaleChecked: boolean;
    private positionChecked: boolean;
    private eulerChecked: boolean;
    private length: number = 0;
    private addElement()
    {
        let element: gd3d.framework.EffectElementData = new gd3d.framework.EffectElementData();
        element.name = "element" +this.length;
        this.effectSysData.elementDic[element.name] = (element);
        this.length++;
        element.type = gd3d.framework.EffectElementTypeEnum.SingleMeshType;
        element.initFrameData = new gd3d.framework.EffectFrameData();
        element.initFrameData.frameIndex = -1;
        element.initFrameData.attrsData = new gd3d.framework.EffectAttrsData();
        element.initFrameData.attrsData.pos = new gd3d.math.vector3();
        element.initFrameData.attrsData.scale = new gd3d.math.vector3(1, 1, 1);
        element.initFrameData.attrsData.euler = new gd3d.math.vector3();
    }

    private play()
    {
        this.effectSystem.data = this.effectSysData;
        this.app.getScene().addChild(this.transformRoot);
        this.transformRoot.markDirty();
        this.effectSystem.reset();
        this.effectSystem.play();
    }


    private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
        {
            if (_state.isfinish)
            {
                state.finish = true;
            }
        }
        );
    }
    private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) 
    {
        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) =>
        {
            if (s.isfinish)
            {
                state.finish = true;
            }
            else
            {
                state.error = true;
            }
        }
        );
    }

    private loadEffect(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) 
    {
        //fx_0005_sword_sword
        let names: string[] = ["fx_ss_female@attack_01", "fx_shengji_jiaose", "fx_ss_female@attack_03", "fx_ss_female@attack_02", "fx_0_zs_male@attack_02", "fx_shuijing_cj", "fx_fs_female@attack_02", "fx_0005_sword_sword", "fx_0005_sword_sword", "fx_0_zs_male@attack_02", "fx_fs_female@attack_02"];
        let name = names[0];
        this.app.getAssetMgr().load("res/particleEffect/" + name + "/" + name + ".assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) =>
        {
            if (_state.isfinish)
            {
                this.tr = new gd3d.framework.transform();
                this.effect = this.tr.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_EFFECTSYSTEM) as gd3d.framework.effectSystem;
                var text: gd3d.framework.textasset = this.app.getAssetMgr().getAssetByName(name + ".effect.json") as gd3d.framework.textasset;
                this.effect.setJsonData(text);
                this.scene.addChild(this.tr);
                this.tr.markDirty();
                state.finish = true;
                this.effectloaded = true;
                // this.addButton();
            }
        }
        );

    }

    private addButton()
    {
        var btn = document.createElement("button");
        btn.textContent = "Load Prefab";
        btn.onclick = () =>
        {
            this.app.getAssetMgr().savePrefab(this.tr, "prefabName", (data: gd3d.framework.SaveInfo, resourses: string[]) =>
            {
                console.log(data.files);
                console.log(resourses.length);

            });
        }
        btn.style.top = "160px";
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);


        var btn1 = document.createElement("button");
        btn1.textContent = "Save To Prefab";
        btn1.onclick = () =>
        {
            let name: string = this.tr.name;
            let _prefab = new gd3d.framework.prefab(name);
            this.app.getAssetMgr().use(_prefab);
            _prefab.assetbundle = name;
            let path: string = "";
            this.app.getAssetMgr().savePrefab(this.tr, name, (data: gd3d.framework.SaveInfo, resourses: string[]) =>
            {
                console.log(data.files);
                console.log(resourses.length);
                for (let key in data.files)
                {
                    let val = data.files[key];
                    let blob = localSave.Instance.file_str2blob(val);

                    let files = [];

                    let resPath = path + "/resources/";
                    //保存资源
                    for (let i = 0; i < resourses.length; i++)
                    {
                        let resourceUrl = resourses[i];
                        let resourceName: string = this.getNameFromURL(resourceUrl);
                        let resourceLength = 0;

                        if (resourceName.indexOf(".txt") != -1 || resourceName.indexOf(".json"))
                        {
                            localSave.Instance.loadTextImmediate(resourceUrl, (_txt, _err) =>
                            {
                                let blob = localSave.Instance.file_str2blob(_txt);
                                localSave.Instance.save(resPath + resourceName, blob);
                            });
                        }
                        else
                        {
                            localSave.Instance.loadBlobImmediate(resourceUrl, (_blob, _err) =>
                            {
                                localSave.Instance.save(resPath + resourceName, _blob);
                            });
                        }


                        let fileInfo = { "name": "resources/" + resourceName, "length": 100 }
                        files.push(fileInfo);
                    }

                    localSave.Instance.save(resPath + name + ".prefab.json", blob);
                    let fileInfo = { "name": "resources/" + name + ".prefab.json", "length": 100 }
                    files.push(fileInfo);

                    let assetBundleStr = JSON.stringify({ "files": files });
                    let assetBundleBlob = localSave.Instance.file_str2blob(assetBundleStr);


                    localSave.Instance.save(path + "/" + name + ".assetbundle.json", assetBundleBlob);
                }
            });
        }
        btn1.style.top = "320px";
        btn1.style.position = "absolute";
        this.app.container.appendChild(btn1);
    }

    private getNameFromURL(path: string)
    {
        let index = path.lastIndexOf("/");
        return path.substring(index + 1);
    }

    private addcam(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate)
    {
        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 200;
        this.camera.fov = Math.PI * 0.3;
        this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
        objCam.localTranslate = new gd3d.math.vector3(0, 20, 20);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();//标记为需要刷新
        state.finish = true;
    }

    tr: gd3d.framework.transform;
    ttr: gd3d.framework.transform;
    eff: gd3d.framework.effectSystem;
    beclone = false;
    effectloaded = false;
    bestop = false;
    bereplay = false;
    update(delta: number)
    {
        this.taskmgr.move(delta);
    }
}