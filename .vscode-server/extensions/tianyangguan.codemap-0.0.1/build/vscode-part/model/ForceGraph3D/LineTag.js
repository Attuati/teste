"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineTagForceGraph3DManager = void 0;
const commonInterface = require("./CommonInterface");
const LineTag_1 = require("../../components/LineTag");
let LineTagForceGraph3DManager = /** @class */ (() => {
    class LineTagForceGraph3DManager {
        static createLineTag(activeEditorUri, // which file
        line, // which line
        start, // start position
        end, // end position
        themeName, // which theme want use (in configuration/LineTag.json)
        flag // who set the linTag
        ) {
            const configFilePath = commonInterface.getConfigPath(this.filePath);
            console.log("activeEditorUri: ", activeEditorUri);
            console.log("line: ", line);
            console.log("start: ", start);
            console.log("end: ", end);
            console.log("themeName: ", themeName);
            return LineTag_1.LineTagManager.createLineTag(activeEditorUri, line, start, end, themeName, configFilePath, flag);
        }
    }
    LineTagForceGraph3DManager.filePath = "LineTag.json";
    return LineTagForceGraph3DManager;
})();
exports.LineTagForceGraph3DManager = LineTagForceGraph3DManager;
//# sourceMappingURL=LineTag.js.map