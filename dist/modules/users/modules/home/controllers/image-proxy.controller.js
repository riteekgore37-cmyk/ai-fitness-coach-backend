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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProxyController = void 0;
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const https_1 = __importDefault(require("https"));
let ImageProxyController = class ImageProxyController extends controller_base_1.BaseController {
    constructor() {
        super(...arguments);
        this.proxyImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.query;
            if (!url) {
                res.status(400).json({ error: "url query param is required" });
                return;
            }
            const allowed = url.startsWith("https://v2.exercisedb.io/image/") ||
                url.startsWith("https://exercisedb.io/muscles/") ||
                url.startsWith("https://exercisedb.io/equipment/");
            if (!allowed) {
                res.status(400).json({ error: "URL not allowed" });
                return;
            }
            yield new Promise((resolve, reject) => {
                https_1.default.get(url, (upstream) => {
                    if (!upstream.statusCode || upstream.statusCode >= 400) {
                        res.status(502).json({ error: "Upstream error" });
                        upstream.resume();
                        return resolve();
                    }
                    res.setHeader("Content-Type", upstream.headers["content-type"] || "image/jpeg");
                    res.setHeader("Cache-Control", "public, max-age=604800"); // 7-day browser cache
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    upstream.pipe(res);
                    upstream.on("end", resolve);
                    upstream.on("error", reject);
                }).on("error", (err) => {
                    console.error("Image proxy error:", err);
                    res.status(500).json({ error: "Failed to fetch image" });
                    resolve();
                });
            });
        });
    }
    setRoutes() {
        this.router.get("/image", (0, async_handler_1.asyncHandler)(this.proxyImage));
    }
};
exports.ImageProxyController = ImageProxyController;
exports.ImageProxyController = ImageProxyController = __decorate([
    (0, controller_decorator_1.Controller)("/proxy")
], ImageProxyController);
//# sourceMappingURL=image-proxy.controller.js.map