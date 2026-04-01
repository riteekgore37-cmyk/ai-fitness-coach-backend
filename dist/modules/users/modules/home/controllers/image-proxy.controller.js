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
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);
                let upstream;
                try {
                    upstream = yield fetch(url, {
                        signal: controller.signal,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Referer": "https://exercisedb.io/",
                            "Origin": "https://exercisedb.io",
                            "Sec-Fetch-Dest": "image",
                            "Sec-Fetch-Mode": "no-cors",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Cache-Control": "no-cache",
                            "Pragma": "no-cache",
                        },
                    });
                }
                finally {
                    clearTimeout(timeoutId);
                }
                if (!upstream.ok) {
                    res.status(upstream.status).json({
                        error: `Upstream returned ${upstream.status}`,
                    });
                    return;
                }
                const contentType = upstream.headers.get("content-type") || "image/gif";
                res.setHeader("Content-Type", contentType);
                res.setHeader("Cache-Control", "public, max-age=86400");
                const arrayBuffer = yield upstream.arrayBuffer();
                res.end(Buffer.from(arrayBuffer));
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.name) === "AbortError") {
                    console.error("Image proxy timeout for:", url);
                    res.status(504).json({ error: "Image fetch timed out" });
                }
                else {
                    console.error("Image proxy error:", err);
                    res.status(500).json({ error: "Failed to fetch image" });
                }
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