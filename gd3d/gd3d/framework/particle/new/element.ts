namespace gd3d.framework
{

    export interface IEffectElement
    {
        name: string;
        elementType: EffectElementTypeEnum;//singlemesh,emission....
        beloop: boolean;
        delayTime: number;
        mat: material;
        mesh: mesh;
        writeToJson(obj: any): any;
        dispose();
    }

    export enum AttributeType
    {
        PositionType = 1,
        EulerType = 2,
        ScaleType = 3,
        ColorType = 4,
        ColorRateType = 5,
        AlphaType = 6,
        TillingType = 7,
    }
    @gd3d.reflect.SerializeType
    export class EffectElementSingleMesh implements IEffectElement
    {
        public name: string;
        public elementType: gd3d.framework.EffectElementTypeEnum = gd3d.framework.EffectElementTypeEnum.SingleMeshType;//singlemesh,emission....
        public beloop: boolean = false;
        public delayTime: number = 0;
        public life: number = 5;
        public mat: gd3d.framework.material;
        public mesh: gd3d.framework.mesh;
        
        public colorRate: number =1;//几倍颜色叠加
        public renderModel: gd3d.framework.RenderModel = gd3d.framework.RenderModel.Mesh;
        public tex_ST:math.vector4=new math.vector4(1,1,0,0);

        public position: Vector3Key[]=[];
        public euler: Vector3Key[] =[];
        public scale: Vector3Key[] =[];
        public color: Vector3Key[] =[];
        public alpha: NumberKey[] =[];

        public actions: IEffectAction[];//脚本驱动

        public curAttrData: EffectAttrsData;
        //public effectBatcher: EffectBatcherNew;

        public loopFrame: number = Number.MAX_VALUE;//循环帧数
        public active: boolean = true;//激活状态
        public transform: transform;
        private mgr: gd3d.framework.assetMgr;
        private effectSys: TestEffectSystem;

        public rotationByEuler: math.quaternion = new math.quaternion();
        public localRotation: math.quaternion = new math.quaternion();

        constructor(sys: TestEffectSystem,data:EffectElementData=null)
        {
            this.effectSys = sys;
            if(data!=null)
            {
                this.initByElementdata(data);
            }
            else
            {
                this.initByDefData();
            }
        }

        private initByElementdata(data:EffectElementData)
        {
            
        }
        private initByDefData()
        {
            this.mesh = this.mgr.getDefaultMesh("quad");
            var shader = this.mgr.getShader("diffuse.shader.json");
            this.mat.setShader(shader);
        }
        writeToJson(obj: any): any
        {

        }

        update()
        {
            if (this.active)
            {
                if (this.curAttrData.euler != undefined)
                {
                    // console.log("euler:" + this.curAttrData.euler.toString());
                    gd3d.math.quatFromEulerAngles(this.curAttrData.euler.x, this.curAttrData.euler.y, this.curAttrData.euler.z, this.curAttrData.rotationByEuler);
                }
                this.updateElementRotation();
                gd3d.math.matrixMakeTransformRTS(this.curAttrData.pos, this.curAttrData.scale, this.curAttrData.localRotation, this.curAttrData.matrix);
            }
            else
            {
                this.curAttrData.resetMatrix();
            }
        }

        private updateElementRotation() 
        {
            let cameraTransform = gd3d.framework.sceneMgr.app.getScene().mainCamera.gameObject.transform;
            let worldRotation = gd3d.math.pool.new_quaternion();
            let localRotation = gd3d.math.pool.new_quaternion();

            if (this.curAttrData.renderModel != RenderModel.None) 
            {
                let invTransformRotation = gd3d.math.pool.new_quaternion();
                let worldTranslation = gd3d.math.pool.new_vector3();
                let translation = gd3d.math.pool.new_vector3();
                gd3d.math.vec3Clone(this.curAttrData.pos, translation);
                if (this.transform != undefined)
                {
                    gd3d.math.matrixTransformVector3(translation, this.transform.getWorldMatrix(), worldTranslation);
                }
                if (this.curAttrData.renderModel == RenderModel.BillBoard) 
                {
                    gd3d.math.quatLookat(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);
                }
                else if (this.curAttrData.renderModel == RenderModel.HorizontalBillBoard)
                {
                    worldRotation.x = -0.5;
                    worldRotation.y = 0.5;
                    worldRotation.z = 0.5;
                    worldRotation.w = 0.5;
                }
                else if (this.curAttrData.renderModel == RenderModel.VerticalBillBoard)
                {
                    let forwardTarget = gd3d.math.pool.new_vector3();
                    gd3d.math.vec3Clone(cameraTransform.getWorldTranslate(), forwardTarget);
                    forwardTarget.y = worldTranslation.y;
                    gd3d.math.quatLookat(worldTranslation, forwardTarget, worldRotation);
                    gd3d.math.pool.delete_vector3(forwardTarget);
                }
                else if (this.curAttrData.renderModel == RenderModel.StretchedBillBoard) 
                {

                    gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, this.curAttrData.localRotation);

                    gd3d.math.quatLookat(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);

                    let lookRot = new gd3d.math.quaternion();
                    gd3d.math.quatClone(this.transform.getWorldRotate(), invTransformRotation);
                    gd3d.math.quatInverse(invTransformRotation, invTransformRotation);
                    gd3d.math.quatMultiply(invTransformRotation, worldRotation, lookRot);

                    let inverRot = gd3d.math.pool.new_quaternion();
                    gd3d.math.quatInverse(this.curAttrData.localRotation, inverRot);
                    gd3d.math.quatMultiply(inverRot, lookRot, lookRot);

                    let angle = gd3d.math.pool.new_vector3();
                    gd3d.math.quatToEulerAngles(lookRot, angle);
                    gd3d.math.quatFromEulerAngles(0, angle.y, 0, lookRot);
                    gd3d.math.quatMultiply(this.curAttrData.localRotation, lookRot, this.curAttrData.localRotation);

                    gd3d.math.pool.delete_quaternion(inverRot);
                    gd3d.math.pool.delete_vector3(angle);
                    gd3d.math.pool.delete_quaternion(lookRot);
                    return;
                }
                else if (this.curAttrData.renderModel == RenderModel.Mesh)
                {
                    EffectUtil.quatLookatZ(worldTranslation, cameraTransform.getWorldTranslate(), worldRotation);
                }

                gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, worldRotation);
                //消除transform组件对粒子本身的影响
                gd3d.math.quatClone(this.transform.gameObject.transform.getWorldRotate(), invTransformRotation);
                gd3d.math.quatInverse(invTransformRotation, invTransformRotation);

                gd3d.math.quatMultiply(invTransformRotation, worldRotation, this.curAttrData.localRotation);

                gd3d.math.pool.delete_vector3(translation);
                gd3d.math.pool.delete_vector3(worldTranslation);
                gd3d.math.pool.delete_quaternion(invTransformRotation);
            } else
            {
                gd3d.math.quatMultiply(worldRotation, this.curAttrData.rotationByEuler, this.curAttrData.localRotation);
            }

            gd3d.math.pool.delete_quaternion(localRotation);
            gd3d.math.pool.delete_quaternion(worldRotation);

        }
        dispose()
        {

        }
    }
}

