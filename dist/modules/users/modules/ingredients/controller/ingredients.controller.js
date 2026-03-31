"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersIngredientsController = void 0;
const ingredients_service_1 = require("../services/ingredients.service");
const ingredient_serialization_1 = require("../../../../../common/serializers/ingredient.serialization");
const json_response_1 = require("../../../../../lib/responses/json-response");
const pagination_1 = require("../../../../../helpers/pagination");
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const serialize_1 = require("../../../../../helpers/serialize");
const controller_middleware_decorator_1 = require("../../../../../lib/decorators/controller-middleware.decorator");
const users_guard_1 = require("../../../../../modules/users/common/guards/users.guard");
const swagger_routes_decorator_1 = require("../../../../../lib/decorators/swagger-routes.decorator");
const swagger_response_decorator_1 = require("../../../../../lib/decorators/swagger-response.decorator");
const swagger_summary_decorator_1 = require("../../../../../lib/decorators/swagger-summary.decorator");
const swagger_description_decorator_1 = require("../../../../../lib/decorators/swagger-description.decorator");
const swagger_query_decorator_1 = require("../../../../../lib/decorators/swagger-query.decorator");
let UsersIngredientsController = class UsersIngredientsController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.ingredientsService = new ingredients_service_1.IngredientsService();
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            let filterName = req.query.filterName, filterVal = req.query.filterVal;
            let filter = { isDeleted: false };
            if (filterName && filterVal) {
                filter[`${filterName}`] = filterVal;
            }
            const { docs, paginationData } = yield this.ingredientsService.list(filter, paginationQuery);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, ingredient_serialization_1.IngredientSerialization),
                meta: paginationData,
            }, res);
        });
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const paginationQuery = (0, pagination_1.parsePaginationQuery)(req.query);
            let query = {};
            let searchTerm = req.query.searchTerm;
            let isNum = !isNaN(parseInt(String(searchTerm)));
            if (isNum) {
                query =
                    {
                        $or: [
                            { fats: { $eq: searchTerm } },
                            { proteins: { $eq: searchTerm } },
                            { proteins: { $eq: searchTerm } },
                            { carbs: { $eq: searchTerm } },
                            { calories: { $eq: searchTerm } },
                            { serving_size: { $eq: searchTerm } },
                            { servings_count: { $eq: searchTerm } }
                        ]
                    };
            }
            else {
                query = {
                    name: { $regex: searchTerm, $options: "i" }
                };
            }
            query = Object.assign(Object.assign({}, query), { isDeleted: false });
            const { docs, paginationData } = yield this.ingredientsService.search(query, paginationQuery);
            return json_response_1.JsonResponse.success({
                data: (0, serialize_1.serialize)(docs, ingredient_serialization_1.IngredientSerialization),
                meta: paginationData,
            }, res);
        });
    }
    setRoutes() {
        this.router.get("/", (0, async_handler_1.asyncHandler)(this.list));
        this.router.get("/search", (0, async_handler_1.asyncHandler)(this.search));
    }
};
exports.UsersIngredientsController = UsersIngredientsController;
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)(),
    (0, swagger_response_decorator_1.SwaggerResponse)([ingredient_serialization_1.IngredientSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("list ingredients"),
    (0, swagger_description_decorator_1.SwaggerDescription)("List all ingredients"),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
        filterName: "string",
        filterVal: "string"
    })
], UsersIngredientsController.prototype, "list", void 0);
__decorate([
    (0, swagger_routes_decorator_1.SwaggerGet)('/search'),
    (0, swagger_response_decorator_1.SwaggerResponse)([ingredient_serialization_1.IngredientSerialization]),
    (0, swagger_summary_decorator_1.SwaggerSummary)("Search for Ingredients"),
    (0, swagger_description_decorator_1.SwaggerDescription)("You can search for ingredients by entering characters or numbers."),
    (0, swagger_query_decorator_1.SwaggerQuery)({
        limit: "number",
        skip: "number",
        searchTerm: "string",
    })
], UsersIngredientsController.prototype, "search", void 0);
exports.UsersIngredientsController = UsersIngredientsController = __decorate([
    (0, controller_decorator_1.Controller)("/user/ingredients"),
    (0, controller_middleware_decorator_1.ControllerMiddleware)((0, users_guard_1.UsersGuardMiddleware)())
], UsersIngredientsController);
//# sourceMappingURL=ingredients.controller.js.map