namespace Game
{
    export class GamePlayer
    {
        
        private trans: gd3d.framework.transform;
        private assertMgr: gd3d.framework.assetMgr;
        constructor()
        {
            this.assertMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
        }

        async Init()
        {
            this.LoadTexture();
            this.Inittrans();
        }

        LoadTexture()
        {
            return Common.AssetTools.loadAsset(this.assertMgr, "");
        }

        Inittrans()
        {
            this.trans = new gd3d.framework.transform();
            this.trans.localScale.x = this.trans.localScale.y = this.trans.localScale.z = 1;
            this.trans.markDirty();

            let tex = this.assertMgr.getAssetByName("playertrans.png") as gd3d.framework.texture;
            var mesh = this.trans.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            var smesh = this.assertMgr.getDefaultMesh("quad");
            mesh.mesh = (smesh);
            var renderer = this.trans.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
            let cuber = renderer;

            var sh = this.assertMgr.getShader("color.shader.json");
            if (sh != null)
            {
                cuber.materials = [];
                cuber.materials.push(new gd3d.framework.material());
                cuber.materials[0].setShader(sh);

                cuber.materials[0].setTexture("_MainTex", tex);
                cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(1, 1, 0, 0));
            }
        }

        Move()
        {

        }

        Jump()
        {

        }

        SetPos(x: number, y: number)
        {
            this.trans.localTranslate.x = x;
            this.trans.localTranslate.y = y;
        }
    }
}