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
exports.userRegisteredWorkoutsController = void 0;
const user_registered_workouts_service_1 = require("../services/user-registered-workouts.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const user_registered_workout_serialization_1 = require("../../../../../common/serializers/user-registered-workout.serialization");
const user_registered_workoutPopulate_serialization_1 = require("../../../../../common/serializers/user-registered-workoutPopulate.serialization");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const create_user_registered_workouts_validation_1 = require("../validations/create-user-registered-workouts.validation");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const update_user_registered_workouts_validation_1 = require("../validations/update-user-registered-workouts.validation");
const workouts_progress_service_1 = require("../services/workouts-progress.service");
4;
let userRegisteredWorkoutsController = class userRegisteredWorkoutsController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.userRegisteredWorkoutsService = new user_registered_workouts_service_1.UserRegisteredWorkoutsService();
        this.workoutsProgressService = new workouts_progress_service_1.WorkoutsProgressService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            const { docs, paginationData } = yield this.userRegisteredWorkoutsService.list({ user: req.jwtPayload.id, is_active: true }, paginationQuery, {
                populateArray: [
                    { path: "workout" },
                    { path: "weeks.days.exercises" },
                ],
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, user_registered_workoutPopulate_serialization_1.UserRegisteredWorkoutsPopulateSerialization),
                meta: paginationData,
            }, res);
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userRegisteredWorkoutsService.findOneOrFail({ _id: req.params.id }, {
                populateArray: [
                    { path: "workout", select: ["-weeks"] },
                    { path: "weeks.days.exercises", populate: [
                            { path: "targetMuscles.primary" },
                            { path: "targetMuscles.secondary" },
                            { path: "equipments" }
                        ] }
                ],
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data.toJSON(), user_registered_workoutPopulate_serialization_1.UserRegisteredWorkoutsPopulateSerialization),
            }, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userRegisteredWorkoutsService.createForUser(req.body, req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(data.toJSON(), user_registered_workout_serialization_1.UserRegisteredWorkoutsSerialization),
            }, res);
        });
        this.updateProgress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const urwId = req.params.id;
            const weekNumber = Number(req.params.week);
            const dayNumber = Number(req.params.day);
            yield this.workoutsProgressService.updateForUser({
                urwId, weekNumber, dayNumber
            }, req.body, req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                message: "Workout updated successfully",
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/:id", (0, async_handler_1.asyncHandler)(this.get));
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.post("/", (0, validation_helper_1.bodyValidator)(create_user_registered_workouts_validation_1.createUserRegisteredWorkoutsSchema), (0, async_handler_1.asyncHandler)(this.create));
        this.router.patch("/:id/progress/:week/:day", (0, validation_helper_1.bodyValidator)(update_user_registered_workouts_validation_1.updateUserRegisteredWorkoutsSchema), (0, async_handler_1.asyncHandler)(this.updateProgress));
    }
};
exports.userRegisteredWorkoutsController = userRegisteredWorkoutsController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([user_registered_workoutPopulate_serialization_1.UserRegisteredWorkoutsPopulateSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("List my workouts"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all user registered workouts (workouts that the user had started)")
], userRegisteredWorkoutsController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)("/:id"),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_registered_workoutPopulate_serialization_1.UserRegisteredWorkoutsPopulateSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("today's workout && my trainer --> my plan && weekly"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get a single workout from user registered workouts (workouts that the user had started)")
], userRegisteredWorkoutsController.prototype, "get", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_registered_workout_serialization_1.UserRegisteredWorkoutsSerialization),
    (0, swagger_request_decorator_1.SwaggerRequest)(create_user_registered_workouts_validation_1.createUserRegisteredWorkoutsSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Create workout"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Create a new workout for the user")
], userRegisteredWorkoutsController.prototype, "create", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPatch)('/:id/progress/:week/:day'),
    (0, swagger_response_decorator_1.SwaggerResponse)({}),
    (0, swagger_request_decorator_1.SwaggerRequest)(update_user_registered_workouts_validation_1.updateUserRegisteredWorkoutsSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Update Workout Progress"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Update the progress of a workout")
], userRegisteredWorkoutsController.prototype, "updateProgress", void 0);
exports.userRegisteredWorkoutsController = userRegisteredWorkoutsController = __decorate([
    (0, controller_decorator_1.Controller)("/user/myWorkouts"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], userRegisteredWorkoutsController);
//# sourceMappingURL=user-registered-workouts.controller.js.map