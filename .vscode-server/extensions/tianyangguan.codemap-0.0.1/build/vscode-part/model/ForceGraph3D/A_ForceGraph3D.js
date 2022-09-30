"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadModule_ForceGraph3D = void 0;
const path = require("path");
const vscode = require("vscode");
const StatusBar_1 = require("./StatusBar");
const Command_1 = require("./Command");
const CommonInterface = require("./CommonInterface");
function getConfigPath() {
    // Load configure info from Json file
    const rootPath = CommonInterface.getConfigRootPath();
    const BarConfigPath = path.join(rootPath, "BarConfig.json");
    const ReactPanelConfigPath = path.join(rootPath, "ReactPanelConfig.json");
    const CommandConfigPath = path.join(rootPath, "CommandConfig.json");
    const WebPanelConfigPath = path.join(rootPath, "WebPanelConfig.json");
    const configPath = {
        barConfigPath: BarConfigPath,
        PanelConfigPath: WebPanelConfigPath,
        CommandConfigPath: CommandConfigPath,
    };
    return configPath;
}
function LoadModule_ForceGraph3D() {
    const configPath = getConfigPath();
    RegisterCommand_ForceGraph3D(configPath); // register command
    CreateStatusBar_ForceGraph3D(configPath); // create status bar
}
exports.LoadModule_ForceGraph3D = LoadModule_ForceGraph3D;
// Register ForceGraph3D Command
function RegisterCommand_ForceGraph3D(configPath) {
    if (!Command_1.RegisterCommandForceGraph3DManager.initial(configPath)) {
        vscode.window.showErrorMessage("Register Command ForceGraph3DManager initial false.");
    }
}
// Create ForceGraph3D Status Bar
function CreateStatusBar_ForceGraph3D(configPath) {
    if (!StatusBar_1.StatusBarForceGraph3DManager.initial(configPath)) {
        vscode.window.showErrorMessage("StatusBar ForceGraph3D Manager initial false.");
    }
}
//# sourceMappingURL=A_ForceGraph3D.js.map