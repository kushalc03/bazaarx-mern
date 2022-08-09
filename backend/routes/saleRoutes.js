const express = require('express')
const router = express.Router()
const {
  getSales,
  setSale,
  updateSale,
  deleteSale,
} = require('../controllers/saleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSales).post(protect, setSale)
router.route('/:id').delete(protect, deleteSale).put(protect, updateSale)

module.exports = router
