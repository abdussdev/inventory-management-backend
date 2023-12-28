const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        firstName: { type: String },
        lastName: { type: String },
        mobile: { type: String },
        password: { type: String },
        photo: { type: String },
    },
    { timestamps: true, versionKey: false }
);

const UsersModel = mongoose.model("User", UserSchema);
module.exports = UsersModel;