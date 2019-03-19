namespace gd3d.framework
{

    export class f14node
    {
        trans: transform;
        f14Effect: f14EffectSystem;
    }
    @gd3d.reflect.SerializeType
    export class f14eff implements IAsset
    {
        static readonly ClassName:string="f14eff";
        
        defaultAsset: boolean = false;
        private name: constText = null;
        private id: resID = new resID();
        constructor(assetName: string = null)
        {
            if (!assetName)
            {
                assetName = "f14eff_" + this.getGUID();
            }
            this.name = new constText(assetName);
        }
        assetbundle: string = null;
        getName(): string
        {
            if (this.name == undefined)
            {
                return null;
            }
            return this.name.getText();
        }
        getGUID(): number
        {
            return this.id.getID();
        }
        use(): void
        {

        }
        unuse(disposeNow?: boolean): void
        {

        }
        dispose()
        {

        }
        caclByteLength(): number
        {
            return 0;
        }
        data: F14EffectData;
        delayTime: number;
        // trans:transform;
        // f14Effect:f14EffectSystem;
        Parse(jsonStr: string, assetmgr: assetMgr)
        {

            let json = JSON.parse(jsonStr);
            this.data = new F14EffectData();
            return this.data.parsejson(json, assetmgr, this.assetbundle);


            // this.trans=new gd3d.framework.transform();
            // this.f14Effect=this.trans.gameObject.addComponent("f14EffectSystem") as gd3d.framework.f14EffectSystem;
            // this.f14Effect.setData(this.f14data);
        }
        // getCloneF14eff():f14node
        // {
        //     let f14node=new gd3d.framework.f14node();
        //     f14node.trans=new gd3d.framework.transform();
        //     f14node.f14Effect=f14node.trans.gameObject.addComponent("f14EffectSystem") as gd3d.framework.f14EffectSystem;
        //     f14node.f14Effect.setData(this.f14data);
        //     return f14node;
        // }

        /** 获取依赖资源 （mesh 、material） */
        getDependents():IAsset[]{
            if(!this.data || !this.data.layers) return;
            let result = [];
            this.doSearch(this.data.layers,result);
            return result;
        }

        private doSearch(obj:object, arr:any[]){
            if(!obj) return;
            if(obj instanceof material || obj instanceof framework.mesh || obj instanceof texture)
                arr.push(obj);

            if(obj instanceof Array){
                (obj as Array<any>).forEach(element => {
                    if(element && typeof(element) == "object"){
                        this.doSearch(element,arr);
                    }
                });

            }else{
                let keys = Reflect["ownKeys"](obj) as string[];
                for(var i=0;i< keys.length ;i++){
                    if(typeof(obj[keys[i]]) == "object"){
                        this.doSearch(obj[keys[i]],arr);
                    }
                }
            }
        }
    }

}