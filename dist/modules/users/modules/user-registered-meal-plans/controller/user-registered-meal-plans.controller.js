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
exports.UsersRegisteredMealPlansController = void 0;
const user_registered_meal_plans_service_1 = require("../services/user-registered-meal-plans.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const user_registered_meal_planPopulate_serialization_1 = require("../../../../../common/serializers/user-registered-meal-planPopulate.serialization");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_routes_decorator_2 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
let UsersRegisteredMealPlansController = class UsersRegisteredMealPlansController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.userRegisteredMealPlansService = new user_registered_meal_plans_service_1.UserRegisteredMealPlansService();
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Use findOne instead of findOneOrFail so we can return a clean 404
            // without throwing an unhandled exception into errorHandlerMiddleware.
            const data = yield this.userRegisteredMealPlansService.findOne({ user: req.jwtPayload.id, isActive: true }, {
                populateArray: [
                    { path: "meal_plan", select: "-days" },
                    { path: "days.meals", populate: { path: "ingredients" } }
                ],
            });
            if (!data) {
                return res.status(404).json({
                    status: 404,
                    message: "Something Went Wrong",
                    error: "No Matching Result Found.",
                });
            }
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(data, user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
            }, res);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userRegisteredMealPlansService.createForUser(req.body, req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                status: 201,
                data: (0, serialize_1.serialize)(data.toJSON(), user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.get));
        this.router.post("/", (0, async_handler_1.asyncHandler)(this.create));
    }
};
exports.UsersRegisteredMealPlansController = UsersRegisteredMealPlansController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("get my meal plan"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get the meal plan that the user is currently using")
], UsersRegisteredMealPlansController.prototype, "get", void 0);
__decorate([
    (0, swagger_routes_decorator_2.SwaggerPost)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
    (0, swagger_request_decorator_1.SwaggerRequest)({ meal_plan: "string" }),
    (0, swagger_summary_decorator_1.SwaggerSummary)("create my meal plan"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Create a new meal plan for the user")
], UsersRegisteredMealPlansController.prototype, "create", void 0);
exports.UsersRegisteredMealPlansController = UsersRegisteredMealPlansController = __decorate([
    (0, controller_decorator_1.Controller)("/user/myMealPlan"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], UsersRegisteredMealPlansController);
//# sourceMappingURL=user-registered-meal-plans.controller.js.map