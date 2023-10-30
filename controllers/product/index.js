const router = require("express").Router();

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../../controllers/product/product");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middlewares/auth");

// # ADD NEW PRODUCT
/**
 * @swagger
 *  /api/admin/product/new:
 *      post:
 *          tags:
 *              - Product
 *          security:
 *              - Bearer: []
 *          summary: Add new product
 *          parameters:
 *              - in: body
 *                name: user
 *                schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      price:
 *                          type: integer
 *                          format: int64
 *                      summary:
 *                          type: string
 *                      category:
 *                           type: string
 *          responses:
 *              200:
 *                  description: OK
 */
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// # VIEW ALL PRODUCTS
/**
 * @swagger
 * /api/products:
 *     get:
 *      tags:
 *          - Product
 *      security:
 *          - Bearer: []
 *      summary: view all products
 *      parameters:
 *      - in: query
 *        name: page
 *        type: integer
 *        description: page of list
 *      - in: query
 *        name: keyword
 *        type: string
 *        description: type any keyword for search
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of items in a page
 *      - in: query
 *        name: category
 *        type: string
 *        description: category of product
 *      - in: query
 *        name: price[gt]
 *        type: integer
 *        description: price (>)
 *      - in: query
 *        name: price[lt]
 *        type: integer
 *        description: price (<)
 *      responses:
 *          200:
 *            description: OK
 */
router.route("/products").get(getAllProducts);

// # VIEW SINGLE PRODUCT
/**
 * @swagger
 *  /api/product/{id}:
 *      get:
 *          tags:
 *              - Product
 *          security:
 *              - Bearer: []
 *          sumamry: View single product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of a product
 *                required: true
 *                schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *          responses:
 *              200:
 *                  description: OK
 */
router.route("/product/:id").get(getProductDetails);

// # UPDATE PRODUCT
/**
 * @swagger
 *  /api/admin/product/{id}:
 *      put:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Product
 *          summary: Update product details
 *          description: Update product details
 *          operationId: Update product details
 *          produces:
 *              - application/json
 *              - application/xml
 *          parameters:
 *              - in: path
 *                name: id
 *                description: Id of product
 *                required: true
 *                schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *              - in: body
 *                name: body
 *                description: Enter product deatails
 *                required: on
 *                schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      summary:
 *                          type: string
 *                      price:
 *                          type: integer
 *                      category:
 *                          type: string
 *          requestedBody:
 *              description: request body
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              summary:
 *                                  type: string
 *                              price:
 *                                  type: integer
 *                              category:
 *                                  type: string
 *
 *          responses:
 *              200:
 *                  description: OK
 *
 */
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// # DELETE PRODUCT
/**
 * @swagger
 *  /api/admin/product/{id}:
 *      delete:
 *          tags:
 *              - Product
 *          security:
 *              - Bearer: []
 *          summary: Delete product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: product id
 *                required: true
 *          responses:
 *              200:
 *                  description: OK
 */
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
