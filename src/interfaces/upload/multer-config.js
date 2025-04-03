import multer from "multer";
import path from "path";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedExtensions.includes(ext) &&
    allowedMimeTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type! Only PNG, JPG, JPEG, WEBP are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

export default upload;
