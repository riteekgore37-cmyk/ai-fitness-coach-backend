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
exports.MealsService = void 0;
const meal_model_1 = require("../../../../../common/models/meal.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const events_manager_1 = require("../../../../../lib/events/events-manager");
const ingredient_model_1 = require("../../../../../common/models/ingredient.model");
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const mongoose_1 = require("mongoose");
const meal_done_event_1 = require("../events/meal-done.event");
const meal_type_enum_1 = require("../../../../../common/enums/meal-type.enum");
class MealsService extends (0, crud_service_1.CrudService)(meal_model_1.Meal) {
    eatCustomMeal(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate ingredients
            const customMealIngs = yield Promise.all(body.ingredients.map((i) => __awaiter(this, void 0, void 0, function* () {
                const ing = yield ingredient_model_1.Ingredient.findOne({ _id: new mongoose_1.Types.ObjectId(i.id) });
                if (!ing)
                    throw new http_error_1.HttpError(404, `Ingredient with id ${i} not found`);
                return {
                    ingredient: ing,
                    noServings: i.noServings,
                };
            })));
            // Create meal
            const meal = yield this.create({
                name: `${(new Date()).toISOString()} - Custom Meal - ${userId}`,
                image: "https://via.placeholder.com/150",
                type: meal_type_enum_1.MealType.CUSTOM,
                ingredients: customMealIngs.map(i => i.ingredient._id),
                calories: customMealIngs.reduce((acc, curr) => acc + curr.ingredient.calories * curr.noServings, 0),
                proteins: customMealIngs.reduce((acc, curr) => acc + curr.ingredient.proteins * curr.noServings, 0),
                carbs: customMealIngs.reduce((acc, curr) => acc + curr.ingredient.carbs * curr.noServings, 0),
                fats: customMealIngs.reduce((acc, curr) => acc + curr.ingredient.fats * curr.noServings, 0),
                isDeleted: true,
            });
            events_manager_1.EventsManager.emit(meal_done_event_1.MealDoneEvent.name, new meal_done_event_1.MealDoneEvent(userId, meal._id.toString()));
        });
    }
}
exports.MealsService = MealsService;
//# sourceMappingURL=meals.service.js.map