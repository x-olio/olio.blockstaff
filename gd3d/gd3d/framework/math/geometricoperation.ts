namespace gd3d.math
{
    export function calPlaneLineIntersectPoint(planeVector: vector3, planePoint: vector3, lineVector: vector3, linePoint: vector3, out: vector3)
    {
        var vp1 = planeVector.x;
        var vp2 = planeVector.y;
        var vp3 = planeVector.z;
        var n1 = planePoint.x;
        var n2 = planePoint.y;
        var n3 = planePoint.z;
        var v1 = lineVector.x;
        var v2 = lineVector.y;
        var v3 = lineVector.z;
        var m1 = linePoint.x;
        var m2 = linePoint.y;
        var m3 = linePoint.z;
        var vpt = v1 * vp1 + v2 * vp2 + v3 * vp3;
        if (vpt === 0)
        {
            out = null;
        }
        else
        {
            var t = ((n1 - m1) * vp1 + (n2 - m2) * vp2 + (n3 - m3) * vp3) / vpt;
            out.x = m1 + v1 * t;
            out.y = m2 + v2 * t;
            out.z = m3 + v3 * t;  
        }
    }
    //判断点是否在矩形p1p2p3p4中
    export function isContain(p1: vector2, p2: vector2, p3: vector2, p4: vector2, mp: vector2)
    {
        if (Multiply(mp, p1, p2) * Multiply(mp, p4, p3) <= 0 && Multiply(mp, p4, p1) * Multiply(mp, p3, p2) <= 0)
            return true;
        return false; 
    }
    // 计算叉乘 |P0P1| × |P0P2| 
    export function Multiply(p1: vector2, p2: vector2, p0: vector2): number
    {
        return ((p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y));
    }

    //待测试
    function getPointByTwoline(index: number, p2: vector3, dir2: vector3, outpoint: vector3)
    {
        var matrix = new gd3d.math.matrix();
        var dir1: vector3;
        if (index == 1)
        {
            dir1 = new gd3d.math.vector3(1, 0, 0);
            matrix.rawData[0] = 1;
        }
        else if (index==2)
        {
            dir1 = new gd3d.math.vector3(0, 1, 0);
            matrix.rawData[0] = 0;
            matrix.rawData[1] = 1;
        }
        else if (index == 3)
        {
            dir1 = new gd3d.math.vector3(0, 0, 1);
            matrix.rawData[0] = 0;
            matrix.rawData[2] = 1;
        }
        var dirBt = new gd3d.math.vector3();
        gd3d.math.vec3Cross(dir1, dir2, dirBt);
        matrix.rawData[4] = dirBt.x;
        matrix.rawData[5] = dirBt.y;
        matrix.rawData[6] = dirBt.z;

        matrix.rawData[8] = -dir2.x;
        matrix.rawData[9] = -dir2.y;
        matrix.rawData[10] = -dir2.z;

        gd3d.math.matrixInverse(matrix, matrix);
        var outnode = new gd3d.math.vector3();
        gd3d.math.matrixTransformVector3(p2, matrix, outnode);
        if (index == 1)
        {
            outpoint = new gd3d.math.vector3(outnode.x,0,0);
        }
        else if (index == 2)
        {
            outpoint = new gd3d.math.vector3(0, outnode.y,0);
        }
        else if (index == 3)
        {
            outpoint = new gd3d.math.vector3(0, 0, outnode.z);
        }
        

    }  
}