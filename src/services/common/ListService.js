const ListService = async (Request, DataModel, SearchArray) => {
    try {
        let UserEmail = Request.headers['email'];
        let pageNo = Number(Request.params.pageNo);
        let perPage = Number(Request.params.perPage);
        let searchvalue = Request.params.searchKeyword;
        let skipRow = (pageNo - 1) * perPage;
        let data;

        if (searchvalue !== "0") {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                { $match: { $for: SearchArray } },
                {
                    $facet:
                    {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        } else {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                {
                    $facet:
                    {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }

        return { status: "success", data: data }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }
}

module.exports = ListService;