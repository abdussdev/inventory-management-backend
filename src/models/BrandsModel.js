const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        Name: { type: String, unique: true },
    },
    { timestamps: true, versionKey: false }
);

const BrandsModel = mongoose.model("brands", BrandsSchema);
module.exports = BrandsModel;