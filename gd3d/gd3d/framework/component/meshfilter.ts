/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
     /**
     * @public
     * @language zh_CN
     * @classdesc
     * mesh组件
     * @version egret-gd3d 1.0
     */
    @reflect.nodeComponent
    export class meshFilter implements INodeComponent
    {
        static readonly ClassName:string="meshFilter";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 挂载的gameobject
         * @version egret-gd3d 1.0
         */
        gameObject: gameObject;
        start()
        {
            
        }

        onPlay()
        {

        }


        update(delta: number)
        {

        }

        private _mesh: mesh;

        //本意mesh filter 可以弄一点 模型处理，比如lod
        //先直进直出吧
        /**
         * @private
         */
        @gd3d.reflect.Field("mesh")
        @gd3d.reflect.UIStyle("WidgetDragSelect")
        get mesh()
        {
            return this._mesh;
        }
         /**
         * @public
         * @language zh_CN
         * @param mesh 此组件的mesh
         * @classdesc
         * 设置mesh数据
         * @version egret-gd3d 1.0
         */
        set mesh(mesh: mesh)
        {
            if (this._mesh != null)
            {
                this._mesh.unuse();
            }
            this._mesh = mesh;
            if (this._mesh != null)
            {
                this._mesh.use();
            }
        }
         /**
         * @public
         * @language zh_CN
         * @classdesc
         * 返回mesh数据
         * @version egret-gd3d 1.0
         */
        getMeshOutput()
        {
            return this._mesh;
        }
        /**
         * @private
         */
        remove()
        {
            if(this.mesh)
                this.mesh.unuse(true);
        }
        /**
         * @private
         */
        clone()
        {

        }
    }

}