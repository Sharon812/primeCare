import cloudinary from "../../config/cloudinary-config.js";
import AppError from "../../utils/custom-error.js";

class CloudinaryService {
  constructor() {}

  async uploadImage(file) {
    try {
      const result = cloudinary.uploader.upload_stream({
        folder: "doctors",
        resource_type: "image",
      },
      (error, result) =>{
        if(error) throw new AppError("Failed to upload image to Cloudinary");
        return result.secure_url; 
      }
    ).end(file.buffer);

    return result;
    } catch (error) {
      console.log("Cloudinary Service Error: ", error);
      throw new AppError("Failed to upload image to Cloudinary");
    }
  }
}

export default CloudinaryService;