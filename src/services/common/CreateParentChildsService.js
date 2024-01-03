const mongoose = require("mongoose");

const CreateParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        let Parent = Request.body['Parent'];
        Parent.UserEmail = Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent], { session });


        let Childs = Request.body['Childs'];
        Childs.forEach((element) => {
            element[JoinPropertyName] = ParentCreation[0]['_id'];
            element['UserEmail'] = Request.headers['email'];
        });

        let ChildsCreation = await ChildsModel.insertMany(Childs, { session });

        await session.commitTransaction();
        session.endSession();

        return { status: "success", Parent: ParentCreation, Childs: ChildsCreation };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error.toString() };
    }
};

module.exports = CreateParentChildsService;
