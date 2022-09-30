"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCommandForceGraph3D = exports.RegisterCommandTextControl = exports.RegisterCommandForceNodeBefore = exports.RegisterCommandForceNodeNext = exports.RegisterCommandSelectRangeDown = exports.RegisterCommandSelectRangeUp = exports.RegisterCommandForceGraph3DManager = void 0;
const vscode = require("vscode");
const ActivateVscodeContext_1 = require("../../components/ActivateVscodeContext");
const StatusBar_1 = require("./StatusBar");
const WebPanel_1 = require("./WebPanel");
const WebPanel_2 = require("../../components/WebPanel");
const CommonInterface = require("./CommonInterface");
const LineTag_1 = require("../../components/LineTag");
const LineTag_2 = require("./LineTag");
const path = require("path");
let RegisterCommandForceGraph3DManager = /** @class */ (() => {
    class RegisterCommandForceGraph3DManager {
        static get rcd() {
            return RegisterCommandForceGraph3DManager._rcd;
        }
        static get rct() {
            return RegisterCommandForceGraph3DManager._rct;
        }
        static get rcf() {
            return RegisterCommandForceGraph3DManager._rcf;
        }
        static get rcn() {
            return RegisterCommandForceGraph3DManager._rcn;
        }
        static get rcu() {
            return RegisterCommandForceGraph3DManager._rcu;
        }
        static get rcb() {
            return RegisterCommandForceGraph3DManager._rcb;
        }
        static initial(coreData) {
            if (this._rcf === undefined) {
                this._rcf = new RegisterCommandForceGraph3D(coreData);
                this._rct = new RegisterCommandTextControl(coreData);
                this._rcn = new RegisterCommandForceNodeNext(coreData);
                this._rcb = new RegisterCommandForceNodeBefore(coreData);
                this._rcu = new RegisterCommandSelectRangeUp(coreData);
                this._rcd = new RegisterCommandSelectRangeDown(coreData);
                return true;
            }
            return false;
        }
    }
    RegisterCommandForceGraph3DManager._rcf = undefined;
    RegisterCommandForceGraph3DManager._rct = undefined;
    RegisterCommandForceGraph3DManager._rcn = undefined;
    RegisterCommandForceGraph3DManager._rcb = undefined;
    RegisterCommandForceGraph3DManager._rcu = undefined;
    RegisterCommandForceGraph3DManager._rcd = undefined;
    return RegisterCommandForceGraph3DManager;
})();
exports.RegisterCommandForceGraph3DManager = RegisterCommandForceGraph3DManager;
class RegisterCommandSelectRangeUp extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "SelectRangeUp");
        this.coreData = coreData;
    }
    mainFunc() {
        // vscode.window.showInformationMessage("UP");
        let activeEditor = vscode.window.activeTextEditor;
    }
    SendInfo(message) {
        var _a;
        (_a = WebPanel_1.WebPanelForceGraph3DManager.getPanel()) === null || _a === void 0 ? void 0 : _a.webPanel.webview.postMessage(message);
    }
}
exports.RegisterCommandSelectRangeUp = RegisterCommandSelectRangeUp;
class RegisterCommandSelectRangeDown extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "SelectRangeDown");
        this.coreData = coreData;
    }
    mainFunc() {
        vscode.window.showInformationMessage("DOWN");
    }
    SendInfo(message) {
        var _a;
        (_a = WebPanel_1.WebPanelForceGraph3DManager.getPanel()) === null || _a === void 0 ? void 0 : _a.webPanel.webview.postMessage(message);
    }
}
exports.RegisterCommandSelectRangeDown = RegisterCommandSelectRangeDown;
class RegisterCommandForceNodeNext extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "ForceNodeNext");
        this.coreData = coreData;
    }
    mainFunc() {
        // vscode.window.showInformationMessage("NEXT");
        this.SendInfo({ status: "ForceNodeNext" });
    }
    SendInfo(message) {
        var _a;
        (_a = WebPanel_1.WebPanelForceGraph3DManager.getPanel()) === null || _a === void 0 ? void 0 : _a.webPanel.webview.postMessage(message);
    }
}
exports.RegisterCommandForceNodeNext = RegisterCommandForceNodeNext;
class RegisterCommandForceNodeBefore extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "ForceNodeBefore");
        this.coreData = coreData;
    }
    mainFunc() {
        // vscode.window.showInformationMessage("BEFORE");
        this.SendInfo({ status: "ForceNodeBefore" });
    }
    SendInfo(message) {
        var _a;
        (_a = WebPanel_1.WebPanelForceGraph3DManager.getPanel()) === null || _a === void 0 ? void 0 : _a.webPanel.webview.postMessage(message);
    }
}
exports.RegisterCommandForceNodeBefore = RegisterCommandForceNodeBefore;
class RegisterCommandTextControl extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "TextControl");
        this.coreData = coreData;
    }
    mainFunc() {
        let activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && WebPanel_1.WebPanelForceGraph3DManager.key) {
            this.SendToWebPage(activeEditor);
        }
    }
    SendToWebPage(activeEditor) {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            console.log("ERROR rootPath: ", rootPath);
        }
        else {
            let KeyList = this.generateFileInfo(activeEditor);
            let uri = activeEditor.document.uri;
            let flag = "TextControl";
            console.log("KeyList.size: ", KeyList.size);
            let message = {
                status: "NodeHighLight",
                selections: new Array(),
            };
            KeyList.forEach((lineNumber, preKey) => {
                let highLightSwitch = true; // default is node turn on.
                if (LineTag_1.LineTagManager.findLineTag(preKey, flag)) {
                    highLightSwitch = false; // There is key means the node has been turn on, so turn off it.
                }
                let selection = this.generateSelectInfo(activeEditor.document.fileName.replace(rootPath + "/", ""), highLightSwitch, lineNumber + 1); // lineNumber +1 is current line number
                message.selections.push(selection);
            });
            this.SendInfo(message);
        }
    }
    HandleHightLight(message) {
        console.log("message:", message);
        this.hightLight(message);
        this.Load();
    }
    hightLight(message) {
        const rootPath = vscode.workspace.rootPath;
        if (rootPath) {
            let selections = message.selections;
            let info = this.generateHighLightInfo(selections, true);
            console.log("selections: ", info);
            let flag = "TextControl";
            info.forEach((data) => {
                console.log("uri: ", data.uri);
                LineTag_1.LineTagManager.turnOff(data.preKey, flag, "saveByFlag"); // delete all not TextControl select
                if (LineTag_1.LineTagManager.findLineTag(data.preKey, flag)) {
                    if (!LineTag_1.LineTagManager.deleteLineTagBase(data.preKey)) {
                        vscode.window.showErrorMessage("deleteLineTag false.");
                    }
                }
                else {
                    const key = LineTag_2.LineTagForceGraph3DManager.createLineTag(data.uri, data.line, 0, 0, "Theme_2", "TextControl");
                    console.log("key: ", key);
                }
            });
        }
    }
    generateHighLightInfo(selections, mode) {
        let info = new Array();
        const rootPath = vscode.workspace.rootPath;
        if (rootPath) {
            selections.forEach((selection) => {
                if (selection.switch === mode) {
                    const uri = vscode.Uri.file(path.join(rootPath, selection.fileName));
                    const line = selection.line - 1;
                    const preKey = LineTag_1.LineTagManager.assemblyKey(uri, line);
                    info.push({ preKey, uri, line });
                }
            });
        }
        return info;
    }
    generateKeyList(info) {
        let KeyList = new Map();
        info.forEach((line, filename) => {
            let uri = vscode.Uri.file(filename);
            const preKey = LineTag_1.LineTagManager.assemblyKey(uri, line);
            KeyList.set(preKey, line);
        });
        return KeyList;
    }
    SendInfo(message) {
        var _a;
        (_a = WebPanel_1.WebPanelForceGraph3DManager.getPanel()) === null || _a === void 0 ? void 0 : _a.webPanel.webview.postMessage(message);
    }
    Load() {
        let graphMode = ActivateVscodeContext_1.ActivateVscodeContext.graph_mode;
        switch (graphMode) {
            case "NotSelect":
                LineTag_1.LineTagManager.UnLoadDecoration();
                break;
            default:
                LineTag_1.LineTagManager.LoadDecoration();
                break;
        }
    }
    generateSelectInfo(fileName, lineSwitch, lineNumber) {
        let message = {
            fileName: fileName,
            switch: lineSwitch,
            line: lineNumber,
        };
        return message;
    }
    generateFileInfo(activeEditor) {
        let KeyList = new Map();
        let selections = activeEditor.selections;
        let uri = vscode.Uri.file(activeEditor.document.fileName);
        selections.forEach((element) => {
            for (let lineNumber = element.start.line; lineNumber <= element.end.line; lineNumber++) {
                const preKey = LineTag_1.LineTagManager.assemblyKey(uri, lineNumber);
                KeyList.set(preKey, lineNumber);
            }
        });
        return KeyList;
    }
}
exports.RegisterCommandTextControl = RegisterCommandTextControl;
class RegisterCommandForceGraph3D extends CommonInterface.RegisterCommand {
    constructor(coreData) {
        super(coreData, "ForceGraph3D");
        this.coreData = coreData;
    }
    mainFunc() {
        // vscode.window.showInformationMessage("3D FORCE GRAPH");
        if (StatusBar_1.StatusBarForceGraph3DManager.switchTurn()) {
            ActivateVscodeContext_1.ActivateVscodeContext.activeEditor = vscode.window.activeTextEditor;
            this.loadWebPanel();
        }
    }
    turnAndLoad() {
        StatusBar_1.StatusBarForceGraph3DManager.barSituation =
            CommonInterface.BarSituation.going;
        this.mainFunc();
    }
    loadWebPanel() {
        if (StatusBar_1.StatusBarForceGraph3DManager.switchBar ===
            CommonInterface.SwitchBar.on) {
            const webViewInfo = WebPanel_2.WebPanelManager.generateWebViewInfo(this.coreData.PanelConfigPath);
            const newWebPanel = new WebPanel_1.WebPanelForceGraph3D(webViewInfo.webInfo);
            WebPanel_1.WebPanelForceGraph3DManager.createPanel(this.coreData.PanelConfigPath, newWebPanel);
            this.changeConfigForHightLine(CommonInterface.statusHighLight.show);
        }
        else {
            WebPanel_1.WebPanelForceGraph3DManager.deletePanel();
            this.changeConfigForHightLine(CommonInterface.statusHighLight.hide);
        }
    }
    changeConfigForHightLine(status) {
        let Flag = 0;
        switch (status) {
            case CommonInterface.statusHighLight.show:
                Flag = 1;
                ActivateVscodeContext_1.ActivateVscodeContext.show_mode = "show";
                break;
            case CommonInterface.statusHighLight.hide:
                Flag = 2;
                ActivateVscodeContext_1.ActivateVscodeContext.show_mode = "hide";
                break;
            default:
                Flag = 3;
                ActivateVscodeContext_1.ActivateVscodeContext.show_mode = "hide";
                break;
        }
        function showInfo() {
            // vscode.window.showInformationMessage(`Flag: ${Flag}`);
        }
    }
}
exports.RegisterCommandForceGraph3D = RegisterCommandForceGraph3D;
//# sourceMappingURL=Command.js.map