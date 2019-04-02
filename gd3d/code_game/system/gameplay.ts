namespace Game
{
    enum PlayerState
    {
        None,
        Jump,
        Down,
    }


    export class GamePlayer
    {

        public trans: gd3d.framework.transform;
        private assertMgr: gd3d.framework.assetMgr;
        private inputmgr: gd3d.framework.inputMgr;

        private state: PlayerState = PlayerState.None;
        public jumpHeight: number = 3;
        public jumpSpeed: number = 8;
        public downSpeed: number = 8;
        private moveSpeed: number = 3;
        private jumpStartPos: number = 0;
        private map: System.Map2DSystem;

        private dirLR: number = 0;
        private dirUD: number = -1;
        constructor()
        {
            this.assertMgr = gd3d.framework.sceneMgr.app.getAssetMgr();
            this.inputmgr = new gd3d.framework.inputMgr(this.assertMgr.app);
        }

        async Init(map: System.Map2DSystem)
        {
            this.map = map;
            await this.LoadTexture();
            this.Inittrans();
        }

        LoadTexture()
        {
            return Common.AssetTools.loadAsset(this.assertMgr, "./res/_game/test/gameplayer.png");
        }

        Inittrans()
        {
            this.trans = new gd3d.framework.transform();
            this.trans.localScale.x = this.trans.localScale.y = this.trans.localScale.z = 1;
            this.trans.markDirty();

            let tex = this.assertMgr.getAssetByName("gameplayer.png") as gd3d.framework.texture;

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



        Jump()
        {
            if (this.state == PlayerState.Jump)
                return;

            this.state = PlayerState.Jump;
            this.jumpStartPos = this.trans.localTranslate.y;
            this.dirUD = 1;

            console.log(`jump`);

        }

        GetBlock(index: number)
        {
            let layer = this.map.baseData.layers[0];
            let block = this.map.mapBlocks[layer.refblocks[layer.data[index] - 1]];
            return block;
        }
        CheckBlock(index)
        {
            let block = this.GetBlock(index);
            if (block && block.bound != "none")
                return false;
            return true;
        }
        CheckMoveX(x, y)
        {
            if (this.dirLR > 0)
                return this.CheckBlock(this.map.CalcIndex(Math.ceil(x), Math.round(y)));

            if (this.dirLR < 0)
                return this.CheckBlock(this.map.CalcIndex(Math.floor(x), Math.round(y)));
            return true;
        }
        CheckMoveY(x, y)
        {
            if (this.dirUD > 0)
                return this.CheckBlock(this.map.CalcIndex(Math.round(x), Math.ceil(y)));
            if (this.dirUD < 0)
                return this.CheckBlock(this.map.CalcIndex(Math.round(x), Math.floor(y)));
            return true;
        }

        SetPos(x: number, y: number)
        {

            if (this.CheckMoveX(x, y))
                this.trans.localTranslate.x = x;
            if (this.CheckMoveY(x, y))
                this.trans.localTranslate.y = y;

        }
        Update(delta: number)
        {
            if (!this.trans)
                return;


            if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.Space))
            {
                this.Jump();
            }

            if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.KeyJ))
            {
                this.dirLR = -1;
            }
            else if (this.inputmgr.GetKeyDown(gd3d.event.KeyCode.KeyL))
            {
                this.dirLR = 1;
            }
            else if (this.inputmgr.GetKeyUP(gd3d.event.KeyCode.KeyJ) || this.inputmgr.GetKeyUP(gd3d.event.KeyCode.KeyL))
                this.dirLR = 0;


            let y = this.trans.localTranslate.y + delta * (this.jumpSpeed * this.dirUD);
            let x = this.trans.localTranslate.x + delta * (this.moveSpeed * this.dirLR);

            if ((this.dirUD == 1 && this.trans.localTranslate.y >= this.jumpStartPos + this.jumpHeight) || this.dirUD == 1 && !this.CheckMoveY(this.trans.localTranslate.x, y))
            {
                this.dirUD = -1;
            }

            if (this.state == PlayerState.Jump && this.dirUD == -1)
            {
                if (this.state == PlayerState.Jump && !this.CheckMoveY(this.trans.localTranslate.x, y))
                {
                    this.state = PlayerState.None;
                    // y = Math.round(y);
                    // x = Math.round(x);
                }

            }

            this.SetPos(x, y);

        }

        EntryScene(map2d: System.Map2DSystem, x: number, y: number)
        {
            this.SetPos(x, y);

            map2d.root.addChild(this.trans);
        }
    }
}