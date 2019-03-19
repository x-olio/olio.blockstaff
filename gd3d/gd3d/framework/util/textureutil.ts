namespace gd3d.framework
{
    export class textureutil
    {
        static loadUtil(path: string)
        {
            //插入textureutil的js代码
            let sc1 = document.createElement("script") as HTMLScriptElement;
            let sc2 = document.createElement("script") as HTMLScriptElement;
            sc1.src = path + "lib/webgl-util.js";
            sc2.src = path + ""
            document.body.appendChild(sc1);
            document.body.appendChild(sc2);
        }
    }
}