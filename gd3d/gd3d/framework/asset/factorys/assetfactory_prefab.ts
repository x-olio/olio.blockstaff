namespace gd3d.framework
{
    export class AssetFactory_Prefab implements IAssetFactory
    {
        newAsset(): prefab
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: prefab, call: (handle: () => void) => void)
        {
            let bundlename = getFileName(state.url);
            let filename = getFileName(url);

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

                    let _prefab = asset ? asset : new prefab(filename);
                    _prefab.assetbundle = bundlename;
                    _prefab.Parse(txt, assetMgr);                  
                    AssetFactoryTools.useAsset(assetMgr, onstate, state, _prefab, url);
                    // _prefab.Parse(txt, assetMgr).then(() =>
                    // {
                    //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _prefab, url);
                    // });
                });


                // AssetFactoryTools.useAsset(assetMgr, onstate, state, _prefab, url);
            },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: prefab, call: (handle: () => void) => void)
        {
            call(() =>
            {
                let bundlename = getFileName(state.url);
                let filename = getFileName(url);

                state.resstate[filename] = new ResourceState();
                if(state.resstateFirst==null)
                {
                    state.resstateFirst=state.resstate[filename];
                }
                let txt = respack[filename];
                let _prefab = asset ? asset : new prefab(filename);
                _prefab.assetbundle = bundlename;

                // _prefab.Parse(txt, assetMgr).then(() =>
                // {
                //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _prefab, url);
                // });
                _prefab.Parse(txt, assetMgr);
                AssetFactoryTools.useAsset(assetMgr, onstate, state, _prefab, url);
            });
        }
    }
}