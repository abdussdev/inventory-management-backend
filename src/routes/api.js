const express = require("express");
const UsersController = require("../controllers/users/UsersController");
const BrandsController = require("../controllers/brands/BrandsController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

const router = express.Router();

// Users routes
router.post("/register", UsersController.Registration);
router.post("/login", UsersController.Login);
router.post("/profile-update", AuthVerifyMiddleware, UsersController.ProfileUpdate);
router.get("/profile-details", AuthVerifyMiddleware, UsersController.ProfileDetails);
router.get("/verify-email/:email", UsersController.VerifyEmail);
router.get("/verify-otp/:email/:otp", UsersController.VerifyOTP);
router.post("/reset-password", UsersController.ResetPass);

//Brands routes
router.post("/create-brand", AuthVerifyMiddleware, BrandsController.CreateBrand);
router.post("/update-brand/:id", AuthVerifyMiddleware, BrandsController.UpdateBrand);
router.get("/brand-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, BrandsController.BrandList);
router.get("/brand-dropdown", AuthVerifyMiddleware, BrandsController.BrandDropDown);

//Categories routes


//Products routes


module.exports = router