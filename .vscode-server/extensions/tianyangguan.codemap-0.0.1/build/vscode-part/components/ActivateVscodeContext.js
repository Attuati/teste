"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsolutePath = exports.StoreVscodeContext = exports.ActivateVscodeContext = void 0;
const vscode = require("vscode");
let ActivateVscodeContext = /** @class */ (() => {
    class ActivateVscodeContext {
        static get activeEditor() {
            return ActivateVscodeContext._activeEditor;
        }
        static set activeEditor(value) {
            ActivateVscodeContext._activeEditor = value;
        }
        static get have_not_store_yet() {
            return ActivateVscodeContext._have_not_store_yet;
        }
        static get context() {
            return ActivateVscodeContext._context;
        }
        static set context(value) {
            // The '_context' cannot rewrite once been written
            if (ActivateVscodeContext._have_not_store_yet) {
                ActivateVscodeContext._context = value;
                ActivateVscodeContext._have_not_store_yet = false;
            }
        }
        static get show_mode() {
            return ActivateVscodeContext._show_status;
        }
        static set show_mode(value) {
            ActivateVscodeContext._show_status = value;
        }
        static get graph_mode() {
            return ActivateVscodeContext._graph_mode;
        }
        static set graph_mode(value) {
            ActivateVscodeContext._graph_mode = value;
        }
    }
    ActivateVscodeContext._activeEditor = vscode.window.activeTextEditor;
    ActivateVscodeContext._have_not_store_yet = true;
    return ActivateVscodeContext;
})();
exports.ActivateVscodeContext = ActivateVscodeContext;
function StoreVscodeContext(context) {
    const store_success_or_not = ActivateVscodeContext.have_not_store_yet;
    ActivateVscodeContext.context = context;
    // let settings = vscode.workspace.getConfiguration("codeMap");
    // settings.update("ShowOrHide", "hide").then();
    // settings.update("GraphMode", "NotSelect").then();
    ActivateVscodeContext.show_mode = "hide";
    ActivateVscodeContext.graph_mode = "NotSelect";
    return store_success_or_not;
}
exports.StoreVscodeContext = StoreVscodeContext;
function AbsolutePath(filePath) {
    return ActivateVscodeContext.context.asAbsolutePath(filePath);
}
exports.AbsolutePath = AbsolutePath;
//# sourceMappingURL=ActivateVscodeContext.js.map