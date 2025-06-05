/**
 * index.js
 * Auth API Backend Entry Point
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


// Load environment variables from .env file
dotenv.config();

// Import routers
const authRouter = require("./routes/authRouters");

// Constants
const PORT = process.env.PORT || 8000;

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./swagger.yml');


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check route
app.get("/", (req, res) => {
    res.send("Auth API Backend Running");
});

// API routes
app.use("/auth", authRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});