/// <reference path="../../io/reflect.ts" />

namespace gd3d.framework
{
    @reflect.nodeComponent
    export class AudioListener implements INodeComponent
    {
        static readonly ClassName:string="AudioListener";

        private listener: any;
        start()
        {
            this.listener = AudioEx.instance().audioContext.listener;
        }

        onPlay()
        {

        }

        private lastX: number = 0;
        private lastY: number = 0;
        private lastZ: number = 0;
        private curPos: gd3d.math.vector3;
        gameObject: gameObject;
        update(delta: number)
        {
            this.curPos = this.gameObject.transform.getWorldTranslate();
            if (this.curPos.x != this.lastX || this.curPos.y != this.lastY || this.curPos.z != this.lastZ)
            {
                this.listener.setPosition(this.curPos.x, this.curPos.y, this.curPos.z);
                this.lastX = this.curPos.x;
                this.lastY = this.curPos.y;
                this.lastZ = this.curPos.z;
            }
        }
        remove()
        {

        }
        clone()
        {

        }
    }
}