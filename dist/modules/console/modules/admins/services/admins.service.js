"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const admin_model_1 = require("../../../common/models/admin.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class AdminsService extends (0, crud_service_1.CrudService)(admin_model_1.Admin) {
}
exports.AdminsService = AdminsService;
//# sourceMappingURL=admins.service.js.map