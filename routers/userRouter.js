const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

let users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
];

router.get('/', userController.getUsers);

router.patch('/:id', userController.updatedUser);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
// module.exports = {
//   router,
//   router2
// }
