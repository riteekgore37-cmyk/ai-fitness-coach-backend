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
exports.homePageController = void 0;
const user_registered_workouts_service_1 = require("../../user-registered-workouts/services/user-registered-workouts.service");
const users_service_1 = require("../../users/services/users.service");
const json_response_1 = require("../../../../../lib/responses/json-response");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const home_serialization_1 = require("../responses/home.serialization");
const home_streak_serialization_1 = require("../responses/home-streak.serialization");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
const validation_helper_1 = require("../../../../../helpers/validation.helper");
const home_streak_query_validation_1 = require("../validations/home-streak.query.validation");
const user_home_service_1 = require("../services/user-home.service");
const user_home_your_daily_intake_serialization_1 = require("../responses/user-home-your-daily-intake.serialization");
const user_home_daily_goals_serialization_1 = require("../responses/user-home-daily-goals.serialization");
const user_registered_meal_plans_service_1 = require("../../user-registered-meal-plans/services/user-registered-meal-plans.service");
let homePageController = class homePageController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.userRegisteredWorkoutsService = new user_registered_workouts_service_1.UserRegisteredWorkoutsService();
        this.userService = new users_service_1.UserService();
        this.userHomeService = new user_home_service_1.UserHomeService();
        this.userRegisteredMealPlansService = new user_registered_meal_plans_service_1.UserRegisteredMealPlansService();
        this.getHomePageStreak = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(req.query.startDate);
            const endDate = new Date(req.query.endDate);
            const streak = yield this.userHomeService.getHomePageStreak(req.jwtPayload.id, startDate, endDate);
            return json_response_1.JsonResponse.success({ data: (0, serialize_1.serialize)(streak, home_streak_serialization_1.HomeStreakSerialization) }, res);
        });
        this.getHomePageYourDailyIntake = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dailyIntake = yield this.userHomeService.getHomePageYourDailyIntake(req.jwtPayload.id);
            return json_response_1.JsonResponse.success({ data: (0, serialize_1.serialize)(dailyIntake, user_home_your_daily_intake_serialization_1.UserHomeYourDailyIntakeSerialization) }, res);
        });
        this.getHomePageDailyGoals = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dailyGoals = yield this.userHomeService.getDailyGoals(req.jwtPayload.id);
            return json_response_1.JsonResponse.success({ data: (0, serialize_1.serialize)(dailyGoals, user_home_daily_goals_serialization_1.UserHomeDailyGoalsSerialization) }, res);
        });
        this.getHomePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneOrFail({ _id: req.jwtPayload.id }, { selectArray: ["preferences", "name", "fitness_level", "injuries"] });
            // FIX: use findOne (not findOneOrFail) so missing workout/meal plan returns null instead of 404
            const myWorkout = yield this.userRegisteredWorkoutsService.findOne({ user: req.jwtPayload.id, is_active: true }, {
                populateArray: [
                    { path: "workout", select: ["name", "min_per_day"] },
                ],
            });
            const myMealPlan = yield this.userRegisteredMealPlansService.findOne({ user: req.jwtPayload.id, isActive: true }, {
                populateArray: [
                    { path: "meal_plan", select: "-days" },
                    { path: "days.meals", populate: { path: "ingredients" } }
                ],
            });
            // Build meal plan summary only if user has an active plan
            let myMealPlanSummary = null;
            if (myMealPlan) {
                const dayToEat = myMealPlan.days.find(day => day.is_eaten === false);
                if (dayToEat) {
                    const totalCalories = dayToEat.meals.reduce((sum, meal) => sum + ((meal === null || meal === void 0 ? void 0 : meal.calories) || 0), 0);
                    const totals = dayToEat.meals.reduce((totals, meal) => {
                        if ((meal === null || meal === void 0 ? void 0 : meal.type) === "breakfast" || (meal === null || meal === void 0 ? void 0 : meal.type) === "lunch" || (meal === null || meal === void 0 ? void 0 : meal.type) === "dinner") {
                            totals.meals += 1;
                        }
                        else if ((meal === null || meal === void 0 ? void 0 : meal.type) === "snacks") {
                            totals.snacks += 1;
                        }
                        return totals;
                    }, { meals: 0, snacks: 0 });
                    myMealPlanSummary = {
                        id: myMealPlan._id,
                        today: {
                            numberOfMeals: totals.meals,
                            numberOfSnacks: totals.snacks,
                            totalCalories: totalCalories,
                        },
                    };
                }
            }
            const data = {
                user: user,
                myWorkout: myWorkout,
                myMealPlan: myMealPlanSummary,
            };
            return json_response_1.JsonResponse.success({ data: (0, serialize_1.serialize)(data, home_serialization_1.HomeSerialization) }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.getHomePage));
        this.router.get("/streak", (0, validation_helper_1.queryValidator)(home_streak_query_validation_1.homeStreakQueryValidation), (0, async_handler_1.asyncHandler)(this.getHomePageStreak));
        this.router.get("/your-daily-intake", (0, async_handler_1.asyncHandler)(this.getHomePageYourDailyIntake));
        this.router.get("/daily-goals", (0, async_handler_1.asyncHandler)(this.getHomePageDailyGoals));
    }
};
exports.homePageController = homePageController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/streak'),
    (0, swagger_response_decorator_1.SwaggerResponse)(home_streak_serialization_1.HomeStreakSerialization),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        startDate: { type: "string", required: true },
        endDate: { type: "string", required: true },
    }),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Home Streak Weeks"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get home page streak weeks")
], homePageController.prototype, "getHomePageStreak", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/your-daily-intake'),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_home_your_daily_intake_serialization_1.UserHomeYourDailyIntakeSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Home Your Daily Intake"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get home page your daily intake")
], homePageController.prototype, "getHomePageYourDailyIntake", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/daily-goals'),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_home_daily_goals_serialization_1.UserHomeDailyGoalsSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Home Daily Goals"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get daily goals for user home")
], homePageController.prototype, "getHomePageDailyGoals", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)(home_serialization_1.HomeSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Home"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get home page")
], homePageController.prototype, "getHomePage", void 0);
exports.homePageController = homePageController = __decorate([
    (0, controller_decorator_1.Controller)("/user/homePage"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], homePageController);
//# sourceMappingURL=home.controller.js.map