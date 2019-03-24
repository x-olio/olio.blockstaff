namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 资源包
     * @version egret-gd3d 1.0
     */
    export class assetBundle
    {
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 包名
         * @version egret-gd3d 1.0
         */
        public name: string;
        private id: number;
        /**
         * @public
         * @language zh_CN
         * 资源管理器实例
         * @version egret-gd3d 1.0
         */
        assetmgr: assetMgr;
        private files: { name: string, length: number, packes: number }[] = [];
        private packages: string[] = [];

        private bundlePackBin: { [name: string]: ArrayBuffer } = {};
        private bundlePackJson: JSON;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 包完整路径
         * @version egret-gd3d 1.0
         */
        url: string;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 不带包名路径
         * @version egret-gd3d 1.0
         */
        path: string;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 资源的总字节数
         * @version egret-gd3d 1.0
         */
        totalLength: number = 0;

        loadLightMap: boolean = true;

        constructor(url: string)
        {
            this.url = url;
            let i = url.lastIndexOf("/");
            this.path = url.substring(0, i);

            this.assetmgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            if (this.assetmgr.waitlightmapScene[url])
            {
                this.loadLightMap = false;
            }
        }
        loadCompressBundle(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetmgr: assetMgr)
        {
            state.totalByteLength = this.totalLength;
            // console.log(`ab loadCompressBundle ${url}`);
            gd3d.io.loadText(url, (txt, err,isloadFail) =>
            {
                if (err != null)
                {
                    state.isloadFail = isloadFail ? true : false;
                    state.iserror = true;
                    state.errs.push(new Error(err.message));
                    onstate(state);
                    return;
                }
                // console.log(`ab loadCompressBundlew 下载完成 ${url}`);

                let json = JSON.parse(txt);
                this.bundlePackJson = json;
                this.parse(json["bundleinfo"], this.totalLength);
                this.load(assetmgr, onstate, state);

                assetmgr.mapBundle[this.name] = this;
            },
                (loadedLength, totalLength) =>
                {
                    state.compressTextLoaded = loadedLength;
                    onstate(state);
                });
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 解析包
         * @param json 
         * @version egret-gd3d 1.0
         */
        parse(json: any, totalLength: number = 0)
        {
            let files = json["files"];
            for (let i = 0; i < files.length; i++)
            {
                let item = files[i];
                let packes = -1;
                if (item.packes != undefined)
                    packes = item.packes;
                if (!this.loadLightMap && (item.name as string).indexOf("LightmapFar-") >= 0)
                {
                    this.assetmgr.waitlightmapScene[this.url].push(this.path + "/" + item.name);
                    continue;
                }
                this.files.push({ name: item.name, length: item.length, packes: packes });
            }
            if (json["packes"] != undefined)
            {
                let packes = json["packes"];
                for (let i = 0; i < packes.length; i++)
                {
                    this.packages.push(packes[i]);
                }
            } else
            {
                if (json["totalLength"] != undefined)
                {
                    if (totalLength == 0)
                    {
                        this.totalLength = json["totalLength"];
                    }
                }
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 卸载包 包内对应的资源引用计数减一
         * @version egret-gd3d 1.0
         */
        unload()
        {
            for (let key in this.mapNamed)
            {
                let asset = this.assetmgr.getAssetByName(key, this.name);
                if (asset)
                {
                    this.assetmgr.unuse(asset);
                }
            }
            this.assetmgr.removeAssetBundle(this.name);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 加载包
         * @param assetmgr 资源管理器实例
         * @param stateinfo 加载的状态信息实例
         * @version egret-gd3d 1.0
         */
        load(assetmgr: assetMgr, onstate: (state: stateLoad) => void, state: stateLoad)
        {
            state.totalByteLength = this.totalLength;

            let total = this.files.length;
            this.assetmgr = assetmgr;

            let glvshaders: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let glfshaders: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let shaders: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let meshs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let textures: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let texturedescs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let materials: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let anclips: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let prefabs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let scenes: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let textassets: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let pvrs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let packs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let f14effs: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let fonts: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let atlass: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let ddss: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];
            let kfaniclips: { url: string, type: AssetTypeEnum, asset: IAsset }[] = [];


            let asslist: any[] = [];

            //这里定义了加载顺序
            asslist.push(packs, glvshaders, glfshaders, shaders, textassets, meshs,
                textures, pvrs, ddss, texturedescs, fonts, atlass,
                materials, anclips, kfaniclips, f14effs, prefabs, scenes);

            let mapPackes: { [id: string]: number } = {};


            //合并的包要先加载

            for (let pack of this.packages)
            {
                let type: AssetTypeEnum = assetmgr.calcType(pack);
                let url = this.path + "/" + pack;
                packs.push({ url: url, type: type, asset: null });
            }

            for (let fitem of this.files)
            {

                let type: AssetTypeEnum = assetmgr.calcType(fitem.name);
                let url = this.path + "/" + fitem.name;
                let fileName = assetmgr.getFileName(url);
                if (fitem.packes != -1)
                {
                    //压缩在包里的
                    mapPackes[url] = fitem.packes;
                }

                {
                    let asset = null;
                    switch (type)
                    {
                        case AssetTypeEnum.GLFragmentShader:
                            glfshaders.push({ url, type, asset: null });
                            break;
                        case AssetTypeEnum.GLVertexShader:
                            glvshaders.push({ url, type, asset: null });
                            break;
                        case AssetTypeEnum.Shader:
                            asset = new shader(fileName);
                            shaders.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Texture:
                            asset = new texture(fileName);
                            textures.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.TextureDesc:
                            asset = new texture(fileName);
                            texturedescs.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Mesh:
                            asset = new mesh(fileName);
                            meshs.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Material:
                            asset = new material(fileName);
                            materials.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Aniclip:
                            asset = new animationClip(fileName);
                            anclips.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Prefab:
                            asset = new prefab(fileName);
                            prefabs.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Scene:
                            asset = new rawscene(fileName);
                            scenes.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.TextAsset:
                            asset = new textasset(fileName);
                            textassets.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.PVR:
                            asset = new texture(fileName);
                            pvrs.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.F14Effect:
                            asset = new f14eff(fileName);
                            f14effs.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.DDS:
                            asset = new texture(fileName);
                            ddss.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Font:
                            asset = new font(fileName);
                            fonts.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.Atlas:
                            asset = new atlas(fileName);
                            atlass.push({ url, type, asset: asset });
                            break;
                        case AssetTypeEnum.KeyFrameAniclip:
                            asset = new keyFrameAniClip(fileName);
                            kfaniclips.push({ url, type, asset: asset });
                            break;
                    }
                    if (type != AssetTypeEnum.GLVertexShader && type != AssetTypeEnum.GLFragmentShader && type != AssetTypeEnum.Shader
                        && type != AssetTypeEnum.PackBin && type != AssetTypeEnum.PackTxt && type != AssetTypeEnum.Prefab)
                    {
                        if (!asset)
                            continue;
                        this.mapNamed[fileName] = asset.getGUID();
                        assetmgr.regRes(fileName, asset);
                    }
                }
            }

            let list: { url: string, type: AssetTypeEnum, asset: IAsset, handle: () => void }[] = [];
            let handles = {};

            for (let i = 0, len = asslist.length; i < len; ++i)
            {
                for (let j = 0, clen = asslist[i].length; j < clen; ++j)
                {
                    let item = asslist[i][j];
                    handles[item.url] = list.length;
                    list.push({ url: item.url, type: item.type, asset: item.asset, handle: undefined });
                }
            }


            let packlist = [];
            let haveBin = false;
            let tempMap = {};
            for (let item of list)
            {
                let surl = item.url;
                let type = item.type;
                let asset = item.asset;
                tempMap[surl] = 1;
                if (mapPackes[surl] != undefined)
                {
                    packlist.push({ surl, type, asset });
                    delete tempMap[surl];
                    if (this.mapIsNull(tempMap))
                        this.downloadFinsih(state, list, haveBin, onstate, packlist, mapPackes, assetmgr, handles);
                }
                else
                {
                    if (type == AssetTypeEnum.PackBin)
                    {
                        haveBin = true;
                        gd3d.io.loadArrayBuffer(surl, (_buffer, err,isloadFail) =>
                        {

                            if (err != null)
                            {
                                state.isloadFail = isloadFail ? true : false;
                                state.iserror = true;
                                state.errs.push(new Error(err.message));
                                onstate(state);

                                return;
                            }
                            let read: gd3d.io.binReader = new gd3d.io.binReader(_buffer);
                            let index = read.readInt32();
                            read.position = index;
                            while (read.canread())
                            {
                                let indindex = read.readInt32();
                                if (index == 0) break;

                                let key = read.readStringUtf8FixLength(indindex);
                                let strs: string[] = key.split('|');

                                let start = parseInt(strs[1]);
                                let len = parseInt(strs[2]);

                                let bufs: ArrayBuffer = _buffer.slice(start, start + len);
                                this.bundlePackBin[strs[0]] = bufs;
                            }


                            delete tempMap[surl];
                            if (this.mapIsNull(tempMap))
                                this.downloadFinsih(state, list, haveBin, onstate, packlist, mapPackes, assetmgr, handles);

                        },
                            (loadedLength, totalLength) =>
                            {
                                state.compressBinLoaded = loadedLength;
                                onstate(state);
                            });
                    }
                    else
                    {

                        assetmgr.loadSingleRes(surl, type, (s) =>
                        {
                            if (s.iserror)
                            {
                                state.iserror = true;
                                onstate(state);
                                return;
                            }

                            if (s.progressCall)
                            {
                                s.progressCall = false;
                                onstate(state);
                                return;
                            }



                        }, state, asset, (data) =>
                            {

                                list[handles[data.url]].handle = data.handle;
                                delete tempMap[data.url];
                                if (this.mapIsNull(tempMap))
                                    this.downloadFinsih(state, list, haveBin, onstate, packlist, mapPackes, assetmgr, handles);
                            });
                    }

                }
            }

        }

        downloadFinsih(state, list, haveBin: boolean, onstate, packlist, mapPackes, assetmgr: assetMgr, handles)
        {
            if (haveBin)
            {
                let respackCall = (fcall: () => void) =>
                {
                    if (packlist.length < 1)
                        fcall();
                    let count = 0;
                    for (let uitem of packlist)
                    {
                        //在pack里
                        let respack;
                        if (mapPackes[uitem.surl] == 0) respack = this.bundlePackJson;
                        else if (mapPackes[uitem.surl] == 1) respack = this.bundlePackBin;
                        else console.log("未识别的packnum: " + mapPackes[uitem.surl]);
                        assetmgr.loadResByPack(respack, uitem.surl, uitem.type, (s) =>
                        {
                            if (s.progressCall)
                            {
                                s.progressCall = false;
                                onstate(state);
                                return;
                            }

                            if (state != undefined)
                                state.bundleLoadState |= uitem.loadstate;

                        }, state, uitem.asset, (data) =>
                            {
                                list[handles[data.url]].handle = data.handle;
                                if (++count >= packlist.length)
                                    fcall();
                            });
                    }
                };
                respackCall(() =>
                {
                    this.NextHandle(list, state, onstate);
                });
            }
            else
                this.NextHandle(list, state, onstate);
        }
        NextHandle(list, state, onstate)
        {
            let waitArrs = [];
            let count = 0;
            let lastHandle = [];
            let finish = () =>
            {
                // console.log(`资源包 :${this.url} 加载完成`);
                state.isfinish = true;
                onstate(state);
            };
            for (let hitem of list)
            {
                if (!hitem.handle)
                    continue;

                if (hitem.type == AssetTypeEnum.Scene || hitem.type == AssetTypeEnum.Prefab || hitem.type == AssetTypeEnum.F14Effect)
                {
                    lastHandle.push(hitem)
                    continue;
                }

                let waiting = hitem.handle();
                if (waiting instanceof threading.gdPromise)
                {
                    waitArrs.push(waiting);
                    waiting.then(() =>
                    {
                        if (++count >= waitArrs.length)
                        {
                            lastHandle.sort((a, b) =>
                            {
                                return b.type - a.type;
                            })
                            while (lastHandle.length > 0)                            
                                lastHandle.shift().handle();                            
                            waitArrs = [];
                            finish();
                        }
                    });

                }
            }
            if (waitArrs.length < 1)
            {
                while (lastHandle.length > 0)
                    lastHandle.shift().handle();
                finish();
            }

        }

        private mapIsNull(map): boolean
        {
            if (!map)
                return true;
            for (let k in map)
                return false;
            return true;
        }
        /**
         * @public
         * @language zh_CN
         * 资源GUID的字典，key为资源的名称
         * @version egret-gd3d 1.0
         */
        mapNamed: { [id: string]: number } = {};
    }
}