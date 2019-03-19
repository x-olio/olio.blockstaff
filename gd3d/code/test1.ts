/// <reference path="../lib/gd3d.d.ts" />

class test_01 implements IState {
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    start(app: gd3d.framework.application) {
        console.log("i am here.");
        this.app = app;
        this.scene = this.app.getScene();

        let cuber: gd3d.framework.meshRenderer;

        for (var i = 0; i < 5; i++) {
            //添加一个盒子
            var cube = new gd3d.framework.transform();
            cube.name = "cube";



            cube.localScale.x = cube.localScale.y = cube.localScale.z = 1;
            cube.localTranslate.x = 2;
            var collider = cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            this.scene.addChild(cube);
            var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

            var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
            mesh.mesh = smesh;
            var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;


            //var collider = cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;

            cube.markDirty();
            cuber = renderer;

            console.warn("Finish it.");

            //目前材质是内置配置的，
            //这个加载机制弄完之后，就可以根据name 访问资源包里的shader
            //然后用shader 构造材质，和unity相同
            // 配置代码如下

            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) => {
                if (state.isfinish) {
                    var sh = this.app.getAssetMgr().getShader("color.shader.json");
                    if (sh != null) {
                        //用了从资源里加载出来的shader
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);
                        //shader 修改为 不和一般资源一样加载,而是统一用getShader方法
                        //cuber.materials[0].shader = this.app.getAssetMgr().getResourceByName("color") as gd3d.framework.shader;
                        this.app.getAssetMgr().load("res/zg256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                            if (s.isfinish) {
                                console.warn("Finish load img.");
                                let texture = this.app.getAssetMgr().getAssetByName("zg256.png") as gd3d.framework.texture;
                                cuber.materials[0].setTexture("_MainTex", texture);
                            }
                        })
                    }
                }
            });

            gd3d.math.quatFromAxisAngle(new gd3d.math.vector3(0, 0, 1), 45, cube.localRotate);
            this.cube = cube;
            this.cube.setWorldPosition(new gd3d.math.vector3(i, 0, 0));
        }
        {
            this.cube2 = new gd3d.framework.transform();
            this.cube2.name = "cube2";
            this.scene.addChild(this.cube2);
            this.cube2.localScale.x = this.cube2.localScale.y = this.cube2.localScale.z = 0.5;
            var mesh = this.cube2.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = (smesh);
            var renderer = this.cube2.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            var collider = this.cube2.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
            {
                var cube = new gd3d.framework.transform();
                cube.name = "cubesub";
                this.cube2.addChild(cube);
                var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                mesh.mesh = (smesh);
                var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

                cube.localTranslate.z = 1;
                cube.localScale.x = 0.5;
                cube.localScale.y = 0.5;
                //cube.localScale.z = 0.5;
                var collider = cube.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
                cube.markDirty();
            }
        }
        {
            //this.cube3 = new gd3d.framework.transform();
            //this.cube3.localScale.x = this.cube3.localScale.y = this.cube3.localScale.z = 0.7;
            //this.cube3.name = "cube3";
            //this.scene.addChild(this.cube3);
            //var mesh = this.cube3.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            //mesh.setMesh(smesh);
            //var renderer = this.cube3.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            ////var collider = this.cube3.gameObject.addComponent("boxcollider") as gd3d.framework.boxcollider;
        }

        //添加一个摄像机
        var objCam = new gd3d.framework.transform();
        objCam.name = "sth.";
        this.scene.addChild(objCam);
        this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        this.camera.near = 0.01;
        this.camera.far = 100;
        objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
        objCam.lookat(cube);
        objCam.markDirty();//标记为需要刷新

        {
            var testQuat: gd3d.math.quaternion = gd3d.math.pool.new_quaternion();


            // gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector2_right, 45, testQuat);
        }

        //{
        //    var angle = new gd3d.math.vector3(30, 40, 150);
        //    var quat = new gd3d.math.quaternion();
        //    gd3d.math.quatFromEulerAngles(angle.x, angle.y, angle.z, quat);

        //    var out = new gd3d.math.vector3();
        //    gd3d.math.quatToEulerAngles(quat, out);
        //}
    }
    camera: gd3d.framework.camera;
    cube: gd3d.framework.transform;
    cube2: gd3d.framework.transform;
    cube3: gd3d.framework.transform;
    timer: number = 0;
    update(delta: number) {
        this.timer += delta;
        var x = Math.sin(this.timer);
        var z = Math.cos(this.timer);
        var x2 = Math.sin(this.timer * 0.1);
        var z2 = Math.cos(this.timer * 0.1);
        var objCam = this.camera.gameObject.transform;
        //objCam.localTranslate = new gd3d.math.vector3(x2 * 5, 2.25, -z2 * 5);
        //objCam.lookat(this.cube);
        //objCam.markDirty();//标记为需要刷新
        //objCam.updateWorldTran();

        this.cube2.localTranslate = new gd3d.math.vector3(this.timer, 0, 0);
        //this.cube2.lookat(this.cube);
        this.cube2.markDirty();
        //this.cube3.localTranslate = new gd3d.math.vector3(x * 2, 0, z * 2);
        //this.cube3.markDirty();

    }
}