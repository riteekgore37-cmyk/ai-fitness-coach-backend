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
exports.AdminUsersController = void 0;
const users_service_1 = require("../services/users.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const user_serialization_1 = require("../../../../../common/serializers/user.serialization");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
let AdminUsersController = class AdminUsersController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.usersService = new users_service_1.UsersService();
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.usersService.create(req.body);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(user, user_serialization_1.UserSerialization),
            }, res);
        });
    }
    setRoutes() {
        this.router.post("/create", (0, async_handler_1.asyncHandler)(this.create));
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)("/create"),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_serialization_1.UserSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Create user"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Create a new user")
], AdminUsersController.prototype, "create", void 0);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, controller_decorator_1.Controller)("/console/users")
], AdminUsersController);
//# sourceMappingURL=users.controller.js.map