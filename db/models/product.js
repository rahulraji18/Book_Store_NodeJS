const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Please enter description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
      maxLength: [8, "price cannot exceed 5 characters"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", productSchema);
