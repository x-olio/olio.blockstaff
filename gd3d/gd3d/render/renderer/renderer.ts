namespace gd3d.render
{
    /**
     * @private
     */
    export class staticMeshRenderer
    {
        material: glDrawPass;
        mesh: glMesh;
        eboIndex: number = 0;
        drawMode: DrawModeEnum = DrawModeEnum.EboTri;
        drawbegin: number = 0;
        drawcount: number = -1;
        draw(webgl: WebGLRenderingContext)
        {
            this.material.use(webgl);
            this.mesh.bind(webgl, this.material.program, this.eboIndex);
            if (this.drawMode == DrawModeEnum.VboTri)
            {
                this.mesh.drawArrayTris(webgl, this.drawbegin, this.drawcount);
            }
            else if (this.drawMode == DrawModeEnum.VboLine)
            {
                this.mesh.drawArrayLines(webgl, this.drawbegin, this.drawcount);
            }
            else if (this.drawMode == DrawModeEnum.EboTri)
            {
                this.mesh.drawElementTris(webgl, this.drawbegin, this.drawcount);
            }
            else if (this.drawMode == DrawModeEnum.EboLine)
            {
                this.mesh.drawElementLines(webgl, this.drawbegin, this.drawcount);
            }
        }
    }

    /**
     * @private
     */
    export class batchRenderer
    {
        curmaterial: glDrawPass;
        mesh: glMesh;
        drawMode: DrawModeEnum;
        vboCount: number = 0;

        eboCount: number = 0;
        dataForVbo: Float32Array;
        dataForEbo: Uint16Array;
        initBuffer(webgl: WebGLRenderingContext, vf: VertexFormatMask, drawMode: DrawModeEnum)
        {
            this.mesh = new glMesh();
            this.mesh.initBuffer(webgl, vf, 128, MeshTypeEnum.Dynamic);
            this.dataForVbo = new Float32Array(128);
            this.drawMode = drawMode;
            if (drawMode == DrawModeEnum.EboLine || drawMode == DrawModeEnum.EboTri)
            {
                this.mesh.addIndex(webgl, 128);
                this.dataForEbo = new Uint16Array(128);
            }
        }
        begin(webgl: WebGLRenderingContext, mat: glDrawPass)
        {
            //if (mat == this.curmaterial) return;
            if (this.vboCount > 0)
                this.end(webgl);
            this.curmaterial = mat;
        }
        push(webgl: WebGLRenderingContext, vbodata: number[], ebodata: number[])
        {
            if (this.vboCount + vbodata.length > 2048
                ||
                (ebodata != null && this.eboCount + ebodata.length > 2048))
            {
                this.end(webgl);
            }

            if (this.vboCount + vbodata.length > this.dataForVbo.length)
            {
                let narr = new Float32Array(this.dataForVbo.length * 2);
                for (let i = 0, len = this.dataForVbo.length; i < len; ++i)
                {
                    narr[i] = this.dataForVbo[i];
                }
                this.dataForVbo = narr;
                this.mesh.resetVboSize(webgl, this.dataForVbo.length);
            }
            for (let i = 0,len = vbodata.length; i < len; ++i)
            {
                this.dataForVbo[this.vboCount + i] = vbodata[i];
            }
            this.vboCount += vbodata.length;

            if (this.drawMode == DrawModeEnum.VboLine || this.drawMode == DrawModeEnum.VboTri)
                return;

            if (ebodata != null)
            {
                if (this.eboCount + ebodata.length > this.dataForEbo.length)
                {
                    let narr = new Uint16Array(this.dataForEbo.length * 2);
                    for (let i = 0,len = this.dataForEbo.length; i < len; ++i)
                    {
                        narr[i] = this.dataForEbo[i];
                    }
                    this.dataForEbo = narr;
                    this.mesh.resetEboSize(webgl, 0, this.dataForEbo.length);
                }
                for (let i = 0,len = ebodata.length; i < len; ++i)
                {
                    this.dataForEbo[this.eboCount + i] = ebodata[i];
                }
                this.eboCount += ebodata.length;
            }



        }
        end(webgl: WebGLRenderingContext)
        {
            if (this.vboCount == 0) return;
            this.mesh.uploadVertexData(webgl, this.dataForVbo.slice(0, this.vboCount));
            if (this.eboCount > 0)
                this.mesh.uploadIndexData(webgl, 0, this.dataForEbo.slice(0, this.eboCount));

            var vertexcount = (this.vboCount / (this.mesh.vertexByteSize / 4)) | 0;
            this.curmaterial.use(webgl);
            this.mesh.bind(webgl, this.curmaterial.program, (this.drawMode == DrawModeEnum.EboLine || this.drawMode == DrawModeEnum.EboTri) ? 0 : -1);
            if (this.drawMode == DrawModeEnum.EboLine)
            {
                this.mesh.drawElementLines(webgl, 0, this.eboCount);
            }
            else if (this.drawMode == DrawModeEnum.EboTri)
            {
                this.mesh.drawElementTris(webgl, 0, this.eboCount);
            }
            else if (this.drawMode == DrawModeEnum.VboLine)
            {
                this.mesh.drawArrayLines(webgl, 0, vertexcount);
            }
            else if (this.drawMode == DrawModeEnum.VboTri)
            {
                this.mesh.drawArrayTris(webgl, 0, vertexcount);
            }
            this.vboCount = 0;
            this.eboCount = 0;
        }
    }
}