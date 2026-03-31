"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppRoutes = void 0;
const express_1 = require("express");
const glob = __importStar(require("glob"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const controller_base_1 = require("./lib/controllers/controller.base");
const validation_helper_1 = require("./helpers/validation.helper");
const json_response_1 = require("./lib/responses/json-response");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const swagger_1 = require("./lib/swagger/swagger");
/**
 * Sets the routes for the Express app.
 *
 * @param app - The Express app.
 */
const setAppRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const mainRouter = (0, express_1.Router)();
    yield importControllers(mainRouter);
    yield setCustomRoutes(mainRouter);
    app.use("/api/v1", mainRouter);
});
exports.setAppRoutes = setAppRoutes;
/* custom routes */
/**
 * Sets custom routes for the router.
 *
 * @param router - The router object to set the routes on.
 */
const setCustomRoutes = (router) => __awaiter(void 0, void 0, void 0, function* () {
    // Health check route
    router.get("/health", (_req, res) => {
        json_response_1.JsonResponse.success({
            message: "Server is up!",
            data: { success: true },
        }, res);
    });
    // Validation error handler
    router.use(validation_helper_1.validationErrorHandler);
    // docs
    router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerRegistry.generateSwaggerDocument(), {
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "API Documentation",
        swaggerOptions: {
            layout: "StandaloneLayout",
            deepLinking: true,
            docExpansion: "none",
            filter: true,
            tagsSorter: "alpha",
            operationsSorter: "alpha",
            showMutatedRequest: true,
            showMutatedResponse: true,
            showRequestDuration: true,
            persistAuthorization: true,
            displayRequestDuration: true,
            withCredentials: true,
        },
    }));
    // Invalid URL handler
    router.all("*", (req, res) => {
        json_response_1.JsonResponse.error({
            error: "Invalid URL!",
            status: 404,
        }, res);
    });
    // Error handler
    router.use(error_handler_middleware_1.errorHandlerMiddleware);
});
/* importing all controllers */
/**
 * Finds all controller files in the project.
 * @returns An array of strings representing the absolute paths of the controller files.
 */
const findControllerFiles = () => {
    const controllersPath = path_1.default
        .relative(process.cwd(), path_1.default.join(__dirname, "**/*.controller.{ts,js}"))
        .replace(/\\/g, "/");
    return glob.sync(controllersPath, {}).map((file) => {
        return path_1.default.resolve(file);
    });
};
/**
 * Imports controller classes from files, sets up routes for each controller,
 * and adds them to the provided router.
 *
 * @param router - The router to add the routes to.
 */
const importControllers = (router) => __awaiter(void 0, void 0, void 0, function* () {
    const files = findControllerFiles();
    console.log("importing controllers...");
    yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const controllerClass = yield importController(file);
        if (!controllerClass)
            return;
        const controller = new controllerClass();
        controller.setRoutes();
        router.use(controller.prefix, controller.router);
    })));
    console.log("controllers imported!");
});
/**
 * Imports a module from a file and returns the first controller that extends BaseController.
 * @param file - The path to the file containing the module.
 * @returns The first controller that extends BaseController.
 */
const importController = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const controllers = Object.values(yield Promise.resolve(`${file}`).then(s => __importStar(require(s))));
    return controllers.find((controller) => controller.prototype instanceof controller_base_1.BaseController);
});
//# sourceMappingURL=routes.js.map