import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routers/auth.router.js";

const app = express();
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
app.use("/api/sign-up", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.json({
    success: false,
    errorMessage,
    statusCode,
  });
});
