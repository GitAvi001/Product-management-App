import {sql} from "../config/db.js"; 

//Business logic to retrieve all products
export const getProducts = async(req, res) => {
try{
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;

    //Returning all data according to the sql query in json format
    console.log("Products fetched successfully",products) 
    res.status(200).json({success:true, data:products})
} catch (error){
    console.log("Error fetching products", error);

    //server crashes message if data cannot get fetched
    res.status(500).json({success:false, message:"Server error while fetching products"});
}

};

//Business logic to retrieve a specific product
export const getProduct = async(req, res) => {

    //destructuring {id}
    const {id} = req.params

    try{
        const product = await sql`
        
        --- This query retrieves a single product by its given ID
        SELECT * FROM products WHERE id = ${id}
        `;

        res.status(200).json({success:true, data:product[0]}); // product[0] returns a single expected product

    }catch(error){
        console.log("Error fetching single product", error);
        res.status(500).json({success:false, message:"Server error while fetching a single product"});
    }
};

//Business logic to create a new product
export const createProduct = async(req, res) => {

    //app.use() in server.js allows to destructure data from the request body
    const {name,price,image} = req.body;

    //if the user never send any of the following data returns the 400 error
    if(!name || !price || !image){
        return res.status(400).json({success:false, message:"Please provide all required fields"});
    }

    try{
        
        const newProduct=await sql`
        
        INSERT INTO products (name, price, image)
        VALUES (${name}, ${price}, ${image})
        RETURNING *;  -- This will return the newly created product
        `
        console.log("New Product added successfully", newProduct) ;
        
        res.status(201).json({success: true, data: newProduct[0]})

    }catch(error){

        console.log("Error creating product function", error);
        
        res.status(500).json({success:false, message:"Server error while creating product"});
    }


};

//Business logic to update product
export const updateProduct = async(req, res) => {

    const { id } = req.params;
    const { name, price, image } = req.body;
  
    try {
      const updateProduct = await sql`
        UPDATE products
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
      `;
  
      if (updateProduct.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.status(200).json({ success: true, data: updateProduct[0] });
    } catch (error) {
      console.log("Error in updateProduct function", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};

//Business logic to delete a product
export const deleteProduct = async(req, res) => {

    const { id } = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products WHERE id=${id} RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

};