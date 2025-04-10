import cloudinary from "../../config/cloudinary-config.js";
import AppError from "../../utils/custom-error.js";

class CloudinaryService {
  constructor() {}

  async uploadImage(fileBuffer) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "doctors",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(new AppError("Failed to upload image to Cloudinary"));
          }
          resolve(result.secure_url);
        }
      );

      uploadStream.end(fileBuffer);
    });
  }
}

export default CloudinaryService;
