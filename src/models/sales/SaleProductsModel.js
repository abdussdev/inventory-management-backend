const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        UserEmail: { type: String },
        SaleID: { type: mongoose.Schema.Types.ObjectId },
        ProductID: { type: mongoose.Schema.Types.ObjectId },
        Cty: { type: String },
        UnitCost: { type: String },
        Total: { type: String }
    },
    { timestamps: true, versionKey: false }
);

const SaleProductsModel = mongoose.model("saleproducts", DataSchema);
module.exports = SaleProductsModel;