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
exports.templateController = void 0;
const templates_service_1 = require("../services/templates.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const async_handler_1 = require("../../../../../helpers/async-handler");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const template_serialization_1 = require("../../../../../common/serializers/template.serialization");
const templatePopulate_serialization_1 = require("../../../../../common/serializers/templatePopulate.serialization");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const create_templates_validation_1 = require("../validations/create-templates.validation");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
let templateController = class templateController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.templatesService = new templates_service_1.TemplateService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            const { docs, paginationData } = yield this.templatesService.list({ user: req.jwtPayload.id }, paginationQuery, {
                populateArray: [
                    { path: "exercises" },
                ],
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, templatePopulate_serialization_1.TemplatePopulateSerialization),
                meta: paginationData,
            }, res);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.templatesService.findOneOrFail({
                _id: req.params.id,
                user: req.jwtPayload.id
            }, {
                populateArray: [
                    { path: "exercises" },
                ],
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data, templatePopulate_serialization_1.TemplatePopulateSerialization),
            }, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.templatesService.createForUser(req.body);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(data, template_serialization_1.TemplateSerialization),
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.get("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.get));
        this.router.post("/", (0, validation_helper_1.bodyValidator)(create_templates_validation_1.createTemplatesSchema), (0, async_handler_1.asyncHandler)(this.create));
    }
};
exports.templateController = templateController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([templatePopulate_serialization_1.TemplatePopulateSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("my trainer --> custom workout"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all custom plans created by the user logged in"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
    })
], templateController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(templatePopulate_serialization_1.TemplatePopulateSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Get custom plan"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get a single custom plan created by the user logged in")
], templateController.prototype, "get", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(template_serialization_1.TemplateSerialization),
    (0, swagger_request_decorator_1.SwaggerRequest)(create_templates_validation_1.createTemplatesSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Create custom plan"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Create a new custom plan")
], templateController.prototype, "create", void 0);
exports.templateController = templateController = __decorate([
    (0, controller_decorator_1.Controller)("/user/templates"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], templateController);
//# sourceMappingURL=templates.controller.js.map