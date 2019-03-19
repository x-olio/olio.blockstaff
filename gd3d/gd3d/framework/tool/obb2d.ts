namespace gd3d.framework
{    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d定向包围盒
     * @version egret-gd3d 1.0
     */
    export class obb2d
    {
        private rotate:gd3d.math.angelref;
        private scale:gd3d.math.vector2;
        private center: gd3d.math.vector2;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 中心点偏移量
        * @version egret-gd3d 1.0
        */
        @reflect.Field("vector2")
        offset:gd3d.math.vector2;
        private halfWidth:number;
        private halfHeight:number;
        private directions :gd3d.math.vector2 [];
        private _size:gd3d.math.vector2;
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 包围盒大小
        * @version egret-gd3d 1.0
        */
        @reflect.Field("vector2")
        get size(){return this._size;}
        set size(size:gd3d.math.vector2){
            if(!size || !this._size)return;
            gd3d.math.vec2Clone(size,this._size);
            this.halfWidth = this._size.x/2;
            this.halfHeight = this._size.y/2;
        }
        
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 由最大最小点构建定向包围盒
        * @param center 中心点坐标
        * @param width 包围盒宽度
        * @param height 包围盒高度
        * @version egret-gd3d 1.0
        */
        buildByCenterSize(center:gd3d.math.vector2,width:number,height:number){
            this.center = gd3d.math.pool.clone_vector2(center);
            this.offset = gd3d.math.pool.new_vector2();
            this.scale = gd3d.math.pool.new_vector2();
            this.rotate = new gd3d.math.angelref();
            this._size = new gd3d.math.vector2(width,height);
            this.halfWidth = width/2;
            this.halfHeight = height/2;
            this.directions = [new gd3d.math.vector2(),new gd3d.math.vector2()];
        }
        
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 刷新定向包围盒
        * @param canvasWorldMtx Canvas世界矩阵
        * @version egret-gd3d 1.0
        */
        update(canvasWorldMtx:gd3d.math.matrix3x2){
            //getTranslation
            gd3d.math.matrix3x2Decompose(canvasWorldMtx,this.scale,this.rotate,this.center);
            let tranOffset = gd3d.math.pool.new_vector2();
            let scaleRotateMtx = gd3d.math.pool.new_matrix3x2();
            gd3d.math.matrix3x2Clone(canvasWorldMtx,scaleRotateMtx);
            scaleRotateMtx.rawData[4] = scaleRotateMtx.rawData[5] =0;  //消除位移
            gd3d.math.matrix3x2TransformVector2(scaleRotateMtx,this.offset,tranOffset);
            gd3d.math.vec2Add(this.center,tranOffset,this.center);
            
            //dirs
            this.directions[0].x = canvasWorldMtx.rawData[0];
            this.directions[0].y = canvasWorldMtx.rawData[1];
            this.directions[1].x = canvasWorldMtx.rawData[2];
            this.directions[1].y = canvasWorldMtx.rawData[3];
    
            gd3d.math.pool.delete_vector2(tranOffset);
            gd3d.math.pool.delete_matrix3x2(scaleRotateMtx);
        }
        
        /**
        * @public
        * @language zh_CN
        * @classdesc
        * obb2d的碰撞检测
        * @param _obb 待检测obb2d
        * @version egret-gd3d 1.0
        */
        intersects(_obb:obb2d){
            if (_obb == null) return false;
    
                var box0 = this;
                var box1 = _obb;
    
                if (!this.axisOverlap(box0.directions[0], box0, box1)) return false;
                if (!this.axisOverlap(box0.directions[1], box0, box1)) return false;
                if (!this.axisOverlap(box1.directions[0], box0, box1)) return false;
                if (!this.axisOverlap(box1.directions[1], box0, box1)) return false;
    
                return true;
        }
    
        private computeBoxExtents(axis: gd3d.math.vector2, box: obb2d)
        {
            var p = gd3d.math.vec2Dot(box.center, axis);
    
            var r0 = Math.abs(gd3d.math.vec2Dot(box.directions[0], axis)) * box.halfWidth;
            var r1 = Math.abs(gd3d.math.vec2Dot(box.directions[1], axis)) * box.halfHeight;
            var r = r0 + r1 ;
            
            var result = gd3d.math.pool.new_vector2();
            result.x = p - r;
            result.y = p + r;
            return result;
        }
    
        private axisOverlap(axis: gd3d.math.vector2, box0: obb2d, box1: obb2d): boolean
        {
            let result0 = this.computeBoxExtents(axis, box0);
            let result1 = this.computeBoxExtents(axis, box1);
            return this.extentsOverlap(result0.x, result0.y, result1.x, result1.y);
        }
    
        private extentsOverlap(min0: number, max0: number, min1: number, max1: number): boolean
        {
            return !(min0 > max1 || min1 > max0);
        }

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * 克隆一个obb
        * @version egret-gd3d 1.0
        */
        clone():obb2d
        {
            let _obb = new obb2d();
            _obb.center = math.pool.clone_vector2(this.center);
            _obb._size = math.pool.clone_vector2(this._size);
            _obb.halfWidth = this.halfWidth;
            _obb.halfHeight = this.halfHeight;
            _obb.scale = math.pool.clone_vector2(this.scale);
            _obb.rotate = new math.angelref();
            _obb.rotate.v = this.rotate.v;
            for(let key in this.directions)
            {
                 _obb.directions[key] = math.pool.clone_vector2(this.directions[key]);
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
            if(this.center) math.pool.delete_vector2(this.center);
            if(this._size) math.pool.delete_vector2(this._size);
            if(this.scale) math.pool.delete_vector2(this.scale);
            if(this.directions){
                this.directions.forEach(dir=>{
                    if(dir) math.pool.delete_vector2(dir);
                });
                this.directions.length = 0;
            }
        }
    }
}