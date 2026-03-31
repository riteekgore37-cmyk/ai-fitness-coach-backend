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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeNutriGuideController = void 0;
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
const user_home_service_1 = require("../services/user-home.service");
const user_home_your_daily_intake_serialization_1 = require("../responses/user-home-your-daily-intake.serialization");
const user_nutri_home_daily_goals_serialization_1 = require("../responses/user-nutri-home-daily-goals.serialization");
const user_registered_meal_planPopulate_serialization_1 = require("../../../../../common/serializers/user-registered-meal-planPopulate.serialization");
const user_registered_meal_plans_service_1 = require("../../user-registered-meal-plans/services/user-registered-meal-plans.service");
const meal_plans_progress_service_1 = require("../../user-registered-meal-plans/services/meal-plans-progress.service");
const moment_1 = __importDefault(require("moment"));
let homeNutriGuideController = class homeNutriGuideController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.userHomeService = new user_home_service_1.UserHomeService();
        this.userRegisteredMealPlansService = new user_registered_meal_plans_service_1.UserRegisteredMealPlansService();
        this.mealPlansProgressService = new meal_plans_progress_service_1.MealPlansProgressService();
        this.getTodayMeals = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            // Check first — findOne returns null instead of throwing
            const existing = yield this.userRegisteredMealPlansService.findOne({
                user: req.jwtPayload.id, isActive: true
            });
            // User has no active meal plan — return empty success instead of 500
            if (!existing) {
                return json_response_1.JsonResponse.success({ data: null, message: "No active meal plan." }, res);
            }
            try {
                let data = yield this.userRegisteredMealPlansService.findOneOrFail({
                    user: req.jwtPayload.id, isActive: true
                }, {
                    populateArray: [
                        { path: "meal_plan", select: "-days" },
                        {
                            path: "days.meals",
                            populate: { path: "ingredients" }
                        }
                    ],
                });
                const today = (0, moment_1.default)().startOf("day");
                const planStartDay = (0, moment_1.default)(data.createdAt).startOf("day");
                const daysSinceStart = today.diff(planStartDay, "days");
                const daysToLoop = daysSinceStart > data.days.length - 1 ? data.days.length : daysSinceStart;
                console.log("daysSinceStart", daysSinceStart);
                try {
                    for (var _d = true, _e = __asyncValues(Array.from({ length: daysToLoop }, (_, i) => i)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const i = _c;
                        if (data.days[i].is_eaten === false) {
                            yield this.mealPlansProgressService.updateForUser({
                                urwId: data._id,
                                dayNumber: data.days[i].day_number
                            }, req.body, req.jwtPayload.id);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                data = yield this.userRegisteredMealPlansService.findOneOrFail({
                    user: req.jwtPayload.id, isActive: true
                }, {
                    populateArray: [
                        { path: "meal_plan", select: "-days" },
                        {
                            path: "days.meals",
                            populate: { path: "ingredients" }
                        }
                    ],
                });
                const dayToEat = data.days.find(day => day.is_eaten === false);
                if (dayToEat) {
                    data.days = [dayToEat];
                    return json_response_1.JsonResponse.success({
                        data: (0, serialize_1.serialize)(data, user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
                    }, res);
                }
                else {
                    return json_response_1.JsonResponse.success({
                        message: "All planned meals have been eaten.",
                    }, res);
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: "An error occurred." });
            }
        });
        this.updateProgress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const urwId = req.params.id;
            const dayNumber = Number(req.params.day);
            yield this.mealPlansProgressService.updateForUser({
                urwId, dayNumber
            }, req.body, req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                message: "mealPlan updated successfully",
            }, res);
        });
        this.getHomePageYourDailyIntake = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dailyIntake = yield this.userHomeService.getHomePageYourDailyIntake(req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(dailyIntake, user_home_your_daily_intake_serialization_1.UserHomeYourDailyIntakeSerialization)
            }, res);
        });
        this.getHomePageDailyGoals = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dailyGoals = yield this.userHomeService.getNutriHomeDailyGoals(req.jwtPayload.id);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(dailyGoals, user_nutri_home_daily_goals_serialization_1.UserNutriHomeDailyGoalsSerialization)
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/todays-intake", (0, async_handler_1.asyncHandler)(this.getHomePageYourDailyIntake));
        this.router.get("/daily-goals", (0, async_handler_1.asyncHandler)(this.getHomePageDailyGoals));
        this.router.get("/today-meals", (0, async_handler_1.asyncHandler)(this.getTodayMeals));
        this.router.patch("/:id/progress/:day", (0, async_handler_1.asyncHandler)(this.updateProgress));
    }
};
exports.homeNutriGuideController = homeNutriGuideController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)("/today-meals"),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_registered_meal_planPopulate_serialization_1.GetMyMealPlanSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Get today's meals"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get today's meals for the user.")
], homeNutriGuideController.prototype, "getTodayMeals", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerPatch)('/:id/progress/:day'),
    (0, swagger_response_decorator_1.SwaggerResponse)({}),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Update MyMealPlan Progress"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Update the progress of a MyMealPlan")
], homeNutriGuideController.prototype, "updateProgress", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/todays-intake'),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_home_your_daily_intake_serialization_1.UserHomeYourDailyIntakeSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Nutri home today's Intake"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get Nutriy page today's intake")
], homeNutriGuideController.prototype, "getHomePageYourDailyIntake", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/daily-goals'),
    (0, swagger_response_decorator_1.SwaggerResponse)(user_nutri_home_daily_goals_serialization_1.UserNutriHomeDailyGoalsSerialization),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Nutri Home Daily Goals"),
    (0, swagger_description_decorator_1.SwaggerDescription)("Get Nutri daily goals for user home")
], homeNutriGuideController.prototype, "getHomePageDailyGoals", void 0);
exports.homeNutriGuideController = homeNutriGuideController = __decorate([
    (0, controller_decorator_1.Controller)("/user/nutri-guide"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], homeNutriGuideController);
//# sourceMappingURL=home-nutriguide.controller.js.map