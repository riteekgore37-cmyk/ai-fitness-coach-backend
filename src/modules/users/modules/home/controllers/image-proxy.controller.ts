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

    const allowed =
      url.startsWith("https://v2.exercisedb.io/image/") ||
      url.startsWith("https://exercisedb.io/muscles/") ||
      url.startsWith("https://exercisedb.io/equipment/");

    if (!allowed) {
      res.status(400).json({ error: "URL not allowed" });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000);

      let upstream: globalThis.Response;

      try {
        upstream = await fetch(url, {
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
      } finally {
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