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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleAuthService = void 0;
const crud_service_1 = require("../../../../../lib/services/crud.service");
const admin_model_1 = require("../../../../../modules/console/common/models/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const jwt_helper_1 = require("../../../../../helpers/jwt.helper");
class ConsoleAuthService extends (0, crud_service_1.CrudService)(admin_model_1.Admin) {
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.findOne({ email: loginRequest.email });
            if (!admin)
                throw new http_error_1.HttpError(401, "Invalid Credentials");
            const isPasswordCorrect = yield bcrypt_1.default.compare(loginRequest.password, admin.password);
            if (!isPasswordCorrect)
                throw new http_error_1.HttpError(401, "Invalid Credentials");
            const token = jwt_helper_1.JwtHelper.generateToken({
                id: admin._id,
                email: admin.email,
                name: admin.name,
                type: "admin",
                role: admin.role,
            });
            return { admin: admin, token };
        });
    }
}
exports.ConsoleAuthService = ConsoleAuthService;
//# sourceMappingURL=auth.service.js.map