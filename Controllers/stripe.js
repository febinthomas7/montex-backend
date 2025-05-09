const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Make sure you load your key
const UserModel = require("../Models/userModel");
const CartModel = require("../Models/cart");
const OrderModel = require("../Models/orders");

const YOUR_DOMAIN = process.env.APP_URL; // Replace with your actual domain in production

const payment = async (req, res) => {
  const { items } = req.body;
  const { userId } = req.query;

  try {
    // Step 1: Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: items?.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product?.title,
            images: [product?.image],
          },
          unit_amount: Math.round(product?.price * 100),
        },
        quantity: product?.quantity,
      })),
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success?success=true`,
      cancel_url: `${YOUR_DOMAIN}/cancel?canceled=true`,
    });

    console.log("Stripe session created:", session.id);

    // Step 2: Handle MongoDB operations
    try {
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const savedItems = await CartModel.find({ userId });

      if (savedItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const orderItems = savedItems.map((item) => ({
        name: item.title,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      const order = await new OrderModel({
        userId,
        items: orderItems,
        sessionId: session.id,
        status: "paid",
      }).save();

      user.orders.push(order._id);
      user.cart = []; // Clear cart references from user
      await user.save();

      console.log("Order saved with ID:", order._id);

      // ❗️ Consider delaying this until payment is confirmed (use webhook)
      await CartModel.deleteMany({ userId });
      console.log("Cart cleared for user:", userId);
    } catch (mongoErr) {
      console.error("MongoDB error:", mongoErr);
      return res
        .status(500)
        .json({ message: "MongoDB error", error: mongoErr.message });
    }

    // Step 3: Send session ID to frontend

    res.json({ id: session.id, status: true });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message, status: false });
  }
};

module.exports = payment;
