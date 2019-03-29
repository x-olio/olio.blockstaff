namespace gd3d.io
{
    class loadRetryMgr{
        public static urlCaseDic:{[url:string]:number};

    }
    /**
     * 
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @param loadedFun 正常加载完成后回调
     */
    export function xhrLoad(url: string, fun: (ContentData: any, _err: Error,isloadFail?:boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null,responseType:XMLHttpRequestResponseType,loadedFun:(req:XMLHttpRequest)=>void){
        let req = new XMLHttpRequest();
        let isLoaded = false;
        req.open("GET", url);
        req.responseType = responseType;
        req.onreadystatechange = () =>
        {
            if (req.readyState == 4)
            {
                if(req.status == 200){
                    loadedFun(req);
                    isLoaded = true;
                }else{
                    switch(req.status){
                        case 404:
                        fun(null, new Error("got a 404:" + url));
                        //return;
                        break;
                    }
                }
            }
        };
        req.onprogress = (ev) =>
        {
            if (onprocess)  onprocess(ev.loaded, ev.total);
        }
        req.onerror = (ev) =>
        {
            fun(null, new Error(`URL : ${url} \n onerr on req: ` ));
        };
        req.onloadend = ()=>{
            //console.error(" is onload");
            if(!isLoaded){
                //retry some times
                if(!loadRetryMgr.urlCaseDic) loadRetryMgr.urlCaseDic = {};
                let dic = loadRetryMgr.urlCaseDic;
                dic[url] = isNaN(dic[url]) || dic[url]<0 ? 0 : dic[url];
                if(dic[url] >= 2){
                    dic[url] = 0;
                    fun(null,new Error("load this url fail  ：" + url),true);  //throw error after retry some times
                    //console.error(`------ load this url fail URL:${url}  `);
                }else{
                    gd3d.io.xhrLoad(url,fun,onprocess,responseType,loadedFun);
                    dic[url]++;
                    //console.warn(` retryLoad URL:${url} \n times ${dic[url]} `);
                }
            }
        };

        try {
            req.send();
        }catch(err){
            fun(null,err);
        }
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载text资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @version egret-gd3d 1.0
     */
    export function loadText(url: string, fun: (_txt: string, _err: Error,isloadFail?:boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void 
    {
        if(framework.assetMgr.useBinJs)
        {
            url=framework.assetMgr.correctTxtFileName(url);
        }
        gd3d.io.xhrLoad(url,fun,onprocess,"text",(req)=>{
            fun(req.responseText, null);
        });
    }


    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载arraybuffer资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @version egret-gd3d 1.0
     */
    export function loadArrayBuffer(url: string, fun: (_bin: ArrayBuffer, _err: Error,isloadFail?:boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void
    {
        if(framework.assetMgr.useBinJs)
        {
            url=framework.assetMgr.correctFileName(url);
        }
        //req.responseType = "arraybuffer";//ie 一定要在open之后修改responseType
        gd3d.io.xhrLoad(url,fun,onprocess,"arraybuffer", (req)=>{
            fun(req.response, null);
        });
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载二进制资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param onprocess 加载进度
     * @version egret-gd3d 1.0
     */
    export function loadBlob(url: string, fun: (_blob: Blob, _err: Error,isloadFail?:boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void
    {
        gd3d.io.xhrLoad(url,fun,onprocess,"blob",(req)=>{
            fun(req.response, null);
        });
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 加载图片资源
     * @param url 加载路径
     * @param fun 加载结果回调函数
     * @param progress 加载进度
     * @version egret-gd3d 1.0
     */
    export function loadImg(url: string, fun: (_tex: HTMLImageElement, _err: Error,loadFail?:boolean) => void, onprocess: (curLength: number, totalLength: number) => void = null): void
    {
        gd3d.io.xhrLoad(url,fun,onprocess,"blob",(req)=>{
            var blob = req.response;
            var img = document.createElement("img");
            img.crossOrigin = "";
            img.onload = function (e)
            {
                window.URL.revokeObjectURL(img.src);
                fun(img, null);
            };
            img.onerror = function (e)
            {
                fun(null, new Error("error when blob to img:" + url));
            }
            try{
                img.src = window.URL.createObjectURL(blob);
            }catch(e){
                fun(null,e);
            }
        });
    }
}