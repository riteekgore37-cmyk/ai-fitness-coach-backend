"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
class WorkoutDays {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutDays.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutDays.prototype, "total_number_exercises", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutDays.prototype, "day_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "exercises" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], WorkoutDays.prototype, "exercises", void 0);
class WorkoutTemplateWeeks {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutTemplateWeeks.prototype, "week_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutTemplateWeeks.prototype, "week_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutTemplateWeeks.prototype, "week_description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [WorkoutDays] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, WorkoutDays))
], WorkoutTemplateWeeks.prototype, "days", void 0);
class WorkoutSerialization {
}
exports.WorkoutSerialization = WorkoutSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "created_by", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "fitness_level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "fitness_goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], WorkoutSerialization.prototype, "place", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutSerialization.prototype, "min_per_day", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], WorkoutSerialization.prototype, "total_number_days", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "template_weeks" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [WorkoutTemplateWeeks] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, WorkoutTemplateWeeks))
], WorkoutSerialization.prototype, "template_weeks", void 0);
//# sourceMappingURL=workout.serialization.js.map