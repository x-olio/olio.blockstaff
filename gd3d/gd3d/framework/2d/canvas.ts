/// <reference path="../../io/reflect.ts" />
/// <reference path="../../render/struct.ts" />

namespace gd3d.framework
{
    let helpv2 = new math.vector2();

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d批处理类
     * @version egret-gd3d 1.0
     */
    export class batcher2D
    {
        private mesh: render.glMesh;
        private drawMode: render.DrawModeEnum;
        private vboCount: number = 0;
        private curPass: render.glDrawPass;

        private eboCount: number = 0;
        private dataForVbo: Float32Array;
        private dataForEbo: Uint16Array;

        /**
         * @private
         */
        initBuffer(webgl: WebGLRenderingContext, vf: render.VertexFormatMask, drawMode: render.DrawModeEnum)
        {
            this.mesh = new render.glMesh();
            this.mesh.initBuffer(webgl, vf, 128, render.MeshTypeEnum.Dynamic);
            this.dataForVbo = new Float32Array(128);
            this.drawMode = drawMode;
            if (drawMode == render.DrawModeEnum.EboLine || drawMode == render.DrawModeEnum.EboTri)
            {
                this.mesh.addIndex(webgl, 128);
                this.dataForEbo = new Uint16Array(128);
            }
        }

        /**
         * @private
         */
        begin(webgl: WebGLRenderingContext, pass: render.glDrawPass)
        {
            // if (mat == this.curmaterial) return;
            //这明显是个bug,pass即使一样，也可能要重绘
            if (this.vboCount > 0)
                this.end(webgl);
            this.curPass = pass;

            this.vboCount = 0; //不清理会缓存
        }

        //buffer 最大限制
        private static limitCount = 2048 * 64; 
        /**
         * @private
         */
        push(webgl: WebGLRenderingContext, vbodata: number[], ebodata: number[])
        {
            if (this.vboCount + vbodata.length > batcher2D.limitCount
                ||
                (ebodata != null && this.eboCount + ebodata.length > batcher2D.limitCount))
            {
                this.end(webgl);
                this.dataForVbo
            }

            if (this.vboCount + vbodata.length > this.dataForVbo.length)
            {
                let narr = new Float32Array(this.dataForVbo.length * 2);
                for (var i = 0; i < this.dataForVbo.length; i++)
                {
                    narr[i] = this.dataForVbo[i];
                }
                this.dataForVbo = narr;
                this.mesh.resetVboSize(webgl, this.dataForVbo.length);
            }
            for (var i = 0; i < vbodata.length; i++)
            {
                this.dataForVbo[this.vboCount + i] = vbodata[i];
            }
            this.vboCount += vbodata.length;

            if (this.drawMode == render.DrawModeEnum.VboLine || this.drawMode == render.DrawModeEnum.VboTri)
                return;

            if (ebodata != null)
            {
                if (this.eboCount + ebodata.length > this.dataForEbo.length)
                {
                    let narr = new Uint16Array(this.dataForEbo.length * 2);
                    for (var i = 0; i < this.dataForEbo.length; i++)
                    {
                        narr[i] = this.dataForEbo[i];
                    }
                    this.dataForEbo = narr;
                    this.mesh.resetEboSize(webgl, 0, this.dataForEbo.length);
                }
                for (var i = 0; i < ebodata.length; i++)
                {
                    this.dataForEbo[this.eboCount + i] = ebodata[i];
                }
                this.eboCount += ebodata.length;
            }



        }

