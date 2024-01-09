const SaleProductsModel = require("../../models/sales/SaleProductsModel");

const SalesReportService = async (Request) => {
    try {
        let UserEmail = Request.headers['email']
        let FromDate = Request.headers['FromDate']
        let ToDate = Request.headers['ToDate']

        let data = await SaleProductsModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$Total" }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: "products", localField: "ProductID", foreignField: "_id", as: "products" } },
                        { $unwind: "$products" },
                        { $lookup: { from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands" } },
                        { $lookup: { from: "categries", localField: "products.CategoryID", foreignField: "_id", as: "categories" } }
                    ],

                }
            }
        ])
        return { status: "success", data: data }

    } catch (error) {
        return { status: "fail", data: error.toString() }

    }
}

module.exports = SalesReportService;