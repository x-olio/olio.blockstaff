namespace gd3d.framework
{
    export class assetfactory_keyFrameAniClip implements IAssetFactory
    {
        newAsset(): keyFrameAniClip
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: keyFrameAniClip, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            gd3d.io.loadText(url,
                (text, err, isloadFail) =>
                {
                    call(() =>
                    {
                        state.isloadFail = isloadFail ? true : false;
                        if (AssetFactoryTools.catchError(err, onstate, state))
                            return;
                        let _clip = asset ? asset : new keyFrameAniClip(filename);
                        _clip.Parse(text);

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _clip, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: keyFrameAniClip, call: (handle: () => void) => void)
        {
            call(() =>
            {
                let filename = getFileName(url);

                state.resstate[filename] = new ResourceState();
                if(state.resstateFirst==null)
                {
                    state.resstateFirst=state.resstate[filename];
                }
                let _buffer = respack[filename];
                let _clip = asset ? asset : new keyFrameAniClip(filename);
                _clip.Parse(_buffer);

                AssetFactoryTools.useAsset(assetMgr, onstate, state, _clip, url);
            });
        }
    }
}