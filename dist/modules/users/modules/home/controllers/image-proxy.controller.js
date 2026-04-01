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
exports.ImageProxyController = void 0;
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
            try {
                // Use the URL path as a stable public_id for caching
                const publicId = "exercisedb/" + url.replace(/https?:\/\/[^/]+\//, "").replace(/\//g, "_");
                // Check if already cached in Cloudinary
                let cachedUrl;
                try {
                    const result = yield cloudinary_1.v2.api.resource(publicId);
                    cachedUrl = result.secure_url;
                }
                catch (_a) {
                    // Not cached yet — upload from source URL
                    const uploaded = yield cloudinary_1.v2.uploader.upload(url, {
                        public_id: publicId,
                        resource_type: "image",
                        overwrite: false,
                    });
                    cachedUrl = uploaded.secure_url;
                }
                // Redirect to Cloudinary CDN — fast, globally cached
                res.redirect(302, cachedUrl);
            }
            catch (err) {
                console.error("Image proxy error:", err);
                res.status(500).json({ error: "Failed to fetch image" });
            }
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