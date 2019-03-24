namespace gd3d.framework
{
     /**
     * @public
     * @language zh_CN
     * @classdesc
     * 碰撞组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeComponent
    @reflect.nodeMeshCollider
    export class meshcollider implements INodeComponent, ICollider
    {
        static readonly ClassName:string="meshcollider";

         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;
         /**
         * @private
         */
        subTran: transform;
         /**
         * @private
         */
        private _mesh: mesh;

        private _filter : meshFilter;
         /**
         * @private
         */
        getBound()
        {
            return this._mesh;
        }
        start()
        {
            this._filter = this.gameObject.getComponent("meshFilter") as meshFilter;
            this.ckbuildMesh();
        }

        onPlay()
        {

        }

        update(delta: number)
        {

        }
         /**
         * @private
         */
        @gd3d.reflect.Field("boolean")
        private _colliderVisible: boolean = false;
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 碰撞体的可见性
         * @version egret-gd3d 1.0
         */
        get colliderVisible(): boolean
        {
            return this._colliderVisible;
        }
         /**
         * @public
         * @language zh_CN
         * @param value boolbean
         * @classdesc
         * 碰撞体的可见性
         * @version egret-gd3d 1.0
         */
        set colliderVisible(value: boolean)
        {
            this._colliderVisible = value;
            if (this.subTran)
            {
                this.subTran.gameObject.visible = this._colliderVisible;
            }
        }
         /**
         * @private
         */
        intersectsTransform(tran: transform): boolean
        {
            //obb-mesh  obb-obb  mesh-mesh
            return false;
        }
        private _builded = false;
        private ckbuildMesh()
        {
            if(this._builded || !this._filter) return;
            this._mesh = this._filter.getMeshOutput();
            if(!this._mesh) return;
            this.subTran = new gd3d.framework.transform();
            this.subTran.gameObject.hideFlags = HideFlags.DontSave | HideFlags.HideInHierarchy;
            this.subTran.name = `${this.gameObject.getName()}_meshcollider`;
            var mesh = this.subTran.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
            mesh.mesh = this.getColliderMesh();
            this.subTran.gameObject.visible = this._colliderVisible;
            this.gameObject.transform.addChild(this.subTran);
            this.gameObject.transform.markDirty();
            this.subTran.markDirty();
            this.gameObject.transform.updateWorldTran();
            this._builded = true;
        }

        private getColliderMesh(): mesh
        {
            var _mesh: mesh = new mesh();
            _mesh.data = this._mesh.data;
            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal;
            var v32 = _mesh.data.genVertexDataArray(vf);
            var i16 = _mesh.data.genIndexDataArrayTri2Line();
            var webgl = this.gameObject.getScene().webgl;

            _mesh.glMesh = new gd3d.render.glMesh();
            _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
            _mesh.glMesh.uploadVertexData(webgl, v32);

            _mesh.glMesh.addIndex(webgl, i16.length);
            _mesh.glMesh.uploadIndexData(webgl, 0, i16);
            _mesh.submesh = [];
            {
                var sm = new subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = i16.length;
                sm.line = true;
                _mesh.submesh.push(sm);
            }
            return _mesh;
        }
         /**
         * @private
         */
        remove()
        {
            if(this.subTran)
            {
                this.subTran.dispose();
            }
            this._mesh = null;
            this._filter = null;
        }
         /**
         * @private
         */
        clone()
        {

        }
    }
}