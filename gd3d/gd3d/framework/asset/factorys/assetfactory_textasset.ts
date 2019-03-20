namespace gd3d.framework
{
    export class AssetFactory_TextAsset implements IAssetFactory
    {
        newAsset(): textasset
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: textasset, call: (handle: () => void) => void)
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

                        let _textasset = asset ? asset : new textasset(filename);
                        _textasset.content = txt;

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _textasset, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: textasset, call: (handle: () => void) => void)
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
                let _textasset = asset ? asset : new textasset(filename);
                _textasset.content = txt;

                AssetFactoryTools.useAsset(assetMgr, onstate, state, _textasset, url);
            });
        }
    }
}