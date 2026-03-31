"use strict";
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
exports.MealPlansService = void 0;
const meal_plan_model_1 = require("../../../../../common/models/meal-plan.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const nutrition_model_1 = require("../../../../../lib/models/nutrition_model");
const age_1 = require("../../../../../lib/utils/age");
const meals_service_1 = require("../../meals/services/meals.service");
const user_registered_meal_plans_service_1 = require("../../user-registered-meal-plans/services/user-registered-meal-plans.service");
const users_service_1 = require("../../../../../modules/console/modules/users/services/users.service");
const mongoose_1 = require("mongoose");
class MealPlansService extends (0, crud_service_1.CrudService)(meal_plan_model_1.MealPlan) {
    constructor() {
        super(...arguments);
        this.mealsService = new meals_service_1.MealsService();
        this.userRegisteredMealPlansService = new user_registered_meal_plans_service_1.UserRegisteredMealPlansService();
        this.usersService = new users_service_1.UsersService();
    }
    createModelMealPlan(userOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = typeof userOrId === 'string' ?
                yield this.usersService.findOneOrFail({ _id: new mongoose_1.Types.ObjectId(userOrId) }) :
                userOrId;
            let caloriesPerDay = 0;
            if (user.gender === "male") {
                caloriesPerDay = 10 * user.weight + 6.25 * user.height - 5 * (0, age_1.calcAge)(user.dob) + 5;
            }
            else {
                caloriesPerDay = 10 * user.weight + 6.25 * user.height - 5 * (0, age_1.calcAge)(user.dob) - 161;
            }
            const params = { calories: caloriesPerDay };
            let pMealPlan = [];
            for (let i = 0; i < 4; i++) {
                const mealPlanChunk = yield nutrition_model_1.NutritionModel.predictMealPlan(params);
                pMealPlan = pMealPlan.concat(mealPlanChunk);
            }
            const mealsNames = pMealPlan.flat().map((meal) => meal.Name);
            const meals = yield this.mealsService.listAll({ name: { $in: mealsNames } });
            const today = new Date();
            const todayDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const currentTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            const milliseconds = today.getMilliseconds();
            const mealPlan = yield this.create({
                aiGenerated: true,
                image: `https://t4.ftcdn.net/jpg/01/81/12/37/360_F_181123726_invADRiRZle7YWLYfkEHz0mUfWH60kVZ.jpg`,
                description: `This AI-generated meal plan is designed specifically for you, considering your personal fitness goal of ${user.preferences.fitness_goal}. \n            Created on ${todayDate} at ${currentTime}.${milliseconds}, this plan is tailored to provide a balanced and nutritious diet that supports your workout frequency of ${user.preferences.workout_frequency} times per week.\n            Whether you prefer working out on ${user.preferences.preferred_days.join(", ")}, at ${user.preferences.workout_place}, or using ${user.preferences.preferred_equipment.join(", ")}, this meal plan will help you achieve your health and fitness goals. Enjoy a variety of delicious and nutritious meals selected just for you.`,
                duration: 28,
                level: user.fitness_level,
                days: pMealPlan.map((day, i) => ({
                    day_number: i + 1,
                    // FIX: filter out undefined/null meal IDs so stored array only has valid ObjectIds
                    meals: day
                        .map((m) => { var _a; return (_a = meals.find((meal) => meal.name === m.Name)) === null || _a === void 0 ? void 0 : _a._id; })
                        .filter((id) => id != null),
                })),
            });
            yield this.userRegisteredMealPlansService.createForUser({ meal_plan: mealPlan._id }, user._id);
            return mealPlan;
        });
    }
}
exports.MealPlansService = MealPlansService;
//# sourceMappingURL=meal-plans.service.js.map