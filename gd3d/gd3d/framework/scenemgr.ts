namespace gd3d.framework
{
    /**
     * @private
     */
    export class sceneMgr
    {
        private static _ins: sceneMgr;
        public static get ins(): sceneMgr
        {
            if (sceneMgr._ins == null)
                sceneMgr._ins = new sceneMgr();
            return sceneMgr._ins;
        }

        public static app: application;
        public static scene: scene;
        //public static camera:camera;
    }
}