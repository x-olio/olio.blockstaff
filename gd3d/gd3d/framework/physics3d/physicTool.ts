namespace gd3d.framework {
    /** 
     * tool of physic
     */
    export class physicTool{
        static Ivec3Equal(a , b){
            return a.x == b.x && a.y == b.y && a.z == b.z ;
        }

        static IQuatEqual(a , b){
            return a.x == b.x && a.y == b.y && a.z == b.z && a.w == b.w ;
        }

        static Ivec3Copy(from:{x,y,z},to:{x,y,z})
        {
            to.x=from.x;
            to.y=from.y;
            to.z=from.z;
        }

        static IQuatCopy(from:{x,y,z,w},to:{x,y,z,w})
        {
            to.x=from.x;
            to.y=from.y;
            to.z=from.z;
            to.w=from.w;
        }

        static vec3AsArray(vec3: math.vector3){
            let result = [];
            result[0] = vec3.rawData[0];
            result[1] = vec3.rawData[1];
            result[2] = vec3.rawData[2];
            return result;
        }

    }

}