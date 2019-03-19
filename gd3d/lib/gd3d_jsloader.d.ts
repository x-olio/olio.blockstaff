declare namespace gd3d {
    class jsLoader {
        static startApp(jscode: string[]): void;
        private static _instance;
        private importList;
        private totaltask;
        private _complete;
        private _process;
        static instance(): jsLoader;
        private static getXHR();
        preload(complete: () => void, process?: (total: number, left: number) => void): void;
        addImportScript(path: string): void;
        private onAllLoadComplete();
        private startLoadScript(e);
        private loadScriptError(e);
    }
}
