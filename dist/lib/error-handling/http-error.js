"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const http_1 = __importDefault(require("http"));
class HttpError extends Error {
    constructor(status, message) {
        if (typeof message === "object") {
            message = JSON.stringify(message);
        }
        super(message || http_1.default.STATUS_CODES[status] || "Error");
        this.status = status;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http-error.js.map