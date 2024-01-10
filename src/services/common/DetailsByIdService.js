const mongoose = require("mongoose");

const DetailsByIdService = async (Request, DataModel) => {
    try {
        let DetailsID = Request.params.id;
        let UserEmail = Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {
            _id: new ObjectId(DetailsID),
            UserEmail: UserEmail
        };

        let data = await DataModel.aggregate([
            { $match: QueryObject }
        ]);

        return { status: "success", data: data };

    } catch (error) {
        return { status: "fail", error: error.toString() };
    }
};

module.exports = DetailsByIdService;
