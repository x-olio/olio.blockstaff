// 性能测试 
namespace demo
{
    export class test_performance implements IState
    {
        app: gd3d.framework.application;
        scene: gd3d.framework.scene;
        assetMgr:gd3d.framework.assetMgr;
        camera: gd3d.framework.camera;
        camTran: gd3d.framework.transform;
        start(app: gd3d.framework.application)
        {
            this.app = app;
            this.scene = app.getScene();
            this.assetMgr = this.app.getAssetMgr();

            // this.camTran = new gd3d.framework.transform();
            // this.camTran.name = "Cam";
            // this.scene.addChild(this.camTran);
            // this.camera = this.camTran.gameObject.addComponent("camera") as gd3d.framework.camera;
            // this.camera.near = 0.001;
            // this.camera.far = 5000;
            // this.camera.backgroundColor = new gd3d.math.color(0.3, 0.3, 0.3);
        }

        cubes : gd3d.framework.transform []= []; 
        count = 500 ;
        all = 0;
        tryadd(){
            let max = 2000; 
            let maxcc = 0;
            let cc = 0;
            let temp :gd3d.framework.transform;
            while( maxcc < max){
                let tran = new gd3d.framework.transform();
                if(!temp){
                    temp = tran;
                    this.scene.addChild(tran);
                }else{
                    temp.addChild(tran);
                    cc++
                    if(cc >= 10){
                        cc= 0;
                        temp = null;
                    }
                } 
                this.cubes.push(tran);
                maxcc ++;
            }
            this.all += max;
        }

        update(delta: number)
        {
            if(this.count * this.count > this.all){
                this.tryadd();
            }else{
                console.error(` 所有 trans 加載完畢  old  `);
            }

            let c =0;
            while(c< 1000){
                this.randome();
                c++;
            }
        }

        randome(){
            let idx = Math.floor(Math.random() * this.cubes.length);
            let cube = this.cubes[idx];
            //local 
            cube.localTranslate.x += Math.random()  * 10;
            cube.localScale.x = cube.localScale.y;
            cube.localRotate.z = cube.localRotate.x;
            let temp = cube.getWorldTranslate();
            temp.y += Math.random()  * 10;
            //world 
            cube.getWorldScale();
            cube.setWorldPosition(temp);
            cube.localEulerAngles.x = Math.random()  * 10;
            cube.localEulerAngles = cube.localEulerAngles;
            cube.getWorldRotate();
            cube.markDirty();
            
        }

    }

}