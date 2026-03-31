"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSerializationPopulate = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
const exercise_serialization_1 = require("./exercise.serialization");
class WorkoutDaysPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutDaysPopulate.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutDaysPopulate.prototype, "total_number_exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutDaysPopulate.prototype, "day_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "exercises" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [exercise_serialization_1.ExerciseSerialization] })
], WorkoutDaysPopulate.prototype, "exercises", void 0);
class WorkoutTemplateWeeksPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutTemplateWeeksPopulate.prototype, "week_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutTemplateWeeksPopulate.prototype, "week_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutTemplateWeeksPopulate.prototype, "week_description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [WorkoutDaysPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, WorkoutDaysPopulate))
], WorkoutTemplateWeeksPopulate.prototype, "days", void 0);
class WorkoutSerializationPopulate {
}
exports.WorkoutSerializationPopulate = WorkoutSerializationPopulate;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "created_by", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "fitness_level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "fitness_goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerializationPopulate.prototype, "place", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutSerializationPopulate.prototype, "min_per_day", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutSerializationPopulate.prototype, "total_number_days", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "template_weeks" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [WorkoutTemplateWeeksPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, WorkoutTemplateWeeksPopulate))
], WorkoutSerializationPopulate.prototype, "template_weeks", void 0);
//# sourceMappingURL=workoutPopulate.serialization.js.map