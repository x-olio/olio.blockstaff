namespace Game.Common
{
    export class LocalStore
    {
        private static storeInstance = localStorage;
        static Get(key: string)
        {
            return this.storeInstance.getItem(key);
        }

        static Set(key: string, value: string)
        {
            this.storeInstance.setItem(key, value);
        }
        static Clean()
        {
            this.storeInstance.clear();
        }
    }
}