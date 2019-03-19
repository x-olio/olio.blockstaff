namespace gd3d.framework
{
    @reflect.nodeComponent
    export class BeBillboard implements INodeComponent {
        static readonly ClassName:string="BeBillboard";

        start() {

        }

        onPlay()
        {

        }

        update(delta: number) {
            if(!this.beActive||this.target==null) return;
            this.gameObject.transform.lookat(this.target);
        }
        gameObject: gameObject;
        remove() {

        }
        clone() {

        }
        private beActive:boolean=true;
        setActive(active:boolean)
        {
            this.beActive=active;
        }
        private target:transform=null;
        setTarget(trans:transform)
        {
            this.target=trans;
        }
    }
}