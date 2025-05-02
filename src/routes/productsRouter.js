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
  getWomenProducts,
  addNewColorToProduct,
  modifiedStockById,
  getFilteredProducts,
  queryParamsProducts

} from "../controllers/productsController.js";
import upLoader from "../middlewares/uploadImage.js";
import checkAuth from "../middlewares/checkAuth.js";

import {upload, uploadToCloudinary} from "../middlewares/upLoadCloudinary.js"

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/colors", getAllColors);
router.get("/sizes", getAllSizes);
router.get("/products/new", getNewProducts);
router.get("/products/top", getTopProducts);
router.get("/products/onsale",getOnsaleProducts);
router.get("/products/women",getWomenProducts);
router.get("/products/men",getMenProducts);
router.get("/products/filter",getFilteredProducts);
router.get("/products/uni",getUniProducts);
router.get("/product/:id", getProductById);
router.get("/products/querys/",queryParamsProducts)

// private routes
router.post("/product",checkAuth, upload.single("imageurl"), uploadToCloudinary, createNewproduct);
router.post("/fullproduct", checkAuth,  upload.single("imageurl"), uploadToCloudinary, addNewFullProduct);
router.post("/stock", checkAuth,  upload.single("imageurl"), uploadToCloudinary, addStock);
router.post("/addcolor",checkAuth,   upload.single("imageurl"), uploadToCloudinary, addNewColorToProduct);
router.put("/products/updatestock",checkAuth, modifiedStockById);
router.delete("/product/:id",checkAuth, deleteProductById);

export default router;
