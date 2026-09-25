const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        desc: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        icon: {
            type: String,
            required: [true, "Icon key is required"],
            trim: true,
        },
        href: {
            type: String,
            required: [],
            trim: true,
            default: "#",
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);