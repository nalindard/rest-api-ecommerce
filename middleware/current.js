import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js'

// CURRENT USER,
export async function getUser(req, res, next) {
  let userID = req.params.id
  let currentUser
  try {
    currentUser = await User.findById(userID)
    if (currentUser == null) {
      res.status(404).json({ message: 'Cannot find the user!' })
    }
  } catch (error) {
    // res.send(error)
    res.status(404).json({ message: 'Cannot find the user!' })
  }
  res.currentUser = currentUser
  next()
}

// CURRENT PRODUCT,
export async function getProduct(req, res, next) {
  let productID = req.params.id
  let currentProduct
  try {
    currentProduct = await Product.findById(productID)
    if (!currentProduct) {
      return res.status(404).json({ message: 'Cannot find the product!' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Cannot find the product!' })
  }
  res.currentProduct = currentProduct
  next()
}

// CURRENT CART,
export async function getCart(req, res, next) {
  let cartID = req.params.id
  let currentCart
  try {
    currentCart = await Cart.findById(cartID)
    if (currentCart == null) {
      return res.status(404).json({ message: 'Cannot find the cart!' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Cannot find the cart!' })
  }
  res.currentCart = currentCart
  next()
}

// CURRENT ORDER,
export async function getOrder(req, res, next) {
  let orderID = req.params.id
  let currentOrder
  try {
    currentOrder = await Order.findById(orderID)
    if (currentOrder == null) {
      return res.status(404).json({ message: 'Cannot find the order!' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Cannot find the order!' })
  }
  res.currentOrder = currentOrder
  next()
}

//   console.log(req.originalUrl)
