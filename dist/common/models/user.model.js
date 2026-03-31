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
exports.User = exports.saltrounds = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authenticatable_type_enum_1 = require("../enums/authenticatable-type.enum");
const fitness_goal_enum_1 = require("../enums/fitness-goal.enum");
const fitness_level_enum_1 = require("../enums/fitness-level.enum");
const gender_enum_1 = require("../enums/gender.enum");
const injury_enum_1 = require("../enums/injury.enum");
const preferred_day_enum_1 = require("../enums/preferred-day.enum");
const preferred_equipment_enum_1 = require("../enums/preferred-equipment.enum");
const workout_place_enum_1 = require("../enums/workout-place.enum");
exports.saltrounds = 5;
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    gender: {
        type: String,
        enum: gender_enum_1.Gender,
        required: true,
    },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    fitness_level: {
        type: String,
        enum: fitness_level_enum_1.FitnessLevel,
        required: true,
    },
    preferences: {
        fitness_goal: {
            type: String,
            enum: fitness_goal_enum_1.FitnessGoal,
            required: true,
        },
        target_weight: { type: Number, required: true },
        workout_frequency: { type: Number },
        preferred_days: [
            {
                type: String,
                enum: preferred_day_enum_1.PreferredDay,
            },
        ],
        workout_place: {
            type: String,
            enum: workout_place_enum_1.WorkoutPlace,
            required: true,
        },
        preferred_equipment: [
            {
                type: String,
                enum: preferred_equipment_enum_1.PreferredEquipment,
                required: true,
            },
        ],
    },
    injuries: [
        {
            type: String,
            enum: injury_enum_1.Injury,
            required: true,
        },
    ],
    dob: { type: Date },
    role: {
        type: String,
        enum: authenticatable_type_enum_1.AuthenticatableType,
        default: authenticatable_type_enum_1.AuthenticatableType.USER,
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcrypt_1.default.hash(this.password, exports.saltrounds);
        }
        if (this.isModified("email")) {
            this.email = this.email.toLowerCase();
        }
        next();
    });
});
userSchema.pre(["updateOne", "findOneAndUpdate"], function () {
    return __awaiter(this, void 0, void 0, function* () {
        const data = this.getUpdate();
        if (data.password) {
            data.password = yield bcrypt_1.default.hash(data.password, exports.saltrounds);
        }
        if (data.email) {
            data.email = data.email.toLowerCase();
        }
    });
});
// pre find make email case insensitive
userSchema.pre(["find", "findOne"], function () {
    const query = this.getQuery();
    if (query.email) {
        query.email = query.email.toLowerCase();
    }
});
exports.User = mongoose_1.default.model("users", userSchema);
//# sourceMappingURL=user.model.js.map