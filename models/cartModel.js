import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: [
      {
        productID: {
          type: String,
        },
        amount: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)
export default Cart
