namespace gd3d.framework
{
    export class AssetFactory_Scene implements IAssetFactory
    {
        newAsset(): rawscene
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: rawscene, call: (handle: () => void) => void)
        {
            let bundlename = getFileName(state.url);
            let filename = getFileName(url);

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            gd3d.io.loadText(url,
                (txt, err, isloadFail) =>
                {
                    call(() =>
                    {
                        state.isloadFail = isloadFail ? true : false;
                        if (AssetFactoryTools.catchError(err, onstate, state))
                            return;

                        let _scene = asset ? asset : new rawscene(filename);
                        _scene.assetbundle = bundlename;
                        _scene.Parse(txt, assetMgr);
                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _scene, url);
                        // _scene.Parse(txt, assetMgr).then(() =>
                        // {
                        //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _scene, url);
                        // });
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: rawscene, call: (handle: () => void) => void)
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
                let _scene = asset ? asset : new rawscene(filename);
                _scene.assetbundle = bundlename;
                _scene.Parse(txt, assetMgr);
                AssetFactoryTools.useAsset(assetMgr, onstate, state, _scene, url);
                // _scene.Parse(txt, assetMgr).then(() =>
                // {
                //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _scene, url);
                // });
            });
        }
    }
}