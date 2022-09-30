"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPanel = exports.WebPanelManager = exports.WebStatus = void 0;
const vscode = require("vscode");
const path = require("path");
const ActivateVscodeContext_1 = require("./ActivateVscodeContext");
const ConventPage_1 = require("./ConventPage");
var WebStatus;
(function (WebStatus) {
    WebStatus[WebStatus["complete"] = 0] = "complete";
    WebStatus[WebStatus["incomplete"] = 1] = "incomplete";
})(WebStatus = exports.WebStatus || (exports.WebStatus = {}));
let WebPanelManager = /** @class */ (() => {
    class WebPanelManager {
        //Through Json File Info create Web Panel
        static createWebPanelByJsonFile(filePath, newWebPanel) {
            const webViewInfo = this.generateWebViewInfo(filePath);
            return this.createWebPanel(webViewInfo, newWebPanel);
        }
        //Create Web Panel
        static createWebPanel(webViewInfo, newWebPanel) {
            if (this.findWebPanel(webViewInfo.key) === undefined) {
                let newPanel;
                if (newWebPanel !== undefined) {
                    newPanel = newWebPanel;
                }
                else {
                    newPanel = new WebPanel(webViewInfo.webInfo);
                }
                WebPanelManager._webPanelUnit.set(webViewInfo.key, newPanel);
                return true;
            }
            return false;
        }
        //Find Web Panel
        static findWebPanel(key) {
            return WebPanelManager._webPanelUnit.get(key);
        }
        //Add Web Panel
        static AddWebPanel(key, webPanel) {
            if (!WebPanelManager._webPanelUnit.has(key)) {
                WebPanelManager._webPanelUnit.set(key, webPanel);
                return true;
            }
            return false;
        }
        //Delete Web Panel
        static deleteWebPanel(key) {
            if (WebPanelManager._webPanelUnit.has(key)) {
                const delPanel = WebPanelManager._webPanelUnit.get(key);
                if (delPanel === undefined) {
                    return false;
                }
                delPanel.dispose();
                WebPanelManager._webPanelUnit.delete(key);
                return true;
            }
            return false;
        }
        static generateWebViewInfo(filePath) {
            const webViewInfo = {
                key: this.recognizeKey(filePath),
                webInfo: this.assemblyWebInfoFromJsonFile(filePath),
            };
            return webViewInfo;
        }
        static recognizeKey(filePath) {
            const info = require(filePath);
            const key = info["name"];
            return key;
        }
        //Assembly Info from Json file to Web Info
        static assemblyWebInfoFromJsonFile(filePath) {
            // require json config file
            const webViewInfo = require(filePath);
            const info = webViewInfo["WebInfo"];
            // Only "active" can be recognize. if you want more function, upgrade here.
            let column = vscode.ViewColumn.One;
            if (info["column"] === "active") {
                column =
                    vscode.window.activeTextEditor &&
                        vscode.window.activeTextEditor.viewColumn
                        ? vscode.window.activeTextEditor.viewColumn
                        : vscode.ViewColumn.One;
            }
            const webInfo = {
                viewType: info["viewType"],
                title: info["title"],
                column: column,
                enableScripts: info["enableScripts"],
                localResourceRoots: info["localResourceRoots"],
                webLocation: info["webLocation"],
            };
            return webInfo;
        }
    }
    //All WebPanel store here
    WebPanelManager._webPanelUnit = new Map();
    return WebPanelManager;
})();
exports.WebPanelManager = WebPanelManager;
class WebPanel {
    constructor(webInfo) {
        this.disposables = [];
        this.extensionPath = ActivateVscodeContext_1.ActivateVscodeContext.context.extensionPath;
        this._webStatus = WebStatus.incomplete;
        // Through Web Info set and create a vscode web view.
        let rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            rootPath = path.join(this.extensionPath, webInfo["localResourceRoots"]);
        }
        this._webPanel = vscode.window.createWebviewPanel(webInfo["viewType"], webInfo["title"], webInfo["column"], {
            // Enable javascript in the webview
            enableScripts: webInfo["enableScripts"],
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(this.extensionPath, webInfo["localResourceRoots"])),
                vscode.Uri.file(rootPath),
                vscode.Uri.file(path.join(this.extensionPath, "node_modules")),
            ],
            retainContextWhenHidden: true,
        });
        // When panel close dispose all resources whatever user or program close it.
        this._webPanel.onDidDispose(() => this.dispose(), null, this.disposables);
        // Set the webview 's initial html content
        this._webPanel.webview.html = ConventPage_1.ConventPage.ConventHtml(webInfo["webLocation"]);
        // Handle messages from the webview
        this._webPanel.webview.onDidReceiveMessage((message) => this.receiveMessage(message), null, this.disposables);
    }
    get webStatus() {
        return this._webStatus;
    }
    set webStatus(value) {
        this._webStatus = value;
    }
    webReady() {
        return this.webStatus === WebStatus.complete ? true : false;
    }
    get webPanel() {
        return this._webPanel;
    }
    set webPanel(value) {
        this._webPanel = value;
    }
    receiveMessage(message) {
        switch (message.command) {
            case "error":
                vscode.window.showErrorMessage(message.text);
                break;
            case "info":
                vscode.window.showInformationMessage(message.text);
                break;
            case "connect":
                this._webStatus = WebStatus.complete;
                this._webPanel.webview.postMessage({
                    status: "connected",
                });
                break;
            case "test":
                this._webStatus = WebStatus.complete;
                this._webPanel.webview.postMessage(message.text);
                break;
        }
    }
    // Clean up resources
    dispose() {
        this._webPanel.dispose();
        this.disposables.forEach((element) => {
            element.dispose();
        });
        this.disposables = [];
    }
}
exports.WebPanel = WebPanel;
//# sourceMappingURL=WebPanel.js.map