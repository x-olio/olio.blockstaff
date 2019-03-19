declare let dat;  
declare let Promise;
/**
 * datGui 工具类
 * 
 * dat使用教程 @see http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
 */
class datGui {

    private static _inited = false;
    static async init(){
       await this.loadJs();
       this._inited = true;
    } 

    //加载 js
    private static loadJs(){
        let datUrl = `./lib/dat.gui.js`;
        let p = new gd3d.threading.gdPromise<any>((resolve,reason)=>{
            gd3d.io.loadText(datUrl,(txt)=>{
                let isok = eval(txt);
                setTimeout(() => {
                    resolve();
                    console.warn(dat);
                }, 0);
            });
        });
        return p;
    }

}