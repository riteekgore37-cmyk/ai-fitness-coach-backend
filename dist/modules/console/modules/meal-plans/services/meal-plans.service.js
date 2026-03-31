"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlansService = void 0;
const meal_plan_model_1 = require("../../../../../common/models/meal-plan.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
class MealPlansService extends (0, crud_service_1.CrudService)(meal_plan_model_1.MealPlan) {
}
exports.MealPlansService = MealPlansService;
//# sourceMappingURL=meal-plans.service.js.map