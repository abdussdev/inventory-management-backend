const mongoose = require("mongoose");

const DeleteParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        //Parent creation
        let DeleteID = Request.params.id
        let UserEmail = Request.headers['email'];

        let ChildQueryObject = {}
        ChildQueryObject[JoinPropertyName] = DeleteID;
        ChildQueryObject[UserEmail] = UserEmail;

        let ParentQueryObject = {}
        ParentQueryObject['_id'] = DeleteID;
        ParentQueryObject[UserEmail] = UserEmail;

        const ChildDelete = await ChildsModel.deleteMany(ChildQueryObject).session(session);

        const ParentDelete = await ParentModel.deleteOne(ParentQueryObject).session(session);

        await session.commitTransaction();
        session.endSession();

        return { status: "success", Parent: ParentDelete, Childs: ChildDelete };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error.toString() };
    }
};

module.exports = DeleteParentChildsService;
