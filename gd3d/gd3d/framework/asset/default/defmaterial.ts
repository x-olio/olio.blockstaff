namespace gd3d.framework
{
    export class defmaterial
    {
        static initDefaultMaterial(assetmgr: assetMgr){
            {
                let mat = new material();
                let sh = assetmgr.getShader("shader/defui");
                mat.setShader(sh);
                assetmgr.mapMaterial[sh.getName()] = mat;
            }
        }
    }
}