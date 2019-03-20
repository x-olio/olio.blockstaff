namespace gd3d.framework
{
    export class AssetFactory_Mesh implements IAssetFactory
    {
        newAsset(): mesh
        {
            return null;
        }

        load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: mesh, call: (handle: () => void) => void)
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
                        let _mesh = asset ? asset : new mesh(filename);
                        return _mesh.Parse(_buffer, assetMgr.webgl).then(() =>
                        {
                            AssetFactoryTools.useAsset(assetMgr, onstate, state, _mesh, url);
                        });
                    });
                    // let _mesh = asset ? asset : new mesh(filename);
                    // _mesh.onReadFinish=()=>{
                    //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _mesh, url);
                    // };
                    // _mesh.Parse(_buffer, assetMgr.webgl);//在此方法中命名mesh的name（name存在bin文件中）     
                    // _mesh.Parse(_buffer,assetMgr.webgl).then(()=>{
                    //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _mesh, url);
                    // });
                },
                (loadedLength, totalLength) =>
                {
                    AssetFactoryTools.onProgress(loadedLength, totalLength, onstate, state, filename);
                })
        }

        loadByPack(respack: any, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset: mesh, call: (handle: () => void) => void)
        {
            let filename = getFileName(url);

            state.resstate[filename] = new ResourceState();
            if(state.resstateFirst==null)
            {
                state.resstateFirst=state.resstate[filename];
            }
            let _buffer = respack[filename];
            let _mesh = asset ? asset : new mesh(filename);
            // _mesh.onReadFinish=()=>{
            //     AssetFactoryTools.useAsset(assetMgr, onstate, state, _mesh, url);
            // };
            // _mesh.Parse(_buffer, assetMgr.webgl);
            call(() =>
            {
               return _mesh.Parse(_buffer, assetMgr.webgl).then(() =>
                {

                    AssetFactoryTools.useAsset(assetMgr, onstate, state, _mesh, url);

                });
            });
        }
    }
}