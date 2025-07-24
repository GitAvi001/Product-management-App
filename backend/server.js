import express from "express" 
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv" 

dotenv.config() // Load environment variables from .env file

const app = express();

const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

console.log(PORT)

app.use(express.json()) // to parse JSON bodies in requests
app.use(cors()) // to enable CORS for all routes
//helmet use to check the security of the application with setting multiple headers
app.use(helmet())

//morgan helps to check logs of the requests 
app.use(morgan("dev"))

app.get("/", (req, res) => {
    console.log(res.getHeaders())
    res.send("Hello! This message from backend")
})

app.get("/route1", (req, res) => {
    console.log(res.getHeaders())
    res.send("Hello! This message from route named route1")
})

app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});

