
const express = require("express"); 
const { cartCheckout, getUserOrders, userCart } = require("../controllers/orderController");

const router = express.Router();

router.route("/user/orders").get(getUserOrders)  
router.route("/user/orders/:id").post(userCart)
router.route("/checkout").post(cartCheckout) 


module.exports=router;