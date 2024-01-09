const DataModel = require("../../models/brands/BrandsModel");
const ProductsModel = require("../../models/products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/common/DeleteService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const mongoose = require("mongoose");


exports.CreateBrand = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateBrand = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.BrandsList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Name: SearchRgx }]

    let result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(result)
};

exports.BrandsDropDown = async (req, res) => {
    let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 })
    res.status(200).json(result)
};

exports.DeleteBrand = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    let CheckAssociate = await CheckAssociateService({ BrandID: new ObjectId(DeleteID) }, ProductsModel);

    if (CheckAssociate) {
        res.status(200).json({ status: "associate", data: " Associate with product" })
    } else {
        let result = await DeleteService(req, DataModel);
        res.status(200).json(result);
    }
};