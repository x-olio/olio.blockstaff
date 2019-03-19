namespace gd3d.framework {
    class nodePool {
        private static nodelist: qtNode[] = [];
        static new_node(bounds: math.rect, level: number = 0) {
            let n = this.nodelist.pop();
            if(n){
                n.bounds = bounds;
                n.level = level;
            }else
                n = new qtNode(bounds,level);
            
            return n;
        }
        static delete_node(n: qtNode) {
            if (!n) return;
            n.level = 0;
            n.nodes.length = n.objects.length = 0;
            gd3d.math.pool.delete_rect(n.bounds);
            this.nodelist.push(n);
        }
    }

    /**
     * 四叉树节点
     */
    class qtNode {
        objects: math.rect[] = []; //物体对象容器
        nodes: qtNode[] = []; //四个象限对应的子节点
        level: number; //该节点的深度 ， 根节点为0
        bounds: math.rect; //该节点的范围
        constructor(bounds: math.rect, level: number = 0) {
            this.level = isNaN(level) || level < 0 ? 0 : level;
            this.bounds = bounds;
        }

        /**
         * 分裂,拆分到子节点
         */
        private split() {
            let level = this.level;
            let bounds = this.bounds;
            let sWidth = bounds.w / 2;
            let sHeight = bounds.h / 2;
            let x = bounds.x;
            let y = bounds.y;
            let cx = x + sWidth;
            let cy = y + sHeight;

            let r_0 = gd3d.math.pool.new_rect(cx, y, sWidth, sHeight);
            let r_1 = gd3d.math.pool.new_rect(x, y, sWidth, sHeight);
            let r_2 = gd3d.math.pool.new_rect(x, cy, sWidth, sHeight);
            let r_3 = gd3d.math.pool.new_rect(cx, cy, sWidth, sHeight);
            this.nodes.push(
                nodePool.new_node(r_0, level + 1),
                nodePool.new_node(r_1, level + 1),
                nodePool.new_node(r_2, level + 1),
                nodePool.new_node(r_3, level + 1)
            );
        }

        /**
         * 清空所有子节点
         */
        clear() {
            let nodes = this.nodes;
            this.objects.splice(0, this.objects.length);
            while (nodes.length) {
                let subnode = nodes.shift();
                subnode.clear();
                nodePool.delete_node(subnode);
            }
        }

        /**
         * 获取象限号
         * @param rect 矩形区域
         * @param checkIsInner 检查是否在内部，没有溢出象限界限
         */
        private getIndex(rect: math.rect, checkIsInner = false) {
            let bounds = this.bounds;
            let cx = bounds.x + (bounds.w / 2);
            let cy = bounds.y + (bounds.h / 2);
            let onTop = (bounds.y + rect.h) <= cy;
            let onBottom = rect.y > cy;
            let onLeft = (bounds.x + rect.w) <= cx;
            let onRight = rect.x > cx;

            // 检测矩形是否溢出象限界限
            if (checkIsInner &&
                (Math.abs(rect.x - bounds.x) + (rect.w / 2) > (bounds.w / 2) ||
                    Math.abs(rect.y - bounds.y) + (rect.h / 2)>  (bounds.h / 2))) {
                return -1;
            }

            if (onTop) {
                if (onRight) {
                    return 0;
                } else if (onLeft) {
                    return 1;
                }
            } else if (onBottom) {
                if (onLeft) {
                    return 2;
                } else if (onRight) {
                    return 3;
                }
            }

            return -1;
        }

        /**
        * @public
        * @language zh_CN
        * 插入节点
        * @param rect 矩形区域
        * @version egret-gd3d 1.0
        */
        insert(rect: math.rect, maxObjNum: number, maxLevel: number) {
            let objs = this.objects;
            let index;

            if (this.nodes.length) {
                index = this.getIndex(rect,true);
                if (index != -1) {
                    this.nodes[index].insert(rect, maxObjNum, maxLevel);
                    return;
                }
            }
            objs.push(rect);

            if (!this.nodes.length &&
                this.objects.length > maxObjNum &&
                this.level < maxLevel) {
                this.split();
                for (let i = objs.length - 1; i >= 0; i--) {
                    index = this.getIndex(objs[i],true);
                    if (index !== -1) {
                        this.nodes[index].insert(objs.splice(i, 1)[0], maxObjNum, maxLevel);
                    }
                }
            }
        }

        private concatToArr(targetArr: math.rect[], addArr: math.rect[]) {
            if (!targetArr || !addArr) return;
            addArr.forEach(sub => {
                if (sub) targetArr.push(sub);
            });
        }

        retrieve(rect: math.rect, outRects: math.rect[]) {
            let arr;
            let index;
            if (this.level === 0) outRects.length = 0;
            // concatArr(result, this.objects);
            this.concatToArr(outRects, this.objects);

            if (this.nodes.length) {
                index = this.getIndex(rect);
                if (index !== -1) {
                    this.nodes[index].retrieve(rect, outRects);
                } else {
                    // arr = rect.carve(this.bounds.cX, this.bounds.cY);
                    let cx = this.bounds.x + (this.bounds.w / 2);
                    let cy = this.bounds.y + (this.bounds.h / 2);
                    arr = this.rectCarve(rect, cx, cy);
                    for (let i = arr.length - 1; i >= 0; i--) {
                        index = this.getIndex(arr[i]);
                        if(index != -1){
                            this.nodes[index].retrieve(rect, outRects);
                        }
                    }
                    arr.forEach(element => {
                        if(element) gd3d.math.pool.delete_rect(element);
                    });
                }
            }
        }

        /**
         * 分割矩形
         * @param src 
         * @param cx 
         * @param cy 
         */
        private rectCarve(src: math.rect, cx: number, cy: number): math.rect[] {
            let result : math.rect [] = [];
            let temps : math.rect [] = [];
            let dX = cx - src.x;
            let dY = cy - src.y;
            let carveX = dX > 0 && dX < src.w;
            let carveY = dY > 0 && dY < src.h;

            // 切割XY方向
            if (carveX && carveY) {
                temps = this.rectCarve( src , cx, src.y);
                while (temps.length) {
                    let temp = temps.pop();
                    this.concatToArr(result, this.rectCarve( temp , src.x , cy) );
                }

            // 只切割X方向
            } else if (carveX) {
                result.push(
                    gd3d.math.pool.new_rect(src.x, src.y, dX, src.h),
                    gd3d.math.pool.new_rect(cx, src.y, src.w - dX, src.h)
                );
            
            // 只切割Y方向
            } else if (carveY) {
                result.push(
                    gd3d.math.pool.new_rect(src.x, src.y, src.w, dY),
                    gd3d.math.pool.new_rect(src.x, cy, src.w, src.h - dY)
                );
            }

            return result;
        }

    }


    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 四叉树
     * @version egret-gd3d 1.0
     */
    export class quadTree {
        private rootNode: qtNode; //root节点
        private readonly MAX_OBJECTS: number; //每个节点(象限) 能包含的最大物体数量
        private readonly MAX_LEVELS: number; //树的最大深度
        /**
         * @public
         * @language zh_CN
         * 四叉树
         * @param bounds 全局的矩形范围
         * @param maxObjNum 每个节点(象限) 能包含的最大物体数量
         * @param maxLevel 树的最大深度
         * @version egret-gd3d 1.0
         */
        constructor(bounds: math.rect, maxObjNum: number = 5, maxLevel: number = 5) {
            this.rootNode = new qtNode(bounds, 0);
            this.MAX_OBJECTS = maxObjNum;
            this.MAX_LEVELS = maxLevel;
        }

        /**
        * @public
        * @language zh_CN
        * 插入节点
        * @param rect 矩形区域
        * @version egret-gd3d 1.0
        */
        insert(rect: math.rect) {
            this.rootNode.insert(rect, this.MAX_OBJECTS, this.MAX_LEVELS);
        }


        private cacheArr: math.rect[] = [];
        /**
         * @public
         * @language zh_CN
         * 检索结果
         * @param bounds 检测矩形
         * @param outRects 返回结果矩形数组
         * @version egret-gd3d 1.0
         */
        retrieve(bounds: math.rect ,  outRects: math.rect[] ){
            if(!bounds || !outRects)    return;
            outRects.length = 0;
            this.rootNode.retrieve(bounds, outRects );
        }

        /**
        * @public
        * @language zh_CN
        * 清理所有节点
        * @version egret-gd3d 1.0
        */
        clear(){
            if(! this.rootNode) return;
            this.rootNode.clear();
        }
    }
}