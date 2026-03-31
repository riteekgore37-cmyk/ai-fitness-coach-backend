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
exports.MealPlansProgressService = void 0;
const user_registered_meal_plan_model_1 = require("../../../../../common/models/user-registered-meal-plan.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const meal_plans_service_1 = require("../../meal-plans/services/meal-plans.service");
const events_manager_1 = require("../../../../../lib/events/events-manager");
const meals_done_event_1 = require("../../meals/events/meals-done.event");
class MealPlansProgressService extends (0, crud_service_1.CrudService)(user_registered_meal_plan_model_1.UserRegisteredMealPlan) {
    constructor() {
        super(...arguments);
        this.mealPlansService = new meal_plans_service_1.MealPlansService();
    }
    updateForUser(mealPlanProps, _data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // find mealPlan
            const mealPlan = yield this.findOneOrFail({
                _id: mealPlanProps.urwId,
                user: userId,
            });
            // find day
            const day = mealPlan.days.find(d => d.day_number === mealPlanProps.dayNumber);
            if (!day)
                throw new http_error_1.HttpError(404, 'Workout Day Not Found');
            const dayIndex = mealPlan.days.indexOf(day);
            // update day
            day.is_eaten = true;
            mealPlan.days[dayIndex] = day;
            // save changes
            mealPlan.markModified('days');
            const updatedMealPlan = yield mealPlan.save();
            // check if it's the last day
            const lastDay = mealPlan.days[mealPlan.days.length - 1];
            if (lastDay.day_number === mealPlanProps.dayNumber) {
                this.mealPlansService.createModelMealPlan(userId);
            }
            events_manager_1.EventsManager.emit(meals_done_event_1.MealsDoneEvent.name, new meals_done_event_1.MealsDoneEvent(userId, day.meals.map(e => e.toString())));
            return updatedMealPlan;
        });
    }
}
exports.MealPlansProgressService = MealPlansProgressService;
//# sourceMappingURL=meal-plans-progress.service.js.map