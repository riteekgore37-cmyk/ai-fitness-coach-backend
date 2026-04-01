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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProxyController = void 0;
const async_handler_1 = require("../../../../../helpers/async-handler");
const controller_base_1 = require("../../../../../lib/controllers/controller.base");
const controller_decorator_1 = require("../../../../../lib/decorators/controller.decorator");
const https = __importStar(require("https"));
const http = __importStar(require("http"));
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
            const requestOptions = {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                    "Accept": "image/gif,image/webp,image/apng,image/*,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Accept-Encoding": "identity",
                    "Referer": "https://exercisedb.io/",
                    "Origin": "https://exercisedb.io",
                    "Connection": "keep-alive",
                },
            };
            const makeRequest = (targetUrl, redirectCount = 0) => {
                if (redirectCount > 5) {
                    if (!res.headersSent)
                        res.status(502).json({ error: "Too many redirects" });
                    return;
                }
                const lib = targetUrl.startsWith("https") ? https : http;
                lib.get(targetUrl, requestOptions, (upstream) => {
                    var _a;
                    const statusCode = (_a = upstream.statusCode) !== null && _a !== void 0 ? _a : 0;
                    if ([301, 302, 307, 308].includes(statusCode) && upstream.headers.location) {
                        upstream.resume();
                        makeRequest(upstream.headers.location, redirectCount + 1);
                        return;
                    }
                    if (statusCode >= 400) {
                        upstream.resume();
                        if (!res.headersSent)
                            res.status(502).json({ error: `Upstream returned ${statusCode}` });
                        return;
                    }
                    res.setHeader("Content-Type", upstream.headers["content-type"] || "image/gif");
                    res.setHeader("Cache-Control", "public, max-age=2592000");
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    if (upstream.headers["content-length"]) {
                        res.setHeader("Content-Length", upstream.headers["content-length"]);
                    }
                    upstream.pipe(res);
                    upstream.on("error", (err) => {
                        if (!res.headersSent)
                            res.status(500).json({ error: "Stream failed" });
                    });
                }).on("error", (err) => {
                    if (!res.headersSent)
                        res.status(500).json({ error: "Failed to reach upstream" });
                });
            };
            makeRequest(url);
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