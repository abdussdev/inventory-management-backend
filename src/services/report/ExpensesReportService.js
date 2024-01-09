const ExpensesModel = require("../../models/expenses/ExpensesModel")

const ExpensesReportService = async (Request) => {
    try {
        let UserEmail = Request.headers['email']
        let FromDate = Request.headers['FromDate']
        let ToDate = Request.headers['ToDate']

        let data = await ExpensesModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$Amount" }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type" } }
                    ],

                }
            }
        ])
        return { status: "success", data: data }

    } catch (error) {
        return { status: "fail", data: error.toString() }

    }
}

module.exports = ExpensesReportService;