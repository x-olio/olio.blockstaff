namespace gd3d.framework
{
    /**
     * @private
     */
    export class EmissionBatcher_new
    {
        public emission: EffectElementEmission;
        private webgl: WebGLRenderingContext;
        public mesh: mesh;
        public mat: material;

        public dataForVbo: Float32Array;
        public dataForEbo: Uint16Array;

        public particles: Particle_new[] = [];

        constructor(emissionElement: EffectElementEmission)
        {
            this.emission = emissionElement;
            this.webgl = emissionElement.webgl;
            this.mat =this.emission.mat;
            this.initMesh();

        }

        private initMesh()
        {
            this.mesh = new mesh();
            this.mesh.data = new render.meshData();
            this.mesh.glMesh = new render.glMesh();
            this.mesh.submesh = [];
            {
                var sm = new subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = 0;
                sm.line = false;
                this.mesh.submesh.push(sm);
            }

            this.dataForVbo = new Float32Array(128);
            this.dataForEbo = new Uint16Array(128);
            this.mesh.glMesh.initBuffer(this.webgl, this.emission.vf, 128, render.MeshTypeEnum.Dynamic);
            this.mesh.glMesh.addIndex(this.webgl, this.dataForEbo.length);
        }
        public curVerCount: number = 0;
        public curIndexCount: number = 0;
        addParticle()
        {
            this.refreshBuffer();
            let p = new Particle_new(this);
            //p.uploadData(this.dataForVbo);
            for (let i = 0; i < p.dataForEbo.length; i++)
            {
                this.dataForEbo[this.curIndexCount + i] = p.dataForEbo[i] + this.curVerCount;
            }
            this.particles.push(p);

            this.curVerCount += this.emission.perVertexCount;
            this.curIndexCount += this.emission.perIndexxCount;

            // this.mesh.glMesh.uploadVertexSubData(context.webgl, this.dataForVbo);
            // this.mesh.glMesh.uploadIndexSubData(this.webgl, 0, this.dataForEbo);
            this.mesh.glMesh.uploadIndexData(this.webgl, 0, this.dataForEbo);
            
            this.mesh.submesh[0].size = this.curIndexCount;
        }

        private refreshBuffer()
        {
            var needvercount = this.curVerCount + this.emission.perVertexCount;
            var needIndexCount = this.curIndexCount + this.emission.perIndexxCount;

            if (needvercount * this.emission.vertexSize > this.dataForVbo.length)
            {
                var length = this.dataForVbo.length;
                this.mesh.glMesh.resetVboSize(this.webgl, length * 2);
                let vbo = new Float32Array(length * 2);
                vbo.set(this.dataForVbo, 0);
                this.dataForVbo = vbo;
            }
            if (needIndexCount > this.dataForEbo.length)
            {
                var length = this.dataForEbo.length;
                this.mesh.glMesh.resetEboSize(this.webgl, 0, length * 2);
                let ebo = new Uint16Array(length * 2);
                ebo.set(this.dataForEbo, 0);
                this.dataForEbo = ebo;
            }
        }

        update(delta: number)
        {
            for (let key in this.particles)
            {
                this.particles[key].update(delta);
                this.particles[key].uploadData(this.dataForVbo);
            }
        }

        render(context: renderContext, assetmgr: assetMgr, camera: gd3d.framework.camera)
        {
            let mesh = this.mesh;

            //mesh.glMesh.uploadVertexSubData(context.webgl, this.dataForVbo);
            mesh.glMesh.uploadVertexData(context.webgl, this.dataForVbo);
            if (assetmgr.app.getScene().fog)
            {
                context.fog = assetmgr.app.getScene().fog;
                this.mat.draw(context, mesh, mesh.submesh[0], "base_fog");
            } else
            {
                this.mat.draw(context, mesh, mesh.submesh[0], "base");
            }
        }
        dispose()
        {
            this.dataForVbo = null;
            this.dataForEbo = null;
            this.mesh.dispose();
            this.mat.dispose();
            for (let key in this.particles)
            {
                this.particles[key].dispose();
            }
        }
    }
}