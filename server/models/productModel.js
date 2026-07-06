import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    sizes: { type: Array, default: [] },
    bestseller: { type: Boolean, default: false },
    image: { type: Array, required: true }, // image kit URLs
    date: { type: Number, required: true },
  },
  { minimize: false }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;