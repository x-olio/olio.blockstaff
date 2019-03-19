namespace gd3d.framework
{
    /**
     * @private
     */
    export class EffectParser
    {
        asMgr: assetMgr;
        /**
         * 解析特效数据
         * 
         * @param {string} str 
         * @param {assetMgr} assetmgr 
         * @returns 
         * 
         * @memberof Effect
         */
        Parse(str: string, assetmgr: assetMgr): EffectSystemData
        {
            if (str == null)
                return null;
            this.asMgr = assetmgr;
            let effectData = new EffectSystemData();
            let content = JSON.parse(str);
            if (content["life"] != undefined)
                effectData.life = <number>content["life"];
            if (content["beloop"] != undefined)
            {
                effectData.beLoop = <boolean>content["beloop"];
            }
            // let list: any[] = [];
            let refOriDic: { [name: string]: any } = {};
            let unRefOriDic: { [name: string]: any } = {};
            let refCount = 0;
            if (content["elements"] != undefined)
            {
                effectData.elementDic = {};
                let elements = <any[]>content["elements"];
                for (let i in elements)
                {
                    let elementData = elements[i];
                    let name: string = "";
                    if (elementData["name"] != undefined)
                    {
                        name = elementData["name"];
                        if (effectData.elementDic[name] != undefined || refOriDic[name] != undefined)
                        {
                            console.error("特效中元素的名字重复：" + name);
                            continue;
                        }
                    } else
                    {
                        console.error("未设置特效中元素的名字！");
                        continue;
                    }

                    if (elementData["ref"] != undefined)
                    {
                        // element.refFrom = elementData["ref"];
                        refOriDic[name] = elementData;
                        refCount++;
                        continue;
                    } else
                    {
                        effectData.elementDic[name] = this._parse(elementData);
                        unRefOriDic[name] = elementData;
                    }
                }

                while (refCount > 0)
                {
                    for (let key in refOriDic)
                    {
                        let desOriData = refOriDic[key];
                        if (desOriData == null)
                            continue;
                        let refFrom = desOriData["ref"];
                        if (unRefOriDic[refFrom] != undefined)
                        {
                            let srcOriData = unRefOriDic[refFrom];
                            this.copyAndOverWrite(srcOriData, desOriData);
                            let element: EffectElementData = this._parse(desOriData);
                            effectData.elementDic[desOriData["name"]] = element;
                            delete refOriDic[key];
                            refCount--;
                        }
                    }
                }
            }
            return effectData;
        }

        /**
         * 解析特效中单个元素数据
         * @param elementData 
         */
        private _parse(elementData: any): EffectElementData
        {
            let element = new EffectElementData();
            if (elementData["beloop"] != undefined)
                element.beloop = elementData["beloop"];
            if (elementData["delaytime"] != undefined)
                element.delayTime = <number>elementData["delaytime"];
            element.name = elementData["name"];
            if (elementData["type"] != undefined)
            {
                switch (elementData["type"])
                {
                    case "singlemesh":
                        element.type = EffectElementTypeEnum.SingleMeshType;
                        break;
                    case "emission":
                        element.type = EffectElementTypeEnum.EmissionType;
                        break;
                }
            }
            switch (element.type)
            {
                case EffectElementTypeEnum.SingleMeshType:
                    this._parseSingleMeshTypeData(elementData, element);
                    break;
                case EffectElementTypeEnum.EmissionType:
                    this._parseEmissionTypeData(elementData, element);
                    break;
            }
            return element;
        }

        /**
         * 处理特效中元素之间的ref，同时保留ref出来的数据同样根据配置被随机出来的功能
         * @param srcData 
         * @param desData 
         */
        private copyAndOverWrite(srcData: any, desData: any)
        {
            for (let key in srcData)
            {
                let data = srcData[key];
                if (data != undefined)
                {
                    let baseType: string = typeof (data);
                    switch (baseType.toLowerCase())
                    {
                        case "number":
                        case "string":
                        case "boolean":
                            //对于基础类型，目标data中没有这个字段才赋值，有的话就用目标data中的数据
                            if (desData[key] == undefined)
                                desData[key] = data;
                            break;
                        default:
                            //对于对象，如果目标中没有这个字段，就直接赋值，有的话，往下继续递归找
                            if (desData[key] == undefined)
                            {
                                desData[key] = srcData[key];
                            } else
                            {
                                this.copyAndOverWrite(srcData[key], desData[key]);
                            }
                            break;
                    }
                }
            }
        }

        /**
         * 解析单mesh类型的特效数据
         */
        _parseSingleMeshTypeData(elementData: any, element: EffectElementData)
        {
            if (elementData["timeline"] != undefined)
            {
                element.timelineFrame = {};
                element.actionData = [];
                let _timelineArray = elementData["timeline"];
                for (let j in _timelineArray)
                {
                    let _timeline = _timelineArray[j];
                    if (_timeline["frame"] == undefined)
                    {
                        console.error("必须要配一个关键帧的索引");
                        continue;
                    }
                    let frame = new EffectFrameData();
                    frame.frameIndex = <number>_timeline["frame"];
                    element.timelineFrame[frame.frameIndex] = frame;
                    frame.attrsData = new EffectAttrsData();
                    if (_timeline["attrs"] != undefined)
                    {
                        let _attrs = _timeline["attrs"];
                        for (let key in _attrs)
                        {
                            let val = this._parseToObjData(key, _attrs[key]);
                            if (key == "mat")
                            {
                                frame.attrsData.mat = val as EffectMatData;
                            }
                            else if (key == "pos")
                            {
                                frame.attrsData.pos = (val as ParticleNode).getValue();
                            }
                            else if (key == "scale")
                            {
                                frame.attrsData.scale = (val as ParticleNode).getValue();
                            }
                            else if (key == "euler")
                            {
                                frame.attrsData.euler = (val as ParticleNode).getValue();
                            }
                            else if (key == "mesh")
                            {
                                frame.attrsData.mesh = val as mesh;
                            }
                            else if (key == "color")
                            {
                                frame.attrsData.color = (val as ParticleNode).getValue();
                            }
                            else if (key == "alpha")
                            {
                                frame.attrsData.alpha = (val as ParticleNodeNumber).getValue();;
                            }
                            else if (key == "tilling")
                            {
                                frame.attrsData.tilling = (val as ParticleNodeVec2).getValue();
                            }
                            else if (key == "billboard")
                            {
                                frame.attrsData.renderModel = val;
                            } else if (key == "colorRate")
                            {
                                frame.attrsData.colorRate = <number>val;
                            }
                        }
                    }
                    if (frame.frameIndex == -1)
                    {
                        element.initFrameData = frame;
                    }
                    if (_timeline["lerp"] != undefined)
                    {
                        frame.lerpDatas = [];
                        for (let x in _timeline["lerp"])
                        {
                            let lerp = new EffectLerpData();
                            lerp.fromFrame = frame.frameIndex;
                            frame.lerpDatas.push(lerp);
                            let _lerp = _timeline["lerp"][x];
                            if (_lerp["type"] != undefined)
                            {
                                switch (_lerp["type"])
                                {
                                    case "linear":
                                        lerp.type = EffectLerpTypeEnum.Linear;
                                        break;
                                }
                            }
                            if (_lerp["to"] != undefined)
                                lerp.toFrame = this._parseToValueData(_lerp["to"]);
                            if (_lerp["attribute"] != undefined)
                            {
                                lerp.attrsData = new EffectAttrsData();
                                let _attribs = _lerp["attribute"];
                                for (let key in _attribs)
                                {
                                    lerp.attrsList.push(key);
                                    let val = this._parseToObjData(key, _attribs[key]);
                                    if (key == "pos")
                                    {
                                        lerp.attrsData.pos = (val as ParticleNode).getValue();
                                    }
                                    else if (key == "scale")
                                    {
                                        lerp.attrsData.scale = (val as ParticleNode).getValue();
                                    }
                                    else if (key == "euler")
                                    {
                                        lerp.attrsData.euler = (val as ParticleNode).getValue();
                                    }
                                    else if (key == "color")
                                    {
                                        lerp.attrsData.color = (val as ParticleNode).getValue();
                                    }
                                    else if (key == "alpha")
                                    {
                                        lerp.attrsData.alpha = val.getValue();
                                    } else
                                    {
                                        console.error("未支持的插值属性：" + key);
                                    }
                                }
                            }

                        }

                    }
                    if (_timeline["actions"] != undefined)
                    {
                        let _actions = <any[]>_timeline["actions"];
                        for (let k in _actions)
                        {
                            let action = new EffectActionData();
                            let _action = _actions[k];

                            action.actionType = _action["action"];
                            action.startFrame = frame.frameIndex;
                            if (_action["end"] != undefined)
                            {
                                action.endFrame = _action["end"];
                            }
                            else
                            {
                                action.endFrame = -1;
                            }
                            if (_action["param"] != undefined)
                            {
                                action.params = _action["param"];//参数action自己解析
                            }
                            element.actionData.push(action);
                        }
                    }
                }
            }
        }

        _parseEmissionTypeData(elementData: any, element: EffectElementData)
        {
            if (elementData["timeline"] != undefined)
            {
                let timelines = <any[]>elementData["timeline"];
                if (timelines.length > 0 && timelines[0] != undefined && timelines[0]["attrs"] != undefined)
                {
                    let _data = timelines[0]["attrs"];
                    let data = new Emission();
                    element.emissionData = data;
                    if (_data["emissionType"] != undefined)
                    {
                        switch (_data["emissionType"])
                        {
                            case "burst":
                                data.emissionType = ParticleEmissionType.burst;
                                break;
                            case "continue":
                                data.emissionType = ParticleEmissionType.continue;
                                break;
                        }
                        // if (_data["beloop"] != undefined)
                        // {
                        //     //data.beLoop = <boolean>_data["beloop"];
                        //     data.paricleLoop=<boolean>_data["beloop"];
                        //     if(data.paricleLoop) 
                        //     {
                        //         data.beLoop=true;
                        //     }
                        // }
                        if (_data["simulateinlocal"] != undefined)
                        {
                            data.simulateInLocalSpace = _data["simulateinlocal"];
                        }

                        if (_data["maxcount"] != undefined)
                            data.maxEmissionCount = <number>_data["maxcount"];
                        if (_data["emissioncount"] != undefined)
                            data.emissionCount = <number>_data["emissioncount"];
                        if (_data["time"] != undefined)
                            data.time = <number>_data["time"];
                        if (_data["mesh"] != undefined)
                            data.mesh = this._parseToObjData("mesh", _data["mesh"]);
                        if (_data["mat"] != undefined)
                            data.mat = this._parseToObjData("mat", _data["mat"]);
                        // if (_data["pos"] != undefined)
                        //     data.pos = this._parseToObjData("pos", _data["pos"]);
                        // if (_data["shape"] != undefined)
                        //     data.shape = _data["shape"];
                        if (_data["rootpos"] != undefined)
                        {
                            data.rootpos = EffectUtil.parseVector3(_data["rootpos"]);
                        }
                        else
                        {
                            data.rootpos = new gd3d.math.vector3();
                        }
                        if (_data["rootRotAngle"] != undefined)
                        {
                            data.rootRotAngle = EffectUtil.parseVector3(_data["rootRotAngle"]);
                        }
                        else
                        {
                            data.rootRotAngle = new gd3d.math.vector3();
                        }
                        if (_data["rootscale"])
                        {
                            data.rootScale = EffectUtil.parseVector3(_data["rootscale"]);
                        }
                        else
                        {
                            data.rootScale = new gd3d.math.vector3(1, 1, 1);
                        }
                        if (_data["moveSpeed"] != undefined)
                            data.moveSpeed = this._parseToObjData("moveSpeed", _data["moveSpeed"]);
                        if (_data["gravity"] != undefined)
                            data.gravity = <number>_data["gravity"];
                        if (_data["euler"] != undefined)
                            data.euler = this._parseToObjData("euler", _data["euler"]);
                        if (_data["eulerSpeed"] != undefined)
                            data.eulerSpeed = this._parseToObjData("eulerSpeed", _data["eulerSpeed"]);
                        if (_data["eulerNodes"] != undefined)
                        {
                            data.eulerNodes = [];
                            if (data.euler != undefined)
                            {
                                data.eulerNodes.push(data.euler);
                                data.euler.key = 0;
                            }
                            for (let i in _data["eulerNodes"])
                            {
                                let node = EffectUtil.parseEffectVec3(_data["eulerNodes"][i]);
                                data.eulerNodes.push(node);
                            }
                        }
                        if (_data["scale"] != undefined)
                            data.scale = this._parseToObjData("scale", _data["scale"]);
                        if (_data["scaleSpeed"] != undefined)
                            data.scaleSpeed = this._parseToObjData("scaleSpeed", _data["scaleSpeed"]);
                        if (_data["scaleNodes"] != undefined)
                        {
                            data.scaleNodes = [];
                            //-----------------------------初始scale为1--------------------------------
                            var startscale = new ParticleNodeNumber();
                            startscale.num.value = 1;
                            startscale.key = 0;
                            data.scaleNodes.push(startscale);
                            for (let i in _data["scaleNodes"])
                            {
                                let node = EffectUtil.parseEffectNumNode(_data["scaleNodes"][i]);
                                data.scaleNodes.push(node);
                            }
                        }
                        if (_data["simulationSpeed"] != undefined)
                        {
                            data.simulationSpeed = this._parseToObjData("simulationSpeed", _data["simulationSpeed"]);
                        }
                        if (_data["alpha"] != undefined)
                        {
                            data.alpha = this._parseToObjData("alpha", _data["alpha"]);
                        }

                        if (_data["alphaSpeed"] != undefined)
                            data.alphaSpeed = this._parseToObjData("alphaSpeed", _data["alphaSpeed"]);
                        if (_data["alphaNodes"] != undefined)
                        {
                            data.alphaNodes = [];
                            if (data.alpha != undefined)
                            {
                                data.alphaNodes.push(data.alpha);
                                data.alpha.key = 0;
                            }
                            for (let i in _data["alphaNodes"])
                            {
                                let node = new ParticleNodeNumber();
                                var item = _data["alphaNodes"][i];
                                if (item["key"] != null)
                                {
                                    node.key = item["key"];
                                }
                                let alphavalue = item["alpha"];
                                if (alphavalue != null)
                                {
                                    if (alphavalue instanceof Array)
                                    {
                                        node.num.valueLimitMin = alphavalue[0];
                                        node.num.valueLimitMax = alphavalue[1];
                                    }
                                    else
                                    {
                                        node.num.value = alphavalue;
                                    }
                                }
                                data.alphaNodes.push(node);
                            }
                        }

                        if (_data["color"] != undefined)
                            data.color = this._parseToObjData("color", _data["color"]);
                        if (_data["colorRate"] != undefined)
                            data.colorRate = <number>_data["colorRate"];
                        if (_data["colorSpeed"] != undefined)
                            data.colorSpeed = this._parseToObjData("colorSpeed", _data["colorSpeed"]);
                        if (_data["colorNodes"] != undefined)
                        {
                            data.colorNodes = [];
                            if (data.color != undefined)
                            {
                                data.colorNodes.push(data.color);
                                data.color.key = 0;
                            }
                            for (let i in _data["colorNodes"])
                            {
                                let node = EffectUtil.parseEffectVec3(_data["colorNodes"][i]);
                                data.colorNodes.push(node);
                            }
                        }
                        if (_data["uv"] != undefined)
                        {
                            data.uv = EffectUtil.parseEffectVec2(_data["uv"]);
                        }
                        if (_data["uvtype"] != undefined)
                        {
                            switch (_data["uvtype"])
                            {
                                case "uvroll":
                                    data.uvType = UVTypeEnum.UVRoll;
                                    if (_data["uvroll"] != undefined)
                                    {
                                        data.uvRoll = new UVRoll();
                                        data.uvRoll.uvSpeed = EffectUtil.parseEffectUVSpeed(_data["uvroll"]);
                                    }
                                    break;
                                case "uvsprite":
                                    let _val = _data["uvsprite"];
                                    data.uvType = UVTypeEnum.UVSprite;
                                    data.uvSprite = new UVSprite();
                                    if (_val["row"] != undefined)
                                        data.uvSprite.row = <number>_val["row"];
                                    if (_val["colum"] != undefined)
                                        data.uvSprite.column = <number>_val["colum"];
                                    if (_val["count"] != undefined)
                                        data.uvSprite.totalCount = <number>_val["count"];
                                    break;
                                default:
                                    data.uvType = UVTypeEnum.NONE;
                                    break;
                            }
                        } else
                            data.uvType = UVTypeEnum.NONE;
                        if (_data["billboard"] != undefined)
                            data.renderModel = this._parseToObjData("billboard", _data["billboard"]);
                        if (_data["life"] != undefined)
                            data.life = EffectUtil.parseEffectValueData(_data["life"]);
                        if (_data["startpos"] != undefined)
                        {
                            this._parseEmissionShape(_data["startpos"], element);
                        }
                    }
                }
            }
        }
        _parseEmissionShape(_startdata: any, element: EffectElementData)
        {
            let startdata = element.emissionData.particleStartData;

            switch (_startdata["type"])
            {
                case "normal":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.NORMAL;
                    break;
                case "box":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.BOX;
                    break;
                case "sphere":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.SPHERE;
                    break;
                case "hemisphere":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.HEMISPHERE;
                    break;
                case "cone":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.CONE;
                    break;
                case "circle":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.CIRCLE;
                    break;
                case "edge":
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.EDGE;
                    break;
                default:
                    startdata.shapeType = gd3d.framework.ParticleSystemShape.NORMAL;
                    break;
            }

            if (_startdata["width"] != undefined)
            {
                startdata.width = _startdata["width"];
            }

            if (_startdata["height"] != undefined)
            {
                startdata.height = _startdata["height"];
            }

            if (_startdata["depth"] != undefined)
            {
                startdata.depth = _startdata["depth"];
            }

            if (_startdata["angle"] != undefined)
            {
                startdata.angle = _startdata["angle"];
            }

            if (_startdata["radius"] != undefined)
            {
                startdata.radius = _startdata["radius"];
            }

            if (_startdata["direction"] != undefined)
            {
                let _startdir = _startdata["direction"];
                startdata.direction.x = _startdir["x"];
                startdata.direction.y = _startdir["y"];
                startdata.direction.z = _startdir["z"];
            }

        }
        /**
         * 解析属性数据
         * 
         * @param {string} attrib 
         * @param {*} content 
         * @returns 
         * 
         * @memberof Effect
         */
        _parseToObjData(attrib: string, content: any)
        {
            switch (attrib)
            {
                case "pos":
                case "scale":
                case "euler":
                case "color":
                case "moveSpeed":
                case "eulerSpeed":
                case "scaleSpeed":
                case "colorSpeed":
                    return EffectUtil.parseEffectVec3(content);
                case "":
                    return EffectUtil.parseEffectVec2(content);
                case "alphaSpeed":
                case "alpha":
                case "simulationSpeed":
                    return EffectUtil.parseEffectNum(content);
                case "tilling":
                    return EffectUtil.parseEffectVec2(content);
                case "mat":
                    let mat = new EffectMatData();
                    if (content != undefined)
                    {
                        if (content["shader"] != undefined)
                            mat.shader = this.asMgr.getShader(content["shader"]);
                        else
                            mat.shader = this.asMgr.getShader("shader/def");
                        if (content["diffuseTexture"] != undefined)
                            mat.diffuseTexture = this.asMgr.getAssetByName(content["diffuseTexture"]) as texture;
                        if (content["alphaCut"] != undefined)
                            mat.alphaCut = <number>content["alphaCut"];
                        if (content["_AlphaTex"] != undefined)
                            mat.alphaTexture = this.asMgr.getAssetByName(content["_AlphaTex"]) as texture;
                    }
                    return mat;
                case "emmision":
                    let emission = new EmissionData();
                    if (content["type"] != undefined)
                        emission.type = content["type"];
                    if (content["time"] != undefined)
                        emission.time = <number>content["time"];
                    if (content["count"] != undefined)
                        emission.count = <number>content["count"];
                    return emission;
                case "billboard":
                    let billboardType: RenderModel = RenderModel.Mesh;
                    if (content == "billboard")
                    {
                        billboardType = RenderModel.BillBoard;
                    }
                    else if (content == "horizontal")
                    {
                        billboardType = RenderModel.HorizontalBillBoard;
                    }
                    else if (content == "stretched")
                    {
                        billboardType = RenderModel.StretchedBillBoard;
                    }
                    else if (content == "vertical")
                    {
                        billboardType = RenderModel.VerticalBillBoard;
                    } else if (content == "mesh")
                    {
                        billboardType = RenderModel.Mesh;
                    } else
                    {
                        billboardType = RenderModel.None;
                    }

                    return billboardType;
                case "mesh":
                    let str: string = content;
                    if (content.toString().indexOf(".mesh.bin") >= 0)
                        return this.asMgr.getAssetByName(content) as mesh;
                    else
                        return this.asMgr.getDefaultMesh(content);
                default:
                    return content;
            }
        }

        /**
         * 字符串解析成ParticleNode
         * 
         * @param {string} content 
         * @returns {ParticleNode} 
         * 
         * @memberof Effect
         */
        _parseToParticleNode(content: string): ParticleNode
        {
            content = StringUtil.replaceAll(content, " ", "");
            let charArray: RegExpMatchArray = content.match(RegexpUtil.vector3FloatOrRangeRegexp);
            if (charArray != undefined)
            {
                let node: ParticleNode = new ParticleNode();
                for (let i = 1; i < charArray.length; i++)
                {
                    if (i == 1)
                    {
                        node.x = this._parseToValueData(charArray[i]);
                    } else if (i == 2)
                    {
                        node.y = this._parseToValueData(charArray[i]);
                    }
                    else if (i == 3)
                    {
                        node.z = this._parseToValueData(charArray[i]);
                    }
                }
                return node;
            }
            return null;
        }

        /**
         * 字符串转ValueData
         * 
         * @param {string} content 
         * @returns {ValueData} 
         * 
         * @memberof Effect
         */
        _parseToValueData(content: string): ValueData
        {
            let data = new ValueData();
            let array: number[] = this._parseToNumberArray(content);
            if (array != null)
            {
                if (array.length > 1)
                {
                    data.valueLimitMin = array[0];
                    data.valueLimitMax = array[1];
                    data.isRandom = true;
                } else
                {
                    data.value = array[0];
                    data.isRandom = false;
                }
            }
            return data;
        }
        /**
         * 字符串转number数组
         * 
         * @param {string} content 
         * @returns {number[]} 
         * 
         * @memberof Effect
         */
        _parseToNumberArray(content: string): number[]
        {
            content = StringUtil.trimAll(content);
            content = StringUtil.replaceAll(content, "\\[", "");
            content = StringUtil.replaceAll(content, "\\]", "");
            let _array = <string[]>content.split(",");
            let result: number[] = [];
            for (let i = 0; i < _array.length; i++)
            {
                result.push(parseInt(_array[i]));
            }
            return result;
        }
    }

}