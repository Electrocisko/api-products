import express from "express";
import {
  getAllProducts,
  getNewProducts,
  getTopProducts,
  getProductById,
  createNewproduct,
  getAllColors,
  getAllSizes,
  addStock,
  addNewFullProduct,
  deleteProductById
} from "../controllers/productsController.js";
import upLoader from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/colors", getAllColors);
router.get("/sizes", getAllSizes);
router.get("/products/new", getNewProducts);
router.get("/products/top", getTopProducts);
router.get("/product/:id", getProductById);
router.post("/product", upLoader.single("imageurl"), createNewproduct);
router.post("/fullproduct", upLoader.single("imageurl"), addNewFullProduct);
router.post("/stock", addStock);
router.delete("/product/:id", deleteProductById);

export default router;
