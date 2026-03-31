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
exports.ConsoleAuthController = void 0;
const async_handler_1 = require("../../../../../helpers/async-handler");
const serialize_1 = require("../../../../../helpers/serialize");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const json_response_1 = require("../../../../../lib/responses/json-response");
const login_validation_1 = require("../../../../../modules/users/modules/auth/validation/login.validation");
const auth_service_1 = require("../services/auth.service");
const admin_serialization_1 = require("../../../../../modules/console/common/serializers/admin.serialization");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
let ConsoleAuthController = class ConsoleAuthController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.authService = new auth_service_1.ConsoleAuthService();
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { admin, token } = yield this.authService.login(req.body);
            return json_response_1.JsonResponse.success({
                data: { admin: (0, serialize_1.serialize)(admin, admin_serialization_1.AdminSerialization), token },
            }, res);
        });
    }
    setRoutes() {
        this.router.post("/login", (0, validation_helper_1.bodyValidator)(login_validation_1.loginValidationSchema), (0, async_handler_1.asyncHandler)(this.login));
    }
};
exports.ConsoleAuthController = ConsoleAuthController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)('/login'),
    (0, swagger_request_decorator_1.SwaggerRequest)(login_validation_1.loginValidationSchema),
    (0, swagger_response_decorator_1.SwaggerResponse)(admin_serialization_1.AdminSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Login an admin"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Login an admin")
], ConsoleAuthController.prototype, "login", void 0);
exports.ConsoleAuthController = ConsoleAuthController = __decorate([
    (0, controller_decorator_1.Controller)("/console/auth")
], ConsoleAuthController);
//# sourceMappingURL=auth.controller.js.map