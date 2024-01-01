const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        TypeID: { type: mongoose.Schema.Types.ObjectId },
        Amount: { type: Number },
        Note: { type: String }
    },
    { timestamps: true, versionKey: false }
);

const ExpensesModel = mongoose.model("expenses", DataSchema);
module.exports = ExpensesModel;