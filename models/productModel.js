import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      min: 5,
      max: 17,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      min: 25,
      max: 500,
    },
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ageRange: Number,
    colors: [String],
    size: [String],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product