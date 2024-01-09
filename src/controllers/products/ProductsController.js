const DataModel = require("../../models/products/ProductsModel");
const SaleProductsModel = require("../../models/sales/SaleProductsModel");
const ReturnProductsModel = require("../../models/returns/ReturnProductsModel");
const PurchaseProductsModel = require("../../models/purchases/PurchaseProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const DeleteService = require("../../services/common/DeleteService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const mongoose = require("mongoose");

exports.CreateProduct = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateProduct = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.ProductsList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let JoinStage1 = { $lookup: { from: "brands", localField: "BrandID", foreignField: "_id", as: "brands" } }
    let JoinStage2 = { $lookup: { from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories" } }

    let SearchArray = [{ Name: SearchRgx }, { Details: SearchRgx }, { 'brands.Name': SearchRgx }, { 'categories.Name': SearchRgx }]

    let result = await ListTwoJoinService(req, DataModel, SearchArray, JoinStage1, JoinStage2)
    res.status(200).json(result)
};


exports.DeleteProduct = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    let CheckSaleAssociate = await CheckAssociateService({ ProductID: new ObjectId(DeleteID) }, SaleProductsModel);
    let CheckReturnAssociate = await CheckAssociateService({ ProductID: new ObjectId(DeleteID) }, ReturnProductsModel);
    let CheckPurchaseAssociate = await CheckAssociateService({ ProductID: new ObjectId(DeleteID) }, PurchaseProductsModel);

    if (CheckSaleAssociate) {
        res.status(200).json({ status: "associate", data: " Associate with sale" })
    } else if (CheckReturnAssociate) {
        res.status(200).json({ status: "associate", data: " Associate with return" })
    } else if (CheckPurchaseAssociate) {
        res.status(200).json({ status: "associate", data: " Associate with purchase" })
    } else {
        let result = await DeleteService(req, DataModel);
        res.status(200).json(result);
    }
};
