declare namespace lighttool.htmlui {
    class ContextMenu {
        private menu;
        private show;
        private node;
        constructor(name: string);
        clear(): void;
        addItem(path: string, fun?: (node: any) => void): void;
        private createItem(path, fun?);
        addLine(): void;
        disableItem(path: string): void;
        enableItem(path: string): void;
        showMenu(x: any, y: any, node: any): void;
        hideMenu(): void;
    }
}
declare namespace lighttool.htmlui {
    class listBox {
        addLine(string: string, color?: string, tag?: any): void;
        clear(): void;
        onSelectItem: (txt: string, tag: any) => void;
        private selectItem;
        private onSelect(div);
        txtArea: HTMLDivElement;
        constructor(parent: panel | HTMLDivElement);
    }
}
declare namespace lighttool.htmlui {
    class ItemInfo {
        listE: HTMLElement[];
        indexE: number;
        dataE: any[];
    }
    interface iContainer {
        parent: guiframework | iContainer;
        dom: HTMLElement;
        name: string;
        index: number;
        resetall: boolean;
        add(e: HTMLElement): any;
        begin(): any;
        end(): any;
        fix(e: HTMLElement): any;
        getItemParent(index: number): HTMLElement;
    }
    class guiframework {
        private divParent;
        constructor(div: HTMLDivElement);
        onchange: () => void;
        private listLine;
        private indexLine;
        private container;
        protected mapItemInfo: {
            [id: string]: ItemInfo;
        };
        private calcColString();
        private resetall;
        private begin();
        private end();
        private remove(e);
        private addElem(e);
        beginLayout(cachename: string, layoutCtor: (parent: guiframework | iContainer) => iContainer, cssname: string, cssext: {
            [id: string]: string;
        }): void;
        endLayout(): void;
        private static mapStyle;
        add(cachename: string, domctor: () => HTMLElement, cssname: string, cssext: {
            [id: string]: string;
        }): HTMLElement;
        private needUpdate;
        private inUpdate;
        update(): void;
    }
    class HLayout implements iContainer {
        constructor(parent: guiframework | iContainer);
        parent: guiframework | iContainer;
        dom: HTMLElement;
        name: string;
        index: number;
        resetall: boolean;
        add(e: HTMLElement): void;
        getItemParent(index: number): HTMLElement;
        begin(): void;
        end(): void;
        fix(e: HTMLElement): void;
    }
    class VLayout implements iContainer {
        constructor(parent: guiframework | iContainer);
        parent: guiframework | iContainer;
        dom: HTMLElement;
        name: string;
        index: number;
        listLine: HTMLDivElement[];
        resetall: boolean;
        add(e: HTMLElement): void;
        getItemParent(index: number): HTMLElement;
        begin(): void;
        end(): void;
        fix(e: HTMLElement): void;
    }
    class gui extends guiframework {
        beginLayout_H(cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        beginLayout_V(cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        add_Space(width?: number, height?: number): void;
        add_A(text: string, href?: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        add_P(text: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        add_Span(text: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        add_Img(src: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): void;
        add_Textbox(text: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): string;
        add_Passbox(text: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): string;
        add_Checkbox(text: string, checked: boolean, cssname?: string, cssext?: {
            [id: string]: string;
        }): boolean;
        add_Button(text: string, cssname?: string, cssext?: {
            [id: string]: string;
        }): boolean;
        add_DragFile(cssname?: string, cssext?: {
            [id: string]: string;
        }): FileList;
        add_ButtonBigImage(text: string, imgurl: string, select: boolean, cssname?: string, cssext?: {
            [id: string]: string;
        }): boolean;
        add_ButtonSmallImage(text: string, imgurl: string, select: boolean, cssname?: string, cssext?: {
            [id: string]: string;
        }): boolean;
    }
}
declare namespace lighttool.htmlui {
    interface IPanel {
        divRoot: HTMLDivElement;
        container: panelContainer;
        onDock(container: panelContainer): any;
    }
    enum direction {
        H_Left = 0,
        H_Right = 1,
        V_Top = 2,
        V_Bottom = 3,
    }
    class panel implements IPanel {
        container: panelContainer;
        divRoot: HTMLDivElement;
        name: string;
        divTitle: HTMLDivElement;
        divContent: HTMLDivElement;
        divResize: HTMLDivElement;
        btnFloat: HTMLButtonElement;
        btnClose: HTMLButtonElement;
        onClose: () => void;
        floatWidth: number;
        floatHeight: number;
        isFloat: boolean;
        canDrag: boolean;
        canScale: boolean;
        canDock: boolean;
        constructor(div: HTMLDivElement);
        setTitleText(txt: string): void;
        setTitle(txt: string, img?: string): void;
        splitWith(p: panel, dir: direction, v: number): void;
        onDock(container: panelContainer): void;
        makeMini(width: number, height: number): void;
        onFloat(): void;
        toCenter(): void;
        show(): void;
        hide(): void;
    }
    class panelContainer implements IPanel {
        divRoot: HTMLDivElement;
        subPanels: IPanel[];
        container: panelContainer;
        readonly maxPanelCount: number;
        constructor(div: HTMLDivElement);
        scalew: number;
        scaleh: number;
        divScale: HTMLDivElement;
        divScalebg: HTMLDivElement;
        onSplit(dir: direction, v: number): void;
        _doSplit(): void;
        onDock(container: panelContainer): void;
        addSubPanel(p: IPanel, pos?: number): void;
        removeSubPanel(p: IPanel): void;
        removeAllSubPanel(): void;
        _fillStyle(div: HTMLDivElement): void;
        fill(p: IPanel): void;
    }
    class panelMgr {
        private static g_this;
        static instance(): panelMgr;
        readonly width: number;
        readonly height: number;
        private urlfill;
        private urlleft;
        private divRoot;
        root: panelContainer;
        private floatDiv;
        private overDiv;
        private overDiv_Show;
        private overDiv_FillImg;
        private overDiv_LeftImg;
        private overDiv_RightImg;
        private overDiv_TopImg;
        private overDiv_BottomImg;
        private backimg;
        setbackImg(url: string): void;
        init(div: HTMLDivElement): void;
        pickPanel(panel: IPanel, cx: any, cy: any): IPanel;
        createPanel(name: string, width?: number, height?: number, customctor?: (div: HTMLDivElement) => panel): panel;
        toTop(panel: panel): void;
        floatPanel(panel: panel): void;
        removePanel(panel: panel): void;
        removeAllPanel(): void;
        fillPanel(panel: panel): void;
        private _moveTop(divsrc);
        private _initOverDiv();
        private pickOverLay(cx, cy);
        private testOverlay(usedock, cx, cy);
        private _inbox(panel, cx, cy);
        _setDockPos(div: HTMLDivElement, x: string, y: string, r: string, b: string): void;
        _calcRootPos(div: HTMLDivElement): {
            x: number;
            y: number;
        };
        _calcClientPos(div: HTMLElement): {
            x: number;
            y: number;
        };
        _calcRootCenterPos(): {
            x: number;
            y: number;
        };
    }
}
declare namespace lighttool.htmlui {
    class QuickDom {
        static addElement(panel: panel | HTMLDivElement, name: string): HTMLElement;
        static addA(panel: panel | HTMLDivElement, text: string, href?: string): HTMLAnchorElement;
        static addSpace(panel: panel | HTMLDivElement, width: number): HTMLDivElement;
        static addReturn(panel: panel | HTMLDivElement): HTMLBRElement;
        static addTextInput(panel: panel | HTMLDivElement, text?: string): HTMLInputElement;
        static addTextInputPassword(panel: panel | HTMLDivElement, text?: string): HTMLInputElement;
        static addButton(panel: panel | HTMLDivElement, text?: string): HTMLButtonElement;
    }
}
