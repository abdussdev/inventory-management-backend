const ParentModel = require("../../models/returns/ReturnsModel");
const ChildsModel = require("../../models/returns/ReturnProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");


exports.CreateReturn = async (req, res) => {
    let result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID')
    res.status(200).json(result)
};

exports.ReturnsList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "customers", localField: "CustomerID", foreignField: "_id", as: "customers" } }
    let SearchArray = [{ Note: SearchRgx }, { 'customers.Address': SearchRgx }, { 'customers.Name': SearchRgx }, { 'customers.Email': SearchRgx }, { 'suppliers.Phone': SearchRgx }]
    let result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage)
    res.status(200).json(result)
};

exports.ReturnDelete = async (req, res) => {
    let result = await DeleteParentChildsService(req, ParentModel, ChildsModel, 'ReturnID')
    res.status(200).json(result)
};