import express from 'express'
export const router = express.Router()
import User from '../models/userModel.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

// REGISTER,
router.post('/register', async (req, res) => {
  // console.log("we got here", req.body.password);
  let password = JSON.stringify(req.body.password)
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    // password: req.body.password,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString(),
    age: req.body.age,
    address: {
      country: req.body.address.country,
      zipCode: req.body.address.zipCode,
      city: req.body.address.city,
      lane: req.body.address.lane,
      houseNumber: req.body.address.houseNumber,
    },
  })

  try {
    await newUser.save()
    console.log(newUser)
    res.status(200).json({ newuser: newUser })
  } catch (error) {
    console.log('Error happend: ', error.message)
    res.status(400).json({ Error: error })
  }
})

// LOGIN,
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    !user && res.status(401).json({ Error: 'User not found!' })

    const hassedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    )
    const originalPassword = hassedPassword.toString(CryptoJS.enc.Utf8)
    if (originalPassword !== JSON.stringify(req.body.password)) {
      return res.status(401).json({ Error: 'Wrong password!' })
    } else {
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '3d' }
      )
      return res.status(200).json({ user: user, accessToken })
    }
  } catch (error) {
    res.status(400).json({ Error: error })
  }
})
