const DataModel = require("../../models/customers/CustomersModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");

exports.CreateCustomer = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateCustomer = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.CustomersList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ CustomerName: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx }, { Address: SearchRgx }]

    let result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(result)
};

exports.CustomersDropDown = async (req, res) => {
    let result = await DropDownService(req, DataModel, { _id: 1, CustomerName: 1 })
    res.status(200).json(result)
};