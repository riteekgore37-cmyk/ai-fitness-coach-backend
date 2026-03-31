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
exports.UsersMealsController = void 0;
const meals_service_1 = require("../services/meals.service");
const mealPopulate_serialization_1 = require("../../../../../common/serializers/mealPopulate.serialization");
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
const eat_custom_meal_validation_1 = require("../validations/eat-custom-meal.validation");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const swagger_request_decorator_1 = require("../../../../../lib/decorators/swagger-request.decorator");
let UsersMealsController = class UsersMealsController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.mealsService = new meals_service_1.MealsService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            const { docs, paginationData } = yield this.mealsService.list({ isDeleted: false }, paginationQuery, {
                populateArray: [
                    { path: "ingredients" }
                ]
            });
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, mealPopulate_serialization_1.MealPopulateSerialization),
                meta: paginationData,
            }, res);
        });
        this.eatCustomMeal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.mealsService.eatCustomMeal(req.jwtPayload.id, req.body);
            return json_response_1.JsonResponse.success({
                message: "Meal created successfully",
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.post("/eat-custom-meal", (0, validation_helper_1.bodyValidator)(eat_custom_meal_validation_1.eatCustomMealSchema), (0, async_handler_1.asyncHandler)(this.eatCustomMeal));
    }
};
exports.UsersMealsController = UsersMealsController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([mealPopulate_serialization_1.MealPopulateSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("list meals"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all meals"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
    })
], UsersMealsController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPost)('/eat-custom-meal'),
    (0, swagger_response_decorator_1.SwaggerResponse)({}),
    (0, swagger_request_decorator_1.SwaggerRequest)(eat_custom_meal_validation_1.eatCustomMealSchema),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Eat custom meal"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Eat custom meal")
], UsersMealsController.prototype, "eatCustomMeal", void 0);
exports.UsersMealsController = UsersMealsController = __decorate([
    (0, controller_decorator_1.Controller)("/user/meals"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], UsersMealsController);
//# sourceMappingURL=meals.controller.js.map