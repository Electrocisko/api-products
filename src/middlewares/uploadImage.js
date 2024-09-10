import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = dirname(fileURLToPath(import.meta.url));
import path from "path";

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

export default upLoader;

