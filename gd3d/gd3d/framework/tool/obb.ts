namespace gd3d.framework
{  
    let helpv3 = new math.vector3();
    let helpv3_1 = new math.vector3();
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 表示定向包围盒
     * @version egret-gd3d 1.0
     */
    export class obb
    {
        /** xyz 轴 方向  */
        private _directions:  math.vector3[] = [];
        /** 世界坐标顶半长 */
        private _halfSizeWorld:  math.vector3 = new math.vector3();
        /** 世界坐标顶点数据 */
        private _vectorsWorld:  math.vector3[] = new Array< math.vector3>();
        /** 世界坐标中心点 */
        private _worldCenter : math.vector3 = new math.vector3();
        /** 世界坐标矩阵 */
        private _worldMatrix :  math.matrix = new math.matrix();
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒中心坐标
        * @version egret-gd3d 1.0
        */
        center:  math.vector3;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒各轴向半长
        * @version egret-gd3d 1.0
        */
        halfsize:  math.vector3;
       
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒世界空间下各个点坐标
        * @version egret-gd3d 1.0
        */
        vectors:  math.vector3[] = new Array< math.vector3>();

        private static tag_wCenter = "tag_wCenter";
        private static tag_wVectors = "tag_wVectors";
        private static tag_wHalfSize = "tag_wHalfSize";
        private static tag_directions = "tag_directions";
        private static tags = [obb.tag_wCenter,obb.tag_wVectors,obb.tag_wHalfSize,obb.tag_directions];
        private dirtyMap = {};

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒世界空间下各个点坐标
        * @version egret-gd3d 1.0
        */
        get vectorsWorld(){
            let needInit = this._vectorsWorld.length < 1;
            if(needInit){
                for(let i= 0 ;i < 8 ;i++){
                    this._vectorsWorld.push(new math.vector3());
                }
            }

            if(this.dirtyMap[obb.tag_wVectors] || needInit) {
                let wMtx = this.getWorldMatrix();
                for(let i= 0 ;i < 8 ;i++){
                    math.matrixTransformVector3(this.vectors[i], wMtx , this._vectorsWorld[i]);
                }

                this.dirtyMap[obb.tag_wVectors] = false;
            }

            return this._vectorsWorld;
        }

         /**
        * @public
        * @language zh_CN
        * @classdesc
        * 在世界空间的中心点
        * @version egret-gd3d 1.0
        */
        get worldCenter(){
            if(this.dirtyMap[obb.tag_wCenter]){
                math.matrixTransformVector3(this.center,this._worldMatrix,this._worldCenter);
                this.dirtyMap[obb.tag_wCenter] = false;
            }
            return this._worldCenter; 
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒在世界坐标中各轴向半长
        * @version egret-gd3d 1.0
        */
        get halfSizeWorld(){
            if(this.dirtyMap[obb.tag_wHalfSize]){
                let wVects = this.vectorsWorld;
                let wMin = helpv3;
                let wMax = helpv3_1;
                math.vec3SetAll(wMin , Number.MAX_VALUE);
                math.vec3SetAll(wMax , -Number.MAX_VALUE);

                for(let i=0;i < 8 ;i++){
                    let p = wVects[i];
                    wMin.x = p.x < wMin.x  ?  p.x : wMin.x;
                    wMin.y = p.y < wMin.y  ?  p.y : wMin.y;
                    wMin.z = p.z < wMin.z  ?  p.z : wMin.z;

                    wMax.x = p.x > wMax.x ? p.x : wMax.x;
                    wMax.y = p.y > wMax.y ? p.y : wMax.y;
                    wMax.z = p.z > wMax.z ? p.z : wMax.z;
                }

                math.vec3Subtract(wMax,wMin,this._halfSizeWorld);
                math.vec3ScaleByNum(this._halfSizeWorld, 0.5 ,this._halfSizeWorld);

                this.dirtyMap[obb.tag_wHalfSize] = false;
            }
            return this._halfSizeWorld; 
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * x,y,z 轴方向 
        * @version egret-gd3d 1.0
        */
        get directions(){
            if(this.dirtyMap[obb.tag_directions]){
                math.matrixGetVector3ByOffset(this._worldMatrix, 0, this._directions[0]);
                math.matrixGetVector3ByOffset(this._worldMatrix, 4, this._directions[1]);
                math.matrixGetVector3ByOffset(this._worldMatrix, 8, this._directions[2]);
                this.dirtyMap[obb.tag_directions] = false;
            }
            return this._directions;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 获取obb世界矩阵
        * @version egret-gd3d 1.0
         */
        getWorldMatrix(){
            return this._worldMatrix;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 由最大最小点构建定向包围盒
        * @param minimum 最小点坐标
        * @param maximum 最大点坐标
        * @version egret-gd3d 1.0
        */
        buildByMaxMin(minimum:  math.vector3, maximum:  math.vector3)
        {
            this.vectors[0] = math.pool.clone_vector3(minimum);
            this.vectors[1] = math.pool.clone_vector3(minimum);
            this.vectors[1].z = maximum.z;
            this.vectors[2] = math.pool.clone_vector3(minimum);
            this.vectors[2].x = maximum.x;
            this.vectors[3] = math.pool.clone_vector3(maximum);
            this.vectors[3].y = minimum.y;
            this.vectors[4] = math.pool.clone_vector3(minimum);
            this.vectors[4].y = maximum.y;
            this.vectors[5] = math.pool.clone_vector3(maximum);
            this.vectors[5].x = minimum.x;
            this.vectors[6] = math.pool.clone_vector3(maximum);
            this.vectors[6].z = minimum.z;
            this.vectors[7] = math.pool.clone_vector3(maximum);

            this.center = new  math.vector3();
             math.vec3Add(maximum, minimum, this.center);
             math.vec3ScaleByNum(this.center, 0.5, this.center);

            this.halfsize = new  math.vector3();
             math.vec3Subtract(maximum, minimum, this.halfsize);
             math.vec3ScaleByNum(this.halfsize, 0.5, this.halfsize);

            this._directions = [new  math.vector3(), new  math.vector3(), new  math.vector3()];
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 由中心点和各轴向长度构建定向包围盒
        * @param center 中心点坐标
        * @param size 各轴向长度
        * @version egret-gd3d 1.0
        */
        buildByCenterSize(center: math.vector3, size: math.vector3)
        {
            this.center = math.pool.clone_vector3(center);
            this.halfsize = math.pool.clone_vector3(size);
             math.vec3ScaleByNum(this.halfsize, 0.5, this.halfsize);
            let hsx = this.halfsize.x;
            let hsy = this.halfsize.y;
            let hsz = this.halfsize.z;
            let cenx = this.center.x;
            let ceny = this.center.y;
            let cenz = this.center.z;
            this.vectors[0] = new math.vector3(cenx - hsx, ceny - hsy, cenz - hsz);
            this.vectors[1] = new math.vector3(cenx - hsx, ceny - hsy, cenz + hsz);
            this.vectors[2] = new math.vector3(cenx + hsx, ceny - hsy, cenz - hsz);
            this.vectors[3] = new math.vector3(cenx + hsx, ceny - hsy, cenz + hsz);
            this.vectors[4] = new math.vector3(cenx - hsx, ceny + hsy, cenz - hsz);
            this.vectors[5] = new math.vector3(cenx - hsx, ceny + hsy, cenz + hsz);
            this.vectors[6] = new math.vector3(cenx + hsx, ceny + hsy, cenz - hsz);
            this.vectors[7] = new math.vector3(cenx + hsx, ceny + hsy, cenz + hsz);
            this._directions = [new  math.vector3(), new  math.vector3(), new  math.vector3()];
        }
        
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 刷新定向包围盒
        * @param worldmatrix 物体的世界矩阵
        * @version egret-gd3d 1.0
        */
        public update(worldmatrix: math.matrix)
        {
            if(!worldmatrix) return;
            let isDirty = !math.matrixEqual(this._worldMatrix,worldmatrix );

            if(!isDirty){
                return;
            }else{
                math.matrixClone(worldmatrix , this._worldMatrix);
                obb.tags.forEach(tag => {
                    this.dirtyMap[tag] = true;
                });
            }
        }

        /**
         * @public
         * @language zh_CN
         * @param bound 碰撞体
         * @classdesc
         * 碰撞体检测碰撞
         * @version egret-gd3d 1.0
         */
        public intersects(bound: any)
        {
            if (!bound) return false;
            if(bound instanceof obb)
            {
                return collision.obbVsObb(bound,this);
            }else if(bound instanceof spherestruct)
            {
                return collision.obbVsSphere(this,bound);
            }

        }

        /**
         * @public
         * @language zh_CN
         * @param axis 指定轴
         * @param out 长度范围
         * @classdesc
         * 计算到指定轴上投影的长度
         * @version egret-gd3d 1.0
         */
        computeExtentsByAxis(axis: math.vector3 , out : math.vector2){
            let p =  math.vec3Dot(this.worldCenter, axis);
            let dirs = this.directions;
            let size = this.halfSizeWorld; 

            let r0 = Math.abs( math.vec3Dot(dirs[0], axis)) * size.x;
            let r1 = Math.abs( math.vec3Dot(dirs[1], axis)) * size.y;
            let r2 = Math.abs( math.vec3Dot(dirs[2], axis)) * size.z;
            let r = r0 + r1 + r2;
            out.x = p - r;
            out.y = p + r;
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 克隆一个obb
        * @version egret-gd3d 1.0
        */
        clone():obb
        {
            let _obb = new obb();
            _obb.center = math.pool.clone_vector3(this.center);
            _obb.halfsize = this.halfsize;
            for(let key in this._directions)
            {
                 _obb._directions[key] = math.pool.clone_vector3(this._directions[key]);
            }

            _obb._worldMatrix = math.pool.clone_matrix(this._worldMatrix);
            _obb._halfSizeWorld = math.pool.clone_vector3(this._halfSizeWorld);
            _obb._worldCenter = math.pool.clone_vector3(this._worldCenter);
            _obb.vectors = [];
            _obb._vectorsWorld = [];
            for(let i=0 ; i < 8; i++)
            {
                _obb.vectors[i] = this.vectors[i];
                _obb._vectorsWorld[i] = this._vectorsWorld[i];
            }
            _obb.dirtyMap = {};
            for(const key in this.dirtyMap){
                _obb.dirtyMap[key] = this.dirtyMap[key] 
            }

            return _obb;
        }
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 释放
        * @version egret-gd3d 1.0
        */
        dispose()
        {
            this.vectors.length = 0;
            this._directions.length = 0;
            this.dirtyMap = null;
            this._halfSizeWorld = null;
            this._vectorsWorld.length = 0;
            this._worldCenter = null;
            this._worldMatrix = null;
        }
    }

}