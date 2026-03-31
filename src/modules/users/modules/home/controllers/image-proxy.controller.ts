import { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { Controller } from "@lib/decorators/controller.decorator";

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

    if (!url.startsWith("https://v2.exercisedb.io/image/")) {
      res.status(400).json({ error: "Only v2.exercisedb.io image URLs are allowed" });
      return;
    }

    // Extract image ID from CDN URL
    // e.g. "https://v2.exercisedb.io/image/86856" → "86856"
    const imageId = url.split("/").pop();

    if (!imageId) {
      res.status(400).json({ error: "Could not parse image ID from url" });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000);

      let upstream: globalThis.Response;

      try {
        upstream = await fetch(`https://exercisedb.p.rapidapi.com/image/${imageId}`, {
          signal: controller.signal,
          headers: {
            "x-rapidapi-key": "4a9ebdd34emshc648b9a9e52a127p134e89jsn192c5cbea775",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!upstream.ok) {
        res.status(upstream.status).json({
          error: `Upstream image CDN returned ${upstream.status}`,
        });
        return;
      }

      const contentType = upstream.headers.get("content-type") || "image/gif";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");

      const arrayBuffer = await upstream.arrayBuffer();
      res.end(Buffer.from(arrayBuffer));

    } catch (err: any) {
      if (err?.name === "AbortError") {
        console.error("Image proxy timeout for:", url);
        res.status(504).json({ error: "Image fetch timed out" });
      } else {
        console.error("Image proxy error:", err);
        res.status(500).json({ error: "Failed to fetch image" });
      }
    }
  };
}
