"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactPanelForceGraph3D = exports.ReactPanelForceGraph3DManager = void 0;
const vscode = require("vscode");
const ReactPanel_1 = require("../../components/ReactPanel");
const ConventPage_1 = require("../../components/ConventPage");
let ReactPanelForceGraph3DManager = /** @class */ (() => {
    class ReactPanelForceGraph3DManager {
        static get key() {
            return ReactPanelForceGraph3DManager._key;
        }
        static createPanel(filePath, newReactPanel) {
            if (this._key === undefined &&
                ReactPanel_1.ReactPanelManager.createReactPanelByJsonFile(filePath, newReactPanel)) {
                ConventPage_1.ConventPage.ConventHtml("./build/web-part/index.html");
                this._key = ReactPanel_1.ReactPanelManager.recognizeKey(filePath);
                return true;
            }
            return false;
        }
        static deletePanel() {
            if (this.key !== undefined &&
                ReactPanel_1.ReactPanelManager.deleteReactPanel(this.key)) {
                this._key = undefined;
                return true;
            }
            return false;
        }
        static getPanel() {
            if (this._key !== undefined) {
                return ReactPanel_1.ReactPanelManager.findReactPanel(this._key);
            }
            return undefined;
        }
        static hasKey() {
            if (this._key !== undefined) {
                return true;
            }
            return false;
        }
    }
    ReactPanelForceGraph3DManager._key = undefined;
    return ReactPanelForceGraph3DManager;
})();
exports.ReactPanelForceGraph3DManager = ReactPanelForceGraph3DManager;
class ReactPanelForceGraph3D extends ReactPanel_1.ReactPanel {
    constructor(reactInfo, webViewInfo) {
        super(reactInfo, webViewInfo);
        this.reactPanel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case "alert":
                    vscode.window.showErrorMessage(message.text);
                    break;
                case "toSomeWhere":
                    const filePath = message.path;
                    const lineNumber = message.line;
                    const startPosition = message.start;
                    const endPosition = message.end;
                    vscode.window.showInformationMessage(`filePath: ${filePath}\n lineNumber: ${lineNumber}\n startPosition: ${startPosition} \n endPosition: ${endPosition}`);
                    break;
            }
        }, null, this.disposables);
    }
}
exports.ReactPanelForceGraph3D = ReactPanelForceGraph3D;
//# sourceMappingURL=ReactPanel.js.map