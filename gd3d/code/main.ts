/// <reference path="../lib/gd3d.d.ts" />

interface IState
{
    start(app: gd3d.framework.application);
    update(delta: number);
}
//需加上这个反射标记，引擎才能通过名字找到这个类，并自动创建他
@gd3d.reflect.userCode
class main implements gd3d.framework.IUserCode
{
    app: gd3d.framework.application;
    state: IState;
    onStart(app: gd3d.framework.application)
    {
        console.log("i am here.");
        this.app = app;
        this.addBtn("paowuxian2", () => new dome.paowuxian2()); 
        this.addBtn("paowuxian", () => new dome.paowuxian());
        this.addBtn("mixmesh",()=>new dome.mixMesh());
        this.addBtn("f14effect",()=>new dome.db_test_f14eff());
        this.addBtn("physic2d_dome",()=>new physic2d_dome());
        this.addBtn("test_ui", () => new t.test_ui());
        this.addBtn("test_load", () => new test_load());
        this.addBtn("test_loadScene", () => new test_loadScene()); 
        this.addBtn("test_pick", () => new test_pick());
        this.addBtn("test_anim", () => new test_anim());
        this.addBtn("test_multipleplayer_anim", () => new test_multipleplayer_anim());
        this.addBtn("test_reload(换装)", () => new testReload());
        this.addBtn("test_light1", () => new t.test_light1());
        this.addBtn("test_light_d1", () => new t.light_d1());
        this.addBtn("test_normalmap", () => new t.Test_NormalMap());
        this.addBtn("test_assestmgr", () => new test_assestmgr());
        this.addBtn("test_posteffect(后期效果)", () => new t.test_posteffect());
        this.addBtn("test_streamlight", () => new test_streamlight());
        this.addBtn("test_trailRender", () => new t.test_trailrender());
        this.addBtn("test_rendertexture", () => new t.test_rendertexture());
        this.addBtn("test_sound", () => new t.test_sound());
        this.addBtn("test_cleardepth", () => new t.test_clearDepth0());
        this.addBtn("test_fakepbr", () => new test_fakepbr());
        this.addBtn("test_tank", () => new demo.TankGame());
        this.addBtn("test_long", () => new demo.DragonTest());
        this.addBtn("test_skillsystem", () => new t.test_skillsystem());
        this.addBtn("test_blend", () => new t.test_blend());
        this.addBtn("TestRotate", () => new t.TestRotate());
        this.addBtn("pathasset", () => new t.test_pathAsset());
        this.addBtn("test_Asi_prefab", () => new test_loadAsiprefab());
        this.addBtn("test_tex_uv", () => new test_texuv());
        this.addBtn("test_shadowmap", () => new test_ShadowMap()); 
        this.addBtn("test_liChange", () => new testLiChangeMesh());
        //----------------------------------------------文档案例
        this.addBtn("example_newObject",()=>new test_NewGameObject);
        this.addBtn("example_changeMesh",()=>new test_ChangeMesh());
        this.addBtn("example_changeMaterial",()=>new test_ChangeMaterial());
        this.addBtn("demo_ScreenSplit",()=>new demo_ScreenSplit());  //屏幕拆分
        //----------------------------------------------文档案例
        this.addBtn("test_UI组件", () => new test_UI_Component());
        this.addBtn("test_UI预设体加载", () => new test_uiPerfabLoad());
        this.addBtn("test_PBR 展示", () => new test_pbr());
        this.addBtn("test_PBR 场景", () => new test_pbr_scene());
        this.addBtn("关键帧动画",()=>new test_keyFrameAni());
        this.addBtn("导航网格", () => new test_navMesh());
        this.addBtn("rvo2_驾驶行为", () => new test_Rvo2());
        this.addBtn("导航RVO_防挤Demo", () => new demo_navigaionRVO());
        this.addBtn("Collider碰撞", () => new test_pick_boxcollider());
        this.addBtn("SSSSS", () => new test_sssss());
        this.addBtn("dome_加载播放动画",()=>new dome_loadaniplayer());
        this.addBtn("使用加载资源的Demo列表",()=>new UseAssetByLoadDemoList());
        this.addBtn("tesrtss",()=>new dome.testCJ());
        this.addBtn("trans性能测试",()=>new demo.test_performance());
        this.addBtn("3D物理_基础形状",()=>new test_3DPhysics_baseShape());
        this.addBtn("3D物理_复合组合",()=>new test_3DPhysics_compound());
        this.addBtn("3D物理_动力学",()=>new test_3DPhysics_kinematic());
        this.addBtn("3D物理_铰链关节",()=>new test_3DPhysics_joint_hinge());
        this.addBtn("3D物理_球嵌套关节",()=>new test_3DPhysics_joint_ballandSocket());
        this.addBtn("3D物理_滑竿关节",()=>new test_3DPhysics_joint_slider());
        this.addBtn("3D物理_棱柱滑竿关节",()=>new test_3DPhysics_joint_prismatic());
        this.addBtn("3D物理_距离关节",()=>new test_3DPhysics_joint_distance());
        this.addBtn("3D物理_车轮关节",()=>new test_3DPhysics_joint_wheel());
        this.addBtn("3D物理_铰链马达",()=>new test_3DPhysics_motor_hinge());
        this.addBtn("3D物理_车轮马达",()=>new test_3DPhysics_motor_wheel());
        this.addBtn("3D物理_滑竿马达",()=>new test_3DPhysics_motor_slider());
        this.addBtn("3D物理_冻结_位移旋转",()=>new test_3DPhysics_freeze());
        this.addBtn("3D物理_样例_中心点爆炸",()=>new test_3DPhysics_explode());
        this.addBtn("cannonPhysics3D",()=>new PhysicDemo.physic_01());
        
        //others
        // this.addBtn("testtrailrenderRecorde", () => new t.test_trailrenderrecorde()); //有问题
        // this.addBtn("LoadBase64Tex", () => new dome.LoadTex());
        // this.addBtn("rayTest",()=>new dome.rayTest());
        //this.addBtn("linPai",()=>new dome.font());
        //this.addBtn("newobjFromAni",()=>new dome.newObjFromAni());
        //this.addBtn("test_loadprefab", () => new test_loadprefab());
        // this.addBtn("loadPrefab",()=>new dome.loadPrefab());
        //this.addBtn("test_loadMulBundle", () => new test_loadMulBundle());
        //this.addBtn("test_loadScene",()=>new dome.test_loadScene());
        //this.addBtn("starcam",()=>new dome.db_test_starcam());
        //this.addBtn("trailComponent",()=>new dome.db_test_trail());
        //this.addBtn("loadPrefab",()=>new dome.loadPrefab());
        // this.addBtn("test_01", () => new test_01());//最早是做加载测试。现在已经没价值了
        //this.addBtn("loadscene", () => new dome.test_loadScene());
        //this.addBtn("test_changeshader", () => new t.test_changeshader());
        // this.addBtn("test_metalModel", () => new t.test_metal());
        //this.addBtn("test_lookAt", () => new t.TestRotate());
        //this.addBtn("test_integratedrender", () => new t.test_integratedrender());
        //this.addBtn("effect", () => new test_effect());
        //this.addBtn("test_uimove", () => new test_uimove());
        //this.addBtn("test_effecteditor", () => new test_effecteditor());
        //this.addBtn("test_xinshouMask", () => new t.test_xinshouMask());
        //this.addBtn("example_newScene",() =>new test_NewScene());
        // this.addBtn("example_Sound",()=>new test_Sound());
        //this.addBtn("test_四分屏", () => new test_pick_4p());
        //this.addBtn("test_liloadscene", () => new test_LiLoadScene());
        //this.addBtn("test_RangeScreen" ,()=>new test_RangeScreen());
        // this.addBtn("test_drawMesh",()=>new test_drawMesh());
        // this.addBtn("cj_zs",()=>new dome.testCJ());
        // this.addBtn("test_eff",()=>new dome.db_test_eff());
        //this.addBtn("test_f14",()=>new dome.db_test_f14eff());
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
    onUpdate(delta: number)
    {
        if (this.state != null)
            this.state.update(delta);
    }
    isClosed(): boolean
    {
        return false;
    }
}
