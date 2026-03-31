"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
class MealPlanDays {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanDays.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "meals" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: ["string"] })
], MealPlanDays.prototype, "meals", void 0);
class MealPlanKeyFeatures {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanKeyFeatures.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "description" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanKeyFeatures.prototype, "description", void 0);
class MealPlanSerialization {
}
exports.MealPlanSerialization = MealPlanSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanSerialization.prototype, "your_journey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "key_features" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealPlanKeyFeatures] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealPlanKeyFeatures))
], MealPlanSerialization.prototype, "key_features", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealPlanDays] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealPlanDays))
], MealPlanSerialization.prototype, "days", void 0);
//# sourceMappingURL=meal-plan.serialization.js.map