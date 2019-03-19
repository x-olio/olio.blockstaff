///<reference path="MeshInfo.ts" />
//v0.1
namespace gd3d.framework {
    class FindNode {
        nodeid: number = 0;
        pathSessionId: number = 0;
        ParentID: number = -1;
        Open: boolean = false;
        HValue: number = 0;
        GValue: number = 0;
        ArrivalWall: number = 0;
        CalcHeuristic(info: navMeshInfo, endPos: navVec3): void {
            var center: navVec3 = info.nodes[this.nodeid].center;
            var num: number = Math.abs(center.x - endPos.x);
            var num2: number = Math.abs(center.z - endPos.z);
            this.HValue = Math.sqrt(num * num + num2 * num2);
        }
        GetCost(info: navMeshInfo, neighborID: number): number {
            var bc = info.nodes[neighborID].center;
            var nc = info.nodes[this.nodeid].center;

            var xd = bc.x - nc.x;
            var yd = bc.y - nc.y;
            var zd = bc.z - nc.z;
            var d = Math.sqrt(xd * xd + yd * yd + zd * zd);
            return d;

        }
    }
    export class pathFinding {
        static calcAStarPolyPath(info: navMeshInfo, startPoly: number, endPoly: number, endPos: navVec3 = null, offset: number = 0.1): number[] {
            var nodeFind: FindNode[] = [];// new List<FindNode>();
            var nodes: navNode[] = info.nodes;
            for (var i: number = 0; i < nodes.length; i = i + 1) {
                var navNode: navNode = nodes[i];
                var findNode: FindNode = new FindNode();
                findNode.nodeid = navNode.nodeID;
                nodeFind.push(findNode);
            }
            var flag: boolean = endPos === null;
            if (flag) {
                endPos = info.nodes[endPoly].center.clone();
            }
            var findNode2: FindNode = nodeFind[startPoly];
            findNode2.nodeid = startPoly;
            var num: number = 1;
            var flag2: boolean = false;
            var openList: number[] = [];//new List<number>();
            var list2: number[] = [];//new List<number>();
            findNode2.pathSessionId = num;
            openList.push(startPoly);

            var sortfun: (x: number, y: number) => number = (x: number, y: number) => {
                var xFvalue: number = nodeFind[x].HValue + nodeFind[x].GValue;
                var yFvalue: number = nodeFind[y].HValue + nodeFind[y].GValue;

                if (xFvalue < yFvalue - 0.001)
                    return 1;
                if (xFvalue > yFvalue + 0.001)
                    return -1;
                return 0;

            };

            while (openList.length > 0) {
                var findNode3: FindNode = nodeFind[openList[openList.length - 1]]
                openList.splice(openList.length - 1, 1);
                list2.push(findNode3.nodeid);
                var flag3: boolean = findNode3.nodeid === endPoly;
                if (flag3) {
                    flag2 = true;
                    break;
                }
                var linked: number[] = info.nodes[findNode3.nodeid].getLinked(info);
                for (var j: number = 0; j < linked.length; j = j + 1) {
                    var num2: number = linked[j];
                    var flag4: boolean = num2 < 0;
                    if (!flag4) {
                        var findNode4: FindNode = nodeFind[num2];
                        var flag5: boolean = findNode4 === null || findNode4.nodeid !== num2;
                        if (flag5) {
                            return null;
                        }
                        var flag6: boolean = findNode4.pathSessionId !== num;
                        if (flag6) {
                            var text: string = info.nodes[findNode4.nodeid].isLinkTo(info, findNode3.nodeid);
                            var flag7: boolean = text !== null && info.borders[text].length >= offset * 2;
                            if (flag7) {
                                findNode4.pathSessionId = num;
                                findNode4.ParentID = findNode3.nodeid;
                                findNode4.Open = true;
                                findNode4.CalcHeuristic(info, endPos);
                                findNode4.GValue = findNode3.GValue + findNode3.GetCost(info, findNode4.nodeid);
                                openList.push(findNode4.nodeid);


                                openList.sort(sortfun);
                                findNode4.ArrivalWall = findNode3.nodeid;
                            }
                        }
                        else {
                            var open: boolean = findNode4.Open;
                            if (open) {
                                var flag8: boolean = findNode4.GValue + findNode4.GetCost(info, findNode3.nodeid) < findNode3.GValue;
                                if (flag8) {
                                    findNode3.GValue = findNode4.GValue + findNode4.GetCost(info, findNode3.nodeid);
                                    findNode3.ParentID = findNode4.nodeid;
                                    findNode3.ArrivalWall = findNode4.nodeid;
                                }
                            }
                        }
                    }
                }
            }
            var list3: number[] = [];
            var flag9: boolean = list2.length > 0;
            if (flag9) {
                var findNode5: FindNode = nodeFind[list2[list2.length - 1]];
                list3.push(findNode5.nodeid);
                while (findNode5.ParentID !== -1) {
                    list3.push(findNode5.ParentID);
                    findNode5 = nodeFind[findNode5.ParentID];
                }
            }
            // var flag10: boolean = !flag2;
            //if (flag10) {

            //    return null;
            //}

            return list3;
        }
        private static NearAngle(a: number, b: number): number {
            var num: number = a;
            var flag: boolean = a >= 180.0;
            if (flag) {
                num = 360.0 - a;
            }
            var num2: number = b;
            var flag2: boolean = b >= 180.0;
            if (flag2) {
                num2 = 360.0 - b;
            }
            var flag3: boolean = num < num2;
            var result: number;
            if (flag3) {
                result = a;
            }
            else {
                result = b;
            }
            return result;
        }
        static FindPath(info: navMeshInfo, startPos: navVec3, endPos: navVec3, offset: number = 0.1): navVec3[] {
            var startPoly: number = -1;
            var endPoly: number = -1;
            for (var i: number = 0; i < info.nodes.length; i = i + 1) {
                var flag: boolean = info.inPoly(startPos, info.nodes[i].poly);
                if (flag) {
                    startPoly = i;
                }
                var flag2: boolean = info.inPoly(startPos, info.nodes[i].poly);
                if (flag2) {
                    endPoly = i;
                }
            }
            var polyPath: number[] = pathFinding.calcAStarPolyPath(info, startPoly, endPoly, endPos, offset);
            return pathFinding.calcWayPoints(info, startPos, endPos, polyPath, offset);
        }

