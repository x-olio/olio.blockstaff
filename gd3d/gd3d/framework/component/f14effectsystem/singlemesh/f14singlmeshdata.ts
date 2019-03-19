namespace gd3d.framework
{

    export enum LoopEnum
    {
        Restart=0,
        TimeContinue=1
    }
    // export enum UVTypeEnum
    // {
    //     NONE,
    //     UVRoll,
    //     UVSprite
    // }
    export enum BindAxis
    {
        X=0,
        Y=1,
        NONE=2
    }
    export class F14SingleMeshBaseData implements F14ElementData 
    {

        public loopenum:LoopEnum= LoopEnum.Restart;
    
        public mesh:mesh;
        public material:material;
    
        //public bool beloop = false;
    
        public position:gd3d.math.vector3 = new gd3d.math.vector3();
        public scale:gd3d.math.vector3 = new gd3d.math.vector3(1,1,1);
        public euler:gd3d.math.vector3 = new gd3d.math.vector3();
        public color:gd3d.math.color = new gd3d.math.color(1,1,1,1);
        public tex_ST:gd3d.math.vector4 = new gd3d.math.vector4();
    
        //-----------------texture animation
        public enableTexAnimation:boolean = false;
        public uvType: UVTypeEnum= UVTypeEnum.NONE;
        //uvroll---/uspeed/vspeed
        public uSpeed:number;
        public vSpeed:number;
        //UVSprite---/row/column/count
        public row:number;
        public column:number;
        public count:number;

            //-------------billboard
        public beBillboard:boolean=false;
        public bindAxis:BindAxis=BindAxis.NONE;


        //-----------------attline 计算插值
        firtstFrame:number=0;
        public constructor(firstFrame:number)
        {
            this.firtstFrame=firstFrame;
            this.mesh = gd3d.framework.sceneMgr.app.getAssetMgr().getDefaultMesh("quad");
            this.material = gd3d.framework.sceneMgr.app.getAssetMgr().getDefParticleMat();
        }
        parse(json: any, assetmgr: assetMgr, assetbundle: string) {
            switch(json.loopenum)
            {
                case "Restart":
                    this.loopenum=LoopEnum.Restart;
                    break;
                case "TimeContinue":
                    this.loopenum=LoopEnum.TimeContinue;
                    break;
            }
            this.mesh=assetmgr.getAssetByName(json.mesh,assetbundle) as gd3d.framework.mesh;
            this.material=assetmgr.getAssetByName(json.material,assetbundle) as gd3d.framework.material;
            gd3d.math.vec3FormJson(json.position,this.position);
            gd3d.math.vec3FormJson(json.scale,this.scale);
            gd3d.math.vec3FormJson(json.euler,this.euler);
            gd3d.math.colorFormJson(json.color,this.color);
            gd3d.math.vec4FormJson(json.tex_ST,this.tex_ST);
            this.enableTexAnimation=json.enableTexAnimation;
            if(this.enableTexAnimation)
            {
                switch(json.uvType)
                {
                    case "UVRoll":
                        this.uvType=UVTypeEnum.UVRoll;
                        this.uSpeed=json.uSpeed;
                        this.vSpeed=json.vSpeed;
                        break;
                    case "UVSprite":
                        this.uvType=UVTypeEnum.UVSprite;
                        this.row=json.row;
                        this.column=json.column;
                        this.count=json.count;
                        break;
                    case "NONE":
                        this.uvType=UVTypeEnum.NONE;
                        break;
                }
            }
            if(json.beBillboard!=null)
            {
                this.beBillboard=json.beBillboard;
                switch(json.bindAxis)
                {
                    case "NONE":
                        this.bindAxis=BindAxis.NONE;
                        break;
                    case "X":
                        this.bindAxis=BindAxis.X;
                        break;
                    case "Y":
                        this.bindAxis=BindAxis.Y;
                        break;
                }
            }
        }
    
    }
    
}