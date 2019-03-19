namespace gd3d.framework
{
    export interface IAttributeData
    {
        uiState: AttributeUIState;
        data: { [frameIndex: number]: FrameKeyPointData };
        frameIndexs: number[];
        attributeValType: AttributeValType;
        attributeType: AttributeType;
        actions: { [frameIndex: number]: IEffectAction[] };
        init();
    }
    @gd3d.reflect.SerializeType
    export class Vector3AttributeData implements IAttributeData, ILerpAttributeInterface
    {
        public uiState: AttributeUIState;
        public attributeValType: AttributeValType;
        attributeType: AttributeType;
        public data: { [frameIndex: number]: FrameKeyPointData };
        public frameIndexs: number[];
        public actions: { [frameIndex: number]: IEffectAction[] }
        constructor()
        {
            this.init();
        }
        init()
        {
            this.data = {};
            this.frameIndexs = [];
            let keyPoint: FrameKeyPointData = new FrameKeyPointData(0, new gd3d.math.vector3());
            this.addFramePoint(keyPoint);
        }
        addFramePoint(data: FrameKeyPointData, func?: Function)
        {
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
            {
                if (this.actions == undefined)
                    this.actions = {};
                this.actions[data.frameIndex] = data.actions;
            }
            AttributeUtil.addFrameIndex(this.frameIndexs, data.frameIndex);
            if (func != null)
                func();
        }

        removeFramePoint(frameId: number, data: any, func?: Function)
        {
            if (this.data[frameId] == undefined)
            {
                console.warn("当前时间线中没有记录这一帧：" + frameId);
                return;
            } else
                delete this.data[frameId];
            if (this.actions != undefined && this.actions[frameId] != undefined)
                delete this.actions[frameId];
            if (this.frameIndexs[frameId] != undefined)
                this.frameIndexs.splice(this.frameIndexs.indexOf(this.frameIndexs[frameId]), 1);
            if (func != null)
                func();
        }
        updateFramePoint(data: any, func?: Function)
        {
            if (this.data[data.frameIndex] == undefined)
            {
                if (func != null)
                    func();
                return;
            }
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
                this.actions[data.frameIndex] = data.actions;
            if (func != null)
                func();
        }
    }
    @gd3d.reflect.SerializeType
    export class Vector2AttributeData implements IAttributeData, ILerpAttributeInterface
    {
        public uiState: AttributeUIState;
        public attributeValType: AttributeValType;
        attributeType: AttributeType;
        public frameIndexs: number[];
        public data: { [frameIndex: number]: FrameKeyPointData };
        public actions: { [frameIndex: number]: IEffectAction[] }
        constructor()
        {
            this.init();
        }
        init()
        {
            this.data = {};
            this.frameIndexs = [];
            let keyPoint: FrameKeyPointData = new FrameKeyPointData(0, new gd3d.math.vector2());
            this.addFramePoint(keyPoint);
        }
        addFramePoint(data: FrameKeyPointData, func?: Function)
        {
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
            {
                if (this.actions == undefined)
                    this.actions = {};
                this.actions[data.frameIndex] = data.actions;
            }
            AttributeUtil.addFrameIndex(this.frameIndexs, data.frameIndex);
            if (func != null)
                func();
        }
        removeFramePoint(frameId: number, data: gd3d.math.vector2, func?: Function)
        {
            if (this.data[frameId] == undefined)
            {
                console.warn("当前时间线中没有记录这一帧：" + frameId);
                return;
            } else
                delete this.data[frameId];
            if (this.actions != undefined && this.actions[frameId] != undefined)
                delete this.actions[frameId];
            if (this.frameIndexs[frameId] != undefined)
                this.frameIndexs.splice(this.frameIndexs.indexOf(this.frameIndexs[frameId]), 1);
            if (func != null)
                func();
        }
        updateFramePoint(data: any, func?: Function)
        {
            if (this.data[data.frameIndex] == undefined)
            {
                if (func != null)
                    func();
                return;
            }
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
                this.actions[data.frameIndex] = data.actions;
            if (func != null)
                func();
        }
    }
    @gd3d.reflect.SerializeType
    export class NumberAttributeData implements IAttributeData, ILerpAttributeInterface
    {
        public uiState: AttributeUIState;
        public attributeValType: AttributeValType;
        attributeType: AttributeType;
        public data: { [frameIndex: number]: FrameKeyPointData };
        public frameIndexs: number[];
        public timeLine: { [frameIndex: number]: number };
        public actions: { [frameIndex: number]: IEffectAction[] };
        constructor()
        {
            this.init();
        }
        init()
        {
            this.data = {};
            this.frameIndexs = [];
            let keyPoint: FrameKeyPointData = new FrameKeyPointData(0, 0);
            this.addFramePoint(keyPoint, null);
        }
        addFramePoint(data: any, func?: Function)
        {
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
            {
                if (this.actions == undefined)
                    this.actions = {};
                this.actions[data.frameIndex] = data.actions;
            }
            AttributeUtil.addFrameIndex(this.frameIndexs, data.frameIndex);
            if (func != null)
                func();
        }
        removeFramePoint(frameId: number, data: number, func?: Function)
        {
            if (this.data[frameId] == undefined)
            {
                console.warn("当前时间线中没有记录这一帧：" + frameId);
                return;
            } else
                delete this.data[frameId];
            if (this.actions != undefined && this.actions[frameId] != undefined)
                delete this.actions[frameId];
            if (this.frameIndexs[frameId] != undefined)
                this.frameIndexs.splice(this.frameIndexs.indexOf(this.frameIndexs[frameId]), 1);
            if (func != null)
                func();
        }
        updateFramePoint(data: any, func?: Function)
        {
            if (this.data[data.frameIndex] == undefined)
            {
                if (func != null)
                    func();
                return;
            }
            this.data[data.frameIndex] = data;
            if (data.actions != undefined)
                this.actions[data.frameIndex] = data.actions;
            if (func != null)
                func();
        }
    }

    export interface ILerpAttributeInterface
    {
        addFramePoint(data: any, func?: Function);
        removeFramePoint(frameId: number, data: any, func?: Function);
        updateFramePoint(data: any, func?: Function);
    }

    export enum AttributeUIState
    {
        None,
        Show,
        Hide,
    }

    export enum AttributeUIType
    {
        Number,
        Vector2,
        Vector3,
        Vector4,
    }

    export enum AttributeValType
    {
        FixedValType = 0,
        LerpType = 1
    }

    export class FrameKeyPointData
    {
        public frameIndex: number;
        public val: any;
        public actions: IEffectAction[];
        constructor(frameIndex: number, val: any)
        {
            this.frameIndex = frameIndex;
            this.val = val;
        }
    }

    export class AttributeUtil
    {
        public static addFrameIndex(datas: number[], index: number)
        {
            for (let i = 0; i < datas.length - 1; i++)
            {
                if (index > datas[i] && index <= datas[i + 1])
                {
                    datas.splice(i, 0, index);
                    return;
                }
            }
            datas.push(index);
        }
    }

    // export class VectorLerpAttribute implements LerpAttributeInterface
    // {
    //     timeLine: { [frameId: number]: any };
    //     addFramePoint(frameId: number, data: any)
    //     {
    //         if (this.timeLine == undefined)
    //             this.timeLine = {};
    //         this.timeLine[frameId] = data;
    //     }
    //     removeKeyPoint(frameId: number, data: any)
    //     {
    //         if (this.timeLine == undefined || this.timeLine[frameId] == undefined)
    //         {
    //             console.warn("当前时间线中没有记录这一帧：" + frameId);
    //             return;
    //         }
    //         delete this.timeLine[frameId];
    //     }
    // }

    // export class ColorLerpAttribute implements LerpAttributeInterface
    // {
    //     timeLine: { [frameId: number]: gd3d.math.color };
    //     addFramePoint(frameId: number, data: any)
    //     {
    //         if (this.timeLine == undefined)
    //             this.timeLine = {};
    //         if (this.timeLine[frameId] == undefined)
    //             this.timeLine[frameId] = new gd3d.math.color();
    //         if (typeof (data) === 'number')
    //         {
    //             this.timeLine[frameId].a = data;
    //         } else if (data instanceof gd3d.math.vector3)
    //         {
    //             let c = data as gd3d.math.vector3;
    //             this.timeLine[frameId].r = c.x;
    //             this.timeLine[frameId].g = c.y;
    //             this.timeLine[frameId].b = c.z;
    //         }
    //     }
    //     removeKeyPoint(frameId: number, data: any)
    //     {
    //         if (this.timeLine == undefined || this.timeLine[frameId] == undefined)
    //         {
    //             console.warn("当前时间线中没有记录这一帧：" + frameId);
    //             return;
    //         }
    //         if (typeof (data) === 'number')
    //         {
    //             this.timeLine[frameId].a = -1;
    //         } else if (data instanceof gd3d.math.vector3)
    //         {
    //             this.timeLine[frameId].r = -1;
    //             this.timeLine[frameId].g = -1;
    //             this.timeLine[frameId].b = -1;
    //         }

    //         if (this.timeLine[frameId].r == -1 && this.timeLine[frameId].a == -1)
    //             delete this.timeLine[frameId];
    //     }
    // }
}
