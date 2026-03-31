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
exports.UsersAuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_error_1 = require("../../../../../lib/error-handling/http-error");
const jwt_helper_1 = require("../../../../../helpers/jwt.helper");
const user_model_1 = require("../../../../../common/models/user.model");
const crud_service_1 = require("../../../../../lib/services/crud.service");
const workouts_service_1 = require("../../workouts/services/workouts.service");
const meal_plans_service_1 = require("../../meal-plans/services/meal-plans.service");
class UsersAuthService extends (0, crud_service_1.CrudService)(user_model_1.User) {
    constructor() {
        super(...arguments);
        this.workoutsService = new workouts_service_1.WorkoutService();
        this.mealPlanService = new meal_plans_service_1.MealPlansService();
    }
    register(createParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (createParams.password !== createParams.confirmPassword) {
                throw new http_error_1.HttpError(400, "passwords do not match");
            }
            delete createParams.confirmPassword;
            const user = yield this.create(createParams);
            try {
                yield this.workoutsService.createModelWorkout(user);
                yield this.mealPlanService.createModelMealPlan(user);
            }
            catch (error) {
                console.log("AI model server not available");
            }
            return user;
        });
    }
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({ email: loginRequest.email });
            if (!user)
                throw new http_error_1.HttpError(401, "Invalid Credentials");
            const isPasswordCorrect = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordCorrect)
                throw new http_error_1.HttpError(401, "Invalid Credentials");
            const token = jwt_helper_1.JwtHelper.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
                type: "user",
            });
            return { user, token };
        });
    }
}
exports.UsersAuthService = UsersAuthService;
//# sourceMappingURL=users-auth.service.js.map