import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.set('strictQuery', true); 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
