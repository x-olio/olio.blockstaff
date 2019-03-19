namespace gd3d.framework
{
    // /**
    //  * @private
    //  */
    // export class NumberData
    // {
    //     public isRandom: boolean = false;
    //     public _value: number = 0;
    //     public _valueLimitMin: number = 0;
    //     public _valueLimitMax: number = 0;
    //     private beInited: boolean = false;
    //     private key:number;//random值（0--1）
    //     setValue(value:number)
    //     {
    //         this._value=value;
    //     }
    //     setRandomValue(max:number,min:number)
    //     {
    //         this._valueLimitMax=max;
    //         this._valueLimitMin=min;
    //         this.isRandom=true;
    //     }
    //     /**
    //      * 针对随机类型，只要随机过一次就返回值不变（rerandom=false），返回新的随机值（rerandom=true）
    //      */
    //     public getValue(reRandom:boolean=false)
    //     {
    //         if (this.isRandom)
    //         {
    //             if(reRandom||!this.beInited)
    //             {
    //                 this.key=Math.random();
    //                 this._value=this.key*(this._valueLimitMax-this._valueLimitMin)+this._valueLimitMin;
    //                 this.beInited = true
    //             }
    //         }
    //         return this._value;
    //     }

    //     constructor(value:number=null)
    //     {
    //         if(value!=null)
    //         {
    //             this._value=value;
    //         }
    //     }

    //     public static RandomRange(min: number, max: number, isInteger: boolean = false)
    //     {
    //         if (isInteger)
    //         {
    //             return Math.floor(Math.random() * (max - min + 1) + min);
    //         }
    //         return Math.random() * (max - min) + min;
    //     }
    // }

    // export class Vector3Data
    // {
    //     x:NumberData=new NumberData();
    //     y:NumberData=new NumberData();
    //     z:NumberData=new NumberData();

    //     constructor(x:number=0,y:number=0,z:number=0)
    //     {
    //         this.x.setValue(x);
    //         this.y.setValue(y);
    //         this.z.setValue(z);
    //     }
    //     getValue():gd3d.math.vector3
    //     {
    //         var out:gd3d.math.vector3=new gd3d.math.vector3();
    //         out.x=this.x.getValue();
    //         out.y=this.y.getValue();
    //         out.z=this.z.getValue();
    //         return out;
    //     }
    // }
    // export class NumberKey
    // {
    //     key:number;
    //     value:number;
    //     constructor(_key:number,_value:number)
    //     {
    //         this.key=_key;
    //         this.value=_value;
    //     }
    // }
    // export class Vector3Key
    // {
    //     key:number;
    //     value:math.vector3;
    //     constructor(_key:number,_value:math.vector3)
    //     {
    //         this.key=_key;
    //         this.value=_value;
    //     }
    // }
    // export class Vector2Key
    // {
    //     key:number;
    //     value:math.vector2;
    //     constructor(_key:number,_value:math.vector2)
    //     {
    //         this.key=_key;
    //         this.value=_value;
    //     }
    // }
    export class effTools
    {
        public static getRandomDirAndPosByZEmission(emission:EffectElementEmission,outDir:gd3d.math.vector3,outPos:gd3d.math.vector3)
        {

            switch(emission.shapeType)
            {
                case ParticleSystemShape.NORMAL:
                    gd3d.math.vec3Clone(gd3d.math.pool.vector3_zero,outPos);
                    gd3d.math.vec3Clone(gd3d.math.pool.vector3_up,outDir);
                    break;
                case ParticleSystemShape.SPHERE:
                    var θ = Math.random()*Math.PI*2;
                    var φ = Math.random()*Math.PI;
                    outDir.x=Math.sin(φ)*Math.cos(θ);
                    outDir.y=Math.cos(φ);         
                    outDir.z=Math.sin(φ)*Math.sin(θ);
                    var radius=Math.random()*emission.radius;
                    
                    gd3d.math.vec3ScaleByNum(outDir,radius,outPos);
                    break;
                case ParticleSystemShape.HEMISPHERE:
                    var θ = Math.random()*Math.PI*2;
                    var φ = Math.random()*Math.PI*0.5;
                    var radius=Math.random()*emission.radius;
                    outDir.x=Math.sin(φ)*Math.cos(θ);
                    outDir.y=Math.cos(φ);         
                    outDir.z=Math.sin(φ)*Math.sin(θ);
                    gd3d.math.vec3ScaleByNum(outDir,radius,outPos);
                    break;
                case ParticleSystemShape.BOX:
                    outPos.x = ValueData.RandomRange(-emission.width / 2, emission.width / 2);
                    outPos.y = ValueData.RandomRange(-emission.height / 2, emission.height / 2);
                    outPos.z = ValueData.RandomRange(-emission.depth / 2, emission.depth / 2);
                    gd3d.math.vec3Normalize(outPos,outDir);
                    break;
                case ParticleSystemShape.CONE:
                    var randomAngle=Math.random()*Math.PI*2;//弧度
                    var randomHeight=Math.random()*emission.height;
                    var upradius=randomHeight*Math.tan(emission.angle*Math.PI/180)+emission.radius;
                    var radomRadius=Math.random()*upradius;

                    var bottompos=gd3d.math.pool.new_vector3();
                    bottompos.x=emission.radius*Math.cos(randomAngle);
                    bottompos.y=0;
                    bottompos.z=emission.radius*Math.sin(randomAngle);

                    if(emission.emitFrom==emitfromenum.base)
                    {
                        gd3d.math.vec3Clone(bottompos,outPos);
                    }
                    else if(emission.emitFrom==emitfromenum.volume)
                    {
                        outPos.x=radomRadius*Math.cos(randomAngle);
                        outPos.z=radomRadius*Math.sin(randomAngle);
                        outPos.y=randomHeight;
                    }
                    outDir.x=Math.cos(randomAngle)*Math.sin(emission.angle*Math.PI/180);
                    outDir.z=Math.sin(randomAngle)*Math.sin(emission.angle*Math.PI/180);
                    outDir.y=Math.cos(emission.angle*Math.PI/180);
                    break;
            }
        }

        public static getTex_ST(emission:EffectElementEmission,out_St:math.vector4)
        {
            if(emission.uvType!=UVTypeEnum.UVSprite)
            {
                out_St.x=1;
                out_St.y=1;
                out_St.z=0;
                out_St.w=0;
            }else
            {
                gd3d.math.spriteAnimation(emission.row,emission.column,0,out_St);
            }
        }
    }
}