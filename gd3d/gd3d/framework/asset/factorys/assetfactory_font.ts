namespace gd3d.framework
{
    export class AssetFactory_Font implements IAssetFactory
    {
        newAsset(filename?: string): font
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: font, call: (handle: () => void) => void)
        {
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

                        let _font = asset ? asset : new font(filename);
                        _font.Parse(txt, assetMgr);

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _font, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: font, call: (handle: () => void) => void)
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
                let _font = asset ? asset : new font(filename);
                _font.Parse(txt, assetMgr);

                AssetFactoryTools.useAsset(assetMgr, onstate, state, _font, url);
            });
        }
    }
}