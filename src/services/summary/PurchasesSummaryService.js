const PurchasesModel = require("../../models/purchases/PurchasesModel");

const PurchasesSummaryService = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];

        let data = await PurchasesModel.aggregate([
            { $match: { UserEmail: UserEmail } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$GrandTotal" }
                        }
                    }],
                    Last30Days: [
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                                TotalAmount: { $sum: "$GrandTotal" }
                            }
                        },
                        { $sort: { _id: -1 } },
                        { $limit: 30 }
                    ]
                }
            }
        ]);

        return { status: "success", data: data };

    } catch (error) {
        return { status: "fail", error: error.toString() };
    }
};

module.exports = PurchasesSummaryService;
