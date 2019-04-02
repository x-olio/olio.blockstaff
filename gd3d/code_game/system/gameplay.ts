namespace Game
{
    export class GamePlayer
    {

        public trans: gd3d.framework.transform;
        private assertMgr: gd3d.framework.assetMgr;
        private inputmgr: gd3d.framework.inputMgr;
        constructor()
        {
            this.assertMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            this.inputmgr = new gd3d.framework.inputMgr(this.assertMgr.app);
        }

        async Init()
        {
            await this.LoadTexture();
            this.Inittrans();
        }

        LoadTexture()
        {
            return Common.AssetTools.loadAsset(this.assertMgr, "./res/_game/test/red.png");
        }

        Inittrans()
        {
            this.trans = new gd3d.framework.transform();
            this.trans.localScale.x = this.trans.localScale.y = this.trans.localScale.z = 1;
            this.trans.markDirty();

            let tex = this.assertMgr.getAssetByName("red.png") as gd3d.framework.texture;

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

                cuber.materials[0].setVector4("_MainTex_ST", new gd3d.math.vector4(0, 0, 1, 1));
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

        Update(delta: number)
        {
            if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.Space))
            {
                console.log("###");
            }
        }
    }
}