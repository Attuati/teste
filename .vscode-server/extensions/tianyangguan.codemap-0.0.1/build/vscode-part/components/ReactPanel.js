"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactPanel = exports.ReactPanelManager = void 0;
const vscode = require("vscode");
const path = require("path");
const ActivateVscodeContext_1 = require("./ActivateVscodeContext");
const ConventPage_1 = require("./ConventPage");
// A Management class for React Panel
let ReactPanelManager = /** @class */ (() => {
    class ReactPanelManager {
        //Create React Panel
        static createReactPanel(forceGraphInfo, newReactPanel) {
            if (this.findReactPanel(forceGraphInfo.key) === undefined) {
                let newPanel;
                if (newReactPanel !== undefined) {
                    newPanel = newReactPanel;
                }
                else {
                    newPanel = new ReactPanel(forceGraphInfo.reactInfo, forceGraphInfo.webViewInfo);
                }
                ReactPanelManager._reactPanelUnit.set(forceGraphInfo.key, newPanel);
                return true;
            }
            return false;
        }
        //Find React Panel
        static findReactPanel(key) {
            return ReactPanelManager._reactPanelUnit.get(key);
        }
        //Add React Panel
        static AddReactPanel(key, reactPanel) {
            if (!ReactPanelManager._reactPanelUnit.has(key)) {
                ReactPanelManager._reactPanelUnit.set(key, reactPanel);
                return true;
            }
            return false;
        }
        //Delete React Panel
        static deleteReactPanel(key) {
            if (ReactPanelManager._reactPanelUnit.has(key)) {
                const delPanel = ReactPanelManager._reactPanelUnit.get(key);
                if (delPanel === undefined) {
                    return false;
                }
                delPanel.dispose();
                ReactPanelManager._reactPanelUnit.delete(key);
                return true;
            }
            return false;
        }
        //Through Json File Info create React Panel
        static createReactPanelByJsonFile(filePath, newReactPanel) {
            const forceGraphInfo = this.createForceGraphInfo(filePath);
            return this.createReactPanel(forceGraphInfo, newReactPanel);
        }
        static createForceGraphInfo(filePath) {
            const forceGraphInfo = {
                key: this.recognizeKey(filePath),
                reactInfo: this.assemblyReactInfoFromJsonFile(filePath),
                webViewInfo: this.assemblyWebViewInfoFromJsonFile(filePath),
            };
            return forceGraphInfo;
        }
        static recognizeKey(filePath) {
            const allInfo = require(filePath);
            const key = allInfo["name"];
            return key;
        }
        //Assembly Info from Json file to React Info
        static assemblyReactInfoFromJsonFile(filePath) {
            // require json config file
            const allInfo = require(filePath);
            const info = allInfo["ReactInfo"];
            // Only "active" can be recognize. if you want more function, upgrade here.
            let column = vscode.ViewColumn.One;
            if (info["column"] === "active") {
                column =
                    vscode.window.activeTextEditor &&
                        vscode.window.activeTextEditor.viewColumn
                        ? vscode.window.activeTextEditor.viewColumn
                        : vscode.ViewColumn.One;
            }
            const reactInfo = {
                viewType: info["viewType"],
                title: info["title"],
                column: column,
                enableScripts: info["enableScripts"],
                localResourceRoots: info["localResourceRoots"],
            };
            return reactInfo;
        }
        //Assembly Info from Json file to Web View Info
        static assemblyWebViewInfoFromJsonFile(filePath) {
            // require json config file
            const allInfo = require(filePath);
            const info = allInfo["WebViewInfo"];
            const webViewInfo = {
                sourcePath: info["sourcePath"],
                configJson: info["configJson"],
                content: info["content"],
                js: info["js"],
                css: info["css"],
            };
            return webViewInfo;
        }
    }
    //All ReactPanel store here
    ReactPanelManager._reactPanelUnit = new Map();
    return ReactPanelManager;
})();
exports.ReactPanelManager = ReactPanelManager;
class ReactPanel {
    constructor(reactInfo, webViewInfo) {
        this.disposables = [];
        this.extensionPath = ActivateVscodeContext_1.ActivateVscodeContext.context.extensionPath;
        // Through React Info set and create a vscode web view.
        this._reactPanel = vscode.window.createWebviewPanel(reactInfo["viewType"], reactInfo["title"], reactInfo["column"], {
            // Enable javascript in the webview
            enableScripts: reactInfo["enableScripts"],
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.file(path.join(this.extensionPath, reactInfo["localResourceRoots"])),
            ],
        });
        // When panel close dispose all resources whatever user or program close it.
        this.reactPanel.onDidDispose(() => this.dispose(), null, this.disposables);
        // Set the webview 's initial html content
        this.reactPanel.webview.html = ConventPage_1.ConventPage.ConventHtml("./build/react-part/index.html");
        //TODO:
        //Transfer information between frames
        // Handle messages from the webview
        this.reactPanel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case "alert":
                    vscode.window.showErrorMessage(message.text);
                    break;
            }
        }, null, this.disposables);
    }
    get reactPanel() {
        return this._reactPanel;
    }
    // Clean up resources
    dispose() {
        this.reactPanel.dispose();
        this.disposables.forEach((element) => {
            element.dispose();
        });
        this.disposables = [];
    }
}
exports.ReactPanel = ReactPanel;
//# sourceMappingURL=ReactPanel.js.map