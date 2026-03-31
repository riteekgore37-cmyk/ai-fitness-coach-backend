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
const workout_model_1 = require("../../common/models/workout.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
const exercise_model_1 = require("../../common/models/exercise.model");
const fitness_level_enum_1 = require("../../common/enums/fitness-level.enum");
const fitness_goal_enum_1 = require("../../common/enums/fitness-goal.enum");
const place_enum_1 = require("../../common/enums/place.enum");
exports.default = (0, seeder_wrapper_1.seederWrapper)(workout_model_1.Workout, () => __awaiter(void 0, void 0, void 0, function* () {
    // 10 workouts
    yield Promise.all(Array.from({ length: 10 }, (_, i) => i).map(function (i) {
        return __awaiter(this, void 0, void 0, function* () {
            const exercisesDuration = yield exercise_model_1.Exercise.find({
                duration: { $gt: 0 },
                sets: { $exists: false },
                reps: { $exists: false },
            }).limit(4).skip(i * 4).lean();
            const exercisesReps = yield exercise_model_1.Exercise.find({
                duration: 0,
                sets: { $gt: 0 },
                reps: { $gt: 0 }
            }).limit(4).skip(i * 4).lean();
            const o = {
                name: `Workout - ${i}`,
                description: `Workout - ${i} description`,
                type: 'Equipment Diversity',
                image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvEFvhT6PV5u-yCaY5lJRtySenHFAJquCb7BHcmuMwW5hSVVoWYH0DU2eCXoKn6yMYqH0&usqp=CAU`,
                fitness_level: [fitness_level_enum_1.FitnessLevel.BEGINNER, fitness_level_enum_1.FitnessLevel.INTERMEDIATE, fitness_level_enum_1.FitnessLevel.ADVANCED][i % 3],
                fitness_goal: [fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT, fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE, fitness_goal_enum_1.FitnessGoal.GET_FITTER][i % 3],
                place: [place_enum_1.Place.GYM, place_enum_1.Place.HOME][i % 2],
                min_per_day: 30,
                total_number_days: 4,
                template_weeks: [
                    {
                        week_number: 1,
                        week_name: 'Week 1',
                        week_description: 'Week 1 description',
                        days: [
                            {
                                day_number: 1,
                                total_number_exercises: 2,
                                day_type: 'full_body',
                                exercises: [
                                    exercisesDuration.slice(0, 1).map((e) => e._id),
                                    exercisesReps.slice(0, 1).map((e) => e._id)
                                ]
                            },
                            {
                                day_number: 2,
                                total_number_exercises: 2,
                                day_type: 'full_body',
                                exercises: [
                                    exercisesDuration.slice(1, 2).map((e) => e._id),
                                    exercisesReps.slice(1, 2).map((e) => e._id)
                                ]
                            },
                        ]
                    },
                    {
                        week_number: 2,
                        week_name: 'Week 2',
                        week_description: 'Week 2 description',
                        days: [
                            {
                                day_number: 1,
                                total_number_exercises: 2,
                                day_type: 'full_body',
                                exercises: [
                                    exercisesDuration.slice(2, 3).map((e) => e._id),
                                    exercisesReps.slice(2, 3).map((e) => e._id)
                                ]
                            },
                            {
                                day_number: 2,
                                total_number_exercises: 2,
                                day_type: 'full_body',
                                exercises: [
                                    exercisesDuration.slice(3, 4).map((e) => e._id),
                                    exercisesReps.slice(3, 4).map((e) => e._id)
                                ]
                            },
                        ]
                    }
                ],
                isDeleted: false,
            };
            yield workout_model_1.Workout.create(o);
        });
    }));
}));
//# sourceMappingURL=006-workout.seeder.js.map