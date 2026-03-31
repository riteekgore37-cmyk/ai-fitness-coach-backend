"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSerialization = void 0;
const swagger_response_property_decorator_1 = require("../../lib/decorators/swagger-response-property.decorator");
const class_transformer_1 = require("class-transformer");
class EquipmentSerialization {
}
exports.EquipmentSerialization = EquipmentSerialization;
__decorate([
    (0, class_transformer_1.Expose)({ name: "_id" }),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], EquipmentSerialization.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], EquipmentSerialization.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_response_property_decorator_1.SwaggerResponseProperty)({ type: "string" })
], EquipmentSerialization.prototype, "image", void 0);
//# sourceMappingURL=muscle.serialization.js.map