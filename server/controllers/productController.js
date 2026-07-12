import imagekit from "../config/imagekit.js";
import productModel from "../models/productModel.js";

// Add Product (Admin)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;


    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No images received by server" });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    console.log("IMAGES TO UPLOAD:", images.map((img) => ({
      name: img?.originalname,
      hasBuffer: !!img?.buffer,
      size: img?.size,
    })));

    if (images.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await imagekit.upload({
          file: item.buffer,
          fileName: item.originalname,
          folder: "/products",
        });
        return result.url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// List Products (Public)
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Remove Product (Admin)
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Single Product Info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };