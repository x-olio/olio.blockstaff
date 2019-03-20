namespace gd3d.framework
{
    export class AssetFactory_Atlas implements IAssetFactory
    {
        newAsset(): atlas
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: atlas, call: (handle: () => void) => void)
        {
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

                    let _atlas = asset ? asset : new atlas(filename);
                    _atlas.Parse(txt, assetMgr);

                    AssetFactoryTools.useAsset(assetMgr, onstate, state, _atlas, url);
                });
            },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: atlas, call: (handle: () => void) => void)
        {
            call(() =>
            {
                let filename = getFileName(url);
                state.resstate[filename] = new ResourceState();
                if(state.resstateFirst==null)
                {
                    state.resstateFirst=state.resstate[filename];
                }
                let txt = respack[filename];
                let _atlas = asset ? asset : new atlas(filename);
                _atlas.Parse(txt, assetMgr);

                AssetFactoryTools.useAsset(assetMgr, onstate, state, _atlas, url);
            });
        }
    }
}