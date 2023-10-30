const productModel = require("../../db/models/product");
const ErrorHandler = require("../../utils/ErrorHandling");
const catchAsyncError = require("../../middlewares/catchAsyncError");
const ApiFeatures = require("../../utils/apiFeatures");

//CREATE --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//GET all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = req.query.limit || 5;
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//GET product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//PUT product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    // userFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//DELETE product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});
