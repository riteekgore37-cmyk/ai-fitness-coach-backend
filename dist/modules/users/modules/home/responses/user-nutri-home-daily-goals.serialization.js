"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNutriHomeDailyGoalsSerialization = void 0;
const swagger_response_property_decorator_1 = require("../../../../../lib/decorators/swagger-response-property.decorator");
const class_transformer_1 = require("class-transformer");
class UserNutriHomeDailyGoalsSerialization {
}
exports.UserNutriHomeDailyGoalsSerialization = UserNutriHomeDailyGoalsSerialization;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "waterGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "waterConsumed", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "stepsGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "stepsDone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "exercisesCals", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "exercisesHours", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "sleepGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserNutriHomeDailyGoalsSerialization.prototype, "sleepDone", void 0);
//# sourceMappingURL=user-nutri-home-daily-goals.serialization.js.map