namespace gd3d.framework
{
    let help_v3 = new gd3d.math.vector3();
    let help_v3_1 = new gd3d.math.vector3();
    let help_v3_2 = new gd3d.math.vector3();
    let help_quat = new gd3d.math.quaternion();
    declare var OIMO: any;
    /** OimoJS physic engine Plugin  */
    export class OimoJSPlugin implements IPhysicsEnginePlugin {
        public world: any;
        public name: string = "OIMOJSPlugin";
        private _physicsMaterials = new Array();
        private _fixedTimeStep: number = 1 / 60;
        public BJSOIMO: any;
        // private _raycastResult: PhysicsRaycastResult;

        /**
        * @public
        * @language zh_CN
        * @classdesc
        * OimoJS 物理引擎插件
        * @param option Oimo world 构造选项
        * @param oimoInjection Omio对象
        * @version egret-gd3d 1.0
        */
        public constructor(iterations ?: number, oimoInjection = OIMO) {
            this.BJSOIMO = oimoInjection;
            if (!this.isSupported()) {
                console.error("OIMO is not available. Please make sure you included the js file.");
                return;
            }
            let opt = {
                iterations: iterations,
            };

            this.world = new this.BJSOIMO.World( opt );

            this.world.clear();


            // this.world = new BJSCANNON.World();
            // this.world.broadphase = new BJSCANNON.NaiveBroadphase();
            // this.world.solver.iterations = iterations;
        }

        public setGravity(gravity: math.vector3): void {
            this.world.gravity.copy(gravity);
        }

        public setTimeStep(timeStep: number) {
            this.world.timeStep = timeStep;
        }

        public getTimeStep(): number {
            return this.world.timeStep;
        }

        private _tmpImpostorsArray: Array<PhysicsImpostor> = [];

        public executeStep(delta: number, impostors: Array<PhysicsImpostor>): void {
            // this.world.step(this._fixedTimeStep , this._useDeltaForWorldStep ? delta : 0, 3);

            impostors.forEach(function(impostor) {
                impostor.beforeStep();
            });
    
            this.world.step();
    
            impostors.forEach((impostor) => {
                impostor.afterStep();
                //update the ordered impostors array
                this._tmpImpostorsArray[impostor.uniqueId] = impostor;
            });

            //check for collisions
            var contact = this.world.contacts;

            while (contact !== null) {
                if (contact.touching && !contact.body1.sleeping && !contact.body2.sleeping) {
                    contact = contact.next;
                    continue;
                }
                //is this body colliding with any other? get the impostor
                var mainImpostor = this._tmpImpostorsArray[+contact.body1.name];
                var collidingImpostor = this._tmpImpostorsArray[+contact.body2.name];
    
                if (!mainImpostor || !collidingImpostor) {
                    contact = contact.next;
                    continue;
                }
    
                mainImpostor.onCollide({ body: collidingImpostor.physicsBody });
                collidingImpostor.onCollide({ body: mainImpostor.physicsBody });
                contact = contact.next;
            }
        }
        /** 申请 冲量 */
        public applyImpulse(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3) {
            let mass = impostor.physicsBody.mass;
            let _point = help_v3;
            math.vec3ScaleByNum(contactPoint,this.world.invScale, _point);
            let _force = help_v3_1;
            math.vec3ScaleByNum(force, this.world.invScale * mass , _force);
            impostor.physicsBody.applyImpulse(_point, _force);
        }

        public applyForce(impostor: PhysicsImpostor, force: math.vector3, contactPoint: math.vector3) {
            console.warn("Oimo doesn't support applying force. Using impule instead.");
            this.applyImpulse(impostor, force, contactPoint);
        }

        private checkWithEpsilon(value: number){
            return Math.max(value, PhysicsEngine.Epsilon);
        }

