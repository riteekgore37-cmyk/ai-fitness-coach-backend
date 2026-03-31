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
exports.MusclesController = void 0;
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const async_handler_1 = require("../../../../../helpers/async-handler");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const admins_guard_1 = require("../../../../../modules/console/common/guards/admins.guard");
const muscles_service_1 = require("../services/muscles.service");
const create_muscle_validation_1 = require("../validations/create-muscle.validation");
const update_muscle_validation_1 = require("../validations/update-muscle.validation");
const equipment_serialization_1 = require("../../../../../common/serializers/equipment.serialization");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
let MusclesController = class MusclesController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.musclesService = new muscles_service_1.MusclesService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            const { docs, paginationData } = yield this.musclesService.list({ isDeleted: false }, paginationQuery);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, equipment_serialization_1.MuscleSerialization),
                meta: paginationData,
            }, res);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.musclesService.findOneOrFail({
                _id: req.params.id,
                isDeleted: false
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data.toJSON(), equipment_serialization_1.MuscleSerialization),
            }, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.musclesService.create(req.body);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(data.toJSON(), equipment_serialization_1.MuscleSerialization),
            }, res);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.musclesService.updateOne({ _id: req.params.id }, req.body);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data.toJSON(), equipment_serialization_1.MuscleSerialization),
            }, res);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.musclesService.softDelete({ _id: req.params.id });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data.toJSON(), equipment_serialization_1.MuscleSerialization),
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.get("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.get));
        this.router.post("/", (0, validation_helper_1.bodyValidator)(create_muscle_validation_1.createMusclechema), (0, async_handler_1.asyncHandler)(this.create));
        this.router.patch("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, validation_helper_1.bodyValidator)(update_muscle_validation_1.updateMuscleSchema), (0, async_handler_1.asyncHandler)(this.update));
        this.router.delete("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.delete));
    }
};
exports.MusclesController = MusclesController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([equipment_serialization_1.MuscleSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("List muscles"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all muscles in the system"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
    })
], MusclesController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/:id'),
    (0, swagger_response_decorator_1.SwaggerResponse)(equipment_serialization_1.MuscleSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Get muscle"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get muscle by id")
], MusclesController.prototype, "get", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)(),
    (0, swagger_request_decorator_1.SwaggerRequest)(create_muscle_validation_1.createMusclechema),
    (0, swagger_response_decorator_1.SwaggerResponse)(equipment_serialization_1.MuscleSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Create muscle"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Create a new muscle")
], MusclesController.prototype, "create", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPatch)('/:id'),
    (0, swagger_request_decorator_1.SwaggerRequest)(update_muscle_validation_1.updateMuscleSchema),
    (0, swagger_response_decorator_1.SwaggerResponse)(equipment_serialization_1.MuscleSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Update muscle"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Update a muscle by id")
], MusclesController.prototype, "update", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerDelete)('/:id'),
    (0, swagger_response_decorator_1.SwaggerResponse)(equipment_serialization_1.MuscleSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Delete muscle"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Delete a muscle by id")
], MusclesController.prototype, "delete", void 0);
exports.MusclesController = MusclesController = __decorate([
    (0, controller_decorator_1.Controller)("/console/muscles"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, admins_guard_1.AdminGuardMiddleware)({}))
], MusclesController);
;
//# sourceMappingURL=muscles.controller.js.map