namespace gd3d.framework {

    export interface PhysicsJointData {
        //Important for some engines, optional!
        /**
         * The main pivot of the joint
         */
        mainPivot?: math.vector3;
        /**
         * The connected pivot of the joint
         */
        connectedPivot?: math.vector3;
        /**
         * The main axis of the joint
         */
        mainAxis?: math.vector3,
        /**
         * The connected axis of the joint
         */
        connectedAxis?: math.vector3,
        /**
         * The collision of the joint
         */
        collision?: boolean
        /**
         * Native Oimo/Cannon/Energy data
         */
        nativeParams?: any;
    }

    /**
     * This is a holder class for the physics joint created by the physics plugin.
     * It holds a set of functions to control the underlying joint.
     */
    export class PhysicsJoint {

        private _physicsJoint: any;
        protected _physicsPlugin: IPhysicsEnginePlugin;

        constructor(public type: number, public jointData: PhysicsJointData) {
            jointData.nativeParams = jointData.nativeParams || {};
        }

        public get physicsJoint(): any {
            return this._physicsJoint;
        }

        public set physicsJoint(newJoint: any) {

            if (this._physicsJoint) {
                //remove from the wolrd
            }

            this._physicsJoint = newJoint;
        }

        public set physicsPlugin(physicsPlugin: IPhysicsEnginePlugin) {
            this._physicsPlugin = physicsPlugin;
        }
        
        /**
         * Execute a function that is physics-plugin specific.
         * @param {Function} func the function that will be executed. 
         *                        It accepts two parameters: the physics world and the physics joint.
         */
        public executeNativeFunction(func : (world: any, physicsJoint:any) => void) {
            func(this._physicsPlugin.world, this._physicsJoint)
        }


        //TODO check if the native joints are the same

        //Joint Types
        /**
         * Distance-Joint type
         */
        public static DistanceJoint = 0;
        /**
         * Hinge-Joint type
         */
        public static HingeJoint = 1;
        /**
         * Ball-and-Socket joint type
         */
        public static BallAndSocketJoint = 2;
        /**
         * Wheel-Joint type
         */
        public static WheelJoint = 3;
        /**
         * Slider-Joint type
         */
        public static SliderJoint = 4;
        //OIMO
        /**
         * Prismatic-Joint type
         */
        public static PrismaticJoint = 5;
        //
        /**
         * Universal-Joint type
         */
        public static UniversalJoint = 6;
        /**
         * Hinge-Joint 2 type
         */
        public static Hinge2Joint = PhysicsJoint.WheelJoint;
        //Cannon
        /**
         * Point to Point Joint type.  Similar to a Ball-Joint.  Different in parameters
         */
        public static PointToPointJoint = 8;
        //Cannon only at the moment
        /**
         * Spring-Joint type
         */
        public static SpringJoint = 9;
        /**
         * Lock-Joint type
         */
        public static LockJoint = 10;
    }

    /**
     * A class representing a physics distance joint.
     */
    export class DistanceJoint extends PhysicsJoint {
        constructor(jointData: DistanceJointData) {
            super(PhysicsJoint.DistanceJoint, jointData);
        }

        /**
         * Update the predefined distance.
         */
        public updateDistance(maxDistance: number, minDistance?: number) {
            this._physicsPlugin.updateDistanceJoint(this, maxDistance, minDistance);
        }
    }
    
    /**
     * Represents a Motor-Enabled Joint
     */
    export class MotorEnabledJoint extends PhysicsJoint implements IMotorEnabledJoint {
        
        constructor(type: number, jointData:PhysicsJointData) {
            super(type, jointData);
        }
        
        /**
         * Set the motor values.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         * @param {number} force the force to apply
         * @param {number} maxForce max force for this motor.
         */
        public setMotor(force?: number, maxForce?: number) {
            this._physicsPlugin.setMotor(this, force || 0, maxForce);
        }
        
        /**
         * Set the motor's limits.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         */
        public setLimit(upperLimit: number, lowerLimit?: number) {
            this._physicsPlugin.setLimit(this, upperLimit, lowerLimit);
        }
    }

    /**
     * This class represents a single hinge physics joint
     */
    export class HingeJoint extends MotorEnabledJoint {
        
        constructor(jointData:PhysicsJointData) {
            super(PhysicsJoint.HingeJoint, jointData);
        }
        
        /**
         * Set the motor values.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         * @param {number} force the force to apply
         * @param {number} maxForce max force for this motor.
         */
        public setMotor(force?: number, maxForce?: number) {
            this._physicsPlugin.setMotor(this, force || 0, maxForce);
        }
        
        /**
         * Set the motor's limits.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         */
        public setLimit(upperLimit: number, lowerLimit?: number) {
            this._physicsPlugin.setLimit(this, upperLimit, lowerLimit);
        }
    }
    
    /**
     * This class represents a dual hinge physics joint (same as wheel joint)
     */
    export class Hinge2Joint extends MotorEnabledJoint {
        
        constructor(jointData:PhysicsJointData) {
            super(PhysicsJoint.Hinge2Joint, jointData);
        }
        
        /**
         * Set the motor values.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         * @param {number} force the force to apply
         * @param {number} maxForce max force for this motor.
         * @param {motorIndex} the motor's index, 0 or 1.
         */
        public setMotor(force?: number, maxForce?: number, motorIndex: number = 0) {
            this._physicsPlugin.setMotor(this, force || 0, maxForce, motorIndex);
        }
        
        /**
         * Set the motor limits.
         * Attention, this function is plugin specific. Engines won't react 100% the same.
         * @param {number} upperLimit the upper limit
         * @param {number} lowerLimit lower limit
         * @param {motorIndex} the motor's index, 0 or 1.
         */
        public setLimit(upperLimit: number, lowerLimit?: number, motorIndex: number = 0) {
            this._physicsPlugin.setLimit(this, upperLimit, lowerLimit, motorIndex);
        }
    }

    /**
     * Interface for a motor enabled joint
     */
    export interface IMotorEnabledJoint {
        physicsJoint: any;
        setMotor(force?: number, maxForce?: number, motorIndex?: number): void;
        setLimit(upperLimit: number, lowerLimit?: number, motorIndex?: number): void;
    }

    /**
     * Joint data for a Distance-Joint
     */
    export interface DistanceJointData extends PhysicsJointData {
        maxDistance: number;
        //Oimo - minDistance
        //Cannon - maxForce
    }
    /**
     * Joint data from a spring joint
     */
    export interface SpringJointData extends PhysicsJointData {
        length: number;
        stiffness: number;
        damping: number;
    }
}