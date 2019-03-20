namespace gd3d.framework
{
    export class AssetFactory_Texture implements IAssetFactory
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
            gd3d.io.loadImg(url,
                (_tex, _err, isloadFail) =>
                {
                    call(() =>
                    {
                        state.isloadFail = isloadFail ? true : false;
                        if (AssetFactoryTools.catchError(_err, onstate, state))
                            return;

                        let _texture = asset ? asset : new texture(filename);
                        var _textureFormat = render.TextureFormatEnum.RGBA;//这里需要确定格式
                        var t2d = new gd3d.render.glTexture2D(assetMgr.webgl, _textureFormat);
                        t2d.uploadImage(_tex, false, true, true, false);
                        _texture.glTexture = t2d;

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
            {
                
            });
        }
    }
}