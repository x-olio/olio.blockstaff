
declare var WebGLTextureUtil;
namespace gd3d.framework
{
    export class AssetFactory_DDS implements IAssetFactory
    {
        newAsset(): texture
        {
            return null;
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            call(() =>
            {});
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            // let sc = document.createElement("script") as HTMLScriptElement;
            // sc.src = "lib/webgl-util.js";
            // let sc1 = document.createElement("script") as HTMLScriptElement;
            // sc1.src = "lib/webgl-texture-util.js";
            // document.body.appendChild(sc);
            // document.body.appendChild(sc1);
            // document.body.addEventListener("load", () => {
            //     document.body.appendChild(sc);
            //     document.body.appendChild(sc1);
            // }, false);
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
                        assetMgr.webgl.pixelStorei(assetMgr.webgl.UNPACK_FLIP_Y_WEBGL, 1);
                        let textureUtil = new WebGLTextureUtil(assetMgr.webgl, true);
                        textureUtil.loadDDS(url, null, (texture, error, stats) =>
                        {
                            let t2d = new gd3d.render.glTexture2D(assetMgr.webgl);
                            t2d.format = gd3d.render.TextureFormatEnum.PVRTC2_RGB;
                            t2d.texture = texture;
                            _texture.glTexture = t2d;
                        });

                        AssetFactoryTools.useAsset(assetMgr, onstate, state, _texture, url);
                    });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                });
        }
    }
}