// <---- Load environment variables ---->
import dotenv from "dotenv";
dotenv.config();

// <---- External dependencies ---->
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// <---- Internal config files ---->
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// <---- Routers ---->
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// <---- App Config ---->
const app = express();
const port = process.env.PORT || 3000;

// Trust proxy (for Render, Railway, Nginx, etc.)
app.set("trust proxy", 1);

// <---- Middleware ---->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*",
        credentials: true,
    })
);

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
});

// Apply limiter only to API routes
app.use("/api", limiter);

// <---- Routes ---->
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running",
    });
});

// <---- Start Server ---->
const startServer = async () => {
    try {
        await connectDB();
        connectCloudinary();

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();