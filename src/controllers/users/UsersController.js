const UsersModel = require("../../models/UsersModel")
const OTPSModel = require("../../models/OTPSModel")

const UserCreateService = require("../../services/user/UserCreateService")
const UserDetailsService = require("../../services/user/UserDetailsService")
const UserLoginService = require("../../services/user/UserLoginService")
const UserResetPassService = require("../../services/user/UserResetPassService")
const UserUpdateService = require("../../services/user/UserUpdateService")
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService")
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService")

exports.Registration = async (req, res) => {
    let result = await UserCreateService(req, UsersModel)
    res.status(200).json(result)
}

exports.Login = async (req, res) => {
    let result = await UserLoginService(req, UsersModel)
    res.status(200).json(result)
}

exports.ProfileUpdate = async (req, res) => {
    let result = await UserUpdateService(req, UsersModel)
    res.status(200).json(result)
}

exports.ProfileDetails = async (req, res) => {
    let result = await UserDetailsService(req, UsersModel)
    res.status(200).json(result)
}

exports.VerifyEmail = async (req, res) => {
    let result = await UserVerifyEmailService(req, UsersModel)
    res.status(200).json(result)
}

exports.VerifyOTP = async (req, res) => {
    let result = await UserVerifyOtpService(req, OTPSModel)
    res.status(200).json(result)
}

exports.ResetPass = async (req, res) => {
    let result = await UserResetPassService(req, UsersModel)
    res.status(200).json(result)
}

