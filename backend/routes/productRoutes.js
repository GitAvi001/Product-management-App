import express from "express";
import { getAllProducts,createProduct } from "../controllers/productController";

const router = express.Router();

router.get("/", getAllProducts => {
     
//Use to get all products

});

router.post("/", createProduct => {

    //Use to create a new product
});

