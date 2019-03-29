namespace Game.Common
{
    export class NetTools
    {
        static Get(url: string, params?: { [key: string]: string | number | boolean }, encoding: boolean = true)
        {
            return new Promise<XMLHttpRequest>((resolve, reason) =>
            {
                if (params)
                {
                    url += (url.lastIndexOf("?") == -1) ? "?" : "&";
                    for (let key in params)
                    {
                        let value = params[key];
                        if (encoding && typeof (value) == "string")
                            value = escape(params[key] as string);
                        url += `${key}=${value}&`;
                    }
                }
                this.GetXhr(url, "GET", (xhr) =>
                {
                    resolve(xhr);
                }, (xhr) =>
                    {
                        reason(xhr);
                    }).send();
            });
        }

        static Post(url: string, data?: { [key: string]: any } | ArrayBuffer)
        {
            return new Promise((resolve, reason) =>
            {
                if (data && !(data instanceof ArrayBuffer))
                {
                    let formdata = new FormData();
                    for (let key in data)
                        formdata.append(key, data[key]);
                    data = formdata
                }
                this.GetXhr(url, "POST", (xhr) =>
                {
                    resolve(xhr);
                }, (xhr) =>
                    {
                        reason(xhr);
                    }).send(data as any);
            });
        }

        static GetXhr(url: string, method: string,
            loadend?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void,
            error?: (xhr: XMLHttpRequest, ev: ProgressEvent) => void,
            statechage?: (xhr: XMLHttpRequest, ev: Event) => void)
        {
            let xhr = new XMLHttpRequest();
            xhr.onloadend = (e) =>
            {
                if (loadend)
                    loadend(xhr, e);
            };
            xhr.onerror = (e) =>
            {
                if (error)
                    error(xhr, e);
            };
            xhr.onreadystatechange = (e) =>
            {
                if (statechage)
                    statechage(xhr, e);
            };
            xhr.open(method, url);
            return xhr;
        }
    }
}