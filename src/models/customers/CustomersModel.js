const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        CustomerName: { type: String },
        Email: { type: String },
        Phone: { type: String, unique: true },
        Address: { type: String },
    },
    { timestamps: true, versionKey: false }
);

const CustomersModel = mongoose.model("customers", DataSchema);
module.exports = CustomersModel;