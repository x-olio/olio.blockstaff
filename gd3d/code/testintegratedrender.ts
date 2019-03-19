namespace t {

    export class test_integratedrender implements IState {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => {
                if (_state.isfinish) {
                    state.finish = true;
                }
            }
            );
        }

        private loadText(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/trailtest2_00000.imgdesc.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
            this.app.getAssetMgr().load("res/rock256.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
            this.app.getAssetMgr().load("res/swingFX.png", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    state.finish = true;
                }
                else {
                    state.error = true;
                }
            }
            );
        }
        aniplayer: gd3d.framework.aniplayer;
        role: gd3d.framework.transform;
        private roleLength: number;
        private loadRole(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/prefabs/0000_zs_male/0000_zs_male.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("0000_zs_male.prefab.json") as gd3d.framework.prefab;
                    this.role = _prefab.getCloneTrans();
                    this.role.name = "role";
                    this.roleLength = this.role.children.length;
                    this.scene.addChild(this.role);
                    this.role.localScale = new gd3d.math.vector3(1, 1, 1);
                    this.role.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    this.role.gameObject.visible = true;
                    this.role.markDirty();
                    this.role.updateWorldTran();
                    this.aniplayer = this.role.gameObject.getComponent("aniplayer") as gd3d.framework.aniplayer;
                    state.finish = true;
                }
            });
        }

        private weapon: gd3d.framework.transform;
        private loadWeapon(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
            this.app.getAssetMgr().load("res/prefabs/0002_sword_sword/0002_sword_sword.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if (s.isfinish) {
                    if (this.weapon) this.weapon.parent.removeChild(this.weapon);
                    var _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName("0002_sword_sword.prefab.json") as gd3d.framework.prefab;
                    this.weapon = _prefab.getCloneTrans();
                    //  this.scene.addChild(this.role);
                    this.weapon.localScale = new gd3d.math.vector3(1, 1, 1);
                    this.weapon.localTranslate = new gd3d.math.vector3(0, 0, 0);
                    var obj = this.role.find("Bip001 Prop1");
                    obj.addChild(this.weapon);
                    state.finish = true;
                }
            });
        }
        sh: gd3d.framework.shader;
        cube2: gd3d.framework.transform;

        private initscene(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {



            {

                //添加一个摄像机
                var objCam = new gd3d.framework.transform();
                objCam.name = "sth.";
                this.scene.addChild(objCam);
                this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
                this.camera.near = 0.01;
                this.camera.far = 100;
                this.camera.fov = Math.PI * 0.3;
                this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
                objCam.localTranslate = new gd3d.math.vector3(0, 5, -5);
                objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
                objCam.markDirty();//标记为需要刷新

                {
                    var org = new gd3d.framework.transform();
                    org.name = "org";
                    this.org = org;
                    this.scene.addChild(org);
                }

                {
                    let ref_cube = new gd3d.framework.transform();
                    ref_cube.name = "ref_cube";
                    ref_cube.localScale.x = ref_cube.localScale.y = ref_cube.localScale.z = 5;
                    ref_cube.localTranslate.y = -2;
                    this.scene.addChild(ref_cube);
                    var mesh = ref_cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("plane");
                    mesh.mesh = (smesh);
                    var renderer = ref_cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    var sh = this.app.getAssetMgr().getShader("diffuse_bothside.shader.json") as gd3d.framework.shader;
                    if (sh != null) {
                        cuber.materials = [];
                        cuber.materials.push(new gd3d.framework.material());
                        cuber.materials[0].setShader(sh);//----------------使用shader
                        let texture = this.app.getAssetMgr().getAssetByName("rock256.png") as gd3d.framework.texture;
                        cuber.materials[0].setTexture("_MainTex", texture);

                    }
                    this.cube2 = ref_cube;
                }

                {
                    var cube = new gd3d.framework.transform();
                    cube.name = "cube";
                    this.cube = cube;
                    org.addChild(cube);
                    cube.localTranslate.x = -5;
                    // cube.localScale.y = 0.1;
                    // cube.localScale.z = 0.5;
                    // cube.localScale.x = 5;
                    cube.markDirty();
                    var mesh = cube.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

                    var smesh = this.app.getAssetMgr().getDefaultMesh("cube");
                    mesh.mesh = (smesh);
                    var renderer = cube.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    let cuber = renderer;

                    // var test1=new gd3d.framework.transform();
                    // test1.localScale.y=2;
                    // test1.localScale.x=0.3;
                    // test1.localScale.z=0.3;
                    // test1.localTranslate.z=1;
                    // this.weapon.addChild(test1);
                    //  var mesh = test1.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                    // test1.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                    // mesh.mesh=smesh;
                    // gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_right, 90, test1.localRotate);
                    // test1.markDirty();
                    
                    var trailtrans = new gd3d.framework.transform();
                    trailtrans.localTranslate.z = 2;
                    
                    this.weapon.addChild(trailtrans);               
                    gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_right, 270, trailtrans.localRotate);
                    trailtrans.markDirty();
                    var trailrender = trailtrans.gameObject.addComponent("trailRender") as gd3d.framework.trailRender;
                    //trailrender.color=new gd3d.math.color(1.0,0,0,1.0);
                    //trailrender.speed = 1;
                    trailrender.setWidth(2);
                    var mat = new gd3d.framework.material();
                    //particles_additive.shader.json
                    //transparent_bothside.shader.json
                    //particles_additive_premultiply.shader.json
                    let shader = this.app.getAssetMgr().getShader("transparent_bothside.shader.json") as gd3d.framework.shader;
                    var tex = this.app.getAssetMgr().getAssetByName("trailtest2_00000.imgdesc.json") as gd3d.framework.texture;
                    mat.setShader(shader);
                    mat.setTexture("_MainTex", tex)

                    trailrender.material = mat;
                    this.trailrender=trailrender;
                    //trailrender.lifetime=0.4;
                    //trailrender.minvertexDistance=0.01;
                    //trailrender.setWidth(1,1);
                }

            }
            state.finish = true;

        }

        trailrender:gd3d.framework.trailRender;
        start(app: gd3d.framework.application) {
            console.log("i am here.");
            this.app = app;
            this.scene = this.app.getScene();
            this.wind = new gd3d.math.vector4()

            //任务排队执行系统
            this.taskmgr.addTaskCall(this.loadShader.bind(this));
            this.taskmgr.addTaskCall(this.loadText.bind(this));
            this.taskmgr.addTaskCall(this.loadRole.bind(this));
            this.taskmgr.addTaskCall(this.loadWeapon.bind(this));
            this.taskmgr.addTaskCall(this.initscene.bind(this));
            var tbn1 = this.addbtn("80px", "0px", "attack_01");
            tbn1.onclick = () => {
                    this.trailrender.play();
                    let name = "attack_01.FBAni.aniclip.bin";
                    this.aniplayer.playCross(name, 0.2);
                    
            }
            var btn = this.addbtn("120px", "0px", "attack_02");
            btn.onclick = () => {
                    this.trailrender.play();
                    let name = "attack_02.FBAni.aniclip.bin";
                    this.aniplayer.playCross(name, 0.2);
                    
            }
            var btn3 = this.addbtn("200px", "0px", "stop");
            btn3.onclick = () => {
                    this.trailrender.stop();
            }

            {
                let btn2 = this.addbtn("160px", "0px", "playAttackAni");
                btn2.onclick = () => {
                    this.trailrender.play();
                    let name = "attack_04.FBAni.aniclip.bin";
                    this.aniplayer.playCross(name, 0.2);
                    
                }
            }
        }
        org: gd3d.framework.transform;
        cube: gd3d.framework.transform;
        camera: gd3d.framework.camera;
        timer: number = 0;
        taskmgr: gd3d.framework.taskMgr = new gd3d.framework.taskMgr();
        grassMat: gd3d.framework.material;
        private wind: gd3d.math.vector4;
        private WaveFrequency: number = 4.0;
        private WaveAmplitude: number = 0.05;

        play: boolean = true;
        update(delta: number) {
            this.taskmgr.move(delta);
            this.timer += delta;
            // if (this.org != undefined && this.play) {
            //     this.timer++;
            //     // var x = Math.sin(this.timer * 0.01);
            //     // var z = Math.cos(this.timer * 0.01);
            //     this.org.localTranslate.x +=0.05;
            //     // this.cube.localTranslate.z = z * 5;

            //     // this.cube.markDirty();
            //     // gd3d.math.quatFromAxisAngle(gd3d.math.pool.vector3_up, this.timer, this.org.localRotate); 
            //     this.org.markDirty();
            // }

        }

        private addbtn(top: string, left: string, text: string): HTMLButtonElement {
            var btn = document.createElement("button");
            btn.style.top = top;
            btn.style.left = left;
            btn.style.position = "absolute";
            btn.textContent = text;
            this.app.container.appendChild(btn);

            return btn;
        }
    }
}