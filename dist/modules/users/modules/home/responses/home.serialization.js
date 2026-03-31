"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../../../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../../../../lib/decorators/swagger-response-property.decorator");
class DaysInHome {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], DaysInHome.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], DaysInHome.prototype, "total_number_exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], DaysInHome.prototype, "day_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], DaysInHome.prototype, "is_done", void 0);
class weeksInHome {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], weeksInHome.prototype, "week_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], weeksInHome.prototype, "is_done", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [DaysInHome] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, DaysInHome))
], weeksInHome.prototype, "days", void 0);
class WorkoutInHome {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutInHome.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutInHome.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutInHome.prototype, "min_per_day", void 0);
class MyWorkoutHome {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutHome.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: WorkoutInHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, WorkoutInHome))
], MyWorkoutHome.prototype, "workout", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MyWorkoutHome.prototype, "is_active", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: weeksInHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, weeksInHome))
], MyWorkoutHome.prototype, "weeks", void 0);
class PreferencesUserHome {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], PreferencesUserHome.prototype, "fitness_goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], PreferencesUserHome.prototype, "target_weight", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], PreferencesUserHome.prototype, "workout_frequency", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "preferred_days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], PreferencesUserHome.prototype, "preferred_days", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], PreferencesUserHome.prototype, "workout_place", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], PreferencesUserHome.prototype, "preferred_equipment", void 0);
class UserHome {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserHome.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserHome.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "preferences" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: PreferencesUserHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, PreferencesUserHome))
], UserHome.prototype, "preferences", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], UserHome.prototype, "injuries", void 0);
class TodayMealPlanHome {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], TodayMealPlanHome.prototype, "numberOfMeals", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], TodayMealPlanHome.prototype, "numberOfSnacks", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], TodayMealPlanHome.prototype, "totalCalories", void 0);
class MyMealPlanHome {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: "id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyMealPlanHome.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: TodayMealPlanHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, TodayMealPlanHome))
], MyMealPlanHome.prototype, "today", void 0);
class HomeSerialization {
}
exports.HomeSerialization = HomeSerialization;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: UserHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, UserHome))
], HomeSerialization.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: MyWorkoutHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyWorkoutHome))
], HomeSerialization.prototype, "myWorkout", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "myMealPlan" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: MyMealPlanHome }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyMealPlanHome))
], HomeSerialization.prototype, "myMealPlan", void 0);
//# sourceMappingURL=home.serialization.js.map