        public generatePhysicsBody(impostor: PhysicsImpostor) {
            //parent-child relationship. Does this impostor has a parent impostor?
            if (impostor.parent) {
                if (impostor.physicsBody) {
                    this.removePhysicsBody(impostor);
                    //TODO is that needed?
                    impostor.forceUpdate();
                }
                return;
            }

            if (impostor.isBodyInitRequired()) {
                let bodyConfig: any = {
                    name: impostor.uniqueId,
                    //Oimo must have mass, also for static objects.
                    config: [impostor.getParam("mass") || 1, impostor.getParam("friction"), impostor.getParam("restitution")],
                    size: [],
                    type: [],
                    pos: [],
                    posShape: [],
                    rot: [],
                    rotShape: [],
                    move: impostor.getParam("mass") !== 0,
                    density: impostor.getParam("mass"),
                    friction: impostor.getParam("friction"),
                    restitution: impostor.getParam("restitution"),
                    kinematic: impostor.getParam("kinematic"),
                    //Supporting older versions of Oimo
                    world: this.world
                };

                var impostors = [impostor];
                if(impostor.object.children){
                    impostor.object.children.forEach(m=>{
                        if (m.physicsImpostor) {
                            impostors.push(m.physicsImpostor);
                            //m.physicsImpostor._init();
                        }
                    })
                }

                let globalQuat = help_quat; //是否能用 缓存？
                globalQuat.x = globalQuat.y = globalQuat.z = 0;
                globalQuat.w = 1;
                let wPos_impostor = impostor.object.getWorldPosition();
                impostors.forEach( i => {
                    
                    //get the correct bounding box
                    let oldQuaternion = i.object.localRotate;
                    math.quatClone(i.object.localRotate , globalQuat);
                    
                    let rot = help_v3;
                    gd3d.math.quatToEulerAngles(oldQuaternion,rot);
                    // rot = oldQuaternion.toEulerAngles();

                    console.log(this._tmpPositionVector)

                    let  extendSize = i.getObjectExtendSize();
                    const radToDeg = 57.295779513082320876;
                    
                    if (i === impostor) {
                        let center = impostor.getObjectCenter();
                        // let wpos = impostor.object.getWorldPosition();
                        // let scale = help_v3_1;
                        // math.vec3Clone(impostor.object.getWorldScale(),scale);
                        // scale.x = 1/scale.x ; scale.y = 1/scale.y ; scale.z = 1/scale.z ;
                        // math.vec3Subtract(wpos,center,this._tmpPositionVector);
                        // math.vec3ScaleByVec3(this._tmpPositionVector, scale ,this._tmpPositionVector);
                        // impostor.object.getAbsolutePivotPoint().subtractToRef(center, this._tmpPositionVector);
                        // this._tmpPositionVector.divideInPlace(impostor.object.scaling);
    
                        //Can also use Array.prototype.push.apply
                        bodyConfig.pos.push(center.x);
                        bodyConfig.pos.push(center.y);
                        bodyConfig.pos.push(center.z);
                        bodyConfig.posShape.push(0, 0, 0);
                        bodyConfig.rotShape.push(0, 0, 0);

                    } else {
                        // math.vec3Subtract(i.object.getWorldPosition(),impostor.object.getWorldPosition() ,localPosition );
                        // math.vec3Clone(i.object.getWorldPosition() ,localPosition);
                        // let localPosition = i.object.getAbsolutePosition().subtract(impostor.object.getAbsolutePosition());
                        
                        let localPosition = help_v3_2;
                        gd3d.math.vec3Subtract(i.object.getWorldPosition() , wPos_impostor ,localPosition);  //子物体世界坐标 与 主物体世界坐标 的差值
                        // bodyConfig.pos.push(0, 0, 0);
                        bodyConfig.posShape.push(localPosition.x);
                        bodyConfig.posShape.push(localPosition.y);
                        bodyConfig.posShape.push(localPosition.z);
    
                        bodyConfig.rotShape.push(rot.x * radToDeg);
                        bodyConfig.rotShape.push(rot.y * radToDeg);
                        bodyConfig.rotShape.push(rot.z * radToDeg);
                    }
                    
                    let sizeX,sizeY,sizeZ;
                    // register mesh
                    switch (i.type) {
                        case ImpostorType.ParticleImpostor:
                            console.warn("No Particle support in OIMO.js. using SphereImpostor instead");
                        case ImpostorType.SphereImpostor:
                            let  radiusX = extendSize.x;
                            let  radiusY = extendSize.y;
                            let  radiusZ = extendSize.z;
    
                            let  size = Math.max(
                                this.checkWithEpsilon(radiusX),
                                this.checkWithEpsilon(radiusY),
                                this.checkWithEpsilon(radiusZ)) / 2;
    
                            bodyConfig.type.push('sphere');
                            //due to the way oimo works with compounds, add 3 times
                            bodyConfig.size.push(size);
                            bodyConfig.size.push(size);
                            bodyConfig.size.push(size);
                            break;
    
                        case ImpostorType.CylinderImpostor:
                            sizeX = this.checkWithEpsilon(extendSize.x) / 2;
                            sizeY = this.checkWithEpsilon(extendSize.y);
                            bodyConfig.type.push('cylinder');
                            bodyConfig.size.push(sizeX);
                            bodyConfig.size.push(sizeY);
                            //due to the way oimo works with compounds, add one more value.
                            bodyConfig.size.push(sizeY);
                            break;
                        case ImpostorType.PlaneImpostor:
                        case ImpostorType.NoImpostor:
                        case ImpostorType.BoxImpostor:
                        default:
                            sizeX = this.checkWithEpsilon(extendSize.x);
                            sizeY = this.checkWithEpsilon(extendSize.y);
                            sizeZ = this.checkWithEpsilon(extendSize.z);
    
                            bodyConfig.type.push('box');
                            //if (i === impostor) {
                            bodyConfig.size.push(sizeX);
                            bodyConfig.size.push(sizeY);
                            bodyConfig.size.push(sizeZ);
                            //} else {
                            //    bodyConfig.size.push(0,0,0);
                            //}
                            break;
                    }
    
                    // //actually not needed, but hey...
                    i.object.localRotate = oldQuaternion;
                });
    
                impostor.physicsBody = this.world.add(bodyConfig);
                // set the quaternion, ignoring the previously defined (euler) rotation
                impostor.physicsBody.resetQuaternion(globalQuat);
                // update with delta 0, so the body will reveive the new rotation.
                impostor.physicsBody.updatePosition(0);

                //计算重心对显示模型原点的偏差
                let massCenter = help_v3;
                let p = impostor.physicsBody.position;
                math.vec3Set(massCenter,p.x,p.y,p.z);
                
                impostor.physicsBody.position;
                let wpos = impostor.object.getWorldPosition();
                if(!math.vec3Equal(massCenter,wpos)){
                    let scale = help_v3_1;
                    math.vec3Clone(impostor.object.getWorldScale(),scale);
                    scale.x = 1/scale.x ; scale.y = 1/scale.y ; scale.z = 1/scale.z ;
                    math.vec3Subtract(wpos,massCenter,this._tmpPositionVector);
                    math.vec3ScaleByVec3(this._tmpPositionVector, scale ,this._tmpPositionVector);
                }
            
            }else{
                this._tmpPositionVector.x = this._tmpPositionVector.y = this._tmpPositionVector.z = 0; 
            }

            impostor.setDeltaPosition(this._tmpPositionVector);

        }

