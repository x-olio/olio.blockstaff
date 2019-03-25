namespace Game.Common
{
    export class AssetTools
    {
        static async promiseQueueExec(promises: Array<Function>)
        {
            for (let fn of promises)
                await fn.call(this);
        }

        static loadAsset(assetMgr: gd3d.framework.assetMgr, url: string)
        {
            return new Promise((resolve) =>
            {
                assetMgr.load(url, gd3d.framework.AssetTypeEnum.Auto, (s) =>
                {
                    if (s.isfinish)
                        resolve();
                });
            });
        }
    }
}
