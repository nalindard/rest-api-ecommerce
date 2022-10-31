import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
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
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
export default Order
