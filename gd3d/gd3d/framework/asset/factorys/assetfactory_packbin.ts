// namespace gd3d.framework
// {
//     export class AssetFactory_PackBin implements IAssetFactory
//     {
//         newAsset(): IAsset
//         {
//             return null;
//         }

//         load(url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset?: IAsset)
//         {
//             let filename = getFileName(url);

//             gd3d.io.loadArrayBuffer(url, (_buffer, err) =>
//                 {
//                     if (AssetFactoryTools.catchError(err, onstate, state))
//                         return;

//                     var read: gd3d.io.binReader = new gd3d.io.binReader(_buffer);
//                     let index = read.readInt32();
//                     read.position = index;
//                     while (read.canread())
//                     {
//                         let indindex = read.readInt32();
//                         if (index == 0) break;

//                         let key = read.readStringUtf8FixLength(indindex);
//                         let strs: string[] = key.split('|');

//                         let start = parseInt(strs[1]);
//                         let len = parseInt(strs[2]);

//                         let bufs: ArrayBuffer = _buffer.slice(start, start + len);
//                         assetMgr.bundlePackBin[strs[0]] = bufs;
//                     }

//                     onstate(state);
//                 },
//                 (loadedLength, totalLength) =>
//                 {
//                     state.compressBinLoaded = loadedLength;
//                     // state.resstate[filename].loadedLength = loadedLength;
//                     // state.resstate[filename].totalLength = totalLength;
//                     state.progressCall = true;
//                     onstate(state);
//                 });
//         }

//         loadByPack(packnum: number, url: string, onstate: (state: stateLoad) => void, state: stateLoad, assetMgr: assetMgr, asset?: IAsset)
//         {
            
//         }
//     }
// }