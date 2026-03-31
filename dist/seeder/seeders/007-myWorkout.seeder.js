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
const user_registered_workout_model_1 = require("../../common/models/user-registered-workout.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const user_model_1 = require("../../common/models/user.model");
const workout_model_1 = require("../../common/models/workout.model");
exports.default = (0, seeder_wrapper_1.seederWrapper)(user_registered_workout_model_1.UserRegisteredWorkout, () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().lean();
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const workouts = yield workout_model_1.Workout.find({
            fitness_level: user.fitness_level,
            fitness_goal: user.preferences.fitness_goal,
        }).lean();
        if (workouts.length === 0)
            return;
        let index = Math.floor(Math.random() * workouts.length);
        const userRegisteredWorkout = new user_registered_workout_model_1.UserRegisteredWorkout({
            user: user._id,
            workout: workouts[index]._id,
            is_active: true,
            weeks: workouts[index].template_weeks
        });
        yield userRegisteredWorkout.save();
    })));
}));
//# sourceMappingURL=007-myWorkout.seeder.js.map