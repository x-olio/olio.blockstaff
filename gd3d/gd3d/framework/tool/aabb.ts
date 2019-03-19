namespace gd3d.framework
{
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 表示轴对称包围盒
     * @version egret-gd3d 1.0
     */
    export class aabb
    {
        /**
        * @public
        * @language zh_CN
        * 最小点
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public minimum: gd3d.math.vector3;
        
        /**
        * @public
        * @language zh_CN
        * 最大点
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public maximum: gd3d.math.vector3;
        private srcmin: gd3d.math.vector3;
        private srcmax: gd3d.math.vector3;
        private opmin: gd3d.math.vector3 = new gd3d.math.vector3();
        private opmax: gd3d.math.vector3 = new gd3d.math.vector3();
        private _center: gd3d.math.vector3 = new gd3d.math.vector3();

        /**
        * @public
        * @language zh_CN
        * 构建轴对称包围盒
        * @param _minimum 最小点
        * @param _maximum 最大点
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        constructor(_minimum: gd3d.math.vector3, _maximum: gd3d.math.vector3)
        {
            this.srcmin = gd3d.math.pool.clone_vector3(_minimum);
            this.srcmax = gd3d.math.pool.clone_vector3(_maximum);

            this.minimum = gd3d.math.pool.clone_vector3(_minimum);
            this.maximum = gd3d.math.pool.clone_vector3(_maximum);
        }

        /**
        * @public
        * @language zh_CN
        * 刷新轴对称包围盒
        * @param worldmatrix 物体的世界矩阵
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public update(worldmatrix: gd3d.math.matrix)
        {
            gd3d.math.matrixGetTranslation(worldmatrix, this.opmin);
            gd3d.math.matrixGetTranslation(worldmatrix, this.opmax);
            if (worldmatrix.rawData[0] > 0)
            {
                this.opmin.x += worldmatrix.rawData[0] * this.srcmin.x;
                this.opmax.x += worldmatrix.rawData[0] * this.srcmax.x;
            }
            else
            {
                this.opmin.x += worldmatrix.rawData[0] * this.srcmax.x;
                this.opmax.x += worldmatrix.rawData[0] * this.srcmin.x;
            }
            if (worldmatrix.rawData[1] > 0)
            {
                this.opmin.y += worldmatrix.rawData[1] * this.srcmin.y;
                this.opmax.y += worldmatrix.rawData[1] * this.srcmax.y;
            }
            else
            {
                this.opmin.y += worldmatrix.rawData[1] * this.srcmax.y;
                this.opmax.y += worldmatrix.rawData[1] * this.srcmin.y;
            }
            if (worldmatrix.rawData[2] > 0)
            {
                this.opmin.z += worldmatrix.rawData[2] * this.srcmin.z;
                this.opmax.z += worldmatrix.rawData[2] * this.srcmax.z;
            }
            else
            {
                this.opmin.z += worldmatrix.rawData[2] * this.srcmax.z;
                this.opmax.z += worldmatrix.rawData[2] * this.srcmin.z;
            }
            if (worldmatrix.rawData[4] > 0)
            {
                this.opmin.x += worldmatrix.rawData[4] * this.srcmin.x;
                this.opmax.x += worldmatrix.rawData[4] * this.srcmax.x;
            }
            else
            {
                this.opmin.x += worldmatrix.rawData[4] * this.srcmax.x;
                this.opmax.x += worldmatrix.rawData[4] * this.srcmin.x;
            }
            if (worldmatrix.rawData[5] > 0)
            {
                this.opmin.y += worldmatrix.rawData[5] * this.srcmin.y;
                this.opmax.y += worldmatrix.rawData[5] * this.srcmax.y;
            }
            else
            {
                this.opmin.y += worldmatrix.rawData[5] * this.srcmax.y;
                this.opmax.y += worldmatrix.rawData[5] * this.srcmin.y;
            }
            if (worldmatrix.rawData[6] > 0)
            {
                this.opmin.z += worldmatrix.rawData[6] * this.srcmin.z;
                this.opmax.z += worldmatrix.rawData[6] * this.srcmax.z;
            }
            else
            {
                this.opmin.z += worldmatrix.rawData[6] * this.srcmax.z;
                this.opmax.z += worldmatrix.rawData[6] * this.srcmin.z;
            }
            if (worldmatrix.rawData[8] > 0)
            {
                this.opmin.x += worldmatrix.rawData[8] * this.srcmin.x;
                this.opmax.x += worldmatrix.rawData[8] * this.srcmax.x;
            }
            else
            {
                this.opmin.x += worldmatrix.rawData[8] * this.srcmax.x;
                this.opmax.x += worldmatrix.rawData[8] * this.srcmin.x;
            }
            if (worldmatrix.rawData[9] > 0)
            {
                this.opmin.y += worldmatrix.rawData[9] * this.srcmin.y;
                this.opmax.y += worldmatrix.rawData[9] * this.srcmax.y;
            }
            else
            {
                this.opmin.y += worldmatrix.rawData[9] * this.srcmax.y;
                this.opmax.y += worldmatrix.rawData[9] * this.srcmin.y;
            }
            if (worldmatrix.rawData[10] > 0)
            {
                this.opmin.z += worldmatrix.rawData[10] * this.srcmin.z;
                this.opmax.z += worldmatrix.rawData[10] * this.srcmax.z;
            }
            else
            {
                this.opmin.z += worldmatrix.rawData[10] * this.srcmax.z;
                this.opmax.z += worldmatrix.rawData[10] * this.srcmin.z;
            }

            this.minimum = gd3d.math.pool.clone_vector3(this.opmin);
            this.maximum = gd3d.math.pool.clone_vector3(this.opmax);
        }

        /**
        * @public
        * @language zh_CN
        * 包含一个点
        * @param vec 世界坐标
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public addVector3(vec: gd3d.math.vector3)
        {
            gd3d.math.vec3Max(this.maximum, vec, this.maximum);
            gd3d.math.vec3Max(this.minimum, vec, this.minimum);
        }

        /**
        * @public
        * @language zh_CN
        * 检查是否包含点
        * @param vec 世界坐标
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public containsVector3(vec: gd3d.math.vector3): boolean
        {
            return (vec.x > this.minimum.x) && (vec.x < this.maximum.x) &&
                (vec.y > this.minimum.y) && (vec.x < this.maximum.y) &&
                (vec.z > this.minimum.z) && (vec.z < this.maximum.z);
        }

        /**
        * @public
        * @language zh_CN
        * 检查是否与aabb相交
        * @param aabb 轴对称包围盒
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public intersectAABB(aabb: aabb): boolean
        {
            if (this.minimum.x > aabb.maximum.x) return false;
            if (this.maximum.x < aabb.minimum.x) return false;
            if (this.minimum.x > aabb.maximum.x) return false;
            if (this.maximum.x < aabb.minimum.x) return false;
            if (this.minimum.x > aabb.maximum.x) return false;
            if (this.maximum.x < aabb.minimum.x) return false;
            return true;
        }

        /**
        * @public
        * @language zh_CN
        * 包含一个aabb
        * @param aabb 轴对称包围盒
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public addAABB(aabb: gd3d.framework.aabb)
        {
            if (aabb != null)
            {
                gd3d.math.vec3Max(this.maximum, aabb.maximum, this.maximum);
                gd3d.math.vec3Min(this.minimum, aabb.minimum, this.minimum);
            }
        }

        /**
        * @public
        * @language zh_CN
        * 计算包围盒的中心位置
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public get center(): gd3d.math.vector3
        {
            gd3d.math.vec3Add(this.maximum, this.minimum, this._center);
            gd3d.math.vec3ScaleByNum(this._center, 0.5, this._center);
            return this._center;
        }

        /**
        * @public
        * @language zh_CN
        * 清空
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public clear()
        {
            gd3d.math.vec3SetByFloat(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, this.minimum);
            gd3d.math.vec3SetByFloat(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE, this.maximum);
        }

        /**
        * @public
        * @language zh_CN
        * 克隆
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public clone(): aabb
        {
            var _min = gd3d.math.pool.clone_vector3(this.minimum);
            var _max = gd3d.math.pool.clone_vector3(this.maximum);
            var aabb: aabb = new gd3d.framework.aabb(_min, _max);
            return aabb;
        }

        public cloneTo(to:aabb)
        {
            math.vec3Clone(this.minimum,to.minimum);
            math.vec3Clone(this.minimum,to.srcmin);

            math.vec3Clone(this.maximum,to.maximum);
            math.vec3Clone(this.maximum,to.srcmax);
        }

        /**
        * @public
        * @language zh_CN
        * 获取包围盒顶点数据
        * @param vecs 引用数组
        * @version egret-gd3d 1.0
        * @platform Web,Native
        */
        public getVec3(vecs: gd3d.math.vector3[])
        {
            vecs[0] = math.pool.clone_vector3(this.minimum);
            vecs[1] = math.pool.clone_vector3(this.minimum);
            vecs[1].z = this.maximum.z;
            vecs[2] = math.pool.clone_vector3(this.minimum);
            vecs[2].x = this.maximum.x;
            vecs[3] = math.pool.clone_vector3(this.maximum);
            vecs[3].y = this.minimum.y;
            vecs[4] = math.pool.clone_vector3(this.minimum);
            vecs[4].y = this.maximum.y;
            vecs[5] = math.pool.clone_vector3(this.maximum);
            vecs[5].x = this.minimum.x;
            vecs[6] = math.pool.clone_vector3(this.maximum);
            vecs[6].z = this.minimum.z;
            vecs[7] = math.pool.clone_vector3(this.maximum);
        }

        /*
        public buildMesh(obj: gameObject)
        {
            var subTran = new gd3d.framework.transform();
            subTran.name = "boxcollider";
            var mesh = subTran.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;

            mesh.setMesh(this.getMesh(obj));
            var renderer = subTran.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;

            obj.transform.addChild(subTran);
            subTran.markDirty();//要标记自己脏了，才会更新
        }

        private getMesh(obj: gameObject): mesh
        {
            var _mesh: mesh = new mesh();
            var vecs: gd3d.math.vector3[] = [];
            this.getVec3(vecs);
            _mesh.data = gd3d.render.meshData.genBoxByArray_Quad(vecs);
            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal;
            var v32 = _mesh.data.genVertexDataArray(vf);
            var i16 = _mesh.data.genIndexDataArrayQuad2Line();
            var webgl = obj.getScene().webgl;

            _mesh.glMesh = new gd3d.render.glMesh();
            _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
            _mesh.glMesh.uploadVertexSubData(webgl, v32);

            _mesh.glMesh.addIndex(webgl, i16.length);
            _mesh.glMesh.uploadIndexSubData(webgl, 0, i16);
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
        */
    }
}