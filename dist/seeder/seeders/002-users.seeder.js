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
    // User 1 — Riteek (your main test user)
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
    // User 2
    yield user_model_1.User.create({
        name: "User Two",
        email: "user2@app.com",
        password: "password",
        image: "https://placehold.co/300x400",
        gender: gender_enum_1.Gender.FEMALE,
        height: 165,
        weight: 60,
        fitness_level: fitness_level_enum_1.FitnessLevel.BEGINNER,
        preferences: {
            fitness_goal: fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT,
            target_weight: 55,
            workout_frequency: 3,
            preferred_days: [preferred_day_enum_1.PreferredDay.TUESDAY, preferred_day_enum_1.PreferredDay.THURSDAY],
            workout_place: workout_place_enum_1.WorkoutPlace.HOME,
            preferred_equipment: [preferred_equipment_enum_1.PreferredEquipment.BODYWEIGHT],
        },
        injuries: [],
        dob: new Date(1998, 5, 15),
        role: authenticatable_type_enum_1.AuthenticatableType.USER,
    });
    // User 3
    yield user_model_1.User.create({
        name: "User Three",
        email: "user3@app.com",
        password: "password",
        image: "https://placehold.co/300x400",
        gender: gender_enum_1.Gender.MALE,
        height: 175,
        weight: 80,
        fitness_level: fitness_level_enum_1.FitnessLevel.ADVANCED,
        preferences: {
            fitness_goal: fitness_goal_enum_1.FitnessGoal.GET_FITTER,
            target_weight: 75,
            workout_frequency: 5,
            preferred_days: [preferred_day_enum_1.PreferredDay.MONDAY, preferred_day_enum_1.PreferredDay.TUESDAY, preferred_day_enum_1.PreferredDay.THURSDAY],
            workout_place: workout_place_enum_1.WorkoutPlace.GYM,
            preferred_equipment: [preferred_equipment_enum_1.PreferredEquipment.BARBELLS],
        },
        injuries: [injury_enum_1.Injury.KNEES],
        dob: new Date(1995, 3, 20),
        role: authenticatable_type_enum_1.AuthenticatableType.USER,
    });
    // User 4
    yield user_model_1.User.create({
        name: "User Four",
        email: "user4@app.com",
        password: "password",
        image: "https://placehold.co/300x400",
        gender: gender_enum_1.Gender.FEMALE,
        height: 160,
        weight: 55,
        fitness_level: fitness_level_enum_1.FitnessLevel.BEGINNER,
        preferences: {
            fitness_goal: fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT,
            target_weight: 50,
            workout_frequency: 3,
            preferred_days: [preferred_day_enum_1.PreferredDay.WEDNESDAY, preferred_day_enum_1.PreferredDay.FRIDAY],
            workout_place: workout_place_enum_1.WorkoutPlace.HOME,
            preferred_equipment: [preferred_equipment_enum_1.PreferredEquipment.RESISTANCE_BAND],
        },
        injuries: [],
        dob: new Date(2001, 8, 10),
        role: authenticatable_type_enum_1.AuthenticatableType.USER,
    });
    console.log("✅ 4 users created");
}));
//# sourceMappingURL=002-users.seeder.js.map