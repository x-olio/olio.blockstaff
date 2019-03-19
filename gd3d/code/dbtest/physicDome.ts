namespace PhysicDemo{
    export class physic_01 implements IState {
        scene:gd3d.framework.scene;
        camera:gd3d.framework.camera;

        start(app: gd3d.framework.application)
        {
            this.scene=app.getScene();


            let trans=new gd3d.framework.transform();
            trans.localScale.x=10;
            trans.localScale.z=10;
            
            this.scene.addChild(trans);
            let mf=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
            let mr=trans.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
            mf.mesh=app.getAssetMgr().getDefaultMesh("cube");

            let trans2=new gd3d.framework.transform();
            trans2.localPosition.y=5;
            this.scene.addChild(trans2);
            let mf2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHFILTER) as gd3d.framework.meshFilter;
            let mr2=trans2.gameObject.addComponent(gd3d.framework.StringUtil.COMPONENT_MESHRENDER) as gd3d.framework.meshRenderer;
            mf2.mesh=app.getAssetMgr().getDefaultMesh("cube");

            this.scene.enablePhysics(new gd3d.math.vector3(0,-9.8,0));

            let groundImpostor= new gd3d.framework.PhysicsImpostor(trans, gd3d.framework.ImpostorType.BoxImpostor, { mass: 0, restitution: 0.9});
            let boxImpostor = new gd3d.framework.PhysicsImpostor(trans2, gd3d.framework.ImpostorType.BoxImpostor, { mass: 1, restitution: 0.9 });
        

            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 2000;
            this.camera.fov = Math.PI * 0.3;
            this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3, 1);
            objCam.localTranslate = new gd3d.math.vector3(0,15,-15);   
            objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
            objCam.markDirty();//标记为需要刷新
            // let controller=new CameraController();
            CameraController.instance().init(app,this.camera);

        }        
        
        update(delta: number) 
        {
            CameraController.instance().update(delta);
        }
    }
}