import express from 'express';
import upload from '../middlewares/upload.js';
import {
  getAllProducts,
  getAllProductsToCatalog,
  viewProduct,
  showCreateForm,
  saveProduct,
} from '../controllers/product.controller.js';

const productRouter = express.Router();
productRouter.get('/products', getAllProducts);
productRouter.get('/catalog', getAllProductsToCatalog);
productRouter.get('/products/create', showCreateForm);
productRouter.post('/products/create', upload.single('image'), saveProduct);
productRouter.get('/products/view/:id', viewProduct);
export default productRouter;