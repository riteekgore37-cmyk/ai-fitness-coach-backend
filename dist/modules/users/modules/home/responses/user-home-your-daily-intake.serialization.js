"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHomeYourDailyIntakeSerialization = void 0;
const swagger_response_property_decorator_1 = require("../../../../../lib/decorators/swagger-response-property.decorator");
const class_transformer_1 = require("class-transformer");
class UserHomeYourDailyIntakeSerialization {
}
exports.UserHomeYourDailyIntakeSerialization = UserHomeYourDailyIntakeSerialization;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "caloriesGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "caloriesLeft", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "caloriesBurned", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "caloriesIntake", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "carbsGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "carbsConsumed", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "proteinGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "proteinConsumed", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "fatGoal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)('number')
], UserHomeYourDailyIntakeSerialization.prototype, "fatConsumed", void 0);
//# sourceMappingURL=user-home-your-daily-intake.serialization.js.map