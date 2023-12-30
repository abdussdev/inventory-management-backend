const BrandsModel = require("../../models/BrandsModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");

exports.CreateBrand = async (req, res) => {
    let result = await CreateService(req, BrandsModel)
    res.status(200).json(result)
};

exports.UpdateBrand = async (req, res) => {
    let result = await UpdateService(req, BrandsModel)
    res.status(200).json(result)
};

exports.BrandList = async (req, res) => {
    let SearchRgx = { "regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Name: SearchRgx }]

    let result = await ListService(req, BrandsModel, SearchArray)
    res.status(200).json(result)
};

exports.BrandDropDown = async (req, res) => {
    let result = await DropDownService(req, BrandsModel, { _id: 1, Name: 1 })
    res.status(200).json(result)
};