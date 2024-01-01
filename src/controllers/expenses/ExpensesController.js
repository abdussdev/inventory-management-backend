const DataModel = require("../../models/expenses/ExpensesModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");


exports.CreateExpense = async (req, res) => {
    let result = await CreateService(req, DataModel)
    res.status(200).json(result)
};

exports.UpdateExpense = async (req, res) => {
    let result = await UpdateService(req, DataModel)
    res.status(200).json(result)
};

exports.ExpensesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ Note: SearchRgx }, { Amount: SearchRgx }, { 'Type.Name': SearchRgx }]
    let JoinStage = { $lookup: { from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type" } }
    let result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage)
    res.status(200).json(result)
};
