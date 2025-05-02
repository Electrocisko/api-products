import multer from "multer";
import cloudinary from "../helpers/cloudinaryConfig.js";
import fs from "fs";

// Usamos multer con almacenamiento temporal
const upload = multer({ dest: "uploads/" });

const uploadToCloudinary = async (req, res, next) => {
    //if (!req.file) return res.status(400).json({ error: "No se envió ninguna imagen" });
  
  
    try {
        if (!req.file) {
           next()
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "mis_imagenes", // nombre de carpeta en tu Cloudinary
              });
          
              // Borramos el archivo temporal después de subir
              fs.unlinkSync(req.file.path);
          
              req.imageUrl = result.secure_url; // guardamos la URL para el siguiente middleware o controlador
              next()
        }
      
    } catch (err) {
      console.error("Error al subir a Cloudinary:", err);
      res.status(500).json({ error: "Falló la subida a Cloudinary" });
    }
  };
  
  export { upload, uploadToCloudinary };