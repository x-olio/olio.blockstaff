class UseAssetByLoadDemoList implements IState{

    app:gd3d.framework.application;

    state:IState;

    start(app:gd3d.framework.application){
        this.app = app;
        this.addBtn("使用加载的perfeb",()=>new UsePrefebDemo());
        this.addBtn("使用加载的perfeb2",()=>new UsePrefebDemo2());
        this.addBtn("使用加载的mesh和材质",()=>new UseMeshAndMatDemo());
        this.addBtn("使用加载的纹理",()=>new UseTextureDemo());
        this.addBtn("使用加载的动作",()=>new UseAniplayClipDemo());
        this.addBtn("使用加载的特效",()=>new UseF14EffectDemo());
        this.addBtn("使用加载的音频",()=>new UseAudioDemo());
        this.addBtn("使用加载的场景",()=>new UseSceneDemo());    
    }

    private x: number = 0;
    private y: number = 100;
    private btns: HTMLButtonElement[] = [];
    private addBtn(text: string, act: () => IState)
    {
        var btn = document.createElement("button");
        this.btns.push(btn);
        btn.textContent = text;
        btn.onclick = () =>
        {
            this.clearBtn();
            this.state = act();
            this.state.start(this.app);
        }
        btn.style.top = this.y + "px";
        btn.style.left = this.x + "px";
        if (this.y + 24 > 550)
        {
            this.y = 100;
            this.x += 200;
        }
        else
        {
            this.y += 24;
        }
        btn.style.position = "absolute";
        this.app.container.appendChild(btn);

    }
    private clearBtn()
    {
        for (var i = 0; i < this.btns.length; i++)
        {
            this.app.container.removeChild(this.btns[i]);
        }
        this.btns.length = 0;
    }

    update(delta){
        if (this.state != null)
            this.state.update(delta);
    }
}