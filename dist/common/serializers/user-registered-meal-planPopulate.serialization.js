"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyMealPlanSerialization = exports.UserRegisteredMealPlansPopulateSerialization = void 0;
const class_transformer_1 = require("class-transformer");
const serialize_1 = require("../../helpers/serialize");
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
const meal_planPopulate_serialization_1 = require("../serializers/meal-planPopulate.serialization");
const mealPopulate_serialization_1 = require("./mealPopulate.serialization");
const meal_plan_serialization_1 = require("./meal-plan.serialization");
class MealDaysPopulate {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "number" })
], MealDaysPopulate.prototype, "day_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "meals" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [mealPopulate_serialization_1.MealPopulateSerialization] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, mealPopulate_serialization_1.MealPopulateSerialization))
], MealDaysPopulate.prototype, "meals", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], MealDaysPopulate.prototype, "is_eaten", void 0);
class UserRegisteredMealPlansPopulateSerialization {
}
exports.UserRegisteredMealPlansPopulateSerialization = UserRegisteredMealPlansPopulateSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredMealPlansPopulateSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], UserRegisteredMealPlansPopulateSerialization.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: meal_plan_serialization_1.MealPlanSerialization }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, meal_plan_serialization_1.MealPlanSerialization))
], UserRegisteredMealPlansPopulateSerialization.prototype, "meal_plan", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], UserRegisteredMealPlansPopulateSerialization.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealDaysPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealDaysPopulate))
], UserRegisteredMealPlansPopulateSerialization.prototype, "days", void 0);
class GetMyMealPlanSerialization {
}
exports.GetMyMealPlanSerialization = GetMyMealPlanSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], GetMyMealPlanSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], GetMyMealPlanSerialization.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: meal_planPopulate_serialization_1.ListMealPlanSerialization })
], GetMyMealPlanSerialization.prototype, "meal_plan", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "boolean" })
], GetMyMealPlanSerialization.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "days" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: [MealDaysPopulate] }),
    (0, class_transformer_1.Transform)(({ value }) => (0, serialize_1.serialize)(value, MealDaysPopulate))
], GetMyMealPlanSerialization.prototype, "days", void 0);
//# sourceMappingURL=user-registered-meal-planPopulate.serialization.js.map