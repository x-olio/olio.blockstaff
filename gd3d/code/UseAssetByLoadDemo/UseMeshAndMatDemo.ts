//加载并使用mesh和材质资源
class UseMeshAndMatDemo implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr;
    
    //加载一个mesh
    private loadMesh(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        this.app.getAssetMgr().load(`res/prefabs/Cube/resources/Library_unity_default_resources_Cube.mesh.bin`, gd3d.framework.AssetTypeEnum.Mesh, (s) => {
            if (s.iserror) {
                state.error = true;
                console.log(s.errs);
            }
            if (s.isfinish) {
                state.finish = true;
            }
        });
    }
    //加载一个mesh的材质资源
    private loadMaterial(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        this.app.getAssetMgr().load(`res/prefabs/Cube/resources/Default-Diffuse.mat.json`, gd3d.framework.AssetTypeEnum.Material, (s) => {
            if (s.iserror) {
                state.error = true;
                console.log(s.errs);
            }
            if (s.isfinish) {
                state.finish = true;
            }
        })
    }
    
    //新建一个cube 绑定加载的mesh资源和材质资源
    private useMeshAndMat(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let cube = new gd3d.framework.transform();
        cube.name = "cube";
        cube.localPosition = new gd3d.math.vector3(0, 0, 0);
        //给cube添加一个mesh组件，mesh组件存放顶点数据的。
        let mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        //获取已经加载好的mesh资源，并把mesh资源绑定给cube的mesh组件
        mesh.mesh = this.app.getAssetMgr().getAssetByName("Library_unity_default_resources_Cube.mesh.bin") as gd3d.framework.mesh;

        //给cube添加一个渲染组件。
        let render = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        //获取已经加载好的材质资源，并把材质资源绑定给cube的渲染组件
        render.materials.push(this.app.getAssetMgr().getAssetByName("Default-Diffuse.mat.json") as gd3d.framework.material);
        this.scene.addChild(cube);
        cube.markDirty();
        state.finish = true;
    }

    //#region 加载shader
    private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        this.app.getAssetMgr().load("res/shader/Mainshader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
            if (s.iserror) {
                state.error = true;
            }
            if (s.isfinish)
                state.finish = true;
        });
    }
    //#endregion
    //#region 添加一个摄像机
    private addCamera(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        let objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 10;
        objCam.localPosition.x = 10;

        let camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        objCam.markDirty();
        state.finish = true;
    }
    //#endregion

    start(app: gd3d.framework.application) {
        this.app = app;
        this.scene = app.getScene();
        //提供给项目用的执行队列，可以减少 asstemgr.load方法 的回调嵌套
        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.loadMesh.bind(this));
        this.taskMgr.addTaskCall(this.loadMaterial.bind(this));
        this.taskMgr.addTaskCall(this.useMeshAndMat.bind(this));
    }

    update(delta: number) {
        this.taskMgr.move(delta);
    }
}



