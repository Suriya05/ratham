import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { register } from "./controllers/auth.js"; 
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import  sessionRoutes from "./routes/sessions.js";

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.post("/auth/register", register);

// Routes
app.use("/auth", authRoutes);
app.use("/sessions", verifyToken, sessionRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(`Failed to connect. ${error}`);
})

