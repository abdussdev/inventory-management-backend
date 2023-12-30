const UpdateService = async (Request, DataModel) => {
    try {
        let PostBody = Request.body;
        let UserEmail = Request.headers['email'];
        let id = Request.params.id
        let data = await DataModel.updateOne({ _id: id, UserEmail: UserEmail }, PostBody);
        return { status: "success", data: data }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }
}

module.exports = UpdateService;