namespace gd3d.framework {
    export class Navigate {
        public navindexmap: { [id: number]: number };
        public navinfo: navMeshInfo

        constructor(navinfo: gd3d.framework.navMeshInfo, navindexmap: any) {
            this.navinfo = navinfo;
            this.navindexmap = navindexmap;
        }

        public pathPoints(start: gd3d.math.vector3, end: gd3d.math.vector3, startIndex: number, endIndex: number): Array<gd3d.math.vector3> {

            var startVec = new navVec3();
            startVec.x = start.x;
            startVec.y = start.y;
            startVec.z = start.z;
            var endVec = new navVec3();
            endVec.x = end.x;
            endVec.y = end.y;
            endVec.z = end.z;

            var startPoly = this.navindexmap[startIndex];
            var endPoly = this.navindexmap[endIndex];
            if (startPoly >= 0 && endPoly >= 0) {
                var polyPath = gd3d.framework.pathFinding.calcAStarPolyPath(this.navinfo, startPoly, endPoly, endVec, 0.3);
            }
            if (polyPath) {
                var wayPoints = gd3d.framework.pathFinding.calcWayPoints(this.navinfo, startVec, endVec, polyPath);
                var navmeshWayPoints: Array<gd3d.math.vector3> = [];
                for (var i: number = 0; i < wayPoints.length; i++) {
                    navmeshWayPoints[i] = new gd3d.math.vector3(wayPoints[i].x, wayPoints[i].realy, wayPoints[i].z);
                }
                return navmeshWayPoints;
            } else {
                return null;
            }
        }
        public dispose() {

            this.navinfo = null;
            this.navindexmap = null;

        }
    }
}
