namespace gd3d.framework
{
    export class AssetFactory_PVR implements IAssetFactory
    {
        newAsset(): texture
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            gd3d.io.loadArrayBuffer(url,
                (_buffer, err, isloadFail) =>
                {
                    call(() =>
                    {
                        state.isloadFail = isloadFail ? true : false;
                        if (AssetFactoryTools.catchError(err, onstate, state))
                            return;

                        let _texture = asset ? asset : new texture(filename);
                        let pvr: PvrParse = new PvrParse(assetMgr.webgl);
                        _texture.glTexture = pvr.parse(_buffer);

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _texture, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                });
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            call(() =>
            {});
        }
    }
}