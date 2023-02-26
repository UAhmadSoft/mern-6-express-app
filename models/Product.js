const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  user: {
    // type : mongoose.Schema.ObjectId,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate('user', 'firstName email');

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
