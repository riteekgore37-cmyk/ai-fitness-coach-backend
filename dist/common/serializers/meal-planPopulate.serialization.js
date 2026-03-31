"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSerialization = exports.ListMealPlanSerialization = exports.MealPlanPopulateSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const meal_serialization_1 = require("./meal.serialization");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
class MealPlanDaysPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanDaysPopulate.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "meals" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: meal_serialization_1.MealSerialization })
], MealPlanDaysPopulate.prototype, "meals", void 0);
class MealPlanKeyFeaturesPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanKeyFeaturesPopulate.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "description" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanKeyFeaturesPopulate.prototype, "description", void 0);
class MealPlanPopulateSerialization {
}
exports.MealPlanPopulateSerialization = MealPlanPopulateSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MealPlanPopulateSerialization.prototype, "your_journey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "key_features" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealPlanKeyFeaturesPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealPlanKeyFeaturesPopulate))
], MealPlanPopulateSerialization.prototype, "key_features", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealPlanDaysPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealPlanDaysPopulate))
], MealPlanPopulateSerialization.prototype, "days", void 0);
class ListMealPlanSerialization {
}
exports.ListMealPlanSerialization = ListMealPlanSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "duration", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "level", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], ListMealPlanSerialization.prototype, "your_journey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "key_features" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealPlanKeyFeaturesPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealPlanKeyFeaturesPopulate))
], ListMealPlanSerialization.prototype, "key_features", void 0);
class MSerialization {
}
exports.MSerialization = MSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], MSerialization.prototype, "image", void 0);
//# sourceMappingURL=meal-planPopulate.serialization.js.map