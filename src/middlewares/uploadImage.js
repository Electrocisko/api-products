import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = dirname(fileURLToPath(import.meta.url));
import path from "path";
import cloudinary from "../helpers/cloudinaryConfig.js";


const __dirname = path.join(dirname(__filename));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,__dirname+ "/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upLoader = multer({ storage });

// const uploadCloud = async () => {
//   const uploadResult = await cloudinary.uploader.upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//       public_id: 'shoes',
//   }
//   ).catch( (error) => {
//     console.log(error);
//   }
//   )
//   console.log(uploadResult);
// }

// uploadCloud();


export default upLoader;