        static calcWayPoints(info: navMeshInfo, startPos: navVec3, endPos: navVec3, polyPath: number[], offset: number = 0.1): navVec3[] {
            var wayPoints: navVec3[] = [];// new List<navVec3>();
            if (polyPath.length == 0 || startPos == null || endPos == null) {
                return null;
            }
            let lastPoint:navVec3=startPos;
            let groupborder:navBorder[]=[];
            // 保证从起点到终点的顺序
            var triPathList: number[] = polyPath.reverse();
            startPos.realy=startPos.y;
            endPos.realy=endPos.y;
            wayPoints.push(startPos);

            var ipoly: number = 0;//从第0个poly 开始检查
            var dirLeft: navVec3 = null;
            var ipolyLeft: number = -1;
            var dirRight: navVec3 = null;
            var ipolyRight: number = -1;
            var breakDir: number = 0;
            var posLeft: navVec3 = null;
            var posRight: navVec3 = null;
            // let center:navVec3=null;
            var posNow: navVec3 = startPos.clone();

            for (var c: number = 0; c < 100; c++)//最多循环100次
            {
                for (var i = ipoly; i < triPathList.length; i++) {
                    if (i === triPathList.length - 1)//最后一节
                    {
                        if (dirLeft == null || dirRight == null) {
                            breakDir = 0;
                            break;
                        }
                        else {
                            var dirFinal: navVec3 = gd3d.framework.navVec3.NormalAZ(posNow, endPos);
                            var a1: number = gd3d.framework.navVec3.Angle(dirLeft, dirFinal);
                            var b1: number = gd3d.framework.navVec3.Angle(dirRight, dirFinal);
                            var flag4: boolean = a1 * b1 > 0.0;
                            if (a1 * b1 > 0.0) {
                                if (a1 > 0.0) {
                                    breakDir = 1;
                                }
                                else {
                                    breakDir = -1;
                                }
                            }
                            else {

                                breakDir = 0;
                                break;
                            }

                        }
                    }
                    else//检查是否通过
                    {
                        //寻找边

                        var n1: number = triPathList[i];
                        var n2: number = triPathList[i + 1];
                        var bname: string = n1 + "-" + n2;
                        if (n2 < n1) {
                            bname = n2 + "-" + n1;
                        }
                        var border: navBorder = info.borders[bname];
                        var pointA: navVec3 = gd3d.framework.navVec3.Border(info.vecs[border.pointA], info.vecs[border.pointB], offset);
                        var pointB: navVec3 = gd3d.framework.navVec3.Border(info.vecs[border.pointB], info.vecs[border.pointA], offset);
                        var dist1: number = gd3d.framework.navVec3.DistAZ(posNow, pointA);
                        var dist2: number = gd3d.framework.navVec3.DistAZ(posNow, pointB);
                        if (dist1 < 0.001 || dist2 < 0.001) {
                            continue;
                        }

                        if (dirLeft == null) {
                            dirLeft = gd3d.framework.navVec3.NormalAZ(posNow, pointA);
                            posLeft = pointA.clone();
                            ipolyLeft = i;
                        }
                        if (dirRight == null) {
                            dirRight = gd3d.framework.navVec3.NormalAZ(posNow, pointB);
                            posRight = pointB.clone();
                            ipolyRight = i;
                        }
                        var adir: number = gd3d.framework.navVec3.Angle(dirLeft, dirRight);
                        if (adir < 0.0)//change
                        {
                            var navVec7: navVec3 = dirLeft;
                            var navVec8: navVec3 = posLeft;
                            var num12: number = ipolyLeft;
                            dirLeft = dirRight;
                            posLeft = posRight;
                            ipolyLeft = ipolyRight;
                            dirRight = navVec7;
                            posRight = navVec8;
                            ipolyRight = num12;
                        }
                        if (ipolyLeft != i || ipolyRight != i)//检查是否能穿越
                        {
                            var ndirLeft: navVec3 = gd3d.framework.navVec3.NormalAZ(posNow, pointA);
                            var ndirRight: navVec3 = gd3d.framework.navVec3.NormalAZ(posNow, pointB);
                            var nadir: number = gd3d.framework.navVec3.Angle(ndirLeft, ndirRight);
                            if (nadir < 0.0)//change
                            {
                                var navVec11: navVec3 = ndirLeft;
                                var navVec12: navVec3 = pointA;
                                ndirLeft = ndirRight;
                                pointA = pointB;
                                ndirRight = navVec11;
                                pointB = navVec12;
                            }
                            var aLL: number = gd3d.framework.navVec3.Angle(dirLeft, ndirLeft);//>0 右侧，<0 左侧
                            var aRL: number = gd3d.framework.navVec3.Angle(dirRight, ndirLeft);
                            var aLR: number = gd3d.framework.navVec3.Angle(dirLeft, ndirRight);
                            var aRR: number = gd3d.framework.navVec3.Angle(dirRight, ndirRight);
                            if ((aLL < 0 && aLR < 0))//无法穿越
                            {
                                breakDir = -1;
                                break;
                            }
                            if (aRL > 0.0 && aRR > 0.0)//无法穿越
                            {
                                breakDir = 1;
                                break;
                            }
                            if (aLL > 0.0 && aRL < 0.0) {
                                dirLeft = ndirLeft;
                                posLeft = pointA;
                                ipolyLeft = i;

                                //groupborder.push(border);
                            }
                            if (aLR > 0.0 && aRR < 0.0) {
                                dirRight = ndirRight;
                                posRight = pointB;
                                ipolyRight = i;

                                //groupborder.push(border);
                            }
                        }

                    }

                }
                if (breakDir == 0) {
                    break;
                }
                else {
                    if (breakDir == -1) {
                        // for(let key in groupborder)
                        // {
                        //     let bor=groupborder[key];
                        //     let point=this.intersectBorder(info.vecs[bor.pointA],info.vecs[bor.pointB],posLeft,lastPoint);
                        //     if(point)
                        //     {
                        //         point.realy=point.y;
                        //         wayPoints.push(point);
                        //     }
                        // }
                        // lastPoint=posLeft;
                        // groupborder=[];



                        wayPoints.push(posLeft.clone());
                        posNow = posLeft;
                        ipoly = ipolyLeft;

                    }
                    else {
                        // for(let key in groupborder)
                        // {
                        //     let bor=groupborder[key];
                        //     let point=this.intersectBorder(info.vecs[bor.pointA],info.vecs[bor.pointB],posLeft,lastPoint);
                        //     if(point)
                        //     {
                        //         point.realy=point.y;
                        //         wayPoints.push(point);
                        //     }
                        // }
                        // lastPoint=posLeft;
                        // groupborder=[];

                        wayPoints.push(posRight.clone());
                        posNow = posRight;
                        ipoly = ipolyRight;
                    }
                    dirLeft = null;
                    dirRight = null;
                    ipolyLeft = -1;
                    ipolyRight = -1;
                }
            }
            wayPoints.push(endPos);

            return wayPoints;
        }

