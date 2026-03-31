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
exports.UserRegisteredMealPlansService = void 0;
const user_registered_meal_plan_model_1 = require("../../../../../common/models/user-registered-meal-plan.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const meal_plan_model_1 = require("../../../../../common/models/meal-plan.model");
class UserRegisteredMealPlansService extends (0, crud_service_1.CrudService)(user_registered_meal_plan_model_1.UserRegisteredMealPlan) {
    constructor() {
        super(...arguments);
        this.mealPlansService = new ((0, crud_service_1.CrudService)(meal_plan_model_1.MealPlan))();
    }
    unregisterCurrentMealPlan(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.updateMany({
                user: userId,
                isActive: true,
            }, {
                isActive: false,
            }, false);
        });
    }
    createForUser(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealPlan = yield this.mealPlansService.findOneOrFail({
                _id: data.meal_plan,
            });
            yield this.unregisterCurrentMealPlan(userId);
            return yield this.create(Object.assign(Object.assign({}, data), { user: userId, 
                // FIX: filter out any null/undefined meal IDs within each day before storing
                days: mealPlan.days.map(day => ({
                    day_number: day.day_number,
                    meals: (day.meals || []).filter((id) => id != null),
                    is_eaten: false,
                })), isActive: true }));
        });
    }
}
exports.UserRegisteredMealPlansService = UserRegisteredMealPlansService;
//# sourceMappingURL=user-registered-meal-plans.service.js.map