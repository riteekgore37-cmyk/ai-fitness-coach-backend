"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerResponseProperty = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const SwaggerResponseProperty = (props) => {
    if (typeof props === "string") {
        return (target, propertyKey) => {
            target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
            swagger_1.swaggerRegistry.updateSchemaProperty({
                schema: target.constructor['targetName'],
                property: propertyKey,
                type: props,
            });
        };
    }
    return (target, propertyKey) => {
        target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateSchemaProperty({
            schema: target.constructor['targetName'],
            property: propertyKey,
            newName: props === null || props === void 0 ? void 0 : props.name,
            type: props === null || props === void 0 ? void 0 : props.type,
        });
    };
};
exports.SwaggerResponseProperty = SwaggerResponseProperty;
//# sourceMappingURL=swagger-response-property.decorator.js.map