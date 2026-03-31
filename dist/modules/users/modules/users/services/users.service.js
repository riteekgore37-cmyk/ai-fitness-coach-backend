"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../../../../../common/models/user.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class UserService extends (0, crud_service_1.CrudService)(user_model_1.User) {
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map