const ParentModel = require("../../models/sales/SalesModel");
const ChildsModel = require("../../models/sales/SaleProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

exports.CreateSale = async (req, res) => {
    let result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID')
    res.status(200).json(result)
};

exports.SalesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "customers", localField: "CustomerID", foreignField: "_id", as: "customers" } }
    let SearchArray = [{ Note: SearchRgx }, { 'customers.Address': SearchRgx }, { 'customers.CustomerName': SearchRgx }, { 'customers.Email': SearchRgx }, { 'suppliers.Phone': SearchRgx }]
    let result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage)
    res.status(200).json(result)
};