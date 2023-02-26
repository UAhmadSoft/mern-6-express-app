const User = require('../models/User');

exports.getUsers = async (req, res) => {
  // const users = await User.find({
  //   email : "admin@gmail.com"
  // })

  console.log('req.query', req.query);
  console.log('req.user', req.user);
  let query = User.find();

  if (req.query.sort) {
    query.sort(req.query.sort);
    //! descending query.sort('-firstName');
    // query.sort('age firstName');
  }

  if (req.query.fields) {
    let fields = req.query.fields.replace(',', ' ');
    console.log('fields', fields);
    query.select(fields);
    //! descending query.sort('-firstName');
    // query.sort('age firstName');
  }

  const page = req.query.page || 1;
  const limit = req.query.limit || 100;

  query.skip(limit * (page - 1)).limit(limit);
  // query.skip(0).limit(2);

  const users = await query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
    loggedUser: req.user,
  });
};

exports.updatedUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    // runValidators : true
  });

  if (!user) {
    // TODO - Error
    return res.status(404).json({
      status: 'error',
      message: `No User found with id ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    user,
  });
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // const user = await User.create({...req.body})
    // const user = await User.create({
    //   firstName : req.body.firstName,
    //   firstName : req.body.firstName,
    // })

    console.log('user.id', user.id);
    console.log('user._id', user._id);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  // const user = await User.findOne({
  //   _id : id,
  //   email : 'example@gmail.com'
  // });

  if (!user) {
    // TODO - Error
    return res.status(404).json({
      status: 'error',
      message: `No User found with id ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    user,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  // const user = await User.findOneAndDelete({
  //   _id : id,
  //   email : 'example@gmail.com'
  // });

  if (!user) {
    // TODO - Error
    return res.status(404).json({
      status: 'error',
      message: `No User found with id ${id}`,
    });
  }

  res.status(204).json({
    status: 'success',
    user: null,
  });
};

// module.exports ={
//   getUsers,
//   deleeUser
// }
