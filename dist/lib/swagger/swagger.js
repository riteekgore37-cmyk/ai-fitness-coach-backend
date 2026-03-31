"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerRegistry = void 0;
const config_1 = require("../../configs/config");
/**
 * Swagger registry class.
 */
class SwaggerRegistry {
    constructor() {
        this.controllersRegistry = new Map();
        this.schemasRegistry = new Map();
    }
    initSchemaIfNotExists(schema) {
        if (!this.schemasRegistry.has(schema)) {
            this.schemasRegistry.set(schema, {
                properties: {},
                propertiesToExclude: [],
            });
        }
    }
    updateSchemaProperty(props) {
        this.initSchemaIfNotExists(props.schema);
        const data = this.schemasRegistry.get(props.schema);
        data.properties[props.newName || props.property] = { type: props.type };
        if (props.newName) {
            data.propertiesToExclude.push(props.property);
        }
        this.schemasRegistry.set(props.schema, data);
    }
    initControllerIfNotExists(controller, prefix = "") {
        if (!this.controllersRegistry.has(controller)) {
            this.controllersRegistry.set(controller, {
                routes: [],
                prefix,
            });
        }
    }
    setControllerPrefix(controller, prefix) {
        this.initControllerIfNotExists(controller);
        const data = this.controllersRegistry.get(controller);
        data.prefix = prefix;
        this.controllersRegistry.set(controller, data);
    }
    updateRoute(controller, params) {
        this.initControllerIfNotExists(controller);
        const data = this.controllersRegistry.get(controller);
        // delete undefined keys
        Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
        const route = data.routes.find((route) => route.propertyKey === params.propertyKey);
        if (route) {
            Object.assign(route, params);
        }
        else {
            data.routes.push(params);
        }
        this.controllersRegistry.set(controller, data);
    }
    setControllerTags(controller, tags) {
        this.initControllerIfNotExists(controller);
        const data = this.controllersRegistry.get(controller);
        data.tags = tags;
        this.controllersRegistry.set(controller, data);
    }
    generateSwaggerDocument() {
        const paths = {};
        this.controllersRegistry.forEach((value) => {
            const controllerData = value;
            controllerData.routes.forEach((route) => {
                route.path = `/api/v1${controllerData.prefix}${route.path}`;
                // convert :param to {param}
                route.path = route.path.replace(/:(\w+)/g, "{$1}");
                const params = route.path.match(/{(\w+)}/g);
                if (!paths[route.path]) {
                    paths[route.path] = {};
                }
                paths[route.path][route.method] = {
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    tags: [...(controllerData.tags || []), ...(route.tags || [])],
                    summary: route.summary,
                    description: route.description,
                    parameters: [
                        ...((params &&
                            params.map((param) => {
                                return {
                                    name: param.replace(/{|}/g, ""),
                                    in: "path",
                                    required: true,
                                    schema: {
                                        type: "string",
                                    },
                                };
                            })) ||
                            []),
                        ...(route.queryParams || []),
                    ],
                    responses: {
                        200: {
                            description: "Success",
                            content: {
                                "application/json": {
                                    schema: route.response,
                                },
                            },
                        },
                    },
                };
                if (route.request) {
                    paths[route.path][route.method].requestBody = {
                        content: {
                            "application/json": {
                                schema: route.request,
                            },
                        },
                    };
                }
            });
        });
        const document = {
            openapi: "3.0.0",
            info: {
                title: "AI Fitness Coach API Documentation",
                version: "1.0.0",
                description: "Look! Docs!",
            },
            servers: [
                {
                    url: config_1.config.swaggerServer || `${config_1.config.host}:${config_1.config.port}`,
                },
            ],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            paths,
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        };
        //console.log(JSON.stringify(document, null, 2));
        return document;
    }
}
exports.swaggerRegistry = new SwaggerRegistry();
//# sourceMappingURL=swagger.js.map