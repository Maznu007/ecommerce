import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file received" });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "profile_pictures",
      resource_type: "image",
    });

    return res.status(200).json({ url: uploadResponse.secure_url });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ 
      error: "Cloudinary upload failed",
      message: error.message 
    });
  }
}