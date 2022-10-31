import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
  country: String,
  zipCode: String,
  city: String,
  lane: String,
  houseNumber: String,
})

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // min: 8,
      // max: 12,
    },
    age: {
      type: Number,
      required: true,
      min: 12,
      max: 100,
    },
    // address: {
    //   type: Object,
    //   required: true,
    // },
    address:{
      type: AddressSchema,
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
