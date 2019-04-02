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
        // public static api: string = "http://wa.h5game.live:3001";
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
                                console.error(`error:${xhr.status} ${xhr.statusText}`);
                                reason(new Error(xhr.responseText));
                            }
                        }
                        else
                        {
                            console.error(`error:${xhr.responseText} `, `${this.api}${url}`, data);
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
                NetTools.Get(`${this.api}${url}`, data).then((xhr: XMLHttpRequest) =>
                {
                    if (xhr.status == 200)
                    {
                        try
                        {
                            resolve(JSON.parse(xhr.responseText));
                        } catch (e)
                        {
                            console.error(`error:${xhr.status} ${xhr.statusText}`, `${this.api}${url}`, data);
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

        static UserAPIPost(url: string, data?, binrary: boolean = false)
        {
            if (data)
                data.token = this.loginInfo.token;
            return this.APIPost(url, data, binrary);
        }
        static UserAPIGet(url: string, data?)
        {
            if (data)
                data.token = this.loginInfo.token;
            else if (url.lastIndexOf("token=") == -1)
            {
                if (url.lastIndexOf("?") == -1)
                    url = `${url}?token=${this.loginInfo.token}`;
                else
                    url = `${url}&token=${this.loginInfo.token}`;
            }
            return this.APIGet(url, data);
        }

        //登录
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

        //注册
        static async Register(data: {
            nickname: string,
            username: string,
            password: string,
            phone: string,
            email: string,
        })
        {
            this.loginInfo = null;
            let result = await this.APIPost("/api/user/public/register", data);
            if (result.error == 0)
            {
                this.loginInfo = result.body;
                LocalStore.Set("loginInfo", JSON.stringify(result.body));
            }
            return result;
        }


        //验证令牌
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

        //保存地图
        static SaveMap(data: { name: string, desc: string, data: any })
        {
            return this.UserAPIPost("/api/map/savemap", data);
        }
        //读取地图列表
        static ReadMapList()
        {
            return this.UserAPIGet("/api/map/readmap");
        }

        //删除地图
        static DelMap(data: { name: string })
        {
            return this.UserAPIGet("/api/map/delmap", data);
        }


        //创建地图块
        static CreateBlock(data: {
            name: string
            desc: string
            data: string
        })
        {
            return this.UserAPIPost("/api/map/createblock", data);
        }

        //读取地图块列表
        static ReadBlockList()
        {
            return this.UserAPIGet("/api/map/readblock");
        }


        //删除地图块
        static DelBlock(data: { name: string })
        {
            return this.UserAPIGet("/api/map/delblock", data);
        }

        static GetBlockTexUrl(name: string)
        {
            if (name.indexOf(".") == 0)
                name = name.substring(1);
            // return `${this.api}/api/map/getblocktex.png?token=${this.loginInfo.token}&name=${name}`;
            return `${this.api}${name}`;
        }
    }
}