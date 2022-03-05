const _ = require("lodash");
const CartItemsModel = require("../models/cart.items");
const ProductModel = require("../models/product.model");
const DiscountModel = require("../models/discount.model");
const {
  validateCartItems,
  updateCartItems,
} = require("../utils/joi.validations");

class CartDomain {
  // *********** GET CART ***********
  async getUserCart(req, res) {
    try {
      const userId = req.decoded._id;
      const cart = await CartItemsModel.find({ userId }).populate([
        {
          path: "productId",
        },
        {
          path: "discountId",
        },
        {
          path: "userId",
        },
      ]);
      if (cart.length > 0) {
        res.send(cart);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE CART ***********
  async addToCart(req, res) {
    try {
      const userId = await req.decoded._id;
      let data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateCartItems(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      const productId = await ProductModel.findOne({
        _id: data.productId,
      });
      let discountId;
      if (data.discountId) {
        discountId = await DiscountModel.findOne({
          _id: data.discountId,
        });
      } else {
        discountId = await DiscountModel.findOne({
          productId: data.productId,
        });
      }
      const cartItem = await CartItemsModel.findOne({
        productId: data.productId,
        userId,
      });
      if (cartItem) {
        return res.status(400).json({
          message: `Product is already added in your cart!`,
        });
      }
      // * PRODUCT PRICE *
      const price = productId.price;
      // * CHECK IF USER ID EXISTS *
      if (userId) {
        // * CHECK IF PRODUCT ID EXISTS *
        if (productId) {
          // * CHECK IF DISCOUNT ID EXISTS *
          // if (discountId) {
          // * UPDATED PRICE *
          const totalPrice = price * discountId.months;
          const calcValue = (totalPrice * discountId.percentage) / 100;
          const updatedPrice = totalPrice - calcValue;
          // const calcValue = (productId.price * discountId.percentage) / 100;
          // const updatedPrice = price - calcValue;
          data = {
            ...data,
            userId,
            price: totalPrice,
            updatedPrice,
            discountId: discountId._id,
          };
          // } else {
          //   // * UPDATED PRICE *
          //   const price = productId.price;
          //   const updatedPrice = price;
          //   data = {
          //     ...data,
          //     userId,
          //     price,
          //     updatedPrice,
          //   };
          // }
          // * SAVE CART DETAILS *
          const cart = new CartItemsModel(data);
          const saveCart = await cart.save();
          if (saveCart) {
            res.send(saveCart);
          } else {
            res.status(400).json({
              message: "Please try again later!",
            });
          }
          // } else {
          //   return res.status(400).json({
          //     message: `Discount Not found!`,
          //   });
          // }
        } else {
          return res.status(400).json({
            message: `Product Not found!`,
          });
        }
      } else {
        return res.status(400).json({
          message: `User Not found!`,
        });
      }
    } catch (err) {
      next(err);
      res.send(err);
    }
  }

  // *********** UPDATE CART ***********
  async updateCartItem(req, res) {
    try {
      const _id = parseInt(req.params.cartId);
      const userId = await req.decoded._id;
      let data = req.body;
      console.log("data");
      console.log(data);
      // * VALIDATE BODY DATA *
      const { error } = updateCartItems(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      const discountId = await DiscountModel.findOne({
        _id: data.discountId,
      });
      const cart = await CartItemsModel.findById(_id);
      const productId = await ProductModel.findById(cart.productId);
      // * PRODUCT PRICE *
      const price = productId.price;
      // * CHECK IF USER ID EXISTS *
      if (userId) {
        // * CHECK IF PRODUCT ID EXISTS *
        if (productId) {
          // * CHECK IF DISCOUNT ID EXISTS *
          if (discountId) {
            // * UPDATED PRICE *
            const totalPrice = price * discountId.months;
            const calcValue = (totalPrice * discountId.percentage) / 100;
            const updatedPrice = totalPrice - calcValue;
            data = {
              ...data,
              userId,
              price: totalPrice,
              updatedPrice,
            };
            // } else {
            //   await CartItemsModel.findByIdAndUpdate(
            //     { _id },
            //     { $unset: { discountId: 1 } }
            //   );
            // // * UPDATED PRICE *
            // const price = productId.price;
            // const updatedPrice = price;
            // data = {
            //   ...data,
            //   userId,
            //   price,
            //   updatedPrice,
            // };

            // * UPDATE CART DETAILS *
            const cart = await CartItemsModel.findOneAndUpdate(
              { _id },
              { $set: data },
              { new: 1, runValidators: true }
            );
            if (cart) {
              res.send(cart);
            } else {
              res.status(400).json({
                message: "Cart Not Found!",
              });
            }
          } else {
            return res.status(400).json({
              message: `Product Not found!`,
            });
          }
        } else {
          return res.status(400).json({
            message: `Discount Not found!`,
          });
        }
      } else {
        return res.status(400).json({
          message: `User Not found!`,
        });
      }
    } catch (err) {
      next(err);
      res.send(err);
    }
  }

  // *********** DELETE CART ITEMS ***********
  async deleteCartItem(req, res) {
    try {
      const _id = parseInt(req.params.cartId);
      const cart = await CartItemsModel.findByIdAndDelete(_id);
      if (cart) {
        res.send(cart);
      } else {
        res.status(400).json({
          message: "Cart Item Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE CART ***********
  async deleteCart(req, res) {
    try {
      const userId = req.decoded._id;
      console.log(userId);
      const cart = await CartItemsModel.deleteMany({ userId });
      if (cart) {
        res.json({
          message: `Your cart has been empty!`,
        });
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartDomain;
