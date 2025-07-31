import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

//Use to get all products
router.get("/", getProducts);
     
//Use to get a specific product
router.get("/:id", getProduct);

//Use to create a new product
router.post("/", createProduct);

//Use to update existing product
router.put("/:id", updateProduct);

//Use to delete existing product
router.put("/:id", deleteProduct);


export default router; //export the router
