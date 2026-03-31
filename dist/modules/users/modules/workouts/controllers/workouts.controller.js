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
exports.UsersWorkoutController = void 0;
const workouts_service_1 = require("../services/workouts.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const async_handler_1 = require("../../../../../helpers/async-handler");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const workoutPopulate_serialization_1 = require("../../../../../common/serializers/workoutPopulate.serialization");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
let UsersWorkoutController = class UsersWorkoutController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.workoutsService = new workouts_service_1.WorkoutService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            let filterName = req.query.filterName, filterVal = req.query.filterVal;
            let filter = { isDeleted: false };
            if (filterName && filterVal) {
                filter[`${filterName}`] = filterVal;
            }
            const { docs, paginationData } = yield this.workoutsService.list(filter, paginationQuery);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, workoutPopulate_serialization_1.WorkoutSerializationPopulate),
                meta: paginationData,
            }, res);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.workoutsService.findOneOrFail({ _id: req.params.id, isDeleted: false }, {
                populateArray: [
                    { path: "template_weeks.days.exercises", select: "name media reps sets" },
                ],
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data, workoutPopulate_serialization_1.WorkoutSerializationPopulate),
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.get("/:id", (0, validation_helper_1.paramsValidator)("id"), (0, async_handler_1.asyncHandler)(this.get));
    }
};
exports.UsersWorkoutController = UsersWorkoutController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([workoutPopulate_serialization_1.WorkoutSerializationPopulate]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("List workouts"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all workouts in the system"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
        filterName: "string",
        filterVal: "string",
    })
], UsersWorkoutController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(workoutPopulate_serialization_1.WorkoutSerializationPopulate),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Get  workout"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get a single workout")
], UsersWorkoutController.prototype, "get", void 0);
exports.UsersWorkoutController = UsersWorkoutController = __decorate([
    (0, controller_decorator_1.Controller)("/user/workouts"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], UsersWorkoutController);
//# sourceMappingURL=workouts.controller.js.map