        private _tmpPositionVector: gd3d.math.vector3 = new gd3d.math.vector3();

        public removePhysicsBody(impostor: PhysicsImpostor) {
            // impostor.physicsBody.removeEventListener("collide", impostor.onCollide);
            // this.world.removeEventListener("preStep", impostor.beforeStep);
            // this.world.removeEventListener("postStep", impostor.afterStep);
            this.world.removeRigidBody(impostor.physicsBody);
        }

        public generateJoint(impostorJoint: PhysicsImpostorJoint) {
            let mainBody = impostorJoint.mainImpostor.physicsBody;
            let connectedBody = impostorJoint.connectedImpostor.physicsBody;

            if (!mainBody || !connectedBody) {
                return;
            }
            let jointData = impostorJoint.joint.jointData;
            let options = jointData.nativeParams || {};
            let type;
            
            let nativeJointData: any = {
                body1: mainBody,
                body2: connectedBody,

                axe1: options.axe1 || (jointData.mainAxis ? physicTool.vec3AsArray(jointData.mainAxis): null),
                axe2: options.axe2 || (jointData.connectedAxis ? physicTool.vec3AsArray(jointData.connectedAxis) : null),
                pos1: options.pos1 || (jointData.mainPivot ? physicTool.vec3AsArray(jointData.mainPivot) : null),
                pos2: options.pos2 || (jointData.connectedPivot ? physicTool.vec3AsArray(jointData.connectedPivot) : null),

                min: options.min,
                max: options.max,
                collision: options.collision || jointData.collision,
                spring: options.spring,

                //supporting older version of Oimo
                world: this.world

            };
            switch (impostorJoint.joint.type) {
                case PhysicsJoint.BallAndSocketJoint:
                    type = "jointBall";
                    break;
                case PhysicsJoint.SpringJoint:
                    console.warn("OIMO.js doesn't support Spring Constraint. Simulating using DistanceJoint instead");
                    let springData = <SpringJointData>jointData;
                    nativeJointData.min = springData.length || nativeJointData.min;
                    //Max should also be set, just make sure it is at least min
                    nativeJointData.max = Math.max(nativeJointData.min, nativeJointData.max);
                case PhysicsJoint.DistanceJoint:
                    type = "jointDistance";
                    nativeJointData.max = (<DistanceJointData>jointData).maxDistance;
                    break;
                case PhysicsJoint.PrismaticJoint:
                    type = "jointPrisme";
                    break;
                case PhysicsJoint.SliderJoint:
                    type = "jointSlide";
                    break;
                case PhysicsJoint.WheelJoint:
                    type = "jointWheel";
                    break;
                case PhysicsJoint.HingeJoint:
                default:
                    type = "jointHinge";
                    break;
            }
            nativeJointData.type = type;
            impostorJoint.joint.physicsJoint = this.world.add(nativeJointData);
        }

