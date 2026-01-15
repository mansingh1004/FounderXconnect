// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Routes
// const userRoute = require("./routes/userRoute");

// const PORT = process.env.PORT || 8000;

// // ❌ REMOVE body-parser (Express already has it)
// // const bodyParser = require("body-parser");

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Check DB connection string
// if (!process.env.DBCON) {
//     console.error("❌ DBCON not found in .env file");
//     process.exit(1);
// }

// // ✅ MongoDB Connection
// mongoose.connect(process.env.DBCON)
//     .then(() => {
//         console.log(" Database successfully connected");
//     })
//     .catch((err) => {
//         console.error(" MongoDB connection error:", err.message);
//         process.exit(1);
//     });

// // ✅ Routes
// app.use("/user", userRoute);

// // ✅ Server
// app.listen(PORT, () => {
//     console.log(` Server running on port ${PORT}`);
// });













import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"; // ✅ Added .js extension

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Check DB connection string
if (!process.env.DBCON) {
    console.error("❌ DBCON not found in .env file");
    process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(process.env.DBCON)
    .then(() => {
        console.log(" Database successfully connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// ✅ Routes
app.use("/user", userRoute);

// ✅ Server
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});