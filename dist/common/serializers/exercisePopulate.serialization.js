"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisePopulateSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const muscle_serialization_1 = require("./muscle.serialization");
const equipment_serialization_1 = require("./equipment.serialization");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
class ExpectedDurationRangePopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], ExpectedDurationRangePopulate.prototype, "min", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], ExpectedDurationRangePopulate.prototype, "max", void 0);
class MediaPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MediaPopulate.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MediaPopulate.prototype, "url", void 0);
class TargetMusclesPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: equipment_serialization_1.MuscleSerialization })
], TargetMusclesPopulate.prototype, "primary", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: equipment_serialization_1.MuscleSerialization })
], TargetMusclesPopulate.prototype, "secondary", void 0);
class ExercisePopulateSerialization {
}
exports.ExercisePopulateSerialization = ExercisePopulateSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "exerciseType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], ExercisePopulateSerialization.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "expectedDurationRange" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ExpectedDurationRangePopulate }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, ExpectedDurationRangePopulate))
], ExercisePopulateSerialization.prototype, "expectedDurationRange", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], ExercisePopulateSerialization.prototype, "reps", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], ExercisePopulateSerialization.prototype, "sets", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "instructions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ExercisePopulateSerialization.prototype, "benefits", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: TargetMusclesPopulate })
], ExercisePopulateSerialization.prototype, "targetMuscles", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [muscle_serialization_1.EquipmentSerialization] })
], ExercisePopulateSerialization.prototype, "equipments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('string')
], ExercisePopulateSerialization.prototype, "coverImage", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "media" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: MediaPopulate }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MediaPopulate))
], ExercisePopulateSerialization.prototype, "media", void 0);
//# sourceMappingURL=exercisePopulate.serialization.js.map