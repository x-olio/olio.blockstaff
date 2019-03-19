//加载并使用音频资源
class UseAudioDemo implements IState {

    audioplay: gd3d.framework.AudioPlayer;
    app: gd3d.framework.application;
    scene: gd3d.framework.scene;
    taskMgr = new gd3d.framework.taskMgr;
    objCam: gd3d.framework.transform;
    audiobuf: AudioBuffer;

    //加载音频资源
    private loadAudio(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        //加载音频资源，加载音频资源不是走assetMgr.load接口，而是使用AudioEx.instance().loadAudioBuffer()  AudioEX是一个单例。
        gd3d.framework.AudioEx.instance().loadAudioBuffer("res/audio/music1.mp3", (buffer: AudioBuffer, err: Error) => {
            if (err)
                return;
            this.audiobuf = buffer;
            state.finish = true;
        });
    }

    //给摄像机添加一个音频收听者
    private addCamera(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate) {
        //#region 添加一个相机
        let objCam = new gd3d.framework.transform();
        objCam.name = "camera.";
        objCam.localPosition.z = -10;
        objCam.localPosition.y = 0;
        objCam.localPosition.x = 0;

        let camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
        camera.far = 100;
        this.scene.addChild(objCam);
        objCam.lookatPoint(new gd3d.math.vector3(0, 0, 0));
        //#endregion

        //给摄像机绑定一个AudioListener。当收Listener接近Player时才会接收到声音。该控件只能标记一个transform。
        let audioplayer = objCam.gameObject.addComponent("AudioListener") as gd3d.framework.AudioListener;
        
        this.objCam = objCam;
        objCam.markDirty();
        state.finish = true;

    }

    //添加一个音频AudioPlayer，
    private addAudioPlay(laststate: gd3d.framework.taskstate, state: gd3d.framework.taskstate){
        //#region 创建一个cube作为声音源
        let objAudioPlay = new gd3d.framework.transform();
        objAudioPlay.name = "audio_play";
        let mesh = objAudioPlay.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
        mesh.mesh = this.app.getAssetMgr().getDefaultMesh("cube");
        let render = objAudioPlay.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
        render.materials.push(this.app.getAssetMgr().getDefParticleMat());
        this.scene.addChild(objAudioPlay);
        //#endregion

        //给transform添加AudioPlayer组件，该组件是一个声音源。同一个场景可以存在多个声音源的transform。
        this.audioplay = objAudioPlay.gameObject.addComponent("AudioPlayer") as gd3d.framework.AudioPlayer;
        //播放音频
        this.audioplay.play(this.audiobuf,true,0.5);

        objAudioPlay.markDirty();

        

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

    start(app: gd3d.framework.application) {

        this.app=app;
        this.scene = app.getScene();

        this.taskMgr.addTaskCall(this.loadShader.bind(this));
        this.taskMgr.addTaskCall(this.loadAudio.bind(this));
        this.taskMgr.addTaskCall(this.addCamera.bind(this));
        this.taskMgr.addTaskCall(this.addAudioPlay.bind(this));
        //加入键盘控制，为了更好体现3D音频效果。
        document.addEventListener("keydown",(e)=>{
            if(e.keyCode == 38){
                this.objCam.localPosition.z+=1;
            }

            if(e.keyCode == 40){
                this.objCam.localPosition.z-=1;
            }

            this.objCam.markDirty();

        },false);

    }

    update(delta: number) {
        this.taskMgr.move(delta);
    }

}

