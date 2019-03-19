/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
    let help_v3 = new gd3d.math.vector3();
    let help_v3_1 = new gd3d.math.vector3();

    export interface ICollider
    {
        gameObject: gameObject;
        subTran: transform;
        getBound();
        intersectsTransform(tran: transform): boolean;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 表示矩形碰撞盒
     * @version egret-gd3d 1.0
     */
    @reflect.nodeComponent
    @reflect.nodeBoxCollider
    export class boxcollider implements INodeComponent, ICollider
    {
        static readonly ClassName:string="boxcollider";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 子transform
         * @version egret-gd3d 1.0
         */
        subTran: transform;
         /**
         * @private
         */
        filter: meshFilter;
         /**
         * @private
         */
        obb: obb;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 碰撞盒中心点
        * @version egret-gd3d 1.0
        */
        @gd3d.reflect.Field("vector3")
        center: math.vector3 = new math.vector3(0,0,0);
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 碰撞盒大小
        * @version egret-gd3d 1.0
        */
        @gd3d.reflect.Field("vector3")
        size: math.vector3 =  new math.vector3(1,1,1);
         /**
         * @private
         */
        getBound()
        {
            return this.obb;
        }

        private static _tempMatrix = new gd3d.math.matrix();
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取该碰撞盒物体的世界矩阵
        * @version egret-gd3d 1.0
        */
        public get matrix(): gd3d.math.matrix
        {
            if (this.gameObject)
                return this.gameObject.transform.getWorldMatrix();

            gd3d.math.matrixMakeIdentity(boxcollider._tempMatrix);
            return boxcollider._tempMatrix;
        }
        start()
        {
            this.filter = this.gameObject.getComponent("meshFilter") as meshFilter;
            this.build();
        }

        onPlay()
        {

        }

        update(delta: number)
        {
            if (this.obb)
            {
                this.obb.update(this.matrix);
            }
        }
         /**
         * @private
         */
        _colliderVisible: boolean = false;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 碰撞盒的可见性
        * @version egret-gd3d 1.0
        */
        get colliderVisible(): boolean
        {
            return this._colliderVisible;
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 设置碰撞盒的可见性
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
        * @public
        * @language zh_CN
        * @classdesc
        * 检测碰撞
        * @version egret-gd3d 1.0
        */
        intersectsTransform(tran: transform): boolean
        {
            if (tran.gameObject.collider == null) return false;
            if (this.obb == null || tran.gameObject.collider.getBound() == null) return false;
            var _obb = tran.gameObject.collider.getBound();
            return this.obb.intersects(_obb);
        }

        /**
        * @private
        * @language zh_CN
        * @classdesc
        * 构建碰撞盒
        * @version egret-gd3d 1.0
        */
        private build()
        {
            this.obb = new obb();
            if (this.center && this.size)
            {
                this.obb.buildByCenterSize(this.center, this.size);
            }
            else
            {
                let minimum = help_v3;
                let maximum = help_v3_1;
                if (this.filter)
                {
                    // let meshdata: gd3d.render.meshData = this.filter.getMeshOutput().data;
                    // gd3d.math.vec3SetByFloat(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, minimum);
                    // gd3d.math.vec3SetByFloat(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE, maximum);

                    // for (var i = 0; i < meshdata.pos.length; i++)
                    // {
                    //     gd3d.math.vec3Max(meshdata.pos[i], maximum, maximum);
                    //     gd3d.math.vec3Min(meshdata.pos[i], minimum, minimum);
                    // }
                    // console.log("add obb filter " + minimum + "  " + maximum);

                    this.filter.getMeshOutput().calcVectexMinMax(minimum,maximum);
                }
                else
                {
                    minimum.x = minimum.y = minimum.z = -1;
                    maximum.x = maximum.y = maximum.z = 1;
                }
                this.obb.buildByMaxMin(minimum, maximum);
            }
            this.buildMesh();
        }
        /**
        * @private
        * @language zh_CN
        * @classdesc
        * 构建碰撞盒mesh 并显示
        * @version egret-gd3d 1.0
        */
        private buildMesh()
        {
            this.subTran = new gd3d.framework.transform();
            this.subTran.gameObject.hideFlags = HideFlags.DontSave | HideFlags.HideInHierarchy;
            this.subTran.name = "boxcollider";
            var mesh = this.subTran.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

            mesh.mesh = this.getColliderMesh();
            var renderer = this.subTran.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

            this.subTran.gameObject.visible = this._colliderVisible;

            this.gameObject.transform.addChild(this.subTran);
            this.gameObject.transform.markDirty();
            this.subTran.markDirty();//要标记自己脏了，才会更新
            //this.gameObject.transform.updateWorldTran();
        }
        /**
        * @private
        * @language zh_CN
        * @classdesc
        * 获取碰撞盒mesh
        * @version egret-gd3d 1.0
        */
        private getColliderMesh(): mesh
        {
            var _mesh: mesh = new mesh();
            _mesh.data = gd3d.render.meshData.genBoxByArray_Quad(this.obb.vectors);
            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal;
            var v32 = _mesh.data.genVertexDataArray(vf);
            var i16 = _mesh.data.genIndexDataArrayQuad2Line();
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
            if (this.subTran)
            {
                this.subTran.dispose();
            }
            if (this.obb)
            {
                this.obb.dispose();
            }
        }
         /**
         * @private
         */
        clone()
        {

        }
    }

}