import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

// middlewares
app.use(morgan("dev")); 
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Use cors middleware to handle CORS issues

// routes
app.use("/api/auth", authRoutes); // Activate authentication routes
app.use("/api/profiles", profileRoutes); // Activate profile routes
app.use("/api/admin", adminRoutes); // Activate admin routes


export default app;
