const UserModel = require("../Models/userModel");

// GET /orders?userId=xxx
const getOrders = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const userWithOrders = await UserModel.findById(userId).populate({
      path: "orders",
      options: { sort: { createdAt: -1 } }, // sort orders by creation
    });

    if (!userWithOrders) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ orders: userWithOrders.orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getOrders;
