import express from 'express'
export const router = express.Router()
import Product from '../models/productModel.js'
import { getProduct } from '../middleware/current.js'
import { verifyToken } from '../middleware/verifyToken.js'

// PUT ONE,
router.post('/', async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    price: req.body.price,
    ageRange: req.body.ageRange,
    colors: req.body.colors,
    size: req.body.size,
  })

  try {
    await newProduct.save()
    console.log(newProduct)
    res.status(200).send('The new product is: ' + newProduct.name)
  } catch (error) {
    console.log('Error happend: ', error)
    res.status(500).json({ Error: error })
  }
})

// GET ALL,
router.get('/',verifyToken, async (req, res) => {
  try {
    let Products = await Product.find()
    if (!Products) {
      return res.status(404).json({ message: 'Cannot find the product!' })
    } else {
      res.status(200).json(Products)
    }
  } catch (error) {
    res.status(404).json({ message: 'Cannot find the product!' })
  }
})

// GET ONE,
router.get('/:id', verifyToken, getProduct, (req, res) => {
  res.status(200).json(res.currentProduct)
})

// UPDATE ONE,
router.put('/:id', getProduct, async (req, res) => {
  try {
    // console.log('Updating --> ' + res.currentUser._id)
    const updatedProduct = await Product.findByIdAndUpdate(
      res.currentProduct._id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.json(updatedProduct)
  } catch (error) {
    console.log('Error happend: ', error)
    res.status(500).json({ Error: error })
  }
})

// DELETE ONE,
router.delete('/:id', getProduct, async (req, res) => {
  try {
    console.log(res.currentProduct)
    await res.currentProduct.remove()
    res.json({ message: 'Successefully deleted the product!' })
  } catch (error) {
    console.log('Error happend: ', error)
    res.status(500).json({ Error: error })
  }
})
