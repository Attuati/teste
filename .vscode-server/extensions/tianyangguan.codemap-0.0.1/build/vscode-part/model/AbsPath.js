"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsPath = void 0;
const vscode = require("vscode");
const path = require("path");
class AbsPath {
    static vsPath(relativePath) {
        return AbsPath.getVscodeResource(relativePath);
    }
    static absPath(relativePath) {
        return AbsPath.getAbsolutePath(relativePath);
    }
    static absUri(relativePath) {
        const absPath = this.absPath(relativePath);
        return vscode.Uri.file(absPath);
    }
    static getVscodeResource(relativePath) {
        const diskPath = this.absUri(relativePath);
        return diskPath.with({ scheme: "vscode-resource" }).toString();
    }
    static getAbsolutePath(relativePath) {
        return path.join(this.getFolderPath(), relativePath);
    }
    static getFolderPath() {
        if (vscode.workspace.workspaceFolders) {
            return vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        return "";
    }
}
exports.AbsPath = AbsPath;
//# sourceMappingURL=AbsPath.js.map