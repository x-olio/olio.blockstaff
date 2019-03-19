namespace dome
{
    export class GMesh
    {
        vf:number;
        vertexByteSize:number;
        mat:gd3d.framework.material;
        mesh:gd3d.framework.mesh;

        maxVerteCount:number;
        currentVerteCount:number=0;

        maxVboLen:number;
        realVboLen:number=0;
        vbodata:Float32Array;

        maxEboLen:number;
        realEboLen:number=0;
        ebodata:Uint16Array;

        constructor(mat: gd3d.framework.material, vCount:number,vf:number,webgl:WebGLRenderingContext)
        {
            this.mat = mat;
            let total = gd3d.render.meshData.calcByteSize(vf) / 4;
            let gmesh=new gd3d.framework.mesh();
            this.vbodata= new Float32Array(total*2048);
            this.ebodata= new Uint16Array(2048);
            this.vf=vf;

            this.maxVerteCount=vCount;
            this.maxVboLen=this.vbodata.length;
            this.maxEboLen=this.ebodata.length;

            gmesh.glMesh = new gd3d.render.glMesh();
            // gmesh.glMesh.eboType=webgl.UNSIGNED_INT;
            gmesh.glMesh.initBuffer(webgl, vf, vCount,gd3d.render.MeshTypeEnum.Dynamic);
            // gmesh.glMesh.uploadVertexData(webgl, vboArr);

            gmesh.glMesh.addIndex(webgl, this.ebodata.length);
            // gmesh.glMesh.uploadIndexData(webgl, 0, eboArr);
            gmesh.submesh = [];
            {
                var sm = new gd3d.framework.subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = this.ebodata.length;
                sm.line = false;
                gmesh.submesh.push(sm);
            }
            this.mesh=gmesh;
            this.vertexByteSize=gmesh.glMesh.vertexByteSize;
        }
        reset() {
            this.currentVerteCount = 0;
            this.realVboLen = 0;
            this.realEboLen = 0;
        }

        private temptPos:gd3d.math.vector3=new gd3d.math.vector3();
        uploadMeshData(mat:gd3d.math.matrix,mesh:gd3d.framework.mesh,webgl:WebGLRenderingContext)
        {
            let data=mesh.data;

            this.checkMeshCapacity(data.pos.length,data.trisindex.length,webgl);

            let vertexcount=data.pos.length;
            let size=this.vertexByteSize/4;

            let vbodata=this.vbodata;
            for(let i=0;i<vertexcount;i++)
            {
                let seek = 0;
                gd3d.math.matrixTransformVector3(data.pos[i],mat,this.temptPos);
                vbodata[this.realVboLen+i*size]=this.temptPos.x;
                vbodata[this.realVboLen+i*size+1]=this.temptPos.y;
                vbodata[this.realVboLen+i*size+2]=this.temptPos.z;
                seek+=3;

                if (this.vf & gd3d.render.VertexFormatMask.Normal)
                {
                    vbodata[this.realVboLen+i*size+seek]=data.normal[i].x;
                    vbodata[this.realVboLen+i*size+seek+1]=data.normal[i].y;
                    vbodata[this.realVboLen+i*size+seek+2]=data.normal[i].z;
                    seek+=3;
                }

                if (this.vf & gd3d.render.VertexFormatMask.Tangent)
                {
                    vbodata[this.realVboLen+i*size+seek]=data.tangent[i].x;
                    vbodata[this.realVboLen+i*size+seek+1]=data.tangent[i].y;
                    vbodata[this.realVboLen+i*size+seek+2]=data.tangent[i].z;
                    seek+=3;
                }

                if (this.vf & gd3d.render.VertexFormatMask.Color)
                {
                    if(data.color!=null)
                    {
                        vbodata[this.realVboLen+i*size+seek]=data.color[i].r;
                        vbodata[this.realVboLen+i*size+seek+1]=data.color[i].g;
                        vbodata[this.realVboLen+i*size+seek+2]=data.color[i].b;
                        vbodata[this.realVboLen+i*size+seek+3]=data.color[i].a;
                    }else
                    {
                        vbodata[this.realVboLen+i*size+seek]=1;
                        vbodata[this.realVboLen+i*size+seek+1]=1;
                        vbodata[this.realVboLen+i*size+seek+2]=1;
                        vbodata[this.realVboLen+i*size+seek+3]=1;
                    }
                    seek+=4;
                }

                if (this.vf & gd3d.render.VertexFormatMask.UV0)
                {
                    vbodata[this.realVboLen+i*size+seek]=data.uv[i].x;
                    vbodata[this.realVboLen+i*size+seek+1]=data.uv[i].y;
                    seek+=2;
                }
            }

            let ebodata=this.ebodata;
            let len=data.trisindex.length;
            for(let i=0;i<len;i++)
            {
                ebodata[this.realEboLen+i]=data.trisindex[i]+this.currentVerteCount;
            }

            this.realVboLen+=size*vertexcount;
            this.realEboLen+=len;
            this.currentVerteCount+=vertexcount;

            this.mesh.submesh[0].size=this.realEboLen;
        }

        mixToGLmesh(webgl:WebGLRenderingContext)
        {
            this.mesh.glMesh.uploadVertexData(webgl,this.vbodata);
            this.mesh.glMesh.uploadIndexData(webgl, 0, this.ebodata);
        }

        private checkMeshCapacity(vertexcount:number,eboLen:number,webgl:WebGLRenderingContext)
        {
            if(this.currentVerteCount+vertexcount>this.maxVerteCount)
            {
                let needCount=this.currentVerteCount+vertexcount;
                let needMaxVertexcount=this.maxVerteCount;

                while(needCount>needMaxVertexcount)
                {
                    needMaxVertexcount*=2;
                }
                if(needMaxVertexcount!=this.maxVerteCount)
                {
                    this.maxVerteCount=needMaxVertexcount;
                    let newVbo=new Float32Array(this.maxVerteCount*this.vertexByteSize);
                    this.maxVboLen=newVbo.length;
                    newVbo.set(this.vbodata);
                    this.mesh.glMesh.resetVboSize(webgl,this.maxVerteCount);
                    this.vbodata=newVbo;
                }
            }
            if(this.realEboLen+eboLen>this.maxEboLen)
            {
                let needEbolen=this.realEboLen+eboLen;
                let curMaxlen=this.maxEboLen;
                while(needEbolen>curMaxlen)
                {
                    curMaxlen*=2;
                }
                if(curMaxlen!=this.maxEboLen)
                {
                    this.maxEboLen=curMaxlen;
                    let newebo=new Uint16Array(this.maxEboLen);
                    newebo.set(this.ebodata);
                    this.mesh.glMesh.resetEboSize(webgl,0,this.maxEboLen);

                    this.ebodata=newebo;
                }
            }

        }

    }
    export class mixMesh implements IState
    {
        app:gd3d.framework.application;
        prefab: gd3d.framework.transform;
        scene: gd3d.framework.scene;
        camera: gd3d.framework.camera;
        root: gd3d.framework.transform;
        picker = [];
        obs: any;
        flag: boolean = false;
        start(app: gd3d.framework.application) {
            this.app = app;
            this.app.showDrawCall();
            this.scene = this.app.getScene();
            let prefabName = 'GameObject';
            this.app.getAssetMgr().load("res/shader/MainShader.assetbundle.json", gd3d.framework.AssetTypeEnum.Auto, (state) => {
                this.loadPrefab(prefabName, () => {
                    if (state.isfinish) {

                        let _prefab: gd3d.framework.prefab = this.app.getAssetMgr().getAssetByName(prefabName + ".prefab.json") as gd3d.framework.prefab;
                        this.prefab = _prefab.getCloneTrans();
                        let json = JSON.parse('{"obs":[[0,3,"-6.00","0.00","0.00"],[0,3,"0.00","-6.00","90.00"],[0,3,"0.00","6.00","90.00"],[0,3,"-18.00","0.00","0.00"],[0,3,"-12.00","0.00","0.00"],[0,2,"0.00","0.00","0.00"],[0,3,"0.00","-11.44","90.00"],[0,3,"-24.00","0.00","0.00"],[0,3,"0.00","12.00","90.00"],[0,3,"0.00","18.00","90.00"],[0,3,"0.00","-17.44","90.00"],[0,3,"-36.00","0.00","0.00"],[0,3,"-42.00","0.00","0.00"],[0,1,"-30.00","0.00","0.00"],[0,3,"-30.00","-17.44","90.00"],[0,3,"-30.00","18.00","90.00"],[0,3,"-30.00","12.00","90.00"],[0,3,"-30.00","-11.44","90.00"],[0,3,"-30.00","6.00","90.00"],[0,3,"-30.00","-6.00","90.00"],[0,0,"0.00","24.00","0.00"],[0,0,"0.00","-23.08","180.00"],[0,0,"-30.00","24.00","0.00"],[0,4,"-47.96","0.00","180.00"],[0,4,"-30.00","-23.27","0.00"],[0,3,"-47.96","-6.00","90.00"],[0,3,"-47.96","-12.00","90.00"],[0,3,"-47.96","-18.00","90.00"],[0,4,"-47.96","-23.26","90.00"],[0,3,"-42.00","-23.26","0.00"],[0,3,"-36.00","-23.26","0.00"],[1,1,"2.38","-2.64","0.00"],[1,1,"2.19","2.54","0.00"],[1,1,"-2.48","-2.58","0.00"],[1,1,"-2.47","2.62","0.00"],[1,2,"-2.41","-7.00","90.00"],[1,2,"-2.41","-12.00","90.00"],[1,2,"-2.41","-17.00","90.00"],[1,2,"-2.41","-22.00","90.00"],[1,2,"2.43","-22.00","90.00"],[1,2,"2.43","-17.00","90.00"],[1,2,"2.43","-12.00","90.00"],[1,2,"2.43","-7.00","90.00"],[1,2,"2.43","22.70","90.00"],[1,2,"2.43","17.70","90.00"],[1,2,"2.43","12.70","90.00"],[1,2,"2.43","7.70","90.00"],[1,2,"-2.41","7.70","90.00"],[1,2,"-2.41","12.70","90.00"],[1,2,"-2.41","17.70","90.00"],[1,2,"-2.41","22.70","90.00"],[1,2,"-6.97","-2.46","0.00"],[1,2,"-11.97","-2.46","0.00"],[1,2,"-16.97","-2.46","0.00"],[1,2,"-21.97","-2.46","0.00"],[1,2,"-21.97","2.54","0.00"],[1,2,"-16.97","2.54","0.00"],[1,2,"-41.37","2.54","0.00"],[1,2,"-41.37","-2.46","0.00"],[1,2,"-36.90","-2.46","0.00"],[1,2,"-36.90","-2.46","0.00"],[1,2,"-36.90","2.54","0.00"],[1,1,"-32.20","2.62","0.00"],[1,1,"-32.20","-2.58","0.00"],[1,1,"-27.50","2.54","0.00"],[1,1,"-27.30","-2.64","0.00"],[1,0,"2.57","20.55","90.00"],[1,0,"-2.48","10.33","90.00"],[1,0,"-2.48","-19.61","90.00"],[1,0,"2.46","-9.73","90.00"],[1,0,"-9.43","-2.68","0.00"],[1,0,"-19.82","2.61","0.00"],[1,2,"-45.28","-25.78","0.00"],[1,2,"-45.28","-20.78","0.00"],[1,2,"-6.86","2.54","0.00"],[1,2,"-32.16","-20.78","0.00"],[1,2,"-32.16","-25.78","0.00"],[1,2,"-50.45","-20.68","90.00"],[1,2,"-50.45","-15.00","90.00"],[1,2,"-50.45","-6.91","90.00"],[1,2,"-50.45","2.39","90.00"],[1,2,"-45.51","-6.91","90.00"],[1,2,"-45.51","-15.00","90.00"],[1,2,"-27.12","-15.00","90.00"],[1,2,"-27.12","-6.91","90.00"],[1,2,"-32.42","-6.91","90.00"],[1,2,"-32.42","-15.00","90.00"],[1,2,"-32.42","8.70","90.00"],[1,2,"-32.42","16.79","90.00"],[1,2,"-27.60","16.79","90.00"],[1,2,"-27.60","8.70","90.00"],[1,2,"-27.60","25.63","90.00"],[1,2,"-32.42","25.63","90.00"],[1,0,"-27.74","20.74","90.00"],[1,0,"-27.74","-10.56","90.00"],[1,0,"-32.40","-17.74","90.00"],[1,0,"-44.99","-8.72","90.00"],[1,0,"-50.33","-17.85","90.00"],[2,1,"-9.02","9.01","0.00"],[2,1,"-9.00","20.20","0.00"],[2,1,"-21.00","20.20","0.00"],[2,1,"-21.02","9.01","0.00"],[2,1,"-21.02","-20.20","0.00"],[2,1,"-21.00","-9.00","0.00"],[2,1,"-9.00","-9.00","0.00"],[2,1,"-9.02","-20.20","0.00"],[2,0,"-35.96","5.98","90.00"],[2,3,"-39.00","-5.99","0.00"],[2,4,"-36.00","11.83","90.00"],[2,4,"-36.00","23.20","90.00"],[2,4,"-36.00","17.38","90.00"],[2,2,"-45.00","9.00","180.00"],[2,1,"-44.99","20.20","0.00"],[2,1,"-39.12","-14.32","0.00"]],"0-0":0.218296930193901,"0-1":0.138532817363739,"0-2":0.218296304345131,"0-3":0.218295753002167,"0-4":0.218296930193901,"1-0":1.10804808139801,"1-1":1.57943224906921,"1-2":2.28681707382202,"2-0":4.10447216033936,"2-1":13.9198970794678,"2-2":23.7891082763672,"2-3":10.7089042663574,"2-4":3.134281873703}');
                        this.obs = json.obs;

                        this.root = new gd3d.framework.transform();

                        for(let t of this.obs) {
                             this.generateSignelObs(t);
                        }

                        let mr =this.root.gameObject.getComponentsInChildren("meshRenderer");
                        for(let m of mr) {
                            this.picker.push(m.gameObject.transform);
                        }
                        console.log(this.picker);
                        this.scene.update(0);
                        this.flag = true;
                        this.refresh();
                    }
                });
            });
            // Load scene


            //添加一个摄像机
            var objCam = new gd3d.framework.transform();
            objCam.name = "sth.";
            this.scene.addChild(objCam);
            this.camera = objCam.gameObject.addComponent("camera") as gd3d.framework.camera;
            this.camera.near = 0.01;
            this.camera.far = 10000;
            this.camera.backgroundColor = new gd3d.math.color(0.11, 0.11, 0.11, 1.0);
            this.camera.gameObject.transform.localTranslate.z = -100;

            // objCam.localTranslate = new gd3d.math.vector3(0, 0, -30);
            CameraController.instance().init(this.app, this.camera);
            objCam.markDirty();//标记为需要刷新
        }

        refresh() {
            if(!this.flag)
                return;


            for(let k in this.mixmeshDic) {
                this.mixmeshDic[k].reset();
            }

            let { nobatch, batch, mixMeshId } = this.mixMesh(this.picker);

            // Generate result
            // console.table(nobatch);
            // console.table(batch);
            // console.log(mixMeshId);

            for (let id of mixMeshId) {
                let m = this.mixmeshDic[id];
                let trans = new gd3d.framework.transform();
                trans.localPosition.y = 15;
                let mf = trans.gameObject.addComponent("meshFilter") as gd3d.framework.meshFilter;
                mf.mesh = m.mesh;
                let meshRender = trans.gameObject.addComponent("meshRenderer") as gd3d.framework.meshRenderer;
                meshRender.materials = [m.mat];
                this.scene.addChild(trans);
                // this.root.gameObject.visible = false;
            }
        }

        generateSignelObs(target) {
            let [level, obType, posx, posz, rotationy, trans] = target; // Access data chunk
            // if(level!=2||obType!=1) return;
            if (!trans) { // If current item doesn't exitst
                // level--;
                // obType--;
                let prefab = this.prefab;
                let instance: gd3d.framework.transform = prefab.children[level].children[obType].clone();
                instance.localTranslate.x = posx;
                instance.localTranslate.z = posz;
                gd3d.math.quatFromEulerAngles(0, rotationy, 0, instance.children[0].localRotate);
                this.root.addChild(instance);
            } else {
                trans.gameObject.visiable = true;
            }
        }
        load(path: string, cb) {

            this.app.getAssetMgr().load(path, gd3d.framework.AssetTypeEnum.Auto, (s) => {
                if(s.isfinish && cb) {
                    cb();
                }
            })
        }
        loadPrefab(name: string, cb) {
            this.load("res/prefabs/" + name + "/" + name + ".assetbundle.json", cb);
        }
        update(delta: number) {
            CameraController.instance().update(delta);

            // this.refresh();

        }
        targets:gd3d.framework.transform[];
        matDic:{[matID:number]:gd3d.framework.transform[]}={};
        matinstance: { [matID: number]: gd3d.framework.material } = {};
        mixmeshDic:{[matID:number]:GMesh}={};


        mixMesh(targets:gd3d.framework.transform[],vf:number=gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal| gd3d.render.VertexFormatMask.Tangent| gd3d.render.VertexFormatMask.UV0):{nobatch:gd3d.framework.transform[],batch:gd3d.framework.transform[],mixMeshId:number[]}
        {
            let nobatchArr:gd3d.framework.transform[]=[];
            let batchArr:gd3d.framework.transform[]=[];
            let mixmeshid:number[]=[];
            this.matDic={};

            for(let i=0;i<targets.length;i++)
            {
                let meshr=targets[i].gameObject.getComponent("meshRenderer") as gd3d.framework.meshRenderer;
                if(meshr.materials.length>1)
                {
                    nobatchArr.push(targets[i]);
                }else
                {
                    let id = meshr.materials[0].getGUID();
                    if(!this.matDic[id])
                        this.matDic[id] = [];
                    this.matDic[id].push(targets[i]);
                    this.matinstance[id] = meshr.materials[0];
                }
            }


            for(let key in this.matDic)
            {
                let transArr=this.matDic[key];
                if(transArr.length>=2)
                {
                    for(let i=0;i< transArr.length;i++)
                    {
                        let meshf=transArr[i].gameObject.getComponent("meshFilter") as gd3d.framework.meshFilter;
                        if(this.mixmeshDic[key]==null)
                        {
                            this.mixmeshDic[key]=new GMesh(this.matinstance[key], 2048,vf,this.app.webgl);
                            mixmeshid.push(Number(key));
                        }
                        this.mixmeshDic[key].uploadMeshData(transArr[i].getWorldMatrix(),meshf.mesh,this.app.webgl);

                        batchArr.push(transArr[i]);
                    }
                }else
                {
                    if(transArr[0]!=null)
                    {
                        nobatchArr.push(transArr[0]);
                    }
                }
            }

            for(let key in this.mixmeshDic)
            {
                this.mixmeshDic[key].mixToGLmesh(this.app.webgl);
            }

            return {batch:batchArr,nobatch:nobatchArr,mixMeshId:mixmeshid};
        }


    }
}