namespace gd3d.framework
{
    /**
     * @private
     */
    export interface IEffectAction
    {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement);
        update(frameIndex: number);
    }

    /**
     * @private
     */
    export class LinearAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        attriname: string;
        attrival: any;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
            if (this.params != undefined)
            {
                this.attriname = this.params["name"];
                switch (this.attriname)
                {
                    case "pos":
                    case "scale":
                    case "euler":
                    case "color":
                        this.attrival = EffectUtil.parseEffectVec3(this.params["value"]);
                        break;
                    case "uv":
                        this.attrival = EffectUtil.parseEffectUVSpeed(this.params["value"]);
                        break;
                    case "alpha":
                        this.attrival = this.params["value"];
                        break;
                }
            }
        }

        update(frameIndex: number)
        {
            if (this.startFrame > frameIndex || this.endFrame < frameIndex) return;
            let baseValue = this.elements.curAttrData;
            switch (this.attriname)
            {
                case "pos":
                    baseValue.pos.x = baseValue.pos.x + this.attrival.x.getValue();
                    baseValue.pos.y = baseValue.pos.y + this.attrival.y.getValue();
                    baseValue.pos.z = baseValue.pos.z + this.attrival.z.getValue();
                    break;
                case "scale":
                    baseValue.scale.x = baseValue.scale.x + this.attrival.x.getValue();
                    baseValue.scale.y = baseValue.scale.y + this.attrival.y.getValue();
                    baseValue.scale.z = baseValue.scale.z + this.attrival.z.getValue();
                    break;
                case "euler":
                    baseValue.euler.x = baseValue.euler.x + this.attrival.x.getValue();
                    baseValue.euler.y = baseValue.euler.y + this.attrival.y.getValue();
                    baseValue.euler.z = baseValue.euler.z + this.attrival.z.getValue();
                    break;
                case "color":
                    baseValue.color.x = baseValue.color.x + this.attrival.x.getValue();
                    baseValue.color.y = baseValue.color.y + this.attrival.y.getValue();
                    baseValue.color.z = baseValue.color.z + this.attrival.z.getValue();
                    break;
                case "uv":
                    baseValue.uv.x = baseValue.uv.x + this.attrival.u.getValue();
                    baseValue.uv.y = baseValue.uv.y + this.attrival.v.getValue();
                    break;
                case "alpha":
                    baseValue.alpha = baseValue.alpha + this.attrival;
                    break;
            }
        }
    }

    /**
     * @private
     */
    export class DestroyAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
        }

        update(frameIndex: number)
        {
            if (frameIndex >= this.startFrame)
            {
                this.elements.setActive(false);
            }
        }
    }

    /**
     * @private
     */
    export class LoopAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
        }

        update(frameIndex: number)
        {
            if (frameIndex == this.startFrame)
            {
                this.elements.loopFrame = this.startFrame + 1;
                this.elements.curAttrData = this.elements.data.initFrameData.attrsData.copyandinit();
            }
        }
    }
    /**
     * @private
     */
    export class UVRollAction implements IEffectAction
    {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;

        speedu: number = 0;
        speedv: number = 0;
        startu: number = 0;
        startv: number = 0;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
            if (this.params["speedu"] != undefined)
            {
                this.speedu = <number>this.params["speedu"];
            }
            if (this.params["speedv"] != undefined)
            {
                this.speedv = <number>this.params["speedv"];
            }
            if (this.params["startu"] != undefined)
            {
                this.startu = <number>this.params["startu"];
            }
            if (this.params["startv"] != undefined)
            {
                this.startv = <number>this.params["startv"];
            }
        }

        update(frameIndex: number)
        {
            if (this.startFrame > frameIndex || this.endFrame < frameIndex) return;
            if (this.startFrame == frameIndex)
            {
                //init
                this.elements.curAttrData.uv.x = this.startu;
                this.elements.curAttrData.uv.y = this.startv;
                return;
            }
            this.elements.curAttrData.uv.x += this.speedu;
            this.elements.curAttrData.uv.y += this.speedv;
        }
    }
    /**
     * @private
     */
    export class UVSpriteAnimationAction implements IEffectAction
    {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        /**
         * 控制播放速度
         * 
         * @type {number}
         * @memberof UISpriteAnimation
         */
        fps: number = 30;
        /**
         * 行
         * 
         * @type {number}
         * @memberof UISpriteAnimation
         */
        row: number = 1;
        /**
         * 列
         * 
         * @type {number}
         * @memberof UISpriteAnimation
         */
        colum: number = 1;
        totalCount: number = 1;
        private frameInternal: number = 1;
        private spriteIndex: number = 0;

        private tex_ST: gd3d.math.vector4 = new gd3d.math.vector4(1, 1, 0, 0);
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
            // if (this.params["fps"] != undefined)
            // {
            //     this.fps = <number>this.params["fps"];
            //     this.frameInternal = effectSystem.fps / this.fps;
            // }
            if (this.params["row"] != undefined)
            {
                this.row = <number>this.params["row"];
            }
            if (this.params["colum"] != undefined)
            {
                this.colum = <number>this.params["colum"];
            }
            if (this.params["count"] != undefined)
            {
                this.totalCount = <number>this.params["count"];
            }
        }
        update(frameIndex: number)
        {
            if (this.startFrame > frameIndex || this.endFrame < frameIndex) return;

            var spriteindex=Math.floor((frameIndex-this.startFrame)/(this.endFrame-this.startFrame)*this.totalCount);

            gd3d.math.spriteAnimation(this.row,this.colum,spriteindex,this.tex_ST);
            this.elements.curAttrData.uv.x =this.tex_ST.z;
            this.elements.curAttrData.uv.y = this.tex_ST.w;
            this.elements.curAttrData.tilling.x =this.tex_ST.x;
            this.elements.curAttrData.tilling.y =this.tex_ST.y;
        }
    }
    /**
     * @private
     */
    export class RotationAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        public velocity: any;
        public frameInternal: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;
            if (this.params["velocity"] != undefined)
            {
                this.velocity = EffectUtil.parseEffectVec3(this.params["velocity"]);
            }

            this.frameInternal = 1 / effectSystem.fps;
        }

        update(frameIndex: number)
        {
            // // if (this.startFrame > frameIndex || this.endFrame < frameIndex) 
            this.elements.curAttrData.euler.z = this.elements.curAttrData.euler.z + (this.velocity.z.getValue()) * this.frameInternal;

            if (this.elements.curAttrData.renderModel == RenderModel.None)
            {
                this.elements.curAttrData.euler.x = this.elements.curAttrData.euler.x + (this.velocity.x.getValue()) * this.frameInternal;
                this.elements.curAttrData.euler.y = this.elements.curAttrData.euler.y + (this.velocity.y.getValue()) * this.frameInternal;
            }


            // let rotationX = gd3d.math.pool.new_quaternion();
            // gd3d.math.quatFromAxisAngle(this.elements.curAttrData.localAxisX, this.elements.curAttrData.euler.x, rotationX);

            // let rotationY = gd3d.math.pool.new_quaternion();
            // gd3d.math.quatFromAxisAngle(this.elements.curAttrData.localAxisY, this.elements.curAttrData.euler.y, rotationY);

            // let rotationZ = gd3d.math.pool.new_quaternion();
            // gd3d.math.quatFromAxisAngle(this.elements.curAttrData.localAxisZ, this.elements.curAttrData.euler.z, rotationZ);

            // gd3d.math.quatMultiply(this.elements.curAttrData.rotationByEuler,rotationZ,this.elements.curAttrData.rotationByEuler);

        }
    }

    /**
     * @private
     */
    export class RoseCurveAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        public radius: number;
        public polar: any;
        public level: number;
        public frameInternal: number;
        public speed: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;

            if (this.params["radius"] != undefined)
            {
                this.radius = <number>this.params["radius"];
            }
            if (this.params["level"] != undefined)
            {
                this.level = <number>this.params["radius"];
            }
            if (this.params["speed"] != undefined)
            {
                this.speed = <number>this.params["speed"];
            }
            if (this.params["polar"] != undefined)
            {
                this.polar = EffectUtil.parseEffectVec3(this.params["polar"]);
            }

            this.frameInternal = 1 / effectSystem.fps;
        }

        update(frameIndex: number)
        {
            let initFrameDataPos = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(this.elements.data.initFrameData.attrsData.pos, initFrameDataPos);
            let radius = this.radius;
            let curFrame = frameIndex % 360;

            let x = this.polar.x.getValue();
            let y = this.polar.y.getValue();
            let z = this.polar.z.getValue();
            {
                let theta = frameIndex * this.speed;
                this.elements.curAttrData.pos.x = initFrameDataPos.x + radius * Math.cos(3 * theta+ x) * Math.cos(theta);
                this.elements.curAttrData.pos.z = initFrameDataPos.z +  radius * Math.cos(3 * theta+ x) * Math.sin(theta);
                this.elements.curAttrData.pos.y = initFrameDataPos.y + y*Math.cos(frameIndex * this.speed); 
            }
            {
                let deltaTheta = frameIndex * this.speed + 0.001;
                let targetPoint = gd3d.math.pool.new_vector3();
                targetPoint.x =initFrameDataPos.x + radius * Math.cos(3 * deltaTheta + x) * Math.cos(deltaTheta);
                targetPoint.z =initFrameDataPos.z + radius * Math.cos(3 * deltaTheta + x) * Math.sin(deltaTheta);
                targetPoint.y =initFrameDataPos.y +  y*Math.cos(frameIndex * this.speed); 
                let rotation = gd3d.math.pool.new_quaternion();
                gd3d.math.quatLookat(this.elements.curAttrData.pos,targetPoint,rotation);
                gd3d.math.quatToEulerAngles(rotation,this.elements.curAttrData.euler);
                gd3d.math.pool.delete_vector3(targetPoint);
                gd3d.math.pool.delete_quaternion(rotation);
            }
            gd3d.math.pool.delete_vector3(initFrameDataPos);
        }
    }


    /**
     * @private
     */
    export class TrailAction implements IEffectAction
    {
        public type: string;
        public params: any;
        public startFrame: number;
        public endFrame: number;
        public elements: EffectElement;
        public radius: number;
        public position:any;
        public eular:any;
        public width:number;
        public frameInternal: number;
        public speed:number;
        public transform:gd3d.framework.transform;
        public startRotation:gd3d.math.quaternion;
        public color:any;
        public alpha:number;
        public offsetTransalte:gd3d.math.vector3= new gd3d.math.vector3();
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;

            if(this.params["pos"]!=undefined)
            {
                this.position = EffectUtil.parseEffectVec3(this.params["pos"]);
            }
            this.offsetTransalte.x = this.position.x.getValue();
            this.offsetTransalte.y = this.position.y.getValue();
            this.offsetTransalte.z = this.position.z.getValue();

            if(this.params["eular"]!=undefined)
            {
               this.eular = EffectUtil.parseEffectVec3(this.params["eular"]);
            }
            if(this.params["color"]!=undefined)
            {
                this.color = EffectUtil.parseEffectVec3(this.params["color"]);
            }
            if (this.params["width"] != undefined)
            {
                this.width = <number>this.params["width"];
            }
            if (this.params["speed"] != undefined)
            {
                this.speed = <number>this.params["speed"];
            }
            if (this.params["speed"] != undefined)
            {
                this.speed = <number>this.params["speed"];
            }
            if (this.params["alpha"] != undefined)
            {
                this.alpha = <number>this.params["alpha"];
            }
            let mat = new gd3d.framework.material();
            let shader = new gd3d.framework.shader();
            let texture = new gd3d.framework.texture();

            if (this.params["shader"] != undefined)
                shader = sceneMgr.app.getAssetMgr().getShader(this.params["shader"]);
            else
                shader = sceneMgr.app.getAssetMgr().getShader("shader/def");
            mat.setShader(shader);
            if (this.params["diffuseTexture"] != undefined)
                texture = sceneMgr.app.getAssetMgr().getAssetByName(this.params["diffuseTexture"]) as texture;
            mat.setTexture("_MainTex", texture)

            this.frameInternal = 1 / effectSystem.fps;

            this.transform = new gd3d.framework.transform();
            sceneMgr.scene.addChild(this.transform);

            let curAttrData = this.elements.data.initFrameData.attrsData.clone();
            let worldTranslate = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(curAttrData.pos, worldTranslate);
            if (this.elements.transform != undefined) 
            {
                gd3d.math.matrixTransformVector3(worldTranslate, this.elements.transform.getWorldMatrix(), worldTranslate);
            }
            gd3d.math.vec3Clone(worldTranslate,this.transform.localTranslate);
            gd3d.math.pool.delete_vector3(worldTranslate);

            let trailTransform = new gd3d.framework.transform();
            this.transform.addChild(trailTransform);

            let x = this.eular.x.getValue();
            let y = this.eular.y.getValue();
            let z = this.eular.z.getValue();
            this.startRotation = new gd3d.math.quaternion();
            gd3d.math.quatFromEulerAngles(x,y,z,this.startRotation);

            gd3d.math.quatMultiply(this.startRotation,curAttrData.localRotation,this.transform.localRotate);

            this.transform.markDirty();
            trailTransform.markDirty();

            let trailrender = trailTransform.gameObject.addComponent("trailRender") as gd3d.framework.trailRender;
            trailrender.color=new gd3d.math.color(this.color.x.getValue(),this.color.y.getValue(),this.color.z.getValue(),this.alpha);
            trailrender.setspeed(this.speed);
            trailrender.setWidth(this.width);

            trailrender.material = mat;
        }

        update(frameIndex: number)
        {
            let worldTranslate = gd3d.math.pool.new_vector3();
            gd3d.math.vec3Clone(this.elements.curAttrData.pos, worldTranslate);
            if (this.elements.transform != undefined) 
            {
                gd3d.math.matrixTransformVector3(worldTranslate, this.elements.transform.getWorldMatrix(), worldTranslate);
            }
            gd3d.math.vec3Clone(worldTranslate,this.transform.localTranslate);
            gd3d.math.vec3Add(this.transform.localTranslate,this.offsetTransalte,this.transform.localTranslate);
            gd3d.math.pool.delete_vector3(worldTranslate);
            // gd3d.math.quatClone(this.elements.curAttrData.localRotation,this.transform.localRotate);
            gd3d.math.quatMultiply(this.startRotation,this.elements.curAttrData.localRotation,this.transform.localRotate);
            this.transform.markDirty();
        }
    }

    /**
     * @private
     */
    export class BreathAction implements IEffectAction
    {
        type: string;
        params: any;
        startFrame: number;
        endFrame: number;
        elements: EffectElement;
        attriname: string;
        startvalue: any;
        targetvalue: any;
        loopframe: number;
        halfloopframe: number;
        init(_startFrame: number, _endFrame: number, _params: any, _elements: EffectElement)
        {
            this.startFrame = _startFrame;
            this.endFrame = _endFrame;
            this.params = _params;
            this.elements = _elements;

            if (this.params != undefined)
            {
                this.attriname = this.params["name"];
                this.loopframe = this.params["loopframe"];
                this.halfloopframe = this.loopframe / 2;
                this.curTargetFrame = this.startFrame + this.halfloopframe;
                switch (this.attriname)
                {
                    case "pos":
                    case "scale":
                    case "euler":
                    case "color":
                        this.startvalue = EffectUtil.parseEffectVec3(this.params["startvalue"]).getValue();
                        this.targetvalue = EffectUtil.parseEffectVec3(this.params["targetvalue"]).getValue();
                        break;
                    case "uv":
                        this.startvalue = EffectUtil.parseEffectUVSpeed(this.params["startvalue"]).getValue();
                        this.targetvalue = EffectUtil.parseEffectUVSpeed(this.params["targetvalue"]).getValue();
                        break;
                    case "alpha":
                        this.startvalue = this.params["startvalue"];
                        this.targetvalue = this.params["targetvalue"];
                        break;
                }
            }
        }
        curTargetFrame: number;
        update(frameIndex: number)
        {
            if (this.startFrame > frameIndex) return;//这里只限制起始
            if (frameIndex >= this.curTargetFrame)
            {
                this.swap();
                this.curTargetFrame += this.halfloopframe;
            }
            let baseValue = this.elements.curAttrData;
            switch (this.attriname)
            {
                case "pos":
                    baseValue.pos = this.getLerpValue(frameIndex);
                    break;
                case "scale":
                    baseValue.scale = this.getLerpValue(frameIndex);
                    break;
                case "euler":
                    baseValue.euler = this.getLerpValue(frameIndex);
                    break;
                case "color":
                    baseValue.color = this.getLerpValue(frameIndex);
                    break;
                case "uv":
                    baseValue.uv = this.getLerpValue(frameIndex);
                    break;
                case "alpha":
                    baseValue.alpha = this.getLerpValue(frameIndex);
                    break;
            }
        }
        swap()
        {
            let temp;
            if (this.startvalue instanceof gd3d.math.vector3)
            {
                temp = gd3d.math.pool.clone_vector3(this.startvalue);
                this.startvalue = gd3d.math.pool.clone_vector3(this.targetvalue);
                this.targetvalue = temp;
            }
            else if (this.startvalue instanceof gd3d.math.vector2)
            {
                temp = gd3d.math.pool.clone_vector2(this.startvalue);
                this.startvalue = gd3d.math.pool.clone_vector2(this.targetvalue);
                this.targetvalue = temp;
            }
            else
            {
                temp = this.startvalue;
                this.startvalue = this.targetvalue;
                this.targetvalue = temp;
            }
        }
        getLerpValue(frameIndex: number): any
        {
            let curframe = (frameIndex - this.startFrame) % this.halfloopframe;
            let outVal;
            if (this.startvalue instanceof gd3d.math.vector3)
            {
                outVal = new gd3d.math.vector3();
                gd3d.math.vec3SLerp(this.startvalue, this.targetvalue, curframe / this.halfloopframe, outVal);
            }
            else if (this.startvalue instanceof gd3d.math.vector2)
            {
                outVal = new gd3d.math.vector2();
                gd3d.math.vec2SLerp(this.startvalue, this.targetvalue, curframe / this.halfloopframe, outVal);
            }
            else
            {
                outVal = gd3d.math.numberLerp(this.startvalue, this.targetvalue, curframe / this.halfloopframe);
            }
            return outVal;
        }
    }
}