import { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { Controller } from "@lib/decorators/controller.decorator";
import * as https from "https";
import * as http from "http";

@Controller("/proxy")
export class ImageProxyController extends BaseController {

  setRoutes(): void {
    this.router.get("/image", asyncHandler(this.proxyImage));
  }

  proxyImage = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.query as { url?: string };

    if (!url) {
      res.status(400).json({ error: "url query param is required" });
      return;
    }

    const allowed =
      url.startsWith("https://v2.exercisedb.io/image/") ||
      url.startsWith("https://exercisedb.io/muscles/")  ||
      url.startsWith("https://exercisedb.io/equipment/");

    if (!allowed) {
      res.status(400).json({ error: "URL not allowed" });
      return;
    }

    const requestOptions: https.RequestOptions = {
      headers: {
        "User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept":          "image/gif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Referer":         "https://exercisedb.io/",
        "Origin":          "https://exercisedb.io",
        "Connection":      "keep-alive",
      },
    };

    const makeRequest = (targetUrl: string, redirectCount: number = 0): void => {
      if (redirectCount > 5) {
        if (!res.headersSent) res.status(502).json({ error: "Too many redirects" });
        return;
      }
      const lib = targetUrl.startsWith("https") ? https : http;
      lib.get(targetUrl, requestOptions, (upstream) => {
        const statusCode = upstream.statusCode ?? 0;
        if ([301, 302, 307, 308].includes(statusCode) && upstream.headers.location) {
          upstream.resume();
          makeRequest(upstream.headers.location, redirectCount + 1);
          return;
        }
        if (statusCode >= 400) {
          upstream.resume();
          if (!res.headersSent) res.status(502).json({ error: `Upstream returned ${statusCode}` });
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
          if (!res.headersSent) res.status(500).json({ error: "Stream failed" });
        });
      }).on("error", (err) => {
        if (!res.headersSent) res.status(500).json({ error: "Failed to reach upstream" });
      });
    };

    makeRequest(url);
  };
}