import express from 'express';
import upload from '../middlewares/upload.js';
import {
  getAllProducts,
  getAllProductsToCatalog,
  viewProduct,
  viewProductToCatalog,
  showCreateForm,
  saveProduct,
  showEditForm,
  updateProduct,
  deleteProduct,
  searchProducts,
  searchProductsToCatalog
} from '../controllers/product.controller.js';

const productRouter = express.Router();
productRouter.get('/products', getAllProducts);
productRouter.get('/catalog', getAllProductsToCatalog);
productRouter.get('/products/create', showCreateForm);
productRouter.post('/products/create', upload.single('image'), saveProduct);
productRouter.get('/products/edit/:id', showEditForm);
productRouter.post('/products/edit/:id', upload.single('image'), updateProduct);
productRouter.get('/products/delete/:id', deleteProduct);
productRouter.get('/products/view/:id', viewProduct);
productRouter.get('/catalog/product/:id', viewProductToCatalog);
productRouter.get('/products/search', searchProducts);
productRouter.get('/catalog/search', searchProductsToCatalog);
export default productRouter;