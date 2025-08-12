import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"; 
import path from "path";

import productRoutes from "./routes/productRoutes.js" 
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js"

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

//Apply rate limiting to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});


app.use("/api/products", productRoutes); // Use product routes for /api/products to access products

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})
};

app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});

//Initializing database connection
async function initDB() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
  
      console.log("Database initialized successfully");
    } catch (error) {
      console.log("Error initDB", error);
    }
  }
  
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  });