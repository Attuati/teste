"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigPath = exports.getConfigRootPath = exports.RegisterCommand = exports.statusHighLight = exports.BarSituation = exports.SwitchBar = void 0;
const path = require("path");
const ActivateVscodeContext_1 = require("../../components/ActivateVscodeContext");
const vscode = require("vscode");
var SwitchBar;
(function (SwitchBar) {
    SwitchBar[SwitchBar["on"] = 0] = "on";
    SwitchBar[SwitchBar["off"] = 1] = "off";
})(SwitchBar = exports.SwitchBar || (exports.SwitchBar = {}));
var BarSituation;
(function (BarSituation) {
    BarSituation[BarSituation["waiting"] = 0] = "waiting";
    BarSituation[BarSituation["going"] = 1] = "going";
})(BarSituation = exports.BarSituation || (exports.BarSituation = {}));
var statusHighLight;
(function (statusHighLight) {
    statusHighLight[statusHighLight["show"] = 0] = "show";
    statusHighLight[statusHighLight["hide"] = 1] = "hide";
})(statusHighLight = exports.statusHighLight || (exports.statusHighLight = {}));
class RegisterCommand {
    constructor(coreData, command) {
        this.coreData = coreData;
        this.command = command;
        this.pushCommand(this.registerCommand());
    }
    getCommandInfo() {
        const info = require(this.coreData.CommandConfigPath);
        const commandInfo = {
            key: info["name_" + this.command],
            command: info["command_" + this.command],
        };
        return commandInfo;
    }
    getCommand() {
        const commandInfo = this.getCommandInfo();
        return commandInfo.command;
    }
    getKey() {
        const commandInfo = this.getCommandInfo();
        return commandInfo.key;
    }
    registerCommand() {
        return vscode.commands.registerCommand(this.getCommand(), () => {
            this.mainFunc();
        });
    }
    pushCommand(registerCommand) {
        ActivateVscodeContext_1.ActivateVscodeContext.context.subscriptions.push(registerCommand);
    }
    mainFunc() { }
}
exports.RegisterCommand = RegisterCommand;
function getConfigRootPath() {
    return path.join(ActivateVscodeContext_1.ActivateVscodeContext.context.extensionPath, "configuration", "ForceGraph3D");
}
exports.getConfigRootPath = getConfigRootPath;
function getConfigPath(filePath) {
    return path.join(getConfigRootPath(), filePath);
}
exports.getConfigPath = getConfigPath;
//# sourceMappingURL=CommonInterface.js.map