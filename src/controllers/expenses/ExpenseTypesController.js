const DataModel = require("../../models/expenses/ExpenseTypesModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateExpenseType = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateExpenseType = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.ExpenseTypeDetailsById = async (req, res) => {
    let result = await DetailsByIdService(req, DataModel)
    res.status(200).json(result)
};

exports.ExpenseTypesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Name: SearchRgx }]

    let result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(result)
};

exports.ExpenseTypesDropDown = async (req, res) => {
    let result = await DropDownService(req, DataModel, { _id: 1, Name: 1 })
    res.status(200).json(result)
};