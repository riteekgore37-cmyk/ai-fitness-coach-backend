"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_model_1 = require("../../../../../common/models/user.model");
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class UsersService extends (0, crud_service_1.CrudService)(user_model_1.User) {
    create(data) {
        if (data.password !== data.confirmPassword) {
            throw new http_error_1.HttpError(400, "passwords do not match");
        }
        return super.create(data);
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map