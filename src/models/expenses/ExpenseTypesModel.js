const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        Name: { type: String, unique: true }
    },
    { timestamps: true, versionKey: false }
);

const ExpenseTypesModel = mongoose.model("expenses", DataSchema);
module.exports = ExpenseTypesModel;