const ExpensesReportService = require("../../services/report/ExpensesReportService");
const PurchasesReportService = require("../../services/report/PurchasesReportService");
const ReturnsReportService = require("../../services/report/ReturnsReportService");
const SalesReportService = require("../../services/report/SalesReportService");

exports.CreateExpensesReport = async (req, res) => {
    let result = await ExpensesReportService(req)
    res.status(200).json(result)
};

exports.CreatePurchasesReport = async (req, res) => {
    let result = await PurchasesReportService(req)
    res.status(200).json(result)
};

exports.CreateReturnsReport = async (req, res) => {
    let result = await ReturnsReportService(req)
    res.status(200).json(result)
};

exports.CreateSalesReport = async (req, res) => {
    let result = await SalesReportService(req)
    res.status(200).json(result)
};

