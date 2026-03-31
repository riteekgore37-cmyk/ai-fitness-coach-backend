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
const user_registered_meal_plan_model_1 = require("../../common/models/user-registered-meal-plan.model");
const meal_plan_model_1 = require("../../common/models/meal-plan.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const user_model_1 = require("../../common/models/user.model");
exports.default = (0, seeder_wrapper_1.seederWrapper)(user_registered_meal_plan_model_1.UserRegisteredMealPlan, () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().lean();
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const mealPlans = yield meal_plan_model_1.MealPlan.find().lean();
        let index = Math.floor(Math.random() * mealPlans.length);
        const userRegisteredMealPlan = new user_registered_meal_plan_model_1.UserRegisteredMealPlan({
            user: user._id,
            meal_plan: mealPlans[index]._id,
            is_active: true,
            days: mealPlans[index].days
        });
        yield userRegisteredMealPlan.save();
    })));
}));
//# sourceMappingURL=011-mymealPlan.seeder.js.map