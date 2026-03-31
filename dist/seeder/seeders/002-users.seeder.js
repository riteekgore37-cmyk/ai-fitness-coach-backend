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
const authenticatable_type_enum_1 = require("../../common/enums/authenticatable-type.enum");
const fitness_goal_enum_1 = require("../../common/enums/fitness-goal.enum");
const fitness_level_enum_1 = require("../../common/enums/fitness-level.enum");
const gender_enum_1 = require("../../common/enums/gender.enum");
const injury_enum_1 = require("../../common/enums/injury.enum");
const preferred_day_enum_1 = require("../../common/enums/preferred-day.enum");
const preferred_equipment_enum_1 = require("../../common/enums/preferred-equipment.enum");
const workout_place_enum_1 = require("../../common/enums/workout-place.enum");
const user_model_1 = require("../../common/models/user.model");
const seeder_wrapper_1 = require("../../seeder/helpers/seeder-wrapper");
exports.default = (0, seeder_wrapper_1.seederWrapper)(user_model_1.User, () => __awaiter(void 0, void 0, void 0, function* () {
    // 10 users
    yield Promise.all(Array.from({ length: 10 }, (_, i) => i).map(function (i) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = {
                name: `User ${i}`,
                email: `user-${i}@app.com`,
                password: "password",
                image: `https://placehold.co/300x400`,
                gender: (i % 2 === 0) ?
                    gender_enum_1.Gender.MALE :
                    gender_enum_1.Gender.FEMALE,
                height: 170,
                weight: 70,
                fitness_level: [fitness_level_enum_1.FitnessLevel.BEGINNER, fitness_level_enum_1.FitnessLevel.INTERMEDIATE, fitness_level_enum_1.FitnessLevel.ADVANCED][i % 3],
                preferences: {
                    fitness_goal: [fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT, fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE, fitness_goal_enum_1.FitnessGoal.GET_FITTER][i % 3],
                    target_weight: 60,
                    workout_frequency: 3,
                    preferred_days: [preferred_day_enum_1.PreferredDay.MONDAY, preferred_day_enum_1.PreferredDay.TUESDAY, preferred_day_enum_1.PreferredDay.WEDNESDAY],
                    workout_place: [workout_place_enum_1.WorkoutPlace.GYM, workout_place_enum_1.WorkoutPlace.HOME, workout_place_enum_1.WorkoutPlace.BOTH][i % 3],
                    preferred_equipment: [[preferred_equipment_enum_1.PreferredEquipment.BARBELLS, preferred_equipment_enum_1.PreferredEquipment.DUMBBELLS, preferred_equipment_enum_1.PreferredEquipment.GYM_MACHINES, preferred_equipment_enum_1.PreferredEquipment.RESISTANCE_BAND, preferred_equipment_enum_1.PreferredEquipment.BODYWEIGHT][i % 5]],
                },
                injuries: [[injury_enum_1.Injury.ARMS, injury_enum_1.Injury.BACK, injury_enum_1.Injury.NECK, injury_enum_1.Injury.SHOULDERS, injury_enum_1.Injury.KNEES][i % 5]],
                dob: new Date(1990, 1, 1),
                role: authenticatable_type_enum_1.AuthenticatableType.USER,
            };
            yield user_model_1.User.create(o);
        });
    }));
    // Fixed test user (always available after seed:reset)
    yield user_model_1.User.create({
        name: "Riteek Gore",
        email: "riteek@gmail.com",
        password: "android1234",
        image: "https://placehold.co/300x400",
        gender: gender_enum_1.Gender.MALE,
        height: 170,
        weight: 70,
        fitness_level: fitness_level_enum_1.FitnessLevel.INTERMEDIATE,
        preferences: {
            fitness_goal: fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE,
            target_weight: 65,
            workout_frequency: 3,
            preferred_days: [preferred_day_enum_1.PreferredDay.MONDAY, preferred_day_enum_1.PreferredDay.WEDNESDAY, preferred_day_enum_1.PreferredDay.FRIDAY],
            workout_place: workout_place_enum_1.WorkoutPlace.GYM,
            preferred_equipment: [preferred_equipment_enum_1.PreferredEquipment.DUMBBELLS],
        },
        injuries: [],
        dob: new Date(2000, 1, 1),
        role: authenticatable_type_enum_1.AuthenticatableType.USER,
    });
}));
//# sourceMappingURL=002-users.seeder.js.map