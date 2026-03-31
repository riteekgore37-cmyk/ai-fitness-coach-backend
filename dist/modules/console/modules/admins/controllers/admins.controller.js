"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AdminsController = void 0;
const async_handler_1 = require("../../../../../helpers/async-handler");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const admins_service_1 = require("../services/admins.service");
const create_admin_validation_1 = require("../validations/create-admin.validation");
const update_admin_validation_1 = require("../validations/update-admin.validation");
const pagination_1 = require("../../../../../helpers/pagination");
const json_response_1 = require("../../../../../lib/responses/json-response");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const admins_guard_1 = require("../../../../../modules/console/common/guards/admins.guard");
const role_enum_1 = require("../../../../../common/enums/role.enum");
const serialize_1 = require("../../../../../helpers/serialize");
const admin_serialization_1 = require("../../../../../modules/console/common/serializers/admin.serialization");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
let AdminsController = class AdminsController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.adminsService = new admins_service_1.AdminsService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            const { docs, paginationData } = yield this.adminsService.list({}, paginationQuery);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, admin_serialization_1.AdminSerialization),
                meta: paginationData,
            }, res);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.adminsService.findOneOrFail({
                _id: req.params.id,
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data, admin_serialization_1.AdminSerialization),
            }, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminsService.create(req.body);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(admin, admin_serialization_1.AdminSerialization),
            }, res);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminsService.updateOne({
                _id: req.params.id,
            }, req.body);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(admin, admin_serialization_1.AdminSerialization),
            }, res);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminsService.deleteOne({
                _id: req.params.id,
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(admin, admin_serialization_1.AdminSerialization),
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.get("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.get));
        this.router.post("/", (0, validation_helper_1.bodyValidator)(create_admin_validation_1.createAdminSchema), this.create);
        this.router.patch("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, validation_helper_1.bodyValidator)(update_admin_validation_1.updateAdminSchema), (0, async_handler_1.asyncHandler)(this.update));
        this.router.delete("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.delete));
    }
};
exports.AdminsController = AdminsController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([admin_serialization_1.AdminSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("List admins"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all admins in the system"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
    })
], AdminsController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(admin_serialization_1.AdminSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Get admin"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get an admin by id")
], AdminsController.prototype, "get", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(admin_serialization_1.AdminSerialization),
    (0, swagger_request_decorator_1.SwaggerRequest)(create_admin_validation_1.createAdminSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Create new admin"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Creates a new admin with role of admin")
], AdminsController.prototype, "create", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPatch)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(admin_serialization_1.AdminSerialization),
    (0, swagger_request_decorator_1.SwaggerRequest)(update_admin_validation_1.updateAdminSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Update admin"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Updates an admin by id")
], AdminsController.prototype, "update", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerDelete)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(admin_serialization_1.AdminSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Delete admin"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Delete an admin by id")
], AdminsController.prototype, "delete", void 0);
exports.AdminsController = AdminsController = __decorate([
    (0, controller_decorator_1.Controller)("/console/admins"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, admins_guard_1.AdminGuardMiddleware)({ roles: [role_enum_1.Role.SUPER_ADMIN] }))
], AdminsController);
//# sourceMappingURL=admins.controller.js.map