"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBar = exports.ManageStatusBar = exports.StatusCode = void 0;
const vscode = require("vscode");
const ActivateVscodeContext_1 = require("./ActivateVscodeContext");
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["halting"] = 0] = "halting";
    StatusCode[StatusCode["loading"] = 1] = "loading";
    StatusCode[StatusCode["running"] = 2] = "running";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
//It is a management class for all Status Bar store and control.
let ManageStatusBar = /** @class */ (() => {
    class ManageStatusBar {
        static get statusBarMemoryUnit() {
            return ManageStatusBar._statusBarMemoryUnit;
        }
        static createStatusBarByJsonFile(jsonFilePath) {
            // assembly info
            const statusBarInfoUnit = ManageStatusBar.assemblyInfoFromJsonFile(jsonFilePath);
            // create status bar
            const key = this.recognizeKey(jsonFilePath);
            return ManageStatusBar.createStatusBar(key, statusBarInfoUnit);
        }
        static recognizeKey(jsonFilePath) {
            const info = require(jsonFilePath);
            return info["name"];
        }
        static assemblyInfoFromJsonFile(jsonFilePath) {
            // require json config file
            const info = require(jsonFilePath);
            let alignment;
            if (new String(info["alignment"]).toLowerCase() === "left") {
                alignment = vscode.StatusBarAlignment.Left;
            }
            else {
                alignment = vscode.StatusBarAlignment.Right;
            }
            // set status bar info array
            let unit = new Array();
            info["unit"].forEach((element) => {
                let color = new vscode.ThemeColor(element["color"]);
                let statusBarInfo = {
                    command: element["command"],
                    text: element["text"],
                    color: color,
                    show: element["show"],
                };
                unit.push(statusBarInfo);
            });
            // set status bar info unit
            let statusBarInfoUnit = {
                alignment: alignment,
                priority: info["priority"],
                unit: unit,
            };
            return statusBarInfoUnit;
        }
        static createStatusBar(key, statusBarInfoUnit) {
            if (!this._statusBarMemoryUnit.has(key)) {
                const newStatusBar = new StatusBar(statusBarInfoUnit);
                this._statusBarMemoryUnit.set(key, newStatusBar);
                return true;
            }
            else {
                vscode.window.showErrorMessage(`StatusBarMemoryUnit already has the key: ${key}`);
                return false;
            }
        }
        static deleteStatusBar(statusBarName) {
            if (this._statusBarMemoryUnit.has(statusBarName)) {
                this._statusBarMemoryUnit.delete(statusBarName);
                return true;
            }
            return false;
        }
        static findStatusBar(key) {
            return this._statusBarMemoryUnit.get(key);
        }
    }
    // Set/Array always need initialize.
    ManageStatusBar._statusBarMemoryUnit = new Map();
    return ManageStatusBar;
})();
exports.ManageStatusBar = ManageStatusBar;
//It is the core status bar class for every function it can be used.
class StatusBar {
    //When the class instantiation, it will build a a new status bar.
    constructor(statusBarInfoUnit) {
        // when the status bar push into the array of vscode.subscriptions, it will return a array number.
        // _pushNumber will store the array number for management.
        this._pushNumber = null;
        // _statusbar is the core of the class, and need relative info to build.
        this._statusbar = null;
        // All _statusbar needs info are here.
        this._statusBarInfoUnit = null;
        if (statusBarInfoUnit !== null &&
            statusBarInfoUnit.unit !== null &&
            statusBarInfoUnit.unit[0] !== null) {
            this.statusBarInfoUnit = statusBarInfoUnit;
            this._statusbar = vscode.window.createStatusBarItem(statusBarInfoUnit["alignment"], statusBarInfoUnit["priority"]);
            if (!this.setStatusBar(statusBarInfoUnit.unit[0])) {
                vscode.window.showErrorMessage("Cannot set status bar when initial.");
            }
            this.pushStatusBar(ActivateVscodeContext_1.ActivateVscodeContext.context);
        }
        else {
            vscode.window.showErrorMessage("Cannot recognize status bar info unit.");
        }
    }
    get pushNumber() {
        return this._pushNumber;
    }
    set pushNumber(value) {
        this._pushNumber = value;
    }
    get statusBarInfoUnit() {
        return this._statusBarInfoUnit;
    }
    set statusBarInfoUnit(value) {
        this._statusBarInfoUnit = value;
    }
    //To set the situation of status bar.
    setStatusBar(loadInfo) {
        // (statusBarInfo[0].alignment, statusBarInfo[0].priority) also good way
        if (this._statusbar !== null) {
            this._statusbar.command = loadInfo["command"];
            this._statusbar.text = loadInfo["text"];
            this._statusbar.color = loadInfo["color"];
            if (loadInfo["show"]) {
                this._statusbar.show();
            }
            else {
                this._statusbar.hide();
            }
            return true;
        }
        return false;
    }
    //Push the Status Bar into vscode extension context
    pushStatusBar(context) {
        if (this._statusbar !== null && this._pushNumber !== null) {
            this._pushNumber = context.subscriptions.push(this._statusbar);
            return true;
        }
        return false;
    }
}
exports.StatusBar = StatusBar;
//# sourceMappingURL=StatusBar.js.map