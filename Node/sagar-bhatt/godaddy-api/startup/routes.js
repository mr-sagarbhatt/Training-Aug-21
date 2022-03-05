const express = require("express");
// *********** JWT CONFIGURATION ***********
global.config = require("../authentication/global.config");
// *********** AUTH MIDDLE WARES ***********
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

// *********** ROUTES ***********
const rolesRoutes = require("../controllers/roles.controller");
const usersRoutes = require("../controllers/user.controller");
const profileRoutes = require("../controllers/profile.controller");
const discountRoutes = require("../controllers/discount.controller");
const promoRoutes = require("../controllers/promo.controller");
const serviceRoutes = require("../controllers/service.controller");
const categoryRoutes = require("../controllers/category.controller");
const subCategoryRoutes = require("../controllers/subcategory.controller");
const productRoutes = require("../controllers/product.controller");
const billRoutes = require("../controllers/billing.controller");
const cartRoutes = require("../controllers/cart.controller");
const orderRoutes = require("../controllers/order.controller");

// *********** ERROR MIDDLEWARE ***********
const errorMiddleware = require("../middlewares/error");

// *********** LOGGING :: WINSTON ***********
const { serverLogging } = require("./logging");

module.exports = function (app) {
  app.use(express.json());

  app.use("/roles", rolesRoutes);
  app.use("/users", usersRoutes);
  app.use("/profile", verifyToken, authPage([1, 2]), profileRoutes);
  app.use("/discount", discountRoutes);
  app.use("/promo", promoRoutes);
  app.use("/service", serviceRoutes);
  app.use("/category", categoryRoutes);
  app.use("/subcategory", subCategoryRoutes);
  app.use("/product", productRoutes);
  app.use("/bill", billRoutes);
  app.use("/cart", cartRoutes);
  app.use("/order", orderRoutes);

  // *********** ERROR MIDDLEWARE ***********
  app.use(errorMiddleware);

  // *********** CAPTURE 404 ERRORS ***********
  app.use((req, res, next) => {
    res.status(404).json({ message: `Page not found.` });
    const msg = `404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`;
    serverLogging.error(msg);
  });
};
