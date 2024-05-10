import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import passport from "passport";

const app = express();
app.use(morgan("dev")); 
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Use cors middleware to handle CORS issues
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use("/api/auth", authRoutes); // Activate authentication routes
app.use("/api/profiles", profileRoutes); // Activate profile routes
app.use("/api/admin", adminRoutes); // Activate admin routes


export default app;