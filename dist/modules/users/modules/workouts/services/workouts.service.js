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
exports.WorkoutService = void 0;
const workout_place_enum_1 = require("../../../../../common/enums/workout-place.enum");
const workout_model_1 = require("../../../../../common/models/workout.model");
const fitness_model_1 = require("../../../../../lib/models/fitness-model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const age_1 = require("../../../../../lib/utils/age");
const exercises_service_1 = require("../../exercises/services/exercises.service");
const user_registered_workouts_service_1 = require("../../user-registered-workouts/services/user-registered-workouts.service");
const users_service_1 = require("../../users/services/users.service");
const mongoose_1 = require("mongoose");
class WorkoutService extends (0, crud_service_1.CrudService)(workout_model_1.Workout) {
    constructor() {
        super(...arguments);
        this.exerciseService = new exercises_service_1.ExerciseService();
        this.userRegisteredWorkoutsService = new user_registered_workouts_service_1.UserRegisteredWorkoutsService();
        this.usersService = new users_service_1.UserService();
    }
    createModelWorkout(userOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = typeof userOrId === 'string' ?
                yield this.usersService.findOneOrFail({ _id: new mongoose_1.Types.ObjectId(userOrId) }) :
                userOrId;
            const params = {
                home_or_gym: user.preferences.workout_place === workout_place_enum_1.WorkoutPlace.GYM ? 1 : 0,
                level: user.fitness_level,
                goal: user.preferences.fitness_goal,
                gender: user.gender,
                age: (0, age_1.calcAge)(user.dob),
                feedback: false,
                old_weight: user.weight,
                equipments: user.preferences.preferred_equipment,
            };
            const pworkout = yield fitness_model_1.FitnessModel.predictWorkout(params);
            // partition the workout days into weeks (each week has 7 days)
            const weeks = [];
            for (let i = 0; i < pworkout.length; i += 7) {
                weeks.push(pworkout.slice(i, i + 7));
            }
            const exercisesNames = pworkout.flat().map((e) => e.name);
            const exercises = yield this.exerciseService.listAll({ name: { $in: exercisesNames } });
            const today = new Date();
            const todayDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const currentTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
            const milliseconds = today.getMilliseconds();
            let place = [];
            if (user.preferences.workout_place === workout_place_enum_1.WorkoutPlace.BOTH) {
                place = [workout_place_enum_1.WorkoutPlace.GYM, workout_place_enum_1.WorkoutPlace.HOME];
            }
            else {
                place = [user.preferences.workout_place];
            }
            const workout = yield this.create({
                aiGenerated: true,
                name: `AI Generated Workout (${user.preferences.fitness_goal} - ${user.fitness_level}) - ${todayDate} ${currentTime}.${milliseconds}`,
                description: `This AI-generated workout plan, created on ${todayDate} at ${currentTime}.${milliseconds}, is tailored for your ${user.fitness_level.toLowerCase()} fitness level and ${user.preferences.fitness_goal.toLowerCase()} goal. It is designed to be performed ${user.preferences.workout_place === workout_place_enum_1.WorkoutPlace.GYM ? "at the gym" : "at home"} using your preferred equipment.`,
                type: "Equipment Diversity",
                created_by: user._id,
                image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvEFvhT6PV5u-yCaY5lJRtySenHFAJquCb7BHcmuMwW5hSVVoWYH0DU2eCXoKn6yMYqH0&usqp=CAU`,
                fitness_level: user.fitness_level,
                fitness_goal: user.preferences.fitness_goal,
                place: place,
                min_per_day: 30,
                total_number_days: pworkout.flat().length,
                template_weeks: weeks.map((week, i) => ({
                    week_number: i + 1,
                    week_name: `Week ${i + 1}`,
                    week_description: `Week ${i + 1}`,
                    days: week.map((day, j) => ({
                        day_number: j + 1,
                        total_number_exercises: day.length,
                        day_type: "full body",
                        // FIX: filter out undefined/null exercise IDs so stored array only has valid ObjectIds
                        exercises: day
                            .map((e) => { var _a; return (_a = exercises.find((ex) => ex.name === e.name)) === null || _a === void 0 ? void 0 : _a._id; })
                            .filter((id) => id != null),
                    })),
                })),
            });
            yield this.userRegisteredWorkoutsService.createForUser({
                workout: workout._id,
            }, user._id);
        });
    }
}
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workouts.service.js.map