namespace gd3d.framework
{
    export class AssetFactory_TextureDesc implements IAssetFactory
    {
        newAsset(): texture
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);

            state.resstate[filename] = new RefResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            gd3d.io.loadText(url,
                (txt, err, isloadFail) =>
                {

                    state.isloadFail = isloadFail ? true : false;
                    if (AssetFactoryTools.catchError(err, onstate, state))
                        return;

                    var _texturedesc = JSON.parse(txt);
                    var _name: string = _texturedesc["name"];
                    var _filterMode: string = _texturedesc["filterMode"];
                    var _format: string = _texturedesc["format"];
                    var _mipmap: boolean = _texturedesc["mipmap"];
                    var _wrap: string = _texturedesc["wrap"];
                    var _premultiplyAlpha: boolean = _texturedesc["premultiplyAlpha"];

                    if (_premultiplyAlpha == undefined)
                    {
                        _premultiplyAlpha = true;
                    }
                    var _textureFormat = render.TextureFormatEnum.RGBA;//这里需要确定格式
                    if (_format == "RGB")
                        _textureFormat = render.TextureFormatEnum.RGB;
                    else if (_format == "Gray")
                        _textureFormat = render.TextureFormatEnum.Gray;

                    var _linear: boolean = true;
                    if (_filterMode.indexOf("linear") < 0)
                        _linear = false;

                    var _repeat: boolean = false;
                    if (_wrap.indexOf("Repeat") >= 0)
                        _repeat = true;

                    var _textureSrc: string = url.replace(filename, _name);

                    if (_textureSrc.indexOf(".pvr.bin") >= 0)
                    {
                        gd3d.io.loadArrayBuffer(_textureSrc,
                            (_buffer, err) =>
                            {
                                call(() =>
                                {
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
                                AssetFactoryTools.onRefProgress(loadedLength, totalLength, onstate, state, filename);
                            });
                    } else if (_textureSrc.indexOf(".dds.bin") >= 0)
                    {
                        gd3d.io.loadArrayBuffer(_textureSrc,
                            (_buffer, err) =>
                            {
                                call(() =>
                                {
                                    if (AssetFactoryTools.catchError(err, onstate, state))
                                        return;
                                    let _texture = asset ? asset : new texture(filename);
                                    assetMgr.webgl.pixelStorei(assetMgr.webgl.UNPACK_FLIP_Y_WEBGL, 1);
                                    let textureUtil = new WebGLTextureUtil(assetMgr.webgl, true);
                                    textureUtil.loadDDS(_textureSrc, null, (texture, error, stats) =>
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

                    } else
                    {
                        gd3d.io.loadImg(_textureSrc,
                            (_tex, _err,isloadFail) =>
                            {
                                call(() =>
                                {
                                    state.isloadFail = isloadFail ? true : false;
                                    if (AssetFactoryTools.catchError(_err, onstate, state))
                                        return;

                                    let _texture = asset ? asset : new texture(filename);
                                    _texture.realName = _name;

                                    var t2d = new gd3d.render.glTexture2D(assetMgr.webgl, _textureFormat);
                                    t2d.uploadImage(_tex, _mipmap, _linear, _premultiplyAlpha, _repeat);
                                    _texture.glTexture = t2d;

                                    AssetFactoryTools.useAsset(assetMgr, onstate, state, _texture, url);
                                });

                            },
                            (loadedLength, totalLength) =>
                            {
                                AssetFactoryTools.onRefProgress(loadedLength, totalLength, onstate, state, filename);
                            });
                    }


                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                }
            );
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: texture, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);

            let txt = respack[filename];

            var _texturedesc = JSON.parse(txt);
            var _name: string = _texturedesc["name"];
            var _filterMode: string = _texturedesc["filterMode"];
            var _format: string = _texturedesc["format"];
            var _mipmap: boolean = _texturedesc["mipmap"];
            var _wrap: string = _texturedesc["wrap"];
            var _premultiplyAlpha: boolean = _texturedesc["premultiplyAlpha"];

            if (_premultiplyAlpha == undefined)
            {
                _premultiplyAlpha = true;
            }
            var _textureFormat = render.TextureFormatEnum.RGBA;//这里需要确定格式
            if (_format == "RGB")
            {
                _textureFormat = render.TextureFormatEnum.RGB;
            }
            else if (_format == "Gray")
            {
                _textureFormat = render.TextureFormatEnum.Gray;
            }

            var _linear: boolean = true;
            if (_filterMode.indexOf("linear") < 0)
            {
                _linear = false;
            }

            var _repeat: boolean = false;
            if (_wrap.indexOf("Repeat") >= 0)
            {
                _repeat = true;
            }


            var _textureSrc: string = url.replace(filename, _name);

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            if (_textureSrc.indexOf(".pvr.bin") >= 0)
            {
                gd3d.io.loadArrayBuffer(_textureSrc,
                    (_buffer, err) =>
                    {

                        call(() =>
                        {
                            if (AssetFactoryTools.catchError(err, onstate, state))
                                return;
                            let _texture = asset ? asset : new texture(filename);
                            let pvr: PvrParse = new PvrParse(assetMgr.webgl);
                            console.log(_textureSrc);
                            _texture.glTexture = pvr.parse(_buffer);

                            AssetFactoryTools.useAsset(assetMgr, onstate, state, _texture, url);
                        });
                    },
                    (loadedLength, totalLength) =>
                    {
                        AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                    });
            } else if (_textureSrc.indexOf(".dds.bin") >= 0)
            {
                gd3d.io.loadArrayBuffer(_textureSrc,
                    (_buffer, err) =>
                    {
                        call(() =>
                        {
                            if (AssetFactoryTools.catchError(err, onstate, state))
                                return;
                            let _texture = asset ? asset : new texture(filename);
                            assetMgr.webgl.pixelStorei(assetMgr.webgl.UNPACK_FLIP_Y_WEBGL, 1);
                            let textureUtil = new WebGLTextureUtil(assetMgr.webgl, true);
                            textureUtil.loadDDS(_textureSrc, null, (texture, error, stats) =>
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
            else
            {
                gd3d.io.loadImg(_textureSrc,
                    (_tex, _err,isloadFail) =>
                    {
                        call(() =>
                        {
                            state.isloadFail = isloadFail ? true : false;
                            if (AssetFactoryTools.catchError(_err, onstate, state))
                                return;
                            let _texture = asset ? asset : new texture(filename);
                            _texture.realName = _name;

                            var t2d = new gd3d.render.glTexture2D(assetMgr.webgl, _textureFormat);
                            t2d.uploadImage(_tex, _mipmap, _linear, _premultiplyAlpha, _repeat);
                            _texture.glTexture = t2d;

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
}