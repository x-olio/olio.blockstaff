namespace gd3d.framework
{
    export class defTexture
    {
        static initDefaultTexture(assetmgr: assetMgr)
        {
            var t = new texture("white");
            t.glTexture = gd3d.render.glTexture2D.staticTexture(assetmgr.webgl, "white");
            t.defaultAsset = true;
            assetmgr.mapDefaultTexture["white"] = t;

            var t = new texture("gray");
            t.glTexture = gd3d.render.glTexture2D.staticTexture(assetmgr.webgl, "gray");
            t.defaultAsset = true;
            assetmgr.mapDefaultTexture["gray"] = t;

            var t = new texture("normal");
            t.glTexture = gd3d.render.glTexture2D.staticTexture(assetmgr.webgl, "normal");
            t.defaultAsset = true;
            assetmgr.mapDefaultTexture["normal"] = t;

            var t = new texture("grid");
            t.glTexture = gd3d.render.glTexture2D.staticTexture(assetmgr.webgl, "grid");
            t.defaultAsset = true;
            assetmgr.mapDefaultTexture["grid"] = t;


            //must in end
            defTexture.initDefaultCubeTexture(assetmgr);
        }

        private static initDefaultCubeTexture(assetmgr: assetMgr){
            let whiteTex = assetmgr.mapDefaultTexture["white"];
            var t = new texture("white");
            t.glTexture = new gd3d.render.glTextureCube(assetmgr.app.webgl);
            (t.glTexture as gd3d.render.glTextureCube).uploadImages(whiteTex,whiteTex,whiteTex,whiteTex,whiteTex,whiteTex);
            t.defaultAsset = true;
            assetmgr.mapDefaultCubeTexture["white"] = t;
        }
    }
}