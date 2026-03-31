"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerResponse = void 0;
const swagger_1 = require("../swagger/swagger");
const calling_file_helper_1 = require("../utils/calling-file.helper");
const class_transformer_1 = require("class-transformer");
const responseToSwaggerSchema = (response) => {
    const isClass = typeof response === "function";
    const responseName = (isClass && response.prototype.constructor['targetName']) || undefined;
    const responseData = swagger_1.swaggerRegistry.schemasRegistry.get(responseName);
    // turn class to swagger schema
    const schema = {
        type: "object",
        properties: (isClass && (responseData === null || responseData === void 0 ? void 0 : responseData.properties)) || {},
    };
    // get class properties
    let properties = [];
    let instance;
    try {
        instance = new response();
        properties = Object.getOwnPropertyNames((0, class_transformer_1.instanceToPlain)(instance));
    }
    catch (e) {
        instance = response;
        properties = Object.getOwnPropertyNames(instance);
    }
    if (responseData === null || responseData === void 0 ? void 0 : responseData.propertiesToExclude) {
        properties = properties.filter((property) => !responseData.propertiesToExclude.includes(property));
    }
    properties.forEach((property) => {
        var _a, _b, _c;
        if (!schema.properties[property] && !(responseData === null || responseData === void 0 ? void 0 : responseData.properties)) {
            schema.properties[property] = {
                type: (instance[property] && typeof instance[property]) || "string",
            };
        }
        if (schema.properties[property] && !schema.properties[property].type) {
            schema.properties[property].type =
                (instance[property] && typeof instance[property]) || "string";
        }
        if (Array.isArray((_a = schema.properties[property]) === null || _a === void 0 ? void 0 : _a.type)) {
            const isTypeObjectOrClass = typeof schema.properties[property].type[0] === "function" ||
                typeof schema.properties[property].type[0] === "object";
            if (isTypeObjectOrClass) {
                schema.properties[property].items = responseToSwaggerSchema(schema.properties[property].type[0]);
                schema.properties[property].type = "array";
            }
            else {
                if (Array.isArray(schema.properties[property].type[0])) {
                    schema.properties[property].enum = schema.properties[property].type[0];
                    schema.properties[property].type = "string";
                }
                else {
                    schema.properties[property].items = {
                        type: schema.properties[property].type[0],
                    };
                    schema.properties[property].type = "array";
                }
            }
        }
        if (typeof ((_b = schema.properties[property]) === null || _b === void 0 ? void 0 : _b.type) === "function" ||
            typeof ((_c = schema.properties[property]) === null || _c === void 0 ? void 0 : _c.type) === "object") {
            schema.properties[property] = responseToSwaggerSchema(schema.properties[property].type);
        }
    });
    return schema;
};
const SwaggerResponse = (responseClass) => {
    return (target, propertyKey) => {
        const isArray = Array.isArray(responseClass);
        responseClass = isArray ? responseClass[0] : responseClass;
        // turn class to swagger schema
        const schema = responseToSwaggerSchema(responseClass);
        // add standard response schema
        const standardResponseSchema = {
            type: "object",
            properties: {
                data: schema,
                message: {
                    type: "string",
                },
                status: {
                    type: "number",
                },
            },
        };
        // set schema type to array if response is array
        if (isArray) {
            schema.type = "array";
            schema.items = {
                type: "object",
                properties: schema.properties,
            };
        }
        // add meta for array response
        if (isArray) {
            standardResponseSchema.properties.meta = {
                type: "object",
                properties: {
                    total: {
                        type: "number",
                    },
                    page: {
                        type: "number",
                    },
                    limit: {
                        type: "number",
                    },
                },
            };
        }
        target.constructor['targetName'] = target.constructor.name + (0, calling_file_helper_1.getCallingFileName)();
        swagger_1.swaggerRegistry.updateRoute(target.constructor['targetName'], {
            propertyKey,
            response: standardResponseSchema,
        });
    };
};
exports.SwaggerResponse = SwaggerResponse;
//# sourceMappingURL=swagger-response.decorator.js.map