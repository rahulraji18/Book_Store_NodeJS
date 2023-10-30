const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/product/product");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = require("express").Router();

// api/product/new
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// api/products
router.route("/products").get(getAllProducts);

// api/product/:id
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
