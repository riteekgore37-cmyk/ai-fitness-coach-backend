"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallingFileName = getCallingFileName;
function getCallingFileName() {
    var _a, _b;
    try {
        const error = new Error();
        const callerFile = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split('\n')[3].trim().replace(/^at /, '');
        const insidePerantheses = (_b = callerFile === null || callerFile === void 0 ? void 0 : callerFile.match(/\(([^)]+)\)/)) === null || _b === void 0 ? void 0 : _b[1];
        const getOnlyfilePaths = insidePerantheses === null || insidePerantheses === void 0 ? void 0 : insidePerantheses.split(':')[0];
        return getOnlyfilePaths;
    }
    catch (error) {
        console.error(error);
        return '';
    }
}
//# sourceMappingURL=calling-file.helper.js.map