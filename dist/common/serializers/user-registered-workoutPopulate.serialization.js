"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredWorkoutsPopulateSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
const exercisePopulate_serialization_1 = require("./exercisePopulate.serialization");
class MyWorkoutDaysPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutDaysPopulate.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutDaysPopulate.prototype, "total_number_exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutDaysPopulate.prototype, "day_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "exercises" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [exercisePopulate_serialization_1.ExercisePopulateSerialization] })
], MyWorkoutDaysPopulate.prototype, "exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MyWorkoutDaysPopulate.prototype, "is_done", void 0);
class MyWorkoutWeeksPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutWeeksPopulate.prototype, "week_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutWeeksPopulate.prototype, "week_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutWeeksPopulate.prototype, "week_description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MyWorkoutDaysPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyWorkoutDaysPopulate))
], MyWorkoutWeeksPopulate.prototype, "days", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MyWorkoutWeeksPopulate.prototype, "is_done", void 0);
class Workout {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "created_by", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "fitness_level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "fitness_goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], Workout.prototype, "place", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], Workout.prototype, "min_per_day", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], Workout.prototype, "total_number_days", void 0);
class UserRegisteredWorkoutsPopulateSerialization {
}
exports.UserRegisteredWorkoutsPopulateSerialization = UserRegisteredWorkoutsPopulateSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredWorkoutsPopulateSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredWorkoutsPopulateSerialization.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: Workout }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, Workout))
], UserRegisteredWorkoutsPopulateSerialization.prototype, "workout", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], UserRegisteredWorkoutsPopulateSerialization.prototype, "is_active", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "weeks" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MyWorkoutWeeksPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyWorkoutWeeksPopulate))
], UserRegisteredWorkoutsPopulateSerialization.prototype, "weeks", void 0);
//# sourceMappingURL=user-registered-workoutPopulate.serialization.js.map