namespace gd3d.framework
{
    export class defsprite
    {
        static initDefaultSprite(assetmgr: assetMgr)
        {
            let spt_white = new sprite("white_sprite");
            spt_white.texture = assetmgr.getDefaultTexture("white");
            spt_white.defaultAsset = true;
            spt_white.rect = new math.rect(0,0,spt_white.texture.glTexture.width,spt_white.texture.glTexture.height);
            assetmgr.mapDefaultSprite["white_sprite"] = spt_white;

            let spt_gray = new sprite("gray_sprite");
            spt_gray.texture = assetmgr.getDefaultTexture("gray");
            spt_gray.defaultAsset = true;
            spt_gray.rect = new math.rect(0,0,spt_gray.texture.glTexture.width,spt_gray.texture.glTexture.height);
            assetmgr.mapDefaultSprite["gray_sprite"] = spt_gray;

            let spt_grid = new sprite("grid_sprite");
            spt_grid.texture = assetmgr.getDefaultTexture("grid");
            spt_grid.defaultAsset = true;
            spt_grid.rect = new math.rect(0,0,spt_grid.texture.glTexture.width,spt_grid.texture.glTexture.height);
            assetmgr.mapDefaultSprite["grid_sprite"] = spt_grid;
        }
    }
}