namespace gd3d.framework
{
    export class F14EffectData
    {
        beloop: boolean = false;
        lifeTime: number = 100;
        layers: F14LayerData[] = [];

        parsejson(json: any, assetmgr: assetMgr, assetbundle: string)
        {
             
            // return new threading.gdPromise((resolve) =>
            // {

                this.beloop = json.beloop;

                this.lifeTime = json.lifeTime;

                let jsonlayer = json.layers;

                
                // let total = 0;
                for (let i = 0, len = jsonlayer.length; i < len; ++i)
                {
                    let layer = new F14LayerData();                    
                    layer.parse(jsonlayer[i], assetmgr, assetbundle);
                    // .then(() =>
                    // {
                    //     if (++total >= len)
                    //         resolve();
                    // });
                    this.layers.push(layer);
                }


            // });
        }
    }

    export class F14LayerData
    {
        Name: string = "newLayer";
        type: F14TypeEnum = F14TypeEnum.SingleMeshType;
        elementdata: F14ElementData;
        // F14SingleMeshBaseData singlemeshdata;
        // F14EmissionBaseData emissiondata;
        // F14RefBaseData RefData;

        //frames:F14FrameData[]=[];
        frames: { [frame: number]: F14FrameData } = {};

        constructor()
        {
        }

        parse(json: any, assetmgr: assetMgr, assetbundle: string)
        {
            // return new threading.gdPromise((resolve) =>
            // {

                this.Name = json.Name;
                switch (json.type)
                {
                    case "particlesType":
                        this.type = F14TypeEnum.particlesType;
                        this.elementdata = new F14EmissionBaseData();
                        this.elementdata.parse(json.emissiondata, assetmgr, assetbundle);
                        break;
                    case "SingleMeshType":
                        this.type = F14TypeEnum.SingleMeshType;
                        this.elementdata = new F14SingleMeshBaseData(json.frames[0].frameindex);
                        this.elementdata.parse(json.singlemeshdata, assetmgr, assetbundle);
                        break;
                    case "RefType":
                        this.type = F14TypeEnum.RefType;
                        this.elementdata = new F14RefBaseData();
                        this.elementdata.parse(json.RefData, assetmgr, assetbundle);
                        break;
                    default:
                        console.log("f14Eff parse layerjson error!");
                        return;
                }
                for (let i = 0; i < json.frames.length; i++)
                {
                    let framejson = json.frames[i];
                    let frameindex = framejson.frameindex;
                    let frameitem = new F14FrameData(frameindex, this.type);
                    this.frames[frameindex] = frameitem;
                    switch (this.type)
                    {
                        case F14TypeEnum.SingleMeshType:
                            for (let k = 0; k < framejson.vec3Atts.length; k++)
                            {
                                let name = framejson.vec3Atts[k].name;
                                let strValue = framejson.vec3Atts[k].value;
                                let v3 = new math.vector3();
                                gd3d.math.vec3FormJson(strValue, v3);
                                frameitem.singlemeshAttDic[name] = v3;
                            }
                            for (let k = 0; k < framejson.vec4Atts.length; k++)
                            {
                                let name = framejson.vec4Atts[k].name;
                                let strValue = framejson.vec4Atts[k].value;
                                let v4 = new math.vector4();
                                gd3d.math.vec4FormJson(strValue, v4);
                                frameitem.singlemeshAttDic[name] = v4;
                            }
                            for (let k = 0; k < framejson.colorAtts.length; k++)
                            {
                                let name = framejson.colorAtts[k].name;
                                let strValue = framejson.colorAtts[k].value;
                                let color = new math.color();
                                gd3d.math.colorFormJson(strValue, color);
                                frameitem.singlemeshAttDic[name] = color;
                            }
                            break;
                        case F14TypeEnum.particlesType:
                            let data = new F14EmissionBaseData();
                            data.parse(framejson.emissionData, assetmgr, assetbundle);
                            frameitem.EmissionData = data;
                    }
                }
            //     resolve();
            // });
        }
    }

    export class F14FrameData
    {
        public frameindex: number;

        // public List<F14Vector3Data> vec3Atts:
        // public List<F14Vector4Data> vec4Atts;
        // public List<F14ColorData> colorAtts;

        singlemeshAttDic: { [name: string]: any };
        EmissionData: F14EmissionBaseData;

        constructor(index: number, type: F14TypeEnum)
        {
            this.frameindex = index;
            if (type == F14TypeEnum.SingleMeshType)
            {
                this.singlemeshAttDic = {};
            } else
            {
                this.EmissionData = new F14EmissionBaseData();
            }
        }
    }
}