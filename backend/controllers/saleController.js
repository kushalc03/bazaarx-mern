const asyncHandler = require('express-async-handler')

const Sale = require('../models/saleModel')
const User = require('../models/userModel')

// @desc    Get sales
// @route   GET /api/sales
// @access  Private
const getSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find({ user: req.user.id })

  res.status(200).json(sales)
})

// @desc    Set sale
// @route   POST /api/sales
// @access  Private
const setSale = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a sale')
  }
  if (!req.body.address) {
    res.status(400)
    throw new Error('Please add an address')
  }

  const sale = await Sale.create({
    text: req.body.text,
    address: req.body.address,
    user: req.user.id,
  })

  res.status(200).json(sale)
})

// @desc    Update sale
// @route   PUT /api/sales/:id
// @access  Private
const updateSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
    res.status(400)
    throw new Error('Sale not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the sale user
  if (sale.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedSale)
})

// @desc    Delete sale
// @route   DELETE /api/sales/:id
// @access  Private
const deleteSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id)

  if (!sale) {
    res.status(400)
    throw new Error('Sale not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the sale user
  if (sale.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await sale.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getSales,
  setSale,
  updateSale,
  deleteSale,
}
