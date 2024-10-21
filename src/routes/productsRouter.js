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
  deleteProductById,
  getOnsaleProducts,
  getMenProducts,
  getUniProducts,
  getWomenProducts

} from "../controllers/productsController.js";
import upLoader from "../middlewares/uploadImage.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/colors", getAllColors);
router.get("/sizes", getAllSizes);
router.get("/products/new", getNewProducts);
router.get("/products/top", getTopProducts);
router.get("/products/onsale",getOnsaleProducts);
router.get("/products/women",getWomenProducts);
router.get("/products/men",getMenProducts);
router.get("/products/uni",getUniProducts);
router.get("/product/:id", getProductById);

// private routes
router.post("/product", checkAuth, upLoader.single("imageurl"), createNewproduct);
router.post("/fullproduct", checkAuth, upLoader.single("imageurl"), addNewFullProduct);
router.post("/stock", checkAuth, upLoader.single("imageurl"), addStock);
router.delete("/product/:id",checkAuth, deleteProductById);

export default router;
