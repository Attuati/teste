"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTag = exports.LineTagManager = exports.TagInfoEnum = void 0;
const vscode = require("vscode");
const ActivateVscodeContext_1 = require("./ActivateVscodeContext");
var TagInfoEnum;
(function (TagInfoEnum) {
    TagInfoEnum[TagInfoEnum["light"] = 0] = "light";
    TagInfoEnum[TagInfoEnum["dark"] = 1] = "dark";
    TagInfoEnum[TagInfoEnum["renderOption"] = 2] = "renderOption";
})(TagInfoEnum = exports.TagInfoEnum || (exports.TagInfoEnum = {}));
let LineTagManager = /** @class */ (() => {
    class LineTagManager {
        static get LineTagList() {
            return LineTagManager._LineTagList;
        }
        static createLineTag(activeEditorUri, // which file
        markLine, // which line
        start, end, themeName, filePathOrType, // Decoration file or Type
        flag) {
            const key = this.assemblyKey(activeEditorUri, markLine);
            const range = this.assemblyVscodeRange(markLine, start, end);
            const createLineTagInfo = this.assemblyCreateLineTagInfo(themeName, activeEditorUri, range, filePathOrType);
            if (createLineTagInfo) {
                const lineTag = new LineTag(createLineTagInfo, flag);
                this.LineTagList.set(key, lineTag);
                return key;
            }
        }
        static isKeyThere(key) {
            if (this.findLineTag(key)) {
                return true;
            }
            return false;
        }
        static turnOff(key, flag, mode) {
            if (!this.isKeyThere(key)) {
                return false;
            }
            if (flag && mode) {
                switch (mode) {
                    case "deleteByFlag":
                        return this.deleteLineTag(key, flag);
                    case "saveByFlag":
                        const lineTag = this.findLineTag(key);
                        if (lineTag) {
                            const innerFlag = lineTag.lineTagFlag;
                            if (flag === innerFlag) {
                                return false; // flag same will save
                            }
                        }
                        return this.deleteLineTagBase(key);
                    default:
                        console.log("MODE ERROR: ", mode);
                        return false;
                }
            }
            else {
                if (!flag && !mode) {
                    return this.deleteLineTagBase(key);
                }
            }
            return false;
        }
        static deleteLineTag(key, flag) {
            // flag same will delete
            if (flag) {
                const lineTag = this.findLineTag(key);
                if (lineTag) {
                    const innerFlag = lineTag.lineTagFlag;
                    if (flag !== innerFlag) {
                        return false; // flag different will save
                    }
                }
            }
            return this.deleteLineTagBase(key);
        }
        static deleteLineTagBase(key) {
            const lintTag = this.findLineTag(key);
            if (lintTag) {
                lintTag.UnLoadDecoration();
                this.LineTagList.delete(key);
                return true;
            }
            return false;
        }
        static clear() {
            this.LineTagList.forEach((element) => {
                element.UnLoadDecoration();
            });
            this.LineTagList.clear();
        }
        static findLineTag(key, flag) {
            const lineTag = this.LineTagList.get(key);
            if (!flag) {
                return lineTag;
            }
            else {
                if (lineTag && lineTag.lineTagFlag === flag) {
                    return lineTag;
                }
                return undefined;
            }
        }
        static assemblyVscodeRange(line1, start, end) {
            const position_1 = new vscode.Position(line1, start);
            const position_2 = new vscode.Position(line1, end);
            return new vscode.Range(position_1, position_2);
        }
        static assemblyCreateLineTagInfo(themeName, activeEditorUri, markLine, filePathOrType) {
            const markSpace = new Array();
            markSpace.push(markLine);
            const textLoadEditorDecoration = typeof filePathOrType === "string"
                ? this.generateTextEditorDecorationByJsonFile(themeName, filePathOrType)
                : filePathOrType;
            if (textLoadEditorDecoration) {
                const createLineTagInfo = {
                    activeEditorUri: activeEditorUri,
                    markSpace: markSpace,
                    textLoadEditorDecoration: textLoadEditorDecoration,
                };
                return createLineTagInfo;
            }
        }
        static assemblyKey(activeEditorUri, line) {
            return activeEditorUri.fsPath + " " + line.toString();
        }
        static assemblyLineTagFromJsonFile(themeName, filePath, choice) {
            const model = this.getModel(choice);
            const info = require(filePath)[themeName][model];
            if (model === "light" || model === "dark") {
                const tagInfo = {
                    svgPath: ActivateVscodeContext_1.AbsolutePath(info["svgPath"]),
                    gutterIconSize: info["gutterIconSize"],
                    color: info["color"],
                    backgroundColor: info["backgroundColor"],
                    overviewRulerColor: info["overviewRulerColor"],
                };
                return tagInfo;
            }
        }
        static assemblyRenderOptionFromJsonFile(themeName, filePath, choice) {
            const model = this.getModel(choice);
            const info = require(filePath)[themeName][model];
            if (model === "renderOption") {
                const renderOption = {
                    isWholeLine: info["isWholeLine"],
                    backgroundColor: info["backgroundColor"],
                    border: info["border"],
                };
                return renderOption;
            }
        }
        static getModel(choice) {
            let result = "";
            switch (choice) {
                case TagInfoEnum.light:
                    result = "light";
                    break;
                case TagInfoEnum.dark:
                    result = "dark";
                    break;
                case TagInfoEnum.renderOption:
                    result = "renderOption";
                    break;
                default:
                    break;
            }
            return result;
        }
        static assemblyLineTagInfoFromJsonFile(themeName, filePath) {
            const info = require(filePath)[themeName];
            const light = this.assemblyLineTagFromJsonFile(themeName, filePath, TagInfoEnum.light);
            const dark = this.assemblyLineTagFromJsonFile(themeName, filePath, TagInfoEnum.dark);
            const render = this.assemblyRenderOptionFromJsonFile(themeName, filePath, TagInfoEnum.renderOption);
            try {
                if (light && dark && render) {
                    const lineTagInfo = {
                        name: info["name"],
                        light: light,
                        dark: dark,
                        renderOption: render,
                    };
                    return lineTagInfo;
                }
                else {
                    throw TypeError;
                }
            }
            catch (e) {
                console.log("light:", light);
                console.log("dark:", dark);
                console.log("render:", render);
            }
        }
        static generateDecorationOptionsByJsonFile(themeName, filePath) {
            const lineTagInfo = this.assemblyLineTagInfoFromJsonFile(themeName, filePath);
            return this.generateDecorationOptions(lineTagInfo);
        }
        static generateDecorationOptions(info) {
            if (info) {
                const lightOptions = {
                    gutterIconPath: vscode.Uri.file(info["light"]["svgPath"]),
                    gutterIconSize: info["light"]["gutterIconSize"],
                    color: info["light"]["color"],
                    backgroundColor: info["light"]["backgroundColor"],
                    overviewRulerColor: info["light"]["overviewRulerColor"],
                };
                const darkOptions = {
                    gutterIconPath: vscode.Uri.file(info["dark"]["svgPath"]),
                    gutterIconSize: info["dark"]["gutterIconSize"],
                    color: info["dark"]["color"],
                    backgroundColor: info["dark"]["backgroundColor"],
                    overviewRulerColor: info["dark"]["overviewRulerColor"],
                };
                const options = {
                    light: lightOptions,
                    dark: darkOptions,
                    isWholeLine: info["renderOption"]["isWholeLine"],
                    overviewRulerLane: vscode.OverviewRulerLane.Full,
                    backgroundColor: info["renderOption"]["backgroundColor"],
                    border: info["renderOption"]["border"],
                };
                console.log("OPTION: ", options);
                return options;
            }
        }
        static generateTextEditorDecoration(options) {
            if (options) {
                return vscode.window.createTextEditorDecorationType(options);
            }
        }
        static generateTextEditorDecorationByJsonFile(themeName, filePath) {
            const options = this.generateDecorationOptionsByJsonFile(themeName, filePath);
            return this.generateTextEditorDecoration(options);
        }
        static LoadDecoration() {
            this.LineTagList.forEach((value, key) => {
                value.LoadDecoration();
            });
        }
        static UnLoadDecoration() {
            this.LineTagList.forEach((value, key) => {
                value.UnLoadDecoration();
            });
        }
    }
    LineTagManager._LineTagList = new Map();
    return LineTagManager;
})();
exports.LineTagManager = LineTagManager;
class LineTag {
    constructor(createLineTagInfo, flag) {
        this.createLineTagInfo = createLineTagInfo;
        this._lineTagFlag = flag;
    }
    get lineTagFlag() {
        return this._lineTagFlag;
    }
    LoadDecoration(newDec) {
        newDec =
            newDec !== undefined
                ? newDec
                : this.createLineTagInfo.textLoadEditorDecoration;
        if (vscode.window.activeTextEditor) {
            let activeEditor = vscode.window.activeTextEditor;
            let uri = activeEditor.document.uri;
            if (this.createLineTagInfo.activeEditorUri.fsPath === uri.fsPath) {
                activeEditor.setDecorations(newDec, this.createLineTagInfo.markSpace);
            }
            else {
                console.log("ERROR: ");
                console.log(this.createLineTagInfo.activeEditorUri.fsPath);
                console.log(uri.fsPath);
            }
        }
    }
    UnLoadDecoration() {
        // vscode.window.showInformationMessage("UnLoadDecoration");
        this.createLineTagInfo.textLoadEditorDecoration.dispose();
    }
}
exports.LineTag = LineTag;
//# sourceMappingURL=LineTag.js.map