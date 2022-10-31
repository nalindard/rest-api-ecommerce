import mongoose from 'mongoose'

const AdmibSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 12,
    },
    owner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', AdmibSchema)
export default Admin
