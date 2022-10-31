import express from 'express'
export const router = express.Router()
import User from '../models/userModel.js'
import { getUser } from '../middleware/current.js'

// PUT ONE,
// router.post('/', async (req, res) => {
//   const newUser = new User({
//     userName: req.body.userName,
//     email: req.body.email,
//     password: req.body.password,
//     age: req.body.age,
//     address: {
//       country: req.body.address.country,
//       zipCode: req.body.address.zipCode,
//       city: req.body.address.city,
//       lane: req.body.address.lane,
//       houseNumber: req.body.address.houseNumber,
//     },
//   })

//   try {
//     await newUser.save()
//     console.log(newUser)
//     res.status(200).json({ newuser: newUser })
//   } catch (error) {
//     console.log('Error happend: ', error)
//     res.status(500).json({ Error: error })
//   }
// })

// GET ONE,
router.get('/:id', getUser, (req, res) => {
  res.status(200).json(res.currentUser)
})

// UPDATE ONE,
router.put('/:id', getUser, async (req, res) => {
  try {
    // console.log('Updating --> ' + res.currentUser._id)
    const updatedUser = await User.findByIdAndUpdate(
      res.currentUser._id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log('Error happend: ', error)
    res.status(500).json({ Error: error })
  }
})

// DELETE ONE,
router.delete('/:id', getUser, async (req, res) => {
  try {
    console.log(res.currentUser)
    await res.currentUser.remove()
    res.json({ message: 'Successefully deleted the user!' })
  } catch (error) {
    console.log('Error happend: ', error)
    res.status(500).json({ Error: error })
  }
})
