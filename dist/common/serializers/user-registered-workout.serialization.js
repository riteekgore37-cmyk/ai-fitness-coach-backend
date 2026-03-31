"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredWorkoutsSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
class MyWorkoutDays {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutDays.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutDays.prototype, "total_number_exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutDays.prototype, "day_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "exercises" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], MyWorkoutDays.prototype, "exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MyWorkoutDays.prototype, "is_done", void 0);
class MyWorkoutWeeks {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MyWorkoutWeeks.prototype, "week_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutWeeks.prototype, "week_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MyWorkoutWeeks.prototype, "week_description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MyWorkoutDays] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyWorkoutDays))
], MyWorkoutWeeks.prototype, "days", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MyWorkoutWeeks.prototype, "is_done", void 0);
class UserRegisteredWorkoutsSerialization {
}
exports.UserRegisteredWorkoutsSerialization = UserRegisteredWorkoutsSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredWorkoutsSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredWorkoutsSerialization.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredWorkoutsSerialization.prototype, "workout", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], UserRegisteredWorkoutsSerialization.prototype, "is_active", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "weeks" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MyWorkoutWeeks] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MyWorkoutWeeks))
], UserRegisteredWorkoutsSerialization.prototype, "weeks", void 0);
//# sourceMappingURL=user-registered-workout.serialization.js.map