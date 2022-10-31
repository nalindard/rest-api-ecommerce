import express from 'express'
export const router = express.Router()
import Order from '../models/orderModel.js'
import { getOrder } from '../middleware/current.js'

// PUT ONE,
router.post('/', async (req, res) => {
  const newOrder = new Order({
    userID: req.body.userID,
    products: req.body.products,
    address: req.body.address,
    status: req.body.status,
  })

  try {
    await newOrder.save()
    console.log(newOrder)
    res.send('The new product is: ' + newOrder)
  } catch (error) {
    console.log('Error happend: ' + error)
    res.status(300).json({ message: error })
  }
})

// GET ONE,
router.get('/:id', getOrder, (req, res) => {
  res.status(200).json(res.currentOrder)
})

// UPDATE ONE,
router.put('/:id', getOrder, async (req, res) => {
  try {
    // console.log('Updating --> ' + res.currentUser._id)
    const updatedOrder = await Order.findByIdAndUpdate(
      res.currentOrder._id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedOrder)
  } catch (error) {
    console.log('Error happend: ' + error)
    res.status(300).json({ message: error })
  }
})

// DELETE ONE,
router.delete('/:id', getOrder, async (req, res) => {
  try {
    console.log(res.currentOrder)
    await res.currentOrder.remove()
    res.json({ message: 'Successefully deleted the product!' })
  } catch (error) {
    console.log('Error happend: ' + error)
    res.status(300).json({ message: error })
  }
})
