namespace gd3d.framework
{
    /**
     * @private
     */
    export enum ParticleEmissionType
    {
        burst,
        continue
    }
    /**
     * @private
     */
    export class EmissionData
    {
        /**
        * 发射器类型
        */
        public type: ParticleEmissionType = ParticleEmissionType.burst;

        /**
        * 发射器名字
        */
        public emissionName: string;

        /**
        * 发射器持续发射时间或者延迟爆发时间
        */
        public time: number;

        /**
        *  在发射时间内发射粒子个数
        */
        public count: number;

        constructor()
        {

        }
    }

}
