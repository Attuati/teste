"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const ActivateVscodeContext_1 = require("./components/ActivateVscodeContext");
const LoadMajorModule_1 = require("./model/LoadMajorModule");
const TriggerListener_1 = require("./model/TriggerListener");
function activate(context) {
    ActivateVscodeContext_1.StoreVscodeContext(context); // Store Vscode Context
    LoadMajorModule_1.LoadMajorModule(); // Load Major Module
    TriggerListener_1.configListener();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map