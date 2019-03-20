namespace gd3d.framework
{
    export class AssetFactory_GLFragmentShader implements IAssetFactory
    {
        newAsset(): IAsset
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);
            let name = filename.substring(0, filename.indexOf("."));

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            gd3d.io.loadText(url, (txt, err, isloadFail) =>
            {
                call(() =>
                {
                    state.isloadFail = isloadFail ? true : false;
                    if (AssetFactoryTools.catchError(err, onstate, state))
                        return;

                    state.resstate[filename].state = 1;//完成

                    state.logs.push("load a glshader:" + filename);
                    assetMgr.shaderPool.mapFSString[name] = txt;
                    // assetMgr.shaderPool.compileFS(assetMgr.webgl, name, txt);
                    onstate(state);
                });
            },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                });
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: IAsset, call: (handle: () => void) => void)
        {
            call(() =>
            {
                let filename = getFileName(url);
                let name = filename.substring(0, filename.indexOf("."));

                state.resstate[filename] = new ResourceState();
                if(state.resstateFirst==null)
                {
                    state.resstateFirst=state.resstate[filename];
                }
                let txt = respack[filename];
                txt = decodeURI(txt);
                state.resstate[filename].state = 1;//完成

                state.logs.push("load a glshader:" + filename);
                assetMgr.shaderPool.mapFSString[name] = txt;
                //assetMgr.shaderPool.compileFS(assetMgr.webgl, name, txt);
                onstate(state);
            });
        }
    }
}