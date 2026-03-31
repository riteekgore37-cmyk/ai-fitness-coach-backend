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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_model_1 = require("../../common/models/activity.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const user_model_1 = require("../../common/models/user.model");
const exercise_model_1 = require("../../common/models/exercise.model");
const meal_model_1 = require("../../common/models/meal.model");
const activity_type_enum_1 = require("../../common/enums/activity-type.enum");
const moment_1 = __importDefault(require("moment"));
exports.default = (0, seeder_wrapper_1.seederWrapper)(activity_model_1.Activity, () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().lean();
    const exercises = yield exercise_model_1.Exercise.find().lean();
    const meals = yield meal_model_1.Meal.find().lean();
    const today = (0, moment_1.default)(); // Use the current date
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < 10; i++) {
            const createdAt = today.clone().subtract(i, 'days').toDate();
            const random = Math.floor(5 + Math.random() * 15);
            // Create 10 exercise activities
            for (let j = 0; j < random; j++) {
                let exerciseActivity = new activity_model_1.Activity({
                    user_id: user._id,
                    activity_type: activity_type_enum_1.ActivityType.EXERCISE,
                    related_id: exercises[Math.floor(Math.random() * exercises.length)]._id,
                    created_at: createdAt
                });
                yield exerciseActivity.save();
            }
            // Create 10 meal activities
            for (let j = 0; j < random; j++) {
                let mealActivity = new activity_model_1.Activity({
                    user_id: user._id,
                    activity_type: activity_type_enum_1.ActivityType.MEAL,
                    related_id: meals[Math.floor(Math.random() * meals.length)]._id,
                    created_at: createdAt
                });
                yield mealActivity.save();
            }
        }
    })));
}));
//# sourceMappingURL=012-activities.seeder.js.map