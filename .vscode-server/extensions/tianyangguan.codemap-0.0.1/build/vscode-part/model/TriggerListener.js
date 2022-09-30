"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configListener = void 0;
const vscode = require("vscode");
const ActivateVscodeContext_1 = require("../components/ActivateVscodeContext");
const LineTag_1 = require("../components/LineTag");
function configListener() {
    let context = ActivateVscodeContext_1.ActivateVscodeContext.context;
    vscode.workspace.onDidChangeConfiguration(function () {
        let showOrHide = ActivateVscodeContext_1.ActivateVscodeContext.show_mode;
        // vscode.window.showInformationMessage(`ShowOrHide: ${showOrHide}`);
        if (vscode.window.activeTextEditor) {
            switch (showOrHide) {
                case "show":
                    LineTag_1.LineTagManager.LoadDecoration();
                    break;
                case "hide":
                    LineTag_1.LineTagManager.UnLoadDecoration();
                    break;
            }
        }
    }, null, context.subscriptions);
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        let showOrHide = ActivateVscodeContext_1.ActivateVscodeContext.show_mode;
        if (editor) {
            let fsPath = editor.document.uri.fsPath;
            ActivateVscodeContext_1.ActivateVscodeContext.activeEditor = editor;
            // vscode.window.showInformationMessage(`fsPath: ${fsPath}`);
            switch (showOrHide) {
                case "show":
                    LineTag_1.LineTagManager.LoadDecoration();
                    break;
                case "hide":
                    LineTag_1.LineTagManager.UnLoadDecoration();
                    break;
            }
        }
    }, null, context.subscriptions);
}
exports.configListener = configListener;
//# sourceMappingURL=TriggerListener.js.map