        public removeJoint(impostorJoint: PhysicsImpostorJoint) {
            try{
                this.world.removeConstraint(impostorJoint.joint.physicsJoint);
            }catch(e){
                console.warn(e);
            }
        }
       
        public setTransformationFromPhysicsBody(impostor: PhysicsImpostor) {
            physicTool.Ivec3Copy(impostor.physicsBody.position,impostor.object.localPosition);
            physicTool.IQuatCopy(impostor.physicsBody.quaternion,impostor.object.localRotate);
            let obj = impostor.object;
            if(obj.parent && obj.parent.parent){  //world 不等同 local 坐标空间时 设置到 世界空间
                obj.setWorldRotate(obj.localRotate);
                obj.setWorldPosition(obj.localPosition);
            }

            // impostor.object.position.copyFrom(impostor.physicsBody.position);
            // if (impostor.object.rotationQuaternion) {
            //     impostor.object.rotationQuaternion.copyFrom(impostor.physicsBody.quaternion);
            // }
        }

        public setPhysicsBodyTransformation(impostor: PhysicsImpostor, newPosition: math.vector3, newRotation: math.quaternion) {
            impostor.physicsBody.position.copy(newPosition);
            impostor.physicsBody.quaternion.copy(newRotation);
            impostor.physicsBody.syncShapes();
            impostor.physicsBody.awake();
        }

        public isSupported(): boolean {
            return this.BJSOIMO !== undefined;
        }

        public setLinearVelocity(impostor: PhysicsImpostor, velocity: math.vector3) {
            impostor.physicsBody.velocity.copy(velocity);
        }

        public setAngularVelocity(impostor: PhysicsImpostor, velocity: math.vector3) {
            impostor.physicsBody.angularVelocity.copy(velocity);
        }

        public getLinearVelocity(impostor: PhysicsImpostor): math.vector3 {
            let v = impostor.physicsBody.velocity;
            if (!v) {
                return null;
            }
            return new math.vector3(v.x, v.y, v.z)
        }
        public getAngularVelocity(impostor: PhysicsImpostor):math.vector3 {
            let v = impostor.physicsBody.angularVelocity;
            if (!v) {
                return null;
            }
            return new math.vector3(v.x, v.y, v.z)
        }

