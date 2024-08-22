import express from 'express';
import {getAllProducts, getNewProducts, getTopProducts, getProductById} from '../controllers/productsController.js';

const router = express.Router();

router.get("/products", getAllProducts );
router.get("/products/new",getNewProducts);
router.get("/products/top", getTopProducts);
router.get("/product/:id", getProductById)


export default router;