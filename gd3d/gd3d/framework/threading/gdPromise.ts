namespace gd3d.threading
{
    export class gdPromise<T>
    {
        private execQueue: Array<(value?: T) => void> = new Array<(value?: T) => void>();
        private catchMethod: (val: T) => void;
        // private thenCall: (val: T) => void;

        constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void)
        {
            setTimeout(() =>
            {
                executor(this.resolve.bind(this), this.reject.bind(this));
            }, 0);
        }

        public resolve(value?: T)
        {
            try
            {
                // if (this.thenCall)
                //     this.thenCall(value);
                while (this.execQueue.length > 0)
                    this.execQueue.shift()(value);
            } catch (e)
            {
                this.reject(e);
            }


        }

        public reject(reason?: any)
        {
            console.error(reason);
            if (this.catchMethod)
                return this.catchMethod(reason);

        }

        public then(thenCall: (value?: T) => void): gdPromise<T>
        {
            // this.thenCall = thenCall;
            this.execQueue.push(thenCall);
            return this;
        }

        public catch(callbcack: (val: any) => void): gdPromise<T>
        {
            this.catchMethod = callbcack;
            return this;
        }
    }
}