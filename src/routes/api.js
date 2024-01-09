const express = require("express");
const UsersController = require("../controllers/users/UsersController");
const BrandsController = require("../controllers/brands/BrandsController");
const CategoriesController = require("../controllers/categories/CategoriesController");
const CustomersController = require("../controllers/customers/CustomersController");
const SuppliersController = require("../controllers/suppliers/SuppliersController");
const ExpenseTypesController = require("../controllers/expenses/ExpenseTypesController");
const ExpensesController = require("../controllers/expenses/ExpensesController");
const ProductsController = require("../controllers/products/ProductsController");
const PurchasesController = require("../controllers/purchases/PurchasesController");
const SalesController = require("../controllers/sale/SalesController");
const ReturnsController = require("../controllers/returns/ReturnsController");
const ReportController = require("../controllers/report/ReportController");

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
router.get("/delete-brand/:id", AuthVerifyMiddleware, BrandsController.DeleteBrand);

//Categories routes
router.post("/create-category", AuthVerifyMiddleware, CategoriesController.CreateCategory);
router.post("/update-category/:id", AuthVerifyMiddleware, CategoriesController.UpdateCategory);
router.get("/categories-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CategoriesController.CategoriesList);
router.get("/categories-dropdown", AuthVerifyMiddleware, CategoriesController.CategoriesDropDown);
router.get("/delete-category/:id", AuthVerifyMiddleware, CategoriesController.DeleteCategory);

//Customers routes
router.post("/create-customer", AuthVerifyMiddleware, CustomersController.CreateCustomer);
router.post("/update-customer/:id", AuthVerifyMiddleware, CustomersController.UpdateCustomer);
router.get("/customers-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, CustomersController.CustomersList);
router.get("/customers-dropdown", AuthVerifyMiddleware, CustomersController.CustomersDropDown);
router.get("/delete-customer/:id", AuthVerifyMiddleware, CustomersController.DeleteCustomer);

//Suppliers routes
router.post("/create-supplier", AuthVerifyMiddleware, SuppliersController.CreateSupplier);
router.post("/update-supplier/:id", AuthVerifyMiddleware, SuppliersController.UpdateSupplier);
router.get("/suppliers-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, SuppliersController.SuppliersList);
router.get("/suppliers-dropdown", AuthVerifyMiddleware, SuppliersController.SuppliersDropDown);
router.get("/delete-supplier/:id", AuthVerifyMiddleware, SuppliersController.DeleteSupplier);

//Expense Types routes
router.post("/create-expense-type", AuthVerifyMiddleware, ExpenseTypesController.CreateExpenseType);
router.post("/update-expense-type/:id", AuthVerifyMiddleware, ExpenseTypesController.UpdateExpenseType);
router.get("/expense-types-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ExpenseTypesController.ExpenseTypesList);
router.get("/expense-types-dropdown", AuthVerifyMiddleware, ExpenseTypesController.ExpenseTypesDropDown);

//Expenses routes
router.post("/create-expense", AuthVerifyMiddleware, ExpensesController.CreateExpense);
router.post("/update-expense/:id", AuthVerifyMiddleware, ExpensesController.UpdateExpense);
router.get("/expenses-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ExpensesController.ExpensesList);
router.get("/expense-delete/:id", AuthVerifyMiddleware, ExpensesController.DeleteExpense);

//Products routes
router.post("/create-product", AuthVerifyMiddleware, ProductsController.CreateProduct);
router.post("/update-product/:id", AuthVerifyMiddleware, ProductsController.UpdateProduct);
router.get("/products-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ProductsController.ProductsList);
router.get("/delete-product/:id", AuthVerifyMiddleware, ProductsController.DeleteProduct);

//Purchases routes
router.post("/create-purchase", AuthVerifyMiddleware, PurchasesController.CreatePurchase);
router.get("/purchases-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, PurchasesController.PurchasesList);
router.get("/purchase-delete/:id", AuthVerifyMiddleware, PurchasesController.PurchaseDelete);

//Sales routes
router.post("/create-sale", AuthVerifyMiddleware, SalesController.CreateSale);
router.get("/sales-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, SalesController.SalesList);
router.get("/sale-delete/:id", AuthVerifyMiddleware, SalesController.SaleDelete);

//Returns routes
router.post("/create-return", AuthVerifyMiddleware, ReturnsController.CreateReturn);
router.get("/returns-list/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware, ReturnsController.ReturnsList);
router.get("/return-delete/:id", AuthVerifyMiddleware, ReturnsController.ReturnDelete);

//Reports
router.get("/create-expenses-report", AuthVerifyMiddleware, ReportController.CreateExpensesReport);
router.get("/create-purchases-report", AuthVerifyMiddleware, ReportController.CreatePurchasesReport);
router.get("/create-returns-report", AuthVerifyMiddleware, ReportController.CreateReturnsReport);
router.get("/create-sales-report", AuthVerifyMiddleware, ReportController.CreateSalesReport);

module.exports = router;