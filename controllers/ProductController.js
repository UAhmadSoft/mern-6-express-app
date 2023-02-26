const Product = require('../models/Product');
const User = require('../models/User');

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    products,
  });
};

exports.addNewProduct = async (req, res, next) => {
  const product = await (
    await Product.create({ ...req.body, user: req.user._id })
  ).populate('user');

  let user = await User.findById(req.user._id);

  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: `Can't find user for id ${req.user._id}`,
    });

  user.products = [...user.products, product._id];
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    product,
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      status: 'fail',
      message: `Can't find product for id ${req.params.id}`,
    });

  res.status(200).json({
    status: 'success',
    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return res.status(404).json({
      status: 'fail',
      message: `Can't find product for id ${req.params.id}`,
    });

  res.status(200).json({
    status: 'success',
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return res.status(404).json({
      status: 'fail',
      message: `Can't find product for id ${req.params.id}`,
    });

  res.status(200).json({
    status: 'success',
    product,
  });
};