        static intersectBorder(a:navVec3, b:navVec3, c:navVec3, d:navVec3):navVec3{  

            //线段ab的法线N1  
            var nx1 = (b.z - a.z), ny1 = (a.x - b.x);  
         
            //线段cd的法线N2  
            var nx2 = (d.z - c.z), ny2 = (c.x - d.x);  
         
            //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交  
            var denominator = nx1*ny2 - ny1*nx2;  
            if (denominator==0) {  
                return null;  
            }  
         
            //在法线N2上的投影  
            var distC_N2=nx2 * c.x + ny2 * c.z;  
            var distA_N2=nx2 * a.x + ny2 * a.z-distC_N2;  
            var distB_N2=nx2 * b.x + ny2 * b.z-distC_N2;  
         
            // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);  
            if ( distA_N2*distB_N2>=0  ) {  
                return null;  
            }  
         
            //  
            //判断点c点d 和线段ab的关系, 原理同上  
            //  
            //在法线N1上的投影  
            var distA_N1=nx1 * a.x + ny1 * a.z;  
            var distC_N1=nx1 * c.x + ny1 * c.z-distA_N1;  
            var distD_N1=nx1 * d.x + ny1 * d.z-distA_N1;  
            if ( distC_N1*distD_N1>=0  ) {  
                return null;  
            }  
         
            //计算交点坐标  
            var fraction= distA_N2 / denominator;  
            var dx= fraction * ny1,  
                dz= -fraction * nx1;
            
            let newpoint=new navVec3();

            navVec3.lerp(a,b,-fraction,newpoint);
            return newpoint;
            //return { x: a.x + dx , y: a.z + dz };  
        }

    }
}