        /**
         * @private
         */
        end(webgl: WebGLRenderingContext)
        {
            if (this.vboCount == 0) return;
            this.mesh.uploadVertexData(webgl, this.dataForVbo);
            if (this.eboCount > 0){
                this.mesh.uploadIndexData(webgl, 0, this.dataForEbo);
            }

            var vertexcount = (this.vboCount / (this.mesh.vertexByteSize / 4)) | 0;
            this.curPass.use(webgl);
            this.mesh.bind(webgl, this.curPass.program, (this.drawMode == render.DrawModeEnum.EboLine || this.drawMode == render.DrawModeEnum.EboTri) ? 0 : -1);
            DrawCallInfo.inc.add();
            if (this.drawMode == render.DrawModeEnum.EboLine)
            {
                this.mesh.drawElementLines(webgl, 0, this.eboCount);
            }
            else if (this.drawMode == render.DrawModeEnum.EboTri)
            {
                this.mesh.drawElementTris(webgl, 0, this.eboCount);
            }
            else if (this.drawMode == render.DrawModeEnum.VboLine)
            {
                this.mesh.drawArrayLines(webgl, 0, vertexcount);
            }
            else if (this.drawMode == render.DrawModeEnum.VboTri)
            {
                this.mesh.drawArrayTris(webgl, 0, vertexcount);
            }
            this.vboCount = 0;
            this.eboCount = 0;
        }
    }


    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d节点的容器类
     * @version egret-gd3d 1.0
     */
    @gd3d.reflect.SerializeType
    export class canvas
    {
        static readonly ClassName:string="canvas";

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 构造函数
         * @version egret-gd3d 1.0
         */
        constructor()
        {
            this.rootNode = new transform2D();
            this.rootNode.canvas = this;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 用于区分当前容器是在overlay(2D)还是canvasrenderer(3D)下
         * @version egret-gd3d 1.0
         */
        is2dUI: boolean = true;
        
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * UI绘制使用深度排序规则 
         * (可以降低drawcall , 但是会一定程度增加CPU计算量,视情况使用)
         * @version egret-gd3d 1.0
         */
        isDrawByDepth = false;
        
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 如果是在canvasrenderer下，这里可以获取到canvasrenderer所在的transform节点
         * @version egret-gd3d 1.0
         */
        parentTrans: transform;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 2d批处理类，用来收集2d节点，完成绘制
         * @version egret-gd3d 1.0
         */
        batcher: batcher2D;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * webgl实例
         * @version egret-gd3d 1.0
         */
        webgl: WebGLRenderingContext;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 当前所在场景
         * @version egret-gd3d 1.0
         */
        scene: scene;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 添加2d节点
         * @param node 要添加的2d节点实例
         * @version egret-gd3d 1.0
         */
        addChild(node: transform2D)
        {
            this.rootNode.addChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 移除2d节点
         * @param node 要移除的2d节点实例
         * @version egret-gd3d 1.0
         */
        removeChild(node: transform2D)
        {
            this.rootNode.removeChild(node);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取所有孩子节点
         * @version egret-gd3d 1.0
         */
        getChildren(): transform2D[]
        {
            return this.rootNode.children;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取孩子节点的数量
         * @version egret-gd3d 1.0
         */
        getChildCount(): number
        {
            if (this.rootNode.children == null) return 0;
            return this.rootNode.children.length;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取指定的孩子节点
         * @param index 位置索引
         * @version egret-gd3d 1.0
         */
        getChild(index: number): transform2D
        {
            return this.rootNode.children[index];
        }

        private pointDown: Boolean = false;
        private pointEvent: PointEvent = new PointEvent();
        private pointX: number = 0;
        private pointY: number = 0;

        private lastWidth = 0;
        private lastHeight = 0;
        
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 更新
         * @param delta 两次update的间隔时间
         * @param touch 是否接收到事件
         * @param XOnModelSpace 模型空间下的x偏移
         * @param YOnModelSpace 模型空间下的y偏移
         * @version egret-gd3d 1.0
         */
        update(delta: number, touch: Boolean, XOnModelSpace: number, YOnModelSpace: number)
        {
            //canvas 的空间是左上角(-asp,1)-(asp,-1),和屏幕空间一致
            //右下角是 1*asp，1
            //这里有点状况，不应该乘以
            var asp = this.pixelWidth / this.pixelHeight;
            this.rootNode.localScale.x = 2 / this.pixelWidth;
            this.rootNode.localScale.y = -2 / this.pixelHeight;
            this.rootNode.localTranslate.y = 1;
            this.rootNode.localTranslate.x = -1;

            if(this.pixelWidth != this.lastWidth || this.pixelHeight != this.lastHeight){
                this.lastWidth = this.rootNode.width = this.pixelWidth;
                this.lastHeight = this.rootNode.height = this.pixelHeight;
                this.rootNode.markDirty();
            }

            this.rootNode.pivot.x = 0;
            this.rootNode.pivot.y = 0;
            
            {//updateinput
                //重置event
                this.pointEvent.eated = false;
                helpv2.x = this.pointEvent.x = XOnModelSpace;
                helpv2.y = this.pointEvent.y = YOnModelSpace;
                this.pointEvent.selected = null;
                this.ModelPosToCanvasPos(helpv2,helpv2);
                this.pointEvent.c_x = helpv2.x;
                this.pointEvent.c_y = helpv2.y;
                var skip = false;
                if (this.pointDown == false && touch == false)//nothing
                {
                    skip = true;
                }
                else if (this.pointDown == false && touch == true)//pointdown
                {
                    this.pointEvent.type = event.PointEventEnum.PointDown;
                }
                else if (this.pointDown == true && touch == true)//pointhold
                {
                    this.pointEvent.type = event.PointEventEnum.PointHold;
                    // if (this.pointX == this.pointEvent.x && this.pointY == this.pointEvent.y)
                    // {
                    //     // console.log("skip event");
                    //     skip = true;
                    // }
                }
                else if (this.pointDown == true && touch == false)//pointup
                {
                    this.pointEvent.type = event.PointEventEnum.PointUp;
                }
                //事件走的是flash U型圈
                if (!skip)
                {
                    if(this.scene.app.bePlay){
                        this.rootNode.onCapturePointEvent(this, this.pointEvent);
                        this.rootNode.onPointEvent(this, this.pointEvent);
                    }
                    this.pointDown = touch;
                    this.pointX = this.pointEvent.x;
                    this.pointY = this.pointEvent.y;
                }
            }

            this.rootNode.updateTran(false);
            //this.rootNode.update(delta);
            if (this.scene.app.bePlay)
            {
                this.objupdate(this.rootNode,delta);
            }
        }


        private objupdate(node: transform2D, delta){
            if(!node.visible) return;

            node.init(this.scene.app.bePlay);//组件还未初始化的初始化
            if (node.components.length > 0)
            {
                node.update(delta);
            }

            if (node.children != null)
            {
                for (let i = 0; i < node.children.length; i++)
                {
                    this.objupdate(node.children[i], delta);
                }
            }
        }

        private lastMat: material;
        //static defmat: material;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染完成后的回调
         * @version egret-gd3d 1.0
         */
        public afterRender: Function;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染前回调
         * @version egret-gd3d 1.0
         */
        public beforeRender: Function;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 渲染
         * @param context 渲染上下文
         * @param assetmgr 资源管理类的实例
         * @version egret-gd3d 1.0
         */
        render(context: renderContext, assetmgr: assetMgr)
        {
            DrawCallInfo.inc.currentState=DrawCallEnum.UI;
            this.context = context;
            this.assetmgr = assetmgr;
            // context.updateModel(this.gameObject.transform);
            this.lastMat = null;

            // if (canvasRenderer.defmat == null)
            // {
            //     canvasRenderer.defmat = new material();
            //     canvasRenderer.defmat.setShader(assetmgr.getShader("shader/defui"));
            // }
            if (this.batcher == null)
            {
                this.webgl = context.webgl;
                this.batcher = new batcher2D();
                var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0 | gd3d.render.VertexFormatMask.ColorEX;
                this.batcher.initBuffer(context.webgl, vf, render.DrawModeEnum.VboTri);


            }

            //this.pushDrawData(canvas.defmat, this.vbod);

            if(this.beforeRender != null)
                this.beforeRender();

            //begin
            if(!this.isDrawByDepth){
                this.drawScene(this.rootNode, context, assetmgr);
            }
            else{
                this.drawSceneByDepth(this.rootNode, context, assetmgr);
            }

            this.batcher.end(context.webgl);

            
            if (this.afterRender != null)
                this.afterRender();
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 提交原始数据</p>
         * 所有的2d渲染组件将数据提交到这里</p>
         * 最后由批处理完成绘制
         * @param mat 材质
         * @param data 2d渲染组件的顶点数据
         * @version egret-gd3d 1.0
         */
        pushRawData(mat: material, data: number[])
        {
            if (mat != this.lastMat)
            {
                this.lastMat = mat;
                this.batcher.end(this.webgl);
                let pass = this.lastMat.getShader().passes["base"][0];

                //有一些自动参数要传进去
                //mat.setMatrix("glstate_matrix_mvp", this.context.matrixModelViewProject);

                //mat.uploadUniform(pass);
                // //mvp 信号
                pass.use(this.webgl);
                mat.uploadUnifoms(pass,this.context);

                // this.batcher.begin(context.webgl, pass);

                // this.batcher.push(context.webgl, this.vbod, null);
                // this.batcher.end(context.webgl);
                this.batcher.begin(this.webgl, pass);
            }else{
                let msta = mat.statedMapUniforms["MaskState"]; 
                let mr = mat.statedMapUniforms["_maskRect"];
                if(msta != null && msta.value != null && mr != null && mr.value != null){
                    let rect = mr.value as math.vector4;
                    if(this.lastMaskV4 == null) this.lastMaskV4 = new math.vector4();
                    if(msta.value != this.lastMaskSta || this.lastMaskV4.x != rect.x || this.lastMaskV4.y != rect.y || this.lastMaskV4.z != rect.z || this.lastMaskV4.w != rect.w){
                        this.lastMaskSta = msta.value;
                        math.vec4Clone(rect,this.lastMaskV4);
                        this.batcher.end(this.webgl);
                        let pass = this.lastMat.getShader().passes["base"][0];
                        //mat.uploadUniform(pass);
                        mat.uploadUnifoms(pass,this.context);
                    }
                }
            }
            
            this.batcher.push(this.webgl, data, null);
        }
        private context: renderContext;

        private lastMaskSta:number = -1;
        private lastMaskV4:math.vector4;
        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 资源管理类的实例
         * @version egret-gd3d 1.0
         */
        assetmgr: assetMgr;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 绘制2d节点
         * @param node 要绘制的2d节点
         * @param context 渲染上下文
         * @param assetmgr 资源管理类的实例
         * @version egret-gd3d 1.0
         */
        drawScene(node: transform2D, context: renderContext, assetmgr: assetMgr)
        {
            //context.updateModel(this.gameObject.transform);
            if(!node.visible)return;
            if (node.renderer != null)
            {
                node.renderer.render(this);
            }
            if (node.children != null)
            {
                for (var i = 0; i < node.children.length; i++)
                {
                    this.drawScene(node.children[i], context, assetmgr);
                }
            }
        }

        //深度渲染层列表
        static readonly depthTag = "__depthTag__";
        static readonly flowIndexTag = "__flowIndexTag__";
        private rendererDic : {[fIdx:number]: IRectRenderer} = {}; //渲染对象字典容器
        private depthList : IRectRenderer[][] = [];
        private sortedList : IRectRenderer[] = [];
        private canvasBounds : math.rect = new math.rect(); //canvas 全局边框矩形
        private readonly qt_maxObjNum =  5; //四叉树节点最大的对象数量
        private readonly qt_maxlevel=  6; //四叉树最大的深度
        private depthQTree : quadTree ; //深度的四叉树
        /** 按深度层 合批渲染 */
        private drawSceneByDepth(node: transform2D, context: renderContext, assetmgr: assetMgr){
            //更新 canvasBounds
            this.canvasBounds.w = this.pixelWidth;
            this.canvasBounds.h = this.pixelHeight;
            if(!this.depthQTree) this.depthQTree = new quadTree(this.canvasBounds , this.qt_maxObjNum, this.qt_maxlevel);
            this.depthQTree.clear();

            //所有Renderer 计算 深度
                
            this.flowCount = 0;
            //test 
            this.collectToDepthL(node);

            //按队列顺序 逐各渲染
            this.sortDepthList();

            this.sortedList.forEach(rnode=>{
                if(rnode) rnode.render(this);
            });

            this.depthList.length = this.sortedList.length = 0;
        }


        private helpMap : {[id:number]:IRectRenderer[]} = {};
        /** 排序Depth列表 */
        private sortDepthList(){
            let len = this.depthList.length;
            let lastGuid : number = -1;
            let idList : number[] = [];
            for(let i = 0 ;i < len ;i++){
                idList.length = 0;
                //逐层按相同材质连续排序 
                //不同层首尾连接规则 1.队列头部 放置 和上一层同材质类型 2.尾部放置 数量最多的类型 

                let arr = this.depthList[i];
                let tempM = {};
                arr.forEach((rn,idx)=>{
                    if(rn && rn.getMaterial()){
                        let guid = rn.getMaterial().getGUID();
                        if(!this.helpMap[guid]) this.helpMap[guid] = [];
                        this.helpMap[guid].push(rn);
                        if(!tempM[guid]){
                            idList.push(guid);
                            tempM[guid] = true;
                        }
                    }
                });       
                
                //排序  1.队列头部 放置 和上一层同材质类型 2.尾部放置 数量最多的类型 
                //1.队列头部 放置 和上一层同材质类型
                if(lastGuid != -1 && this.helpMap[lastGuid] && this.helpMap[lastGuid].length > 0 ){
                    let sidx = idList.indexOf(lastGuid);
                    if(sidx != -1)  idList.splice(sidx,1);
                    idList.unshift(lastGuid);
                }

                //2.尾部放置 数量最多的类型
                let tempLastLen = 0;
                let endGuid = -1;
                for(const key in this.helpMap){
                    let temparr = this.helpMap[key];
                    if(temparr && temparr.length > tempLastLen){
                        endGuid = Number(key);
                        tempLastLen = temparr.length;
                    }
                }
                //尾部 ,优先 头部规则
                if(lastGuid != endGuid  && endGuid != -1 && !isNaN(endGuid) ){
                    let sidx = idList.indexOf(endGuid);
                    if(sidx != -1)  idList.splice(sidx,1);
                    idList.push(endGuid);
                }

                idList.forEach(id=>{
                    let rArr = this.helpMap[id];
                    if(rArr && rArr.length > 0){
                        rArr.forEach(rn=>{
                            if(rn) this.sortedList.push(rn);
                        });
                    }
                });

                if(idList.length > 0){
                    lastGuid = idList[idList.length -1];
                }

                //清理map
                for(const key in this.helpMap){
                    let temparr = this.helpMap[key];
                    if(temparr) temparr.length = 0;
                }
            }

            this.helpMap = {};
        }

        private flowCount : number;
        /**收集到深度列表 */
        private collectToDepthL (node: transform2D){
            if(!node.visible)return;
            if (node.renderer)
            {
                let bounds = node.renderer.getDrawBounds();
                bounds[canvas.flowIndexTag] = this.flowCount;
                this.rendererDic[this.flowCount] = node.renderer; //引用 存入字典
                this.checkBottomUI(node.renderer);
                this.flowCount ++;
            }

            if (node.children)
            {
                for (let i = 0; i < node.children.length; i++)
                {
                    this.collectToDepthL(node.children[i]);
                }
            }
        }

        /**
         * 检查BottomUI 
         */
        private checkBottomUI (rd: IRectRenderer){
            //检测 bottomUI  (逐当前 depthList 层检测 rect 碰撞 ，优化工具 四叉树 )
            //无 ，depth = 0
            //有 ，depth = bottomUI.depth + 1 
            let tempCup : math.rect []  = [];
            let myr = rd.getDrawBounds();
            this.depthQTree.retrieve(myr,tempCup);
            let lastIdx = -1;
            //确定 深度
            while(tempCup.length > 0){
                let temp = tempCup.pop();
                if(math.rectCollided(temp,myr)){
                    if(temp[canvas.flowIndexTag] > lastIdx){
                        lastIdx = temp[canvas.flowIndexTag];
                        if(temp[canvas.flowIndexTag] == (myr[canvas.flowIndexTag] - 1)) break; //相邻的bottomUI ，其他不用找了
                    }
                }
            }

            let depth = 0
            if(lastIdx != -1){
                let wrd = this.rendererDic[lastIdx];
                depth = wrd[canvas.depthTag] + 1;
            }

            rd[canvas.depthTag] = depth;
            //填入 到四叉树 
            this.depthQTree.insert(myr);
            if(!this.depthList[depth] ) this.depthList[depth] = [];
            this.depthList[depth].push(rd);
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 画布使用的像素宽度
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        pixelWidth: number = 640;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 画布使用的像素高度
         * @version egret-gd3d 1.0
         */
        @gd3d.reflect.Field("number")
        pixelHeight: number = 480;
        
        @gd3d.reflect.Field("transform2D")
        private rootNode: transform2D;

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * 获取canvas的根节点
         * @version egret-gd3d 1.0
         */
        getRoot(): transform2D
        {
            if (this.rootNode == null)
            {
                this.rootNode = new transform2D();
                this.rootNode.canvas = this;
                this.scene.app.markNotify(this.rootNode,NotifyType.AddChild);
            }
            return this.rootNode;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * model空间坐标 转到 canvas 坐标
         * @param fromP 屏幕空间坐标
         * @param outP canvas 坐标
         * @version egret-gd3d 1.0
         */
        ModelPosToCanvasPos(fromP:math.vector2,outP:math.vector2){
            if(fromP == null || outP == null) return;
            let scalx = 1 - (fromP.x - 1)/-2;  
            let scaly =  (fromP.y - 1)/-2;
            outP.x = scalx * this.pixelWidth;
            outP.y = scaly * this.pixelHeight;
        }

        /**
         * @public
         * @language zh_CN
         * @classdesc
         * canvas坐标 转到 model空间坐标 
         * @param canvasPos canvas坐标
         * @param outModelPos model空间坐标
         * @version egret-gd3d 1.0
         */
        CanvasPosToModelPos(canvasPos : math.vector2 , outModelPos : math.vector2){
            if(!canvasPos|| !outModelPos) return;
            let scalx = canvasPos.x/ this.pixelWidth;
            let scaly = canvasPos.y/ this.pixelHeight;
            outModelPos.x = scalx * 2  - 1;
            outModelPos.y = 1 - scaly * 2;
        }

    }
}