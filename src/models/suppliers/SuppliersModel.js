const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        Name: { type: String },
        Address: { type: String },
        Email: { type: String },
        Phone: { type: String, unique: true },
    },
    { timestamps: true, versionKey: false }
);

const SuppliersModel = mongoose.model("suppliers", DataSchema);
module.exports = SuppliersModel;