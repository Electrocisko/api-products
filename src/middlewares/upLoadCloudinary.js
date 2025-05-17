import multer from "multer";
import cloudinary from "../helpers/cloudinaryConfig.js";
import fs from "fs";

// Usamos multer con almacenamiento temporal
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      req.imageurl =
        "https://res.cloudinary.com/dweiq6ibc/image/upload/v1747483072/no_image_hfce13.png";
      next();
    } else {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "ecommerce_products",
        transformation: [
          { width: 500, crop: "scale" },
          { fetch_format: "auto" },
          {quality: "auto"}
        ],
      };

      const result = await cloudinary.uploader.upload(req.file.path, options);
      // Borramos el archivo temporal después de subir
      fs.unlinkSync(req.file.path);

      req.imageurl = result.secure_url; // guardamos la URL para el siguiente middleware o controlador
      next();
    }
  } catch (err) {
    console.error("Error al subir a Cloudinary:", err);
    res.status(500).json({ error: "Falló la subida a Cloudinary" });
  }
};

export { upload, uploadToCloudinary };
