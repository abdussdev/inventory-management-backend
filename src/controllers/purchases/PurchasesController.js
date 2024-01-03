const ParentModel = require("../../models/purchases/PurchasesModel");
const ChildsModel = require("../../models/purchases/PurchaseProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

exports.CreatePurchase = async (req, res) => {
    let result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID')
    res.status(200).json(result)
};

exports.PurchasesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "suppliers", localField: "SupplierID", foreignField: "_id", as: "suppliers" } }
    let SearchArray = [{ Note: SearchRgx }, { 'suppliers.Address': SearchRgx }, { 'suppliers.Name': SearchRgx }, { 'suppliers.Email': SearchRgx }, { 'suppliers.Phone': SearchRgx }]
    let result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage)
    res.status(200).json(result)
};