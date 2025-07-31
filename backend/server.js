import express from "express" 
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv" 

import productRoutes from "./routes/productRoutes.js" 


dotenv.config() // Load environment variables from .env file

const app = express();

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

console.log(PORT)

app.use(express.json()) // Parse JSON bodies in requests
app.use(cors()) // Enable CORS for all routes
//helmet use to check the security of the application with setting multiple headers
app.use(helmet())

//morgan helps to check logs of the requests 
app.use(morgan("dev"))

app.get("/", (req, res) => {
    console.log(res.getHeaders())
    res.send("Hello! This message from backend")
})

app.use("/api/products", productRoutes); // Use product routes for /api/products to access products

app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});

//Initializing database connection
async function initDB(){

    try{

        await sql`
        
        CREATE TABLE IF NOT EXISTS products (

            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            )
        `;

        console.log("Database initialized successfully");

    }catch(error){
        console.log("Error when initializing the database:", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port "+PORT);
    });
});