"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuardMiddleware = void 0;
const gen_guard_1 = require("../../../../lib/guards/gen-guard");
exports.AdminGuardMiddleware = (0, gen_guard_1.genGuard)((...args_1) => __awaiter(void 0, [...args_1], void 0, function* (args = {}, payload) {
    if (payload.type !== "admin") {
        return false;
    }
    if ((args === null || args === void 0 ? void 0 : args.roles) && (args === null || args === void 0 ? void 0 : args.roles.length) > 0) {
        if (!args.roles.includes(payload.role)) {
            return false;
        }
    }
    return true;
}));
//# sourceMappingURL=admins.guard.js.map