namespace Game.Common
{
    export interface IResult
    {
        error: number;
        body: any;
        message: string;
    }
    export class APITools
    {
        public static api: string = "http://localhost:9001";

        public static loginInfo: {
            token: string,
            validtime: number
        };

        static APIPost(url: string, data?, binrary: boolean = false)
        {
            return new Promise<IResult>((resolve, reason) =>
            {
                NetTools.Post(`${this.api}${url}`, data).then((xhr: XMLHttpRequest) =>
                {
                    if (binrary)
                        resolve(xhr.response)
                    else
                    {

                        if (xhr.status == 200)
                        {
                            try
                            {
                                resolve(JSON.parse(xhr.responseText));
                            } catch (e)
                            {
                                console.error(`error:${xhr.responseText} `, `${this.api}${url}`, data);
                                reason(new Error(xhr.responseText));
                            }
                        }
                        else
                        {
                            console.error(`error:${xhr.status} ${xhr.statusText}`);
                            reason(new Error(`error:${xhr.status} ${xhr.statusText}`));
                        }


                    }
                })
            });
        }
        static APIGet(url: string, data?)
        {
            return new Promise<IResult>((resolve, reason) =>
            {
                NetTools.Post(`${this.api}${url}`, data).then((xhr: XMLHttpRequest) =>
                {
                    if (xhr.status == 200)
                    {
                        try
                        {
                            resolve(JSON.parse(xhr.responseText));
                        } catch (e)
                        {
                            console.error(xhr.responseText);
                            reason(new Error(xhr.responseText));
                        }
                    }
                    else
                    {
                        console.error(`error:${xhr.status} ${xhr.statusText}`, `${this.api}${url}`, data);
                        reason(new Error(`error:${xhr.status} ${xhr.statusText}`));
                    }
                })
            });
        }


        static async Login(data: {
            username: string,
            password: string
        })
        {
            this.loginInfo = null;
            let result = await this.APIPost("/api/user/public/login/uname", data);
            if (result.error == 0)
            {
                this.loginInfo = result.body;
                LocalStore.Set("loginInfo", JSON.stringify(result.body));
            }
            return result;
        }

        static Register(data: {
            loginname: string, password: string,
            phone: string, email: string
        })
        {
            return this.APIPost(`/api/user/public/login/uname`, data);
        }

        static CheckToken()
        {
            return new Promise<boolean>(async (resolve, reason) =>
            {
             
                let result = await this.APIPost("/api/user/checktoken", { token: this.loginInfo.token });
                if (result.error != 0)
                    console.error(result.message);
                resolve(result.error == 0);
            });
        }

    }
}