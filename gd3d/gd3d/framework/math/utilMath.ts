//找不到归属的放这里
namespace gd3d.math {
    //row：图片行数//column:图片列数//index：第几张图片（index从0开始计数）
    export function spriteAnimation(row: number, column: number, index: number, out: vector4) {
        var width = 1.0 / column;
        var height = 1.0 / row;
        var offsetx = width * (index % column);
        var offsety = height *row-height*(Math.floor(index / column) + 1) ;
        
        out.x = width;
        out.y = height;
        out.z = offsetx;
        out.w = offsety;
        // var uvOffset=new gd3d.math.vector4(width,height,offsetx,offsety);
        // return  uvOffset;
    }
    // int index = Mathf.FloorToInt(this.life01 * data.count);

    // float width = 1.0f / data.column;//width
    // float height = 1.0f / data.row;//height
    // float offsetx = width * (index % data.column);//offsetx
    // float offsety =height * data.row-height * (Mathf.FloorToInt(index / data.column)+1);//offsety

    // this.tex_ST.x = width;
    // this.tex_ST.y = height;
    // this.tex_ST.z = offsetx;
    // this.tex_ST.w = offsety;
    export function GetPointAlongCurve(curveStart:vector3,curveStartHandle:vector3,curveEnd:vector3,curveEndHandle:vector3,t:number, out:vector3,crease:number=0.3)
    {
        var oneMinT = 1 - t;
        var oneMinTPow3 =Math.pow(oneMinT, 3);
        var oneMinTPow2 = Math.pow(oneMinT, 2);

        var oneMinCrease = 1 - crease;

        var tempt1=gd3d.math.pool.new_vector3();
        gd3d.math.vec3ScaleByNum(curveStart,oneMinTPow3*oneMinCrease,tempt1);
        var tempt2=gd3d.math.pool.new_vector3();
        gd3d.math.vec3ScaleByNum(curveStartHandle,3*oneMinTPow2*t*crease,tempt2);
        var tempt3=gd3d.math.pool.new_vector3();
        gd3d.math.vec3ScaleByNum(curveEndHandle,3*oneMinT*Math.pow(t,2)*crease,tempt3);
        var tempt4=gd3d.math.pool.new_vector3();
        gd3d.math.vec3ScaleByNum(curveEnd,Math.pow(t,3)*oneMinCrease,tempt4);

        var tempt5=gd3d.math.pool.new_vector3();
        gd3d.math.vec3Add(tempt1,tempt2,tempt5);
        gd3d.math.vec3Add(tempt5,tempt3,tempt5);
        gd3d.math.vec3Add(tempt5,tempt4,tempt5);
        
        gd3d.math.vec3ScaleByNum(tempt5,1/(oneMinTPow3*oneMinCrease+3*oneMinTPow2*t*crease+3*oneMinT*Math.pow(t,2)*crease+Math.pow(t,3)*oneMinCrease),out);

        gd3d.math.pool.delete_vector3(tempt1);
        gd3d.math.pool.delete_vector3(tempt2);
        gd3d.math.pool.delete_vector3(tempt3);
        gd3d.math.pool.delete_vector3(tempt4);
        gd3d.math.pool.delete_vector3(tempt5);
    }
    // export function GetPointAlongCurve2(curveStart:vector3,curveStartHandle:vector3,curveEnd:vector3,curveEndHandle:vector3,t:number, out:vector3,crease:number=0.3)
    // {
    //     var oneMinT = 1 - t;
    //     var oneMinTPow3 =Math.pow(oneMinT, 3);
    //     var oneMinTPow2 = Math.pow(oneMinT, 2);

    //     var tempt1=gd3d.math.pool.new_vector3();
    //     gd3d.math.vec3ScaleByNum(curveStart,oneMinTPow3,tempt1);
    //     var tempt2=gd3d.math.pool.new_vector3();
    //     gd3d.math.vec3ScaleByNum(curveStartHandle,3*oneMinTPow2*t,tempt2);
    //     var tempt3=gd3d.math.pool.new_vector3();
    //     gd3d.math.vec3ScaleByNum(curveEndHandle,3*oneMinT*Math.pow(t,2),tempt3);
    //     var tempt4=gd3d.math.pool.new_vector3();
    //     gd3d.math.vec3ScaleByNum(curveEnd,Math.pow(t,3),tempt4);

    //     var tempt5=gd3d.math.pool.new_vector3();
    //     gd3d.math.vec3Add(tempt1,tempt2,tempt5);
    //     gd3d.math.vec3Add(tempt5,tempt3,tempt5);
    //     gd3d.math.vec3Add(tempt5,tempt4,tempt5);
       
    //     gd3d.math.pool.delete_vector3(tempt1);
    //     gd3d.math.pool.delete_vector3(tempt2);
    //     gd3d.math.pool.delete_vector3(tempt3);
    //     gd3d.math.pool.delete_vector3(tempt4);
    //     gd3d.math.pool.delete_vector3(tempt5);
    // }
}