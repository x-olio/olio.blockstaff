namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 资源类型
     * @version egret-gd3d 1.0
     */
    export enum AssetTypeEnum
    {
        /**
         * @public
         * @language zh_CN
         * 未知
         * @version egret-gd3d 1.0
         */
        Unknown,
        /**
         * @public
         * @language zh_CN
         * 根据后缀 动态识别
         * @version egret-gd3d 1.0
         */
        Auto,
        /**
         * @public
         * @language zh_CN
         * 资源包
         * @version egret-gd3d 1.0
         */
        Bundle,
        /**
         * @public
         * @language zh_CN
         * 压缩的资源包
         * @version egret-gd3d 1.0
         */
        CompressBundle,
        /**
         * @public
         * @language zh_CN
         * glsl vs
         * @version egret-gd3d 1.0
         */
        GLVertexShader,
        /**
         * @public
         * @language zh_CN
         * glsl fs
         * @version egret-gd3d 1.0
         */
        GLFragmentShader,
        /**
         * @public
         * @language zh_CN
         * shader
         * @version egret-gd3d 1.0
         */
        Shader,
        /**
         * @public
         * @language zh_CN
         * 贴图
         * @version egret-gd3d 1.0
         */
        Texture,
        /**
         * @public
         * @language zh_CN
         * 贴图desc
         * @version egret-gd3d 1.0
         */
        TextureDesc,
        /**
         * @public
         * @language zh_CN
         * 模型
         * @version egret-gd3d 1.0
         */
        Mesh,
        /**
         * @public
         * @language zh_CN
         * 预设
         * @version egret-gd3d 1.0
         */
        Prefab,
        /**
         * @public
         * @language zh_CN
         * 材质
         * @version egret-gd3d 1.0
         */
        Material,
        /**
         * @public
         * @language zh_CN
         * 动画片段
         * @version egret-gd3d 1.0
         */
        Aniclip,
        /**
         * @public
         * @language zh_CN
         * 关键帧动画片段
         * @version egret-gd3d 1.0
         */
        KeyFrameAniclip,
        /**
         * @public
         * @language zh_CN
         * 场景
         * @version egret-gd3d 1.0
         */
        Scene,
        /**
         * @public
         * @language zh_CN
         * 图集
         * @version egret-gd3d 1.0
         */
        Atlas,
        /**
         * @public
         * @language zh_CN
         * 字体
         * @version egret-gd3d 1.0
         */
        Font,
        /**
         * @public
         * @language zh_CN
         * 文本
         * @version egret-gd3d 1.0
         */
        TextAsset,
        /**
         * @private
         */
        PackBin,
        /**
         * @private
         */
        PackTxt,
        /**
         * @public
         * @language zh_CN
         * 可编辑路径
         * @version egret-gd3d 1.0
         */
        PathAsset,
        /**
         * @public
         * @language zh_CN
         * pvr贴图
         * @version egret-gd3d 1.0
         */
        PVR,

        F14Effect,

        /**
         * @public
         * @language zh_CN
         * dds贴图
         * @version egret-gd3d 1.0
         */
        DDS
    }
    
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 资源加载状态
     * @version egret-gd3d 1.0
     */
    export class ResourceState
    {
        res: IAsset = null;
        state: number = 0;
        loadedLength: number = 0;
        // totalLength: number = 0;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 带引用的资源加载状态
     * @version egret-gd3d 1.0
     */
    export class RefResourceState extends ResourceState
    {
        refLoadedLength: number = 0;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载状态
     * @version egret-gd3d 1.0
     */
    export class stateLoad
    {
        /**
         * @public
         * @language zh_CN
         * 加载是否失败
         * @version egret-gd3d 1.0
         */
        isloadFail: boolean = false;

        /**
         * @public
         * @language zh_CN
         * 加载是否遇到错误
         * @version egret-gd3d 1.0
         */
        iserror: boolean = false;
        /**
         * @public
         * @language zh_CN
         * 加载是否完成
         * @version egret-gd3d 1.0
         */
        isfinish: boolean = false;

        /**
         * @public
         * @language zh_CN
         * 记录需要加载的每一个的状态和资源引用
         * @version egret-gd3d 1.0
         */
        resstate: { [id: string]: ResourceState } = {};

        /**
         * @public
         * @language zh_CN
         * 记录加载的第一个的状态和资源引用
         * @version egret-gd3d 1.0
         */
        resstateFirst: ResourceState = null;
        /**
         * @public
         * @language zh_CN
         * 当前的文件数进度
         * @version egret-gd3d 1.0
         */
        curtask: number = 0;
        /**
         * @public
         * @language zh_CN
         * 文件数的总进度
         * @version egret-gd3d 1.0
         */
        totaltask: number = 0;

        /**
         * @public
         * @language zh_CN
         * 获取文件数加载进度
         * @version egret-gd3d 1.0
         */
        get fileProgress(): number
        {
            return this.curtask / this.totaltask;
        }

        /**
         * @public
         * @language zh_CN
         * 已加载的字节长度
         * @version egret-gd3d 1.0
         */
        get curByteLength(): number
        {
            let result = 0;
            for (let key in this.resstate)
            {
                let _resState = this.resstate[key];
                result += _resState.loadedLength;
                if (_resState instanceof RefResourceState)
                {
                    result += _resState.refLoadedLength;
                }
            }
            result += this.compressTextLoaded + this.compressBinLoaded;
            return result;
        }

        /**
         * @public
         * @language zh_CN
         * 总字节长度
         * @version egret-gd3d 1.0
         */
        totalByteLength: number = 0;

        /**
         * @public
         * @language zh_CN
         * 获取文件真实加载进度
         * @version egret-gd3d 1.0
         */
        get progress(): number
        {
            return this.curByteLength / this.totalByteLength;
        }

        progressCall: boolean = false;

        compressTextLoaded: number = 0;

        compressBinLoaded: number = 0;

        /**
         * @public
         * @language zh_CN
         * 加载过程中记录的log
         * @version egret-gd3d 1.0
         */
        logs: string[] = [];
        /**
         * @public
         * @language zh_CN
         * 加载过程中记录的错误信息
         * @version egret-gd3d 1.0
         */
        errs: Error[] = [];
        /**
         * @public
         * @language zh_CN
         * 源url地址
         * @version egret-gd3d 1.0
         */
        url: string;
    }



    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 通用的资源管理器，你也可以自己搞个东西当资源，继承IResource即可<p/>
     * 资源管理器用引用计数法管理资源，计数混乱会导致问题，循环引用也会导致问题，需要注意<p/>
     * js 语法层面不能提供可靠的自动引用计数机制，所以如果你用乱了，哪啊就是乱了<p/>
     * 所有的资源都是从资源管理器get出来的<p/>
     * 所有的资源不用的时候都要还到资源管理器<p/>
     * @version egret-gd3d 1.0
     */
    export class assetMgr
    {
        /**
         * @private
         */
        app: application;
        /**
         * @private
         */
        webgl: WebGLRenderingContext;
        /**
         * @private
         */
        shaderPool: gd3d.render.shaderPool;
        /**
         * @private
         */
        constructor(app: application)
        {
            this.app = app;
            this.webgl = app.webgl;
            this.shaderPool = new gd3d.render.shaderPool();
            this.initAssetFactorys();
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 初始化默认资源
         * @version egret-gd3d 1.0
         */
        initDefAsset()
        {
            defMesh.initDefaultMesh(this);
            defTexture.initDefaultTexture(this);
            defsprite.initDefaultSprite(this);
            defShader.initDefaultShader(this);
            defmaterial.initDefaultMaterial(this);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * shader字典
         * @version egret-gd3d 1.0
         */
        mapShader: { [id: string]: shader } = {};
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取shader资源
         * @param name 
         * @version egret-gd3d 1.0
         */
        getShader(name: string): shader
        {
            return this.mapShader[name];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认Mesh资源
         * @version egret-gd3d 1.0
         */
        mapDefaultMesh: { [id: string]: mesh } = {};
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取默认mesh资源
         * @param name
         * @version egret-gd3d 1.0
         */
        getDefaultMesh(name: string): mesh
        {
            return this.mapDefaultMesh[name];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认图片资源
         * @version egret-gd3d 1.0
         */
        mapDefaultTexture: { [id: string]: texture } = {};

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取默认贴图资源
         * @param name
         * @version egret-gd3d 1.0
         */
        getDefaultTexture(name: string): texture
        {
            return this.mapDefaultTexture[name];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认cube贴图资源
         * @version egret-gd3d 1.0
         */
        mapDefaultCubeTexture: { [id: string]: texture } = {};

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取默认cube贴图资源
         * @param name
         * @version egret-gd3d 1.0
         */
        getDefaultCubeTexture(name: string): texture
        {
            return this.mapDefaultCubeTexture[name];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认sprite资源
         * @version egret-gd3d 1.0
         */
        mapDefaultSprite: { [id: string]: sprite } = {};

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取默认sprite资源
         * @param name
         * @version egret-gd3d 1.0
         */
        getDefaultSprite(name: string): sprite
        {
            return this.mapDefaultSprite[name];
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 默认材质资源
         * @version egret-gd3d 1.0
         */
        mapMaterial: { [id: string]: material } = {};
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过name获取材质资源
         * @param name
         * @version egret-gd3d 1.0
         */
        getMaterial(name: string): material
        {
            return this.mapMaterial[name];
        }


        /**
         * @public
         * @language zh_CN
         * @classdesc
         * assetbundle的字典，key为bundlename
         * @version egret-gd3d 1.0
         */
        mapBundle: { [id: string]: assetBundle } = {};

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 资源的字典，key为资源的GUID
         * @version egret-gd3d 1.0
         */
        mapRes: { [id: number]: assetRef } = {};
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 资源GUID的字典，key为资源的名称
         * @version egret-gd3d 1.0
         */
        mapNamed: { [id: string]: number[] } = {};
        /**
        * @public
        * @language zh_CN
        * @version egret-gd3d 1.0
         * @classdesc
        * 通过资源的GUID获取资源
        * @param id 资源的GUID
        */
        getAsset(id: number): IAsset
        {
            var r = this.mapRes[id];
            if (r == null) return null;
            return r.asset;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过资源的名称获取资源
         * @version egret-gd3d 1.0
         * @param name 资源的名称
         */
        getAssetByName(name: string, bundlename: string = null): IAsset
        {
            let id = null;
            if (this.mapNamed[name] != null)
            {
                //id = this.mapNamed[name][0];
                id = this.mapNamed[name][this.mapNamed[name].length - 1];
            }
            if (bundlename != null)
            {
                let assetbundle = this.mapBundle[bundlename] as assetBundle;
                if (assetbundle != null)
                    id = assetbundle.mapNamed[name] || id;
            }

            let flag: boolean = true;
            if (id != null)
            {
                var r = this.mapRes[id];
                if (r != null && !r[this._loadingTag] )//)
                    return r.asset;
            }
            if (flag)
            {
                if (this.mapDefaultMesh[name] != undefined)
                    return this.mapDefaultMesh[name];
                if (this.mapDefaultTexture[name] != undefined)
                    return this.mapDefaultTexture[name];
                if (this.mapShader[name] != undefined)
                    return this.mapShader[name];
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过assetbundle的名称获取包
         * @param bundlename 包的名称
         * @version egret-gd3d 1.0
         */
        getAssetBundle(bundlename: string): assetBundle
        {
            if (this.mapBundle[bundlename])
                return this.mapBundle[bundlename];
            return null;
        }

        static useBinJs: boolean = false;
        private static bin = ".bin";
        static correctFileName(name: string): string
        {
            if (name.indexOf(this.bin) < 0)
            {
                return name;
            }
            let binlen = this.bin.length;
            let substr = name.substring(name.length - binlen);
            if (substr == this.bin)
            {
                return name + ".js";
            }
            return name;
        }
        static txt = ".txt";
        static correctTxtFileName(name: string): string
        {
            if (name.indexOf(this.txt) < 0)
            {
                return name;
            }
            let len = this.txt.length;
            let substr = name.substring(name.length - len);
            if (substr == this.txt)
            {
                return name + ".js";
            }
            return name;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 取消资源的引用，当前资源的引用计数减一
         * @param res 需要取消引用的资源
         * @param disposeNow 如果引用计数归零则立即释放
         * @version egret-gd3d 1.0
         */
        unuse(res: IAsset, disposeNow: boolean = false)
        {
            var id = res.getGUID();
            var name = res.getName();
            if (res.defaultAsset)//静态资源不参与引用计数管理
            {
                return;
            }
            if (!this.mapRes[id]) return;

            this.mapRes[id].refcount--;
            if (disposeNow && this.mapRes[id].refcount <= 0)
            {
                this.mapRes[id].asset.dispose();
                if (name != null)
                {
                    if (this.mapNamed[name].length <= 1)
                    {
                        delete this.mapNamed[name];
                    }
                    else
                    {
                        for (let key in this.mapNamed[name])
                        {
                            if (id == this.mapNamed[name][key])
                            {
                                this.mapNamed[name].splice(parseInt(key), 1);
                            }
                        }
                    }
                }
                delete this.mapRes[id];
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 引用资源，当前资源的引用计数加一
         * @param res 需要引用的资源
         * @version egret-gd3d 1.0
         */
        use(res: IAsset)
        {
            var id = res.getGUID();
            var name = res.getName();
            if (id <= 0)//如果没有id，分配一个
            {
                throw new Error("不合法的res guid:" + name);
            }
            if (res.defaultAsset)//静态资源不参与引用计数管理
            {
                return;
            }
            if (this.mapRes[id] == null)
            {
                this.mapRes[id] = { asset: res, refcount: 0 };
                if (name != null)
                {
                    if (this.mapNamed[name] == null)
                        this.mapNamed[name] = [];
                    this.mapNamed[name].push(id);
                }
            }
            this.mapRes[id].refcount++;
            if (this.mapRes[id][this._loadingTag])
            {
                delete this.mapRes[id][this._loadingTag];
            }
        }
        private readonly _loadingTag = "_AssetLoingTag_";

        regRes(name: string, asset: IAsset)
        {
            let id = asset.getGUID();
            if (this.mapRes[id] == null)
            {
                this.mapRes[id] = { asset: asset, refcount: 0 };
                this.mapRes[id][this._loadingTag] = true; //没加载完之前 标记一下防止被清理
                if (name != null)
                {
                    if (this.mapNamed[name] == null)
                        this.mapNamed[name] = [];
                    this.mapNamed[name].push(id);
                }
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 释放所有引用为零的资源
         * @version egret-gd3d 1.0
         */
        releaseUnuseAsset()
        {
            for (let k in this.mapRes)
            {
                if (this.mapRes[k].refcount <= 0)
                {
                    if (this.mapRes[k][this._loadingTag]) continue;

                    let name = this.mapRes[k].asset.getName();
                    if (this.mapNamed[name].length <= 1)
                    {
                        delete this.mapNamed[name];
                    }
                    else
                    {
                        for (let key in this.mapNamed[name])
                        {
                            if (this.mapRes[k].asset.getGUID() == this.mapNamed[name][key])
                            {
                                this.mapNamed[name].splice(parseInt(key), 1);
                            }
                        }
                    }
                    this.mapRes[k].asset.dispose();
                    delete this.mapRes[k];
                }
            }
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 返回所有资源引用计数
         * @version egret-gd3d 1.0
         */
        getAssetsRefcount(): { [id: string]: number }
        {
            let mapRefcout: { [id: string]: number } = {};
            for (var k in this.mapNamed)
            {
                if (this.mapNamed[k].length == 1)
                {
                    let res = this.mapRes[this.mapNamed[k][0]];
                    mapRefcout[k] = res.refcount;
                }
                else
                {
                    for (let key in this.mapNamed[k])
                    {
                        let res = this.mapRes[this.mapNamed[k][key]];
                        mapRefcout[k + "(" + key + ")"] = res.refcount;
                    }
                }

            }
            return mapRefcout;
        }

        private mapInLoad: { [id: string]: stateLoad } = {};
        removeAssetBundle(name: string)
        {
            if (this.mapBundle[name] != null)
                delete this.mapBundle[name];
            if (this.mapInLoad[name] != null)
                delete this.mapInLoad[name];
        }

        private assetUrlDic: { [id: number]: string } = {};

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 设置资源的url
         * @version egret-gd3d 1.0
         * @param asset 资源
         * @param url url
         */
        setAssetUrl(asset: IAsset, url: string)
        {
            this.assetUrlDic[asset.getGUID()] = url;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取资源的url
         * @version egret-gd3d 1.0
         * @param asset 资源
         */
        getAssetUrl(asset: IAsset): string
        {
            return this.assetUrlDic[asset.getGUID()];
        }


        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 加载单个资源
         * 所有load进来的资源，均use一遍，引用计数为1
         * 再unload 一次 归0，则可dispose（）
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param type 资源的类型
         * @param onstate 状态返回的回调
         * @param state 资源加载的总状态
         */
        loadSingleRes(url: string, type: AssetTypeEnum, onstate: (state: stateLoad) => void, state: stateLoad, asset: IAsset, call: (handle: any) => void)
        {
            // if (url.indexOf("glsl") == -1 && url.indexOf(".shader.json") == -1)
            // {
            //     // console.log("aaa");
            // }
            let assetFactory: IAssetFactory = this.getAssetFactory(type);
            if (assetFactory != null)
            {
                assetFactory.load(url, onstate, state, this, asset, (chandle) =>
                {
                    call({ url: url, handle: chandle });
                });
            }
            else
            {
                throw new Error("cant use the type:" + type);
            }
        }
        /**
         * @private
         * @param packnum 
         * @param url 
         * @param type 
         * @param onstate 
         * @param state 
         */
        loadResByPack(respack: any, url: string, type: AssetTypeEnum, onstate: (state: stateLoad) => void, state: stateLoad, asset: IAsset, call: (handle: any) => void)
        {
            let assetFactory: IAssetFactory = this.getAssetFactory(type);
            if (assetFactory != null)
            {
                assetFactory.loadByPack(respack, url, onstate, state, this, asset, ((chandle) =>
                {
                    call({ url: url, handle: chandle });
                }));
            }
            else
            {
                throw new Error("cant use the type:" + type);
            }
        }


        private assetFactorys: { [key: string]: IAssetFactory } = {};
        private regAssetFactory(type: AssetTypeEnum, factory: IAssetFactory)
        {
            this.assetFactorys[type.toString()] = factory;
        }
        private getAssetFactory(type: AssetTypeEnum)
        {
            return this.assetFactorys[type];
        }
        private initAssetFactorys()
        {
            this.regAssetFactory(AssetTypeEnum.GLVertexShader, new AssetFactory_GLVertexShader());
            this.regAssetFactory(AssetTypeEnum.GLFragmentShader, new AssetFactory_GLFragmentShader());
            this.regAssetFactory(AssetTypeEnum.Shader, new AssetFactory_Shader());
            this.regAssetFactory(AssetTypeEnum.Texture, new AssetFactory_Texture());
            this.regAssetFactory(AssetTypeEnum.TextureDesc, new AssetFactory_TextureDesc());
            this.regAssetFactory(AssetTypeEnum.Mesh, new AssetFactory_Mesh());
            this.regAssetFactory(AssetTypeEnum.Prefab, new AssetFactory_Prefab());
            this.regAssetFactory(AssetTypeEnum.Material, new AssetFactory_Material());
            this.regAssetFactory(AssetTypeEnum.Aniclip, new AssetFactory_Aniclip());
            this.regAssetFactory(AssetTypeEnum.Scene, new AssetFactory_Scene());
            this.regAssetFactory(AssetTypeEnum.Atlas, new AssetFactory_Atlas());
            this.regAssetFactory(AssetTypeEnum.Font, new AssetFactory_Font());
            this.regAssetFactory(AssetTypeEnum.TextAsset, new AssetFactory_TextAsset());
            // this.regAssetFactory(AssetTypeEnum.PackBin,new AssetFactory_PackBin());
            // this.regAssetFactory(AssetTypeEnum.PackTxt,new AssetFactory_PackTxt());
            this.regAssetFactory(AssetTypeEnum.PathAsset, new AssetFactory_PathAsset());
            this.regAssetFactory(AssetTypeEnum.PVR, new AssetFactory_PVR());
            this.regAssetFactory(AssetTypeEnum.F14Effect, new AssetFactory_f14eff());
            this.regAssetFactory(AssetTypeEnum.DDS, new AssetFactory_DDS());
            this.regAssetFactory(AssetTypeEnum.KeyFrameAniclip, new assetfactory_keyFrameAniClip());
        }



        private waitStateDic: { [name: string]: Function[] } = {};
        /**
         * @private
         * @param name 
         * @param state 
         */
        public doWaitState(name: string, state: stateLoad)
        {
            if (this.waitStateDic[name] == null)
                return;
            for (var key in this.waitStateDic[name])
            {
                this.waitStateDic[name][key](state);
            }
            if (state.isfinish)
            {
                this.waitStateDic[name].length = 0;
            }
        }

        private waitQueueState: { state: stateLoad, type: AssetTypeEnum, onstate: (state: stateLoad) => void }[] = [];
        private loadingQueueState: { state: stateLoad, type: AssetTypeEnum, onstate: (state: stateLoad) => void }[] = [];
        private loadingCountLimit: number = 10;
        private checkFreeChannel(): number
        {
            let freechannel = -1;
            for (let k = 0; k < this.loadingQueueState.length; k++)
            {
                if (this.loadingQueueState[k] == undefined)
                {
                    freechannel = k;
                    break;
                }
                else if (!this.loadingQueueState[k].state.isfinish && !this.loadingQueueState[k].state.iserror)
                {
                    continue;
                }
                else
                {
                    delete this.loadingQueueState[k];
                    freechannel = k;
                    break;
                }
            }
            if (freechannel == -1 && this.loadingQueueState.length < this.loadingCountLimit)
            {
                freechannel = this.loadingQueueState.length;
            }
            return freechannel;
        }
        // public loadByMulQueue()
        // {
        //     if (this.waitQueueState.length == 0) return;
        //     let freechannel = this.checkFreeChannel();
        //     if (freechannel == -1) return;

        //     let curloadinfo = this.waitQueueState.shift();
        //     this.loadingQueueState[freechannel] = curloadinfo;
        //     let state = curloadinfo.state;
        //     let url = state.url;
        //     let type = curloadinfo.type;
        //     let onstate = curloadinfo.onstate;

        //     if (type == AssetTypeEnum.Bundle)//加载包
        //     {
        //         gd3d.io.loadText(url, (txt, err) =>
        //         {
        //             if (err != null)
        //             {
        //                 curloadinfo.state.iserror = true;
        //                 curloadinfo.state.errs.push(new Error(err.message));
        //                 onstate(state);
        //                 return;
        //             }
        //             let json = JSON.parse(txt);
        //             let filename = "";
        //             if (json["files"])
        //             {
        //                 filename = this.getFileName(url);

        //                 var ab = new assetBundle(url);
        //                 ab.name = filename;
        //                 ab.parse(JSON.parse(txt));
        //                 ab.load(this, onstate, state);
        //             } else
        //             {
        //                 let loadurl = url.replace(".assetbundle.json", ".packs.txt");
        //                 filename = this.getFileName(url);

        //                 var ab = new assetBundle(url);
        //                 ab.name = filename;
        //                 ab.totalLength = json["totalLength"];
        //                 ab.loadCompressBundle(loadurl, onstate, state, this);
        //             }


        //             this.mapBundle[filename] = ab;
        //         });
        //     }
        //     else if (type == AssetTypeEnum.CompressBundle)
        //     {
        //         gd3d.io.loadText(url, (txt, err) =>
        //         {
        //             if (err != null)
        //             {
        //                 curloadinfo.state.iserror = true;
        //                 curloadinfo.state.errs.push(new Error(err.message));
        //                 onstate(state);
        //                 return;
        //             }

        //             //压缩的bundle在packs.txt中
        //             let loadurl = url.replace(".assetbundle.json", ".packs.txt");
        //             let filename = this.getFileName(url);
        //             let json = JSON.parse(txt);

        //             var ab = new assetBundle(url);
        //             ab.name = filename;
        //             ab.totalLength = json["totalLength"];
        //             ab.loadCompressBundle(loadurl, onstate, state, this);
        //         });

        //     }
        //     else
        //     {
        //         state.totaltask = 1;
        //         this.loadSingleRes(url, type, (s) =>
        //         {
        //             if (s.iserror)
        //             {
        //                 onstate(state);
        //                 this.loadByMulQueue();
        //                 return;
        //             }

        //             if (s.progressCall)
        //             {
        //                 s.progressCall = false;
        //                 onstate(state);
        //                 return;
        //             }
        //             state.curtask = 1;
        //             s.isfinish = true;
        //             onstate(s);
        //             this.doWaitState(url, s);
        //             this.loadByMulQueue();
        //         }, state, null, (handle) =>
        //             {

        //             });
        //     }
        // }
        private unPkg(type: AssetTypeEnum, url: string, state: stateLoad, onstate: (state: stateLoad) => void)
        {

            if (type == AssetTypeEnum.Bundle)//加载包
            {
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
                    let json = JSON.parse(txt);
                    let filename = "";
                    if (json["files"])
                    {
                        filename = this.getFileName(url);

                        var ab = new assetBundle(url);
                        ab.name = filename;
                        ab.parse(JSON.parse(txt));
                        ab.load(this, onstate, state);
                    } else
                    {
                        let loadurl = url.replace(".assetbundle.json", ".packs.txt");
                        filename = this.getFileName(url);

                        var ab = new assetBundle(url);
                        ab.name = filename;
                        ab.totalLength = json["totalLength"];
                        ab.loadCompressBundle(loadurl, onstate, state, this);
                    }


                    this.mapBundle[filename] = ab;
                });
            }
            else if (type == AssetTypeEnum.CompressBundle)
            {
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

                    //压缩的bundle在packs.txt中
                    let loadurl = url.replace(".assetbundle.json", ".packs.txt");
                    let filename = this.getFileName(url);
                    let json = JSON.parse(txt);

                    var ab = new assetBundle(url);
                    ab.name = filename;
                    ab.totalLength = json["totalLength"];
                    ab.loadCompressBundle(loadurl, onstate, state, this);
                });

            }
            else
            {
                state.totaltask = 1;
                this.loadSingleRes(url, type, (s) =>
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
                    state.curtask = 1;
                    s.isfinish = true;
                    onstate(s);
                    this.doWaitState(url, s);
                }, state, null, (data) =>
                    {
                        if (data.handle)
                            data.handle();
                    });
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 加载压缩后的包
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param type 资源的类型
         * @param onstate 状态返回的回调
         */
        loadCompressBundle(url: string, onstate: (state: stateLoad) => void = null)
        {
            if(this.maploaded[url])
            {
                if(onstate)
                {
                    let state = new stateLoad();
                    state.isfinish=true;
                    onstate(state);
                }
                return;
            }
            let name = this.getFileName(url);
            let type = this.calcType(url);
            var state = new stateLoad();
            this.mapInLoad[name] = state;
            state.url = url;
            if (type != AssetTypeEnum.Bundle)
            {
                state.errs.push(new Error("is not bundle compress type:" + url));
                state.iserror = true;
                onstate(state);
                this.doWaitState(url, state);
                return;
            }
            // console.log(`** mgr loadCompressBundle: ${url}`);
            type = AssetTypeEnum.CompressBundle;
            this.unPkg(type, url, state, onstate);
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 加载资源
         * 这里来区分assetbundle和单个资源
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param type 资源的类型
         * @param onstate 状态返回的回调
         */
        // private time: number;
        maploaded:{[url:string]:IAsset}={};
        load(url: string, type: AssetTypeEnum = AssetTypeEnum.Auto, onstate: (state: stateLoad) => void = null)
        {
            if (onstate == null)
                onstate = () => { };
            // if (!this.time)
            //     this.time = Date.now();

            // console.log(`assetmgr:${url} ${((Date.now() - this.time))}ms ${Date.now()}`);
            // this.time = Date.now();
            // console.log(`资源包 : ${url} 开始加载`);
            if(this.maploaded[url])
            {
                if(onstate)
                {
                    var state = new stateLoad();
                    state.isfinish=true;
                    onstate(state);
                }
                return;
            }
            let name = this.getFileName(url);
            if (this.mapInLoad[name] != null)
            {
                let _state = this.mapInLoad[name];
                if (_state.isfinish)
                {
                    onstate(this.mapInLoad[name]);
                }
                return;
            }
            var state = new stateLoad();
            this.mapInLoad[name] = state;
            state.url = url;
            //确定资源类型
            if (type == AssetTypeEnum.Auto)
            {
                type = this.calcType(url);
            }
            if (type == AssetTypeEnum.Unknown)
            {
                state.errs.push(new Error("can not sure about type:" + url));
                state.iserror = true;
                onstate(state);
                return;
            }

            this.unPkg(type, url, state, onstate);           
        }


        private loadForNoCache(url: string, type: AssetTypeEnum = AssetTypeEnum.Auto, onstate: (state: stateLoad) => void = null)
        {
            if (onstate == null)
                onstate = () => { };

            let name = this.getFileName(url);
            var state = new stateLoad();
            this.mapInLoad[name] = state;
            state.url = url;
            //确定资源类型
            if (type == AssetTypeEnum.Auto)
            {
                type = this.calcType(url);
            }
            if (type == AssetTypeEnum.Unknown)
            {
                state.errs.push(new Error("can not sure about type:" + url));
                state.iserror = true;
                onstate(state);
                this.doWaitState(url, state);
                return;
            }
            this.unPkg(type, url, state, onstate);
           
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 卸载资源
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param onstate 状态返回的回调
         */
        unload(url: string, onstate: () => void = null)
        {
            //如果资源没有被加载，则往后不执行
            let name = this.getFileName(url);
            if (this.mapInLoad[name] == null)
                return;
            let state: stateLoad = this.mapInLoad[name];
            for (let key in state.resstate)
            {
                if(state.resstate[key] && state.resstate[key].res){
                    state.resstate[key].res.unuse();
                }
            }
            delete this.mapInLoad[name];
        }

        waitlightmapScene: { [sceneurl: string]: string[] } = {};
        loadSceneAssetbundleWithoutLightMap(url: string, type: AssetTypeEnum = AssetTypeEnum.Auto, onstate: (state: stateLoad) => void = null)
        {
            this.waitlightmapScene[url] = [];
            this.load(url, type, onstate);
        }

        /**
         * 
         * @param scenename 场景名字 (***.scene.json)
         */
        loadSceneLightmap(sceneurl: string)
        {
            let arr = this.waitlightmapScene[sceneurl];
            let scenename = this.getFileName(sceneurl).replace(".assetbundle.json", ".scene.json");
            let scene = this.getAssetByName(scenename) as rawscene;
            if (scene == null) return;
            scene["lightmaps"] = [];
            let texarr: string[] = [];
            let texcount = 0;
            if (arr)
            {
                for (let key in arr)
                {
                    let texurl = arr[key].replace(".imgdesc.json", ".png");
                    texarr.push(texurl);
                    this.loadForNoCache(texurl, AssetTypeEnum.Texture, (state) =>
                    {
                        if (state.isfinish)
                        {
                            texcount++;
                            if (texcount == arr.length)
                            {
                                for (let item in texarr)
                                {
                                    let texname = this.getFileName(texarr[item]);
                                    let tex = this.getAssetByName(texname) as texture;
                                    if (tex)
                                    {
                                        scene["lightmaps"].push(tex);
                                        tex.use();
                                    }
                                }
                                scene.useLightMap(this.app.getScene());
                            }
                        }
                    });
                }
            }
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 加载场景
         * 只有先load完包含场景的assetbundle，才能load场景
         * @version egret-gd3d 1.0
         * @param sceneName 场景名称
         * @param onComplete 加载完成回调
         */
        loadScene(sceneName: string, onComplete: (firstChilds: Array<transform>) => void)
        {
            let firstChilds = new Array<transform>();
            let scene = this.app.getScene();
            if (sceneName.length > 0)
            {
                var _rawscene: rawscene = this.getAssetByName(sceneName) as rawscene;
                let willLoadRoot = _rawscene.getSceneRoot();
                while (willLoadRoot.children.length > 0)
                {
                    let trans = willLoadRoot.children.shift();
                    firstChilds.push(trans);
                    scene.addChild(trans);
                }

                //清空原场景UI
                scene["_overlay2d"] = new Array<overlay2D>();
                //lightmap
                _rawscene.useLightMap(scene);
                //fog
                _rawscene.useFog(scene);
                //nav
                _rawscene.useNavMesh(scene);

            }
            else
            {
                var _camera: transform = new transform();
                _camera.gameObject.addComponent("camera");
                _camera.name = "camera";
                firstChilds.push(_camera);
                scene.addChild(_camera);
            }
            scene.name = sceneName;
            scene.getRoot().markDirty();
            onComplete(firstChilds);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 保存场景
         * 这里只是把场景序列化
         * 具体保存要编辑器来进行
         * 保存的地址和内容通过回调返回
         * @version egret-gd3d 1.0
         * @param fun 回调
         */
        saveScene(fun: (data: SaveInfo, resourses?: string[]) => void)
        {
            io.SerializeDependent.resourseDatas = [];//先清空下资源引用

            let info: SaveInfo = new SaveInfo();
            let _scene = {};
            let scene = this.app.getScene();
            let _rootNode = io.serializeObj(scene.getRoot(), null, this);

            let _lightmaps = [];
            let lightmaps = scene.lightmaps;
            for (var str in lightmaps)
            {
                let _lightmap = {};
                _lightmap["name"] = lightmaps[str].getName();
                _lightmaps.push(_lightmap);

                let lightMapUrl = this.getAssetUrl(lightmaps[str]);
                io.SerializeDependent.resourseDatas.push({ "url": lightMapUrl, "type": io.SaveAssetType.FullUrl });
            }
            //navmesh
            let navstr = NavMeshLoadManager.Instance.navmeshJson;
            navstr = navstr == null ? "" : navstr;
            let navmeshJson = { data: navstr };


            let cup;
            if (scene.fog)
            {
                let cup = scene.fog._Color;
                scene.fog._Color = `${scene.fog._Color.x},${scene.fog._Color.y},${scene.fog._Color.z},${scene.fog._Color.z}` as any;  //
            }
            _scene["fog"] = scene.fog;
            _scene["rootNode"] = _rootNode;
            _scene["lightmap"] = _lightmaps;
            _scene["navmesh"] = navmeshJson;

            let _sceneStr = JSON.stringify(_scene);
            if (scene.fog) scene.fog._Color = cup;

            var _rawscene: rawscene = this.getAssetByName(scene.name) as rawscene;
            _rawscene.Parse(_sceneStr, this);
            let url = this.getAssetUrl(_rawscene);

            info.files[url] = _sceneStr;

            fun(info, io.SerializeDependent.resourseDatas);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 保存预设
         * 这里只是把预设序列化
         * 具体保存要编辑器来进行
         * 保存的地址和内容通过回调返回
         * @version egret-gd3d 1.0
         * @param fun 回调
         */
        savePrefab(trans: transform, prefabName: string, fun: (data: SaveInfo, resourses?: string[], contents?: any[]) => void)
        {
            io.SerializeDependent.resourseDatas = [];//先清空下资源引用
            let info: SaveInfo = new SaveInfo();

            var _prefab: prefab = this.getAssetByName(prefabName) as prefab;
            _prefab.apply(trans);
            let _rootTrans = io.serializeObj(trans, null, this);

            let url = this.getAssetUrl(_prefab);
            info.files[url] = JSON.stringify(_rootTrans);

            fun(info, io.SerializeDependent.resourseDatas);
        }




        /**
         * @language zh_CN
         * @classdesc
         * 保存材质
         * @param mat 
         * @param fun 
         */
        saveMaterial(mat: material, fun: (data: SaveInfo) => void)
        {
            let info: SaveInfo = new SaveInfo();
            let data = {};
            let mapUniform = {};
            let shader = mat.getShader();
            let shaderPropertis = shader.defaultMapUniform;
            data["shader"] = shader.getName();
            data["mapUniform"] = mapUniform;

            // for (let key in shaderPropertis) {
            //     if (mat.mapUniform[key] != undefined) {
            //         let propertyDdata = {};
            //         let uniformData = mat.mapUniform[key];
            //         propertyDdata["type"] = uniformData.type;
            //         switch (uniformData.type) {
            //             case gd3d.render.UniformTypeEnum.Texture:
            //                 propertyDdata["value"] = uniformData.value != null ? uniformData.value.name.name : "";
            //                 break;
            //             case gd3d.render.UniformTypeEnum.Float4:
            //                 propertyDdata["value"] = uniformData.value;
            //                 break;
            //             case gd3d.render.UniformTypeEnum.Float:
            //                 propertyDdata["value"] = uniformData.value;
            //                 break;
            //         }
            //         mapUniform[key] = propertyDdata;
            //     }
            // }
            let url = this.getAssetUrl(mat);
            info.files[url] = JSON.stringify(data);
            fun(info);
        }


        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 同步加载单个资源（伪同步，只是创建了一个资源的实例返回，还是要等待资源数据加载完成来填充数据）
         * 这个接口还需要完善
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param type 资源的类型
         */
        loadSingleResImmediate(url: string, type: AssetTypeEnum): any
        {
            let result: any;
            let filename = this.getFileName(url);
            let name = filename.substring(0, filename.indexOf("."));
            if (type == AssetTypeEnum.GLVertexShader)
            {
                gd3d.io.loadText(url, (txt, err) =>
                {
                    this.shaderPool.compileVS(this.webgl, name, txt);
                }
                );
            }
            else if (type == AssetTypeEnum.GLFragmentShader)
            {
                gd3d.io.loadText(url, (txt, err) =>
                {
                    this.shaderPool.compileFS(this.webgl, name, txt);
                }
                );
            }
            else if (type == AssetTypeEnum.Shader)
            {
                result = new shader(filename);
                gd3d.io.loadText(url, (txt, err) =>
                {
                    result.parse(this, JSON.parse(txt));
                    this.mapShader[filename] = result;
                });
            }
            else if (type == AssetTypeEnum.Texture)
            {
                result = new texture(filename);

                var img = new Image();
                img.src = url;
                img.onload = () =>
                {
                    var _textureFormat = render.TextureFormatEnum.RGBA;//这里需要确定格式
                    result.glTexture = new gd3d.render.glTexture2D(this.webgl, _textureFormat);
                    result.glTexture.uploadImage(img, true, true, true, true);
                    this.use(result);
                }
            }
            else if (type == AssetTypeEnum.Mesh)
            {
                result = new mesh(filename);
                gd3d.io.loadArrayBuffer(url, (txt, err) =>
                {
                    result.Parse(txt, this.webgl);
                    this.use(result);
                })
            }
            else
            {
                throw new Error("cant use the type:" + type);
            }
            this.regRes(filename, result);
            return result;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 同步加载资源（伪同步，只是创建了一个资源的实例返回，还是要等待资源数据加载完成来填充数据）
         * 这个接口还需要完善
         * 这里有个问题，如果是assetbundle，那么实例究竟是个啥东西。
         * @version egret-gd3d 1.0
         * @param url 资源的url
         * @param type 资源的类型
         */
        loadImmediate(url: string, type: AssetTypeEnum = AssetTypeEnum.Auto): any
        {
            var result: any;
            //确定资源类型
            if (type == AssetTypeEnum.Auto)
            {
                type = this.calcType(url);
            }
            if (type == AssetTypeEnum.Unknown)
            {
                throw new Error("unknown format");
            }
            else if (type == AssetTypeEnum.Bundle)//加载包
            {
                result = new assetBundle(url);
                gd3d.io.loadText(url, (txt, err) =>
                {
                    result.parse(JSON.parse(txt));
                });
            }
            else
            {
                result = this.loadSingleResImmediate(url, type);
            }
            return result;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过url获取资源的名称
         * @version egret-gd3d 1.0
         * @param url 资源的url
         */
        getFileName(url: string): string
        {
            var filei = url.lastIndexOf("/");
            var file = url.substr(filei + 1);
            return file;
        }
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 通过url获取资源的类型
         * @version egret-gd3d 1.0
         * @param url 资源的url
         */
        calcType(url: string | any): AssetTypeEnum
        {
            var filei = url.lastIndexOf("/");
            var file = url.substr(filei + 1);

            var i = file.indexOf(".", 0);
            var extname = null;
            while (i >= 0)
            {
                extname = file.substr(i);
                if (extname == ".vs.glsl")
                {
                    return AssetTypeEnum.GLVertexShader;
                }
                else if (extname == ".assetbundle.json")
                {
                    return AssetTypeEnum.Bundle;
                }
                else if (extname == ".fs.glsl")
                {
                    return AssetTypeEnum.GLFragmentShader;
                }
                else if (extname == ".shader.json")
                {
                    return AssetTypeEnum.Shader;
                }
                else if (extname == ".png" || extname == ".jpg")
                {
                    return AssetTypeEnum.Texture;
                }
                else if (extname == ".pvr.bin" || extname == ".pvr" || extname == ".pvr.bin.js")
                {
                    return AssetTypeEnum.PVR;
                }
                else if (extname == ".imgdesc.json")
                {
                    return AssetTypeEnum.TextureDesc;
                }
                else if (extname == ".mat.json")
                {
                    return AssetTypeEnum.Material;
                }
                else if (extname == ".mesh.bin" || extname == ".mesh.bin.js")
                {
                    return AssetTypeEnum.Mesh;
                }
                else if (extname == ".aniclip.bin" || extname == ".aniclip.bin.js")
                {
                    return AssetTypeEnum.Aniclip;
                }
                else if (extname == ".prefab.json")
                {
                    return AssetTypeEnum.Prefab;
                }
                else if (extname == ".scene.json")
                {
                    return AssetTypeEnum.Scene;
                }
                else if (extname == ".atlas.json")
                {
                    return AssetTypeEnum.Atlas;
                }
                else if (extname == ".font.json")
                {
                    return AssetTypeEnum.Font;
                }
                else if (extname == ".json" || extname == ".txt" || extname == ".effect.json")
                {
                    return AssetTypeEnum.TextAsset;
                }
                else if (extname == ".packs.bin" || extname == ".packs.bin.js")
                {
                    return AssetTypeEnum.PackBin;
                }
                else if (extname == ".packs.txt")
                {
                    return AssetTypeEnum.PackTxt;
                }
                else if (extname == ".path.json")
                {
                    return AssetTypeEnum.PathAsset;
                }
                else if (extname == ".f14effect.json")
                {
                    return AssetTypeEnum.F14Effect;
                } else if (extname == ".dds" || extname == ".dds.bin")
                {
                    return AssetTypeEnum.DDS;
                } else if (extname == ".keyframeAniclip.json")
                {
                    return AssetTypeEnum.KeyFrameAniclip;
                }

                i = file.indexOf(".", i + 1);
            }

            // if (url.endsWith(".vs.glsl"))
            //     return AssetTypeEnum.GLVertexShader;
            // else if (url.endsWith(".assetbundle.json"))
            //     return AssetTypeEnum.Bundle;
            // else if (url.endsWith(".fs.glsl"))
            // {
            //     return AssetTypeEnum.GLFragmentShader;
            // }
            // else if (url.endsWith(".shader.json"))
            // {
            //     return AssetTypeEnum.Shader;
            // }
            // else if (url.endsWith(".png") || url.endsWith(".jpg"))
            // {
            //     return AssetTypeEnum.Texture;
            // }
            // else if (url.endsWith(".pvr.bin") || url.endsWith(".pvr") || url.endsWith(".pvr.bin.js"))
            // {
            //     return AssetTypeEnum.PVR;
            // }
            // else if (url.endsWith(".imgdesc.json"))
            // {
            //     return AssetTypeEnum.TextureDesc;
            // }
            // else if (url.endsWith(".mat.json"))
            // {
            //     return AssetTypeEnum.Material;
            // }
            // else if (url.endsWith(".mesh.bin") || url.endsWith(".mesh.bin.js"))
            // {
            //     return AssetTypeEnum.Mesh;
            // }
            // else if (url.endsWith(".aniclip.bin") || url.endsWith(".aniclip.bin.js"))
            // {
            //     return AssetTypeEnum.Aniclip;
            // }
            // else if (url.endsWith(".prefab.json"))
            // {
            //     return AssetTypeEnum.Prefab;
            // }
            // else if (url.endsWith(".scene.json"))
            // {
            //     return AssetTypeEnum.Scene;
            // }
            // else if (url.endsWith(".atlas.json"))
            // {
            //     return AssetTypeEnum.Atlas;
            // }
            // else if (url.endsWith(".font.json"))
            // {
            //     return AssetTypeEnum.Font;
            // }
            // else if (url.endsWith(".json") || url.endsWith(".txt") || url.endsWith(".effect.json"))
            // {
            //     return AssetTypeEnum.TextAsset;
            // }
            // else if (url.endsWith(".packs.bin") || url.endsWith(".packs.bin.js"))
            // {
            //     return AssetTypeEnum.PackBin;
            // }
            // else if (url.endsWith(".packs.txt"))
            // {
            //     return AssetTypeEnum.PackTxt;
            // }
            // else if (url.endsWith(".path.json"))
            // {
            //     return AssetTypeEnum.PathAsset;
            // }
            // else if (url.endsWith(".f14effect.json"))
            // {
            //     return AssetTypeEnum.F14Effect;
            // } else if (url.endsWith(".dds") || url.endsWith(".dds.bin"))
            // {
            //     return AssetTypeEnum.DDS;
            // } else if (url.endsWith(".keyframeAniclip.json"))
            // {
            //     return AssetTypeEnum.KeyFrameAniclip;
            // }
            return AssetTypeEnum.Unknown;
        }

        private particlemat: material;
        getDefParticleMat(): material
        {
            if (this.particlemat == null)
            {
                var mat = new material("defparticle");
                var shader = this.getShader("particles_additive.shader.json");
                if (shader == null)
                {
                    shader = this.getShader("shader/def");
                }
                mat.setShader(shader);
                var tex = this.getDefaultTexture("grid");
                mat.setTexture("_MainTex", tex);
                this.particlemat = mat;
            }
            return this.particlemat;
        }
    }


    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 资源引用计数的结构
     * @version egret-gd3d 1.0
     */
    export class assetRef
    {
        asset: IAsset;
        refcount: number;
    }

    /**
     * @private
     */
    export class SaveInfo
    {
        files: { [key: string]: string } = {};
    }
}
