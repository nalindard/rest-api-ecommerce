import express from 'express'
export const router = express.Router()
import Cart from '../models/cartModel.js'
import { getCart } from '../middleware/current.js'

// PUT ONE,
router.post('/', async (req, res) => {
  const newCart = new Cart({
    userID: req.body.userID,
    products: req.body.products,
  })

  try {
    await newCart.save()
    res.send('The new product is: ' + newCart)
    console.log(newCart)
  } catch (error) {
    console.log('Error happend: ', error)
  }

})

// GET ONE,
router.get('/:id', getCart, (req, res) => {
  res.status(200).json(res.currentCart)
})

// UPDATE ONE,
router.put('/:id', getCart, async (req, res) => {
  try {
    // console.log('Updating --> ' + res.currentUser._id)
    const updatedCart = await Cart.findByIdAndUpdate(
      res.currentCart._id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedCart)
  } catch (error) {
    res.send('Error')
  }
})

// DELETE ONE,
router.delete('/:id', getCart, async (req, res) => {
  try {
    console.log(res.currentCart)
    await res.currentCart.remove()
    res.json({ message: 'Successefully deleted the product!' })
  } catch (error) {
    res.send(error)
  }
})
