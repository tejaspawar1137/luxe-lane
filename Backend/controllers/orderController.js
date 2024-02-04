const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

const handleError = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ success, message });
};

const handleSuccess = (res, data) => {
  return res.status(200).json({ success: true, ...data });
};

// API - Get user orders
const getUserOrders = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userid = decoded.data; 
    const orders = await Order.find({ userid: userid });
    handleSuccess(res, { total: orders.length, orders });
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

// API - User Cart
const userCart = async (req, res) => {
  try {
    const productid = req.params.id;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.data;

    const product = await Product.findById(productid);
    if (!product) {
      return handleError(res, 404, "Product not found");
    }

    const user = await User.findById(userid).select("-password");
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    if (!user.cartItems) {
      user.cartItems = [];
    }

    const existingCartItem = user.cartItems.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (existingCartItem) {
      return handleError(res, 403, "Product already exists");
    }

    let quantity = req.body.quantity;

    user.cartItems.unshift({
      product: product,
      quantity: quantity,
      price: product.price,
    });

    await user.save();

    return handleSuccess(res, {
      message: "Added to cart",
      cart: user.cartItems,
    });
  } catch (error) {
    return handleError(res, 400, "Error adding product: " + error.message);
  }
};

// API - Place order
const cartCheckout = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userId = decoded.data;
    const user = await User.findOne({ _id: userId }).select("-password");

    if (user.cartItems.length < 1) {
      return handleError(res, 404, "Cart is empty", false);
    }
    const address = req.body.address;
    const totalPrice=req.body.totalPrice;
    
    const { cartItems, ...userWithoutCartItems } = user;
    const order = await Order.create({
      user: userWithoutCartItems,
      products: user.cartItems,
      address,
      totalPrice,
      userid: userId,
    });
    handleSuccess(res, { order });
    //Resetting the cart
    user.cartItems = [];
    return await user.save();
  } catch (error) {
    return handleError(res, 400, error.message);
  }
};

module.exports = {
  cartCheckout,
  getUserOrders,
  userCart,
};
