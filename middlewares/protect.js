const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    console.log('req.headers', req.header);
    if (!req.headers.authorization)
      return res.status(401).json({
        status: 'fail',
        message: 'You must login first',
      });

    const token = req.headers.authorization.split(' ')[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log('decode', decode);

    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `No User found with id ${decode._id}`,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'You must login first',
    });
  }
};
