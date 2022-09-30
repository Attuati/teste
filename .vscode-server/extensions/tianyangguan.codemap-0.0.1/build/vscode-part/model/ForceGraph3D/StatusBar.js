"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBarForceGraph3DManager = void 0;
const vscode = require("vscode");
const StatusBar = require("../../components/StatusBar");
const CommonInterface = require("./CommonInterface");
const WebPanel_1 = require("./WebPanel");
const timers_1 = require("timers");
let StatusBarForceGraph3DManager = /** @class */ (() => {
    class StatusBarForceGraph3DManager {
        static get key() {
            return StatusBarForceGraph3DManager._key;
        }
        static get bar() {
            return StatusBarForceGraph3DManager._bar;
        }
        static get switchBar() {
            return StatusBarForceGraph3DManager._switchBar;
        }
        static set barSituation(value) {
            StatusBarForceGraph3DManager._barSituation = value;
        }
        static get barSituation() {
            return StatusBarForceGraph3DManager._barSituation;
        }
        static initial(coreData) {
            if (this.bar === undefined) {
                const result = StatusBar.ManageStatusBar.createStatusBarByJsonFile(coreData.barConfigPath);
                this._switchBar = CommonInterface.SwitchBar.off;
                this._barSituation = CommonInterface.BarSituation.going;
                this._key = StatusBar.ManageStatusBar.recognizeKey(coreData.barConfigPath);
                this._bar = StatusBar.ManageStatusBar.findStatusBar(this._key);
                return result;
            }
            return false;
        }
        // This function is used for command control bar
        static switchTurn() {
            if (!this.couldSwitchTurn()) {
                vscode.window.showWarningMessage("Waiting for loading...");
                return false;
            }
            this._switchStatusChange();
            this._refreshBar();
            return true;
        }
        static couldSwitchTurn() {
            return this.barSituation === CommonInterface.BarSituation.going
                ? true
                : false;
        }
        static _switchStatusChange() {
            this._switchBar =
                this.switchBar === CommonInterface.SwitchBar.off
                    ? CommonInterface.SwitchBar.on
                    : CommonInterface.SwitchBar.off;
        }
        // This function is used for panel control bar
        static switchTurnOn() {
            if (this.switchBar === CommonInterface.SwitchBar.off) {
                this._switchStatusChange();
                this.refreshBarBase(StatusBar.StatusCode.running);
                return true;
            }
            else {
                return false;
            }
        }
        // This function is used for panel control bar
        static switchTurnOff() {
            if (this.switchBar === CommonInterface.SwitchBar.on) {
                this._switchStatusChange();
                this.refreshBarBase(StatusBar.StatusCode.halting);
                return true;
            }
            else {
                return false;
            }
        }
        static _refreshBar() {
            if (this.switchBar === CommonInterface.SwitchBar.on) {
                this.refreshBarBase(StatusBar.StatusCode.running);
            }
            else {
                this.refreshBarBase(StatusBar.StatusCode.halting);
            }
        }
        static refreshBarBase(statusCode) {
            if (statusCode === StatusBar.StatusCode.loading) {
                vscode.window.showErrorMessage("You cannot set status code as loading when refresh bar.");
                return;
            }
            if (this.bar !== undefined && this.bar.statusBarInfoUnit !== null) {
                this._barSituation = CommonInterface.BarSituation.waiting;
                this.bar.setStatusBar(this.bar.statusBarInfoUnit["unit"][StatusBar.StatusCode.loading]);
            }
            else {
                vscode.window.showErrorMessage("RefreshBarBase bar.statusBarInfoUnit is null");
                return;
            }
            const handle = timers_1.setInterval(() => {
                if (this.webPanelReady()) {
                    if (this.bar !== undefined &&
                        this.bar.statusBarInfoUnit !== null) {
                        this.bar.setStatusBar(this.bar.statusBarInfoUnit["unit"][statusCode]);
                        this._barSituation = CommonInterface.BarSituation.going;
                    }
                    else {
                        vscode.window.showErrorMessage("SetTimeout bar.statusBarInfoUnit is null");
                        return;
                    }
                    clearInterval(handle);
                }
            }, 100);
        }
        static webPanelReady() {
            if (this.switchBar === CommonInterface.SwitchBar.on &&
                WebPanel_1.WebPanelForceGraph3DManager.hasKey() &&
                WebPanel_1.WebPanelForceGraph3DManager.webReady()) {
                return true;
            }
            if (this.switchBar === CommonInterface.SwitchBar.off &&
                !WebPanel_1.WebPanelForceGraph3DManager.hasKey()) {
                return true;
            }
            return false;
        }
    }
    StatusBarForceGraph3DManager._key = undefined;
    StatusBarForceGraph3DManager._bar = undefined;
    StatusBarForceGraph3DManager._switchBar = undefined;
    StatusBarForceGraph3DManager._barSituation = undefined;
    return StatusBarForceGraph3DManager;
})();
exports.StatusBarForceGraph3DManager = StatusBarForceGraph3DManager;
//# sourceMappingURL=StatusBar.js.map