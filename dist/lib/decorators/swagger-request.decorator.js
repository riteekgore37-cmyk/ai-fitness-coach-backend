"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerRequest = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const parseToSchema = (schema, joiSchema) => {
    joiSchema = joiSchema.describe && joiSchema.describe().keys || joiSchema.keys || joiSchema;
    const properties = Object.getOwnPropertyNames(joiSchema);
    properties.forEach((property) => {
        const type = joiSchema[property].type;
        if (type === "array") {
            const at = joiSchema[property].items[0].type;
            // recursively parse array
            if (at === "object" || at === "array") {
                schema.properties[property] = {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {},
                    },
                };
                parseToSchema(schema.properties[property].items, joiSchema[property].items[0]);
            }
            else {
                schema.properties[property] = {
                    type: "array",
                    items: {
                        type: at,
                    },
                };
            }
        }
        else if (type === "object") {
            schema.properties[property] = {
                type: "object",
                properties: {},
            };
            parseToSchema(schema.properties[property], joiSchema[property]);
        }
        else {
            schema.properties[property] = { type };
        }
    });
};
const SwaggerRequest = (joiSchema) => {
    return (target, propertyKey) => {
        const schema = {
            type: "object",
            properties: {},
        };
        parseToSchema(schema, joiSchema);
        target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateRoute(target.constructor['targetName'], {
            propertyKey,
            request: schema,
        });
    };
};
exports.SwaggerRequest = SwaggerRequest;
//# sourceMappingURL=swagger-request.decorator.js.map