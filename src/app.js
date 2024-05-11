import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import passport from "passport";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import session from "express-session";
import indexRoutes from './routes/index.js';


const app = express();
import dotenv from 'dotenv';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

dotenv.config({ path: require.resolve('./config/config.env') });
console.log("path", require.resolve('./config/config.env') );

// Debugging
console.log('Environment:', process.env.JWT_SECRET_KEY);

// Add express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(morgan("dev")); 
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Use cors middleware to handle CORS issues

app.use(passport.initialize())
app.use(passport.session())


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');



// routes
app.use("/api/auth", authRoutes); // Activate authentication routes
app.use("/api/profiles", profileRoutes); // Activate profile routes
app.use("/api/admin", adminRoutes); // Activate admin routes


app.use(indexRoutes);
app.use('/auth', googleAuthRoutes);

export default app;