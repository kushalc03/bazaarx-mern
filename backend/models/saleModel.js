const mongoose = require('mongoose')

const saleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Sale', saleSchema)
