import { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { Controller } from "@lib/decorators/controller.decorator";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      // Use the URL path as a stable public_id for caching
      const publicId = "exercisedb/" + url.replace(/https?:\/\/[^/]+\//, "").replace(/\//g, "_");

      // Check if already cached in Cloudinary
      let cachedUrl: string;
      try {
        const result = await cloudinary.api.resource(publicId);
        cachedUrl = result.secure_url;
      } catch {
        // Not cached yet — upload from source URL
        const uploaded = await cloudinary.uploader.upload(url, {
          public_id: publicId,
          resource_type: "image",
          overwrite: false,
        });
        cachedUrl = uploaded.secure_url;
      }

      // Redirect to Cloudinary CDN — fast, globally cached
      res.redirect(302, cachedUrl);

    } catch (err: any) {
      console.error("Image proxy error:", err);
      res.status(500).json({ error: "Failed to fetch image" });
    }
  };
}