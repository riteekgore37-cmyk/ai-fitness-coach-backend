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
exports.UserHomeService = void 0;
const users_service_1 = require("../../users/services/users.service");
const mongoose_1 = require("mongoose");
const user_activities_service_1 = require("../../activities/services/user-activities.service");
const activity_type_enum_1 = require("../../../../../common/enums/activity-type.enum");
const exercises_service_1 = require("../../exercises/services/exercises.service");
const fitness_goal_enum_1 = require("../../../../../common/enums/fitness-goal.enum");
const meals_service_1 = require("../../meals/services/meals.service");
const age_1 = require("../../../../../lib/utils/age");
class UserHomeService {
    constructor() {
        this.userService = new users_service_1.UserService();
        this.activitiesService = new user_activities_service_1.UserActivitiesService();
        this.exercisesService = new exercises_service_1.ExerciseService();
        this.mealsService = new meals_service_1.MealsService();
    }
    getDaysArray(startDate, endDate) {
        const days = [];
        for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
            days.push(day.toLocaleString('en-US', { weekday: 'long' }).toLowerCase());
        }
        return days;
    }
    getDailyGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneOrFail({ _id: new mongoose_1.Types.ObjectId(userId) });
            const todaysExerciseActivities = yield this.activitiesService.model.find({
                user_id: new mongoose_1.Types.ObjectId(userId),
                activity_type: activity_type_enum_1.ActivityType.EXERCISE,
                $and: [
                    { created_at: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { created_at: { $lte: new Date(new Date().setHours(23, 59, 59, 999)) } },
                ],
            });
            const todaysExercisesIds = todaysExerciseActivities.map(a => a.related_id);
            const todaysExercises = yield this.exercisesService.model.find({
                _id: { $in: todaysExercisesIds },
            });
            const waterGoal = (user.weight || 1) * 2;
            const waterConsumed = Math.round(waterGoal * 0.72);
            const stepsGoal = (user.height || 1) * 100;
            const stepsDone = Math.round(stepsGoal * 0.78);
            const exercisesCals = todaysExercises.reduce((acc, curr) => acc + this.exercisesService.calculateCalories(curr), 0);
            const exercisesHours = todaysExercises.reduce((acc, curr) => { var _a; return acc + curr.duration || ((_a = curr.expectedDurationRange) === null || _a === void 0 ? void 0 : _a.min) || 0; }, 0) / 60;
            return {
                waterGoal,
                waterConsumed,
                stepsGoal,
                stepsDone,
                exercisesCals,
                exercisesHours
            };
        });
    }
    getHomePageYourDailyIntake(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const user = yield this.userService.findOneOrFail({ _id: new mongoose_1.Types.ObjectId(userId) });
            const goalToCalsMap = {};
            const goalToCarbsMap = {};
            const goalToProteinMap = {};
            const goalToFatMap = {};
            goalToCalsMap[fitness_goal_enum_1.FitnessGoal.GET_FITTER] = 2000;
            goalToCalsMap[fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT] = 1500;
            goalToCalsMap[fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE] = 2500;
            goalToCarbsMap[fitness_goal_enum_1.FitnessGoal.GET_FITTER] = 50;
            goalToCarbsMap[fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT] = 30;
            goalToCarbsMap[fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE] = 60;
            goalToProteinMap[fitness_goal_enum_1.FitnessGoal.GET_FITTER] = 30;
            goalToProteinMap[fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT] = 40;
            goalToProteinMap[fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE] = 50;
            goalToFatMap[fitness_goal_enum_1.FitnessGoal.GET_FITTER] = 20;
            goalToFatMap[fitness_goal_enum_1.FitnessGoal.LOSE_WEIGHT] = 30;
            goalToFatMap[fitness_goal_enum_1.FitnessGoal.GAIN_MUSCLE] = 20;
            const caloriesGoal = goalToCalsMap[(_a = user.preferences) === null || _a === void 0 ? void 0 : _a.fitness_goal] || 2000;
            const todaysExerciseActivities = yield this.activitiesService.model.find({
                user_id: new mongoose_1.Types.ObjectId(userId),
                activity_type: activity_type_enum_1.ActivityType.EXERCISE,
                $and: [
                    { created_at: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { created_at: { $lte: new Date(new Date().setHours(23, 59, 59, 999)) } },
                ],
            });
            const todaysExercisesIds = todaysExerciseActivities.map(a => a.related_id);
            const todaysExercises = yield this.exercisesService.model.find({
                _id: { $in: todaysExercisesIds },
            });
            const todaysMealsActivities = yield this.activitiesService.model.find({
                user_id: new mongoose_1.Types.ObjectId(userId),
                activity_type: activity_type_enum_1.ActivityType.MEAL,
                $and: [
                    { created_at: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { created_at: { $lte: new Date(new Date().setHours(23, 59, 59, 999)) } },
                ],
            });
            const todaysMealsIds = todaysMealsActivities.map(a => a.related_id);
            const todaysMeals = yield this.mealsService.model.find({
                _id: { $in: todaysMealsIds },
            });
            const caloriesBurned = todaysExercises.reduce((acc, curr) => acc + this.exercisesService.calculateCalories(curr), 0);
            const caloriesLeft = caloriesGoal - caloriesBurned;
            const caloriesIntake = todaysMeals.reduce((acc, curr) => acc + curr.calories, 0);
            const carbsGoal = goalToCarbsMap[(_b = user.preferences) === null || _b === void 0 ? void 0 : _b.fitness_goal] || 50;
            const carbsConsumed = todaysMeals.reduce((acc, curr) => acc + curr.carbs, 0);
            const proteinGoal = goalToProteinMap[(_c = user.preferences) === null || _c === void 0 ? void 0 : _c.fitness_goal] || 30;
            const proteinConsumed = todaysMeals.reduce((acc, curr) => acc + curr.proteins, 0);
            const fatGoal = goalToFatMap[(_d = user.preferences) === null || _d === void 0 ? void 0 : _d.fitness_goal] || 20;
            const fatConsumed = todaysMeals.reduce((acc, curr) => acc + curr.fats, 0);
            return {
                caloriesGoal,
                caloriesLeft,
                caloriesBurned,
                caloriesIntake,
                carbsGoal,
                carbsConsumed,
                proteinGoal,
                proteinConsumed,
                fatGoal,
                fatConsumed,
            };
        });
    }
    getHomePageStreak(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            // list day names in between the start and end date
            //
            const activities = yield this.activitiesService.model.find({
                user_id: new mongoose_1.Types.ObjectId(userId),
                $and: [
                    { created_at: { $gte: startDate } },
                    { created_at: { $lte: endDate } },
                ],
            });
            const days = this.getDaysArray(startDate, endDate);
            return {
                days: days.map(day => ({
                    day: day,
                    points: activities.filter(a => a.created_at.toLocaleString('en-US', { weekday: 'long' }).toLowerCase() === day).length,
                })),
            };
        });
    }
    getNutriHomeDailyGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneOrFail({ _id: new mongoose_1.Types.ObjectId(userId) });
            const sleepGoal = (0, age_1.calcAge)(user.dob) < 18 ? 8 : 7;
            const sleepDone = Math.round(sleepGoal * 0.8);
            return Object.assign(Object.assign({}, (yield this.getDailyGoals(userId))), { sleepGoal,
                sleepDone });
        });
    }
}
exports.UserHomeService = UserHomeService;
//# sourceMappingURL=user-home.service.js.map