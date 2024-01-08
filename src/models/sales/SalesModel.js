const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        CustomerID: { type: mongoose.Schema.Types.ObjectId },
        VatTax: { type: String },
        Discount: { type: String },
        OtherCost: { type: String },
        ShippingCost: { type: String },
        GrandTotal: { type: String },
        Note: { type: String },
    },
    { timestamps: true, versionKey: false }
);

const SalesModel = mongoose.model("sales", DataSchema);
module.exports = SalesModel;