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
const meal_plan_model_1 = require("../../common/models/meal-plan.model");
const meal_model_1 = require("../../common/models/meal.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const fitness_level_enum_1 = require("../../common/enums/fitness-level.enum");
exports.default = (0, seeder_wrapper_1.seederWrapper)(meal_plan_model_1.MealPlan, () => __awaiter(void 0, void 0, void 0, function* () {
    // 10 mealPlans
    yield Promise.all(Array.from({ length: 10 }, (_, i) => i).map(function (i) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch all meals
            const meals = yield meal_model_1.Meal.find().lean();
            // Categorize meals by type
            const categorizedMeals = {
                'breakfast': [],
                'dinner': [],
                'snacks': [],
                'lunch': [],
            };
            meals.forEach(meal => {
                if (meal.type in categorizedMeals) {
                    categorizedMeals[meal.type].push(meal);
                }
            });
            // Check if we have enough meals of each type
            for (const type in categorizedMeals) {
                if (categorizedMeals[type].length < 7) {
                    throw new Error(`Not enough meals of type ${type}`);
                }
            }
            let o = {
                image: `https://t4.ftcdn.net/jpg/01/81/12/37/360_F_181123726_invADRiRZle7YWLYfkEHz0mUfWH60kVZ.jpg`,
                description: 'This is a description of the meal plan.',
                duration: 7,
                level: [fitness_level_enum_1.FitnessLevel.BEGINNER, fitness_level_enum_1.FitnessLevel.INTERMEDIATE, fitness_level_enum_1.FitnessLevel.ADVANCED][i % 3],
                your_journey: 'This is your journey description.',
                key_features: [
                    { title: 'Feature 1', description: 'Description for feature 1' },
                    { title: 'Feature 2', description: 'Description for feature 2' },
                ],
                days: Array.from({ length: 7 }, (_, i) => ({
                    day_number: i + 1,
                    meals: [
                        categorizedMeals['breakfast'][i],
                        categorizedMeals['lunch'][i],
                        categorizedMeals['dinner'][i],
                        categorizedMeals['snacks'][i],
                    ],
                })),
                isDeleted: false,
            };
            yield meal_plan_model_1.MealPlan.create(o);
        });
    }));
}));
//# sourceMappingURL=010-mealPlan.seeder.js.map