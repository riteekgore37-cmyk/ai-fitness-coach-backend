import { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { Controller } from "@lib/decorators/controller.decorator";
import https from "https";

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
      url.startsWith("https://exercisedb.io/muscles/") ||
      url.startsWith("https://exercisedb.io/equipment/");

    if (!allowed) {
      res.status(400).json({ error: "URL not allowed" });
      return;
    }

    await new Promise<void>((resolve, reject) => {
      https.get(url, (upstream) => {
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
  };
}