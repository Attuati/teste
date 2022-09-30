"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConventPage = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const AbsPath_1 = require("./AbsPath");
const ActivateVscodeContext_1 = require("./ActivateVscodeContext");
class ConventPage {
    static ConventHtml(pagePath) {
        const resourcePath = AbsPath_1.AbsPath.absPath(pagePath);
        const dirPath = path.dirname(resourcePath);
        const dirName = dirPath.replace(ActivateVscodeContext_1.ActivateVscodeContext.context.extensionPath, "");
        let html = fs.readFileSync(resourcePath, "utf-8");
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|import.+?from ")(.+?)"/g, (m, $1, $2) => {
            if (ActivateVscodeContext_1.ActivateVscodeContext.context.asAbsolutePath($2) !== $2) {
                $2 = path.join(dirName, $2);
            }
            return ($1 +
                vscode.Uri.file(ActivateVscodeContext_1.ActivateVscodeContext.context.asAbsolutePath($2))
                    .with({ scheme: "vscode-resource" })
                    .toString() +
                '"');
        });
        // You can see the result in Convent.html
        const newFilePath = path.join(dirPath, "Convent.html");
        fs.writeFileSync(newFilePath, html);
        return html;
    }
}
exports.ConventPage = ConventPage;
//# sourceMappingURL=ConventPage.js.map