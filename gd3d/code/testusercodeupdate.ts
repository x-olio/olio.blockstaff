@gd3d.reflect.userCode
class testUserCodeUpdate implements gd3d.framework.IUserCode
{
    beExecuteInEditorMode: boolean = false;
    trans: gd3d.framework.transform;
    timer: number = 0;
    app: gd3d.framework.application;
    onStart(app: gd3d.framework.application)
    {
        this.app = app;
    }
    onUpdate(delta: number)
    {
        if (this.trans == null || this.trans == undefined)
        {
            this.trans = this.app.getScene().getChildByName("Cube");
        }
        if (this.trans == null || this.trans == undefined)
            return;
        this.timer += delta * 15;
        gd3d.math.quatFromAxisAngle(new gd3d.math.vector3(0, 1, 0), this.timer, this.trans.localRotate);
        this.trans.markDirty();
    }
    isClosed(): boolean
    {
        return false;
    }
}