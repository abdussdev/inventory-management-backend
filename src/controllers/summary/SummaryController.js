const ExpensesSummaryService = require("../../services/summary/ExpensesSummaryService");
const PurchasesSummaryService = require("../../services/summary/PurchasesSummaryService");
const ReturnsSummaryService = require("../../services/summary/ReturnsSummaryService");
const SalesSummaryService = require("../../services/summary/SalesSummaryService");

exports.CreateExpensesSummary = async (req, res) => {
    let result = await ExpensesSummaryService(req)
    res.status(200).json(result)
};

exports.CreatePurchasesSummary = async (req, res) => {
    let result = await PurchasesSummaryService(req)
    res.status(200).json(result)
};

exports.CreateReturnsSummary = async (req, res) => {
    let result = await ReturnsSummaryService(req)
    res.status(200).json(result)
};

exports.CreateSalesSummary = async (req, res) => {
    let result = await SalesSummaryService(req)
    res.status(200).json(result)
};

