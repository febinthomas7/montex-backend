const UserModel = require("../Models/userModel");
const CartModel = require("../Models/cart");

const cart = async (req, res) => {
  const { id, title, price, image, quantity } = req.body;
  const { userId } = req.query;

  if (!userId || !id || !title || !price || !image || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if cart item already exists for this user with the same product id
    const existingCartItem = await CartModel.findOne({ userId, id });

    if (existingCartItem) {
      // If item exists, update quantity
      existingCartItem.quantity = quantity;
      await existingCartItem.save();
      res
        .status(200)
        .json({ message: "Cart item updated", cartItem: existingCartItem });
    } else {
      // If item doesn't exist, create new cart item
      const newCartItem = await CartModel.create({
        id,
        title,
        price,
        image,
        quantity,
        userId,
      });

      // Save the cart item's _id in user's cart array
      user.cart.push(newCartItem._id);
      await user.save();

      res
        .status(200)
        .json({ message: "Item added to cart", cartItem: newCartItem });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  try {
    const deleted = await CartModel.findOneAndDelete({ id, userId });
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted from cart" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: err.message });
  }
};

module.exports = { cart, deleteCart };
