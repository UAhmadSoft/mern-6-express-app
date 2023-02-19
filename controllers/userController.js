exports.getUsers = (req, res) => {
  d;
  res.send(users);
};

exports.updatedUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
};

exports.createUser = (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (user) {
    users = users.filter((u) => u.id !== id);
    res.send(`User with id ${id} deleted`);
  } else {
    res.status(404).send('User not found');
  }
};

// module.exports ={
//   getUsers,
//   deleeUser
// }
