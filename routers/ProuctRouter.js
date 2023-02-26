const express = require('express');

const prouctController = require('../controllers/ProductController');
const protect = require('../middlewares/protect');

const router = express.Router();

router
  .route('/')
  .get(prouctController.getAllProducts)
  .post(protect, prouctController.addNewProduct);

router
  .route('/:id')
  .get(prouctController.getProduct)
  .patch(prouctController.updateProduct)
  .delete(prouctController.deleteProduct);

module.exports = router;
