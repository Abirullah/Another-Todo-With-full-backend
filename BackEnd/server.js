import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Load environment from the working directory's .env by default
dotenv.config();
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Todo API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