        public setBodyMass(impostor: PhysicsImpostor, mass: number) {
            let staticBody: boolean = mass === 0;
            //this will actually set the body's density and not its mass.
            //But this is how oimo treats the mass variable.
            impostor.physicsBody.shapes.density = staticBody ? 1 : mass;
            impostor.physicsBody.setupMass(staticBody ? 0x2 : 0x1);
        }

        public getBodyMass(impostor: PhysicsImpostor): number {
            return impostor.physicsBody.shapes.density;
        }

        public getBodyFriction(impostor: PhysicsImpostor): number {
            return impostor.physicsBody.shapes.friction;
        }

        public setBodyFriction(impostor: PhysicsImpostor, friction: number) {
            impostor.physicsBody.shapes.friction = friction;
        }

        public getBodyRestitution(impostor: PhysicsImpostor): number {
            return impostor.physicsBody.shapes.restitution;
        }

        public setBodyRestitution(impostor: PhysicsImpostor, restitution: number) {
            impostor.physicsBody.shapes.restitution = restitution;
        }

        public sleepBody(impostor: PhysicsImpostor) {
            impostor.physicsBody.sleep();
        }

        public isSleeping(impostor: PhysicsImpostor){
            return impostor.physicsBody.sleeping;
        }

        public wakeUpBody(impostor: PhysicsImpostor) {
            impostor.physicsBody.awake();
        }

        public updateDistanceJoint(joint: PhysicsJoint, maxDistance: number, minDistance?: number) {
            joint.physicsJoint.limitMotor.upperLimit = maxDistance;
            if (minDistance !== void 0) {
                joint.physicsJoint.limitMotor.lowerLimit = minDistance;
            }
        }

        public setMotor(joint: IMotorEnabledJoint, speed?: number, force?: number, motorIndex?: number) {
            if (force !== undefined) {
                console.warn("OimoJS plugin currently has unexpected behavior when using setMotor with force parameter");
            } else {
                force = 1e6;
            }
            speed *= -1;
    
            //TODO separate rotational and transational motors.
            let motor = motorIndex ? joint.physicsJoint.rotationalLimitMotor2 : joint.physicsJoint.rotationalLimitMotor1 || joint.physicsJoint.rotationalLimitMotor || joint.physicsJoint.limitMotor;
            if (motor) {
                motor.setMotor(speed, force);
            }
        }

        public setLimit(joint: IMotorEnabledJoint, upperLimit: number, lowerLimit?: number , motorIndex?: number) {
            //TODO separate rotational and transational motors.
            let motor = motorIndex ? joint.physicsJoint.rotationalLimitMotor2 : joint.physicsJoint.rotationalLimitMotor1 || joint.physicsJoint.rotationalLimitMotor || joint.physicsJoint.limitMotor;
            if (motor) {
                motor.setLimit(upperLimit, lowerLimit === void 0 ? -upperLimit : lowerLimit);
            }
        }

        // public syncMeshWithImpostor(mesh: AbstractMesh, impostor: PhysicsImpostor) {
        //     var body = impostor.physicsBody;
        //     mesh.position.x = body.position.x;
        //     mesh.position.y = body.position.y;
        //     mesh.position.z = body.position.z;

        //     if (mesh.rotationQuaternion) {
        //         mesh.rotationQuaternion.x = body.orientation.x;
        //         mesh.rotationQuaternion.y = body.orientation.y;
        //         mesh.rotationQuaternion.z = body.orientation.z;
        //         mesh.rotationQuaternion.w = body.orientation.s;
        //     }
        // }

        public getRadius(impostor: PhysicsImpostor): number {
            return impostor.physicsBody.shapes.radius;
        }

        public getBoxSizeToRef(impostor: PhysicsImpostor, result: math.vector3): void {
            let shape = impostor.physicsBody.shapes;
            result.x = shape.halfWidth * 2;
            result.y = shape.halfHeight * 2;
            result.z = shape.halfDepth * 2;
        }

        public dispose() {
            this.world.clear();
        }

    }

}