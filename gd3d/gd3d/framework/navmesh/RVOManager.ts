//导航RVO_防挤Demo
declare var RVO;
namespace gd3d.framework {
    export class RVOManager {

        public sim = new RVO.Simulator(1, 60, 20, 20, 5, 1.0, 0.1, [0, 0]);

        public transforms:gd3d.framework.transform[] = [];
        public goals = [];
        public radius: number[] = [];
        public attackRanges: number[] = [];
        public speeds: number[] = [];

        private map: { [key: number]: number } = {};

        private isRunning: boolean = false;
        private currGoal:gd3d.math.vector3;
        private lastGoal:gd3d.math.vector3;
        private currMoveDir:gd3d.math.vector2 = new gd3d.math.vector2();

        private _RoadPoints:gd3d.math.vector3[] = [];
        public setRoadPoints(goalQueue:gd3d.math.vector3[]){
            if(!goalQueue || goalQueue.length<1) return;
            //clear history
            this._RoadPoints.forEach(sub=>{
                if(sub && sub != this.lastGoal) gd3d.math.pool.delete_vector3(sub);
            });
            this._RoadPoints.length = 0;

            for(var i=0 ;i< goalQueue.length ;i++){
                let v3 = gd3d.math.pool.new_vector3();
                gd3d.math.vec3Clone(goalQueue[i],v3);
                this._RoadPoints.push(v3);
            }
            this.currGoal = this._RoadPoints.pop();
            this.goals[0][0] = this.currGoal.x;
            this.goals[0][1] = this.currGoal.z;
        }

        public addAgent(key: number, transform: gd3d.framework.transform, radius: number, attackRanges: number, speed: number) {
            let index = this.sim.agents.length;
            let current_position = [transform.localTranslate.x, transform.localTranslate.z];

            this.transforms.push(transform);
            this.attackRanges.push(attackRanges);
            this.radius.push(radius);
            this.speeds.push(speed);
            this.goals.push(current_position);

            this.sim.addAgent(current_position);

            this.sim.agents[index].id = key;
            this.sim.agents[index].radius = radius;
            this.sim.agents[index].maxSpeed = speed;

            this.map[key] = index;  // 添加 key

            if(index == 0) {
                this.sim.agents[0].neighborDist = 0; // 玩家无视小怪
            }
            this.isRunning = true;
        }

        public removeAgent(key: number) {
            let offset = this.map[key];

            this.transforms.splice(offset, 1);
            this.attackRanges.splice(offset, 1);
            this.radius.splice(offset, 1);
            this.speeds.splice(offset, 1);
            this.goals.splice(offset, 1);
            this.sim.agents.splice(offset, 1);

            this.reBuildHashMap();
        }

        private reBuildHashMap() {
            for(let i = 0; i < this.sim.agents.length; i++) {
                this.map[this.sim.agents[i].id] = i;
            }

            this.sim.kdTree.agents = [];
            this.sim.kdTree.agentTree = [];
            this.sim.kdTree.obstacleTree = 0;
        }

        public getTransformByKey(key: number): gd3d.framework.transform {
            let offset = this.map[key];
            return this.transforms[offset];
        }

        public setRadius(id: number, value: number) {
            let i = this.map[id];
            this.sim.agents[i].radius = value;
        }
        public setSpeed(id: number, value: number) {
            let i = this.map[id];
            this.sim.agents[i].maxSpeed = value;
        }
        public setAttackRange(id: number, value: number) {
            let i = this.map[id];
            this.attackRanges[i] = value;
        }

        public disable() {
            this.isRunning = false;
        }

        public enable() {
            this.isRunning = true;
            // 更新位置
            for(let i in this.transforms) {
                this.sim.agents[i].position = [this.transforms[i].localTranslate.x, this.transforms[i].localTranslate.z];
            }
        }

        public update() {
            if(this.isRunning && (this.transforms.length >= 1)) {
                this.RVO_check(this.sim, this.goals);
                this.RVO_walking(this.sim, this.goals);
                this.updateTransform(this.sim);
            }
        }

        private isAlmostStatic():boolean {
            let threshold = 0.1;
            let amount = 0;
            for(let i = 0; i < this.sim.agents.length; i++) {
                if(this.sim.agents[i].prefVelocity != null) {
                    if(this.sim.agents[i].prefVelocity[0] < 0.01 && this.sim.agents[i].prefVelocity[1] < 0.01) {
                        amount++;
                    }
                }
            }
            if(amount/this.sim.agents.length >= threshold) {
                return true;
            }
            return false;
        }


        private RVO_walking(sim, goals) {
            // 据当前目标重新获取目标方向向量
            for (var i = 0, len = sim.agents.length; i < len; i ++) {
                if(sim.agents[i] != null) {
                    var goalVector = RVO.Vector.subtract(goals[i], sim.agents[i].position);
                    if (RVO.Vector.absSq(goalVector) > 1) {
                        goalVector = RVO.Vector.normalize(goalVector);
                    }
                    sim.agents[i].prefVelocity = goalVector; // 更新速度向量
                }
            }
            sim.doStep();   // 移动一帧
        }

