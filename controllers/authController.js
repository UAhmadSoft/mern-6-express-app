const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (userId) =>
  jwt.sign(
    {
      _id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );

exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  }).select('+password');
  // .select('+password -email +firstName');
  // .select('firstName email');

  if (!user)
    return res.status(404).json({
      status: 'fail',
      message: `No user found against email ${req.body.email}`,
    });

  const isMatched = await user.comparePassword(
    req.body.password,
    user.password
  );

  console.log('isMatched', isMatched);

  if (!isMatched)
    return res.status(401).json({
      status: 'fail',
      message: `Password not matched`,
    });

  const token = signToken(user.id);

  console.log('token', token);

  res.status(200).json({
    status: 'success',
    user,
    token,
  });
};
