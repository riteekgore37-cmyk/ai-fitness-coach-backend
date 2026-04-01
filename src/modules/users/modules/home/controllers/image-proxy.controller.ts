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

    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://exercisedb.io/",
      },
    };

    await new Promise<void>((resolve) => {
      https.get(url, options, (upstream) => {
        if (!upstream.statusCode || upstream.statusCode >= 400) {
          console.error(`Upstream returned ${upstream.statusCode} for ${url}`);
          res.status(502).json({ error: `Upstream error: ${upstream.statusCode}` });
          upstream.resume();
          return resolve();
        }
        res.setHeader("Content-Type", upstream.headers["content-type"] || "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=604800");
        res.setHeader("Access-Control-Allow-Origin", "*");
        upstream.pipe(res);
        upstream.on("end", resolve);
        upstream.on("error", (err) => {
          console.error("Upstream stream error:", err);
          resolve();
        });
      }).on("error", (err) => {
        console.error("Image proxy fetch error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to fetch image" });
        }
        resolve();
      });
    });
  };
}