import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
console.log(1);
// middlewares
app.use(morgan("dev")); 
console.log(1);

app.use(express.json()); // Parse JSON bodies
console.log(1);

app.use(cors()); // Use cors middleware to handle CORS issues
console.log(1);

// routes
app.use("/api/auth", authRoutes); // Activate authentication routes
app.use("/api/profiles", profileRoutes); // Activate profile routes
app.use("/api/admin", adminRoutes); // Activate admin routes


export default app;
