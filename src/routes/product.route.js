
import express from 'express';

import {
  getAllProducts,
  getAllProductsToCatalog
} from '../controllers/product.controller.js';

const productRouter = express.Router();
productRouter.get('/products', getAllProducts);
productRouter.get('/catalog', getAllProductsToCatalog);
export default productRouter;