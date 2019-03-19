namespace gd3d.framework {
    // export declare let physic: PhysicsEngine;
    //export declare let physic2D: physicEngine2D;

    export interface Itiming {
        timeScale?: number;
        timestamp?: number;
    }
    export interface IEngine2DOP {
        constraintIterations?: number;
        timing?: Itiming;
        velocityIterations?: number;
    }
    declare var Matter: any;
    export class physicEngine2D {
        matterEngine: any;
        private engineWorld: any;
        private matterVector: matterVector;
        public constructor(op: IEngine2DOP = null) {
            if (Matter == undefined) {
                console.error("2d physic not supportted");
            }
            if (op != null) {
                this.matterEngine = Matter.Engine.create(op);
            } else {
                this.matterEngine = Matter.Engine.create();
            }
            this.engineWorld = this.matterEngine.world;
            this.matterVector = Matter.Vector;

            //---------run the engine
            Matter.Engine.run(this.matterEngine);
        }

        update(delta: number) {
            Matter.Engine.update(this.matterEngine, delta);
        }
        // public creatRectBody(posx:number,posy:number,width:number,height:number,beStatic:boolean=false):Ibody
        // {
        //     let body:Ibody;
        //     if(beStatic)
        //     {
        //         body=Matter.Bodies.rectangle(posx,posy,width,height,{isStatic: true});
        //     }else
        //     {
        //         body=Matter.Bodies.rectangle(posx,posy,width,height);
        //     }
        //     this.addBody(body);
        //     return body;
        // }

        // public creatCircle(posx:number,posy:number,radius:number,beStatic:boolean=false):Ibody
        // {
        //     let body:Ibody;
        //     if(beStatic)
        //     {
        //         body=Matter.Bodies.circle(posx, posy, radius,{isStatic: true});
        //     }else
        //     {
        //         body=Matter.Bodies.circle(posx, posy, radius);
        //     }
        //     this.addBody(body);
        //     return body;
        // }

        public creatRectBodyByInitData(posx: number, posy: number, width: number, height: number, initData: IBodyData) {
            let body = Matter.Bodies.rectangle(posx, posy, width, height, initData);
            this.addBody(body);
            return body;
        }

        public creatCircleBodyByInitData(posx: number, posy: number, radius: number, initData: IBodyData) {
            let body = Matter.Bodies.circle(posx, posy, radius, initData);
            this.addBody(body);
            return body;
        }

        public addBody(body: Ibody) {
            Matter.World.add(this.engineWorld, body);
        }

        public applyForce(body: Ibody, positon: math.vector2, force: math.vector2): void {
            Matter.Body.applyForce(body, this.matterVector.create(positon.x, positon.y), this.matterVector.create(force.x, force.y));
        }

        public applyForceAtCenter(body: Ibody, force: math.vector2): void {
            Matter.Body.applyForce(body, body.position, this.matterVector.create(force.x, force.y));
        }

        public setGravity(x: number, y: number) {
            this.engineWorld.gravity.x = x;
            this.engineWorld.gravity.y = y;
        }

        public setVelocity(body: Ibody, velocity: math.vector2) {
            Matter.Body.setVelocity(body, this.matterVector.create(velocity.x, velocity.y));
        }

        public setPosition(body: Ibody, pos: math.vector2) {
            Matter.Body.setPosition(body, this.matterVector.create(pos.x, pos.y));
        }

        public setMass(body: Ibody, mass: number) {
            Matter.Body.setMass(body, mass);
        }

        public setDesity(body: Ibody, Desity: number) {
            this.set(body, "desity", Desity);
        }
        public setFrictionAir(body: Ibody, frictionAir: number) {
            this.set(body, "frictionAir", frictionAir);
        }
        public setFriction(body: Ibody, friction: number) {
            this.set(body, "friction", friction);
        }
        public setFrictionStatic(body: Ibody, frictionStatic: number) {
            this.set(body, "frictionStatic", frictionStatic);
        }
        public setRestitution(body: Ibody, restitution: number) {
            this.set(body, "restitution", restitution);
        }

        public setAngularVelocity(body: Ibody, angularVelocity: number) {
            this.set(body, "angularVelocity", angularVelocity);
        }
        private set(body: Ibody, settings: string, value: any) {
            Matter.Body.set(body, settings, value)
        }

        public addEvent(eventname: string, callback: Function) {
            Matter.Events.on(this.matterEngine, eventname, callback);
        }

        public removeEvent(eventname: string, callback: Function) {
            Matter.Events.off(this.matterEngine, eventname, callback);
        }

        public removeBody(body: Ibody) {

            Matter.World.remove(this.engineWorld, body);
        }
    }

    export interface Ibody {

        angle: number;
        position: matterVector;
        speed: number;
        type: string;
        tag: string;
        name: string;
        angularVelocity:number;
        velocity:matterVector;
        collisionFilter: collisionFilter;
        applyForce(body: Ibody, positon: matterVector, force: matterVector): void;
    }

    export interface matterVector {
        x: number;
        y: number;
        create(x: number, y: number): matterVector
    }

    export interface collisionFilter {
        group?: number;
        category?: number;
        mask?: number;
    }
}