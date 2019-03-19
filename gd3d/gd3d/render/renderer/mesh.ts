namespace gd3d.render
{
    /**
     * @private
     */
    export enum VertexFormatMask
    {
        Position = 0x00000001,
        Normal = 0x00000002,
        Tangent = 0x00000004,
        Color = 0x00000008,
        UV0 = 0x00000010,
        UV1 = 0x00000020,
        BlendIndex4 = 0x00000040,
        BlendWeight4 = 0x00000080,
        ColorEX = 0x00000100,
    }
    /**
     * @private
     */
    export class number4
    {
        v0: number;
        v1: number;
        v2: number;
        v3: number;
    }
    /**
     * @private
     */
    export enum MeshTypeEnum
    {
        Static,
        Dynamic,
        Stream,
    }
    /**
     * @private
     */
    export class drawInfo
    {
        private static _ins: drawInfo;
        public static get ins(): drawInfo
        {
            if (drawInfo._ins == null)
                drawInfo._ins = new drawInfo();
            return drawInfo._ins;
        }
        triCount:number=0;
        vboCount:number=0;
        renderCount:number=0;
    }
    /**
     * @private
     */
    export class glMesh
    {
        initBuffer(webgl: WebGLRenderingContext, vf: VertexFormatMask, vertexCount: number, mode: MeshTypeEnum = MeshTypeEnum.Static)
        {
            if (this.vbo != null)
                throw new Error("you can only initbuffer once.");
            if (mode == MeshTypeEnum.Static)
                this.mode = webgl.STATIC_DRAW;
            else if (mode == MeshTypeEnum.Dynamic)
                this.mode = webgl.DYNAMIC_DRAW;
            else if (mode == MeshTypeEnum.Stream)
                this.mode = webgl.STREAM_DRAW;

            this.vertexFormat = vf;

            this.vertexCount = vertexCount;
            if (vertexCount > 0)
            {
                this.vertexByteSize = meshData.calcByteSize(vf);

                this.vbo = webgl.createBuffer();
                webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
                webgl.bufferData(webgl.ARRAY_BUFFER, vertexCount * this.vertexByteSize, this.mode);
            }
            this.indexCounts = []
            this.ebos = [];
        }
        addIndex(webgl: WebGLRenderingContext, indexcount: number): number
        {
            var index = this.ebos.length;
            var _ebo = webgl.createBuffer();
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, _ebo);
            webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indexcount * 2, this.mode);
            this.ebos.push(_ebo);
            this.indexCounts.push(indexcount);
            return index;
        }
        resetVboSize(webgl: WebGLRenderingContext, vertexCount: number)
        {
            this.vertexCount = vertexCount;
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
            webgl.bufferData(webgl.ARRAY_BUFFER, vertexCount * this.vertexByteSize, this.mode);
        }
        resetEboSize(webgl: WebGLRenderingContext, eboindex: number, indexcount: number)
        {
            this.indexCounts[eboindex] = indexcount;
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.ebos[eboindex]);
            webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indexcount * 2, this.mode);
        }
        dispose(webgl: WebGLRenderingContext)
        {
            webgl.deleteBuffer(this.vbo);
            this.vbo = null;
            if (this.ebos)
            {
                for (var i = 0; i < this.ebos.length; i++)
                    webgl.deleteBuffer(this.ebos[i]);
                this.ebos.length = 0;
            }
        }
        caclByteLength(): number
        {
            let total = 0;
            total += this.vertexByteSize * this.vertexCount;
            for (let k in this.indexCounts)
            {
                total += this.indexCounts[k] * 2;
            }
            return total;
        }
        mode: number;
        vbo: WebGLBuffer;
        vertexCount: number;
        vertexByteSize: number;
        ebos: WebGLBuffer[];
        indexCounts: number[];
        lineMode :number;
        bindVboBuffer(webgl: WebGLRenderingContext)
        {
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
        }

        bindIndex: number = -1;
        vertexFormat: VertexFormatMask = VertexFormatMask.Position;
        bind(webgl: WebGLRenderingContext, shadercode: glProgram, bindEbo: number = 0)
        {
            // webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
            this.bindIndex = bindEbo;
            if (bindEbo >= 0)
            {
                webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.ebos[bindEbo]);
            }

            var total = this.vertexByteSize;

            //绑定vbo和shader顶点格式，这部分应该要区分材质改变与参数改变，可以少切换一些状态
            var seek = 0;
            var channel = 0;
            {//pos
                if (shadercode.posPos >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posPos);
                    webgl.vertexAttribPointer(shadercode.posPos, 3, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 12;
            }
            if (this.vertexFormat & VertexFormatMask.Normal)
            {
                if (shadercode.posNormal >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posNormal);
                    webgl.vertexAttribPointer(shadercode.posNormal, 3, webgl.FLOAT, true, total, seek);
                    channel++;
                }
                seek += 12;
            }
            else if (shadercode.posNormal >= 0)//需要处理mesh里没有这个通道，但是shader里有的情况
            {
                webgl.disableVertexAttribArray(shadercode.posNormal);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.Tangent)
            {
                if (shadercode.posTangent >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posTangent);
                    webgl.vertexAttribPointer(shadercode.posTangent, 3, webgl.FLOAT, true, total, seek);
                    channel++;
                }
                seek += 12;
            }
            else if (shadercode.posTangent >= 0)//需要处理mesh里没有这个通道，但是shader里有的情况
            {
                webgl.disableVertexAttribArray(shadercode.posTangent);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.Color)
            {
                if (shadercode.posColor >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posColor);
                    webgl.vertexAttribPointer(shadercode.posColor, 4, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 16;
            }
            else if (shadercode.posColor >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posColor);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.UV0)
            {
                if (shadercode.posUV0 >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posUV0);
                    webgl.vertexAttribPointer(shadercode.posUV0, 2, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 8;

            }
            else if (shadercode.posUV0 >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posUV0);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.UV1)
            {
                if (shadercode.posUV2 >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posUV2);
                    webgl.vertexAttribPointer(shadercode.posUV2, 2, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 8;
            }
            else if (shadercode.posUV2 >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posUV2);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.BlendIndex4)
            {
                if (shadercode.posBlendIndex4 >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posBlendIndex4);
                    webgl.vertexAttribPointer(shadercode.posBlendIndex4, 4, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 16;
            }
            else if (shadercode.posBlendIndex4 >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posBlendIndex4);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.BlendWeight4)
            {
                if (shadercode.posBlendWeight4 >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posBlendWeight4);
                    webgl.vertexAttribPointer(shadercode.posBlendWeight4, 4, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 16;
            }
            else if (shadercode.posBlendWeight4 >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posBlendWeight4);
                channel++;
            }
            if (this.vertexFormat & VertexFormatMask.ColorEX)
            {
                if (shadercode.posColorEx >= 0)
                {
                    webgl.enableVertexAttribArray(shadercode.posColorEx);
                    webgl.vertexAttribPointer(shadercode.posColorEx, 4, webgl.FLOAT, false, total, seek);
                    channel++;
                }
                seek += 16;
            }
            else if (shadercode.posColorEx >= 0)
            {
                webgl.disableVertexAttribArray(shadercode.posColorEx);
                channel++;
            }
            webglkit.SetMaxVertexAttribArray(webgl, channel);
        }

        uploadVertexSubData(webgl: WebGLRenderingContext, varray: Float32Array, offset: number = 0)
        {
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
            webgl.bufferSubData(webgl.ARRAY_BUFFER, offset, varray);
        }

        uploadVertexData(webgl: WebGLRenderingContext, varray: Float32Array)
        {
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vbo);
            webgl.bufferData(webgl.ARRAY_BUFFER, varray,this.mode);
        }

        uploadIndexSubData(webgl: WebGLRenderingContext, eboindex: number, data: Uint16Array, offset: number = 0)
        {
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.ebos[eboindex]);
            webgl.bufferSubData(webgl.ELEMENT_ARRAY_BUFFER, offset, data);
        }

        uploadIndexData(webgl: WebGLRenderingContext, eboindex: number, data: Uint16Array)
        {
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.ebos[eboindex]);
            webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, data,this.mode);
        }
        //三角形应用vbo
        drawArrayTris(webgl: WebGLRenderingContext, start: number = 0, count: number = -1)
        {
            if (count < 0)
                count = ((this.vertexCount / 3) | 0) * 3;
            drawInfo.ins.triCount += count / 3;
            drawInfo.ins.renderCount ++;
            //model
            webgl.drawArrays(webgl.TRIANGLES, start, count);
        }
        //直线应用vbo
        drawArrayLines(webgl: WebGLRenderingContext, start: number = 0, count: number = -1)
        {
            if (count < 0)
                count = ((this.vertexCount / 2) | 0) * 2;
            drawInfo.ins.renderCount ++;
            //model
            webgl.drawArrays(webgl.LINES, start, count);
        }
        drawElementTris(webgl: WebGLRenderingContext, start: number = 0, count: number = -1)
        {
            if (count < 0)
                count = ((this.indexCounts[this.bindIndex] / 3) | 0) * 3;
            drawInfo.ins.triCount += count / 3;
            drawInfo.ins.renderCount ++;
            webgl.drawElements(webgl.TRIANGLES, count, webgl.UNSIGNED_SHORT, start * 2);
        }
        drawElementLines(webgl: WebGLRenderingContext, start: number = 0, count: number = -1)
        {
            if (count < 0)
                count = ((this.indexCounts[this.bindIndex] / 2) | 0) * 2;
            drawInfo.ins.renderCount ++;
            webgl.drawElements(webgl.LINES, count, webgl.UNSIGNED_SHORT, start * 2);
        }


    }

}