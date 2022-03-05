const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const cartItemsSchema = new Schema(
  {
    _id: Number,
    productId: {
      type: Number,
      ref: "product",
      required: [true, `Product id is required.`],
    },
    price: {
      type: Number,
      min: [0, `Product price must be greater than or equal to 0.`],
      required: [true, `Product price is required.`],
    },
    discountId: {
      type: Number,
      ref: "discount",
    },
    updatedPrice: {
      type: Number,
      min: [0, `Updated price must be greater than or equal to 0.`],
      required: [true, `Updated price is required.`],
    },
    userId: {
      type: Number,
      ref: "user",
      required: [true, `User id is required.`],
    },
  },
  { timestamps: true }
);

cartItemsSchema.index({ productId: 1, userId: 1 }, { unique: 1 });

cartItemsSchema.plugin(AutoIncrement, {
  id: "cartItems_seq",
});

const CartItemsModel = model("cartItem", cartItemsSchema);

module.exports = CartItemsModel;
