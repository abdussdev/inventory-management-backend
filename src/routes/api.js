const express = require("express");
const UsersController = require("../controllers/users/UsersController");
const BrandsController = require("../controllers/brands/BrandsController");
const CategoriesController = require("../controllers/categories/CategoriesController");
const CustomersController = require("../controllers/customers/CustomersController");
const SuppliersController = require("../controllers/suppliers/SuppliersController");
const ExpensTypesController = require("../controllers/expenses/ExpensTypesController");
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
router.get("/brands-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, BrandsController.BrandsList);
router.get("/brands-dropdown", AuthVerifyMiddleware, BrandsController.BrandsDropDown);

//Categories routes
router.post("/create-category", AuthVerifyMiddleware, CategoriesController.CreateCategory);
router.post("/update-category/:id", AuthVerifyMiddleware, CategoriesController.UpdateCategory);
router.get("/categories-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CategoriesController.CategoriesList);
router.get("/categories-dropdown", AuthVerifyMiddleware, CategoriesController.CategoriesDropDown);

//Customers routes
router.post("/create-customer", AuthVerifyMiddleware, CustomersController.CreateCustomer);
router.post("/update-customer/:id", AuthVerifyMiddleware, CustomersController.UpdateCustomer);
router.get("/customers-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CustomersController.CustomersList);
router.get("/customers-dropdown", AuthVerifyMiddleware, CustomersController.CustomersDropDown);

//Suppliers routes
router.post("/create-supplier", AuthVerifyMiddleware, SuppliersController.CreateSupplier);
router.post("/update-supplier/:id", AuthVerifyMiddleware, SuppliersController.UpdateSupplier);
router.get("/suppliers-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, SuppliersController.SuppliersList);
router.get("/suppliers-dropdown", AuthVerifyMiddleware, SuppliersController.SuppliersDropDown);

//Expense Types routes
router.post("/create-expense-type", AuthVerifyMiddleware, ExpensTypesController.CreateExpense);
router.post("/update-expense-type/:id", AuthVerifyMiddleware, ExpensTypesController.UpdateExpense);
router.get("/expense-types-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ExpensTypesController.ExpensesList);
router.get("/expense-types-dropdown", AuthVerifyMiddleware, ExpensTypesController.ExpensesDropDown);


//Expenses routes



module.exports = router