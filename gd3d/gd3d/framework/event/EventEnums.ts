namespace gd3d.event
{
    /**
     * UI 事件枚举
     */
    export enum UIEventEnum
    {
        PointerDown,
        PointerUp,
        PointerClick,
        PointerDoubleClick,
        PointerEnter,
        PointerExit
    }

    /**
     * 点事件枚举
     */
    export enum PointEventEnum
    {
        PointDown,
        PointHold,
        PointUp,
        PointMove,
        PointClick,
        MouseWheel
    }

    /**
     * 按键事件枚举
     */
    export enum KeyEventEnum
    {
        KeyDown,
        KeyUp,
    }

    /**
     * Key codes returned by Event keyCode These map directly to a physical key on
     * he keyboard
     * */
    export enum KeyCode
    {
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        NumpadMultiply = 106,
        NumpadAdd = 107,
        NumpadSubtract = 109,
        NumpadDecimal = 110,
        NumpadDivide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        Enter = 13,
        NumLock = 144,
        ScrollLock = 145,
        ShiftLeft = 16,
        ControlRight = 17,
        AltRight = 18,
        Semicolon = 186,
        Comma = 188,
        Pause = 19,
        Period = 190,
        Slash = 191,
        CapsLock = 20,
        BracketLeft = 219,
        Backslash = 220,
        BracketRight = 221,
        Quote = 222,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        ArrowLeft = 37,
        ArrowUp = 38,
        ArrowRight = 39,
        ArrowDown = 40,
        Insert = 45,
        Delete = 46,
        Digit1 = 49,
        Digit2 = 50,
        Digit3 = 51,
        Digit4 = 52,
        KeyA = 65,
        KeyB = 66,
        KeyC = 67,
        KeyD = 68,
        KeyE = 69,
        KeyF = 70,
        KeyG = 71,
        KeyH = 72,
        KeyI = 73,
        KeyJ = 74,
        KeyK = 75,
        KeyL = 76,
        KeyM = 77,
        KeyN = 78,
        KeyO = 79,
        KeyP = 80,
        KeyQ = 81,
        KeyR = 82,
        KeyS = 83,
        KeyT = 84,
        KeyU = 85,
        KeyV = 86,
        KeyW = 87,
        KeyX = 88,
        KeyY = 89,
        Tab = 9,
        KeyZ = 90,
        MetaLeft = 91,
        ContextMenu = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99
    }

}