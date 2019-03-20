namespace gd3d.framework
{
    export class AssetFactory_Material implements IAssetFactory
    {
        newAsset(filename?: string): material
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: material, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);
            let assetbundleName = getFileName(state.url);

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

                        let _material = asset ? asset : new material(filename);
                        _material.Parse(assetMgr, JSON.parse(txt), assetbundleName);

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _material, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: material, call: (handle: () => void) => void)
        {
            call(() =>
            {
                let filename = getFileName(url);
                let assetbundleName = getFileName(state.url);

                state.resstate[filename] = new ResourceState();
                if(state.resstateFirst==null)
                {
                    state.resstateFirst=state.resstate[filename];
                }
                let txt = respack[filename];
                let _material = asset ? asset : new material(filename);
                _material.Parse(assetMgr, JSON.parse(txt), assetbundleName);

                AssetFactoryTools.useAsset(assetMgr, onstate, state, _material, url);
            });
        }
    }
}