        private updateTransform(sim) {
            for(let i = 0; i < sim.agents.length; i++) {
                this.transforms[i].localTranslate.x = sim.agents[i].position[0];
                this.transforms[i].localTranslate.z = sim.agents[i].position[1];
                // Y轴
                if(i == 0 && this.currGoal && this.lastGoal){
                    let pos = this.transforms[i].localTranslate;
                    let nowDir = gd3d.math.pool.new_vector2();
                    this.cal2dDir(this.lastGoal,pos,nowDir);
                    let nowLen = gd3d.math.vec2Length(nowDir);
                    let tLen = gd3d.math.vec2Length(this.currMoveDir);
                    let y = gd3d.math.numberLerp(this.lastGoal.y,this.currGoal.y,nowLen/tLen);
                    if(!isNaN(y)) {
                        pos.y = gd3d.math.numberLerp(this.lastGoal.y,this.currGoal.y,nowLen/tLen);
                    }
                    //console.error(`nowLen/tLen :${nowLen}/${tLen}   ,  pos y:${pos.y}  ,this.lastGoal: ${this.lastGoal.x} ,${this.lastGoal.y} ,${this.lastGoal.z} `);
                    gd3d.math.pool.delete_vector2(nowDir);
                }

                this.transforms[i].markDirty();
            }
        }
        // subGoal = [];
        // private generateRandomSubGoal(position, velocity) {
        //     let monster_velocity    = new gd3d.math.vector2(velocity[0], velocity[1]);
        //     gd3d.math.vec2Normalize(monster_velocity, monster_velocity);
        //     let direction_cos       = gd3d.math.vec2Dot(monster_velocity, new gd3d.math.vector2(1.0, 0.0));
        //     let direction_sin       = Math.sqrt(1 - direction_cos * direction_cos);
        //     // let monster_direction   = Math.acos(direction_cos);
        //     let monster_position    = new gd3d.math.vector3(position[0], position[1], 0);
        //     // let monster_Matrix      = new gd3d.math.matrix(new Float32Array([
        //     //     direction_cos, direction_sin, 0, 0,
        //     //     -direction_sin, direction_cos, 0, 0,
        //     //     0, 0, 1, 0,
        //     //     0, 0, 0, 1
        //     // ]));
        //
        //     let subGoal_Position = [
        //         [1.0, 0.0],
        //         [-1.0, 0.0],
        //         [0.0, 1.0],
        //         [0.0, -1.0],
        //     ];
        //     let p = subGoal_Position[Math.round(Math.random() * 6)];
        //     // gd3d.math.matrixMultiply(monster_Matrix);
        // }

        private RVO_check(sim, goals) {
            // 玩家根据 NavMesh 切换目标
            if(this.currGoal){
                let player = this.transforms[0];
                //达到目标点
                let v2_0 = gd3d.math.pool.new_vector2();
                v2_0.x = player.localTranslate.x; v2_0.y = player.localTranslate.z;
                let v2_1 = gd3d.math.pool.new_vector2();
                v2_1.x = this.currGoal.x; v2_1.y = this.currGoal.z;
                let dis = gd3d.math.vec2Distance(v2_0,v2_1);
                if(dis<0.01){
                    if(this.currGoal){
                        if(this.lastGoal) gd3d.math.pool.delete_vector3(this.lastGoal);
                        this.lastGoal = this.currGoal;
                        this.currGoal = null;
                        goals[0] = sim.agents[0].position;
                        sim.agents[0].radius = this.radius[0];
                    }
                    if(this._RoadPoints && this._RoadPoints.length >0) {
                        this.currGoal = this._RoadPoints.pop();
                        this.cal2dDir(this.lastGoal, this.currGoal, this.currMoveDir);
                        goals[0] = [this.currGoal.x, this.currGoal.z];
                        sim.agents[0].radius = 0.1;
                    }
                }

            }else if(this._RoadPoints && this._RoadPoints.length >0){
                //切换下一目标
                this.currGoal = this._RoadPoints.pop();
                goals[0] = [this.currGoal.x, this.currGoal.z];
                sim.agents[0].radius = 0.1;

            }

            // 小怪的目标
            for (var i = 1, len = sim.agents.length; i < len; i ++) {
                let range = RVO.Vector.absSq(RVO.Vector.subtract(sim.agents[i].position, sim.agents[0].position));
                if (range < this.attackRanges[i] ) {
                    goals[i] = sim.agents[i].position;  // Stop
                    sim.agents[i].neighborDist = 0;
                } else {
                    goals[i] = sim.agents[0].position;
                    sim.agents[i].neighborDist = sim.agentDefaults.neighborDist;
                }
            }

        }

        private cal2dDir(oPos:gd3d.math.vector3,tPos:gd3d.math.vector3,out:gd3d.math.vector2){
            if(!oPos || !tPos || !out)  return;
            let ov2 = gd3d.math.pool.new_vector2();
            ov2.x = oPos.x; ov2.y = oPos.z;
            let tv2 = gd3d.math.pool.new_vector2();
            tv2.x = tPos.x; tv2.y = tPos.z;
            gd3d.math.vec2Subtract(tv2,ov2,out);
            gd3d.math.pool.delete_vector2(ov2);
            gd3d.math.pool.delete_vector2(tv2);
        }

    }
}
