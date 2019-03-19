namespace gd3d.framework
{
    export class defMesh
    {
        static initDefaultMesh(assetmgr: assetMgr)
        {
            assetmgr.mapDefaultMesh["cube"] = gd3d.framework.defMesh.createDefaultMesh("cube", gd3d.render.meshData.genBoxCCW(1.0), assetmgr.webgl);
            assetmgr.mapDefaultMesh["quad"] = gd3d.framework.defMesh.createDefaultMesh("quad", gd3d.render.meshData.genQuad(1.0), assetmgr.webgl);
            assetmgr.mapDefaultMesh["quad_particle"] = gd3d.framework.defMesh.createDefaultMesh("quad_particle", gd3d.render.meshData.genQuad_forparticle(1.0), assetmgr.webgl);
            assetmgr.mapDefaultMesh["plane"] = gd3d.framework.defMesh.createDefaultMesh("plane", gd3d.render.meshData.genPlaneCCW(10), assetmgr.webgl);
            assetmgr.mapDefaultMesh["sphere"] = gd3d.framework.defMesh.createDefaultMesh("sphere", gd3d.render.meshData.genSphereCCW(), assetmgr.webgl);
            assetmgr.mapDefaultMesh["sphere_quality"] = gd3d.framework.defMesh.createDefaultMesh("sphere_quality", gd3d.render.meshData.genSphereCCW(2.58,40,40), assetmgr.webgl);
            assetmgr.mapDefaultMesh["pyramid"] = gd3d.framework.defMesh.createDefaultMesh("pyramid", gd3d.render.meshData.genPyramid(2,0.5), assetmgr.webgl);
            assetmgr.mapDefaultMesh["cylinder"] = gd3d.framework.defMesh.createDefaultMesh("cylinder", gd3d.render.meshData.genCylinderCCW(2, 0.5), assetmgr.webgl);
            assetmgr.mapDefaultMesh["circleline"] = gd3d.framework.defMesh.createDefaultMesh("circleline", gd3d.render.meshData.genCircleLineCCW(1), assetmgr.webgl);
        }

        private static createDefaultMesh(name: string, meshData: render.meshData, webgl: WebGLRenderingContext): mesh
        {
            var _mesh: gd3d.framework.mesh = new gd3d.framework.mesh(name + ".mesh.bin");
            _mesh.defaultAsset = true;
            _mesh.data = meshData;
            var vf = gd3d.render.VertexFormatMask.Position | gd3d.render.VertexFormatMask.Normal| gd3d.render.VertexFormatMask.Tangent | gd3d.render.VertexFormatMask.Color | gd3d.render.VertexFormatMask.UV0;
            _mesh.data.originVF=vf;
            var v32 = _mesh.data.genVertexDataArray(vf);
            var i16 = _mesh.data.genIndexDataArray();

            _mesh.glMesh = new gd3d.render.glMesh();
            _mesh.glMesh.initBuffer(webgl, vf, _mesh.data.pos.length);
            _mesh.glMesh.uploadVertexData(webgl, v32);

            _mesh.glMesh.addIndex(webgl, i16.length);
            _mesh.glMesh.uploadIndexData(webgl, 0, i16);
            _mesh.submesh = [];

            {
                var sm = new gd3d.framework.subMeshInfo();
                sm.matIndex = 0;
                sm.useVertexIndex = 0;
                sm.start = 0;
                sm.size = i16.length;
                sm.line = false;
                _mesh.submesh.push(sm);
            }
            return _mesh;
        }
    }
}