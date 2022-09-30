"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPanelForceGraph3D = exports.WebPanelForceGraph3DManager = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const WebPanel_1 = require("../../components/WebPanel");
const LineTag_1 = require("../../components/LineTag");
const LineTag_2 = require("./LineTag");
const StatusBar_1 = require("./StatusBar");
const Command_1 = require("./Command");
const CommonInterface = require("./CommonInterface");
const ActivateVscodeContext_1 = require("../../components/ActivateVscodeContext");
let WebPanelForceGraph3DManager = /** @class */ (() => {
    class WebPanelForceGraph3DManager {
        static get key() {
            return WebPanelForceGraph3DManager._key;
        }
        static createPanel(filePath, newWebPanel) {
            if (this._key === undefined &&
                WebPanel_1.WebPanelManager.createWebPanelByJsonFile(filePath, newWebPanel)) {
                this._key = WebPanel_1.WebPanelManager.recognizeKey(filePath);
                return true;
            }
            return false;
        }
        static deletePanel() {
            if (this.key !== undefined &&
                WebPanel_1.WebPanelManager.deleteWebPanel(this.key)) {
                this._key = undefined;
                return true;
            }
            return false;
        }
        static getPanel() {
            if (this._key !== undefined) {
                return WebPanel_1.WebPanelManager.findWebPanel(this._key);
            }
            return undefined;
        }
        static webReady() {
            const panel = this.getPanel();
            return panel !== undefined ? panel.webReady() : false;
        }
        static hasKey() {
            if (this._key !== undefined) {
                return true;
            }
            return false;
        }
    }
    WebPanelForceGraph3DManager._key = undefined;
    return WebPanelForceGraph3DManager;
})();
exports.WebPanelForceGraph3DManager = WebPanelForceGraph3DManager;
class WebPanelForceGraph3D extends WebPanel_1.WebPanel {
    constructor(webInfo) {
        super(webInfo);
        this.webPanel.onDidDispose(() => {
            var _a;
            if (StatusBar_1.StatusBarForceGraph3DManager.switchBar ===
                CommonInterface.SwitchBar.on) {
                (_a = Command_1.RegisterCommandForceGraph3DManager.rcf) === null || _a === void 0 ? void 0 : _a.turnAndLoad();
                return;
            }
            else {
                this.dispose();
            }
        }, null, this.disposables);
    }
    receiveMessage(message) {
        super.receiveMessage(message);
        console.log(message);
        switch (message.command) {
            case "3dCodeGraph":
                this.CodeGraphShow(message);
                break;
            case "toSomeWhereHighLight":
                this.CodeHightLight(message);
                break;
            case "toSomeWhere":
                this.CodeFindPosition(message);
                break;
            case "NodeHighLight":
                this.NodeHightLight(message);
                break;
        }
    }
    NodeHightLight(message) {
        var _a;
        (_a = Command_1.RegisterCommandForceGraph3DManager.rct) === null || _a === void 0 ? void 0 : _a.HandleHightLight(message);
    }
    CodeGraphShow(message) {
        let rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            vscode.window.showErrorMessage("Cannot find a workspace.");
            return;
        }
        ActivateVscodeContext_1.ActivateVscodeContext.graph_mode = message.text;
        let graphFileName = message.text + ".json";
        let graphFilePath = path.join(rootPath, "3D_CODE_GRAPH", graphFileName);
        const data = fs.readFileSync(graphFilePath, "utf-8");
        this.webPanel.webview.postMessage({
            status: "3dCodeGraph",
            filePath: graphFilePath,
            data: data,
        });
        LineTag_1.LineTagManager.clear();
    }
    FindPosition(message) {
        let rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            vscode.window.showErrorMessage("Cannot find a workspace.");
            return;
        }
        let linkFilePath = path.join(rootPath, message.path);
        let exitFile = true;
        fs.access(linkFilePath, function (err) {
            if (err) {
                exitFile = false;
            }
        });
        if (!exitFile) {
            vscode.window.showErrorMessage("Cannot find " + linkFilePath);
            return;
        }
        const info = {
            filePathUri: vscode.Uri.file(linkFilePath),
            lineNumber: message.line - 1,
            startPosition: message.start,
            endPosition: message.end,
            themeName: message.themeName,
            flag: message.flag,
        };
        return info;
    }
    CodeHightLight(message) {
        const info = this.CodeFindPosition(message);
        if (!info) {
            return;
        }
        this.LoadTagInfo(info);
        return info;
    }
    CodeFindPosition(message) {
        const info = this.FindPosition(message);
        if (!info) {
            return;
        }
        let range = new vscode.Range(info.lineNumber, info.startPosition, info.lineNumber, info.endPosition);
        vscode.window.showTextDocument(info.filePathUri, {
            selection: range,
            viewColumn: 2,
        });
        return info;
    }
    LoadTagInfo(info) {
        this.LoadTag(info.filePathUri, info.lineNumber, info.startPosition, info.endPosition, info.themeName, info.flag);
    }
    LoadTag(uri, lineNumber, start, end, themeName, flag) {
        const preKey = LineTag_1.LineTagManager.assemblyKey(uri, lineNumber);
        if (LineTag_1.LineTagManager.findLineTag(preKey) === undefined) {
            const key = LineTag_2.LineTagForceGraph3DManager.createLineTag(uri, lineNumber, start, end, themeName, flag);
            console.log("key: ", key);
        }
        else {
            if (!LineTag_1.LineTagManager.deleteLineTag(preKey)) {
                vscode.window.showErrorMessage("deleteLineTag false.");
            }
        }
    }
}
exports.WebPanelForceGraph3D = WebPanelForceGraph3D;
//# sourceMappingURL=WebPanel.js.map