const DataModel = require("../../models/products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");

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
