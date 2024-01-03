const mongoose = require("mongoose"); 

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        SupplierID: { type: mongoose.Schema.Types.ObjectId },
        VatTax: { type: String },
        Discount: { type: String },
        OtherCost: { type: String },
        ShippingCost: { type: String },
        GrandTotal: { type: String },
        Note: { type: String },
    },
    { timestamps: true, versionKey: false }
);

const PurchasesModel = mongoose.model("purchases", DataSchema);
module.exports = PurchasesModel;