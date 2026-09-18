require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRouter = require("./router/contactRouter");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// -- Middlewares --
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -- Routes --
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "API is running..." });
});

app.use("/api/contact", contactRouter);

// -- 404 Handler --
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// -- Global Error Handler --
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// -- DB Connection + Server Start --
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

startServer();