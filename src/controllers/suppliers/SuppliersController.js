const DataModel = require("../../models/suppliers/SuppliersModel");
const PurchasesModel = require("../../models/purchases/PurchasesModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/common/DeleteService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

const mongoose = require("mongoose");

exports.CreateSupplier = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateSupplier = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.SupplierDetailsById = async (req, res) => {
    let result = await DetailsByIdService(req, DataModel)
    res.status(200).json(result)
};

exports.SuppliersList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Name: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx }, { Address: SearchRgx }]

    let result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(result)
};

exports.SuppliersDropDown = async (req, res) => {
    let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 })
    res.status(200).json(result)
};

exports.DeleteSupplier = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    let CheckAssociate = await CheckAssociateService({ SupplierID: new ObjectId(DeleteID) }, PurchasesModel);

    if (CheckAssociate) {
        res.status(200).json({ status: "associate", data: " Associate with purchase" })
    } else {
        let result = await DeleteService(req, DataModel);
        res.status(200).json(result);
    }
};