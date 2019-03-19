
class test_keyFrameAni implements IState
{
    app:gd3d.framework.application;
    scene:gd3d.framework.scene;
    camera:gd3d.framework.camera;
    taskMgr:gd3d.framework.taskMgr=new gd3d.framework.taskMgr();
    obj3d:gd3d.framework.transform;

    start(app:gd3d.framework.application)
    {
        this.app=app;
        this.scene=this.app.getScene();

        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadasset.bind(this));
        this.taskMgr.addTaskCall(this.iniscene.bind(this));
        this.taskMgr.addTaskCall(this.addbtns.bind(this));
    }


    private loadShader(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        this.app.getAssetMgr().load("res/shader/shader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => 
        {
            if (_state.isfinish) 
            {
                state.finish = true;
            }
        }
        );
    }

    private loadasset(laststate:gd3d.framework.taskstate,state:gd3d.framework.taskstate)
    {
        this.app.getAssetMgr().load("res/keyframeAnimation/Cube/Cube.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (_state) => {
            if (_state.isfinish) {
                state.finish = true;
            }
        }
        );
    }

    private iniscene(laststate:gd3d.framework.taskstate,state:gd3d.framework.taskstate)
    {

        //资源
        var cubePrefab=this.app.getAssetMgr().getAssetByName("Cube.prefab.json") as gd3d.framework.prefab;
        let head=cubePrefab.getCloneTrans();
        this.obj3d = head;
        this.scene.addChild(head);

         //添加一个摄像机
         var objCam = new gd3d.framework.transform();
         objCam.name = "sth.";
         this.scene.addChild(objCam);
         this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
         this.camera.near = 0.01;
         this.camera.far = 10000;
         objCam.localTranslate = new gd3d.math.vector3(0, 10, -10);
         objCam.lookat(this.obj3d);
         objCam.markDirty();//标记为需要刷新
         CameraController.instance().init(this.app,this.camera);

        state.finish=true;
    }

    private addbtns()
    {
        this.addbtn("play",10,100,()=>{
            let anip = this.obj3d.gameObject.getComponent("keyFrameAniPlayer") as gd3d.framework.keyFrameAniPlayer;
            anip.play();
        });

        this.addbtn("stop",10,150,()=>{
            let anip = this.obj3d.gameObject.getComponent("keyFrameAniPlayer") as gd3d.framework.keyFrameAniPlayer;
            anip.stop();
        });

        this.addbtn("rewind",10,200,()=>{
            let anip = this.obj3d.gameObject.getComponent("keyFrameAniPlayer") as gd3d.framework.keyFrameAniPlayer;
            anip.rewind();
        });


        // var input=document.createElement("input");
        // input.type="range";
        // input.valueAsNumber=50;
        // this.obj3d.localTranslate.x=input.valueAsNumber-50;
        // input.oninput=(e) =>
        // {
        //     this.obj3d.localTranslate.x=input.valueAsNumber-50;
        //     this.obj3d.markDirty();
        //     console.log(input.valueAsNumber);
        // };
        // input.style.top="400px";
        // input.style.left="10px";
        // input.style.position="absolute";
        // this.app.container.appendChild(input);
    }

    private addbtn(text:string,x:number,y:number,func:()=>void)
    {
        var btn=document.createElement("button");
        btn.textContent=text;
        btn.onclick=()=>
        {
            func();
        }
        btn.style.top=y+"px";
        btn.style.left=x+"px";
        btn.style.position="absolute";
        this.app.container.appendChild(btn);
    }    


    update(delta:number)
    {
        CameraController.instance().update(delta);
        this.taskMgr.move(delta);
          
    }    
}